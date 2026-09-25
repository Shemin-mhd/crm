import {
  TechnicianWorkload,
  ManagerTask,
  LeadAssignmentItem,
  OpportunityItem,
  ActivityItem,
  PerformanceMetric,
} from '@/types/manager';

const INITIAL_TECHNICIANS: TechnicianWorkload[] = [
  {
    id: 'tech_01',
    name: 'Tariq Mansour',
    role: 'Senior HVAC Field Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120',
    status: 'On Field',
    assignedTasks: 4,
    completedToday: 2,
    capacityPercentage: 85,
    currentLocation: 'Mussafah Zone 12, Abu Dhabi',
    specialization: 'Commercial Chillers & VRF',
    phone: '+971 50 123 4567',
  },
  {
    id: 'tech_02',
    name: 'Zayed Al Qasimi',
    role: 'HVAC Maintenance Specialist',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120',
    status: 'Available',
    assignedTasks: 2,
    completedToday: 3,
    capacityPercentage: 45,
    currentLocation: 'Khalidiya Hub, Abu Dhabi',
    specialization: 'Preventive AMC & Duct Cleaning',
    phone: '+971 55 987 6543',
  },
  {
    id: 'tech_03',
    name: 'Bilal Ahmed',
    role: 'Automation & Controls Tech',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120',
    status: 'Overloaded',
    assignedTasks: 6,
    completedToday: 1,
    capacityPercentage: 98,
    currentLocation: 'Al Reem Island, Sector 4',
    specialization: 'BMS & Smart Thermostat Systems',
    phone: '+971 52 456 7890',
  },
  {
    id: 'tech_04',
    name: 'Imran Shah',
    role: 'Field Service Technician',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
    status: 'Available',
    assignedTasks: 1,
    completedToday: 4,
    capacityPercentage: 30,
    currentLocation: 'Hamdan Street Centre',
    specialization: 'Package Units & Split AC',
    phone: '+971 56 345 6789',
  },
  {
    id: 'tech_05',
    name: 'Hamza Farooq',
    role: 'Site Inspection Lead',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120',
    status: 'On Field',
    assignedTasks: 3,
    completedToday: 2,
    capacityPercentage: 70,
    currentLocation: 'Yas Island Commercial Zone',
    specialization: 'Energy Audits & Site Survey',
    phone: '+971 54 876 5432',
  },
];

const INITIAL_TASKS: ManagerTask[] = [
  {
    id: 'TSK-1092',
    title: 'Emergency Chiller Compressor Overhaul',
    customerName: 'Lumina Health Tower',
    assignedTo: 'Tariq Mansour',
    assignedToAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120',
    priority: 'Urgent',
    status: 'In Progress',
    dueDate: '25-09-2026',
    slaDeadline: '4 Hours (SLA Alert)',
    category: 'HVAC Repair',
    location: 'Tower A, Floor B2 Chiller Plant',
  },
  {
    id: 'TSK-1093',
    title: 'Quarterly Preventive Maintenance Inspection',
    customerName: 'Apex Logistics Complex',
    assignedTo: 'Zayed Al Qasimi',
    assignedToAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '26-09-2026',
    slaDeadline: '24 Hours',
    category: 'Maintenance',
    location: 'Warehouse Bay 4-8, Mussafah',
  },
  {
    id: 'TSK-1094',
    title: 'BMS Central Control Valve Calibration',
    customerName: 'Metro Infrastructure HQ',
    assignedTo: 'Bilal Ahmed',
    assignedToAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120',
    priority: 'High',
    status: 'Overdue',
    dueDate: '24-09-2026',
    slaDeadline: 'Breached (2h 15m)',
    category: 'Installation',
    location: 'Main Server & Control Room',
  },
  {
    id: 'TSK-1095',
    title: 'Condenser Coil Replacement & Gas Refill',
    customerName: 'Emirates Commercial Plaza',
    assignedTo: 'Imran Shah',
    assignedToAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
    priority: 'High',
    status: 'Completed',
    dueDate: '25-09-2026',
    slaDeadline: 'Met with 100% SLA',
    category: 'HVAC Repair',
    location: 'Rooftop Unit #7',
  },
];

