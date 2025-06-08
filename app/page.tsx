"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Brain, ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative mx-auto px-6 py-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 relative"
            >
              <div className="relative w-32 h-32 mx-auto">
                {/* Animated circles */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border-2 border-blue-400/30"
                />
                <motion.div
                  animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border-2 border-teal-400/30"
                />
                {/* Brain icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-16 h-16 text-blue-400" />
                </div>
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-xl" />
              </div>
            </motion.div>
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400">
              Revolutionize Your Customer Service with AI
            </h1>
            <p className="text-xl mb-12 max-w-2xl mx-auto text-blue-100">
              Harness the power of artificial intelligence to provide exceptional
              customer experiences through intelligent call management.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/dashboard" className="flex items-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-blue-400 text-blue-400 hover:bg-blue-400/10"
              >
                <Link href="#features" className="flex items-center gap-2">
                  Learn More <Sparkles className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Why Choose Our AI Call Center Solution?
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Experience the future of customer service with our cutting-edge AI technology
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-teal-400" />}
              title="Lightning Fast Response"
              description="Our AI analyzes customer queries in real-time to provide instant, accurate responses."
            />
            <FeatureCard
              icon={<Brain className="w-12 h-12 text-purple-400" />}
              title="AI-Powered Insights"
              description="Gain valuable insights from every call to continuously improve your customer service strategies."
            />
            <FeatureCard
              icon={<Shield className="w-12 h-12 text-blue-400" />}
              title="Enterprise Security"
              description="Bank-grade security with end-to-end encryption and compliance with global standards."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <StatCard
              number="99.9%"
              label="Uptime"
              description="Guaranteed service availability"
            />
            <StatCard
              number="50K+"
              label="Calls Handled"
              description="Daily AI-powered interactions"
            />
            <StatCard
              number="24/7"
              label="Support"
              description="Round-the-clock assistance"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Choose the Perfect Plan for Your Business
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Scale your customer service with our flexible pricing options
            </p>
          </motion.div>
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
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              What Our Customers Say
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Join thousands of satisfied businesses transforming their customer service
            </p>
          </motion.div>
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
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        <div className="container relative mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-white">
              Ready to Transform Your Customer Service?
            </h2>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/dashboard" className="flex items-center gap-2">
                  Start Your Free Trial <Sparkles className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
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
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col items-center text-center p-8 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
    >
      <div className="mb-4 p-3 rounded-full bg-slate-700/50">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-blue-200">{description}</p>
    </motion.div>
  );
}

function StatCard({
  number,
  label,
  description,
}: {
  number: string;
  label: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="text-center p-8 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
    >
      <h3 className="text-4xl font-bold text-white mb-2">{number}</h3>
      <p className="text-xl text-blue-400 mb-2">{label}</p>
      <p className="text-blue-200">{description}</p>
    </motion.div>
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
    <motion.div
      whileHover={{ y: -5 }}
      className={`border rounded-xl p-8 transition-all duration-300 ${
        highlighted 
          ? "border-blue-500 bg-slate-800/50 backdrop-blur-sm" 
          : "border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-blue-500/50"
      }`}
    >
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-4xl font-bold mb-6 text-white">
        {price}
        <span className="text-xl font-normal text-blue-200">/month</span>
      </p>
      <ul className="mb-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="w-5 h-5 text-teal-400 mr-2 flex-shrink-0" />
            <span className="text-blue-200">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        asChild
        className={`w-full ${
          highlighted 
            ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600" 
            : "bg-slate-700/50 hover:bg-slate-700 text-white"
        }`}
      >
        <Link href="/dashboard" className="flex items-center justify-center gap-2">
          Choose Plan <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </motion.div>
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
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
    >
      <div className="mb-4 text-4xl text-blue-400">&quot;</div>
      <p className="text-blue-200 mb-6 text-lg">{quote}</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold">
          {author.charAt(0)}
        </div>
        <div className="ml-4">
          <p className="font-semibold text-white">{author}</p>
          <p className="text-sm text-blue-200">{company}</p>
        </div>
      </div>
    </motion.div>
  );
}
