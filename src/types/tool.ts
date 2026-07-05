import type { ComponentType, LazyExoticComponent } from "react";
import type { LucideIcon } from "lucide-react";

export interface ToolDefinition {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
  component: LazyExoticComponent<ComponentType>;
  keywords?: string[];
}

export interface ToolCategory {
  id: string;
  label: string;
  icon: LucideIcon;
}
