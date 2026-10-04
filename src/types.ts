export type PageId =
  | 'splash'
  | 'welcome'
  | 'confirmation'
  | 'research-intro'
  | 'research-sequential'
  | 'research-conditional'
  | 'research-iterative'
  | 'sitemap'
  | 'team';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleDescription: string;
  avatar: string;
  tiktokUrl: string;
  highlightTag?: string;
  specialties: string[];
}

export interface FlowchartElement {
  id: string;
  label: string;
  subLabel?: string;
  shape: 'oval' | 'parallelogram' | 'rectangle' | 'diamond' | 'circle';
  typeLabel: string;
  explanation: string;
  exampleCode?: string;
  importance: string;
  lineNumber?: number;
}

export interface SiteMapNodeData {
  id: PageId;
  title: string;
  category: 'core' | 'flow' | 'research' | 'team';
  typeBadge: string;
  purpose: string;
  whyExists: string;
  leadsTo: string;
  x: number;
  y: number;
  iconName: string;
  progressPercent: number;
  keyConcepts: string[];
  examples: string[];
  codeSnippet?: string;
}

export type SimulatorSpeed = 0.5 | 1 | 2;
