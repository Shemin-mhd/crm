'use client';

import React, { useState, useMemo, Suspense } from 'react';
import {
  Radio,
  Plus,
  Search,
  Download,
  Share2,
  Edit,
  Edit2,
  Trash2,
  Info,
  Settings,
  ChevronDown,
  Check,
  X,
  ExternalLink,
  Layers,
  Globe,
  Sliders,
  Book,
  BookOpen,
} from 'lucide-react';
import { useEnterpriseCrm } from '@/context/EnterpriseCrmContext';
import { BackButton } from '@/components/ui/BackButton';
import { Modal } from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CrmCampaign } from '@/types/enterprise-crm';
import { cn } from '@/lib/utils';

function CampaignContent() {
  const { campaigns, addCampaign, updateCampaign, toggleCampaignListing, deleteCampaign, users } =
    useEnterpriseCrm();

  // Filters State
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modals & Action Menus
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFbImportModalOpen, setIsFbImportModalOpen] = useState(false);
  const [isFbIntegrateModalOpen, setIsFbIntegrateModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<CrmCampaign | null>(null);
  const [viewingCampaign, setViewingCampaign] = useState<CrmCampaign | null>(null);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);

  // Add Campaign Form State
  const [formData, setFormData] = useState({
    name: '',
    type: 'Inbound Portal',
    channel: 'Website Inbound',
    budget: 10000,
    leadsGenerated: 0,
    conversionRate: '0%',
    status: 'Active' as const,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    listing: true,
    owner: {
      name: 'Mohammed Rashid',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
  });

  // Filtered campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((cmp) => {
      if (statusFilter !== 'All' && cmp.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const match =
          cmp.name.toLowerCase().includes(q) ||
          (cmp.type && cmp.type.toLowerCase().includes(q)) ||
          (cmp.owner && cmp.owner.name.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [campaigns, statusFilter, search]);

  // Pagination
  const totalEntries = filteredCampaigns.length;
  const totalPages = Math.ceil(totalEntries / pageSize) || 1;
  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    addCampaign(formData);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      type: 'Inbound Portal',
      channel: 'Website Inbound',
      budget: 10000,
      leadsGenerated: 0,
      conversionRate: '0%',
      status: 'Active',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      listing: true,
      owner: {
        name: 'Mohammed Rashid',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      },
    });
  };

  const handleUpdateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCampaign) return;
    updateCampaign(editingCampaign.id, editingCampaign);
    setEditingCampaign(null);
  };

  return (
    <div className="space-y-3 pb-16 w-full">
      {/* ── Top Status Filter Box ─────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 sm:p-4 shadow-xs">
        <div className="space-y-1.5 w-full sm:w-80">
          <label className="text-xs font-bold text-slate-800">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-50/70 border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Completed">Completed</option>
            <option value="Paused">Paused</option>
          </select>
        </div>
      </div>

      {/* ── Main Campaign Table Container ────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        {/* Header Strip with Action Buttons */}
        <div className="bg-[#EAEFF5] border-b border-slate-200 px-4 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-slate-600" />
            <h2 className="text-xs font-bold text-slate-800 tracking-wide">Campaign</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Import Lead From Facebook */}
            <button
              type="button"
              onClick={() => setIsFbImportModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Import Lead From Facebook</span>
            </button>

            {/* Integrate With Facebook */}
            <button
              type="button"
              onClick={() => setIsFbIntegrateModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold transition-colors cursor-pointer shadow-xs"
            >
              <span className="font-extrabold text-sm leading-none font-serif">f</span>
              <span>Integrate With Facebook</span>
            </button>

            {/* + CAMPAIGN */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold transition-colors cursor-pointer shadow-xs"
            >
              <span className="font-extrabold text-sm leading-none">+</span>
              <span>CAMPAIGN</span>
            </button>
          </div>
        </div>

        {/* Table Controls (Show rows selector & Search box) */}
        <div className="px-4 py-2 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs bg-white">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <span>Show</span>
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
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
            />
          </div>
        </div>

        {/* ── Mobile View: Campaign Cards (Screens < md) ── */}
        <div className="block md:hidden space-y-3 p-3">
          {paginatedCampaigns.length === 0 ? (
            <div className="py-8 text-center text-slate-400 font-medium text-xs bg-white rounded border border-slate-200">
              No records found.
            </div>
          ) : (
            paginatedCampaigns.map((cmp, idx) => {
              const slNo = (currentPage - 1) * pageSize + idx + 1;
              const isListingOn = cmp.listing !== false;

              return (
                <div
                  key={cmp.id}
                  className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2.5 transition-all text-xs"
                >
                  {/* Top Row: SL No, Owner, Status, Actions */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                        #{slNo}
                      </span>
                      <div className="flex items-center gap-1.5 min-w-0">
                        {cmp.owner?.avatar ? (
                          <img
                            src={cmp.owner.avatar}
                            alt={cmp.owner.name}
                            className="w-5 h-5 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[9px] flex items-center justify-center shrink-0">
                            {cmp.owner?.name?.[0] || 'A'}
                          </div>
                        )}
                        <span className="font-semibold text-slate-800 text-xs truncate">
                          {cmp.owner?.name || 'Alex Rivera'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#22C55E] text-white">
                        <Edit2 className="w-2.5 h-2.5" />
                        <span>{cmp.status || 'Active'}</span>
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setActionMenuId(actionMenuId === cmp.id ? null : cmp.id)
                        }
                        className="flex items-center gap-1 px-2 py-1 rounded bg-[#006f8e] text-white text-[10px] font-medium cursor-pointer"
                      >
                        <Settings className="w-3 h-3" />
                        <ChevronDown className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>

                  {/* Campaign Name */}
                  <div>
                    <span
                      onClick={() => setViewingCampaign(cmp)}
                      className="text-xs font-bold text-[#0284C7] leading-snug cursor-pointer hover:underline block"
                    >
                      {cmp.name}
                    </span>
                  </div>

                  {/* Type & Channel Box */}
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">Type / Channel</span>
                    <span className="font-semibold text-slate-700">{cmp.type || 'Inbound Portal'}</span>
                  </div>

                  {/* Dates & Listing Toggle Row */}
                  <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-100 text-slate-600">
                    <div className="flex items-center gap-1 font-medium">
                      <span>📅</span>
                      <span>{cmp.startDate || '2025-01-01'} - {cmp.endDate || '2025-12-31'}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-500 font-medium">Listing</span>
                      <button
                        type="button"
                        onClick={() => toggleCampaignListing(cmp.id)}
                        className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200 ease-in-out ${
                          isListingOn ? 'bg-[#22C55E]' : 'bg-slate-300'
                        }`}
                        title={`Click to ${isListingOn ? 'Disable' : 'Enable'} Listing`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            isListingOn ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── Desktop View: Data Table (Screens >= md) ── */}
        <div className="hidden md:block overflow-x-auto min-h-[320px] w-full">
          <table className="w-full text-left text-xs border-collapse min-w-[760px]">
            <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-3 w-12 text-center">SL.No</th>
                <th className="py-2.5 px-3 w-20 text-center">Owner</th>
                <th className="py-2.5 px-4 min-w-[240px]">Campaign Name</th>
                <th className="py-2.5 px-3 min-w-[140px]">Type</th>
                <th className="py-2.5 px-3 w-24 text-center">Status</th>
                <th className="py-2.5 px-3 w-28 whitespace-nowrap">Start Date</th>
                <th className="py-2.5 px-3 w-28 whitespace-nowrap">End Date</th>
                <th className="py-2.5 px-3 w-20 text-center">Listing</th>
                <th className="py-2.5 px-3 w-20 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedCampaigns.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-medium">
                    No records found.
                  </td>
                </tr>
              ) : (
                paginatedCampaigns.map((cmp, idx) => {
                  const slNo = (currentPage - 1) * pageSize + idx + 1;
                  const isListingOn = cmp.listing !== false;

                  return (
                    <tr key={cmp.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* SL No */}
                      <td className="py-3 px-3 text-center font-semibold text-slate-600">{slNo}</td>

                      {/* Owner Avatar */}
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center">
                          {cmp.owner?.avatar ? (
                            <img
                              src={cmp.owner.avatar}
                              alt={cmp.owner.name}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-2xs"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shadow-2xs">
                              {cmp.owner?.name?.[0] || 'A'}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Campaign Name (Blue link) */}
                      <td className="py-3 px-4">
                        <span
                          onClick={() => setViewingCampaign(cmp)}
                          className="text-[#0284C7] hover:underline font-normal text-xs cursor-pointer"
                        >
                          {cmp.name}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="py-3 px-3 text-slate-600 font-medium">
                        {cmp.type || ''}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#22C55E] text-white shadow-2xs">
                          <Edit2 className="w-2.5 h-2.5" />
                          <span>{cmp.status || 'Active'}</span>
                        </span>
                      </td>

                      {/* Start Date */}
                      <td className="py-3 px-3 whitespace-nowrap text-slate-700 font-medium text-[11px]">
                        {cmp.startDate || ''}
                      </td>

                      {/* End Date */}
                      <td className="py-3 px-3 whitespace-nowrap text-slate-700 font-medium text-[11px]">
                        {cmp.endDate || ''}
                      </td>

                      {/* Listing Toggle Switch */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => toggleCampaignListing(cmp.id)}
                          className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out mx-auto ${isListingOn ? 'bg-[#22C55E]' : 'bg-slate-300'
                            }`}
                          title={`Click to ${isListingOn ? 'Disable' : 'Enable'} Listing`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${isListingOn ? 'translate-x-5' : 'translate-x-0'
                              }`}
                          />
                        </button>
                      </td>

                      {/* Actions: Gear Dropdown */}
                      <td className="py-3 px-3 text-center whitespace-nowrap relative">
                        <div className="flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() =>
                              setActionMenuId(actionMenuId === cmp.id ? null : cmp.id)
                            }
                            className="flex items-center gap-1 px-2.5 py-1 rounded-[3px] bg-[#006f8e] hover:bg-[#005f7a] text-white transition-colors cursor-pointer shadow-xs text-[11px] font-medium"
                            title="Actions"
                          >
                            <Settings className="w-3.5 h-3.5" />
                            <ChevronDown className="w-3 h-3" />
                          </button>

                          {/* Dropdown Menu matching exact screenshot */}
                          {actionMenuId === cmp.id && (
                            <>
                              <div
                                className="fixed inset-0 z-40"
                                onClick={() => setActionMenuId(null)}
                              />
                              <div className="absolute right-0 top-full mt-1.5 w-44 bg-white border border-slate-200 rounded-[4px] shadow-lg z-50 py-1 text-left text-[13px] text-[#212529]">
                                {/* 1. Open in new tab */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    window.open(`/marketing?campaign=${cmp.id}`, '_blank');
                                    setActionMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3.5 py-1.5 hover:bg-slate-100/70 transition-colors text-slate-800 cursor-pointer text-left font-normal"
                                >
                                  <Book className="w-4 h-4 text-slate-700 flex-shrink-0 stroke-[1.75]" />
                                  <span>Open in new tab</span>
                                </button>

                                {/* 2. View */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setViewingCampaign(cmp);
                                    setActionMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3.5 py-1.5 hover:bg-slate-100/70 transition-colors text-slate-800 cursor-pointer text-left font-normal"
                                >
                                  <Book className="w-4 h-4 text-slate-700 flex-shrink-0 stroke-[1.75]" />
                                  <span>View</span>
                                </button>

                                {/* 3. Edit */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingCampaign(cmp);
                                    setActionMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3.5 py-1.5 hover:bg-slate-100/70 transition-colors text-slate-800 cursor-pointer text-left font-normal"
                                >
                                  <Edit className="w-4 h-4 text-slate-700 flex-shrink-0 stroke-[1.75]" />
                                  <span>Edit</span>
                                </button>

                                {/* 4. Delete */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm(`Are you sure you want to delete campaign "${cmp.name}"?`)) {
                                      deleteCampaign(cmp.id);
                                    }
                                    setActionMenuId(null);
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
        <div className="px-4 py-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500">
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
                    ? 'bg-blue-600 text-white border-blue-600'
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

      {/* ── MODAL 1: Create Campaign ─────────────────────────────────── */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Create New Campaign"
          description="Register a marketing channel or digital campaign."
        >
          <form onSubmit={handleCreateCampaign} className="space-y-3 text-xs">
            <Input
              label="Campaign Name *"
              required
              placeholder="e.g. SIMPLE LIFE - 2025"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Campaign Type"
                placeholder="e.g. Inbound Portal / Directory Listing"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              />
              <Select
                label="Campaign Owner"
                value={formData.owner.name}
                options={users.map((u) => ({ label: u.name, value: u.name }))}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    owner: {
                      name: e.target.value,
                      avatar:
                        e.target.value === 'Mohammed Rashid'
                          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
                          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                    },
                  })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
              <Input
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="bg-[#22C55E] text-white">
                Save Campaign
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── MODAL 2: Edit Campaign ───────────────────────────────────── */}
      {editingCampaign && (
        <Modal
          isOpen={!!editingCampaign}
          onClose={() => setEditingCampaign(null)}
          title="Edit Campaign"
          description={`Update details for ${editingCampaign.name}`}
        >
          <form onSubmit={handleUpdateCampaign} className="space-y-3 text-xs">
            <Input
              label="Campaign Name *"
              required
              value={editingCampaign.name}
              onChange={(e) =>
                setEditingCampaign({ ...editingCampaign, name: e.target.value })
              }
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Campaign Type"
                value={editingCampaign.type || ''}
                onChange={(e) =>
                  setEditingCampaign({ ...editingCampaign, type: e.target.value })
                }
              />
              <Select
                label="Status"
                value={editingCampaign.status}
                options={[
                  { label: 'Active', value: 'Active' },
                  { label: 'Inactive', value: 'Inactive' },
                  { label: 'Completed', value: 'Completed' },
                  { label: 'Paused', value: 'Paused' },
                ]}
                onChange={(e: any) =>
                  setEditingCampaign({ ...editingCampaign, status: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Start Date"
                type="date"
                value={editingCampaign.startDate || ''}
                onChange={(e) =>
                  setEditingCampaign({ ...editingCampaign, startDate: e.target.value })
                }
              />
              <Input
                label="End Date"
                type="date"
                value={editingCampaign.endDate || ''}
                onChange={(e) =>
                  setEditingCampaign({ ...editingCampaign, endDate: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={() => setEditingCampaign(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="bg-blue-600 text-white">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── MODAL 3: Import Lead From Facebook ───────────────────────── */}
      {isFbImportModalOpen && (
        <Modal
          isOpen={isFbImportModalOpen}
          onClose={() => setIsFbImportModalOpen(false)}
          title="Import Leads From Facebook"
          description="Sync instant form leads directly from Meta Ads Manager."
        >
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-900 text-[11px] flex items-center gap-2">
              <svg className="w-4 h-4 text-[#1877F2] flex-shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Connected to Meta Business Suite: <strong>Cool Technologies Ads (ID: 8941920)</strong></span>
            </div>

            <Select
              label="Select Lead Form *"
              options={[
                { label: 'HVAC Chiller Replacement Lead Form 2025', value: 'form_1' },
                { label: 'Mitsubishi AC Units Instant Inquiry Form', value: 'form_2' },
                { label: 'Corporate Facility Maintenance Form Q3', value: 'form_3' },
              ]}
            />

            <Select
              label="Default Assignee for Inbound Leads"
              options={users.map((u) => ({ label: u.name, value: u.name }))}
            />

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsFbImportModalOpen(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                className="bg-[#22C55E] text-white"
                onClick={() => {
                  alert('Facebook leads successfully imported!');
                  setIsFbImportModalOpen(false);
                }}
              >
                Start Lead Import
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── MODAL 4: Integrate With Facebook ─────────────────────────── */}
      {isFbIntegrateModalOpen && (
        <Modal
          isOpen={isFbIntegrateModalOpen}
          onClose={() => setIsFbIntegrateModalOpen(false)}
          title="Integrate With Facebook Meta Graph API"
          description="Configure webhooks and API tokens for automated real-time lead ingestion."
        >
          <div className="space-y-3 text-xs">
            <Input
              label="Meta App ID"
              placeholder="e.g. 19283746501928"
              defaultValue="8941920391827"
            />
            <Input
              label="Page Access Token"
              type="password"
              placeholder="EAAK..."
              defaultValue="EAAK910283019283019283"
            />
            <Input
              label="Webhook Callback URL"
              defaultValue="https://api.cezconcrm.cloud/crm/webhooks/facebook"
              readOnly
            />

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsFbIntegrateModalOpen(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                className="bg-[#1877F2] text-white"
                onClick={() => {
                  alert('Facebook Meta integration verified and active!');
                  setIsFbIntegrateModalOpen(false);
                }}
              >
                Save Integration
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── MODAL 5: View Campaign Details ───────────────────────────── */}
      {viewingCampaign && (
        <Modal
          isOpen={!!viewingCampaign}
          onClose={() => setViewingCampaign(null)}
          title="Campaign Information"
          description={`Overview of ${viewingCampaign.name}`}
        >
          <div className="space-y-3.5 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Campaign Name:</span>
                <p className="text-slate-900 font-bold text-sm mt-0.5">{viewingCampaign.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Type:</span>
                  <p className="text-slate-800 font-medium mt-0.5">{viewingCampaign.type || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Owner:</span>
                  <p className="text-slate-800 font-bold mt-0.5">{viewingCampaign.owner?.name || 'N/A'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Status:</span>
                  <p className="text-emerald-600 font-bold mt-0.5">{viewingCampaign.status}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Listing:</span>
                  <p className="text-slate-800 font-medium mt-0.5">{viewingCampaign.listing !== false ? 'Enabled (ON)' : 'Disabled (OFF)'}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setViewingCampaign(null)}
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

export default function MarketingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Campaign...</div>}>
      <CampaignContent />
    </Suspense>
  );
}
