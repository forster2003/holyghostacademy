/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Search, Printer, Download, Award, ShieldAlert, Sparkles, CheckCircle, FileText } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { StudentResult } from '../types';
import { SchoolCrest } from './SchoolCrest';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';

export const ResultsChecker: React.FC = () => {
  const { results } = useSchool();
  const [regNumber, setRegNumber] = useState('HGASS/2025/001'); // Pre-set for easy evaluation
  const [session, setSession] = useState('2025/2026');
  const [term, setTerm] = useState('2nd Term');
  
  const [activeResult, setActiveResult] = useState<StudentResult | null>(null);
  const [searchError, setSearchError] = useState('');

  const printRef = useRef<HTMLDivElement>(null);

  const triggerBrowserPrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (printRef.current) {
      const actionBar = document.getElementById('print_action_bar');
      if (actionBar) actionBar.style.display = 'none';

      try {
        const dataUrl = await htmlToImage.toJpeg(printRef.current, { quality: 0.98, backgroundColor: '#ffffff' });
        
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'in',
          format: 'a4'
        });

        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`HGASS_Result_${activeResult?.studentProfile.regNumber.replace(/\//g, '-')}_${activeResult?.academicSession.replace(/\//g, '-')}.pdf`);
      } catch (error) {
        console.error('Failed to generate PDF', error);
      } finally {
        if (actionBar) actionBar.style.display = 'flex';
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    setActiveResult(null);

    if (!regNumber.trim()) {
      setSearchError('Please fill in student Registration Number.');
      return;
    }

    const foundResult = results.find(
      (r) => 
        r.studentProfile.regNumber.trim().toLowerCase() === regNumber.trim().toLowerCase() &&
        r.academicSession === session &&
        r.term === term
    );

    if (foundResult) {
      setActiveResult(foundResult);
    } else {
      setSearchError('No matching academic sheet found. Verify Registration credentials, Session and Term filters.');
    }
  };


  return (
    <div id="hgass_results_checker" className="animate-fade-in py-12 sm:py-20 bg-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Page Head */}
        <div className="text-center space-y-3 print:hidden">
          <div className="inline-block bg-brand-green-light text-brand-green py-1 px-3.5 rounded text-xs font-heading font-semibold uppercase tracking-wider">
            Student Assessment Node
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight leading-none">
            Online Student Results Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed max-w-lg mx-auto">
            Input student credentials below to sync grades, continuous assessment totals, and class position remarks. Test with default sheet: <span className="font-semibold text-brand-green">HGASS/2025/001</span>.
          </p>
        </div>

        {/* 1. SEARCH FORM ACCORDION - Hidden in print */}
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs print:hidden">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-heading font-bold text-slate-700">Student Registration Number</label>
              <div className="relative">
                <input
                  type="text"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  placeholder="e.g. HGASS/2025/001"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-green/15 focus:outline-none focus:border-brand-green text-sm uppercase"
                />
                <Search className="absolute left-3 top-3 text-slate-400" size={15} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-heading font-bold text-slate-700">Academic Session</label>
              <div className="flex space-x-1">
                <input
                  type="text"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  placeholder="e.g. 2025/2026"
                  className="w-full bg-white p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green/15 focus:border-brand-green text-sm"
                />
                <select 
                  onChange={(e) => setSession(e.target.value)}
                  className="bg-white p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green/15 focus:border-brand-green text-sm w-12 shrink-0 px-1"
                  value={session}
                >
                  <option value="">...</option>
                  <option value="2022/2023">2022/2023</option>
                  <option value="2023/2024">2023/2024</option>
                  <option value="2024/2025">2024/2025</option>
                  <option value="2025/2026">2025/2026</option>
                  <option value="2026/2027">2026/2027</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-heading font-bold text-slate-700">Select Term</label>
              <select
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full bg-white p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green/15 focus:border-brand-green text-sm"
              >
                <option value="1st Term">1st Term</option>
                <option value="2nd Term">2nd Term</option>
                <option value="3rd Term">3rd Term</option>
              </select>
            </div>

            <div className="md:col-span-4 pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-brand-green hover:bg-brand-green-hover text-white text-xs font-heading font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <FileText size={15} />
                <span>Fetch Student Term Sheet</span>
              </button>
            </div>

          </form>

          {searchError && (
            <div className="mt-4 p-3 bg-rose-50 border border-brand-oxblood/10 text-brand-oxblood font-light text-xs rounded-lg flex items-center space-x-2 animate-shake">
              <ShieldAlert size={14} className="shrink-0" />
              <span>{searchError}</span>
            </div>
          )}
        </div>

        {/* 2. REPORT CARD DISPLAY BOX */}
        {activeResult ? (
          <div id="hgass_report_card_print_node" ref={printRef} className="bg-white border border-slate-200 shadow-xl rounded-2xl overflow-hidden p-6 sm:p-10 relative print:border-none print:shadow-none print:p-0">
            
            {/* Elegant watermarked crest behind table for authenticity */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
              <SchoolCrest size="xl" className="scale-150" />
            </div>

            {/* Print action bar header - hidden in print */}
            <div id="print_action_bar" className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-6 mb-8 print:hidden gap-4">
              <div className="flex items-center space-x-2 text-brand-green text-xs font-heading font-bold">
                <CheckCircle size={15} className="text-brand-green animate-pulse" />
                <span>Assessment Sheet Loaded successfully</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={triggerBrowserPrint}
                  className="inline-flex items-center space-x-1.5 py-1.5 px-3 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-heading font-bold rounded shadow-xs"
                >
                  <Printer size={13} />
                  <span>Print Grade Book</span>
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center space-x-1.5 py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-heading font-bold rounded shadow-xs"
                >
                  <Download size={13} />
                  <span>Download PDF Report</span>
                </button>
              </div>
            </div>

            {/* Report Card Official Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left border-b-2 border-slate-900 pb-8 gap-6">
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <SchoolCrest size="lg" />
                <div className="space-y-1">
                  <h2 className="text-lg sm:text-3xl font-extrabold font-heading text-[#5C0000] tracking-tight leading-none select-none">
                    HOLY GHOST ACADEMY
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-green font-heading font-bold tracking-widest uppercase">
                    Secondary School, Awka
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono font-medium leading-none leading-relaxed">
                    Kamali Campus, Ngozika Estate, Awka, Anambra State, Nigeria
                  </p>
                </div>
              </div>

              <div className="border border-slate-300 p-3 rounded-lg text-center bg-slate-50 min-w-[200px] select-none shadow-inner print:border-slate-800">
                <h4 className="text-[10px] uppercase font-mono text-slate-400 font-bold">Official Term Report</h4>
                <p className="text-sm font-heading font-bold text-slate-800 block leading-snug">{activeResult.term}</p>
                <p className="text-xs text-brand-green font-mono">{activeResult.academicSession} Session</p>
              </div>

            </div>

            {/* Student Profile Block */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-8 pb-8 border-b border-slate-200 items-start">
              
              {/* Photo */}
              <div className="md:col-span-3 flex justify-center">
                <div className="h-32 w-32 rounded-lg border-2 border-slate-100 overflow-hidden bg-slate-50 relative print:border-slate-800">
                  <img
                    src={activeResult.studentProfile.passportUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"}
                    alt={activeResult.studentProfile.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 py-0.5 text-center bg-slate-900/70 text-white text-[9px] uppercase tracking-wide">
                    {activeResult.studentProfile.gender}
                  </div>
                </div>
              </div>

              {/* Data parameters */}
              <div className="md:col-span-9 grid grid-cols-2 gap-y-3.5 gap-x-6 text-xs sm:text-sm font-medium">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wide font-mono">Full Name</span>
                  <span className="text-slate-800 font-bold text-base">{activeResult.studentProfile.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wide font-mono">Registration Number</span>
                  <span className="text-brand-oxblood font-bold font-mono tracking-wide">{activeResult.studentProfile.regNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wide font-mono">Class Room</span>
                  <span className="text-slate-700 font-bold uppercase">{activeResult.studentProfile.studentClass}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wide font-mono">Student ID Token</span>
                  <span className="text-slate-700 font-bold font-mono">{activeResult.studentProfile.studentId}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wide font-mono">Terminal Attendance</span>
                  <span className="text-slate-700 font-bold">{activeResult.attendance}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wide font-mono">Class Placement</span>
                  <span className="text-brand-green font-heading font-bold">{activeResult.position}</span>
                </div>
                {activeResult.classStanding && (
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wide font-mono">Class Standing</span>
                    <span className="text-slate-700 font-bold">{activeResult.classStanding}</span>
                  </div>
                )}
                {activeResult.gradePoint && (
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wide font-mono">Grade Point</span>
                    <span className="text-slate-700 font-bold">{activeResult.gradePoint}</span>
                  </div>
                )}
                {activeResult.accreditedGradeBracket && (
                  <div className="col-span-2 md:col-span-1">
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wide font-mono">Accredited Grade Bracket</span>
                    <span className="text-brand-oxblood font-bold uppercase">{activeResult.accreditedGradeBracket}</span>
                  </div>
                )}
              </div>

            </div>

            {/* Academic Results Sheet Spreadsheet */}
            <div className="overflow-x-auto my-8 border border-slate-200 rounded-lg print:border-slate-800">
              <table className="w-full text-left text-xs sm:text-sm leading-normal">
                <thead>
                  <tr className="bg-[#E8F5E9] border-b border-slate-200 text-brand-green font-heading font-bold select-none print:border-b-2 print:border-slate-800 print:bg-slate-100 print:text-slate-900">
                    <th className="py-3 px-4">Subject Name</th>
                    <th className="py-3 px-4 text-center">CA1 (20)</th>
                    <th className="py-3 px-4 text-center">CA2 (20)</th>
                    <th className="py-3 px-4 text-center">Exam (60)</th>
                    <th className="py-3 px-4 text-center">Total (100)</th>
                    <th className="py-3 px-4 text-center">Grade</th>
                    <th className="py-3 px-4">Subject Assessment Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 print:divide-slate-300">
                  {activeResult.subjects.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-4 font-semibold text-slate-700">{sub.subjectName}</td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-500">{sub.ca1Score}</td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-500">{sub.ca2Score}</td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-500">{sub.examScore}</td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-800">{sub.totalScore}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block py-0.5 px-2.5 rounded font-heading font-bold uppercase ${
                          sub.grade === 'A' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                          sub.grade === 'B' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                          sub.grade === 'C' ? 'bg-amber-50 text-brand-yellow-hover border border-amber-200' :
                          'bg-rose-50 text-brand-oxblood border border-rose-200'
                        } print:bg-transparent print:border-none print:p-0`}>
                          {sub.grade}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-light text-slate-500 text-xs">{sub.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Scoreboard Metrics Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8 p-6 bg-slate-50 rounded-xl border border-slate-100 print:border-slate-800 print:bg-white">
              
              <div className="space-y-4">
                <h4 className="text-xs uppercase font-mono text-slate-400 font-bold select-none">Performance Summary</h4>
                <div className="space-y-2 text-xs sm:text-sm font-semibold">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-light">Gross Total Marks:</span>
                    <span className="text-slate-800">{activeResult.totalScore}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200/50 pt-2">
                    <span className="text-slate-500 font-light">Terminal Average Score:</span>
                    <span className="text-brand-green text-base">{activeResult.averageScore}%</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200/50 pt-2">
                    <span className="text-slate-500 font-light">Accredited Grade Bracket:</span>
                    <span className="text-brand-oxblood uppercase">{activeResult.accreditedGradeBracket || (activeResult.averageScore >= 80 ? 'Distinction Class' : activeResult.averageScore >= 70 ? 'Very Good Class' : 'Pass Class')}</span>
                  </div>
                </div>
              </div>

              {/* Circular remark or signature references */}
              <div className="flex flex-col justify-center items-center text-center p-4 bg-white rounded-lg border border-slate-200/50 print:border-none print:p-0">
                <Award size={36} className="text-brand-yellow animate-bounce" />
                <p className="text-[10px] font-mono text-slate-400 uppercase mt-2">Class Standing / Placement</p>
                <p className="text-base font-heading font-extrabold text-slate-900 uppercase">
                  {activeResult.classStanding || activeResult.position}
                </p>
                <p className="text-[10px] text-slate-400 font-light">of the {activeResult.studentProfile.studentClass} general cohort</p>
              </div>

            </div>

            {/* Principal & Teacher Remark logs */}
            <div className="my-8 space-y-4 text-xs sm:text-sm border-t border-slate-100 pt-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 print:border-slate-300 print:bg-white">
                  <p className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1 select-none">Class Instructor's Notes</p>
                  <p className="font-light text-slate-600 leading-relaxed italic">
                    "{activeResult.teacherRemark}"
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 print:border-slate-300 print:bg-white">
                  <p className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1 select-none">Principal's Executive Remark</p>
                  <p className="font-light text-slate-600 leading-relaxed italic">
                    "{activeResult.principalRemark}"
                  </p>
                </div>
              </div>

            </div>

            {/* Custom signatures line - Beautiful print layout element */}
            <div className="grid grid-cols-2 gap-8 pt-10 mt-10 border-t border-slate-200 justify-items-center text-center text-xs text-slate-500 font-light select-none print:border-t-2 print:border-slate-800">
              
              <div className="flex flex-col items-center">
                {/* Simulated handwritten signature line */}
                <div className="h-10 text-xs font-serif italic text-slate-400 select-none flex items-center justify-center border-b border-slate-300 w-36 mb-1.5 print:border-slate-800">
                  <span>Jacinta Onyinye</span>
                </div>
                <span className="font-semibold text-slate-700 uppercase tracking-tight text-[10px]">Examination Coordinator I</span>
                <span className="text-[9px] text-slate-400">Class Director Seal</span>
              </div>

              <div className="flex flex-col items-center">
                {/* Simulated handwritten signature line */}
                <div className="h-10 text-xs font-serif italic text-[#5C0000] select-none flex items-center justify-center border-b border-brand-green/30 w-36 mb-1.5 print:border-slate-800">
                  <span className="font-semibold">Engr. ThankGod Ndibe</span>
                </div>
                <span className="font-semibold text-[#5C0000] uppercase tracking-tight text-[10px]">Principal</span>
                <span className="text-[9px] text-slate-400">Holy Ghost Academy Crest</span>
              </div>

            </div>

            {/* Official Stamps / Circular barcode element */}
            <div className="mt-10 pt-4 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center text-[9px] text-slate-400 font-mono gap-4 select-none print:border-t print:border-slate-300">
              <span>HGASS PORTAL GRADE-BOOK VERIFIER IDENTIFIER: {activeResult.academicSession}-{activeResult.studentProfile.studentClass.replace(' ', '')}-{activeResult.studentProfile.regNumber.split('/').pop()}</span>
              <div className="flex items-center space-x-1 uppercase text-slate-500 font-bold bg-slate-50 px-2.5 py-1 rounded border border-slate-100 print:bg-white print:border-slate-200">
                <Sparkles size={11} className="text-brand-yellow shrink-0 animate-spin-slow" />
                <span>OFFICIAL RATING: PASS</span>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center p-12 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-4">
            <FileText size={48} className="text-slate-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-heading font-medium text-slate-700 text-sm">Waiting for search selection...</h3>
              <p className="text-xs text-slate-400 font-light max-w-sm mx-auto">
                Select your term filters and input a valid school Registration Number in search bar to review full continuous assessments and principal notes.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
