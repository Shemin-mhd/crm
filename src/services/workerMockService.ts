import {
  WorkerTask,
  WorkerShiftAttendance,
  WorkerMaterialRequest,
  WorkerTimesheetEntry,
  WorkerProfileData,
  WorkerTaskStatus,
} from '@/types/worker';

const INITIAL_WORKER_TASKS: WorkerTask[] = [
  {
    id: 'wt_001',
    taskNumber: 'TSK-8921',
    title: 'Emergency Chiller Compressor Pressure Drop Fix',
    serviceType: 'HVAC Emergency Service',
    priority: 'Urgent',
    status: 'In Progress',
    clientName: 'Rashid Al Nuaimi',
    clientCompany: 'Emaar Hospitality Group',
    clientPhone: '+971 50 892 4112',
    clientEmail: 'rashid.nuaimi@emaar.ae',
    address: 'Address Downtown, Sheikh Mohammed bin Rashid Blvd, Floor B2 Chiller Room',
    cityArea: 'Downtown Dubai',
    scheduledDate: '2026-09-25',
    scheduledTime: '09:00 AM - 12:30 PM',
    estimatedHours: 3.5,
    actualHoursSpent: 1.8,
    assignedManager: 'Alex Rivera (Operations Manager)',
    description: 'Compressor 3 showing delta pressure error code E-409. Check refrigerant leak, test suction valve transducer, and replenish R410A.',
    checklist: [
      { id: 'chk_1', label: 'Safety Lockout & Tagout (LOTO) verified', completed: true, required: true },
      { id: 'chk_2', label: 'Inspect suction pressure gauge readings (target > 115 PSI)', completed: true, required: true },
      { id: 'chk_3', label: 'Perform electronic halogen refrigerant leak test', completed: false, required: true },
      { id: 'chk_4', label: 'Replace compressor oil filter element if clogged', completed: false, required: false },
      { id: 'chk_5', label: 'Test run under full load for 15 mins and log temp delta', completed: false, required: true },
    ],
    partsUsed: [
      { id: 'p_1', partCode: 'REF-R410A', partName: 'R-410A Refrigerant Gas Canister', quantity: 2, unitCost: 180 },
      { id: 'p_2', partCode: 'FLT-OIL-300', partName: 'Copeland Compressor Oil Filter', quantity: 1, unitCost: 95 },
    ],
    technicianNotes: 'LOTO completed. Identified minor fitting seep on low pressure valve #2. Tightened torque to 45Nm. Now proceeding with recharge.',
  },
  {
    id: 'wt_002',
    taskNumber: 'TSK-8924',
    title: 'Quarterly Preventative AHU Filtration & Coil Disinfection',
    serviceType: 'AHU Routine Maintenance',
    priority: 'High',
    status: 'Accepted',
    clientName: 'David Sterling',
    clientCompany: 'Al Futtaim Tower Management',
    clientPhone: '+971 55 319 8840',
    clientEmail: 'd.sterling@alfuttaim.com',
    address: 'Festival City Tower 2, AHU Room Level 14',
    cityArea: 'Dubai Festival City',
    scheduledDate: '2026-09-25',
    scheduledTime: '01:30 PM - 04:30 PM',
    estimatedHours: 3.0,
    assignedManager: 'Alex Rivera (Operations Manager)',
    description: 'Replace HEPA pre-filters on 4 Air Handling Units, pressure wash evaporator coils with approved foaming surfactant, and test belt tension.',
    checklist: [
      { id: 'chk_201', label: 'Shut down VAV zones and air dampers', completed: false, required: true },
      { id: 'chk_202', label: 'Extract dirty MERV-13 air filter packs', completed: false, required: true },
      { id: 'chk_203', label: 'Apply antimicrobial coil cleaning foam wash', completed: false, required: true },
      { id: 'chk_204', label: 'Check V-Belt deflection (target 12mm under 2kg load)', completed: false, required: true },
      { id: 'chk_205', label: 'Record CFM airflow on anemometer post-service', completed: false, required: true },
    ],
    partsUsed: [],
    technicianNotes: '',
  },
  {
    id: 'wt_003',
    taskNumber: 'TSK-8929',
    title: 'Ducted Split AC Thermostat Calibration & Sensor Swap',
    serviceType: 'Commercial AC Repair',
    priority: 'Normal',
    status: 'Pending',
    clientName: 'Sarah Jenkins',
    clientCompany: 'Jumeirah Living Residences',
    clientPhone: '+971 52 770 1290',
    clientEmail: 's.jenkins@jumeirahres.com',
    address: 'Villa 42, Palm Jumeirah Frond M',
    cityArea: 'Palm Jumeirah',
    scheduledDate: '2026-09-25',
    scheduledTime: '05:00 PM - 06:30 PM',
    estimatedHours: 1.5,
    assignedManager: 'Alex Rivera (Operations Manager)',
    description: 'Master bedroom unit blowing warm intermittently. Customer reported room sensor drift by +4 degrees Celsius.',
    checklist: [
      { id: 'chk_301', label: 'Check supply air temp vs return air temp delta', completed: false, required: true },
      { id: 'chk_302', label: 'Calibrate Honeywell Smart Thermostat sensor', completed: false, required: true },
      { id: 'chk_303', label: 'Inspect condensate drainage tray for blockage', completed: false, required: false },
    ],
    partsUsed: [],
  },
  {
    id: 'wt_004',
    taskNumber: 'TSK-8890',
    title: 'VRF Multi-Split System Commissioning & Nitrogen Test',
    serviceType: 'System Commissioning',
    priority: 'High',
    status: 'Completed',
    clientName: 'Eng. Tareq Mansoor',
    clientCompany: 'Damac Properties Projects',
    clientPhone: '+971 50 144 9870',
    clientEmail: 'tareq.m@damac.com',
    address: 'Damac Hills 2, Community Clubhouse Plant Room',
    cityArea: 'Damac Hills',
    scheduledDate: '2026-09-24',
    scheduledTime: '10:00 AM - 02:00 PM',
    estimatedHours: 4.0,
    actualHoursSpent: 3.8,
    assignedManager: 'Alex Rivera (Operations Manager)',
    description: 'Full system pressure hold test with 550 PSI Nitrogen for 24 hours. Vacuum dehydration down to 500 microns followed by factory refrigerant charge.',
    checklist: [
      { id: 'chk_401', label: '550 PSI Nitrogen 24h pressure test verified', completed: true, required: true },
      { id: 'chk_402', label: 'Dual stage vacuum pulled to 420 microns', completed: true, required: true },
      { id: 'chk_403', label: 'Precise electronic scale gas charging (14.2 kg)', completed: true, required: true },
      { id: 'chk_404', label: 'Customer engineer live inspection & signoff', completed: true, required: true },
    ],
    partsUsed: [
      { id: 'p_401', partCode: 'NIT-CYL', partName: 'High-Purity Nitrogen Cyl 50L', quantity: 1, unitCost: 120 },
      { id: 'p_402', partCode: 'REF-R410A', partName: 'R-410A Refrigerant Gas Drum 11.3kg', quantity: 2, unitCost: 280 },
    ],
    technicianNotes: 'All 8 indoor units running flawlessly with 11.2C supply air temp. Client signed digital inspection sheet.',
    customerSignedBy: 'Eng. Tareq Mansoor (Damac QC)',
    customerSignature: 'Tareq Mansoor Signed',
    signedAt: '2026-09-24 13:48',
    rating: 5,
    customerFeedback: 'Outstanding professional technician. Timely execution and spotless clean work area.',
  },
];

