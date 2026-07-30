import React, { useState, useContext } from 'react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, GithubAuthProvider } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Providers/AuthProvider';
import API_URL from '../../config';

const departments = ['CSE', 'EEE', 'BBA', 'Pharmacy', 'English', 'Law'];

const Login = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const [showProfileModal, setShowProfileModal] = useState(false);
    const [pendingUser, setPendingUser] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const promptProfileCompletion = (firebaseUser) => {
        fetch(`${API_URL}/users/${encodeURIComponent(firebaseUser.email.toLowerCase())}`)
            .then(res => res.json())
            .then(dbUser => {
                if (dbUser && dbUser.roll && dbUser.department) {
                    setLoading(false);
                    navigate('/dashboard');
                } else {
                    setPendingUser(firebaseUser);
                    setLoading(false);
                    setShowProfileModal(true);
                }
            })
            .catch(() => {
                setPendingUser(firebaseUser);
                setLoading(false);
                setShowProfileModal(true);
            });
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        setProfileLoading(true);
        const roll = e.target.roll.value.trim();
        const department = e.target.department.value;

        const userData = {
            name: pendingUser.displayName || 'Student',
            email: pendingUser.email.toLowerCase(),
            role: 'student',
            phone: '',
            roll,
            department,
            college: 'IIUC',
        };

        fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        }).finally(() => {
            setProfileLoading(false);
            setShowProfileModal(false);
            navigate('/dashboard');
        });
    };

    const handleGoogleLogin = () => {
        setLoading(true); setError('');
        signInWithPopup(auth, googleProvider)
            .then(r => promptProfileCompletion(r.user))
            .catch(e => { setError(e.message); setLoading(false); });
    };

    const handleGithubLogin = () => {
        setLoading(true); setError('');
        signInWithPopup(auth, githubProvider)
            .then(r => promptProfileCompletion(r.user))
            .catch(e => { setError(e.message); setLoading(false); });
    };

    const handleEmailLogin = (e) => {
        e.preventDefault();
        setLoading(true); setError('');
        const email = e.target.email.value.trim().toLowerCase();
        signInWithEmailAndPassword(auth, email, e.target.password.value)
            .then(() => navigate('/dashboard'))
            .catch(() => { setError('Incorrect email or password.'); setLoading(false); });
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 relative overflow-hidden hero-bg">
            <div className="blob blob-1" style={{ opacity: 0.25 }} />
            <div className="blob blob-2" style={{ opacity: 0.2 }} />

            {showProfileModal && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
                }}>
                    <div className="glass-card p-8" style={{ borderRadius: '1.75rem', width: '100%', maxWidth: '420px', animation: 'fadeIn 0.3s ease' }}>
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 rounded-2xl text-white text-xl font-bold mx-auto mb-3 flex items-center justify-center shadow-md"
                                style={{ background: 'var(--gradient-accent)' }}>U</div>
                            <h2 className="text-xl font-extrabold" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                Complete Your Profile
                            </h2>
                            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                                Welcome, <strong>{pendingUser?.displayName}</strong>! Just two more details needed.
                            </p>
                        </div>

                        <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                                    Student Roll ID
                                </label>
                                <input
                                    type="text"
                                    name="roll"
                                    placeholder="e.g. C241143"
                                    className="input-premium"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                                    Department
                                </label>
                                <select name="department" className="input-premium bg-transparent" required>
                                    {departments.map(d => (
                                        <option key={d} value={d} className="bg-slate-900 text-white">{d}</option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" disabled={profileLoading}
                                className="btn-premium w-full py-3 rounded-xl font-semibold text-sm mt-1 flex items-center justify-center gap-2 cursor-pointer">
                                {profileLoading
                                    ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                                    : 'Continue to Dashboard →'
                                }
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="w-full max-w-md relative z-10 page-fade">
                <div className="glass-card p-8 md:p-10" style={{ borderRadius: '1.75rem' }}>

                    <div className="text-center mb-8">
                        <div className="w-12 h-12 rounded-2xl text-white text-xl font-bold mx-auto mb-3 flex items-center justify-center shadow-md"
                            style={{ background: 'var(--gradient-accent)' }}>U</div>
                        <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                            Sign In
                        </h1>
                        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                            Welcome back to IIUC EventEra
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 px-4 py-3 rounded-xl text-xs font-semibold"
                            style={{ background: 'rgba(220,38,38,0.1)', color: 'var(--error-color)', border: '1px solid rgba(220,38,38,0.2)' }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button onClick={handleGoogleLogin} disabled={loading}
                            className="flex items-center justify-center gap-2.5 py-3 rounded-xl font-semibold text-xs transition-all hover:scale-[1.02] cursor-pointer"
                            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                        <button onClick={handleGithubLogin} disabled={loading}
                            className="flex items-center justify-center gap-2.5 py-3 rounded-xl font-semibold text-xs transition-all hover:scale-[1.02] cursor-pointer"
                            style={{ background: '#24292e', color: '#fff', border: 'none' }}>
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                            GitHub
                        </button>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>or email password</span>
                        <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
                    </div>

                    <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                                Email Address
                            </label>
                            <input type="email" name="email" placeholder="c241143@ugrad.iiuc.ac.bd"
                                className="input-premium" required />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Password</label>
                                <a href="#" className="text-xs font-semibold transition-colors hover:text-violet-600" style={{ color: 'var(--accent)' }}>Forgot password?</a>
                            </div>
                            <div className="relative">
                                <input type={showPass ? 'text' : 'password'} name="password" placeholder="••••••••"
                                    className="input-premium pr-10" required />
                                <button type="button" onClick={() => setShowPass(s => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity flex items-center justify-center"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                    {showPass ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading}
                            className="btn-premium w-full py-3 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center gap-2 cursor-pointer">
                            {loading
                                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
                                : 'Sign In →'
                            }
                        </button>
                    </form>

                    <div className="text-center mt-6 pt-5" style={{ borderTop: '1px solid var(--border-color)' }}>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            New to IIUC EventEra?{' '}
                            <Link to="/register" className="font-semibold transition-colors hover:text-violet-600" style={{ color: 'var(--accent)' }}>
                                Create an account
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
