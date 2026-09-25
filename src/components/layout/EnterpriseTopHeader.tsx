'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Bell,
  Plus,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import { useEnterpriseCrm } from '@/context/EnterpriseCrmContext';
import { UserRole } from '@/types/enterprise-crm';

export function EnterpriseTopHeader() {
  const { currentRole, setCurrentRole, globalSearch, setGlobalSearch } = useEnterpriseCrm();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const roles: UserRole[] = ['Super Admin', 'Admin', 'Operations Manager', 'Worker'];

  return (
    <div className="bg-white border-b border-[#E2E8F0] px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between text-slate-800 z-40 relative w-full overflow-hidden sm:overflow-visible">
      {/* Brand Logo — icon + text */}
      <div className="flex items-center min-w-0 flex-shrink">
        <Link href="/dashboard" className="flex items-center gap-2 group select-none min-w-0">

          {/* Cool Technologies C-wave SVG icon */}
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white border border-slate-100 shadow-sm flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow">
            <svg viewBox="0 0 80 80" className="w-7 h-7 sm:w-9 sm:h-9" xmlns="http://www.w3.org/2000/svg">
              {/* Top blue arcs */}
              <path d="M58 12 A32 32 0 0 0 18 40" fill="none" stroke="#00AEEF" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M53 19 A24 24 0 0 0 22 40" fill="none" stroke="#00AEEF" strokeWidth="5" strokeLinecap="round" />
              <path d="M48 26 A16 16 0 0 0 26 40" fill="none" stroke="#00AEEF" strokeWidth="4.5" strokeLinecap="round" />
              {/* Bottom navy arcs */}
              <path d="M18 40 A32 32 0 0 0 58 68" fill="none" stroke="#3D405B" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M22 40 A24 24 0 0 0 53 61" fill="none" stroke="#3D405B" strokeWidth="5" strokeLinecap="round" />
              <path d="M26 40 A16 16 0 0 0 48 54" fill="none" stroke="#3D405B" strokeWidth="4.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Text block — inline: COOL TECHNOLOGIES + big CRM */}
          <div className="flex flex-col leading-none gap-0.5 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[11px] sm:text-[13px] font-bold text-[#3D405B] tracking-wider uppercase leading-none truncate">
                COOL TECHNOLOGIES
              </span>
              <span className="text-[15px] sm:text-[20px] font-black text-[#0F172A] tracking-tight leading-none flex-shrink-0">
                CRM
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] text-slate-400 font-medium tracking-widest uppercase leading-none hidden xs:block">
              the science of cooling
            </span>
          </div>

        </Link>
      </div>

      {/* Center/Right Global Search Bar */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads, tasks, customers, deals..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-md pl-9 pr-4 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] transition-all"
          />
        </div>
      </div>

      {/* Right Actions & User Profile with Role Switcher */}
      <div className="flex items-center gap-1 sm:gap-2.5 flex-shrink-0">
        {/* Quick Add Button */}
        <div className="relative">
          <button
            onClick={() => setShowQuickAdd(!showQuickAdd)}
            className="p-1.5 sm:p-2 rounded-md text-slate-600 hover:text-[#2563EB] hover:bg-blue-50 transition-colors"
            title="Quick Action"
          >
            <Plus className="w-4 h-4 text-[#2563EB]" />
          </button>

          {showQuickAdd && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowQuickAdd(false)} />
              <div className="absolute right-0 mt-1.5 w-44 sm:w-48 bg-white border border-[#E2E8F0] rounded-md shadow-lg z-50 p-1.5 space-y-0.5 animate-in fade-in duration-150">
                <Link
                  href="/leads?action=add"
                  onClick={() => setShowQuickAdd(false)}
                  className="block px-3 py-2 text-xs font-medium text-slate-700 hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-md transition-colors"
                >
                  + Add New Lead
                </Link>
                <Link
                  href="/tasks?action=add"
                  onClick={() => setShowQuickAdd(false)}
                  className="block px-3 py-2 text-xs font-medium text-slate-700 hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-md transition-colors"
                >
                  + Create New Task
                </Link>
                <Link
                  href="/customers?action=add"
                  onClick={() => setShowQuickAdd(false)}
                  className="block px-3 py-2 text-xs font-medium text-slate-700 hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-md transition-colors"
                >
                  + Register Customer
                </Link>
                <Link
                  href="/sales?action=add"
                  onClick={() => setShowQuickAdd(false)}
                  className="block px-3 py-2 text-xs font-medium text-slate-700 hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-md transition-colors"
                >
                  + Create Opportunity
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1.5 sm:p-2 rounded-md text-slate-600 hover:text-[#2563EB] hover:bg-blue-50 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-[#2563EB]" />
            <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2 h-2 rounded-full bg-[#2563EB]" />
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 mt-1.5 w-72 sm:w-80 bg-white border border-[#E2E8F0] rounded-md shadow-xl z-50 p-3 space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-900">System Notifications</span>
                  <span className="text-[10px] text-[#2563EB] font-semibold cursor-pointer">Mark all read</span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto text-xs text-slate-600 divide-y divide-slate-100">
                  <div className="pt-2">
                    <p className="font-semibold text-slate-900">New high-priority lead assigned</p>
                    <p className="text-[11px] text-slate-500">Acme Corporation requested enterprise SLA</p>
                    <span className="text-[10px] text-slate-400">10 mins ago</span>
                  </div>
                  <div className="pt-2">
                    <p className="font-semibold text-slate-900">Quotation approved</p>
                    <p className="text-[11px] text-slate-500">Lumina Health Systems quote $110,000</p>
                    <span className="text-[10px] text-slate-400">1 hour ago</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile & Role Switcher Dropdown */}
        <div className="relative pl-2 border-l border-[#E2E8F0]">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2.5 p-1 rounded-md hover:bg-blue-50 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
              SA
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">Super Admin</span>
              <span className="text-[10px] text-[#2563EB] font-semibold leading-tight">{currentRole}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showRoleDropdown && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowRoleDropdown(false)} />
              <div className="absolute right-0 mt-1.5 w-60 bg-white border border-[#E2E8F0] rounded-md shadow-xl z-50 p-2 space-y-1 animate-in fade-in duration-150">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">Signed in as Super Admin</p>
                  <p className="text-[11px] text-slate-500">admin@cooltechnologies.com</p>
                </div>

                <div className="pt-1">
                  <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Simulate RBAC Role:
                  </p>
                  {roles.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setCurrentRole(r);
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium flex items-center justify-between transition-colors ${currentRole === r
                          ? 'bg-[#EFF6FF] text-[#2563EB] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                      <span>{r}</span>
                      {currentRole === r && <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />}
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-1 mt-1 space-y-0.5">
                  <Link
                    href="/settings"
                    onClick={() => setShowRoleDropdown(false)}
                    className="block px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
                  >
                    System Settings
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setShowRoleDropdown(false)}
                    className="flex items-center justify-between px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-md transition-colors font-semibold"
                  >
                    <span>Admin Login / Sign Out</span>
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
