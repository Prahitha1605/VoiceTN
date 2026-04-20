import React, { createContext, useState, useCallback } from 'react';

export const ComplaintContext = createContext();

// Mock complaints data
const MOCK_COMPLAINTS = [
  {
    id: 'TN-2025-10234',
    category: 'Bribery / Corruption',
    district: 'Chennai',
    department: 'DVAC',
    urgency: 'HIGH',
    status: 'Pending',
    name: 'Anonymous',
    date: '2025-04-10',
    location: 'Revenue Office, Chennai',
    description: 'Officials demanding bribery for land registration documents',
    anonymous: true,
  },
  {
    id: 'TN-2025-10235',
    category: 'Large Scale Accident / Safety Risk',
    district: 'Madurai',
    department: 'District Collector + Police',
    urgency: 'HIGH',
    status: 'In Progress',
    name: 'Anonymous',
    date: '2025-04-09',
    location: 'Bypass Road, Madurai',
    description: 'Accident site with no warning signs, multiple casualties',
    anonymous: true,
  },
  {
    id: 'TN-2025-10236',
    category: 'Official Misconduct',
    district: 'Coimbatore',
    department: 'District Collector Office',
    urgency: 'MEDIUM',
    status: 'Pending',
    name: 'Priya R.',
    date: '2025-04-08',
    location: 'District Collector Office, Coimbatore',
    description: 'Official using abusive language and refusing to accept complaint',
    anonymous: false,
  },
  {
    id: 'TN-2025-10237',
    category: 'Theft / Criminal Activity',
    district: 'Salem',
    department: 'Police',
    urgency: 'MEDIUM',
    status: 'Pending',
    name: 'Anonymous',
    date: '2025-04-07',
    location: 'Village, Salem',
    description: 'Farm equipment stolen, no FIR filed',
    anonymous: true,
  },
  {
    id: 'TN-2025-10238',
    category: 'Land / Revenue Dispute',
    district: 'Villupuram',
    department: 'Revenue Department',
    urgency: 'MEDIUM',
    status: 'In Progress',
    name: 'Murugan K.',
    date: '2025-04-06',
    location: 'Revenue Office, Villupuram',
    description: 'Land boundary dispute with neighbor, revenue office not intervening',
    anonymous: false,
  },
  {
    id: 'TN-2025-10239',
    category: 'Public Service Delay',
    district: 'Thanjavur',
    department: 'Health Department',
    urgency: 'LOW',
    status: 'Pending',
    name: 'Anonymous',
    date: '2025-04-05',
    location: 'Government Hospital, Thanjavur',
    description: 'Delayed vaccination camp, no staff available',
    anonymous: true,
  },
  {
    id: 'TN-2025-10240',
    category: 'Civic Infrastructure',
    district: 'Tirunelveli',
    department: 'PWD',
    urgency: 'LOW',
    status: 'Resolved',
    name: 'Kavitha S.',
    date: '2025-04-04',
    location: 'Main Road, Tirunelveli',
    description: 'Broken street light causing safety hazard',
    anonymous: false,
  },
  {
    id: 'TN-2025-10241',
    category: 'Bribery / Corruption',
    district: 'Vellore',
    department: 'DVAC',
    urgency: 'HIGH',
    status: 'Pending',
    name: 'Anonymous',
    date: '2025-04-03',
    location: 'Municipality Office, Vellore',
    description: 'Building permit officials asking for money under the table',
    anonymous: true,
  },
];

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState(MOCK_COMPLAINTS);

  const addComplaint = useCallback((complaintData) => {
    const newComplaint = {
      id: `TN-${new Date().getFullYear()}-${Math.floor(Math.random() * 90000) + 10000}`,
      ...complaintData,
    };
    setComplaints((prev) => [newComplaint, ...prev]);
    return newComplaint.id;
  }, []);

  const updateComplaintStatus = useCallback((complaintId, newStatus) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint
      )
    );
  }, []);

  const getAllComplaints = useCallback(() => complaints, [complaints]);

  const getComplaintById = useCallback(
    (id) => complaints.find((c) => c.id === id),
    [complaints]
  );

  const getStats = useCallback(() => {
    return {
      total: complaints.length,
      high: complaints.filter((c) => c.urgency === 'HIGH').length,
      medium: complaints.filter((c) => c.urgency === 'MEDIUM').length,
      low: complaints.filter((c) => c.urgency === 'LOW').length,
      pending: complaints.filter((c) => c.status === 'Pending').length,
      inProgress: complaints.filter((c) => c.status === 'In Progress').length,
      resolved: complaints.filter((c) => c.status === 'Resolved').length,
    };
  }, [complaints]);

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        addComplaint,
        updateComplaintStatus,
        getAllComplaints,
        getComplaintById,
        getStats,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => {
  const context = React.useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaints must be used within ComplaintProvider');
  }
  return context;
};
