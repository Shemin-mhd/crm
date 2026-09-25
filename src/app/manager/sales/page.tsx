'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Briefcase,
  Search,
  Plus,
  DollarSign,
  TrendingUp,
  FileText,
  Receipt,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { ManagerShell } from '@/components/layout/ManagerShell';

const MOCK_DEALS = [
  {
    id: 'DEAL-901',
    title: 'Al Ain Hospital Central Chiller Replacement',
    client: 'Al Ain Health Authority',
    amount: 480000,
    stage: 'Under Approval',
    probability: '85%',
    owner: 'Alex Rivera (Ops Mgr)',
    closeDate: '30-09-2026',
    status: 'In Progress',
  },
  {
    id: 'DEAL-902',
    title: 'Industrial VRF Air Filtration Retrofit',
    client: 'Etihad Warehousing Hub',
    amount: 295000,
    stage: 'Quotation Sent',
    probability: '60%',
    owner: 'Tariq Mansour',
    closeDate: '05-10-2026',
    status: 'In Progress',
  },
  {
    id: 'DEAL-903',
    title: 'Building Automation & Energy Saving AMC',
    client: 'Yas Marina Commercial Center',
    amount: 175000,
    stage: 'Negotiation',
    probability: '75%',
    owner: 'Zayed Al Qasimi',
    closeDate: '12-10-2026',
    status: 'Won',
  },
  {
    id: 'DEAL-904',
    title: 'Annual HVAC Maintenance Contract 2026-27',
    client: 'Apex Logistics Complex',
    amount: 320000,
    stage: 'Won',
    probability: '100%',
    owner: 'Alex Rivera (Ops Mgr)',
    closeDate: '15-09-2026',
    status: 'Won',
  },
];

function ManagerSalesContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'opportunities';
  const [search, setSearch] = useState('');

  const totalPipeline = MOCK_DEALS.reduce((acc, d) => acc + d.amount, 0);
  const totalWon = MOCK_DEALS.filter((d) => d.status === 'Won').reduce((acc, d) => acc + d.amount, 0);

  return (
    <ManagerShell
      title="Commercial & Sales Operations"
      subtitle="Track active opportunities, pipeline velocity, quotations, and contract orders"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Pipeline Value</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">AED {totalPipeline.toLocaleString()}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">4 Active Opportunities</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Won Revenue (Q3)</p>
          <p className="text-2xl font-extrabold text-blue-600 mt-1">AED {totalWon.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400 mt-1">2 Closed Deals</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Win Rate</p>
          <p className="text-2xl font-extrabold text-indigo-600 mt-1">78.5%</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">+4.2% vs Target</p>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search deals, clients, or reps..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors">
            <Plus className="w-3.5 h-3.5" />
            <span>+ New Opportunity</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 text-[11px] font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Deal / Opportunity</th>
                <th className="py-3 px-3">Client Facility</th>
                <th className="py-3 px-3 text-right">Deal Value</th>
                <th className="py-3 px-3">Stage</th>
                <th className="py-3 px-3 text-center">Probability</th>
                <th className="py-3 px-3">Lead Owner</th>
                <th className="py-3 px-3">Target Close</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_DEALS.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{d.title}</p>
                    <p className="text-[11px] text-slate-400">{d.id}</p>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-800">{d.client}</td>
                  <td className="py-3.5 px-3 text-right font-extrabold text-blue-700">
                    AED {d.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        d.stage === 'Won'
                          ? 'bg-emerald-100 text-emerald-800'
                          : d.stage === 'Under Approval'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {d.stage}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center font-bold text-slate-700">{d.probability}</td>
                  <td className="py-3.5 px-3 text-slate-700">{d.owner}</td>
                  <td className="py-3.5 px-3 font-semibold text-slate-600">{d.closeDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ManagerShell>
  );
}

export default function ManagerSalesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Sales module...</div>}>
      <ManagerSalesContent />
    </Suspense>
  );
}
