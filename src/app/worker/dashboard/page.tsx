'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Wrench,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  AlertTriangle,
  PlayCircle,
  Package,
  Calendar,
  Sparkles,
  ChevronRight,
  Star,
  FileCheck,
  TrendingUp,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { WorkerShell } from '@/components/layout/WorkerShell';
import { workerMockService } from '@/services/workerMockService';
import { WorkerTask, WorkerMaterialRequest } from '@/types/worker';

export default function WorkerDashboardPage() {
  const [tasks, setTasks] = useState<WorkerTask[]>([]);
  const [requests, setRequests] = useState<WorkerMaterialRequest[]>([]);
  const [profile, setProfile] = useState(workerMockService.getProfile());

  useEffect(() => {
    setTasks(workerMockService.getTasks());
    setRequests(workerMockService.getMaterialRequests());
  }, []);

  const activeTask = tasks.find((t) => t.status === 'In Progress');
  const todayTasks = tasks.filter((t) => t.status !== 'Completed');
  const completedTasks = tasks.filter((t) => t.status === 'Completed');

  return (
    <WorkerShell
      title="Field Service & Operations Dashboard"
      subtitle="Today's live schedule, assigned HVAC work orders, and maintenance execution pipeline"
    >
      <div className="space-y-6">
        {/* ── SECTION 1: ACTIVE LIVE JOB HERO BANNER ── */}
        {activeTask && (
          <div className="bg-gradient-to-r from-[#002B49] via-[#003B64] to-[#0A4D7E] text-white rounded-2xl p-5 sm:p-6 shadow-lg relative overflow-hidden">
            {/* Background glowing ambient light */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 uppercase tracking-wider shadow-xs animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-slate-950" />
                    LIVE IN PROGRESS
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
                    {activeTask.taskNumber}
                  </span>
                  <span className="text-xs text-blue-200 font-medium">{activeTask.serviceType}</span>
                </div>

                <div>
                  <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white leading-snug">
                    {activeTask.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-blue-100/90 mt-2">
                    <span className="flex items-center gap-1 font-semibold">
                      <BuildingIcon className="w-3.5 h-3.5 text-amber-300" />
                      {activeTask.clientCompany} ({activeTask.clientName})
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-300" />
                      {activeTask.address}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-300" />
                      Scheduled: {activeTask.scheduledTime}
                    </span>
                  </div>
                </div>

                {/* Progress bar of task checklist */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-blue-200">
                      Checklist Progress: {activeTask.checklist.filter((c) => c.completed).length} /{' '}
                      {activeTask.checklist.length} items completed
                    </span>
                    <span className="font-bold text-amber-300">
                      {Math.round(
                        (activeTask.checklist.filter((c) => c.completed).length / activeTask.checklist.length) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.round(
                          (activeTask.checklist.filter((c) => c.completed).length / activeTask.checklist.length) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
                <Link
                  href="/worker/tasks/active"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  <PlayCircle className="w-4 h-4 fill-current" />
                  <span>Resume Job Execution</span>
                </Link>
                <a
                  href={`tel:${activeTask.clientPhone}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Customer ({activeTask.clientPhone})</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── SECTION 2: KEY OPERATIONAL METRICS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Today&apos;s Jobs</span>
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Wrench className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{tasks.length}</span>
              <span className="text-xs text-blue-600 font-semibold">{todayTasks.length} Pending</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Assigned by Operations</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">On-Time Arrival</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{profile.metrics.onTimeRate}%</span>
              <span className="text-xs text-emerald-600 font-semibold">Target &gt; 95%</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">SLA Benchmark Standard</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Customer CSAT</span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{profile.metrics.averageRating}</span>
              <span className="text-xs text-amber-600 font-semibold">★★★★★ (142 reviews)</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Top Rated Field Tech</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Monthly Hours</span>
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{profile.metrics.hoursThisMonth} hrs</span>
              <span className="text-xs text-indigo-600 font-semibold">+12h OT</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Logged in Timesheet</p>
          </div>
        </div>

        {/* ── SECTION 3: 2-COLUMN OPERATIONAL WORKFLOW ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Today's Assigned Job Queue */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">Today&apos;s Work Schedule &amp; Orders</h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {todayTasks.length} Active
                </span>
              </div>
              <Link
                href="/worker/tasks"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View Full Task List</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => {
                const isCurrentActive = task.status === 'In Progress';
                const isCompleted = task.status === 'Completed';

                return (
                  <div
                    key={task.id}
                    className={`bg-white border rounded-xl p-4 transition-all shadow-xs ${
                      isCurrentActive
                        ? 'border-amber-400 ring-1 ring-amber-400/30 bg-amber-50/10'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-extrabold ${
                            task.priority === 'Urgent'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : task.priority === 'High'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {task.priority} Priority
                        </span>
                        <span className="text-xs font-bold text-slate-700">{task.taskNumber}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500 font-medium">{task.serviceType}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            isCompleted
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : isCurrentActive
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2.5">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">{task.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{task.description}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 truncate">
                        <BuildingIcon className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="font-semibold text-slate-800 truncate">{task.clientCompany}</span>
                        <span className="text-slate-400 truncate">({task.clientName})</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{task.address}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {task.scheduledTime}
                        </span>
                        <span>•</span>
                        <span>Est: {task.estimatedHours} hrs</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCurrentActive ? (
                          <Link
                            href="/worker/tasks/active"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold transition-colors"
                          >
                            <span>Open Execution Pad</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        ) : isCompleted ? (
                          <Link
                            href={`/worker/reports?id=${task.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 transition-colors"
                          >
                            <FileCheck className="w-3.5 h-3.5" />
                            <span>View Sign-Off Certificate</span>
                          </Link>
                        ) : (
                          <Link
                            href={`/worker/tasks?selected=${task.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                          >
                            <span>Accept &amp; Start Job</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 1 Col: Material Requests & Requisition Center */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">Spare Parts &amp; Requisitions</h3>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                  {requests.length}
                </span>
              </div>
              <Link
                href="/worker/materials?action=new"
                className="text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                + Request
              </Link>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
              <div className="text-xs text-slate-500 leading-relaxed">
                Need urgent parts on-site? Submit requisitions directly to warehouse dispatch.
              </div>

              <div className="space-y-2.5">
                {requests.slice(0, 3).map((req) => (
                  <div
                    key={req.id}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{req.itemName}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          req.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : req.status === 'Dispatched'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Code: {req.itemCode}</span>
                      <span className="font-semibold text-slate-700">
                        Qty: {req.quantity} {req.unit}
                      </span>
                    </div>

                    {req.taskNumber && (
                      <div className="text-[10px] text-blue-600 font-medium">For Job: {req.taskNumber}</div>
                    )}
                  </div>
                ))}
              </div>

              <Link
                href="/worker/materials"
                className="block text-center py-2 text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
              >
                View All Material Requests &rarr;
              </Link>
            </div>

            {/* Quick Vehicle & Safety Checklist Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Field Safety &amp; PPE Protocol
                </h4>
              </div>

              <p className="text-xs text-slate-300">
                Ensure safety helmet, dielectric insulated gloves (Class 0), and LOTO locks are applied prior to high-voltage chiller maintenance.
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-700">
                <span>Safety Rating: 100% Zero-Incident</span>
                <span className="text-emerald-400 font-bold">Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkerShell>
  );
}

function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}
