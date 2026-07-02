 "use client";
 
 import { useState } from "react";
 import type { Locale } from "@/i18n/dictionary";
 import LangToggle from "@/components/LangToggle";
 import LeftPanel from "@/components/LeftPanel";
 import RightPanel from "@/components/RightPanel";
 
 export default function Home() {
   const [locale, setLocale] = useState<Locale>("en");
 
   return (
     <div className="min-h-screen flex flex-col">
       {/* Mobile Top Bar */}
       <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
         <span className="text-sm font-medium text-slate-700">
           Siqi Xu — AI Product Portfolio
         </span>
         <LangToggle locale={locale} onToggle={setLocale} />
       </header>
 
       <div className="flex flex-1 flex-col lg:flex-row">
         {/* Left Panel */}
         <LeftPanel locale={locale} />
 
         {/* Right Panel */}
         <RightPanel locale={locale} />
       </div>
 
       {/* Desktop Lang Toggle fixed top-right */}
       <div className="hidden lg:block fixed top-4 right-4 z-20">
         <LangToggle locale={locale} onToggle={setLocale} />
       </div>
     </div>
   );
 }
