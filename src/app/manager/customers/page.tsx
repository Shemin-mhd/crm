'use client';

import React, { useState } from 'react';
import { Building2, Search, Plus, Filter, Phone, Mail, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { ManagerShell } from '@/components/layout/ManagerShell';

const MOCK_CUSTOMERS = [
  {
    id: 'CUST-001',
    name: 'Lumina Health Systems LLC',
    contactPerson: 'Dr. Tariq Al Nuaimi',
    email: 'tariq@luminahealth.ae',
    phone: '+971 2 445 6789',
    zone: 'Abu Dhabi Main Island',
    contractType: 'Comprehensive AMC',
    activeUnits: 18,
    status: 'Active',
    lastService: '22-09-2026',
  },
  {
    id: 'CUST-002',
    name: 'Apex Logistics Complex',
    contactPerson: 'Sarah Jenkins',
    email: 's.jenkins@apexlogistics.ae',
    phone: '+971 4 882 1234',
    zone: 'Mussafah Industrial Sector',
    contractType: 'Preventive HVAC AMC',
    activeUnits: 42,
    status: 'Active',
    lastService: '18-09-2026',
  },
  {
    id: 'CUST-003',
    name: 'Yas Marina Commercial Center',
    contactPerson: 'Eng. Khalid Al Mazrouei',
    email: 'khalid@yascommercial.ae',
    phone: '+971 50 998 8776',
    zone: 'Yas Island Sector 3',
    contractType: 'Chiller Plant Overhaul',
    activeUnits: 12,
    status: 'Active',
    lastService: '24-09-2026',
  },
  {
    id: 'CUST-004',
    name: 'Metro Infrastructure Towers',
    contactPerson: 'Rashid Al Hashimi',
    email: 'ops@metroinfra.ae',
    phone: '+971 2 678 9012',
    zone: 'Al Reem Island',
    contractType: 'BMS Automation Support',
    activeUnits: 30,
    status: 'Pending Renewal',
    lastService: '05-09-2026',
  },
];

export default function ManagerCustomersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = MOCK_CUSTOMERS.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      c.zone.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <ManagerShell
      title="Customer Operations"
      subtitle="Manage corporate client facilities, service agreements, and equipment maintenance history"
    >
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search by client, contact, or zone..."
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
              <option value="Active">Active</option>
              <option value="Pending Renewal">Pending Renewal</option>
            </select>
          </div>

          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors">
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Customer</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 text-[11px] font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Client / Facility</th>
                <th className="py-3 px-3">Primary Contact</th>
                <th className="py-3 px-3">Location / Zone</th>
                <th className="py-3 px-3">Contract Agreement</th>
                <th className="py-3 px-3 text-center">Active Units</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{c.name}</p>
                    <p className="text-[11px] text-slate-400">{c.id}</p>
                  </td>
                  <td className="py-3.5 px-3">
                    <p className="text-slate-800 font-medium">{c.contactPerson}</p>
                    <p className="text-[11px] text-slate-400">{c.phone}</p>
                  </td>
                  <td className="py-3.5 px-3 text-slate-700">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      {c.zone}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-slate-800">{c.contractType}</span>
                    <p className="text-[11px] text-slate-400">Last: {c.lastService}</p>
                  </td>
                  <td className="py-3.5 px-3 text-center font-bold text-blue-600">
                    {c.activeUnits} Units
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        c.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-0.5">
                      <span>View</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
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
