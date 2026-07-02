 "use client";
 
 import type { Locale } from "@/i18n/dictionary";
 import { t } from "@/i18n/dictionary";
 import { topics } from "@/data/topics";
 
 interface Props {
   locale: Locale;
 }
 
 export default function RightPanel({ locale }: Props) {
   const T = (key: string) => t(key, locale);
 
   return (
     <main className="flex-1 overflow-y-auto">
       {/* Header */}
       <div className="sticky top-0 z-10 bg-stone-50/80 backdrop-blur-sm border-b border-slate-200 px-6 lg:px-10 py-4">
         <div className="flex items-center justify-between">
           <div>
             <h2 className="text-lg font-semibold text-slate-800">
               {T("today_topic")}
             </h2>
             <p className="text-xs text-slate-400 mt-0.5">
               {T("today_topic_zh")}
             </p>
           </div>
         </div>
       </div>
 
       {/* Topic Cards */}
       <div className="px-6 lg:px-10 py-6 space-y-4">
         {topics.map((topic) => (
           <article
             key={topic.id}
             className="bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-300 transition-colors"
           >
             <div className="flex items-start justify-between gap-4">
               <div className="flex-1 min-w-0">
                 <h3 className="text-base font-semibold text-slate-900 leading-snug">
                   {locale === "en" ? topic.title : topic.titleZh}
                 </h3>
                 <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                   {locale === "en" ? topic.summary : topic.summaryZh}
                 </p>
                 <div className="flex flex-wrap items-center gap-2 mt-3">
                   {topic.tags.map((tag) => (
                     <span
                       key={tag}
                       className="inline-block px-2 py-0.5 text-[11px] font-medium bg-stone-100 text-slate-500 rounded"
                     >
                       {tag}
                     </span>
                   ))}
                   <span className="text-[11px] text-slate-400 ml-auto">
                     {topic.date}
                   </span>
                 </div>
               </div>
             </div>
           </article>
         ))}
       </div>
 
       {/* Footer note */}
       <div className="px-6 lg:px-10 pb-8">
         <p className="text-xs text-slate-400 text-center">
           Static demo — no live data or API connections
         </p>
       </div>
     </main>
   );
 }