const INITIAL_MATERIAL_REQUESTS: WorkerMaterialRequest[] = [
  {
    id: 'req_001',
    requestNumber: 'REQ-7721',
    taskNumber: 'TSK-8921',
    itemCode: 'VAL-TXV-05',
    itemName: 'Danfoss Thermostatic Expansion Valve (TXV) 5 Ton',
    category: 'Valves & Controls',
    quantity: 1,
    unit: 'Pcs',
    urgency: 'Critical (Site Stopped)',
    status: 'Approved',
    requestedAt: '2026-09-25 08:30',
    approvedBy: 'Alex Rivera (Operations Manager)',
    notes: 'Required for Downtown Chiller restoration.',
  },
  {
    id: 'req_002',
    requestNumber: 'REQ-7724',
    taskNumber: 'TSK-8924',
    itemCode: 'FLT-MERV-13',
    itemName: 'Camfil MERV-13 Pleated Synthetic Air Filter 24x24x2',
    category: 'Filters',
    quantity: 16,
    unit: 'Pcs',
    urgency: 'Standard',
    status: 'Dispatched',
    requestedAt: '2026-09-25 09:15',
    approvedBy: 'Alex Rivera (Operations Manager)',
    notes: 'Festival City scheduled replacement.',
  },
  {
    id: 'req_003',
    requestNumber: 'REQ-7730',
    itemCode: 'VAC-OIL-1L',
    itemName: 'Robinair High Vacuum Pump Oil 1 Litre',
    category: 'Consumables',
    quantity: 2,
    unit: 'Ltr',
    urgency: 'Standard',
    status: 'Pending Approval',
    requestedAt: '2026-09-25 11:00',
    notes: 'Toolbox replenishment for field van #7.',
  },
];

