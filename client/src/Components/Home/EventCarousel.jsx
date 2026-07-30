import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import CountdownTimer from './CountdownTimer';

const EventCarousel = ({ events }) => {
    const [idx, setIdx] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        if (!events || events.length < 2) return;
        const id = setInterval(() => {
            setAnimating(true);
            setTimeout(() => {
                setIdx(p => (p + 1) % events.length);
                setAnimating(false);
            }, 400);
        }, 5000);
        return () => clearInterval(id);
    }, [events]);

    if (!events || events.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[280px] rounded-2xl text-center"
                style={{ background: 'var(--bg-secondary)', border: '2px dashed var(--border-color)' }}>
                <span className="text-4xl mb-3">📅</span>
                <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>No Upcoming Events</h3>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Check back later for new events.</p>
            </div>
        );
    }

    const e = events[idx];

    return (
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl" style={{ height: '420px' }}>

            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{
                    backgroundImage: `url(${e.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200'})`,
                    transform: animating ? 'scale(1.04)' : 'scale(1)',
                    opacity: animating ? 0.7 : 1,
                    transition: 'transform 0.7s ease, opacity 0.4s ease',
                }}
            />

            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />

            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-10"
                style={{ opacity: animating ? 0 : 1, transition: 'opacity 0.4s ease' }}>
                <div className="max-w-2xl">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3"
                        style={{ background: 'var(--gradient-accent)' }}>
                        {e.category}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                        {e.name}
                    </h2>
                    <p className="text-sm text-white/75 mb-5 line-clamp-2 max-w-xl">
                        {e.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between border-t border-white/15 pt-4">
                        <div>
                            <p className="text-xs text-white/50 uppercase tracking-widest mb-2">Starts in</p>
                            <CountdownTimer targetDate={e.date} />
                        </div>
                        <Link to={`/events/${e._id}`}
                            className="btn-premium px-6 py-2.5 text-sm rounded-xl inline-block text-center self-start sm:self-center">
                            View Details →
                        </Link>
                    </div>
                </div>
            </div>

            {events.length > 1 && (
                <div className="absolute top-4 right-4 flex gap-1.5 z-20">
                    {events.map((_, i) => (
                        <button key={i}
                            onClick={() => { setAnimating(true); setTimeout(() => { setIdx(i); setAnimating(false); }, 300); }}
                            className={`h-2 rounded-full transition-all duration-300 ${i === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                            aria-label={`Slide ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventCarousel;
