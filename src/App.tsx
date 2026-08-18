/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { SchoolProvider } from './context/SchoolContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { MissionView } from './components/MissionView';
import { SubjectsView } from './components/SubjectsView';
import { ProjectsView } from './components/ProjectsView';
import { GalleryView } from './components/GalleryView';
import { ResultsChecker } from './components/ResultsChecker';
import { ContactView } from './components/ContactView';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { ShieldAlert, BookOpen, Clock, MessageSquare } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  // Simple router based on active tab state
  const renderView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView setActiveTab={setActiveTab} />;
      case 'about':
        return <AboutView />;
      case 'mission':
        return <MissionView />;
      case 'subjects':
        return <SubjectsView />;
      case 'projects':
        return <ProjectsView />;
      case 'gallery':
        return <GalleryView />;
      case 'results':
        return <ResultsChecker />;
      case 'contact':
        return <ContactView />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomeView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div id="hgass_root_container" className="flex flex-col min-h-screen bg-slate-50 relative selection:bg-brand-green/20 selection:text-brand-green">
      
      {/* 1. COMPREHENSIVE NAVBAR */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openLoginModal={() => setIsLoginOpen(true)} 
      />

      {/* 2. ADMIN ANNOUNCEMENT STRIP (Renders when logged in to let user know they are administrative) */}
      {activeTab === 'admin' && (
        <div className="bg-amber-500 text-slate-900 py-2 px-4 shadow-sm text-center font-heading font-extrabold text-xs sm:text-sm tracking-wide flex items-center justify-center space-x-2 border-b border-brand-yellow">
          <ShieldAlert size={16} className="animate-pulse" />
          <span>PORTAL MANAGEMENT ACTIVE SESSION • PASSWORD REF: HGASS@25</span>
        </div>
      )}

      {/* 3. DYNAMIC TAB RENDER STAGE */}
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* 4. FOOTER COMPONENT */}
      <Footer setActiveTab={setActiveTab} />

      {/* 5. FLOATING ADMIN LOGIN OVERLAY */}
      {isLoginOpen && (
        <AdminLogin 
          onClose={() => setIsLoginOpen(false)} 
          onSuccess={() => {
            setActiveTab('admin');
            setIsLoginOpen(false);
          }} 
        />
      )}

      {/* 6. GLOBAL HOVERING ENROLL NOW WHATSAPP BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2 pointer-events-none">
        {/* Subtle glowing notification bubble */}
        <div className="bg-slate-900 text-white text-[10px] font-heading font-medium py-1 px-3 rounded-md shadow-lg border border-slate-800 tracking-wide flex items-center space-x-1.5 animate-bounce pointer-events-auto">
          <span className="h-2 w-2 rounded-full bg-brand-yellow animate-pulse" />
          <span>Chat & Enroll Online</span>
        </div>
        <a
          href="https://wa.me/2349054145339?text=Hello%20Holy%20Ghost%20Academy%20Awka%2C%20I%20am%20interested%20in%20enrolling%20my%20child."
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center space-x-2 py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all text-xs font-heading font-extrabold uppercase tracking-widest"
        >
          <MessageSquare size={16} />
          <span>Enroll Now</span>
        </a>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <SchoolProvider>
      <AppContent />
    </SchoolProvider>
  );
}

