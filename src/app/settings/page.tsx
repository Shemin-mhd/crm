'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Wrench,
  Users,
  ShieldCheck,
  Lock,
  Database,
  Sliders,
  Tag,
  Plus,
  Save,
  CheckCircle,
  Trash2,
  Edit2,
  Key,
  Megaphone,
  ShoppingCart,
  CheckSquare,
  Briefcase,
  Target,
  DollarSign,
  Box,
  Download,
  Contact,
  BarChart3,
  Mail,
  Phone,
  Building,
  Calendar,
  CheckCircle2,
  Monitor,
  Smartphone,
  Check,
  Settings as SettingsIcon,
  Search,
  FileText,
  ChevronDown,
  ArrowUpDown,
  Layers,
  GripVertical,
  Share2,
  Factory,
  Languages,
  Printer,
  Flag,
  CreditCard,
  Shield,
  ThumbsUp,
  Receipt,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Clock,
  UserCheck,
  Globe,
  Info,
  X,
  Eye,
  EyeOff,
  User,
  Upload,
  Image as ImageIcon,
  BookOpen,
  Book,
} from 'lucide-react';

import { useEnterpriseCrm } from '@/context/EnterpriseCrmContext';
import { authMockService } from '@/services/authMockService';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BackButton } from '@/components/ui/BackButton';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Input, Select } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { UserRole } from '@/types/enterprise-crm';

export type CezconUserItem = {
  id: number;
  name: string;
  email: string;
  username: string;
  password?: string;
  profileType: string;
  isAdmin: boolean;
  hasTarget: boolean;
  salesPermission: string;
  projectPermission: string;
  status: string;
  avatarBg?: string;
  target?: number;
  achieved?: number;
  openAmount?: number;
  phone?: string;
  dob?: string;
  designation?: string;
  businessOpportunity?: string;
  salesVisitPermission?: boolean;
  store?: string;
  avatarImage?: string | null;
  signatureImage?: string | null;
  loginPermission?: string;
  isWorker?: boolean;
  workerCode?: string;
  grade?: string;
  hourlyRate?: string;
  joiningDate?: string;
};

// ── Cezcon CRM Users Data (Empty initial list for real user data entry) ─────────────
const CEZCON_USERS_DATA: CezconUserItem[] = [];

// ── Cezcon CRM Profiles Data (Admin, Manager, Worker & Operational Profiles) ──
const CEZCON_PROFILES_DATA = [
  { id: 1, name: 'Admin', date: '01-01-2026', sales: true, project: true },
  { id: 2, name: 'Manager', date: '01-01-2026', sales: true, project: true },
  { id: 3, name: 'Worker', date: '01-01-2026', sales: false, project: true },
  { id: 4, name: 'Sales Manager', date: '16-04-2026', sales: true, project: true },
  { id: 5, name: 'Operations Manager', date: '30-07-2025', sales: true, project: true },
  { id: 6, name: 'Finance Controller', date: '30-07-2025', sales: true, project: true },
  { id: 7, name: 'Sales Executive', date: '30-04-2026', sales: true, project: true },
  { id: 8, name: 'Digital Marketing', date: '24-04-2026', sales: true, project: true },
  { id: 9, name: 'Service Supervisor', date: '30-07-2025', sales: true, project: true },
  { id: 10, name: 'Technician', date: '30-07-2025', sales: true, project: true },
  { id: 11, name: 'IM / Logistics', date: '30-07-2025', sales: true, project: true },
];

// ── Cezcon CRM Opportunity Stages Data (Exact Reference) ───────────────────
const CEZCON_OPPORTUNITY_STAGES_DATA = [
  { id: 1, name: 'Enquiry', abbreviation: '', color: '#CA8A04', textColor: '#CA8A04' },
  { id: 2, name: 'Offer Sent', abbreviation: '', color: '#2563EB', textColor: '#2563EB' },
  { id: 3, name: 'On Review', abbreviation: '', color: '#0284C7', textColor: '#0284C7' },
  { id: 4, name: 'Under Approval', abbreviation: '', color: '#84CC16', textColor: '#84CC16' },
  { id: 5, name: 'Clarification', abbreviation: '', color: '#EA580C', textColor: '#EA580C' },
  { id: 6, name: 'On Hold', abbreviation: '', color: '#C2410C', textColor: '#C2410C' },
  { id: 7, name: 'No Response', abbreviation: '', color: '#DC2626', textColor: '#DC2626' },
  { id: 8, name: 'Negotiation', abbreviation: '', color: '#0F172A', textColor: '#0F172A' },
  { id: 9, name: 'Offer Confirmed', abbreviation: '', color: '#16A34A', textColor: '#16A34A' },
  { id: 10, name: 'Order Received', abbreviation: '', color: '#10B981', textColor: '#10B981' },
  { id: 11, name: 'Opportunity Lost', abbreviation: '', color: '#EF4444', textColor: '#EF4444' },
  { id: 12, name: 'Allocated To Supplier', abbreviation: '', color: '#8B5CF6', textColor: '#8B5CF6' },
  { id: 13, name: 'Allocated To Inhouse', abbreviation: '', color: '#6366F1', textColor: '#6366F1' },
  { id: 14, name: 'Completed', abbreviation: '', color: '#0D9488', textColor: '#0D9488' },
];

// ── Cezcon CRM Opportunity Lost Reasons Data (Exact Reference) ─────────────
const CEZCON_LOST_REASONS_DATA = [
  { id: 1, reason: 'Lost Competitor' },
  { id: 2, reason: 'On Hold' },
  { id: 3, reason: 'Gathering Quotations Only to Comparison' },
  { id: 4, reason: 'Delayed Delivery' },
  { id: 5, reason: 'Shortage of Availability' },
  { id: 6, reason: 'Due to High Prices' },
  { id: 7, reason: 'Due to Payment Terms' },
  { id: 8, reason: 'Interested, But lack of sufficient budget' },
];

// ── Cezcon CRM Source Data (Exact Reference) ───────────────────────────────
const CEZCON_SOURCES_DATA = [
  { id: 1, name: 'Inhouse' },
  { id: 2, name: 'Facebook' },
  { id: 3, name: 'Instagram' },
  { id: 4, name: 'ReachUAE' },
  { id: 5, name: 'ATN' },
  { id: 6, name: 'Yellow Pages' },
  { id: 7, name: 'Referral' },
  { id: 8, name: 'Outbound Sales' },
  { id: 9, name: 'Inbound Phone Calls' },
  { id: 10, name: 'Events / Shows' },
  { id: 11, name: 'Email Campaign' },
  { id: 12, name: 'Google Ads' },
  { id: 13, name: 'Partner Portal' },
  { id: 14, name: 'Website Contact Form' },
];

// ── Cezcon CRM Industry Data (Exact Reference) ─────────────────────────────
const CEZCON_INDUSTRIES_DATA = [
  { id: 1, name: 'Information Technology' },
  { id: 2, name: 'HVAC & Refrigeration' },
  { id: 3, name: 'Telecommunications' },
  { id: 4, name: 'Construction & Real Estate' },
  { id: 5, name: 'Manufacturing' },
  { id: 6, name: 'Oil & Gas' },
  { id: 7, name: 'Hospitality & Retail' },
  { id: 8, name: 'Healthcare & Medical' },
];

// ── Cezcon CRM Field Customisation Data (Exact Reference) ─────────────────
const CEZCON_FIELD_CUSTOMISATION_DATA: Record<string, { id: number; name: string; enabled: boolean; required: boolean }[]> = {
  lead: [
    { id: 1, name: 'Customer Name', enabled: true, required: false },
    { id: 2, name: 'Business Mobile', enabled: true, required: false },
    { id: 3, name: 'Personal Mobile', enabled: true, required: false },
    { id: 4, name: 'Email', enabled: true, required: false },
    { id: 5, name: 'Nationality', enabled: true, required: false },
    { id: 6, name: 'Tel', enabled: true, required: false },
    { id: 7, name: 'Website', enabled: true, required: false },
    { id: 8, name: 'Lead Tags', enabled: true, required: false },
  ],
  customer: [
    { id: 1, name: 'Customer Name', enabled: true, required: true },
    { id: 2, name: 'TRN / Tax Registration Number', enabled: true, required: false },
    { id: 3, name: 'Credit Limit', enabled: true, required: false },
    { id: 4, name: 'Payment Terms', enabled: true, required: false },
    { id: 5, name: 'Billing Address', enabled: true, required: false },
    { id: 6, name: 'Shipping Address', enabled: true, required: false },
    { id: 7, name: 'Industry Type', enabled: true, required: false },
    { id: 8, name: 'Account Manager', enabled: true, required: false },
  ],
  contact: [
    { id: 1, name: 'Contact Person Name', enabled: true, required: true },
    { id: 2, name: 'Designation', enabled: true, required: false },
    { id: 3, name: 'Direct Phone', enabled: true, required: false },
    { id: 4, name: 'Email Address', enabled: true, required: false },
    { id: 5, name: 'Mobile Number', enabled: true, required: false },
    { id: 6, name: 'Department', enabled: true, required: false },
  ],
  opportunity: [
    { id: 1, name: 'Opportunity Name', enabled: true, required: true },
    { id: 2, name: 'Estimated Deal Value', enabled: true, required: false },
    { id: 3, name: 'Closing Date', enabled: true, required: false },
    { id: 4, name: 'Pipeline Stage', enabled: true, required: true },
    { id: 5, name: 'Lead Source', enabled: true, required: false },
    { id: 6, name: 'Competitor Information', enabled: true, required: false },
  ],
  order: [
    { id: 1, name: 'Order Number', enabled: true, required: true },
    { id: 2, name: 'Customer PO Reference', enabled: true, required: false },
    { id: 3, name: 'Delivery Date', enabled: true, required: false },
    { id: 4, name: 'Payment Terms', enabled: true, required: false },
    { id: 5, name: 'Shipping Method', enabled: true, required: false },
  ],
  invoice: [
    { id: 1, name: 'Invoice Number', enabled: true, required: true },
    { id: 2, name: 'Due Date', enabled: true, required: true },
    { id: 3, name: 'Tax / VAT Amount', enabled: true, required: false },
    { id: 4, name: 'Discount Amount', enabled: true, required: false },
  ],
  quotation: [
    { id: 1, name: 'Quotation Reference', enabled: true, required: true },
    { id: 2, name: 'Validity Period', enabled: true, required: false },
    { id: 3, name: 'Terms & Conditions', enabled: true, required: false },
    { id: 4, name: 'Authorized Signatory', enabled: true, required: false },
  ],
};

// ── Cezcon CRM Print Document Matrix (Exact Reference) ────────────────────
const INITIAL_PRINT_MATRIX = [
  { id: 'quotation', label: 'Quotation :', icon: '📄', serialNo: false, orderNumber: false, orderName: false, itemCode: true, itemUnit: true, itemBrand: true, itemImage: false, itemQty: true, totalQty: false, price: false, bankDetails: false, sealSign: true, repeatHeader: true, termsHead: true, paymentSchedule: false },
  { id: 'opportunity', label: 'Opportunity/Order Form :', icon: '🔥', serialNo: false, orderNumber: true, orderName: false, itemCode: true, itemUnit: true, itemBrand: true, itemImage: false, itemQty: true, totalQty: false, price: true, bankDetails: true, sealSign: true, repeatHeader: false, termsHead: false, paymentSchedule: false },
  { id: 'invoice', label: 'Invoice :', icon: '📄', serialNo: false, orderNumber: true, orderName: false, itemCode: true, itemUnit: true, itemBrand: true, itemImage: false, itemQty: true, totalQty: true, price: false, bankDetails: false, sealSign: true, repeatHeader: false, termsHead: false, paymentSchedule: false },
  { id: 'proforma', label: 'Proforma Invoice :', icon: '📄', serialNo: false, orderNumber: true, orderName: false, itemCode: true, itemUnit: true, itemBrand: true, itemImage: false, itemQty: true, totalQty: true, price: false, bankDetails: true, sealSign: true, repeatHeader: true, termsHead: false, paymentSchedule: false },
  { id: 'receipt', label: 'Receipt :', icon: '📄', serialNo: false, orderNumber: false, orderName: false, itemCode: false, itemUnit: false, itemBrand: false, itemImage: false, itemQty: false, totalQty: false, price: false, bankDetails: false, sealSign: true, repeatHeader: false, termsHead: false, paymentSchedule: false },
  { id: 'delivery', label: 'Delivery Note :', icon: '📄', serialNo: false, orderNumber: true, orderName: false, itemCode: true, itemUnit: true, itemBrand: true, itemImage: false, itemQty: true, totalQty: true, price: false, bankDetails: false, sealSign: true, repeatHeader: false, termsHead: false, paymentSchedule: false },
  { id: 'po', label: 'Purchase Order :', icon: '🛒', serialNo: false, orderNumber: true, orderName: false, itemCode: true, itemUnit: true, itemBrand: true, itemImage: false, itemQty: true, totalQty: false, price: false, bankDetails: false, sealSign: true, repeatHeader: false, termsHead: false, paymentSchedule: false },
  { id: 'purchasePayment', label: 'Purchase Payment :', icon: '💳', serialNo: false, orderNumber: false, orderName: false, itemCode: false, itemUnit: false, itemBrand: false, itemImage: false, itemQty: false, totalQty: false, price: false, bankDetails: false, sealSign: true, repeatHeader: false, termsHead: false, paymentSchedule: false },
];

// ── Cezcon CRM Report Settings Data (Exact Reference) ──────────────────────
const CEZCON_REPORT_SETTINGS_DATA = [
  { id: 1, name: 'Services', description: 'Service master listing (Service type items) with unit, category and brand filters.' },
  { id: 2, name: 'Product', description: 'Product master listing (Product type items) with unit, category, store and brand filters.' },
  { id: 3, name: 'Customer Outstanding', description: 'Track receivables, payment aging, outstanding balance per customer.' },
  { id: 4, name: 'Supplier', description: 'Supplier ledger, vendor purchase volume, and procurement metrics.' },
  { id: 5, name: 'Opportunity Closed Lost', description: 'Comprehensive root cause breakdown of all closed lost opportunities.' },
  { id: 6, name: 'Opportunities', description: 'Pipeline deal tracking across all stages, win rates, and owners.' },
  { id: 7, name: 'Opportunity Closing', description: 'Forecast of opportunity closings by month, quarter, and executive.' },
  { id: 8, name: 'Salesman GP', description: 'Gross profit calculation per sales executive with commission breakdown.' },
  { id: 9, name: 'Quotation', description: 'Summary of all submitted proposals, approved quotes, and status.' },
  { id: 10, name: 'Task', description: 'Task execution efficiency, completed tasks, and pending follow-ups.' },
  { id: 11, name: 'Customers', description: 'Master customer database list with contact details and tier ratings.' },
  { id: 12, name: 'Leads', description: 'Inbound and outbound leads converted vs open with acquisition channel.' },
  { id: 13, name: 'Contacts', description: 'Individual stakeholder contacts directory grouped by company.' },
  { id: 14, name: 'Purchase Order Report', description: 'Detailed purchase orders issued, received quantities, and vendor pricing.' },
];

// ── Cezcon CRM Customer Credit Limit Data (Exact Reference) ────────────────
const CEZCON_CUSTOMER_CREDIT_DATA = [
  { id: 1, name: 'Total power solutions', owner: 'Jismon Jose', isCompany: false, lastOrder: 'No order till the date.', currentCredit: '0.00', creditDays: '', creditLimit: '' },
  { id: 2, name: 'FEDERAL ELECTRIC SMART ELECTRIFICATION & AUTOMATION', owner: 'Cool Tech', isCompany: true, lastOrder: 'No order till the date.', currentCredit: '0.00', creditDays: '', creditLimit: '' },
  { id: 3, name: 'SMART GROUP OF CAPANIES', owner: 'Alex Rivera', isCompany: false, lastOrder: 'No order till the date.', currentCredit: '0.00', creditDays: '', creditLimit: '' },
  { id: 4, name: 'REDECK POOLS L.L.C', owner: 'Mohammed Shereff', isCompany: false, lastOrder: 'No order till the date.', currentCredit: '0.00', creditDays: '', creditLimit: '' },
  { id: 5, name: 'TECHNOLOGY FLOW ENGINEERING SYSTEMS & SERVICES', owner: 'Cool Tech', isCompany: true, lastOrder: 'No order till the date.', currentCredit: '0.00', creditDays: '', creditLimit: '' },
  { id: 6, name: 'Danat Jebel Dhanna Resort & Dhafra Beach Hotel', owner: 'Alex Rivera', isCompany: false, lastOrder: 'No order till the date.', currentCredit: '0.00', creditDays: '', creditLimit: '' },
  { id: 7, name: 'GENFOCUS ELECTROMECHANICAL CONTRACTING LLC SPC', owner: 'Jismon Jose', isCompany: false, lastOrder: 'No order till the date.', currentCredit: '0.00', creditDays: '', creditLimit: '' },
  { id: 8, name: 'AL REEM ISLAND DEVELOPMENT', owner: 'Mohammed Shereff', isCompany: false, lastOrder: 'No order till the date.', currentCredit: '0.00', creditDays: '', creditLimit: '' },
  { id: 9, name: 'EMIRATES NATIONAL OIL COMPANY (ENOC)', owner: 'Alex Rivera', isCompany: false, lastOrder: 'No order till the date.', currentCredit: '0.00', creditDays: '', creditLimit: '' },
  { id: 10, name: 'GULF MEDICAL PROJECTS CO', owner: 'Jismon Jose', isCompany: false, lastOrder: 'No order till the date.', currentCredit: '0.00', creditDays: '', creditLimit: '' },
];

// ── Cezcon CRM Purchase Order Stages (Exact Reference) ──────────────────────
const CEZCON_PO_STAGES_DATA = [
  { id: 1, name: 'Pending', color: '#F59E0B' },
  { id: 2, name: 'Approved', color: '#16A34A' },
  { id: 3, name: 'Rejected', color: '#DC2626' },
];

const CEZCON_PO_APPROVERS_DATA = [
  { id: 1, level: 'Level 1', role: 'Procurement Manager', user: 'VISHNU BINOY', limit: 'AED 50,000', mandatory: true },
  { id: 2, level: 'Level 2', role: 'Finance Controller', user: 'VAISHAK', limit: 'AED 250,000', mandatory: true },
  { id: 3, level: 'Level 3', role: 'Managing Director', user: 'ADMIN USER', limit: 'Above AED 250,000', mandatory: true },
];

// ── Cezcon CRM Languages Data (Exact Reference) ────────────────────────────
const CEZCON_LANGUAGES_DATA = [
  { id: 1, name: 'English (US)', code: 'en-US', direction: 'LTR', status: 'Default' },
  { id: 2, name: 'Arabic (العربية)', code: 'ar-AE', direction: 'RTL', status: 'Active' },
  { id: 3, name: 'French (Français)', code: 'fr-FR', direction: 'LTR', status: 'Active' },
  { id: 4, name: 'German (Deutsch)', code: 'de-DE', direction: 'LTR', status: 'Active' },
  { id: 5, name: 'Hindi (हिन्दी)', code: 'hi-IN', direction: 'LTR', status: 'Active' },
];

// ── Cezcon CRM Country / Region Data (Exact Reference) ─────────────────────
const CEZCON_REGIONS_DATA = [
  { id: 1, name: 'United Arab Emirates', currency: 'AED (د.إ)', code: 'ARE / +971', taxRate: '5%', status: 'Active' },
  { id: 2, name: 'Saudi Arabia', currency: 'SAR (﷼)', code: 'SAU / +966', taxRate: '15%', status: 'Active' },
  { id: 3, name: 'Qatar', currency: 'QAR (﷼)', code: 'QAT / +974', taxRate: '0%', status: 'Active' },
  { id: 4, name: 'Oman', currency: 'OMR (﷼)', code: 'OMN / +968', taxRate: '5%', status: 'Active' },
  { id: 5, name: 'Kuwait', currency: 'KWD (د.ك)', code: 'KWT / +965', taxRate: '0%', status: 'Active' },
  { id: 6, name: 'Bahrain', currency: 'BHD (.د.ب)', code: 'BHR / +973', taxRate: '10%', status: 'Active' },
];

// ── Cezcon CRM Designation Data (Admin, Manager, Worker & Operational Staff) ───
const CEZCON_DESIGNATIONS_DATA = [
  { id: 1, name: 'Admin', department: 'Administration', count: 1 },
  { id: 2, name: 'Manager', department: 'Management & Operations', count: 2 },
  { id: 3, name: 'Worker', department: 'Field Services', count: 5 },
  { id: 4, name: 'Sales Manager', department: 'Sales & Business Dev', count: 3 },
  { id: 5, name: 'Operations Manager', department: 'Operations & Logistics', count: 2 },
  { id: 6, name: 'Finance Controller', department: 'Finance & Accounts', count: 2 },
  { id: 7, name: 'HVAC Project Engineer', department: 'Engineering & Operations', count: 5 },
  { id: 8, name: 'Senior HVAC Technician', department: 'Technical Field Services', count: 8 },
  { id: 9, name: 'Operations Executive', department: 'Logistics & Warehouse', count: 4 },
  { id: 10, name: 'Digital Marketing Specialist', department: 'Marketing', count: 1 },
];

// ── Cezcon CRM Campaign Settings Data (Exact Reference) ───────────────────
const CEZCON_EXPENSE_TYPES_DATA = [
  { id: 1, name: 'Service Charge' },
  { id: 2, name: 'Designing' },
  { id: 3, name: 'Ad Boosting Cost' },
];

const CEZCON_CAMPAIGN_TYPES_DATA = [
  { id: 1, name: 'Email Marketing' },
  { id: 2, name: 'Social Media Ads' },
  { id: 3, name: 'Google PPC / Search' },
  { id: 4, name: 'Webinar / Virtual Event' },
  { id: 5, name: 'Telemarketing & Cold Calling' },
  { id: 6, name: 'Trade Show / Exhibition' },
  { id: 7, name: 'Print / Outdoor Media' },
];

const CEZCON_CAMPAIGN_STATUSES_DATA = [
  { id: 1, name: 'Planned', color: '#2563EB' },
  { id: 2, name: 'Active', color: '#16A34A' },
  { id: 3, name: 'On Hold', color: '#F59E0B' },
  { id: 4, name: 'Completed', color: '#0284C7' },
  { id: 5, name: 'Cancelled', color: '#DC2626' },
];

// ── Cezcon CRM Tags Data (Exact Reference) ─────────────────────────────────
const CEZCON_TAGS_DATA = [
  { id: 1, name: 'Maintenance' },
  { id: 2, name: 'Inspection' },
  { id: 3, name: 'UWSR' },
  { id: 4, name: 'Ice Maker' },
  { id: 5, name: 'Vaccum Cleaner' },
  { id: 6, name: 'Installation' },
  { id: 7, name: 'Chiller' },
  { id: 8, name: 'PCB Board' },
  { id: 9, name: 'Compressor' },
  { id: 10, name: 'Fan Motor' },
  { id: 11, name: 'Duct Cleaning' },
  { id: 12, name: 'Thermostat' },
  { id: 13, name: 'Condenser Unit' },
  { id: 14, name: 'Air Handling Unit' },
  { id: 15, name: 'Refrigerant Leak' },
  { id: 16, name: 'Filter Replacement' },
  { id: 17, name: 'Emergency Breakdown' },
  { id: 18, name: 'Annual Maintenance Contract' },
  { id: 19, name: 'Cold Storage' },
  { id: 20, name: 'Package AC Unit' },
  { id: 21, name: 'FCU Servicing' },
  { id: 22, name: 'Water Chiller Repair' },
  { id: 23, name: 'Cooling Tower' },
  { id: 24, name: 'BMS Integration' },
  { id: 25, name: 'Energy Audit' },
];

const CAMPAIGN_SETTINGS = [
  { id: 1, key: 'Max Campaigns Per Month', value: '10', type: 'number' },
  { id: 2, key: 'Default Campaign Owner', value: 'Alex Rivera', type: 'text' },
  { id: 3, key: 'Auto-Close Campaigns After (Days)', value: '90', type: 'number' },
  { id: 4, key: 'Default Channel', value: 'LinkedIn', type: 'text' },
];

const ORDER_STATUSES = [
  { id: 1, name: 'Draft', color: '#94A3B8' },
  { id: 2, name: 'Confirmed', color: '#2563EB' },
  { id: 3, name: 'Processing', color: '#F59E0B' },
  { id: 4, name: 'Shipped', color: '#7C3AED' },
  { id: 5, name: 'Delivered', color: '#10B981' },
  { id: 6, name: 'Cancelled', color: '#EF4444' },
];

const TASK_TYPES = [
  { id: 1, name: 'Call', icon: '📞', color: '#2563EB' },
  { id: 2, name: 'Meeting', icon: '🤝', color: '#7C3AED' },
  { id: 3, name: 'Demo', icon: '💻', color: '#10B981' },
  { id: 4, name: 'Email', icon: '✉️', color: '#F59E0B' },
  { id: 5, name: 'Follow-up', icon: '🔁', color: '#0EA5E9' },
  { id: 6, name: 'Review', icon: '📋', color: '#6366F1' },
  { id: 7, name: 'Document', icon: '📄', color: '#8B5CF6' },
];

