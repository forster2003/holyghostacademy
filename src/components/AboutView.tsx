/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { History, Award, Heart, HelpCircle, Users, CheckSquare } from 'lucide-react';
import { MANAGEMENT_TEAM } from '../data';

export const AboutView: React.FC = () => {
  return (
    <div id="hgass_about_view" className="animate-fade-in py-12 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16sm:space-y-24">
        
        {/* Header Breadcrumb */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block bg-brand-green-light text-brand-green py-1 px-3.5 rounded text-xs font-heading font-semibold uppercase tracking-wider">
            Who We Are
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-none">
            Our Rich History & Philosophy
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-light leading-relaxed">
            Founded with a vision to revolutionize qualitative secondary school learning in Awka, Holy Ghost Academy remains a fortress of wisdom and Christian discipline.
          </p>
        </div>

        {/* 1. HISTORY SECTOR */}
        <div className="bg-white border border-slate-100 rounded-xl shadow-xs p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-3 text-brand-green font-heading font-bold text-lg">
              <History size={22} className="text-brand-green" />
              <span>Our Founding Journey</span>
            </div>
            
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              <p>
                Holy Ghost Academy Secondary School, Awka, was established in September 2001 by Pentecostal ministries in Awka to address a critical vacuum: the need for a non-boarding/boarding hybrid high school that offers standard western STEM education without compromising on deep prayer life and integrity discipline.
              </p>
              <p>
                Beginning with just two classroom blocks and a handful of pioneering teachers, the school quickly earned public trust through stellar performance in inter-school quizzes and external WAEC examinations.
              </p>
              <p>
                In 2012, under the stewardship of our patron pastors, we completed our transition to the multi-wing campus at <span className="font-semibold text-slate-800">Kamali Homes, Ngozika Housing Estate</span>. This gated estate provides the absolute quietness, safety, and security crucial for intensive learning, free from public transport nuisance or external commercial noise. Today, we stand proud as an academic gold standard in Anambra State.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-brand-green opacity-95 rounded-lg transform rotate-2 scale-102" />
            <div className="relative overflow-hidden rounded-lg shadow-lg border border-slate-100 bg-white p-6 text-center space-y-4">
              <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Our Founding Motto</p>
              <p className="text-lg font-heading font-bold text-slate-900 italic">
                "Moral and Academics (MALU CHUKWU, MALU AKWUKO)"
              </p>
              <div className="h-0.5 w-12 bg-brand-yellow mx-auto" />
              <p className="text-xs text-slate-400 font-light max-w-xs mx-auto">
                Guiding every educational instruction, disciplinary measure, and athletic contest of the school since 2001.
              </p>
            </div>
          </div>
        </div>

        {/* 2. PHILOSOPHY & VALUES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Pedagogic Philosophy */}
          <div className="bg-white border border-slate-100 rounded-xl p-8 space-y-4 shadow-xs">
            <div className="p-3 bg-brand-oxblood-light text-brand-oxblood rounded-lg inline-block">
              <Heart size={20} className="text-brand-oxblood" />
            </div>
            <h3 className="text-lg font-heading font-bold text-slate-950">Educational Philosophy</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
              We look at study as a structural dialog with truth. We believe that every student has an intrinsic potential for extreme leadership. It is our administrative role to eliminate distractions, structure consistent analytical tasks, teach scientific models, and tutor the moral will to ensure they succeed.
            </p>
          </div>

          {/* Social Service */}
          <div className="bg-white border border-slate-100 rounded-xl p-8 space-y-4 shadow-xs">
            <div className="p-3 bg-brand-green-light text-brand-green rounded-lg inline-block">
              <Award size={20} className="text-brand-green" />
            </div>
            <h3 className="text-lg font-heading font-bold text-slate-950">Disciplinary Stand</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
              We maintain a zero-tolerance policy against bullying, exams malpractice, insolence, and general sloth. Disciplinary records are maintained in our student files and reviewed at parent-teacher councils to align school support systems with home environments.
            </p>
          </div>

        </div>

        {/* 3. CORE VALUES GRID */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-slate-900">
              Our Core Cultural Values
            </h2>
            <div className="h-1 bg-brand-yellow w-12 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "Excellence", desc: "Setting superior standards in study, analysis, research, and life goals.", icon: "🌟", bg: "bg-emerald-50 border-emerald-100" },
              { title: "Integrity", desc: "Honesty in studies, exam codes, and inter-personal friendships under God.", icon: "⚖️", bg: "bg-rose-50 border-rose-100" },
              { title: "Discipline", desc: "Punctuality, neat uniforms, respect for instructions, and structural task work.", icon: "⚓", bg: "bg-amber-50 border-amber-100" },
              { title: "Service", desc: "Using intellectual power to support peers, family, and public community growth.", icon: "🤝", bg: "bg-blue-50 border-blue-100" },
              { title: "Leadership", desc: "Fostering absolute self-reliance, eloquent speech, and ethical management.", icon: "👑", bg: "bg-purple-50 border-purple-100" }
            ].map((v, i) => (
              <div key={i} className={`p-6 rounded-xl border shadow-xs text-center space-y-3 ${v.bg} transition-transform hover:-translate-y-1.5 duration-300`}>
                <div className="text-3xl">{v.icon}</div>
                <h4 className="font-heading font-bold text-sm text-slate-950">{v.title}</h4>
                <p className="text-[11px] text-slate-500 font-light leading-normal leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. MANAGEMENT PROFILE CARDS */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-brand-green font-heading font-bold text-lg">
              <Users size={20} className="text-brand-green" />
              <span>Academy Directors Council</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-slate-900">
              School Management Profiles
            </h2>
            <div className="h-1 bg-brand-green w-12 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MANAGEMENT_TEAM.map((member, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-5 p-6">
                  {member.image && (
                    <div className="h-64 w-full rounded-lg overflow-hidden bg-slate-50 border border-slate-100">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-top filter sepia/10" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-heading font-extrabold text-slate-900 leading-tight">{member.name}</h3>
                    <p className="text-brand-green text-xs font-semibold uppercase font-heading">{member.role}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{member.qualifications}</p>
                  </div>
                </div>
                <div className="bg-slate-50 py-4 px-6 border-t border-slate-100">
                  <p className="text-xs text-slate-500 font-light italic leading-relaxed">
                    "{member.message}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
