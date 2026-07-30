import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ targetDate }) => {
    const calc = () => {
        const diff = +new Date(targetDate) - +new Date();
        if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
        return {
            days:  Math.floor(diff / 86400000),
            hours: Math.floor((diff / 3600000) % 24),
            mins:  Math.floor((diff / 60000) % 60),
            secs:  Math.floor((diff / 1000) % 60),
        };
    };
    const [t, setT] = useState(calc());
    useEffect(() => {
        const id = setInterval(() => setT(calc()), 1000);
        return () => clearInterval(id);
    }, [targetDate]);

    const units = [
        { val: t.days,  label: 'Days' },
        { val: t.hours, label: 'Hours' },
        { val: t.mins,  label: 'Mins' },
        { val: t.secs,  label: 'Secs' },
    ];

    if (t.days === 0 && t.hours === 0 && t.mins === 0 && t.secs === 0) {
        return (
            <span className="text-sm font-bold" style={{ color: '#dc2626' }}>
                🔴 Event Started!
            </span>
        );
    }

    return (
        <div className="flex gap-2 items-center">
            {units.map(({ val, label }) => (
                <div key={label} className="countdown-unit">
                    <span className="num">{String(val).padStart(2, '0')}</span>
                    <span className="lbl">{label}</span>
                </div>
            ))}
        </div>
    );
};

export default CountdownTimer;
