import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router';
import { Html5Qrcode } from 'html5-qrcode';
import API_URL from '../../config';

const QRScanner = () => {
    const [scanResult, setScanResult] = useState('');
    const [verificationData, setVerificationData] = useState(null);
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState('');
    const [cameraError, setCameraError] = useState('');
    const [cameras, setCameras] = useState([]);
    const [selectedCameraId, setSelectedCameraId] = useState('');
    const [isScanning, setIsScanning] = useState(false);

    const html5QrCodeRef = useRef(null);

    const stopScanner = useCallback(async () => {
        if (html5QrCodeRef.current) {
            try {
                if (html5QrCodeRef.current.isScanning) {
                    await html5QrCodeRef.current.stop();
                }
            } catch (err) {
                console.warn('Error stopping QR scanner:', err);
            }
        }
    }, []);

    const startScanner = useCallback(async (cameraId = null) => {
        setCameraError('');
        await stopScanner();

        const readerElement = document.getElementById('reader');
        if (!readerElement) return;

        if (!html5QrCodeRef.current) {
            html5QrCodeRef.current = new Html5Qrcode('reader');
        }

        const config = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0
        };

        const cameraTarget = cameraId || (cameras.length > 0 ? cameras[0].id : { facingMode: 'environment' });

        try {
            await html5QrCodeRef.current.start(
                cameraTarget,
                config,
                async (decodedText) => {
                    await stopScanner();
                    setIsScanning(false);
                    setScanResult(decodedText);
                    verifyTicket(decodedText);
                },
                () => {}
            );
            setIsScanning(true);
        } catch (err) {
            console.error('Failed to start camera:', err);
            setIsScanning(false);
            if (err?.toString().includes('Permission') || err?.toString().includes('NotAllowedError')) {
                setCameraError('Camera access denied. Please allow camera permissions in your browser settings.');
            } else if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
                setCameraError('Camera access requires HTTPS or localhost. Please open the app using HTTPS.');
            } else {
                setCameraError('Unable to start camera. Please ensure no other app is using the camera.');
            }
        }
    }, [cameras, stopScanner]);

    useEffect(() => {
        let isMounted = true;

        Html5Qrcode.getCameras()
            .then(devices => {
                if (isMounted && devices && devices.length > 0) {
                    setCameras(devices);
                    const backCamera = devices.find(d => 
                        d.label.toLowerCase().includes('back') || 
                        d.label.toLowerCase().includes('rear') || 
                        d.label.toLowerCase().includes('environment')
                    );
                    const defaultCam = backCamera ? backCamera.id : devices[0].id;
                    setSelectedCameraId(defaultCam);
                }
            })
            .catch(() => {
            });

        return () => {
            isMounted = false;
            stopScanner();
        };
    }, [stopScanner]);

    useEffect(() => {
        if (!scanResult) {
            const timer = setTimeout(() => {
                startScanner(selectedCameraId);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [scanResult, selectedCameraId, startScanner]);

    const verifyTicket = (registrationId) => {
        setVerifying(true);
        setError('');
        setVerificationData(null);

        fetch(`${API_URL}/registrations/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ registrationId })
        })
            .then(r => r.json())
            .then(data => {
                setVerifying(false);
                if (data.success) {
                    setVerificationData(data.registration);
                } else {
                    setError(data.message || 'Ticket verification failed. Invalid code or unverified payment.');
                }
            })
            .catch(() => {
                setVerifying(false);
                setError('Network error. Failed to contact verification server.');
            });
    };

    const handleResetScanner = () => {
        setScanResult('');
        setVerificationData(null);
        setError('');
        setCameraError('');
    };

    const handleCameraChange = (e) => {
        const newCamId = e.target.value;
        setSelectedCameraId(newCamId);
        if (!scanResult) {
            startScanner(newCamId);
        }
    };

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }} className="page-fade">
            <div className="relative overflow-hidden" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="blob blob-1" style={{ opacity: 0.18, width: 400, height: 400 }} />
                <div className="blob blob-2" style={{ opacity: 0.12, width: 300, height: 300 }} />
                <div className="section-container relative z-10" style={{ paddingTop: 'calc(var(--nav-h) + 1.5rem)', paddingBottom: '2rem' }}>
                    <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                        <Link to="/admin" style={{ color: 'var(--accent)' }}>Dashboard</Link> / QR Pass Scanner
                    </div>
                    <h1 className="text-2xl md:text-3xl font-extrabold"
                        style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                        Entry Gate Scanner
                    </h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                        Scan attendee QR tickets at campus gates for real-time admission verification.
                    </p>
                </div>
            </div>

            <div className="section-container py-8">
                <div className="max-w-xl mx-auto">
                    <div className="rounded-3xl p-5 md:p-8"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>

                        {!scanResult ? (
                            <div className="flex flex-col items-center gap-4">
                                {cameras.length > 1 && (
                                    <div className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl"
                                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                                        <label className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                                            📷 Select Camera:
                                        </label>
                                        <select
                                            value={selectedCameraId}
                                            onChange={handleCameraChange}
                                            className="text-xs font-medium px-3 py-1.5 rounded-lg outline-none cursor-pointer"
                                            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
                                            {cameras.map(cam => (
                                                <option key={cam.id} value={cam.id}>
                                                    {cam.label || `Camera ${cam.id.slice(0, 5)}...`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="relative w-full overflow-hidden rounded-2xl aspect-square flex items-center justify-center"
                                    style={{
                                        border: '2px solid var(--accent)',
                                        boxShadow: '0 0 25px rgba(124,58,237,0.2)',
                                        background: '#000'
                                    }}>
                                    <div id="reader" className="w-full h-full object-cover" />

                                    {cameraError && (
                                        <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center gap-3 bg-black/90 z-20">
                                            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-2xl border border-red-500/40">
                                                ⚠️
                                            </div>
                                            <p className="text-xs font-medium text-red-200">{cameraError}</p>
                                            <button
                                                onClick={() => startScanner(selectedCameraId)}
                                                className="btn-premium px-5 py-2 text-xs rounded-xl font-semibold mt-2">
                                                Retry Camera Access
                                            </button>
                                        </div>
                                    )}

                                    {!isScanning && !cameraError && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 z-10">
                                            <div className="w-8 h-8 rounded-full border-3 border-violet-300 border-t-violet-600 animate-spin" />
                                            <p className="text-xs text-violet-200 font-medium">Initializing lens...</p>
                                        </div>
                                    )}
                                </div>

                                <div className="text-center px-4">
                                    <p className="text-sm font-semibold mb-1 flex items-center justify-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        Camera Active
                                    </p>
                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                        Hold the attendee's PDF ticket QR code steadily in front of your phone lens.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-5 text-center">
                                {verifying ? (
                                    <div className="py-12 flex flex-col items-center gap-4">
                                        <div className="w-12 h-12 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
                                        <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                                            Verifying Pass Code...
                                        </p>
                                    </div>
                                ) : error ? (
                                    <div className="w-full flex flex-col items-center gap-4 py-4">
                                        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                                            style={{ background: '#fee2e2', border: '3px solid #fca5a5' }}>
                                            ❌
                                        </div>
                                        <h3 className="text-xl font-extrabold" style={{ color: '#dc2626', fontFamily: 'Space Grotesk, sans-serif' }}>
                                            Access Denied
                                        </h3>
                                        <div className="rounded-xl px-4 py-3 w-full"
                                            style={{ background: '#fee2e2', border: '1px solid #fca5a5' }}>
                                            <p className="text-sm font-semibold" style={{ color: '#dc2626' }}>{error}</p>
                                            <p className="text-xs mt-1 font-mono text-gray-600">Scanned ID: {scanResult}</p>
                                        </div>
                                        <button onClick={handleResetScanner} className="btn-premium px-8 py-3 rounded-xl text-sm font-semibold w-full">
                                            🔄 Scan Next Ticket
                                        </button>
                                    </div>
                                ) : verificationData ? (
                                    <div className="w-full flex flex-col items-center gap-4">
                                        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                                            style={{ background: '#d1fae5', border: '3px solid #6ee7b7' }}>
                                            ✅
                                        </div>
                                        <h3 className="text-2xl font-extrabold" style={{ color: '#059669', fontFamily: 'Space Grotesk, sans-serif' }}>
                                            Admitted Successfully
                                        </h3>

                                        <div className="w-full rounded-2xl text-left flex flex-col gap-4 p-5"
                                            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                                            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                                                <p className="text-[9px] uppercase tracking-wider font-bold mb-0.5" style={{ color: 'var(--text-muted)' }}>
                                                    Attendee Name
                                                </p>
                                                <p className="font-extrabold text-base" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                                    {verificationData.userName}
                                                </p>
                                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{verificationData.userEmail}</p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                                                {[
                                                    { l: 'Department', v: verificationData.department || 'N/A' },
                                                    { l: 'Roll ID', v: verificationData.roll || 'N/A' },
                                                ].map(({ l, v }) => (
                                                    <div key={l}>
                                                        <p className="text-[9px] uppercase tracking-wider font-bold mb-0.5" style={{ color: 'var(--text-muted)' }}>{l}</p>
                                                        <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{v}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            <div>
                                                <p className="text-[9px] uppercase tracking-wider font-bold mb-0.5" style={{ color: 'var(--text-muted)' }}>
                                                    Registered Event
                                                </p>
                                                <p className="font-bold text-sm" style={{ color: 'var(--accent)' }}>
                                                    {verificationData.eventName}
                                                </p>
                                            </div>
                                        </div>

                                        <button onClick={handleResetScanner} className="btn-premium w-full py-3 rounded-xl text-sm font-semibold">
                                            🔄 Scan Next Ticket
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRScanner;
