import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Providers/AuthProvider';
import API_URL from '../../config';

const Navigation = () => {
    const { user, logout } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropOpen, setDropOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('uniev-theme') === 'dark';
        setIsDark(saved);
        document.documentElement.setAttribute('data-theme', saved ? 'dark' : 'light');
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (user) {
            fetch(`${API_URL}/users/admin/${user.email}`)
                .then(r => r.json())
                .then(d => setIsAdmin(d.admin))
                .catch(() => setIsAdmin(false));
        } else {
            setIsAdmin(false);
        }
    }, [user]);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
        localStorage.setItem('uniev-theme', next ? 'dark' : 'light');
    };

    const handleLogout = () => {
        logout().catch(e => console.log(e));
        setDropOpen(false);
        setMenuOpen(false);
    };

    const navItems = [
        { to: '/home', label: 'Home' },
        { to: '/events', label: 'Events' },
        { to: '/clubs', label: 'Clubs' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
    ];

    const linkClass = ({ isActive }) =>
        `relative px-1 py-0.5 text-sm font-medium transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:transition-all after:duration-300 ${isActive
            ? 'after:w-full'
            : 'after:w-0 hover:after:w-full'
        }`;
    const linkClassDark = ({ isActive }) =>
        `relative px-1 py-0.5 text-sm font-medium transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:transition-all after:duration-300 ${isActive
            ? 'after:w-full'
            : 'after:w-0 hover:after:w-full'
        }`;

    const linkStyle = (isActive) => ({
        color: isActive ? '#FFBE91' : '#c9b89e',
        '--tw-after-bg-color': '#FFBE91',
    });

    const NavLinkStyled = ({ to, children, onClick }) => (
        <NavLink
            to={to}
            onClick={onClick}
            style={({ isActive }) => ({
                color: isActive ? '#FFBE91' : '#c9b89e',
                position: 'relative',
                padding: '2px 4px',
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.2s',
            })}
            className={({ isActive }) =>
                `nav-link-warm ${isActive ? 'nav-link-warm--active' : ''}`
            }
        >
            {children}
        </NavLink>
    );

    return (
        <nav
            className="sticky top-0 z-50 transition-all duration-300"
            style={{
                background: 'var(--nav-bg)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--border-color)',
                boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
            }}
        >
            <div className="section-container">
                <div className="flex items-center justify-between h-16">

                    <Link to="/" className="flex items-center gap-2 flex-shrink-0" onClick={() => setMenuOpen(false)}>
                        <div style={{
                            width: 36, height: 36,
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #FFBE91 0%, #FFDDB0 50%, #CFEBFF 100%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 14px rgba(255,190,145,0.45)',
                            flexShrink: 0,
                        }}>
                            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '0.82rem', color: '#1a0800', letterSpacing: '-0.03em' }}>IE</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
                            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>IIUC</span>
                            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.82rem', background: 'linear-gradient(90deg, #FFBE91, #FFDDB0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.01em' }}>EventEra</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map(({ to, label }) => (
                            <NavLink key={to} to={to}
                                style={({ isActive }) => ({
                                    color: isActive ? '#FFBE91' : '#c9b89e',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    textDecoration: 'none',
                                    transition: 'color 0.2s',
                                })}
                                className={({ isActive }) =>
                                    `nav-link-warm ${isActive ? 'nav-link-warm--active' : ''}`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                        {user && (
                            <NavLink to="/dashboard"
                                style={({ isActive }) => ({
                                    color: isActive ? '#FFBE91' : '#c9b89e',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    textDecoration: 'none',
                                    transition: 'color 0.2s',
                                })}
                                className={({ isActive }) =>
                                    `nav-link-warm ${isActive ? 'nav-link-warm--active' : ''}`
                                }
                            >
                                My Dashboard
                            </NavLink>
                        )}
                        {isAdmin && (
                            <NavLink to="/admin" className="text-sm font-semibold px-1"
                                style={{ color: '#FFDDB0' }}>
                                ⚙ Admin
                            </NavLink>
                        )}
                    </div>

                    <div className="flex items-center gap-3">

                        <button
                            onClick={toggleTheme}
                            className={`theme-toggle ${isDark ? 'dark' : ''}`}
                            aria-label="Toggle theme"
                            title={isDark ? 'Switch to light' : 'Switch to dark'}
                        >
                            <span className="theme-toggle-knob">
                                {isDark ? '🕯️' : '🔦'}
                            </span>
                        </button>

                        <div className="hidden md:flex items-center gap-2">
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setDropOpen(o => !o)}
                                        className="flex items-center gap-2 rounded-xl px-3 py-1.5 transition-all"
                                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                                    >
                                        <img
                                            src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email)}&background=7c3aed&color=fff&size=64`}
                                            alt="avatar"
                                            className="w-7 h-7 rounded-full object-cover"
                                            style={{ outline: '2px solid var(--accent)', outlineOffset: '2px' }}
                                        />
                                        <span className="text-xs font-medium max-w-[100px] truncate" style={{ color: 'var(--text-secondary)' }}>
                                            {user.displayName || user.email?.split('@')[0]}
                                        </span>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>▾</span>
                                    </button>
                                    {dropOpen && (
                                        <div className="absolute right-0 mt-2 w-52 rounded-xl overflow-hidden z-50 shadow-xl"
                                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                                            <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{user.displayName}</p>
                                                <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
                                            </div>
                                            <div className="py-1">
                                                <Link to="/dashboard" onClick={() => setDropOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm transition-colors"
                                                    style={{ color: 'var(--text-secondary)' }}
                                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,190,145,0.08)'}
                                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                    🎫 My Dashboard
                                                </Link>
                                                {isAdmin && (
                                                    <Link to="/admin" onClick={() => setDropOpen(false)}
                                                        className="flex items-center gap-2 px-4 py-2 text-sm transition-colors"
                                                        style={{ color: '#FFDDB0' }}
                                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,221,176,0.08)'}
                                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                        ⚙ Admin Panel
                                                    </Link>
                                                )}
                                                <button onClick={handleLogout}
                                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors"
                                                    style={{ color: '#f87171' }}
                                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.08)'}
                                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                    🚪 Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link to="/login"
                                        className="px-4 py-1.5 text-sm font-semibold rounded-xl transition-all"
                                        style={{ color: 'var(--accent)', background: 'var(--accent-light)', border: '1px solid transparent' }}>
                                        Login
                                    </Link>
                                    <Link to="/register"
                                        className="px-4 py-1.5 text-sm font-semibold rounded-xl text-white transition-all btn-premium">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                        <button
                            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
                            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                            onClick={() => setMenuOpen(o => !o)}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                {menuOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                }
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden mobile-nav-menu">
                    <div className="section-container py-3 flex flex-col gap-1">
                        {navItems.map(({ to, label }) => (
                            <NavLink key={to} to={to}
                                onClick={() => setMenuOpen(false)}
                                style={({ isActive }) => ({
                                    color: isActive ? '#FFBE91' : 'var(--text-primary)',
                                    background: isActive ? 'rgba(255,190,145,0.10)' : 'transparent',
                                    display: 'block',
                                    padding: '0.625rem 1rem',
                                    borderRadius: '0.75rem',
                                    fontSize: '0.875rem',
                                    fontWeight: isActive ? 600 : 500,
                                    textDecoration: 'none',
                                    transition: 'all 0.2s',
                                })}
                                onMouseEnter={e => { if (!e.currentTarget.href.includes(window.location.pathname)) e.currentTarget.style.background = 'rgba(255,190,145,0.06)'; }}
                                onMouseLeave={e => { if (!e.currentTarget.href.includes(window.location.pathname)) e.currentTarget.style.background = 'transparent'; }}
                            >
                                {label}
                            </NavLink>
                        ))}
                        {user && (
                            <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}
                                style={({ isActive }) => ({
                                    color: isActive ? '#FFBE91' : 'var(--text-primary)',
                                    background: isActive ? 'rgba(255,190,145,0.10)' : 'transparent',
                                    display: 'block',
                                    padding: '0.625rem 1rem',
                                    borderRadius: '0.75rem',
                                    fontSize: '0.875rem',
                                    fontWeight: isActive ? 600 : 500,
                                    textDecoration: 'none',
                                    transition: 'all 0.2s',
                                })}>
                                🎫 My Dashboard
                            </NavLink>
                        )}
                        {isAdmin && (
                            <NavLink to="/admin" onClick={() => setMenuOpen(false)}
                                className="px-4 py-2.5 rounded-xl text-sm font-medium block"
                                style={{ color: '#FFDDB0' }}>
                                ⚙ Admin Panel
                            </NavLink>
                        )}
                        <div className="border-t pt-3 mt-1 flex flex-col gap-2" style={{ borderColor: 'var(--border-color)' }}>
                            {user ? (
                                <>
                                    <div className="px-4 py-2 flex items-center gap-3">
                                        <img src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email)}&background=7c3aed&color=fff`}
                                            className="w-8 h-8 rounded-full" alt="avatar" />
                                        <div>
                                            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{user.displayName}</p>
                                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
                                        </div>
                                    </div>
                                    <button onClick={handleLogout}
                                        className="mx-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-colors">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setMenuOpen(false)}
                                        className="mx-4 py-2.5 rounded-xl text-sm font-semibold text-center transition-colors"
                                        style={{ color: 'var(--accent)', background: 'var(--accent-light)' }}>
                                        Login
                                    </Link>
                                    <Link to="/register" onClick={() => setMenuOpen(false)}
                                        className="mx-4 py-2.5 rounded-xl text-sm font-semibold text-white text-center btn-premium">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;
