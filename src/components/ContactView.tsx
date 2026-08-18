/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle, Smartphone } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const ContactView: React.FC = () => {
  const { sendMessage } = useSchool();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(false);
    setErrorText('');

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorText('Please fill out all contact fields below.');
      return;
    }

    try {
      sendMessage({
        name,
        email,
        phone,
        message
      });

      // Construct mailto link
      const emailSubject = encodeURIComponent(`Inquiry from Website: ${name}`);
      const emailBody = encodeURIComponent(
        `Full Name: ${name}\n` +
        `Phone lines: ${phone}\n` +
        `Email Address: ${email}\n\n` +
        `Message:\n${message}`
      );
      
      const mailtoUrl = `mailto:holyghostacademy@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      
      // Trigger user's mail application immediately
      window.location.href = mailtoUrl;

      setIsSubmitted(true);
      // Clean inputs
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setErrorText(`Failed to transmit: ${err.message}`);
    }
  };

  return (
    <div id="hgass_contact_view" className="animate-fade-in py-12 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Head */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block bg-brand-green-light text-brand-green py-1 px-3.5 rounded text-xs font-heading font-semibold uppercase tracking-wider">
            Campuses Connection
          </div>
          <h1 id="contact_form_heading" className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-none">
            Get In Touch With Us
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-light leading-relaxed">
            Have questions about student admission entries, fee schedules, solar infrastructure upgrades, or term certificates? Fill out the form or reach our Awka campus directly.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Column 1: Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-slate-100 p-8 rounded-xl shadow-xs space-y-6">
              <h3 className="text-lg font-heading font-bold text-slate-900 border-b border-slate-100 pb-3">Awka Administrative Campus</h3>
              
              <ul className="space-y-6 text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                <li className="flex items-start space-x-4">
                  <MapPin size={22} className="text-brand-green mt-1 shrink-0" />
                  <div className="font-heading">
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wide">Street Address</span>
                    <span className="font-medium text-slate-800">Holy Ghost Academy Secondary School</span>
                    <p className="text-slate-500 font-light text-xs mt-0.5">Kamali Homes, Ngozika Housing Estate, Awka, Anambra State, Nigeria.</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <Phone size={18} className="text-brand-green mt-1 shrink-0" />
                  <div className="font-heading">
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wide">Telephone Contacts</span>
                    <p className="text-slate-800 font-medium">+234 (0) 905 414 5339</p>
                    <p className="text-slate-500 font-light text-xs">+234 (0) 706 898 6865</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <Mail size={18} className="text-brand-green mt-1 shrink-0" />
                  <div className="font-heading">
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wide">Digital Maildesk</span>
                    <span className="text-slate-800 font-medium block">holyghostacademy@gmail.com</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Informational Guidance */}
            <div className="bg-brand-oxblood-light border border-brand-oxblood/10 p-6 rounded-xl flex items-start space-x-3 text-slate-700">
              <Smartphone size={20} className="text-brand-oxblood shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-slate-900 text-xs sm:text-sm">Official SMS Notification Tracker</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Parents receive immediate transactional SMS logs when fees are cleared or structural term results sheets are uploaded from our dashboard node.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Feedback Form */}
          <div className="lg:col-span-7 bg-white border border-slate-100 p-8 sm:p-12 rounded-xl shadow-xs space-y-6">
            <h3 className="text-xl font-heading font-extrabold text-slate-900 tracking-tight leading-none">
              Transmit Digital Message
            </h3>
            <p className="text-xs text-slate-400 font-light">
              Submit your inquiry below. Our secondary office representative replies within 24 operational hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-heading font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Chukwudi Amadi"
                    className="w-full bg-slate-50 p-2.5 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green/15 focus:border-brand-green text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-heading font-bold text-slate-700">Phone lines</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +234 803..."
                    className="w-full bg-slate-50 p-2.5 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green/15 focus:border-brand-green text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-heading font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. chukwudi@gmail.com"
                  className="w-full bg-slate-50 p-2.5 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green/15 focus:border-brand-green text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-heading font-bold text-slate-700">Inquiry / Message text</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Detail admission lists requests, transcripts, or sports schedules..."
                  className="w-full bg-slate-50 p-2.5 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green/15 focus:border-brand-green text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded bg-brand-green hover:bg-brand-green-hover text-white text-xs font-heading font-bold uppercase tracking-wider shadow-sm transition-transform active:scale-98 flex items-center justify-center space-x-2"
              >
                <Send size={14} />
                <span>Transmit Message Desk</span>
              </button>

            </form>

            {/* Error notifications */}
            {errorText && (
              <div className="p-3.5 bg-rose-50 border border-brand-oxblood/10 text-brand-oxblood text-xs rounded-lg font-light flex items-center space-x-2 animate-shake">
                <HelpCircle size={14} className="shrink-0" />
                <span>{errorText}</span>
              </div>
            )}

            {/* Success feedback */}
            {isSubmitted && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs rounded-lg font-light flex items-center space-x-2 animate-fade-in">
                <CheckCircle size={15} className="shrink-0 animate-bounce" />
                <span>Message successfully logged inside active administrator review state. Thank you!</span>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
