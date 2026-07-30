import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import API_URL from '../../config';

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/events`)
            .then(res => res.json())
            .then(data => {
                setEvents(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading events:", err);
                setEvents([]);
                setLoading(false);
            });
    }, []);

    const handleDeleteEvent = (id) => {
        if (!window.confirm("Are you sure you want to delete this event? This will also affect any associated registrations.")) return;

        fetch(`${API_URL}/events/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    const remaining = events.filter(e => e._id !== id);
                    setEvents(remaining);
                } else {
                    alert("Failed to delete event.");
                }
            })
            .catch(err => {
                console.error("Error deleting event:", err);
                alert("Network error. Failed to delete event.");
            });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 animate-spin"
                        style={{ borderColor: 'var(--border-strong)', borderTopColor: 'var(--accent)' }} />
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading events…</p>
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
                        <span>Manage Events</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold"
                                style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                Manage Events
                            </h1>
                            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                                View, update, or remove university campus activities and schedules.
                            </p>
                        </div>
                        <Link to="/admin/add-event" className="btn-premium px-5 py-2.5 rounded-xl text-sm font-semibold self-start sm:self-center">
                            Add New Event ➕
                        </Link>
                    </div>
                </div>
            </div>

            <div className="section-container py-10">

                {events.length === 0 ? (
                    <div className="text-center py-20 rounded-3xl"
                        style={{ border: '2px dashed var(--border-color)', background: 'var(--bg-card)' }}>
                        <span className="text-5xl block mb-4">📅</span>
                        <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                            No Events Found
                        </h3>
                        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                            Get started by creating your first university event.
                        </p>
                        <Link to="/admin/add-event" className="btn-premium px-6 py-2.5 rounded-xl text-sm font-semibold mt-6 inline-block">
                            Create Event
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border shadow-md"
                        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                        <div className="overflow-x-auto">
                            <table className="premium-table">
                                <thead>
                                    <tr>
                                        <th>Event Name</th>
                                        <th>Category</th>
                                        <th>Date &amp; Time</th>
                                        <th>Venue</th>
                                        <th>Fee</th>
                                        <th>Seats Booked</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((event) => (
                                        <tr key={event._id}>
                                            <td className="font-bold max-w-[200px] truncate" style={{ color: 'var(--text-primary)' }}>
                                                {event.name}
                                            </td>
                                            <td>
                                                <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold"
                                                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                                                    {event.category}
                                                </span>
                                            </td>
                                            <td className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                                {new Date(event.date).toLocaleDateString()} at {event.time || 'TBD'}
                                            </td>
                                            <td className="text-xs truncate max-w-[150px]" style={{ color: 'var(--text-muted)' }}>
                                                {event.venue}
                                            </td>
                                            <td className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                                                {event.price > 0 ? `৳ ${event.price}` : <span style={{ color: '#059669', fontWeight: 'bold' }}>FREE</span>}
                                            </td>
                                            <td className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                                {event.seatsBooked} / {event.seatsTotal}
                                            </td>
                                            <td className="text-right">
                                                <div className="flex gap-2 justify-end">
                                                    <Link
                                                        to={`/admin/update-event/${event._id}`}
                                                        className="px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                                                        style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteEvent(event._id)}
                                                        className="px-2.5 py-1 text-xs font-semibold rounded-lg text-white cursor-pointer"
                                                        style={{ background: 'var(--error-color)' }}
                                                    >
                                                        Delete
                                                    </button>
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
        </div>
    );
};

export default ManageEvents;
