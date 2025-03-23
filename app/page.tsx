import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Brain, BarChart } from "lucide-react";
import type React from "react"; // Added import for React

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-24 flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold mb-6">
            Revolutionize Your Customer Service with AI
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            Harness the power of artificial intelligence to provide exceptional
            customer experiences through intelligent call management.
          </p>
          {/* <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            <Link href="/dashboard">Sign In</Link>
          </Button> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our AI Call Center Solution?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Phone className="w-12 h-12 text-blue-500" />}
              title="Intelligent Call Routing"
              description="Our AI analyzes customer queries in real-time to connect them with the most suitable agent or solution."
            />
            <FeatureCard
              icon={<Brain className="w-12 h-12 text-blue-500" />}
              title="AI-Powered Insights"
              description="Gain valuable insights from every call to continuously improve your customer service strategies."
            />
            <FeatureCard
              icon={<BarChart className="w-12 h-12 text-blue-500" />}
              title="Advanced Analytics"
              description="Comprehensive dashboards and reports to track performance and identify areas for improvement."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Choose the Perfect Plan for Your Business
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title="Starter"
              price="$99"
              features={[
                "Up to 1,000 AI-powered calls/month",
                "Basic analytics",
                "Email support",
              ]}
            />
            <PricingCard
              title="Professional"
              price="$299"
              features={[
                "Up to 10,000 AI-powered calls/month",
                "Advanced analytics",
                "24/7 priority support",
                "Custom AI training",
              ]}
              highlighted={true}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              features={[
                "Unlimited AI-powered calls",
                "Full-suite analytics",
                "Dedicated account manager",
                "Custom integrations",
                "On-premise deployment options",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <TestimonialCard
              quote="Implementing this AI call center solution has dramatically improved our customer satisfaction scores and reduced wait times."
              author="Jane Doe"
              company="Tech Innovators Inc."
            />
            <TestimonialCard
              quote="The insights we've gained from the AI-powered analytics have been game-changing for our business strategy."
              author="John Smith"
              company="Global Services Ltd."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ready to Transform Your Customer Service?
          </h2>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            <Link href="/dashboard">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function PricingCard({
  title,
  price,
  features,
  highlighted = false,
}: {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`border rounded-lg p-8 ${
        highlighted ? "border-blue-500 shadow-lg" : "border-gray-200"
      }`}
    >
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-4xl font-bold mb-6">
        {price}
        <span className="text-xl font-normal">/month</span>
      </p>
      <ul className="mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        asChild
        className={
          highlighted ? "w-full bg-blue-600 hover:bg-blue-700" : "w-full"
        }
      >
        <Link href="/dashboard">Choose Plan</Link>
      </Button>
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  company,
}: {
  quote: string;
  author: string;
  company: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-600 mb-4">&quot;{quote}&quot;</p>
      <p className="font-semibold">{author}</p>
      <p className="text-sm text-gray-500">{company}</p>
    </div>
  );
}
