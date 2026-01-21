import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import {
  ArrowRight,
  Shield,
  Clock,
  Percent,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Award,
} from 'lucide-react';
import { Button, Card, Accordion } from '../../components/ui';
import { testimonials } from '../../data/testimonials';
import { faqs } from '../../data/faqs';

import 'swiper/css';
import 'swiper/css/pagination';

const benefits = [
  {
    icon: Clock,
    title: 'Fast Approval',
    description: 'Get approved in minutes, not days. Our streamlined process means you can access funds when you need them most.',
  },
  {
    icon: Percent,
    title: 'Competitive Rates',
    description: 'Enjoy rates starting as low as 5.99% APR. Your rate depends on your credit profile and loan terms.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Bank-level encryption protects your data. We never sell your personal information to third parties.',
  },
  {
    icon: CheckCircle,
    title: 'No Hidden Fees',
    description: 'What you see is what you pay. No origination fees, no prepayment penalties, complete transparency.',
  },
];

const stats = [
  { value: '$2B+', label: 'Loans Funded' },
  { value: '150K+', label: 'Happy Customers' },
  { value: '4.9/5', label: 'Customer Rating' },
  { value: '24/7', label: 'Support Available' },
];

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Get the Funding You Need,{' '}
                <span className="text-primary-200">When You Need It</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-xl mx-auto lg:mx-0">
                Personal and business loans with competitive rates, fast approval, and no hidden fees.
                Apply online in minutes and get funded as soon as the next business day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/calculator">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-primary-600 hover:bg-gray-100"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Check Your Rate
                  </Button>
                </Link>
                <Link to="/products">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-white text-white hover:bg-white/10"
                  >
                    View Products
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-primary-200 mt-4">
                Checking your rate won't affect your credit score
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary-400/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-primary-300/30 rounded-full blur-3xl" />
                <Card className="relative bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-primary-200">Loan Amount</p>
                        <p className="text-2xl font-bold">$25,000</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-xs text-primary-200">Monthly Payment</p>
                        <p className="text-lg font-semibold">$486/mo</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-xs text-primary-200">APR</p>
                        <p className="text-lg font-semibold">7.99%</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-primary-200">Term</span>
                        <span>60 months</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary-600">{stat.value}</p>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose QuickFund?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to making borrowing simple, transparent, and accessible for everyone.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get funded in three simple steps. Our streamlined process makes borrowing effortless.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Check Your Rate',
                description: 'Fill out a quick application in minutes. See your personalized rate without impacting your credit score.',
              },
              {
                step: '02',
                title: 'Choose Your Loan',
                description: 'Review your offers and select the loan amount, term, and payment that works best for your budget.',
              },
              {
                step: '03',
                title: 'Get Funded',
                description: 'Complete verification, sign your agreement, and receive funds as soon as the next business day.',
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-primary-100 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 right-0 w-1/2 border-t-2 border-dashed border-primary-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have achieved their financial goals with QuickFund.
            </p>
          </div>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <Card className="h-full">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white border-y">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center space-x-2 text-gray-400">
              <Shield className="w-8 h-8" />
              <span className="font-medium">256-bit SSL</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Award className="w-8 h-8" />
              <span className="font-medium">BBB A+ Rated</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Users className="w-8 h-8" />
              <span className="font-medium">150K+ Customers</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <CheckCircle className="w-8 h-8" />
              <span className="font-medium">SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Have questions? We've got answers. If you can't find what you're looking for, our
                support team is here to help.
              </p>
              <Link to="/contact">
                <Button variant="outline">Contact Support</Button>
              </Link>
            </div>
            <div>
              <Accordion
                items={faqs.slice(0, 5).map((faq) => ({
                  id: faq.id,
                  title: faq.question,
                  content: faq.answer,
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Check your rate in minutes with no impact to your credit score. See why over 150,000
            customers have chosen QuickFund for their financing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-primary-600 hover:bg-gray-100"
              >
                Check Your Rate Now
              </Button>
            </Link>
            <Link to="/products">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10"
              >
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
