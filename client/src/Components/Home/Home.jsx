import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import EventCarousel from './EventCarousel';
import EventCard from '../Events/EventCard';
import iiucHero from '../../assets/IIUC.webp';
import { CLUBS } from '../Clubs/Clubs';
import API_URL from '../../config';

const features = [
    {
        icon: '🎟️',
        title: 'Easy Digital Registration',
        desc: 'Join any campus event in seconds. Receive a digital confirmation instantly after registering.',
        color: '#FFBE91',
        bg: 'rgba(255,190,145,0.10)',
    },
    {
        icon: '📱',
        title: 'QR Ticket & Verification',
        desc: 'Download a secure QR pass for contactless, fast check-in at the event gate.',
        color: '#CFEBFF',
        bg: 'rgba(207,235,255,0.10)',
    },
    {
        icon: '💳',
        title: 'Mobile Payments',
        desc: 'Pay via bKash or Nagad. Simply submit your transaction ID for quick admin approval.',
        color: '#FFDDB0',
        bg: 'rgba(255,221,176,0.10)',
    },
];

const Home = () => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [recentEvents, setRecentEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/events`)
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const now = new Date();
                    setUpcomingEvents(data.filter(e => new Date(e.date) > now));
                    setRecentEvents(data.slice(0, 3));
                } else {
                    setUpcomingEvents([]);
                    setRecentEvents([]);
                }
                setLoading(false);
            })
            .catch(() => {
                setUpcomingEvents([]);
                setRecentEvents([]);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ background: 'var(--bg-primary)' }}>

            <section
                className="relative"
                style={{
                    minHeight: '90vh',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundImage: `url(${iiucHero})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    backgroundRepeat: 'no-repeat',
                }}
            >

                <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, rgba(10,4,30,0.78) 0%, rgba(7,25,60,0.72) 50%, rgba(4,18,42,0.80) 100%)',
                }} />

                <div className="blob blob-1" style={{ opacity: 0.15 }} />
                <div className="blob blob-2" style={{ opacity: 0.12 }} />

                <div className="section-container relative z-10 py-20 md:py-28 w-full" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)' }}>
                    <div className="max-w-3xl mx-auto text-center page-fade">
                        <span className="section-badge mb-6 inline-flex" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', borderColor: 'rgba(255,255,255,0.25)' }}>
                            🎓 International Islamic University Chittagong
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
                            style={{ color: '#ffffff', fontFamily: 'Space Grotesk, sans-serif', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
                            Connect, Learn &amp; Grow<br />
                            at <span style={{
                                background: 'linear-gradient(90deg, #FFBE91, #FFDDB0, #CFEBFF)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>IIUC EventEra</span>
                        </h1>
                        <p className="text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
                            style={{ color: 'rgba(255,255,255,0.82)' }}>
                            Discover academic seminars, workshops, campus fests, and sports competitions.
                            Register online, download your QR pass, and be part of campus life.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/events" className="btn-premium px-8 py-3 text-base rounded-xl font-semibold">
                                Explore Events →
                            </Link>
                            <Link to="/about"
                                className="px-8 py-3 text-base rounded-xl font-semibold transition-all hover:-translate-y-1"
                                style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}>
                                Learn More
                            </Link>
                        </div>

                        <div className="flex flex-wrap justify-center gap-8 mt-14 pt-8"
                            style={{ borderTop: '1px solid rgba(255,190,145,0.2)' }}>
                            {[['50+', 'Events Hosted'], ['5,000+', 'Registrations'], ['10+', 'Departments']].map(([n, l]) => (
                                <div key={l} className="text-center">
                                    <div className="text-2xl md:text-3xl font-extrabold"
                                        style={{ fontFamily: 'Space Grotesk, sans-serif', background: 'linear-gradient(90deg, #FFBE91, #CFEBFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{n}</div>
                                    <div className="text-xs mt-1 font-medium uppercase tracking-wider"
                                        style={{ color: 'rgba(255,252,225,0.6)' }}>{l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20" style={{ background: 'var(--bg-secondary)' }}>
                <div className="section-container">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <span className="section-badge mb-2 inline-flex">🔥 Live Now</span>
                            <h2 className="text-2xl md:text-3xl font-extrabold"
                                style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                Upcoming Highlights
                            </h2>
                            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                                Don't miss these upcoming activities
                            </p>
                        </div>
                        <Link to="/events" className="hidden sm:flex items-center gap-1 text-sm font-semibold transition-colors"
                            style={{ color: '#FFBE91' }}>
                            View All →
                        </Link>
                    </div>

                    {loading ? (
                        <div className="w-full rounded-2xl animate-pulse"
                            style={{ height: '420px', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }} />
                    ) : (
                        <EventCarousel events={upcomingEvents} />
                    )}
                </div>
            </section>

            <section className="py-16 md:py-20" style={{ background: 'var(--bg-primary)' }}>
                <div className="section-container">
                    <div className="text-center mb-12">
                        <span className="section-badge mb-3 inline-flex">✨ Platform</span>
                        <h2 className="text-2xl md:text-3xl font-extrabold"
                            style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                            Why Use IIUC EventEra?
                        </h2>
                        <p className="text-sm mt-2 max-w-md mx-auto"
                            style={{ color: 'var(--text-muted)' }}>
                            Everything you need for seamless campus event participation
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <div key={i} className="surface-card p-8">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
                                    style={{ background: f.bg, border: `1px solid ${f.color}22` }}>
                                    {f.icon}
                                </div>
                                <h3 className="font-bold text-lg mb-2"
                                    style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                    {f.title}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20" style={{ background: 'var(--bg-secondary)' }}>
                <div className="section-container">
                    <div className="text-center mb-10">
                        <span className="section-badge mb-3 inline-flex">📌 Latest</span>
                        <h2 className="text-2xl md:text-3xl font-extrabold"
                            style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                            Latest Added Events
                        </h2>
                        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                            Explore some of our recently posted events
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="rounded-2xl animate-pulse h-80"
                                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }} />
                            ))}
                        </div>
                    ) : recentEvents.length === 0 ? (
                        <div className="text-center py-16 rounded-2xl"
                            style={{ border: '2px dashed var(--border-color)' }}>
                            <p style={{ color: 'var(--text-muted)' }}>No events yet. Check back later!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentEvents.map(event => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-10">
                        <Link to="/events" className="btn-premium px-8 py-3 text-sm rounded-xl font-semibold inline-block">
                            View All Events →
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20" style={{ background: 'var(--bg-secondary)' }}>
                <div className="section-container">
                    <div className="text-center mb-10">
                        <span className="section-badge mb-3 inline-flex">🏛️ Community</span>
                        <h2 className="text-2xl md:text-3xl font-extrabold"
                            style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                            Our Student Clubs
                        </h2>
                        <p className="text-sm mt-2 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
                            Find your tribe — IIUC's clubs bring students together through shared passions
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                        {CLUBS.slice(0, 4).map(club => (
                            <Link key={club.id} to={`/clubs/${club.id}`} style={{ textDecoration: 'none' }}>
                                <div
                                    style={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '1rem',
                                        padding: '1.25rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.875rem',
                                        transition: 'all 0.25s ease',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = club.color + '50';
                                        e.currentTarget.style.background = club.bgGrad;
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                        e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.25)`;
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'var(--border-color)';
                                        e.currentTarget.style.background = 'var(--bg-card)';
                                        e.currentTarget.style.transform = 'none';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <div style={{
                                        width: 44, height: 44, borderRadius: '10px', flexShrink: 0,
                                        background: `linear-gradient(135deg, ${club.color}, ${club.color}aa)`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: `0 4px 12px ${club.color}35`,
                                    }}>
                                        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '0.7rem', color: '#1a0800' }}>{club.shortName}</span>
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {club.name}
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: club.color, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
                                            {club.members} members
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link to="/clubs" className="btn-premium px-8 py-3 text-sm rounded-xl font-semibold inline-block">
                            Explore All Clubs →
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20" style={{ background: 'var(--bg-primary)' }}>
                <div className="section-container">
                    <div className="rounded-3xl text-white text-center px-6 py-14 relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #1a0d2e 0%, #0f1a38 50%, #0a1628 100%)', border: '1px solid rgba(255,190,145,0.15)' }}>
                        <div className="blob blob-1 opacity-25" style={{ width: '300px', height: '300px', top: '-80px', left: '-60px' }} />
                        <div className="blob blob-2 opacity-25" style={{ width: '240px', height: '240px', bottom: '-60px', right: '-40px', animationDelay: '-4s' }} />
                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-4xl font-extrabold mb-4"
                                style={{ fontFamily: 'Space Grotesk, sans-serif', background: 'linear-gradient(90deg, #FFBE91, #FFDDB0, #CFEBFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                Ready to Join Campus Life?
                            </h2>
                            <p style={{ color: 'rgba(255,252,225,0.75)', fontSize: '0.95rem', marginBottom: '2rem', maxWidth: '36rem', margin: '0 auto 2rem' }}>
                                Create your account today and start registering for events instantly.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link to="/register"
                                    className="font-bold px-8 py-3 rounded-xl text-sm transition-all hover:shadow-xl hover:-translate-y-1 btn-premium">
                                    Get Started Free
                                </Link>
                                <Link to="/events"
                                    className="px-8 py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-1"
                                    style={{ background: 'rgba(207,235,255,0.10)', color: '#CFEBFF', border: '1px solid rgba(207,235,255,0.3)' }}>
                                    Browse Events
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
