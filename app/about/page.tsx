"use client";
import { motion } from "framer-motion";
import { Heart, Globe, Sparkles } from "lucide-react";
import Image from "next/image";

const team = [
  {
    name: "Aryan Tele",
    role: "Backend Engineer",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Aryan"
  },
  {
    name: "Laukik Marathe",
    role: "Product Designer",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Priya"
  },
  {
    name: "Vaidehi Kale",
    role: "AI Researcher",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Rahul"
  },
  {
    name: "Sakshi Changan",
    role: "Frontend Engineer",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Sneha"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 flex flex-col items-center mt-20 ">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-blue-100 mb-8 text-center drop-shadow-lg"
      >
        About Us
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-3xl text-blue-200 text-lg mb-12 text-center"
      >
        <p className="mb-6">
          <span className="inline-block align-middle mr-2"><Sparkles className="inline h-6 w-6 text-blue-400" /></span>
          <span className="font-semibold text-blue-100">Care AI</span> is on a mission to revolutionize customer service with the power of artificial intelligence. Our platform empowers businesses to deliver instant, human-like support at scale, delighting customers and driving growth.
        </p>
        <p className="mb-6">
          <span className="inline-block align-middle mr-2"><Heart className="inline h-6 w-6 text-pink-400" /></span>
          We believe in technology that cares. Our vision is to make every customer interaction seamless, empathetic, and efficient—no matter where you are in the world.
        </p>
        <p>
          <span className="inline-block align-middle mr-2"><Globe className="inline h-6 w-6 text-emerald-400" /></span>
          Built by a passionate team of engineers, designers, and AI researchers, Care AI is trusted by businesses globally to automate conversations, analyze insights, and create memorable experiences.
        </p>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-2xl md:text-3xl font-bold text-blue-100 mb-6 text-center"
      >
        Meet the Team
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl mb-16">
        {team.map((member, idx) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
            className="flex flex-col items-center bg-slate-900/80 border border-blue-700/30 shadow-xl rounded-2xl backdrop-blur-md p-6 hover:scale-105 hover:shadow-blue-700/20 transition-transform duration-300 group"
          >
            <div className="relative mb-4">
              <Image
                src={member.avatar}
                alt={member.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full border-4 border-blue-700/30 object-cover bg-slate-800 shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)' }}
              />
              <span className="absolute -bottom-2 -right-2 text-2xl select-none">
                {idx === 0 ? "🤖" : idx === 1 ? "🎨" : idx === 2 ? "🧠" : "💬"}
              </span>
            </div>
            <div className="text-blue-100 text-lg font-semibold mb-1">{member.name}</div>
            <div className="text-blue-300 text-sm">{member.role}</div>
          </motion.div>
        ))}
      </div>
      <div className="text-blue-400 text-center text-sm opacity-70">
        &copy; {new Date().getFullYear()} Care AI. All rights reserved.
      </div>
    </div>
  );
} 