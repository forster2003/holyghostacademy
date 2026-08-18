/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin, Award, Shield, Facebook, Calendar, Layers, MessageSquare } from 'lucide-react';
import { SchoolCrest } from './SchoolCrest';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="hgass_footer" className="bg-slate-900 text-slate-300 font-sans border-t-4 border-brand-green print:hidden">
      
      {/* Upper footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: School Emblem & Pillars */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')}>
              <SchoolCrest size="md" />
              <div className="flex flex-col">
                <span className="text-sm font-bold font-heading text-white tracking-wide">
                  HOLY GHOST ACADEMY
                </span>
                <span className="text-[10px] tracking-wider text-brand-yellow font-semibold">
                  SECONDARY SCHOOL
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Providing holistic faith-based education tailored to inspire academic excellence, absolute moral discipline, scientific innovation, and character formation under Christian values.
            </p>
            
            <div className="flex space-x-3.5 text-slate-400">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">
                <Facebook size={18} />
              </a>
              <span className="text-slate-700">|</span>
              <div className="flex items-center text-xs space-x-1 hover:text-brand-yellow cursor-pointer" onClick={() => handleNavClick('about')}>
                <Award size={14} />
                <span>Award-winning</span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="flex items-center text-xs space-x-1 hover:text-brand-yellow cursor-pointer" onClick={() => handleNavClick('mission')}>
                <Shield size={14} />
                <span>NUC Accredited</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-sm font-heading font-bold uppercase tracking-wider mb-6 border-l-3 border-brand-yellow pl-3">
              Explore HGASS
            </h3>
            <ul className="space-y-3.5 text-xs font-medium">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'Our Rich History' },
                { id: 'mission', label: 'Mission & Strategic Vision' },
                { id: 'subjects', label: 'Curriculum & Subjects' },
                { id: 'projects', label: 'School Development Projects' },
                { id: 'gallery', label: 'Photo & Video Gallery' },
              ].map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => handleNavClick(link.id)}
                    className="hover:text-brand-yellow hover:translate-x-1.5 transition-all text-slate-400 text-left"
                  >
                    • {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Academic Channels */}
          <div>
            <h3 className="text-white text-sm font-heading font-bold uppercase tracking-wider mb-6 border-l-3 border-brand-green pl-3">
              Student Portals
            </h3>
            <ul className="space-y-3.5 text-xs text-slate-400 font-medium">
              <li>
                <button 
                  onClick={() => handleNavClick('results')}
                  className="hover:text-brand-yellow transition-colors flex items-center space-x-2"
                >
                  <Calendar size={14} className="text-brand-yellow" />
                  <span>Interactive Term Results Sheet</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('subjects')}
                  className="hover:text-brand-yellow transition-colors flex items-center space-x-2"
                >
                  <Layers size={14} className="text-brand-green" />
                  <span>JSS Junior Curriculum Guide</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('subjects')}
                  className="hover:text-brand-yellow transition-colors flex items-center space-x-2"
                >
                  <Layers size={14} className="text-brand-green" />
                  <span>SS Senior Science & Arts Guide</span>
                </button>
              </li>
              <li className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 leading-normal font-normal">
                Admissions open for prospective families. Registration lists can be requested via our active support desk node.
              </li>
            </ul>
          </div>

          {/* Column 4: Official Address */}
          <div className="space-y-6">
            <h3 className="text-white text-sm font-heading font-bold uppercase tracking-wider border-l-3 border-brand-oxblood pl-3">
              Contact Awka Campus
            </h3>
            
            <ul className="space-y-4 text-xs text-slate-400 leading-normal">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-brand-yellow shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Holy Ghost Academy</span>
                  Kamali Homes, Ngozika Housing Estate,<br />
                  Awka, Anambra State, Nigeria.
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={15} className="text-brand-green shrink-0" />
                <span>+234 (0) 905 414 5339, +234 (0) 706 898 6865</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={15} className="text-brand-green shrink-0" />
                <span className="hover:text-white transition-colors">holyghostacademy@gmail.com</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="https://wa.me/2349054145339?text=Hello%20Holy%20Ghost%20Academy%20Awka%2C%20I%20am%20interested%20in%20enrolling%20my%2520child."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-md bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-heading font-bold uppercase tracking-wider shadow-md transition-all active:scale-95 text-center"
              >
                <MessageSquare size={14} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Lower copyright bar */}
      <div className="border-t border-slate-800 bg-slate-950/80 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 space-y-4 sm:space-y-0 text-center sm:text-left">
          <div>
            &copy; {currentYear} <span className="text-slate-400 font-semibold">Holy Ghost Academy Secondary School, Awka</span>. All Rights Reserved.
          </div>
          <div className="flex space-x-4 tracking-normal">
            <span className="text-brand-green">Accredited by State Ministry of Education</span>
            <span>•</span>
            <span className="text-brand-yellow">HGASS Web Team</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
