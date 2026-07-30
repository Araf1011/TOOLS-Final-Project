import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { AuthContext } from '../../Providers/AuthProvider';
import API_URL from '../../config';

const EventRegistration = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [event, setEvent] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) return;

        const eventPromise = fetch(`${API_URL}/events/${id}`)
            .then(res => res.json())
            .then(data => setEvent(data))
            .catch(err => console.error("Error fetching event details:", err));

        const profilePromise = fetch(`${API_URL}/users/${encodeURIComponent(user.email)}`)
            .then(res => res.json())
            .then(data => setProfile(data))
            .catch(err => console.error("Error fetching user profile:", err));

        Promise.all([eventPromise, profilePromise])
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [id, user]);

    const handleRegistrationSubmit = (e) => {
        e.preventDefault();
        setRegistering(true);
        setError('');

        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const roll = e.target.roll.value;
        const department = e.target.department.value;

        const registrationData = {
            eventId: event._id,
            eventName: event.name,
            eventDate: event.date,
            eventTime: event.time,
            eventVenue: event.venue,
            category: event.category,
            price: event.price,
            userName: name,
            userEmail: email,
            phone,
            roll,
            department
        };

        fetch(`${API_URL}/registrations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(data => { throw new Error(data.message || 'Registration failed'); });
                }
                return res.json();
            })
            .then(data => {
                setRegistering(false);
                if (data.insertedId) {
                    if (event.price > 0) {
                        navigate(`/payment/${data.insertedId}`);
                    } else {
                        navigate('/dashboard');
                    }
                } else {
                    setError('Registration failed. Please try again.');
                }
            })
            .catch(err => {
                console.error("Error registering for event:", err);
                setRegistering(false);
                setError(err.message || 'Network error. Failed to submit registration.');
            });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
                <div className="w-10 h-10 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4"
                style={{ background: 'var(--bg-primary)' }}>
                <span className="text-6xl mb-4">⚠️</span>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                    Event Info Missing
                </h2>
                <p className="mt-2" style={{ color: 'var(--text-muted)' }}>Cannot register. The event could not be found.</p>
                <Link to="/events" className="btn-premium px-6 py-2.5 rounded-xl mt-6">Back to Events</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 md:px-8 page-fade" style={{ background: 'var(--bg-primary)', paddingTop: '6rem' }}>
            <div className="max-w-xl mx-auto rounded-3xl p-6 md:p-8"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>

                <div className="text-center mb-6">
                    <span className="text-4xl block mb-2">🎟️</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold"
                        style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                        Event Registration
                    </h2>
                    <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>
                        You are registering for:{' '}
                        <span className="font-bold" style={{ color: 'var(--accent)' }}>{event.name}</span>
                    </p>
                </div>

                {error && (
                    <div className="mb-5 px-4 py-3 rounded-xl text-xs font-semibold"
                        style={{ background: 'rgba(220,38,38,0.1)', color: 'var(--error-color)', border: '1px solid rgba(220,38,38,0.2)' }}>
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleRegistrationSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="input-premium"
                            defaultValue={profile?.name || user?.displayName || ''}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input-premium"
                            defaultValue={user?.email || ''}
                            readOnly
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="e.g. 018XXXXXXXX"
                            className="input-premium"
                            defaultValue={profile?.phone || ''}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Roll/ID Number</label>
                            <input
                                type="text"
                                name="roll"
                                placeholder="Roll/ID Number"
                                className="input-premium"
                                defaultValue={profile?.roll || ''}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Department</label>
                            <select
                                name="department"
                                className="input-premium bg-transparent"
                                defaultValue={profile?.department || 'CSE'}
                                required
                            >
                                <option value="CSE" className="bg-slate-900 text-white">CSE</option>
                                <option value="EEE" className="bg-slate-900 text-white">EEE</option>
                                <option value="BBA" className="bg-slate-900 text-white">BBA</option>
                                <option value="Pharmacy" className="bg-slate-900 text-white">Pharmacy</option>
                                <option value="English" className="bg-slate-900 text-white">English</option>
                                <option value="Law" className="bg-slate-900 text-white">Law</option>
                            </select>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl flex items-center justify-between border my-2"
                        style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Event Ticket price</span>
                            <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                                {event.price > 0 ? `৳ ${event.price}` : 'FREE'}
                            </span>
                        </div>
                        {event.price > 0 && (
                            <span className="text-[10px] px-2 py-1 rounded-lg font-bold"
                                style={{ background: 'rgba(255,190,145,0.1)', color: 'var(--accent)', border: '1px solid rgba(255,190,145,0.2)' }}>
                                Mobile Payment Required
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn-premium w-full py-3 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center gap-2 cursor-pointer"
                        disabled={registering}
                    >
                        {registering
                            ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Registering...</>
                            : event.price > 0 ? 'Proceed to Payment 💳' : 'Confirm Registration 🎟️'
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EventRegistration;
