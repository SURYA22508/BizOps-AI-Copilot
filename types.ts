export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  OPERATIONS_CHAT = 'OPERATIONS_CHAT',
  STRATEGY_BUILDER = 'STRATEGY_BUILDER',
  DOC_ANALYZER = 'DOC_ANALYZER'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface MetricData {
  name: string;
  value: number;
  trend: number; // percentage change
  unit?: string;
}

export interface ChartDataPoint {
  name: string;
  revenue: number;
  expenses: number;
  efficiency: number;
}

// Interfaces for Strategy Builder AI Response
export interface StrategyStep {
  phase: string;
  action: string;
  owner: string;
  estimatedImpact: string;
}

export interface StrategyPlan {
  title: string;
  executiveSummary: string;
  roiEstimate: string;
  steps: StrategyStep[];
}
