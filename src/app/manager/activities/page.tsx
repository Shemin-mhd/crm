'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PhoneCall, Calendar, Mail, MessageSquare, Plus, Search, CheckCircle2, Clock } from 'lucide-react';
import { ManagerShell } from '@/components/layout/ManagerShell';

const MOCK_ACTIVITIES = [
  {
    id: 'ACT-101',
    type: 'Site Visit',
    title: 'Emergency Site Inspection for Chiller Failure',
    contactPerson: 'Eng. Khalid Al Mazrouei',
    client: 'Yas Marina Commercial Center',
    time: '11:30 AM',
    date: '25-09-2026',
    status: 'Scheduled',
    notes: 'Verify refrigerant pressure and compressor warranty claim status.',
  },
  {
    id: 'ACT-102',
    type: 'Meeting',
    title: 'Operations Daily Capacity & Dispatch Briefing',
    contactPerson: 'Field Technicians Team (5 Engineers)',
    client: 'Internal Cool Tech Operations',
    time: '08:30 AM',
    date: '25-09-2026',
    status: 'Completed',
    notes: 'Dispatched 14 high-priority AMC jobs across Mussafah and Yas island zones.',
  },
  {
    id: 'ACT-103',
    type: 'Calls',
    title: 'Client SLA Satisfaction & Review Call',
    contactPerson: 'Sarah Jenkins',
    client: 'Apex Logistics Complex',
    time: '02:00 PM',
    date: '25-09-2026',
    status: 'Scheduled',
    notes: 'Discuss Q4 maintenance schedule and contract renewal terms.',
  },
  {
    id: 'ACT-104',
    type: 'Emails',
    title: 'Quotation Submission for VRF Retrofit',
    contactPerson: 'Dr. Tariq Al Nuaimi',
    client: 'Lumina Health Systems LLC',
    time: '04:30 PM',
    date: '24-09-2026',
    status: 'Completed',
    notes: 'Sent final revision with 5% discount on advance annual billing.',
  },
  {
    id: 'ACT-105',
    type: 'Follow-ups',
    title: 'Spare Parts Delivery Tracking from Supplier',
    contactPerson: 'Imran Shah (Technician)',
    client: 'Emirates Commercial Plaza',
    time: '10:00 AM',
    date: '26-09-2026',
    status: 'Scheduled',
    notes: 'Follow up on shipment of Daikin compressor inverter board.',
  },
];

export default function ManagerActivitiesPage() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') || 'All';
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);
  const [filterType, setFilterType] = useState(typeParam);
  const [search, setSearch] = useState('');

  const filtered = activities.filter((a) => {
    const matchType = filterType === 'All' || a.type.toLowerCase() === filterType.toLowerCase() || a.type === filterType;
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      a.client.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <ManagerShell
      title="Field Activities & Communication Hub"
      subtitle="Track customer calls, site visits, management meetings, and operational follow-ups"
    >
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <input
                type="text"
                placeholder="Search activities or contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
            >
              <option value="All">All Types</option>
              <option value="Calls">Calls</option>
              <option value="Meetings">Meetings</option>
              <option value="Emails">Emails</option>
              <option value="Follow-ups">Follow-ups</option>
              <option value="Site Visit">Site Visits</option>
            </select>
          </div>

          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors">
            <Plus className="w-3.5 h-3.5" />
            <span>+ Log Activity</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.map((act) => (
            <div key={act.id} className="p-4 hover:bg-slate-50/60 transition-colors flex items-start gap-4">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                {act.type === 'Calls' ? (
                  <PhoneCall className="w-4 h-4" />
                ) : act.type === 'Emails' ? (
                  <Mail className="w-4 h-4" />
                ) : act.type === 'Site Visit' ? (
                  <Calendar className="w-4 h-4" />
                ) : (
                  <MessageSquare className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">{act.title}</span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      act.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {act.status}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{act.client} · <span className="text-slate-500">{act.contactPerson}</span></p>
                {act.notes && <p className="text-[11px] text-slate-500 mt-1 bg-slate-50 p-2 rounded border border-slate-100">{act.notes}</p>}
                <div className="mt-2 flex items-center gap-3 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {act.time}
                  </span>
                  <span>{act.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ManagerShell>
  );
}
