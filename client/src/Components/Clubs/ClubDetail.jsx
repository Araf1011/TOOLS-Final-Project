import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { CLUBS } from './Clubs';
import API_URL from '../../config';

import EventCard from '../Events/EventCard';

const ClubDetail = () => {
    const { clubId } = useParams();
    const club = CLUBS.find(c => c.id === clubId);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!club) { setLoading(false); return; }
        fetch(`${API_URL}/events`)
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const clubEvents = data.filter(e => e.clubId === club.id);
                    setEvents(clubEvents);
                } else {
                    setEvents([]);
                }
                setLoading(false);
            })
            .catch(() => {
                setEvents([]);
                setLoading(false);
            });
    }, [club]);

    if (!club) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', background: 'var(--bg-primary)' }}>
                <div style={{ fontSize: '4rem' }}>🏛️</div>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)', fontSize: '1.5rem' }}>Club Not Found</h2>
                <Link to="/clubs" className="btn-premium" style={{ padding: '0.6rem 1.5rem', borderRadius: '0.75rem', textDecoration: 'none' }}>
                    ← Back to Clubs
                </Link>
            </div>
        );
    }

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

            <section style={{
                background: 'linear-gradient(135deg, #1a0d2e 0%, #0f1a38 60%, #0a1628 100%)',
                padding: 'calc(var(--nav-h) + 4rem) 0 4rem',
                position: 'relative',
                overflow: 'hidden',
            }}>

                <div style={{
                    position: 'absolute', top: -120, left: -120,
                    width: 500, height: 500, borderRadius: '50%',
                    background: club.color,
                    filter: 'blur(100px)',
                    opacity: 0.12,
                    pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute', bottom: -80, right: -80,
                    width: 350, height: 350, borderRadius: '50%',
                    background: '#CFEBFF',
                    filter: 'blur(90px)',
                    opacity: 0.08,
                    pointerEvents: 'none',
                }} />

                <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.8rem' }}>
                        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
                        <span style={{ color: 'var(--text-muted)' }}>›</span>
                        <Link to="/clubs" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Clubs</Link>
                        <span style={{ color: 'var(--text-muted)' }}>›</span>
                        <span style={{ color: '#FFBE91' }}>{club.shortName}</span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>

                        <div style={{
                            width: 100, height: 100,
                            borderRadius: '22px',
                            background: club.logo ? 'transparent' : `linear-gradient(135deg, ${club.color}, ${club.color}99)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: `0 8px 32px ${club.color}40`,
                            border: `2px solid ${club.color}33`,
                            overflow: 'hidden',
                        }}>
                            {club.logo ? (
                                <img src={club.logo} alt={club.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span style={{
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    fontWeight: 800,
                                    fontSize: '1.5rem',
                                    color: '#1a0800',
                                    letterSpacing: '-0.03em',
                                }}>
                                    {club.shortName}
                                </span>
                            )}
                        </div>

                        <div style={{ flex: 1 }}>
                            <span style={{
                                display: 'inline-block',
                                padding: '3px 12px',
                                borderRadius: '999px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                fontFamily: 'Space Grotesk, sans-serif',
                                textTransform: 'uppercase',
                                letterSpacing: '0.07em',
                                background: `${club.color}18`,
                                color: club.color,
                                border: `1px solid ${club.color}35`,
                                marginBottom: '0.6rem',
                            }}>
                                {club.category}
                            </span>
                            <h1 style={{
                                fontFamily: 'Space Grotesk, sans-serif',
                                fontWeight: 800,
                                fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
                                color: '#FFFCE1',
                                margin: '0 0 0.4rem',
                                lineHeight: 1.1,
                            }}>
                                {club.name}
                            </h1>
                            <p style={{
                                fontFamily: 'Space Grotesk, sans-serif',
                                fontSize: '1rem',
                                fontWeight: 600,
                                color: club.color,
                                margin: '0 0 1.25rem',
                                fontStyle: 'italic',
                            }}>
                                "{club.tagline}"
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {[
                                    [`👥 ${club.members.toLocaleString()} Members`, club.color],
                                    [`📅 Est. ${club.founded}`, '#CFEBFF'],
                                    [`📋 ${events.length} Events`, '#FFDDB0'],
                                ].map(([label, col]) => (
                                    <span key={label} style={{
                                        padding: '0.35rem 0.85rem',
                                        borderRadius: '999px',
                                        fontSize: '0.78rem',
                                        fontWeight: 600,
                                        fontFamily: 'Space Grotesk, sans-serif',
                                        background: `${col}14`,
                                        color: col,
                                        border: `1px solid ${col}30`,
                                    }}>
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ padding: '3rem 0', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="section-container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2.5rem' }}>

                        <div>
                            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#FFBE91', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                                About the Club
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.75, margin: 0 }}>
                                {club.description}
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#FFBE91', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                                    Focus Areas
                                </h2>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                    {club.tags.map(tag => (
                                        <span key={tag} style={{
                                            padding: '0.3rem 0.75rem',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            background: `${club.color}14`,
                                            color: club.color,
                                            border: `1px solid ${club.color}30`,
                                            fontFamily: 'Inter, sans-serif',
                                        }}>#{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#FFBE91', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                                    Find Us Online
                                </h2>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {Object.entries(club.social).map(([platform, url]) => (
                                        <a key={platform} href={url}
                                            style={{
                                                padding: '0.35rem 1rem',
                                                borderRadius: '0.6rem',
                                                fontSize: '0.78rem',
                                                fontWeight: 600,
                                                fontFamily: 'Space Grotesk, sans-serif',
                                                background: 'rgba(255,255,255,0.06)',
                                                border: '1px solid var(--border-color)',
                                                color: 'var(--text-secondary)',
                                                textDecoration: 'none',
                                                textTransform: 'capitalize',
                                                transition: 'all 0.2s',
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.color = '#FFBE91'; e.currentTarget.style.borderColor = 'rgba(255,190,145,0.3)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                                        >
                                            {platform}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ padding: '4rem 0' }}>
                <div className="section-container">
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <span className="section-badge" style={{ marginBottom: '0.5rem', display: 'inline-flex' }}>📋 Events</span>
                            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)', fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>
                                {club.shortName} Events
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                All events organized by {club.name}
                            </p>
                        </div>
                        <Link to="/events" style={{ color: '#FFBE91', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', fontFamily: 'Space Grotesk, sans-serif' }}>
                            Browse All Events →
                        </Link>
                    </div>

                    {loading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ height: 320, borderRadius: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', animation: 'pulse 1.5s infinite' }} />
                            ))}
                        </div>
                    ) : events.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '5rem 2rem',
                            border: `2px dashed ${club.color}30`,
                            borderRadius: '1.5rem',
                            background: `${club.color}06`,
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No Events Yet</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                                {club.name} hasn't posted any events yet. Check back soon!
                            </p>
                            <Link to="/events" className="btn-premium" style={{ padding: '0.6rem 1.5rem', borderRadius: '0.75rem', textDecoration: 'none', display: 'inline-block' }}>
                                Browse All Events
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {events.map(event => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <div className="section-container" style={{ paddingBottom: '4rem' }}>
                <Link to="/clubs"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.65rem 1.5rem',
                        borderRadius: '0.75rem',
                        background: 'rgba(255,190,145,0.10)',
                        border: '1px solid rgba(255,190,145,0.25)',
                        color: '#FFBE91',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        fontFamily: 'Space Grotesk, sans-serif',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,190,145,0.18)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,190,145,0.10)'}
                >
                    ← Back to All Clubs
                </Link>
            </div>
        </div>
    );
};

export default ClubDetail;