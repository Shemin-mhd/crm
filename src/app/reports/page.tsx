'use client';

import React, { useState } from 'react';
import {
  FileText,
  Search,
  Download,
  BarChart3,
  TrendingUp,
  Users,
  Building2,
  Package,
  CheckSquare,
  Sliders,
  Activity,
  ChevronRight,
  Edit2,
  Play,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BackButton } from '@/components/ui/BackButton';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

// ── Static chart data ──────────────────────────────────────────────────────
const salesRevenueData = [
  { month: 'Jan', revenue: 52000, target: 45000, deals: 8 },
  { month: 'Feb', revenue: 48000, target: 50000, deals: 7 },
  { month: 'Mar', revenue: 68000, target: 55000, deals: 11 },
  { month: 'Apr', revenue: 74000, target: 60000, deals: 13 },
  { month: 'May', revenue: 89000, target: 70000, deals: 16 },
  { month: 'Jun', revenue: 95000, target: 80000, deals: 18 },
  { month: 'Jul', revenue: 104000, target: 85000, deals: 21 },
  { month: 'Aug', revenue: 112000, target: 90000, deals: 24 },
  { month: 'Sep', revenue: 128000, target: 100000, deals: 27 },
];

const leadSourceData = [
  { name: 'Website', value: 48, color: '#2563EB' },
  { name: 'LinkedIn', value: 34, color: '#0EA5E9' },
  { name: 'Referral', value: 28, color: '#7C3AED' },
  { name: 'Direct Email', value: 18, color: '#10B981' },
  { name: 'Events', value: 12, color: '#F59E0B' },
];

const taskCompletionData = [
  { week: 'W1', completed: 22, pending: 8, overdue: 3 },
  { week: 'W2', completed: 30, pending: 5, overdue: 2 },
  { week: 'W3', completed: 27, pending: 10, overdue: 5 },
  { week: 'W4', completed: 35, pending: 6, overdue: 1 },
  { week: 'W5', completed: 40, pending: 4, overdue: 2 },
];

const customerGrowthData = [
  { month: 'Apr', customers: 42 },
  { month: 'May', customers: 47 },
  { month: 'Jun', customers: 53 },
  { month: 'Jul', customers: 58 },
  { month: 'Aug', customers: 64 },
  { month: 'Sep', customers: 71 },
];

const inventoryValuationData = [
  { category: 'Networking', value: 284000 },
  { category: 'VoIP', value: 196000 },
  { category: 'Security', value: 152000 },
  { category: 'Surveillance', value: 118000 },
  { category: 'Software', value: 87000 },
];

