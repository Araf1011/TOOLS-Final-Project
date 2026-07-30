import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import EventCard from './EventCard';
import API_URL from '../../config';

const categories = ['All', 'Seminar', 'Workshop', 'Cultural', 'Sports', 'Competition', 'Other'];

const Events = () => {
    const loadedEvents = useLoaderData() || [];
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        if (loadedEvents && Array.isArray(loadedEvents) && loadedEvents.length > 0) {
            setEvents(loadedEvents);
            setLoading(false);
        } else {
            fetch(`${API_URL}/events`)
                .then(r => r.json())
                .then(data => {
                    setEvents(Array.isArray(data) ? data : []);
                    setLoading(false);
                })
                .catch(() => {
                    setEvents([]);
                    setLoading(false);
                });
        }
    }, [loadedEvents]);

    const filtered = events.filter(e => {
        const matchCat = activeCategory === 'All' || e.category === activeCategory;
        const q = searchQuery.toLowerCase();
        const matchSearch = e.name.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q) || e.category.toLowerCase().includes(q);
        return matchCat && matchSearch;
    });

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

            <div className="relative overflow-hidden" style={{
                background: 'var(--bg-secondary)',
                padding: 'calc(var(--nav-h) + 3rem) 0 3.5rem',
                borderBottom: '1px solid var(--border-color)',
            }}>
                <div className="blob blob-1" style={{ opacity: 0.18, width: 400, height: 400 }} />
                <div className="blob blob-2" style={{ opacity: 0.12, width: 300, height: 300 }} />
                <div className="section-container relative z-10 text-center">
                    <span className="section-badge mb-4 inline-flex">📅 All Events</span>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-3"
                        style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                        University{' '}<span style={{
                            background: 'linear-gradient(90deg, #FFBE91, #FFDDB0)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>Events</span>
                    </h1>
                    <p className="max-w-xl mx-auto text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
                        Explore all upcoming activities. Filter by category or search by name.
                    </p>
                </div>
            </div>

            <div className="section-container pb-24" style={{ paddingTop: '4rem' }}>

                <div className="rounded-2xl p-4 md:p-5 mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>

                    <div className="relative w-full md:max-w-xs">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base" style={{ color: 'var(--text-muted)' }}>🔍</span>
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="input-premium"
                            style={{ paddingLeft: '2.5rem' }}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                                style={activeCategory === cat
                                    ? { background: 'linear-gradient(135deg, #FFBE91, #FFDDB0)', color: '#1a0800', boxShadow: '0 2px 8px rgba(255,190,145,0.4)', fontFamily: 'Space Grotesk, sans-serif' }
                                    : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }
                                }
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {!loading && filtered.length > 0 && (
                    <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                        Showing <strong style={{ color: 'var(--accent)' }}>{filtered.length}</strong> event{filtered.length !== 1 ? 's' : ''}
                    </p>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="rounded-2xl animate-pulse h-80"
                                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }} />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-24 rounded-2xl"
                        style={{ border: '2px dashed var(--border-color)' }}>
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold mb-2"
                            style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                            No Events Found
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            Try a different search term or category.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map(event => <EventCard key={event._id} event={event} />)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