const BUSINESS_TAGS = [
  { id: 1, name: 'VIP Client', color: '#F59E0B' },
  { id: 2, name: 'High Value', color: '#10B981' },
  { id: 3, name: 'Priority', color: '#EF4444' },
  { id: 4, name: 'Enterprise', color: '#2563EB' },
  { id: 5, name: 'Upsell', color: '#7C3AED' },
  { id: 6, name: 'At Risk', color: '#F97316' },
  { id: 7, name: 'Renewal Due', color: '#EC4899' },
  { id: 8, name: 'Partner', color: '#0EA5E9' },
];

const PRODUCTS_SETTINGS = [
  { id: 1, name: 'GPS Telematics Unit Pro', sku: 'CT-GPS-001', category: 'Tracking', basePrice: 450 },
  { id: 2, name: 'VoIP Edge PBX Appliance v4', sku: 'CT-VOIP-002', category: 'VoIP', basePrice: 1200 },
  { id: 3, name: 'Cisco 3850 Switch 48-Port', sku: 'CT-NET-003', category: 'Networking', basePrice: 2800 },
  { id: 4, name: 'IP CCTV Camera 4K', sku: 'CT-SEC-004', category: 'Security', basePrice: 380 },
  { id: 5, name: 'Biometric Access Controller', sku: 'CT-ACC-005', category: 'Access Control', basePrice: 650 },
];

const COST_JOB_TYPES = [
  { id: 1, name: 'Installation', costPerHour: 85, estimatedHours: 8 },
  { id: 2, name: 'Configuration', costPerHour: 95, estimatedHours: 4 },
  { id: 3, name: 'Site Survey', costPerHour: 70, estimatedHours: 3 },
  { id: 4, name: 'Training', costPerHour: 75, estimatedHours: 6 },
  { id: 5, name: 'Maintenance', costPerHour: 80, estimatedHours: 2 },
  { id: 6, name: 'Emergency Repair', costPerHour: 130, estimatedHours: 2 },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500 font-medium">Loading settings...</div>}>
      <SettingsContent />
    </Suspense>
  );
}

