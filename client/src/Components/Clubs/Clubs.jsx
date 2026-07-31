import React, { useState } from 'react';
import { Link } from 'react-router';

export const CLUBS = [
    {
        id: 'iiuc-competitive-programming-society',
        name: 'IIUC Competitive Programming Society',
        shortName: 'ICPS',
        category: 'Technology',
        tagline: 'Code. Compete. Conquer.',
        description:
            'The official programming club of IIUC. We host competitive programming contests, hackathons, and workshops to sharpen your coding skills and prepare you for the global tech arena.',
        logo: null,
        color: '#FFBE91',
        bgGrad: 'linear-gradient(135deg, rgba(255,190,145,0.18), rgba(255,190,145,0.04))',
        members: 320,
        founded: '2012',
        tags: ['Competitive Programming', 'Hackathon', 'Workshops'],
        social: { facebook: '#', github: '#' },
    },
    {
        id: 'iiuc-computer-club',
        name: 'IIUC Computer Club',
        shortName: 'ICC',
        category: 'Academic',
        tagline: 'Think. Code. Innovate.',
        description:
            'Fostering critical thinking and programming skills. We organize coding competitions, workshops, and tech-focused events for students passionate about computer science and technology.',
        logo: null,
        color: '#CFEBFF',
        bgGrad: 'linear-gradient(135deg, rgba(207,235,255,0.18), rgba(207,235,255,0.04))',
        members: 180,
        founded: '2008',
        tags: ['Coding', 'Workshops', 'Tech'],
        social: { facebook: '#' },
    },
    {
        id: 'iiuc-business-club',
        name: 'IIUC Business Club',
        shortName: 'IBC',
        category: 'Business',
        tagline: 'Lead. Innovate. Succeed.',
        description:
            'Bridging theory and real-world business. We organize case competitions, workshops, and business-focused events for students passionate about business and entrepreneurship.',
        logo: null,
        color: '#FFDDB0',
        bgGrad: 'linear-gradient(135deg, rgba(255,221,176,0.18), rgba(255,221,176,0.04))',
        members: 210,
        founded: '2010',
        tags: ['STEM', 'Research', 'Science Fair'],
        social: { facebook: '#' },
    },
    {
        id: 'iiuc-eb-club',
        name: 'IIUC Economics & Business Club',
        shortName: 'IEBC',
        category: 'Business',
        tagline: 'Explore. Analyze. Excel.',
        description:
            'Economics is not just about numbers; it is about people, societies, and the decisions that shape our world. We organize cultural festivals, art exhibitions, music nights, and drama performances that celebrate our rich heritage and creativity.',
        logo: null,
        color: '#a78bfa',
        bgGrad: 'linear-gradient(135deg, rgba(167,139,250,0.18), rgba(167,139,250,0.04))',
        members: 450,
        founded: '2005',
        tags: ['Drama', 'Music', 'Art', 'Festival'],
        social: { facebook: '#', instagram: '#' },
    },
    {
        id: 'iiuc-eee-club',
        name: 'IIUC EEE Club',
        shortName: 'IEBC',
        category: 'Technology',
        tagline: 'Powering Innovation.',
        description:
            'IEEE is the world’s largest technical professional organization dedicated to advancing technology for the benefit of humanity. We host tech talks, workshops, competitions, and networking events for students and professionals passionate about electrical engineering, electronics, and computer science.',
        logo: null,
        color: '#4ade80',
        bgGrad: 'linear-gradient(135deg, rgba(74,222,128,0.18), rgba(74,222,128,0.04))',
        members: 600,
        founded: '2003',
        tags: ['Cricket', 'Football', 'Badminton', 'Athletics'],
        social: { facebook: '#' },
    },
    {
        id: 'iiuc-cyber-security-club',
        name: 'IIUC Cyber Security Club',
        shortName: 'ICSC',
        category: 'Technology',
        tagline: 'Protect the Digital Frontier.',
        description:
            'In today’s interconnected world, cybersecurity is more critical than ever. We are a community of students passionate about hacking, coding, and defending digital systems. We host CTF competitions, workshops, and guest talks to equip you with the skills to stay safe in the digital age.',
        logo: null,
        color: '#f472b6',
        bgGrad: 'linear-gradient(135deg, rgba(244,114,182,0.18), rgba(244,114,182,0.04))',
        members: 155,
        founded: '2015',
        tags: ['Photography', 'Editing', 'Exhibition'],
        social: { facebook: '#', instagram: '#' },
    },
    {
        id: 'iiuc-cce-club',
        name: 'IIUC Computer and Communication Club',
        shortName: 'ICCC',
        category: 'Technology',
        tagline: 'Connect. Communicate. Collaborate.',
        description:
            'Welcome to the heart of IIUC’s tech community! The Computer & Communication Club (ICCC) is where innovation meets collaboration. Whether you’re into coding, electronics, AI, or IoT, this is your platform to connect with like-minded peers, share ideas, and build the future together. Join us to explore, create, and inspire!',
        logo: null,
        color: '#38bdf8',
        bgGrad: 'linear-gradient(135deg, rgba(56,189,248,0.18), rgba(56,189,248,0.04))',
        members: 130,
        founded: '2017',
        tags: ['Robotics', 'AI', 'Engineering', 'RoboFest'],
        social: { facebook: '#', github: '#' },
    },
    {
        id: 'iiuc-finance-club',
        name: 'IIUC Finance Club',
        shortName: 'IFC',
        category: 'Business',
        tagline: 'Empowering Financial Minds.',
        description:
            'Welcome to the IIUC Finance Club! We’re a passionate community dedicated to exploring the world of finance, investment, and wealth creation. From market analysis to trading simulations, stock pitches to corporate finance, we provide the knowledge, skills, and network to help you excel in your financial journey.',
        logo: null,
        color: '#fb923c',
        bgGrad: 'linear-gradient(135deg, rgba(251,146,60,0.18), rgba(251,146,60,0.04))',
        members: 275,
        founded: '2011',
        tags: ['Entrepreneurship', 'Case Study', 'Leadership'],
        social: { facebook: '#', linkedin: '#' },
    },
];

