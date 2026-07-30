import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import API_URL from '../../config';
import { CLUBS } from '../Clubs/Clubs';

const AddEvent = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleAddEvent = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        const name = e.target.name.value;
        const description = e.target.description.value;
        const date = e.target.date.value;
        const time = e.target.time.value;
        const venue = e.target.venue.value;
        const category = e.target.category.value;
        const clubId = e.target.clubId.value;
        const price = e.target.price.value;
        const seatsTotal = e.target.seatsTotal.value;
        const image = e.target.image.value;

        const eventData = {
            name,
            description,
            date,
            time,
            venue,
            category,
            clubId: clubId || null,
            price: parseFloat(price),
            seatsTotal: parseInt(seatsTotal),
            seatsBooked: 0,
            image
        };

        fetch(`${API_URL}/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
        })
            .then(res => res.json())
            .then(data => {
                setSubmitting(false);
                if (data.insertedId) {
                    alert("Event Created Successfully");
                    navigate('/admin/events');
                } else {
                    setError('Failed to create event. Please try again.');
                }
            })
            .catch(err => {
                console.error("Error creating event:", err);
                setSubmitting(false);
                setError('Something went wrong. Network error.');
            });
    };

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }} className="page-fade">

            <div className="relative overflow-hidden" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="blob blob-1" style={{ opacity: 0.18, width: 400, height: 400 }} />
                <div className="blob blob-2" style={{ opacity: 0.12, width: 300, height: 300 }} />
                <div className="section-container relative z-10" style={{ paddingTop: 'calc(var(--nav-h) + 1.5rem)', paddingBottom: '2rem' }}>
                    <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                        <Link to="/admin" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Dashboard</Link>
                        <span style={{ margin: '0 0.4rem' }}>›</span>
                        <Link to="/admin/events" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Manage Events</Link>
                        <span style={{ margin: '0 0.4rem' }}>›</span>
                        <span>Add Event</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold"
                                style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                Create University Event
                            </h1>
                            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                                Publish a new event, seminar, or workshop for students.
                            </p>
                        </div>
                        <span className="section-badge self-start">➕ New Event</span>
                    </div>
                </div>
            </div>

            <div className="section-container py-10">
                <div className="max-w-2xl mx-auto rounded-3xl p-6 md:p-8"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>

                {error && (
                    <div className="mb-4 px-4 py-3 rounded-xl text-xs font-semibold"
                        style={{ background: 'rgba(220,38,38,0.1)', color: 'var(--error-color)', border: '1px solid rgba(220,38,38,0.2)' }}>
                        <span>⚠️ {error}</span>
                    </div>
                )}

                <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Event Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. Annual Cultural Festival 2026"
                            className="input-premium"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Category</label>
                        <select name="category" className="input-premium bg-transparent" required>
                            <option value="Seminar" className="bg-slate-900 text-white">Seminar</option>
                            <option value="Workshop" className="bg-slate-900 text-white">Workshop</option>
                            <option value="Cultural" className="bg-slate-900 text-white">Cultural</option>
                            <option value="Sports" className="bg-slate-900 text-white">Sports</option>
                            <option value="Competition" className="bg-slate-900 text-white">Competition</option>
                            <option value="Other" className="bg-slate-900 text-white">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>🏛️ Organizing Club (Optional)</label>
                        <select name="clubId" className="input-premium bg-transparent">
                            <option value="" className="bg-slate-900 text-white">— General / No Specific Club —</option>
                            {CLUBS.map(club => (
                                <option key={club.id} value={club.id} className="bg-slate-900 text-white">
                                    {club.shortName} — {club.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Venue</label>
                        <input
                            type="text"
                            name="venue"
                            placeholder="e.g. Auditorium / Room 302"
                            className="input-premium"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Date</label>
                        <input
                            type="date"
                            name="date"
                            className="input-premium"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Time</label>
                        <input
                            type="text"
                            name="time"
                            placeholder="e.g. 10:00 AM - 1:00 PM"
                            className="input-premium"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Ticket Price (৳) (0 for Free)</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="0"
                            className="input-premium"
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Total Seats Available</label>
                        <input
                            type="number"
                            name="seatsTotal"
                            placeholder="100"
                            className="input-premium"
                            min="1"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Event Banner Image URL</label>
                        <input
                            type="url"
                            name="image"
                            placeholder="https://images.unsplash.com/photo-..."
                            className="input-premium"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Event Description</label>
                        <textarea
                            name="description"
                            rows="5"
                            placeholder="Provide details about the schedule, speaker, rules..."
                            className="input-premium resize-none"
                            style={{ paddingTop: '0.65rem' }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-premium w-full py-3 rounded-xl font-semibold text-sm md:col-span-2 mt-4 flex items-center justify-center gap-2 cursor-pointer"
                        disabled={submitting}
                    >
                        {submitting
                            ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating Event...</>
                            : 'Create & Publish Event 📅'
                        }
                    </button>
                </form>
            </div>
        </div>
    </div>
);
};

export default AddEvent;