const INITIAL_OPPORTUNITIES: OpportunityItem[] = [
  {
    id: 'OPP-801',
    title: 'Annual HVAC Chiller Maintenance Contract 2026-27',
    client: 'Al Ain Hospital Group',
    stage: 'Under Approval',
    value: 480000,
    probability: 85,
    owner: 'Alex Rivera (Ops Manager)',
    expectedCloseDate: '30-09-2026',
  },
  {
    id: 'OPP-802',
    title: 'Industrial VRF Air Filtration Retrofit',
    client: 'Etihad Warehousing Hub',
    stage: 'Quotation Sent',
    value: 295000,
    probability: 60,
    owner: 'Sales Operations',
    expectedCloseDate: '05-10-2026',
  },
  {
    id: 'OPP-803',
    title: 'Smart Thermostat & Energy Saving Automation',
    client: 'Yas Marina Residential Towers',
    stage: 'Negotiation',
    value: 175000,
    probability: 75,
    owner: 'Tariq Mansour',
    expectedCloseDate: '12-10-2026',
  },
];

const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'ACT-01',
    type: 'Site Visit',
    title: 'Emergency Site Inspection for Chiller Failure',
    contactPerson: 'Eng. Khalid Al Mazrouei',
    time: '11:30 AM',
    date: '25-09-2026',
    status: 'Scheduled',
    notes: 'Confirm refrigerant leaks and compressor warranty status.',
  },
  {
    id: 'ACT-02',
    type: 'Meeting',
    title: 'Operations Team Daily Capacity Briefing',
    contactPerson: 'Field Technicians Team',
    time: '08:30 AM',
    date: '25-09-2026',
    status: 'Completed',
    notes: 'Allocated 14 pending jobs across Mussafah and Yas zones.',
  },
  {
    id: 'ACT-03',
    type: 'Call',
    title: 'Customer SLA Follow-up & Satisfaction Call',
    contactPerson: 'Sarah Jenkins (Apex Logistics)',
    time: '02:00 PM',
    date: '25-09-2026',
    status: 'Scheduled',
  },
];

export const managerMockService = {
  async getTechnicians(): Promise<TechnicianWorkload[]> {
    if (typeof window === 'undefined') return INITIAL_TECHNICIANS;
    try {
      const saved = localStorage.getItem('crm_manager_technicians');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TECHNICIANS;
  },

  async getTasks(): Promise<ManagerTask[]> {
    if (typeof window === 'undefined') return INITIAL_TASKS;
    try {
      const saved = localStorage.getItem('crm_manager_tasks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TASKS;
  },

  async assignTask(task: Omit<ManagerTask, 'id'>): Promise<ManagerTask> {
    const tasks = await this.getTasks();
    const newTask: ManagerTask = {
      ...task,
      id: `TSK-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    const updated = [newTask, ...tasks];
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('crm_manager_tasks', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
    return newTask;
  },

  async getOpportunities(): Promise<OpportunityItem[]> {
    return INITIAL_OPPORTUNITIES;
  },

  async getActivities(): Promise<ActivityItem[]> {
    return INITIAL_ACTIVITIES;
  },

  async getPerformanceMetrics(): Promise<PerformanceMetric[]> {
    return [
      {
        title: 'Team SLA Compliance',
        value: '94.8%',
        target: '95.0%',
        growth: '+3.2%',
        isPositive: true,
        period: 'This Month',
      },
      {
        title: 'Avg Task Turnaround',
        value: '3.4 hrs',
        target: '4.0 hrs',
        growth: '-18%',
        isPositive: true,
        period: 'vs Last Month',
      },
      {
        title: 'Active Workload Capacity',
        value: '72.5%',
        target: '80.0%',
        growth: 'Balanced',
        isPositive: true,
        period: '5 Field Techs',
      },
      {
        title: 'Deals in Pipeline',
        value: 'AED 950K',
        target: 'AED 800K',
        growth: '+18.7%',
        isPositive: true,
        period: 'Q3 2026',
      },
    ];
  },
};
