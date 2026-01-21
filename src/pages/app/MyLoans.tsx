import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Search, Filter, ArrowRight, Plus } from 'lucide-react';
import { Button, Card, Badge, Input, Select } from '../../components/ui';
import { userLoans } from '../../data/loans';

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'closed', label: 'Closed' },
];

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'personal', label: 'Personal' },
  { value: 'business', label: 'Business' },
  { value: 'consolidation', label: 'Consolidation' },
];

const statusColors: Record<string, 'success' | 'warning' | 'default'> = {
  active: 'success',
  pending: 'warning',
  closed: 'default',
};

export function MyLoans() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredLoans = userLoans.filter((loan) => {
    const matchesSearch =
      loan.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
    const matchesType = typeFilter === 'all' || loan.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Loans</h1>
          <p className="text-gray-600 mt-1">Manage and track all your loans in one place</p>
        </div>
        <Link to="/calculator">
          <Button leftIcon={<Plus className="w-4 h-4" />}>Apply for a New Loan</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by loan ID or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-40"
            />
            <Select
              options={typeOptions}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-40"
            />
          </div>
        </div>
      </Card>

      {/* Loans List */}
      <div className="space-y-4">
        {filteredLoans.length === 0 ? (
          <Card className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No loans found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                ? 'Try adjusting your filters'
                : "You don't have any loans yet"}
            </p>
            <Link to="/calculator">
              <Button>Apply for a Loan</Button>
            </Link>
          </Card>
        ) : (
          filteredLoans.map((loan) => (
            <Card key={loan.id} className="hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Loan Info */}
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center">
                    <CreditCard className="w-7 h-7 text-primary-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900 capitalize">{loan.type} Loan</h3>
                      <Badge variant={statusColors[loan.status]}>{loan.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-500">ID: {loan.id}</p>
                  </div>
                </div>

                {/* Loan Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 flex-1">
                  <div>
                    <p className="text-xs text-gray-500">Original Amount</p>
                    <p className="font-semibold text-gray-900">{formatCurrency(loan.amount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Monthly Payment</p>
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(loan.monthlyPayment)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Interest Rate</p>
                    <p className="font-semibold text-gray-900">{loan.rate}% APR</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">
                      {loan.status === 'closed' ? 'Closed Date' : 'Next Payment'}
                    </p>
                    <p className="font-semibold text-gray-900">
                      {loan.status === 'closed'
                        ? formatDate(loan.endDate)
                        : formatDate(loan.nextPaymentDate)}
                    </p>
                  </div>
                </div>

                {/* Progress & Action */}
                <div className="flex items-center space-x-4">
                  {loan.status !== 'closed' && (
                    <div className="w-32 hidden md:block">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Paid</span>
                        <span>
                          {Math.round(
                            ((loan.amount - loan.remainingBalance) / loan.amount) * 100
                          )}
                          %
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-600 rounded-full"
                          style={{
                            width: `${
                              ((loan.amount - loan.remainingBalance) / loan.amount) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <Link to={`/app/loans/${loan.id}`}>
                    <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid sm:grid-cols-3 gap-6">
        <Card className="text-center">
          <p className="text-3xl font-bold text-primary-600">
            {userLoans.filter((l) => l.status === 'active').length}
          </p>
          <p className="text-gray-600">Active Loans</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-primary-600">
            {formatCurrency(
              userLoans
                .filter((l) => l.status === 'active')
                .reduce((sum, l) => sum + l.remainingBalance, 0)
            )}
          </p>
          <p className="text-gray-600">Total Balance</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-primary-600">
            {formatCurrency(
              userLoans
                .filter((l) => l.status === 'active')
                .reduce((sum, l) => sum + l.monthlyPayment, 0)
            )}
          </p>
          <p className="text-gray-600">Monthly Payments</p>
        </Card>
      </div>
    </div>
  );
}
