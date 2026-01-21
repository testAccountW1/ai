import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, FileText, HelpCircle } from 'lucide-react';
import { Button, Card, Input, Select } from '../../components/ui';

const contactReasons = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'application', label: 'Loan Application' },
  { value: 'payment', label: 'Payment Question' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'complaint', label: 'File a Complaint' },
  { value: 'other', label: 'Other' },
];

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone',
    description: 'Speak with our support team',
    value: '1-800-QUICKFUND',
    action: 'tel:1-800-784-2538',
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'Get a response within 24 hours',
    value: 'support@quickfund.com',
    action: 'mailto:support@quickfund.com',
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Chat with us in real-time',
    value: 'Available 24/7',
    action: '#',
  },
];

const quickLinks = [
  { icon: FileText, title: 'FAQs', description: 'Find answers to common questions', href: '/#faq' },
  { icon: HelpCircle, title: 'Help Center', description: 'Browse our knowledge base', href: '/help' },
];

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reason: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-secondary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
          </p>
          <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to our team
            and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-white border-b">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className="group"
              >
                <Card className="text-center hover:shadow-xl transition-all h-full">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors">
                    <method.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{method.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{method.description}</p>
                  <p className="text-primary-600 font-medium">{method.value}</p>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="John"
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Doe"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <Select
                    label="Reason for Contact"
                    name="reason"
                    options={contactReasons}
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Select a reason"
                  />
                  <div className="w-full">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </div>
                  <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full md:w-auto">
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Office Info */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-900 font-medium">Headquarters</p>
                      <p className="text-gray-600 text-sm">
                        123 Finance Street<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-900 font-medium">Business Hours</p>
                      <p className="text-gray-600 text-sm">
                        Monday - Friday: 9AM - 8PM EST<br />
                        Saturday: 10AM - 6PM EST<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Links */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <link.icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{link.title}</p>
                        <p className="text-sm text-gray-500">{link.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </Card>

              {/* Emergency */}
              <Card className="bg-primary-50 border border-primary-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Immediate Help?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  For urgent matters related to your account or payments, call our priority line.
                </p>
                <a href="tel:1-800-784-2538">
                  <Button variant="primary" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Priority Support
                  </Button>
                </a>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-64 md:h-96 bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>Map would be displayed here</p>
            <p className="text-sm">123 Finance Street, New York, NY 10001</p>
          </div>
        </div>
      </section>
    </div>
  );
}
