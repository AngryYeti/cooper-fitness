import {
  Apple,
  Calendar,
  ClipboardCheck,
  Dumbbell,
  Flame,
  Heart,
  LayoutDashboard,
  MessageCircle,
  TrendingUp,
  Trophy,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  dumbbell: Dumbbell,
  flame: Flame,
  "message-circle": MessageCircle,
  trophy: Trophy,
  heart: Heart,
  calendar: Calendar,
  "layout-dashboard": LayoutDashboard,
  "clipboard-check": ClipboardCheck,
  "trending-up": TrendingUp,
  apple: Apple,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Dumbbell;
}
