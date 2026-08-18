/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Layers, Award, Sparkles, Star } from 'lucide-react';
import { SUBJECTS_GUIDE } from '../data';

export const SubjectsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jss' | 'ss'>('jss');

  const selectedSubjects = SUBJECTS_GUIDE[activeTab];

  return (
    <div id="hgass_subjects_view" className="animate-fade-in py-12 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Page Head */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block bg-brand-green-light text-brand-green py-1 px-3.5 rounded text-xs font-heading font-semibold uppercase tracking-wider">
            Academic Track
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-none">
            Curriculum & Subjects Offered
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-light leading-relaxed">
            We offer a balanced academic curriculum structured under West African Examination Council (WAEC), NECO, and Basic Education Certificate Examination (BECE) guidelines.
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex items-center justify-center space-x-4 max-w-sm mx-auto bg-slate-200/60 p-1.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('jss')}
            className={`flex-1 py-3 px-4 rounded-lg font-heading font-bold text-center tracking-wide transition-all duration-300 text-xs sm:text-sm ${
              activeTab === 'jss'
                ? 'bg-brand-green text-white shadow-md'
                : 'text-slate-600 hover:text-brand-green'
            }`}
          >
            Junior Secondary (JSS1 - JSS3)
          </button>
          <button
            onClick={() => setActiveTab('ss')}
            className={`flex-1 py-3 px-4 rounded-lg font-heading font-bold text-center tracking-wide transition-all duration-300 text-xs sm:text-sm ${
              activeTab === 'ss'
                ? 'bg-brand-green text-white shadow-md'
                : 'text-slate-600 hover:text-brand-green'
            }`}
          >
            Senior Secondary (SS1 - SS3)
          </button>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedSubjects.map((subject, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-100 rounded-xl p-6 hover:shadow-md transition-shadow group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="h-10 w-10 rounded bg-brand-green-light text-brand-green-hover flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-colors">
                    <BookOpen size={18} />
                  </div>
                  
                  {/* Subject Track Labels */}
                  {activeTab === 'ss' && ['Physics', 'Chemistry', 'Biology'].includes(subject.name) && (
                    <span className="text-[9px] font-heading font-bold bg-brand-oxblood-light text-brand-oxblood py-0.5 px-2.5 rounded-full uppercase tracking-wider">
                      Core Science
                    </span>
                  )}
                  {activeTab === 'ss' && ['Literature-in-English', 'Government', 'Igbo'].includes(subject.name) && (
                    <span className="text-[9px] font-heading font-bold bg-amber-50 text-brand-yellow-hover py-0.5 px-2.5 rounded-full uppercase tracking-wider">
                      Core Arts
                    </span>
                  )}
                  {activeTab === 'ss' && ['Economics', 'Commerce'].includes(subject.name) && (
                    <span className="text-[9px] font-heading font-bold bg-blue-50 text-blue-600 py-0.5 px-2.5 rounded-full uppercase tracking-wider">
                      Core Commercial
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-heading font-bold text-slate-800 group-hover:text-brand-green transition-colors leading-snug">
                    {subject.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-light leading-normal leading-relaxed">
                    {subject.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 mt-4 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>BECE / WAEC COMPLIANT</span>
                <Star size={12} className="text-brand-yellow shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Curriculum Framework Summary Banner */}
        <div className="bg-brand-oxblood-light border border-brand-oxblood/10 p-6 sm:p-10 rounded-2xl flex flex-col sm:flex-row gap-6 items-center">
          <div className="h-12 w-12 rounded bg-white shadow-xs text-brand-oxblood flex items-center justify-center shrink-0">
            <Award size={22} className="text-brand-oxblood" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading font-extrabold text-slate-900 text-sm sm:text-base">National Secondary Curriculum Integrity Certification</h4>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-snug leading-relaxed">
              All courses are fully approved. Science practical sessions are supervised inside modern lab spaces. Disciplinary logs are kept for all lab sessions.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
