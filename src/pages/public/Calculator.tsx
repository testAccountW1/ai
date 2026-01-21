import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calculator as CalcIcon, ArrowRight, Info, Check } from 'lucide-react';
import { Button, Card, Slider, Select } from '../../components/ui';

const loanTypes = [
  { value: 'personal', label: 'Personal Loan' },
  { value: 'business', label: 'Business Loan' },
  { value: 'consolidation', label: 'Debt Consolidation' },
];

const ratesByType: Record<string, number> = {
  personal: 9.99,
  business: 10.49,
  consolidation: 7.99,
};

export function Calculator() {
  const [amount, setAmount] = useState(15000);
  const [term, setTerm] = useState(36);
  const [loanType, setLoanType] = useState('personal');

  const rate = ratesByType[loanType];

  const calculations = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1);
    const totalPayable = monthlyPayment * term;
    const totalInterest = totalPayable - amount;

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayable: totalPayable.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    };
  }, [amount, term, rate]);

  const formatCurrency = (value: number | string) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container-custom text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CalcIcon className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Loan Calculator</h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Estimate your monthly payments and see how much you could save. Adjust the sliders
            to find the perfect loan terms for your budget.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Controls */}
            <div className="lg:col-span-3">
              <Card className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Customize Your Loan
                </h2>

                <div className="space-y-8">
                  {/* Loan Type */}
                  <Select
                    label="Loan Type"
                    options={loanTypes}
                    value={loanType}
                    onChange={(e) => setLoanType(e.target.value)}
                  />

                  {/* Loan Amount */}
                  <Slider
                    label="Loan Amount"
                    displayValue={formatCurrency(amount)}
                    min={1000}
                    max={loanType === 'business' ? 250000 : 100000}
                    step={1000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />

                  {/* Loan Term */}
                  <Slider
                    label="Loan Term"
                    displayValue={`${term} months`}
                    min={6}
                    max={84}
                    step={6}
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                  />

                  {/* Interest Rate Display */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Estimated APR</span>
                        <div className="group relative">
                          <Info className="w-4 h-4 text-gray-400 cursor-help" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                            Your actual rate may vary based on your credit profile and other factors.
                          </div>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-primary-600">{rate}%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-2">
              <Card className="p-8 bg-primary-600 text-white sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Your Estimate</h2>

                <div className="text-center mb-8">
                  <p className="text-primary-200 text-sm mb-1">Estimated Monthly Payment</p>
                  <p className="text-5xl font-bold">{formatCurrency(calculations.monthlyPayment)}</p>
                  <p className="text-primary-200 text-sm mt-1">per month</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between py-3 border-t border-white/20">
                    <span className="text-primary-200">Loan Amount</span>
                    <span className="font-semibold">{formatCurrency(amount)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-t border-white/20">
                    <span className="text-primary-200">Loan Term</span>
                    <span className="font-semibold">{term} months</span>
                  </div>
                  <div className="flex justify-between py-3 border-t border-white/20">
                    <span className="text-primary-200">Total Interest</span>
                    <span className="font-semibold">{formatCurrency(calculations.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-t border-white/20">
                    <span className="text-primary-200">Total Repayable</span>
                    <span className="font-semibold">{formatCurrency(calculations.totalPayable)}</span>
                  </div>
                </div>

                <Link to="/register">
                  <Button
                    size="lg"
                    className="w-full bg-white text-primary-600 hover:bg-gray-100"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Continue Application
                  </Button>
                </Link>

                <p className="text-xs text-primary-200 text-center mt-4">
                  Checking your rate won't affect your credit score
                </p>
              </Card>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'No Hidden Fees',
                description: 'No origination fees, no prepayment penalties. What you see is what you pay.',
              },
              {
                title: 'Soft Credit Check',
                description: 'Check your rate without impacting your credit score. Hard pull only after you accept.',
              },
              {
                title: 'Fast Funding',
                description: 'Once approved, receive your funds as soon as the next business day.',
              },
            ].map((item, index) => (
              <Card key={index} variant="bordered" className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-gray-100">
        <div className="container-custom">
          <p className="text-sm text-gray-500 text-center">
            This calculator provides estimates only. Your actual rate and terms may vary based on
            your credit profile, income, and other factors. APR ranges from 5.99% to 24.99%.
            Loan approval is subject to credit approval.
          </p>
        </div>
      </section>
    </div>
  );
}
