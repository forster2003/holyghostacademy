/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldAlert, Lock, X, CheckSquare, Sparkles } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { SchoolCrest } from './SchoolCrest';

interface AdminLoginProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onClose, onSuccess }) => {
  const { login } = useSchool();
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!password.trim()) {
      setErrorText('Please input the portal security password.');
      return;
    }

    const correct = login(password);

    if (correct) {
      setIsSuccess(true);
      setErrorText('');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1000);
    } else {
      setErrorText('Invalid security key. Access denied.');
      setPassword('');
    }
  };

  return (
    <div id="hgass_login_overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xs animate-fade-in">
      
      {/* Centered Modal Card */}
      <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative p-8 space-y-6 animate-scale-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header Branding */}
        <div className="text-center space-y-3">
          <SchoolCrest size="md" className="mx-auto" />
          <div className="space-y-1">
            <h3 className="text-lg font-heading font-extrabold text-[#5C0000]">HGASS Administrative Portal</h3>
            <p className="text-xs text-slate-400 font-light leading-snug">
              Secure single-sign-on node validation protocol. Enter official credential password to assume credentials.
            </p>
          </div>
        </div>

        {/* Form Body */}
        {isSuccess ? (
          <div className="py-6 text-center space-y-3 animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
              <CheckSquare size={24} className="animate-pulse" />
            </div>
            <h4 className="font-heading font-bold text-slate-800 text-sm">Credentials Verified!</h4>
            <p className="text-xs text-slate-400 font-light">Redirecting securely to dashboard workspace...</p>
          </div>
        ) : (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="font-heading font-bold text-slate-700">Enter Admin Password</label>
                <span className="text-slate-400 font-mono font-medium">HGASS@25</span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-oxblood/15 focus:border-brand-oxblood text-sm"
                />
                <Lock className="absolute left-3 top-3.5 text-slate-400" size={15} />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded bg-brand-oxblood hover:bg-brand-oxblood-hover text-white text-xs font-heading font-bold uppercase tracking-wider shadow-sm transition-transform active:scale-98 flex items-center justify-center space-x-2"
            >
              <ShieldAlert size={14} className="text-white" />
              <span>Sign In Securely</span>
            </button>

          </form>
        )}

        {/* Error Notification */}
        {errorText && (
          <div className="p-3 bg-rose-50 border border-brand-oxblood/10 text-brand-oxblood font-light text-xs rounded-lg flex items-center space-x-2 animate-shake">
            <ShieldAlert size={14} className="shrink-0" />
            <span>{errorText}</span>
          </div>
        )}

        {/* Sealing details */}
        <div className="text-center text-[10px] text-slate-400 font-mono border-t border-slate-100 pt-4 select-none flex items-center justify-center space-x-1 uppercase">
          <Sparkles size={11} className="text-brand-yellow animate-spin-slow" />
          <span>SSL Encryption Node 256-bit Certified</span>
        </div>

      </div>
    </div>
  );
};
