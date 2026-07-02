 "use client";
 
 import { useState } from "react";
 import type { Locale } from "@/i18n/dictionary";
 import { t } from "@/i18n/dictionary";
 import { profile } from "@/data/profile";
 
 interface Props {
   locale: Locale;
 }
 
 export default function LeftPanel({ locale }: Props) {
   const [expanded, setExpanded] = useState(false);
 
   const T = (key: string) => t(key, locale);
 
   return (
     <aside
       className={`w-full lg:w-[340px] shrink-0 bg-white border-r border-slate-200 overflow-y-auto transition-all duration-300 ${
         expanded ? "max-h-none" : ""
       }`}
     >
       <div className="p-6 lg:p-8">
         {/* Avatar */}
         <div className="flex flex-col items-center lg:items-start gap-4">
           <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 overflow-hidden shrink-0">
             <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
               <rect width="80" height="80" rx="40" fill="#e2e8f0" />
               <circle cx="40" cy="32" r="12" fill="#94a3b8" />
               <path
                 d="M18 66c0-12.15 9.85-22 22-22s22 9.85 22 22"
                 fill="#94a3b8"
               />
             </svg>
           </div>
 
           {/* Name & Contact */}
           <div className="text-center lg:text-left">
             <h1 className="text-xl font-semibold text-slate-900">
               {T("name")}
             </h1>
             <p className="text-sm text-slate-500 mt-0.5">{profile.email}</p>
             <p className="text-sm text-slate-500">{T("school")}</p>
           </div>
         </div>
 
         {/* Job Target */}
         <div className="mt-5 p-3 bg-blue-50 border border-blue-100 rounded-lg">
           <p className="text-sm font-medium text-blue-800">
             {T("job_target")}
           </p>
           <p className="text-xs text-blue-600 mt-0.5">
             {T("job_tagline")}
           </p>
         </div>
 
         {/* Skills Tags */}
         <div className="mt-5">
           <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
             {T("skills")}
           </h2>
           <div className="flex flex-wrap gap-1.5">
             {profile.skills.map((s) => (
               <span
                 key={s.key}
                 className="inline-block px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-md"
               >
                 {T(s.key)}
               </span>
             ))}
           </div>
         </div>
 
         {/* Toggle Button */}
         <button
           onClick={() => setExpanded(!expanded)}
           className="mt-5 w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
         >
           {expanded ? (
             <>
               {T("hide_resume")}
               <svg
                 className="w-4 h-4"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor"
                 strokeWidth={2}
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   d="M5 15l7-7 7 7"
                 />
               </svg>
             </>
           ) : (
             <>
               {T("view_resume")}
               <svg
                 className="w-4 h-4"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor"
                 strokeWidth={2}
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   d="M19 9l-7 7-7-7"
                 />
               </svg>
             </>
           )}
         </button>
 
         {/* Expanded Resume Sections */}
         {expanded && (
           <div className="mt-6 space-y-6 border-t border-slate-100 pt-6 animate-fade-in">
             {/* About */}
             <section>
               <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                 {T("about")}
               </h3>
               <p className="text-sm text-slate-600 leading-relaxed">
                 {T("about_text")}
               </p>
             </section>
 
             {/* Education */}
             <section>
               <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                 {T("education")}
               </h3>
               <div className="text-sm">
                 <p className="font-medium text-slate-800">{T("degree")}</p>
                 <p className="text-slate-500">{T("degree_period")}</p>
                 <p className="text-slate-500">{T("school")}</p>
               </div>
             </section>
 
             {/* Projects */}
             <section>
               <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                 {T("projects")}
               </h3>
               <div className="space-y-3">
                 {profile.projects.map((p, i) => (
                   <div key={i} className="text-sm">
                     <p className="font-medium text-slate-800">
                       {T(p.titleKey)}
                     </p>
                     <p className="text-slate-500 text-xs mt-0.5">
                       {T(p.descKey)}
                     </p>
                   </div>
                 ))}
               </div>
             </section>
 
             {/* Skills */}
             <section>
               <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                 {T("skills")}
               </h3>
               <div className="flex flex-wrap gap-1.5">
                 {profile.skills.map((s) => (
                   <span
                     key={s.key}
                     className="inline-block px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md"
                   >
                     {T(s.key)}
                   </span>
                 ))}
               </div>
             </section>
 
             {/* Research Interests */}
             <section>
               <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                 {T("research")}
               </h3>
               <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                 {profile.researchKeys.map((key, i) => (
                   <li key={i}>{T(key)}</li>
                 ))}
               </ul>
             </section>
 
             {/* Contact */}
             <section>
               <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                 {T("contact")}
               </h3>
               <p className="text-sm text-slate-600">{T("contact_note")}</p>
               <p className="text-sm text-slate-500 mt-1">
                 {profile.email}
               </p>
             </section>
           </div>
         )}
       </div>
     </aside>
   );
 }
