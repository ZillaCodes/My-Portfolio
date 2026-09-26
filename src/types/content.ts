export type ProjectStatus = 'completed' | 'in_progress';
export type Project = { id:string; title:string; slug:string; short_description:string; full_description?:string; thumbnail_url?:string; categories:string[]; technologies:string[]; github_url?:string; live_url?:string; project_date?:string; featured:boolean; published:boolean; status:ProjectStatus; display_order:number; problem?:string; solution?:string; how_it_works?:string; key_features?:string[]; contribution?:string };
export type ProjectImage = { id:string; project_id:string; storage_path:string; alt_text?:string|null; display_order:number; created_at:string };
export const skillGroups = ['Development', 'AI & Automation', 'Backend & Infrastructure', 'Finance Technology'] as const;
export type SkillGroup = typeof skillGroups[number];
export type SkillContentType = 'skill' | 'capability';
export type Skill = {id:string; name:string; category:string; description?:string; icon?:string; content_type:SkillContentType; skill_group?:SkillGroup|null; display_order:number; published:boolean};
export type Resume = { id:string; storage_path:string; published:boolean; created_at:string };
