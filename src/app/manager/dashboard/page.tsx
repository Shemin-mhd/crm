'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  CheckSquare,
  TrendingUp,
  AlertTriangle,
  Clock,
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  ArrowRight,
  Filter,
  CheckCircle2,
  Phone,
  Briefcase,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { ManagerShell } from '@/components/layout/ManagerShell';
import { managerMockService } from '@/services/managerMockService';
import {
  TechnicianWorkload,
  ManagerTask,
  OpportunityItem,
  ActivityItem,
  PerformanceMetric,
} from '@/types/manager';

export default function ManagerDashboardPage() {
  const [technicians, setTechnicians] = useState<TechnicianWorkload[]>([]);
  const [tasks, setTasks] = useState<ManagerTask[]>([]);
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [loading, setLoading] = useState(true);

  // Quick Assign Task Modal State
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    customerName: '',
    assignedTo: 'Tariq Mansour',
    priority: 'High' as 'High' | 'Medium' | 'Low' | 'Urgent',
    category: 'HVAC Repair' as any,
    dueDate: '26-09-2026',
    slaDeadline: '4 Hours',
    location: 'Abu Dhabi Commercial Center',
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [techs, tsk, opps, acts, mets] = await Promise.all([
          managerMockService.getTechnicians(),
          managerMockService.getTasks(),
          managerMockService.getOpportunities(),
          managerMockService.getActivities(),
          managerMockService.getPerformanceMetrics(),
        ]);
        setTechnicians(techs);
        setTasks(tsk);
        setOpportunities(opps);
        setActivities(acts);
        setMetrics(mets);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskForm.title || !newTaskForm.customerName) return;
    const created = await managerMockService.assignTask({
      ...newTaskForm,
      status: 'Pending',
    });
    setTasks((prev) => [created, ...prev]);
    setIsAssignModalOpen(false);
    setNewTaskForm({
      title: '',
      customerName: '',
      assignedTo: 'Tariq Mansour',
      priority: 'High',
      category: 'HVAC Repair',
      dueDate: '26-09-2026',
      slaDeadline: '4 Hours',
      location: 'Abu Dhabi Commercial Center',
    });
  };

  return (
    <ManagerShell
      title="Operations Command Center"
      subtitle="Real-time field technician capacity, task SLA tracking, and pipeline overview"
    >
      {/* ── Top Executive KPI Metrics ────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{metric.title}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {metric.growth}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">{metric.value}</span>
              <span className="text-xs text-slate-400">/ target {metric.target}</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{metric.period}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Operations Grid ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Technician Workload & Task SLA Dispatch */}
        <div className="lg:col-span-2 space-y-6">
          {/* Technician Live Workload & Capacity */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-100/70 text-blue-700">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Technician Workload & Field Status</h2>
                  <p className="text-[11px] text-slate-500">Live capacity and active task distribution</p>
                </div>
              </div>
              <Link
                href="/manager/team?tab=workload"
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>Full Roster</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {technicians.map((tech) => (
                <div key={tech.id} className="p-4 hover:bg-slate-50/60 transition-colors flex items-center gap-4">
                  <img
                    src={tech.avatar}
                    alt={tech.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{tech.name}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            tech.status === 'Available'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : tech.status === 'On Field'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {tech.status}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{tech.capacityPercentage}% Capacity</span>
                    </div>

                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-2">
                      <div
                        className={`h-full rounded-full ${
                          tech.capacityPercentage > 90
                            ? 'bg-rose-500'
                            : tech.capacityPercentage > 70
                            ? 'bg-amber-500'
                            : 'bg-blue-600'
                        }`}
                        style={{ width: `${tech.capacityPercentage}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {tech.currentLocation}
                      </span>
                      <span>
                        <strong className="text-slate-700">{tech.assignedTasks}</strong> Assigned ·{' '}
                        <strong className="text-emerald-600">{tech.completedToday}</strong> Done Today
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Tasks & SLA Escalation Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-100/70 text-indigo-700">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Task Dispatch & SLA Deadlines</h2>
                  <p className="text-[11px] text-slate-500">Prioritized job queue and turnaround tracking</p>
                </div>
              </div>
              <button
                onClick={() => setIsAssignModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Assign Task</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 text-[11px] font-semibold border-b border-slate-200 uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-4">Task Details</th>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Assigned To</th>
                    <th className="py-2.5 px-3">Priority</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-4 text-right">SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tasks.map((tsk) => (
                    <tr key={tsk.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{tsk.title}</p>
                        <p className="text-[11px] text-slate-400">{tsk.id} · {tsk.category}</p>
                      </td>
                      <td className="py-3 px-3 text-slate-700 font-medium">{tsk.customerName}</td>
                      <td className="py-3 px-3 text-slate-700">{tsk.assignedTo}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                            tsk.priority === 'Urgent'
                              ? 'bg-rose-100 text-rose-800'
                              : tsk.priority === 'High'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {tsk.priority}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                            tsk.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : tsk.status === 'Overdue'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {tsk.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-slate-700">
                        {tsk.slaDeadline}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: Opportunities Pipeline & Recent Activities */}
        <div className="space-y-6">
          {/* Opportunities Pipeline Snapshot */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900">Commercial Pipeline</h2>
              </div>
              <Link href="/manager/sales" className="text-xs font-semibold text-blue-600 hover:underline">
                View All
              </Link>
            </div>

            <div className="p-4 space-y-3">
              {opportunities.map((opp) => (
                <div key={opp.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 truncate">{opp.client}</span>
                    <span className="text-xs font-extrabold text-blue-700">AED {opp.value.toLocaleString()}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2 truncate">{opp.title}</p>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">{opp.stage}</span>
                    <span>Close: {opp.expectedCloseDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduled Field Activities & Client Visits */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <h2 className="text-sm font-bold text-slate-900">Today&apos;s Field Schedule</h2>
              </div>
              <Link href="/manager/activities" className="text-xs font-semibold text-blue-600 hover:underline">
                Agenda
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {activities.map((act) => (
                <div key={act.id} className="p-4 hover:bg-slate-50/60 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{act.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">{act.type}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-1">{act.contactPerson}</p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{act.time} · {act.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Assign Task Modal ────────────────────────────────────────────── */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-100">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Assign New Operational Task</h3>
                <p className="text-xs text-slate-500">Dispatch job to field technician with SLA deadline</p>
              </div>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chiller Condenser Descaling & Test"
                  value={newTaskForm.title}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Customer / Client *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lumina Health Complex"
                    value={newTaskForm.customerName}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, customerName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assign Technician *</label>
                  <select
                    value={newTaskForm.assignedTo}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, assignedTo: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                  >
                    {technicians.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name} ({t.status} - {t.capacityPercentage}% Cap)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newTaskForm.priority}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, priority: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                  >
                    <option value="Urgent">Urgent (4 Hours SLA)</option>
                    <option value="High">High (8 Hours SLA)</option>
                    <option value="Medium">Medium (24 Hours SLA)</option>
                    <option value="Low">Low (48 Hours SLA)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location / Site</label>
                  <input
                    type="text"
                    value={newTaskForm.location}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
                >
                  Dispatch Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ManagerShell>
  );
}
