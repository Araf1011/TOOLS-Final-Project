import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link } from 'react-router';
import API_URL from '../../config';
import TicketPDF from './TicketPDF';

const departments = ['CSE', 'EEE', 'BBA', 'Pharmacy', 'English', 'Law'];

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTicket, setActiveTicket] = useState(null);

    const [editOpen, setEditOpen] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '', phone: '', roll: '', department: ''
    });

    const fetchProfile = () => {
        return fetch(`${API_URL}/users/${encodeURIComponent(user.email)}`)
            .then(r => r.json())
            .then(data => {
                setProfile(data);
                setEditForm({
                    name: data.name || user.displayName || '',
                    phone: data.phone || '',
                    roll: data.roll || '',
                    department: data.department || 'CSE',
                });
            });
    };

    useEffect(() => {
        if (!user) return;
        const p2 = fetch(`${API_URL}/registrations/user/${user.email}`)
            .then(r => r.json()).then(setRegistrations);
        Promise.all([fetchProfile(), p2]).finally(() => setLoading(false));
    }, [user]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setEditLoading(true);
        fetch(`${API_URL}/users/${encodeURIComponent(user.email)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editForm),
        })
            .then(() => fetchProfile())
            .then(() => { setEditSuccess(true); setTimeout(() => setEditSuccess(false), 3000); })
            .finally(() => setEditLoading(false));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
                <div className="w-10 h-10 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
            </div>
        );
    }

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }} className="page-fade">
            <div className="section-container" style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>
                <div className="flex flex-col gap-8">

                    <div className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
                        <div className="flex items-center gap-4">
                            <div className="relative flex-shrink-0">
                                <img
                                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || user.email)}&background=7c3aed&color=fff&size=128`}
                                    alt="avatar"
                                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                                    style={{ outline: '3px solid var(--accent)', outlineOffset: '3px' }}
                                />
                                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full" />
                            </div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-extrabold"
                                    style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                    {profile?.name || user.displayName || 'University Student'}
                                </h2>
                                <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                                        style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                                        Roll: {profile?.roll || 'Not set'}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                                        style={{ background: 'var(--accent-2-light)', color: 'var(--accent-2)' }}>
                                        Dept: {profile?.department || 'Not set'}
                                    </span>
                                    {profile?.phone && (
                                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                                            style={{ background: 'rgba(5,150,105,0.08)', color: '#059669' }}>
                                            📞 {profile.phone}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <div className="stat-card text-center min-w-[130px]">
                                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                                    Registered Events
                                </p>
                                <h3 className="text-4xl font-extrabold text-gradient" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    {registrations.length}
                                </h3>
                            </div>
                            <button
                                onClick={() => setEditOpen(o => !o)}
                                className="btn-premium px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
                            >
                                ✏️ Edit Profile
                            </button>
                        </div>
                    </div>

                    {editOpen && (
                        <div className="rounded-2xl p-6 md:p-8"
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
                            <h3 className="text-lg font-extrabold mb-5"
                                style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                ✏️ Edit Profile
                            </h3>

                            {editSuccess && (
                                <div className="mb-5 px-4 py-3 rounded-xl text-xs font-semibold"
                                    style={{ background: 'rgba(5,150,105,0.1)', color: '#059669', border: '1px solid rgba(5,150,105,0.2)' }}>
                                    ✅ Profile updated successfully!
                                </div>
                            )}

                            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                                    <input
                                        type="text"
                                        className="input-premium"
                                        value={editForm.name}
                                        onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Phone Number</label>
                                    <input
                                        type="text"
                                        className="input-premium"
                                        value={editForm.phone}
                                        onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))}
                                        placeholder="018XXXXXXXX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Student Roll ID</label>
                                    <input
                                        type="text"
                                        className="input-premium"
                                        value={editForm.roll}
                                        onChange={e => setEditForm(f => ({ ...f, roll: e.target.value }))}
                                        placeholder="e.g. C241143"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Department</label>
                                    <select
                                        className="input-premium bg-transparent"
                                        value={editForm.department}
                                        onChange={e => setEditForm(f => ({ ...f, department: e.target.value }))}
                                        required
                                    >
                                        {departments.map(d => (
                                            <option key={d} value={d} className="bg-slate-900 text-white">{d}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-end gap-3">
                                    <button type="submit" disabled={editLoading}
                                        className="btn-premium flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer">
                                        {editLoading
                                            ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                                            : '💾 Save Changes'
                                        }
                                    </button>
                                    <button type="button" onClick={() => setEditOpen(false)}
                                        className="py-3 px-4 rounded-xl font-semibold text-sm cursor-pointer"
                                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div>
                        <h2 className="text-2xl font-extrabold mb-6"
                            style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                            My Tickets &amp; Registrations
                        </h2>

                        {registrations.length === 0 ? (
                            <div className="text-center py-16 rounded-2xl"
                                style={{ border: '2px dashed var(--border-color)', background: 'var(--bg-secondary)' }}>
                                <span className="text-5xl block mb-4">🎟️</span>
                                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                    No Registrations Yet
                                </h3>
                                <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: 'var(--text-muted)' }}>
                                    You haven't registered for any events. Browse upcoming events to join!
                                </p>
                                <Link to="/events" className="btn-premium px-6 py-2.5 text-sm rounded-xl inline-block">
                                    Browse Events
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {registrations.map(reg => {
                                    const isPending = reg.paymentStatus === 'Pending';
                                    const isRejected = reg.paymentStatus === 'Rejected';
                                    const isPaid = reg.paymentStatus === 'Paid' || reg.paymentStatus === 'Free';
                                    const statusClass = isPaid ? 'badge-paid' : isPending ? 'badge-pending' : 'badge-rejected';

                                    return (
                                        <div key={reg._id} className="surface-card p-5 flex flex-col justify-between gap-4">
                                            <div className="flex justify-between items-start gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider"
                                                        style={{ color: 'var(--accent)' }}>
                                                        {reg.category || 'Event'}
                                                    </span>
                                                    <h3 className="text-base font-bold mt-1 line-clamp-1"
                                                        style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                                        {reg.eventName}
                                                    </h3>
                                                    <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>
                                                        📅 {new Date(reg.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {reg.eventTime || 'TBA'}
                                                    </p>
                                                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>📍 {reg.eventVenue}</p>
                                                </div>
                                                <span className={statusClass}>{reg.paymentStatus}</span>
                                            </div>

                                            <div className="flex items-center justify-between pt-3"
                                                style={{ borderTop: '1px solid var(--border-color)' }}>
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-wider font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>
                                                        Registration ID
                                                    </p>
                                                    <p className="font-mono text-xs truncate max-w-[140px]" style={{ color: 'var(--text-secondary)' }}>
                                                        {reg._id}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    {isPending && reg.price > 0 && (
                                                        <Link to={`/payment/${reg._id}`}
                                                            className="px-4 py-2 rounded-lg text-xs font-semibold"
                                                            style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d' }}>
                                                            Pay Now
                                                        </Link>
                                                    )}
                                                    {isPaid && (
                                                        <button onClick={() => setActiveTicket(reg)}
                                                            className="btn-premium px-4 py-2 text-xs rounded-lg">
                                                            🎫 View Pass
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {activeTicket && (
                <TicketPDF
                    registration={activeTicket}
                    profile={profile}
                    onClose={() => setActiveTicket(null)}
                />
            )}
        </div>
    );
};

export default UserDashboard;