// ── Exact Cezcon CRM Standard Reports from Reference Image ──────────────────
const CEZCON_STANDARD_REPORTS = [
  { id: 1, title: 'Opportunity Closing', description: 'Opportunity pipeline closures and win-loss status analysis', canCustomize: true },
  { id: 2, title: 'Services', description: 'Service master listing (Service type items) with unit, category and brand breakdown', canCustomize: false },
  { id: 3, title: 'Product', description: 'Product master listing (Product type items) with unit, category, store and stock levels', canCustomize: false },
  { id: 4, title: 'Sales', description: 'Comprehensive sales performance and gross margin reporting', canCustomize: true },
  { id: 5, title: 'Campaign', description: 'Marketing campaign attribution and conversions', canCustomize: false },
  { id: 6, title: 'Salesman', description: 'Sales Executives performance and deal quotas', canCustomize: false },
  { id: 7, title: 'Aging Report', description: 'Customer receivable aging matrix across 30, 60, 90+ days', canCustomize: false },
  { id: 8, title: 'Customer Statement', description: 'Account balances and ledger statement by customer', canCustomize: false },
  { id: 9, title: 'Invoice And Receipt Report', description: 'Tax invoices, proformas, and receipt reconciliation', canCustomize: false },
  { id: 10, title: 'Inventory', description: 'Warehouse stock balances, reorder thresholds, and valuations', canCustomize: false },
  { id: 11, title: 'WhatsApp Number', description: 'WhatsApp broadcast logs and customer conversation history', canCustomize: false },
  { id: 12, title: 'Sale By Salesperson', description: 'Sales volume and deal count grouped by individual salesperson', canCustomize: false },
  { id: 13, title: 'Account Statement', description: 'Detailed account transactions and financial summaries', canCustomize: false },
  { id: 14, title: 'Stock Movement Report', description: 'Stock transfers, receipts, and dispatch logs across branches', canCustomize: false },
  { id: 15, title: 'Supplier Statement', description: 'Supplier purchase invoices, payment schedules, and outstanding balances', canCustomize: true },
  { id: 16, title: 'Lead Report', description: 'Inbound lead attribution, conversion lifecycle, and sales stage analytics', canCustomize: true },
  { id: 17, title: 'Customer Report', description: 'Customer AMC contracts, renewal logs, and satisfaction audits', canCustomize: false },
  { id: 18, title: 'Task Report', description: 'Operational turnaround time, completion rate, and overdue SLA log', canCustomize: true },
  { id: 19, title: 'Employee Performance', description: 'Individual technician first-time fix rate, job hours, and ratings', canCustomize: false },
  { id: 20, title: 'Team Performance', description: 'Team capacity utilization, workload distribution, and regional metrics', canCustomize: false },
  { id: 21, title: 'Activity Report', description: 'Daily technician visits, onsite audits, and client interactions', canCustomize: false },
  { id: 22, title: 'Purchase Report', description: 'Purchase order fulfillment, supplier lead times, and spend analysis', canCustomize: true },
];

const TOOLTIP_STYLE = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  color: '#0f172a',
  fontSize: '11px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
};

