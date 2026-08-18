/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Grid, Eye, X, Video, Image as ImageIcon, Calendar } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { GalleryItem } from '../types';

export const GalleryView: React.FC = () => {
  const { gallery } = useSchool();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'School Activities', 'Sports', 'Academics', 'Graduation', 'Cultural Events', 'Projects'];

  // Grid filter logic
  const filteredGallery = gallery.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesType = mediaTypeFilter === 'all' || item.type === mediaTypeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div id="hgass_gallery_view" className="animate-fade-in py-12 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Head */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block bg-brand-green-light text-brand-green py-1 px-3.5 rounded text-xs font-heading font-semibold uppercase tracking-wider">
            Campus Life
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-none">
            Photo & Video Gallery Archives
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-light leading-relaxed">
            Take a visual tour inside our classrooms, athletic meets, science fairs, and annual Anambra cultural celebrations. This gallery is powered and updated directly by our administrative dashboard team.
          </p>
        </div>

        {/* Filters Matrix */}
        <div className="space-y-6 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs">
          
          {/* Top Line: Search & Media selector */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search captions or categories..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green text-sm"
              />
              <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
            </div>

            {/* Media Type Buttons */}
            <div className="flex space-x-2 bg-slate-100 p-1 rounded-lg self-start">
              <button
                onClick={() => setMediaTypeFilter('all')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-heading font-semibold tracking-wide transition-all ${
                  mediaTypeFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Grid size={13} />
                <span>All Assets</span>
              </button>
              <button
                onClick={() => setMediaTypeFilter('image')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-heading font-semibold tracking-wide transition-all ${
                  mediaTypeFilter === 'image' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <ImageIcon size={13} />
                <span>Photos ({gallery.filter(i => i.type === 'image').length})</span>
              </button>
              <button
                onClick={() => setMediaTypeFilter('video')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-heading font-semibold tracking-wide transition-all ${
                  mediaTypeFilter === 'video' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Video size={13} />
                <span>Videos ({gallery.filter(i => i.type === 'video').length})</span>
              </button>
            </div>
          </div>

          {/* Categories List Slider */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar border-t border-slate-50 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-semibold tracking-wide shrink-0 transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-green text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Grid Results */}
        {filteredGallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGallery.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                className="group bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform shadow-md">
                      <Eye size={20} />
                    </div>
                  </div>

                  {/* Top category label */}
                  <span className="absolute top-4 left-4 text-[9px] bg-white/95 border border-slate-100 text-slate-800 py-1 px-2.5 rounded font-heading font-extrabold uppercase tracking-widest shadow-xs">
                    {item.category}
                  </span>

                  {/* Play circle if video */}
                  {item.type === 'video' && (
                    <span className="absolute bottom-4 right-4 bg-red-600 text-white p-2 rounded-full flex items-center shadow-lg">
                      <Video size={16} />
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <h4 className="text-xs sm:text-sm font-heading font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-brand-green transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-mono">
                    <Calendar size={11} />
                    <span>Published: {item.uploadDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 space-y-3">
            <p className="text-slate-400 text-sm font-heading font-medium">No photos or videos match your specified tags...</p>
            <button 
              onClick={() => { setActiveCategory('All'); setMediaTypeFilter('all'); setSearchQuery(''); }}
              className="text-xs font-semibold text-brand-green underline"
            >
              Reset Filters & View All
            </button>
          </div>
        )}

      </div>

      {/* 4. LIGHTBOX ZOOM MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 sm:p-6 animate-fade-in">
          
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 p-2.5 text-slate-400 hover:text-white rounded-full bg-slate-800/50 hover:bg-slate-800 hover:scale-105 transition-all z-10"
          >
            <X size={20} />
          </button>
          
          <div className="max-w-4xl w-full flex flex-col items-center space-y-6">
            
            {/* Main Visual Display */}
            <div className="w-full relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900 flex items-center justify-center max-h-[70vh]">
              {selectedItem.type === 'video' && selectedItem.embedUrl ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={selectedItem.embedUrl}
                    title={selectedItem.title}
                    className="w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="max-h-[65vh] max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            {/* Captions and descriptors */}
            <div className="text-center space-y-2 max-w-2xl px-4 text-white">
              <span className="text-[10px] bg-brand-green border border-brand-green/20 text-white py-1 px-3 rounded font-heading font-bold uppercase tracking-wider">
                {selectedItem.category}
              </span>
              <h3 className="text-base sm:text-xl font-heading font-bold leading-normal">
                {selectedItem.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Asset Database Ref Key: {selectedItem.id} • Posted on {selectedItem.uploadDate}
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