const INITIAL_TIMESHEET: WorkerTimesheetEntry[] = [
  {
    id: 'ts_001',
    date: '2026-09-24',
    taskNumber: 'TSK-8890',
    taskTitle: 'VRF Multi-Split System Commissioning & Nitrogen Test',
    clientName: 'Damac Properties Projects',
    regularHours: 7.0,
    overtimeHours: 1.5,
    status: 'Approved',
    workSummary: 'Nitrogen leak test, dehydration, and 14kg gas charging. Handed over to client engineer.',
  },
  {
    id: 'ts_002',
    date: '2026-09-23',
    taskNumber: 'TSK-8865',
    taskTitle: 'Chilled Water Fan Coil Unit (FCU) Motor Replacement',
    clientName: 'Nakheel Retail Properties',
    regularHours: 6.5,
    overtimeHours: 0.0,
    status: 'Approved',
    workSummary: 'Swapped burned ECM blower motor and tested 3-speed controller modulation.',
  },
  {
    id: 'ts_003',
    date: '2026-09-22',
    taskNumber: 'TSK-8840',
    taskTitle: 'Emergency Water Condenser Descaling',
    clientName: 'Al Habtoor Grand Hotel',
    regularHours: 8.0,
    overtimeHours: 2.0,
    status: 'Approved',
    workSummary: 'Circulated acid descaler solution for 4 hours, flushed with neutralizer. Delta T improved from 3C to 6.2C.',
  },
];

export const WORKER_PROFILE_DEFAULT: WorkerProfileData = {
  id: 'usr_worker_001',
  workerCode: 'WRK-2049',
  name: 'Jordan Hayes',
  email: 'worker@cooltechuae.com',
  phone: '+971 54 812 9901',
  role: 'Technician',
  skillLevel: 'Senior Master Tech',
  department: 'Field HVAC Operations & Heavy Chillers',
  assignedManager: 'Alex Rivera (Operations Manager)',
  assignedVehicle: 'Toyota HiAce Service Van #07 (DXB 48291)',
  driverLicenseNumber: 'UAE-DXB-994821',
  emergencyContact: {
    name: 'Elena Hayes',
    relationship: 'Spouse',
    phone: '+971 55 981 3320',
  },
  metrics: {
    completedJobs: 142,
    onTimeRate: 98.6,
    averageRating: 4.95,
    hoursThisMonth: 168,
    safetyScore: 100,
  },
};

