export interface Project {
  id: string;
  organizationName: string;
  inn: string;
  projectName: string;
  service: string;
  paymentType: string;
  projectStage: string;
  realizationProbability: number;
  manager: string;
  businessSegment: string;
  realizationYear: string;
  isIndustrySolution: boolean;
  isForecastAccepted: boolean;
  isDzoRealization: boolean;
  needsManagementControl: boolean;
  evaluationAccepted: string;
  industryManager: string;
  projectNumber: string;
  creationDate: string;
  revenueInfo: RevenueInfo[];
  costInfo: CostInfo[];
  additionalInfo: AdditionalInfo;
}

export interface RevenueInfo {
  year: string;
  month: string;
  amount: number;
  revenueStatus: string;
}

export interface CostInfo {
  year: string;
  month: string;
  amount: number;
  costType: string;
  costReflectionStatus: string;
}

export interface AdditionalInfo {
  currentStatus: string;
  periodAchievements: string;
  nextPeriodPlans: string;
  comments: string;
}