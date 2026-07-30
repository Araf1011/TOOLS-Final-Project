import React, { useRef, useState } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import jsPDF from 'jspdf';

const TicketPDF = ({ registration, profile, onClose }) => {
    const qrCanvasRef = useRef(null);
    const [generating, setGenerating] = useState(false);

    if (!registration) return null;
    const reg = registration;

    const eventDate = reg.eventDate
        ? new Date(reg.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        : 'TBA';
    const issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const isFree = !reg.price || parseFloat(reg.price) === 0;
    const isPaid = reg.paymentStatus === 'Paid' || reg.paymentStatus === 'Free';
    const ticketNo = reg._id?.slice(-8).toUpperCase() || 'N/A';
    const holderName = reg.userName || profile?.name || 'N/A';
    const roll = profile?.roll || reg.roll || 'N/A';
    const dept = profile?.department || reg.department || 'N/A';

    const handleDownload = async () => {
        setGenerating(true);
        try {
            const canvas = qrCanvasRef.current?.querySelector('canvas');
            const qrImg = canvas ? canvas.toDataURL('image/png') : null;

            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            const W = 210;

            pdf.setFillColor(15, 26, 56);
            pdf.rect(0, 0, W, 82, 'F');

            pdf.setFillColor(255, 190, 145);
            pdf.roundedRect(14, 14, 14, 14, 2, 2, 'F');
            pdf.setFontSize(7);
            pdf.setTextColor(26, 8, 0);
            pdf.setFont('helvetica', 'bold');
            pdf.text('EE', 21, 23, { align: 'center' });

            pdf.setTextColor(200, 210, 230);
            pdf.setFontSize(6.5);
            pdf.setFont('helvetica', 'bold');
            pdf.text('IIUC', 33, 19);
            pdf.setTextColor(255, 252, 225);
            pdf.setFontSize(11);
            pdf.text('EventEra', 33, 26);
            pdf.setTextColor(120, 140, 180);
            pdf.setFontSize(5.5);
            pdf.setFont('helvetica', 'normal');
            pdf.text('International Islamic University Chittagong', 33, 31.5);

            pdf.setFillColor(255, 190, 145);
            pdf.roundedRect(W - 44, 13, 30, 15, 2, 2, 'F');
            pdf.setTextColor(26, 8, 0);
            pdf.setFontSize(5.5);
            pdf.setFont('helvetica', 'bold');
            pdf.text('EVENT', W - 29, 20, { align: 'center' });
            pdf.setFontSize(10);
            pdf.text('PASS', W - 29, 26, { align: 'center' });

            pdf.setTextColor(255, 190, 145);
            pdf.setFontSize(6);
            pdf.setFont('helvetica', 'bold');
            pdf.text('EVENT NAME', 14, 48);

            pdf.setTextColor(255, 252, 225);
            pdf.setFontSize(16);
            pdf.setFont('helvetica', 'bold');
            const nameLines = pdf.splitTextToSize(reg.eventName || 'Unknown Event', W - 60);
            pdf.text(nameLines, 14, 57);

            if (reg.category) {
                const catY = nameLines.length > 1 ? 72 : 65;
                pdf.setFontSize(6);
                pdf.setTextColor(255, 190, 145);
                pdf.text(reg.category.toUpperCase(), 14, catY);
            }

            const t1 = 85;
            pdf.setFillColor(229, 231, 235);
            pdf.circle(0, t1, 3.5, 'F');
            pdf.circle(W, t1, 3.5, 'F');
            pdf.setDrawColor(200, 210, 220);
            pdf.setLineWidth(0.35);
            pdf.setLineDashPattern([2.5, 2], 0);
            pdf.line(5, t1, W - 5, t1);
            pdf.setLineDashPattern([], 0);

            const gridTop = 90;
            const colW = (W - 20) / 3;
            const gridItems = [
                { label: 'DATE', value: eventDate },
                { label: 'TIME', value: reg.eventTime || 'TBA' },
                { label: 'VENUE', value: reg.eventVenue || 'TBA' },
            ];
            gridItems.forEach((item, i) => {
                const x = 10 + i * colW;
                pdf.setFillColor(i % 2 === 1 ? 249 : 255, i % 2 === 1 ? 250 : 255, i % 2 === 1 ? 251 : 255);
                pdf.rect(x, gridTop, colW, 20, 'F');
                pdf.setDrawColor(229, 231, 235);
                pdf.setLineWidth(0.3);
                pdf.rect(x, gridTop, colW, 20, 'S');
                pdf.setTextColor(107, 114, 128);
                pdf.setFontSize(5.5);
                pdf.setFont('helvetica', 'bold');
                pdf.text(item.label, x + 4, gridTop + 7);
                pdf.setTextColor(17, 24, 39);
                pdf.setFontSize(7.5);
                const vLines = pdf.splitTextToSize(item.value, colW - 8);
                pdf.text(vLines[0], x + 4, gridTop + 13.5);
            });

            let y = 117;
            pdf.setDrawColor(229, 231, 235);
            pdf.setLineWidth(0.3);
            pdf.line(10, y, W - 10, y);
            pdf.setTextColor(156, 163, 175);
            pdf.setFontSize(5.5);
            pdf.setFont('helvetica', 'bold');
            pdf.text('TICKET HOLDER DETAILS', 10, y - 2);

            y += 6;
            const leftW = W - 20 - 54;
            const holders = [
                { label: 'FULL NAME', value: holderName },
                { label: 'EMAIL ADDRESS', value: reg.userEmail || 'N/A' },
                { label: 'STUDENT ROLL', value: roll },
                { label: 'DEPARTMENT', value: dept },
            ];
            holders.forEach((f, i) => {
                const hx = 10 + (i % 2) * (leftW / 2 + 4);
                const hy = y + Math.floor(i / 2) * 16;
                pdf.setTextColor(156, 163, 175);
                pdf.setFontSize(5.5);
                pdf.setFont('helvetica', 'bold');
                pdf.text(f.label, hx, hy);
                pdf.setTextColor(17, 24, 39);
                pdf.setFontSize(8);
                pdf.setFont('helvetica', 'normal');
                pdf.text(pdf.splitTextToSize(f.value, leftW / 2)[0], hx, hy + 5.5);
            });

            y += 36;
            pdf.setDrawColor(229, 231, 235);
            pdf.line(10, y, leftW + 10, y);
            pdf.setTextColor(156, 163, 175);
            pdf.setFontSize(5.5);
            pdf.setFont('helvetica', 'bold');
            pdf.text('PAYMENT SUMMARY', 10, y - 2);

            y += 7;
            pdf.setTextColor(107, 114, 128);
            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'normal');
            pdf.text('Registration Fee', 10, y);
            pdf.setTextColor(17, 24, 39);
            pdf.setFont('helvetica', 'bold');
            pdf.text(isFree ? 'FREE' : `BDT ${reg.price}`, leftW + 10, y, { align: 'right' });

            y += 8;
            pdf.setTextColor(107, 114, 128);
            pdf.setFont('helvetica', 'normal');
            pdf.text('Payment Status', 10, y);
            pdf.setTextColor(...(isPaid ? [5, 150, 105] : [217, 119, 6]));
            pdf.setFont('helvetica', 'bold');
            pdf.text(reg.paymentStatus || 'N/A', leftW + 10, y, { align: 'right' });

            y += 3;
            pdf.setDrawColor(17, 24, 39);
            pdf.setLineWidth(0.5);
            pdf.line(10, y, leftW + 10, y);
            y += 6;
            pdf.setTextColor(17, 24, 39);
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Total Paid', 10, y);
            pdf.setFontSize(12);
            pdf.text(isFree ? 'FREE' : `BDT ${reg.price}`, leftW + 10, y, { align: 'right' });

            if (qrImg) {
                const qx = W - 10 - 50;
                const qy = 118;
                pdf.setFillColor(255, 255, 255);
                pdf.setDrawColor(229, 231, 235);
                pdf.setLineWidth(0.5);
                pdf.roundedRect(qx - 3, qy - 3, 53, 53, 2, 2, 'FD');
                pdf.addImage(qrImg, 'PNG', qx, qy, 47, 47);
                pdf.setTextColor(156, 163, 175);
                pdf.setFontSize(5.5);
                pdf.setFont('helvetica', 'bold');
                pdf.text('SCAN FOR ENTRY', qx + 23.5, qy + 52, { align: 'center' });
                pdf.setFontSize(7);
                pdf.setTextColor(55, 65, 81);
                pdf.text(`#${ticketNo}`, qx + 23.5, qy + 58, { align: 'center' });
            }

            y += 22;
            pdf.setFillColor(229, 231, 235);
            pdf.circle(0, y, 3.5, 'F');
            pdf.circle(W, y, 3.5, 'F');
            pdf.setDrawColor(200, 210, 220);
            pdf.setLineWidth(0.35);
            pdf.setLineDashPattern([2.5, 2], 0);
            pdf.line(5, y, W - 5, y);
            pdf.setLineDashPattern([], 0);

            y += 4;
            pdf.setFillColor(249, 250, 251);
            pdf.rect(0, y, W, 22, 'F');
            pdf.setTextColor(107, 114, 128);
            pdf.setFontSize(6);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Registration ID:', 10, y + 7);
            pdf.setFont('helvetica', 'normal');
            pdf.text(reg._id || '', 45, y + 7);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Issued:', 10, y + 14);
            pdf.setFont('helvetica', 'normal');
            pdf.text(issueDate, 28, y + 14);
            pdf.setTextColor(156, 163, 175);
            pdf.setFontSize(5.5);
            pdf.text('Digitally verified pass. Present QR code at the event entrance.', W / 2, y + 19, { align: 'center' });

            pdf.save(`EventPass_${ticketNo}_${(reg.eventName || 'Event').replace(/\s+/g, '_')}.pdf`);
        } catch (err) {
            console.error('PDF error:', err);
            alert('PDF generation failed: ' + err.message);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', overflowY: 'auto' }}
            onClick={onClose}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', width: '100%', maxWidth: 700 }} onClick={e => e.stopPropagation()}>

                <div ref={qrCanvasRef} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', top: -9999 }}>
                    <QRCodeCanvas value={reg._id} size={256} level="M" bgColor="#ffffff" fgColor="#0f1a38" />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'flex-end' }}>
                    <button onClick={onClose} style={{ padding: '0.55rem 1.25rem', borderRadius: '0.65rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif' }}>✕ Close</button>
                    <button onClick={handleDownload} disabled={generating} style={{ padding: '0.55rem 1.5rem', borderRadius: '0.65rem', background: 'linear-gradient(135deg, #FFBE91, #FFDDB0)', border: 'none', color: '#1a0800', fontSize: '0.82rem', fontWeight: 700, cursor: generating ? 'not-allowed' : 'pointer', fontFamily: 'Space Grotesk, sans-serif', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: generating ? 0.7 : 1, boxShadow: '0 4px 20px rgba(255,190,145,0.35)' }}>
                        {generating ? <><span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(26,8,0,0.3)', borderTopColor: '#1a0800', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} /> Generating...</> : '⬇ Download PDF Pass'}
                    </button>
                </div>

                <div style={{ width: '100%', background: '#ffffff', fontFamily: "'Segoe UI', Arial, sans-serif", color: '#111827', overflow: 'hidden', borderRadius: '12px', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>

                    <div style={{ background: 'linear-gradient(135deg, #0f1a38 0%, #1a0d2e 60%, #0a1628 100%)', padding: '2.5rem 2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: '#FFBE91', filter: 'blur(70px)', opacity: 0.15 }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'linear-gradient(135deg, #FFBE91, #FFDDB0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 4px 16px rgba(255,190,145,0.4)' }}>🏛️</div>
                                <div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>IIUC</div>
                                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFCE1' }}>EventEra</div>
                                    <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)' }}>International Islamic University Chittagong</div>
                                </div>
                            </div>
                            <div style={{ background: 'linear-gradient(135deg, #FFBE91, #FFDDB0)', borderRadius: '8px', padding: '0.35rem 1rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.58rem', fontWeight: 800, color: '#1a0800', textTransform: 'uppercase' }}>Event</div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1a0800' }}>PASS</div>
                            </div>
                        </div>
                        <div style={{ marginTop: '2rem', position: 'relative', zIndex: 1 }}>
                            <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#FFBE91', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Event Name</div>
                            <h1 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.75rem)', fontWeight: 800, color: '#FFFCE1', margin: 0, lineHeight: 1.15 }}>{reg.eventName}</h1>
                            {reg.category && <span style={{ display: 'inline-block', marginTop: '0.6rem', padding: '3px 12px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 700, background: 'rgba(255,190,145,0.15)', color: '#FFBE91', border: '1px solid rgba(255,190,145,0.3)', textTransform: 'uppercase' }}>{reg.category}</span>}
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', background: '#f9fafb' }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e5e7eb', flexShrink: 0, marginLeft: '-12px' }} />
                        <div style={{ flex: 1, borderTop: '2px dashed #d1d5db', margin: '0 0.5rem' }} />
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e5e7eb', flexShrink: 0, marginRight: '-12px' }} />
                    </div>

                    <div style={{ background: '#ffffff', padding: '2rem 2.5rem' }}>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', marginBottom: '1.75rem' }}>
                            {[{ label: '📅 Date', value: eventDate }, { label: '⏰ Time', value: reg.eventTime || 'TBA' }, { label: '📍 Venue', value: reg.eventVenue || 'TBA' }].map((item, i) => (
                                <div key={item.label} style={{ padding: '1rem 1.25rem', background: i % 2 === 1 ? '#f9fafb' : '#fff', borderRight: i < 2 ? '1px solid #e5e7eb' : 'none' }}>
                                    <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{item.label}</div>
                                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827' }}>{item.value}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.6rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '1rem', paddingBottom: '0.4rem', borderBottom: '1px solid #e5e7eb' }}>Ticket Holder Details</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 1.5rem', marginBottom: '1.5rem' }}>
                                    {[{ label: 'Full Name', value: holderName }, { label: 'Email', value: reg.userEmail || 'N/A' }, { label: 'Student Roll', value: roll }, { label: 'Department', value: dept }].map(({ label, value }) => (
                                        <div key={label}>
                                            <div style={{ fontSize: '0.58rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{label}</div>
                                            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#111827', wordBreak: 'break-all' }}>{value}</div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ fontSize: '0.6rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.75rem', paddingBottom: '0.4rem', borderBottom: '1px solid #e5e7eb' }}>Payment Summary</div>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                    <tbody>
                                        <tr><td style={{ paddingBottom: '0.45rem', color: '#6b7280' }}>Registration Fee</td><td style={{ paddingBottom: '0.45rem', textAlign: 'right', fontWeight: 600 }}>{isFree ? 'FREE' : `৳ ${reg.price}`}</td></tr>
                                        <tr><td style={{ paddingBottom: '0.45rem', color: '#6b7280' }}>Payment Status</td><td style={{ paddingBottom: '0.45rem', textAlign: 'right' }}><span style={{ padding: '2px 10px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 800, background: isPaid ? 'rgba(5,150,105,0.1)' : 'rgba(245,158,11,0.1)', color: isPaid ? '#059669' : '#d97706', border: isPaid ? '1px solid rgba(5,150,105,0.3)' : '1px solid rgba(245,158,11,0.3)', textTransform: 'uppercase' }}>{reg.paymentStatus}</span></td></tr>
                                        <tr style={{ borderTop: '1.5px solid #111827' }}><td style={{ paddingTop: '0.45rem', fontWeight: 800, fontSize: '0.88rem' }}>Total Paid</td><td style={{ paddingTop: '0.45rem', textAlign: 'right', fontWeight: 900, fontSize: '1rem' }}>{isFree ? 'FREE' : `৳ ${reg.price}`}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                                <div style={{ padding: '12px', background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                                    <QRCodeSVG value={reg._id} size={130} level="M" bgColor="#ffffff" fgColor="#0f1a38" />
                                </div>
                                <div style={{ fontSize: '0.58rem', color: '#9ca3af', textAlign: 'center', fontWeight: 600 }}>SCAN FOR ENTRY</div>
                                <div style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: '#374151', fontWeight: 700 }}>#{ticketNo}</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', background: '#f9fafb' }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e5e7eb', flexShrink: 0, marginLeft: '-12px' }} />
                        <div style={{ flex: 1, borderTop: '2px dashed #d1d5db', margin: '0 0.5rem' }} />
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e5e7eb', flexShrink: 0, marginRight: '-12px' }} />
                    </div>

                    <div style={{ background: '#f9fafb', borderTop: '1px solid #e5e7eb', padding: '1rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ fontSize: '0.62rem', color: '#9ca3af' }}><span style={{ fontWeight: 700, color: '#6b7280' }}>Registration ID: </span><span style={{ fontFamily: 'monospace' }}>{reg._id}</span></div>
                        <div style={{ fontSize: '0.62rem', color: '#9ca3af' }}><span style={{ fontWeight: 700, color: '#6b7280' }}>Issued: </span>{issueDate}</div>
                        <div style={{ fontSize: '0.62rem', color: '#9ca3af' }}>Digitally verified pass. Present QR at event entrance.</div>
                    </div>
                </div>

                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        </div>
    );
};

export default TicketPDF;
