'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Users, Search, Plus, MapPin, Phone, Mail, Award, CheckCircle2, AlertCircle } from 'lucide-react';
import { ManagerShell } from '@/components/layout/ManagerShell';

const MOCK_TEAM = [
  {
    id: 'TECH-01',
    name: 'Tariq Mansour',
    role: 'Senior HVAC Field Engineer',
    email: 'tariq.tech@cooltechuae.com',
    phone: '+971 50 123 4567',
    zone: 'Mussafah Zone 12, Abu Dhabi',
    specialization: 'Chillers, VRF & Commercial Package Units',
    capacity: 85,
    assignedTasks: 4,
    completedMonth: 38,
    status: 'On Field',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120',
  },
  {
    id: 'TECH-02',
    name: 'Zayed Al Qasimi',
    role: 'HVAC Maintenance Specialist',
    email: 'zayed.tech@cooltechuae.com',
    phone: '+971 55 987 6543',
    zone: 'Khalidiya & Corniche Sector',
    specialization: 'Preventive Maintenance AMC & Duct Sanitization',
    capacity: 45,
    assignedTasks: 2,
    completedMonth: 44,
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120',
  },
  {
    id: 'TECH-03',
    name: 'Bilal Ahmed',
    role: 'Automation & BMS Controls Specialist',
    email: 'bilal.tech@cooltechuae.com',
    phone: '+971 52 456 7890',
    zone: 'Al Reem Island & Al Maryah',
    specialization: 'Building Automation, Smart Thermostats & Valves',
    capacity: 98,
    assignedTasks: 6,
    completedMonth: 32,
    status: 'Overloaded',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120',
  },
  {
    id: 'TECH-04',
    name: 'Imran Shah',
    role: 'Field Service Technician',
    email: 'imran.tech@cooltechuae.com',
    phone: '+971 56 345 6789',
    zone: 'Hamdan Street & Downtown',
    specialization: 'Split Units & Condenser Coil Servicing',
    capacity: 30,
    assignedTasks: 1,
    completedMonth: 50,
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
  },
  {
    id: 'TECH-05',
    name: 'Hamza Farooq',
    role: 'Site Inspection Lead',
    email: 'hamza.tech@cooltechuae.com',
    phone: '+971 54 876 5432',
    zone: 'Yas Island Commercial Zone',
    specialization: 'Energy Audits & Facility Load Surveys',
    capacity: 70,
    assignedTasks: 3,
    completedMonth: 28,
    status: 'On Field',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120',
  },
];

export default function ManagerTeamPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') || 'members';
  const [search, setSearch] = useState('');

  const filtered = MOCK_TEAM.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase()) ||
    m.zone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ManagerShell
      title="Field Team Management & Workload"
      subtitle="Supervise field technicians, monitor real-time capacity balance, and coordinate zone assignments"
    >
      {/* Capacity Overview Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl p-5 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold">Field Workforce Capacity: 72.5% Balanced</h2>
          <p className="text-xs text-blue-200 mt-0.5">5 Field Technicians on Duty · 16 Active Operational Tasks Assigned Today</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
            2 Techs Available
          </span>
          <span className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-400/30 text-xs font-bold">
            1 Tech Overloaded
          </span>
        </div>
      </div>

      {/* Team Roster Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search technician by name, skill, or zone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors">
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Team Member</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.map((tech) => (
            <div key={tech.id} className="p-5 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={tech.avatar}
                  alt={tech.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{tech.name}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        tech.status === 'Available'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : tech.status === 'On Field'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {tech.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{tech.role}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {tech.zone}
                  </p>
                </div>
              </div>

              {/* Workload Progress */}
              <div className="w-full md:w-64 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Workload Capacity</span>
                  <span className="font-bold text-slate-800">{tech.capacity}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      tech.capacity > 90
                        ? 'bg-rose-500'
                        : tech.capacity > 70
                        ? 'bg-amber-500'
                        : 'bg-blue-600'
                    }`}
                    style={{ width: `${tech.capacity}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{tech.assignedTasks} Active Tasks</span>
                  <span className="text-emerald-600 font-semibold">{tech.completedMonth} Completed This Mo</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${tech.phone}`}
                  className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
                  title="Call Technician"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`mailto:${tech.email}`}
                  className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
                  title="Email Technician"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <button className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold">
                  Reassign Jobs
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ManagerShell>
  );
}
