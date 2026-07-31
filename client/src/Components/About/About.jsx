import React from 'react';
import iiucImage from '../../assets/IIUC.webp';
import arafImg from '../../assets/Araf.jpg';
import nirobImg from '../../assets/Nirob.webp';
import sanaImg from '../../assets/Sana.webp';
import tasinImg from '../../assets/Tasin.webp';

// Inline SVG icons — no extra dependencies
const GithubIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
);
const LinkedinIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

// Tech stack pill data — using devicon CDN SVG images
const TECH_ICONS = {
    React:      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',         label: 'React' },
    NodeJS:     { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',       label: 'Node.js' },
    MongoDB:    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',     label: 'MongoDB' },
    Express:    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',     label: 'Express' },
    Firebase:   { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',      label: 'Firebase' },
    TailwindCSS:{ src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', label: 'Tailwind' },
};

const teamMembers = [
    {
        name: 'MD AL Araf Hossain',
        roles: ['Frontend', 'Backend', 'Database'],
        image: arafImg,
        bio: 'Full-stack developer handling frontend design, backend APIs, and database architecture for IIUC EventEra.',
        color: '#7c3aed',
        stack: ['React', 'NodeJS', 'MongoDB', 'Express', 'TailwindCSS'],
        github: 'https://github.com/',
        linkedin: 'https://linkedin.com/',
    },
    {
        name: 'Foyez Ahammed Nirob',
        roles: ['Frontend'],
        image: nirobImg,
        bio: 'Crafting beautiful, responsive UI components and seamless user experiences across the platform.',
        color: '#0ea5e9',
        stack: ['React', 'TailwindCSS'],
        github: 'https://github.com/',
        linkedin: 'https://linkedin.com/',
    },
    {
        name: 'Sanayat Fahim',
        roles: ['Authentication'],
        image: sanaImg,
        bio: 'Implementing secure authentication flows, user management, and access control throughout the app.',
        color: '#10b981',
        stack: ['Firebase', 'React'],
        github: 'https://github.com/',
        linkedin: 'https://linkedin.com/',
    },
    {
        name: 'Tahsin Kamal',
        roles: ['Backend'],
        image: tasinImg,
        bio: 'Building robust server-side logic, REST APIs, and ensuring reliable data processing for all events.',
        color: '#f59e0b',
        stack: ['NodeJS', 'Express', 'MongoDB'],
        github: 'https://github.com/',
        linkedin: 'https://linkedin.com/',
    },
];

const About = () => {
    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

            <div className="relative overflow-hidden" style={{
                background: 'var(--bg-secondary)',
                padding: 'calc(var(--nav-h) + 3rem) 1rem 4rem',
                borderBottom: '1px solid var(--border-color)',
            }}>
                <div className="blob blob-1" style={{ opacity: 0.18, width: 400, height: 400 }} />
                <div className="blob blob-2" style={{ opacity: 0.12, width: 300, height: 300 }} />
                <div className="section-container relative z-10 text-center">
                    <span className="section-badge mb-4 inline-flex">🏛️ About Us</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-3"
                        style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                        About{' '}<span style={{
                            background: 'linear-gradient(90deg, #FFBE91, #FFDDB0)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>IIUC EventEra</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
                        The official university event management portal — streamlining campus life.
                    </p>
                </div>
            </div>

            <section className="py-16 md:py-20" style={{ background: 'var(--bg-secondary)' }}>
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <img
                                src={iiucImage}
                                alt="University Campus"
                                className="w-full rounded-2xl object-cover shadow-xl"
                                style={{ maxHeight: '380px', border: '1px solid var(--border-color)' }}
                            />

                            <div className="absolute -bottom-4 -right-4 rounded-2xl px-5 py-4 shadow-xl hidden md:block"
                                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                                <div className="text-2xl font-extrabold text-gradient">5,000+</div>
                                <div className="text-xs font-semibold uppercase tracking-wider mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                    Student Registrations
                                </div>
                            </div>
                        </div>

                        <div>
                            <span className="section-badge mb-4 inline-flex">🎯 Our Mission</span>
                            <h2 className="text-2xl md:text-3xl font-extrabold mb-5"
                                style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                Bridging Students &amp;<br />Campus Activities
                            </h2>
                            <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                                IIUC EventEra is the official, centralized hub for managing and participating in academic, cultural, and sports activities. Our mission is to bridge the gap between organizers and attendees, making campus life interactive and accessible.
                            </p>
                            <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                                By providing automated ticketing, live schedules, secure mobile payments, and seamless QR entry scanning, we make student engagement simple and hassle-free.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {[['50+', 'Events Hosted'], ['5,000+', 'Registrations']].map(([n, l]) => (
                                    <div key={l} className="stat-card text-center">
                                        <div className="text-3xl font-extrabold text-gradient mb-1"
                                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{n}</div>
                                        <div className="text-xs uppercase font-semibold tracking-wider" style={{ color: 'var(--text-muted)' }}>{l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20" style={{ background: 'var(--bg-primary)' }}>
                <div className="section-container">
                    <div className="text-center mb-12">
                        <span className="section-badge mb-3 inline-flex">💡 Values</span>
                        <h2 className="text-2xl md:text-3xl font-extrabold"
                            style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                            What We Stand For
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: '🎯', title: 'Accessibility', desc: 'Open to every student across all departments.' },
                            { icon: '🔒', title: 'Security', desc: 'QR-verified ticketing and secure digital payments.' },
                            { icon: '⚡', title: 'Speed', desc: 'Instant registration, instant confirmation.' },
                            { icon: '🤝', title: 'Community', desc: 'Building campus bonds through shared experiences.' },
                        ].map((v, i) => (
                            <div key={i} className="surface-card p-6 text-center">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4"
                                    style={{ background: 'var(--accent-light)' }}>
                                    {v.icon}
                                </div>
                                <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                    {v.title}
                                </h3>
                                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20" style={{ background: 'var(--bg-secondary)' }}>
                <div className="section-container">
                    <div className="text-center mb-12">
                        <span className="section-badge mb-3 inline-flex">👥 Team</span>
                        <h2 className="text-2xl md:text-3xl font-extrabold"
                            style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                            Behind The WEB
                        </h2>
                        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>The dedicated team driving our events forward</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((m, i) => (
                            <div key={i} style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '1.25rem',
                                boxShadow: 'var(--shadow-sm)',
                                transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '2rem 1.25rem 1.5rem',
                                textAlign: 'center',
                            }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = `var(--shadow-lg), 0 0 24px ${m.color}22`;
                                    e.currentTarget.style.background = 'var(--bg-card-hover)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                    e.currentTarget.style.background = 'var(--bg-card)';
                                }}
                            >
                                {/* Accent top bar */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0,
                                    height: '3px',
                                    background: `linear-gradient(90deg, ${m.color}cc, ${m.color}44)`,
                                    borderRadius: '1.25rem 1.25rem 0 0',
                                }} />

                                {/* Avatar */}
                                <div style={{
                                    width: 144, height: 144,
                                    borderRadius: '50%',
                                    padding: '3px',
                                    background: `linear-gradient(135deg, ${m.color}99, ${m.color}33)`,
                                    marginBottom: '1rem',
                                    flexShrink: 0,
                                }}>
                                    <img
                                        src={m.image}
                                        alt={m.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            objectPosition: 'top',
                                            display: 'block',
                                            background: 'var(--bg-card)',
                                        }}
                                    />
                                </div>

                                {/* Name */}
                                <h3 style={{
                                    color: 'var(--text-primary)',
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    marginBottom: '0.5rem',
                                    lineHeight: 1.3,
                                }}>{m.name}</h3>

                                {/* Role badges */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.35rem', marginBottom: '0.875rem' }}>
                                    {m.roles.map((role) => (
                                        <span key={role} style={{
                                            background: `${m.color}15`,
                                            color: m.color,
                                            border: `1px solid ${m.color}40`,
                                            borderRadius: '999px',
                                            fontSize: '0.62rem',
                                            fontWeight: 700,
                                            padding: '2px 9px',
                                            letterSpacing: '0.07em',
                                            textTransform: 'uppercase',
                                            fontFamily: 'Space Grotesk, sans-serif',
                                        }}>{role}</span>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div style={{
                                    width: '32px', height: '1px',
                                    background: `linear-gradient(90deg, transparent, ${m.color}60, transparent)`,
                                    marginBottom: '0.75rem',
                                }} />

                                {/* Bio */}
                                <p style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '0.775rem',
                                    lineHeight: 1.65,
                                    marginBottom: '1rem',
                                }}>{m.bio}</p>

                                {/* Tech Stack Icons */}
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    gap: '0.4rem',
                                    marginBottom: '1.1rem',
                                }}>
                                    {m.stack.map((tech) => {
                                        const t = TECH_ICONS[tech];
                                        return (
                                            <div key={tech} title={t.label} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.3rem',
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid var(--border-color)',
                                                borderRadius: '999px',
                                                padding: '3px 8px 3px 4px',
                                                transition: 'background 0.2s, border-color 0.2s',
                                            }}
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.background = `${m.color}15`;
                                                    e.currentTarget.style.borderColor = `${m.color}50`;
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                                    e.currentTarget.style.borderColor = 'var(--border-color)';
                                                }}
                                            >
                                                <img src={t.src} alt={t.label} width={14} height={14}
                                                    style={{ display: 'block', flexShrink: 0 }} />
                                                <span style={{
                                                    fontSize: '0.6rem',
                                                    fontWeight: 600,
                                                    color: 'var(--text-secondary)',
                                                    fontFamily: 'Space Grotesk, sans-serif',
                                                    letterSpacing: '0.04em',
                                                    whiteSpace: 'nowrap',
                                                }}>{t.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Social Links */}
                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: 'auto' }}>
                                    <a href={m.github} target="_blank" rel="noopener noreferrer"
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            width: 34, height: 34, borderRadius: '0.6rem',
                                            background: 'rgba(255,255,255,0.06)',
                                            border: '1px solid var(--border-color)',
                                            color: 'var(--text-secondary)',
                                            textDecoration: 'none',
                                            transition: 'all 0.2s ease',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.background = `${m.color}20`;
                                            e.currentTarget.style.borderColor = `${m.color}60`;
                                            e.currentTarget.style.color = m.color;
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                            e.currentTarget.style.borderColor = 'var(--border-color)';
                                            e.currentTarget.style.color = 'var(--text-secondary)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <GithubIcon />
                                    </a>
                                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            width: 34, height: 34, borderRadius: '0.6rem',
                                            background: 'rgba(255,255,255,0.06)',
                                            border: '1px solid var(--border-color)',
                                            color: 'var(--text-secondary)',
                                            textDecoration: 'none',
                                            transition: 'all 0.2s ease',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.background = `${m.color}20`;
                                            e.currentTarget.style.borderColor = `${m.color}60`;
                                            e.currentTarget.style.color = m.color;
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                            e.currentTarget.style.borderColor = 'var(--border-color)';
                                            e.currentTarget.style.color = 'var(--text-secondary)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <LinkedinIcon />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
