'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Clock,
  AlertCircle,
  PlayCircle,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Video,
  Plus,
  Search,
  Trash2,
  Edit2,
  X,
  ChevronDown,
  UserCheck,
  Check,
  RotateCcw,
  FileSpreadsheet,
  MessageSquare,
  HardDrive,
  Menu,
  Info,
  Key,
  Shield,
  Settings,
  MoreVertical,
  ExternalLink,
  Book,
  Edit,
  Filter,
} from 'lucide-react';
import { useEnterpriseCrm } from '@/context/EnterpriseCrmContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Modal } from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { formatDate, cn } from '@/lib/utils';
import { TaskType, TaskPriority, TaskStatus, CrmTask } from '@/types/enterprise-crm';

type TaskTab = 'today' | 'pending' | 'progress' | 'overdue' | 'upcoming' | 'completed' | 'meeting';

function TasksContent() {
  const searchParams = useSearchParams();
  const initialView = (searchParams.get('view') || 'pending') as TaskTab;

  const { tasks, addTask, updateTask, toggleTaskStatus, deleteTask, users } = useEnterpriseCrm();

  // Active Tab
  const [activeTab, setActiveTab] = useState<TaskTab>(initialView);
  const [activeSubtype, setActiveSubtype] = useState<string>('ALL');
  const [showFilterSidebar, setShowFilterSidebar] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setShowFilterSidebar(true);
    }
  }, []);

  useEffect(() => {
    const viewParam = searchParams.get('view') as TaskTab;
    if (viewParam && ['today', 'pending', 'progress', 'overdue', 'upcoming', 'completed', 'meeting'].includes(viewParam)) {
      setActiveTab(viewParam);
      setActiveSubtype('ALL');
    }
  }, [searchParams]);

  // Filters State
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('All Task');
  const [assigneeFilter, setAssigneeFilter] = useState('All Owners');
  const [typeFilter, setTypeFilter] = useState('All');
  const [createdByFilter, setCreatedByFilter] = useState('All');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modals & Popovers
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<CrmTask | null>(null);
  const [viewingTaskInfo, setViewingTaskInfo] = useState<CrmTask | null>(null);
  const [actionMenuTaskId, setActionMenuTaskId] = useState<string | null>(null);

  // Add Form State
  const [formData, setFormData] = useState({
    assignee: { name: 'Alex Rivera' },
    taskDetails: '',
    taskUnder: 'CTEQ#1041 770KG ICE MACHINE / FOCUS EMC KITCHENS LLC',
    taskType: 'Follow-up' as TaskType,
    dueDate: '2026-09-23',
    dueTime: '06:00 PM',
    priority: 'High' as TaskPriority,
    status: 'Pending' as TaskStatus,
    createdBy: 'Super Admin',
  });

  // Assign Task Form
  const [assignForm, setAssignForm] = useState({
    targetAssignee: 'Alex Rivera',
    selectedTaskIds: [] as string[],
  });

  // Reset Filters
  const handleResetFilters = () => {
    setSearch('');
    setSortBy('All Task');
    setAssigneeFilter('All Owners');
    setTypeFilter('All');
    setCreatedByFilter('All');
    setActiveSubtype('ALL');
    setCurrentPage(1);
  };

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (sortBy !== 'All Task') count++;
    if (assigneeFilter !== 'All Owners') count++;
    if (typeFilter !== 'All') count++;
    if (createdByFilter !== 'All') count++;
    return count;
  }, [sortBy, assigneeFilter, typeFilter, createdByFilter]);

  // Tab counts
  const todayDateStr = '2026-09-23';
  const tomorrowDateStr = '2026-09-24';

  const counts = useMemo(() => {
    return {
      today: tasks.filter((t) => t.dueDate === todayDateStr).length,
      pending: tasks.filter((t) => t.status === 'Pending').length,
      progress: tasks.filter((t) => t.status === 'In Progress').length,
      overdue: tasks.filter((t) => t.status === 'Overdue' || (t.status !== 'Completed' && t.dueDate < todayDateStr)).length,
      upcoming: tasks.filter((t) => t.status === 'Upcoming' || t.dueDate > todayDateStr).length,
      completed: tasks.filter((t) => t.status === 'Completed').length,
      meeting: tasks.filter((t) => t.taskType === 'Meeting' || t.taskType === 'Demo').length,
    };
  }, [tasks]);

  // Meeting specific grouped datasets
  const todayMeetings = useMemo(() => {
    return tasks.filter(
      (t) => (t.taskType === 'Meeting' || t.taskType === 'Demo') && t.dueDate === todayDateStr
    );
  }, [tasks, todayDateStr]);

  const tomorrowMeetings = useMemo(() => {
    return tasks.filter(
      (t) => (t.taskType === 'Meeting' || t.taskType === 'Demo') && t.dueDate === tomorrowDateStr
    );
  }, [tasks, tomorrowDateStr]);

  const laterMeetings = useMemo(() => {
    return tasks.filter(
      (t) => (t.taskType === 'Meeting' || t.taskType === 'Demo') && t.dueDate > tomorrowDateStr
    );
  }, [tasks, tomorrowDateStr]);

  // Tab Labels
  const tabTitles: Record<TaskTab, string> = {
    today: 'Task Today',
    pending: 'Task Pending',
    progress: 'Task In Progress',
    overdue: 'Task Overdue',
    upcoming: 'Task Upcoming',
    completed: 'Task Completed',
    meeting: 'Task Meeting',
  };

  // Subtype counts for the currently active tab
  const subtypeCounts = useMemo(() => {
    const currentTabTasks = tasks.filter((task) => {
      if (activeTab === 'today') return task.dueDate === todayDateStr;
      if (activeTab === 'pending') return task.status === 'Pending';
      if (activeTab === 'progress') return task.status === 'In Progress';
      if (activeTab === 'overdue') return task.status === 'Overdue' || (task.status !== 'Completed' && task.dueDate < todayDateStr);
      if (activeTab === 'upcoming') return task.status === 'Upcoming' || task.dueDate > todayDateStr;
      if (activeTab === 'completed') return task.status === 'Completed';
      if (activeTab === 'meeting') return task.taskType === 'Meeting' || task.taskType === 'Demo';
      return true;
    });

    return {
      all: currentTabTasks.length,
      followup: currentTabTasks.filter((t) => t.taskType === 'Follow-up' || t.taskType === 'Call').length,
      call: currentTabTasks.filter((t) => t.taskType === 'Call').length,
      meeting: currentTabTasks.filter((t) => t.taskType === 'Meeting' || t.taskType === 'Demo').length,
      review: currentTabTasks.filter((t) => t.taskType === 'Review' || t.taskType === 'Document').length,
    };
  }, [tasks, activeTab]);

  // Filter Tasks by Active Tab + Subtype + Form Filters
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Tab Filtering
        if (activeTab === 'today') {
          if (task.dueDate !== todayDateStr) return false;
        } else if (activeTab === 'pending') {
          if (task.status !== 'Pending') return false;
        } else if (activeTab === 'progress') {
          if (task.status !== 'In Progress') return false;
        } else if (activeTab === 'overdue') {
          if (task.status !== 'Overdue' && (task.status === 'Completed' || task.dueDate >= todayDateStr)) return false;
        } else if (activeTab === 'upcoming') {
          if (task.status !== 'Upcoming' && task.dueDate <= todayDateStr) return false;
        } else if (activeTab === 'completed') {
          if (task.status !== 'Completed') return false;
        } else if (activeTab === 'meeting') {
          if (task.taskType !== 'Meeting' && task.taskType !== 'Demo') return false;
        }

        // Subtype Filtering
        if (activeSubtype === 'Followup') {
          if (task.taskType !== 'Follow-up' && task.taskType !== 'Call') return false;
        } else if (activeSubtype === 'Call') {
          if (task.taskType !== 'Call') return false;
        } else if (activeSubtype === 'Meeting') {
          if (task.taskType !== 'Meeting' && task.taskType !== 'Demo') return false;
        }

        // Search Query
        if (search) {
          const q = search.toLowerCase();
          const match =
            task.taskDetails.toLowerCase().includes(q) ||
            task.taskUnder.toLowerCase().includes(q) ||
            task.assignee.name.toLowerCase().includes(q);
          if (!match) return false;
        }

        // Assignee Filter
        if (assigneeFilter !== 'All Owners' && task.assignee.name !== assigneeFilter) {
          return false;
        }

        // Task Type Filter
        if (typeFilter !== 'All' && task.taskType !== typeFilter) {
          return false;
        }

        // Created By Filter
        if (createdByFilter !== 'All' && task.createdBy !== createdByFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'Priority') {
          const pMap: Record<string, number> = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
          return pMap[b.priority] - pMap[a.priority];
        }
        if (sortBy === 'Assignee') {
          return a.assignee.name.localeCompare(b.assignee.name);
        }
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
  }, [tasks, activeTab, activeSubtype, search, assigneeFilter, typeFilter, createdByFilter, sortBy]);

  // Pagination
  const totalEntries = filteredTasks.length;
  const totalPages = Math.ceil(totalEntries / pageSize) || 1;
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Form Handlers
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.taskDetails) return;
    addTask(formData);
    setIsAddModalOpen(false);
    setFormData({
      assignee: { name: 'Alex Rivera' },
      taskDetails: '',
      taskUnder: 'CTEQ#1041 770KG ICE MACHINE / FOCUS EMC KITCHENS LLC',
      taskType: 'Follow-up',
      dueDate: '2026-09-23',
      dueTime: '06:00 PM',
      priority: 'High',
      status: 'Pending',
      createdBy: 'Super Admin',
    });
  };

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;
    updateTask(editingTask.id, editingTask);
    setEditingTask(null);
  };

  const handleBulkAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignForm.targetAssignee) return;
    assignForm.selectedTaskIds.forEach((id) => {
      updateTask(id, { assignee: { name: assignForm.targetAssignee } });
    });
    setIsAssignModalOpen(false);
    setAssignForm({ targetAssignee: 'Alex Rivera', selectedTaskIds: [] });
  };

  return (
    <div className="space-y-3 pb-28 sm:pb-32 w-full">
      {/* ── Top Horizontal Cezcon-Style Sub-Tabs Bar ─────────────────── */}
      <div className="bg-white border border-slate-200 px-3 sm:px-4 flex items-center gap-2 overflow-x-auto no-scrollbar py-2 select-none shadow-xs rounded-lg">
        {/* Tab 1: Today */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('today');
            setActiveSubtype('ALL');
            setCurrentPage(1);
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'today'
            ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-xs'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
        >
          <span className="w-2.5 h-2.5 rounded-xs bg-blue-500 inline-block" />
          <span>Today</span>
        </button>

        {/* Tab 2: Pending (Active in screenshot) */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('pending');
            setActiveSubtype('ALL');
            setCurrentPage(1);
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'pending'
            ? 'bg-[#FFF7ED] text-[#EA580C] border border-[#FDBA74] font-bold shadow-xs'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
        >
          <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
          <span>Pending</span>
          <span className="px-2 py-0.2 rounded text-[11px] font-bold bg-[#F97316] text-white">
            446
          </span>
        </button>

        {/* Tab 3: Progress */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('progress');
            setActiveSubtype('ALL');
            setCurrentPage(1);
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'progress'
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold shadow-xs'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
        >
          <PlayCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Progress</span>
          <span className="px-2 py-0.2 rounded text-[11px] font-bold bg-[#22C55E] text-white">
            14
          </span>
        </button>

        {/* Tab 4: Overdue */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('overdue');
            setActiveSubtype('ALL');
            setCurrentPage(1);
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'overdue'
            ? 'bg-rose-50 text-rose-800 border border-rose-300 font-bold shadow-xs'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          <span>Overdue</span>
          <span className="px-2 py-0.2 rounded text-[11px] font-bold bg-[#EF4444] text-white">
            460
          </span>
        </button>

        {/* Tab 5: Upcoming */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('upcoming');
            setActiveSubtype('ALL');
            setCurrentPage(1);
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'upcoming'
            ? 'bg-blue-50 text-blue-800 border border-blue-300 font-bold shadow-xs'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
        >
          <Calendar className="w-3.5 h-3.5 text-blue-500" />
          <span>Upcoming</span>
        </button>

        {/* Tab 6: Completed */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('completed');
            setActiveSubtype('ALL');
            setCurrentPage(1);
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'completed'
            ? 'bg-teal-50 text-teal-800 border border-teal-300 font-bold shadow-xs'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
          <span>Completed</span>
        </button>

        {/* Tab 7: Meeting */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('meeting');
            setActiveSubtype('ALL');
            setCurrentPage(1);
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'meeting'
            ? 'bg-[#FEF2F2] text-[#E11D48] border border-[#FECDD3] font-bold shadow-xs'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
        >
          <Video className="w-3.5 h-3.5 text-[#E11D48]" />
          <span>Meeting</span>
        </button>
      </div>

      {/* ── Conditional Rendering: Meeting View vs Standard 2-Column View ── */}
      {activeTab === 'meeting' ? (
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-6">
          {/* Section 1: Today (Wed, 23 Sep) */}
          <div>
            <div className="flex items-center">
              <div className="bg-[#D91E5B] text-white px-3.5 py-1.5 rounded-t-md font-bold text-xs shadow-2xs">
                Today (Wed, 23 Sep)
              </div>
            </div>
            <div className="border-t-2 border-[#D91E5B] overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[720px]">
                <thead className="bg-[#FAFBFD] border-b border-slate-200 text-slate-700 font-bold text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 w-16 text-center">SL.No</th>
                    <th className="py-2.5 px-4 w-32">Assignee</th>
                    <th className="py-2.5 px-4 min-w-[240px]">Task Under</th>
                    <th className="py-2.5 px-4 min-w-[260px]">Task Details</th>
                    <th className="py-2.5 px-4 w-28 whitespace-nowrap">Time</th>
                    <th className="py-2.5 px-4 w-24 text-center">Priority</th>
                    <th className="py-2.5 px-4 w-24 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {todayMeetings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-3.5 px-4 text-slate-500 font-normal italic text-xs">
                        No Records.
                      </td>
                    </tr>
                  ) : (
                    todayMeetings.map((task, idx) => {
                      const parts = task.taskUnder.split(' / ');
                      const oppRef = parts[0] || task.taskUnder;
                      const customerName = parts[1] || 'FOCUS EMC KITCHENS LLC';

                      return (
                        <tr key={task.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3 text-center font-semibold text-slate-600">{idx + 1}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {task.assignee.avatar ? (
                                <img
                                  src={task.assignee.avatar}
                                  alt={task.assignee.name}
                                  className="w-7 h-7 rounded-full object-cover border border-slate-200 shadow-2xs"
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                                  {task.assignee.name[0]}
                                </div>
                              )}
                              <span className="font-medium text-slate-800 text-[11px]">{task.assignee.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-[#0284C7] font-medium text-[11px]">
                                <Key className="w-3.5 h-3.5 text-[#EF4444] flex-shrink-0" />
                                <span className="truncate hover:underline cursor-pointer" onClick={() => setViewingTaskInfo(task)}>
                                  {oppRef}
                                </span>
                                <button type="button" onClick={() => setViewingTaskInfo(task)} className="text-[#0284C7] p-0.5">
                                  <Info className="w-3 h-3" />
                                </button>
                              </div>
                              <div className="flex items-center gap-1.5 text-[#0284C7] font-medium text-[11px]">
                                <Shield className="w-3.5 h-3.5 text-[#EF4444] flex-shrink-0" />
                                <span className="truncate uppercase hover:underline cursor-pointer" onClick={() => setViewingTaskInfo(task)}>
                                  {customerName}
                                </span>
                                <button type="button" onClick={() => setViewingTaskInfo(task)} className="text-[#0284C7] p-0.5">
                                  <Info className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-start gap-1.5">
                              <p
                                className="text-[#0284C7] hover:underline font-normal leading-snug flex-1 cursor-pointer"
                                onClick={() => setViewingTaskInfo(task)}
                              >
                                {task.taskDetails}
                              </p>
                              <button
                                type="button"
                                onClick={() => setViewingTaskInfo(task)}
                                className="text-[#0284C7] hover:text-[#0369A1] p-0.5"
                                title="View Details"
                              >
                                <Info className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-slate-700 font-medium text-[11px]">
                            {task.dueTime || '03:30 PM'}
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#F5A623] text-white">
                              <Edit2 className="w-2.5 h-2.5" />
                              <span>{task.priority === 'High' ? 'Mid' : task.priority}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                              {task.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Tomorrow (Thu, 24 Sep) */}
          <div>
            <div className="flex items-center">
              <div className="bg-[#2D45B0] text-white px-3.5 py-1.5 rounded-t-md font-bold text-xs shadow-2xs">
                Tomorrow (Thu, 24 Sep)
              </div>
            </div>
            <div className="border-t-2 border-[#2D45B0] overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[720px]">
                <thead className="bg-[#FAFBFD] border-b border-slate-200 text-slate-700 font-bold text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 w-16 text-center">SL.No</th>
                    <th className="py-2.5 px-4 w-32">Assignee</th>
                    <th className="py-2.5 px-4 min-w-[240px]">Task Under</th>
                    <th className="py-2.5 px-4 min-w-[260px]">Task Details</th>
                    <th className="py-2.5 px-4 w-28 whitespace-nowrap">Time</th>
                    <th className="py-2.5 px-4 w-24 text-center">Priority</th>
                    <th className="py-2.5 px-4 w-24 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tomorrowMeetings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-3.5 px-4 text-slate-500 font-normal italic text-xs">
                        No Records.
                      </td>
                    </tr>
                  ) : (
                    tomorrowMeetings.map((task, idx) => {
                      const parts = task.taskUnder.split(' / ');
                      const oppRef = parts[0] || task.taskUnder;
                      const customerName = parts[1] || 'LUXURY CASTLE CONTRACTING';

                      return (
                        <tr key={task.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3 text-center font-semibold text-slate-600">{idx + 1}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {task.assignee.avatar ? (
                                <img
                                  src={task.assignee.avatar}
                                  alt={task.assignee.name}
                                  className="w-7 h-7 rounded-full object-cover border border-slate-200 shadow-2xs"
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                                  {task.assignee.name[0]}
                                </div>
                              )}
                              <span className="font-medium text-slate-800 text-[11px]">{task.assignee.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-[#0284C7] font-medium text-[11px]">
                                <Key className="w-3.5 h-3.5 text-[#EF4444] flex-shrink-0" />
                                <span className="truncate hover:underline cursor-pointer" onClick={() => setViewingTaskInfo(task)}>
                                  {oppRef}
                                </span>
                                <button type="button" onClick={() => setViewingTaskInfo(task)} className="text-[#0284C7] p-0.5">
                                  <Info className="w-3 h-3" />
                                </button>
                              </div>
                              <div className="flex items-center gap-1.5 text-[#0284C7] font-medium text-[11px]">
                                <Shield className="w-3.5 h-3.5 text-[#EF4444] flex-shrink-0" />
                                <span className="truncate uppercase hover:underline cursor-pointer" onClick={() => setViewingTaskInfo(task)}>
                                  {customerName}
                                </span>
                                <button type="button" onClick={() => setViewingTaskInfo(task)} className="text-[#0284C7] p-0.5">
                                  <Info className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-start gap-1.5">
                              <p
                                className="text-[#0284C7] hover:underline font-normal leading-snug flex-1 cursor-pointer"
                                onClick={() => setViewingTaskInfo(task)}
                              >
                                {task.taskDetails}
                              </p>
                              <button
                                type="button"
                                onClick={() => setViewingTaskInfo(task)}
                                className="text-[#0284C7] hover:text-[#0369A1] p-0.5"
                                title="View Details"
                              >
                                <Info className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-slate-700 font-medium text-[11px]">
                            {task.dueTime || '11:00 AM'}
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#F5A623] text-white">
                              <Edit2 className="w-2.5 h-2.5" />
                              <span>{task.priority === 'High' ? 'Mid' : task.priority}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                              {task.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Later (Fri, 25 Sep - Fri, 02 Oct) */}
          <div>
            <div className="flex items-center">
              <div className="bg-[#2E9946] text-white px-3.5 py-1.5 rounded-t-md font-bold text-xs shadow-2xs">
                Later (Fri, 25 Sep - Fri, 02 Oct)
              </div>
            </div>
            <div className="border-t-2 border-[#2E9946] overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[720px]">
                <thead className="bg-[#FAFBFD] border-b border-slate-200 text-slate-700 font-bold text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 w-16 text-center">SL.No</th>
                    <th className="py-2.5 px-4 w-32">Assignee</th>
                    <th className="py-2.5 px-4 min-w-[240px]">Task Under</th>
                    <th className="py-2.5 px-4 min-w-[260px]">Task Details</th>
                    <th className="py-2.5 px-4 w-32 whitespace-nowrap">Due Date</th>
                    <th className="py-2.5 px-4 w-24 text-center">Priority</th>
                    <th className="py-2.5 px-4 w-24 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {laterMeetings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-3.5 px-4 text-slate-500 font-normal italic text-xs">
                        No Records.
                      </td>
                    </tr>
                  ) : (
                    laterMeetings.map((task, idx) => {
                      const parts = task.taskUnder.split(' / ');
                      const oppRef = parts[0] || task.taskUnder;
                      const customerName = parts[1] || 'EMAAR PROPERTIES PJSC';

                      return (
                        <tr key={task.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3 text-center font-semibold text-slate-600">{idx + 1}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {task.assignee.avatar ? (
                                <img
                                  src={task.assignee.avatar}
                                  alt={task.assignee.name}
                                  className="w-7 h-7 rounded-full object-cover border border-slate-200 shadow-2xs"
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                                  {task.assignee.name[0]}
                                </div>
                              )}
                              <span className="font-medium text-slate-800 text-[11px]">{task.assignee.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-[#0284C7] font-medium text-[11px]">
                                <Key className="w-3.5 h-3.5 text-[#EF4444] flex-shrink-0" />
                                <span className="truncate hover:underline cursor-pointer" onClick={() => setViewingTaskInfo(task)}>
                                  {oppRef}
                                </span>
                                <button type="button" onClick={() => setViewingTaskInfo(task)} className="text-[#0284C7] p-0.5">
                                  <Info className="w-3 h-3" />
                                </button>
                              </div>
                              <div className="flex items-center gap-1.5 text-[#0284C7] font-medium text-[11px]">
                                <Shield className="w-3.5 h-3.5 text-[#EF4444] flex-shrink-0" />
                                <span className="truncate uppercase hover:underline cursor-pointer" onClick={() => setViewingTaskInfo(task)}>
                                  {customerName}
                                </span>
                                <button type="button" onClick={() => setViewingTaskInfo(task)} className="text-[#0284C7] p-0.5">
                                  <Info className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-start gap-1.5">
                              <p
                                className="text-[#0284C7] hover:underline font-normal leading-snug flex-1 cursor-pointer"
                                onClick={() => setViewingTaskInfo(task)}
                              >
                                {task.taskDetails}
                              </p>
                              <button
                                type="button"
                                onClick={() => setViewingTaskInfo(task)}
                                className="text-[#0284C7] hover:text-[#0369A1] p-0.5"
                                title="View Details"
                              >
                                <Info className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-slate-700 font-medium text-[11px]">
                            {task.dueDate} {task.dueTime}
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#F5A623] text-white">
                              <Edit2 className="w-2.5 h-2.5" />
                              <span>{task.priority === 'High' ? 'Mid' : task.priority}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {task.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* ── Main 2-Column Cezcon Layout with Proper Sizing & Alignment ── */
        <div className="flex flex-col lg:flex-row gap-3.5 items-start w-full">
          {/* Left Column: Filter Panel (Collapsible & Compact) */}
          {showFilterSidebar && (
            <div className="w-full lg:w-56 xl:w-60 flex-shrink-0 bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Filter className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-[11px] text-slate-500 hover:text-rose-600 transition-colors font-semibold cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowFilterSidebar(false)}
                    className="w-5 h-5 rounded bg-[#E11D48] text-white flex items-center justify-center hover:bg-[#BE123C] transition-colors shadow-xs cursor-pointer"
                    title="Hide filter panel"
                  >
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                {/* Field 1: Sort By */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 block">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-slate-50/80 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs"
                  >
                    <option value="All Task">All Task</option>
                    <option value="Due Date">Due Date</option>
                    <option value="Priority">Priority (High to Low)</option>
                    <option value="Assignee">Assignee (A-Z)</option>
                  </select>
                </div>

                {/* Field 2: Assignee */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 block">Assignee</label>
                  <select
                    value={assigneeFilter}
                    onChange={(e) => setAssigneeFilter(e.target.value)}
                    className="w-full bg-slate-50/80 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs"
                  >
                    <option value="All Owners">All Owners</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Field 3: Task Type */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 block">Task Type</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full bg-slate-50/80 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs"
                  >
                    <option value="All">All</option>
                    <option value="Follow-up">Followup</option>
                    <option value="Call">Call</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Demo">Demo</option>
                    <option value="Email">Email</option>
                    <option value="Review">Review</option>
                    <option value="Document">Document</option>
                  </select>
                </div>

                {/* Field 4: Created By */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 block">Created By</label>
                  <select
                    value={createdByFilter}
                    onChange={(e) => setCreatedByFilter(e.target.value)}
                    className="w-full bg-slate-50/80 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs"
                  >
                    <option value="All">All</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Operations Manager">Operations Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Right Column: Main Task Table Container (Fluid & Edge-to-Edge) */}
          <div className="flex-1 min-w-0 w-full bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
            {/* Header Strip with Action Buttons */}
            <div className="bg-[#EAEFF5] border-b border-slate-200 px-3.5 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Menu className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  <h2 className="text-xs font-bold text-slate-800 tracking-wide whitespace-nowrap">
                    {tabTitles[activeTab]}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFilterSidebar(!showFilterSidebar)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-semibold transition-colors cursor-pointer shadow-2xs ${showFilterSidebar
                      ? 'bg-[#2563EB] text-white border-[#2563EB]'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  title="Toggle filter options"
                >
                  <Filter className="w-3 h-3" />
                  <span>Filter</span>
                  {activeFilterCount > 0 && (
                    <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${showFilterSidebar ? 'bg-white text-[#2563EB]' : 'bg-[#2563EB] text-white'}`}>
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-xs flex-wrap sm:flex-nowrap">
                <button
                  type="button"
                  onClick={() => {
                    setAssignForm({
                      targetAssignee: 'Alex Rivera',
                      selectedTaskIds: filteredTasks.map((t) => t.id),
                    });
                    setIsAssignModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded bg-[#0F2844] hover:bg-[#0A1D33] text-white font-semibold transition-colors cursor-pointer shadow-xs text-[11px] whitespace-nowrap flex-1 sm:flex-none"
                >
                  <Edit2 className="w-3 h-3 text-white" />
                  <span>Assign</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold transition-colors cursor-pointer shadow-xs text-[11px] whitespace-nowrap flex-1 sm:flex-none"
                >
                  <span className="font-extrabold text-xs leading-none">+</span>
                  <span>+ TASK</span>
                  <ChevronDown className="w-3 h-3 ml-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold transition-colors cursor-pointer shadow-xs text-[11px] whitespace-nowrap flex-1 sm:flex-none"
                >
                  <span className="font-extrabold text-xs leading-none">+</span>
                  <span>TASK</span>
                  <ChevronDown className="w-3 h-3 ml-0.5" />
                </button>
              </div>
            </div>

            {/* Table Controls (Rows selector & Search box) */}
            <div className="px-4 py-2 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs bg-white">
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <span>Shows</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-white border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span>Rows</span>
              </div>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search Task"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 pr-8 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Subtype Filter Strip inside Table (Followup / Call / All) */}
            <div className="px-4 py-2 bg-[#FAFBFD] border-b border-slate-200 flex items-center gap-6 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveSubtype('Followup')}
                className={`transition-colors cursor-pointer ${activeSubtype === 'Followup'
                  ? 'text-[#F97316] font-bold border-b-2 border-[#F97316] pb-0.5'
                  : 'text-[#F97316]/80 hover:text-[#F97316]'
                  }`}
              >
                Followup <span className="text-[#F97316] font-bold">(269)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubtype('Call')}
                className={`transition-colors cursor-pointer ${activeSubtype === 'Call'
                  ? 'text-[#0284C7] font-bold border-b-2 border-[#0284C7] pb-0.5'
                  : 'text-[#0284C7]/80 hover:text-[#0284C7]'
                  }`}
              >
                Call <span className="text-[#0284C7] font-bold">(177)</span>
              </button>

              {activeSubtype !== 'ALL' && (
                <button
                  type="button"
                  onClick={() => setActiveSubtype('ALL')}
                  className="text-slate-500 hover:text-slate-800 cursor-pointer font-medium ml-2"
                >
                  Clear Filter
                </button>
              )}
            </div>

            {/* ── Mobile View: Task Cards (Screens < md) ── */}
            <div className="block md:hidden space-y-3 p-3">
              {paginatedTasks.length === 0 ? (
                <div className="py-8 text-center text-slate-400 font-medium text-xs bg-white rounded border border-slate-200">
                  No records found.
                </div>
              ) : (
                paginatedTasks.map((task, idx) => {
                  const slNo = (currentPage - 1) * pageSize + idx + 1;
                  const isCompleted = task.status === 'Completed';
                  const parts = task.taskUnder.split(' / ');
                  const oppRef = parts[0] || task.taskUnder;
                  const customerName = parts[1] || 'FOCUS EMC KITCHENS LLC';

                  return (
                    <div
                      key={task.id}
                      className={cn(
                        'bg-white border rounded-lg p-3.5 shadow-xs space-y-2.5 transition-all text-xs',
                        isCompleted ? 'bg-slate-50/70 border-slate-200 opacity-80' : 'border-slate-200'
                      )}
                    >
                      {/* Top Row: SL No, Assignee, Priority, Actions */}
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-5 h-5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                            #{slNo}
                          </span>
                          <div className="flex items-center gap-1.5 min-w-0">
                            {task.assignee.avatar ? (
                              <img
                                src={task.assignee.avatar}
                                alt={task.assignee.name}
                                className="w-5 h-5 rounded-full object-cover border border-slate-200 shrink-0"
                              />
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[9px] flex items-center justify-center shrink-0">
                                {task.assignee.name[0]}
                              </div>
                            )}
                            <span className="font-semibold text-slate-800 text-xs truncate">
                              {task.assignee.name}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#F5A623] text-white">
                            <Edit2 className="w-2.5 h-2.5" />
                            <span>{task.priority === 'High' ? 'Mid' : task.priority}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              setActionMenuTaskId(actionMenuTaskId === task.id ? null : task.id)
                            }
                            className="flex items-center gap-1 px-2 py-1 rounded bg-[#006f8e] text-white text-[10px] font-medium"
                          >
                            <Settings className="w-3 h-3" />
                            <ChevronDown className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>

                      {/* Task Details */}
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h3
                            className={cn(
                              'text-xs font-bold text-[#0284C7] leading-snug cursor-pointer hover:underline',
                              isCompleted ? 'line-through text-slate-400' : ''
                            )}
                            onClick={() => setViewingTaskInfo(task)}
                          >
                            {task.taskDetails}
                          </h3>
                          <button
                            type="button"
                            onClick={() => setViewingTaskInfo(task)}
                            className="text-[#0284C7] p-0.5 shrink-0"
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Task Under Box */}
                      <div className="bg-slate-50 p-2.5 rounded border border-slate-100 space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-[#0284C7] font-medium text-[11px]">
                          <Key className="w-3.5 h-3.5 text-[#EF4444] shrink-0" />
                          <span className="truncate hover:underline cursor-pointer" onClick={() => setViewingTaskInfo(task)}>
                            {oppRef}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#0284C7] font-medium text-[11px]">
                          <Shield className="w-3.5 h-3.5 text-[#EF4444] shrink-0" />
                          <span className="truncate uppercase hover:underline cursor-pointer" onClick={() => setViewingTaskInfo(task)}>
                            {customerName}
                          </span>
                        </div>
                      </div>

                      {/* Footer: Due Date & Task Type */}
                      <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-100 text-slate-600">
                        <div className="flex items-center gap-1 font-medium">
                          <span>📅</span>
                          <span>{task.dueDate} {task.dueTime}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[10px]">
                          {task.taskType === 'Follow-up' ? 'Followup' : task.taskType}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* ── Desktop View: Data Table (Screens >= md) ── */}
            <div className="hidden md:block overflow-x-auto min-h-[300px] w-full">
              <table className="w-full text-left text-xs border-collapse min-w-[720px]">
                <thead className="bg-[#FAFBFD] border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3 w-12 text-center whitespace-nowrap">SL.NO</th>
                    <th className="py-2.5 px-2 w-16 text-center whitespace-nowrap">ASSIGNEE</th>
                    <th className="py-2.5 px-3 min-w-[200px]">TASK DETAILS</th>
                    <th className="py-2.5 px-3 min-w-[220px]">TASK UNDER</th>
                    <th className="py-2.5 px-3 w-24 whitespace-nowrap">TASK TYPE</th>
                    <th className="py-2.5 px-3 w-28 whitespace-nowrap text-left sm:text-center">DUE DATE</th>
                    <th className="py-2.5 px-2 w-20 text-center whitespace-nowrap">PRIORITY</th>
                    <th className="py-2.5 px-2 w-16 text-center whitespace-nowrap">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedTasks.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400 font-medium">
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    paginatedTasks.map((task, idx) => {
                      const slNo = (currentPage - 1) * pageSize + idx + 1;
                      const isCompleted = task.status === 'Completed';

                      // Parse Task Under for Opportunity & Customer
                      const parts = task.taskUnder.split(' / ');
                      const oppRef = parts[0] || task.taskUnder;
                      const customerName = parts[1] || 'FOCUS EMC KITCHENS LLC';

                      return (
                        <tr
                          key={task.id}
                          className={`hover:bg-slate-50/80 transition-colors ${isCompleted ? 'bg-slate-50/40 text-slate-400' : ''
                            }`}
                        >
                          {/* SL No */}
                          <td className="py-2.5 px-3 text-center font-semibold text-slate-600">{slNo}</td>

                          {/* Assignee Avatar */}
                          <td className="py-2.5 px-2 text-center">
                            <div className="flex items-center justify-center">
                              {task.assignee.avatar ? (
                                <img
                                  src={task.assignee.avatar}
                                  alt={task.assignee.name}
                                  className="w-7 h-7 rounded-full object-cover border border-slate-200 shadow-2xs"
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center shadow-2xs">
                                  {task.assignee.name[0]}
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Task Details with Info Icon */}
                          <td className="py-2.5 px-3">
                            <div className="flex items-start gap-1.5">
                              <p
                                className={`text-[#0284C7] hover:underline font-normal leading-snug flex-1 cursor-pointer text-xs ${isCompleted ? 'line-through text-slate-400' : ''
                                  }`}
                                onClick={() => setViewingTaskInfo(task)}
                              >
                                {task.taskDetails}
                              </p>
                              <button
                                type="button"
                                onClick={() => setViewingTaskInfo(task)}
                                className="text-[#0284C7] hover:text-[#0369A1] p-0.5 flex-shrink-0 cursor-pointer"
                                title="View Details"
                              >
                                <Info className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>

                          {/* Task Under: Opportunity (Key icon) + Customer (Shield icon) */}
                          <td className="py-2.5 px-3">
                            <div className="space-y-1">
                              {/* Opportunity Ref with Key icon */}
                              <div className="flex items-center gap-1.5 text-[#0284C7] font-medium text-[11px]">
                                <Key className="w-3.5 h-3.5 text-[#EF4444] flex-shrink-0" />
                                <span className="truncate hover:underline cursor-pointer" onClick={() => setViewingTaskInfo(task)}>
                                  {oppRef}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setViewingTaskInfo(task)}
                                  className="text-[#0284C7] hover:text-[#0369A1] p-0.5 flex-shrink-0"
                                  title="Opportunity Details"
                                >
                                  <Info className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Customer with Shield icon */}
                              <div className="flex items-center gap-1.5 text-[#0284C7] font-medium text-[11px]">
                                <Shield className="w-3.5 h-3.5 text-[#EF4444] flex-shrink-0" />
                                <span className="truncate uppercase hover:underline cursor-pointer max-w-[200px]" onClick={() => setViewingTaskInfo(task)}>
                                  {customerName}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setViewingTaskInfo(task)}
                                  className="text-[#0284C7] hover:text-[#0369A1] p-0.5 flex-shrink-0"
                                  title="Customer Details"
                                >
                                  <Info className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </td>

                          {/* Task Type */}
                          <td className="py-2.5 px-3 whitespace-nowrap text-slate-700 font-medium text-xs">
                            {task.taskType === 'Follow-up' ? 'Followup' : task.taskType}
                          </td>

                          {/* Due Date & Time */}
                          <td className="py-2.5 px-3 whitespace-nowrap text-slate-700 font-medium text-[11px] text-left sm:text-center">
                            <div>{task.dueDate}</div>
                            <div className="text-[10px] text-slate-500">{task.dueTime}</div>
                          </td>

                          {/* Priority Badge */}
                          <td className="py-2.5 px-2 text-center whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#F5A623] text-white shadow-2xs">
                              <Edit2 className="w-2.5 h-2.5" />
                              <span>
                                {task.priority === 'High' ? 'Mid' : task.priority}
                              </span>
                            </span>
                          </td>

                          {/* Action: Gear Dropdown */}
                          <td className="py-2.5 px-2 text-center whitespace-nowrap relative">
                            <div className="flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() =>
                                  setActionMenuTaskId(actionMenuTaskId === task.id ? null : task.id)
                                }
                                className="flex items-center gap-1 px-2.5 py-1 rounded-[3px] bg-[#006f8e] hover:bg-[#005f7a] text-white transition-colors cursor-pointer shadow-xs text-[11px] font-medium"
                                title="Actions"
                              >
                                <Settings className="w-3.5 h-3.5" />
                                <ChevronDown className="w-3 h-3" />
                              </button>

                              {/* Dropdown Menu matching Cezcon CRM */}
                              {actionMenuTaskId === task.id && (
                                <>
                                  <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setActionMenuTaskId(null)}
                                  />
                                  <div className="absolute right-0 top-full mt-1.5 w-44 bg-white border border-slate-200 rounded-[4px] shadow-lg z-50 py-1 text-left text-[13px] text-[#212529]">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        window.open(`/tasks?id=${task.id}`, '_blank');
                                        setActionMenuTaskId(null);
                                      }}
                                      className="w-full flex items-center gap-2.5 px-3.5 py-1.5 hover:bg-slate-100/70 transition-colors text-slate-800 cursor-pointer text-left font-normal"
                                    >
                                      <Book className="w-4 h-4 text-slate-700 flex-shrink-0 stroke-[1.75]" />
                                      <span>Open in new tab</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        setViewingTaskInfo(task);
                                        setActionMenuTaskId(null);
                                      }}
                                      className="w-full flex items-center gap-2.5 px-3.5 py-1.5 hover:bg-slate-100/70 transition-colors text-slate-800 cursor-pointer text-left font-normal"
                                    >
                                      <Book className="w-4 h-4 text-slate-700 flex-shrink-0 stroke-[1.75]" />
                                      <span>View</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingTask(task);
                                        setActionMenuTaskId(null);
                                      }}
                                      className="w-full flex items-center gap-2.5 px-3.5 py-1.5 hover:bg-slate-100/70 transition-colors text-slate-800 cursor-pointer text-left font-normal"
                                    >
                                      <Edit className="w-4 h-4 text-slate-700 flex-shrink-0 stroke-[1.75]" />
                                      <span>Edit</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (confirm(`Are you sure you want to delete this task?`)) {
                                          deleteTask(task.id);
                                        }
                                        setActionMenuTaskId(null);
                                      }}
                                      className="w-full flex items-center gap-2.5 px-3.5 py-1.5 hover:bg-slate-100/70 transition-colors text-slate-800 cursor-pointer text-left font-normal"
                                    >
                                      <Trash2 className="w-4 h-4 text-slate-700 flex-shrink-0 stroke-[1.75]" />
                                      <span>Delete</span>
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer: Entries count & Pagination */}
            <div className="px-3.5 py-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500 bg-white">
              <div>
                {totalEntries > 0 ? (
                  <span>
                    Showing {(currentPage - 1) * pageSize + 1} to{' '}
                    {Math.min(currentPage * pageSize, totalEntries)} of {totalEntries} entries
                  </span>
                ) : (
                  <span>Showing 0 to 0 of 0 entries</span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer font-medium"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setCurrentPage(p)}
                    className={`px-2.5 py-1 rounded border text-xs font-bold transition-colors cursor-pointer ${currentPage === p
                        ? 'bg-[#2563EB] text-white border-[#2563EB]'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Cezcon-Style Fixed Bottom Status Footer (Desktop only to prevent mobile occlusion) ── */}
      <div className="hidden sm:flex fixed bottom-0 left-0 right-0 bg-[#0F172A] text-white text-[11px] px-4 sm:px-8 py-2 items-center justify-between gap-2 z-30 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-white/60">2026 © Cool Technologies</span>
          <span className="flex items-center gap-1.5 text-emerald-400 bg-white/10 px-2.5 py-0.5 rounded-full">
            <MessageSquare className="w-3 h-3" />
            <span>You have 148 SMS credits remaining.</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-white/70">
          <div className="flex items-center gap-1.5">
            <HardDrive className="w-3 h-3 text-blue-400" />
            <span>150.3MB of 10GB (1%) used</span>
          </div>
          <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="bg-blue-400 h-full w-[1%]" />
          </div>
        </div>
      </div>

      {/* ── MODAL 1: Add New Task ────────────────────────────────────── */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Create Operational Task"
          description="Schedule a follow-up or operational milestone."
        >
          <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
            <Input
              label="Task Details *"
              required
              placeholder="e.g. Follow up with the customer about the requirements"
              value={formData.taskDetails}
              onChange={(e) => setFormData({ ...formData, taskDetails: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Task Under / Opportunity"
                value={formData.taskUnder}
                onChange={(e) => setFormData({ ...formData, taskUnder: e.target.value })}
              />
              <Select
                label="Assignee"
                value={formData.assignee.name}
                options={users.map((u) => ({ label: u.name, value: u.name }))}
                onChange={(e) => setFormData({ ...formData, assignee: { name: e.target.value } })}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Select
                label="Task Type"
                value={formData.taskType}
                options={[
                  { label: 'Follow-up', value: 'Follow-up' },
                  { label: 'Call', value: 'Call' },
                  { label: 'Meeting', value: 'Meeting' },
                  { label: 'Demo', value: 'Demo' },
                  { label: 'Email', value: 'Email' },
                  { label: 'Review', value: 'Review' },
                  { label: 'Document', value: 'Document' },
                ]}
                onChange={(e: any) => setFormData({ ...formData, taskType: e.target.value })}
              />
              <Select
                label="Priority"
                value={formData.priority}
                options={[
                  { label: 'Urgent', value: 'Urgent' },
                  { label: 'High (Mid)', value: 'High' },
                  { label: 'Medium', value: 'Medium' },
                  { label: 'Low', value: 'Low' },
                ]}
                onChange={(e: any) => setFormData({ ...formData, priority: e.target.value })}
              />
              <Input
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="bg-[#16A34A] text-white">
                Save Task
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── MODAL 2: Assign Task ─────────────────────────────────────── */}
      {isAssignModalOpen && (
        <Modal
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          title="Reassign Task Ownership"
          description="Batch assign selected tasks to a team member."
        >
          <form onSubmit={handleBulkAssign} className="space-y-3.5 text-xs">
            <Select
              label="Select Assignee *"
              value={assignForm.targetAssignee}
              options={users.map((u) => ({ label: u.name, value: u.name }))}
              onChange={(e) => setAssignForm({ ...assignForm, targetAssignee: e.target.value })}
            />
            <p className="text-[11px] text-slate-500">
              Will reassign {assignForm.selectedTaskIds.length} tasks in the current view to{' '}
              <strong className="text-slate-800">{assignForm.targetAssignee}</strong>.
            </p>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAssignModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="bg-[#1E293B] text-white">
                Confirm Assignment
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── MODAL 3: Edit Task Modal ─────────────────────────────────── */}
      {editingTask && (
        <Modal
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          title="Edit Operational Task"
          description={`Update details for Task #${editingTask.slNo}`}
        >
          <form onSubmit={handleUpdateTask} className="space-y-3 text-xs">
            <Input
              label="Task Details *"
              required
              value={editingTask.taskDetails}
              onChange={(e) => setEditingTask({ ...editingTask, taskDetails: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Task Under"
                value={editingTask.taskUnder}
                onChange={(e) => setEditingTask({ ...editingTask, taskUnder: e.target.value })}
              />
              <Select
                label="Assignee"
                value={editingTask.assignee.name}
                options={users.map((u) => ({ label: u.name, value: u.name }))}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, assignee: { name: e.target.value } })
                }
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Select
                label="Task Type"
                value={editingTask.taskType}
                options={[
                  { label: 'Follow-up', value: 'Follow-up' },
                  { label: 'Call', value: 'Call' },
                  { label: 'Meeting', value: 'Meeting' },
                  { label: 'Demo', value: 'Demo' },
                  { label: 'Email', value: 'Email' },
                  { label: 'Review', value: 'Review' },
                  { label: 'Document', value: 'Document' },
                ]}
                onChange={(e: any) => setEditingTask({ ...editingTask, taskType: e.target.value })}
              />
              <Select
                label="Priority"
                value={editingTask.priority}
                options={[
                  { label: 'Urgent', value: 'Urgent' },
                  { label: 'High', value: 'High' },
                  { label: 'Medium', value: 'Medium' },
                  { label: 'Low', value: 'Low' },
                ]}
                onChange={(e: any) => setEditingTask({ ...editingTask, priority: e.target.value })}
              />
              <Select
                label="Status"
                value={editingTask.status}
                options={[
                  { label: 'Pending', value: 'Pending' },
                  { label: 'In Progress', value: 'In Progress' },
                  { label: 'Completed', value: 'Completed' },
                  { label: 'Overdue', value: 'Overdue' },
                  { label: 'Upcoming', value: 'Upcoming' },
                ]}
                onChange={(e: any) => setEditingTask({ ...editingTask, status: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={() => setEditingTask(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="bg-blue-600 text-white">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── MODAL 4: View Task Info Popover ──────────────────────────── */}
      {viewingTaskInfo && (
        <Modal
          isOpen={!!viewingTaskInfo}
          onClose={() => setViewingTaskInfo(null)}
          title="Task & Commercial Milestone Details"
          description={`Overview of record #${viewingTaskInfo.slNo}`}
        >
          <div className="space-y-3.5 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Task Subject:</span>
                <p className="text-slate-900 font-semibold text-sm mt-0.5">{viewingTaskInfo.taskDetails}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Related Deal:</span>
                  <p className="text-blue-600 font-bold flex items-center gap-1 mt-0.5">
                    <Key className="w-3 h-3 text-rose-500" />
                    <span>{viewingTaskInfo.taskUnder}</span>
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Assignee:</span>
                  <p className="text-slate-800 font-bold mt-0.5">{viewingTaskInfo.assignee.name}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Due Date:</span>
                  <p className="text-slate-800 font-medium mt-0.5">{viewingTaskInfo.dueDate} • {viewingTaskInfo.dueTime}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Priority:</span>
                  <div className="mt-0.5">
                    <StatusBadge status={viewingTaskInfo.priority} />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Status:</span>
                  <div className="mt-0.5">
                    <StatusBadge status={viewingTaskInfo.status} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setViewingTaskInfo(null)}
                className="bg-blue-600 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default function TasksPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Tasks...</div>}>
      <TasksContent />
    </Suspense>
  );
}