export default function ReportsPage() {
  const [activeView, setActiveView] = useState<'catalog' | 'analytics'>('catalog');
  const [search, setSearch] = useState('');

  const filteredStandardReports = CEZCON_STANDARD_REPORTS.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Top Header / View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-3">
          <BackButton />
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-slate-100 text-slate-700">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Report
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border border-slate-200 bg-white text-xs overflow-hidden">
            <button
              onClick={() => setActiveView('catalog')}
              className={`px-3 py-1.5 font-semibold transition-colors ${activeView === 'catalog' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Report List
            </button>
            <button
              onClick={() => setActiveView('analytics')}
              className={`px-3 py-1.5 font-semibold transition-colors ${activeView === 'analytics' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Analytics & BI Charts
            </button>
          </div>
        </div>
      </div>

      {/* ── Cezcon CRM Standard Report List (Matching Image 1) ───────────────── */}
      {activeView === 'catalog' && (
        <div className="space-y-3">
          {/* Search bar matching Image 1 */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search report..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md pl-3 pr-10 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>

          {/* Clean Table matching Image 1 */}
          <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <tbody className="divide-y divide-slate-100">
                {filteredStandardReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Index Column */}
                    <td className="py-3 px-4 w-12 font-bold text-slate-900 text-center">
                      {report.id}
                    </td>

                    {/* Report Title */}
                    <td className="py-3 px-4 font-bold text-blue-600 w-56">
                      <span className="cursor-pointer hover:underline">{report.title}</span>
                    </td>

                    {/* Report Description */}
                    <td className="py-3 px-4 text-slate-600 text-[11px] leading-snug">
                      {report.description}
                    </td>

                    {/* Action Buttons matching Image 1: [Customize] [Edit] [Run] */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {report.canCustomize && (
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F59E0B] hover:bg-[#D97706] text-white text-[11px] font-semibold shadow-xs transition-colors"
                          >
                            <Sliders className="w-3 h-3" />
                            Customize
                          </button>
                        )}
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-semibold shadow-xs transition-colors"
                        >
                          <Edit2 className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-[11px] font-semibold shadow-xs transition-colors"
                        >
                          <Activity className="w-3 h-3" />
                          Run
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {/* ── Analytics View ─────────────────────────────────────────────────── */}
      {activeView === 'analytics' && (
        <div className="space-y-5">
          {/* KPI Summary Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total Revenue YTD', value: '$770K', change: '+18.5%', positive: true },
              { label: 'Total Leads', value: '140', change: '+14.2%', positive: true },
              { label: 'Win Rate', value: '64.5%', change: '+3.2%', positive: true },
              { label: 'Avg Deal Size', value: '$28.5K', change: '-2.1%', positive: false },
            ].map((kpi) => (
              <Card key={kpi.label} className="p-4 bg-white border-slate-200">
                <p className="text-[11px] font-semibold text-slate-500 mb-1">{kpi.label}</p>
                <p className="text-xl font-bold text-slate-900">{kpi.value}</p>
                <p className={`text-[11px] font-semibold mt-0.5 ${kpi.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                  {kpi.change} vs last year
                </p>
              </Card>
            ))}
          </div>

          {/* Row 1: Sales Revenue + Lead Source Pie */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Card className="lg:col-span-2 border-slate-200 bg-white">
              <CardHeader className="border-b border-slate-100 py-3">
                <div>
                  <CardTitle>Sales Revenue vs Target (Monthly)</CardTitle>
                  <p className="text-xs text-slate-400">Actual revenue achieved against monthly sales targets</p>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesRevenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                      <Tooltip formatter={(val: any) => [`$${Number(val).toLocaleString()}`, '']} contentStyle={TOOLTIP_STYLE} />
                      <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#2563eb" strokeWidth={2.5} fill="url(#revGrad)" />
                      <Area type="monotone" dataKey="target" name="Target" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={1.5} fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white">
              <CardHeader className="border-b border-slate-100 py-3">
                <div>
                  <CardTitle>Lead Source Breakdown</CardTitle>
                  <p className="text-xs text-slate-400">Acquisition channel distribution</p>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leadSourceData}
                        cx="50%"
                        cy="45%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {leadSourceData.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={TOOLTIP_STYLE} />
                      <Legend
                        iconType="circle"
                        iconSize={8}
                        formatter={(value) => <span className="text-[11px] text-slate-700">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Row 2: Task Completion + Customer Growth + Inventory */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Card className="border-slate-200 bg-white">
              <CardHeader className="border-b border-slate-100 py-3">
                <div>
                  <CardTitle>Task Completion Matrix</CardTitle>
                  <p className="text-xs text-slate-400">Weekly task execution breakdown</p>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={taskCompletionData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <Tooltip contentStyle={TOOLTIP_STYLE} />
                      <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[3, 3, 0, 0]} stackId="a" />
                      <Bar dataKey="pending" name="Pending" fill="#f59e0b" radius={[0, 0, 0, 0]} stackId="a" />
                      <Bar dataKey="overdue" name="Overdue" fill="#ef4444" radius={[3, 3, 0, 0]} stackId="a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white">
              <CardHeader className="border-b border-slate-100 py-3">
                <div>
                  <CardTitle>Customer Growth Trend</CardTitle>
                  <p className="text-xs text-slate-400">Active customer account expansion</p>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={customerGrowthData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <Tooltip contentStyle={TOOLTIP_STYLE} />
                      <Line type="monotone" dataKey="customers" name="Customers" stroke="#7c3aed" strokeWidth={2.5} dot={{ r: 4, fill: '#7c3aed' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white">
              <CardHeader className="border-b border-slate-100 py-3">
                <div>
                  <CardTitle>Inventory Valuation</CardTitle>
                  <p className="text-xs text-slate-400">Stock value by product category</p>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={inventoryValuationData} layout="vertical" margin={{ top: 5, right: 10, left: 20, bottom: 0 }}>
                      <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                      <YAxis type="category" dataKey="category" stroke="#94a3b8" fontSize={10} tickLine={false} width={72} />
                      <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, 'Value']} contentStyle={TOOLTIP_STYLE} />
                      <Bar dataKey="value" name="Value" fill="#2563eb" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

