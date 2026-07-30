import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import API_URL from '../../config';

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/contacts`)
            .then(res => res.json())
            .then(data => {
                setMessages(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading messages:", err);
                setMessages([]);
                setLoading(false);
            });
    }, []);

    const handleDeleteMessage = (id) => {
        if (!window.confirm("Are you sure you want to delete this message?")) return;

        fetch(`${API_URL}/contacts/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    const remaining = messages.filter(msg => msg._id !== id);
                    setMessages(remaining);
                } else {
                    alert("Failed to delete message.");
                }
            })
            .catch(err => {
                console.error("Error deleting message:", err);
                alert("Network error. Failed to delete message.");
            });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 animate-spin"
                        style={{ borderColor: 'var(--border-strong)', borderTopColor: 'var(--accent)' }} />
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading messages…</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }} className="page-fade">

            <div className="relative overflow-hidden" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="blob blob-1" style={{ opacity: 0.18, width: 400, height: 400 }} />
                <div className="blob blob-2" style={{ opacity: 0.12, width: 300, height: 300 }} />
                <div className="section-container relative z-10" style={{ paddingTop: 'calc(var(--nav-h) + 1.5rem)', paddingBottom: '2rem' }}>
                    <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                        <Link to="/admin" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Dashboard</Link>
                        <span style={{ margin: '0 0.4rem' }}>›</span>
                        <span>Contact Messages</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold"
                                style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                Contact Messages
                            </h1>
                            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                                Review feedback and queries submitted by visitors via the contact form.
                            </p>
                        </div>
                        <span className="section-badge self-start">✉️ Inbox</span>
                    </div>
                </div>
            </div>

            <div className="section-container py-10">

                {messages.length === 0 ? (
                    <div className="text-center py-20 rounded-3xl"
                        style={{ border: '2px dashed var(--border-color)', background: 'var(--bg-card)' }}>
                        <span className="text-5xl block mb-4">✉️</span>
                        <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                            No Messages
                        </h3>
                        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                            Any queries submitted through the contact page will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
                        {messages.map((msg) => (
                            <div key={msg._id} className="rounded-2xl p-6 flex flex-col gap-4 shadow-sm relative group"
                                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>

                                <button
                                    onClick={() => handleDeleteMessage(msg._id)}
                                    className="absolute right-4 top-4 w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-opacity opacity-70 hover:opacity-100 cursor-pointer"
                                    style={{ background: 'var(--bg-secondary)', color: 'var(--error-color)', border: '1px solid var(--border-color)' }}
                                    title="Delete Message"
                                >
                                    ✕
                                </button>

                                <div className="flex flex-col gap-2.5">
                                    <div className="flex flex-wrap items-baseline gap-2">
                                        <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                            {msg.name}
                                        </h3>
                                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>({msg.email})</span>
                                    </div>

                                    <div className="text-xs">
                                        <span style={{ color: 'var(--text-muted)' }}>Subject: </span>
                                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{msg.subject}</span>
                                    </div>

                                    <p className="text-sm leading-relaxed p-4 rounded-xl border whitespace-pre-line"
                                        style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                                        {msg.message}
                                    </p>
                                </div>

                                <div className="text-[10px] pt-3 border-t text-right"
                                    style={{ color: 'var(--text-muted)', borderColor: 'var(--border-color)' }}>
                                    Received: {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'N/A'}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactMessages;
