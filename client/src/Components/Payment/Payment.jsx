import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import API_URL from '../../config';

const Payment = () => {
    const { registrationId } = useParams();
    const navigate = useNavigate();
    const [registration, setRegistration] = useState(null);
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [selectedMethod, setSelectedMethod] = useState('bKash');

    useEffect(() => {
        const regPromise = fetch(`${API_URL}/registrations/${registrationId}`)
            .then(res => res.json())
            .then(data => setRegistration(data))
            .catch(err => console.error("Error fetching registration:", err));

        const settingsPromise = fetch(`${API_URL}/settings`)
            .then(res => res.json())
            .then(data => setSettings(data))
            .catch(err => console.error("Error fetching settings:", err));

        Promise.all([regPromise, settingsPromise])
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [registrationId]);

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        const senderNumber = e.target.senderNumber.value.trim();
        const transactionId = e.target.transactionId.value.trim();

        const paymentData = {
            registrationId,
            eventId: registration.eventId,
            eventName: registration.eventName,
            userEmail: registration.userEmail,
            userName: registration.userName,
            method: selectedMethod,
            senderNumber,
            transactionId,
            amount: parseFloat(registration.price),
            status: 'Pending'
        };

        fetch(`${API_URL}/payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        })
            .then(res => res.json())
            .then(data => {
                setSubmitting(false);
                if (data.insertedId) {
                    navigate('/dashboard');
                } else {
                    setError('Failed to submit payment details. Please try again.');
                }
            })
            .catch(err => {
                console.error("Error submitting payment:", err);
                setSubmitting(false);
                setError('Something went wrong. Please check your network connection.');
            });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
                <div className="w-10 h-10 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
            </div>
        );
    }

    if (!registration) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4"
                style={{ background: 'var(--bg-primary)' }}>
                <span className="text-6xl mb-4">⚠️</span>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                    Invalid Registration
                </h2>
                <p className="mt-2" style={{ color: 'var(--text-muted)' }}>The registration record was not found.</p>
                <Link to="/dashboard" className="btn-premium px-6 py-2.5 rounded-xl mt-6">Back to Dashboard</Link>
            </div>
        );
    }

    const currentNumber = selectedMethod === 'bKash'
        ? (settings?.bkashNumber || settings?.bkash || 'Not configured')
        : (settings?.nagadNumber || settings?.nagad || 'Not configured');

    return (
        <div className="min-h-screen py-12 px-4 md:px-8 page-fade" style={{ background: 'var(--bg-primary)', paddingTop: '6rem' }}>
            <div className="max-w-xl mx-auto rounded-3xl p-6 md:p-8"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>

                <div className="text-center mb-6">
                    <svg className="w-12 h-12 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(var(--shadow-glow))' }}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <h2 className="text-2xl md:text-3xl font-extrabold"
                        style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                        Payment Confirmation
                    </h2>
                    <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>
                        Completing payment for:{' '}
                        <span className="font-bold" style={{ color: 'var(--accent)' }}>{registration.eventName}</span>
                    </p>
                </div>

                <div className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-wider mb-3 text-center" style={{ color: 'var(--text-secondary)' }}>
                        Choose Mobile Payment Option
                    </label>
                    <div className="grid grid-cols-2 gap-4">

                        <div
                            onClick={() => setSelectedMethod('bKash')}
                            className="rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-[1.02]"
                            style={{
                                border: selectedMethod === 'bKash' ? '2.5px solid #e2136e' : '1px solid var(--border-color)',
                                background: selectedMethod === 'bKash' ? 'rgba(226, 19, 110, 0.08)' : 'var(--bg-secondary)',
                                boxShadow: selectedMethod === 'bKash' ? '0 0 16px rgba(226, 19, 110, 0.15)' : 'none'
                            }}
                        >
                            <img
                                src="https://download.logo.wine/logo/BKash/BKash-Logo.wine.png"
                                alt="bKash Logo"
                                className="h-10 object-contain mb-1.5"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://raw.githubusercontent.com/shurjopay-plugins/sp-dec-woo/master/assets/images/bkash.png';
                                }}
                            />
                            <span className="text-xs font-bold" style={{ color: selectedMethod === 'bKash' ? '#e2136e' : 'var(--text-secondary)' }}>
                                bKash Payment
                            </span>
                        </div>

                        <div
                            onClick={() => setSelectedMethod('Nagad')}
                            className="rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-[1.02]"
                            style={{
                                border: selectedMethod === 'Nagad' ? '2.5px solid #f95f07' : '1px solid var(--border-color)',
                                background: selectedMethod === 'Nagad' ? 'rgba(249, 95, 7, 0.08)' : 'var(--bg-secondary)',
                                boxShadow: selectedMethod === 'Nagad' ? '0 0 16px rgba(249, 95, 7, 0.15)' : 'none'
                            }}
                        >
                            <img
                                src="https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png"
                                alt="Nagad Logo"
                                className="h-10 object-contain mb-1.5"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://raw.githubusercontent.com/shurjopay-plugins/sp-dec-woo/master/assets/images/nagad.png';
                                }}
                            />
                            <span className="text-xs font-bold" style={{ color: selectedMethod === 'Nagad' ? '#f95f07' : 'var(--text-secondary)' }}>
                                Nagad Payment
                            </span>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl p-5 mb-6 flex flex-col gap-4"
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                    <h3 className="font-bold text-xs uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
                        Instructions
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Please send money via <strong>Send Money</strong> option of <strong>{selectedMethod}</strong> to the personal number listed below. Once sent, provide the sender's payment account number and Transaction ID (TrxID) below.
                    </p>

                    <div className="flex flex-col gap-2.5 mt-1">
                        <div className="flex justify-between items-center p-3 rounded-xl text-xs border"
                            style={{
                                background: 'var(--bg-card)',
                                borderColor: selectedMethod === 'bKash' ? 'rgba(226, 19, 110, 0.3)' : 'rgba(249, 95, 7, 0.3)'
                            }}>
                            <span className="font-semibold flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                                📱 {selectedMethod} Personal:
                            </span>
                            <span className="font-mono font-bold text-sm" style={{ color: 'var(--accent)' }}>
                                {currentNumber}
                            </span>
                        </div>

                        <div className="flex justify-between items-center p-3 rounded-xl text-xs border"
                            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-strong)' }}>
                            <span className="font-semibold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                                ৳ Payable Amount:
                            </span>
                            <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                                ৳ {registration.price}
                            </span>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 px-4 py-3 rounded-xl text-xs font-semibold"
                        style={{ background: 'rgba(220,38,38,0.1)', color: 'var(--error-color)', border: '1px solid rgba(220,38,38,0.2)' }}>
                        <span>⚠️ {error}</span>
                    </div>
                )}

                <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                            Payment Account Number (Sender Number)
                        </label>
                        <input
                            type="text"
                            name="senderNumber"
                            placeholder="e.g. 017XXXXXXXX"
                            className="input-premium"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                            Transaction ID (TrxID)
                        </label>
                        <input
                            type="text"
                            name="transactionId"
                            placeholder="e.g. A9B8C7D6E5"
                            className="input-premium font-mono"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-premium w-full py-3 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center gap-2 cursor-pointer"
                        disabled={submitting}
                    >
                        {submitting
                            ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                            : `Submit ${selectedMethod} Info 💳`
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
