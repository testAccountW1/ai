import { Link } from 'react-router-dom';
import { User, Briefcase, Layers, Check, ArrowRight } from 'lucide-react';
import { Button, Card } from '../../components/ui';
import { loanProducts } from '../../data/products';

const iconMap: Record<string, React.ElementType> = {
  user: User,
  briefcase: Briefcase,
  layers: Layers,
};

export function Products() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Loan Products</h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Whether you need funds for personal expenses, business growth, or debt consolidation,
            we have a solution tailored to your needs.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loanProducts.map((product) => {
              const Icon = iconMap[product.icon] || User;
              return (
                <Card
                  key={product.id}
                  id={product.id}
                  className="flex flex-col hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-6">{product.description}</p>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ${product.minAmount.toLocaleString()} - ${product.maxAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">APR from</p>
                      <p className="text-sm font-semibold text-gray-900">{product.minRate}%</p>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6 flex-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <Link to="/calculator" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Calculate
                      </Button>
                    </Link>
                    <Link to="/register" className="flex-1">
                      <Button className="w-full">Apply Now</Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare Our Loans</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the right loan product for your specific needs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900">
                    Feature
                  </th>
                  {loanProducts.map((product) => (
                    <th
                      key={product.id}
                      className="py-4 px-4 text-center text-sm font-semibold text-gray-900"
                    >
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-4 text-sm text-gray-600">Loan Amount</td>
                  {loanProducts.map((product) => (
                    <td key={product.id} className="py-4 px-4 text-center text-sm text-gray-900">
                      ${product.minAmount.toLocaleString()} - ${product.maxAmount.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 text-sm text-gray-600">Term Length</td>
                  {loanProducts.map((product) => (
                    <td key={product.id} className="py-4 px-4 text-center text-sm text-gray-900">
                      {product.minTerm} - {product.maxTerm} months
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 text-sm text-gray-600">APR Range</td>
                  {loanProducts.map((product) => (
                    <td key={product.id} className="py-4 px-4 text-center text-sm text-gray-900">
                      {product.minRate}% - {product.maxRate}%
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 text-sm text-gray-600">Prepayment Penalty</td>
                  {loanProducts.map((product) => (
                    <td key={product.id} className="py-4 px-4 text-center">
                      <span className="text-secondary-600 font-medium">None</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 text-sm text-gray-600">Funding Speed</td>
                  {loanProducts.map((product) => (
                    <td key={product.id} className="py-4 px-4 text-center text-sm text-gray-900">
                      1-2 business days
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Not Sure Which Loan Is Right for You?</h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Use our loan calculator to compare options and find the perfect fit for your budget.
          </p>
          <Link to="/calculator">
            <Button
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-100"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Try Our Calculator
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
