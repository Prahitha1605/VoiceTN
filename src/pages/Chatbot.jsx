import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Bot, Lock, Home, FileText, Shield } from 'lucide-react';
import Footer from '../components/Footer';

export default function Chatbot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([{
      text: `Hello! I am here to help you understand your rights before filing a complaint. Please describe your issue in your own words in English or Tamil.\n\nவணக்கம்! புகார் பதிவு செய்வதற்கு முன் உங்களுக்கு வழிகாட்ட நான் இங்கே இருக்கிறேன். உங்கள் பிரச்சனையை சொல்லுங்கள்.`,
      sender: 'bot',
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const localFallbackResponse = () =>
    `I understand your concern. Based on your message, this may relate to a public grievance.\n\nPossible category: General Complaint\nDepartment: District Collector Office\n\nYou may file this complaint through this platform.\n\n---\n\nஉங்கள் பிரச்சனை ஒரு பொதுப் புகாராக இருக்கலாம். மாவட்ட ஆட்சியர் அலுவலகம் இதைப் பரிசீலிக்கலாம்.\n\nYou may click File My Complaint above to proceed, or continue asking me questions.`;

  const callGroqAPI = async (userMessage) => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      console.log('No API key found');
      return localFallbackResponse();
    }

    const systemPrompt = `You are a bilingual AI assistant for a government grievance system in Tamil Nadu. Your job is to guide citizens in understanding their problem. For ANY user input: 1. Understand the issue 2. Suggest a category: Corruption, Education Issue, Police Issue, Public Service Delay, Infrastructure, Health, Other 3. Suggest: Category, Possible law (simple explanation), Department responsible, Whether it can be filed here. RULES: Be calm, helpful, respectful. DO NOT judge. DO NOT use words like "illegal", "must", "should". Use simple language. Always reply in English + Tamil. FORMAT: [English Response] --- [Tamil Response]. End with: "You may click File My Complaint above to proceed, or continue asking me questions."`;

    try {
      console.log('Making API call with key:', apiKey.substring(0, 10) + '...');
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMessage }],
          temperature: 0.5,
          max_tokens: 800
        })
      });
      console.log('API response status:', response.status);
      if (!response.ok) {
        console.log('API error:', await response.text());
        return localFallbackResponse();
      }
      const data = await response.json();
      console.log('API response data:', data);
      return data?.choices?.[0]?.message?.content || localFallbackResponse();
    } catch (error) {
      console.log('API call failed:', error);
      return localFallbackResponse();
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);
    await new Promise(res => setTimeout(res, 500));
    const botResponse = await callGroqAPI(currentInput);
    setMessages(prev => [...prev, { text: botResponse, sender: 'bot', timestamp: new Date() }]);
    setIsTyping(false);
  };

  return (
    <div className="page-shell">

      {/* HEADER */}
      <header className="frosted-bar border-b border-[#334155] sticky top-0 z-50">
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#111827', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bot size={18} color="#f4a300" />
            </div>
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.2em', color: '#94a3b8', textTransform: 'uppercase', lineHeight: 1 }}>AI Chat</p>
              <h1 style={{ fontSize: 17, fontWeight: 700, color: '#f8fafc', lineHeight: 1.3, marginTop: 2 }}>Legal Assistant</h1>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={() => navigate('/complaint-form')}
              className="pill-btn pill-btn-outline"
              style={{ fontSize: 13, padding: '6px 14px' }}
            >
              <FileText size={14} />
              File Now
            </button>
            <button
              onClick={() => navigate('/')}
              className="pill-btn pill-btn-outline"
              style={{ fontSize: 13, padding: '6px 14px' }}
            >
              <Home size={14} />
              Home
            </button>
          </div>
        </div>
      </header>

      {/* SECURITY BAR */}
      <div style={{ background: 'rgba(30,41,59,0.4)', borderBottom: '1px solid #334155', padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Lock size={13} color="#94a3b8" />
        <span style={{ fontSize: 12, color: '#94a3b8' }}>Your identity is protected · உங்கள் அடையாளம் பாதுகாக்கப்படுகிறது</span>
      </div>

      {/* MAIN */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '32px 24px' }}>
        <div style={{ width: '100%', maxWidth: 860 }}>

          <div className="surface-card" style={{ display: 'flex', flexDirection: 'column', height: '70vh', overflow: 'hidden' }}>

            {/* MESSAGES */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  {msg.sender === 'bot' && (
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: '#0f172a', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: 10, marginTop: 2 }}>
                      <Bot size={14} color="#f4a300" />
                    </div>
                  )}
                  <div style={{
                    maxWidth: '75%',
                    padding: '12px 16px',
                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.sender === 'user' ? '#f4a300' : '#0f172a',
                    color: msg.sender === 'user' ? '#0f172a' : '#f8fafc',
                    border: msg.sender === 'bot' ? '1px solid #334155' : 'none',
                    fontSize: 13,
                    lineHeight: 1.75,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontWeight: msg.sender === 'user' ? 500 : 400,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: '#0f172a', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={14} color="#f4a300" />
                  </div>
                  <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '18px 18px 18px 4px', padding: '10px 16px', display: 'flex', gap: 5, alignItems: 'center' }}>
                    {[0, 1, 2].map(d => (
                      <div key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8', animation: 'bounce 1.2s infinite', animationDelay: `${d * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* INPUT BAR */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #334155', background: '#111827', display: 'flex', alignItems: 'center', gap: 12 }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message in English or Tamil..."
                className="input-dark"
                style={{ flex: 1, borderRadius: 999, padding: '10px 20px', fontSize: 13, minHeight: 'unset', height: 44 }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: !input.trim() || isTyping ? '#1e293b' : '#f4a300',
                  border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: !input.trim() || isTyping ? 'not-allowed' : 'pointer',
                  flexShrink: 0, transition: 'all 150ms ease'
                }}
              >
                <Send size={16} color={!input.trim() || isTyping ? '#64748b' : '#0f172a'} />
              </button>
            </div>

          </div>

          {/* Footnote */}
          <p style={{ textAlign: 'center', fontSize: 12, color: '#64748b', marginTop: 16 }}>
            AI responses are for guidance only · இது வழிகாட்டுதலுக்காக மட்டுமே
          </p>
        </div>
      </main>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>

      <Footer />
    </div>
  );
}