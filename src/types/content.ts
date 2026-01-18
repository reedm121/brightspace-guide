export interface GuideMetadata {
  title: string;
  description: string;
  category: string;
  order?: number;
  tags?: string[];
  relatedGuides?: string[];
  lastUpdated?: string;
  brightspaceVersion?: string;
}

export interface Guide {
  slug: string;
  metadata: GuideMetadata;
  content: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface SearchResult {
  slug: string;
  title: string;
  description: string;
  category: string;
  excerpt: string;
}

export interface ChatSource {
  title: string;
  slug: string;
  section?: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: ChatSource[];
}
