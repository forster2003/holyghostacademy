/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, AlertTriangle, TrendingUp, Sparkles, Plus, Landmark } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const ProjectsView: React.FC = () => {
  const { projects } = useSchool();

  return (
    <div id="hgass_projects_view" className="animate-fade-in py-12 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Page Head */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block bg-brand-green-light text-brand-green py-1 px-3.5 rounded text-xs font-heading font-semibold uppercase tracking-wider">
            Transparency Council
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-none">
            Major Strategic & Structural Projects
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-light leading-relaxed">
            In our commitment to global education standards, we run consistent developmental upgrades. Review budgets, timelines, and live completion indices for our active construction efforts below.
          </p>
        </div>

        {/* Major Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((proj) => {
            const isCompleted = proj.percentageCompletion >= 100;

            return (
              <div 
                key={proj.id} 
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Image & Header */}
                <div className="space-y-5 p-6 sm:p-8">
                  {proj.image && (
                    <div className="h-56 w-full rounded-xl overflow-hidden bg-slate-100 relative">
                      <img 
                        src={proj.image} 
                        alt={proj.title} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        {isCompleted ? (
                          <span className="bg-brand-green text-white text-[10px] font-heading font-bold px-3 py-1 rounded shadow-sm uppercase tracking-wider">
                            ✓ fully Operational
                          </span>
                        ) : (
                          <span className="bg-brand-yellow text-slate-900 text-[10px] font-heading font-bold px-3 py-1 rounded shadow-sm uppercase tracking-wider animate-pulse">
                            ⚙ Construction Phase
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-2xl font-extrabold font-heading text-slate-800 leading-tight">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                </div>

                {/* Tracking Data Matrix */}
                <div className="bg-slate-50/70 p-6 sm:p-8 border-t border-slate-100 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white rounded-lg border border-slate-100 text-center">
                      <p className="text-[10px] font-mono text-slate-400 uppercase">Project Budget</p>
                      <p className="text-sm font-heading font-bold text-brand-green">{proj.budget}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-slate-100 text-center overflow-hidden">
                      <p className="text-[10px] font-mono text-slate-400 uppercase">Target Handover</p>
                      <p className="text-xs font-heading font-bold text-slate-700 truncate">{proj.expectedCompletionDate}</p>
                    </div>
                  </div>

                  {/* Timelines Info */}
                  <div className="flex items-center space-x-3 text-xs text-slate-500 font-light justify-between px-1">
                    <div className="flex items-center space-x-1.5">
                      <Calendar size={13} className="text-slate-400" />
                      <span>Kickoff: <span className="font-semibold">{proj.startDate}</span></span>
                    </div>
                    <span>Progress Index: <span className="font-bold text-slate-800">{proj.percentageCompletion}%</span></span>
                  </div>

                  {/* Progress Line */}
                  <div className="space-y-1.5">
                    <div className="h-3 bg-slate-200/80 rounded-full overflow-hidden border border-slate-200">
                      <div 
                        className="bg-brand-green h-full rounded-full transition-all duration-1000"
                        style={{ width: `${proj.percentageCompletion}%` }}
                      />
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Transparency Disclaimer */}
        <div className="bg-slate-900 text-slate-300 rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-xl flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-between">
          <div className="flex items-start space-x-4">
            <div className="h-12 w-12 rounded bg-slate-800 inline-flex items-center justify-center text-brand-yellow shrink-0 mt-1">
              <Landmark size={22} />
            </div>
            <div className="space-y-1">
              <h4 className="font-heading font-bold text-white text-sm sm:text-base leading-tight">Auditable Project Funds Transparency Code</h4>
              <p className="text-xs text-slate-400 font-light leading-normal leading-relaxed max-w-xl">
                All development capital is audited by the PTA budget council. Budgets displayed are fully funded. No public loans are carried by Holy Ghost Academy for development.
              </p>
            </div>
          </div>
          <div className="text-[11px] font-mono bg-slate-800 px-3.5 py-1.5 rounded text-brand-yellow uppercase tracking-wider shrink-0 select-none">
            PTA AUDITED: SECURE
          </div>
        </div>

      </div>
    </div>
  );
};
