'use client';

import React, { useState } from 'react';
import { Target, Search, Plus, UserCheck, Filter, ArrowRight, UserPlus, CheckCircle2 } from 'lucide-react';
import { ManagerShell } from '@/components/layout/ManagerShell';

const MOCK_LEADS = [
  {
    id: 'LD-401',
    leadName: 'Central Chiller Maintenance Inquiry',
    company: 'Capital Plaza Commercial Tower',
    contact: 'Eng. Salem Al Dhaheri',
    phone: '+971 50 234 5678',
    source: 'Website Inbound',
    estimatedValue: 'AED 340,000',
    assignedRep: 'Alex Rivera (Ops Mgr)',
    status: 'Qualified',
    createdDate: '24-09-2026',
  },
  {
    id: 'LD-402',
    leadName: 'VRF Air Conditioning Retrofit',
    company: 'Al Reem Residential Complex',
    contact: 'Mariam Al Zaabi',
    phone: '+971 55 876 5432',
    source: 'Referral',
    estimatedValue: 'AED 180,000',
    assignedRep: 'Unassigned',
    status: 'New',
    createdDate: '25-09-2026',
  },
  {
    id: 'LD-403',
    leadName: 'Emergency Duct Inspection & Sanitization',
    company: 'Oasis International School',
    contact: 'Principal Arthur Wright',
    phone: '+971 2 554 4321',
    source: 'Direct Phone',
    estimatedValue: 'AED 65,000',
    assignedRep: 'Tariq Mansour',
    status: 'Proposal Sent',
    createdDate: '23-09-2026',
  },
  {
    id: 'LD-404',
    leadName: 'Industrial Refrigeration Plant Audit',
    company: 'Etihad Food Processing Facility',
    contact: 'Hamdan Al Qadi',
    phone: '+971 52 345 6789',
    source: 'Field Campaign',
    estimatedValue: 'AED 520,000',
    assignedRep: 'Zayed Al Qasimi',
    status: 'Contacted',
    createdDate: '21-09-2026',
  },
];

export default function ManagerLeadsPage() {
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [assigningLeadId, setAssigningLeadId] = useState<string | null>(null);
  const [selectedRep, setSelectedRep] = useState('Tariq Mansour');

  const handleAssign = (id: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, assignedRep: selectedRep, status: 'Qualified' } : l))
    );
    setAssigningLeadId(null);
  };

  const filtered = leads.filter((l) => {
    const matchSearch =
      l.leadName.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase()) ||
      l.contact.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <ManagerShell
      title="Lead Operations & Assignment"
      subtitle="Review incoming commercial leads, qualify requirements, and assign technical sales reps"
    >
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Top Controls */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search leads by name, client, or rep..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
            </select>
          </div>

          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors">
            <Plus className="w-3.5 h-3.5" />
            <span>+ Create Lead</span>
          </button>
        </div>

        {/* Leads Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 text-[11px] font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Opportunity Name</th>
                <th className="py-3 px-3">Company / Client</th>
                <th className="py-3 px-3">Est. Value</th>
                <th className="py-3 px-3">Source</th>
                <th className="py-3 px-3">Assigned Rep</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{l.leadName}</p>
                    <p className="text-[11px] text-slate-400">{l.id} · {l.createdDate}</p>
                  </td>
                  <td className="py-3.5 px-3">
                    <p className="text-slate-800 font-medium">{l.company}</p>
                    <p className="text-[11px] text-slate-400">{l.contact} ({l.phone})</p>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-blue-700">{l.estimatedValue}</td>
                  <td className="py-3.5 px-3 text-slate-600">{l.source}</td>
                  <td className="py-3.5 px-3">
                    {l.assignedRep === 'Unassigned' ? (
                      <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        Unassigned
                      </span>
                    ) : (
                      <span className="font-semibold text-slate-800">{l.assignedRep}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        l.status === 'New'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : l.status === 'Qualified'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {l.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {assigningLeadId === l.id ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <select
                          value={selectedRep}
                          onChange={(e) => setSelectedRep(e.target.value)}
                          className="bg-white border border-slate-300 rounded px-2 py-1 text-xs"
                        >
                          <option value="Tariq Mansour">Tariq Mansour</option>
                          <option value="Zayed Al Qasimi">Zayed Al Qasimi</option>
                          <option value="Bilal Ahmed">Bilal Ahmed</option>
                          <option value="Alex Rivera (Ops Mgr)">Alex Rivera</option>
                        </select>
                        <button
                          onClick={() => handleAssign(l.id)}
                          className="px-2.5 py-1 bg-emerald-600 text-white rounded font-bold text-[11px] shadow-xs"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAssigningLeadId(l.id)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Assign</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ManagerShell>
  );
}