function SettingsContent() {
  const router = useRouter();
  const { users, rbacRules, currentRole, setCurrentRole, addUser } = useEnterpriseCrm();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const subParam = searchParams.get('sub');
  const userIdParam = searchParams.get('userId');

  const [activeTab, setActiveTab] = useState('users');
  const [activeSubTab, setActiveSubTab] = useState<string>('source');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isAddProfileModalOpen, setIsAddProfileModalOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  // Cezcon User Filters State
  const [userStatusFilter, setUserStatusFilter] = useState('Active');
  const [userProfileFilter, setUserProfileFilter] = useState('All');
  const [userRowsPerPage, setUserRowsPerPage] = useState(10);
  const [userSearch, setUserSearch] = useState('');

  // Cezcon Profiles Filter State
  const [profilesList, setProfilesList] = useState(CEZCON_PROFILES_DATA);
  const [profileRowsPerPage, setProfileRowsPerPage] = useState(10);
  const [profileSearch, setProfileSearch] = useState('');
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileSales, setNewProfileSales] = useState(true);
  const [newProfileProject, setNewProfileProject] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [profileDropdownSearch, setProfileDropdownSearch] = useState('');
  const profileDropdownRef = React.useRef<HTMLDivElement>(null);

  const loggedInUser = authMockService.getCurrentUser();
  const isManagerSession = loggedInUser?.role === 'manager';
  const isAdminSession = loggedInUser?.role === 'admin';
  const isSuperAdminSession = loggedInUser?.role === 'super_admin';

  const displayProfiles = React.useMemo(() => {
    // 1. Manager Access Policy: Can ONLY create/assign Worker, Technician, Operations Staff
    if (isManagerSession) {
      return [
        { id: 103, name: 'Worker', date: '01-01-2026', sales: false, project: true },
        { id: 104, name: 'Technician', date: '01-01-2026', sales: false, project: true },
        { id: 105, name: 'Service Supervisor', date: '01-01-2026', sales: true, project: true },
        { id: 106, name: 'Operations Executive', date: '01-01-2026', sales: true, project: true },
        { id: 107, name: 'IM / Logistics', date: '01-01-2026', sales: true, project: true },
      ];
    }

    // 2. Admin Access Policy: Can create Manager, Worker, and Staff, but NOT Admin or Super Admin
    if (isAdminSession) {
      return [
        { id: 102, name: 'Manager', date: '01-01-2026', sales: true, project: true },
        { id: 103, name: 'Worker', date: '01-01-2026', sales: false, project: true },
        { id: 104, name: 'Operations Manager', date: '01-01-2026', sales: true, project: true },
        { id: 105, name: 'Sales Manager', date: '16-04-2026', sales: true, project: true },
        { id: 106, name: 'Finance Controller', date: '30-07-2025', sales: true, project: true },
        { id: 107, name: 'Sales Executive', date: '30-04-2026', sales: true, project: true },
        { id: 108, name: 'Digital Marketing', date: '24-04-2026', sales: true, project: true },
        { id: 109, name: 'Service Supervisor', date: '30-07-2025', sales: true, project: true },
        { id: 110, name: 'Technician', date: '30-07-2025', sales: true, project: true },
        { id: 111, name: 'IM / Logistics', date: '30-07-2025', sales: true, project: true },
      ];
    }

    // 3. Super Admin: Platform wide access
    const required = [
      { id: 101, name: 'Admin', date: '01-01-2026', sales: true, project: true },
      { id: 102, name: 'Manager', date: '01-01-2026', sales: true, project: true },
      { id: 103, name: 'Worker', date: '01-01-2026', sales: false, project: true },
    ];
    const map = new Map<string, any>();
    required.forEach((r) => map.set(r.name.toLowerCase(), r));
    (profilesList || []).forEach((p: any) => {
      if (!map.has(p.name.toLowerCase())) {
        map.set(p.name.toLowerCase(), p);
      }
    });
    const all = Array.from(map.values());
    const priority = ['admin', 'manager', 'worker'];
    return all.sort((a: any, b: any) => {
      const aIdx = priority.indexOf(a.name.toLowerCase());
      const bIdx = priority.indexOf(b.name.toLowerCase());
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return 0;
    });
  }, [profilesList, isManagerSession, isAdminSession]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cezcon_crm_profiles_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure Admin, Manager, Worker exist in the list
          const required = ['Admin', 'Manager', 'Worker'];
          const existingNames = new Set(parsed.map((p: any) => p.name));
          const missing = CEZCON_PROFILES_DATA.filter((p) => !existingNames.has(p.name));
          const merged = [...CEZCON_PROFILES_DATA.filter((p) => required.includes(p.name)), ...parsed.filter((p: any) => !required.includes(p.name)), ...missing.filter((p) => !required.includes(p.name))];
          setProfilesList(merged);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }
    setProfilesList(CEZCON_PROFILES_DATA);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cezcon_crm_profiles_list', JSON.stringify(profilesList));
    } catch (e) {
      console.error(e);
    }
  }, [profilesList]);
  const [openActionUserId, setOpenActionUserId] = useState<number | null>(null);
  const [viewUserModalData, setViewUserModalData] = useState<CezconUserItem | null>(null);
  const [userToDelete, setUserToDelete] = useState<CezconUserItem | null>(null);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [assignWorkerUser, setAssignWorkerUser] = useState<CezconUserItem | null>(null);
  const [assignWorkerTab, setAssignWorkerTab] = useState<'NEW' | 'EXISTING'>('NEW');
  const [workerFormData, setWorkerFormData] = useState({
    workerCode: '',
    grade: 'Select',
    hourlyRate: '',
    joiningDate: '24-09-2026',
    existingWorker: '',
  });

  const handleAssignWorkerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignWorkerUser) return;

    const updated = cezconUsersList.map((usr) =>
      usr.id === assignWorkerUser.id
        ? {
            ...usr,
            profileType: 'Worker',
            isWorker: true,
            workerCode: assignWorkerTab === 'NEW' ? (workerFormData.workerCode || `WRK-${String(usr.id).slice(-4)}`) : (workerFormData.existingWorker || usr.workerCode),
            grade: assignWorkerTab === 'NEW' ? workerFormData.grade : usr.grade,
            hourlyRate: assignWorkerTab === 'NEW' ? workerFormData.hourlyRate : usr.hourlyRate,
            joiningDate: assignWorkerTab === 'NEW' ? workerFormData.joiningDate : usr.joiningDate,
          }
        : usr
    );

    setCezconUsersList(updated);
    try {
      localStorage.setItem('cezcon_crm_users_list', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setAssignWorkerUser(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Cezcon Opportunity Stages State
  const [stagesList, setStagesList] = useState(CEZCON_OPPORTUNITY_STAGES_DATA);
  const [isAddStageModalOpen, setIsAddStageModalOpen] = useState(false);
  const [stageRowsPerPage, setStageRowsPerPage] = useState(10);
  const [stageCurrentPage, setStageCurrentPage] = useState(1);
  const [stageSearch, setStageSearch] = useState('');
  const [newStageForm, setNewStageForm] = useState({
    name: '',
    abbreviation: '',
    color: '#2563EB',
  });

  // Cezcon Opportunity Lost Reasons State
  const [lostReasonsList, setLostReasonsList] = useState(CEZCON_LOST_REASONS_DATA);
  const [isAddLostReasonModalOpen, setIsAddLostReasonModalOpen] = useState(false);
  const [lostReasonRowsPerPage, setLostReasonRowsPerPage] = useState(10);
  const [lostReasonCurrentPage, setLostReasonCurrentPage] = useState(1);
  const [lostReasonSearch, setLostReasonSearch] = useState('');
  const [newLostReasonText, setNewLostReasonText] = useState('');

  // Cezcon Source State
  const [sourcesList, setSourcesList] = useState(CEZCON_SOURCES_DATA);
  const [isAddSourceModalOpen, setIsAddSourceModalOpen] = useState(false);
  const [sourceRowsPerPage, setSourceRowsPerPage] = useState(10);
  const [sourceCurrentPage, setSourceCurrentPage] = useState(1);
  const [sourceSearch, setSourceSearch] = useState('');
  const [newSourceName, setNewSourceName] = useState('');

  // Cezcon Industry State
  const [industriesList, setIndustriesList] = useState(CEZCON_INDUSTRIES_DATA);
  const [isAddIndustryModalOpen, setIsAddIndustryModalOpen] = useState(false);
  const [industryRowsPerPage, setIndustryRowsPerPage] = useState(10);
  const [industryCurrentPage, setIndustryCurrentPage] = useState(1);
  const [industrySearch, setIndustrySearch] = useState('');
  const [newIndustryName, setNewIndustryName] = useState('');

  // Cezcon Field Customisation State
  const [activeCustomModule, setActiveCustomModule] = useState<string>('lead');
  const [customFieldsData, setCustomFieldsData] = useState(CEZCON_FIELD_CUSTOMISATION_DATA);

  const toggleFieldEnable = (moduleKey: string, fieldId: number) => {
    setCustomFieldsData((prev) => ({
      ...prev,
      [moduleKey]: (prev[moduleKey] || []).map((f) =>
        f.id === fieldId ? { ...f, enabled: !f.enabled } : f
      ),
    }));
  };

  const toggleFieldRequired = (moduleKey: string, fieldId: number) => {
    setCustomFieldsData((prev) => ({
      ...prev,
      [moduleKey]: (prev[moduleKey] || []).map((f) =>
        f.id === fieldId ? { ...f, required: !f.required } : f
      ),
    }));
  };

  // Cezcon Print Settings State
  const [printSubTab, setPrintSubTab] = useState<'print' | 'terms'>('print');
  const [bankSubTab, setBankSubTab] = useState<'aed' | 'usd'>('aed');
  const [printMatrix, setPrintMatrix] = useState(INITIAL_PRINT_MATRIX);
  const [headerToggle, setHeaderToggle] = useState(false);
  const [footerToggle, setFooterToggle] = useState(false);
  const [printCompanyForm, setPrintCompanyForm] = useState({
    name: 'COOL TECHNOLOGIES',
    website: 'www.cooltechuae.com',
    tel: '+971 2 565 0123',
    mobile: '+971 55 946 0123',
    email: 'info@cooltechuae.com',
    address: 'Breej 5 Street, Plot 99, Sector M-42 Mussafah Industrial Area, Abu Dhabi, UAE',
    fax: '',
    trn: '100 004 337 000 003',
    voteOfThanks: '',
    bankName: 'EMIRATES NBD',
    bankBranch: 'DALAMA MALL',
    accountName: 'COOL TECHNOLOGIES',
    accountNumber: '101 454 0179 402',
    footerAdjustment: '20',
  });

  const togglePrintMatrix = (rowId: string, colKey: string) => {
    setPrintMatrix((prev) =>
      prev.map((row) => {
        if (row.id === rowId) {
          return { ...row, [colKey]: !(row as any)[colKey] };
        }
        return row;
      })
    );
  };

  // Cezcon Credit Limit State
  const [customerCreditList, setCustomerCreditList] = useState(CEZCON_CUSTOMER_CREDIT_DATA);
  const [creditSearch, setCreditSearch] = useState('');
  const [creditRowsPerPage, setCreditRowsPerPage] = useState(10);
  const [defaultCreditDays, setDefaultCreditDays] = useState('');
  const [defaultCreditLimit, setDefaultCreditLimit] = useState('');

  // Cezcon Purchase Order Settings State
  const [poApprovalEnabled, setPoApprovalEnabled] = useState(true);
  const [poSubTab, setPoSubTab] = useState<'stage' | 'approver'>('stage');
  const [poStagesList, setPoStagesList] = useState(CEZCON_PO_STAGES_DATA);
  const [isAddPoStageModalOpen, setIsAddPoStageModalOpen] = useState(false);
  const [newPoStageName, setNewPoStageName] = useState('');
  const [newPoStageColor, setNewPoStageColor] = useState('#2563EB');
  const [poApproversList, setPoApproversList] = useState(CEZCON_PO_APPROVERS_DATA);
  const [isAddApproverModalOpen, setIsAddApproverModalOpen] = useState(false);
  const [newApproverRole, setNewApproverRole] = useState('');
  const [newApproverUser, setNewApproverUser] = useState('');
  const [newApproverLimit, setNewApproverLimit] = useState('');

  // Languages State
  const [languagesList, setLanguagesList] = useState(CEZCON_LANGUAGES_DATA);
  const [languageSearch, setLanguageSearch] = useState('');
  const [isAddLanguageModalOpen, setIsAddLanguageModalOpen] = useState(false);
  const [newLanguageName, setNewLanguageName] = useState('');
  const [newLanguageCode, setNewLanguageCode] = useState('');

  // Country / Region State
  const [regionsList, setRegionsList] = useState(CEZCON_REGIONS_DATA);
  const [regionSearch, setRegionSearch] = useState('');
  const [isAddRegionModalOpen, setIsAddRegionModalOpen] = useState(false);
  const [newRegionName, setNewRegionName] = useState('');
  const [newRegionCurrency, setNewRegionCurrency] = useState('');

  // Designation State
  const [designationsList, setDesignationsList] = useState(CEZCON_DESIGNATIONS_DATA);
  const [designationSearch, setDesignationSearch] = useState('');
  const [isAddDesignationModalOpen, setIsAddDesignationModalOpen] = useState(false);
  const [newDesignationName, setNewDesignationName] = useState('');
  const [newDesignationDept, setNewDesignationDept] = useState('');

  const [designationsLoaded, setDesignationsLoaded] = useState(false);

  const displayDesignations = React.useMemo(() => {
    // 1. Manager Access Policy: Can ONLY assign Worker, Field Technicians, Operations Staff
    if (isManagerSession) {
      return [
        { id: 203, name: 'Worker', department: 'Field Services', count: 5 },
        { id: 204, name: 'HVAC Project Engineer', department: 'Engineering & Operations', count: 5 },
        { id: 205, name: 'Senior HVAC Technician', department: 'Technical Field Services', count: 8 },
        { id: 206, name: 'Operations Executive', department: 'Logistics & Warehouse', count: 4 },
        { id: 207, name: 'Service Supervisor', department: 'Field Services', count: 3 },
      ];
    }

    // 2. Admin Access Policy: Can assign Manager, Worker, and Staff, but NOT Admin or Super Admin
    if (isAdminSession) {
      return [
        { id: 202, name: 'Manager', department: 'Management & Operations', count: 2 },
        { id: 203, name: 'Worker', department: 'Field Services', count: 5 },
        { id: 204, name: 'Sales Manager', department: 'Sales & Business Dev', count: 3 },
        { id: 205, name: 'Operations Manager', department: 'Operations & Logistics', count: 2 },
        { id: 206, name: 'Finance Controller', department: 'Finance & Accounts', count: 2 },
        { id: 207, name: 'HVAC Project Engineer', department: 'Engineering & Operations', count: 5 },
        { id: 208, name: 'Senior HVAC Technician', department: 'Technical Field Services', count: 8 },
        { id: 209, name: 'Operations Executive', department: 'Logistics & Warehouse', count: 4 },
        { id: 210, name: 'Digital Marketing Specialist', department: 'Marketing', count: 1 },
      ];
    }

    // 3. Super Admin: Platform wide access
    const required = [
      { id: 201, name: 'Admin', department: 'Administration', count: 1 },
      { id: 202, name: 'Manager', department: 'Management & Operations', count: 2 },
      { id: 203, name: 'Worker', department: 'Field Services', count: 5 },
    ];
    const map = new Map<string, any>();
    required.forEach((r) => map.set(r.name.toLowerCase(), r));
    (designationsList || []).forEach((d: any) => {
      if (!map.has(d.name.toLowerCase())) {
        map.set(d.name.toLowerCase(), d);
      }
    });
    const all = Array.from(map.values());
    const priority = ['admin', 'manager', 'worker'];
    return all.sort((a: any, b: any) => {
      const aIdx = priority.indexOf(a.name.toLowerCase());
      const bIdx = priority.indexOf(b.name.toLowerCase());
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return 0;
    });
  }, [designationsList, isManagerSession, isAdminSession]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cezcon_crm_designations_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const required = ['Admin', 'Manager', 'Worker'];
          const existingNames = new Set(parsed.map((d: any) => d.name));
          const missing = CEZCON_DESIGNATIONS_DATA.filter((d) => !existingNames.has(d.name));
          const merged = [...CEZCON_DESIGNATIONS_DATA.filter((d) => required.includes(d.name)), ...parsed.filter((d: any) => !required.includes(d.name)), ...missing.filter((d) => !required.includes(d.name))];
          setDesignationsList(merged);
          setDesignationsLoaded(true);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }
    setDesignationsList(CEZCON_DESIGNATIONS_DATA);
    setDesignationsLoaded(true);
  }, []);

  useEffect(() => {
    if (!designationsLoaded) return;
    try {
      localStorage.setItem('cezcon_crm_designations_list', JSON.stringify(designationsList));
    } catch (e) {
      console.error(e);
    }
  }, [designationsList, designationsLoaded]);

  const movePoStage = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const updated = [...poStagesList];
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
      setPoStagesList(updated);
    } else if (direction === 'down' && index < poStagesList.length - 1) {
      const updated = [...poStagesList];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      setPoStagesList(updated);
    }
  };

  // Cezcon Users List State
  const [cezconUsersList, setCezconUsersList] = useState<CezconUserItem[]>([]);
  const [usersLoaded, setUsersLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cezcon_crm_users_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Purge legacy mock data
          const cleanUsers = parsed.filter(
            (u: CezconUserItem) => u.email !== 'ms@cooltechuae.com' && u.email !== 'arms@cooltechuae.com'
          );
          setCezconUsersList(cleanUsers);
          setUsersLoaded(true);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }
    setCezconUsersList([]);
    setUsersLoaded(true);
  }, []);

  useEffect(() => {
    if (!usersLoaded) return;
    try {
      localStorage.setItem('cezcon_crm_users_list', JSON.stringify(cezconUsersList));
    } catch (e) {
      console.error(e);
    }
  }, [cezconUsersList, usersLoaded]);

  const filteredCustomerCredit = customerCreditList.filter((c) =>
    c.name.toLowerCase().includes(creditSearch.toLowerCase()) ||
    c.owner.toLowerCase().includes(creditSearch.toLowerCase())
  );

  const filteredCezconUsers = cezconUsersList.filter((u) => {
    // 1. Manager Access Scope: Only view Workers, Technicians, Service Staff (Hide Admins, Super Admins, and peer Managers)
    if (isManagerSession) {
      const isPrivilegedOrAdmin =
        u.isAdmin ||
        u.profileType.toLowerCase().includes('admin') ||
        u.profileType.toLowerCase().includes('super') ||
        u.profileType.toLowerCase() === 'manager' ||
        u.profileType.toLowerCase() === 'operations manager' ||
        u.profileType.toLowerCase() === 'sales manager' ||
        u.profileType.toLowerCase() === 'finance controller';

      if (isPrivilegedOrAdmin) {
        return false;
      }
    }

    // 2. Admin Access Scope: Can view Admins, Managers, Supervisors, Workers, Staff (Hide Super Admin platform tier)
    if (isAdminSession) {
      const isSuper = u.profileType.toLowerCase().includes('super');
      if (isSuper) {
        return false;
      }
    }

    const matchesStatus = userStatusFilter === 'All' || u.status === userStatusFilter;
    const matchesProfile =
      userProfileFilter === 'All' ||
      (userProfileFilter === 'ADMIN USER' && u.isAdmin) ||
      u.profileType.toLowerCase() === userProfileFilter.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.username.toLowerCase().includes(userSearch.toLowerCase());

    return matchesStatus && matchesProfile && matchesSearch;
  });

  const filteredCezconProfiles = profilesList.filter((p) =>
    p.name.toLowerCase().includes(profileSearch.toLowerCase())
  );

  const filteredCezconStages = stagesList.filter((s) =>
    s.name.toLowerCase().includes(stageSearch.toLowerCase()) ||
    s.abbreviation.toLowerCase().includes(stageSearch.toLowerCase())
  );

  const totalStagePages = Math.max(1, Math.ceil(filteredCezconStages.length / stageRowsPerPage));
  const paginatedStages = filteredCezconStages.slice(
    (stageCurrentPage - 1) * stageRowsPerPage,
    stageCurrentPage * stageRowsPerPage
  );

  const filteredLostReasons = lostReasonsList.filter((lr) =>
    lr.reason.toLowerCase().includes(lostReasonSearch.toLowerCase())
  );

  const totalLostReasonPages = Math.max(1, Math.ceil(filteredLostReasons.length / lostReasonRowsPerPage));
  const paginatedLostReasons = filteredLostReasons.slice(
    (lostReasonCurrentPage - 1) * lostReasonRowsPerPage,
    lostReasonCurrentPage * lostReasonRowsPerPage
  );

  const filteredSources = sourcesList.filter((s) =>
    s.name.toLowerCase().includes(sourceSearch.toLowerCase())
  );
  const totalSourcePages = Math.max(1, Math.ceil(filteredSources.length / sourceRowsPerPage));
  const paginatedSources = filteredSources.slice(
    (sourceCurrentPage - 1) * sourceRowsPerPage,
    sourceCurrentPage * sourceRowsPerPage
  );

  const filteredIndustries = industriesList.filter((i) =>
    i.name.toLowerCase().includes(industrySearch.toLowerCase())
  );
  const totalIndustryPages = Math.max(1, Math.ceil(filteredIndustries.length / industryRowsPerPage));
  const paginatedIndustries = filteredIndustries.slice(
    (industryCurrentPage - 1) * industryRowsPerPage,
    industryCurrentPage * industryRowsPerPage
  );

  // Cezcon Campaign Settings State
  const [expenseTypesList, setExpenseTypesList] = useState(CEZCON_EXPENSE_TYPES_DATA);
  const [expenseSearch, setExpenseSearch] = useState('');
  const [expenseRowsPerPage, setExpenseRowsPerPage] = useState(10);
  const [expenseCurrentPage, setExpenseCurrentPage] = useState(1);
  const [isAddExpenseTypeModalOpen, setIsAddExpenseTypeModalOpen] = useState(false);
  const [newExpenseTypeName, setNewExpenseTypeName] = useState('');

  const [campaignTypesList, setCampaignTypesList] = useState(CEZCON_CAMPAIGN_TYPES_DATA);
  const [campaignTypeSearch, setCampaignTypeSearch] = useState('');
  const [campaignTypeRowsPerPage, setCampaignTypeRowsPerPage] = useState(10);
  const [campaignTypeCurrentPage, setCampaignTypeCurrentPage] = useState(1);
  const [isAddCampaignTypeModalOpen, setIsAddCampaignTypeModalOpen] = useState(false);
  const [newCampaignTypeName, setNewCampaignTypeName] = useState('');

  const [campaignStatusesList, setCampaignStatusesList] = useState(CEZCON_CAMPAIGN_STATUSES_DATA);
  const [campaignStatusSearch, setCampaignStatusSearch] = useState('');
  const [campaignStatusRowsPerPage, setCampaignStatusRowsPerPage] = useState(10);
  const [campaignStatusCurrentPage, setCampaignStatusCurrentPage] = useState(1);
  const [isAddCampaignStatusModalOpen, setIsAddCampaignStatusModalOpen] = useState(false);
  const [newCampaignStatusName, setNewCampaignStatusName] = useState('');
  const [newCampaignStatusColor, setNewCampaignStatusColor] = useState('#2563EB');

  const filteredExpenseTypes = expenseTypesList.filter((e) =>
    e.name.toLowerCase().includes(expenseSearch.toLowerCase())
  );
  const totalExpensePages = Math.max(1, Math.ceil(filteredExpenseTypes.length / expenseRowsPerPage));
  const paginatedExpenseTypes = filteredExpenseTypes.slice(
    (expenseCurrentPage - 1) * expenseRowsPerPage,
    expenseCurrentPage * expenseRowsPerPage
  );

  const filteredCampaignTypes = campaignTypesList.filter((c) =>
    c.name.toLowerCase().includes(campaignTypeSearch.toLowerCase())
  );
  const totalCampaignTypePages = Math.max(1, Math.ceil(filteredCampaignTypes.length / campaignTypeRowsPerPage));
  const paginatedCampaignTypes = filteredCampaignTypes.slice(
    (campaignTypeCurrentPage - 1) * campaignTypeRowsPerPage,
    campaignTypeCurrentPage * campaignTypeRowsPerPage
  );

  const filteredCampaignStatuses = campaignStatusesList.filter((s) =>
    s.name.toLowerCase().includes(campaignStatusSearch.toLowerCase())
  );
  const totalCampaignStatusPages = Math.max(1, Math.ceil(filteredCampaignStatuses.length / campaignStatusRowsPerPage));
  const paginatedCampaignStatuses = filteredCampaignStatuses.slice(
    (campaignStatusCurrentPage - 1) * campaignStatusRowsPerPage,
    campaignStatusCurrentPage * campaignStatusRowsPerPage
  );

  // Cezcon Tags State
  const [tagsList, setTagsList] = useState(CEZCON_TAGS_DATA);
  const [tagSearch, setTagSearch] = useState('');
  const [tagRowsPerPage, setTagRowsPerPage] = useState(10);
  const [tagCurrentPage, setTagCurrentPage] = useState(1);
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  const filteredTags = tagsList.filter((t) =>
    t.name.toLowerCase().includes(tagSearch.toLowerCase())
  );
  const totalTagPages = Math.max(1, Math.ceil(filteredTags.length / tagRowsPerPage));
  const paginatedTags = filteredTags.slice(
    (tagCurrentPage - 1) * tagRowsPerPage,
    tagCurrentPage * tagRowsPerPage
  );

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
    if (subParam) {
      setActiveSubTab(subParam);
    } else if (tabParam === 'campaign') {
      setActiveSubTab('type');
    }
    // Always ensure user table view is active when navigating tabs/routes
    setIsAddUserModalOpen(false);
  }, [tabParam, subParam]);

  useEffect(() => {
    const handleResetView = () => {
      setIsAddUserModalOpen(false);
    };
    window.addEventListener('crm-reset-settings-view', handleResetView);
    return () => window.removeEventListener('crm-reset-settings-view', handleResetView);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      const target = event.target as HTMLElement;
      if (!target.closest('[data-user-actions-menu]')) {
        setOpenActionUserId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cezcon Add User Form State
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    showPassword: false,
    mobileCountry: '+971',
    mobileNumber: '',
    dob: '',
    profile: '',
    businessOpportunity: 'None',
    businessOpportunityAll: true,
    designation: '',
    signatureImage: null as string | null,
    avatarImage: null as string | null,
    loginPermission: 'Web & Mobile' as 'Web Only' | 'Mobile Only' | 'Web & Mobile',
    salesVisitPermission: false,
    store: 'None',
    storeAll: false,
    isWorker: false,
    monthlyTargets: false,
  });

  // Calculate Password Strength for Add User Form
  const pwd = userFormData.password;
  const hasCase = /[a-z]/.test(pwd) && /[A-Z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);
  const hasLength = pwd.length >= 8;
  const pwdScore = [hasCase, hasNumber, hasSpecial, hasLength].filter(Boolean).length;

  const handleCezconAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userFormData.name.trim() || !userFormData.username.trim() || !userFormData.password.trim()) {
      return;
    }

    const fullUsername = `${userFormData.username.trim()}@cooltechuae.com`;
    const userEmail = userFormData.email.trim() || fullUsername;
    const profileName = userFormData.profile || 'Manager';
    const isAdminUser = profileName.toLowerCase().includes('admin');
    const isManager = profileName.toLowerCase().includes('manager') || (userFormData.designation && userFormData.designation.toLowerCase().includes('manager'));
    const isWorker = userFormData.isWorker || profileName.toLowerCase().includes('technician') || profileName.toLowerCase().includes('worker');

    const newUser: CezconUserItem = {
      id: Date.now(),
      name: userFormData.name.trim(),
      email: userEmail,
      username: fullUsername,
      password: userFormData.password.trim(),
      profileType: profileName,
      isAdmin: isAdminUser,
      hasTarget: userFormData.monthlyTargets,
      salesPermission: 'All',
      projectPermission: 'All',
      status: 'Active',
      avatarBg: isAdminUser ? 'bg-indigo-600' : isManager ? 'bg-blue-600' : 'bg-emerald-600',
      phone: userFormData.mobileNumber ? `${userFormData.mobileCountry} ${userFormData.mobileNumber}` : '+971 55 485 3829',
      dob: userFormData.dob || '20-05-1968',
      designation: userFormData.designation || (isAdminUser ? 'Admin' : isManager ? 'Manager' : 'Worker'),
      businessOpportunity: userFormData.businessOpportunity || 'All Works',
      salesVisitPermission: userFormData.salesVisitPermission ?? true,
      store: userFormData.store || 'All Stores',
      avatarImage: userFormData.avatarImage,
      signatureImage: userFormData.signatureImage,
      loginPermission: userFormData.loginPermission || 'Web & Mobile',
      isWorker,
    };

    const updated = [newUser, ...cezconUsersList];
    setCezconUsersList(updated);
    try {
      localStorage.setItem('cezcon_crm_users_list', JSON.stringify(updated));
      if (isAdminUser) {
        const storedAdmins = JSON.parse(localStorage.getItem('crm_admin_accounts_list') || '[]');
        const newAdminRecord = {
          id: `adm_${Date.now()}`,
          name: userFormData.name.trim(),
          email: userEmail,
          username: userFormData.username.trim(),
          password: userFormData.password.trim(),
          phone: userFormData.mobileNumber ? `${userFormData.mobileCountry} ${userFormData.mobileNumber}` : '+971 55 485 3829',
          role: 'Admin',
          organizationId: 'org_cool_tech_001',
          organizationName: 'Cool Technologies LLC',
          status: 'Active',
          designation: userFormData.designation || 'Admin',
          department: 'Administration',
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
        };
        localStorage.setItem('crm_admin_accounts_list', JSON.stringify([newAdminRecord, ...storedAdmins]));
      }
    } catch (e) {
      console.error(e);
    }
    addUser({
      name: userFormData.name.trim(),
      email: userEmail,
      role: (isAdminUser ? 'Admin' : isManager ? 'Manager' : isWorker ? 'Worker' : profileName) as any,
      phone: `${userFormData.mobileCountry} ${userFormData.mobileNumber}`,
      department: userFormData.designation || (isAdminUser ? 'Administration' : isManager ? 'Management' : 'Operations'),
      status: 'Active',
    });

    setIsAddUserModalOpen(false);
    setUserFormData({
      name: '',
      email: '',
      username: '',
      password: '',
      showPassword: false,
      mobileCountry: '+971',
      mobileNumber: '',
      dob: '',
      profile: '',
      businessOpportunity: 'None',
      businessOpportunityAll: true,
      designation: '',
      signatureImage: null,
      avatarImage: null,
      loginPermission: 'Web & Mobile',
      salesVisitPermission: false,
      store: 'None',
      storeAll: false,
      isWorker: false,
      monthlyTargets: false,
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Legacy Add User Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Admin' as UserRole,
    phone: '',
    department: 'Sales & Business Dev',
    status: 'Active' as 'Active' | 'Inactive',
  });


  const settingsTabs = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'profile', label: 'User Profile', icon: Contact },
    { id: 'user-target', label: 'User Target', icon: BarChart3 },
    { id: 'rbac', label: 'Roles & Permissions', icon: ShieldCheck },
    { id: 'opportunity-settings', label: 'Opportunity Stages', icon: Key },
    { id: 'opportunity-lost-reason', label: 'Opportunity Lost Reason', icon: Key },
    { id: 'initial', label: 'Initial Settings', icon: Sliders },
    { id: 'campaign', label: 'Campaign Settings', icon: Megaphone },
    { id: 'order', label: 'Order Settings', icon: ShoppingCart },
    { id: 'task', label: 'Task Settings', icon: CheckSquare },
    { id: 'opportunity', label: 'Business Opportunity', icon: Briefcase },
    { id: 'target', label: 'Company Target', icon: Target },
    { id: 'cost-job', label: 'Cost / Job Type', icon: DollarSign },
    { id: 'tags', label: 'Business Tags', icon: Tag },
    { id: 'products', label: 'Products', icon: Box },
    { id: 'system', label: 'System Settings', icon: Sliders },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'backup', label: 'Backup & Data', icon: Database },
  ];

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    addUser(formData);
    setIsAddUserModalOpen(false);
    setFormData({ name: '', email: '', role: 'Admin', phone: '', department: 'Sales & Business Dev', status: 'Active' });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const formatCurrency = (n: number) => `$${n.toLocaleString()}`;

  const activeViewUser = viewUserModalData || (userIdParam ? cezconUsersList.find((u) => String(u.id) === userIdParam) : null);

  const handleCloseUserDetails = () => {
    setViewUserModalData(null);
    if (userIdParam) {
      router.push('/settings?tab=users');
    }
  };

  return (
    <div className="space-y-4">
      {saveSuccess && (
        <div className="p-3 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> Changes saved successfully.
        </div>
      )}

      {/* ── Users Tab (Exact Cezcon CRM Reference Layout) ────────────────────── */}
      {activeTab === 'users' && (
        <div className="space-y-3">
          {activeViewUser ? (
            /* ── User Details View (Exact Cezcon Reference Screen - Fully Mobile Responsive) ── */
            <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
              {/* Header Banner: User Details + Red [X] close button */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#F1F5F9] border-b border-slate-200">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <User className="w-4 h-4 text-slate-700" />
                  <span>User Details</span>
                </div>
                <button
                  type="button"
                  onClick={handleCloseUserDetails}
                  className="w-5 h-5 bg-[#D9534F] hover:bg-[#C9302C] text-white flex items-center justify-center rounded text-xs font-bold transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

              {/* Sub-tabs: User (Active) | User Expense */}
              <div className="flex items-center border-b border-slate-200 bg-white px-2 overflow-x-auto">
                <button
                  type="button"
                  className="px-4 py-2 text-xs font-semibold flex items-center gap-1.5 border-t-2 border-red-500 bg-white text-slate-800 whitespace-nowrap cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-red-500" />
                  <span>User</span>
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-xs font-semibold flex items-center gap-1.5 border-t-2 border-transparent text-slate-500 hover:text-slate-700 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  <span>User Expense</span>
                </button>
              </div>

              {/* Inner Card Container */}
              <div className="p-3 sm:p-6 bg-slate-50/50">
                <div className="bg-white border border-slate-200 rounded-sm shadow-xs overflow-hidden">
                  {/* Inner Header */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200 font-bold text-xs text-slate-800">
                    <User className="w-4 h-4 text-slate-600" />
                    <span>User Details</span>
                  </div>

                  {/* Inner 2-Column Grid (Responsive: 1 col on mobile, 2 cols on desktop) */}
                  <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 text-xs text-slate-800">
                    {/* ── LEFT COLUMN ── */}
                    <div className="space-y-4">
                      {/* Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 items-center">
                        <span className="sm:col-span-4 text-slate-700 font-normal">Name</span>
                        <span className="sm:col-span-8 font-bold uppercase text-slate-900 tracking-wide break-words">
                          {activeViewUser.name}
                        </span>
                      </div>

                      {/* Username */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 items-center">
                        <span className="sm:col-span-4 text-slate-700 font-normal">Username</span>
                        <span className="sm:col-span-8 font-semibold text-slate-800 break-all">
                          {activeViewUser.username}
                        </span>
                      </div>

                      {/* Mobile Number */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 items-center">
                        <span className="sm:col-span-4 text-slate-700 font-normal flex items-center gap-1">
                          <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                          <span>Mobile Number</span>
                        </span>
                        <span className="sm:col-span-8 font-semibold text-slate-800">
                          {activeViewUser.phone || '+971554853829'}
                        </span>
                      </div>

                      {/* DOB */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 items-center">
                        <span className="sm:col-span-4 text-slate-700 font-normal">DOB</span>
                        <span className="sm:col-span-8 font-medium text-slate-800">
                          {activeViewUser.dob || '20-05-1968'}
                        </span>
                      </div>

                      {/* Status */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 items-center">
                        <span className="sm:col-span-4 text-slate-700 font-normal">Status</span>
                        <span className="sm:col-span-8 font-semibold text-[#16A34A]">
                          {activeViewUser.status || 'Active'}
                        </span>
                      </div>

                      {/* Sales Visit Add Permission */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 items-center pt-2">
                        <span className="sm:col-span-4 text-slate-700 font-normal">Sales Visit Add Permission</span>
                        <div className="sm:col-span-8">
                          <span className="inline-flex w-4 h-4 rounded-xs bg-[#10B981] items-center justify-center text-white text-[10px] font-bold">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        </div>
                      </div>

                      {/* Assigned Stores */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 items-center pt-2">
                        <span className="sm:col-span-4 text-slate-700 font-normal">Assigned Stores</span>
                        <span className="sm:col-span-8 font-semibold text-slate-800">
                          {activeViewUser.store || 'All Stores'}
                        </span>
                      </div>

                      {/* Login Permission */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 items-center">
                        <span className="sm:col-span-4 text-slate-700 font-normal">Login Permission</span>
                        <div className="sm:col-span-8 flex items-center gap-2">
                          <span className="p-1 rounded bg-blue-50 text-blue-600" title="Desktop Login">
                            <Monitor className="w-4 h-4" />
                          </span>
                          <span className="p-1 rounded bg-purple-50 text-purple-600" title="Mobile App Login">
                            <Smartphone className="w-4 h-4" />
                          </span>
                        </div>
                      </div>

                      {/* ESS Account */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 items-center pt-1">
                        <span className="sm:col-span-4 text-slate-700 font-normal">ESS Account</span>
                        <div className="sm:col-span-8">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                          >
                            <span>+ Assign</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* ── RIGHT COLUMN ── */}
                    <div className="space-y-4">
                      {/* Email ID */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 items-center">
                        <span className="sm:col-span-4 text-slate-700 font-normal">Email ID</span>
                        <span className="sm:col-span-8 font-bold text-slate-800 break-all">
                          {activeViewUser.email}
                        </span>
                      </div>

                      {/* Designation */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 items-center">
                        <span className="sm:col-span-4 text-slate-700 font-normal">Designation</span>
                        <span className="sm:col-span-8 font-bold text-slate-800 uppercase break-words">
                          {activeViewUser.designation || (activeViewUser.isAdmin ? 'COO' : activeViewUser.profileType)}
                        </span>
                      </div>

                      {/* Image */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 items-center">
                        <span className="sm:col-span-4 text-slate-700 font-normal">Image</span>
                        <div className="sm:col-span-8">
                          <div className={`w-12 h-12 rounded border border-slate-300 overflow-hidden flex items-center justify-center font-bold text-white text-sm ${activeViewUser.avatarBg || 'bg-blue-600'} shadow-xs`}>
                            {activeViewUser.avatarImage ? (
                              <img src={activeViewUser.avatarImage} alt={activeViewUser.name} className="w-full h-full object-cover" />
                            ) : (
                              activeViewUser.name.charAt(0).toUpperCase()
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Business Opportunity */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 items-center">
                        <span className="sm:col-span-4 text-slate-700 font-normal">Business Opportunity</span>
                        <span className="sm:col-span-8 font-semibold text-slate-800 break-words">
                          {activeViewUser.businessOpportunity || 'All Works'}
                        </span>
                      </div>

                      {/* User Seal & Signature */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 items-start pt-2">
                        <span className="sm:col-span-4 text-slate-700 font-normal pt-2">User Seal &amp; Signature</span>
                        <div className="sm:col-span-8">
                          <div className="w-36 h-20 border border-slate-200 bg-[#F8FAFC] rounded flex items-center justify-center p-2 overflow-hidden shadow-2xs">
                            {activeViewUser.signatureImage ? (
                              <img src={activeViewUser.signatureImage} alt="User Seal" className="max-h-full max-w-full object-contain" />
                            ) : (
                              <div className="w-28 h-14 border-2 border-[#0F3959] rounded-full flex flex-col items-center justify-center text-[9px] text-[#0F3959] font-bold leading-none uppercase text-center px-1">
                                <span className="text-[7px] text-[#0F3959]/70 mb-0.5">★ COOLTECH ★</span>
                                <span className="tracking-tighter font-extrabold text-[10px]">COOLTECH</span>
                                <span className="text-[7px] text-[#0F3959]/70 mt-0.5">UAE</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Two Factor Authentication */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 items-center pt-2">
                        <span className="sm:col-span-4 text-slate-700 font-normal">Two Factor Authentication</span>
                        <div className="sm:col-span-8">
                          <span className="inline-block px-3 py-0.5 rounded bg-[#EF4444] text-white text-[11px] font-bold shadow-xs">
                            Disabled
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Back Button */}
              <div className="flex items-center justify-end p-4 bg-white border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleCloseUserDetails}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  <span>⬅</span>
                  <span>Back</span>
                </button>
              </div>
            </div>
          ) : isAddUserModalOpen ? (
            /* ── Add User View (Exact Cezcon Screen) ── */
            <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
              {/* Header Banner: Add User + Red [X] close button */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#F1F5F9] border-b border-slate-200">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <User className="w-4 h-4 text-slate-700" />
                  <span>{isManagerSession ? 'Add Team Member / Worker' : isSuperAdminSession ? 'Add System User' : 'Add User'}</span>
                  {isManagerSession && (
                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Manager Access: Worker &amp; Department Staff Only
                    </span>
                  )}
                  {isAdminSession && (
                    <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Admin Access: Manager &amp; Staff
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="w-5 h-5 bg-[#D9534F] hover:bg-[#C9302C] text-white flex items-center justify-center rounded text-xs font-bold transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

              {/* Form Body - 2 Columns on desktop (lg:grid-cols-2), 1 column on mobile */}
              <form onSubmit={handleCezconAddUser} className="p-4 sm:p-6 space-y-5 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
                  {/* ── LEFT COLUMN ── */}
                  <div className="space-y-4">
                    {/* Name * */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                      <label className="sm:col-span-3 text-xs text-slate-700 font-normal">
                        Name <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className="sm:col-span-9">
                        <input
                          type="text"
                          required
                          value={userFormData.name}
                          onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                          placeholder=""
                          className="w-full bg-white border border-[#CBD5E1] rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email ID (i) */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                      <label className="sm:col-span-3 text-xs text-slate-700 font-normal flex items-center gap-1">
                        <span>Email ID</span>
                        <span title="User email address for notifications and login" className="inline-flex cursor-help">
                          <Info className="w-3.5 h-3.5 text-slate-700" />
                        </span>
                      </label>
                      <div className="sm:col-span-9">
                        <input
                          type="email"
                          value={userFormData.email}
                          onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                          placeholder=""
                          className="w-full bg-white border border-[#CBD5E1] rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Username * */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-start">
                      <label className="sm:col-span-3 text-xs text-slate-700 font-normal pt-1.5">
                        Username <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className="sm:col-span-9 space-y-1">
                        <div className="flex rounded shadow-xs">
                          <input
                            type="text"
                            required
                            placeholder="Allowed only (a-z, 0-9)"
                            value={userFormData.username}
                            onChange={(e) => setUserFormData({ ...userFormData, username: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '') })}
                            className="flex-1 min-w-0 bg-white border border-r-0 border-[#CBD5E1] rounded-l px-2.5 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          />
                          <span className="inline-flex items-center px-2.5 text-xs text-slate-600 bg-[#F1F5F9] border border-[#CBD5E1] rounded-r select-none whitespace-nowrap">
                            @cooltechuae.com
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600">
                          Allowed only (a-z, 0-9)
                        </p>
                      </div>
                    </div>

                    {/* Password * */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-start">
                      <label className="sm:col-span-3 text-xs text-slate-700 font-normal pt-1.5">
                        Password <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className="sm:col-span-9 space-y-2">
                        <div className="relative">
                          <input
                            type={userFormData.showPassword ? 'text' : 'password'}
                            required
                            value={userFormData.password}
                            onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                            className="w-full bg-white border border-[#CBD5E1] rounded px-2.5 py-1 pr-8 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setUserFormData({ ...userFormData, showPassword: !userFormData.showPassword })}
                            className="absolute inset-y-0 right-0 pr-2 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {userFormData.showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {/* Password Strength Checklist */}
                        <div className="space-y-1.5 pt-1">
                          <div className="text-[11px] text-slate-600 font-normal">Password Strength:</div>
                          <div className="space-y-1 text-[11px] text-slate-800">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-3 h-3 rounded-xs border border-slate-800 flex items-center justify-center text-[9px] font-bold ${hasCase ? 'bg-slate-900 text-white' : 'bg-white text-transparent'}`}>✓</span>
                              <span>1 lowercase &amp; 1 uppercase</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className={`w-3 h-3 rounded-xs border border-slate-800 flex items-center justify-center text-[9px] font-bold ${hasNumber ? 'bg-slate-900 text-white' : 'bg-white text-transparent'}`}>✓</span>
                              <span>1 number (0-9)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className={`w-3 h-3 rounded-xs border border-slate-800 flex items-center justify-center text-[9px] font-bold ${hasSpecial ? 'bg-slate-900 text-white' : 'bg-white text-transparent'}`}>✓</span>
                              <span>1 Special Character (!@#$%^&*).</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className={`w-3 h-3 rounded-xs border border-slate-800 flex items-center justify-center text-[9px] font-bold ${hasLength ? 'bg-slate-900 text-white' : 'bg-white text-transparent'}`}>✓</span>
                              <span>Atleast 8 Character</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Image (i) */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-start">
                      <label className="sm:col-span-3 text-xs text-slate-700 font-normal pt-1.5 flex items-center gap-1">
                        <span title="Upload user profile photo" className="inline-flex cursor-help">
                          <Info className="w-3.5 h-3.5 text-slate-700" />
                        </span>
                        <span>Image</span>
                      </label>
                      <div className="sm:col-span-9 flex items-center gap-3">
                        <div className="w-14 h-16 rounded border border-slate-300 bg-[#F8FAFC] flex items-center justify-center overflow-hidden">
                          {userFormData.avatarImage ? (
                            <img src={userFormData.avatarImage} alt="User Avatar" className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-slate-300">
                              <div className="w-9 h-9 rounded-full border border-slate-300 bg-slate-100/80 flex items-center justify-center text-slate-400 font-bold text-xs shadow-2xs">
                                ?
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#6C757D] hover:bg-[#5A6268] text-white text-xs font-medium cursor-pointer transition-colors shadow-xs">
                            <span>Choose Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setUserFormData({ ...userFormData, avatarImage: URL.createObjectURL(e.target.files[0]) });
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                      <label className="sm:col-span-3 text-xs text-slate-700 font-normal">
                        Mobile Number
                      </label>
                      <div className="sm:col-span-9 flex rounded shadow-xs">
                        <select
                          value={userFormData.mobileCountry}
                          onChange={(e) => setUserFormData({ ...userFormData, mobileCountry: e.target.value })}
                          className="bg-white border border-r-0 border-[#CBD5E1] rounded-l px-2 py-1 text-xs text-slate-700 focus:outline-none"
                        >
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+966">🇸🇦 +966</option>
                          <option value="+974">🇶🇦 +974</option>
                          <option value="+968">🇴🇲 +968</option>
                          <option value="+965">🇰🇼 +965</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                        </select>
                        <input
                          type="tel"
                          value={userFormData.mobileNumber}
                          onChange={(e) => setUserFormData({ ...userFormData, mobileNumber: e.target.value })}
                          placeholder=""
                          className="flex-1 min-w-0 bg-white border border-[#CBD5E1] rounded-r px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* DOB */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                      <label className="sm:col-span-3 text-xs text-slate-700 font-normal">
                        DOB
                      </label>
                      <div className="sm:col-span-9 relative">
                        <input
                          type="date"
                          value={userFormData.dob}
                          onChange={(e) => setUserFormData({ ...userFormData, dob: e.target.value })}
                          className="w-full bg-white border border-[#CBD5E1] rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── RIGHT COLUMN ── */}
                  <div className="space-y-4">
                    {/* Profile * (Exact Cezcon Searchable Select2 UI) */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                      <label className="sm:col-span-3 text-xs text-slate-700 font-normal">
                        Profile <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className="sm:col-span-9 relative" ref={profileDropdownRef}>
                        {/* Dropdown Trigger Box */}
                        <div
                          onClick={() => {
                            setIsProfileDropdownOpen((prev) => !prev);
                            setProfileDropdownSearch('');
                          }}
                          className={`w-full bg-white border ${isProfileDropdownOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-[#CBD5E1]'
                            } rounded px-2.5 py-1 text-xs text-slate-800 flex items-center justify-between cursor-pointer select-none transition-all shadow-2xs`}
                        >
                          <span className={userFormData.profile ? 'text-slate-800 font-medium' : 'text-slate-500'}>
                            {userFormData.profile || 'Select Profile'}
                          </span>
                          <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isProfileDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
                        </div>

                        {/* Searchable Dropdown Popover */}
                        {isProfileDropdownOpen && (
                          <div className="absolute left-0 top-full mt-1 w-full bg-white border border-[#CBD5E1] rounded-sm shadow-xl z-50 overflow-hidden animate-in fade-in duration-100">
                            {/* Inner Search Box */}
                            <div className="p-1.5 border-b border-slate-200 bg-[#F8FAFC]">
                              <div className="relative">
                                <input
                                  type="text"
                                  autoFocus
                                  placeholder=""
                                  value={profileDropdownSearch}
                                  onChange={(e) => setProfileDropdownSearch(e.target.value)}
                                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500 transition-all pr-6"
                                />
                                <Search className="w-3 h-3 text-slate-400 absolute right-2 top-2" />
                              </div>
                            </div>

                            {/* Options List */}
                            <div className="max-h-52 overflow-y-auto divide-y divide-slate-50 text-xs py-0.5">
                              <div
                                onClick={() => {
                                  setUserFormData({ ...userFormData, profile: '' });
                                  setIsProfileDropdownOpen(false);
                                }}
                                className={`px-3 py-1.5 cursor-pointer transition-colors ${!userFormData.profile ? 'bg-slate-200 font-semibold text-slate-800' : 'hover:bg-blue-600 hover:text-white text-slate-700'
                                  }`}
                              >
                                Select Profile
                              </div>
                              {displayProfiles
                                .filter((p) => p.name.toLowerCase().includes(profileDropdownSearch.toLowerCase()))
                                .map((p) => {
                                  const isSelected = userFormData.profile === p.name;
                                  return (
                                    <div
                                      key={p.id || p.name}
                                      onClick={() => {
                                        setUserFormData({ ...userFormData, profile: p.name });
                                        setIsProfileDropdownOpen(false);
                                      }}
                                      className={`px-3 py-1.5 cursor-pointer transition-colors ${
                                        isSelected
                                          ? 'bg-blue-600 text-white font-medium'
                                          : 'hover:bg-blue-600 hover:text-white text-slate-800'
                                      }`}
                                    >
                                      {p.name}
                                    </div>
                                  );
                                })}
                              {displayProfiles.filter((p) => p.name.toLowerCase().includes(profileDropdownSearch.toLowerCase())).length === 0 && (
                                <div className="px-3 py-2 text-center text-[11px] text-slate-400">
                                  No matching profiles
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Business Opportunity */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-start">
                      <div className="sm:col-span-3 text-xs text-slate-700 font-normal pt-1 space-y-0.5">
                        <div>Business Opportunity</div>
                        <label className="inline-flex items-center gap-1.5 text-xs text-slate-800 font-semibold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={userFormData.businessOpportunityAll}
                            onChange={(e) => setUserFormData({ ...userFormData, businessOpportunityAll: e.target.checked })}
                            className="w-3.5 h-3.5 rounded text-blue-600 accent-blue-600"
                          />
                          <span>All</span>
                        </label>
                      </div>
                      <div className="sm:col-span-9">
                        <select
                          value={userFormData.businessOpportunity}
                          onChange={(e) => setUserFormData({ ...userFormData, businessOpportunity: e.target.value })}
                          disabled={userFormData.businessOpportunityAll}
                          className="w-full bg-white border border-[#CBD5E1] rounded px-2.5 py-1 text-xs text-slate-800 disabled:bg-[#F8FAFC] disabled:text-slate-400 focus:outline-none focus:border-blue-500"
                        >
                          <option value="None">None selected</option>
                          <option value="HVAC Maintenance">HVAC Maintenance</option>
                          <option value="Commercial Chillers">Commercial Chillers</option>
                          <option value="Building Automation">Building Automation</option>
                        </select>
                      </div>
                    </div>

                    {/* Designation */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                      <div className="sm:col-span-3 text-xs text-slate-700 font-normal flex items-center gap-1">
                        <span>Designation</span>
                        <button
                          type="button"
                          onClick={() => setIsAddDesignationModalOpen(true)}
                          className="text-blue-600 hover:underline text-[11px] font-medium cursor-pointer"
                        >
                          + Add New
                        </button>
                      </div>
                      <div className="sm:col-span-9">
                        <select
                          value={userFormData.designation}
                          onChange={(e) => setUserFormData({ ...userFormData, designation: e.target.value })}
                          className="w-full bg-white border border-[#CBD5E1] rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="">Select</option>
                          {displayDesignations.map((d) => (
                            <option key={d.id || d.name} value={d.name}>
                              {d.name}
                            </option>
                          ))}
                          {userFormData.designation && !designationsList.some((d) => d.name === userFormData.designation) && (
                            <option value={userFormData.designation}>{userFormData.designation}</option>
                          )}
                        </select>
                      </div>
                    </div>

                    {/* Change Seal & Signature (i) */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-start">
                      <label className="sm:col-span-3 text-xs text-slate-700 font-normal pt-1.5 flex items-center gap-1">
                        <span title="Upload digital signature and seal stamp" className="inline-flex cursor-help">
                          <Info className="w-3.5 h-3.5 text-slate-700" />
                        </span>
                        <span>Change Seal &amp; Signature</span>
                      </label>
                      <div className="sm:col-span-9 flex items-center gap-3">
                        <div className="w-16 h-16 rounded border border-slate-300 bg-[#F8FAFC] flex items-center justify-center overflow-hidden">
                          {userFormData.signatureImage ? (
                            <img src={userFormData.signatureImage} alt="Signature" className="w-full h-full object-contain" />
                          ) : (
                            <FileText className="w-8 h-8 text-slate-400 stroke-[1.2]" />
                          )}
                        </div>
                        <div>
                          <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#6C757D] hover:bg-[#5A6268] text-white text-xs font-medium cursor-pointer transition-colors shadow-xs">
                            <span>Choose Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setUserFormData({ ...userFormData, signatureImage: URL.createObjectURL(e.target.files[0]) });
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Login Permission (i) */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                      <label className="sm:col-span-3 text-xs text-slate-700 font-normal flex items-center gap-1">
                        <span title="Restrict which clients this user can log into" className="inline-flex cursor-help">
                          <Info className="w-3.5 h-3.5 text-slate-700" />
                        </span>
                        <span>Login Permission</span>
                      </label>
                      <div className="sm:col-span-9 flex flex-wrap items-center gap-5 text-xs text-slate-700">
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="loginPermission"
                            value="Web Only"
                            checked={userFormData.loginPermission === 'Web Only'}
                            onChange={(e) => setUserFormData({ ...userFormData, loginPermission: e.target.value as 'Web Only' | 'Mobile Only' | 'Web & Mobile' })}
                            className="text-blue-600 accent-blue-600"
                          />
                          <span>Web Only</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="loginPermission"
                            value="Mobile Only"
                            checked={userFormData.loginPermission === 'Mobile Only'}
                            onChange={(e) => setUserFormData({ ...userFormData, loginPermission: e.target.value as 'Web Only' | 'Mobile Only' | 'Web & Mobile' })}
                            className="text-blue-600 accent-blue-600"
                          />
                          <span>Mobile Only</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="loginPermission"
                            value="Web & Mobile"
                            checked={userFormData.loginPermission === 'Web & Mobile'}
                            onChange={(e) => setUserFormData({ ...userFormData, loginPermission: e.target.value as 'Web Only' | 'Mobile Only' | 'Web & Mobile' })}
                            className="text-blue-600 accent-blue-600"
                          />
                          <span>Web &amp; Mobile</span>
                        </label>
                      </div>
                    </div>

                    {/* Sales Visit Add Permission */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                      <label className="sm:col-span-3 text-xs text-slate-700 font-normal">
                        Sales Visit Add Permission
                      </label>
                      <div className="sm:col-span-9">
                        <input
                          type="checkbox"
                          checked={userFormData.salesVisitPermission}
                          onChange={(e) => setUserFormData({ ...userFormData, salesVisitPermission: e.target.checked })}
                          className="w-3.5 h-3.5 rounded text-blue-600 accent-blue-600 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Store */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                      <div className="sm:col-span-3 text-xs text-slate-700 font-normal flex items-center gap-2">
                        <span>Store</span>
                        <label className="inline-flex items-center gap-1 text-xs text-slate-800 font-semibold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={userFormData.storeAll}
                            onChange={(e) => setUserFormData({ ...userFormData, storeAll: e.target.checked })}
                            className="w-3.5 h-3.5 rounded text-blue-600 accent-blue-600"
                          />
                          <span>All</span>
                        </label>
                      </div>
                      <div className="sm:col-span-9">
                        <select
                          value={userFormData.store}
                          onChange={(e) => setUserFormData({ ...userFormData, store: e.target.value })}
                          disabled={userFormData.storeAll}
                          className="w-full bg-white border border-[#CBD5E1] rounded px-2.5 py-1 text-xs text-slate-800 disabled:bg-[#F8FAFC] disabled:text-slate-400 focus:outline-none focus:border-blue-500"
                        >
                          <option value="None">None selected</option>
                          <option value="Dubai Main Warehouse">Dubai Main Warehouse</option>
                          <option value="Abu Dhabi Depot">Abu Dhabi Depot</option>
                          <option value="Sharjah Spare Parts">Sharjah Spare Parts</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Bottom Checkboxes (Worker & Targets) ── */}
                <div className="border-t border-slate-200 pt-4 space-y-3">
                  <label className="flex items-center gap-2.5 text-xs font-normal text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={userFormData.isWorker}
                      onChange={(e) => setUserFormData({ ...userFormData, isWorker: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 accent-blue-600"
                    />
                    <span>Is He/She is a worker?</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs font-normal text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={userFormData.monthlyTargets}
                      onChange={(e) => setUserFormData({ ...userFormData, monthlyTargets: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 accent-blue-600"
                    />
                    <span>Monthly Targets</span>
                  </label>
                </div>

                {/* ── Bottom Action Buttons ── */}
                <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                  <button
                    type="submit"
                    className="px-5 py-1.5 rounded bg-[#0F3959] hover:bg-[#0B2A4A] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddUserModalOpen(false)}
                    className="px-4 py-1.5 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>&larr;</span>
                    <span>Back</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* ── Users Table & Filter View ── */
            <>
              {/* Top Filter Bar */}
              <div className="flex flex-wrap items-center gap-6 p-3 bg-white border border-slate-200 rounded-md text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Status</span>
                  <select
                    value={userStatusFilter}
                    onChange={(e) => setUserStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 min-w-[140px]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="All">All</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Profile Type</span>
                  <select
                    value={userProfileFilter}
                    onChange={(e) => setUserProfileFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 min-w-[140px]"
                  >
                    <option value="All">All</option>
                    {isManagerSession ? (
                      <>
                        <option value="Worker">Worker</option>
                        <option value="Technician">Technician</option>
                        <option value="Service Supervisor">Service Supervisor</option>
                        <option value="Operations Executive">Operations Executive</option>
                        <option value="IM / Logistics">IM / Logistics</option>
                      </>
                    ) : isAdminSession ? (
                      <>
                        <option value="ADMIN USER">ADMIN USER</option>
                        <option value="Manager">Manager</option>
                        <option value="Operations Manager">Operations Manager</option>
                        <option value="Sales Manager">Sales Manager</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Worker">Worker</option>
                        <option value="Technician">Technician</option>
                        <option value="Sales">Sales</option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                      </>
                    ) : (
                      <>
                        <option value="ADMIN USER">ADMIN USER</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                        <option value="Worker">Worker</option>
                        <option value="Technician">Technician</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Users Card with Green Banner & Action */}
              <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
                {/* Header Banner: Active User + Green +USER Button */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                    <Users className="w-4 h-4 text-slate-600" />
                    <span>{isManagerSession ? 'Department Workers & Technicians' : isAdminSession ? 'Active Organization Users' : 'Active Users'}</span>
                    {isManagerSession && (
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        Manager Scope: Workers Only
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (isManagerSession) {
                        setUserFormData((prev) => ({
                          ...prev,
                          profile: 'Worker',
                          isWorker: true,
                          designation: 'Worker',
                        }));
                      }
                      setIsAddUserModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {isManagerSession ? '+ WORKER' : '+ USER'}
                  </button>
                </div>

                {/* Sub Header: Show Rows + Search */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2 border-b border-slate-200 text-xs bg-white">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600">Show</span>
                    <select
                      value={userRowsPerPage}
                      onChange={(e) => setUserRowsPerPage(Number(e.target.value))}
                      className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                    <span className="text-slate-600">Rows</span>
                  </div>

                  <div className="relative w-full sm:w-56">
                    <input
                      type="text"
                      placeholder="Search"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                {/* Native Mobile User Cards (Phone Viewports) */}
                <div className="block md:hidden p-3 space-y-3 bg-slate-50/50">
                  {filteredCezconUsers.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-500 bg-white border border-slate-200 rounded-lg p-4">
                      <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="font-semibold text-slate-700">No users found</p>
                      <p className="text-[11px] text-slate-400 mt-1">Click the &quot;+ USER&quot; button to add a new user.</p>
                    </div>
                  ) : (
                    filteredCezconUsers.slice(0, userRowsPerPage).map((u, idx) => (
                      <div key={u.id} className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2.5 text-xs">
                        <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white ${u.avatarBg || 'bg-blue-600'}`}>
                              {u.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-800 text-xs">{u.name}</div>
                              <div className="text-[10px] text-slate-500">{u.email}</div>
                            </div>
                          </div>
                          {u.isAdmin ? (
                            <span className="px-2 py-0.5 rounded bg-[#10B981] text-white text-[10px] font-bold">
                              ADMIN
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                              {u.profileType}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2 rounded border border-slate-100">
                          <div>
                            <span className="text-slate-500 block text-[10px]">Username</span>
                            <span className="font-medium text-slate-800 truncate block">{u.username}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Permissions</span>
                            <span className="font-medium text-slate-800">Sales: {u.salesPermission}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-1.5 text-blue-600 text-[11px]">
                            <span className="flex items-center gap-1"><Monitor className="w-3.5 h-3.5" /> Desktop</span>
                            <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5" /> Mobile</span>
                          </div>

                          <div className="relative inline-block text-left" data-user-actions-menu>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenActionUserId((prev) => (prev === u.id ? null : u.id));
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#00838F] hover:bg-[#006064] text-white text-[10px] font-bold shadow-xs transition-colors cursor-pointer"
                            >
                              <SettingsIcon className="w-3 h-3" />
                              <span>Actions</span>
                              <ChevronDown className={`w-2.5 h-2.5 transition-transform ${openActionUserId === u.id ? 'rotate-180' : ''}`} />
                            </button>

                            {openActionUserId === u.id && (
                              <div className="absolute right-0 bottom-full mb-1 w-44 bg-white border border-[#CBD5E1]/80 rounded-md shadow-lg z-50 py-1.5 px-1 animate-in fade-in duration-100 space-y-0.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenActionUserId(null);
                                    window.open(`/settings?tab=users&userId=${u.id}`, '_blank');
                                  }}
                                  className="w-full text-left px-3 py-1.5 flex items-center gap-2.5 rounded-sm hover:bg-slate-100/80 text-[13px] text-slate-800 transition-colors cursor-pointer"
                                >
                                  <Book className="w-4 h-4 text-slate-700 stroke-[1.75]" />
                                  <span>Open in new tab</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenActionUserId(null);
                                    setViewUserModalData(u);
                                  }}
                                  className="w-full text-left px-3 py-1.5 flex items-center gap-2.5 rounded-sm hover:bg-slate-100/80 text-[13px] text-slate-800 transition-colors cursor-pointer"
                                >
                                  <Book className="w-4 h-4 text-slate-700 stroke-[1.75]" />
                                  <span>View</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenActionUserId(null);
                                    setAssignWorkerUser(u);
                                    setAssignWorkerTab('NEW');
                                    setWorkerFormData({
                                      workerCode: u.workerCode || `WRK-${String(u.id).slice(-4)}`,
                                      grade: u.grade || 'Select',
                                      hourlyRate: u.hourlyRate || '',
                                      joiningDate: u.joiningDate || new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
                                      existingWorker: '',
                                    });
                                  }}
                                  className="w-full text-left px-3 py-1.5 flex items-center gap-2.5 rounded-sm hover:bg-slate-100/80 text-[13px] text-slate-800 transition-colors cursor-pointer"
                                >
                                  <Users className="w-4 h-4 text-slate-700 stroke-[1.75]" />
                                  <span>Make Worker</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenActionUserId(null);
                                    setUserToDelete(u);
                                    setIsDeleteUserModalOpen(true);
                                  }}
                                  className="w-full text-left px-3 py-1.5 flex items-center gap-2.5 rounded-sm hover:bg-rose-50 text-[13px] text-rose-600 transition-colors cursor-pointer border-t border-slate-100 mt-1 pt-1.5"
                                >
                                  <Trash2 className="w-4 h-4 text-rose-500 stroke-[1.75]" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Table (Desktop Viewports) */}
                <div className="hidden md:block overflow-x-auto pb-16 min-h-[260px]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                      <tr>
                        <th className="py-2.5 px-3 text-center w-12">SL.No</th>
                        <th className="py-2.5 px-4 min-w-[140px]">Name</th>
                        <th className="py-2.5 px-4 min-w-[160px]">Email ID</th>
                        <th className="py-2.5 px-4 min-w-[160px]">Username</th>
                        <th className="py-2.5 px-3 text-center min-w-[110px]">Profile Type</th>
                        <th className="py-2.5 px-3 text-center min-w-[100px]">Login Permission</th>
                        <th className="py-2.5 px-2 text-center w-16">Target ?</th>
                        <th className="py-2.5 px-3 text-center min-w-[90px]">Sales Permission</th>
                        <th className="py-2.5 px-3 text-center min-w-[90px]">Project Permission</th>
                        <th className="py-2.5 px-3 text-right min-w-[80px]">Target</th>
                        <th className="py-2.5 px-3 text-right min-w-[90px]">Achieved</th>
                        <th className="py-2.5 px-3 text-right min-w-[100px]">Open</th>
                        <th className="py-2.5 px-3 text-center w-16">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCezconUsers.length === 0 ? (
                        <tr>
                          <td colSpan={13} className="py-12 text-center text-xs text-slate-500 bg-white">
                            <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <p className="font-semibold text-slate-700">No users found</p>
                            <p className="text-[11px] text-slate-400 mt-1">Click the &quot;+ USER&quot; button above to create and add original user records.</p>
                          </td>
                        </tr>
                      ) : (
                        filteredCezconUsers.slice(0, userRowsPerPage).map((u, idx) => (
                          <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                            {/* SL.No */}
                            <td className="py-3 px-3 text-center font-bold text-slate-800">
                              {idx + 1}
                            </td>

                            {/* Name */}
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] text-white ${u.avatarBg || 'bg-blue-600'}`}>
                                  {u.name.charAt(0)}
                                </div>
                                <span className="font-bold text-slate-800 leading-tight">
                                  {u.name}
                                </span>
                              </div>
                            </td>

                            {/* Email ID */}
                            <td className="py-3 px-4 text-slate-700">
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                <span className="text-slate-800">{u.email}</span>
                              </div>
                            </td>

                            {/* Username */}
                            <td className="py-3 px-4 text-slate-600">
                              {u.username}
                            </td>

                            {/* Profile Type */}
                            <td className="py-3 px-3 text-center">
                              {u.isAdmin ? (
                                <span className="inline-block px-2 py-0.5 rounded bg-[#10B981] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                                  ADMIN USER
                                </span>
                              ) : (
                                <div className="inline-flex items-center gap-1.5">
                                  <span className="font-medium text-slate-800">{u.profileType}</span>
                                  <div className="flex items-center gap-0.5">
                                    <button className="p-0.5 rounded bg-slate-700 text-white hover:bg-slate-800" title="View Profile">
                                      <FileText className="w-2.5 h-2.5" />
                                    </button>
                                    <button className="p-0.5 rounded bg-blue-600 text-white hover:bg-blue-700" title="Edit Profile">
                                      <Edit2 className="w-2.5 h-2.5" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </td>

                            {/* Login Permission */}
                            <td className="py-3 px-3 text-center">
                              <div className="flex items-center justify-center gap-1.5 text-blue-600">
                                <span title="Desktop Login"><Monitor className="w-3.5 h-3.5" /></span>
                                <span title="Mobile App Login"><Smartphone className="w-3.5 h-3.5" /></span>
                              </div>
                            </td>

                            {/* Target ? */}
                            <td className="py-3 px-2 text-center">
                              <input
                                type="checkbox"
                                checked={u.hasTarget}
                                readOnly
                                className="w-3.5 h-3.5 rounded text-rose-500 accent-rose-500 cursor-default"
                              />
                            </td>

                            {/* Sales Permission */}
                            <td className="py-3 px-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                                <span className="font-semibold text-slate-800">{u.salesPermission}</span>
                              </div>
                            </td>

                            {/* Project Permission */}
                            <td className="py-3 px-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                                <span className="font-semibold text-slate-800">{u.projectPermission}</span>
                              </div>
                            </td>

                            {/* Target */}
                            <td className="py-3 px-3 text-right text-slate-700 font-medium">
                              {u.target !== undefined ? u.target.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}
                            </td>

                            {/* Achieved */}
                            <td className="py-3 px-3 text-right font-bold text-slate-900">
                              {u.achieved !== undefined ? u.achieved.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}
                            </td>

                            {/* Open */}
                            <td className="py-3 px-3 text-right font-bold text-slate-800">
                              {u.openAmount !== undefined ? u.openAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}
                            </td>

                            {/* Actions (Exact Cezcon Teal Button & Popup) */}
                            <td className="py-3 px-3 text-center relative overflow-visible" data-user-actions-menu>
                              <div className="relative inline-block text-left">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenActionUserId((prev) => (prev === u.id ? null : u.id));
                                  }}
                                  className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded bg-[#00838F] hover:bg-[#006064] text-white text-[10px] font-bold shadow-xs transition-colors cursor-pointer"
                                  title="Actions"
                                >
                                  <SettingsIcon className="w-3.5 h-3.5" />
                                  <ChevronDown className={`w-2.5 h-2.5 transition-transform ${openActionUserId === u.id ? 'rotate-180' : ''}`} />
                                </button>

                                {openActionUserId === u.id && (
                                  <>
                                    <div className="fixed inset-0 z-40" onClick={() => setOpenActionUserId(null)} />
                                    <div className={`absolute right-0 ${idx >= filteredCezconUsers.length - 2 && filteredCezconUsers.length > 2 ? 'bottom-full mb-1.5' : 'top-full mt-1.5'} w-44 bg-white border border-[#CBD5E1]/80 rounded-md shadow-xl z-50 py-1.5 px-1 animate-in fade-in duration-100 space-y-0.5`}>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setOpenActionUserId(null);
                                          window.open(`/settings?tab=users&userId=${u.id}`, '_blank');
                                        }}
                                        className="w-full text-left px-3 py-1.5 flex items-center gap-2.5 rounded-sm hover:bg-slate-100/80 text-[13px] text-slate-800 transition-colors cursor-pointer"
                                      >
                                        <Book className="w-4 h-4 text-slate-700 stroke-[1.75]" />
                                        <span>Open in new tab</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setOpenActionUserId(null);
                                          setViewUserModalData(u);
                                        }}
                                        className="w-full text-left px-3 py-1.5 flex items-center gap-2.5 rounded-sm hover:bg-slate-100/80 text-[13px] text-slate-800 transition-colors cursor-pointer"
                                      >
                                        <Book className="w-4 h-4 text-slate-700 stroke-[1.75]" />
                                        <span>View</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setOpenActionUserId(null);
                                          setAssignWorkerUser(u);
                                          setAssignWorkerTab('NEW');
                                          setWorkerFormData({
                                            workerCode: u.workerCode || `WRK-${String(u.id).slice(-4)}`,
                                            grade: u.grade || 'Select',
                                            hourlyRate: u.hourlyRate || '',
                                            joiningDate: u.joiningDate || new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
                                            existingWorker: '',
                                          });
                                        }}
                                        className="w-full text-left px-3 py-1.5 flex items-center gap-2.5 rounded-sm hover:bg-slate-100/80 text-[13px] text-slate-800 transition-colors cursor-pointer"
                                      >
                                        <Users className="w-4 h-4 text-slate-700 stroke-[1.75]" />
                                        <span>Make Worker</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setOpenActionUserId(null);
                                          setUserToDelete(u);
                                          setIsDeleteUserModalOpen(true);
                                        }}
                                        className="w-full text-left px-3 py-1.5 flex items-center gap-2.5 rounded-sm hover:bg-rose-50 text-[13px] text-rose-600 transition-colors cursor-pointer border-t border-slate-100 mt-1 pt-1.5"
                                      >
                                        <Trash2 className="w-4 h-4 text-rose-500 stroke-[1.75]" />
                                        <span>Delete</span>
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}


      {/* ── User Profile Tab (Exact Cezcon CRM Reference Layout) ────────────── */}
      {activeTab === 'profile' && (
        <div className="space-y-3">
          {/* Card Container */}
          <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
            {/* Header Banner: Profile + Green +PROFILE Button */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                <Contact className="w-4 h-4 text-slate-600" />
                <span>Profile</span>
              </div>
              <button
                type="button"
                onClick={() => setIsAddProfileModalOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                + PROFILE
              </button>
            </div>

            {/* Sub Header: Show Rows + Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2 border-b border-slate-200 text-xs bg-white">
              <div className="flex items-center gap-2">
                <span className="text-slate-600">Show</span>
                <select
                  value={profileRowsPerPage}
                  onChange={(e) => setProfileRowsPerPage(Number(e.target.value))}
                  className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-slate-600">Rows</span>
              </div>

              <div className="relative w-full sm:w-56">
                <input
                  type="text"
                  placeholder="Search"
                  value={profileSearch}
                  onChange={(e) => setProfileSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 text-center w-14">SL.No</th>
                    <th className="py-2.5 px-4 min-w-[200px]">Profile Name</th>
                    <th className="py-2.5 px-4 min-w-[130px]">Date</th>
                    <th className="py-2.5 px-3 text-center w-20">Sales</th>
                    <th className="py-2.5 px-3 text-center w-20">Project</th>
                    <th className="py-2.5 px-3 text-center w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCezconProfiles.slice(0, profileRowsPerPage).map((p, idx) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* SL.No */}
                      <td className="py-3 px-3 text-center font-bold text-slate-800">
                        {idx + 1}
                      </td>

                      {/* Profile Name (Blue link) */}
                      <td className="py-3 px-4 font-bold text-blue-600 hover:underline cursor-pointer">
                        {p.name}
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 text-slate-700 font-medium">
                        {p.date}
                      </td>

                      {/* Sales */}
                      <td className="py-3 px-3 text-center">
                        <Check className="w-4 h-4 text-emerald-600 font-bold inline-block" />
                      </td>

                      {/* Project */}
                      <td className="py-3 px-3 text-center">
                        <Check className="w-4 h-4 text-emerald-600 font-bold inline-block" />
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-[10px] font-bold shadow-xs transition-colors"
                          title="Actions"
                        >
                          <SettingsIcon className="w-3 h-3" />
                          <ChevronDown className="w-2.5 h-2.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer Pagination matching Image 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 text-xs bg-white text-slate-500">
              <div>
                Showing 1 to {Math.min(filteredCezconProfiles.length, profileRowsPerPage)} of {filteredCezconProfiles.length} entries
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50"
                  disabled
                >
                  «
                </button>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold"
                >
                  1
                </button>
                <button
                  type="button"
                  className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50"
                  disabled
                >
                  »
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ── User Target Tab ──────────────────────────────────────────────────── */}
      {activeTab === 'user-target' && (
        <Card className="border-slate-200 bg-white p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">User Performance & Revenue Targets</h3>
              <p className="text-xs text-slate-500">Track individual executive quotas and monthly target achievement.</p>
            </div>
            <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
              Set New User Target
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Sales Executive</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3">Target Deals</th>
                  <th className="py-3 px-3">Target Revenue</th>
                  <th className="py-3 px-3">Closed Revenue</th>
                  <th className="py-3 px-3">Achievement</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: 'Alex Rivera', role: 'Admin', deals: 20, targetRev: 180000, closedRev: 154000, pct: 85 },
                  { name: 'Sarah Jenkins', role: 'Operations Manager', deals: 15, targetRev: 120000, closedRev: 125000, pct: 104 },
                  { name: 'Jordan Hayes', role: 'Worker', deals: 12, targetRev: 90000, closedRev: 68000, pct: 75 },
                  { name: 'Elena Rostova', role: 'Worker', deals: 10, targetRev: 75000, closedRev: 82000, pct: 109 },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.name}</td>
                    <td className="py-3 px-3 text-slate-600">{row.role}</td>
                    <td className="py-3 px-3 font-semibold">{row.deals} Deals</td>
                    <td className="py-3 px-3 font-semibold text-slate-800">{formatCurrency(row.targetRev)}</td>
                    <td className="py-3 px-3 font-bold text-blue-600">{formatCurrency(row.closedRev)}</td>
                    <td className="py-3 px-3">
                      <div className="w-32">
                        <div className="flex justify-between text-[10px] font-bold mb-1">
                          <span>{row.pct}%</span>
                          <span className={row.pct >= 100 ? 'text-emerald-600' : 'text-blue-600'}>
                            {row.pct >= 100 ? 'Achieved' : 'On Track'}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${row.pct >= 100 ? 'bg-emerald-500' : 'bg-blue-600'}`}
                            style={{ width: `${Math.min(row.pct, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.pct >= 100 ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                        {row.pct >= 100 ? 'Exceeded' : 'In Progress'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}



      {/* ── RBAC Tab ─────────────────────────────────────────────────────────── */}
      {activeTab === 'rbac' && (
        <Card className="border-slate-200 bg-white p-5 space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Role-Based Access Control (RBAC) Matrix</h3>
            <p className="text-xs text-slate-500">
              Super Admin possesses root access to all privileges. Admins, Operations Managers, and Workers follow defined security scopes.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">CRM Module</th>
                  <th className="py-3 px-3 text-center">View</th>
                  <th className="py-3 px-3 text-center">Create</th>
                  <th className="py-3 px-3 text-center">Edit</th>
                  <th className="py-3 px-3 text-center">Delete</th>
                  <th className="py-3 px-3 text-center">Assign</th>
                  <th className="py-3 px-3 text-center">Approve</th>
                  <th className="py-3 px-3 text-center">Export</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rbacRules.map((rule) => (
                  <tr key={rule.module} className="hover:bg-slate-50/80">
                    <td className="py-3 px-4 font-bold text-slate-900">{rule.module}</td>
                    <td className="py-3 px-3 text-center"><input type="checkbox" defaultChecked={rule.view} className="rounded text-blue-600" /></td>
                    <td className="py-3 px-3 text-center"><input type="checkbox" defaultChecked={rule.create} className="rounded text-blue-600" /></td>
                    <td className="py-3 px-3 text-center"><input type="checkbox" defaultChecked={rule.edit} className="rounded text-blue-600" /></td>
                    <td className="py-3 px-3 text-center"><input type="checkbox" defaultChecked={rule.delete} className="rounded text-blue-600" /></td>
                    <td className="py-3 px-3 text-center"><input type="checkbox" defaultChecked={rule.assign} className="rounded text-blue-600" /></td>
                    <td className="py-3 px-3 text-center"><input type="checkbox" defaultChecked={rule.approve} className="rounded text-blue-600" /></td>
                    <td className="py-3 px-3 text-center"><input type="checkbox" defaultChecked={rule.export} className="rounded text-blue-600" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
            Save RBAC Matrix
          </Button>
        </Card>
      )}

      {/* ── Opportunity Settings (Exact Cezcon CRM Reference Layout) ───────── */}
      {activeTab === 'opportunity-settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left Main Section: Opportunity Stages Table (8 or 9 cols on large screen) */}
          <div className="lg:col-span-9 bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
            {/* Header Banner: Opportunity Stages + Green +OPPORTUNITY STAGE Button */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                <Layers className="w-4 h-4 text-slate-600" />
                <span>Opportunity Stages</span>
              </div>
              <button
                type="button"
                onClick={() => setIsAddStageModalOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                + OPPORTUNITY STAGE
              </button>
            </div>

            {/* Sub Header: Show Rows + Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2 border-b border-slate-200 text-xs bg-white">
              <div className="flex items-center gap-2">
                <span className="text-slate-600">Show</span>
                <select
                  value={stageRowsPerPage}
                  onChange={(e) => {
                    setStageRowsPerPage(Number(e.target.value));
                    setStageCurrentPage(1);
                  }}
                  className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-slate-600">Rows</span>
              </div>

              <div className="relative w-full sm:w-56">
                <input
                  type="text"
                  placeholder="Search"
                  value={stageSearch}
                  onChange={(e) => {
                    setStageSearch(e.target.value);
                    setStageCurrentPage(1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 text-center w-16">
                      <div className="inline-flex items-center gap-1 cursor-pointer select-none">
                        <span>SL.No</span>
                        <span className="text-[10px] text-blue-600">▲</span>
                      </div>
                    </th>
                    <th className="py-2.5 px-4 min-w-[150px]">
                      <div className="inline-flex items-center gap-1 cursor-pointer select-none">
                        <span>Stages</span>
                        <span className="text-[10px] text-slate-400">◆</span>
                      </div>
                    </th>
                    <th className="py-2.5 px-4 min-w-[120px]">
                      <div className="inline-flex items-center gap-1 cursor-pointer select-none">
                        <span>Abbreviation</span>
                        <span className="text-[10px] text-slate-400">◆</span>
                      </div>
                    </th>
                    <th className="py-2.5 px-4 min-w-[200px]">Color</th>
                    <th className="py-2.5 px-3 text-center w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedStages.map((stage, idx) => (
                    <tr key={stage.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* SL.No */}
                      <td className="py-3 px-3 text-center font-bold text-slate-800">
                        {(stageCurrentPage - 1) * stageRowsPerPage + idx + 1}
                      </td>

                      {/* Stages (Colored Name) */}
                      <td className="py-3 px-4 font-bold text-xs" style={{ color: stage.color }}>
                        {stage.name}
                      </td>

                      {/* Abbreviation */}
                      <td className="py-3 px-4 text-slate-500 font-medium">
                        {stage.abbreviation || ''}
                      </td>

                      {/* Color Bar */}
                      <td className="py-3 px-4">
                        <div
                          className="h-3.5 w-44 rounded-xs border border-black/20 shadow-2xs"
                          style={{ backgroundColor: stage.color }}
                        />
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-[10px] font-bold shadow-xs transition-colors"
                          title="Actions"
                        >
                          <SettingsIcon className="w-3 h-3" />
                          <ChevronDown className="w-2.5 h-2.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer Pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 text-xs bg-white text-slate-500">
              <div>
                Showing {(stageCurrentPage - 1) * stageRowsPerPage + 1} to{' '}
                {Math.min(stageCurrentPage * stageRowsPerPage, filteredCezconStages.length)} of{' '}
                {filteredCezconStages.length} entries
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setStageCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={stageCurrentPage === 1}
                  className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  «
                </button>
                {Array.from({ length: totalStagePages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setStageCurrentPage(pageNum)}
                    className={`px-2.5 py-1 rounded font-bold transition-colors ${stageCurrentPage === pageNum
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setStageCurrentPage((p) => Math.min(totalStagePages, p + 1))}
                  disabled={stageCurrentPage === totalStagePages}
                  className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  »
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Sort Stage (3 cols on large screen) */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
            {/* Header: Sort Stage */}
            <div className="px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200 flex items-center gap-2 font-bold text-xs text-slate-800">
              <ArrowUpDown className="w-4 h-4 text-slate-600" />
              <span>Sort Stage</span>
            </div>

            {/* Stage Items List */}
            <div className="p-3 space-y-2 bg-[#FAFBFD] max-h-[620px] overflow-y-auto">
              {stagesList.map((stg) => (
                <div
                  key={stg.id}
                  className="bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs rounded px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs flex items-center justify-between cursor-grab active:cursor-grabbing transition-all select-none group"
                >
                  <span>{stg.name}</span>
                  <GripVertical className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Opportunity Lost Reasons (Exact Cezcon CRM Reference Layout) ─────── */}
      {activeTab === 'opportunity-lost-reason' && (
        <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
          {/* Header Banner: Opportunity Lost Reasons + Green +LOST REASON Button */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200">
            <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
              <SettingsIcon className="w-4 h-4 text-slate-600" />
              <span>Opportunity Lost Reasons</span>
            </div>
            <button
              type="button"
              onClick={() => setIsAddLostReasonModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              + LOST REASON
            </button>
          </div>

          {/* Sub Header: Show Rows + Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2 border-b border-slate-200 text-xs bg-white">
            <div className="flex items-center gap-2">
              <span className="text-slate-600">Show</span>
              <select
                value={lostReasonRowsPerPage}
                onChange={(e) => {
                  setLostReasonRowsPerPage(Number(e.target.value));
                  setLostReasonCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-slate-600">Rows</span>
            </div>

            <div className="relative w-full sm:w-56">
              <input
                type="text"
                placeholder="Search"
                value={lostReasonSearch}
                onChange={(e) => {
                  setLostReasonSearch(e.target.value);
                  setLostReasonCurrentPage(1);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                <tr>
                  <th className="py-2.5 px-3 text-center w-16">SL.No</th>
                  <th className="py-2.5 px-4 min-w-[280px]">Reason</th>
                  <th className="py-2.5 px-3 text-center w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedLostReasons.map((lr, idx) => (
                  <tr key={lr.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* SL.No */}
                    <td className="py-3 px-3 text-center font-bold text-slate-800">
                      {(lostReasonCurrentPage - 1) * lostReasonRowsPerPage + idx + 1}
                    </td>

                    {/* Reason */}
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {lr.reason}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-center">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-[10px] font-bold shadow-xs transition-colors"
                        title="Actions"
                      >
                        <SettingsIcon className="w-3 h-3" />
                        <ChevronDown className="w-2.5 h-2.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 text-xs bg-white text-slate-500">
            <div>
              Showing {(lostReasonCurrentPage - 1) * lostReasonRowsPerPage + 1} to{' '}
              {Math.min(lostReasonCurrentPage * lostReasonRowsPerPage, filteredLostReasons.length)} of{' '}
              {filteredLostReasons.length} entries
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setLostReasonCurrentPage((p) => Math.max(1, p - 1))}
                disabled={lostReasonCurrentPage === 1}
                className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                «
              </button>
              {Array.from({ length: totalLostReasonPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setLostReasonCurrentPage(pageNum)}
                  className={`px-2.5 py-1 rounded font-bold transition-colors ${lostReasonCurrentPage === pageNum
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                >
                  {pageNum}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setLostReasonCurrentPage((p) => Math.min(totalLostReasonPages, p + 1))}
                disabled={lostReasonCurrentPage === totalLostReasonPages}
                className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                »
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Initial Settings ──────────────────────────────────────────────────── */}
      {activeTab === 'initial' && (
        <div className="space-y-3">
          {/* Sub Navigation Bar for Initial Settings */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/80 border border-slate-200 rounded-md overflow-x-auto no-scrollbar text-xs">
            {[
              { id: 'source', label: 'Source', icon: Share2 },
              { id: 'industry', label: 'Industry', icon: Factory },
              { id: 'language', label: 'Language', icon: Languages },
              { id: 'customisation', label: 'Field Customisation', icon: CheckCircle2 },
              { id: 'print', label: 'Print Settings', icon: Printer },
              { id: 'reports', label: 'Report Settings', icon: FileText },
              { id: 'region', label: 'Country / Region', icon: Flag },
              { id: 'credit', label: 'Credit Limit', icon: CreditCard },
              { id: 'po', label: 'Purchase Order', icon: ShoppingCart },
              { id: 'designation', label: 'Designation', icon: Contact },
              { id: 'defaults', label: 'Company Defaults', icon: Sliders },
            ].map((sub) => {
              const Icon = sub.icon;
              const isActive = activeSubTab === sub.id;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setActiveSubTab(sub.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded font-bold text-xs whitespace-nowrap transition-colors ${isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-white'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {sub.label}
                </button>
              );
            })}
          </div>

          {/* ── Source Catalog Sub-Tab (Exact Cezcon CRM Reference Layout) ─────── */}
          {activeSubTab === 'source' && (
            <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
              {/* Header Banner: Source + Green +SOURCE Button */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <Share2 className="w-4 h-4 text-slate-600" />
                  <span>Source</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddSourceModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  + SOURCE
                </button>
              </div>

              {/* Sub Header: Show Rows + Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2 border-b border-slate-200 text-xs bg-white">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">Show</span>
                  <select
                    value={sourceRowsPerPage}
                    onChange={(e) => {
                      setSourceRowsPerPage(Number(e.target.value));
                      setSourceCurrentPage(1);
                    }}
                    className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-slate-600">Rows</span>
                </div>

                <div className="relative w-full sm:w-56">
                  <input
                    type="text"
                    placeholder="Search"
                    value={sourceSearch}
                    onChange={(e) => {
                      setSourceSearch(e.target.value);
                      setSourceCurrentPage(1);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3 text-center w-16">SL.No</th>
                      <th className="py-2.5 px-4 min-w-[280px]">Source</th>
                      <th className="py-2.5 px-3 text-center w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedSources.map((src, idx) => (
                      <tr key={src.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* SL.No */}
                        <td className="py-3 px-3 text-center font-bold text-slate-800">
                          {(sourceCurrentPage - 1) * sourceRowsPerPage + idx + 1}
                        </td>

                        {/* Source Name */}
                        <td className="py-3 px-4 font-bold text-slate-800">
                          {src.name}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-3 text-center">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-[10px] font-bold shadow-xs transition-colors"
                            title="Actions"
                          >
                            <SettingsIcon className="w-3 h-3" />
                            <ChevronDown className="w-2.5 h-2.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Pagination */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 text-xs bg-white text-slate-500">
                <div>
                  Showing {(sourceCurrentPage - 1) * sourceRowsPerPage + 1} to{' '}
                  {Math.min(sourceCurrentPage * sourceRowsPerPage, filteredSources.length)} of{' '}
                  {filteredSources.length} entries
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setSourceCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={sourceCurrentPage === 1}
                    className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    «
                  </button>
                  {Array.from({ length: totalSourcePages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setSourceCurrentPage(pageNum)}
                      className={`px-2.5 py-1 rounded font-bold transition-colors ${sourceCurrentPage === pageNum
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSourceCurrentPage((p) => Math.min(totalSourcePages, p + 1))}
                    disabled={sourceCurrentPage === totalSourcePages}
                    className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    »
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Industry Catalog Sub-Tab ───────────────────────────────────────── */}
          {activeSubTab === 'industry' && (
            <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <Factory className="w-4 h-4 text-slate-600" />
                  <span>Industry</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddIndustryModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  + INDUSTRY
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2 border-b border-slate-200 text-xs bg-white">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">Show</span>
                  <select
                    value={industryRowsPerPage}
                    onChange={(e) => {
                      setIndustryRowsPerPage(Number(e.target.value));
                      setIndustryCurrentPage(1);
                    }}
                    className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                  </select>
                  <span className="text-slate-600">Rows</span>
                </div>
                <input
                  type="text"
                  placeholder="Search Industry"
                  value={industrySearch}
                  onChange={(e) => {
                    setIndustrySearch(e.target.value);
                    setIndustryCurrentPage(1);
                  }}
                  className="w-full sm:w-56 bg-slate-50 border border-slate-200 rounded px-3 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3 text-center w-16">SL.No</th>
                      <th className="py-2.5 px-4 min-w-[280px]">Industry</th>
                      <th className="py-2.5 px-3 text-center w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedIndustries.map((ind, idx) => (
                      <tr key={ind.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 text-center font-bold text-slate-800">
                          {(industryCurrentPage - 1) * industryRowsPerPage + idx + 1}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-800">{ind.name}</td>
                        <td className="py-3 px-3 text-center">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-[10px] font-bold shadow-xs transition-colors"
                          >
                            <SettingsIcon className="w-3 h-3" />
                            <ChevronDown className="w-2.5 h-2.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Field Customisation Sub-Tab (Exact Cezcon CRM Reference Layout) ── */}
          {activeSubTab === 'customisation' && (
            <div className="space-y-3">
              {/* Module Header Tabs (Lead, Customer, Contact, Opportunity, Order, Invoice, Quotation) */}
              <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto no-scrollbar text-xs bg-white p-1 rounded-t-md">
                {[
                  { id: 'lead', label: 'Lead', icon: Layers },
                  { id: 'customer', label: 'Customer', icon: Shield },
                  { id: 'contact', label: 'Contact', icon: Contact },
                  { id: 'opportunity', label: 'Opportunity', icon: Key },
                  { id: 'order', label: 'Order', icon: ThumbsUp },
                  { id: 'invoice', label: 'Invoice', icon: Receipt },
                  { id: 'quotation', label: 'Quotation', icon: FileText },
                ].map((mod) => {
                  const Icon = mod.icon;
                  const isActive = activeCustomModule === mod.id;
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => setActiveCustomModule(mod.id)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold transition-all border-b-2 ${isActive
                          ? 'border-b-blue-600 text-blue-600 bg-blue-50/50 rounded-t'
                          : 'border-b-transparent text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                        }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {mod.label}
                    </button>
                  );
                })}
              </div>

              {/* Fields Table Card */}
              <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
                {/* Header Banner */}
                <div className="px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200 flex items-center gap-2 font-bold text-xs text-slate-800">
                  <SettingsIcon className="w-4 h-4 text-slate-600" />
                  <span className="capitalize">{activeCustomModule} Fields Customisation</span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                      <tr>
                        <th className="py-2.5 px-3 text-center w-16">SL.No</th>
                        <th className="py-2.5 px-4 min-w-[280px]">Field Name</th>
                        <th className="py-2.5 px-4 text-center w-40">Enable \ Disable</th>
                        <th className="py-2.5 px-4 text-center w-40">Required</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(customFieldsData[activeCustomModule] || []).map((field, idx) => (
                        <tr key={field.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* SL.No */}
                          <td className="py-3 px-3 text-center font-bold text-slate-800">
                            {idx + 1}
                          </td>

                          {/* Field Name */}
                          <td className="py-3 px-4 font-bold text-slate-800">
                            {field.name}
                          </td>

                          {/* Enable / Disable Toggle Switch */}
                          <td className="py-3 px-4 text-center">
                            <div className="flex justify-center">
                              <button
                                type="button"
                                onClick={() => toggleFieldEnable(activeCustomModule, field.id)}
                                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${field.enabled ? 'bg-[#16A34A] justify-end' : 'bg-slate-300 justify-start'
                                  }`}
                                title={field.enabled ? 'Enabled (Click to Disable)' : 'Disabled (Click to Enable)'}
                              >
                                <span className="bg-white w-4 h-4 rounded-full shadow-md" />
                              </button>
                            </div>
                          </td>

                          {/* Required Toggle Switch */}
                          <td className="py-3 px-4 text-center">
                            <div className="flex justify-center">
                              <button
                                type="button"
                                onClick={() => toggleFieldRequired(activeCustomModule, field.id)}
                                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${field.required ? 'bg-[#16A34A] justify-end' : 'bg-slate-300 justify-start'
                                  }`}
                                title={field.required ? 'Required Field' : 'Optional Field'}
                              >
                                <span className="bg-white w-4 h-4 rounded-full shadow-md" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer with Update Button */}
                <div className="p-3 bg-[#FAFBFD] border-t border-slate-200 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setSaveSuccess(true);
                      setTimeout(() => setSaveSuccess(false), 3000);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 rotate-90" />
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Print Settings Sub-Tab (Exact Cezcon CRM Reference Layout) ──────── */}
          {activeSubTab === 'print' && (
            <div className="space-y-4">
              {/* Top Sub-Tabs for Print Settings */}
              <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto no-scrollbar text-xs bg-white p-1 rounded-t-md">
                <button
                  type="button"
                  onClick={() => setPrintSubTab('print')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold transition-all border-b-2 ${printSubTab === 'print'
                      ? 'border-b-blue-600 text-blue-600 bg-blue-50/50 rounded-t'
                      : 'border-b-transparent text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Settings
                </button>
                <button
                  type="button"
                  onClick={() => setPrintSubTab('terms')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold transition-all border-b-2 ${printSubTab === 'terms'
                      ? 'border-b-blue-600 text-blue-600 bg-blue-50/50 rounded-t'
                      : 'border-b-transparent text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Terms & Conditions
                </button>
              </div>

              {printSubTab === 'print' && (
                <div className="space-y-4">
                  {/* ── Section 1: Customer Details for Quotation, Order & Invoice Print ── */}
                  <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
                    <div className="px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200 flex items-center gap-2 font-bold text-xs text-slate-800">
                      <SettingsIcon className="w-4 h-4 text-slate-600" />
                      <span>Customer Details for Quotation, Order & Invoice Print</span>
                    </div>

                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 text-xs">
                      {/* Left Column */}
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className="w-32 font-medium text-slate-700 flex items-center gap-1">
                            <Contact className="w-3.5 h-3.5 text-blue-600" /> Customer Name <span className="text-emerald-600 font-bold">✔</span>
                          </label>
                          <input
                            type="text"
                            value={printCompanyForm.name}
                            onChange={(e) => setPrintCompanyForm({ ...printCompanyForm, name: e.target.value })}
                            className="flex-1 bg-white border border-emerald-500 rounded px-3 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className="w-32 font-medium text-slate-700 flex items-center gap-1">
                            <span className="text-blue-500 font-mono text-[11px]">🌐</span> Website
                          </label>
                          <input
                            type="text"
                            value={printCompanyForm.website}
                            onChange={(e) => setPrintCompanyForm({ ...printCompanyForm, website: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className="w-32 font-medium text-slate-700 flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-slate-500" /> Tel
                          </label>
                          <input
                            type="text"
                            value={printCompanyForm.tel}
                            onChange={(e) => setPrintCompanyForm({ ...printCompanyForm, tel: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className="w-32 font-medium text-slate-700 flex items-center gap-1">
                            <Smartphone className="w-3.5 h-3.5 text-amber-600" /> Mobile
                          </label>
                          <input
                            type="text"
                            value={printCompanyForm.mobile}
                            onChange={(e) => setPrintCompanyForm({ ...printCompanyForm, mobile: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className="w-32 font-medium text-slate-700 flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5 text-purple-600" /> Email
                          </label>
                          <input
                            type="email"
                            value={printCompanyForm.email}
                            onChange={(e) => setPrintCompanyForm({ ...printCompanyForm, email: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                          <label className="w-32 font-medium text-slate-700 flex items-center gap-1 pt-1.5">
                            <Flag className="w-3.5 h-3.5 text-rose-500" /> Address
                          </label>
                          <textarea
                            rows={3}
                            value={printCompanyForm.address}
                            onChange={(e) => setPrintCompanyForm({ ...printCompanyForm, address: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 resize-none"
                          />
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className="w-28 font-medium text-slate-700 flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5 text-slate-500" /> Fax
                          </label>
                          <input
                            type="text"
                            value={printCompanyForm.fax}
                            onChange={(e) => setPrintCompanyForm({ ...printCompanyForm, fax: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className="w-28 font-medium text-slate-700 flex items-center gap-1">
                            <span className="text-rose-500 font-bold">★</span> TRN
                          </label>
                          <input
                            type="text"
                            value={printCompanyForm.trn}
                            onChange={(e) => setPrintCompanyForm({ ...printCompanyForm, trn: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className="w-28 font-medium text-slate-700 flex items-center gap-1">
                            <Box className="w-3.5 h-3.5 text-emerald-600" /> Logo
                          </label>
                          <div className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-slate-200 shadow-2xs">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                                C
                              </div>
                              <div>
                                <span className="font-extrabold text-[12px] tracking-tight text-slate-800 block leading-none">COOL TECHNOLOGIES</span>
                                <span className="text-[8px] tracking-widest text-slate-500 uppercase block font-semibold">The Science of Cooling</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className="w-28 font-medium text-slate-700 flex items-center gap-1">
                            <Edit2 className="w-3.5 h-3.5 text-slate-500" /> Change Logo
                          </label>
                          <div className="flex-1 flex items-center gap-2">
                            <input
                              type="file"
                              className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border file:border-slate-300 file:text-xs file:font-semibold file:bg-slate-100 hover:file:bg-slate-200 cursor-pointer"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                          <label className="w-28 font-medium text-slate-700 flex items-center gap-1 pt-1.5">
                            <ThumbsUp className="w-3.5 h-3.5 text-amber-500" /> Vote of Thanks
                          </label>
                          <div className="flex-1 space-y-1">
                            <textarea
                              rows={2}
                              value={printCompanyForm.voteOfThanks}
                              onChange={(e) => setPrintCompanyForm({ ...printCompanyForm, voteOfThanks: e.target.value })}
                              placeholder="Thank you for doing business with Cool Technologies."
                              className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 resize-none"
                            />
                            <span className="text-[10px] text-slate-400 block text-right">max 200 letters</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── Section 2: Bank Details ────────────────────────────────────── */}
                  <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
                    {/* Bank Sub-Tabs */}
                    <div className="flex items-center gap-1 border-b border-slate-200 text-xs bg-slate-50 px-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setBankSubTab('aed')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border-b-2 ${bankSubTab === 'aed'
                            ? 'border-b-blue-600 text-blue-600 bg-white rounded-t'
                            : 'border-b-transparent text-slate-600 hover:text-blue-600'
                          }`}
                      >
                        <Building className="w-3.5 h-3.5" />
                        Bank Details
                      </button>
                      <button
                        type="button"
                        onClick={() => setBankSubTab('usd')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border-b-2 ${bankSubTab === 'usd'
                            ? 'border-b-blue-600 text-blue-600 bg-white rounded-t'
                            : 'border-b-transparent text-slate-600 hover:text-blue-600'
                          }`}
                      >
                        <DollarSign className="w-3.5 h-3.5" />
                        USD Bank Details
                      </button>
                    </div>

                    <div className="px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200 flex items-center gap-2 font-bold text-xs text-slate-800">
                      <Building className="w-4 h-4 text-slate-600" />
                      <span>{bankSubTab === 'aed' ? 'Bank Details' : 'USD Bank Details'}</span>
                    </div>

                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 text-xs">
                      {/* Left Column */}
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className="w-32 font-medium text-slate-700 flex items-center gap-1">
                            <Building className="w-3.5 h-3.5 text-blue-600" /> Bank Name
                          </label>
                          <input
                            type="text"
                            value={printCompanyForm.bankName}
                            onChange={(e) => setPrintCompanyForm({ ...printCompanyForm, bankName: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className="w-32 font-medium text-slate-700 flex items-center gap-1">
                            <Contact className="w-3.5 h-3.5 text-slate-500" /> Account Name
                          </label>
                          <input
                            type="text"
                            value={printCompanyForm.accountName}
                            onChange={(e) => setPrintCompanyForm({ ...printCompanyForm, accountName: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className="w-32 font-medium text-slate-700">Header Image</label>
                          <div className="flex-1 flex items-center justify-between gap-2">
                            <input
                              type="file"
                              className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border file:border-slate-300 file:text-xs file:font-semibold file:bg-slate-100 hover:file:bg-slate-200 cursor-pointer flex-1"
                            />
                            <button
                              type="button"
                              onClick={() => setHeaderToggle(!headerToggle)}
                              className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${headerToggle ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
                                }`}
                            >
                              <span className="bg-white w-3.5 h-3.5 rounded-full shadow-md" />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className="w-32 font-medium text-slate-700 flex items-center gap-1">
                            Footer Position Adjustment <span className="text-slate-400 cursor-help" title="Offset in pixels">❓</span>
                          </label>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={printCompanyForm.footerAdjustment}
                              onChange={(e) => setPrintCompanyForm({ ...printCompanyForm, footerAdjustment: e.target.value })}
                              className="w-20 bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 text-center focus:outline-none focus:border-blue-600"
                            />
                            <span className="text-xs text-slate-500 font-semibold">px</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className="w-28 font-medium text-slate-700 flex items-center gap-1">
                            <Building className="w-3.5 h-3.5 text-slate-500" /> Bank Branch
                          </label>
                          <input
                            type="text"
                            value={printCompanyForm.bankBranch}
                            onChange={(e) => setPrintCompanyForm({ ...printCompanyForm, bankBranch: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className="w-28 font-medium text-slate-700 flex items-center gap-1">
                            <CreditCard className="w-3.5 h-3.5 text-slate-500" /> Account Number
                          </label>
                          <input
                            type="text"
                            value={printCompanyForm.accountNumber}
                            onChange={(e) => setPrintCompanyForm({ ...printCompanyForm, accountNumber: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className="w-28 font-medium text-slate-700">Footer Image</label>
                          <div className="flex-1 flex items-center justify-between gap-2">
                            <input
                              type="file"
                              className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border file:border-slate-300 file:text-xs file:font-semibold file:bg-slate-100 hover:file:bg-slate-200 cursor-pointer flex-1"
                            />
                            <button
                              type="button"
                              onClick={() => setFooterToggle(!footerToggle)}
                              className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${footerToggle ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
                                }`}
                            >
                              <span className="bg-white w-3.5 h-3.5 rounded-full shadow-md" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── Section 3: Document Print Matrix Table ──────────────────────── */}
                  <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-center text-xs border-collapse">
                        <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                          <tr>
                            <th className="py-2.5 px-3 text-left min-w-[170px]">Name</th>
                            <th className="py-2.5 px-2 min-w-[70px]">Serial No.</th>
                            <th className="py-2.5 px-2 min-w-[80px]">Order Number</th>
                            <th className="py-2.5 px-2 min-w-[80px]">Order Name</th>
                            <th className="py-2.5 px-2 min-w-[70px]">Item Code</th>
                            <th className="py-2.5 px-2 min-w-[70px]">Item Unit</th>
                            <th className="py-2.5 px-2 min-w-[70px]">Item Brand</th>
                            <th className="py-2.5 px-2 min-w-[70px]">Item Image</th>
                            <th className="py-2.5 px-2 min-w-[70px]">Item QTY</th>
                            <th className="py-2.5 px-2 min-w-[70px]">Total QTY</th>
                            <th className="py-2.5 px-2 min-w-[60px]">Price</th>
                            <th className="py-2.5 px-2 min-w-[80px]">Bank Details</th>
                            <th className="py-2.5 px-2 min-w-[80px]">Seal & Sign</th>
                            <th className="py-2.5 px-2 min-w-[80px]">Repeat Header</th>
                            <th className="py-2.5 px-2 min-w-[120px]">Terms & Conditions Head</th>
                            <th className="py-2.5 px-2 min-w-[100px]">Payment Schedule</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {printMatrix.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                              {/* Document Name */}
                              <td className="py-3 px-3 text-left font-bold text-slate-800">
                                <span className="mr-1">{row.icon}</span> {row.label}
                              </td>

                              {/* Columns Checkboxes */}
                              {[
                                'serialNo',
                                'orderNumber',
                                'orderName',
                                'itemCode',
                                'itemUnit',
                                'itemBrand',
                                'itemImage',
                                'itemQty',
                                'totalQty',
                                'price',
                                'bankDetails',
                                'sealSign',
                                'repeatHeader',
                                'termsHead',
                                'paymentSchedule',
                              ].map((colKey) => {
                                const isChecked = (row as any)[colKey];
                                return (
                                  <td key={colKey} className="py-3 px-2 text-center">
                                    <input
                                      type="checkbox"
                                      checked={Boolean(isChecked)}
                                      onChange={() => togglePrintMatrix(row.id, colKey)}
                                      className="w-3.5 h-3.5 rounded text-rose-500 accent-rose-500 cursor-pointer"
                                    />
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Footer Action */}
                    <div className="p-3 bg-[#FAFBFD] border-t border-slate-200 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setSaveSuccess(true);
                          setTimeout(() => setSaveSuccess(false), 3000);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold shadow-xs transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5 rotate-90" />
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {printSubTab === 'terms' && (
                <Card className="border-slate-200 bg-white p-5 space-y-4">
                  <h3 className="font-bold text-sm text-slate-900">Standard Quotation & Order Terms & Conditions</h3>
                  <textarea
                    rows={8}
                    defaultValue={`1. Prices are valid for 30 days from the quotation date.
2. Delivery period: 3-5 working days from the confirmed purchase order.
3. Payment terms: 30 days credit from invoice date upon delivery approval.
4. Warranty: 12 months comprehensive manufacturer warranty on all supplied parts.`}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-800 font-mono focus:outline-none focus:border-blue-600"
                  />
                  <div className="flex justify-end">
                    <Button variant="primary" size="sm" onClick={() => { setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 3000); }}>
                      Save Terms & Conditions
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* ── Report Settings Sub-Tab (Exact Cezcon CRM Reference Layout) ────── */}
          {activeSubTab === 'reports' && (
            <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
              {/* Header Banner */}
              <div className="px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200 flex items-center gap-2 font-bold text-xs text-slate-800">
                <FileText className="w-4 h-4 text-slate-600" />
                <span>Report Settings</span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4 text-center w-16">Sl.No</th>
                      <th className="py-2.5 px-4 min-w-[200px] w-64">Report Name</th>
                      <th className="py-2.5 px-4 min-w-[320px]">Description</th>
                      <th className="py-2.5 px-4 text-center w-24">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {CEZCON_REPORT_SETTINGS_DATA.map((rep) => (
                      <tr key={rep.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Sl.No */}
                        <td className="py-3 px-4 text-center font-bold text-slate-800">
                          {rep.id}
                        </td>

                        {/* Report Name */}
                        <td className="py-3 px-4 font-bold text-slate-800">
                          {rep.name}
                        </td>

                        {/* Description */}
                        <td className="py-3 px-4 text-slate-600">
                          {rep.description}
                        </td>

                        {/* Action */}
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-[10px] font-bold shadow-xs transition-colors"
                            title="Action"
                          >
                            <SettingsIcon className="w-3 h-3" />
                            <ChevronDown className="w-2.5 h-2.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Credit Limit Sub-Tab (Exact Cezcon CRM Reference Layout) ───────── */}
          {activeSubTab === 'credit' && (
            <div className="space-y-4">
              {/* ── Top Card: Default Credit Limit ── */}
              <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden max-w-xl">
                <div className="px-4 py-2 bg-[#F1F5F9] border-b border-slate-200 font-bold text-xs text-slate-800">
                  Default Credit Limit
                </div>
                <div className="p-4 space-y-3 text-xs">
                  <div className="border border-slate-200 rounded divide-y divide-slate-100">
                    <div className="grid grid-cols-3 p-2 bg-[#FAFBFD]">
                      <span className="font-semibold text-slate-700">Credit Days</span>
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={defaultCreditDays}
                          onChange={(e) => setDefaultCreditDays(e.target.value)}
                          placeholder="e.g. 30"
                          className="w-full bg-white border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 p-2 bg-[#FAFBFD]">
                      <span className="font-semibold text-slate-700">Credit Limit</span>
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={defaultCreditLimit}
                          onChange={(e) => setDefaultCreditLimit(e.target.value)}
                          placeholder="e.g. 50000"
                          className="w-full bg-white border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSaveSuccess(true);
                        setTimeout(() => setSaveSuccess(false), 3000);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5 rotate-90" />
                      Update default credit details to all customers
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              {/* ── Bottom Card: Customer Credit Table ── */}
              <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
                {/* Header Banner: Customer */}
                <div className="px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200 flex items-center gap-2 font-bold text-xs text-slate-800">
                  <Shield className="w-4 h-4 text-slate-600" />
                  <span>Customer</span>
                </div>

                {/* Sub Header: Shows Rows + Search */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2 border-b border-slate-200 text-xs bg-white">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600">Shows</span>
                    <select
                      value={creditRowsPerPage}
                      onChange={(e) => setCreditRowsPerPage(Number(e.target.value))}
                      className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                    <span className="text-slate-600">Rows</span>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="Search customer"
                      value={creditSearch}
                      onChange={(e) => setCreditSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 pr-8"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2" />
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                      <tr>
                        <th className="py-2.5 px-3 text-center w-14">SL.No</th>
                        <th className="py-2.5 px-4 min-w-[240px]">Customer Name</th>
                        <th className="py-2.5 px-3 text-center w-20">Owner</th>
                        <th className="py-2.5 px-3 text-center w-24">Tel</th>
                        <th className="py-2.5 px-4 text-center min-w-[160px]">Last Order</th>
                        <th className="py-2.5 px-3 text-right min-w-[100px]">Current Credit</th>
                        <th className="py-2.5 px-3 text-center min-w-[90px]">Credit Days</th>
                        <th className="py-2.5 px-3 text-right min-w-[100px]">Credit Limit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCustomerCredit.slice(0, creditRowsPerPage).map((cust, idx) => (
                        <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* SL.No */}
                          <td className="py-3 px-3 text-center font-bold text-slate-800">
                            {idx + 1}
                          </td>

                          {/* Customer Name */}
                          <td className="py-3 px-4 font-bold text-blue-600 hover:underline cursor-pointer">
                            {cust.name}
                          </td>

                          {/* Owner */}
                          <td className="py-3 px-3 text-center">
                            <div className="flex justify-center items-center">
                              {cust.isCompany ? (
                                <div className="w-6 h-6 rounded bg-blue-50 border border-blue-200 flex items-center justify-center text-[9px] font-bold text-blue-600" title="Cool Tech">
                                  CT
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-slate-700 text-white font-bold text-[10px] flex items-center justify-center" title={cust.owner}>
                                  {cust.owner.charAt(0)}
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Tel */}
                          <td className="py-3 px-3 text-center text-slate-500">
                            -
                          </td>

                          {/* Last Order Badge */}
                          <td className="py-3 px-4 text-center">
                            <span className="inline-block px-2.5 py-1 rounded bg-[#0284C7] text-white text-[10px] font-bold shadow-2xs">
                              {cust.lastOrder}
                            </span>
                          </td>

                          {/* Current Credit */}
                          <td className="py-3 px-3 text-right font-bold text-slate-800">
                            {cust.currentCredit}
                          </td>

                          {/* Credit Days */}
                          <td className="py-3 px-3 text-center text-slate-500">
                            {cust.creditDays || '-'}
                          </td>

                          {/* Credit Limit */}
                          <td className="py-3 px-3 text-right font-medium text-slate-700">
                            {cust.creditLimit || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── Purchase Order Sub-Tab (Exact Cezcon CRM Reference Layout) ───────── */}
          {activeSubTab === 'po' && (
            <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
              {/* Top Header Banner: Purchase Order Approval + Toggle Switch */}
              <div className="flex items-center gap-3 px-4 py-3 bg-[#F1F5F9] border-b border-slate-200">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <ShoppingCart className="w-4 h-4 text-slate-600" />
                  <span>Purchase Order Approval</span>
                </div>
                {/* Switch Toggle */}
                <button
                  type="button"
                  onClick={() => setPoApprovalEnabled(!poApprovalEnabled)}
                  className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${poApprovalEnabled ? 'bg-[#16A34A]' : 'bg-slate-300'
                    }`}
                  title="Toggle Purchase Order Approval"
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${poApprovalEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                  />
                </button>
              </div>

              {/* Sub-Tabs: Stage / Approver */}
              <div className="flex items-center border-b border-slate-200 bg-white px-4 pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => setPoSubTab('stage')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 border-b-2 font-bold text-xs transition-colors ${poSubTab === 'stage'
                      ? 'border-b-blue-600 text-blue-600 bg-slate-50/70 rounded-t'
                      : 'border-b-transparent text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                >
                  <Check className="w-3.5 h-3.5 text-slate-700" />
                  <span>Stage</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPoSubTab('approver')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 border-b-2 font-bold text-xs transition-colors ${poSubTab === 'approver'
                      ? 'border-b-blue-600 text-blue-600 bg-slate-50/70 rounded-t'
                      : 'border-b-transparent text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                >
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Approver</span>
                </button>
              </div>

              {/* ── Tab Content: Stage ── */}
              {poSubTab === 'stage' && (
                <div className="p-4 space-y-4">
                  {/* Note Callout Box + Green +STATUS Button */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 p-4 rounded-md bg-white border border-slate-100 shadow-2xs">
                    <div className="space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <span className="text-amber-500 text-sm">💡</span>
                        <span>Note</span>
                      </div>
                      <ul className="space-y-1 pl-4 list-disc text-slate-600 text-[11px] leading-relaxed">
                        <li>Multiple stages can be added to the purchase order as needed.</li>
                        <li>You can reorder newly added stages by moving them up or down.</li>
                        <li>The LPO status flow will function according to the order in which the stages are arranged.</li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAddPoStageModalOpen(true)}
                      className="self-start md:self-auto inline-flex items-center gap-1 px-3.5 py-1.5 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xs transition-colors whitespace-nowrap"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      + STATUS
                    </button>
                  </div>

                  {/* Table */}
                  <div className="border border-slate-200 rounded overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                        <tr>
                          <th className="py-2.5 px-4 text-center w-16">SL.No</th>
                          <th className="py-2.5 px-4 min-w-[280px]">Name</th>
                          <th className="py-2.5 px-4 text-center w-24">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {poStagesList.map((stage, idx) => (
                          <tr key={stage.id} className="hover:bg-slate-50/80 transition-colors">
                            {/* SL.No */}
                            <td className="py-3 px-4 text-center font-bold text-slate-800">
                              {idx + 1}
                            </td>

                            {/* Name Badge */}
                            <td className="py-3 px-4">
                              <span
                                className="inline-block px-3 py-1 rounded text-white text-xs font-bold shadow-2xs"
                                style={{ backgroundColor: stage.color }}
                              >
                                {stage.name}
                              </span>
                            </td>

                            {/* Action */}
                            <td className="py-3 px-4 text-center">
                              <div className="inline-flex items-center gap-1">
                                {idx > 2 && (
                                  <div className="flex items-center gap-0.5 mr-1">
                                    <button
                                      type="button"
                                      onClick={() => movePoStage(idx, 'up')}
                                      disabled={idx === 3}
                                      className="p-1 hover:bg-slate-100 rounded text-slate-600 disabled:opacity-30"
                                      title="Move Up"
                                    >
                                      <ArrowUp className="w-3 h-3" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => movePoStage(idx, 'down')}
                                      disabled={idx === poStagesList.length - 1}
                                      className="p-1 hover:bg-slate-100 rounded text-slate-600 disabled:opacity-30"
                                      title="Move Down"
                                    >
                                      <ArrowDown className="w-3 h-3" />
                                    </button>
                                  </div>
                                )}
                                <button
                                  type="button"
                                  className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-[10px] font-bold shadow-xs transition-colors"
                                  title="Actions"
                                >
                                  <SettingsIcon className="w-3 h-3" />
                                  <ChevronDown className="w-2.5 h-2.5" />
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

              {/* ── Tab Content: Approver ── */}
              {poSubTab === 'approver' && (
                <div className="p-4 space-y-4">
                  {/* Approver Header and Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-md text-xs">
                    <div>
                      <h4 className="font-bold text-slate-800">LPO Approval Hierarchy & Threshold Limits</h4>
                      <p className="text-slate-500 text-[11px]">Define sequential multi-tier approvers for purchase orders based on order valuation.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAddApproverModalOpen(true)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors whitespace-nowrap"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      + ADD APPROVER
                    </button>
                  </div>

                  {/* Approvers Table */}
                  <div className="border border-slate-200 rounded overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                        <tr>
                          <th className="py-2.5 px-4 text-center w-20">Level</th>
                          <th className="py-2.5 px-4 min-w-[200px]">Designation / Role</th>
                          <th className="py-2.5 px-4 min-w-[180px]">Approver Name</th>
                          <th className="py-2.5 px-4 min-w-[150px]">Threshold Limit</th>
                          <th className="py-2.5 px-3 text-center w-24">Mandatory</th>
                          <th className="py-2.5 px-3 text-center w-24">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {poApproversList.map((appr) => (
                          <tr key={appr.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 text-center font-bold text-blue-600">
                              {appr.level}
                            </td>
                            <td className="py-3 px-4 font-bold text-slate-800">
                              {appr.role}
                            </td>
                            <td className="py-3 px-4 text-slate-700 font-medium">
                              {appr.user}
                            </td>
                            <td className="py-3 px-4 font-semibold text-emerald-700">
                              {appr.limit}
                            </td>
                            <td className="py-3 px-3 text-center">
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                Yes
                              </span>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <button
                                type="button"
                                className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-[10px] font-bold shadow-xs transition-colors"
                                title="Actions"
                              >
                                <SettingsIcon className="w-3 h-3" />
                                <ChevronDown className="w-2.5 h-2.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Language Sub-Tab ─────────────────────────────────────────────────── */}
          {activeSubTab === 'language' && (
            <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <Languages className="w-4 h-4 text-slate-600" />
                  <span>Languages</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddLanguageModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  + LANGUAGE
                </button>
              </div>

              <div className="p-3 border-b border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-500">Configure multi-lingual localization for customer documents and portals.</span>
                <div className="w-56">
                  <input
                    type="text"
                    placeholder="Search languages..."
                    value={languageSearch}
                    onChange={(e) => setLanguageSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4 text-center w-16">SL.No</th>
                      <th className="py-2.5 px-4 min-w-[200px]">Language Name</th>
                      <th className="py-2.5 px-4 min-w-[120px]">ISO Code</th>
                      <th className="py-2.5 px-4 min-w-[120px]">Direction</th>
                      <th className="py-2.5 px-4 text-center w-28">Status</th>
                      <th className="py-2.5 px-4 text-center w-24">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {languagesList
                      .filter((l) => l.name.toLowerCase().includes(languageSearch.toLowerCase()) || l.code.toLowerCase().includes(languageSearch.toLowerCase()))
                      .map((lang, idx) => (
                        <tr key={lang.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 text-center font-bold text-slate-800">{idx + 1}</td>
                          <td className="py-3 px-4 font-bold text-slate-800">{lang.name}</td>
                          <td className="py-3 px-4 text-slate-600 font-mono text-xs">{lang.code}</td>
                          <td className="py-3 px-4 text-slate-600 font-semibold">{lang.direction}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${lang.status === 'Default' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                              }`}>
                              {lang.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-[10px] font-bold shadow-xs transition-colors"
                              title="Actions"
                            >
                              <SettingsIcon className="w-3 h-3" />
                              <ChevronDown className="w-2.5 h-2.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Country / Region Sub-Tab ────────────────────────────────────────── */}
          {activeSubTab === 'region' && (
            <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <Flag className="w-4 h-4 text-slate-600" />
                  <span>Country / Region</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddRegionModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  + COUNTRY / REGION
                </button>
              </div>

              <div className="p-3 border-b border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-500">Configure multi-currency taxation and regional billing entities.</span>
                <div className="w-56">
                  <input
                    type="text"
                    placeholder="Search country or currency..."
                    value={regionSearch}
                    onChange={(e) => setRegionSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4 text-center w-16">SL.No</th>
                      <th className="py-2.5 px-4 min-w-[200px]">Country / Region</th>
                      <th className="py-2.5 px-4 min-w-[140px]">Currency</th>
                      <th className="py-2.5 px-4 min-w-[120px]">Dialing & ISO</th>
                      <th className="py-2.5 px-4 min-w-[100px]">VAT / Tax %</th>
                      <th className="py-2.5 px-4 text-center w-28">Status</th>
                      <th className="py-2.5 px-4 text-center w-24">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {regionsList
                      .filter((r) => r.name.toLowerCase().includes(regionSearch.toLowerCase()) || r.currency.toLowerCase().includes(regionSearch.toLowerCase()))
                      .map((reg, idx) => (
                        <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 text-center font-bold text-slate-800">{idx + 1}</td>
                          <td className="py-3 px-4 font-bold text-slate-800">{reg.name}</td>
                          <td className="py-3 px-4 text-blue-600 font-bold">{reg.currency}</td>
                          <td className="py-3 px-4 text-slate-600 font-mono text-xs">{reg.code}</td>
                          <td className="py-3 px-4 text-emerald-700 font-semibold">{reg.taxRate}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {reg.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-[10px] font-bold shadow-xs transition-colors"
                              title="Actions"
                            >
                              <SettingsIcon className="w-3 h-3" />
                              <ChevronDown className="w-2.5 h-2.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Designation Sub-Tab ─────────────────────────────────────────────── */}
          {activeSubTab === 'designation' && (
            <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <Contact className="w-4 h-4 text-slate-600" />
                  <span>Designations</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddDesignationModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  + DESIGNATION
                </button>
              </div>

              <div className="p-3 border-b border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-500">Manage employee designations, hierarchy titles, and department allocations.</span>
                <div className="w-56">
                  <input
                    type="text"
                    placeholder="Search designation..."
                    value={designationSearch}
                    onChange={(e) => setDesignationSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4 text-center w-16">SL.No</th>
                      <th className="py-2.5 px-4 min-w-[220px]">Designation Name</th>
                      <th className="py-2.5 px-4 min-w-[200px]">Department</th>
                      <th className="py-2.5 px-4 text-center min-w-[120px]">Users Assigned</th>
                      <th className="py-2.5 px-4 text-center w-24">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {designationsList
                      .filter((d) => d.name.toLowerCase().includes(designationSearch.toLowerCase()) || d.department.toLowerCase().includes(designationSearch.toLowerCase()))
                      .map((desig, idx) => (
                        <tr key={desig.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 text-center font-bold text-slate-800">{idx + 1}</td>
                          <td className="py-3 px-4 font-bold text-slate-800">{desig.name}</td>
                          <td className="py-3 px-4 text-slate-600 font-medium">{desig.department}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              {desig.count} Users
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-[10px] font-bold shadow-xs transition-colors"
                              title="Actions"
                            >
                              <SettingsIcon className="w-3 h-3" />
                              <ChevronDown className="w-2.5 h-2.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Defaults & General Sub-Tab ─────────────────────────────────────── */}
          {activeSubTab === 'defaults' && (
            <Card className="border-slate-200 bg-white p-5">
              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs max-w-xl">
                <h3 className="font-bold text-sm text-slate-900">CRM Initialization & Defaults</h3>
                <Input label="Company Legal Name" defaultValue="Cool Technologies LLC" />
                <Input label="CRM Display Name" defaultValue="Cool Technologies CRM" />
                <Input label="Primary Currency" defaultValue="USD ($)" />
                <Input label="Default Timezone" defaultValue="Asia/Kolkata (UTC+5:30)" />
                <Input label="Fiscal Year Start Month" defaultValue="January" />
                <Input label="Date Format" defaultValue="DD / MM / YYYY" />
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="multiCurrency" defaultChecked className="rounded text-blue-600" />
                  <label htmlFor="multiCurrency" className="font-semibold text-slate-800">Enable Multi-Currency Support</label>
                </div>
                <Button type="submit" variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
                  Save Initial Settings
                </Button>
              </form>
            </Card>
          )}

          {/* Other initial settings placeholder with standard Cezcon template */}
          {!['source', 'industry', 'customisation', 'print', 'reports', 'credit', 'po', 'language', 'region', 'designation', 'defaults'].includes(activeSubTab) && (
            <Card className="border-slate-200 bg-white p-6 text-center space-y-3">
              <h3 className="font-bold text-sm text-slate-800 capitalize">{activeSubTab.replace('-', ' ')} Settings</h3>
              <p className="text-xs text-slate-500">Configure parameters, templates, and lookup tables for {activeSubTab}.</p>
              <Button variant="outline" size="sm" onClick={() => setActiveSubTab('source')}>Back to Sources</Button>
            </Card>
          )}
        </div>
      )}

      {/* ── Campaign Settings (Exact Cezcon CRM Reference Layout) ───────────── */}
      {activeTab === 'campaign' && (
        <div className="space-y-3">
          {/* Sub Navigation Bar for Campaign Settings */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/80 border border-slate-200 rounded-md overflow-x-auto no-scrollbar text-xs">
            {[
              { id: 'type', label: 'Campaign Type', icon: Megaphone },
              { id: 'expense', label: 'Expense Type', icon: Receipt },
              { id: 'status', label: 'Campaign Status', icon: CheckCircle2 },
            ].map((sub) => {
              const Icon = sub.icon;
              const isActive = activeSubTab === sub.id;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setActiveSubTab(sub.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded font-bold text-xs whitespace-nowrap transition-colors ${isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-white'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {sub.label}
                </button>
              );
            })}
          </div>

          {/* ── Expense Type Sub-Tab (Exact Cezcon CRM Reference Layout) ───────── */}
          {activeSubTab === 'expense' && (
            <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
              {/* Header Banner: Expense Type + Green +EXPENSE TYPE Button */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <Receipt className="w-4 h-4 text-slate-600" />
                  <span>Expense Type</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddExpenseTypeModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  + EXPENSE TYPE
                </button>
              </div>

              {/* Sub Header: Show Rows + Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2 border-b border-slate-200 text-xs bg-white">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">Show</span>
                  <select
                    value={expenseRowsPerPage}
                    onChange={(e) => {
                      setExpenseRowsPerPage(Number(e.target.value));
                      setExpenseCurrentPage(1);
                    }}
                    className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-slate-600">Rows</span>
                </div>

                <div className="relative w-full sm:w-56">
                  <input
                    type="text"
                    placeholder="Search"
                    value={expenseSearch}
                    onChange={(e) => {
                      setExpenseSearch(e.target.value);
                      setExpenseCurrentPage(1);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4 text-left w-16">SL.No</th>
                      <th className="py-2.5 px-4 min-w-[280px]">Expense Type</th>
                      <th className="py-2.5 px-4 text-center w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedExpenseTypes.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* SL.No */}
                        <td className="py-3 px-4 text-left font-bold text-slate-800">
                          {(expenseCurrentPage - 1) * expenseRowsPerPage + idx + 1}
                        </td>

                        {/* Expense Type Name */}
                        <td className="py-3 px-4 font-bold text-slate-800">
                          {item.name}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-[10px] font-bold shadow-xs transition-colors"
                            title="Actions"
                          >
                            <SettingsIcon className="w-3 h-3" />
                            <ChevronDown className="w-2.5 h-2.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Pagination */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 text-xs bg-white text-slate-500">
                <div>
                  Showing {(expenseCurrentPage - 1) * expenseRowsPerPage + 1} to{' '}
                  {Math.min(expenseCurrentPage * expenseRowsPerPage, filteredExpenseTypes.length)} of{' '}
                  {filteredExpenseTypes.length} entries
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setExpenseCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={expenseCurrentPage === 1}
                    className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    «
                  </button>
                  {Array.from({ length: totalExpensePages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setExpenseCurrentPage(pageNum)}
                      className={`px-2.5 py-1 rounded font-bold transition-colors ${expenseCurrentPage === pageNum
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setExpenseCurrentPage((p) => Math.min(totalExpensePages, p + 1))}
                    disabled={expenseCurrentPage === totalExpensePages}
                    className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    »
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Campaign Type Sub-Tab ───────────────────────────────────────────── */}
          {activeSubTab === 'type' && (
            <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
              {/* Header Banner */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <Megaphone className="w-4 h-4 text-slate-600" />
                  <span>Campaign Type</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddCampaignTypeModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  + CAMPAIGN TYPE
                </button>
              </div>

              {/* Sub Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2 border-b border-slate-200 text-xs bg-white">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">Show</span>
                  <select
                    value={campaignTypeRowsPerPage}
                    onChange={(e) => {
                      setCampaignTypeRowsPerPage(Number(e.target.value));
                      setCampaignTypeCurrentPage(1);
                    }}
                    className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-slate-600">Rows</span>
                </div>

                <div className="relative w-full sm:w-56">
                  <input
                    type="text"
                    placeholder="Search"
                    value={campaignTypeSearch}
                    onChange={(e) => {
                      setCampaignTypeSearch(e.target.value);
                      setCampaignTypeCurrentPage(1);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4 text-left w-16">SL.No</th>
                      <th className="py-2.5 px-4 min-w-[280px]">Campaign Type</th>
                      <th className="py-2.5 px-4 text-center w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedCampaignTypes.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 text-left font-bold text-slate-800">
                          {(campaignTypeCurrentPage - 1) * campaignTypeRowsPerPage + idx + 1}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-800">
                          {item.name}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-[10px] font-bold shadow-xs transition-colors"
                            title="Actions"
                          >
                            <SettingsIcon className="w-3 h-3" />
                            <ChevronDown className="w-2.5 h-2.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 text-xs bg-white text-slate-500">
                <div>
                  Showing {(campaignTypeCurrentPage - 1) * campaignTypeRowsPerPage + 1} to{' '}
                  {Math.min(campaignTypeCurrentPage * campaignTypeRowsPerPage, filteredCampaignTypes.length)} of{' '}
                  {filteredCampaignTypes.length} entries
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCampaignTypeCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={campaignTypeCurrentPage === 1}
                    className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    «
                  </button>
                  {Array.from({ length: totalCampaignTypePages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCampaignTypeCurrentPage(pageNum)}
                      className={`px-2.5 py-1 rounded font-bold transition-colors ${campaignTypeCurrentPage === pageNum
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setCampaignTypeCurrentPage((p) => Math.min(totalCampaignTypePages, p + 1))}
                    disabled={campaignTypeCurrentPage === totalCampaignTypePages}
                    className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    »
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Campaign Status Sub-Tab ─────────────────────────────────────────── */}
          {activeSubTab === 'status' && (
            <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
              {/* Header Banner */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-slate-600" />
                  <span>Campaign Status</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddCampaignStatusModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  + CAMPAIGN STATUS
                </button>
              </div>

              {/* Sub Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2 border-b border-slate-200 text-xs bg-white">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">Show</span>
                  <select
                    value={campaignStatusRowsPerPage}
                    onChange={(e) => {
                      setCampaignStatusRowsPerPage(Number(e.target.value));
                      setCampaignStatusCurrentPage(1);
                    }}
                    className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-slate-600">Rows</span>
                </div>

                <div className="relative w-full sm:w-56">
                  <input
                    type="text"
                    placeholder="Search"
                    value={campaignStatusSearch}
                    onChange={(e) => {
                      setCampaignStatusSearch(e.target.value);
                      setCampaignStatusCurrentPage(1);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4 text-left w-16">SL.No</th>
                      <th className="py-2.5 px-4 min-w-[280px]">Campaign Status</th>
                      <th className="py-2.5 px-4 text-center w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedCampaignStatuses.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 text-left font-bold text-slate-800">
                          {(campaignStatusCurrentPage - 1) * campaignStatusRowsPerPage + idx + 1}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-800">
                          <span
                            className="inline-block px-3 py-1 rounded text-white text-xs font-bold shadow-2xs"
                            style={{ backgroundColor: item.color }}
                          >
                            {item.name}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-[10px] font-bold shadow-xs transition-colors"
                            title="Actions"
                          >
                            <SettingsIcon className="w-3 h-3" />
                            <ChevronDown className="w-2.5 h-2.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 text-xs bg-white text-slate-500">
                <div>
                  Showing {(campaignStatusCurrentPage - 1) * campaignStatusRowsPerPage + 1} to{' '}
                  {Math.min(campaignStatusCurrentPage * campaignStatusRowsPerPage, filteredCampaignStatuses.length)} of{' '}
                  {filteredCampaignStatuses.length} entries
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCampaignStatusCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={campaignStatusCurrentPage === 1}
                    className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    «
                  </button>
                  {Array.from({ length: totalCampaignStatusPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCampaignStatusCurrentPage(pageNum)}
                      className={`px-2.5 py-1 rounded font-bold transition-colors ${campaignStatusCurrentPage === pageNum
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setCampaignStatusCurrentPage((p) => Math.min(totalCampaignStatusPages, p + 1))}
                    disabled={campaignStatusCurrentPage === totalCampaignStatusPages}
                    className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    »
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Order Settings ─────────────────────────────────────────────────────── */}
      {activeTab === 'order' && (
        <div className="space-y-4">
          <Card className="border-slate-200 bg-white p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Order Status Configuration</h3>
            <p className="text-xs text-slate-500">Define custom order statuses and their display colors for your sales workflow.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ORDER_STATUSES.map((status) => (
                <div key={status.id} className="flex items-center gap-3 p-3 rounded-md border border-slate-200 bg-slate-50 text-xs">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: status.color }} />
                  <span className="flex-1 font-semibold text-slate-800">{status.name}</span>
                  <button className="text-slate-400 hover:text-blue-600"><Edit2 className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add Order Status</Button>
          </Card>

          <Card className="border-slate-200 bg-white p-5 space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Order Defaults</h3>
            <div className="text-xs max-w-xl space-y-3">
              <Input label="Default Payment Terms (Days)" type="number" defaultValue="30" />
              <Input label="Auto PO Number Prefix" defaultValue="CT-PO-" />
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                <span className="font-semibold text-slate-800">Auto-generate Order Numbers</span>
              </div>
            </div>
            <Button variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />} onClick={() => { setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 3000); }}>
              Save Order Settings
            </Button>
          </Card>
        </div>
      )}

      {/* ── Task Settings ─────────────────────────────────────────────────────── */}
      {activeTab === 'task' && (
        <div className="space-y-4">
          <Card className="border-slate-200 bg-white p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Task Type Configuration</h3>
            <p className="text-xs text-slate-500">Configure available task types visible to all CRM users.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TASK_TYPES.map((t) => (
                <div key={t.id} className="flex items-center gap-2 p-3 rounded-md border border-slate-200 bg-slate-50 text-xs">
                  <span className="text-base">{t.icon}</span>
                  <span className="font-semibold text-slate-800 flex-1">{t.name}</span>
                  <button className="text-slate-400 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add Task Type</Button>
          </Card>

          <Card className="border-slate-200 bg-white p-5 space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Task Defaults</h3>
            <div className="text-xs max-w-xl space-y-3">
              <Input label="Default Due Days (from creation)" type="number" defaultValue="3" />
              <Input label="Overdue Alert Before (Hours)" type="number" defaultValue="24" />
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                <span className="font-semibold text-slate-800">Send Push Notifications for Overdue Tasks</span>
              </div>
            </div>
            <Button variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />} onClick={() => { setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 3000); }}>
              Save Task Settings
            </Button>
          </Card>
        </div>
      )}

      {/* ── Business Opportunity ─────────────────────────────────────────────── */}
      {activeTab === 'opportunity' && (
        <Card className="border-slate-200 bg-white p-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-900">Business Opportunity Settings</h3>
          <div className="text-xs max-w-xl space-y-3">
            <Input label="Default Opportunity Owner" defaultValue="Alex Rivera" />
            <Input label="Auto-close Lost Deals After (Days)" type="number" defaultValue="60" />
            <Input label="Default Win Probability (%)" type="number" defaultValue="50" />
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded text-blue-600" />
              <span className="font-semibold text-slate-800">Notify sales manager when deal probability drops below 20%</span>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" className="rounded text-blue-600" />
              <span className="font-semibold text-slate-800">Require approval for discounts above 15%</span>
            </div>
          </div>
          <Button variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />} onClick={() => { setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 3000); }}>
            Save Opportunity Settings
          </Button>
        </Card>
      )}

      {/* ── Company Target ────────────────────────────────────────────────────── */}
      {activeTab === 'target' && (
        <Card className="border-slate-200 bg-white p-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-900">Company Sales & Performance Targets</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {[
              { label: 'Annual Revenue Target (USD)', defaultValue: '1500000' },
              { label: 'Monthly New Leads Target', defaultValue: '50' },
              { label: 'Monthly Deals Closed Target', defaultValue: '15' },
              { label: 'Monthly Customer Acquisition Target', defaultValue: '8' },
              { label: 'Win Rate Target (%)', defaultValue: '65' },
              { label: 'Customer Retention Target (%)', defaultValue: '90' },
            ].map((f) => (
              <Input key={f.label} label={f.label} type="number" defaultValue={f.defaultValue} />
            ))}
          </div>
          <Button variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />} onClick={() => { setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 3000); }}>
            Save Targets
          </Button>
        </Card>
      )}

      {/* ── Cost / Job Type ────────────────────────────────────────────────────── */}
      {activeTab === 'cost-job' && (
        <Card className="border-slate-200 bg-white p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Cost & Job Type Configuration</h3>
              <p className="text-xs text-slate-500">Define billable job types with hourly costs for service delivery tracking.</p>
            </div>
            <Button variant="outline" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add Job Type</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Job Type</th>
                  <th className="py-3 px-3">Cost / Hour</th>
                  <th className="py-3 px-3">Est. Hours</th>
                  <th className="py-3 px-3">Est. Total</th>
                  <th className="py-3 px-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COST_JOB_TYPES.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/80">
                    <td className="py-3 px-4 font-bold text-slate-900">{job.name}</td>
                    <td className="py-3 px-3 font-semibold text-slate-700">{formatCurrency(job.costPerHour)}</td>
                    <td className="py-3 px-3 text-slate-600">{job.estimatedHours}h</td>
                    <td className="py-3 px-3 font-bold text-blue-600">{formatCurrency(job.costPerHour * job.estimatedHours)}</td>
                    <td className="py-3 px-3">
                      <div className="flex gap-1">
                        <button className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ── Business Tags (Exact Cezcon CRM Reference Layout) ────────────────── */}
      {activeTab === 'tags' && (
        <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
          {/* Header Banner: Tags + Green +TAG Button */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#F1F5F9] border-b border-slate-200">
            <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
              <Tag className="w-4 h-4 text-slate-600" />
              <span>Tags</span>
            </div>
            <button
              type="button"
              onClick={() => setIsAddTagModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              + TAG
            </button>
          </div>

          {/* Sub Header: Show Rows + Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2 border-b border-slate-200 text-xs bg-white">
            <div className="flex items-center gap-2">
              <span className="text-slate-600">Show</span>
              <select
                value={tagRowsPerPage}
                onChange={(e) => {
                  setTagRowsPerPage(Number(e.target.value));
                  setTagCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-slate-600">Rows</span>
            </div>

            <div className="relative w-full sm:w-56">
              <input
                type="text"
                placeholder="Search"
                value={tagSearch}
                onChange={(e) => {
                  setTagSearch(e.target.value);
                  setTagCurrentPage(1);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                <tr>
                  <th className="py-2.5 px-4 text-left w-16">SL.No</th>
                  <th className="py-2.5 px-4 min-w-[280px]">Tag</th>
                  <th className="py-2.5 px-4 text-center w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedTags.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* SL.No */}
                    <td className="py-3 px-4 text-left font-bold text-slate-800">
                      {(tagCurrentPage - 1) * tagRowsPerPage + idx + 1}
                    </td>

                    {/* Tag Name */}
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {item.name}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-[10px] font-bold shadow-xs transition-colors"
                        title="Actions"
                      >
                        <SettingsIcon className="w-3 h-3" />
                        <ChevronDown className="w-2.5 h-2.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 text-xs bg-white text-slate-500">
            <div>
              Showing {(tagCurrentPage - 1) * tagRowsPerPage + 1} to{' '}
              {Math.min(tagCurrentPage * tagRowsPerPage, filteredTags.length)} of{' '}
              {filteredTags.length} entries
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setTagCurrentPage((p) => Math.max(1, p - 1))}
                disabled={tagCurrentPage === 1}
                className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                «
              </button>
              {Array.from({ length: totalTagPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setTagCurrentPage(pageNum)}
                  className={`px-2.5 py-1 rounded font-bold transition-colors ${tagCurrentPage === pageNum
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                >
                  {pageNum}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setTagCurrentPage((p) => Math.min(totalTagPages, p + 1))}
                disabled={tagCurrentPage === totalTagPages}
                className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                »
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Products ──────────────────────────────────────────────────────────── */}
      {activeTab === 'products' && (
        <Card className="overflow-hidden border-slate-200 bg-white">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Product Catalog Configuration</h3>
              <p className="text-xs text-slate-500">Manage product master list for quotes, orders, and inventory.</p>
            </div>
            <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add Product</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-3">SKU Code</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Base Price</th>
                  <th className="py-3 px-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PRODUCTS_SETTINGS.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80">
                    <td className="py-3 px-4 font-bold text-slate-900">{p.name}</td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{p.sku}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">{p.category}</span>
                    </td>
                    <td className="py-3 px-3 font-bold text-blue-600">{formatCurrency(p.basePrice)}</td>
                    <td className="py-3 px-3">
                      <div className="flex gap-1">
                        <button className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ── System Settings ────────────────────────────────────────────────────── */}
      {activeTab === 'system' && (
        <Card className="border-slate-200 bg-white p-5">
          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs max-w-xl">
            <h3 className="font-bold text-sm text-slate-900">Cool Technologies System Controls</h3>
            <Input label="Platform Display Name" defaultValue="Cool Technologies CRM" />
            <Input label="Primary Support Email" defaultValue="support@cooltechnologies.com" />
            <Input label="API Rate Limit (Requests/Min)" type="number" defaultValue="2500" />
            <Input label="Session Timeout (Minutes)" type="number" defaultValue="60" />
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded text-blue-600" />
              <span className="font-semibold text-slate-800">Enable audit logging for all data mutations</span>
            </div>
            <Button type="submit" variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
              Save System Settings
            </Button>
          </form>
        </Card>
      )}

      {/* ── Security Tab ──────────────────────────────────────────────────────── */}
      {activeTab === 'security' && (
        <Card className="border-slate-200 bg-white p-5">
          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs max-w-xl">
            <h3 className="font-bold text-sm text-slate-900">Security & Authentication Policies</h3>
            {[
              { label: 'Enforce 2-Factor Authentication (2FA)', desc: 'Require 2FA for Super Admin and Admin accounts.', defaultChecked: true },
              { label: 'Force Password Reset Every 90 Days', desc: 'All user passwords expire and require reset.', defaultChecked: true },
              { label: 'Block Login After 5 Failed Attempts', desc: 'Temporarily lock accounts on repeated failure.', defaultChecked: true },
              { label: 'Enable IP Whitelist Restrictions', desc: 'Only allow logins from pre-approved IP ranges.', defaultChecked: false },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-md bg-slate-50 border border-slate-200">
                <div>
                  <p className="font-bold text-slate-900">{p.label}</p>
                  <p className="text-[11px] text-slate-500">{p.desc}</p>
                </div>
                <input type="checkbox" defaultChecked={p.defaultChecked} className="w-4 h-4 rounded text-blue-600" />
              </div>
            ))}
            <Input label="Session Idle Timeout (Minutes)" type="number" defaultValue="60" />
            <Button type="submit" variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
              Save Security Policies
            </Button>
          </form>
        </Card>
      )}

      {/* ── Backup & Data ─────────────────────────────────────────────────────── */}
      {activeTab === 'backup' && (
        <div className="space-y-4">
          <Card className="border-slate-200 bg-white p-5 space-y-4 max-w-2xl">
            <h3 className="font-bold text-sm text-slate-900">Automated Database Backups & Snapshots</h3>
            <p className="text-xs text-slate-500">
              Encrypted database snapshots run daily at 02:00 AM UTC. Point-in-time recovery is active for 30 days.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { label: 'Last Backup', value: 'Today, 02:00 AM UTC', status: 'success' },
                { label: 'Backup Size', value: '4.8 GB', status: 'info' },
                { label: 'Total Snapshots', value: '30 snapshots', status: 'info' },
                { label: 'Retention Period', value: '30 days', status: 'info' },
              ].map((b) => (
                <div key={b.label} className="p-3 rounded-md border border-slate-200 bg-slate-50">
                  <p className="text-slate-500">{b.label}</p>
                  <p className="font-bold text-slate-900 mt-0.5">{b.value}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="primary" size="sm" icon={<Database className="w-3.5 h-3.5" />}>
                Trigger Manual Backup Now
              </Button>
              <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
                Download Latest Snapshot
              </Button>
            </div>
          </Card>

          <Card className="border-slate-200 bg-white p-5 space-y-3 max-w-2xl">
            <h3 className="font-bold text-sm text-slate-900">Data Export & Import</h3>
            <p className="text-xs text-slate-500">Export all CRM data in CSV or JSON format for external analysis or migration.</p>
            <div className="flex gap-2 flex-wrap">
              {['Leads', 'Customers', 'Sales', 'Tasks', 'Users', 'All Data'].map((entity) => (
                <Button key={entity} variant="outline" size="sm">Export {entity}</Button>
              ))}
            </div>
          </Card>
        </div>
      )}


      {/* ── Add Profile Modal (Exact Cezcon CRM Reference Layout) ────────────── */}
      {isAddProfileModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-md shadow-2xl w-full max-w-[440px] overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white">
              <h3 className="text-sm font-semibold text-slate-800">Add Profile</h3>
              <button
                type="button"
                onClick={() => setIsAddProfileModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 text-xs font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form Body */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const profName = newProfileName.trim();
                if (!profName) return;
                const newProf = {
                  id: profilesList.length + 1,
                  name: profName,
                  date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
                  sales: newProfileSales,
                  project: newProfileProject,
                };
                setProfilesList([...profilesList, newProf]);
                setUserFormData((prev) => ({ ...prev, profile: profName }));
                setNewProfileName('');
                setNewProfileSales(true);
                setNewProfileProject(true);
                setIsAddProfileModalOpen(false);
              }}
            >
              <div className="p-4 sm:p-5 bg-white space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="sm:w-28 text-xs text-slate-800 font-semibold flex-shrink-0">
                    Profile Name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={newProfileName}
                    onChange={(e) => setNewProfileName(e.target.value)}
                    placeholder=""
                    className="flex-1 min-w-0 bg-white border border-[#CBD5E1] rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="sm:w-28 text-xs text-slate-800 font-semibold flex-shrink-0">
                    Permissions
                  </span>
                  <div className="flex items-center gap-4 text-xs text-slate-700">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newProfileSales}
                        onChange={(e) => setNewProfileSales(e.target.checked)}
                        className="rounded text-blue-600 accent-blue-600"
                      />
                      <span>Sales</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newProfileProject}
                        onChange={(e) => setNewProfileProject(e.target.checked)}
                        className="rounded text-blue-600 accent-blue-600"
                      />
                      <span>Project</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 px-4 py-3 bg-[#F1F5F9] border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddProfileModalOpen(false)}
                  className="px-4 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors shadow-2xs cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#0F2942] hover:bg-[#1E293B] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Add Opportunity Stage Modal ────────────────────────────────────────── */}
      <Modal
        isOpen={isAddStageModalOpen}
        onClose={() => setIsAddStageModalOpen(false)}
        title="Add Opportunity Stage"
        description="Create a new pipeline opportunity stage with custom color and abbreviation."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newStageForm.name) return;
            const newStage = {
              id: stagesList.length + 1,
              name: newStageForm.name,
              abbreviation: newStageForm.abbreviation,
              color: newStageForm.color,
              textColor: newStageForm.color,
            };
            setStagesList([...stagesList, newStage]);
            setNewStageForm({ name: '', abbreviation: '', color: '#2563EB' });
            setIsAddStageModalOpen(false);
          }}
          className="space-y-3.5 text-xs"
        >
          <Input
            label="Stage Name"
            required
            placeholder="e.g. Technical Verification"
            value={newStageForm.name}
            onChange={(e) => setNewStageForm({ ...newStageForm, name: e.target.value })}
          />
          <Input
            label="Abbreviation"
            placeholder="e.g. TV"
            value={newStageForm.abbreviation}
            onChange={(e) => setNewStageForm({ ...newStageForm, abbreviation: e.target.value })}
          />
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 block">Stage Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={newStageForm.color}
                onChange={(e) => setNewStageForm({ ...newStageForm, color: e.target.value })}
                className="w-10 h-8 rounded border border-slate-300 cursor-pointer p-0.5"
              />
              <span className="text-xs font-mono text-slate-600 uppercase">{newStageForm.color}</span>
              <div
                className="flex-1 h-7 rounded border border-slate-300"
                style={{ backgroundColor: newStageForm.color }}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddStageModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Stage
            </Button>
          </div>
        </form>
      </Modal>

      {/* ── Add Opportunity Lost Reason Modal ─────────────────────────────────── */}
      <Modal
        isOpen={isAddLostReasonModalOpen}
        onClose={() => setIsAddLostReasonModalOpen(false)}
        title="Add Opportunity Lost Reason"
        description="Create a new lost reason for pipeline deals."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newLostReasonText.trim()) return;
            const newReason = {
              id: lostReasonsList.length + 1,
              reason: newLostReasonText.trim(),
            };
            setLostReasonsList([...lostReasonsList, newReason]);
            setNewLostReasonText('');
            setIsAddLostReasonModalOpen(false);
          }}
          className="space-y-3.5 text-xs"
        >
          <Input
            label="Lost Reason"
            required
            placeholder="e.g. Budget Cancelled"
            value={newLostReasonText}
            onChange={(e) => setNewLostReasonText(e.target.value)}
          />
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddLostReasonModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Reason
            </Button>
          </div>
        </form>
      </Modal>

      {/* ── Add Source Modal ───────────────────────────────────────────────────── */}
      <Modal
        isOpen={isAddSourceModalOpen}
        onClose={() => setIsAddSourceModalOpen(false)}
        title="Add Lead / Deal Source"
        description="Define a new inbound/outbound source channel."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newSourceName.trim()) return;
            const newSrc = {
              id: sourcesList.length + 1,
              name: newSourceName.trim(),
            };
            setSourcesList([...sourcesList, newSrc]);
            setNewSourceName('');
            setIsAddSourceModalOpen(false);
          }}
          className="space-y-3.5 text-xs"
        >
          <Input
            label="Source Name"
            required
            placeholder="e.g. LinkedIn Ads"
            value={newSourceName}
            onChange={(e) => setNewSourceName(e.target.value)}
          />
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddSourceModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Source
            </Button>
          </div>
        </form>
      </Modal>

      {/* ── Add Industry Modal ─────────────────────────────────────────────────── */}
      <Modal
        isOpen={isAddIndustryModalOpen}
        onClose={() => setIsAddIndustryModalOpen(false)}
        title="Add Industry Category"
        description="Define a new industry sector classification for companies and leads."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newIndustryName.trim()) return;
            const newInd = {
              id: industriesList.length + 1,
              name: newIndustryName.trim(),
            };
            setIndustriesList([...industriesList, newInd]);
            setNewIndustryName('');
            setIsAddIndustryModalOpen(false);
          }}
          className="space-y-3.5 text-xs"
        >
          <Input
            label="Industry Name"
            required
            placeholder="e.g. Aerospace & Defense"
            value={newIndustryName}
            onChange={(e) => setNewIndustryName(e.target.value)}
          />
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddIndustryModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Industry
            </Button>
          </div>
        </form>
      </Modal>

      {/* ── Add Purchase Order Status Modal (+ STATUS) ───────────────────────── */}
      <Modal
        isOpen={isAddPoStageModalOpen}
        onClose={() => setIsAddPoStageModalOpen(false)}
        title="Add Purchase Order Status"
        description="Create a custom stage for the Purchase Order approval workflow."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newPoStageName.trim()) return;
            const newStage = {
              id: poStagesList.length + 1,
              name: newPoStageName.trim(),
              color: newPoStageColor,
            };
            setPoStagesList([...poStagesList, newStage]);
            setNewPoStageName('');
            setNewPoStageColor('#2563EB');
            setIsAddPoStageModalOpen(false);
          }}
          className="space-y-3.5 text-xs"
        >
          <Input
            label="Status / Stage Name"
            required
            placeholder="e.g. Under Technical Review"
            value={newPoStageName}
            onChange={(e) => setNewPoStageName(e.target.value)}
          />
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={newPoStageColor}
                onChange={(e) => setNewPoStageColor(e.target.value)}
                className="w-10 h-8 rounded border border-slate-300 cursor-pointer p-0.5"
              />
              <span className="text-xs font-mono text-slate-600 uppercase">{newPoStageColor}</span>
              <div
                className="flex-1 h-7 rounded flex items-center justify-center text-white font-bold text-xs shadow-2xs"
                style={{ backgroundColor: newPoStageColor }}
              >
                {newPoStageName || 'Preview Badge'}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddPoStageModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Status
            </Button>
          </div>
        </form>
      </Modal>

      {/* ── Add Approver Modal ───────────────────────────────────────────────── */}
      <Modal
        isOpen={isAddApproverModalOpen}
        onClose={() => setIsAddApproverModalOpen(false)}
        title="Add LPO Approver"
        description="Configure an approver level and monetary threshold for purchase orders."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newApproverRole.trim() || !newApproverUser.trim()) return;
            const newAppr = {
              id: poApproversList.length + 1,
              level: `Level ${poApproversList.length + 1}`,
              role: newApproverRole.trim(),
              user: newApproverUser.trim(),
              limit: newApproverLimit.trim() || 'AED 100,000',
              mandatory: true,
            };
            setPoApproversList([...poApproversList, newAppr]);
            setNewApproverRole('');
            setNewApproverUser('');
            setNewApproverLimit('');
            setIsAddApproverModalOpen(false);
          }}
          className="space-y-3.5 text-xs"
        >
          <Input
            label="Designation / Role"
            required
            placeholder="e.g. Finance Director"
            value={newApproverRole}
            onChange={(e) => setNewApproverRole(e.target.value)}
          />
          <Input
            label="Approver Name / User"
            required
            placeholder="e.g. MUSTHAFA CHIRAMMAL"
            value={newApproverUser}
            onChange={(e) => setNewApproverUser(e.target.value)}
          />
          <Input
            label="Threshold Limit"
            placeholder="e.g. AED 500,000"
            value={newApproverLimit}
            onChange={(e) => setNewApproverLimit(e.target.value)}
          />
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddApproverModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Approver
            </Button>
          </div>
        </form>
      </Modal>

      {/* ── Add Language Modal ───────────────────────────────────────────────── */}
      <Modal
        isOpen={isAddLanguageModalOpen}
        onClose={() => setIsAddLanguageModalOpen(false)}
        title="Add Language"
        description="Add a new UI and print language translation."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newLanguageName.trim()) return;
            const newLang = {
              id: languagesList.length + 1,
              name: newLanguageName.trim(),
              code: newLanguageCode.trim() || 'und',
              direction: 'LTR',
              status: 'Active',
            };
            setLanguagesList([...languagesList, newLang]);
            setNewLanguageName('');
            setNewLanguageCode('');
            setIsAddLanguageModalOpen(false);
          }}
          className="space-y-3.5 text-xs"
        >
          <Input
            label="Language Name"
            required
            placeholder="e.g. Italian (Italiano)"
            value={newLanguageName}
            onChange={(e) => setNewLanguageName(e.target.value)}
          />
          <Input
            label="ISO Code"
            placeholder="e.g. it-IT"
            value={newLanguageCode}
            onChange={(e) => setNewLanguageCode(e.target.value)}
          />
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddLanguageModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Language
            </Button>
          </div>
        </form>
      </Modal>

      {/* ── Add Country / Region Modal ───────────────────────────────────────── */}
      <Modal
        isOpen={isAddRegionModalOpen}
        onClose={() => setIsAddRegionModalOpen(false)}
        title="Add Country / Region"
        description="Configure a new country regional entity with tax rates and currency."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newRegionName.trim()) return;
            const newReg = {
              id: regionsList.length + 1,
              name: newRegionName.trim(),
              currency: newRegionCurrency.trim() || 'USD ($)',
              code: 'REG / +000',
              taxRate: '5%',
              status: 'Active',
            };
            setRegionsList([...regionsList, newReg]);
            setNewRegionName('');
            setNewRegionCurrency('');
            setIsAddRegionModalOpen(false);
          }}
          className="space-y-3.5 text-xs"
        >
          <Input
            label="Country / Region Name"
            required
            placeholder="e.g. Egypt"
            value={newRegionName}
            onChange={(e) => setNewRegionName(e.target.value)}
          />
          <Input
            label="Currency"
            placeholder="e.g. EGP (ج.م)"
            value={newRegionCurrency}
            onChange={(e) => setNewRegionCurrency(e.target.value)}
          />
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddRegionModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Region
            </Button>
          </div>
        </form>
      </Modal>

      {/* ── Add Designation Modal (Exact Cezcon CRM Reference Layout) ────────── */}
      {isAddDesignationModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-md shadow-2xl w-full max-w-[440px] overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white">
              <h3 className="text-sm font-semibold text-slate-800">Add Designation</h3>
              <button
                type="button"
                onClick={() => setIsAddDesignationModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 text-xs font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form Body */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const desName = newDesignationName.trim();
                if (!desName) return;
                const newDes = {
                  id: designationsList.length + 1,
                  name: desName,
                  department: newDesignationDept.trim() || 'Operations',
                  count: 0,
                };
                setDesignationsList([...designationsList, newDes]);
                setUserFormData((prev) => ({ ...prev, designation: desName }));
                setNewDesignationName('');
                setNewDesignationDept('');
                setIsAddDesignationModalOpen(false);
              }}
            >
              <div className="p-4 sm:p-5 bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="sm:w-28 text-xs text-slate-800 font-semibold flex-shrink-0">
                    Designation <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={newDesignationName}
                    onChange={(e) => setNewDesignationName(e.target.value)}
                    placeholder=""
                    className="flex-1 min-w-0 bg-white border border-[#CBD5E1] rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 px-4 py-3 bg-[#F1F5F9] border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddDesignationModalOpen(false)}
                  className="px-4 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors shadow-2xs cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#0F2942] hover:bg-[#1E293B] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Assign Worker Modal (Exact Cezcon CRM Reference Layout) ──────────── */}
      {assignWorkerUser && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-md shadow-2xl w-full max-w-[480px] max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-200 bg-white">
              <h3 className="text-sm font-semibold text-slate-800">Assign Worker</h3>
              <button
                type="button"
                onClick={() => setAssignWorkerUser(null)}
                className="text-slate-400 hover:text-slate-700 p-1 text-xs font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleAssignWorkerSubmit} className="flex flex-col flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6 bg-white space-y-4">
                {/* NEW / EXISTING Toggle Buttons */}
                <div className="flex items-center justify-center">
                  <div className="inline-flex rounded border border-slate-200 overflow-hidden shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setAssignWorkerTab('NEW')}
                      className={`px-4 py-1 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                        assignWorkerTab === 'NEW'
                          ? 'bg-[#16A34A] text-white'
                          : 'bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      NEW
                    </button>
                    <button
                      type="button"
                      onClick={() => setAssignWorkerTab('EXISTING')}
                      className={`px-4 py-1 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                        assignWorkerTab === 'EXISTING'
                          ? 'bg-[#16A34A] text-white'
                          : 'bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      EXISTING
                    </button>
                  </div>
                </div>

                {assignWorkerTab === 'NEW' ? (
                  <div className="space-y-3.5 pt-1">
                    {/* Worker Code */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                      <label className="sm:w-28 text-xs text-slate-700 font-medium flex-shrink-0">
                        Worker Code <span className="text-red-500 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={workerFormData.workerCode}
                        onChange={(e) => setWorkerFormData((prev) => ({ ...prev, workerCode: e.target.value }))}
                        className="flex-1 bg-white border border-[#CBD5E1] rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    {/* Grade */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                      <label className="sm:w-28 text-xs text-slate-700 font-medium flex-shrink-0">
                        Grade <span className="text-red-500 font-bold">*</span>
                      </label>
                      <select
                        value={workerFormData.grade}
                        onChange={(e) => setWorkerFormData((prev) => ({ ...prev, grade: e.target.value }))}
                        className="flex-1 bg-white border border-[#CBD5E1] rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                      >
                        <option value="Select">Select</option>
                        <option value="Grade 1">Grade 1</option>
                        <option value="Grade 2">Grade 2</option>
                        <option value="Grade 3">Grade 3</option>
                        <option value="Master Technician">Master Technician</option>
                        <option value="Senior Technician">Senior Technician</option>
                        <option value="Junior Technician">Junior Technician</option>
                        <option value="Helper">Helper</option>
                      </select>
                    </div>

                    {/* Hourly Rate */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                      <label className="sm:w-28 text-xs text-slate-700 font-medium flex-shrink-0 flex items-center gap-1">
                        <span>Hourly Rate</span>
                        <span title="Hourly rate in AED for work orders and job costs" className="cursor-help">
                          <Info className="w-3.5 h-3.5 text-slate-400 inline" />
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="0.00"
                        value={workerFormData.hourlyRate}
                        onChange={(e) => setWorkerFormData((prev) => ({ ...prev, hourlyRate: e.target.value }))}
                        className="flex-1 bg-white border border-[#CBD5E1] rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    {/* Joining Date */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                      <label className="sm:w-28 text-xs text-slate-700 font-medium flex-shrink-0">
                        Joining Date
                      </label>
                      <input
                        type="text"
                        value={workerFormData.joiningDate}
                        onChange={(e) => setWorkerFormData((prev) => ({ ...prev, joiningDate: e.target.value }))}
                        placeholder="DD-MM-YYYY"
                        className="flex-1 bg-white border border-[#CBD5E1] rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3.5 pt-1">
                    {/* Select Existing Worker */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                      <label className="sm:w-28 text-xs text-slate-700 font-medium flex-shrink-0">
                        Select Worker <span className="text-red-500 font-bold">*</span>
                      </label>
                      <select
                        required
                        value={workerFormData.existingWorker}
                        onChange={(e) => setWorkerFormData((prev) => ({ ...prev, existingWorker: e.target.value }))}
                        className="flex-1 bg-white border border-[#CBD5E1] rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                      >
                        <option value="">Select Existing Worker</option>
                        {cezconUsersList
                          .filter((usr) => usr.profileType === 'Worker' || usr.isWorker)
                          .map((w) => (
                            <option key={w.id} value={w.name}>
                              {w.name} ({w.workerCode || `WRK-${w.id}`})
                            </option>
                          ))}
                        <option value="Worker - Field Lead (WRK-001)">Worker - Field Lead (WRK-001)</option>
                        <option value="Worker - Senior Installer (WRK-002)">Worker - Senior Installer (WRK-002)</option>
                        <option value="Worker - Maintenance Tech (WRK-003)">Worker - Maintenance Tech (WRK-003)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Orange Notice Warning */}
                <div className="pt-2">
                  <p className="text-[11px] text-[#EA580C] italic leading-tight">
                    Once a worker is assigned, the user will be automatically logged out of the web application and needs to log in again.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 px-4 sm:px-5 py-3 bg-[#F1F5F9] border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setAssignWorkerUser(null)}
                  className="px-4 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors shadow-2xs cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#0F2942] hover:bg-[#1E293B] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Add Expense Type Modal (+ EXPENSE TYPE) ──────────────────────────── */}
      <Modal
        isOpen={isAddExpenseTypeModalOpen}
        onClose={() => setIsAddExpenseTypeModalOpen(false)}
        title="Add Expense Type"
        description="Create a new expense line-item type for campaign budgets."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newExpenseTypeName.trim()) return;
            const newExp = {
              id: expenseTypesList.length + 1,
              name: newExpenseTypeName.trim(),
            };
            setExpenseTypesList([...expenseTypesList, newExp]);
            setNewExpenseTypeName('');
            setIsAddExpenseTypeModalOpen(false);
          }}
          className="space-y-3.5 text-xs"
        >
          <Input
            label="Expense Type Name"
            required
            placeholder="e.g. Influencer Collaboration"
            value={newExpenseTypeName}
            onChange={(e) => setNewExpenseTypeName(e.target.value)}
          />
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddExpenseTypeModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Expense Type
            </Button>
          </div>
        </form>
      </Modal>

      {/* ── Add Campaign Type Modal (+ CAMPAIGN TYPE) ────────────────────────── */}
      <Modal
        isOpen={isAddCampaignTypeModalOpen}
        onClose={() => setIsAddCampaignTypeModalOpen(false)}
        title="Add Campaign Type"
        description="Define a new marketing or outreach channel type."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newCampaignTypeName.trim()) return;
            const newType = {
              id: campaignTypesList.length + 1,
              name: newCampaignTypeName.trim(),
            };
            setCampaignTypesList([...campaignTypesList, newType]);
            setNewCampaignTypeName('');
            setIsAddCampaignTypeModalOpen(false);
          }}
          className="space-y-3.5 text-xs"
        >
          <Input
            label="Campaign Type Name"
            required
            placeholder="e.g. WhatsApp Broadcast"
            value={newCampaignTypeName}
            onChange={(e) => setNewCampaignTypeName(e.target.value)}
          />
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddCampaignTypeModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Campaign Type
            </Button>
          </div>
        </form>
      </Modal>

      {/* ── Add Campaign Status Modal (+ CAMPAIGN STATUS) ────────────────────── */}
      <Modal
        isOpen={isAddCampaignStatusModalOpen}
        onClose={() => setIsAddCampaignStatusModalOpen(false)}
        title="Add Campaign Status"
        description="Create a status workflow stage for campaigns."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newCampaignStatusName.trim()) return;
            const newStatus = {
              id: campaignStatusesList.length + 1,
              name: newCampaignStatusName.trim(),
              color: newCampaignStatusColor,
            };
            setCampaignStatusesList([...campaignStatusesList, newStatus]);
            setNewCampaignStatusName('');
            setNewCampaignStatusColor('#2563EB');
            setIsAddCampaignStatusModalOpen(false);
          }}
          className="space-y-3.5 text-xs"
        >
          <Input
            label="Status Name"
            required
            placeholder="e.g. Review Pending"
            value={newCampaignStatusName}
            onChange={(e) => setNewCampaignStatusName(e.target.value)}
          />
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={newCampaignStatusColor}
                onChange={(e) => setNewCampaignStatusColor(e.target.value)}
                className="w-10 h-8 rounded border border-slate-300 cursor-pointer p-0.5"
              />
              <span className="text-xs font-mono text-slate-600 uppercase">{newCampaignStatusColor}</span>
              <div
                className="flex-1 h-7 rounded flex items-center justify-center text-white font-bold text-xs shadow-2xs"
                style={{ backgroundColor: newCampaignStatusColor }}
              >
                {newCampaignStatusName || 'Preview Badge'}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddCampaignStatusModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Status
            </Button>
          </div>
        </form>
      </Modal>

      {/* ── Add Tag Modal (+ TAG) ────────────────────────────────────────────── */}
      <Modal
        isOpen={isAddTagModalOpen}
        onClose={() => setIsAddTagModalOpen(false)}
        title="Add Business Tag"
        description="Create a new tag to categorize leads, opportunities, and customers."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newTagInput.trim()) return;
            const newTag = {
              id: tagsList.length + 1,
              name: newTagInput.trim(),
            };
            setTagsList([...tagsList, newTag]);
            setNewTagInput('');
            setIsAddTagModalOpen(false);
          }}
          className="space-y-3.5 text-xs"
        >
          <Input
            label="Tag Name"
            required
            placeholder="e.g. Annual Maintenance Contract"
            value={newTagInput}
            onChange={(e) => setNewTagInput(e.target.value)}
          />
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddTagModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Tag
            </Button>
          </div>
        </form>
      </Modal>

      {/* ── Delete User Confirmation Modal ────────────────────────────────────── */}
      <Modal
        isOpen={isDeleteUserModalOpen}
        onClose={() => {
          setIsDeleteUserModalOpen(false);
          setUserToDelete(null);
        }}
        title="Delete User Record"
        description="Permanently remove this user record from the system."
      >
        <div className="space-y-4 text-xs">
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-md text-rose-800 flex items-start gap-2.5">
            <Trash2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[13px]">Are you sure you want to delete this user?</p>
              <p className="text-rose-600 mt-1">
                You are about to permanently remove <span className="font-bold">{userToDelete?.name}</span> ({userToDelete?.email || userToDelete?.username}). This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setIsDeleteUserModalOpen(false);
                setUserToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => {
                if (!userToDelete) return;
                const updated = cezconUsersList.filter((usr) => usr.id !== userToDelete.id);
                setCezconUsersList(updated);
                try {
                  localStorage.setItem('cezcon_crm_users_list', JSON.stringify(updated));
                } catch (err) {
                  console.error(err);
                }
                setIsDeleteUserModalOpen(false);
                setUserToDelete(null);
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
              }}
            >
              Delete User
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}





