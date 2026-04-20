import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, AlertTriangle, Clock, CheckCircle, Filter, Home, Shield } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useComplaints } from '../context/ComplaintContext';
import Footer from '../components/Footer';

export default function AuthorityDashboard() {
  const navigate = useNavigate();
  const { complaints, updateComplaintStatus, getStats } = useComplaints();
  const [activeTab, setActiveTab] = useState('list');
  const [filters, setFilters] = useState({ urgency: 'All', category: 'All', district: 'All' });

  const stats = getStats();
  const categories = ['All', ...new Set(complaints.map((c) => c.category))];
  const districts = ['All', ...new Set(complaints.map((c) => c.district))];

  const filteredComplaints = complaints.filter((c) => {
    if (filters.urgency !== 'All' && c.urgency !== filters.urgency) return false;
    if (filters.category !== 'All' && c.category !== filters.category) return false;
    if (filters.district !== 'All' && c.district !== filters.district) return false;
    return true;
  });

  const categoryChartData = categories
    .filter((cat) => cat !== 'All')
    .map((cat) => ({ name: cat, count: complaints.filter((c) => c.category === cat).length }));

  const urgencyChartData = [
    { name: 'High', value: stats.high, color: '#dc2626' },
    { name: 'Medium', value: stats.medium, color: '#d97706' },
    { name: 'Low', value: stats.low, color: '#16a34a' },
  ];

  const summaryCards = [
    { label: 'Total Complaints', value: stats.total, icon: FileText, color: '#94a3b8' },
    { label: 'High Urgency', value: stats.high, icon: AlertTriangle, color: '#ef4444' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: '#f59e0b' },
    { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: '#22c55e' },
  ];

  return (
    <div className="page-shell">

      {/* HEADER */}
      <header className="frosted-bar border-b border-[#334155] sticky top-0 z-50">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#f4a300', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Shield size={18} color="#0f172a" />
            </div>
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.2em', color: '#94a3b8', textTransform: 'uppercase', lineHeight: 1 }}>Authority Portal</p>
              <h1 style={{ fontSize: 17, fontWeight: 700, color: '#f8fafc', lineHeight: 1.3, marginTop: 2 }}>District Grievance Dashboard</h1>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="pill-btn pill-btn-outline" style={{ fontSize: 14 }}>
            <Home size={15} />
            Home
          </button>
        </div>
      </header>

      {/* SECURITY BAR */}
      <div style={{ background: 'rgba(15,23,42,0.7)', borderBottom: '1px solid #334155', padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Shield size={13} color="#f4a300" />
        <span style={{ fontSize: 12, color: '#94a3b8' }}>Official Authority Access Only</span>
      </div>

      {/* MAIN */}
      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 56px', width: '100%' }}>

          {/* SUMMARY CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
            {summaryCards.map((card, i) => (
              <div key={i} className="surface-card" style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <p style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>{card.label}</p>
                  <p style={{ fontSize: 28, fontWeight: 700, color: '#f8fafc', lineHeight: 1 }}>{card.value}</p>
                </div>
                <card.icon size={28} color={card.color} style={{ flexShrink: 0, opacity: 0.85 }} />
              </div>
            ))}
          </div>

          {/* TABS + CONTENT */}
          <div className="surface-card" style={{ overflow: 'hidden' }}>

            {/* Tab Bar */}
            <div style={{ borderBottom: '1px solid #334155', display: 'flex' }}>
              {['list', 'overview'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '14px 28px',
                    fontSize: 13,
                    fontWeight: 600,
                    background: 'none',
                    border: 'none',
                    borderBottom: `2px solid ${activeTab === tab ? '#f4a300' : 'transparent'}`,
                    color: activeTab === tab ? '#f4a300' : '#94a3b8',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'color 150ms ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab === 'list' ? 'Complaints List' : 'Overview'}
                </button>
              ))}
            </div>

            <div style={{ padding: '28px 32px' }}>

              {/* LIST TAB */}
              {activeTab === 'list' && (
                <>
                  {/* Filters */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Filter size={15} color="#94a3b8" />
                      <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Filters</span>
                    </div>
                    {[
                      { key: 'urgency', options: ['All', 'HIGH', 'MEDIUM', 'LOW'], label: 'Urgency' },
                      { key: 'category', options: categories, label: 'Category' },
                      { key: 'district', options: districts, label: 'District' },
                    ].map(({ key, options, label }) => (
                      <select
                        key={key}
                        value={filters[key]}
                        onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
                        className="select-dark"
                        style={{ fontSize: 13, minHeight: 40, padding: '0 14px', borderRadius: 999 }}
                      >
                        {options.map((opt) => (
                          <option key={opt} value={opt}>{opt === 'All' ? `All ${label}` : opt}</option>
                        ))}
                      </select>
                    ))}
                  </div>

                  {/* Complaints */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {filteredComplaints.length > 0 ? filteredComplaints.map((complaint) => (
                      <div key={complaint.id} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 20, padding: '24px 28px' }}>

                        {/* Top row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px 24px', marginBottom: 16 }}>
                          <div>
                            <p style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Case ID</p>
                            <p style={{ fontSize: 15, fontWeight: 700, color: '#f4a300' }}>{complaint.id}</p>
                          </div>
                          <div>
                            <p style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Category</p>
                            <p style={{ fontSize: 13, fontWeight: 500, color: '#f8fafc' }}>{complaint.category}</p>
                          </div>
                          <div>
                            <p style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>District</p>
                            <p style={{ fontSize: 13, fontWeight: 500, color: '#f8fafc' }}>{complaint.district}</p>
                          </div>
                          <div>
                            <p style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Urgency</p>
                            <span style={{
                              display: 'inline-flex', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700,
                              background: complaint.urgency === 'HIGH' ? 'rgba(127,29,29,0.25)' : complaint.urgency === 'MEDIUM' ? 'rgba(120,53,15,0.25)' : 'rgba(20,83,45,0.25)',
                              color: complaint.urgency === 'HIGH' ? '#fca5a5' : complaint.urgency === 'MEDIUM' ? '#fcd34d' : '#86efac',
                            }}>
                              {complaint.urgency}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7, marginBottom: 20 }}>{complaint.description}</p>

                        {/* Footer */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{
                              display: 'inline-flex', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                              background: complaint.status === 'Resolved' ? 'rgba(22,101,52,0.2)' : complaint.status === 'In Progress' ? 'rgba(30,58,138,0.2)' : 'rgba(120,53,15,0.2)',
                              color: complaint.status === 'Resolved' ? '#86efac' : complaint.status === 'In Progress' ? '#93c5fd' : '#fcd34d',
                            }}>
                              {complaint.status}
                            </span>
                            <span style={{ fontSize: 12, color: '#64748b' }}>{new Date(complaint.date).toLocaleDateString()}</span>
                          </div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button
                              onClick={() => updateComplaintStatus(complaint.id, 'In Progress')}
                              style={{ padding: '6px 16px', borderRadius: 999, fontSize: 12, fontWeight: 600, background: 'rgba(30,41,59,1)', color: '#93c5fd', border: '1px solid #334155', cursor: 'pointer' }}
                            >
                              In Progress
                            </button>
                            <button
                              onClick={() => updateComplaintStatus(complaint.id, 'Resolved')}
                              style={{ padding: '6px 16px', borderRadius: 999, fontSize: 12, fontWeight: 600, background: 'rgba(30,41,59,1)', color: '#86efac', border: '1px solid #334155', cursor: 'pointer' }}
                            >
                              Resolve
                            </button>
                          </div>
                        </div>

                      </div>
                    )) : (
                      <div style={{ textAlign: 'center', padding: '56px 0' }}>
                        <FileText size={40} color="#334155" style={{ margin: '0 auto 16px' }} />
                        <p style={{ fontSize: 14, color: '#64748b' }}>No complaints match the current filters</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                  <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 20, padding: '28px 32px' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#f8fafc', marginBottom: 24 }}>Complaints by Category</p>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={categoryChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: 12, fontSize: 13 }} />
                        <Bar dataKey="count" fill="#f4a300" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 20, padding: '28px 32px' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#f8fafc', marginBottom: 24 }}>Complaints by Urgency</p>
                    <ResponsiveContainer width="100%" height={280}>
                      <RechartsPieChart>
                        <Pie
                          data={urgencyChartData}
                          cx="50%" cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          dataKey="value"
                        >
                          {urgencyChartData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: 12, fontSize: 13 }} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}