export const workerMockService = {
  // ── TASKS ──
  getTasks(): WorkerTask[] {
    if (typeof window === 'undefined') return INITIAL_WORKER_TASKS;
    try {
      const stored = localStorage.getItem('cool_worker_tasks');
      if (stored) return JSON.parse(stored);
      localStorage.setItem('cool_worker_tasks', JSON.stringify(INITIAL_WORKER_TASKS));
      return INITIAL_WORKER_TASKS;
    } catch {
      return INITIAL_WORKER_TASKS;
    }
  },

  getTaskById(id: string): WorkerTask | undefined {
    const tasks = this.getTasks();
    return tasks.find((t) => t.id === id || t.taskNumber === id);
  },

  updateTaskStatus(taskId: string, newStatus: WorkerTaskStatus, notes?: string): WorkerTask | null {
    const tasks = this.getTasks();
    const idx = tasks.findIndex((t) => t.id === taskId || t.taskNumber === taskId);
    if (idx === -1) return null;

    tasks[idx].status = newStatus;
    if (notes !== undefined) {
      tasks[idx].technicianNotes = notes;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('cool_worker_tasks', JSON.stringify(tasks));
    }
    return tasks[idx];
  },

  updateTaskChecklist(taskId: string, checklistItemId: string, completed: boolean): WorkerTask | null {
    const tasks = this.getTasks();
    const idx = tasks.findIndex((t) => t.id === taskId || t.taskNumber === taskId);
    if (idx === -1) return null;

    tasks[idx].checklist = tasks[idx].checklist.map((item) =>
      item.id === checklistItemId ? { ...item, completed } : item
    );

    if (typeof window !== 'undefined') {
      localStorage.setItem('cool_worker_tasks', JSON.stringify(tasks));
    }
    return tasks[idx];
  },

  addPartUsed(taskId: string, part: { partCode: string; partName: string; quantity: number; unitCost: number }): WorkerTask | null {
    const tasks = this.getTasks();
    const idx = tasks.findIndex((t) => t.id === taskId || t.taskNumber === taskId);
    if (idx === -1) return null;

    const newPart = {
      id: `p_${Date.now()}`,
      ...part,
    };
    tasks[idx].partsUsed.push(newPart);

    if (typeof window !== 'undefined') {
      localStorage.setItem('cool_worker_tasks', JSON.stringify(tasks));
    }
    return tasks[idx];
  },

  completeTaskWithSignOff(
    taskId: string,
    data: {
      customerSignedBy: string;
      customerSignature: string;
      notes: string;
      rating?: number;
      actualHoursSpent?: number;
    }
  ): WorkerTask | null {
    const tasks = this.getTasks();
    const idx = tasks.findIndex((t) => t.id === taskId || t.taskNumber === taskId);
    if (idx === -1) return null;

    tasks[idx].status = 'Completed';
    tasks[idx].customerSignedBy = data.customerSignedBy;
    tasks[idx].customerSignature = data.customerSignature;
    tasks[idx].technicianNotes = data.notes;
    tasks[idx].rating = data.rating || 5;
    tasks[idx].actualHoursSpent = data.actualHoursSpent || tasks[idx].estimatedHours;
    tasks[idx].signedAt = new Date().toISOString().replace('T', ' ').slice(0, 16);

    if (typeof window !== 'undefined') {
      localStorage.setItem('cool_worker_tasks', JSON.stringify(tasks));
    }
    return tasks[idx];
  },

  // ── ATTENDANCE & LIVE CLOCK-IN ──
  getAttendance(): WorkerShiftAttendance {
    const defaultAttendance: WorkerShiftAttendance = {
      isClockedIn: true,
      clockInTime: '08:00 AM',
      activeDurationSeconds: 14400, // 4 hours
      currentLocation: 'Downtown Dubai Depot & Field Unit',
      todayDate: new Date().toLocaleDateString('en-GB'),
      breakDurationMinutes: 15,
    };
    if (typeof window === 'undefined') return defaultAttendance;
    try {
      const stored = localStorage.getItem('cool_worker_attendance');
      if (stored) return JSON.parse(stored);
      localStorage.setItem('cool_worker_attendance', JSON.stringify(defaultAttendance));
      return defaultAttendance;
    } catch {
      return defaultAttendance;
    }
  },

  toggleClockIn(): WorkerShiftAttendance {
    const current = this.getAttendance();
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const updated: WorkerShiftAttendance = {
      ...current,
      isClockedIn: !current.isClockedIn,
      clockInTime: !current.isClockedIn ? timeStr : current.clockInTime,
      clockOutTime: current.isClockedIn ? timeStr : undefined,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('cool_worker_attendance', JSON.stringify(updated));
    }
    return updated;
  },

  // ── MATERIAL REQUESTS ──
  getMaterialRequests(): WorkerMaterialRequest[] {
    if (typeof window === 'undefined') return INITIAL_MATERIAL_REQUESTS;
    try {
      const stored = localStorage.getItem('cool_worker_requests');
      if (stored) return JSON.parse(stored);
      localStorage.setItem('cool_worker_requests', JSON.stringify(INITIAL_MATERIAL_REQUESTS));
      return INITIAL_MATERIAL_REQUESTS;
    } catch {
      return INITIAL_MATERIAL_REQUESTS;
    }
  },

  createMaterialRequest(request: Omit<WorkerMaterialRequest, 'id' | 'requestNumber' | 'requestedAt' | 'status'>): WorkerMaterialRequest {
    const requests = this.getMaterialRequests();
    const newReq: WorkerMaterialRequest = {
      id: `req_${Date.now()}`,
      requestNumber: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      requestedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Pending Approval',
      ...request,
    };

    requests.unshift(newReq);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cool_worker_requests', JSON.stringify(requests));
    }
    return newReq;
  },

  // ── TIMESHEET ──
  getTimesheet(): WorkerTimesheetEntry[] {
    if (typeof window === 'undefined') return INITIAL_TIMESHEET;
    try {
      const stored = localStorage.getItem('cool_worker_timesheet');
      if (stored) return JSON.parse(stored);
      localStorage.setItem('cool_worker_timesheet', JSON.stringify(INITIAL_TIMESHEET));
      return INITIAL_TIMESHEET;
    } catch {
      return INITIAL_TIMESHEET;
    }
  },

  addTimesheetEntry(entry: Omit<WorkerTimesheetEntry, 'id' | 'status'>): WorkerTimesheetEntry {
    const entries = this.getTimesheet();
    const newEntry: WorkerTimesheetEntry = {
      id: `ts_${Date.now()}`,
      status: 'Submitted',
      ...entry,
    };
    entries.unshift(newEntry);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cool_worker_timesheet', JSON.stringify(entries));
    }
    return newEntry;
  },

  // ── PROFILE ──
  getProfile(): WorkerProfileData {
    return WORKER_PROFILE_DEFAULT;
  },
};
