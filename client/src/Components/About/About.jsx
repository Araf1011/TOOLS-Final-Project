import React from 'react';
import iiucImage from '../../assets/IIUC.webp';

const teamMembers = [
    {
        name: 'MD AL Araf Hossain',
        role: 'Student',
        image: 'https://ui-avatars.com/api/?name=Muhammad+Kamruzzaman&background=7c3aed&color=fff&size=128',
        bio: 'Guiding and coordinating institutional events to foster academic and cultural enrichment across the university.',
        color: '#7c3aed',
    },
    {
        name: 'Tahsin Kamal',
        role: 'Student',
        image: 'https://ui-avatars.com/api/?name=Tahmid+Hasan&background=0ea5e9&color=fff&size=128',
        bio: 'Computer Science senior specializing in operations management and digital event scheduling.',
        color: '#0ea5e9',
    },
    {
        name: 'Foyez Ahammed Nirob',
        role: 'Student',
        image: 'https://ui-avatars.com/api/?name=Nusrat+Jahan&background=f59e0b&color=fff&size=128',
        bio: 'Managing communications and outreach to establish dynamic student partnerships.',
        color: '#f59e0b',
    },
    {
        name: 'Sanayat Fahim',
        role: 'Student',
        image: 'https://ui-avatars.com/api/?name=Sanayat+Fahim&background=f59e0b&color=fff&size=128',
        bio: 'Managing communications and outreach to establish dynamic student partnerships.',
        color: '#f59e0b',
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
                            Our Organizing Committee
                        </h2>
                        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>The dedicated team driving our events forward</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teamMembers.map((m, i) => (
                            <div key={i} className="surface-card p-8 text-center flex flex-col items-center gap-4">
                                <div className="relative">
                                    <img src={m.image} alt={m.name}
                                        className="w-20 h-20 rounded-full object-cover"
                                        style={{ outline: `3px solid ${m.color}40`, outlineOffset: '4px' }} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                        {m.name}
                                    </h3>
                                    <p className="text-xs font-semibold mt-0.5" style={{ color: m.color }}>{m.role}</p>
                                    <p className="text-xs mt-3 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{m.bio}</p>
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