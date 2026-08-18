/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Eye, Sparkles, AlertCircle } from 'lucide-react';
import { SchoolCrest } from './SchoolCrest';

export const MissionView: React.FC = () => {
  return (
    <div id="hgass_mission_view" className="animate-fade-in py-12 sm:py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Page Head */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block bg-brand-green-light text-brand-green py-1 px-3.5" style={{ borderRadius: '4px' }}>
            <span className="text-xs uppercase tracking-widest font-heading font-bold">Divine Direction</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-none">
            Our Mission & Vision Statement
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
            Every academic step at Holy Ghost Academy Awka is driven by concrete milestones centered on intellectual growth and absolute moral character.
          </p>
        </div>

        {/* 1. MISSION VS VISION MODULAR CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          
          {/* Mission Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 sm:p-12 relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div className="absolute right-0 top-0 h-48 w-48 bg-brand-green/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
            <div className="space-y-6">
              <div className="h-14 w-14 rounded-xl bg-white border border-brand-green/20 shadow-xs flex items-center justify-center text-brand-green">
                <Target size={28} />
              </div>
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-green font-bold">The Strategic Task</span>
                <h2 className="text-xl sm:text-3xl font-heading font-extrabold text-slate-900">Our Sacred Mission</h2>
                <div className="h-1 w-12 bg-brand-green rounded" />
              </div>
              <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                Provide qualitative faith-based education that systematically develops intellectual, moral, spiritual, and social excellence in secondary school students, preparing them to be conscientious and high-performing leaders of tomorrow.
              </p>
            </div>
            <div className="pt-8 text-[11px] font-mono text-slate-400">
              HGASS MISSION • REGISTERED UNDER NIGERIAN EDUCATION BOARD
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 sm:p-12 relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div className="absolute right-0 top-0 h-48 w-48 bg-brand-oxblood/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
            <div className="space-y-6">
              <div className="h-14 w-14 rounded-xl bg-white border border-brand-oxblood/20 shadow-xs flex items-center justify-center text-brand-oxblood">
                <Eye size={28} />
              </div>
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-oxblood font-bold">The Future Anchor</span>
                <h2 className="text-xl sm:text-3xl font-heading font-extrabold text-slate-900">Our Noble Vision</h2>
                <div className="h-1 w-12 bg-brand-oxblood rounded" />
              </div>
              <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                To become a leading secondary school recognized both nationally and internationally for academic excellence, digital scientific innovation, and robust character formation, exporting high-value alumni to top global STEM universities.
              </p>
            </div>
            <div className="pt-8 text-[11px] font-mono text-slate-400">
              HGASS VISION • STATE & INTERNATIONAL ACCREDITATIONS
            </div>
          </div>

        </div>

        {/* 2. PROMINENT MOOTTO CONTAINER */}
        <div className="bg-gradient-to-br from-[#5C0000] to-[#3E0000] text-center p-8 sm:p-16 rounded-2xl text-white relative overflow-hidden shadow-xl border border-brand-oxblood">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,193,7,0.1),transparent)] pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <SchoolCrest size="lg" className="mx-auto" />
            
            <p className="text-[11px] font-mono text-brand-yellow uppercase tracking-widest font-extrabold">The School Motto</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight leading-tight text-white uppercase">
              "MORAL AND ACADEMICS (MALU CHUKWU, MALU AKWUKO)"
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl mx-auto leading-relaxed">
              Every teacher, prefect, assembly prayer, examination rule, and classroom homework is systematically aligned to defend, promote, and sustain this triple-bound integrity code.
            </p>
          </div>
        </div>

        {/* 3. CORE VALUES IN ANIMATED CARDS */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-brand-green">The Pillars of Action</span>
            <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-slate-950">Disciplinary Values Matrix</h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-lg mx-auto">
              How we train our students' minds and spirits to excel under structural conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence Driven",
                desc: "We encourage homework reviews, deep peer-to-peer science laboratory experiments, and competitive math exercises to push mental limits.",
                tip: "WAEC Gold Standard Tracker",
                icon: "🏅"
              },
              {
                title: "Character First",
                desc: "Moral talks, regular pastoral guidance, high respect metrics, neat uniform checks, and punctual assembly attendance codes are mandated.",
                tip: "Zero Bullying tolerance",
                icon: "🤝"
              },
              {
                title: "Scientific Inquiry",
                desc: "Every student must master algorithm flowcharts and basic software operation tools, performing active coding drill practices weekly.",
                tip: "STEM Lab modern upgrades",
                icon: "💻"
              }
            ].map((card, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 border border-slate-100 p-8 rounded-xl space-y-4 hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="text-4xl">{card.icon}</div>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">{card.desc}</p>
                </div>
                
                <div className="pt-4 border-t border-slate-200/50 flex items-center space-x-2 text-[10px] text-brand-green font-mono uppercase font-bold">
                  <Sparkles size={12} className="text-brand-yellow animate-spin-slow" />
                  <span>{card.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
