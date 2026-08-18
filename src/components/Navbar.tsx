/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, ShieldAlert, LogOut, ShieldCheck } from 'lucide-react';
import { SchoolCrest } from './SchoolCrest';
import { useSchool } from '../context/SchoolContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openLoginModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openLoginModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, logout, supabaseConnectionStatus } = useSchool();

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'mission', label: 'Mission & Vision' },
    { id: 'subjects', label: 'Subjects Offered' },
    { id: 'projects', label: 'Ongoing Projects' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'results', label: 'Results Sheet' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="hgass_header" className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm print:hidden">
      {/* Top utility row with school motto & DB status indicator */}
      <div className="bg-brand-oxblood text-white py-1.5 px-4 text-xs font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0 text-center sm:text-left">
          <div className="font-medium tracking-wide">
            MOTTO: <span className="text-brand-yellow uppercase font-semibold">Moral and Academics (MALU CHUKWU, MALU AKWUKO)</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:space-x-3 text-[11px] font-mono tracking-wider text-white/90">
            <span>Awka, Anambra State, Nigeria</span>
            {isAdmin && (
              <>
                <span className="hidden sm:inline text-white/30">|</span>
                <div className="flex items-center space-x-1.5 mt-1 sm:mt-0" title={
                  supabaseConnectionStatus === 'connected'
                    ? 'Fully synchronized with Supabase Live PostgreSQL DB'
                    : supabaseConnectionStatus === 'unconfigured'
                    ? 'Using sandbox local data. Configure your environment secrets VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to connect your live Supabase DB'
                    : 'Connection failed. Falling back to local offline storage state.'
                }>
                  <span className={`h-2 w-2 rounded-full ${
                    supabaseConnectionStatus === 'connected'
                      ? 'bg-emerald-400 animate-pulse'
                      : supabaseConnectionStatus === 'failed'
                      ? 'bg-rose-400'
                      : 'bg-amber-400'
                  }`} />
                  <span className="text-[10px] uppercase font-bold text-white/80">
                    {supabaseConnectionStatus === 'connected'
                      ? 'Supabase Live'
                      : supabaseConnectionStatus === 'failed'
                      ? 'DB Offline'
                      : 'Local Sandbox'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand Sector */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none group"
            onClick={() => handleNavClick('home')}
          >
            <SchoolCrest size="md" />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold font-heading text-brand-green leading-tight group-hover:text-brand-green-hover transition-colors">
                HOLY GHOST ACADEMY
              </span>
              <span className="text-xs tracking-widest text-brand-oxblood font-semibold">
                SECONDARY SCHOOL, AWKA
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-md text-[13px] font-heading font-medium tracking-wide transition-all ${
                    isActive 
                      ? 'text-brand-green bg-brand-green-light border-b-2 border-brand-green'
                      : 'text-slate-600 hover:text-brand-green hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Admin Dashboard Connection */}
            <div className="h-6 w-[1px] bg-slate-200 mx-3" />
            
            {isAdmin ? (
              <div className="flex items-center space-x-2">
                <button
                  id="nav-admin-dashboard-btn"
                  onClick={() => handleNavClick('admin')}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-[13px] font-heading font-semibold text-brand-oxblood bg-rose-50 border border-brand-oxblood/20 shadow-sm hover:bg-brand-oxblood-light transition-all ${
                    activeTab === 'admin' ? 'ring-2 ring-brand-oxblood' : ''
                  }`}
                >
                  <ShieldCheck size={16} className="text-brand-oxblood" />
                  <span>Admin Portal</span>
                </button>
                <button
                  onClick={logout}
                  title="Logout Administrator Session"
                  className="p-2 text-slate-400 hover:text-brand-oxblood hover:bg-rose-50 rounded-md transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                id="nav-admin-login-trigger"
                onClick={openLoginModal}
                title="Admin Login Portal"
                className="p-2.5 text-slate-400 hover:text-brand-green hover:bg-brand-green-light rounded-md transition-all border border-transparent hover:border-brand-green/20"
              >
                <ShieldAlert size={18} />
              </button>
            )}
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex items-center space-x-4 lg:hidden">
            {isAdmin && activeTab !== 'admin' && (
              <button
                onClick={() => handleNavClick('admin')}
                className="p-1 px-2.5 rounded bg-brand-oxblood-light border border-brand-oxblood/10 text-brand-oxblood text-xs font-heading font-semibold flex items-center space-x-1"
              >
                <ShieldCheck size={12} />
                <span>Admin</span>
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-brand-green hover:bg-slate-100 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 animate-slide-down shadow-inner overflow-y-auto max-h-[85vh]">
          <div className="px-3 pt-3 pb-6 space-y-1 sm:px-4">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-md text-sm font-heading font-semibold transition-all ${
                    isActive 
                      ? 'text-brand-green bg-brand-green-light border-l-4 border-brand-green'
                      : 'text-slate-600 hover:text-brand-green hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="border-t border-slate-100 my-4 pt-4 px-4">
              {isAdmin ? (
                <div className="space-y-2">
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-md text-sm font-heading font-bold text-brand-oxblood bg-rose-50 border border-brand-oxblood/20 shadow-sm"
                  >
                    <ShieldCheck size={18} />
                    <span>Open Admin Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-md text-sm font-heading font-medium text-slate-500 hover:bg-slate-50"
                  >
                    <LogOut size={16} />
                    <span>Sign Out Administrator</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openLoginModal();
                  }}
                  className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-md text-sm font-heading font-semibold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-brand-green-light hover:text-brand-green hover:border-brand-green/20"
                >
                  <ShieldAlert size={18} />
                  <span>Administrative Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
