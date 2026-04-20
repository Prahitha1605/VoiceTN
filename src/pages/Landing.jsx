import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Building, Shield, Zap, Globe } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="page-shell flex flex-col min-h-screen">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-30 frosted-bar border-b border-[#334155]">
        <div className="page-content max-w-7xl mx-auto flex items-center justify-between py-3 sm:py-4 px-4 sm:px-6 gap-4">

          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-[#111827] border border-[#334155] flex-shrink-0">
              <Shield className="w-5 h-5 text-[#f4a300]" />
            </div>

            <div className="leading-tight min-w-0">
              <p className="text-xs tracking-widest uppercase text-[#94a3b8] truncate">
                Tamil Nadu Government
              </p>
              <h1 className="text-base sm:text-lg md:text-xl font-semibold text-[#f8fafc] truncate">
                Grievance Redressal Portal
              </h1>
            </div>
          </div>

          <button
            onClick={() => navigate('/citizen-welcome')}
            className="pill-btn pill-btn-solid"
          >
            <Users size={18} className="text-[#0f172a]" />
            <span className="hidden sm:inline">File a Complaint</span>
            <span className="sm:hidden">File</span>
          </button>

        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 page-content max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16">

        {/* ===== HERO SECTION ===== */}
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh] sm:min-h-[70vh]">

          {/* LEFT CONTENT */}
          <div className="space-y-6">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#334155] bg-[#111827] text-xs text-[#94a3b8] w-fit">
              <Zap size={14} className="text-[#f4a300] flex-shrink-0" />
              <span>Trusted civic support for Tamil Nadu citizens</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-[#f8fafc]">
              Build trust with every{" "}
              <span className="hero-highlight">Grievance</span>
            </h1>

            <p className="text-[#cbd5e1] max-w-lg text-sm sm:text-base leading-relaxed">
              A modern Tamil Nadu complaint portal with AI-guided filing,
              anonymous protection, and bilingual support — made for citizens
              and authorities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/citizen-welcome')}
                className="pill-btn pill-btn-solid"
              >
                <Users size={18} className="text-[#0f172a]" />
                Citizen Portal
              </button>

              <button
                onClick={() => navigate('/authority')}
                className="pill-btn pill-btn-outline"
              >
                <Building size={18} className="text-[#f4a300]" />
                Authority Login
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="small-pill text-xs sm:text-sm">Anonymous</span>
              <span className="small-pill text-xs sm:text-sm">Instant</span>
              <span className="small-pill text-xs sm:text-sm">Legal Guidance</span>
            </div>

          </div>

          {/* RIGHT CARD */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md space-y-4">

              <div className="surface-card p-5 space-y-4">

                <div className="flex items-center justify-between border border-[#334155] rounded-xl p-4 bg-[#0f172a]">
                  <Shield className="w-6 h-6 text-[#f4a300]" />
                  <div className="text-right min-w-0">
                    <p className="text-xs uppercase text-[#94a3b8] truncate">
                      Civic Support
                    </p>
                    <p className="text-sm text-[#f8fafc] truncate">
                      Guided, safe, verified
                    </p>
                  </div>
                </div>

                {/* Feature blocks */}
                {[
                  {
                    title: "AI-assisted filing",
                    desc: "Get category guidance and Tamil support"
                  },
                  {
                    title: "Anonymous by default",
                    desc: "Submit without revealing your identity"
                  },
                  {
                    title: "Trusted workflow",
                    desc: "Clear next steps for every complaint"
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="border border-[#334155] rounded-xl p-4 bg-[#0f172a]"
                  >
                    <p className="text-xs text-[#94a3b8] mb-1">
                      {item.title}
                    </p>
                    <p className="text-sm font-medium text-[#f8fafc]">
                      {item.desc}
                    </p>
                  </div>
                ))}

              </div>

            </div>
          </div>

        </div>

        {/* ===== FEATURES SECTION ===== */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 sm:mt-16">

          {[
            {
              icon: Shield,
              title: "Anonymous Filing",
              desc: "Submit safely without exposing your identity."
            },
            {
              icon: Zap,
              title: "AI Guidance",
              desc: "Understand the right category instantly."
            },
            {
              icon: Globe,
              title: "Bilingual Support",
              desc: "Tamil and English guidance for every citizen."
            }
          ].map((item, i) => (
            <div key={i} className="surface-card p-6 text-center">

              <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center rounded-xl bg-[#0f172a] text-[#f4a300]">
                <item.icon size={20} />
              </div>

              <h3 className="text-lg font-semibold text-[#f8fafc] mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-[#94a3b8]">
                {item.desc}
              </p>

            </div>
          ))}

        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#07101f] border-t border-[#334155] mt-auto">
        <div className="page-content text-center text-sm text-[#94a3b8] py-6">
          All complaints are confidential | Powered by AI | Tamil Nadu Government
        </div>
      </footer>

    </div>
  );
}