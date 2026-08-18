/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SchoolCrestProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SchoolCrest: React.FC<SchoolCrestProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-10 w-10 border-2',
    md: 'h-16 w-16 border-[3px]',
    lg: 'h-24 w-24 border-4',
    xl: 'h-36 w-36 border-4 shadow-xl'
  };

  const selectedSize = sizeClasses[size];

  return (
    <div id="hgass_emblem_root" className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* Container ring representing the school colors (dark forest green background + amber-gold accent outline) */}
      <div 
        className={`rounded-full border-brand-green bg-white overflow-hidden flex items-center justify-center hover:scale-105 transition-transform duration-300 ${selectedSize}`}
      >
        <img 
          src="https://i.ibb.co/HTP5dHHD/Whats-App-Image-2026-06-30-at-10-02-49-AM.jpg" 
          alt="Holy Ghost Academy Awka Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  );
};
