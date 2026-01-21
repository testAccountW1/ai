import { Link } from 'react-router-dom';
import {
  CreditCard,
  Calendar,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Bell,
  DollarSign,
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { userLoans, recentActivity } from '../../data/loans';

const activityIcons: Record<string, React.ElementType> = {
  payment: DollarSign,
  application: FileText,
  document: FileText,
  notification: Bell,
};

export function Dashboard() {
  const { user } = useAuth();

  const activeLoans = userLoans.filter((loan) => loan.status === 'active');
  const totalBalance = activeLoans.reduce((sum, loan) => sum + loan.remainingBalance, 0);
  const nextPayment = activeLoans.reduce((sum, loan) => sum + loan.nextPaymentAmount, 0);
  const creditLimit = 75000;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 mt-1">Here's an overview of your account</p>
        </div>
        <Link to="/calculator">
          <Button rightIcon={<ArrowRight className="w-4 h-4" />}>Start New Application</Button>
        </Link>
      </div>

      {/* Summary Tiles */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary-100 rounded-full -mr-8 -mt-8" />
          <div className="relative">
            <div className="flex items-center space-x-2 text-gray-500 mb-2">
              <CreditCard className="w-5 h-5" />
              <span className="text-sm font-medium">Total Balance</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalBalance)}</p>
            <p className="text-sm text-gray-500 mt-1">
              Across {activeLoans.length} active loan{activeLoans.length !== 1 ? 's' : ''}
            </p>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-secondary-100 rounded-full -mr-8 -mt-8" />
          <div className="relative">
            <div className="flex items-center space-x-2 text-gray-500 mb-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">Next Payment</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(nextPayment)}</p>
            <p className="text-sm text-gray-500 mt-1">Due Feb 15, 2025</p>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-8 -mt-8" />
          <div className="relative">
            <div className="flex items-center space-x-2 text-gray-500 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">Credit Available</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(creditLimit - totalBalance)}
            </p>
            <p className="text-sm text-gray-500 mt-1">of {formatCurrency(creditLimit)} limit</p>
          </div>
        </Card>

        <Card className="bg-primary-600 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8" />
          <div className="relative">
            <p className="text-primary-100 text-sm font-medium mb-2">Quick Actions</p>
            <div className="space-y-2">
              <Link
                to="/app/payments"
                className="flex items-center space-x-2 text-white hover:text-primary-100 transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm">Make a Payment</span>
              </Link>
              <Link
                to="/app/loans"
                className="flex items-center space-x-2 text-white hover:text-primary-100 transition-colors"
              >
                <ArrowDownRight className="w-4 h-4" />
                <span className="text-sm">View All Loans</span>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Active Loans */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Active Loans</h2>
              <Link
                to="/app/loans"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {activeLoans.map((loan) => (
                <Link
                  key={loan.id}
                  to={`/app/loans/${loan.id}`}
                  className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 capitalize">{loan.type} Loan</p>
                        <p className="text-sm text-gray-500">
                          {formatCurrency(loan.monthlyPayment)}/mo • {loan.rate}% APR
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(loan.remainingBalance)}
                      </p>
                      <p className="text-sm text-gray-500">remaining</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>
                        {Math.round(
                          ((loan.amount - loan.remainingBalance) / loan.amount) * 100
                        )}
                        % paid
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-600 rounded-full transition-all"
                        style={{
                          width: `${((loan.amount - loan.remainingBalance) / loan.amount) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
              {activeLoans.length === 0 && (
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No active loans</p>
                  <Link to="/calculator" className="text-primary-600 hover:underline text-sm">
                    Apply for a loan
                  </Link>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {recentActivity.slice(0, 5).map((activity) => {
                const Icon = activityIcons[activity.type] || Bell;
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'payment'
                          ? 'bg-secondary-100'
                          : activity.type === 'application'
                          ? 'bg-blue-100'
                          : 'bg-gray-100'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          activity.type === 'payment'
                            ? 'text-secondary-600'
                            : activity.type === 'application'
                            ? 'text-blue-600'
                            : 'text-gray-600'
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500 truncate">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatDate(activity.date)}</p>
                    </div>
                    {activity.amount && (
                      <Badge variant={activity.type === 'payment' ? 'success' : 'info'}>
                        {formatCurrency(activity.amount)}
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Pending Applications */}
      {userLoans.some((loan) => loan.status === 'pending') && (
        <Card className="bg-yellow-50 border border-yellow-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Application Under Review</h3>
              <p className="text-sm text-gray-600 mt-1">
                Your debt consolidation loan application is being reviewed. We'll notify you once a
                decision has been made.
              </p>
            </div>
            <Link to="/app/loans/loan-003">
              <Button variant="secondary" size="sm">
                View Details
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
