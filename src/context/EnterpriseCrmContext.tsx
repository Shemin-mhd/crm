'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  CrmTask,
  CrmLead,
  CrmCustomer,
  CrmSalesOpportunity,
  CrmPurchaseStock,
  CrmCampaign,
  CrmUser,
  PermissionRule,
  UserRole,
  DealStage,
} from '@/types/enterprise-crm';
import {
  mockTasks,
  mockLeads,
  mockCustomers,
  mockSalesOpportunities,
  mockPurchaseStocks,
  mockCampaigns,
  mockUsers,
  mockRbacRules,
} from '@/data/mockEnterpriseData';

interface EnterpriseCrmContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  tasks: CrmTask[];
  leads: CrmLead[];
  customers: CrmCustomer[];
  salesOpportunities: CrmSalesOpportunity[];
  purchaseStocks: CrmPurchaseStock[];
  campaigns: CrmCampaign[];
  users: CrmUser[];
  rbacRules: PermissionRule[];

  // Global Search
  globalSearch: string;
  setGlobalSearch: (search: string) => void;

  // Actions
  addTask: (task: Omit<CrmTask, 'id' | 'slNo'>) => void;
  updateTask: (id: string, updated: Partial<CrmTask>) => void;
  toggleTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void;

  addLead: (lead: Omit<CrmLead, 'id' | 'slNo'>) => void;
  updateLead: (id: string, updated: Partial<CrmLead>) => void;
  deleteLead: (id: string) => void;

  addCustomer: (cust: Omit<CrmCustomer, 'id' | 'slNo'>) => void;
  deleteCustomer: (id: string) => void;

  addOpportunity: (opp: Omit<CrmSalesOpportunity, 'id' | 'createdAt'>) => void;
  updateOpportunityStage: (id: string, newStage: DealStage) => void;
  deleteOpportunity: (id: string) => void;

  addStockItem: (item: Omit<CrmPurchaseStock, 'id' | 'slNo'>) => void;
  addUser: (user: Omit<CrmUser, 'id' | 'lastLogin'>) => void;

  addCampaign: (campaign: Omit<CrmCampaign, 'id' | 'slNo'>) => void;
  updateCampaign: (id: string, updated: Partial<CrmCampaign>) => void;
  toggleCampaignListing: (id: string) => void;
  deleteCampaign: (id: string) => void;
}

const EnterpriseCrmContext = createContext<EnterpriseCrmContextType | undefined>(undefined);

export function EnterpriseCrmProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('Super Admin');
  const [globalSearch, setGlobalSearch] = useState('');

  const [tasks, setTasks] = useState<CrmTask[]>(mockTasks);
  const [leads, setLeads] = useState<CrmLead[]>(mockLeads);
  const [customers, setCustomers] = useState<CrmCustomer[]>(mockCustomers);
  const [salesOpportunities, setSalesOpportunities] = useState<CrmSalesOpportunity[]>(mockSalesOpportunities);
  const [purchaseStocks, setPurchaseStocks] = useState<CrmPurchaseStock[]>(mockPurchaseStocks);
  const [campaigns, setCampaigns] = useState<CrmCampaign[]>(mockCampaigns);
  const [users, setUsers] = useState<CrmUser[]>(mockUsers);
  const [rbacRules, setRbacRules] = useState<PermissionRule[]>(mockRbacRules);

  const addTask = (taskData: Omit<CrmTask, 'id' | 'slNo'>) => {
    const newTask: CrmTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      slNo: tasks.length + 1,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id: string, updated: Partial<CrmTask>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' }
          : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const addLead = (leadData: Omit<CrmLead, 'id' | 'slNo'>) => {
    const newLead: CrmLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      slNo: leads.length + 1,
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const updateLead = (id: string, updated: Partial<CrmLead>) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updated } : l))
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const addCustomer = (custData: Omit<CrmCustomer, 'id' | 'slNo'>) => {
    const newCust: CrmCustomer = {
      ...custData,
      id: `cust-${Date.now()}`,
      slNo: customers.length + 1,
    };
    setCustomers((prev) => [newCust, ...prev]);
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  const addOpportunity = (oppData: Omit<CrmSalesOpportunity, 'id' | 'createdAt'>) => {
    const newOpp: CrmSalesOpportunity = {
      ...oppData,
      id: `opp-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setSalesOpportunities((prev) => [newOpp, ...prev]);
  };

  const updateOpportunityStage = (id: string, newStage: DealStage) => {
    setSalesOpportunities((prev) =>
      prev.map((opp) => (opp.id === id ? { ...opp, stage: newStage } : opp))
    );
  };

  const deleteOpportunity = (id: string) => {
    setSalesOpportunities((prev) => prev.filter((opp) => opp.id !== id));
  };

  const addStockItem = (itemData: Omit<CrmPurchaseStock, 'id' | 'slNo'>) => {
    const newItem: CrmPurchaseStock = {
      ...itemData,
      id: `stk-${Date.now()}`,
      slNo: purchaseStocks.length + 1,
    };
    setPurchaseStocks((prev) => [newItem, ...prev]);
  };

  const addUser = (userData: Omit<CrmUser, 'id' | 'lastLogin'>) => {
    const newUser: CrmUser = {
      ...userData,
      id: `usr-${Date.now()}`,
      lastLogin: 'Never',
    };
    setUsers((prev) => [newUser, ...prev]);
  };

  const addCampaign = (campaignData: Omit<CrmCampaign, 'id' | 'slNo'>) => {
    const newCmp: CrmCampaign = {
      ...campaignData,
      id: `cmp-${Date.now()}`,
      slNo: campaigns.length + 1,
    };
    setCampaigns((prev) => [...prev, newCmp]);
  };

  const updateCampaign = (id: string, updated: Partial<CrmCampaign>) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  const toggleCampaignListing = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, listing: !c.listing } : c))
    );
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <EnterpriseCrmContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        tasks,
        leads,
        customers,
        salesOpportunities,
        purchaseStocks,
        campaigns,
        users,
        rbacRules,
        globalSearch,
        setGlobalSearch,
        addTask,
        updateTask,
        toggleTaskStatus,
        deleteTask,
        addLead,
        updateLead,
        deleteLead,
        addCustomer,
        deleteCustomer,
        addOpportunity,
        updateOpportunityStage,
        deleteOpportunity,
        addStockItem,
        addUser,
        addCampaign,
        updateCampaign,
        toggleCampaignListing,
        deleteCampaign,
      }}
    >
      {children}
    </EnterpriseCrmContext.Provider>
  );
}

export function useEnterpriseCrm() {
  const context = useContext(EnterpriseCrmContext);
  if (!context) {
    throw new Error('useEnterpriseCrm must be used within EnterpriseCrmProvider');
  }
  return context;
}
