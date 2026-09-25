'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Users,
  UserCog,
  BarChart3,
  UserCheck,
  ListChecks,
  Globe,
  Activity,
  FolderTree,
  CheckSquare,
  Tag,
  Radio,
  Calendar,
  Home,
  Sliders,
  CheckCircle2,
  Save,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { authMockService } from '@/services/authMockService';

function ManagerSettingsContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'team-members';
  const [activeTab, setActiveTab] = useState(tab);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const sections = [
    {
      group: 'Team & Users',
      items: [
        { id: 'team-members', label: 'Team Members', icon: Users },
        { id: 'employee-details', label: 'Employee Details', icon: UserCog },
        { id: 'user-targets', label: 'User Targets', icon: BarChart3 },
        { id: 'team-assignments', label: 'Team Assignments', icon: UserCheck },
      ],
    },
    {
      group: 'CRM Settings',
      items: [
        { id: 'opp-stages', label: 'Opportunity Stages', icon: ListChecks },
        { id: 'lead-sources', label: 'Lead Sources', icon: Globe },
        { id: 'lead-status', label: 'Lead Status', icon: Activity },
        { id: 'customer-groups', label: 'Customer Groups', icon: FolderTree },
        { id: 'task-settings', label: 'Task Settings', icon: CheckSquare },
        { id: 'product-categories', label: 'Product Categories', icon: Tag },
      ],
    },
    {
      group: 'Preferences',
      items: [
        { id: 'notifications', label: 'Notifications', icon: Radio },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
        { id: 'dashboard-preferences', label: 'Dashboard Preferences', icon: Home },
      ],
    },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage('Settings successfully saved and applied!');
    setTimeout(() => setSavedMessage(null), 3500);
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#1677FF]" />
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Operations Manager Settings & Configuration
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Manage team members, field allocations, CRM stages, lead workflows, notification channels, and dashboard preferences.
        </p>
      </div>

      {savedMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Main Layout: Sidebar tabs + Content area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Sidebar Nav (Mobile Horizontal Scroll / Desktop Vertical List) */}
        <div className="lg:col-span-4 space-y-4">
          {sections.map((sec, secIdx) => (
            <div key={secIdx} className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs space-y-2">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-wider px-2">
                {sec.group}
              </h2>
              <div className="space-y-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        'w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-xl transition-all text-left cursor-pointer',
                        isActive
                          ? 'bg-[#002B49] text-white shadow-xs'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      )}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-6">
          {activeTab === 'team-members' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Field Operations Team Members</h3>
                  <p className="text-xs text-slate-500">12 Technicians & Specialists under your supervision</p>
                </div>
                <button className="px-3 py-1.5 bg-[#1677FF] text-white text-xs font-bold rounded-xl hover:bg-blue-600 flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Member</span>
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {[
                  { name: 'Tariq Mansour', role: 'HVAC Senior Specialist', van: 'Van #04', status: 'Active (85% Load)' },
                  { name: 'Zayed Al Qasimi', role: 'Chiller Field Technician', van: 'Van #02', status: 'On Route (45% Load)' },
                  { name: 'Bilal Ahmed', role: 'Commercial AC Specialist', van: 'Van #09', status: 'Busy (98% Load)' },
                  { name: 'Imran Shah', role: 'Ducting & Airflow Engineer', van: 'Van #11', status: 'Available (30% Load)' },
                ].map((m, i) => (
                  <div key={i} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 text-xs">{m.name}</p>
                      <p className="text-[11px] text-slate-500">{m.role} • {m.van}</p>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'dashboard-preferences' && (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Dashboard Layout & Display Preferences</h3>
                <p className="text-xs text-slate-500">Configure widgets, auto-refresh intervals, and mobile cards</p>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-[#1677FF]" />
                  <span className="font-medium">Show live technician field capacity bars</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-[#1677FF]" />
                  <span className="font-medium">Enable real-time material requisition alerts on top banner</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-[#1677FF]" />
                  <span className="font-medium">Show commercial sales pipeline values in AED</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-[#1677FF]" />
                  <span className="font-medium">Auto-refresh metrics every 60 seconds</span>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Preferences</span>
                </button>
              </div>
            </form>
          )}

          {activeTab !== 'team-members' && activeTab !== 'dashboard-preferences' && (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 capitalize">{activeTab.replace('-', ' ')}</h3>
                <p className="text-xs text-slate-500">Manage rules, automated triggers, and operational presets</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Configuration Name</label>
                  <input
                    type="text"
                    defaultValue="Standard UAE Operations Preset"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Escalation Threshold</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800">
                    <option>Within 30 minutes of SLA</option>
                    <option>Immediate upon overdue status</option>
                    <option>Daily 08:00 AM briefing digest</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Configuration</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ManagerSettingsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Settings...</div>}>
      <ManagerSettingsContent />
    </Suspense>
  );
}
