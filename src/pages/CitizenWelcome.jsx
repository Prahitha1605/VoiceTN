import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, FileText, Home, Shield, Zap } from 'lucide-react';
import Footer from '../components/Footer';

export default function CitizenWelcome() {
  const navigate = useNavigate();

  return (
    <div className="page-shell">
      {/* HEADER */}
      <header className="frosted-bar border-b border-[#334155] sticky top-0 z-50">
        <div
          style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}
          className="flex items-center justify-between"
          style={{ height: '64px' }}
        >
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                background: '#111827',
                border: '1px solid #334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Shield size={18} color="#f4a300" />
            </div>
            <div>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#94a3b8', textTransform: 'uppercase', lineHeight: 1 }}>
                Citizen Portal
              </p>
              <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', lineHeight: 1.3, marginTop: 2 }}>
                File Your Complaint
              </h1>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="pill-btn pill-btn-outline" style={{ fontSize: '14px' }}>
            <Home size={15} />
            Home
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1" style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '56px 24px', width: '100%' }}>

          {/* WELCOME CARD */}
          <div
            className="surface-card"
            style={{ padding: '32px 36px', marginBottom: '24px' }}
          >
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '14px',
                  background: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <Zap size={20} color="#f4a300" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Welcome
                </p>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#f8fafc', marginBottom: '12px', lineHeight: 1.3 }}>
                  Tamil Nadu Grievance Support
                </h2>
                <p style={{ color: '#cbd5e1', lineHeight: 1.75, fontSize: '14px', marginBottom: '8px' }}>
                  Before filing your complaint, our AI assistant can help you understand what category your issue falls under, which law may apply, and which department can help you.
                </p>
                <p style={{ color: '#94a3b8', lineHeight: 1.75, fontSize: '13px' }}>
                  புகார் செய்யும் முன், எங்கள் AI உதவியாளர் உங்கள் பிரச்சனை எந்த வகைக்கு வருகின்றது, எந்த சட்டம் பொருந்தும் மற்றும் எந்த துறை உதவி செய்யும் என்று தெளிவுபடுத்த உதவும்.
                </p>
              </div>
            </div>
          </div>

          {/* ACTION CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '28px' }}>

            {/* AI CHAT CARD */}
            <div className="surface-card" style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    background: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <MessageCircle size={18} color="#f4a300" />
                </div>
                <div>
                  <p style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>
                    AI Chat
                  </p>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f8fafc', marginBottom: '8px' }}>
                    Chat with AI Assistant
                  </h3>
                  <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.7 }}>
                    Get personalized guidance about your complaint category, relevant laws, and the right department.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/chatbot')}
                className="pill-btn pill-btn-solid"
                style={{ fontSize: '14px', alignSelf: 'flex-start' }}
              >
                <MessageCircle size={15} />
                Start Chat
              </button>
            </div>

            {/* DIRECT FILE CARD */}
            <div className="surface-card" style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    background: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <FileText size={18} color="#f4a300" />
                </div>
                <div>
                  <p style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Direct Filing
                  </p>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f8fafc', marginBottom: '8px' }}>
                    File Complaint Directly
                  </h3>
                  <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.7 }}>
                    Skip the chat and submit your complaint directly with all required details.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/complaint-form')}
                className="pill-btn pill-btn-outline"
                style={{ fontSize: '14px', alignSelf: 'flex-start' }}
              >
                <FileText size={15} />
                File Now
              </button>
            </div>
          </div>

          {/* FOOTNOTE */}
          <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
            Need help? Our AI assistant is available 24/7 to guide you through the process.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}