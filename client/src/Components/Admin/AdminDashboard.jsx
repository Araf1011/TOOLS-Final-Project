import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Providers/AuthProvider';
import API_URL from '../../config';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalEvents: 0, totalRegistrations: 0, totalUsers: 0, pendingPayments: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/stats`)
            .then(r => r.json())
            .then(data => { setStats(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid rgba(255,190,145,0.2)', borderTopColor: '#FFBE91', animation: 'spin 0.8s linear infinite' }} />
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Loading dashboard…</p>
                </div>
            </div>
        );
    }

    const statCards = [
        {
            icon: '📅', label: 'Total Events', value: stats.totalEvents,
            color: '#FFBE91', glow: 'rgba(255,190,145,0.25)',
            bg: 'linear-gradient(135deg, rgba(255,190,145,0.12), rgba(255,190,145,0.04))',
            border: 'rgba(255,190,145,0.25)', trend: '+2 this week',
        },
        {
            icon: '👥', label: 'Total Users', value: stats.totalUsers,
            color: '#CFEBFF', glow: 'rgba(207,235,255,0.25)',
            bg: 'linear-gradient(135deg, rgba(207,235,255,0.12), rgba(207,235,255,0.04))',
            border: 'rgba(207,235,255,0.25)', trend: 'Active accounts',
        },
        {
            icon: '🎟️', label: 'Registrations', value: stats.totalRegistrations,
            color: '#4ade80', glow: 'rgba(74,222,128,0.25)',
            bg: 'linear-gradient(135deg, rgba(74,222,128,0.12), rgba(74,222,128,0.04))',
            border: 'rgba(74,222,128,0.25)', trend: 'All time',
        },
        {
            icon: '⏳', label: 'Pending Payments', value: stats.pendingPayments,
            color: stats.pendingPayments > 0 ? '#fb923c' : '#4ade80',
            glow: stats.pendingPayments > 0 ? 'rgba(251,146,60,0.25)' : 'rgba(74,222,128,0.25)',
            bg: stats.pendingPayments > 0
                ? 'linear-gradient(135deg, rgba(251,146,60,0.12), rgba(251,146,60,0.04))'
                : 'linear-gradient(135deg, rgba(74,222,128,0.12), rgba(74,222,128,0.04))',
            border: stats.pendingPayments > 0 ? 'rgba(251,146,60,0.3)' : 'rgba(74,222,128,0.25)',
            trend: stats.pendingPayments > 0 ? 'Needs review' : 'All clear ✓',
        },
    ];

    const primaryActions = [
        {
            title: 'Manage Events', icon: '📅', desc: 'View, update, or delete existing university events.',
            link: '/admin/events', color: '#FFBE91',
            bg: 'linear-gradient(135deg, rgba(255,190,145,0.10), rgba(255,190,145,0.03))',
            border: 'rgba(255,190,145,0.25)', emoji: '→',
        },
        {
            title: 'Add New Event', icon: '➕', desc: 'Create and publish a new university event.',
            link: '/admin/add-event', color: '#4ade80',
            bg: 'linear-gradient(135deg, rgba(74,222,128,0.10), rgba(74,222,128,0.03))',
            border: 'rgba(74,222,128,0.25)', emoji: '→',
        },
        {
            title: 'Manage Registrations', icon: '🎟️', desc: 'View bookings and verify payment submissions.',
            link: '/admin/registrations', color: '#CFEBFF',
            bg: 'linear-gradient(135deg, rgba(207,235,255,0.10), rgba(207,235,255,0.03))',
            border: 'rgba(207,235,255,0.25)', emoji: '→',
        },
    ];

    const secondaryActions = [
        {
            title: 'QR Pass Scanner', icon: '📷', desc: 'Scan attendee QR codes to verify entry.',
            link: '/admin/qr-scanner', color: '#FFDDB0',
            bg: 'linear-gradient(135deg, rgba(255,221,176,0.10), rgba(255,221,176,0.03))',
            border: 'rgba(255,221,176,0.25)',
        },
        {
            title: 'Payment Numbers', icon: '💳', desc: 'Configure bKash and Nagad admin numbers.',
            link: '/admin/payments', color: '#a78bfa',
            bg: 'linear-gradient(135deg, rgba(167,139,250,0.10), rgba(167,139,250,0.03))',
            border: 'rgba(167,139,250,0.25)',
        },
        {
            title: 'Contact Messages', icon: '✉️', desc: 'Read and manage submitted contact messages.',
            link: '/admin/messages', color: '#f87171',
            bg: 'linear-gradient(135deg, rgba(248,113,113,0.10), rgba(248,113,113,0.03))',
            border: 'rgba(248,113,113,0.25)',
        },
    ];

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }} className="page-fade">

            <div style={{
                background: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border-color)',
                position: 'relative',
                overflow: 'hidden',
            }}>

                <div style={{
                    position: 'absolute', top: -80, right: -80,
                    width: 360, height: 360, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,190,145,0.12) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute', bottom: -60, left: '30%',
                    width: 260, height: 260, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(207,235,255,0.08) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div className="section-container" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #FFBE91, #FFDDB0)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.2rem', boxShadow: '0 4px 16px rgba(255,190,145,0.4)',
                                }}>⚙</div>
                                <span style={{
                                    fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                                    letterSpacing: '0.12em', color: '#FFBE91',
                                    fontFamily: 'Space Grotesk, sans-serif',
                                }}>Admin Control Panel</span>
                            </div>
                            <h1 style={{
                                fontFamily: 'Space Grotesk, sans-serif',
                                fontWeight: 800,
                                fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
                                color: 'var(--text-primary)',
                                margin: 0, lineHeight: 1.15,
                            }}>
                                Welcome back,{' '}
                                <span style={{
                                    background: 'linear-gradient(90deg, #FFBE91, #FFDDB0)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                }}>
                                    {user?.displayName?.split(' ')[0] || 'Admin'}
                                </span>
                            </h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.4rem' }}>
                                Here's an overview of your platform today.
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <Link to="/admin/add-event" style={{
                                padding: '0.65rem 1.4rem', borderRadius: '0.85rem',
                                background: 'linear-gradient(135deg, #FFBE91, #FFDDB0)',
                                color: '#1a0800', fontSize: '0.85rem', fontWeight: 700,
                                textDecoration: 'none', fontFamily: 'Space Grotesk, sans-serif',
                                boxShadow: '0 4px 18px rgba(255,190,145,0.35)',
                                transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
                                onMouseLeave={e => e.currentTarget.style.filter = 'none'}
                            >
                                ➕ New Event
                            </Link>
                            <Link to="/admin/registrations" style={{
                                padding: '0.65rem 1.4rem', borderRadius: '0.85rem',
                                background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                                color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600,
                                textDecoration: 'none', fontFamily: 'Space Grotesk, sans-serif',
                            }}>
                                🎟️ Registrations
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.25rem',
                }}>
                    {statCards.map(({ icon, label, value, color, glow, bg, border, trend }) => (
                        <div key={label} style={{
                            background: bg,
                            border: `1px solid ${border}`,
                            borderRadius: '1.25rem',
                            padding: '1.5rem',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>

                            <div style={{
                                position: 'absolute', top: -30, right: -30,
                                width: 100, height: 100, borderRadius: '50%',
                                background: `radial-gradient(circle, ${glow}, transparent 70%)`,
                                pointerEvents: 'none',
                            }} />
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem',
                            }}>
                                <span style={{
                                    width: 42, height: 42, borderRadius: '12px',
                                    background: `${color}18`,
                                    border: `1px solid ${color}30`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.2rem',
                                }}>{icon}</span>
                                <span style={{
                                    fontSize: '0.68rem', fontWeight: 700,
                                    color: color, background: `${color}15`,
                                    border: `1px solid ${color}25`,
                                    borderRadius: '999px', padding: '2px 8px',
                                    fontFamily: 'Space Grotesk, sans-serif',
                                }}>{trend}</span>
                            </div>
                            <p style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', margin: '0 0 0.25rem' }}>{label}</p>
                            <h3 style={{
                                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
                                fontSize: '2.25rem', color, margin: 0, lineHeight: 1,
                            }}>{value}</h3>
                        </div>
                    ))}
                </div>

                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>
                            Core Management
                        </h2>
                        <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                        {primaryActions.map((a) => (
                            <Link key={a.title} to={a.link} style={{
                                background: a.bg, border: `1px solid ${a.border}`,
                                borderRadius: '1.25rem', padding: '1.75rem',
                                textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '1rem',
                                transition: 'all 0.25s', position: 'relative', overflow: 'hidden',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.25), 0 0 0 1px ${a.color}20`; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{
                                        width: 48, height: 48, borderRadius: '14px',
                                        background: `${a.color}15`, border: `1px solid ${a.color}30`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.5rem',
                                    }}>{a.icon}</span>
                                    <span style={{
                                        width: 32, height: 32, borderRadius: '8px',
                                        background: `${a.color}12`, border: `1px solid ${a.color}25`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: a.color, fontWeight: 700, fontSize: '1rem',
                                    }}>→</span>
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', margin: '0 0 0.35rem' }}>
                                        {a.title}
                                    </h3>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.55 }}>{a.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>
                            Tools & Settings
                        </h2>
                        <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                        {secondaryActions.map((a) => (
                            <Link key={a.title} to={a.link} style={{
                                background: a.bg, border: `1px solid ${a.border}`,
                                borderRadius: '1rem', padding: '1.25rem 1.5rem',
                                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem',
                                transition: 'all 0.25s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 28px rgba(0,0,0,0.2)`; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <span style={{
                                    width: 44, height: 44, borderRadius: '12px', flexShrink: 0,
                                    background: `${a.color}15`, border: `1px solid ${a.color}30`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.3rem',
                                }}>{a.icon}</span>
                                <div>
                                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', margin: '0 0 0.2rem' }}>
                                        {a.title}
                                    </h3>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{a.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div style={{
                    background: 'linear-gradient(135deg, rgba(255,190,145,0.06), rgba(207,235,255,0.06))',
                    border: '1px solid var(--border-color)',
                    borderRadius: '1.25rem', padding: '1.5rem',
                    display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div>
                        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem', margin: '0 0 0.25rem' }}>
                            🚀 Quick Access
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>Jump directly to any section.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        {[
                            { to: '/admin/qr-scanner', label: '📷 QR Scanner' },
                            { to: '/admin/payments', label: '💳 Payment Config' },
                            { to: '/admin/messages', label: '✉️ Messages' },
                            { to: '/', label: '🌐 View Site' },
                        ].map(({ to, label }) => (
                            <Link key={to} to={to} style={{
                                padding: '0.5rem 1rem', borderRadius: '0.7rem',
                                background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                                color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600,
                                textDecoration: 'none', fontFamily: 'Space Grotesk, sans-serif',
                                transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,190,145,0.4)'; e.currentTarget.style.color = '#FFBE91'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                            >{label}</Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
