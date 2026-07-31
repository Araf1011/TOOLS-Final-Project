import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import { Link, useNavigate } from 'react-router';
import API_URL from '../../config';

const departments = ['CSE', 'EEE', 'BBA', 'Pharmacy', 'English', 'Law'];

const Registration = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setError(''); setLoading(true);

        const name = e.target.name.value.trim();
        const email = e.target.email.value.trim().toLowerCase();
        const password = e.target.password.value;
        const phone = e.target.phone.value.trim();
        const department = e.target.department.value;
        const roll = e.target.roll.value.trim();

        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            setLoading(false);
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                await updateProfile(result.user, { displayName: name });
                const userData = { uid: result.user.uid, name, email, phone, department, college: 'IIUC', roll, role: 'student' };
                fetch(`${API_URL}/users`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                }).finally(() => { setLoading(false); navigate('/dashboard'); });
            })
            .catch(err => { setError(err.message || 'Registration failed.'); setLoading(false); });
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 relative overflow-hidden hero-bg">
            <div className="blob blob-2" style={{ opacity: 0.25 }} />
            <div className="blob blob-3" style={{ opacity: 0.2 }} />

            <div className="w-full max-w-lg relative z-10 page-fade">
                <div className="glass-card p-8 md:p-10" style={{ borderRadius: '1.75rem' }}>

                    <div className="text-center mb-8">
                        <div className="w-12 h-12 rounded-2xl text-white text-xl font-bold mx-auto mb-3 flex items-center justify-center shadow-md"
                            style={{ background: 'var(--gradient-accent)' }}>U</div>
                        <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                            Create Account
                        </h1>
                        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                            Register to participate in campus events
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 px-4 py-3 rounded-xl text-xs font-semibold"
                            style={{ background: 'rgba(220,38,38,0.1)', color: 'var(--error-color)', border: '1px solid rgba(220,38,38,0.2)' }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                            <input type="text" name="name" placeholder="John Doe" className="input-premium" required />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                                <input type="email" name="email" placeholder="c241143@ugrad.iiuc.ac.bd" className="input-premium" required />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Password</label>
                                <div className="relative">
                                    <input type={showPass ? 'text' : 'password'} name="password" placeholder="Min 6 characters" className="input-premium pr-10" required />
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
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Phone Number</label>
                                <input type="text" name="phone" placeholder="018XXXXXXXX" className="input-premium" required />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Student Roll ID</label>
                                <input type="text" name="roll" placeholder="C241143" className="input-premium" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Department</label>
                            <select name="department" className="input-premium bg-transparent" required>
                                {departments.map(d => <option key={d} value={d} className="bg-slate-900 text-white">{d}</option>)}
                            </select>
                        </div>

                        <button type="submit" disabled={loading}
                            className="btn-premium w-full py-3 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center gap-2 cursor-pointer">
                            {loading
                                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating Account...</>
                                : 'Create Account →'
                            }
                        </button>
                    </form>

                    <div className="text-center mt-6 pt-5" style={{ borderTop: '1px solid var(--border-color)' }}>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold transition-colors hover:text-violet-600" style={{ color: 'var(--accent)' }}>
                                Sign In
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Registration;
