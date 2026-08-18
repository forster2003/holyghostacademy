/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Award, ShieldCheck, Milestone, CheckCircle2, Star, TrendingUp, HelpCircle } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab }) => {
  const { stats, news, projects, gallery } = useSchool();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Real school image slides for the hero section
  const sliderImages = [
    { url: "https://i.ibb.co/Fkw6xsct/hga-hs001.jpg", title: "Holy Ghost Academy Custom Campus Grounds" },
    { url: "https://i.ibb.co/p5PJNbK/hga005.jpg", title: "Holy Ghost Academy Administrative Blocks" },
    { url: "https://i.ibb.co/9kHqyL5C/hga003.jpg", title: "Advanced Classrooms and STEM Facilities" },
    { url: "https://i.ibb.co/cSwL02br/hga002.jpg", title: "Bright Classrooms & Student Seating Blocks" },
    { url: "https://i.ibb.co/S7KjD67V/hga001.jpg", title: "Spacious Hallways & Academic Environment" }
  ];

  // Auto Slider Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  // Statistics Counting Effect
  const [counts, setCounts] = useState({ students: 0, teachers: 0, graduates: 0, awards: 0 });
  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCounts({
        students: Math.min(Math.round((stats.students / steps) * step), stats.students),
        teachers: Math.min(Math.round((stats.teachers / steps) * step), stats.teachers),
        graduates: Math.min(Math.round((stats.graduates / steps) * step), stats.graduates),
        awards: Math.min(Math.round((stats.awards / steps) * step), stats.awards),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [stats]);

  // Handle CTA actions
  const handleEnrollNow = () => {
    window.open('https://wa.me/2349054145339?text=Hello%20Holy%20Ghost%20Academy%20Awka%2C%20I%20am%20interested%20in%20enrolling%20my%20child.', '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="hgass_home_view" className="animate-fade-in">
      
      {/* 1. HERO SECTION & SLIDER */}
      <section className="relative h-[550px] sm:h-[650px] overflow-hidden bg-slate-950 text-white">
        
        {/* Dynamic Image Slides */}
        {sliderImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-40' : 'opacity-0'
            }`}
          >
            <img
              src={slide.url}
              alt={slide.title}
              className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-10000"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-900 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full sm:w-2/3 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-transparent" />

        {/* Hero Copy Writing */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="max-w-3xl space-y-6">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center space-x-2 bg-brand-green/20 border border-brand-green/30 px-3.5 py-1.5 rounded-full text-brand-yellow font-heading text-[12px] font-semibold tracking-wider uppercase backdrop-blur-md">
              <ShieldCheck size={14} className="text-brand-yellow animate-pulse" />
              <span>Anambra State Approved & Government Accredited</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-none text-white">
              Shaping Leaders of <br />
              <span className="text-brand-yellow bg-clip-text">Intellect and Character</span>
            </h1>

            <p className="text-sm sm:text-lg text-slate-300 font-light leading-relaxed max-w-2-xl">
              Welcome to <span className="font-semibold text-white">Holy Ghost Academy Secondary School</span>, Awka. We foster academic excellence, moral rectitude, and STEM innovations on a secure, faith-guided campus.
            </p>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={handleEnrollNow}
                className="inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-md bg-brand-green border border-transparent text-sm font-heading font-bold hover:bg-brand-green-hover transition-all text-white shadow-lg active:scale-95"
              >
                <span>Enroll Now</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className="inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-md bg-white/15 border border-white/20 text-sm font-heading font-semibold hover:bg-white/25 transition-all text-white backdrop-blur-sm"
              >
                <span>View Campus Gallery</span>
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className="inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-md bg-slate-800/80 border border-slate-700/50 text-sm font-heading font-semibold hover:bg-slate-700 transition-all text-slate-200"
              >
                <span>Contact School</span>
              </button>
            </div>

          </div>
        </div>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-8 right-8 z-10 hidden sm:flex space-x-2">
          {sliderImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === currentSlide ? 'w-8 bg-brand-yellow' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. PRINCIPAL'S WELCOME */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Principal Photo */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-2 rounded-xl bg-gradient-to-tr from-brand-oxblood to-brand-green opacity-30 blur-lg group-hover:opacity-40 transition-opacity" />
              <div className="relative overflow-hidden rounded-xl border border-slate-100 shadow-xl bg-slate-50">
                <img
                  src="https://i.ibb.co/pj9SBTbc/cccg.jpg"
                  alt="Engr. ThankGod Ndibe"
                  className="w-full h-[450px] object-cover object-top hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent p-6 text-white">
                  <p className="text-brand-yellow text-xs font-semibold uppercase tracking-wider">Principal</p>
                  <h4 className="text-lg font-heading font-bold">Engr. ThankGod Ndibe</h4>
                  <p className="text-xs text-slate-300 font-light">Principal, B.Engr, M.Engr</p>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block bg-brand-oxblood-light text-brand-oxblood py-1 px-3.5 rounded text-xs font-heading font-semibold uppercase tracking-wider">
                Leadership Welcome
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
                Developing the Whole Person: <br />
                <span className="text-brand-green">Spirit, Mind and Body</span>
              </h2>
              <div className="h-1.5 w-16 bg-brand-yellow rounded" />
              
              <div className="space-y-4 text-slate-600 font-light text-sm sm:text-base leading-relaxed">
                <p>
                  Welcome to <span className="font-semibold text-brand-green">Holy Ghost Academy Secondary School, Awka</span>. As a premier Pentecostal educational institution, we believe that true education does not stop with excellent grades; rather, it blooms when high academic intelligence is blended with deep moral roots.
                </p>
                <p className="italic font-normal border-l-4 border-brand-yellow pl-4 bg-slate-50 py-3 rounded-r text-slate-700">
                  "Our system is designed to trigger critical discovery. Every child has a spark of divine intellect. We supply the high-tech classrooms, specialized laboratory tables, and dedicated teachers of morals to fan this spark into a flame."
                </p>
                <p>
                  Located in the secure and serene environment of Ngozika Housing Estate in Awka, our compound offers students the tranquility required for deep concentration, mathematical research, and spiritual contemplation. We welcome you to audit our curriculum offerings and partner with us.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setActiveTab('about')}
                  className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-heading font-bold text-brand-green hover:text-brand-green-hover transition-colors"
                >
                  <span>Read our School Philosophy & Integrity History</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. STATISTICS SECTION */}
      <section className="bg-gradient-to-br from-brand-green to-slate-900 py-16 text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            {[
              { label: 'Active Students', value: counts.students, prefix: '', suffix: '+' },
              { label: 'Qualified Staff', value: counts.teachers, prefix: '', suffix: '+' },
              { label: 'Graduates Worldwide', value: counts.graduates, prefix: '', suffix: '+' },
              { label: 'State & National Awards', value: counts.awards, prefix: '', suffix: '' },
            ].map((stat, i) => (
              <div key={i} className="space-y-2 p-4 rounded-lg bg-white/5 backdrop-blur-xs border border-white/5 shadow-inner hover:-translate-y-1.5 transition-transform duration-300">
                <div className="text-3xl sm:text-5xl font-extrabold font-heading text-brand-yellow">
                  {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-block bg-brand-green-light text-brand-green py-1 px-3.5 rounded text-xs font-heading font-semibold uppercase tracking-wider">
              Our Core Strengths
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Pillars of Holistic Christian Education
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-light">
              We stand apart as a premier high-capacity learning center. Here are the five integrated pillars that safeguard our students' future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Academic Excellence",
                desc: "Consistently among the top-scoring schools in West African examinations (WAEC & JAMB) through intensive curricula and prep programs.",
                icon: <BookOpen className="text-brand-green" size={24} />,
                color: "border-brand-green/10 bg-white"
              },
              {
                title: "Absolute Moral Discipline",
                desc: "Character education is not an afterthought; we implement rigorous codes of behavior and responsibility tracking systems.",
                icon: <ShieldCheck className="text-brand-oxblood animate-pulse" size={24} />,
                color: "border-brand-oxblood/10 bg-white"
              },
              {
                title: "Modern Learning Environment",
                desc: "Interactive classrooms, digital projection boards, high-speed fiber internet access, and full backup hybrid solar setups.",
                icon: <Milestone className="text-brand-yellow" size={24} />,
                color: "border-brand-yellow/10 bg-white"
              },
              {
                title: "Highly Qualified Teachers",
                desc: "Our teaching core consists of seasoned secondary instructors with postgraduate honors and child psychology experience.",
                icon: <Award className="text-emerald-600" size={24} />,
                color: "border-emerald-600/10 bg-white"
              },
              {
                title: "Faith-Based Guidance",
                desc: "Pentecostal principles provide a moral anchor, dynamic fellowship services, character sessions, and counseling supports.",
                icon: <CheckCircle2 className="text-indigo-600" size={24} />,
                color: "border-indigo-600/10 bg-white"
              },
              {
                title: "Active Community Hub",
                desc: "Dynamic inter-school debates, agricultural practices on our gardens, sports tourneys, and charity outreaches.",
                icon: <TrendingUp className="text-purple-600" size={24} />,
                color: "border-purple-600/10 bg-white"
              }
            ].map((pillar, i) => (
              <div 
                key={i} 
                className={`p-8 rounded-xl border shadow-xs hover:shadow-md transition-all duration-300 group ${pillar.color}`}
              >
                <div className="p-3.5 rounded-lg bg-slate-50 inline-block group-hover:bg-brand-green-light transition-colors mb-5">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-slate-800 mb-2 group-hover:text-brand-green transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. LATEST NEWS & ANNOUNCEMENTS */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 space-y-4 sm:space-y-0">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-brand-oxblood font-heading font-bold">HGASS Chronicle</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                Latest News & Campus Updates
              </h2>
            </div>
            <button
              onClick={() => {
                // Focus news filters or similar
                setActiveTab('news');
              }}
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-heading font-bold text-brand-green hover:text-brand-yellow-hover border border-brand-green/20 hover:border-brand-yellow py-2 px-4 rounded bg-slate-50"
            >
              <span>View All Announcements</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.slice(0, 3).map((post) => (
              <article key={post.id} className="group flex flex-col h-full bg-slate-50 border border-slate-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                {post.imageUrl && (
                  <div className="h-48 w-full overflow-hidden relative">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-brand-green text-white text-[10px] font-heading font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {post.category}
                    </div>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-[11px] text-slate-400 font-mono">{post.date}</div>
                    <h3 className="text-base sm:text-lg font-heading font-bold text-slate-800 line-clamp-2 group-hover:text-brand-green transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-light line-clamp-3 leading-normal">
                      {post.summary}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setActiveTab('about'); // Link to secondary informational page or detail node
                      window.scrollTo(0, 400);
                    }}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-brand-green hover:text-brand-oxblood transition-colors self-start mt-2"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 6. FEATURED PROJECTS SECTION */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-block bg-brand-oxblood-light text-brand-oxblood py-1 px-3.5 rounded text-xs font-heading font-semibold uppercase tracking-wider">
              Transparency & Development
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Ongoing Infrastructure Projects
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-light">
              We actively construct premier spaces for computer science, chemistry, and research. Track our design and expansion tasks here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.slice(0, 2).map((proj) => (
              <div key={proj.id} className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  {proj.image && (
                    <div className="w-full sm:w-1/3 h-36 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                      <img 
                        src={proj.image} 
                        alt={proj.title} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <span className="text-[10px] bg-brand-yellow-light text-brand-yellow-hover font-semibold py-0.5 px-2.5 rounded-full uppercase border border-brand-yellow/10">
                      Target Completion: {proj.expectedCompletionDate}
                    </span>
                    <h3 className="text-base sm:text-lg font-heading font-bold text-slate-800">{proj.title}</h3>
                    <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-3">{proj.description}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-50">
                  <div className="flex justify-between text-xs font-heading font-semibold text-slate-700">
                    <span>Audit Budget: <span className="text-brand-green">{proj.budget}</span></span>
                    <span>{proj.percentageCompletion}% Completed</span>
                  </div>
                  
                  {/* Custom Progress Bar */}
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="bg-brand-green h-full rounded-full transition-all duration-1000"
                      style={{ width: `${proj.percentageCompletion}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setActiveTab('projects')}
              className="inline-flex items-center space-x-1.5 py-2.5 px-5 rounded bg-brand-green hover:bg-brand-green-hover text-white text-xs font-heading font-bold transition-all shadow-md active:scale-95"
            >
              <span>View All Major Projects & Budgets</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-green font-heading font-bold">Community Voice</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Testimonials from Parents & Alumni
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Sending our three boys to Holy Ghost Academy Awka is the best investment my husband and I have made. Their self-discipline is outstanding. Each child has developed a neat, logical approach to homework, computer science coding, and general punctuality.",
                author: "Mrs. Ngozi Ekwueme",
                role: "Parent of JSS 3 & SS 2 Students, Civil Engineer"
              },
              {
                quote: "The academic rigor at HGASS set the foundation for my software engineering honors at UNN. The physics, chemistry, and continuous computer laboratory practical drills were comparable to first-tier high schools in Lagos and Abuja.",
                author: "Engr. Forster Anarado",
                role: "Alumni (Class of 2018), Tech Lead"
              },
              {
                quote: "As an educational supervisor, I look for systematic execution. Holy Ghost Academy combines strict Pentecostal character ethics with highly modern laboratories. The result checked online portal works seamlessly and ensures full transparency for term grades.",
                author: "Dr. Gregory Obi",
                role: "Educational Consultant, Anambra State Agency"
              }
            ].map((test, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-8 shadow-xs flex flex-col justify-between space-y-6 relative hover:shadow-md transition-shadow">
                <Star size={36} className="text-brand-yellow/15 absolute right-4 top-4" />
                <p className="text-xs sm:text-sm text-slate-600 font-light italic leading-relaxed relative z-10">
                  "{test.quote}"
                </p>
                <div className="flex items-center space-x-3.5 pt-4 border-t border-slate-200/50">
                  <div className="h-10 w-10 rounded-full bg-brand-green-light text-brand-green-hover flex items-center justify-center font-heading font-extrabold text-sm uppercase">
                    {test.author.charAt(0) + test.author.split(' ').pop()?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-heading font-bold text-slate-800">{test.author}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
