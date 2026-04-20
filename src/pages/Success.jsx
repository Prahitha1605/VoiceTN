import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Home, Lock, Shield, Copy, Download } from 'lucide-react';
import Footer from '../components/Footer';

export default function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const caseId = location.state?.caseId || 'TN-2026-00000';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(caseId);
    alert('Case ID copied!');
  };

  return (
    <div className="page-shell">

      {/* HEADER */}
      <header className="frosted-bar border-b border-[#334155] sticky top-0 z-50">
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#f4a300', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CheckCircle size={18} color="#0f172a" />
            </div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 600, color: '#f8fafc', lineHeight: 1.2 }}>Complaint Submitted</p>
              <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.2 }}>புகார் பதிவு செய்யப்பட்டது</p>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="pill-btn pill-btn-outline" style={{ fontSize: 14 }}>
            <Home size={15} />
            Home
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '56px 24px', width: '100%', textAlign: 'center' }}>

          {/* Icon */}
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#f4a300', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
            <CheckCircle size={36} color="#0f172a" />
          </div>

          {/* Title */}
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#f8fafc', marginBottom: 8, lineHeight: 1.3 }}>
            Complaint Submitted Successfully
          </h1>
          <p style={{ fontSize: 15, color: '#94a3b8', marginBottom: 36 }}>
            உங்கள் புகார் வெற்றிகரமாக பதிவு செய்யப்பட்டது
          </p>

          {/* Case ID Card */}
          <div className="surface-card" style={{ padding: '28px 32px', marginBottom: 20, textAlign: 'center' }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#f8fafc', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#94a3b8' }}>
              Your Case ID
            </p>
            <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
              <p style={{ fontSize: 22, fontFamily: 'monospace', fontWeight: 700, color: '#f4a300', letterSpacing: '0.08em', marginBottom: 6 }}>
                {caseId}
              </p>
              <p style={{ fontSize: 12, color: '#94a3b8' }}>
                Save this Case ID to track your complaint status
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={copyToClipboard}
                className="pill-btn pill-btn-outline"
                style={{ fontSize: 13 }}
              >
                <Copy size={14} />
                Copy ID
              </button>
              <button
                onClick={() => window.print()}
                className="pill-btn pill-btn-solid"
                style={{ fontSize: 13 }}
              >
                <Download size={14} />
                Print
              </button>
            </div>
          </div>

          {/* Security Card */}
          <div className="surface-card" style={{ padding: '18px 28px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <Lock size={18} color="#f4a300" style={{ flexShrink: 0 }} />
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#f8fafc', lineHeight: 1.3 }}>Your identity is fully protected</p>
              <p style={{ fontSize: 12, color: '#94a3b8' }}>உங்கள் அடையாளம் பாதுகாக்கப்படுகிறது</p>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="surface-card" style={{ padding: '28px 32px', marginBottom: 36, textAlign: 'left' }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#f8fafc', marginBottom: 20, textAlign: 'center' }}>
              What happens next?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Step number="1">Your complaint will be reviewed within 7 working days</Step>
              <Step number="2">You can track status using your Case ID</Step>
              <Step number="3">High-priority complaints will be addressed within 48 hours</Step>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            <button onClick={() => navigate('/')} className="pill-btn pill-btn-solid" style={{ fontSize: 14 }}>
              <Home size={16} />
              Return to Home
            </button>
            <button onClick={() => navigate('/citizen-welcome')} className="pill-btn pill-btn-outline" style={{ fontSize: 14 }}>
              <Shield size={16} />
              File Another Complaint
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

function Step({ number, children }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#f4a300', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
        {number}
      </div>
      <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.7 }}>{children}</p>
    </div>
  );
}