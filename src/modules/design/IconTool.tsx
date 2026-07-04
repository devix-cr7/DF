import { useMemo, useState } from "react";
import {
  Home, Search, Settings, User, Users, Bell, Calendar, Clock,
  Mail, MessageCircle, Phone, Heart, Star, Bookmark, Flag,
  Folder, File, FileText, Image, Video, Music, Mic, Camera,
  Download, Upload, Share2, Link, Paperclip, Trash2, Edit,
  Copy, Save, Printer, Lock, Unlock, Key, Shield, ShieldCheck,
  Eye, EyeOff, AlertTriangle, AlertCircle, Info, HelpCircle,
  CheckCircle, XCircle, Plus, Minus, X, Check, ChevronRight,
  ChevronLeft, ChevronUp, ChevronDown, ArrowRight, ArrowLeft,
  ArrowUp, ArrowDown, RefreshCw, RotateCw, Zap, Flame, Sun,
  Moon, Cloud, CloudRain, Wind, Umbrella, MapPin, Map,
  Navigation, Compass, Globe, Wifi, Bluetooth, Battery,
  Cpu, HardDrive, Database, Server, Terminal, Code2, GitBranch,
  GitCommit, GitPullRequest, GitFork, Package, Box, ShoppingCart,
  ShoppingBag, CreditCard, DollarSign, TrendingUp, TrendingDown,
  BarChart, PieChart, Activity, Layers, Grid, List, Layout,
  Sidebar, Monitor, Smartphone, Tablet, Laptop, Play, Pause,
  Square, SkipForward, SkipBack, Volume2, VolumeX, Filter,
  SlidersHorizontal, Tag, Tags, Award, Gift, Coffee, Anchor, Feather,
  type LucideIcon,
} from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { useCopy } from "../../hooks/useCopy";
import { useT } from "../../hooks/useT";

const ICONS: Record<string, LucideIcon> = {
  Home, Search, Settings, User, Users, Bell, Calendar, Clock,
  Mail, MessageCircle, Phone, Heart, Star, Bookmark, Flag,
  Folder, File, FileText, Image, Video, Music, Mic, Camera,
  Download, Upload, Share2, Link, Paperclip, Trash2, Edit,
  Copy, Save, Printer, Lock, Unlock, Key, Shield, ShieldCheck,
  Eye, EyeOff, AlertTriangle, AlertCircle, Info, HelpCircle,
  CheckCircle, XCircle, Plus, Minus, X, Check, ChevronRight,
  ChevronLeft, ChevronUp, ChevronDown, ArrowRight, ArrowLeft,
  ArrowUp, ArrowDown, RefreshCw, RotateCw, Zap, Flame, Sun,
  Moon, Cloud, CloudRain, Wind, Umbrella, MapPin, Map,
  Navigation, Compass, Globe, Wifi, Bluetooth, Battery,
  Cpu, HardDrive, Database, Server, Terminal, Code2, GitBranch,
  GitCommit, GitPullRequest, GitFork, Package, Box, ShoppingCart,
  ShoppingBag, CreditCard, DollarSign, TrendingUp, TrendingDown,
  BarChart, PieChart, Activity, Layers, Grid, List, Layout,
  Sidebar, Monitor, Smartphone, Tablet, Laptop, Play, Pause,
  Square, SkipForward, SkipBack, Volume2, VolumeX, Filter,
  SlidersHorizontal, Tag, Tags, Award, Gift, Coffee, Anchor, Feather,
};

export default function IconTool() {
  const [query, setQuery] = useState("");
  const { copied, copy } = useCopy();
  const { t } = useT();
  const [copiedName, setCopiedName] = useState("");

  const names = useMemo(
    () => Object.keys(ICONS).filter((n) => n.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <ToolShell title="Icon Browser" description="Search Lucide icons, click to copy the import">
      <div className="flex h-full flex-col gap-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("icons.search_placeholder")}
          className="w-full rounded-lg border border-forge-border bg-forge-bg/60 px-3 py-2 text-[13px] text-forge-text outline-none focus:border-ember-600/60"
        />
        <div className="grid flex-1 grid-cols-4 gap-2 overflow-y-auto sm:grid-cols-6 md:grid-cols-8">
          {names.map((name) => {
            const Icon = ICONS[name];
            const snippet = `import { ${name} } from "lucide-react";`;
            return (
              <button
                key={name}
                onClick={() => {
                  copy(snippet);
                  setCopiedName(name);
                }}
                title={snippet}
                className="group flex flex-col items-center gap-1.5 rounded-lg border border-forge-border bg-forge-bg/30 p-3 transition-colors hover:border-forge-borderHi hover:bg-forge-panel2"
              >
                {copied && copiedName === name ? (
                  <Check size={18} className="text-ember-400" />
                ) : (
                  <Icon size={18} className="text-forge-text" />
                )}
                <span className="w-full truncate text-center text-[10px] text-forge-faint">
                  {name}
                </span>
              </button>
            );
          })}
        </div>
        {copied && (
          <p className="flex items-center gap-1.5 text-xs text-ember-400">
            <Copy size={12} /> {t("icons.copied_import")}
          </p>
        )}
      </div>
    </ToolShell>
  );
}
