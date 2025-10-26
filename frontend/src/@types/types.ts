// @ts-nocheck
export interface Project {
  id: string;
  organization_id: number;
  name: string;
  service_type: string;
  payment_type: string;
  stage: string;
  realization_probability: number;
  manager_id: number;
  business_segment: string;
  realization_year: string;
  is_industry_solution: number;
  is_forecast_accepted: number;
  is_dzo_implementation: number;
  requires_management_control: number;
  evaluation_type: string;
  industry_manager_id: number;
  project_number: string;
  current_status: string;
  period_work_done: string;
  next_period_plans: string;
  total_revenue: number;
  total_cost: number;
  created_at: string;
  updated_at: string;
  revenueInfo: RevenueInfo[];
  costInfo: CostInfo[];
  projectHistory: ProjectHistory[];
}

export interface RevenueInfo {
  id: string;
  project_id: string;
  year: string;
  month: number;
  amount: number;
  revenue_status: string;
  created_at: string;
}

export interface CostInfo {
  id: string;
  project_id: string;
  year: string;
  month: number;
  amount: number;
  cost_type: string;
  cost_status: string;
  created_at: string;
}

export interface ProjectHistory {
  id: string;
  project_id: string;
  user_id: string;
  changed_field: string;
  old_value: string | null;
  new_value: string | null;
  change_date: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  phone: string;
  role: 'analyst' | 'user';
  password?: string;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalRevenue: number;
  totalAnalysts: number;
}

export interface ProjectsByStage {
  stage: string;
  count: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  cost: number;
  profit: number;
}

export interface RecentProject {
  id: string;
  name: string;
  organization_name: string;
  manager: string;
  stage: string;
  realization_probability: number;
  created_at: string;
  total_revenue: number;
}