"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap, Star, Shield } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "Free",
    features: [
      "Up to 100 calls/month",
      "Basic analytics",
      "Community support",
      "1 agent seat"
    ],
    icon: <Star className="h-7 w-7 text-blue-400" />,
    highlight: false
  },
  {
    name: "Pro",
    price: "₹2,499/mo",
    features: [
      "Up to 5,000 calls/month",
      "Advanced analytics",
      "Priority support",
      "Up to 10 agent seats",
      "Integrations"
    ],
    icon: <Zap className="h-7 w-7 text-teal-400" />,
    highlight: true
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    features: [
      "Unlimited calls",
      "Custom analytics",
      "Dedicated support",
      "Unlimited agent seats",
      "Custom integrations",
      "Enterprise security"
    ],
    icon: <Shield className="h-7 w-7 text-purple-400" />,
    highlight: false
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-blue-100 mb-8 text-center drop-shadow-lg"
      >
        Pricing
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <Card className={`bg-slate-900/80 border ${plan.highlight ? "border-teal-400 shadow-lg scale-105" : "border-blue-700/30 shadow-xl"} rounded-2xl backdrop-blur-md hover:scale-105 hover:shadow-blue-700/20 transition-transform duration-300`}>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {plan.icon}
                <CardTitle className="text-blue-100 text-xl font-semibold">
                  {plan.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-200 text-base pt-0">
                <div className="text-3xl font-bold mb-4 text-blue-100">{plan.price}</div>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" /> {feature}
                    </li>
                  ))}
                </ul>
                {plan.name === "Enterprise" ? (
                  <a href="mailto:sales@careai.com" className="inline-block w-full text-center py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold hover:from-blue-700 hover:to-purple-600 transition-all">Contact Sales</a>
                ) : (
                  <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold hover:from-blue-700 hover:to-teal-600 transition-all">Choose {plan.name}</button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 