const API_BASE = "/api/v1";

export interface CliTool {
  _id: string;
  name: string;
  displayName: string;
  tagline?: string;
  category: { _id: string; name: string; slug: string } | string;
  description: string;
  longDescription?: string;
  officialUrl: string;
  downloadUrl?: string;
  icon?: string;
  iconName?: string;
  iconUrl?: string;
  version?: string;
  language?: string;
  installCommand?: string;
  packageManager?: string;
  isFeatured: boolean;
  isActive: boolean;
  status: string;
  metrics: { stars: number; forks: number; issues: number; downloads: number };
  features?: { icon: string; title: string; desc: string }[];
  docs?: { quickStart?: string; usage?: string; advanced?: string };
  alternatives?: string[];
  seo?: {
    keywords?: string[];
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder: number;
}

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
}

export async function getTools(params: Record<string, string> = {}) {
  const qs = new URLSearchParams(params).toString();
  return fetchJSON<{ status: string; results: number; data: { tools: CliTool[] } }>(
    `/cli-tools${qs ? `?${qs}` : ""}`
  );
}

export async function getToolBySlug(slug: string) {
  return fetchJSON<{ status: string; data: { tool: CliTool } }>(`/cli-tools/${slug}`);
}

export async function getCategories() {
  return fetchJSON<{ status: string; data: { categories: Category[] } }>("/cli-tools/categories");
}

export interface CategoryCount {
  name: string;
  slug: string;
  count: number;
}

export async function getCategoryCounts() {
  return fetchJSON<{ status: string; data: { counts: CategoryCount[] } }>("/cli-tools/categories/counts");
}
