import { User, StatusCount } from '../types';

const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations', 'Support'];
const locations = ['New York', 'London', 'Tokyo', 'Singapore', 'Berlin', 'Sydney', 'Toronto'];
const roles = ['Admin', 'User', 'Manager', 'Developer', 'Analyst', 'Designer', 'Coordinator'];
const names = [
  'Emma Thompson', 'Liam Chen', 'Sophia Patel', 'Noah Kim', 'Olivia Singh',
  'Jackson Wang', 'Isabella Garcia', 'Lucas Silva', 'Ava Nguyen', 'Ethan Cohen'
];

export const generateActiveUsers = (): User[] => {
  return Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: names[Math.floor(Math.random() * names.length)],
    email: `user${i + 1}@company.com`,
    status: 'active',
    created_at: new Date(Date.now() - Math.random() * 31536000000).toISOString(),
    last_login: new Date(Date.now() - Math.random() * 604800000).toISOString(),
    role: roles[Math.floor(Math.random() * roles.length)],
    department: departments[Math.floor(Math.random() * departments.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    salary: Math.floor(Math.random() * 100000) + 50000,
    projects: Math.floor(Math.random() * 8) + 1,
    performance_score: Math.floor(Math.random() * 30) + 70
  }));
};

export const generateRecentUsers = (): User[] => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: 1000 + i,
    name: names[Math.floor(Math.random() * names.length)],
    email: `newuser${i + 1}@company.com`,
    status: ['active', 'pending'][Math.floor(Math.random() * 2)],
    created_at: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    last_login: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    role: roles[Math.floor(Math.random() * roles.length)],
    department: departments[Math.floor(Math.random() * departments.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    salary: Math.floor(Math.random() * 100000) + 50000,
    projects: Math.floor(Math.random() * 3) + 1,
    performance_score: Math.floor(Math.random() * 20) + 80
  })).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
};

export const generateStatusCounts = (): StatusCount[] => {
  const total = 1500;
  const activeCount = Math.floor(Math.random() * 500) + 700;
  const inactiveCount = Math.floor(Math.random() * 200) + 100;
  const pendingCount = total - activeCount - inactiveCount;

  const generateDepartmentDistribution = (count: number) => {
    return departments.map(dept => ({
      department: dept,
      count: Math.floor(count * (Math.random() * 0.3 + 0.05))
    }));
  };

  return [
    {
      status: 'active',
      count: activeCount,
      last_updated: new Date().toISOString(),
      trend: 'up',
      percentage: Math.round((activeCount / total) * 100),
      department_distribution: generateDepartmentDistribution(activeCount)
    },
    {
      status: 'inactive',
      count: inactiveCount,
      last_updated: new Date().toISOString(),
      trend: 'down',
      percentage: Math.round((inactiveCount / total) * 100),
      department_distribution: generateDepartmentDistribution(inactiveCount)
    },
    {
      status: 'pending',
      count: pendingCount,
      last_updated: new Date().toISOString(),
      trend: 'stable',
      percentage: Math.round((pendingCount / total) * 100),
      department_distribution: generateDepartmentDistribution(pendingCount)
    }
  ];
};