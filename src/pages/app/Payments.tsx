import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CreditCard,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { Button, Card, Badge, Select } from '../../components/ui';
import { userLoans, payments } from '../../data/loans';

const filterOptions = [
  { value: 'all', label: 'All Payments' },
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'overdue', label: 'Overdue' },
];

export function Payments() {
  const [filter, setFilter] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const activeLoans = userLoans.filter((loan) => loan.status === 'active');
  const totalDue = activeLoans.reduce((sum, loan) => sum + loan.nextPaymentAmount, 0);

  const filteredPayments = payments.filter((payment) => {
    if (filter === 'all') return true;
    return payment.status === filter;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getLoanById = (loanId: string) => {
    return userLoans.find((loan) => loan.id === loanId);
  };

  const handlePayNow = (paymentId: string) => {
    setSelectedPayment(paymentId);
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = () => {
    // Mock payment confirmation
    alert('Payment processed successfully! (This is a demo)');
    setShowPaymentModal(false);
    setSelectedPayment(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600 mt-1">Manage your loan payments and view payment history</p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-6">
        <Card className="bg-primary-600 text-white">
          <div className="flex items-center space-x-3 mb-2">
            <DollarSign className="w-6 h-6 text-primary-200" />
            <span className="text-primary-200">Total Due This Month</span>
          </div>
          <p className="text-3xl font-bold">{formatCurrency(totalDue)}</p>
          <p className="text-primary-200 text-sm mt-1">Due by Feb 15, 2025</p>
        </Card>

        <Card>
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle className="w-6 h-6 text-secondary-500" />
            <span className="text-gray-500">Paid This Year</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {formatCurrency(
              payments
                .filter((p) => p.status === 'paid' && p.paidDate?.startsWith('2025'))
                .reduce((sum, p) => sum + p.amount, 0)
            )}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {payments.filter((p) => p.status === 'paid' && p.paidDate?.startsWith('2025')).length}{' '}
            payments
          </p>
        </Card>

        <Card>
          <div className="flex items-center space-x-3 mb-2">
            <Calendar className="w-6 h-6 text-blue-500" />
            <span className="text-gray-500">Next Payment</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">Feb 1</p>
          <p className="text-gray-500 text-sm mt-1">{formatCurrency(1254.78)} - Business Loan</p>
        </Card>
      </div>

      {/* Upcoming Payments */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Payments</h2>
          <Button size="sm">Pay All ({formatCurrency(totalDue)})</Button>
        </div>

        <div className="space-y-4">
          {activeLoans.map((loan) => (
            <div
              key={loan.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-xl gap-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 capitalize">{loan.type} Loan</p>
                  <p className="text-sm text-gray-500">Due {formatDate(loan.nextPaymentDate)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(loan.nextPaymentAmount)}
                  </p>
                  <p className="text-sm text-gray-500">Monthly payment</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handlePayNow(loan.id)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment History */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
          <Select
            options={filterOptions}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-48"
          />
        </div>

        {filteredPayments.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No payments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Loan</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                    Due Date
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Amount</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                    Paid Date
                  </th>
                  <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPayments.map((payment) => {
                  const loan = getLoanById(payment.loanId);
                  return (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <Link
                          to={`/app/loans/${payment.loanId}`}
                          className="text-primary-600 hover:text-primary-700 font-medium capitalize"
                        >
                          {loan?.type} Loan
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900">
                        {formatDate(payment.dueDate)}
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="py-4 px-4">
                        {payment.status === 'paid' ? (
                          <Badge variant="success">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Paid
                          </Badge>
                        ) : payment.status === 'overdue' ? (
                          <Badge variant="error">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Overdue
                          </Badge>
                        ) : (
                          <Badge variant="warning">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-500">
                        {payment.paidDate ? formatDate(payment.paidDate) : '-'}
                      </td>
                      <td className="py-4 px-4 text-right">
                        {payment.status === 'pending' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePayNow(payment.id)}
                          >
                            Pay
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Auto-Pay Section */}
      <Card className="bg-primary-50 border border-primary-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Set Up Auto-Pay</h3>
              <p className="text-gray-600 text-sm">
                Never miss a payment. Enable automatic payments and get a 0.25% rate discount.
              </p>
            </div>
          </div>
          <Button>Enable Auto-Pay</Button>
        </div>
      </Card>

      {/* Payment Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Payment</h3>
            <p className="text-gray-600 mb-6">
              You are about to make a payment. This action will process immediately.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Payment ID</span>
                <span className="font-semibold text-gray-900">{selectedPayment}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Payment Amount</span>
                <span className="font-semibold text-gray-900">{formatCurrency(476.24)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Method</span>
                <span className="text-gray-900">Bank Account ****4567</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleConfirmPayment}>
                Confirm Payment
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
