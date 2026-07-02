 export interface Project {
   title: string;
   titleKey: string;
   descKey: string;
 }
 
 export const profile = {
   nameKey: "name",
   email: "siqi.xu@example.com",
   schoolKey: "school",
   jobTargetKey: "job_target",
   jobTaglineKey: "job_tagline",
   aboutTextKey: "about_text",
   degreeKey: "degree",
   degreePeriodKey: "degree_period",
   skills: [
     { key: "skill_pm" },
     { key: "skill_nlp" },
     { key: "skill_python" },
     { key: "skill_ml" },
     { key: "skill_react" },
     { key: "skill_data" },
     { key: "skill_cloud" },
     { key: "skill_uiux" },
   ],
   projects: [
     { titleKey: "project_1_title", descKey: "project_1_desc" },
     { titleKey: "project_2_title", descKey: "project_2_desc" },
     { titleKey: "project_3_title", descKey: "project_3_desc" },
   ],
   researchKeys: ["research_1", "research_2", "research_3"],
 };
