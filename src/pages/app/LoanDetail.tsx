import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Percent,
  Clock,
  DollarSign,
  FileText,
  Download,
  CreditCard,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui';
import { userLoans, payments } from '../../data/loans';

const statusColors: Record<string, 'success' | 'warning' | 'default'> = {
  active: 'success',
  pending: 'warning',
  closed: 'default',
};

export function LoanDetail() {
  const { id } = useParams<{ id: string }>();
  const loan = userLoans.find((l) => l.id === id);

  if (!loan) {
    return <Navigate to="/app/loans" replace />;
  }

  const loanPayments = payments.filter((p) => p.loanId === loan.id);
  const progress = ((loan.amount - loan.remainingBalance) / loan.amount) * 100;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link
        to="/app/loans"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to My Loans
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-primary-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">
                {loan.type} Loan
              </h1>
              <Badge variant={statusColors[loan.status]} className="text-sm">
                {loan.status}
              </Badge>
            </div>
            <p className="text-gray-500">Loan ID: {loan.id}</p>
          </div>
        </div>
        {loan.status === 'active' && (
          <Link to="/app/payments">
            <Button>Make a Payment</Button>
          </Link>
        )}
      </div>

      {/* Progress Card */}
      {loan.status !== 'closed' && (
        <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-primary-200 text-sm">Amount Borrowed</p>
              <p className="text-3xl font-bold">{formatCurrency(loan.amount)}</p>
            </div>
            <div>
              <p className="text-primary-200 text-sm">Remaining Balance</p>
              <p className="text-3xl font-bold">{formatCurrency(loan.remainingBalance)}</p>
            </div>
            <div>
              <p className="text-primary-200 text-sm">Amount Paid</p>
              <p className="text-3xl font-bold">
                {formatCurrency(loan.amount - loan.remainingBalance)}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-primary-200">Repayment Progress</span>
              <span className="font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Loan Details Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary-600" />
            </div>
            <span className="text-gray-500 text-sm">Monthly Payment</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(loan.monthlyPayment)}</p>
        </Card>

        <Card>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Percent className="w-5 h-5 text-primary-600" />
            </div>
            <span className="text-gray-500 text-sm">Interest Rate</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{loan.rate}% APR</p>
        </Card>

        <Card>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary-600" />
            </div>
            <span className="text-gray-500 text-sm">Loan Term</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{loan.term} months</p>
        </Card>

        <Card>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary-600" />
            </div>
            <span className="text-gray-500 text-sm">Next Payment</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {loan.status === 'closed' ? 'N/A' : formatDate(loan.nextPaymentDate)}
          </p>
        </Card>
      </div>

      {/* Details & Payment History */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Loan Information */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Start Date</span>
                <span className="font-medium text-gray-900">{formatDate(loan.startDate)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">End Date</span>
                <span className="font-medium text-gray-900">{formatDate(loan.endDate)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Total Payable</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(loan.totalPayable)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Total Interest</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(loan.totalPayable - loan.amount)}
                </span>
              </div>
            </div>

            {/* Documents */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium text-gray-900 mb-3">Documents</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <span className="flex-1 text-sm text-gray-700">Loan Agreement</span>
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <span className="flex-1 text-sm text-gray-700">Payment Schedule</span>
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Payment History */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                      Due Date
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                      Amount
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                      Paid Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loanPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm text-gray-900">
                        {formatDate(payment.dueDate)}
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {payment.status === 'paid' ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-secondary-500" />
                              <span className="text-sm text-secondary-600">Paid</span>
                            </>
                          ) : payment.status === 'overdue' ? (
                            <>
                              <AlertCircle className="w-4 h-4 text-red-500" />
                              <span className="text-sm text-red-600">Overdue</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm text-yellow-600">Pending</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-500">
                        {payment.paidDate ? formatDate(payment.paidDate) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {loanPayments.length === 0 && (
              <div className="text-center py-8 text-gray-500">No payment history available</div>
            )}
          </Card>
        </div>
      </div>

      {/* Help Section */}
      <Card className="bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900">Need Help With Your Loan?</h3>
            <p className="text-gray-600 text-sm mt-1">
              Our support team is available to assist with any questions about your loan.
            </p>
          </div>
          <Link to="/contact">
            <Button variant="outline">Contact Support</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
