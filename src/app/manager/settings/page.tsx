'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { User, Bell, Calendar, Sliders, ShieldCheck, Save, CheckCircle2 } from 'lucide-react';
import { ManagerShell } from '@/components/layout/ManagerShell';
import { authMockService } from '@/services/authMockService';

export default function ManagerSettingsPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';
  const currentUser = authMockService.getCurrentUser() || {
    name: 'Alex Rivera',
    email: 'manager@cooltechuae.com',
    designation: 'Operations Manager',
  };

  const [profileForm, setProfileForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: '+971 50 445 6789',
    department: 'Field Operations & Services',
    workingHours: '08:00 AM - 05:00 PM (GST)',
    autoDispatch: true,
    slaAlertMinutes: '30',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <ManagerShell
      title="Manager Settings & Preferences"
      subtitle="Configure manager profile, alert escalation parameters, working calendar, and dispatch settings"
    >
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 max-w-2xl">
        {saved && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings and preferences successfully updated!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Manager Profile</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={profileForm.email}
                className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Department</label>
              <input
                type="text"
                value={profileForm.department}
                onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
              />
            </div>
          </div>

          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 pt-4">Operational Preferences</h2>

          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={profileForm.autoDispatch}
                onChange={(e) => setProfileForm({ ...profileForm, autoDispatch: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 accent-blue-600"
              />
              <span className="font-semibold text-slate-800">Enable Smart Lead Distribution by Zone</span>
            </label>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">SLA Breach Advance Warning</label>
              <select
                value={profileForm.slaAlertMinutes}
                onChange={(e) => setProfileForm({ ...profileForm, slaAlertMinutes: e.target.value })}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
              >
                <option value="15">15 Minutes Before Breach</option>
                <option value="30">30 Minutes Before Breach</option>
                <option value="60">1 Hour Before Breach</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </ManagerShell>
  );
}
