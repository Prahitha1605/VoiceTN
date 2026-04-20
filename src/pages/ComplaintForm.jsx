import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Lock, FileText, MapPin, Calendar, Upload, Send, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';
import Footer from '../components/Footer';

export default function ComplaintForm() {
  const navigate = useNavigate();
  const { addComplaint } = useComplaints();

  const [formData, setFormData] = useState({
    anonymous: true,
    name: '',
    mobile: '',
    district: '',
    category: '',
    department: '',
    urgency: '',
    incidentDate: '',
    location: '',
    description: '',
    evidence: null
  });

  const [errors, setErrors] = useState({});

  const districts = [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri',
    'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram', 'Kanyakumari', 'Karur',
    'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal',
    'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet',
    'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi',
    'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur',
    'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'
  ];

  const categories = [
    { value: 'Bribery/Corruption', label: 'Bribery/Corruption', urgency: 'HIGH', department: 'DVAC' },
    { value: 'Large Scale Accident/Safety Risk', label: 'Large Scale Accident/Safety Risk', urgency: 'HIGH', department: 'District Collector + Police' },
    { value: 'Official Misconduct', label: 'Official Misconduct', urgency: 'MEDIUM', department: 'District Collector Office' },
    { value: 'Land/Revenue Dispute', label: 'Land/Revenue Dispute', urgency: 'MEDIUM', department: 'Revenue Department' },
    { value: 'Theft/Criminal Activity', label: 'Theft/Criminal Activity', urgency: 'MEDIUM', department: 'Police' },
    { value: 'Public Service Delay', label: 'Public Service Delay', urgency: 'LOW', department: 'Relevant Department' },
    { value: 'Civic Infrastructure', label: 'Civic Infrastructure', urgency: 'LOW', department: 'PWD/Municipal Corporation/EB' },
    { value: 'Other', label: 'Other', urgency: 'LOW', department: 'District Collector Office' }
  ];

  const handleCategoryChange = (categoryValue) => {
    const category = categories.find(c => c.value === categoryValue);
    setFormData({
      ...formData,
      category: categoryValue,
      department: category.department,
      urgency: category.urgency
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.incidentDate) newErrors.incidentDate = 'Date of incident is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (formData.description.length < 50) newErrors.description = 'Description must be at least 50 characters';

    // Check if date is not in future
    if (formData.incidentDate) {
      const incidentDate = new Date(formData.incidentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (incidentDate > today) {
        newErrors.incidentDate = 'Date cannot be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const complaintData = {
      ...formData,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    const caseId = addComplaint(complaintData);
    navigate('/success', { state: { caseId } });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors({ ...errors, evidence: 'File size must be less than 5MB' });
        return;
      }
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
        setErrors({ ...errors, evidence: 'Please select a valid file (JPG, PNG, or PDF)' });
        return;
      }
      setFormData({ ...formData, evidence: file });
      setErrors({ ...errors, evidence: null });
    }
  };

  return (
    <div className="page-shell flex flex-col">
      {/* Header */}
      <header className="bg-[#111827] border-b border-[#334155] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 sm:py-5 gap-3 sm:gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#f4a300]/10 rounded-2xl border border-[#334155] flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-[#f4a300]" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-semibold text-[#f8fafc] truncate">File Complaint</h1>
                <p className="text-xs sm:text-sm text-[#94a3b8] truncate">புகார் பதிவு செய்யுங்கள்</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-2xl border border-[#334155] text-[#f8fafc] hover:bg-[#1e293b] transition-colors text-xs sm:text-sm font-medium flex-shrink-0 whitespace-nowrap"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>
        </div>
      </header>

      {/* Info Banners */}
      <div className="bg-[#0f172a]/70 border-b border-[#334155]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-xs sm:text-sm text-[#cbd5e1]">
            <div className="flex items-center gap-2 min-w-0">
              <FileText size={16} className="text-[#f4a300] flex-shrink-0" />
              <span className="truncate">Need help choosing the right category?</span>
            </div>
            <button
              onClick={() => navigate('/chatbot')}
              className="inline-flex items-center gap-2 rounded-full border border-[#f4a300] bg-[#f4a300]/10 px-3 sm:px-4 py-2 text-[#f4a300] font-semibold hover:bg-[#f4a300]/15 transition-colors text-xs sm:text-sm flex-shrink-0 whitespace-nowrap"
            >
              Chat with AI
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#0f172a]/60 border-b border-[#334155]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-2 text-sm text-[#94a3b8]">
            <Lock size={16} className="text-[#94a3b8] shrink-0" />
            <span>Your identity is protected and anonymous</span>
          </div>
        </div>
      </div>

      {/* Form - Flex grows */}
      <main className="flex-1 page-content py-12 w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Anonymous Filing Section */}
          <div className="bg-[#111827] border border-[#334155] rounded-4xl p-6 shadow-[0_20px_60px_-35px_rgba(244,163,0,0.55)]">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.anonymous}
                onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                className="w-5 h-5 text-[#f4a300] border-[#334155] rounded focus:ring-[#f4a300]"
              />
              <div>
                <span className="font-semibold text-[#f8fafc]">File Anonymously</span>
                <p className="text-sm text-[#94a3b8] mt-0.5">Recommended for maximum protection</p>
              </div>
            </label>
          </div>

          {/* Personal Info (if not anonymous) */}
          {!formData.anonymous && (
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#f8fafc] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Optional — leave blank to stay anonymous"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-dark w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#f8fafc] mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="Optional — for Case ID via SMS"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="input-dark w-full"
                />
              </div>
            </div>
          )}

          {/* District & Category in 2 columns */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#f8fafc] mb-2">
                District *
              </label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="select-dark w-full"
              >
                <option value="">Select your district</option>
                {districts.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
              {errors.district && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.district}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#f8fafc] mb-2">
                Complaint Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="select-dark w-full"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.category}
                </p>
              )}
            </div>
          </div>

          {(formData.department || formData.urgency) && (
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#f8fafc] mb-2">
                  Concerned Department
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="input-dark w-full"
                  placeholder="Auto-suggested based on category"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#f8fafc] mb-2">
                  Urgency Level
                </label>
                <div className={`inline-flex px-3 py-2 rounded-full text-xs font-semibold ${
                  formData.urgency === 'HIGH' ? 'bg-[#7f1d1d]/20 text-[#fecaca]' :
                  formData.urgency === 'MEDIUM' ? 'bg-[#78350f]/20 text-[#fde68a]' :
                  'bg-[#14532d]/20 text-[#bbf7d0]'
                }`}>
                  {formData.urgency || 'Not set'}
                </div>
              </div>
            </div>
          )}

          {/* Incident Date & Location */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#f8fafc] mb-2">
                Date of Incident *
              </label>
              <input
                type="date"
                value={formData.incidentDate}
                onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                max={new Date().toISOString().split('T')[0]}
                className="select-dark w-full"
              />
              {errors.incidentDate && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.incidentDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#f8fafc] mb-2">
                Location of Incident *
              </label>
              <input
                type="text"
                placeholder="Village, town, or specific location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input-dark w-full"
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.location}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-[#f8fafc] mb-2">
              Complaint Description *
            </label>
            <textarea
              placeholder="Describe what happened, when, and who was involved. More detail helps faster resolution."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={5}
              className="textarea-dark w-full"
            />
            <div className="flex justify-between items-center mt-2 text-xs text-[#94a3b8]">
              <span>Minimum 50 characters required</span>
              <span>{formData.description.length} characters</span>
            </div>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.description}
              </p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-[#f8fafc] mb-2">
              Supporting Evidence (Optional)
            </label>
            <div className="border-2 border-dashed border-[#334155]  p-6 text-center bg-[#0f172a]/60">
              <Upload className="w-8 h-8 text-[#94a3b8] mx-auto mb-2" />
              <p className="text-[#cbd5e1] text-sm mb-1">Upload photos, documents, or other evidence</p>
              <p className="text-[#64748b] text-xs mb-3">Maximum 5MB (JPG, PNG, PDF)</p>
              <input
                type="file"
                accept="image/*,.pdf"rounded-3xl
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block px-4 py-2 bg-[#f4a300] text-[#0f172a] rounded-full hover:bg-[#e1ad00] cursor-pointer transition-colors text-sm font-semibold"
              >
                Choose File
              </label>
              {formData.evidence && (
                <p className="text-[#86efac] text-xs mt-2 flex items-center justify-center gap-1">
                  <CheckCircle size={14} />
                  {formData.evidence.name}
                </p>
              )}
            </div>
            {errors.evidence && (
              <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.evidence}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#f4a300] hover:bg-[#dab000] text-[#0f172a] font-semibold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Submit Complaint Anonymously
          </button>
          <p className="text-center text-[#94a3b8] text-xs">
            Your complaint will be processed securely and anonymously
          </p>
        </form>
      </main>

      <Footer />
    </div>
  );
}
