"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Shield, Zap, Phone, Users, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Sparkles className="h-8 w-8 text-blue-400" />,
    title: "AI-Powered Conversations",
    desc: "Leverage advanced AI to automate and enhance customer interactions, providing instant, accurate, and human-like responses 24/7."
  },
  {
    icon: <Phone className="h-8 w-8 text-teal-400" />,
    title: "Omnichannel Support",
    desc: "Seamlessly manage calls, chats, and emails from a unified dashboard, ensuring consistent service across all channels."
  },
  {
    icon: <Shield className="h-8 w-8 text-purple-400" />,
    title: "Enterprise-Grade Security",
    desc: "Your data is protected with end-to-end encryption, role-based access, and compliance with global standards."
  },
  {
    icon: <Users className="h-8 w-8 text-emerald-400" />,
    title: "Team Collaboration",
    desc: "Assign, monitor, and collaborate on customer queries in real time, boosting productivity and customer satisfaction."
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-amber-400" />,
    title: "Advanced Analytics",
    desc: "Gain actionable insights with real-time analytics, call summaries, and performance dashboards."
  },
  {
    icon: <Zap className="h-8 w-8 text-pink-400" />,
    title: "Instant Integrations",
    desc: "Connect with your favorite tools and CRMs in seconds, with no-code and low-code integration options."
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-blue-100 mb-8 text-center drop-shadow-lg"
      >
        Features
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <Card className="bg-slate-900/80 border border-blue-700/30 shadow-xl rounded-2xl backdrop-blur-md hover:scale-105 hover:shadow-blue-700/20 transition-transform duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {feature.icon}
                <CardTitle className="text-blue-100 text-xl font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-200 text-base pt-0">
                {feature.desc}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 