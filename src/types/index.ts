export interface PredefinedQuery {
  name: string;
  description: string;
  query: string;
  csvData: string; // Changed from mockDataGenerator
}

export interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  created_at: string;
  last_login: string;
  role: string;
  department: string;
  location: string;
  salary: number;
  projects: number;
  performance_score: number;
}

export interface StatusCount {
  status: string;
  count: number;
  last_updated: string;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
  department_distribution: {
    department: string;
    count: number;
  }[];
}

export interface Notification {
  type: 'success' | 'error';
  message: string;
}