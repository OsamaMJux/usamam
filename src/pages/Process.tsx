import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2, MessageCircle } from 'lucide-react';

const phases = [
  {
    id: "01",
    title: "Discover & Define",
    subtitle: "Clarity and Positioning",
    hook: "Figure out who you are. Say it clearly. Show it boldly.",
    description: "We dig deep to understand your customers, market, and value. Then craft a confident, distinctive positioning that becomes the foundation for everything that follows.",
    deliverables: ["Kick-off call", "Discovery", "Positioning workshop", "Brand synthesis"],
    image: "/strategy-mockup.png" // Replace with your image path
  },
  {
    id: "02",
    title: "Ideate & Design",
    subtitle: "Brand identity that connects",
    hook: "Look like you belong. Sound like you mean it. Show up like a leader.",
    description: "Translating strategic insight into a brand that actually sticks. We build a full identity system that's distinct, scalable, and built for market traction.",
    deliverables: ["Moodboards", "Brand Identity", "Visual System", "Interactive Prototypes"],
    image: "/design-mockup.png"
  },
  {
    id: "03",
    title: "Build & Launch",
    subtitle: "Websites built to convert",
    hook: "Turn interest into action. Build trust fast. Scale without tech debt.",
    description: "I design and build high-converting websites that close the credibility gap, attract the right people, and support growth from day one.",
    deliverables: ["UX / Wireframes", "UI Design", "Technical SEO", "Development & QA"],
    image: "/launch-mockup.png"
  }
];

export default function ProcessPage() {
  const [activeTab, setActiveTab] = useState("01");

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-black font-sans selection:bg-red-500 selection:text-white">
      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6 text-center bg-black text-white">
        <motion.p 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4"
        >
          Rise above the noise
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Three phases.<br/><span className="text-gray-600 font-medium italic">One powerful shift.</span>
        </motion.h1>
      </section>

      {/* INTERACTIVE PROCESS SECTION */}
      <section className="max-w-6xl mx-auto py-24 px-6">
        <div className="space-y-4">
          {phases.map((phase) => (
            <div 
              key={phase.id}
              onClick={() => setActiveTab(phase.id)}
              className={`group relative border rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden ${
                activeTab === phase.id ? 'bg-white border-gray-200 shadow-2xl scale-[1.01]' : 'bg-transparent border-gray-100 hover:border-gray-300'
              }`}
            >
              {/* HEADER AREA */}
              <div className="p-8 md:p-12 flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <span className={`text-2xl font-bold ${activeTab === phase.id ? 'text-black' : 'text-gray-300'}`}>
                    {phase.id}
                  </span>
                  <div>
                    <h3 className={`text-2xl md:text-4xl font-bold tracking-tight ${activeTab === phase.id ? 'text-black' : 'text-gray-400'}`}>
                      {phase.subtitle}
                    </h3>
                    <p className={`text-lg mt-1 font-medium ${activeTab === phase.id ? 'text-gray-600' : 'text-gray-400'}`}>
                      {phase.title}
                    </p>
                  </div>
                </div>
                <div className={`hidden md:block transition-transform duration-500 ${activeTab === phase.id ? 'rotate-90' : ''}`}>
                  <ChevronRight size={32} className={activeTab === phase.id ? 'text-black' : 'text-gray-300'} />
                </div>
              </div>

              {/* EXPANDABLE CONTENT */}
              <AnimatePresence>
                {activeTab === phase.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-8 md:px-12 pb-12 grid md:grid-cols-2 gap-12 border-t border-gray-50 pt-12">
                      <div className="space-y-8">
                        <h4 className="text-xl font-bold text-black leading-snug">
                          {phase.hook}
                        </h4>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {phase.description}
                        </p>
                        
                        <div className="space-y-4">
                          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Process + Deliverables</p>
                          <div className="grid grid-cols-2 gap-3">
                            {phase.deliverables.map((item) => (
                              <div key={item} className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                <CheckCircle2 size={16} className="text-black" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* VISUAL MOCKUP AREA */}
                      <div className="bg-gray-100 rounded-2xl aspect-video md:aspect-square overflow-hidden border border-gray-200 shadow-inner">
                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium italic">
                          {/* Insert your actual project screenshots here */}
                          [Visual Showcase: {phase.subtitle}]
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA (Built to Convert) */}
      <section className="bg-white py-24 px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Need clarity first? Start here.</h2>
          <p className="text-xl text-gray-600">Get instant clarity on your brand or website. No fluff, no commitment.</p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="p-8 border-2 border-black rounded-3xl text-left hover:bg-black hover:text-white transition-colors group cursor-pointer">
              <div className="flex justify-between mb-4">
                <span className="font-bold uppercase tracking-tighter">Brand Strategy Workshop</span>
                <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold group-hover:bg-white group-hover:text-black">FREE</span>
              </div>
              <p className="text-sm opacity-80">Free 30-min session to help clarify your positioning, message, and audience.</p>
            </div>
            
            <div className="p-8 border-2 border-black rounded-3xl text-left hover:bg-black hover:text-white transition-colors group cursor-pointer">
              <div className="flex justify-between mb-4">
                <span className="font-bold uppercase tracking-tighter">Website Audit</span>
                <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold group-hover:bg-white group-hover:text-black">FREE</span>
              </div>
              <p className="text-sm opacity-80">A tactical plan for what your site actually needs to convert. 30-min session.</p>
            </div>
          </div>
          
          <button className="mt-12 bg-black text-white px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 mx-auto hover:scale-105 transition-transform">
            <MessageCircle size={20} />
            Book an intro call
          </button>
        </div>
      </section>
    </div>
  );
}