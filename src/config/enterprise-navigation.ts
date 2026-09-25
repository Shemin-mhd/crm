export interface NavDropdownItem {
  label: string;
  href?: string;
  iconName?: string;
  badge?: string;
  children?: NavDropdownItem[];
}

export interface EnterpriseNavItem {
  id: string;
  label: string;
  path?: string;
  iconName: string;
  badge?: string;
  children?: NavDropdownItem[];
}

export const ENTERPRISE_NAV_ITEMS: EnterpriseNavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    iconName: 'Home',
  },
  {
    id: 'tasks',
    label: 'Task',
    path: '/tasks',
    iconName: 'CheckSquare',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    path: '/marketing',
    iconName: 'Radio',
    children: [
      { label: 'Campaigns', href: '/marketing', iconName: 'Megaphone' },
      { label: 'Email Marketing', href: '/marketing', iconName: 'Radio' },
    ],
  },
  {
    id: 'leads',
    label: 'Lead',
    path: '/leads',
    iconName: 'ListChecks',
  },
  {
    id: 'customers',
    label: 'Customer',
    path: '/customers',
    iconName: 'Shield',
    children: [
      { label: 'Customer', href: '/customers', iconName: 'Shield' },
      { label: 'Contact', href: '/customers?view=contacts', iconName: 'Contact' },
    ],
  },
  {
    id: 'sales',
    label: 'Sales',
    path: '/sales',
    iconName: 'Hourglass',
    children: [
      { label: 'Opportunity', href: '/sales?tab=opportunities', iconName: 'Key' },
      { label: 'Quotation', href: '/sales?tab=quotations', iconName: 'FileText' },
      { label: 'Order', href: '/sales?tab=orders', iconName: 'ThumbsUp' },
      { label: 'Proforma Invoice', href: '/sales?tab=proforma', iconName: 'CreditCard' },
      { label: 'Invoice', href: '/sales?tab=invoice', iconName: 'FileSpreadsheet' },
      { label: 'Receipt', href: '/sales?tab=receipt', iconName: 'Receipt' },
      { label: 'Delivery Note', href: '/sales?tab=delivery', iconName: 'Table' },
    ],
  },
  {
    id: 'purchase',
    label: 'Purchase',
    iconName: 'Package',
    children: [
      { label: 'Stock', href: '/purchase?tab=stock', iconName: 'Boxes' },
      { label: 'Purchase Order', href: '/purchase?tab=po', iconName: 'FilePlus' },
      { label: 'Purchase Invoice', href: '/purchase?tab=invoice', iconName: 'FileCheck' },
      { label: 'Purchase Payment', href: '/purchase?tab=payment', iconName: 'DollarSign' },
      { label: 'Stock In', href: '/purchase?tab=stock-in', iconName: 'ArrowDownToLine' },
      { label: 'Supplier', href: '/purchase?tab=supplier', iconName: 'Truck' },
      { label: 'Products', href: '/purchase?tab=products', iconName: 'Tag' },
      { label: 'Store', href: '/purchase?tab=store', iconName: 'Store' },
      { label: 'Manufacturing', href: '/purchase?tab=manufacturing', iconName: 'Factory' },
    ],
  },
  {
    id: 'reports',
    label: 'Report',
    path: '/reports',
    iconName: 'FileText',
  },
  {
    id: 'settings',
    label: 'Settings',
    iconName: 'Wrench',
    children: [
      {
        label: 'User',
        href: '/settings?tab=users',
        iconName: 'Users',
        children: [
          { label: 'User', href: '/settings?tab=users', iconName: 'Users' },
          { label: 'User Profile', href: '/settings?tab=profile', iconName: 'Contact' },
          { label: 'User Target', href: '/settings?tab=user-target', iconName: 'BarChart3' },
        ],
      },
      {
        label: 'Opportunity Settings',
        href: '/settings?tab=opportunity-settings',
        iconName: 'Key',
        children: [
          { label: 'Opportunity Stages', href: '/settings?tab=opportunity-settings', iconName: 'ListChecks' },
          { label: 'Opportunity Lost Reason', href: '/settings?tab=opportunity-lost-reason', iconName: 'Sliders' },
        ],
      },
      {
        label: 'Initial Settings',
        href: '/settings?tab=initial',
        iconName: 'Sliders',
        children: [
          { label: 'Industry', href: '/settings?tab=initial&sub=industry', iconName: 'Factory' },
          { label: 'Source', href: '/settings?tab=initial&sub=source', iconName: 'DollarSign' },
          { label: 'Language', href: '/settings?tab=initial&sub=language', iconName: 'Languages' },
          { label: 'Field Customisation', href: '/settings?tab=initial&sub=customisation', iconName: 'CheckCircle2' },
          { label: 'Print Settings', href: '/settings?tab=initial&sub=print', iconName: 'Printer' },
          { label: 'Report Settings', href: '/settings?tab=initial&sub=reports', iconName: 'FileText' },
          { label: 'Country / Region', href: '/settings?tab=initial&sub=region', iconName: 'Flag' },
          { label: 'Credit Limit', href: '/settings?tab=initial&sub=credit', iconName: 'CreditCard' },
          { label: 'Purchase Order', href: '/settings?tab=initial&sub=po', iconName: 'ShoppingCart' },
          { label: 'Designation', href: '/settings?tab=initial&sub=designation', iconName: 'Contact' },
        ],
      },
      {
        label: 'Campaign Settings',
        href: '/settings?tab=campaign',
        iconName: 'Megaphone',
        children: [
          { label: 'Campaign Type', href: '/settings?tab=campaign&sub=type', iconName: 'Megaphone' },
          { label: 'Expense Type', href: '/settings?tab=campaign&sub=expense', iconName: 'Receipt' },
          { label: 'Campaign Status', href: '/settings?tab=campaign&sub=status', iconName: 'Activity' },
        ],
      },

      {
        label: 'Order Settings',
        href: '/settings?tab=order',
        iconName: 'ShoppingCart',
        children: [
          { label: 'Order Status', href: '/settings?tab=order&sub=status', iconName: 'ShoppingCart' },
          { label: 'Order Type', href: '/settings?tab=order&sub=type', iconName: 'CreditCard' },
          { label: 'AMC Year', href: '/settings?tab=order&sub=amc', iconName: 'Calendar' },
          { label: 'Cancellation Reason', href: '/settings?tab=order&sub=cancellation', iconName: 'Ban' },
        ],
      },

      {
        label: 'Task Settings',
        href: '/settings?tab=task',
        iconName: 'CheckSquare',
        children: [
          { label: 'Task Type', href: '/settings?tab=task&sub=type', iconName: 'CheckSquare' },
          { label: 'Task Template', href: '/settings?tab=task&sub=template', iconName: 'FileText' },
        ],
      },


      { label: 'Business Opportunity', href: '/settings?tab=opportunity', iconName: 'Briefcase' },
      { label: 'Company Target', href: '/settings?tab=target', iconName: 'BarChart3' },
      { label: 'Cost/Job Type', href: '/settings?tab=cost-job', iconName: 'DollarSign' },
      { label: 'Business Tags', href: '/settings?tab=tags', iconName: 'Tag' },
      { label: 'Products', href: '/settings?tab=products', iconName: 'Box' },

    ],
  },
];


