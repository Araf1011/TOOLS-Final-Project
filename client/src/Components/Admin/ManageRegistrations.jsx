import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import API_URL from '../../config';

const ManageRegistrations = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedReg, setSelectedReg] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/registrations`)
            .then(res => res.json())
            .then(data => {
                setRegistrations(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading registrations:", err);
                setLoading(false);
            });
    }, []);

    const handleUpdateStatus = (registrationId, status) => {
        const confirmMsg = `Are you sure you want to ${status === 'Paid' ? 'approve' : 'reject'} this payment?`;
        if (!window.confirm(confirmMsg)) return;

        setActionLoading(true);
        fetch(`${API_URL}/registrations/payment/${registrationId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0 || data.matchedCount > 0) {
                    setRegistrations(prev =>
                        prev.map(r =>
                            r._id === registrationId ? { ...r, paymentStatus: status } : r
                        )
                    );
                    setSelectedReg(prev => prev ? { ...prev, paymentStatus: status } : null);
                    alert(`Payment ${status === 'Paid' ? 'approved' : 'rejected'} successfully!`);
                } else {
                    alert("Status update failed — record not found.");
                }
            })
            .catch(err => {
                console.error("Error updating status:", err);
                alert("Network error. Failed to update payment status.");
            })
            .finally(() => setActionLoading(false));
    };

    const getStatusBadge = (status) => {
        if (status === 'Paid') return 'badge-paid';
        if (status === 'Rejected') return 'badge-rejected';
        return 'badge-pending';
    };

    const isPendingVerification = (reg) =>
        reg.paymentStatus === 'Pending' || reg.paymentStatus === 'Pending Verification';

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 animate-spin"
                        style={{ borderColor: 'var(--border-strong)', borderTopColor: 'var(--accent)' }} />
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading registrations…</p>
                </div>
            </div>
        );
    }

    const paidReg = registrations.filter(r => r.paymentStatus === 'Paid').length;
    const pendingReg = registrations.filter(r => isPendingVerification(r)).length;
    const rejectedReg = registrations.filter(r => r.paymentStatus === 'Rejected').length;

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }} className="page-fade">

            <div className="relative overflow-hidden" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="blob blob-1" style={{ opacity: 0.18, width: 400, height: 400 }} />
                <div className="blob blob-2" style={{ opacity: 0.12, width: 300, height: 300 }} />
                <div className="section-container relative z-10" style={{ paddingTop: 'calc(var(--nav-h) + 1.5rem)', paddingBottom: '2rem' }}>
                    <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                        <Link to="/admin" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Dashboard</Link>
                        <span style={{ margin: '0 0.4rem' }}>›</span>
                        <span>Registrations &amp; Payments</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold"
                                style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                Event Registrations
                            </h1>
                            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                                Review event bookings, verify payments, and issue admission passes.
                            </p>
                        </div>
                        <span className="section-badge self-start">🎟️ Registrations</span>
                    </div>
                </div>
            </div>

            <div className="section-container" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total', value: registrations.length, color: 'var(--accent)', bg: 'rgba(255,190,145,0.08)', icon: '📋' },
                        { label: 'Approved', value: paidReg, color: '#4ade80', bg: 'rgba(74,222,128,0.08)', icon: '✅' },
                        { label: 'Pending', value: pendingReg, color: '#FFDDB0', bg: 'rgba(255,221,176,0.08)', icon: '⏳' },
                        { label: 'Rejected', value: rejectedReg, color: '#f87171', bg: 'rgba(248,113,113,0.08)', icon: '❌' },
                    ].map(({ label, value, color, bg, icon }) => (
                        <div key={label} className="stat-card" style={{ background: bg, border: `1px solid ${color}22` }}>
                            <span className="text-2xl block mb-1">{icon}</span>
                            <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
                            <h3 className="text-3xl font-extrabold" style={{ color, fontFamily: 'Space Grotesk, sans-serif' }}>{value}</h3>
                        </div>
                    ))}
                </div>

                {registrations.length === 0 ? (
                    <div className="text-center py-24 rounded-3xl"
                        style={{ border: '2px dashed var(--border-color)', background: 'var(--bg-card)' }}>
                        <span className="text-6xl block mb-4">🎟️</span>
                        <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                            No Registrations Yet
                        </h3>
                        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                            When students register for events, they will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border shadow-md"
                        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                        <div className="overflow-x-auto">
                            <table className="premium-table">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Event</th>
                                        <th>Fee</th>
                                        <th>Payment Status</th>
                                        <th>Date</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrations.map((reg) => (
                                        <tr key={reg._id}>
                                            <td>
                                                <div>
                                                    <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                                                        {reg.userName || reg.name || '—'}
                                                    </p>
                                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                                        {reg.userEmail || reg.email || '—'}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="text-sm font-semibold max-w-[200px] truncate"
                                                style={{ color: 'var(--text-secondary)' }}>
                                                {reg.eventName || reg.eventTitle || '—'}
                                            </td>
                                            <td className="text-sm font-bold" style={{ color: 'var(--accent)' }}>
                                                {parseFloat(reg.price || 0) === 0 ? (
                                                    <span style={{ color: '#4ade80', fontSize: '0.75rem', fontWeight: 700 }}>FREE</span>
                                                ) : `৳ ${reg.price}`}
                                            </td>
                                            <td>
                                                <span className={getStatusBadge(reg.paymentStatus)}>
                                                    {reg.paymentStatus || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                                {reg.registrationDate
                                                    ? new Date(reg.registrationDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                                                    : '—'}
                                            </td>
                                            <td className="text-right">
                                                <div className="flex gap-2 justify-end flex-wrap">
                                                    <button
                                                        onClick={() => setSelectedReg(reg)}
                                                        className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                                                        style={{ background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid var(--border-strong)' }}
                                                    >
                                                        Details
                                                    </button>
                                                    {isPendingVerification(reg) && (
                                                        <>
                                                            <button
                                                                onClick={() => handleUpdateStatus(reg._id, 'Paid')}
                                                                disabled={actionLoading}
                                                                className="px-3 py-1.5 text-xs font-semibold rounded-lg text-white cursor-pointer transition-opacity"
                                                                style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', opacity: actionLoading ? 0.6 : 1 }}
                                                            >
                                                                ✓ Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleUpdateStatus(reg._id, 'Rejected')}
                                                                disabled={actionLoading}
                                                                className="px-3 py-1.5 text-xs font-semibold rounded-lg text-white cursor-pointer transition-opacity"
                                                                style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)', opacity: actionLoading ? 0.6 : 1 }}
                                                            >
                                                                ✕ Reject
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {selectedReg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
                    onClick={() => setSelectedReg(null)}>
                    <div className="rounded-3xl p-6 max-w-lg w-full relative overflow-y-auto"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-lg)', maxHeight: '90vh' }}
                        onClick={e => e.stopPropagation()}>

                        <button onClick={() => setSelectedReg(null)}
                            className="absolute right-4 top-4 w-8 h-8 rounded-lg flex items-center justify-center text-sm cursor-pointer"
                            style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
                            ✕
                        </button>

                        <h3 className="font-extrabold text-lg mb-5"
                            style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                            Registration Details
                        </h3>

                        <div className="flex flex-col gap-3">

                            <div className="p-4 rounded-2xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                                <span className="text-[9px] uppercase tracking-wider font-bold block mb-3" style={{ color: 'var(--accent)' }}>
                                    👤 Student Info
                                </span>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="col-span-2">
                                        <p className="text-[9px] uppercase font-bold mb-0.5" style={{ color: 'var(--text-muted)' }}>Full Name</p>
                                        <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                                            {selectedReg.userName || selectedReg.name || '—'}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-[9px] uppercase font-bold mb-0.5" style={{ color: 'var(--text-muted)' }}>Email</p>
                                        <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                                            {selectedReg.userEmail || selectedReg.email || '—'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase font-bold mb-0.5" style={{ color: 'var(--text-muted)' }}>Student Roll / ID</p>
                                        <p className="font-bold text-sm font-mono" style={{ color: 'var(--accent)' }}>
                                            {selectedReg.roll || '—'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase font-bold mb-0.5" style={{ color: 'var(--text-muted)' }}>Department</p>
                                        <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                                            {selectedReg.department || '—'}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-[9px] uppercase font-bold mb-1" style={{ color: 'var(--text-muted)' }}>Phone Number</p>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                                                {selectedReg.phone || '—'}
                                            </span>
                                            {selectedReg.phone && (
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(selectedReg.phone);
                                                        setCopied(true);
                                                        setTimeout(() => setCopied(false), 2000);
                                                    }}
                                                    title="Copy phone number"
                                                    className="px-2 py-0.5 rounded-lg text-xs font-bold cursor-pointer transition-all"
                                                    style={{
                                                        background: copied ? 'rgba(74,222,128,0.15)' : 'var(--accent-light)',
                                                        color: copied ? '#4ade80' : 'var(--accent)',
                                                        border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : 'var(--border-strong)'}`,
                                                    }}
                                                >
                                                    {copied ? '✓ Copied!' : '📋 Copy'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-[9px] uppercase font-bold mb-0.5" style={{ color: 'var(--text-muted)' }}>Registration ID</p>
                                        <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                                            {selectedReg._id}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                                <span className="text-[9px] uppercase tracking-wider font-bold block mb-2" style={{ color: 'var(--accent)' }}>
                                    📅 Event
                                </span>
                                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                                    {selectedReg.eventName || selectedReg.eventTitle || '—'}
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                    Event ID: {selectedReg.eventId}
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                                <span className="text-[9px] uppercase tracking-wider font-bold block mb-3" style={{ color: 'var(--accent)' }}>
                                    💳 Payment Info
                                </span>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-[9px] uppercase font-bold mb-0.5" style={{ color: 'var(--text-muted)' }}>Amount</p>
                                        <p className="font-bold text-sm" style={{ color: 'var(--accent)' }}>
                                            {parseFloat(selectedReg.price || 0) === 0 ? (
                                                <span style={{ color: '#4ade80' }}>FREE</span>
                                            ) : `৳ ${selectedReg.price}`}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase font-bold mb-0.5" style={{ color: 'var(--text-muted)' }}>Status</p>
                                        <span className={getStatusBadge(selectedReg.paymentStatus)}>
                                            {selectedReg.paymentStatus || 'Pending'}
                                        </span>
                                    </div>
                                    {selectedReg.paymentMethod && (
                                        <div>
                                            <p className="text-[9px] uppercase font-bold mb-0.5" style={{ color: 'var(--text-muted)' }}>Method</p>
                                            <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                                                {selectedReg.paymentMethod}
                                            </p>
                                        </div>
                                    )}
                                    {selectedReg.senderNumber && (
                                        <div>
                                            <p className="text-[9px] uppercase font-bold mb-0.5" style={{ color: 'var(--text-muted)' }}>Sender Number</p>
                                            <p className="font-mono font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                                                {selectedReg.senderNumber}
                                            </p>
                                        </div>
                                    )}
                                    {selectedReg.transactionId ? (
                                        <div className="col-span-2">
                                            <p className="text-[9px] uppercase font-bold mb-1" style={{ color: 'var(--text-muted)' }}>Transaction ID (TrxID)</p>
                                            <div className="flex items-center gap-2 p-2.5 rounded-xl"
                                                style={{ background: 'rgba(255,190,145,0.08)', border: '1px solid rgba(255,190,145,0.25)' }}>
                                                <span className="font-mono font-bold text-base flex-1" style={{ color: 'var(--accent)', letterSpacing: '0.05em' }}>
                                                    {selectedReg.transactionId}
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(selectedReg.transactionId);
                                                        setCopied(true);
                                                        setTimeout(() => setCopied(false), 2000);
                                                    }}
                                                    title="Copy Transaction ID"
                                                    className="px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all flex-shrink-0"
                                                    style={{
                                                        background: copied ? 'rgba(74,222,128,0.15)' : 'var(--accent-light)',
                                                        color: copied ? '#4ade80' : 'var(--accent)',
                                                        border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : 'var(--border-strong)'}`,
                                                    }}
                                                >
                                                    {copied ? '✓ Copied!' : '📋 Copy'}
                                                </button>
                                            </div>
                                        </div>
                                    ) : parseFloat(selectedReg.price || 0) > 0 && (
                                        <div className="col-span-2">
                                            <p className="text-[9px] uppercase font-bold mb-0.5" style={{ color: 'var(--text-muted)' }}>Transaction ID</p>
                                            <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
                                                ⏳ Not submitted yet — payment pending from student.
                                            </p>
                                        </div>
                                    )}
                                    <div className="col-span-2">
                                        <p className="text-[9px] uppercase font-bold mb-0.5" style={{ color: 'var(--text-muted)' }}>Registered On</p>
                                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                            {selectedReg.registrationDate
                                                ? new Date(selectedReg.registrationDate).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                                                : '—'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isPendingVerification(selectedReg) && (
                            <div className="flex gap-2.5 mt-5 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                                <button
                                    onClick={() => handleUpdateStatus(selectedReg._id, 'Paid')}
                                    disabled={actionLoading}
                                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer transition-all"
                                    style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', opacity: actionLoading ? 0.6 : 1 }}
                                >
                                    {actionLoading ? '…' : '✅ Approve & Issue Pass'}
                                </button>
                                <button
                                    onClick={() => handleUpdateStatus(selectedReg._id, 'Rejected')}
                                    disabled={actionLoading}
                                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer transition-all"
                                    style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)', opacity: actionLoading ? 0.6 : 1 }}
                                >
                                    {actionLoading ? '…' : '❌ Reject'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageRegistrations;