const categoryColors = {
    Technology: '#FFBE91',
    Academic: '#CFEBFF',
    Science: '#FFDDB0',
    'Culture & Arts': '#a78bfa',
    Sports: '#4ade80',
    'Arts & Media': '#f472b6',
    Business: '#fb923c',
};

const Clubs = () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', ...new Set(CLUBS.map(c => c.category))];

    const filtered = CLUBS.filter(c => {
        const matchCat = activeCategory === 'All' || c.category === activeCategory;
        const matchSearch =
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.category.toLowerCase().includes(search.toLowerCase()) ||
            c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
        return matchCat && matchSearch;
    });

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

            <section style={{
                background: 'var(--bg-secondary)',
                padding: 'calc(var(--nav-h) + 3rem) 0 4rem',
                position: 'relative',
                overflow: 'hidden',
                borderBottom: '1px solid var(--border-color)',
            }}>

                <div className="blob blob-1" style={{ opacity: 0.12, width: 400, height: 400 }} />
                <div className="blob blob-2" style={{ opacity: 0.10, width: 300, height: 300 }} />

                <div className="section-container relative" style={{ zIndex: 1 }}>
                    <div className="text-center page-fade">
                        <span className="section-badge mb-5 inline-flex">🏛️ Campus Clubs</span>
                        <h1 style={{
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 800,
                            color: 'var(--text-primary)',
                            marginBottom: '1rem',
                            lineHeight: 1.1,
                        }}>
                            Find Your{' '}
                            <span style={{
                                background: 'linear-gradient(90deg, #FFBE91, #FFDDB0, #CFEBFF)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                                Community
                            </span>
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 520, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                            IIUC is home to vibrant student clubs across every passion and discipline.
                            Explore, join, and make memories that last a lifetime.
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                            {[
                                ['8+', 'Active Clubs'],
                                ['2,300+', 'Club Members'],
                                ['50+', 'Events / Year'],
                            ].map(([n, l]) => (
                                <div key={l} style={{ textAlign: 'center' }}>
                                    <div style={{
                                        fontFamily: 'Space Grotesk, sans-serif',
                                        fontSize: '2rem',
                                        fontWeight: 800,
                                        background: 'linear-gradient(90deg, #FFBE91, #CFEBFF)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}>{n}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ background: 'var(--bg-secondary)', padding: '2rem 0', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 64, zIndex: 40, backdropFilter: 'blur(12px)' }}>
                <div className="section-container">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between' }}>

                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    style={{
                                        padding: '0.35rem 0.9rem',
                                        borderRadius: '999px',
                                        fontSize: '0.78rem',
                                        fontWeight: 600,
                                        fontFamily: 'Space Grotesk, sans-serif',
                                        border: `1px solid ${activeCategory === cat ? '#FFBE91' : 'var(--border-color)'}`,
                                        background: activeCategory === cat ? 'rgba(255,190,145,0.15)' : 'transparent',
                                        color: activeCategory === cat ? '#FFBE91' : 'var(--text-muted)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <input
                            type="text"
                            placeholder="Search clubs or tags…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0.65rem',
                                padding: '0.5rem 1rem',
                                color: 'var(--text-primary)',
                                fontSize: '0.85rem',
                                outline: 'none',
                                width: 220,
                                fontFamily: 'Inter, sans-serif',
                            }}
                        />
                    </div>
                </div>
            </section>

            <section style={{ padding: '4rem 0' }}>
                <div className="section-container">
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem' }}>No clubs match your search.</p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '1.5rem',
                        }}>
                            {filtered.map(club => (
                                <ClubCard key={club.id} club={club} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

const ClubCard = ({ club }) => {
    const [hovered, setHovered] = React.useState(false);
    const initials = club.shortName;

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? club.bgGrad : 'var(--bg-card)',
                border: `1px solid ${hovered ? club.color + '40' : 'var(--border-color)'}`,
                borderRadius: '1.25rem',
                padding: '1.75rem',
                transition: 'all 0.28s ease',
                transform: hovered ? 'translateY(-6px)' : 'none',
                boxShadow: hovered ? `0 16px 48px rgba(0,0,0,0.35), 0 0 0 1px ${club.color}22` : 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                cursor: 'pointer',
            }}
        >

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

                <div style={{
                    width: 56, height: 56,
                    borderRadius: '14px',
                    background: club.logo ? 'transparent' : `linear-gradient(135deg, ${club.color}, ${club.color}aa)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: `0 4px 16px ${club.color}40`,
                    overflow: 'hidden',
                }}>
                    {club.logo ? (
                        <img src={club.logo} alt={club.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '0.85rem', color: '#1a0800', letterSpacing: '-0.03em' }}>
                            {initials}
                        </span>
                    )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>

                    <span style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        fontFamily: 'Space Grotesk, sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        background: `${club.color}18`,
                        color: club.color,
                        border: `1px solid ${club.color}35`,
                        marginBottom: '4px',
                    }}>
                        {club.category}
                    </span>
                    <h3 style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: 'var(--text-primary)',
                        lineHeight: 1.2,
                        margin: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>{club.name}</h3>
                </div>
            </div>

            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.78rem', fontWeight: 600, color: club.color, margin: 0 }}>
                "{club.tagline}"
            </p>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {club.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {club.tags.slice(0, 3).map(tag => (
                    <span key={tag} style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-muted)',
                        fontFamily: 'Inter, sans-serif',
                    }}>#{tag}</span>
                ))}
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '0.875rem',
                borderTop: '1px solid var(--border-color)',
                marginTop: 'auto',
            }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: club.color, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }}>
                        {club.members.toLocaleString()}
                    </span> members · Est. {club.founded}
                </div>
                <Link
                    to={`/clubs/${club.id}`}
                    style={{
                        padding: '0.45rem 1.1rem',
                        borderRadius: '0.65rem',
                        background: `linear-gradient(135deg, ${club.color}, ${club.color}cc)`,
                        color: '#1a0800',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        fontFamily: 'Space Grotesk, sans-serif',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap',
                        boxShadow: `0 4px 14px ${club.color}30`,
                    }}
                    onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.filter = 'none'}
                >
                    Visit Club →
                </Link>
            </div>
        </div>
    );
};

export default Clubs;
