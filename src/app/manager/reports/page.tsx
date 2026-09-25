'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BarChart3, Download, FileSpreadsheet, FileText, Calendar, Filter } from 'lucide-react';
import { ManagerShell } from '@/components/layout/ManagerShell';

const REPORT_TEMPLATES = [
  { id: 'RPT-01', title: 'Monthly Operational SLA & Turnaround Report', type: 'Tasks & Operations', format: 'PDF & CSV', period: 'Sep 2026', size: '2.4 MB' },
  { id: 'RPT-02', title: 'Technician Capacity & Overtime Summary', type: 'Workforce', format: 'Excel (XLSX)', period: 'Sep 2026', size: '1.8 MB' },
  { id: 'RPT-03', title: 'Commercial Lead Pipeline & Conversion Audit', type: 'Sales & Leads', format: 'PDF & CSV', period: 'Q3 2026', size: '3.1 MB' },
  { id: 'RPT-04', title: 'Customer AMC Maintenance & Chiller Asset Log', type: 'Customers', format: 'PDF', period: 'Annual 2026', size: '4.5 MB' },
];

export default function ManagerReportsPage() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') || 'all';

  return (
    <ManagerShell
      title="Reports & Analytics Hub"
      subtitle="Generate, preview, and export executive operations reports, SLA sheets, and capacity audits"
    >
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Standard Operational Report Templates</h2>
          </div>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-xs hover:bg-blue-700">
            <Download className="w-3.5 h-3.5" />
            <span>Generate Custom Report</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {REPORT_TEMPLATES.map((rpt) => (
            <div key={rpt.id} className="p-4 hover:bg-slate-50/60 transition-colors flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{rpt.title}</h3>
                  <p className="text-[11px] text-slate-500">{rpt.type} · {rpt.period} · {rpt.format}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">{rpt.size}</span>
                <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1">
                  <Download className="w-3 h-3 text-slate-500" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ManagerShell>
  );
}
