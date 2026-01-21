import { Link } from 'react-router-dom';
import {
  Target,
  Heart,
  Shield,
  Users,
  Award,
  TrendingUp,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { Button, Card } from '../../components/ui';

const values = [
  {
    icon: Heart,
    title: 'Customer First',
    description:
      'Every decision we make starts with our customers. We build products and services that genuinely help people achieve their financial goals.',
  },
  {
    icon: Shield,
    title: 'Transparency',
    description:
      'No hidden fees, no surprises. We believe in clear communication and honest lending practices that build trust.',
  },
  {
    icon: Target,
    title: 'Innovation',
    description:
      'We leverage technology to make lending faster, simpler, and more accessible than traditional banks.',
  },
  {
    icon: Users,
    title: 'Inclusivity',
    description:
      'We believe everyone deserves access to fair credit. Our products are designed to serve a diverse range of financial needs.',
  },
];

const team = [
  {
    name: 'Sarah Chen',
    role: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    bio: 'Former VP at Goldman Sachs with 15+ years in fintech leadership.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'Built scalable platforms at Stripe and Square before joining QuickFund.',
  },
  {
    name: 'Emily Thompson',
    role: 'Chief Financial Officer',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face',
    bio: 'CPA with extensive experience in consumer lending and risk management.',
  },
  {
    name: 'David Park',
    role: 'Chief Marketing Officer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Led growth initiatives at multiple successful fintech startups.',
  },
];

const milestones = [
  { year: '2018', title: 'Founded', description: 'QuickFund was founded with a mission to democratize lending.' },
  { year: '2019', title: '$50M Funded', description: 'Reached our first $50 million in loans funded.' },
  { year: '2021', title: 'Series B', description: 'Raised $100M in Series B funding to expand operations.' },
  { year: '2023', title: '100K Customers', description: 'Celebrated serving over 100,000 satisfied customers.' },
  { year: '2024', title: '$2B Milestone', description: 'Surpassed $2 billion in total loans funded.' },
];

export function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Making Financial Dreams a Reality
            </h1>
            <p className="text-xl text-primary-100">
              We're on a mission to make lending simple, transparent, and accessible for everyone.
              Since 2018, we've helped over 150,000 customers achieve their financial goals.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600">$2B+</p>
              <p className="text-gray-600 mt-1">Loans Funded</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600">150K+</p>
              <p className="text-gray-600 mt-1">Customers Served</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600">50</p>
              <p className="text-gray-600 mt-1">States Served</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600">A+</p>
              <p className="text-gray-600 mt-1">BBB Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  QuickFund was founded in 2018 with a simple belief: getting a loan shouldn't be complicated.
                  Traditional banks make borrowers jump through hoops, wait weeks for decisions, and often hide
                  fees in fine print.
                </p>
                <p>
                  We set out to change that. By combining cutting-edge technology with a customer-first approach,
                  we've built a lending platform that's fast, transparent, and actually enjoyable to use.
                </p>
                <p>
                  Today, we're proud to have helped over 150,000 customers fund their dreams—whether it's
                  starting a business, consolidating debt, or covering life's unexpected expenses. And we're
                  just getting started.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-50" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="QuickFund team collaboration"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at QuickFund.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key milestones in our mission to transform lending.
            </p>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <Card className="inline-block">
                      <p className="text-2xl font-bold text-primary-600">{milestone.year}</p>
                      <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </Card>
                  </div>
                  <div className="hidden md:flex w-4 h-4 bg-primary-600 rounded-full relative z-10" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the experienced team leading QuickFund's mission.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center" padding="lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-primary-600 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-2">
                  <a
                    href="#"
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4 text-gray-600" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors"
                    aria-label={`${member.name}'s Twitter`}
                  >
                    <Twitter className="w-4 h-4 text-gray-600" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-12 bg-white border-y">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900">Awards & Recognition</h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center space-x-2 text-gray-400">
              <Award className="w-8 h-8" />
              <span className="font-medium">Best Fintech 2024</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <TrendingUp className="w-8 h-8" />
              <span className="font-medium">Inc. 5000</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Users className="w-8 h-8" />
              <span className="font-medium">Best Places to Work</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Shield className="w-8 h-8" />
              <span className="font-medium">SOC 2 Type II</span>
            </div>
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section id="careers" className="section bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Team</h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented people who share our passion for transforming finance.
            Check out our open positions and help us build the future of lending.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                View Open Positions
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
