import React from 'react';
import { Outlet } from 'react-router';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Chatbot from '../Chatbot/Chatbot';

const Root = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
            <Navigation />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
};

export default Root;
