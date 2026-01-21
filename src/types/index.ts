export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

export interface Loan {
  id: string;
  type: 'personal' | 'business' | 'consolidation';
  amount: number;
  term: number;
  rate: number;
  monthlyPayment: number;
  totalPayable: number;
  status: 'active' | 'pending' | 'closed';
  startDate: string;
  endDate: string;
  remainingBalance: number;
  nextPaymentDate: string;
  nextPaymentAmount: number;
}

export interface LoanProduct {
  id: string;
  name: string;
  description: string;
  features: string[];
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  minRate: number;
  maxRate: number;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface Activity {
  id: string;
  type: 'payment' | 'application' | 'document' | 'notification';
  title: string;
  description: string;
  date: string;
  amount?: number;
}

export interface Payment {
  id: string;
  loanId: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
