import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import API_URL from '../../config';

const PaymentSettings = () => {
    const [bkash, setBkash] = useState('');
    const [nagad, setNagad] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`${API_URL}/settings`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setBkash(data.bkashNumber || data.bkash || '');
                    setNagad(data.nagadNumber || data.nagad || '');
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleUpdateSettings = (e) => {
        e.preventDefault();
        setUpdating(true);
        setError('');
        setSuccess('');

        const newBkash = e.target.bkash.value.trim();
        const newNagad = e.target.nagad.value.trim();

        fetch(`${API_URL}/settings`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bkashNumber: newBkash, nagadNumber: newNagad })
        })
            .then(res => res.json())
            .then(() => {
                setUpdating(false);
                setBkash(newBkash);
                setNagad(newNagad);
                setSuccess('Payment numbers saved successfully!');
            })
            .catch(() => {
                setUpdating(false);
                setError('Network error. Please try again.');
            });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 animate-spin"
                        style={{ borderColor: 'var(--border-strong)', borderTopColor: 'var(--accent)' }} />
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading settings…</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }} className="page-fade">

            <div className="relative overflow-hidden" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="blob blob-1" style={{ opacity: 0.18, width: 400, height: 400 }} />
                <div className="blob blob-2" style={{ opacity: 0.12, width: 300, height: 300 }} />
                <div className="section-container relative z-10" style={{ paddingTop: 'calc(var(--nav-h) + 1.5rem)', paddingBottom: '2rem' }}>
                    <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                        <Link to="/admin" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Dashboard</Link>
                        <span style={{ margin: '0 0.4rem' }}>›</span>
                        <span>Payment Numbers</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold"
                                style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                Payment Settings
                            </h1>
                            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                                Configure bKash and Nagad numbers for receiving student event ticket fees.
                            </p>
                        </div>
                        <span className="section-badge self-start">💳 Gateway</span>
                    </div>
                </div>
            </div>

            <div className="section-container" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>
                <div className="max-w-xl mx-auto rounded-3xl p-6 md:p-8"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>

                    {(bkash || nagad) && (
                        <div className="mb-6 p-4 rounded-2xl grid grid-cols-2 gap-4"
                            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                            <div>
                                <p className="text-[10px] uppercase tracking-wider font-bold mb-1" style={{ color: 'var(--text-muted)' }}>Current bKash</p>
                                <p className="font-mono font-bold text-sm" style={{ color: 'var(--accent)' }}>{bkash || '—'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-wider font-bold mb-1" style={{ color: 'var(--text-muted)' }}>Current Nagad</p>
                                <p className="font-mono font-bold text-sm" style={{ color: 'var(--accent-2)' }}>{nagad || '—'}</p>
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 px-4 py-3 rounded-xl text-xs font-semibold"
                            style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.25)' }}>
                            ✅ {success}
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 px-4 py-3 rounded-xl text-xs font-semibold"
                            style={{ background: 'rgba(248,113,113,0.1)', color: 'var(--error-color)', border: '1px solid rgba(248,113,113,0.25)' }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleUpdateSettings} className="flex flex-col gap-5">
                        <div>
                            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                                Admin bKash Number
                            </label>
                            <input
                                type="text"
                                name="bkash"
                                defaultValue={bkash}
                                placeholder="e.g. 017XXXXXXXX"
                                className="input-premium font-mono"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                                Admin Nagad Number
                            </label>
                            <input
                                type="text"
                                name="nagad"
                                defaultValue={nagad}
                                placeholder="e.g. 018XXXXXXXX"
                                className="input-premium font-mono"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn-premium w-full py-3 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center gap-2 cursor-pointer"
                            disabled={updating}
                        >
                            {updating
                                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                                : '💾 Save Payment Numbers'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentSettings;
