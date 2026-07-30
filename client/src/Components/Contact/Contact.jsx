import React, { useState } from 'react';
import API_URL from '../../config';

const FacebookSVG = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const InstagramSVG = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
);

const Contact = () => {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true); setSuccess(''); setError('');

        const { name, email, subject, message } = e.target;
        fetch(`${API_URL}/contacts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name.value, email: email.value, subject: subject.value, message: message.value }),
        })
            .then(r => r.json())
            .then(data => {
                setSubmitting(false);
                if (data.insertedId) { setSuccess('Message sent successfully! We\'ll get back to you within one business day.'); e.target.reset(); }
                else setError('Failed to send. Please try again.');
            })
            .catch(() => { setSubmitting(false); setError('Network error. Please try again.'); });
    };

    const contactInfo = [
        { icon: '🏛️', label: 'Office', lines: ['International Islamic University Chittagong'] },
        { icon: '✉️', label: 'Inquiries', lines: ['c241143@ugrad.iiuc.ac.bd', '+8801887789982', 'Sat–Wed, 10 AM – 5 PM'] },
    ];

    return (
        <section id="contact" style={{ background: 'var(--bg-primary)' }}>

            <div className="relative overflow-hidden" style={{
                background: 'var(--bg-secondary)',
                padding: 'calc(var(--nav-h) + 3rem) 1rem 4rem',
                borderBottom: '1px solid var(--border-color)',
            }}>
                <div className="blob blob-1" style={{ opacity: 0.18, width: 400, height: 400 }} />
                <div className="blob blob-2" style={{ opacity: 0.12, width: 300, height: 300 }} />
                <div className="section-container relative z-10 text-center">
                    <span className="section-badge mb-4 inline-flex">✉️ Contact</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-3"
                        style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                        Contact{' '}<span style={{
                            background: 'linear-gradient(90deg, #FFBE91, #FFDDB0)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>Us</span>
                    </h2>
                    <p className="text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
                        Have a question? We’d love to hear from you.
                    </p>
                </div>
            </div>

            <div className="section-container pb-24" style={{ paddingTop: '4rem' }}>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">

                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <div className="rounded-2xl p-6 flex flex-col gap-6"
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                            <div>
                                <h3 className="font-bold text-lg mb-1"
                                    style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                    Get In Touch
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                                    Fill in the form and our team will respond within one business day.
                                </p>
                            </div>

                            {contactInfo.map(({ icon, label, lines }) => (
                                <div key={label}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">{icon}</span>
                                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                                            {label}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-0.5 ml-7">
                                        {lines.map((l, i) => (
                                            <p key={i} className="text-sm" style={{ color: 'var(--text-secondary)' }}>{l}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div>
                                <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                                    🌐 Social
                                </div>
                                <div className="flex gap-2">
                                    <a href="#"
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:-translate-y-0.5"
                                        style={{ background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid rgba(124,58,237,0.15)' }}>
                                        <FacebookSVG />
                                        Facebook
                                    </a>
                                    <a href="#"
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:-translate-y-0.5"
                                        style={{ background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid rgba(124,58,237,0.15)' }}>
                                        <InstagramSVG />
                                        Instagram
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-color)', height: '200px' }}>
                            <iframe
                                title="map"
                                src="https://maps.google.com/maps?q=IIUC+Chittagong&output=embed"
                                className="w-full h-full"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="rounded-2xl p-6 md:p-8"
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
                            <h3 className="font-bold text-xl mb-6"
                                style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                Send a Message
                            </h3>

                            {success && (
                                <div className="mb-5 px-4 py-3 rounded-xl text-sm font-medium"
                                    style={{ background: '#d1fae5', color: '#065f46', border: '1px solid #6ee7b7' }}>
                                    ✅ {success}
                                </div>
                            )}
                            {error && (
                                <div className="mb-5 px-4 py-3 rounded-xl text-sm font-medium"
                                    style={{ background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5' }}>
                                    ⚠️ {error}
                                </div>
                            )}

                            <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                                        <input type="text" name="name" placeholder="Your full name" className="input-premium" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                                        <input type="email" name="email" placeholder="your@email.com" className="input-premium" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Subject</label>
                                    <input type="text" name="subject" placeholder="What is it about?" className="input-premium" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Message</label>
                                    <textarea name="message" rows="5" placeholder="Write your message..."
                                        className="input-premium resize-none"
                                        style={{ paddingTop: '0.65rem' }} required />
                                </div>
                                <button type="submit" disabled={submitting}
                                    className="btn-premium w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
                                    {submitting
                                        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                                        : '📤 Send Message'
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
