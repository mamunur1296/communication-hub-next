"use client";

import { useState, useEffect, useRef, useMemo, Fragment, Children } from "react";
import {
  LayoutDashboard, User, MessagesSquare, Settings, Users, UserCog, UserPlus,
  Briefcase, GraduationCap, Building2, Search, FileText, Wallet, Network,
  GitBranch, BarChart3, Cog, Send, Smile, MoreVertical, Star,
  CalendarDays, Trash2, Edit3, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, GripVertical,
  Plus, MessageCircleMore, Calendar as CalendarIcon, MailOpen, Pin, Phone,
  Video, Globe, Clock, RefreshCcw, X, Check, CircleCheck, CircleDot,
  ChevronsRight, Bell, MapPin, AlertCircle, Coffee, Newspaper,
  Megaphone, ThumbsUp, Lightbulb, PartyPopper, MessageSquare, Repeat2, SlidersHorizontal,
  Eye, Hash, AtSign,
  File, Image as ImageIcon, ArrowLeft, ArrowRight, Link as LinkIcon, ExternalLink,
  Shield, Sparkles, Linkedin, Archive, Bookmark,
  LayoutGrid, BookOpen, Headphones,
  CornerUpLeft, SmilePlus,
  UserCheck, CheckCircle, Edit2, MoreHorizontal, Info, RotateCcw, Award,
  Mail, Calendar as CalendarSolid, Filter, TrendingUp, BarChart2, Target,
  Inbox, Plug, ClipboardCheck, Ban, Tag, Activity, Zap, FileCheck,
  Sun, Moon, Home,
} from "lucide-react";
import NewsFeedModule from "./modules/newsfeed/NewsFeedModule";
import ChatsModule from "./modules/chats/ChatsModule";
import BookingsModule from "./modules/bookings/BookingsModule";
import MyScheduleModule from "./modules/my-schedule/MyScheduleModule";
import SettingsModule from "./modules/settings/SettingsModule";

/* ═══════════════════════════════════════════════════════════════
   COLOR SYSTEM (matches your brand tokens)
   ═══════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════
   COLOR SYSTEM
   Brand teal #045D5E and brand orange #FC7300 carry across both modes.
   In dark mode the teal lightens (the dark teal would be invisible on a
   dark bg) and bg/surface/text invert. Inline styles read from `C`,
   which is mutated to match the active theme at the top of every
   CommunicationHub render — see the `useTheme` sync inside the component.
   ═══════════════════════════════════════════════════════════════ */
const C_LIGHT = {
  // App + surface — cool, true-neutral slate background pairs well with
  // brand teal without competing for attention. Cards stay pure white.
  bg:           "#F8FAFC",   // slate-50 — app background
  surface:      "#FFFFFF",   // cards, panels
  // Brand teal — primary action and emphasis. Unchanged across both modes.
  primary:      "#045D5E",
  primaryDark:  "#033F40",
  primaryLight: "#067A7B",
  primary30:    "rgba(4,93,94,0.18)",
  primary20:    "rgba(4,93,94,0.12)",
  primary10:    "rgba(4,93,94,0.06)",
  primary05:    "rgba(4,93,94,0.035)",
  primaryBorder:"rgba(4,93,94,0.22)",
  // Brand orange — secondary accent.
  secondary:    "#FC7300",
  secondaryDark:"#E16500",
  sec30:        "rgba(252,115,0,0.20)",
  sec20:        "rgba(252,115,0,0.12)",
  sec10:        "rgba(252,115,0,0.07)",
  secBorder:    "rgba(252,115,0,0.30)",
  // Text scale — slate ramp for premium feel.
  text:         "#0F172A",   // slate-900 — primary text
  textMid:      "#475569",   // slate-600 — secondary text
  textSoft:     "#64748B",   // slate-500 — muted text & captions
  textVerySoft: "#94A3B8",   // slate-400 — placeholders, dividing
  // Borders — true-neutral slate at low opacity. Replaces heavy shadows.
  border:       "rgba(15,23,42,0.06)",   // 6% slate-900 — default border
  borderStrong: "rgba(15,23,42,0.10)",   // for hover / emphasis
  divider:      "rgba(15,23,42,0.04)",   // ultra-subtle separator lines
  // Shadows — very light, calmer than before.
  shadow:       "0 1px 2px rgba(15,23,42,0.04)",
  shadowMd:     "0 4px 12px rgba(15,23,42,0.06)",
  shadowLg:     "0 12px 32px rgba(15,23,42,0.08)",
  // Status colors — kept semantic but used sparingly.
  success:      "#10b981",
  successBg:    "rgba(16,185,129,0.08)",
  danger:       "#ef4444",
  dangerBg:     "rgba(239,68,68,0.06)",
  warn:         "#f59e0b",
  warnBg:       "rgba(245,158,11,0.08)",
};

const C_DARK = {
  // Surfaces: deep slate (very slight teal undertone) for comfort in long
  // sessions. Avoids over-saturated greens that strain the eye.
  bg:           "#0F1517",   // app background — near-black with hint of teal
  surface:      "#1A2226",   // cards, sidebars — one level above bg
  // Primary: brand teal lightened so it's legible on dark surfaces
  primary:      "#3FB5B7",
  primaryDark:  "#2D9799",
  primaryLight: "#67D4D6",
  primary30:    "rgba(63,181,183,0.28)",
  primary20:    "rgba(63,181,183,0.18)",
  primary10:    "rgba(63,181,183,0.10)",
  primary05:    "rgba(63,181,183,0.06)",
  primaryBorder:"rgba(63,181,183,0.32)",
  // Secondary brand orange — slightly warmer for dark backgrounds
  secondary:    "#FF8A2E",
  secondaryDark:"#E16500",
  sec30:        "rgba(255,138,46,0.30)",
  sec20:        "rgba(255,138,46,0.18)",
  sec10:        "rgba(255,138,46,0.12)",
  secBorder:    "rgba(255,138,46,0.38)",
  // Text: softer light text reduces glare for long-session reading.
  text:         "#E8EDEF",
  textMid:      "#A8B5BD",
  textSoft:     "#7C8A92",
  textVerySoft: "#536069",
  // Borders: white-tinted, slightly stronger in dark mode for visibility
  border:       "rgba(255,255,255,0.07)",
  borderStrong: "rgba(255,255,255,0.13)",
  divider:      "rgba(255,255,255,0.04)",
  // Shadows: subtle in dark mode — depth comes from surface elevation
  shadow:       "0 1px 2px rgba(0,0,0,0.25)",
  shadowMd:     "0 4px 12px rgba(0,0,0,0.35)",
  shadowLg:     "0 12px 32px rgba(0,0,0,0.45)",
  // Status colors — slightly desaturated to feel native to dark mode
  success:      "#34D399",
  successBg:    "rgba(52,211,153,0.12)",
  danger:       "#F87171",
  dangerBg:     "rgba(248,113,113,0.12)",
  warn:         "#FBBF24",
  warnBg:       "rgba(251,191,36,0.12)",
};

// Mutable runtime palette. Every inline style references `C`, and the
// CommunicationHub component re-syncs this object's contents to match
// the active theme at the top of every render. Helper components defined
// outside the main component also read from this same object, so they
// pick up the theme automatically.
const C = { ...C_LIGHT };

// ── Design tokens: typography, spacing, radius, components ──
const T = {
  fontXs: 11, fontSm: 12.5, fontBase: 14, fontMd: 15, fontLg: 18, fontXl: 22,
  lineBody: 1.55, lineTight: 1.3,
  sp1: 4, sp2: 8, sp3: 12, sp4: 16, sp5: 20, sp6: 24, sp7: 32,
  radSm: 6, radMd: 10, radLg: 14, radXl: 16, radFull: 999,
  btnH: 36, inputH: 40, rowH: 52, navH: 42,
  badgeH: 20, badgeFont: 11, badgeRad: 999,
};

/* ═══════════════════════════════════════════════════════════════
   SAMPLE DATA — replace with API later
   ═══════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════
   UNIFIED USER MODEL with COMPANY HIERARCHY

   Two chains, both rooted at the CEO:
     SALES:     CEO → Branch Manager → Sales Manager → Sales Team Leader → Consultant
     ADMISSION: CEO → Branch Manager → Global Admission Manager → Admission Manager → Admission Officer

   level: 1=CEO (top), 5=lowest. Lower number = higher hierarchy.
   dept:  "system" | "sales" | "admission"
   ═══════════════════════════════════════════════════════════════ */
const USERS = [
  // ─── System (Top of both chains) ───
  { id: "u-shamim",    name: "Shamim Rahman",  role: "CEO / System Admin",          dept: "system",    level: 1, type: "admin",     initials: "SR", color: "#E9445A", online: true  },

  // ─── Sales Department ───
  { id: "u-md-shamim", name: "Md Shamim",      role: "Branch Manager (Sales)",      dept: "sales",     level: 2, type: "sales",     initials: "MS", color: "#0A6E6F", online: false },
  { id: "u-andreea",   name: "Andreea Cinpoi", role: "Sales Manager",                dept: "sales",     level: 3, type: "sales",     initials: "AN", color: "#7C3AED", online: false },
  { id: "u-laura",     name: "Laura Tomova",   role: "Sales Team Leader",            dept: "sales",     level: 4, type: "sales",     initials: "LA", color: "#3A7BD5", online: false },
  { id: "u-tousif",    name: "Tousif Sadman",  role: "Consultant",                   dept: "sales",     level: 5, type: "sales",     initials: "TS", color: "#0E7C66", online: true  },
  { id: "u-riad",      name: "Riad Hossain",   role: "Consultant",                   dept: "sales",     level: 5, type: "sales",     initials: "RH", color: "#D97706", online: true  },
  { id: "u-mihadul",   name: "Mihadul Islam",  role: "Consultant",                   dept: "sales",     level: 5, type: "sales",     initials: "MI", color: "#65A30D", online: true  },
  { id: "u-asad",      name: "Asad Fahad",     role: "Consultant",                   dept: "sales",     level: 5, type: "sales",     initials: "AF", color: "#DB2777", online: true  },

  // ─── Admission Department ───
  { id: "u-jennifer",  name: "Jennifer Aboje", role: "Branch Manager (Admission)",  dept: "admission", level: 2, type: "admission", initials: "JA", color: "#FC7300", online: false },
  { id: "u-raj",       name: "Raj Ahmed",      role: "Global Admission Manager",     dept: "admission", level: 3, type: "admission", initials: "RA", color: "#0EA5E9", online: false },
  { id: "u-nur",       name: "Nur Mohammad",   role: "Admission Manager",            dept: "admission", level: 4, type: "admission", initials: "NM", color: "#8B5CF6", online: false },
  { id: "u-siam",      name: "Md Siam",        role: "Admission Officer",            dept: "admission", level: 5, type: "admission", initials: "MS", color: "#10B981", online: false },
  { id: "u-rakib",     name: "Md Rakib",       role: "Admission Officer",            dept: "admission", level: 5, type: "admission", initials: "MR", color: "#06B6D4", online: true  },
  { id: "u-nadia",     name: "Nadia Ahmed",    role: "Admission Officer",            dept: "admission", level: 5, type: "admission", initials: "NA", color: "#F59E0B", online: false },
  { id: "u-testa",     name: "Testa Feesta",   role: "Admission Officer",            dept: "admission", level: 5, type: "admission", initials: "TF", color: "#EC4899", online: false },
  { id: "u-roni",      name: "Md Roni",        role: "Admission Officer",            dept: "admission", level: 5, type: "admission", initials: "MR", color: "#84CC16", online: false },

  // ─── Students (external — appear only inside their own application group) ───
  // type "student" excludes them from internal pickers (chat compose, post audience, etc.)
  { id: "s-117452", name: "Carolina Moraru",   role: "Student · APP117452", dept: "external", level: 99, type: "student", initials: "CM", color: "#94A3B8", online: false, appId: "APP117452" },
  { id: "s-117453", name: "Aisha Khatun",      role: "Student · APP117453", dept: "external", level: 99, type: "student", initials: "AK", color: "#94A3B8", online: true,  appId: "APP117453" },
  { id: "s-117454", name: "Mahmud Hasan",      role: "Student · APP117454", dept: "external", level: 99, type: "student", initials: "MH", color: "#94A3B8", online: false, appId: "APP117454" },
  { id: "s-117455", name: "Priya Sharma",      role: "Student · APP117455", dept: "external", level: 99, type: "student", initials: "PS", color: "#94A3B8", online: false, appId: "APP117455" },
  { id: "s-117456", name: "Tahmid Rahman",     role: "Student · APP117456", dept: "external", level: 99, type: "student", initials: "TR", color: "#94A3B8", online: true,  appId: "APP117456" },
  { id: "s-117457", name: "Noor Begum",        role: "Student · APP117457", dept: "external", level: 99, type: "student", initials: "NB", color: "#94A3B8", online: false, appId: "APP117457" },
  { id: "s-117458", name: "Rashed Khan",       role: "Student · APP117458", dept: "external", level: 99, type: "student", initials: "RK", color: "#94A3B8", online: false, appId: "APP117458" },
  { id: "s-117459", name: "Sumaya Ahmed",      role: "Student · APP117459", dept: "external", level: 99, type: "student", initials: "SA", color: "#94A3B8", online: true,  appId: "APP117459" },
];

const ROLE_GROUPS = [
  { id: "admin",     label: "SYSTEM ADMINISTRATOR", filterType: "admin",     accent: "#E9445A", accentBg: "rgba(233,68,90,0.08)",  accentBorder: "rgba(233,68,90,0.20)",  Icon: Shield },
  { id: "sales",     label: "SALES TEAM",            filterType: "sales",     accent: "#045D5E", accentBg: "rgba(4,93,94,0.08)",    accentBorder: "rgba(4,93,94,0.20)",    Icon: Briefcase },
  { id: "admission", label: "ADMISSION TEAM",        filterType: "admission", accent: "#FC7300", accentBg: "rgba(252,115,0,0.08)",  accentBorder: "rgba(252,115,0,0.22)",  Icon: Building2 },
  { id: "student",   label: "STUDENTS",              filterType: "student",   accent: "#64748B", accentBg: "rgba(100,116,139,0.08)", accentBorder: "rgba(100,116,139,0.18)", Icon: GraduationCap },
];

const DEFAULT_USER_ID = "u-shamim";

/* ═══════════════════════════════════════════════════════════════
   UAPP APP REGISTRY — for the app launcher in the topbar.
   Each app has a unique id, name, icon, and color tokens for the
   tile background (bg) and icon color (color).
   "crm" and "comms" are wired to the existing flows; the rest are
   placeholder "Coming soon" screens that share the same chrome.
   ═══════════════════════════════════════════════════════════════ */
const APPS = [
  { id: "crm",       name: "CRM",         Icon: Briefcase,     bg: "#FFF7ED", color: "#C2410C", tagline: "Applications, students, and admission tracking" },
  { id: "leads",     name: "Leads",       Icon: Users,         bg: "#F0FDFA", color: "#0F766E", tagline: "Pipeline, lead capture, and conversion" },
  { id: "chat",      name: "ChatUAPP",    Icon: MessageSquare, bg: "#F0F9FF", color: "#0369A1", tagline: "AI assistant for course and university questions" },
  { id: "comms",     name: "Comms Hub",   Icon: Headphones,    bg: "#FFF1F2", color: "#BE123C", tagline: "Team chats, bookings, news feed, and templates" },
  { id: "knowledge", name: "Knowledge",   Icon: BookOpen,      bg: "#ECFEFF", color: "#0891B2", tagline: "Training courses, resources, and certificates" },
  { id: "website",   name: "UAPP Site",   Icon: Globe,         bg: "#ECFDF5", color: "#047857", tagline: "Public marketing site for prospective students" },
];


// ─── Symmetric thread key for any pair of users ───
function threadId(a, b) {
  return [a, b].sort().join("::");
}

// ─── Lookup helper ───
function findUser(id) {
  return USERS.find(u => u.id === id);
}

// ─── Parse a human-readable time string into "minutes ago" for sorting ───
// Handles: "now", "just now", "5m", "1h", "2d", "yesterday", weekday names, "HH:MM"
// Returns Infinity for empty/unparseable so missing values sort to the end.
function timeStringToMinutesAgo(s) {
  if (!s) return Infinity;
  const t = String(s).toLowerCase().trim();
  if (t === "now" || t === "just now") return 0;
  let m;
  if ((m = t.match(/^(\d+)\s*m(in)?$/))) return parseInt(m[1], 10);
  if ((m = t.match(/^(\d+)\s*h(r|our)?s?$/))) return parseInt(m[1], 10) * 60;
  if ((m = t.match(/^(\d+)\s*d(ay)?s?$/))) return parseInt(m[1], 10) * 60 * 24;
  if ((m = t.match(/^(\d+)\s*w(eek)?s?$/))) return parseInt(m[1], 10) * 60 * 24 * 7;
  if (t === "yesterday") return 60 * 24;
  if (/^(mon|tue|wed|thu|fri|sat|sun)/.test(t)) return 60 * 24 * 3; // ~3 days
  if (/^\d{1,2}:\d{2}/.test(t)) return 60; // today (~1h)
  return 9999; // unknown → very old
}

// ─── Audience visibility check for News Feed posts ───
function canSeePost(post, viewer) {
  if (!post || !viewer) return false;
  // CEO sees everything
  if (viewer.dept === "system") return true;
  // Author always sees own posts
  if (post.author === viewer.id) return true;
  switch (post.audience) {
    case "all": return true;
    case "sales": return viewer.dept === "sales";
    case "admission": return viewer.dept === "admission";
    case "leadership": return viewer.level <= 3; // BMs + Sales/Admission Managers + CEO
    default: return false;
  }
}

// Resolve a group's iconName string to its Lucide component.
// Defined inside the component scope (after icon imports), so it lives there.

// ─── Hierarchy / membership rule ───
// Returns "direct" if the admin can add the target straight to a group,
// or "invite" if an invitation must be sent and accepted first.
function membershipMode(admin, target) {
  if (!admin || !target) return "invite";
  // CEO can add anyone directly (top of both chains)
  if (admin.dept === "system") return "direct";
  // Adding the CEO requires an invitation (you can't add anyone above you)
  if (target.dept === "system") return "invite";
  // Cross-department always requires an invitation
  if (admin.dept !== target.dept) return "invite";
  // Same department: target's level must be >= admin's level
  // (level 5 = lowest, level 1 = highest. Admin can add same-or-lower hierarchy directly.)
  if (target.level < admin.level) return "invite";
  return "direct";
}

// ─── Color luminance — used to pick readable text on any avatar ───
function isDarkBg(hex) {
  if (!hex || !hex.startsWith("#")) return false;
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 165;
}

/* ═══════════════════════════════════════════════════════════════
   GROUPS & INVITATIONS — seed data for the demo
   ═══════════════════════════════════════════════════════════════ */
const INITIAL_GROUPS = [
  {
    id: "g-sales-team",
    name: "Sales Team",
    description: "Daily standups & deal coordination",
    color: "#0A6E6F",
    iconName: "Briefcase",
    createdBy: "u-md-shamim",
    createdAt: "Mon",
    members: ["u-md-shamim", "u-andreea", "u-laura", "u-tousif", "u-riad", "u-mihadul", "u-asad"],
    admins: ["u-md-shamim"],
  },
  {
    id: "g-admission-officers",
    name: "Admission Officers",
    description: "All admission officers — daily ops",
    color: "#FC7300",
    iconName: "GraduationCap",
    createdBy: "u-nur",
    createdAt: "Mon",
    members: ["u-nur", "u-siam", "u-rakib", "u-nadia", "u-testa", "u-roni"],
    admins: ["u-nur"],
  },
  {
    id: "g-leadership",
    name: "Leadership",
    description: "C-suite + Branch Managers + Heads",
    color: "#E9445A",
    iconName: "Star",
    createdBy: "u-shamim",
    createdAt: "Sun",
    members: ["u-shamim", "u-md-shamim", "u-jennifer", "u-andreea", "u-raj"],
    admins: ["u-shamim"],
  },
  {
    id: "g-marketing",
    name: "Marketing & Events",
    description: "Campaigns, social, intake events",
    color: "#7C3AED",
    iconName: "Megaphone",
    createdBy: "u-shamim",
    createdAt: "Tue",
    members: ["u-shamim", "u-andreea", "u-laura", "u-jennifer", "u-mihadul"],
    admins: ["u-shamim", "u-andreea"],
  },
  {
    id: "g-sept-intake-2026",
    name: "Sept 2026 Intake Squad",
    description: "All hands for September intake students",
    color: "#0891B2",
    iconName: "GraduationCap",
    createdBy: "u-md-shamim",
    createdAt: "Wed",
    members: ["u-md-shamim", "u-andreea", "u-tousif", "u-riad", "u-raj", "u-nur"],
    admins: ["u-md-shamim", "u-raj"],
  },
  {
    id: "g-uk-visa-help",
    name: "UK Visa & CAS Help",
    description: "Visa guidance, CAS letter coordination",
    color: "#DB2777",
    iconName: "Shield",
    createdBy: "u-jennifer",
    createdAt: "Thu",
    members: ["u-jennifer", "u-raj", "u-nadia", "u-testa", "u-laura"],
    admins: ["u-jennifer"],
  },

  // ═══════════════════════════════════════════════════════════
  // APPLICATION GROUPS — auto-created when a student starts an application.
  // Members: student + assigned consultant + assigned admission manager.
  // Closed: nobody else can be invited or added.
  // When applicationStatus === "Enrolled", a banner appears at the bottom of
  // the chat indicating the group will auto-archive in 7 days. The consultant
  // or manager can also archive it manually at any time.
  // ═══════════════════════════════════════════════════════════
  {
    id: "g-app-117452",
    name: "APP117452",
    description: "Carolina Moraru · University of Suffolk - LSC",
    color: "#0EA5E9",
    iconName: "GraduationCap",
    type: "application",
    appId: "APP117452",
    studentName: "Carolina Moraru",
    universityShort: "USL",
    courseName: "Cert HE Business Studies (Foundation Year)",
    intake: "June 2026",
    applicationStatus: "New Application",
    statusColor: "#0EA5E9",
    createdBy: "system",
    createdAt: "12 Apr",
    members: ["s-117452", "u-andreea", "u-raj"], // student, consultant, manager
    admins: ["u-andreea", "u-raj"],
    closed: true,             // no invitations allowed
    archived: false,
    archivedAt: null,
    enrolledAt: null,
  },
  {
    id: "g-app-117453",
    name: "APP117453",
    description: "Aisha Khatun · Wrexham University",
    color: "#FC7300",
    iconName: "GraduationCap",
    type: "application",
    appId: "APP117453",
    studentName: "Aisha Khatun",
    universityShort: "WRX",
    courseName: "BSc International Business Management",
    intake: "September 2026",
    applicationStatus: "Conditional Offer Letter",
    statusColor: "#FC7300",
    createdBy: "system",
    createdAt: "8 Apr",
    members: ["s-117453", "u-tousif", "u-raj"],
    admins: ["u-tousif", "u-raj"],
    closed: true,
    archived: false,
    archivedAt: null,
    enrolledAt: null,
  },
  {
    id: "g-app-117454",
    name: "APP117454",
    description: "Mahmud Hasan · London Metropolitan",
    color: "#16A34A",
    iconName: "GraduationCap",
    type: "application",
    appId: "APP117454",
    studentName: "Mahmud Hasan",
    universityShort: "LMET",
    courseName: "MSc Business with Financial Management",
    intake: "September 2026",
    applicationStatus: "Unconditional Offer Letter",
    statusColor: "#16A34A",
    createdBy: "system",
    createdAt: "3 Apr",
    members: ["s-117454", "u-mihadul", "u-nur"],
    admins: ["u-mihadul", "u-nur"],
    closed: true,
    archived: false,
    archivedAt: null,
    enrolledAt: null,
  },
  {
    id: "g-app-117456",
    name: "APP117456",
    description: "Tahmid Rahman · Anglia Ruskin London",
    color: "#16A34A",
    iconName: "GraduationCap",
    type: "application",
    appId: "APP117456",
    studentName: "Tahmid Rahman",
    universityShort: "ARUL",
    courseName: "BA (Hons) Business Management",
    intake: "September 2026",
    // Enrolled — should show the auto-archive banner
    applicationStatus: "Enrolled",
    statusColor: "#16A34A",
    createdBy: "system",
    createdAt: "20 Mar",
    members: ["s-117456", "u-andreea", "u-raj"],
    admins: ["u-andreea", "u-raj"],
    closed: true,
    archived: false,
    archivedAt: null,
    enrolledAt: "2026-05-04T10:00:00Z", // 3 days ago — auto-archive in 4 days
  },
  {
    id: "g-app-117459",
    name: "APP117459",
    description: "Sumaya Ahmed · LSBU",
    color: "#FC7300",
    iconName: "GraduationCap",
    type: "application",
    appId: "APP117459",
    studentName: "Sumaya Ahmed",
    universityShort: "LSBU",
    courseName: "BSc (Hons) Computer Science",
    intake: "September 2026",
    applicationStatus: "Conditional Offer Letter",
    statusColor: "#FC7300",
    createdBy: "system",
    createdAt: "28 Mar",
    members: ["s-117459", "u-asad", "u-nur"],
    admins: ["u-asad", "u-nur"],
    closed: true,
    archived: false,
    archivedAt: null,
    enrolledAt: null,
  },
];

// Pending invitations — each shows in the recipient's notification bell
const INITIAL_INVITATIONS = [
  // Md Shamim (Branch Manager Sales) tries to add the CEO to the Sales Team group → must invite
  { id: "inv-1", groupId: "g-sales-team",         fromUserId: "u-md-shamim", toUserId: "u-shamim",  sentAt: "11:32",     status: "pending" },
  // Md Shamim (Sales) invites Nur (Admission Manager) to a sales group → cross-team, must invite
  { id: "inv-2", groupId: "g-sales-team",         fromUserId: "u-md-shamim", toUserId: "u-nur",     sentAt: "Yesterday", status: "pending" },
  // Nur (Admission Manager) invites his Branch Manager Jennifer to admission officers → upper hierarchy, must invite
  { id: "inv-3", groupId: "g-admission-officers", fromUserId: "u-nur",       toUserId: "u-jennifer", sentAt: "10:18",     status: "pending" },
];

/* ═══════════════════════════════════════════════════════════════
   SAMPLE DATA — Meetings, Applications
   ═══════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════
   MEETINGS — every meeting carries an `attendees` array.
   Each attendee tracks their own pending | accepted | rejected
   response, mirroring Google Calendar / Outlook semantics.
   The organizer is always auto-accepted.
   ═══════════════════════════════════════════════════════════════ */
const INITIAL_MEETINGS = {
  upcoming: [
    {
      id: "mt-1",
      organizer: "u-shamim",
      title: "Application Review",
      date: "2026-05-02", start: "10:00 AM", end: "10:30 AM",
      timezone: "Europe/London (GMT+1)",
      location: "Online — link generated automatically",
      duration: 30,
      attendees: [
        { userId: "u-shamim", status: "accepted", respondedAt: "Mon" },
        { userId: "u-asad",   status: "pending" },
      ],
      // legacy `with` retained for backward compat with existing render code
      with: "u-asad",
    },
    {
      id: "mt-2",
      organizer: "u-shamim",
      title: "Onboarding Walkthrough",
      date: "2026-05-05", start: "02:00 PM", end: "02:30 PM",
      timezone: "Europe/London (GMT+1)",
      location: "Online — link generated automatically",
      duration: 30,
      attendees: [
        { userId: "u-shamim", status: "accepted", respondedAt: "Mon" },
        { userId: "u-testa",  status: "pending" },
      ],
      with: "u-testa",
    },
    // ─── Demo seed: meeting Md Shamim sent — Shamim is the invitee ───
    {
      id: "mt-3",
      organizer: "u-md-shamim",
      title: "Q2 Sales Pipeline Review",
      date: "2026-05-04", start: "11:00 AM", end: "12:00 PM",
      timezone: "Europe/London (GMT+1)",
      location: "Online — link generated automatically",
      duration: 60,
      attendees: [
        { userId: "u-md-shamim", status: "accepted", respondedAt: "Mon" },
        { userId: "u-shamim",    status: "pending" }, // ← will appear in Shamim's bell
        { userId: "u-andreea",   status: "accepted", respondedAt: "Tue" },
        { userId: "u-laura",     status: "pending" },
      ],
      groupMeeting: true,
    },
  ],
  passed: [
    {
      id: "mt-p1",
      organizer: "u-shamim",
      title: "Weekly Sync",
      date: "2026-04-18", start: "11:00 AM", end: "11:30 AM",
      timezone: "Europe/London (GMT+1)",
      location: "Online — link generated automatically",
      duration: 30,
      attendees: [
        { userId: "u-shamim", status: "accepted", respondedAt: "Apr 17" },
        { userId: "u-nur",    status: "accepted", respondedAt: "Apr 17" },
      ],
      with: "u-nur",
    },
  ],
  canceled: [],
};

const SAMPLE_APPLICATIONS = [
  { id: "APP114797", course: "BA (Hons) International Business Pathways with Foundation Year", university: "University of the West of Scotland (UWS)", uniCode: "UWS", uniColor: "#1A2A4F", date: "5 Dec 2023" },
  { id: "APP114798", course: "BA (Hons) International Business Pathways with Foundation Year", university: "University of the West of Scotland (UWS)", uniCode: "UWS", uniColor: "#1A2A4F", date: "15 Feb 2024" },
  { id: "APP114799", course: "BA (Hons) International Business Pathways with Foundation Year", university: "University of the West of Scotland (UWS)", uniCode: "UWS", uniColor: "#1A2A4F", date: "20 Mar 2024" },
  { id: "APP114800", course: "BA (Hons) International Business Pathways with Foundation Year", university: "University of the West of Scotland (UWS)", uniCode: "UWS", uniColor: "#1A2A4F", date: "25 Apr 2024" },
  { id: "APP114801", course: "MSc Computing (Software Development)", university: "Anglia Ruskin University, London", uniCode: "ARUL", uniColor: "#0E4C92", date: "12 May 2024" },
  { id: "APP114802", course: "MBA Global Business", university: "Ulster University QA Study Centre", uniCode: "UQAS", uniColor: "#003A70", date: "08 Jun 2024" },
  { id: "APP114803", course: "BSc (Hons) Health & Social Care", university: "Wrexham University", uniCode: "WREX", uniColor: "#B22234", date: "20 Aug 2024" },
];

/* ═══════════════════════════════════════════════════════════════
   NEWS FEED — taxonomy + seeded posts

   Categories:  admission | sales | partnership | announcement | deadline
   Priorities:  high | medium | low
   Audiences:   all | sales | admission | leadership
   Post types:  text | admission_update | deadline | promotion | partnership
   ═══════════════════════════════════════════════════════════════ */
const FEED_CATEGORIES = {
  admission:      { label: "Admissions",          color: "#0EA5E9", bg: "rgba(14,165,233,0.10)",  border: "rgba(14,165,233,0.22)",  iconName: "GraduationCap" },
  intake:         { label: "Intake",              color: "#06B6D4", bg: "rgba(6,182,212,0.10)",   border: "rgba(6,182,212,0.22)",   iconName: "CalendarDays" },
  deadline:       { label: "Deadlines",           color: "#E9445A", bg: "rgba(233,68,90,0.10)",   border: "rgba(233,68,90,0.22)",   iconName: "Clock" },
  university:     { label: "University Updates",  color: "#7C3AED", bg: "rgba(124,58,237,0.10)",  border: "rgba(124,58,237,0.22)",  iconName: "Building2" },
  partnership:    { label: "Partnerships",        color: "#8B5CF6", bg: "rgba(139,92,246,0.10)",  border: "rgba(139,92,246,0.22)",  iconName: "Network" },
  sales:          { label: "Sales Campaigns",     color: "#0A6E6F", bg: "rgba(10,110,111,0.10)",  border: "rgba(10,110,111,0.22)",  iconName: "Briefcase" },
  marketing:      { label: "Marketing",           color: "#0A66C2", bg: "rgba(10,102,194,0.10)",  border: "rgba(10,102,194,0.22)",  iconName: "Megaphone" },
  documentation:  { label: "Documentation",       color: "#64748B", bg: "rgba(100,116,139,0.10)", border: "rgba(100,116,139,0.22)", iconName: "FileText" },
  training:       { label: "Training",            color: "#D946EF", bg: "rgba(217,70,239,0.10)",  border: "rgba(217,70,239,0.22)",  iconName: "BookOpen" },
  announcement:   { label: "Announcements",       color: "#FC7300", bg: "rgba(252,115,0,0.10)",   border: "rgba(252,115,0,0.22)",   iconName: "Megaphone" },
  urgent:         { label: "Urgent Alerts",       color: "#DC2626", bg: "rgba(220,38,38,0.10)",   border: "rgba(220,38,38,0.22)",   iconName: "AlertCircle" },
  system_updates: { label: "System Updates",      color: "#475569", bg: "rgba(71,85,105,0.10)",   border: "rgba(71,85,105,0.22)",   iconName: "Cog" },
  performance:    { label: "Performance Update",  color: "#F59E0B", bg: "rgba(245,158,11,0.10)",  border: "rgba(245,158,11,0.22)",  iconName: "TrendingUp" },
  offer:          { label: "Offer Letter",        color: "#16A34A", bg: "rgba(22,163,74,0.10)",   border: "rgba(22,163,74,0.22)",   iconName: "PartyPopper" },
  promotion:      { label: "Promotion",           color: "#EC4899", bg: "rgba(236,72,153,0.10)",  border: "rgba(236,72,153,0.22)",  iconName: "Award" },
};

const FEED_PRIORITIES = {
  high:   { label: "High",   color: "#E9445A", bg: "rgba(233,68,90,0.10)" },
  medium: { label: "Medium", color: "#FC7300", bg: "rgba(252,115,0,0.10)" },
  low:    { label: "Low",    color: "#6B7280", bg: "rgba(107,114,128,0.10)" },
};

const FEED_AUDIENCES = {
  all:        { label: "Everyone",     iconName: "Users" },
  sales:      { label: "Sales Team",   iconName: "Briefcase" },
  admission:  { label: "Admissions",   iconName: "GraduationCap" },
  leadership: { label: "Leadership",   iconName: "Star" },
};

const REACTION_TYPES = [
  { id: "like",       label: "Like",       iconName: "ThumbsUp" },
  { id: "insightful", label: "Insightful", iconName: "Lightbulb" },
  { id: "celebrate",  label: "Celebrate",  iconName: "PartyPopper" },
];

// "Feeling/activity" presets (Facebook-style)
const FEELINGS = [
  { id: "excited",     label: "excited",     emoji: "🤩" },
  { id: "happy",       label: "happy",       emoji: "😊" },
  { id: "proud",       label: "proud",       emoji: "🥳" },
  { id: "grateful",    label: "grateful",    emoji: "🙏" },
  { id: "celebrating", label: "celebrating", emoji: "🎉" },
  { id: "motivated",   label: "motivated",   emoji: "💪" },
  { id: "thoughtful",  label: "thoughtful",  emoji: "🤔" },
  { id: "focused",     label: "focused",     emoji: "🎯" },
];

// Sample photo placeholders (no real upload — just colored "thumbnails")
const SAMPLE_PHOTO_LIBRARY = [
  { id: "ph-1", label: "Office",        color: "#0A6E6F" },
  { id: "ph-2", label: "Team",          color: "#FC7300" },
  { id: "ph-3", label: "Award",         color: "#E9445A" },
  { id: "ph-4", label: "University",    color: "#7C3AED" },
  { id: "ph-5", label: "Event",         color: "#0EA5E9" },
  { id: "ph-6", label: "Whiteboard",    color: "#10B981" },
];

/* ═══════════════════════════════════════════════════════════════
   PROMOTIONAL CARDS — sidebar marketing cards in the news feed.
   Each card represents an active campaign / commission / event
   that team members can take advantage of. Visually distinct
   from feed posts (denser, more colorful, marketing-style).
   ═══════════════════════════════════════════════════════════════ */
// Shared secondary-color palette for all promo cards — uses brand secondary `#FC7300`.
// Provides cohesive look across the rail without each card picking its own accent.
const PROMO_PALETTE = {
  accent:       "#FC7300", // brand secondary (full)
  gradientFrom: "#E35D00", // slightly deeper for gradient depth
  gradientTo:   "#FC7300", // brand secondary
};

/* ═══════════════════════════════════════════════════════════════
   PROMOTIONAL COMMISSIONS — System Admin managed
   These come from the System Admin's "Commission > Promotional Commission List"
   page (separate admin tool). For the in-app demo, we seed with realistic data
   sourced from the production system, and System Admin can add/edit/delete in-app.
   ═══════════════════════════════════════════════════════════════ */

// Universities the admin can pick from when creating a commission
const COMMISSION_UNIVERSITIES = [
  "Anglia Ruskin University, London _ ARUL",
  "Anglia Ruskin University College _ ARUC",
  "Birmingham City University",
  "Brunel University London",
  "De Montfort University International College",
  "De Montfort University",
  "London Metropolitan University (Main Campus) _ LMET",
  "London South Bank University",
  "University of Suffolk - LSC Study Center",
  "University of Sunderland in London",
  "University of the West of Scotland London (UWS)",
  "University of Cumbria in London",
  "University of Greater Manchester _ UGM",
  "University of Central Lancashire, London _ UCLan",
  "University of Wales Trinity Saint David (TSD)",
  "Canterbury Christ Church University - LSC Study Center",
  "London College of Contemporary Music (LCCM)",
  "London College of Contemporary Arts (LCCA)",
  "Regent College London _ RCL",
  "Bloomsbury Institute London _ BIL",
  "Forfront School of Business _ FSB",
  "Arden University",
  "Solent University QA Study Centre",
];

// Intake periods the admin can pick from
const COMMISSION_INTAKES = [
  "July 2024-October 2024",
  "November 2024-February 2025",
  "March 2025-June 2025",
  "July 2025-October 2025",
  "November 2025-February 2026",
  "March 2026-June 2026",
  "July 2026-October 2026",
  "November 2026-February 2027",
];

// Consultant groups the admin can target
const COMMISSION_GROUPS = [
  "UK Freelance Consultant",
  "UK Sales Team-2 Working Days",
  "UK Sales Team-3 Working Days",
  "Contractual for 2 Working Days-IEE",
  "Test Group",
  "Contractual for 10 hours",
  "DICKSON",
  "Contractual for 1 Working Day",
  "NG Freelance Consultant",
];

// Initial commission seed — modelled on the PDF examples
const INITIAL_PROMOTIONAL_COMMISSIONS = [
  {
    id: "comm-1",
    university: "London Metropolitan University (Main Campus) _ LMET",
    minimumStudents: 5,
    startFrom: "2026-02-28",
    accountIntake: "July 2026-October 2026",
    commissionAmount: 700,
    commissionGroup: "UK Freelance Consultant",
    createdBy: "u-shamim",
    createdAt: "2026-04-22T10:00:00Z",
    status: "active",
  },
  {
    id: "comm-2",
    university: "London South Bank University",
    minimumStudents: 2,
    startFrom: "2026-04-11",
    accountIntake: "July 2026-October 2026",
    commissionAmount: 1000,
    commissionGroup: "NG Freelance Consultant",
    createdBy: "u-shamim",
    createdAt: "2026-04-25T14:30:00Z",
    status: "active",
  },
  {
    id: "comm-3",
    university: "University of Suffolk - LSC Study Center",
    minimumStudents: 3,
    startFrom: "2026-05-05",
    accountIntake: "November 2026-February 2027",
    commissionAmount: 1500,
    commissionGroup: "UK Freelance Consultant",
    createdBy: "u-shamim",
    createdAt: "2026-04-28T09:15:00Z",
    status: "active",
  },
];

/* ═══════════════════════════════════════════════════════════════
   NEW UNIVERSITIES — surfaced on rail card #2 (recently added by System Admin)
   In production: pulled from Universities table, sorted by createdAt desc.
   Recruitment Type per PDF: each uni has Home/UK, EU/EEU, International toggles.
   ═══════════════════════════════════════════════════════════════ */
const INITIAL_NEW_UNIVERSITIES = [
  {
    id: "uni-1",
    name: "Anglia Ruskin University, London",
    shortName: "ARUL",
    logoBg: "#003B71",      // brand-style swatch (used as logo placeholder)
    logoInitials: "AR",
    country: "UK (England)",
    type: "Public",
    branch: "London Office",
    recruitment: { homeUK: true, eu: true, international: true },
    addedAt: "2026-04-28T10:00:00Z",
  },
  {
    id: "uni-2",
    name: "Brunel University London",
    shortName: "BUL",
    logoBg: "#C8102E",
    logoInitials: "BU",
    country: "UK (England)",
    type: "Public",
    branch: "London Office",
    recruitment: { homeUK: true, eu: false, international: true },
    addedAt: "2026-04-25T14:30:00Z",
  },
  {
    id: "uni-3",
    name: "De Montfort University",
    shortName: "DMU",
    logoBg: "#7C2D8E",
    logoInitials: "DM",
    country: "UK (England)",
    type: "Public",
    branch: "London Office",
    recruitment: { homeUK: true, eu: true, international: true },
    addedAt: "2026-04-22T09:15:00Z",
  },
];

/* ═══════════════════════════════════════════════════════════════
   NEW COURSES — surfaced on rail card #3 (recently added programs)
   In production: pulled from Courses table where createdAt < 14 days.
   ═══════════════════════════════════════════════════════════════ */
const INITIAL_NEW_COURSES = [
  {
    id: "course-1",
    title: "BSc (Hons) International Business Management",
    universityShort: "ARUL",
    universityName: "Anglia Ruskin University, London",
    educationLevel: "Undergraduate",
    department: "Business",
    campus: "London",
    intake: "September 2026",
    addedAt: "2026-04-30T11:00:00Z",
  },
  {
    id: "course-2",
    title: "MSc Business with Financial Management",
    universityShort: "ARUL",
    universityName: "Anglia Ruskin University, London",
    educationLevel: "Postgraduate",
    department: "Business",
    campus: "London",
    intake: "September 2026",
    addedAt: "2026-04-29T16:20:00Z",
  },
  {
    id: "course-3",
    title: "BA (Hons) Architecture",
    universityShort: "DMU",
    universityName: "De Montfort University",
    educationLevel: "Undergraduate",
    department: "Architecture",
    campus: "London",
    intake: "September 2026",
    addedAt: "2026-04-26T13:45:00Z",
  },
];

/* ═══════════════════════════════════════════════════════════════
   EVENT (mock) — rail card #4. Single curated event at a time.
   ═══════════════════════════════════════════════════════════════ */
const MOCK_EVENT = {
  id: "event-1",
  title: "UAPP Annual Partner Summit 2026",
  subtitle: "Internal · London",
  date: "12 Jun 2026",
  time: "09:00 – 17:00",
  location: "QEII Centre, Westminster",
  spotsLeft: 18,
  totalSpots: 120,
};

/* ═══════════════════════════════════════════════════════════════
   COMM HUB PERMISSION MAP
   Declarative spec of all permissions across the four modules.
   Each module has:
     - moduleAccess: toggles whether the module's tab appears in the sub-nav
     - base: the "view" permission required for everything else in the module
     - granular: specific actions, each requiring the base
   ═══════════════════════════════════════════════════════════════ */
const COMM_HUB_PERMISSION_MAP = {
  chats: {
    label: "Chats",
    iconName: "MessagesSquare",
    description: "Direct messages and group conversations",
    accent: "#7C3AED",
    moduleAccess: { id: "chats:access", label: "Show Chats in sub-nav" },
    base: { id: "chats:view", label: "View chats", description: "Open and read chat conversations" },
    granular: [
      { id: "chats:send_dm",        label: "Send messages in DM",       description: "Send messages in direct conversations" },
      { id: "chats:send_group",     label: "Send messages in groups",   description: "Send messages in group chats" },
      { id: "chats:create_dm",      label: "Create new DM",             description: "Start a new direct conversation" },
      { id: "chats:create_group",   label: "Create group chat",         description: "Create a new group conversation" },
      { id: "chats:manage_members", label: "Manage group members",      description: "Add or remove members from groups" },
      { id: "chats:pin",            label: "Pin chats to top",          description: "Pin important chats to the top of the list" },
      { id: "chats:archive",        label: "Archive chats",             description: "Move chats to the archive" },
      { id: "chats:delete",         label: "Delete chats",              description: "Remove chats from the list" },
      { id: "chats:share_post",     label: "Forward / share posts",     description: "Forward feed posts into chats" },
      { id: "chats:react",          label: "React to messages",         description: "Add emoji reactions to messages" },
    ],
  },
  bookings: {
    label: "Bookings",
    iconName: "CalendarDays",
    description: "Calendar and meeting management",
    accent: "#0EA5E9",
    moduleAccess: { id: "bookings:access", label: "Show Bookings in sub-nav" },
    base: { id: "bookings:view", label: "View calendar", description: "See bookings and upcoming meetings" },
    granular: [
      { id: "bookings:create_dm",    label: "Book 1-on-1 meeting",   description: "Schedule a meeting with another user" },
      { id: "bookings:create_group", label: "Create group meeting", description: "Schedule a meeting with multiple attendees" },
      { id: "bookings:respond",      label: "Accept / decline invites", description: "Respond to incoming meeting invitations" },
      { id: "bookings:cancel_own",   label: "Cancel own bookings",   description: "Cancel meetings you organised" },
      { id: "bookings:cancel_any",   label: "Cancel any booking",    description: "Admin override to cancel any meeting" },
    ],
  },
  feed: {
    label: "News Feed",
    iconName: "Newspaper",
    description: "Company-wide and team announcements",
    accent: "#16A34A",
    moduleAccess: { id: "feed:access", label: "Show News Feed in sub-nav" },
    base: { id: "feed:view", label: "View posts", description: "Read posts in the news feed" },
    granular: [
      { id: "feed:create",      label: "Create posts",             description: "Compose and publish new posts" },
      { id: "feed:templates",   label: "Use offer letter templates", description: "Use the admission templates wizard" },
      { id: "feed:pin",         label: "Pin posts",                description: "Pin important posts to the top of the feed" },
      { id: "feed:schedule",    label: "Schedule posts",           description: "Set posts to publish at a later time" },
      { id: "feed:must_ack",    label: "Acknowledge must-read",    description: "Mark must-read posts as acknowledged" },
      { id: "feed:react",       label: "React to posts",           description: "Add emoji reactions to posts" },
      { id: "feed:comment",     label: "Comment on posts",         description: "Reply to posts" },
      { id: "feed:bookmark",    label: "Bookmark posts",           description: "Save posts for later" },
      { id: "feed:share",       label: "Share posts to chat",      description: "Forward posts into chat conversations" },
      { id: "feed:delete_own",  label: "Delete own posts",         description: "Remove your own posts from the feed" },
      { id: "feed:delete_any",  label: "Delete any post",          description: "Moderation: remove any post from the feed" },
    ],
  },
  settings: {
    label: "Settings",
    iconName: "Settings",
    description: "Personal preferences and system configuration",
    accent: "#FC7300",
    moduleAccess: { id: "settings:access", label: "Show Settings in sub-nav" },
    base: { id: "settings:view", label: "View settings", description: "Access the settings panel" },
    granular: [
      { id: "settings:archive",          label: "View archived chats",   description: "Access the Archive tab" },
      { id: "settings:saved",            label: "View saved posts",      description: "Access the Saved Posts tab" },
      { id: "settings:appearance",       label: "Change appearance",     description: "Modify theme and display preferences" },
      { id: "settings:permissions_view", label: "View own permissions",  description: "See your own permission summary" },
      { id: "settings:permissions_manage", label: "Manage permissions",  description: "Configure permissions for all users (admin)" },
    ],
  },
};

// All permission IDs flattened (for quick "give all" assignments)
const ALL_PERMISSION_IDS = (() => {
  const ids = [];
  Object.values(COMM_HUB_PERMISSION_MAP).forEach(mod => {
    ids.push(mod.moduleAccess.id, mod.base.id);
    mod.granular.forEach(g => ids.push(g.id));
  });
  return ids;
})();

/* ═══════════════════════════════════════════════════════════════
   DEFAULT PERMISSION SETS — 4 built-in templates
   ═══════════════════════════════════════════════════════════════ */
const INITIAL_PERMISSION_SETS = [
  {
    id: "ps-full",
    name: "Full Access",
    description: "Complete access to all features",
    accent: "#16A34A",
    isBuiltIn: true,    // can't delete, name reflects identity
    permissions: [...ALL_PERMISSION_IDS],
  },
  {
    id: "ps-manager",
    name: "Manager Access",
    description: "Management level access",
    accent: "#0EA5E9",
    isBuiltIn: true,
    permissions: [
      // Chats: full
      "chats:access", "chats:view",
      "chats:send_dm", "chats:send_group", "chats:create_dm", "chats:create_group",
      "chats:manage_members", "chats:pin", "chats:archive", "chats:delete",
      "chats:share_post", "chats:react",
      // Bookings: can do anything except admin-override cancels
      "bookings:access", "bookings:view",
      "bookings:create_dm", "bookings:create_group", "bookings:respond", "bookings:cancel_own",
      // Feed: can post, pin, schedule, but not delete others' posts
      "feed:access", "feed:view",
      "feed:create", "feed:templates", "feed:pin", "feed:schedule",
      "feed:must_ack", "feed:react", "feed:comment", "feed:bookmark", "feed:share",
      "feed:delete_own",
      // Settings: everything except managing permissions
      "settings:access", "settings:view",
      "settings:archive", "settings:saved", "settings:appearance", "settings:permissions_view",
    ],
  },
  {
    id: "ps-leader",
    name: "Team Leader Access",
    description: "Team lead level access",
    accent: "#7C3AED",
    isBuiltIn: true,
    permissions: [
      "chats:access", "chats:view",
      "chats:send_dm", "chats:send_group", "chats:create_dm", "chats:create_group",
      "chats:manage_members", "chats:pin", "chats:archive",
      "chats:share_post", "chats:react",
      "bookings:access", "bookings:view",
      "bookings:create_dm", "bookings:create_group", "bookings:respond", "bookings:cancel_own",
      "feed:access", "feed:view",
      "feed:create", "feed:must_ack", "feed:react", "feed:comment", "feed:bookmark",
      "feed:share", "feed:delete_own",
      "settings:access", "settings:view",
      "settings:archive", "settings:saved", "settings:appearance", "settings:permissions_view",
    ],
  },
  {
    id: "ps-basic",
    name: "Basic Access",
    description: "Read-only access with limited actions",
    accent: "#FC7300",
    isBuiltIn: true,
    permissions: [
      "chats:access", "chats:view",
      "chats:send_dm", "chats:send_group", "chats:react",
      "bookings:access", "bookings:view",
      "bookings:respond",
      "feed:access", "feed:view",
      "feed:must_ack", "feed:react", "feed:comment", "feed:bookmark",
      "settings:access", "settings:view",
      "settings:permissions_view",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   USER TYPE → PERMISSION SET ASSIGNMENT
   Default mapping. Admin can change which set each role uses.
   Roles correspond to level + type combinations.
   ═══════════════════════════════════════════════════════════════ */
const USER_TYPE_DEFINITIONS = [
  { id: "ut-admin",     label: "System Admin",    description: "CEO / system administrator (level 1)",                accent: "#E9445A", iconName: "Shield"     },
  { id: "ut-bm",        label: "Branch Manager",  description: "Sales or Admission Branch Manager (level 2)",          accent: "#FC7300", iconName: "Briefcase"  },
  { id: "ut-mgr",       label: "Manager",         description: "Sales Manager / Global Admission Manager (level 3-4)", accent: "#0EA5E9", iconName: "Users"      },
  { id: "ut-leader",    label: "Team Leader",     description: "Sales Team Leader (level 4)",                          accent: "#7C3AED", iconName: "GitBranch"  },
  { id: "ut-officer",   label: "Officer / Consultant", description: "Consultant or Admission Officer (level 5)",       accent: "#16A34A", iconName: "User"       },
];

const INITIAL_TYPE_ASSIGNMENTS = {
  "ut-admin":   "ps-full",
  "ut-bm":      "ps-manager",
  "ut-mgr":     "ps-manager",
  "ut-leader":  "ps-leader",
  "ut-officer": "ps-basic",
};

/* ═══════════════════════════════════════════════════════════════
   APPLICATIONS — mock dataset for the @APP mention flow.
   Each record gives the variables that templates can resolve.
   In production this is the same row you see when clicking an APP ID
   in the production "Applications" page.
   ═══════════════════════════════════════════════════════════════ */
const APPLICATIONS = [
  {
    id: "APP117452",
    uappId: "STD23307",
    studentName: "Carolina Moraru",
    universityName: "University of Suffolk - LSC Study Center",
    courseName: "Cert HE in Business Studies with Foundation Year (CertHEF)",
    intake: "June 2026",
    status: "New Application",
    managerId: "u-raj",            // resolves to Raj Ahmed (Admission Manager)
    consultantId: "u-andreea",     // resolves to Andreea Pop (Sales Manager)
    statusColor: "#0EA5E9",
  },
  {
    id: "APP117453",
    uappId: "STD23308",
    studentName: "Aisha Khatun",
    universityName: "Wrexham University",
    courseName: "BSc (Hons) International Business Management",
    intake: "September 2026",
    status: "Conditional Offer Letter",
    managerId: "u-raj",
    consultantId: "u-tousif",
    statusColor: "#FC7300",
  },
  {
    id: "APP117454",
    uappId: "STD23309",
    studentName: "Mahmud Hasan",
    universityName: "London Metropolitan University (Main Campus) _ LMET",
    courseName: "MSc Business with Financial Management",
    intake: "September 2026",
    status: "Unconditional Offer Letter",
    managerId: "u-nur",
    consultantId: "u-mihadul",
    statusColor: "#16A34A",
  },
  {
    id: "APP117455",
    uappId: "STD23310",
    studentName: "Priya Sharma",
    universityName: "De Montfort University",
    courseName: "BA (Hons) Architecture",
    intake: "September 2026",
    status: "Submitted to University",
    managerId: "u-nur",
    consultantId: "u-asad",
    statusColor: "#7C3AED",
  },
  {
    id: "APP117456",
    uappId: "STD23311",
    studentName: "Tahmid Rahman",
    universityName: "Anglia Ruskin University, London _ ARUL",
    courseName: "BA (Hons) Business Management",
    intake: "September 2026",
    status: "Unconditional Offer Letter",
    managerId: "u-raj",
    consultantId: "u-andreea",
    statusColor: "#16A34A",
  },
  {
    id: "APP117457",
    uappId: "STD23312",
    studentName: "Noor Begum",
    universityName: "Brunel University London",
    courseName: "MSc Data Science",
    intake: "January 2027",
    status: "New Application",
    managerId: "u-nur",
    consultantId: "u-tousif",
    statusColor: "#0EA5E9",
  },
  {
    id: "APP117458",
    uappId: "STD23313",
    studentName: "Rashed Khan",
    universityName: "University of Greater Manchester _ UGM",
    courseName: "MA International Business",
    intake: "September 2026",
    status: "Application Cancelled",
    managerId: "u-raj",
    consultantId: "u-mihadul",
    statusColor: "#7C8E8E",
  },
  {
    id: "APP117459",
    uappId: "STD23314",
    studentName: "Sumaya Ahmed",
    universityName: "London South Bank University",
    courseName: "BSc (Hons) Computer Science",
    intake: "September 2026",
    status: "Conditional Offer Letter",
    managerId: "u-nur",
    consultantId: "u-asad",
    statusColor: "#FC7300",
  },
];

/* ═══════════════════════════════════════════════════════════════
   MESSAGE TEMPLATES — grouped by topic.
   Placeholders like {{student}}, {{consultant}}, {{university}},
   {{course}}, {{intake}}, {{manager}} resolve from the picked APP record
   plus the current user (= manager).
   ═══════════════════════════════════════════════════════════════ */
const MESSAGE_TOPICS = [
  {
    id: "uncond-offer",
    label: "Unconditional Offer Letter",
    icon: "🎉",
    accent: "#16A34A",      // success green for uncond — happiest update
    description: "Notify consultant about unconditional offer & next steps",
    templates: [
      {
        id: "uncond-1",
        title: "Friendly with emojis",
        preview: "Dear {{consultant}}, {{student}} got UNCONDITIONAL OFFER from {{university}}!! Congrats…",
        body:
`Dear {{consultant}},

{{student}} got UNCONDITIONAL OFFER from {{university}}!!
Congrats 🎉🎉🥳🥳 Please ask the student to accept the offer and apply for student finance now!

Kind regards,
{{manager}}`,
      },
      {
        id: "uncond-2",
        title: "Polite formal",
        preview: "Dear {{consultant}}, Congratulations! {{student}} received an Unconditional Offer from…",
        body:
`Dear {{consultant}},

Congratulations! {{student}} received an Unconditional Offer from {{university}}. Please advise the student to accept the offer and apply for Student Finance.

Many thanks,
{{manager}}`,
      },
      {
        id: "uncond-3",
        title: "Short with signature",
        preview: "Dear {{consultant}}, Congratulations! 🎉 {{student}} received Unconditional offer…",
        body:
`Dear {{consultant}},

Congratulations! 🎉
{{student}} received Unconditional offer from {{university}}.
Thank you.

{{manager}}
Admission Manager
UAPP`,
      },
    ],
  },
  {
    id: "cond-offer",
    label: "Conditional Offer Letter",
    icon: "📄",
    accent: "#FC7300",
    description: "Conditional offer received — next steps for the consultant",
    templates: [
      {
        id: "cond-1",
        title: "Standard with conditions reminder",
        preview: "Dear {{consultant}}, {{student}} has received a Conditional Offer from {{university}}…",
        body:
`Dear {{consultant}},

{{student}} has received a Conditional Offer from {{university}} for {{course}} ({{intake}} intake). Please share the conditions list with the student and arrange a follow-up meeting to plan how each will be met.

Kind regards,
{{manager}}`,
      },
      {
        id: "cond-2",
        title: "Quick update",
        preview: "Hi {{consultant}}, Conditional Offer received for {{student}}…",
        body:
`Hi {{consultant}},

Conditional Offer received for {{student}} — {{course}} at {{university}}, {{intake}} intake. Conditions document attached on the application; please walk the student through it.

Thanks,
{{manager}}`,
      },
    ],
  },
  {
    id: "submitted",
    label: "Application Submitted",
    icon: "📤",
    accent: "#7C3AED",
    description: "Application has been submitted to the university",
    templates: [
      {
        id: "subm-1",
        title: "Submission confirmation",
        preview: "Dear {{consultant}}, {{student}}'s application for {{course}} has been submitted…",
        body:
`Dear {{consultant}},

{{student}}'s application for {{course}} at {{university}} ({{intake}} intake) has now been submitted to the university. We'll keep you updated as the decision progresses.

Kind regards,
{{manager}}`,
      },
    ],
  },
  {
    id: "missing-docs",
    label: "Missing Documents",
    icon: "📎",
    accent: "#E9445A",
    description: "Request missing documents from the consultant",
    templates: [
      {
        id: "miss-1",
        title: "Document request",
        preview: "Dear {{consultant}}, Please share the missing documents for {{student}}…",
        body:
`Dear {{consultant}},

Please share the missing documents for {{student}}'s application to {{university}} ({{course}}, {{intake}} intake) at your earliest convenience. Without these we will not be able to submit on time.

Thanks,
{{manager}}`,
      },
    ],
  },
];


const INITIAL_FEED_POSTS = [
  // ─── Pinned + Urgent: Application deadline (admission) ───
  {
    id: "post-1",
    type: "deadline",
    category: "deadline",
    priority: "high",
    pinned: true,
    mustAcknowledge: true,
    author: "u-raj",
    audience: "all",
    timestamp: "2h",
    fullTimestamp: "2 hours ago",
    title: "June intake deadline approaching",
    body: "Application deadline: June intake — 22/05/2026.\n\nApplications also open for September 2026 intake. Business and Health courses will open for September once the May and June intake is full. Please prioritise pending June applications today.",
    deadlineDate: "2026-05-22",
    intake: "June 2026",
    daysLeft: 21,
    tagged: ["u-mihadul", "u-tousif", "u-andreea", "u-laura"],
    reactions: { like: ["u-md-shamim", "u-andreea", "u-laura"], insightful: ["u-mihadul"] },
    comments: [
      { id: "c-1", author: "u-mihadul", text: "Will push my June applications before end of day.", time: "1h" },
      { id: "c-2", author: "u-tousif", text: "Same, I have 3 left to submit.", time: "45m" },
    ],
    seenBy: ["u-raj", "u-md-shamim", "u-andreea", "u-mihadul", "u-tousif", "u-jennifer"],
    acknowledgedBy: ["u-andreea", "u-mihadul"],
  },

  // ─── Admission Update with structured template ───
  {
    id: "post-2",
    type: "admission_update",
    category: "admission",
    priority: "high",
    pinned: false,
    mustAcknowledge: false,
    author: "u-nur",
    audience: "sales",
    timestamp: "5h",
    fullTimestamp: "5 hours ago",
    structured: {
      studentName: "Narcis-Daniel Olteanu",
      university: "University of Wolverhampton (UKMC)",
      uniCode: "UWLV",
      uniColor: "#A8093C",
      offerType: "Unconditional Offer",
      assignedTo: "u-andreea",
      actionRequired: "Advise the student to check their email and accept the offer as soon as it arrives.",
    },
    body: "Dear Andreea,\n\nCongratulations! Mr. Narcis-Daniel Olteanu will receive an Unconditional Offer from the University of Wolverhampton (UKMC). Please advise the student to check their email regularly and accept the offer as soon as they receive it. The university will contact the student regarding compliance checks, and they must respond promptly. If any issues arise, they can contact me directly.",
    reactions: { like: ["u-andreea", "u-md-shamim"], celebrate: ["u-andreea", "u-mihadul", "u-tousif", "u-laura"] },
    comments: [
      { id: "c-3", author: "u-andreea", text: "Reaching out to Narcis right now. Thanks Mr Nur!", time: "4h" },
    ],
    seenBy: ["u-nur", "u-andreea", "u-md-shamim", "u-mihadul", "u-tousif"],
    acknowledgedBy: [],
  },

  // ─── Sales promotion ───
  {
    id: "post-3",
    type: "promotion",
    category: "sales",
    priority: "medium",
    pinned: false,
    mustAcknowledge: false,
    author: "u-laura",
    audience: "sales",
    timestamp: "1d",
    fullTimestamp: "Yesterday at 2:30 PM",
    title: "Earn up to £1,500 per student — LSC deadline extended",
    body: "Dear team @all,\n\nWe still have a few days left to make the most of the LSC, as the deadline has been extended. Let's focus on submitting as many applications as possible to these universities, where you can earn up to £1,500 commission per student.",
    tagged: ["u-tousif", "u-mihadul", "u-asad", "u-riad", "u-andreea"],
    structured: {
      offers: [
        { campus: "TSD London Campus", threshold: "4 or more students", total: "£1,500", breakdown: "UNCO £100 + Commission £300 + Bonus £1,100" },
        { campus: "University of Suffolk — LSC", threshold: "2 or more students", total: "£1,500", breakdown: "UNCO £100 + Commission £300 + Bonus £1,100 (£300 paid upfront)" },
      ],
    },
    reactions: { like: ["u-md-shamim", "u-tousif", "u-mihadul", "u-asad", "u-riad"], celebrate: ["u-md-shamim", "u-tousif"] },
    comments: [],
    seenBy: ["u-laura", "u-md-shamim", "u-andreea", "u-tousif", "u-mihadul", "u-asad", "u-riad"],
    acknowledgedBy: [],
  },

  // ─── Intake opening (admission, structured) ───
  {
    id: "post-4",
    type: "deadline",
    category: "admission",
    priority: "medium",
    pinned: false,
    mustAcknowledge: false,
    author: "u-nur",
    audience: "all",
    timestamp: "1d",
    fullTimestamp: "Yesterday at 11:15 AM",
    title: "Admissions open for Sep/Oct 2026 intake",
    body: "Admissions are now open for September & October 2026 intakes.\n\nMSc International Management — Fully Online (October intake) is now accepting applications.\n\nPlease be advised that Regent does not accept online certificates or transcripts. Only original physical certificates and transcripts are accepted. All courses are blended. Daytime, Evening, Weekend, Evening & Weekend, Weekday & Weekend timetables are available.",
    intake: "Sep/Oct 2026",
    deadlineDate: "TBC",
    tagged: ["u-siam", "u-rakib", "u-nadia", "u-shamim"],
    reactions: { like: ["u-md-shamim", "u-jennifer"], insightful: ["u-andreea"] },
    comments: [],
    seenBy: ["u-nur", "u-md-shamim", "u-jennifer", "u-andreea"],
    acknowledgedBy: [],
  },

  // ─── Partnership update ───
  {
    id: "post-5",
    type: "partnership",
    category: "partnership",
    priority: "medium",
    pinned: false,
    mustAcknowledge: false,
    author: "u-jennifer",
    audience: "all",
    timestamp: "2d",
    fullTimestamp: "2 days ago",
    title: "New partnership — Bath Spa University London",
    body: "We're excited to announce a new partnership with Bath Spa University London. They are now accepting applications for the following pathway courses:\n\n• MA International Business Management\n• MSc Data Analytics\n• MA Global Marketing\n\nCommission structure and partner rates will be shared in a follow-up post this week.",
    reactions: { celebrate: ["u-md-shamim", "u-andreea", "u-laura", "u-tousif", "u-mihadul", "u-asad", "u-shamim"], like: ["u-raj", "u-nur"] },
    comments: [
      { id: "c-4", author: "u-md-shamim", text: "Great news, this opens up a lot of pathways for our pipeline.", time: "1d" },
    ],
    seenBy: ["u-jennifer", "u-md-shamim", "u-andreea", "u-shamim", "u-raj", "u-nur"],
    acknowledgedBy: [],
  },

  // ─── General announcement ───
  {
    id: "post-6",
    type: "text",
    category: "announcement",
    priority: "low",
    pinned: false,
    mustAcknowledge: false,
    author: "u-shamim",
    audience: "all",
    timestamp: "3d",
    fullTimestamp: "3 days ago",
    title: "Q2 all-hands — Friday 10am",
    body: "Quick reminder that we have our Q2 all-hands on Friday at 10am. We'll cover Q1 wins, the September intake roadmap, and our two new university partnerships. Please make every effort to attend live; recording will be shared after.",
    reactions: { like: ["u-md-shamim", "u-jennifer", "u-andreea", "u-laura", "u-mihadul"] },
    comments: [],
    seenBy: ["u-shamim", "u-md-shamim", "u-jennifer", "u-andreea", "u-laura", "u-mihadul"],
    acknowledgedBy: [],
  },

  // ─── Marketing: support a LinkedIn post (the user's example) ───
  {
    id: "post-7",
    type: "marketing",
    category: "marketing",
    priority: "medium",
    pinned: false,
    mustAcknowledge: false,
    author: "u-andreea",
    audience: "all",
    timestamp: "4h",
    fullTimestamp: "4 hours ago",
    body: "Hi everyone,\n\nI would really appreciate if we could all give our support to Shamim's post on LinkedIn. Please give it a like, a comment, and a re-share — it really helps our reach as a hiring company.\n\nThank you all!",
    tagged: ["u-shamim"],
    link: {
      platform: "linkedin",
      url: "https://www.linkedin.com/posts/m-shamim-970788155_uapp-is-hiring-we-are-looking-for-a-share-7455619641609121792-6WPv",
      authorName: "M Shamim",
      authorHeadline: "CEO at UAPP — University Application Pathway Partners",
      title: "UAPP is hiring — we are looking for a great team member to join us!",
      preview: "We are looking for a passionate Education Consultant to join our growing London team. If you love working with students and helping them find the right pathway to UK universities, this might be the role for you.\n\nApply via the link in the comments. Tag a friend who would be a great fit!",
      meta: "🔗 linkedin.com · M Shamim",
    },
    cta: {
      kind: "social",
      actions: [
        { id: "like",    label: "Like",    iconName: "ThumbsUp" },
        { id: "comment", label: "Comment", iconName: "MessageSquare" },
        { id: "share",   label: "Re-share", iconName: "Repeat2" },
      ],
    },
    reactions: { like: ["u-md-shamim", "u-laura", "u-mihadul", "u-tousif", "u-riad"], celebrate: ["u-md-shamim"] },
    comments: [
      { id: "c-7-1", author: "u-md-shamim", text: "Done — liked, commented, and re-shared. Let's get this in front of as many people as possible.", time: "3h" },
      { id: "c-7-2", author: "u-tousif", text: "Re-shared on my profile too. Tagging a couple of friends in admissions.", time: "2h" },
    ],
    seenBy: ["u-andreea", "u-shamim", "u-md-shamim", "u-laura", "u-mihadul", "u-tousif", "u-riad"],
    acknowledgedBy: [],
  },

  // ─── Marketing: social media engagement push ───
  {
    id: "post-8",
    type: "marketing",
    category: "marketing",
    priority: "medium",
    pinned: false,
    mustAcknowledge: false,
    author: "u-laura",
    audience: "sales",
    timestamp: "1d",
    fullTimestamp: "Yesterday",
    body: "Team @all — we just published our latest student success story video on LinkedIn featuring Aisha (our first BSc Health & Social Care offer this intake!).\n\nPlease engage with the post — likes, comments, and shares all help our organic reach. Tag any friends who might be interested in pathway courses.",
    link: {
      platform: "linkedin",
      url: "https://www.linkedin.com/feed/uapp-student-success-aisha",
      authorName: "UAPP — University Application Pathway Partners",
      authorHeadline: "Helping students find the right UK university pathway",
      title: "🎓 Aisha's Journey — From Application to Unconditional Offer in 6 weeks",
      preview: "We're so proud to share Aisha's story. From her first conversation with our admissions team to receiving her unconditional offer for BSc Health & Social Care, the journey took just 6 weeks. Watch her share what made the difference.",
      meta: "🎬 Video · 2:14 · linkedin.com/uapp",
    },
    cta: {
      kind: "social",
      actions: [
        { id: "like",    label: "Like",    iconName: "ThumbsUp" },
        { id: "comment", label: "Comment", iconName: "MessageSquare" },
        { id: "share",   label: "Re-share", iconName: "Repeat2" },
      ],
    },
    reactions: { like: ["u-md-shamim", "u-andreea", "u-tousif"], celebrate: ["u-md-shamim", "u-andreea", "u-mihadul", "u-asad"] },
    comments: [
      { id: "c-8-1", author: "u-mihadul", text: "Beautiful video! Just shared with my network.", time: "20h" },
    ],
    seenBy: ["u-laura", "u-md-shamim", "u-andreea", "u-tousif", "u-mihadul", "u-asad"],
    acknowledgedBy: [],
  },

  // ─── Marketing: content-template request (no external link) ───
  {
    id: "post-9",
    type: "marketing",
    category: "marketing",
    priority: "low",
    pinned: false,
    mustAcknowledge: false,
    author: "u-laura",
    audience: "sales",
    timestamp: "2d",
    fullTimestamp: "2 days ago",
    title: "Recruitment templates ready — please use on socials",
    body: "I've put together fresh templates you can use for recruitment posts on LinkedIn, Instagram and WhatsApp status. They're all in the brand colours and customisable. Pick your favourite and post during the week to keep our visibility high during this intake push.\n\nLet me know if you need anything tailored.",
    reactions: { like: ["u-md-shamim", "u-tousif", "u-mihadul", "u-asad"], insightful: ["u-andreea"] },
    comments: [],
    seenBy: ["u-laura", "u-md-shamim", "u-tousif", "u-mihadul", "u-asad", "u-andreea"],
    acknowledgedBy: [],
  },

  // ─── Sales: weekly performance ───
  {
    id: "post-10",
    type: "text",
    category: "sales",
    priority: "low",
    pinned: false,
    mustAcknowledge: false,
    author: "u-andreea",
    audience: "sales",
    timestamp: "2d",
    fullTimestamp: "2 days ago",
    title: "Weekly performance — strong start to May",
    body: "Quick weekly update: as a team we submitted 47 applications this week — up 18% on last week. Top performers were Tousif and Mihadul. Let's keep this momentum going into the second half of the month.\n\nIf any of you are blocked or need help on a specific application, ping me directly. The faster we unblock, the more we close.",
    reactions: { like: ["u-md-shamim", "u-tousif", "u-mihadul", "u-laura", "u-riad"], celebrate: ["u-md-shamim", "u-tousif"] },
    comments: [
      { id: "c-10-1", author: "u-tousif", text: "Cheers Andreea! Aiming higher this week.", time: "1d" },
    ],
    seenBy: ["u-andreea", "u-md-shamim", "u-tousif", "u-mihadul", "u-laura", "u-riad", "u-asad"],
    acknowledgedBy: [],
  },

  // ─── Admission: compliance reminder ───
  {
    id: "post-11",
    type: "text",
    category: "admission",
    priority: "medium",
    pinned: false,
    mustAcknowledge: true,
    author: "u-raj",
    audience: "admission",
    timestamp: "3d",
    fullTimestamp: "3 days ago",
    title: "Compliance reminder — original documents only",
    body: "Just a reminder for everyone in the admission team. As we approach the May intake closure, please make sure students are submitting original physical certificates and transcripts only. We've had three applications this week bounced back due to digital copies being sent in error.\n\nIf in doubt, double-check with the university representative before forwarding.",
    tagged: ["u-nur", "u-siam", "u-rakib", "u-nadia"],
    reactions: { like: ["u-nur", "u-siam", "u-rakib", "u-nadia"], insightful: ["u-jennifer"] },
    comments: [
      { id: "c-11-1", author: "u-nur", text: "Will brief the team in tomorrow's standup.", time: "2d" },
    ],
    seenBy: ["u-raj", "u-nur", "u-siam", "u-rakib", "u-nadia", "u-jennifer"],
    acknowledgedBy: ["u-nur", "u-siam"],
  },

  // ─── Partnership: course expansion ───
  {
    id: "post-12",
    type: "partnership",
    category: "partnership",
    priority: "low",
    pinned: false,
    mustAcknowledge: false,
    author: "u-jennifer",
    audience: "all",
    timestamp: "4d",
    fullTimestamp: "4 days ago",
    title: "Ulster University — new MBA pathways added",
    body: "Following our partnership review with Ulster University QA Study Centre, three new MBA pathway specialisations are now available:\n\n• MBA Global Business (existing — pricing unchanged)\n• MBA International Marketing (new — opens for September intake)\n• MBA Innovation & Entrepreneurship (new — opens for January 2027)\n\nPartner pack with brochures and commission rates is in the shared drive.",
    reactions: { like: ["u-shamim", "u-md-shamim", "u-andreea", "u-raj"], celebrate: ["u-md-shamim"] },
    comments: [],
    seenBy: ["u-jennifer", "u-shamim", "u-md-shamim", "u-andreea", "u-raj"],
    acknowledgedBy: [],
  },

  // ─── Admission: offer letter for another student ───
  {
    id: "post-13",
    type: "admission_update",
    category: "admission",
    priority: "medium",
    pinned: false,
    mustAcknowledge: false,
    author: "u-nur",
    audience: "sales",
    timestamp: "5d",
    fullTimestamp: "5 days ago",
    structured: {
      studentName: "Aisha Khatun",
      university: "Wrexham University",
      uniCode: "WREX",
      uniColor: "#B22234",
      offerType: "Conditional Offer",
      assignedTo: "u-tousif",
      actionRequired: "Student needs to complete the English proficiency requirement (IELTS 6.0 minimum) before offer becomes unconditional.",
    },
    body: "Dear Tousif,\n\nGreat news — Aisha Khatun has received a conditional offer from Wrexham University for BSc (Hons) Health & Social Care. Please support her with the IELTS requirement so we can move this to unconditional within the next 4 weeks.",
    reactions: { like: ["u-tousif", "u-md-shamim"], celebrate: ["u-tousif", "u-andreea", "u-laura"] },
    comments: [
      { id: "c-13-1", author: "u-tousif", text: "Brilliant! I'll book her IELTS prep session this week.", time: "4d" },
    ],
    seenBy: ["u-nur", "u-tousif", "u-md-shamim", "u-andreea", "u-laura"],
    acknowledgedBy: [],
  },

  // ─── General: Eid wishes / culture ───
  {
    id: "post-14",
    type: "text",
    category: "announcement",
    priority: "low",
    pinned: false,
    mustAcknowledge: false,
    author: "u-shamim",
    audience: "all",
    timestamp: "6d",
    fullTimestamp: "6 days ago",
    title: "Welcome to the team — three new joiners",
    body: "Please join me in welcoming three new team members who started this week:\n\n• Mohammed Roni — Admission Officer\n• Riaz Ahmed — Sales Consultant (Brick Lane branch)\n• Sara Hossain — Marketing Coordinator\n\nDo say hi when you get a chance and help them settle in. Looking forward to seeing what they bring to UAPP.",
    reactions: { like: ["u-md-shamim", "u-jennifer", "u-andreea", "u-raj", "u-nur", "u-laura", "u-mihadul"], celebrate: ["u-md-shamim", "u-jennifer", "u-laura", "u-andreea", "u-mihadul"] },
    comments: [
      { id: "c-14-1", author: "u-andreea", text: "Welcome to the team!", time: "5d" },
      { id: "c-14-2", author: "u-mihadul", text: "Welcome Roni, Riaz and Sara — excited to work with you!", time: "5d" },
    ],
    seenBy: ["u-shamim", "u-md-shamim", "u-jennifer", "u-andreea", "u-raj", "u-nur", "u-laura", "u-mihadul"],
    acknowledgedBy: [],
  },

  // ─── Sales: training session ───
  {
    id: "post-15",
    type: "text",
    category: "sales",
    priority: "low",
    pinned: false,
    mustAcknowledge: false,
    author: "u-md-shamim",
    audience: "sales",
    timestamp: "1w",
    fullTimestamp: "1 week ago",
    title: "Sales training — handling objections, this Thursday",
    body: "We're running an internal training session on objection handling — common student concerns about cost, intake timing, and visa pathway. This Thursday at 4pm in the London office (joining link will be shared for remote attendees).\n\nIf you have specific objections you've struggled with recently, drop them in the comments and I'll work them into the session.",
    reactions: { like: ["u-andreea", "u-laura", "u-tousif", "u-mihadul"], insightful: ["u-andreea", "u-tousif"] },
    comments: [
      { id: "c-15-1", author: "u-tousif", text: "Can we cover the 'I want to wait for January intake' objection? Hearing it a lot.", time: "6d" },
      { id: "c-15-2", author: "u-mihadul", text: "+1 on the January intake one. Also visa processing time concerns.", time: "6d" },
    ],
    seenBy: ["u-md-shamim", "u-andreea", "u-laura", "u-tousif", "u-mihadul", "u-riad"],
    acknowledgedBy: [],
  },

  // ─── Admission: monthly stats ───
  {
    id: "post-16",
    type: "text",
    category: "admission",
    priority: "low",
    pinned: false,
    mustAcknowledge: false,
    author: "u-jennifer",
    audience: "leadership",
    timestamp: "1w",
    fullTimestamp: "1 week ago",
    title: "April admission stats — full report",
    body: "April closed with strong numbers across the board:\n\n• 142 applications submitted (+22% MoM)\n• 89 unconditional offers issued\n• 31 conditional offers pending compliance\n• Top university: Regent College London (28 placements)\n\nFull report attached to the leadership shared drive. Would appreciate any thoughts ahead of the all-hands on Friday.",
    reactions: { like: ["u-shamim", "u-md-shamim", "u-andreea", "u-raj"], insightful: ["u-shamim", "u-md-shamim"] },
    comments: [],
    seenBy: ["u-jennifer", "u-shamim", "u-md-shamim", "u-andreea", "u-raj"],
    acknowledgedBy: [],
  },

  // ─── Pinned celebration: team member promotion ───
  {
    id: "post-17",
    type: "text",
    category: "announcement",
    priority: "medium",
    pinned: true,
    mustAcknowledge: false,
    author: "u-shamim",
    audience: "all",
    timestamp: "1h",
    fullTimestamp: "1 hour ago",
    title: "🎉 Congratulations Simona — promoted to Sales Team Leader",
    body: "Hello team,\n\nI'm really pleased to share some great news with you all.\n\nSimona, who has been working with us as a Consultant, has been promoted to Sales Team Leader.\n\nThis is a well-deserved achievement and a reflection of her hard work, dedication, and continuous effort to grow and contribute to the team.\n\nPlease join me in congratulating Simona on this milestone.\n\nWell done, Simona, and wishing you continued success in your new role!",
    reactions: {
      like:       ["u-md-shamim", "u-andreea", "u-raj", "u-jennifer", "u-laura", "u-tousif", "u-mihadul", "u-asad", "u-riad", "u-nur"],
      celebrate:  ["u-md-shamim", "u-andreea", "u-jennifer", "u-laura", "u-tousif", "u-mihadul", "u-asad", "u-riad", "u-raj", "u-nur", "u-siam", "u-rakib"],
      insightful: ["u-jennifer", "u-raj"],
    },
    comments: [
      { id: "c-17-1", author: "u-md-shamim", text: "Congratulations Simona! Very well-deserved — you've worked incredibly hard for this.", time: "55m" },
      { id: "c-17-2", author: "u-andreea", text: "So happy for you, Simona! Looking forward to working with you in the new role.", time: "48m" },
      { id: "c-17-3", author: "u-laura", text: "Massive congrats! 🎊 Well-earned.", time: "40m" },
      { id: "c-17-4", author: "u-tousif", text: "Congratulations Simona — great to see this growth!", time: "32m" },
      { id: "c-17-5", author: "u-mihadul", text: "Cheers Simona! 🎉", time: "25m" },
    ],
    seenBy: ["u-shamim", "u-md-shamim", "u-andreea", "u-jennifer", "u-laura", "u-tousif", "u-mihadul", "u-asad", "u-riad", "u-raj", "u-nur"],
    acknowledgedBy: [],
  },

  // ─── Pinned: System Admin rewards announcement (Feb 2026 top performers) ───
  {
    id: "post-18",
    type: "text",
    category: "announcement",
    priority: "medium",
    pinned: true,
    mustAcknowledge: false,
    author: "u-shamim",
    audience: "all",
    timestamp: "30m",
    fullTimestamp: "30 minutes ago",
    title: "🎉 Rewards Announcement — February 2026",
    body: "Dear Team,\n\nWe are pleased to recognise the colleagues who delivered outstanding results throughout February, demonstrating strong commitment, consistency, and focus.\n\nHere are our Top Performers for February 2026:\n\n🥇 1st Place — Viorica Teodorescu\n🥈 2nd Place — Oana Voinea\n🥉 3rd Place — Gabriela Cucuteanu\n\nCongratulations to all of you. Your dedication, professionalism, and daily effort continue to make a meaningful impact across the team. Achievements like these help set the standard for excellence and inspire everyone around you.\n\n🎖️ Your digital badges have already been issued.\n\nKind regards,\nUAPP Team 🎉",
    reactions: {
      like: [
        "u-md-shamim", "u-jennifer", "u-andreea", "u-raj", "u-nur",
        "u-laura", "u-tousif", "u-mihadul", "u-asad", "u-riad",
        "u-siam", "u-rakib",
      ],
      celebrate: [
        "u-md-shamim", "u-jennifer", "u-andreea", "u-raj", "u-nur",
        "u-laura", "u-tousif", "u-mihadul", "u-asad", "u-riad",
        "u-siam", "u-rakib", "u-nadia", "u-testa", "u-roni",
      ],
      insightful: ["u-jennifer", "u-md-shamim"],
    },
    comments: [
      { id: "c-18-1", author: "u-md-shamim", text: "Brilliant results — really proud of the team this month. Congratulations to Viorica, Oana and Gabriela! 🎉", time: "22m" },
      { id: "c-18-2", author: "u-andreea", text: "Huge congratulations to all three of you! Well-deserved.", time: "18m" },
      { id: "c-18-3", author: "u-laura", text: "Inspiring performance 👏 keep it up team!", time: "12m" },
      { id: "c-18-4", author: "u-jennifer", text: "Wonderful to see — congrats to our top three! 🥇🥈🥉", time: "8m" },
      { id: "c-18-5", author: "u-tousif", text: "Massive congrats! Looking forward to seeing more of this in March 💪", time: "4m" },
    ],
    seenBy: [
      "u-shamim", "u-md-shamim", "u-jennifer", "u-andreea", "u-raj", "u-nur",
      "u-laura", "u-tousif", "u-mihadul", "u-asad", "u-riad",
      "u-siam", "u-rakib", "u-nadia", "u-testa", "u-roni",
    ],
    acknowledgedBy: [],
  },

  // ═══════════════════════════════════════════════════════════
  // ADMISSION TEAM POSTS (audience: "admission")
  // These are only visible to admission dept + system admin.
  // ═══════════════════════════════════════════════════════════

  // ─── Offer update post (admission only) ───
  {
    id: "post-19",
    type: "admission_update",
    category: "offer",
    priority: "high",
    pinned: false,
    mustAcknowledge: false,
    author: "u-raj",
    audience: "admission",
    timestamp: "1h",
    fullTimestamp: "1 hour ago",
    title: "🎉 Unconditional Offer — Mahmud Hasan",
    body: "Dear team,\n\nMahmud Hasan (APP117454) has received an Unconditional Offer from London Metropolitan University for MSc Business with Financial Management, September 2026 intake.\n\nPlease ensure the student accepts the offer promptly and begins the Student Finance application. CAS letter will follow once acceptance is confirmed.\n\nKind regards,\nRaj Ahmed",
    tagged: ["u-mihadul", "u-nur"],
    structured: { assignedTo: "u-mihadul" },
    reactions: { celebrate: ["u-nur", "u-siam", "u-jennifer"], like: ["u-nadia", "u-rakib"] },
    comments: [
      { id: "c-19-1", author: "u-nur", text: "Brilliant news! I'll follow up with the CAS team today.", time: "45m" },
      { id: "c-19-2", author: "u-siam", text: "Student has been notified via email. Will call them this afternoon.", time: "30m" },
    ],
    seenBy: ["u-raj", "u-nur", "u-siam", "u-jennifer"],
    acknowledgedBy: [],
  },

  // ─── CAS letter processing batch ───
  {
    id: "post-20",
    type: "text",
    category: "admission",
    priority: "medium",
    pinned: false,
    mustAcknowledge: false,
    author: "u-nur",
    audience: "admission",
    timestamp: "3h",
    fullTimestamp: "3 hours ago",
    title: "CAS letter processing update — May batch",
    body: "Team update:\n\nWe have 14 CAS letters pending processing for the June 2026 intake. Priority is given to students who have already accepted their offers and completed compliance checks.\n\nCurrent status:\n• 6 CAS letters issued this week\n• 8 remaining (expected completion by 12 May)\n• 2 students still awaiting document verification\n\nIf you're managing any of the pending cases, please ensure all documents are uploaded to the portal by end of day Friday.",
    reactions: { like: ["u-raj", "u-jennifer"], insightful: ["u-siam"] },
    comments: [
      { id: "c-20-1", author: "u-rakib", text: "I have 3 of the pending ones — documents are being uploaded now.", time: "2h" },
    ],
    seenBy: ["u-nur", "u-raj", "u-jennifer", "u-rakib"],
    acknowledgedBy: [],
  },

  // ─── Intake planning ───
  {
    id: "post-21",
    type: "text",
    category: "admission",
    priority: "high",
    pinned: false,
    mustAcknowledge: true,
    author: "u-jennifer",
    audience: "admission",
    timestamp: "4h",
    fullTimestamp: "4 hours ago",
    title: "September 2026 intake — target allocation",
    body: "Dear Admission Team,\n\nPlease find below the September 2026 intake targets by university:\n\n• Anglia Ruskin University: 45 students\n• De Montfort University: 30 students\n• Brunel University London: 20 students\n• University of Suffolk: 25 students\n• London Metropolitan University: 35 students\n\nTotal target: 155 students\n\nEach admission officer should aim for a minimum of 12 processed applications per week from now until the deadline. Weekly check-ins will be held every Monday at 10 AM.\n\nPlease acknowledge this post.",
    reactions: { like: ["u-raj", "u-nur", "u-siam", "u-rakib", "u-nadia"] },
    comments: [
      { id: "c-21-1", author: "u-raj", text: "I'll coordinate with the sales team to align lead handovers with these targets.", time: "3h" },
      { id: "c-21-2", author: "u-nadia", text: "Acknowledged. I'll focus on ARU and DMU applications this week.", time: "2h" },
    ],
    seenBy: ["u-jennifer", "u-raj", "u-nur", "u-siam", "u-nadia", "u-rakib"],
    acknowledgedBy: ["u-raj", "u-nadia", "u-siam"],
  },

  // ─── Document verification deadline ───
  {
    id: "post-22",
    type: "deadline",
    category: "deadline",
    priority: "high",
    pinned: false,
    mustAcknowledge: false,
    author: "u-raj",
    audience: "admission",
    timestamp: "6h",
    fullTimestamp: "6 hours ago",
    title: "Urgent: 7 students with missing documents",
    body: "The following students have incomplete document submissions and their applications cannot proceed:\n\n1. Priya Sharma (APP117455) — missing IELTS certificate\n2. Noor Begum (APP117457) — missing financial statement\n3. Sumaya Ahmed (APP117459) — missing passport copy\n4. Plus 4 others (see portal for full list)\n\nPlease contact these students TODAY. Applications with missing documents beyond 10 May will be deprioritised from the June intake.\n\nDocument upload portal: portal.uapp.uk/documents",
    tagged: ["u-siam", "u-rakib", "u-nadia", "u-nur"],
    reactions: { like: ["u-nur", "u-siam"] },
    comments: [
      { id: "c-22-1", author: "u-siam", text: "Called Priya — she's sending the IELTS cert by email today.", time: "5h" },
      { id: "c-22-2", author: "u-rakib", text: "Noor's financial statement is with her sponsor. Expected tomorrow.", time: "4h" },
    ],
    seenBy: ["u-raj", "u-nur", "u-siam", "u-rakib"],
    acknowledgedBy: [],
  },

  // ─── Student compliance follow-up ───
  {
    id: "post-23",
    type: "text",
    category: "admission",
    priority: "medium",
    pinned: false,
    mustAcknowledge: false,
    author: "u-siam",
    audience: "admission",
    timestamp: "8h",
    fullTimestamp: "8 hours ago",
    title: "Compliance check completed — 12 students cleared",
    body: "Quick update: I've completed the compliance verification for 12 students this morning.\n\nAll documents verified and uploaded for:\n• 5 students at Anglia Ruskin University\n• 4 students at De Montfort University\n• 3 students at University of Suffolk\n\nThese are now ready for CAS letter issuance. Passing to Nur for processing.\n\nRemaining in my queue: 6 students (will complete by Thursday).",
    reactions: { like: ["u-nur", "u-raj", "u-jennifer"] },
    comments: [
      { id: "c-23-1", author: "u-nur", text: "Received — I'll start CAS processing for these 12 today. Great work Siam!", time: "7h" },
    ],
    seenBy: ["u-siam", "u-nur", "u-raj", "u-jennifer"],
    acknowledgedBy: [],
  },

  // ─── Another offer update ───
  {
    id: "post-24",
    type: "admission_update",
    category: "offer",
    priority: "medium",
    pinned: false,
    mustAcknowledge: false,
    author: "u-nur",
    audience: "admission",
    timestamp: "1d",
    fullTimestamp: "1 day ago",
    title: "🎉 Unconditional Offer — Tahmid Rahman",
    body: "Dear team,\n\nGreat news! Tahmid Rahman (APP117456) has received an Unconditional Offer from Anglia Ruskin University, London for BA (Hons) Business Management, September 2026 intake.\n\nThe consultant (Andreea) has been notified separately via a sales-team post. Please ensure we follow up on CAS processing.\n\nThank you,\nNur Mohammad\nAdmission Manager\nUAPP",
    tagged: ["u-rakib", "u-siam"],
    structured: { assignedTo: "u-rakib" },
    reactions: { celebrate: ["u-raj", "u-jennifer", "u-siam", "u-rakib"] },
    comments: [
      { id: "c-24-1", author: "u-jennifer", text: "Excellent! Another one for September. The team is doing brilliantly this month.", time: "20h" },
    ],
    seenBy: ["u-nur", "u-raj", "u-jennifer", "u-siam", "u-rakib"],
    acknowledgedBy: [],
  },

  // ─── Interview preparation guide ───
  {
    id: "post-25",
    type: "text",
    category: "admission",
    priority: "low",
    pinned: false,
    mustAcknowledge: false,
    author: "u-nadia",
    audience: "admission",
    timestamp: "1d",
    fullTimestamp: "1 day ago",
    title: "Interview prep guide — Brunel University",
    body: "Hi team,\n\nI've compiled an interview preparation guide for students applying to Brunel University London. This covers the most frequently asked questions and tips for video interviews.\n\nKey areas covered:\n• Motivation for choosing the course\n• Understanding of the UK education system\n• Career goals and post-study plans\n• English language confidence tips\n\nPlease share this with any students who have upcoming Brunel interviews. The guide is in the shared drive under Admission > Resources > Interview Guides.\n\nLet me know if you want me to create similar guides for other universities.",
    reactions: { like: ["u-raj", "u-siam", "u-rakib"], insightful: ["u-jennifer", "u-nur"] },
    comments: [
      { id: "c-25-1", author: "u-raj", text: "This is really helpful Nadia. Can you do one for DMU and ARU as well?", time: "18h" },
      { id: "c-25-2", author: "u-nadia", text: "Sure! I'll have the DMU one ready by Friday and ARU next week.", time: "16h" },
    ],
    seenBy: ["u-nadia", "u-raj", "u-jennifer", "u-nur", "u-siam", "u-rakib"],
    acknowledgedBy: [],
  },

  // ─── Missing documents follow-up ───
  {
    id: "post-26",
    type: "text",
    category: "admission",
    priority: "high",
    pinned: false,
    mustAcknowledge: false,
    author: "u-rakib",
    audience: "admission",
    timestamp: "2d",
    fullTimestamp: "2 days ago",
    title: "Document collection status — weekly report",
    body: "Weekly document collection report:\n\nTotal pending documents this week: 23\nCollected: 16\nOutstanding: 7\n\nBreakdown by urgency:\n• Critical (blocking CAS): 3 students\n• High (blocking submission): 2 students\n• Normal (can wait): 2 students\n\nI've sent reminder emails to all 7 outstanding students. Follow-up calls scheduled for tomorrow morning.\n\nIf anyone's managing these students directly, please nudge them as well.",
    reactions: { like: ["u-nur", "u-raj"] },
    comments: [
      { id: "c-26-1", author: "u-nur", text: "Good tracking. The 3 critical ones — can you share the student IDs so I can escalate with the universities?", time: "1d" },
    ],
    seenBy: ["u-rakib", "u-nur", "u-raj", "u-jennifer"],
    acknowledgedBy: [],
  },

  // ─── Admission team KPI update ───
  {
    id: "post-27",
    type: "text",
    category: "admission",
    priority: "medium",
    pinned: false,
    mustAcknowledge: false,
    author: "u-jennifer",
    audience: "admission",
    timestamp: "2d",
    fullTimestamp: "2 days ago",
    title: "📊 Admission team KPIs — Week 18 update",
    body: "Team,\n\nHere are our numbers for this week:\n\n✅ Applications processed: 28 (target: 25) — exceeded!\n✅ Offer letters received: 11 (8 unconditional, 3 conditional)\n✅ CAS letters issued: 6\n⚠️ Documents pending: 7 (down from 12 last week)\n❌ Application rejections: 2\n\nOverall we're tracking well against our September 2026 targets. Special mention to Md Siam for clearing 12 compliance checks in a single day.\n\nKeep up the excellent work. Monday check-in at 10 AM as usual.\n\nJennifer Aboje\nBranch Manager (Admission)",
    reactions: { like: ["u-raj", "u-nur", "u-siam", "u-rakib", "u-nadia"], celebrate: ["u-raj"] },
    comments: [
      { id: "c-27-1", author: "u-siam", text: "Thanks Jennifer! Targeting 15 compliance checks next week 💪", time: "1d" },
      { id: "c-27-2", author: "u-nur", text: "Great progress on the CAS pipeline. Let's aim for 10 next week.", time: "1d" },
    ],
    seenBy: ["u-jennifer", "u-raj", "u-nur", "u-siam", "u-rakib", "u-nadia"],
    acknowledgedBy: [],
  },

  // ═══════════════════════════════════════════════════════════
  // SALES TEAM POSTS (audience: "sales")
  // These are only visible to sales dept + system admin.
  // ═══════════════════════════════════════════════════════════

  // ─── Lead pipeline update ───
  {
    id: "post-28",
    type: "text",
    category: "sales",
    priority: "medium",
    pinned: false,
    mustAcknowledge: false,
    author: "u-andreea",
    audience: "sales",
    timestamp: "2h",
    fullTimestamp: "2 hours ago",
    title: "New leads this week — 34 qualified prospects",
    body: "Hi team,\n\nWe received 34 new qualified leads this week from our digital campaigns. Breakdown:\n\n• UK domestic students: 12\n• EU students: 8\n• International students: 14\n\nTop sources:\n• Facebook campaign (September intake): 15 leads\n• Google Ads: 11 leads\n• Referral program: 8 leads\n\nAll leads have been distributed in the CRM. Please contact your assigned leads within 24 hours — first-contact response time is our biggest conversion driver.\n\nLet me know if anyone needs support with follow-up scripts.",
    tagged: ["u-tousif", "u-mihadul", "u-asad", "u-riad"],
    reactions: { like: ["u-tousif", "u-mihadul", "u-riad", "u-md-shamim"] },
    comments: [
      { id: "c-28-1", author: "u-tousif", text: "Got my 5 leads — calling them now. The Facebook ones convert really well.", time: "1h" },
      { id: "c-28-2", author: "u-asad", text: "I have 4 international leads. Any specific university recommendations for them?", time: "45m" },
      { id: "c-28-3", author: "u-andreea", text: "Asad — for international leads, push ARU and DMU first. Highest commission rates this intake.", time: "30m" },
    ],
    seenBy: ["u-andreea", "u-tousif", "u-mihadul", "u-riad", "u-md-shamim", "u-asad"],
    acknowledgedBy: [],
  },

  // ─── Commission bonus tracking ───
  {
    id: "post-29",
    type: "text",
    category: "sales",
    priority: "high",
    pinned: false,
    mustAcknowledge: false,
    author: "u-md-shamim",
    audience: "sales",
    timestamp: "5h",
    fullTimestamp: "5 hours ago",
    title: "💰 Q2 Commission tracker — you're close to bonus!",
    body: "Team,\n\nQuick commission update for Q2 (April–June 2026):\n\nTop performers so far:\n🥇 Andreea — 18 conversions (£14,200 commission)\n🥈 Tousif — 14 conversions (£11,000 commission)\n🥉 Mihadul — 12 conversions (£9,600 commission)\n\nBonus thresholds:\n• 15+ conversions = £500 bonus\n• 20+ conversions = £1,000 bonus\n• 25+ conversions = £2,000 bonus\n\nAndreea is 2 away from the £1,000 bonus tier. Tousif is 1 away from the £500 tier. Push hard this month!\n\nFull breakdown in the commission portal.",
    tagged: ["u-andreea", "u-tousif", "u-mihadul"],
    reactions: { like: ["u-andreea", "u-tousif", "u-laura", "u-riad"], celebrate: ["u-tousif", "u-mihadul"] },
    comments: [
      { id: "c-29-1", author: "u-tousif", text: "One more conversion and I hit £500 bonus! Have 3 students in the pipeline this week.", time: "4h" },
      { id: "c-29-2", author: "u-andreea", text: "I'm going for the £2,000 tier. 7 more to go — challenge accepted! 💪", time: "3h" },
    ],
    seenBy: ["u-md-shamim", "u-andreea", "u-tousif", "u-mihadul", "u-laura", "u-riad", "u-asad"],
    acknowledgedBy: [],
  },

  // ─── Client meeting checklist ───
  {
    id: "post-30",
    type: "text",
    category: "sales",
    priority: "medium",
    pinned: false,
    mustAcknowledge: false,
    author: "u-laura",
    audience: "sales",
    timestamp: "1d",
    fullTimestamp: "1 day ago",
    title: "📋 Student meeting checklist — updated for September intake",
    body: "Hi everyone,\n\nI've updated the student meeting checklist for the September 2026 intake consultations. Please use this for all new student meetings:\n\n1. Verify student eligibility (Home/EU/International)\n2. Discuss course options — use the university comparison sheet\n3. Explain the application timeline (deadlines, expected response times)\n4. Collect initial documents (passport, transcripts, English proficiency)\n5. Discuss financial options (Student Finance, scholarships, payment plans)\n6. Set next follow-up date within 48 hours\n\nThe updated checklist PDF is in the shared drive: Sales > Resources > Meeting Checklists.\n\nUse it consistently — students who go through the full checklist convert at 3x the rate of those who don't.",
    tagged: ["u-tousif", "u-mihadul", "u-asad", "u-riad", "u-andreea"],
    reactions: { like: ["u-andreea", "u-tousif", "u-md-shamim"], insightful: ["u-mihadul", "u-riad"] },
    comments: [
      { id: "c-30-1", author: "u-md-shamim", text: "Great update Laura. I'll make sure all consultants use this from tomorrow.", time: "20h" },
    ],
    seenBy: ["u-laura", "u-andreea", "u-tousif", "u-md-shamim", "u-mihadul", "u-riad"],
    acknowledgedBy: [],
  },

  // ═══════════════════════════════════════════════════════════
  // CROSS-TEAM POST (audience: "all") by admission
  // ═══════════════════════════════════════════════════════════
  {
    id: "post-31",
    type: "text",
    category: "partnership",
    priority: "medium",
    pinned: false,
    mustAcknowledge: false,
    author: "u-jennifer",
    audience: "all",
    timestamp: "3d",
    fullTimestamp: "3 days ago",
    title: "🏫 University open day — Anglia Ruskin University, 15 May",
    body: "Dear all,\n\nAnglia Ruskin University (London campus) is hosting an open day on 15 May 2026, 10 AM – 3 PM.\n\nThis is open to both prospective students AND our team. I'd encourage at least 2 people from each department to attend — it's a great opportunity to see the campus, meet lecturers, and collect updated course materials.\n\nWhat's covered:\n• Campus tour and facilities walkthrough\n• Course presentations (Business, Computing, Health)\n• Q&A with admissions tutors\n• Networking lunch\n\nIf you'd like to attend, please reply to this post or message me directly. I need names by 12 May to register.\n\nJennifer Aboje\nBranch Manager (Admission)",
    tagged: ["u-andreea", "u-siam", "u-tousif", "u-md-shamim", "u-shamim"],
    reactions: { like: ["u-raj", "u-andreea", "u-tousif", "u-md-shamim", "u-nur"], insightful: ["u-laura"] },
    comments: [
      { id: "c-31-1", author: "u-andreea", text: "I'll attend from the sales side — would love to get updated course brochures.", time: "2d" },
      { id: "c-31-2", author: "u-siam", text: "Count me in from admission. I can collect the new prospectus.", time: "2d" },
      { id: "c-31-3", author: "u-tousif", text: "I'll join as well. Good chance to meet the tutors face to face.", time: "1d" },
    ],
    seenBy: ["u-jennifer", "u-raj", "u-andreea", "u-tousif", "u-md-shamim", "u-nur", "u-siam", "u-laura"],
    acknowledgedBy: [],
  },
];

/* ═══════════════════════════════════════════════════════════════
   SEEDED CONVERSATIONS — keyed by threadId(a, b)
   Each message has from / to / read so unread badges work
   correctly from BOTH sides of every conversation.
   ═══════════════════════════════════════════════════════════════ */
const INITIAL_MESSAGES = {
  // System Admin ↔ Asad (the long original conversation)
  [threadId("u-shamim", "u-asad")]: [
    { id: "m-asd-1", from: "u-asad",   to: "u-shamim", text: "ohho vai amake mouse cursor abar click kora lagteche", time: "10:04", read: true  },
    { id: "m-asd-2", from: "u-shamim", to: "u-asad",   text: "Calendar toggle issue Chat Notification issue Message field + icon needs to fix Mouse cursor need to fix after message Meeting no contacts found if no contact select then need to show proper message on time panel", time: "10:27", read: true },
    { id: "m-asd-3", from: "u-asad",   to: "u-shamim", text: "hello vai", time: "10:28", read: true },
    { id: "m-asd-4", from: "u-asad",   to: "u-shamim", text: "lots of work", time: "10:28", read: true },
    { id: "m-asd-5", from: "u-shamim", to: "u-asad",   text: "good", time: "10:28", read: true },
    { id: "m-asd-6", from: "u-asad",   to: "u-shamim", text: "hello", time: "10:28", read: true },
    { id: "m-asd-7", from: "u-shamim", to: "u-asad",   text: "Calendar toggle issue Chat Notification issue Message field + icon needs to fix Mouse cursor need to fix after message Meeting no contacts found if no contact select then need to show proper message on time panel sound issue, chat color need deeper", time: "10:28", read: false },
    { id: "m-asd-8", from: "u-shamim", to: "u-asad",   text: "hi", time: "10:55", read: false },
  ],

  // System Admin ↔ Mihadul
  [threadId("u-shamim", "u-mihadul")]: [
    { id: "m-mih-1", from: "u-shamim",  to: "u-mihadul", text: "Hi Mihadul, are we still on for the 3pm review call?", time: "10:55", read: true },
    { id: "m-mih-2", from: "u-mihadul", to: "u-shamim",  text: "Yes vai, just wrapping up another meeting", time: "11:02", read: true },
    { id: "m-mih-3", from: "u-mihadul", to: "u-shamim",  text: "Will join the call at 3", time: "11:08", read: false },
  ],

  // System Admin ↔ Md Siam (student writing to admin)
  [threadId("u-shamim", "u-siam")]: [
    { id: "m-siam-1", from: "u-siam", to: "u-shamim", text: "Hello sir", time: "10:28", read: false },
    { id: "m-siam-2", from: "u-siam", to: "u-shamim", text: "I want to ask about the application process", time: "10:30", read: false },
    { id: "m-siam-3", from: "u-siam", to: "u-shamim", text: "When is the deadline for September intake?", time: "10:32", read: false },
  ],

  // CONSULTANT ↔ STUDENT — the demo's headline thread
  [threadId("u-md-shamim", "u-siam")]: [
    { id: "m-mss-1", from: "u-siam",      to: "u-md-shamim", text: "Sir, can you help me with my application?", time: "Yesterday", read: true },
    { id: "m-mss-2", from: "u-md-shamim", to: "u-siam",      text: "Of course, share me your details", time: "Yesterday", read: true },
    { id: "m-mss-3", from: "u-siam",      to: "u-md-shamim", text: "I want to apply for September intake at UWS", time: "Yesterday", read: true },
    { id: "m-mss-4", from: "u-md-shamim", to: "u-siam",      text: "Got it. I will prepare the docs and let you know", time: "Yesterday", read: false },
  ],

  // Consultant ↔ Student
  [threadId("u-mihadul", "u-rakib")]: [
    { id: "m-mr-1", from: "u-mihadul", to: "u-rakib",   text: "Hey Rakib, your conditional offer is approved", time: "Wed 14:22", read: true },
    { id: "m-mr-2", from: "u-rakib",   to: "u-mihadul", text: "Thanks vai", time: "Wed 16:04", read: true },
  ],

  // Manager ↔ Consultant
  [threadId("u-raj", "u-mihadul")]: [
    { id: "m-rm-1", from: "u-mihadul", to: "u-raj",     text: "Hi Raj, can we sync about the September intake?", time: "Wed 09:12", read: true },
    { id: "m-rm-2", from: "u-raj",     to: "u-mihadul", text: "Sure, how about Friday at 11?", time: "Wed 09:30", read: true },
    { id: "m-rm-3", from: "u-mihadul", to: "u-raj",     text: "Friday 11 works", time: "Wed 09:35", read: true },
    { id: "m-rm-4", from: "u-raj",     to: "u-mihadul", text: "Meeting confirmed for Friday", time: "Wed 09:36", read: true },
  ],

  // Manager ↔ Student
  [threadId("u-raj", "u-nadia")]: [
    { id: "m-rn-1", from: "u-nadia", to: "u-raj", text: "Hi, I have a question about the application form", time: "12 Apr", read: true },
    { id: "m-rn-2", from: "u-nadia", to: "u-raj", text: "Section 3 is unclear, can you help?", time: "12 Apr", read: false },
  ],

  // Consultant ↔ Student
  [threadId("u-mihadul", "u-testa")]: [
    { id: "m-mt-1", from: "u-testa", to: "u-mihadul", text: "Hello sir, I need help with my application", time: "08:18", read: true  },
    { id: "m-mt-2", from: "u-testa", to: "u-mihadul", text: "Can we schedule a meeting?", time: "08:21", read: false },
  ],

  // Manager ↔ Manager
  [threadId("u-jennifer", "u-nur")]: [
    { id: "m-jn-1", from: "u-jennifer", to: "u-nur",      text: "Mr Nur, please review APP114797 when you get a moment", time: "Yesterday", read: true },
    { id: "m-jn-2", from: "u-nur",      to: "u-jennifer", text: "Looks good 👍", time: "Yesterday", read: true },
  ],

  // Consultant ↔ Student (welcome)
  [threadId("u-tousif", "u-roni")]: [
    { id: "m-tr-1", from: "u-roni",   to: "u-tousif", text: "Sir, just registered on the portal", time: "Yesterday", read: true },
    { id: "m-tr-2", from: "u-tousif", to: "u-roni",   text: "Welcome aboard!", time: "Yesterday", read: true },
  ],

  // Admin ↔ Riad
  [threadId("u-riad", "u-shamim")]: [
    { id: "m-rs-1", from: "u-shamim", to: "u-riad",   text: "Hi Riad, did you receive the conditional offer letter?", time: "10:42", read: true },
    { id: "m-rs-2", from: "u-riad",   to: "u-shamim", text: "Yes vai, just got it", time: "10:50", read: true },
    { id: "m-rs-3", from: "u-riad",   to: "u-shamim", text: "All the details check out", time: "10:52", read: true },
    { id: "m-rs-4", from: "u-riad",   to: "u-shamim", text: "Got the offer letter ✓ thanks for the help", time: "10:54", read: true },
  ],

  // Admin ↔ Tousif
  [threadId("u-shamim", "u-tousif")]: [
    { id: "m-st-1", from: "u-tousif", to: "u-shamim", text: "Bhai, can you share the latest application templates?", time: "08:55", read: true },
    { id: "m-st-2", from: "u-shamim", to: "u-tousif", text: "Sure, sending now", time: "09:14", read: true },
    { id: "m-st-3", from: "u-shamim", to: "u-tousif", text: "Sent the docs across", time: "09:18", read: true, reactions: { "🙏": ["u-tousif"] } },
  ],

  // Admin ↔ Md Shamim (sales team leader)
  [threadId("u-shamim", "u-md-shamim")]: [
    { id: "m-sms-1", from: "u-md-shamim", to: "u-shamim", text: "Bhai, weekly sales numbers are in", time: "08:30", read: true },
    { id: "m-sms-2", from: "u-md-shamim", to: "u-shamim", text: "47 active leads, 12 converted, 3 enrollments confirmed", time: "08:31", read: true, reactions: { "🎉": ["u-shamim"], "🔥": ["u-shamim"] } },
    { id: "m-sms-3", from: "u-shamim",    to: "u-md-shamim", text: "Excellent work. Bonus discussion in tomorrow's leadership.", time: "08:42", read: true },
    { id: "m-sms-4", from: "u-md-shamim", to: "u-shamim", text: "Thank you bhai 🙏", time: "08:44", read: true },
    { id: "m-sms-5", from: "u-md-shamim", to: "u-shamim", text: "Quick question — can we approve overtime for the September push?", time: "10:21", read: false },
    { id: "m-sms-6", from: "u-md-shamim", to: "u-shamim", text: "Need to know by tomorrow", time: "10:22", read: false },
  ],

  // Admin ↔ Andreea
  [threadId("u-shamim", "u-andreea")]: [
    { id: "m-sa-1", from: "u-shamim",  to: "u-andreea", text: "Andreea, the Bucharest event went really well 👏", time: "Yesterday", read: true },
    { id: "m-sa-2", from: "u-andreea", to: "u-shamim",  text: "Thank you! 24 new leads, mostly for Sept intake.", time: "Yesterday", read: true, reactions: { "🎯": ["u-shamim"] } },
    { id: "m-sa-3", from: "u-andreea", to: "u-shamim",  text: "I'll have the campaign brief for Marketing & Events ready by Wednesday.", time: "09:50", read: true },
    { id: "m-sa-4", from: "u-shamim",  to: "u-andreea", text: "Perfect.", time: "09:55", read: true },
  ],

  // Admin ↔ Jennifer
  [threadId("u-shamim", "u-jennifer")]: [
    { id: "m-sj-1", from: "u-jennifer", to: "u-shamim", text: "Sir, admission-side numbers ready for leadership review.", time: "Mon", read: true },
    { id: "m-sj-2", from: "u-shamim",   to: "u-jennifer", text: "Great. Let's review on the Friday call.", time: "Mon", read: true },
    { id: "m-sj-3", from: "u-jennifer", to: "u-shamim", text: "Also created a UK Visa & CAS Help group with the team.", time: "Thu 11:05", read: true, reactions: { "👍": ["u-shamim"] } },
    { id: "m-sj-4", from: "u-shamim",   to: "u-jennifer", text: "Smart move. Visa coordination has been getting messy.", time: "Thu 11:10", read: true },
  ],

  // Admin ↔ Raj
  [threadId("u-shamim", "u-raj")]: [
    { id: "m-sr-1", from: "u-raj",    to: "u-shamim", text: "Sir, CAS letter for Mahmud Hasan (APP117454) is confirmed", time: "Yesterday", read: true },
    { id: "m-sr-2", from: "u-shamim", to: "u-raj",    text: "Excellent work Raj 👍", time: "Yesterday", read: true, reactions: { "🙏": ["u-raj"] } },
    { id: "m-sr-3", from: "u-raj",    to: "u-shamim", text: "Working on 11 more this week, all September intake", time: "11:30", read: false },
  ],

  // ─── GROUP THREADS — keyed by group id, messages have readBy array ───
  "g-sales-team": [
    { id: "gm-s1", from: "u-md-shamim", text: "Welcome team! Let's coordinate Q2 targets here.", time: "Mon 09:00", readBy: ["u-md-shamim", "u-andreea", "u-laura", "u-tousif", "u-riad"], reactions: { "👍": ["u-andreea", "u-laura", "u-tousif"] } },
    { id: "gm-s2", from: "u-andreea",   text: "Sounds good. I'll share my pipeline today.", time: "Mon 09:15", readBy: ["u-andreea", "u-md-shamim", "u-laura"] },
    { id: "gm-s3", from: "u-laura",     text: "Will get my consultants' updates by EOD.", time: "Mon 09:18", readBy: ["u-laura", "u-md-shamim"] },
    { id: "gm-s4", from: "u-tousif",    text: "Got 2 new leads today, both for September intake.", time: "Tue 14:22", readBy: ["u-tousif"], reactions: { "🎉": ["u-md-shamim", "u-andreea"], "🔥": ["u-laura"] } },
    { id: "gm-s5-sys", type: "system", text: "Md Shamim added Mihadul Hasan", from: "system", time: "Wed 09:30", read: true },
    { id: "gm-s6", from: "u-mihadul",   text: "Hello team! Glad to be here 🙏", time: "Wed 09:32", readBy: ["u-mihadul", "u-md-shamim", "u-andreea"], reactions: { "👋": ["u-md-shamim", "u-andreea", "u-laura"] } },
    { id: "gm-s7", from: "u-mihadul",   text: "Closed the Riyadh deal 🎉", time: "10:42", readBy: ["u-mihadul"], reactions: { "🎉": ["u-md-shamim", "u-andreea", "u-laura", "u-tousif"], "🔥": ["u-md-shamim"] } },
    { id: "gm-s8", from: "u-andreea", text: "Amazing work Mihadul! How did you close it so fast?", time: "10:45", readBy: ["u-andreea"], replyTo: { id: "gm-s7", from: "u-mihadul", fromName: "Mihadul Hasan", text: "Closed the Riyadh deal 🎉" } },
  ],
  "g-admission-officers": [
    { id: "gm-a1", from: "u-nur",   text: "Reminder: please update lead statuses in the CRM by EOD.", time: "Mon 11:30", readBy: ["u-nur", "u-siam", "u-rakib", "u-nadia"], reactions: { "👍": ["u-siam", "u-rakib", "u-nadia"] } },
    { id: "gm-a2", from: "u-siam",  text: "Done", time: "Mon 16:45", readBy: ["u-siam", "u-nur"] },
    { id: "gm-a3", from: "u-rakib", text: "All updated 👍", time: "Mon 17:10", readBy: ["u-rakib", "u-nur"] },
    { id: "gm-a4-sys", type: "system", text: "Nur Mohammad made Raj an admin", from: "system", time: "Tue 08:00", read: true },
    { id: "gm-a5", from: "u-raj",   text: "Thanks for the trust 🙏 will help with daily ops", time: "Tue 08:14", readBy: ["u-raj", "u-nur", "u-siam"], reactions: { "❤️": ["u-nur"], "🎉": ["u-siam", "u-rakib"] } },
    { id: "gm-a6", from: "u-nadia", text: "Sir, can we meet briefly tomorrow?", time: "09:55", readBy: ["u-nadia"] },
  ],
  "g-leadership": [
    { id: "gm-l1", from: "u-shamim",    text: "Good morning. Let's align on Q2 priorities by Friday.", time: "Sun 19:20", readBy: ["u-shamim", "u-md-shamim", "u-jennifer", "u-andreea", "u-raj"], reactions: { "👍": ["u-md-shamim", "u-jennifer", "u-andreea", "u-raj"] } },
    { id: "gm-l2", from: "u-jennifer",  text: "On it. I'll prep admission-side numbers.", time: "Mon 08:42", readBy: ["u-jennifer", "u-shamim"] },
    { id: "gm-l3", from: "u-md-shamim", text: "Same on sales side. Will share by Wednesday.", time: "Mon 08:50", readBy: ["u-md-shamim", "u-shamim"], reactions: { "💪": ["u-shamim", "u-jennifer"] } },
    { id: "gm-l4", from: "u-andreea",   text: "Branch-level pipeline ready. Highlights:\n• 47 active leads\n• 12 conversions this month\n• 3 enrollments confirmed", time: "Mon 14:30", readBy: ["u-andreea", "u-shamim"], reactions: { "🎉": ["u-shamim", "u-md-shamim"], "👏": ["u-jennifer"] } },
    { id: "gm-l5", from: "u-shamim", text: "Outstanding numbers Andreea 🚀", time: "Mon 14:34", readBy: ["u-shamim"], replyTo: { id: "gm-l4", from: "u-andreea", fromName: "Andreea Cirjroi", text: "Branch-level pipeline ready. Highlights: • 47 active leads • 12 conver…" } },
  ],

  // ── New user-created groups ──
  "g-marketing": [
    { id: "gm-m1", from: "u-shamim", text: "Welcome to Marketing & Events. We need a strong September push.", time: "Tue 10:00", readBy: ["u-shamim", "u-andreea", "u-laura", "u-jennifer", "u-mihadul"], reactions: { "🚀": ["u-andreea", "u-laura"], "👍": ["u-jennifer"] } },
    { id: "gm-m2", from: "u-andreea", text: "Already on it. Drafting the campaign brief now.", time: "Tue 10:08", readBy: ["u-andreea", "u-shamim"] },
    { id: "gm-m3", from: "u-laura", text: "Could we run a webinar series for Sept intake students?", time: "Tue 11:25", readBy: ["u-laura", "u-shamim", "u-andreea"], reactions: { "💡": ["u-shamim", "u-andreea"], "❤️": ["u-jennifer"] } },
    { id: "gm-m4", from: "u-andreea", text: "Yes, three sessions: Course selection, Visa, Accommodation. I'll line up speakers.", time: "Tue 11:30", readBy: ["u-andreea"], replyTo: { id: "gm-m3", from: "u-laura", fromName: "Laura Marin", text: "Could we run a webinar series for Sept intake students?" } },
    { id: "gm-m5-sys", type: "system", text: "Shamim Rahman made Andreea Cirjroi an admin", from: "system", time: "Tue 14:00", read: true },
    { id: "gm-m6", from: "u-andreea", text: "Honoured 🙏 will keep things moving", time: "Tue 14:05", readBy: ["u-andreea"], reactions: { "🎉": ["u-shamim", "u-laura", "u-jennifer", "u-mihadul"] } },
    { id: "gm-m7", from: "u-jennifer", text: "Andreea, can you also coordinate with admission for the visa webinar?", time: "Wed 09:15", readBy: ["u-jennifer"] },
    { id: "gm-m8-sys", type: "system", text: "Shamim Rahman added Mihadul Hasan", from: "system", time: "Wed 11:30", read: true },
    { id: "gm-m9", from: "u-mihadul", text: "Hi all 👋 happy to help with social/content side", time: "Wed 11:34", readBy: ["u-mihadul"], reactions: { "👋": ["u-andreea", "u-laura"] } },
  ],

  "g-sept-intake-2026": [
    { id: "gm-si1", from: "u-md-shamim", text: "All-hands for September 2026 intake. Goal: 80 enrollments.", time: "Wed 09:00", readBy: ["u-md-shamim", "u-andreea", "u-tousif", "u-riad", "u-raj", "u-nur"], reactions: { "🎯": ["u-andreea", "u-raj"], "💪": ["u-tousif", "u-riad"] } },
    { id: "gm-si2", from: "u-andreea", text: "Sales side ready. We have 47 active prospects.", time: "Wed 09:12", readBy: ["u-andreea", "u-md-shamim"] },
    { id: "gm-si3", from: "u-raj", text: "Admission side: 23 in CAS pipeline, 11 with conditional offers.", time: "Wed 09:18", readBy: ["u-raj", "u-md-shamim", "u-andreea"], reactions: { "📊": ["u-md-shamim"] } },
    { id: "gm-si4-sys", type: "system", text: "Md Shamim made Raj an admin", from: "system", time: "Wed 09:30", read: true },
    { id: "gm-si5", from: "u-tousif", text: "Got 4 new students from the Bangladesh roadshow. Hot leads.", time: "Wed 15:42", readBy: ["u-tousif"], reactions: { "🔥": ["u-md-shamim", "u-andreea", "u-raj"], "🎉": ["u-riad"] } },
    { id: "gm-si6", from: "u-riad", text: "Same here, 3 from the Dubai event.", time: "Wed 16:00", readBy: ["u-riad", "u-tousif"] },
    { id: "gm-si7", from: "u-raj", text: "Tousif, can you share their docs to the admission portal so we can start processing?", time: "Wed 16:15", readBy: ["u-raj"], replyTo: { id: "gm-si5", from: "u-tousif", fromName: "Sadman Tousif", text: "Got 4 new students from the Bangladesh roadshow. Hot leads." } },
    { id: "gm-si8-sys", type: "system", text: "Md Shamim removed an inactive member", from: "system", time: "Thu 10:00", read: true },
    { id: "gm-si9", from: "u-md-shamim", text: "Cleaned up the group. Let's keep this for active SEP-26 ops only.", time: "Thu 10:01", readBy: ["u-md-shamim", "u-andreea", "u-raj"], reactions: { "👍": ["u-andreea", "u-raj", "u-tousif"] } },
  ],

  "g-uk-visa-help": [
    { id: "gm-uv1", from: "u-jennifer", text: "Created this group for visa & CAS coordination. Let's keep all visa questions here.", time: "Thu 11:00", readBy: ["u-jennifer", "u-raj", "u-nadia", "u-testa", "u-laura"], reactions: { "👍": ["u-raj", "u-nadia", "u-laura"] } },
    { id: "gm-uv2", from: "u-raj", text: "Latest UKVI update: priority service fees increased by £100. Effective May 1.", time: "Thu 11:30", readBy: ["u-raj", "u-jennifer"], reactions: { "📢": ["u-jennifer", "u-nadia"] } },
    { id: "gm-uv3", from: "u-laura", text: "One of my students got CAS rejected — too short of credit hours. How do we appeal?", time: "Fri 09:14", readBy: ["u-laura", "u-jennifer", "u-raj"] },
    { id: "gm-uv4", from: "u-jennifer", text: "Send me the case ID, I'll work with the uni admissions team. Usually we can resubmit with a credit recognition letter.", time: "Fri 09:18", readBy: ["u-jennifer"], replyTo: { id: "gm-uv3", from: "u-laura", fromName: "Laura Marin", text: "One of my students got CAS rejected — too short of credit hours. How do we appe…" } },
    { id: "gm-uv5", from: "u-laura", text: "Sending now, thanks Jennifer 🙏", time: "Fri 09:20", readBy: ["u-laura"], reactions: { "❤️": ["u-jennifer"] } },
    { id: "gm-uv6-sys", type: "system", text: "Jennifer added Nadia Sultana", from: "system", time: "Fri 14:00", read: true },
    { id: "gm-uv7", from: "u-nadia", text: "Hi everyone 👋 happy to help with visa documentation", time: "Fri 14:08", readBy: ["u-nadia"], reactions: { "👋": ["u-jennifer", "u-raj", "u-laura"] } },
  ],

  // ─── Archived DMs — seeded so the read-only archive view has demo content ───
  // Shamim ↔ Roni (admission staff, quiet contact, archived after onboarding)
  [threadId("u-shamim", "u-roni")]: [
    { id: "m-arc-roni-1", from: "u-roni",   to: "u-shamim", text: "Hi sir, just got confirmation my onboarding is complete. Thanks for the support 🙏", time: "Mon 09:14", read: true },
    { id: "m-arc-roni-2", from: "u-shamim", to: "u-roni",   text: "Welcome aboard Roni! Reach out any time if you need anything — Jennifer is your direct line for visa questions, Raj for general admissions.", time: "Mon 09:32", read: true },
    { id: "m-arc-roni-3", from: "u-roni",   to: "u-shamim", text: "Got it. Thank you 👍", time: "Mon 09:40", read: true },
    { id: "m-arc-roni-4", from: "u-roni",   to: "u-shamim", text: "Out of curiosity — do we have any internal docs about the CAS validation process? I want to read up before my first case.", time: "Tue 11:22", read: true },
    { id: "m-arc-roni-5", from: "u-shamim", to: "u-roni",   text: "Yes — there's a Notion doc, ask Jennifer for the link. She maintains it.", time: "Tue 11:38", read: true },
    { id: "m-arc-roni-6", from: "u-roni",   to: "u-shamim", text: "Will do, thanks again 🙏", time: "Tue 11:40", read: true },
  ],

  // Shamim ↔ Rakib (admission staff, legacy conversation about a closed application)
  [threadId("u-shamim", "u-rakib")]: [
    { id: "m-arc-rakib-1", from: "u-rakib",  to: "u-shamim", text: "Sir, the Bath Spa application for Tahmid Ahmed is fully processed. CAS issued.", time: "Wed 14:02", read: true },
    { id: "m-arc-rakib-2", from: "u-shamim", to: "u-rakib",  text: "Excellent. Did the commission come through? Andreea was tracking it.", time: "Wed 14:18", read: true },
    { id: "m-arc-rakib-3", from: "u-rakib",  to: "u-shamim", text: "Yes — £750 confirmed. Andreea logged it in the commission sheet yesterday.", time: "Wed 14:20", read: true },
    { id: "m-arc-rakib-4", from: "u-shamim", to: "u-rakib",  text: "Perfect. Closing this case file — well done.", time: "Wed 14:22", read: true, reactions: { "🎉": ["u-rakib"] } },
  ],

  // Shamim ↔ Testa (former admission staff, before role change)
  [threadId("u-shamim", "u-testa")]: [
    { id: "m-arc-testa-1", from: "u-testa",  to: "u-shamim", text: "Sir, I've moved to the new role from Monday. Just clearing my queue here.", time: "Fri 16:14", read: true },
    { id: "m-arc-testa-2", from: "u-shamim", to: "u-testa",  text: "Thanks for the heads up. Any open cases I should know about?", time: "Fri 16:20", read: true },
    { id: "m-arc-testa-3", from: "u-testa",  to: "u-shamim", text: "Two — both handed over to Raj. Notes are in the shared drive under /handover-march/.", time: "Fri 16:25", read: true },
    { id: "m-arc-testa-4", from: "u-shamim", to: "u-testa",  text: "Got it. Best of luck with the new role 👍", time: "Fri 16:27", read: true },
  ],

  // Archived APP GROUP (g-app-117452) — student enrolled, group archived after enrollment
  "g-app-117452": [
    { id: "gm-arc-app-1",  from: "u-md-shamim", text: "Welcome to the application group for Faisal Rahman — University of Liverpool MSc Data Science.", time: "Mar 2 09:00", readBy: ["u-md-shamim", "u-andreea", "u-jennifer"] },
    { id: "gm-arc-app-2",  from: "u-andreea",   text: "Documents look complete. Passport, transcripts, IELTS. Submitting today.", time: "Mar 2 11:14", readBy: ["u-andreea", "u-md-shamim", "u-jennifer"], reactions: { "👍": ["u-md-shamim"] } },
    { id: "gm-arc-app-3",  from: "u-jennifer",  text: "Submitted — UCAS reference is FR-2025-LIV-7841.", time: "Mar 3 10:02", readBy: ["u-jennifer", "u-md-shamim", "u-andreea"] },
    { id: "gm-arc-app-4",  from: "u-md-shamim", text: "Conditional offer received! Pending IELTS 6.5.", time: "Mar 12 09:30", readBy: ["u-md-shamim", "u-andreea", "u-jennifer"], reactions: { "🎉": ["u-andreea", "u-jennifer"] } },
    { id: "gm-arc-app-5",  from: "u-andreea",   text: "Faisal scored 7.0 overall, 6.5 in writing. Sending updated certificate to admissions.", time: "Apr 5 13:18", readBy: ["u-andreea", "u-md-shamim", "u-jennifer"] },
    { id: "gm-arc-app-6",  from: "u-jennifer",  text: "Unconditional offer issued. CAS application initiated.", time: "Apr 8 11:00", readBy: ["u-jennifer", "u-md-shamim", "u-andreea"], reactions: { "🎉": ["u-md-shamim", "u-andreea"] } },
    { id: "gm-arc-app-7",  from: "u-md-shamim", text: "CAS issued — ref CAS-2025-04-LIV-7841. Visa application next.", time: "Apr 14 10:22", readBy: ["u-md-shamim", "u-andreea", "u-jennifer"] },
    { id: "gm-arc-app-8",  from: "u-jennifer",  text: "Visa granted ✅ Faisal is enrolling in September. Closing this case.", time: "Apr 22 16:40", readBy: ["u-jennifer", "u-md-shamim", "u-andreea"], reactions: { "🎉": ["u-md-shamim", "u-andreea"], "❤️": ["u-md-shamim"] } },
    { id: "gm-arc-app-9-sys",  type: "system", text: "Application marked as ENROLLED — group archived", from: "system", time: "Apr 22 17:00", read: true },
  ],

  // Md Shamim ↔ Asad (archived after team change)
  [threadId("u-md-shamim", "u-asad")]: [
    { id: "m-arc-mas-1", from: "u-asad",      to: "u-md-shamim", text: "Bhai, just confirming my last day on this team is Friday.", time: "Mon 08:45", read: true },
    { id: "m-arc-mas-2", from: "u-md-shamim", to: "u-asad",      text: "Got it. I'll redistribute your active leads to Tousif and Riad. Thanks for everything 🙏", time: "Mon 09:02", read: true },
    { id: "m-arc-mas-3", from: "u-asad",      to: "u-md-shamim", text: "Appreciate that. Let me know if any handover docs are needed.", time: "Mon 09:05", read: true },
  ],

  // Andreea ↔ Laura (legacy 1:1 thread, now they talk in Sales group)
  [threadId("u-andreea", "u-laura")]: [
    { id: "m-arc-al-1", from: "u-laura",   to: "u-andreea", text: "Andreea, do you have the script for the Bath Spa partnership pitch?", time: "Tue 11:22", read: true },
    { id: "m-arc-al-2", from: "u-andreea", to: "u-laura",   text: "Yes — moved it to the shared drive. /scripts/bath-spa-pitch-v3.docx", time: "Tue 11:30", read: true },
    { id: "m-arc-al-3", from: "u-laura",   to: "u-andreea", text: "Found it, thanks 👍", time: "Tue 11:32", read: true },
  ],
};


/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_LABELS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const TIME_SLOTS = [
  "4:00 AM - 4:30 AM","4:30 AM - 5:00 AM","5:00 AM - 5:30 AM","5:30 AM - 6:00 AM",
  "6:00 AM - 6:30 AM","6:30 AM - 7:00 AM","7:00 AM - 7:30 AM","7:30 AM - 8:00 AM",
  "8:00 AM - 8:30 AM","8:30 AM - 9:00 AM","9:00 AM - 9:30 AM","9:30 AM - 10:00 AM",
  "10:00 AM - 10:30 AM","10:30 AM - 11:00 AM","11:00 AM - 11:30 AM","11:30 AM - 12:00 PM",
  "12:00 PM - 12:30 PM","12:30 PM - 1:00 PM","1:00 PM - 1:30 PM","1:30 PM - 2:00 PM",
];

function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function fmtDate(year, month, day) {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function prettyDate(year, month, day) {
  return `${MONTH_NAMES[month].slice(0,3)} ${day}, ${DAY_LABELS[new Date(year,month,day).getDay()]}`;
}

/* ═══════════════════════════════════════════════════════════════
   GROUP MEETING SCHEDULER — helpers
   Grid spans 8:00–20:00 in 30-min slots (24 rows).
   Working hours = 09:00–19:00 (slots 2..21).
   Outside those hours show grey "OOH" cells.
   ═══════════════════════════════════════════════════════════════ */
const GRID_HOUR_START = 8;
const GRID_SLOTS = 24; // 8:00 → 20:00 in 30-min steps
const WORK_SLOT_START = 2;
const WORK_SLOT_END   = 22;
const MEETING_TITLES = [
  "1:1 with Manager", "Team Standup", "Client Call", "Project Review",
  "Q2 Planning", "Demo Prep", "Interview Panel", "Lunch (busy)",
  "Office Hours", "Strategy Session", "Onboarding", "All-hands",
];

// Convert slot index → "HH:MM AM/PM" label
function slotLabel(slot) {
  const totalMins = GRID_HOUR_START * 60 + slot * 30;
  const h24 = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  const h12 = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24;
  const ampm = h24 < 12 ? "AM" : "PM";
  return `${String(h12).padStart(2," ")}:${String(m).padStart(2,"0")} ${ampm}`;
}

// Convert slot range → "10:00 – 10:30" label
function slotRangeLabel(startSlot, endSlot) {
  const startMins = GRID_HOUR_START * 60 + startSlot * 30;
  const endMins   = GRID_HOUR_START * 60 + (endSlot + 1) * 30;
  const fmt = (m) => {
    const h24 = Math.floor(m / 60), mm = m % 60;
    const h12 = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24;
    return `${h12}:${String(mm).padStart(2,"0")} ${h24 < 12 ? "AM" : "PM"}`;
  };
  return `${fmt(startMins)} – ${fmt(endMins)}`;
}

// Deterministic per-user calendar — same input always yields same blocks
function generateUserCalendar(userId) {
  let seed = 0;
  for (let i = 0; i < userId.length; i++) seed += userId.charCodeAt(i) * (i + 7);
  const rng = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };

  const slots = new Array(GRID_SLOTS).fill(null).map(() => ({ status: "available" }));
  // Mark out-of-hours cells
  for (let i = 0; i < WORK_SLOT_START; i++) slots[i] = { status: "ooh" };
  for (let i = WORK_SLOT_END; i < GRID_SLOTS; i++) slots[i] = { status: "ooh" };

  // Drop 2-4 busy/tentative blocks within working hours
  const numBlocks = 2 + Math.floor(rng() * 3);
  for (let b = 0; b < numBlocks; b++) {
    const start = WORK_SLOT_START + Math.floor(rng() * (WORK_SLOT_END - WORK_SLOT_START - 2));
    const len = 1 + Math.floor(rng() * 4);
    const tentative = rng() < 0.18;
    const title = MEETING_TITLES[Math.floor(rng() * MEETING_TITLES.length)];
    for (let i = start; i < Math.min(start + len, WORK_SLOT_END); i++) {
      // don't overwrite a stronger "busy" with "tentative"
      if (slots[i].status === "busy") continue;
      slots[i] = { status: tentative ? "tentative" : "busy", reason: title };
    }
  }
  return slots;
}

// Aggregate availability across a slot range for a set of participant IDs
function rollupAvailability(participantIds, calendars, startSlot, endSlot) {
  const available = [];
  const tentative = [];
  const busy = [];
  const ooh = [];
  for (const pid of participantIds) {
    const cal = calendars[pid];
    if (!cal) continue;
    let hasBusy = false, hasOoh = false, hasTentative = false, reason = "";
    for (let s = startSlot; s <= endSlot; s++) {
      const cell = cal[s];
      if (cell.status === "busy") { hasBusy = true; reason = cell.reason || "Busy"; }
      else if (cell.status === "ooh") { hasOoh = true; }
      else if (cell.status === "tentative") { hasTentative = true; if (!reason) reason = cell.reason || "Tentative"; }
    }
    if (hasBusy)        busy.push({ id: pid, reason });
    else if (hasOoh)    ooh.push({ id: pid });
    else if (hasTentative) tentative.push({ id: pid, reason });
    else                available.push({ id: pid });
  }
  return { available, tentative, busy, ooh };
}

// Find the top N non-overlapping windows of `durationSlots` length
// with the highest "available" headcount across participantIds.
function suggestTimeSlots(participantIds, calendars, durationSlots, topN = 4) {
  const candidates = [];
  for (let start = WORK_SLOT_START; start <= WORK_SLOT_END - durationSlots; start++) {
    const end = start + durationSlots - 1;
    const r = rollupAvailability(participantIds, calendars, start, end);
    candidates.push({
      startSlot: start,
      endSlot: end,
      available: r.available.length,
      tentative: r.tentative.length,
      busy: r.busy.length,
      ooh: r.ooh.length,
    });
  }
  // Best = most available, then fewest tentative, then earlier in day
  candidates.sort((a, b) =>
    b.available - a.available ||
    a.tentative - b.tentative ||
    a.startSlot - b.startSlot
  );
  // Pick top N with non-overlapping windows
  const picked = [];
  for (const c of candidates) {
    if (picked.length >= topN) break;
    const overlaps = picked.some(p => !(c.endSlot < p.startSlot || c.startSlot > p.endSlot));
    if (!overlaps) picked.push(c);
  }
  return picked;
}

/* ═══════════════════════════════════════════════════════════════
   SHARED ATOMS
   ═══════════════════════════════════════════════════════════════ */
function Avatar({ contact, size = 38 }) {
  const bg = contact.color || C.primary10;
  const dark = isDarkBg(bg);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize: size * 0.38,
      color: dark ? "#ffffff" : "#3a2a1a",
      flexShrink: 0, position: "relative",
      border: dark ? "none" : `1px solid rgba(0,0,0,0.06)`,
    }}>
      {contact.initials}
      {contact.online && (
        <span style={{
          position: "absolute", bottom: 0, right: 0,
          width: size * 0.28, height: size * 0.28,
          borderRadius: "50%", background: C.success,
          border: `2px solid #fff`,
        }} />
      )}
    </div>
  );
}

function Tooltip({ children, label, position = "top" }) {
  const [show, setShow] = useState(false);

  // Position-specific styles. Each side anchors the bubble away from the trigger.
  const posStyles = {
    top:    { bottom: "calc(100% + 8px)", left: "50%",                transform: "translateX(-50%)" },
    bottom: { top:    "calc(100% + 8px)", left: "50%",                transform: "translateX(-50%)" },
    right:  { left:   "calc(100% + 10px)", top: "50%",                transform: "translateY(-50%)" },
    left:   { right:  "calc(100% + 10px)", top: "50%",                transform: "translateY(-50%)" },
  };

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{ position: "relative", display: "inline-flex" }}
    >
      {children}
      {show && (
        <div style={{
          position: "absolute",
          ...posStyles[position],
          // Use C.text as bg + C.surface as text. Both flip with the theme,
          // so contrast is preserved in both light and dark mode:
          //   light: bg #0d1f1f (dark) on color #fff (white)  → readable
          //   dark : bg #E8EFEF (light) on color #152425 (dark) → readable
          background: C.text, color: C.surface,
          padding: "5px 10px", borderRadius: 6,
          fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
          zIndex: 1000, pointerEvents: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.28)",
        }}>{label}</div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TEAM MANAGEMENT MODULE — embedded from a separate project.
   Provides 4 tabs (Team / Users / Permissions / Settings) for managing the
   organizational hierarchy, user CRUD, and permission sets.
   Self-contained: uses its own internal mock data (defined just above).
   Rendered via TeamManagementApp under Settings.
   ═══════════════════════════════════════════════════════════════════════════ */

// ============== MOCK DATA ==============

// Mock current user - represents the logged-in user
const mockCurrentUser = {
  id: 999,
  name: 'System Admin',
  email: 'admin@uapp.com',
  role: 'System Admin',
  branch: 'London',
  initials: 'SA',
  color: '#045D5E',
  canManage: ['Branch Manager', 'Sales Manager', 'Sales Team Leader', 'Consultant'],
  canViewReports: ['Branch Manager', 'Sales Manager', 'Sales Team Leader', 'Consultant']
};

// Mock London branch users
const mockLondonBranchUsers = [
  {
    id: 1, name: 'Md Shamim', email: 'shamim@uapp.uk', role: 'Branch Manager',
    branch: 'London', initials: 'MS', color: '#045D5E',
    canManage: ['Sales Manager', 'Sales Team Leader', 'Consultant'],
    canViewReports: ['Sales Manager', 'Sales Team Leader', 'Consultant'],
    teamLeader: null
  },
  {
    id: 2, name: 'Laura', email: 'laura@uapp.uk', role: 'Sales Manager',
    branch: 'London', initials: 'LA', color: '#3B82F6',
    canManage: ['Sales Team Leader', 'Consultant'],
    canViewReports: ['Sales Team Leader', 'Consultant'],
    teamLeader: null,
    managedTeamLeaders: ['Andreea', 'Victor', 'Seho'],
    allTeamMembers: ['Andreea', 'Victor', 'Seho', 'Simona', 'Lenke', 'Ana', 'Wakajade', 'Will', 'Elizebete', 'Jian', 'Samson', 'Elena']
  },
  {
    id: 3, name: 'Andreea', email: 'andreea@uapp.uk', role: 'Sales Team Leader',
    branch: 'London', initials: 'AN', color: '#8B5CF6',
    canManage: ['Consultant'],
    canViewReports: ['Consultant'],
    teamLeader: null,
    teamMembers: ['Simona', 'Lenke', 'Ana']
  },
  {
    id: 4, name: 'Simona', email: 'simona@uapp.uk', role: 'Consultant',
    branch: 'London', initials: 'SI', color: '#EC4899',
    canManage: [], canViewReports: [], teamLeader: 'Andreea'
  },
  {
    id: 5, name: 'Lenke', email: 'lenke@uapp.uk', role: 'Consultant',
    branch: 'London', initials: 'LE', color: '#F59E0B',
    canManage: [], canViewReports: [], teamLeader: 'Andreea'
  },
  {
    id: 6, name: 'Ana', email: 'ana@uapp.uk', role: 'Consultant',
    branch: 'London', initials: 'AN', color: '#10B981',
    canManage: [], canViewReports: [], teamLeader: 'Andreea'
  },
  {
    id: 7, name: 'Victor', email: 'victor@uapp.uk', role: 'Sales Team Leader',
    branch: 'London', initials: 'VI', color: '#8B5CF6',
    canManage: ['Consultant'],
    canViewReports: ['Consultant'],
    teamLeader: null,
    teamMembers: ['Wakajade', 'Will', 'Elizebete']
  },
  {
    id: 8, name: 'Wakajade', email: 'wakajade@uapp.uk', role: 'Consultant',
    branch: 'London', initials: 'WA', color: '#06B6D4',
    canManage: [], canViewReports: [], teamLeader: 'Victor'
  },
  {
    id: 9, name: 'Will', email: 'will@uapp.uk', role: 'Consultant',
    branch: 'London', initials: 'WI', color: '#F97316',
    canManage: [], canViewReports: [], teamLeader: 'Victor'
  },
  {
    id: 10, name: 'Elizebete', email: 'elizebete@uapp.uk', role: 'Consultant',
    branch: 'London', initials: 'EL', color: '#84CC16',
    canManage: [], canViewReports: [], teamLeader: 'Victor'
  },
  {
    id: 11, name: 'Seho', email: 'seho@uapp.uk', role: 'Sales Team Leader',
    branch: 'London', initials: 'SE', color: '#8B5CF6',
    canManage: ['Consultant'],
    canViewReports: ['Consultant'],
    teamLeader: null,
    teamMembers: ['Jian', 'Samson', 'Elena']
  },
  {
    id: 12, name: 'Jian', email: 'jian@uapp.uk', role: 'Consultant',
    branch: 'London', initials: 'JI', color: '#EF4444',
    canManage: [], canViewReports: [], teamLeader: 'Seho'
  },
  {
    id: 13, name: 'Samson', email: 'samson@uapp.uk', role: 'Consultant',
    branch: 'London', initials: 'SA', color: '#A855F7',
    canManage: [], canViewReports: [], teamLeader: 'Seho'
  },
  {
    id: 14, name: 'Elena', email: 'elena@uapp.uk', role: 'Consultant',
    branch: 'London', initials: 'EL', color: '#0EA5E9',
    canManage: [], canViewReports: [], teamLeader: 'Seho'
  }
];

// ============== TEAM MANAGEMENT MODULE ==============

function UserManagementModule({ currentUser, londonBranchUsers, darkMode = false, forceTab = null }) {
  // Theme-aware soft tint for role/employee-type backgrounds. In light mode
  // we keep the original hardcoded pastel tints (#EDE9FE, #DBEAFE, etc).
  // In dark mode those pastels would clash with our dark surface and would
  // bleach out the "Branch Manager" / "Sales Manager" labels — so we
  // synthesize a soft tint from the role's accent color instead.
  const tintBg = (lightModeBg, accentColor) => {
    if (!darkMode) return lightModeBg;
    if (!accentColor) return lightModeBg;
    // Convert "#RRGGBB" to rgba(r,g,b,0.18)
    const hex = accentColor.replace("#", "");
    if (hex.length !== 6) return "rgba(255,255,255,0.10)";
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r},${g},${b},0.18)`;
  };
  // Wrapper that takes a role/type object with .color and .bgColor.
  const roleBg = (role) => role ? tintBg(role.bgColor, role.color) : "transparent";
  const [activeTab, setActiveTab] = useState('Users');
  const [selectedBranch, setSelectedBranch] = useState('uk');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showToast, setShowToast] = useState(null);

  // Branded confirmation dialog state — replaces native confirm() calls
  // { title, body, confirmLabel, confirmDanger, onConfirm }
  const [pendingConfirm, setPendingConfirm] = useState(null);
  
  // User Type Permission Assignments - maps user type to permission set
  const [userTypePermissions, setUserTypePermissions] = useState({
    'Branch Manager': 'Full Access',
    'Sales Manager': 'Manager Access',
    'Sales Team Leader': 'Team Leader Access',
    'Consultant': 'Basic Access'
  });
  
  // Determine user roles
  const isTeamLeader = currentUser?.role === 'Sales Team Leader';
  
  // Role hierarchy for permission management
  const roleHierarchy = ['System Admin', 'Branch Manager', 'Sales Manager', 'Sales Team Leader', 'Consultant'];

  // ─── Permission Sets — independent templates assignable to user types ───
  // Keys correspond to permissions defined in `permissionCategories` below.
  // 4 built-in templates ship with sensible defaults:
  //   • Full Access     — everything (Branch Manager, System Admin)
  //   • Manager Access  — most things, no admin overrides (Sales Manager)
  //   • Team Leader     — manage own team, basic chat/feed (Sales Team Leader)
  //   • Basic Access    — read + send + react only (Consultant)
  const [permissionSets, setPermissionSets] = useState({
    'Full Access': {
      id: 'full-access',
      name: 'Full Access',
      description: 'Complete access to all Communication Hub features',
      color: '#059669',
      bgColor: C.successBg,
      // Chats — every action
      chats_view: true, chats_sendDm: true, chats_sendGroup: true,
      chats_createDm: true, chats_createGroup: true, chats_manageMembers: true,
      chats_pin: true, chats_archive: true, chats_delete: true,
      chats_sharePost: true, chats_react: true,
      // Bookings — every action
      bookings_view: true, bookings_create: true, bookings_createGroup: true,
      bookings_respond: true, bookings_cancelOwn: true, bookings_cancelAny: true,
      bookings_availability: true,
      // News Feed — every action
      feed_view: true, feed_create: true, feed_templates: true,
      feed_pin: true, feed_schedule: true, feed_react: true, feed_comment: true,
      feed_bookmark: true, feed_share: true, feed_deleteOwn: true, feed_deleteAny: true,
      // Team — every action
      team_view: true, team_viewBranches: true, team_manageUsers: true,
      team_changeRoles: true, team_managePermissions: true, team_viewReports: true,
      // Settings — every action
      settings_view: true, settings_archive: true, settings_saved: true, settings_appearance: true,
      // Schedule — every action
      schedule_view: true, schedule_create: true, schedule_edit: true, schedule_delete: true, schedule_recurring: true, schedule_away: true,
      // Webhooks — every action
      webhooks_view: true, webhooks_create: true, webhooks_edit: true, webhooks_delete: true, webhooks_test: true, webhooks_logs: true, webhooks_retry: true, webhooks_apps: true,
      // Promotions — every action
      promo_view: true, promo_manage: true, promo_items: true, promo_templates: true, promo_priority: true,
      // CRM — every action
      crm_view: true, crm_edit: true, crm_create: true, crm_delete: true, crm_export: true,
      // Marketing — every action
      marketing_view: true, marketing_ads: true, marketing_forms: true, marketing_events: true, marketing_promote: true,
    },
    'Manager Access': {
      id: 'manager-access',
      name: 'Manager Access',
      description: 'Management level — most actions, no admin overrides',
      color: '#2563EB',
      bgColor: '#DBEAFE',
      chats_view: true, chats_sendDm: true, chats_sendGroup: true,
      chats_createDm: true, chats_createGroup: true, chats_manageMembers: true,
      chats_pin: true, chats_archive: true, chats_delete: false,
      chats_sharePost: true, chats_react: true,
      bookings_view: true, bookings_create: true, bookings_createGroup: true,
      bookings_respond: true, bookings_cancelOwn: true, bookings_cancelAny: false,
      bookings_availability: true,
      feed_view: true, feed_create: true, feed_templates: true,
      feed_pin: true, feed_schedule: true, feed_react: true, feed_comment: true,
      feed_bookmark: true, feed_share: true, feed_deleteOwn: true, feed_deleteAny: false,
      team_view: true, team_viewBranches: false, team_manageUsers: true,
      team_changeRoles: false, team_managePermissions: false, team_viewReports: true,
      settings_view: true, settings_archive: true, settings_saved: true, settings_appearance: true,
      schedule_view: true, schedule_create: true, schedule_edit: true, schedule_delete: true, schedule_recurring: true, schedule_away: true,
      webhooks_view: true, webhooks_create: true, webhooks_edit: true, webhooks_delete: false, webhooks_test: true, webhooks_logs: true, webhooks_retry: true, webhooks_apps: false,
      promo_view: true, promo_manage: true, promo_items: true, promo_templates: true, promo_priority: true,
      crm_view: true, crm_edit: true, crm_create: true, crm_delete: false, crm_export: true,
      marketing_view: true, marketing_ads: true, marketing_forms: true, marketing_events: true, marketing_promote: true,
    },
    'Team Leader Access': {
      id: 'team-leader-access',
      name: 'Team Leader Access',
      description: 'Manage own team, full chat / feed, basic bookings',
      color: '#7C3AED',
      bgColor: '#EDE9FE',
      chats_view: true, chats_sendDm: true, chats_sendGroup: true,
      chats_createDm: true, chats_createGroup: true, chats_manageMembers: true,
      chats_pin: true, chats_archive: true, chats_delete: false,
      chats_sharePost: true, chats_react: true,
      bookings_view: true, bookings_create: true, bookings_createGroup: true,
      bookings_respond: true, bookings_cancelOwn: true, bookings_cancelAny: false,
      bookings_availability: true,
      feed_view: true, feed_create: true, feed_templates: false,
      feed_pin: false, feed_schedule: false, feed_react: true, feed_comment: true,
      feed_bookmark: true, feed_share: true, feed_deleteOwn: true, feed_deleteAny: false,
      team_view: true, team_viewBranches: false, team_manageUsers: false,
      team_changeRoles: false, team_managePermissions: false, team_viewReports: true,
      settings_view: true, settings_archive: true, settings_saved: true, settings_appearance: true,
      schedule_view: true, schedule_create: true, schedule_edit: true, schedule_delete: true, schedule_recurring: true, schedule_away: true,
      webhooks_view: false, webhooks_create: false, webhooks_edit: false, webhooks_delete: false, webhooks_test: false, webhooks_logs: false, webhooks_retry: false, webhooks_apps: false,
      promo_view: true, promo_manage: false, promo_items: false, promo_templates: false, promo_priority: false,
      crm_view: true, crm_edit: true, crm_create: true, crm_delete: false, crm_export: false,
      marketing_view: true, marketing_ads: false, marketing_forms: false, marketing_events: false, marketing_promote: false,
    },
    'Basic Access': {
      id: 'basic-access',
      name: 'Basic Access',
      description: 'View + send + react. No admin or moderation actions.',
      color: C.textSoft,
      bgColor: C.bg,
      chats_view: true, chats_sendDm: true, chats_sendGroup: true,
      chats_createDm: true, chats_createGroup: false, chats_manageMembers: false,
      chats_pin: true, chats_archive: true, chats_delete: false,
      chats_sharePost: true, chats_react: true,
      bookings_view: true, bookings_create: true, bookings_createGroup: false,
      bookings_respond: true, bookings_cancelOwn: true, bookings_cancelAny: false,
      bookings_availability: true,
      feed_view: true, feed_create: false, feed_templates: false,
      feed_pin: false, feed_schedule: false, feed_react: true, feed_comment: true,
      feed_bookmark: true, feed_share: false, feed_deleteOwn: false, feed_deleteAny: false,
      team_view: true, team_viewBranches: false, team_manageUsers: false,
      team_changeRoles: false, team_managePermissions: false, team_viewReports: false,
      settings_view: true, settings_archive: true, settings_saved: true, settings_appearance: true,
      schedule_view: true, schedule_create: true, schedule_edit: true, schedule_delete: true, schedule_recurring: false, schedule_away: true,
      webhooks_view: false, webhooks_create: false, webhooks_edit: false, webhooks_delete: false, webhooks_test: false, webhooks_logs: false, webhooks_retry: false, webhooks_apps: false,
      promo_view: true, promo_manage: false, promo_items: false, promo_templates: false, promo_priority: false,
      crm_view: true, crm_edit: false, crm_create: false, crm_delete: false, crm_export: false,
      marketing_view: true, marketing_ads: false, marketing_forms: false, marketing_events: false, marketing_promote: false,
    },
  });

  // Selected permission set for editing
  const [selectedPermissionSet, setSelectedPermissionSet] = useState('Full Access');
  
  // State for creating new permission group
  const [showCreatePermissionGroup, setShowCreatePermissionGroup] = useState(false);
  const [newPermissionGroupName, setNewPermissionGroupName] = useState('');
  const [newPermissionGroupColor, setNewPermissionGroupColor] = useState(C.primary);
  
  // State for renaming permission set
  const [renamingPermissionSet, setRenamingPermissionSet] = useState(null);
  const [renamePermissionSetName, setRenamePermissionSetName] = useState('');

  // Granular permission categories for the UI
  const [selectedPermissionCategory, setSelectedPermissionCategory] = useState('dashboard');

  // Helper to get effective permission for a permission set
  const getEffectivePermission = (permissionSetName, permissionId) => {
    return permissionSets[permissionSetName]?.[permissionId] ?? false;
  };

  // Helper to set permission in a permission set
  const setPermission = (permissionSetName, permissionId, value) => {
    setPermissionSets(prev => ({
      ...prev,
      [permissionSetName]: {
        ...prev[permissionSetName],
        [permissionId]: value
      }
    }));
  };

  // Permission dependencies: each permission can have 'requires' array
  // If ANY required permission is OFF, this permission is disabled

  // ─── Communication Hub permission categories ───
  // Mirrors the actual feature set of this product (Chats / Bookings / News
  // Feed / Team / Settings) — replaced the inherited Lead-Management permissions
  // (leads/contacts/students/applications/etc.) which don't apply here.
  const permissionCategories = [
    {
      id: 'chats',
      name: 'Chats',
      icon: MessagesSquare,
      sidebarMenu: 'Chats',
      moduleId: 'chats',
      description: 'Direct messages and group conversations',
      permissions: [
        { id: 'chats_view',          name: 'View',                description: 'Open and read chat conversations', isBase: true },
        { id: 'chats_sendDm',        name: 'Send DM messages',    description: 'Send messages in direct conversations', requires: ['chats_view'] },
        { id: 'chats_sendGroup',     name: 'Send group messages', description: 'Send messages in group chats', requires: ['chats_view'] },
        { id: 'chats_createDm',      name: 'Start new DM',        description: 'Create a new direct conversation', requires: ['chats_view'] },
        { id: 'chats_createGroup',   name: 'Create group',        description: 'Create a new group conversation', requires: ['chats_view'] },
        { id: 'chats_manageMembers', name: 'Manage group members', description: 'Add, remove, promote members in groups', requires: ['chats_view', 'chats_createGroup'] },
        { id: 'chats_pin',           name: 'Pin to top',          description: 'Pin important chats to the top of the list', requires: ['chats_view'] },
        { id: 'chats_archive',       name: 'Archive chats',       description: 'Move chats to the archive', requires: ['chats_view'] },
        { id: 'chats_delete',        name: 'Delete chats',        description: 'Remove chats from the list', requires: ['chats_view'] },
        { id: 'chats_sharePost',     name: 'Forward posts',       description: 'Forward feed posts into chats', requires: ['chats_view', 'chats_sendDm'] },
        { id: 'chats_react',         name: 'React + reply',       description: 'Add emoji reactions and reply to messages', requires: ['chats_view'] },
      ]
    },
    {
      id: 'bookings',
      name: 'Bookings',
      icon: CalendarSolid,
      sidebarMenu: 'Bookings',
      moduleId: 'bookings',
      description: 'Calendar and meeting management',
      permissions: [
        { id: 'bookings_view',        name: 'View calendar',         description: 'See bookings and upcoming meetings', isBase: true },
        { id: 'bookings_create',      name: 'Book 1-on-1 meeting',   description: 'Schedule a meeting with another user', requires: ['bookings_view'] },
        { id: 'bookings_createGroup', name: 'Book group meeting',    description: 'Schedule a meeting with multiple attendees', requires: ['bookings_view'] },
        { id: 'bookings_respond',     name: 'Accept / decline',      description: 'Respond to incoming meeting invitations', requires: ['bookings_view'] },
        { id: 'bookings_cancelOwn',   name: 'Cancel own bookings',   description: 'Cancel meetings you organised', requires: ['bookings_view'] },
        { id: 'bookings_cancelAny',   name: 'Cancel any booking',    description: 'Admin override to cancel any meeting', requires: ['bookings_view'] },
        { id: 'bookings_availability', name: 'Manage availability', description: 'Set your own availability windows', requires: ['bookings_view'] },
      ]
    },
    {
      id: 'feed',
      name: 'News Feed',
      icon: Newspaper,
      sidebarMenu: 'News Feed',
      moduleId: 'feed',
      description: 'Company-wide and team announcements',
      permissions: [
        { id: 'feed_view',       name: 'View posts',           description: 'Read posts in the news feed', isBase: true },
        { id: 'feed_create',     name: 'Create posts',         description: 'Compose and publish new posts', requires: ['feed_view'] },
        { id: 'feed_templates',  name: 'Use offer templates',  description: 'Use the admission offer-letter template wizard', requires: ['feed_view', 'feed_create'] },
        { id: 'feed_pin',        name: 'Pin posts',            description: 'Pin important posts to the top of the feed', requires: ['feed_view'] },
        { id: 'feed_schedule',   name: 'Schedule posts',       description: 'Set posts to publish at a later time', requires: ['feed_view', 'feed_create'] },
        { id: 'feed_react',      name: 'React to posts',       description: 'Add emoji reactions to posts', requires: ['feed_view'] },
        { id: 'feed_comment',    name: 'Comment',              description: 'Reply to posts in the feed', requires: ['feed_view'] },
        { id: 'feed_bookmark',   name: 'Bookmark posts',       description: 'Save posts for later in the Saved tab', requires: ['feed_view'] },
        { id: 'feed_share',      name: 'Share to chat',        description: 'Forward posts into chat conversations', requires: ['feed_view'] },
        { id: 'feed_deleteOwn',  name: 'Delete own posts',     description: 'Remove your own posts from the feed', requires: ['feed_view', 'feed_create'] },
        { id: 'feed_deleteAny',  name: 'Delete any post',      description: 'Moderation: remove any post from the feed', requires: ['feed_view'] },
      ]
    },
    {
      id: 'team',
      name: 'Team',
      icon: Users,
      sidebarMenu: 'Team',
      moduleId: 'team',
      description: 'Organisational hierarchy and user management',
      permissions: [
        { id: 'team_view',              name: 'View team',          description: 'See the team org chart and member list', isBase: true },
        { id: 'team_viewBranches',      name: 'View branches',      description: 'See data from other branches', requires: ['team_view'] },
        { id: 'team_manageUsers',       name: 'Manage users',       description: 'Add, edit, remove team members', requires: ['team_view'] },
        { id: 'team_changeRoles',       name: 'Change roles',       description: 'Promote or demote team members', requires: ['team_view', 'team_manageUsers'] },
        { id: 'team_managePermissions', name: 'Manage permissions', description: 'Configure permission sets and assignments', requires: ['team_view'] },
        { id: 'team_viewReports',       name: 'View team reports',  description: 'See performance reports for the team', requires: ['team_view'] },
      ]
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      sidebarMenu: 'Timezone Settings',
      moduleId: 'settings',
      description: 'Personal preferences and saved items',
      permissions: [
        { id: 'settings_view',       name: 'Open Settings',     description: 'Access the settings panel', isBase: true },
        { id: 'settings_archive',    name: 'View archive',      description: 'Access archived chats', requires: ['settings_view'] },
        { id: 'settings_saved',      name: 'View saved posts',  description: 'Access saved feed posts', requires: ['settings_view'] },
        { id: 'settings_appearance', name: 'Change appearance', description: 'Modify theme and display preferences', requires: ['settings_view'] },
      ]
    },
    {
      id: 'schedule',
      name: 'My Schedule',
      icon: Clock,
      sidebarMenu: 'My Schedule',
      moduleId: 'schedule',
      description: 'Personal schedule and availability management',
      permissions: [
        { id: 'schedule_view',      name: 'View schedule',       description: 'See your own calendar and blocks', isBase: true },
        { id: 'schedule_create',    name: 'Create events',       description: 'Add availability, focus, and busy blocks', requires: ['schedule_view'] },
        { id: 'schedule_edit',      name: 'Edit events',         description: 'Modify existing schedule blocks', requires: ['schedule_view'] },
        { id: 'schedule_delete',    name: 'Delete events',       description: 'Remove schedule blocks', requires: ['schedule_view'] },
        { id: 'schedule_recurring', name: 'Set recurring',       description: 'Create weekly/daily recurring blocks', requires: ['schedule_view', 'schedule_create'] },
        { id: 'schedule_away',      name: 'Set away/holiday',    description: 'Mark days as away or on holiday', requires: ['schedule_view', 'schedule_create'] },
      ]
    },
    {
      id: 'webhooks',
      name: 'Webhooks',
      icon: Zap,
      sidebarMenu: 'Webhooks',
      moduleId: 'webhooks',
      description: 'Webhook integrations and delivery management',
      permissions: [
        { id: 'webhooks_view',        name: 'View webhooks',       description: 'See applications, webhooks, and logs', isBase: true },
        { id: 'webhooks_create',      name: 'Create webhooks',     description: 'Add new webhook subscriptions', requires: ['webhooks_view'] },
        { id: 'webhooks_edit',        name: 'Edit webhooks',       description: 'Modify existing webhook configurations', requires: ['webhooks_view'] },
        { id: 'webhooks_delete',      name: 'Delete webhooks',     description: 'Remove webhook subscriptions', requires: ['webhooks_view'] },
        { id: 'webhooks_test',        name: 'Test webhooks',       description: 'Send test payloads to endpoints', requires: ['webhooks_view'] },
        { id: 'webhooks_logs',        name: 'View delivery logs',  description: 'See delivery history and retry queue', requires: ['webhooks_view'] },
        { id: 'webhooks_retry',       name: 'Retry deliveries',    description: 'Retry failed webhook deliveries', requires: ['webhooks_view', 'webhooks_logs'] },
        { id: 'webhooks_apps',        name: 'Manage applications', description: 'Add and configure webhook applications', requires: ['webhooks_view'] },
      ]
    },
    {
      id: 'promotions',
      name: 'Promotions',
      icon: Megaphone,
      sidebarMenu: 'Promotions',
      moduleId: 'promotions',
      description: 'Promotional campaigns and templates',
      permissions: [
        { id: 'promo_view',        name: 'View promotions',     description: 'See promotion categories and items', isBase: true },
        { id: 'promo_manage',      name: 'Manage categories',   description: 'Create, edit, reorder, and delete categories', requires: ['promo_view'] },
        { id: 'promo_items',       name: 'Manage items',        description: 'Add and edit promotion items within categories', requires: ['promo_view'] },
        { id: 'promo_templates',   name: 'Manage templates',    description: 'Create and edit commission/campaign templates', requires: ['promo_view'] },
        { id: 'promo_priority',    name: 'Change priority',     description: 'Reorder category display priority', requires: ['promo_view', 'promo_manage'] },
      ]
    },
    {
      id: 'crm',
      name: 'CRM',
      icon: Users,
      sidebarMenu: 'CRM',
      moduleId: 'crm',
      description: 'Student records and application management',
      permissions: [
        { id: 'crm_view',       name: 'View students',     description: 'See student list and profiles', isBase: true },
        { id: 'crm_edit',       name: 'Edit students',     description: 'Modify student records and details', requires: ['crm_view'] },
        { id: 'crm_create',     name: 'Create students',   description: 'Add new student records', requires: ['crm_view'] },
        { id: 'crm_delete',     name: 'Delete students',   description: 'Remove student records', requires: ['crm_view'] },
        { id: 'crm_export',     name: 'Export data',        description: 'Export student data and reports', requires: ['crm_view'] },
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: Megaphone,
      sidebarMenu: 'Marketing',
      moduleId: 'marketing',
      description: 'Leads, ads, forms, and events management',
      permissions: [
        { id: 'marketing_view',     name: 'View marketing',     description: 'See ads, forms, and event campaigns', isBase: true },
        { id: 'marketing_ads',      name: 'Manage ads',         description: 'Create and edit ad campaigns', requires: ['marketing_view'] },
        { id: 'marketing_forms',    name: 'Manage forms',       description: 'Create and edit lead capture forms', requires: ['marketing_view'] },
        { id: 'marketing_events',   name: 'Manage events',      description: 'Create and manage marketing events', requires: ['marketing_view'] },
        { id: 'marketing_promote',  name: 'Promote to feed',    description: 'Push events to the news feed promotions rail', requires: ['marketing_view', 'marketing_events'] },
      ]
    },
  ];

  // Helper function to check if a permission's dependencies are met
  const checkPermissionDependencies = (permissionId, rolePerms) => {
    const category = permissionCategories.find(c => c.permissions.some(p => p.id === permissionId));
    if (!category) return true;
    
    const permission = category.permissions.find(p => p.id === permissionId);
    if (!permission || !permission.requires) return true;
    
    return permission.requires.every(reqId => rolePerms?.[reqId] === true);
  };

  // Helper function to turn off dependent permissions when a base permission is turned off
  const getDependentPermissions = (permissionId, categoryId) => {
    const category = permissionCategories.find(c => c.id === categoryId);
    if (!category) return [];
    
    return category.permissions
      .filter(p => p.requires && p.requires.includes(permissionId))
      .map(p => p.id);
  };

  // Filter tabs based on role - Consultant doesn't see this module at all
  const getAvailableTabs = () => {
    if (currentUser?.role === 'System Admin') {
      return [
        { id: 'Users', icon: Users },
        { id: 'Permissions', icon: Shield },
        { id: 'Timezone Settings', icon: Settings },
      ];
    } else if (currentUser?.role === 'Branch Manager') {
      return [
        { id: 'Users', icon: Users },
        { id: 'Permissions', icon: Shield },
        { id: 'Timezone Settings', icon: Settings },
      ];
    } else if (currentUser?.role === 'Sales Manager') {
      return [
        { id: 'Permissions', icon: Shield },
      ];
    } else if (currentUser?.role === 'Sales Team Leader') {
      return [
        { id: 'Permissions', icon: Shield },
      ];
    }
    return [];
  };

  const tabs = getAvailableTabs();

  // Organization Hierarchy - now state-based so we can add new roles
  const [customRoles, setCustomRoles] = useState([]);
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [selectedEmptyPosition, setSelectedEmptyPosition] = useState(null);
  const [newPersonData, setNewPersonData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Base hierarchy roles
  const baseHierarchy = [
    { level: 0, role: 'System Admin', color: "#EF4444", bgColor: C.dangerBg, icon: 'shield', isCustom: false },
    { level: 1, role: 'Branch Manager', color: '#7C3AED', bgColor: '#EDE9FE', icon: 'briefcase', isCustom: false },
    { level: 2, role: 'Sales Manager', color: '#2563EB', bgColor: '#DBEAFE', icon: 'bar-chart', isCustom: false },
    { level: 3, role: 'Sales Team Leader', color: '#059669', bgColor: C.successBg, icon: 'target', isCustom: false },
    { level: 4, role: 'Consultant', color: '#D97706', bgColor: C.warnBg, icon: 'user', isCustom: false },
  ];

  // Available user types from database
  const availableEmployeeTypes = [
    { id: 1, name: 'Admin', icon: Shield, color: '#6366F1', bgColor: '#EEF2FF' },
    { id: 2, name: 'Admission Compliance', icon: FileCheck, color: '#0891B2', bgColor: '#CFFAFE' },
    { id: 3, name: 'Account Manager', icon: Briefcase, color: '#059669', bgColor: C.successBg },
    { id: 4, name: 'Consultant Compliance', icon: ClipboardCheck, color: '#7C3AED', bgColor: '#EDE9FE' },
    { id: 5, name: 'Marketing Admin', icon: Megaphone, color: '#DB2777', bgColor: '#FCE7F3' },
    { id: 6, name: 'Marketing Team Leader', icon: Target, color: '#EA580C', bgColor: '#FFEDD5' },
  ];

  // State for user type dropdown
  
  // State for Add New Role from User Type modal
  
  // State for user-specific permissions editing
  const [editingUserPermissions, setEditingUserPermissions] = useState(null);
  const [userPermissions, setUserPermissions] = useState({}); // { oderId: { permission: boolean } }

  // Combined hierarchy (base + custom roles)
  const hierarchy = [...baseHierarchy, ...customRoles].sort((a, b) => a.level - b.level);

  // Empty positions for each branch when custom roles are added
  const [branchEmptyPositions, setBranchEmptyPositions] = useState({});

  // Add a new role to the hierarchy

  // Add a person to an empty position
  const handleAddPersonToPosition = () => {
    if (!newPersonData.firstName.trim() || !newPersonData.email.trim()) return;

    const updatedPositions = { ...branchEmptyPositions };
    const branchId = selectedEmptyPosition.branchId;
    const roleId = selectedEmptyPosition.roleId;

    const positionIndex = updatedPositions[branchId].findIndex(p => p.roleId === roleId && p.isEmpty);
    if (positionIndex !== -1) {
      updatedPositions[branchId][positionIndex] = {
        ...updatedPositions[branchId][positionIndex],
        isEmpty: false,
        person: {
          id: Date.now(),
          name: `${newPersonData.firstName} ${newPersonData.lastName}`.trim(),
          firstName: newPersonData.firstName,
          lastName: newPersonData.lastName,
          email: newPersonData.email,
          avatar: `${newPersonData.firstName[0]}${newPersonData.lastName ? newPersonData.lastName[0] : ''}`.toUpperCase(),
          joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          performance: 0
        }
      };
    }

    setBranchEmptyPositions(updatedPositions);
    setShowAddPersonModal(false);
    setSelectedEmptyPosition(null);
    setNewPersonData({ firstName: '', lastName: '', email: '' });
    setShowToast({ type: 'success', message: `${newPersonData.firstName} added as ${roleId}!` });
    setTimeout(() => setShowToast(null), 3000);
  };

  // Remove a person from a custom user type position (makes it empty again)
  const handleRemovePersonFromPosition = (branchId, roleId, personName) => {
    setPendingConfirm({
      title: `Remove ${personName} from ${roleId}?`,
      body: `The ${roleId} position will become open and can be filled later.`,
      confirmLabel: "Remove from position",
      confirmDanger: true,
      onConfirm: () => {
        const updatedPositions = { ...branchEmptyPositions };
        const positionIndex = (updatedPositions[branchId] || []).findIndex(p => p.roleId === roleId && !p.isEmpty);
        if (positionIndex !== -1) {
          updatedPositions[branchId][positionIndex] = {
            ...updatedPositions[branchId][positionIndex],
            isEmpty: true,
            person: null
          };
          setBranchEmptyPositions(updatedPositions);
          setShowToast({ type: 'success', message: `${personName} has been removed. The ${roleId} position is now open.` });
          setTimeout(() => setShowToast(null), 3000);
        }
        setPendingConfirm(null);
      },
    });
  };

  // 4 Branches with full team structure
  const branches = [
    {
      id: 'uk',
      name: 'London Branch',
      country: 'UK',
      flag: '🇬🇧',
      color: '#1D4ED8',
      address: '123 Oxford Street, London W1D 2LF',
      timezone: 'GMT (UTC+0)',
      established: '2020',
      teamCount: 14,
      branchManager: {
        id: 101, name: 'Md Shamim', email: 'shamim@uapp.uk', phone: '+44 7700 900123', 
        role: 'Branch Manager', avatar: 'MS', joinDate: 'Jan 2020', performance: 95
      },
      salesManagers: [
        { 
          id: 102, name: 'Laura', email: 'laura@uapp.uk', phone: '+44 7700 900124',
          role: 'Sales Manager', avatar: 'LA', joinDate: 'Mar 2020', performance: 92,
          teamLeaders: [
            {
              id: 103, name: 'Andreea', email: 'andreea@uapp.uk', phone: '+44 7700 900125',
              role: 'Sales Team Leader', avatar: 'AN', joinDate: 'Jun 2021', performance: 88,
              consultants: [
                { id: 104, name: 'Simona', email: 'simona@uapp.uk', phone: '+44 7700 900126', role: 'Consultant', avatar: 'SI', joinDate: 'Jan 2022', performance: 85, leads: 45, conversions: 12 },
                { id: 105, name: 'Lenke', email: 'lenke@uapp.uk', phone: '+44 7700 900127', role: 'Consultant', avatar: 'LE', joinDate: 'Mar 2022', performance: 82, leads: 38, conversions: 10 },
                { id: 106, name: 'Ana', email: 'ana@uapp.uk', phone: '+44 7700 900128', role: 'Consultant', avatar: 'AN', joinDate: 'Aug 2022', performance: 79, leads: 32, conversions: 8 },
              ]
            },
            {
              id: 107, name: 'Victor', email: 'victor@uapp.uk', phone: '+44 7700 900129',
              role: 'Sales Team Leader', avatar: 'VI', joinDate: 'Jul 2021', performance: 87,
              consultants: [
                { id: 108, name: 'Wakajade', email: 'wakajade@uapp.uk', phone: '+44 7700 900130', role: 'Consultant', avatar: 'WA', joinDate: 'Feb 2022', performance: 84, leads: 42, conversions: 11 },
                { id: 109, name: 'Will', email: 'will@uapp.uk', phone: '+44 7700 900131', role: 'Consultant', avatar: 'WI', joinDate: 'Apr 2022', performance: 81, leads: 36, conversions: 9 },
                { id: 110, name: 'Elizebete', email: 'elizebete@uapp.uk', phone: '+44 7700 900132', role: 'Consultant', avatar: 'EL', joinDate: 'Jun 2022', performance: 80, leads: 34, conversions: 9 },
              ]
            },
            {
              id: 111, name: 'Seho', email: 'seho@uapp.uk', phone: '+44 7700 900133',
              role: 'Sales Team Leader', avatar: 'SE', joinDate: 'Aug 2021', performance: 86,
              consultants: [
                { id: 112, name: 'Jian', email: 'jian@uapp.uk', phone: '+44 7700 900134', role: 'Consultant', avatar: 'JI', joinDate: 'Mar 2022', performance: 83, leads: 40, conversions: 10 },
                { id: 113, name: 'Samson', email: 'samson@uapp.uk', phone: '+44 7700 900135', role: 'Consultant', avatar: 'SA', joinDate: 'May 2022', performance: 82, leads: 37, conversions: 10 },
                { id: 114, name: 'Elena', email: 'elena@uapp.uk', phone: '+44 7700 900136', role: 'Consultant', avatar: 'EL', joinDate: 'Jul 2022', performance: 80, leads: 35, conversions: 9 },
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'bd',
      name: 'Bangladesh Branch',
      country: 'BD',
      flag: '🇧🇩',
      color: '#059669',
      address: 'Gulshan Avenue, Dhaka 1212',
      timezone: 'BST (UTC+6)',
      established: '2021',
      teamCount: 6,
      branchManager: {
        id: 201, name: 'Majedul Islam', email: 'majedul@uapp.bd', phone: '+880 1712 345678',
        role: 'Branch Manager', avatar: 'MI', joinDate: 'Jan 2021', performance: 94
      },
      salesManagers: [
        {
          id: 202, name: 'Jony', email: 'jony@uapp.bd', phone: '+880 1712 345679',
          role: 'Sales Manager', avatar: 'JO', joinDate: 'Mar 2021', performance: 91,
          teamLeaders: [
            {
              id: 203, name: 'Nur', email: 'nur@uapp.bd', phone: '+880 1712 345680',
              role: 'Sales Team Leader', avatar: 'NU', joinDate: 'Jul 2021', performance: 87,
              consultants: [
                { id: 204, name: 'Nayem', email: 'nayem@uapp.bd', phone: '+880 1712 345681', role: 'Consultant', avatar: 'NA', joinDate: 'Oct 2021', performance: 86, leads: 52, conversions: 15 },
                { id: 205, name: 'Farah', email: 'farah@uapp.bd', phone: '+880 1712 345682', role: 'Consultant', avatar: 'FA', joinDate: 'Jan 2022', performance: 83, leads: 48, conversions: 13 },
                { id: 206, name: 'Farhana', email: 'farhana@uapp.bd', phone: '+880 1712 345683', role: 'Consultant', avatar: 'FH', joinDate: 'Apr 2022', performance: 81, leads: 41, conversions: 11 },
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'pk',
      name: 'Pakistan Branch',
      country: 'PK',
      flag: '🇵🇰',
      color: '#047857',
      address: 'Clifton Block 5, Karachi, Pakistan',
      timezone: 'PKT (UTC+5)',
      established: '2022',
      teamCount: 6,
      branchManager: {
        id: 301, name: 'Md Usman', email: 'usman@uapp.pk', phone: '+92 300 123 4567',
        role: 'Branch Manager', avatar: 'MU', joinDate: 'Jan 2022', performance: 93
      },
      salesManagers: [
        {
          id: 302, name: 'Umair', email: 'umair@uapp.pk', phone: '+92 300 234 5678',
          role: 'Sales Manager', avatar: 'UM', joinDate: 'Mar 2022', performance: 90,
          teamLeaders: [
            {
              id: 303, name: 'Babar', email: 'babar@uapp.pk', phone: '+92 300 345 6789',
              role: 'Sales Team Leader', avatar: 'BA', joinDate: 'Jun 2022', performance: 86,
              consultants: [
                { id: 304, name: 'Azka', email: 'azka@uapp.pk', phone: '+92 300 456 7890', role: 'Consultant', avatar: 'AZ', joinDate: 'Aug 2022', performance: 84, leads: 40, conversions: 11 },
                { id: 305, name: 'Atia', email: 'atia@uapp.pk', phone: '+92 300 567 8901', role: 'Consultant', avatar: 'AT', joinDate: 'Oct 2022', performance: 81, leads: 35, conversions: 9 },
                { id: 306, name: 'Noor', email: 'noor@uapp.pk', phone: '+92 300 678 9012', role: 'Consultant', avatar: 'NO', joinDate: 'Dec 2022', performance: 79, leads: 31, conversions: 8 },
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'ng',
      name: 'Nigeria Branch',
      country: 'NG',
      flag: '🇳🇬',
      color: '#16A34A',
      address: 'Victoria Island, Lagos, Nigeria',
      timezone: 'WAT (UTC+1)',
      established: '2023',
      teamCount: 6,
      branchManager: {
        id: 401, name: 'Anthony', email: 'anthony@uapp.ng', phone: '+234 803 123 4567',
        role: 'Branch Manager', avatar: 'AN', joinDate: 'Jan 2023', performance: 91
      },
      salesManagers: [
        {
          id: 402, name: 'Ann', email: 'ann@uapp.ng', phone: '+234 803 234 5678',
          role: 'Sales Manager', avatar: 'AN', joinDate: 'Feb 2023', performance: 88,
          teamLeaders: [
            {
              id: 403, name: 'Thomas', email: 'thomas@uapp.ng', phone: '+234 803 345 6789',
              role: 'Sales Team Leader', avatar: 'TH', joinDate: 'Apr 2023', performance: 85,
              consultants: [
                { id: 404, name: 'Taiwo', email: 'taiwo@uapp.ng', phone: '+234 803 456 7890', role: 'Consultant', avatar: 'TA', joinDate: 'Jun 2023', performance: 82, leads: 42, conversions: 12 },
                { id: 405, name: 'Ann', email: 'ann.c@uapp.ng', phone: '+234 803 567 8901', role: 'Consultant', avatar: 'AN', joinDate: 'Aug 2023', performance: 80, leads: 36, conversions: 10 },
                { id: 406, name: 'Faith', email: 'faith@uapp.ng', phone: '+234 803 678 9012', role: 'Consultant', avatar: 'FA', joinDate: 'Sep 2023', performance: 79, leads: 34, conversions: 9 },
              ]
            }
          ]
        }
      ]
    }
  ];

  // Filter branches based on current user's role and branch
  const getFilteredBranches = () => {
    if (currentUser?.role === 'System Admin') {
      // System Admin sees all branches
      return branches;
    } else if (currentUser?.role === 'Branch Manager') {
      // Branch Manager sees only their branch
      // Map user branch name to branch id
      const branchMapping = {
        'London': 'uk',
        'United Kingdom': 'uk',
        'Bangladesh': 'bd',
        'Pakistan': 'pk',
        'Nigeria': 'ng'
      };
      const userBranchId = branchMapping[currentUser.branch] || 'uk';
      return branches.filter(b => b.id === userBranchId);
    } else {
      // Sales Manager, Team Leader, Consultant - see their branch only
      const branchMapping = {
        'London': 'uk',
        'United Kingdom': 'uk',
        'Bangladesh': 'bd',
        'Pakistan': 'pk',
        'Nigeria': 'ng'
      };
      const userBranchId = branchMapping[currentUser?.branch] || 'uk';
      return branches.filter(b => b.id === userBranchId);
    }
  };

  const filteredBranches = getFilteredBranches();

  // Get all team members flat list - use filtered branches
  const getAllMembers = () => {
    const members = [];
    filteredBranches.forEach(branch => {
      members.push({ ...branch.branchManager, branch: branch.name, branchId: branch.id });
      branch.salesManagers.forEach(sm => {
        members.push({ ...sm, branch: branch.name, branchId: branch.id });
        sm.teamLeaders.forEach(tl => {
          members.push({ ...tl, branch: branch.name, branchId: branch.id });
          tl.consultants.forEach(c => {
            members.push({ ...c, branch: branch.name, branchId: branch.id });
          });
        });
      });
    });
    return members;
  };

  const allMembers = getAllMembers();
  const filteredMembers = selectedBranch === 'all' 
    ? allMembers 
    : allMembers.filter(m => m.branchId === selectedBranch);

  const getRoleColor = (role) => {
    const roleObj = hierarchy.find(h => h.role === role);
    return roleObj || { color: C.textSoft, bgColor: C.bg, icon: 'user' };
  };

  // Render org chart node
  const OrgNode = ({ person, isRoot = false, children }) => {
    const roleInfo = getRoleColor(person.role);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div 
          onClick={() => setSelectedMember(person)}
          style={{ 
            background: C.surface, 
            borderRadius: '12px', 
            padding: '16px 20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: `2px solid ${roleInfo.color}`,
            cursor: 'pointer',
            minWidth: '180px',
            textAlign: 'center',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: roleInfo.color,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
            fontSize: '16px',
            margin: '0 auto 10px'
          }}>
            {person.avatar}
          </div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: C.text, marginBottom: '4px' }}>{person.name}</div>
          <div style={{ 
            fontSize: '11px', 
            padding: '3px 10px', 
            background: roleBg(roleInfo), 
            color: roleInfo.color, 
            borderRadius: '10px',
            display: 'inline-block',
            fontWeight: '500'
          }}>
            {roleInfo.icon} {person.role}
          </div>
        </div>
        {children && (
          <>
            <div style={{ width: '2px', height: '20px', background: C.border }} />
            <div style={{ display: 'flex', gap: '20px', position: 'relative' }}>
              {Children.count(children) > 1 && (
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: `calc(100% - 180px)`,
                  height: '2px',
                  background: C.border
                }} />
              )}
              {children}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div style={{ background: C.bg, minHeight: '100%', padding: '32px', fontFamily: "'Roboto', sans-serif" }}>
      {/* Header — hidden when navigated from sidebar sub-item */}
      {!forceTab && (
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: C.text, marginBottom: '4px', letterSpacing: '-0.01em' }}>Settings</h1>
        <p style={{ fontSize: '13px', color: C.textSoft }}>
          Manage users, permissions, and preferences.
        </p>
      </div>
      )}

      {/* Stats Cards — hidden when showing single tab */}
      {!forceTab && (
      <div style={{ display: 'grid', gridTemplateColumns: filteredBranches.length === 1 ? '1fr' : `repeat(${Math.min(filteredBranches.length, 4)}, 1fr)`, gap: '20px', marginBottom: '24px' }}>
        {filteredBranches.map(branch => {
          const isSelected = selectedBranch === branch.id;
          return (
            <div key={branch.id} style={{
              background: isSelected ? `${branch.color}10` : C.surface,
              borderRadius: '12px',
              padding: '20px',
              border: isSelected ? `2px solid ${branch.color}` : '1px solid ${C.border}',
              cursor: filteredBranches.length > 1 ? 'pointer' : 'default',
              transition: 'all 0.2s',
              boxShadow: isSelected ? `0 4px 12px ${branch.color}30` : 'none'
            }}
            onClick={() => {
              if (filteredBranches.length > 1) {
                const newBranch = selectedBranch === branch.id ? 'all' : branch.id;
                setSelectedBranch(newBranch);
              }
            }}
            onMouseEnter={(e) => filteredBranches.length > 1 && !isSelected && (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')}
            onMouseLeave={(e) => !isSelected && (e.currentTarget.style.boxShadow = 'none')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '32px' }}>{branch.flag}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: C.text }}>{branch.country}</div>
                  <div style={{ fontSize: '12px', color: C.textSoft }}>{branch.name}</div>
                </div>
                {isSelected && (
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    background: branch.color, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <Check size={14} color="white" />
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '24px', fontWeight: '700', color: branch.color }}>{branch.teamCount}</span>
                <span style={{ fontSize: '12px', color: C.textSoft }}>Team Members</span>
              </div>
            </div>
          );
        })}
      </div>
      )}

      {/* Tabs — hidden when forceTab is set (navigated from sidebar sub-item) */}
      {!forceTab && (
      <div style={{ display: 'flex', gap: '8px', borderBottom: `1px solid ${C.border}`, marginBottom: '24px', background: C.surface, marginLeft: '-32px', marginRight: '-32px', paddingLeft: '32px', paddingRight: '32px' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const effectiveTab = forceTab || activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedMember(null);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 20px',
                background: 'transparent',
                border: 'none',
                borderBottom: effectiveTab === tab.id ? `2px solid ${C.primary}` : '2px solid transparent',
                marginBottom: '-1px',
                color: effectiveTab === tab.id ? C.primary : C.textSoft,
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              <Icon size={16} />
              {tab.id}
            </button>
          );
        })}
      </div>
      )}

      {/* Content */}
      <div style={{ background: C.surface, borderRadius: '12px', padding: '24px' }}>

        {/* BRANCHES TAB */}
        {/* TEAM MEMBERS TAB */}
        {(forceTab || activeTab) === 'Users' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: C.text }}>Users</h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                {currentUser?.role === 'System Admin' ? (
                  <select 
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    style={{ padding: '10px 16px', border: `1px solid ${C.border}`, borderRadius: '8px', fontSize: '14px' }}
                  >
                    <option value="all">All Branches</option>
                    {filteredBranches.map(b => (
                      <option key={b.id} value={b.id}>{b.flag} {b.name}</option>
                    ))}
                  </select>
                ) : (
                  <div style={{ padding: '10px 16px', background: C.primary10, borderRadius: '8px', fontSize: '14px', color: C.primary, fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {filteredBranches[0]?.flag} {filteredBranches[0]?.name} Branch
                  </div>
                )}
              </div>
            </div>

            {/* Custom Roles Users Section */}
            {customRoles.length > 0 && Object.values(branchEmptyPositions).flat().some(p => !p.isEmpty) && (
              <div style={{
                marginBottom: '24px',
                background: C.warnBg,
                border: `1px solid ${darkMode ? 'rgba(251,191,36,0.30)' : '#FDE68A'}`,
                borderRadius: '12px',
                padding: '16px 20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <UserPlus size={18} color="#D97706" />
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#92400E' }}>Custom Role Members</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {Object.entries(branchEmptyPositions).flatMap(([branchId, positions]) =>
                    positions
                      .filter(p => !p.isEmpty && p.person)
                      .map((pos, idx) => (
                        <div 
                          key={`${branchId}-${pos.roleId}-${idx}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 12px',
                            background: C.surface,
                            borderRadius: '8px',
                            border: `1px solid ${pos.color}`
                          }}
                        >
                          <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: pos.color,
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: '600'
                          }}>
                            {pos.person.avatar}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', fontWeight: '500', color: C.text }}>{pos.person.name}</div>
                            <div style={{ fontSize: '11px', color: C.textSoft }}>{pos.role} • {branches.find(b => b.id === branchId)?.name}</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemovePersonFromPosition(branchId, pos.roleId, pos.person.name);
                            }}
                            style={{
                              width: '22px',
                              height: '22px',
                              borderRadius: '50%',
                              background: C.dangerBg,
                              border: `1px solid ${darkMode ? 'rgba(248,113,113,0.40)' : '#FCA5A5'}`,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              opacity: 0.7,
                              transition: 'all 0.2s',
                              flexShrink: 0
                            }}
                            onMouseEnter={(e) => { 
                              e.currentTarget.style.opacity = '1'; 
                              e.currentTarget.style.background = '#FCA5A5'; 
                            }}
                            onMouseLeave={(e) => { 
                              e.currentTarget.style.opacity = '0.7'; 
                              e.currentTarget.style.background = C.dangerBg; 
                            }}
                            title={`Remove ${pos.person.name}`}
                          >
                            <X size={11} color="#DC2626" />
                          </button>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: C.bg }}>
                  <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: '12px', fontWeight: '600', color: C.textSoft, textTransform: 'uppercase' }}>User</th>
                  <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: '12px', fontWeight: '600', color: C.textSoft, textTransform: 'uppercase' }}>Role</th>
                  <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: '12px', fontWeight: '600', color: C.textSoft, textTransform: 'uppercase' }}>Branch</th>
                  <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: '12px', fontWeight: '600', color: C.textSoft, textTransform: 'uppercase' }}>Email</th>
                  <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: '12px', fontWeight: '600', color: C.textSoft, textTransform: 'uppercase' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => {
                  const roleInfo = hierarchy.find(h => h.role === member.role);
                  const roleLevel = roleInfo?.level || 4;
                  const isCustomRole = roleInfo?.isCustom || false;
                  return (
                    <tr key={member.id} style={{ borderTop: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: isCustomRole ? (roleInfo?.color || C.primary) : C.primary,
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '600',
                            fontSize: '14px'
                          }}>
                            {member.avatar}
                          </div>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: '500', color: C.text }}>{member.name}</div>
                            <div style={{ fontSize: '12px', color: C.textSoft }}>{member.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            background: isCustomRole ? (roleBg(roleInfo) || C.primary10) : C.primary10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {isCustomRole ? (
                              <UserPlus size={14} color={roleInfo?.color || C.primary} />
                            ) : (
                              <>
                                {roleLevel === 1 && <Shield size={14} color={C.primary} />}
                                {roleLevel === 2 && <BarChart2 size={14} color={C.primary} />}
                                {roleLevel === 3 && <Target size={14} color={C.primary} />}
                                {roleLevel === 4 && <Briefcase size={14} color={C.primary} />}
                              </>
                            )}
                          </div>
                          <div>
                            <span style={{
                              fontSize: '13px',
                              fontWeight: '500',
                              color: isCustomRole ? (roleInfo?.color || C.primary) : C.primary
                            }}>
                              {member.role}
                            </span>
                            {isCustomRole && (
                              <div style={{ fontSize: '10px', color: C.textSoft }}>Custom Role</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ fontSize: '14px', color: C.textSoft }}>
                          {branches.find(b => b.id === member.branchId)?.flag} {member.branch}
                        </span>
                      </td>
                      <td style={{ padding: '16px', color: C.textSoft, fontSize: '14px' }}>{member.email}</td>
                      <td style={{ padding: '16px' }}>
                        <button 
                          onClick={() => setSelectedMember(member)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textSoft }}
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}

        {/* PERMISSIONS TAB */}
        {(forceTab || activeTab) === 'Permissions' && (
          <>
            {/* Permission Sets Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: C.text }}>Permission Sets</h2>
                <p style={{ fontSize: '13px', color: C.textSoft, marginTop: '4px' }}>
                  Configure module access and granular permissions with logical dependencies
                </p>
              </div>
            </div>

            {/* Permission Set Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {Object.entries(permissionSets).map(([setName, setData]) => (
                <div 
                  key={setName}
                  onClick={() => setSelectedPermissionSet(setName)}
                  style={{
                    background: selectedPermissionSet === setName ? C.primary10 : C.surface,
                    borderRadius: '12px',
                    padding: '16px',
                    border: selectedPermissionSet === setName ? '2px solid #045D5E' : `1px solid ${C.border}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  {/* Edit Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRenamingPermissionSet(setName);
                      setRenamePermissionSetName(setName);
                    }}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: selectedPermissionSet === setName ? '36px' : '8px',
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: C.bg,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.7,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = C.border; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.background = C.bg; }}
                  >
                    <Edit2 size={14} color={C.textSoft} />
                  </button>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: setData.bgColor || C.primary10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Shield size={20} color={setData.color || C.primary} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0, paddingRight: '30px' }}>
                      <div style={{ 
                        fontSize: '14px', 
                        fontWeight: '600', 
                        color: C.text,
                        wordBreak: 'break-word'
                      }}>
                        {setName}
                      </div>
                      <div style={{ fontSize: '12px', color: C.textSoft, marginTop: '2px' }}>
                        {setData.description || 'Custom permission set'}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '11px', color: C.textVerySoft }}>
                    {Object.values(setData).filter(v => v === true).length} permissions enabled
                  </div>
                  {selectedPermissionSet === setName && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: C.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={12} color="white" />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Add New Permission Group Card */}
              <div 
                onClick={() => setShowCreatePermissionGroup(true)}
                style={{
                  background: C.surface,
                  borderRadius: '12px',
                  padding: '16px',
                  border: '2px dashed #D1D5DB',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '120px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.primary;
                  e.currentTarget.style.background = '#F0FDFA';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#D1D5DB';
                  e.currentTarget.style.background = C.surface;
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: C.primary10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <Plus size={24} color={C.primary} />
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: C.primary, textAlign: 'center' }}>
                  Add New Permission Group
                </div>
                <div style={{ fontSize: '11px', color: C.textSoft, marginTop: '4px', textAlign: 'center' }}>
                  Create custom permission set
                </div>
              </div>
            </div>

            {/* Granular Permissions Panel */}
            {selectedPermissionSet && permissionSets[selectedPermissionSet] && (
              <div style={{
                background: C.surface,
                borderRadius: '16px',
                border: `1px solid ${C.border}`,
                overflow: 'hidden'
              }}>
                {/* Header */}
                <div style={{
                  padding: '20px 24px',
                  borderBottom: `1px solid ${C.border}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: C.bg
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: permissionSets[selectedPermissionSet]?.bgColor || C.primary10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Shield size={22} color={permissionSets[selectedPermissionSet]?.color || C.primary} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', color: C.text }}>
                        {selectedPermissionSet}
                      </h3>
                      <p style={{ fontSize: '13px', color: C.textSoft }}>
                        {permissionSets[selectedPermissionSet]?.description || 'Configure permissions for this set'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowToast({ type: 'success', message: 'Permission set saved successfully!' });
                      setTimeout(() => setShowToast(null), 3000);
                    }}
                    style={{
                      padding: '10px 20px',
                      background: C.primary,
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Check size={16} />
                    Save Changes
                  </button>
                </div>

                {/* Legend */}
                <div style={{
                  padding: '12px 24px',
                  borderBottom: `1px solid ${C.border}`,
                  background: C.warnBg,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Info size={14} color="#CA8A04" />
                    <span style={{ fontSize: '12px', color: '#854D0E', fontWeight: '500' }}>Permission Logic:</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#7C3AED' }} />
                    <span style={{ fontSize: '11px', color: C.textSoft }}>Module Access (Sidebar)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: C.primary }} />
                    <span style={{ fontSize: '11px', color: C.textSoft }}>Base Permission (Required)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: C.textVerySoft }} />
                    <span style={{ fontSize: '11px', color: C.textSoft }}>Dependent (Requires others)</span>
                  </div>
                </div>

                {/* Content - Sidebar + Main Panel */}
                <div style={{ display: 'flex', minHeight: '550px' }}>
                  {/* Left Sidebar - Module Access */}
                  <div style={{
                    width: '280px',
                    borderRight: `1px solid ${C.border}`,
                    background: C.bg,
                    padding: '16px 0'
                  }}>
                    <div style={{ padding: '0 16px 12px', borderBottom: `1px solid ${C.border}`, marginBottom: '12px' }}>
                      <div style={{ fontSize: '11px', fontWeight: '600', color: C.textSoft, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Module Access (Sidebar Menu)
                      </div>
                    </div>
                    
                    {permissionCategories.map((category) => {
                      const CategoryIcon = category.icon;
                      const isSelected = selectedPermissionCategory === category.id;
                      const basePermission = category.permissions.find(p => p.isBase);
                      const moduleEnabled = getEffectivePermission(selectedPermissionSet, basePermission?.id);
                      const enabledCount = category.permissions.filter(p => 
                        getEffectivePermission(selectedPermissionSet, p.id)
                      ).length;
                      
                      return (
                        <div
                          key={category.id}
                          style={{
                            padding: '12px 16px',
                            background: isSelected ? C.surface : 'transparent',
                            borderLeft: isSelected ? '3px solid #045D5E' : '3px solid transparent',
                            borderRight: isSelected ? 'none' : 'none',
                            marginRight: isSelected ? '-1px' : '0',
                            transition: 'all 0.15s',
                            position: 'relative'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {/* Module Access Toggle */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const newValue = !moduleEnabled;
                                
                                // Update permissions
                                const updates = {};
                                if (!newValue) {
                                  category.permissions.forEach(p => {
                                    updates[p.id] = false;
                                  });
                                } else {
                                  updates[basePermission.id] = true;
                                }
                                setPermissionSets(prev => ({
                                  ...prev,
                                  [selectedPermissionSet]: {
                                    ...prev[selectedPermissionSet],
                                    ...updates
                                  }
                                }));
                              }}
                              style={{
                                width: '40px',
                                height: '22px',
                                borderRadius: '11px',
                                background: moduleEnabled ? '#7C3AED' : '#D1D5DB',
                                border: 'none',
                                cursor: 'pointer',
                                position: 'relative',
                                transition: 'background 0.2s',
                                flexShrink: 0
                              }}
                            >
                              <div style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                background: C.surface,
                                position: 'absolute',
                                top: '2px',
                                left: moduleEnabled ? '20px' : '2px',
                                transition: 'left 0.2s',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                              }} />
                            </button>
                            
                            <div 
                              onClick={() => setSelectedPermissionCategory(category.id)}
                              style={{ flex: 1, cursor: 'pointer' }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <CategoryIcon size={16} color={moduleEnabled ? (isSelected ? C.primary : C.text) : C.textVerySoft} />
                                <div style={{ 
                                  fontSize: '13px', 
                                  fontWeight: isSelected ? '600' : '500', 
                                  color: moduleEnabled ? (isSelected ? C.primary : C.text) : C.textVerySoft
                                }}>
                                  {category.sidebarMenu}
                                </div>
                              </div>
                              <div style={{ 
                                fontSize: '11px', 
                                color: moduleEnabled ? C.textSoft : C.textVerySoft,
                                marginTop: '2px',
                                marginLeft: '24px'
                              }}>
                                {moduleEnabled ? `${enabledCount}/${category.permissions.length} permissions` : 'Hidden from sidebar'}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Panel - Granular Permissions */}
                  <div style={{ flex: 1, padding: '20px 24px', overflowY: 'auto' }}>
                    {permissionCategories
                      .filter(cat => cat.id === selectedPermissionCategory)
                      .map((category) => {
                        const CategoryIcon = category.icon;
                        const basePermission = category.permissions.find(p => p.isBase);
                        const moduleEnabled = getEffectivePermission(selectedPermissionSet, basePermission?.id);
                        
                        return (
                          <div key={category.id}>
                            {/* Category Header */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginBottom: '20px',
                              paddingBottom: '16px',
                              borderBottom: `1px solid ${C.border}`
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '10px',
                                  background: moduleEnabled ? C.primary10 : C.bg,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  <CategoryIcon size={20} color={moduleEnabled ? C.primary : C.textVerySoft} />
                                </div>
                                <div>
                                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: moduleEnabled ? C.text : C.textVerySoft }}>
                                    {category.name}
                                  </h4>
                                  <p style={{ fontSize: '12px', color: moduleEnabled ? C.textSoft : C.textVerySoft }}>
                                    {category.description}
                                  </p>
                                </div>
                              </div>
                              
                              {!moduleEnabled && (
                                <div style={{
                                  padding: '8px 16px',
                                  background: C.dangerBg,
                                  border: `1px solid ${darkMode ? 'rgba(248,113,113,0.30)' : '#FECACA'}`,
                                  borderRadius: '8px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px'
                                }}>
                                  <AlertCircle size={16} color="#DC2626" />
                                  <span style={{ fontSize: '12px', color: '#DC2626', fontWeight: '500' }}>
                                    Module disabled - Enable "View" to access permissions
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Permission Toggles - Grouped by Dependency Level */}
                            <div style={{ opacity: moduleEnabled ? 1 : 0.5, pointerEvents: moduleEnabled ? 'auto' : 'none' }}>
                              {/* Base Permission (View) */}
                              <div style={{ marginBottom: '24px' }}>
                                <div style={{ 
                                  fontSize: '11px', 
                                  fontWeight: '600', 
                                  color: C.primary, 
                                  textTransform: 'uppercase', 
                                  letterSpacing: '0.5px',
                                  marginBottom: '12px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px'
                                }}>
                                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: C.primary }} />
                                  Base Permission (Required for all others)
                                </div>
                                
                                {category.permissions.filter(p => p.isBase).map((permission) => {
                                  const isEnabled = getEffectivePermission(selectedPermissionSet, permission.id);
                                  
                                  return (
                                    <div
                                      key={permission.id}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '16px 20px',
                                        background: isEnabled ? C.primary10 : C.bg,
                                        border: `2px solid ${isEnabled ? C.primary : C.border}`,
                                        borderRadius: '12px',
                                        transition: 'all 0.2s'
                                      }}
                                    >
                                      <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                          <Eye size={18} color={isEnabled ? C.primary : C.textSoft} />
                                          <span style={{ 
                                            fontSize: '15px', 
                                            fontWeight: '600', 
                                            color: isEnabled ? C.primary : C.textSoft
                                          }}>
                                            {permission.name}
                                          </span>
                                          <span style={{
                                            padding: '2px 8px',
                                            background: C.primary,
                                            color: 'white',
                                            borderRadius: '4px',
                                            fontSize: '9px',
                                            fontWeight: '700',
                                            textTransform: 'uppercase'
                                          }}>
                                            Required
                                          </span>
                                        </div>
                                        <div style={{ fontSize: '12px', color: C.textSoft, marginTop: '4px', marginLeft: '26px' }}>
                                          {permission.description} • Controls "{category.sidebarMenu}" menu visibility
                                        </div>
                                      </div>
                                      
                                      {/* Toggle Switch */}
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <button
                                          onClick={() => {
                                            const newValue = !isEnabled;
                                            
                                            const updates = { [permission.id]: newValue };
                                            if (!newValue) {
                                              category.permissions.forEach(p => {
                                                if (p.requires && p.requires.includes(permission.id)) {
                                                  updates[p.id] = false;
                                                }
                                              });
                                            }
                                            setPermissionSets(prev => ({
                                              ...prev,
                                              [selectedPermissionSet]: {
                                                ...prev[selectedPermissionSet],
                                                ...updates
                                              }
                                            }));
                                          }}
                                          style={{
                                            width: '52px',
                                            height: '28px',
                                            borderRadius: '14px',
                                            background: isEnabled ? C.primary : '#D1D5DB',
                                            border: 'none',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            transition: 'background 0.2s',
                                            flexShrink: 0
                                          }}
                                        >
                                          <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            background: C.surface,
                                            position: 'absolute',
                                            top: '2px',
                                            left: isEnabled ? '26px' : '2px',
                                            transition: 'left 0.2s',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                          }} />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Dependent Permissions */}
                              <div>
                                <div style={{ 
                                  fontSize: '11px', 
                                  fontWeight: '600', 
                                  color: C.textSoft, 
                                  textTransform: 'uppercase', 
                                  letterSpacing: '0.5px',
                                  marginBottom: '12px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px'
                                }}>
                                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: C.textVerySoft }} />
                                  Granular Permissions (Depends on Base)
                                </div>
                                
                                <div style={{ 
                                  display: 'grid', 
                                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                                  gap: '12px' 
                                }}>
                                  {category.permissions.filter(p => !p.isBase).map((permission) => {
                                    const isEnabled = getEffectivePermission(selectedPermissionSet, permission.id);
                                    
                                    // Build effective permissions object for dependency check
                                    const effectivePerms = {};
                                    category.permissions.forEach(p => {
                                      effectivePerms[p.id] = getEffectivePermission(selectedPermissionSet, p.id);
                                    });
                                    const dependenciesMet = checkPermissionDependencies(permission.id, effectivePerms);
                                    
                                    return (
                                      <div
                                        key={permission.id}
                                        style={{
                                          display: 'flex',
                                          alignItems: 'flex-start',
                                          justifyContent: 'space-between',
                                          padding: '14px 16px',
                                          background: !dependenciesMet ? C.bg : (isEnabled ? '#F0FDFA' : C.surface),
                                          border: `1px solid ${!dependenciesMet ? C.border : (isEnabled ? '#99F6E4' : C.border)}`,
                                          borderRadius: '10px',
                                          transition: 'all 0.2s',
                                          opacity: dependenciesMet ? 1 : 0.6,
                                          position: 'relative'
                                        }}
                                      >
                                        <div style={{ flex: 1 }}>
                                          <div style={{ 
                                            fontSize: '14px', 
                                            fontWeight: '500', 
                                            color: dependenciesMet ? (isEnabled ? C.text : C.textSoft) : C.textVerySoft,
                                            marginBottom: '4px'
                                          }}>
                                            {permission.name}
                                          </div>
                                          <div style={{ fontSize: '11px', color: C.textVerySoft, marginBottom: '6px' }}>
                                            {permission.description}
                                          </div>
                                          
                                          {/* Dependency Info */}
                                          {permission.requires && (
                                            <div style={{ 
                                              display: 'flex', 
                                              alignItems: 'center', 
                                              gap: '4px',
                                              flexWrap: 'wrap'
                                            }}>
                                              <span style={{ fontSize: '10px', color: dependenciesMet ? '#059669' : '#DC2626' }}>
                                                Requires:
                                              </span>
                                              {permission.requires.map((reqId) => {
                                                const reqPerm = category.permissions.find(p => p.id === reqId);
                                                const reqMet = getEffectivePermission(selectedPermissionSet, reqId);
                                                return (
                                                  <span 
                                                    key={reqId}
                                                    style={{ 
                                                      fontSize: '10px', 
                                                      padding: '1px 6px',
                                                      borderRadius: '4px',
                                                      background: reqMet ? C.successBg : C.dangerBg,
                                                      color: reqMet ? '#065F46' : '#DC2626'
                                                    }}
                                                  >
                                                    {reqPerm?.name || reqId}
                                                  </span>
                                                );
                                              })}
                                            </div>
                                          )}
                                        </div>
                                        
                                        {/* Toggle Switch */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '8px' }}>
                                          <button
                                            onClick={() => {
                                              if (!dependenciesMet) return;
                                              
                                              const newValue = !isEnabled;
                                              
                                              const updates = { [permission.id]: newValue };
                                              if (!newValue) {
                                                const dependents = getDependentPermissions(permission.id, category.id);
                                                dependents.forEach(depId => {
                                                  updates[depId] = false;
                                                });
                                              }
                                              setPermissionSets(prev => ({
                                                ...prev,
                                                [selectedPermissionSet]: {
                                                  ...prev[selectedPermissionSet],
                                                  ...updates
                                                }
                                              }));
                                            }}
                                            disabled={!dependenciesMet}
                                            style={{
                                              width: '44px',
                                              height: '24px',
                                              borderRadius: '12px',
                                              background: !dependenciesMet ? C.border : (isEnabled ? C.primary : '#D1D5DB'),
                                              border: 'none',
                                              cursor: dependenciesMet ? 'pointer' : 'not-allowed',
                                              position: 'relative',
                                              transition: 'background 0.2s',
                                              flexShrink: 0
                                            }}
                                          >
                                            <div style={{
                                              width: '20px',
                                              height: '20px',
                                              borderRadius: '50%',
                                              background: C.surface,
                                              position: 'absolute',
                                              top: '2px',
                                              left: isEnabled && dependenciesMet ? '22px' : '2px',
                                              transition: 'left 0.2s',
                                              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                            }} />
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* SETTINGS TAB */}
        {(forceTab || activeTab) === 'Timezone Settings' && (
          <>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: C.text, marginBottom: '24px' }}>
              {currentUser?.role === 'System Admin' ? 'Team Settings' : `${filteredBranches[0]?.name || 'Branch'} Settings`}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: C.bg, borderRadius: '12px', padding: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: C.text, marginBottom: '16px' }}>
                  {currentUser?.role === 'System Admin' ? 'Organization Details' : 'Branch Details'}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '13px', color: C.textSoft, display: 'block', marginBottom: '6px' }}>
                      {currentUser?.role === 'System Admin' ? 'Organization Name' : 'Branch Name'}
                    </label>
                    <input type="text" defaultValue={currentUser?.role === 'System Admin' ? 'UAPP Education' : filteredBranches[0]?.name} style={{ width: '100%', padding: '10px 12px', border: `1px solid ${C.border}`, borderRadius: '8px', fontSize: '14px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', color: C.textSoft, display: 'block', marginBottom: '6px' }}>
                      {currentUser?.role === 'System Admin' ? 'Headquarters' : 'Location'}
                    </label>
                    <input type="text" defaultValue={currentUser?.role === 'System Admin' ? 'London, United Kingdom' : filteredBranches[0]?.address} style={{ width: '100%', padding: '10px 12px', border: `1px solid ${C.border}`, borderRadius: '8px', fontSize: '14px' }} />
                  </div>
                </div>
              </div>
              <div style={{ background: C.bg, borderRadius: '12px', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Clock size={18} color={C.primary} />
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: C.text }}>
                    {currentUser?.role === 'System Admin' ? 'Time Zones' : 'Branch Time Zone'}
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {filteredBranches.map(branch => (
                    <div key={branch.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      background: C.surface,
                      borderRadius: '10px',
                      border: `1px solid ${C.border}`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '24px' }}>{branch.flag}</span>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '500', color: C.text }}>{branch.name}</div>
                          <div style={{ fontSize: '12px', color: C.textSoft }}>{branch.address}</div>
                        </div>
                      </div>
                      <div style={{
                        padding: '8px 14px',
                        background: C.primary10,
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '500',
                        color: C.primary
                      }}>
                        {branch.timezone}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Member Detail Sidebar */}
      {selectedMember && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '400px',
          background: C.surface,
          boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
          zIndex: 1000,
          overflowY: 'auto'
        }}>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: C.text }}>Member Details</h3>
              <button onClick={() => setSelectedMember(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color={C.textSoft} />
              </button>
            </div>

            {/* Profile */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: getRoleColor(selectedMember.role).color,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '28px',
                margin: '0 auto 16px'
              }}>
                {selectedMember.avatar}
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: '600', color: C.text, marginBottom: '4px' }}>{selectedMember.name}</h4>
              <span style={{
                padding: '6px 14px',
                background: roleBg(getRoleColor(selectedMember.role)),
                color: getRoleColor(selectedMember.role).color,
                borderRadius: '16px',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                {getRoleColor(selectedMember.role).icon} {selectedMember.role}
              </span>
            </div>

            {/* Info Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Email', value: selectedMember.email, icon: Mail },
                { label: 'Phone', value: selectedMember.phone, icon: Phone },
                { label: 'Branch', value: selectedMember.branch, icon: Globe },
                { label: 'Joined', value: selectedMember.joinDate, icon: CalendarSolid },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: C.bg, borderRadius: '8px' }}>
                  <item.icon size={18} color={C.textSoft} />
                  <div>
                    <div style={{ fontSize: '11px', color: C.textSoft, marginBottom: '2px' }}>{item.label}</div>
                    <div style={{ fontSize: '14px', color: C.text }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                onClick={() => setEditingUserPermissions(selectedMember)}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  background: '#7C3AED', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Shield size={16} />
                Edit Permissions
              </button>
              <button 
                onClick={() => {
                  setShowToast({ type: 'info', message: `Editing ${selectedMember.name}...` });
                  setTimeout(() => setShowToast(null), 2000);
                }}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  background: C.primary, 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Edit2 size={16} />
                Edit Member
              </button>
              <button 
                onClick={() => {
                  setPendingConfirm({
                    title: `Remove ${selectedMember.name} from team?`,
                    body: `${selectedMember.name} will lose access to team resources. You can re-invite them later.`,
                    confirmLabel: "Remove from team",
                    confirmDanger: true,
                    onConfirm: () => {
                      setShowToast({ type: 'success', message: `${selectedMember.name} has been removed from the team.` });
                      setTimeout(() => setShowToast(null), 3000);
                      setSelectedMember(null);
                      setPendingConfirm(null);
                    },
                  });
                }}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  background: C.surface, 
                  color: "#EF4444", 
                  border: `1px solid ${darkMode ? 'rgba(248,113,113,0.40)' : '#FCA5A5'}`, 
                  borderRadius: '8px', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Trash2 size={16} />
                Remove from Team
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User-Specific Permissions Modal */}
      {editingUserPermissions && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: C.surface,
            borderRadius: '16px',
            width: '900px',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
          }}>
            {/* Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: `1px solid ${C.border}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: C.bg
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: getRoleColor(editingUserPermissions.role).color,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  fontSize: '18px'
                }}>
                  {editingUserPermissions.avatar}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: C.text }}>
                    {editingUserPermissions.name}'s Permissions
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <span style={{
                      padding: '3px 10px',
                      background: roleBg(getRoleColor(editingUserPermissions.role)),
                      color: getRoleColor(editingUserPermissions.role).color,
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {editingUserPermissions.role}
                    </span>
                    <span style={{ fontSize: '13px', color: C.textSoft }}>
                      • {editingUserPermissions.branch}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => {
                    setShowToast({ type: 'success', message: `Permissions saved for ${editingUserPermissions.name}!` });
                    setTimeout(() => setShowToast(null), 3000);
                  }}
                  style={{
                    padding: '10px 20px',
                    background: C.primary,
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Check size={16} />
                  Save Permissions
                </button>
                <button
                  onClick={() => setEditingUserPermissions(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
                >
                  <X size={20} color={C.textSoft} />
                </button>
              </div>
            </div>

            {/* Info Banner */}
            <div style={{
              padding: '12px 24px',
              background: darkMode ? 'rgba(14,165,233,0.16)' : '#E0F2FE',
              borderBottom: `1px solid ${darkMode ? 'rgba(14,165,233,0.32)' : '#7DD3FC'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Info size={16} color={darkMode ? '#7DD3FC' : '#0369A1'} />
              <span style={{ fontSize: '13px', color: darkMode ? '#BAE6FD' : '#0C4A6E' }}>
                <strong>Role default:</strong> {editingUserPermissions.role} → <strong>{userTypePermissions[editingUserPermissions.role] || 'Basic Access'}</strong>. 
                {userPermissions[editingUserPermissions.id]?.permissionSet ? (
                  <span style={{ color: '#B45309' }}> This user has a custom override.</span>
                ) : (
                  ' Using role default.'
                )}
              </span>
            </div>

            {/* Permission Set Selector */}
            <div style={{
              padding: '16px 24px',
              borderBottom: `1px solid ${C.border}`,
              background: C.bg
            }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: C.text, marginBottom: '12px' }}>
                Permission Set Assignment
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Use Role Default Button */}
                <button
                  onClick={() => {
                    setUserPermissions(prev => {
                      const updated = { ...prev };
                      if (updated[editingUserPermissions.id]) {
                        delete updated[editingUserPermissions.id].permissionSet;
                        // Clean up if no other overrides
                        if (Object.keys(updated[editingUserPermissions.id]).length === 0) {
                          delete updated[editingUserPermissions.id];
                        }
                      }
                      return updated;
                    });
                    setShowToast({ type: 'success', message: `Now using role default (${userTypePermissions[editingUserPermissions.role] || 'Basic Access'})` });
                    setTimeout(() => setShowToast(null), 3000);
                  }}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '10px',
                    border: !userPermissions[editingUserPermissions.id]?.permissionSet ? '2px solid #045D5E' : '1px solid #D1D5DB',
                    background: !userPermissions[editingUserPermissions.id]?.permissionSet ? C.primary10 : C.surface,
                    color: !userPermissions[editingUserPermissions.id]?.permissionSet ? C.primary : C.textSoft,
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <RotateCcw size={14} />
                  Use Role Default
                  {!userPermissions[editingUserPermissions.id]?.permissionSet && (
                    <Check size={14} />
                  )}
                </button>
                
                <div style={{ width: '1px', height: '28px', background: C.border, margin: '0 4px' }} />
                
                {Object.entries(permissionSets).map(([setName, setData]) => {
                  const isSelected = userPermissions[editingUserPermissions.id]?.permissionSet === setName;
                  const isRoleDefault = userTypePermissions[editingUserPermissions.role] === setName;
                  
                  return (
                    <button
                      key={setName}
                      onClick={() => {
                        setUserPermissions(prev => ({
                          ...prev,
                          [editingUserPermissions.id]: {
                            ...(prev[editingUserPermissions.id] || {}),
                            permissionSet: setName
                          }
                        }));
                      }}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '10px',
                        border: isSelected ? `2px solid ${setData.color}` : '1px solid #D1D5DB',
                        background: isSelected ? setData.bgColor : C.surface,
                        color: isSelected ? setData.color : C.text,
                        fontSize: '13px',
                        fontWeight: isSelected ? '600' : '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.15s',
                        position: 'relative'
                      }}
                    >
                      {isSelected && <Check size={14} />}
                      {setName}
                      {isRoleDefault && (
                        <span style={{ 
                          padding: '2px 6px', 
                          background: isSelected ? 'rgba(255,255,255,0.5)' : C.bg, 
                          color: isSelected ? setData.color : C.textSoft, 
                          borderRadius: '4px', 
                          fontSize: '9px',
                          fontWeight: '700',
                          marginLeft: '2px'
                        }}>
                          ROLE DEFAULT
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: '600', 
                color: C.textSoft, 
                textTransform: 'uppercase',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{ width: '20px', height: '1px', background: C.border }} />
                Individual Permission Overrides
                <div style={{ flex: 1, height: '1px', background: C.border }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                {permissionCategories.map(category => {
                  const userPerms = userPermissions[editingUserPermissions.id] || {};
                  // Use individual override if set, otherwise use role default
                  const selectedSet = userPerms.permissionSet || userTypePermissions[editingUserPermissions.role] || 'Basic Access';
                  const setPerms = permissionSets[selectedSet] || {};
                  
                  return (
                    <div key={category.id} style={{
                      background: C.surface,
                      borderRadius: '12px',
                      border: `1px solid ${C.border}`,
                      overflow: 'hidden'
                    }}>
                      {/* Category Header */}
                      <div style={{
                        padding: '14px 16px',
                        background: C.bg,
                        borderBottom: `1px solid ${C.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <category.icon size={18} color={C.primary} />
                        <span style={{ fontSize: '14px', fontWeight: '600', color: C.text }}>
                          {category.name}
                        </span>
                      </div>
                      
                      {/* Permissions */}
                      <div style={{ padding: '12px 16px' }}>
                        {category.permissions.map(perm => {
                          const permId = `${category.id}_${perm.id}`;
                          const hasUserOverride = userPerms[permId] !== undefined;
                          const effectiveValue = hasUserOverride ? userPerms[permId] : (setPerms[perm.id] ?? false);
                          
                          return (
                            <div key={perm.id} style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '10px 0',
                              borderBottom: '1px solid #F3F4F6'
                            }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ 
                                  fontSize: '13px', 
                                  fontWeight: '500', 
                                  color: C.text,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px'
                                }}>
                                  {perm.name}
                                  {hasUserOverride && (
                                    <span style={{
                                      padding: '1px 5px',
                                      background: C.warnBg,
                                      color: '#D97706',
                                      fontSize: '9px',
                                      fontWeight: '700',
                                      borderRadius: '3px'
                                    }}>
                                      OVERRIDE
                                    </span>
                                  )}
                                </div>
                                {!hasUserOverride && (
                                  <div style={{ fontSize: '11px', color: C.textVerySoft, marginTop: '2px' }}>
                                    From {userPerms.permissionSet ? 'override' : 'role default'} ({selectedSet}): {setPerms[perm.id] ? 'Enabled' : 'Disabled'}
                                  </div>
                                )}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {hasUserOverride && (
                                  <button
                                    onClick={() => {
                                      setUserPermissions(prev => {
                                        const updated = { ...prev };
                                        if (updated[editingUserPermissions.id]) {
                                          delete updated[editingUserPermissions.id][permId];
                                        }
                                        return updated;
                                      });
                                    }}
                                    style={{
                                      padding: '4px 8px',
                                      background: C.dangerBg,
                                      border: 'none',
                                      borderRadius: '4px',
                                      fontSize: '10px',
                                      color: '#DC2626',
                                      cursor: 'pointer',
                                      fontWeight: '500'
                                    }}
                                  >
                                    Reset
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    setUserPermissions(prev => ({
                                      ...prev,
                                      [editingUserPermissions.id]: {
                                        ...(prev[editingUserPermissions.id] || {}),
                                        [permId]: !effectiveValue
                                      }
                                    }));
                                  }}
                                  style={{
                                    width: '44px',
                                    height: '24px',
                                    borderRadius: '12px',
                                    background: effectiveValue ? (hasUserOverride ? '#F59E0B' : C.primary) : '#D1D5DB',
                                    border: 'none',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    transition: 'background 0.2s'
                                  }}
                                >
                                  <div style={{
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    background: 'white',
                                    position: 'absolute',
                                    top: '3px',
                                    left: effectiveValue ? '23px' : '3px',
                                    transition: 'left 0.2s',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                  }} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create New Permission Group Modal */}
      {showCreatePermissionGroup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: C.surface,
            borderRadius: '16px',
            width: '480px',
            maxHeight: '85vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
          }}>
            {/* Header */}
            <div style={{
              padding: '24px',
              borderBottom: `1px solid ${C.border}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: C.bg
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #045D5E 0%, #0D9488 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Shield size={22} color="white" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: C.text }}>Create Permission Group</h3>
                  <p style={{ fontSize: '13px', color: C.textSoft }}>Create a new set of permissions</p>
                </div>
              </div>
              <button
                onClick={() => { setShowCreatePermissionGroup(false); setNewPermissionGroupName(''); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
              >
                <X size={20} color={C.textSoft} />
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: C.text, marginBottom: '8px' }}>
                  Permission Group Name <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Marketing Team, Admin Limited, Custom Access"
                  value={newPermissionGroupName}
                  onChange={(e) => setNewPermissionGroupName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: C.text, marginBottom: '8px' }}>
                  Color Theme
                </label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[
                    { color: C.primary, bg: C.primary10 },
                    { color: '#2563EB', bg: '#DBEAFE' },
                    { color: '#7C3AED', bg: '#EDE9FE' },
                    { color: '#059669', bg: C.successBg },
                    { color: '#DC2626', bg: C.dangerBg },
                    { color: '#EA580C', bg: '#FFEDD5' },
                    { color: '#CA8A04', bg: '#FEF9C3' },
                    { color: C.textSoft, bg: C.bg }
                  ].map(({ color, bg }) => (
                    <button
                      key={color}
                      onClick={() => setNewPermissionGroupColor(color)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: bg,
                        border: newPermissionGroupColor === color ? `3px solid ${color}` : '2px solid ${C.border}',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {newPermissionGroupColor === color && <Check size={16} color={color} />}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{
                padding: '16px',
                background: '#F0FDFA',
                borderRadius: '12px',
                border: '1px solid #99F6E4'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Info size={16} color="#0D9488" />
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#115E59' }}>After Creation</span>
                </div>
                <p style={{ fontSize: '12px', color: '#0F766E', lineHeight: '1.5' }}>
                  Once created, you can configure individual permissions for this group by clicking on the card. 
                  Users can then be assigned to this permission group.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: '20px 24px',
              borderTop: `1px solid ${C.border}`,
              display: 'flex',
              gap: '12px',
              background: C.bg
            }}>
              <button
                onClick={() => { setShowCreatePermissionGroup(false); setNewPermissionGroupName(''); }}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  background: C.surface,
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: C.text,
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newPermissionGroupName.trim()) return;
                  
                  const colorMap = {
                    '#045D5E': '#E8F5F5',
                    '#2563EB': '#DBEAFE',
                    '#7C3AED': '#EDE9FE',
                    '#059669': C.successBg,
                    '#DC2626': '#FEE2E2',
                    '#EA580C': '#FFEDD5',
                    '#CA8A04': '#FEF9C3',
                    '#6B7280': '#F3F4F6'
                  };
                  
                  setPermissionSets(prev => ({
                    ...prev,
                    [newPermissionGroupName]: {
                      id: newPermissionGroupName.toLowerCase().replace(/\s+/g, '-'),
                      name: newPermissionGroupName,
                      description: 'Custom permission group',
                      color: newPermissionGroupColor,
                      bgColor: colorMap[newPermissionGroupColor] || C.primary10,
                      // Default all permissions to false (admin grants them after)
                      chats_view: false, chats_sendDm: false, chats_sendGroup: false,
                      chats_createDm: false, chats_createGroup: false, chats_manageMembers: false,
                      chats_pin: false, chats_archive: false, chats_delete: false,
                      chats_sharePost: false, chats_react: false,
                      bookings_view: false, bookings_create: false, bookings_createGroup: false,
                      bookings_respond: false, bookings_cancelOwn: false, bookings_cancelAny: false,
                      bookings_availability: false,
                      feed_view: false, feed_create: false, feed_templates: false,
                      feed_pin: false, feed_schedule: false, feed_react: false, feed_comment: false,
                      feed_bookmark: false, feed_share: false, feed_deleteOwn: false, feed_deleteAny: false,
                      team_view: false, team_viewBranches: false, team_manageUsers: false,
                      team_changeRoles: false, team_managePermissions: false, team_viewReports: false,
                      settings_view: false, settings_archive: false, settings_saved: false, settings_appearance: false,
                    }
                  }));
                  
                  setSelectedPermissionSet(newPermissionGroupName);
                  setShowCreatePermissionGroup(false);
                  setNewPermissionGroupName('');
                  setShowToast({ type: 'success', message: `Permission group "${newPermissionGroupName}" created!` });
                  setTimeout(() => setShowToast(null), 3000);
                }}
                disabled={!newPermissionGroupName.trim()}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  background: newPermissionGroupName.trim() ? C.primary : '#D1D5DB',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: 'white',
                  cursor: newPermissionGroupName.trim() ? 'pointer' : 'not-allowed',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Plus size={18} />
                Create Permission Group
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rename Permission Set Modal */}
      {renamingPermissionSet && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: C.surface,
            borderRadius: '16px',
            width: '420px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
          }}>
            {/* Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: `1px solid ${C.border}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: C.bg
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: permissionSets[renamingPermissionSet]?.bgColor || C.primary10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Edit2 size={20} color={permissionSets[renamingPermissionSet]?.color || C.primary} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: C.text }}>Rename Permission Set</h3>
                  <p style={{ fontSize: '12px', color: C.textSoft }}>Change the name of this permission set</p>
                </div>
              </div>
              <button
                onClick={() => { setRenamingPermissionSet(null); setRenamePermissionSetName(''); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
              >
                <X size={20} color={C.textSoft} />
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: C.text, marginBottom: '8px' }}>
                  Current Name
                </label>
                <div style={{
                  padding: '10px 14px',
                  background: C.bg,
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: C.textSoft
                }}>
                  {renamingPermissionSet}
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: C.text, marginBottom: '8px' }}>
                  New Name <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter new name"
                  value={renamePermissionSetName}
                  onChange={(e) => setRenamePermissionSetName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  autoFocus
                />
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: '16px 24px',
              borderTop: `1px solid ${C.border}`,
              display: 'flex',
              gap: '12px',
              background: C.bg
            }}>
              <button
                onClick={() => { setRenamingPermissionSet(null); setRenamePermissionSetName(''); }}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  background: C.surface,
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: C.text,
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!renamePermissionSetName.trim() || renamePermissionSetName === renamingPermissionSet) {
                    setRenamingPermissionSet(null);
                    setRenamePermissionSetName('');
                    return;
                  }
                  
                  // Check if name already exists
                  if (permissionSets[renamePermissionSetName]) {
                    setShowToast({ type: 'error', message: 'A permission set with this name already exists!' });
                    setTimeout(() => setShowToast(null), 3000);
                    return;
                  }
                  
                  // Rename the permission set
                  setPermissionSets(prev => {
                    const { [renamingPermissionSet]: oldSet, ...rest } = prev;
                    return {
                      ...rest,
                      [renamePermissionSetName]: {
                        ...oldSet,
                        name: renamePermissionSetName
                      }
                    };
                  });
                  
                  // Update selected if it was the renamed one
                  if (selectedPermissionSet === renamingPermissionSet) {
                    setSelectedPermissionSet(renamePermissionSetName);
                  }
                  
                  setShowToast({ type: 'success', message: `Permission set renamed to "${renamePermissionSetName}"` });
                  setTimeout(() => setShowToast(null), 3000);
                  setRenamingPermissionSet(null);
                  setRenamePermissionSetName('');
                }}
                disabled={!renamePermissionSetName.trim() || renamePermissionSetName === renamingPermissionSet}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  background: renamePermissionSetName.trim() && renamePermissionSetName !== renamingPermissionSet ? C.primary : '#D1D5DB',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: 'white',
                  cursor: renamePermissionSetName.trim() && renamePermissionSetName !== renamingPermissionSet ? 'pointer' : 'not-allowed',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Check size={16} />
                Rename
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Add Person to Empty Position Modal */}
      {showAddPersonModal && selectedEmptyPosition && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: C.surface,
            borderRadius: '16px',
            width: '480px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '24px',
              borderBottom: `1px solid ${C.border}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: selectedEmptyPosition.bgColor || C.bg
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: C.surface,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <UserPlus size={22} color={selectedEmptyPosition.color || C.primary} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: C.text }}>Add {selectedEmptyPosition.role}</h3>
                  <p style={{ fontSize: '13px', color: C.textSoft }}>
                    {branches.find(b => b.id === selectedEmptyPosition.branchId)?.name || 'Branch'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setShowAddPersonModal(false); setSelectedEmptyPosition(null); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
              >
                <X size={20} color={C.textSoft} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: C.text, marginBottom: '8px' }}>
                    First Name <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={newPersonData.firstName}
                    onChange={(e) => setNewPersonData({ ...newPersonData, firstName: e.target.value })}
                    placeholder="John"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: C.text, marginBottom: '8px' }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={newPersonData.lastName}
                    onChange={(e) => setNewPersonData({ ...newPersonData, lastName: e.target.value })}
                    placeholder="Doe"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: C.text, marginBottom: '8px' }}>
                  Email Address <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="email"
                  value={newPersonData.email}
                  onChange={(e) => setNewPersonData({ ...newPersonData, email: e.target.value })}
                  placeholder="john.doe@uapp.com"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '20px 24px',
              borderTop: `1px solid ${C.border}`,
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              background: C.bg
            }}>
              <button
                onClick={() => { setShowAddPersonModal(false); setSelectedEmptyPosition(null); }}
                style={{
                  padding: '10px 20px',
                  background: C.surface,
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: C.text,
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddPersonToPosition}
                disabled={!newPersonData.firstName.trim() || !newPersonData.email.trim()}
                style={{
                  padding: '10px 24px',
                  background: newPersonData.firstName.trim() && newPersonData.email.trim() ? C.primary : '#D1D5DB',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: 'white',
                  cursor: newPersonData.firstName.trim() && newPersonData.email.trim() ? 'pointer' : 'not-allowed',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <UserPlus size={16} />
                Add Person
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification — restyled to match Comms Hub (bottom-center, dark pill) */}
      {showToast && (
        <div className="fade-up" style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 18px',
          background: C.text,
          color: C.surface,
          borderRadius: T.radMd,
          fontSize: 12,
          fontWeight: 600,
          boxShadow: '0 8px 24px rgba(13,31,31,0.30)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: "'Roboto', sans-serif",
        }}>
          {showToast.type === 'success'
            ? <CheckCircle size={14} color="#34D399" />
            : showToast.type === 'error'
              ? <AlertCircle size={14} color="#FB7185" />
              : <Info size={14} color="#60A5FA" />}
          {showToast.message}
        </div>
      )}

      {/* Branded confirm dialog — replaces native confirm() */}
      {pendingConfirm && (
        <div
          onClick={() => setPendingConfirm(null)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(13,31,31,0.50)",
            zIndex: 4000,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20,
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="fade-up"
            style={{
              width: "100%", maxWidth: 380,
              background: C.surface, borderRadius: T.radLg,
              boxShadow: "0 24px 64px rgba(13,31,31,0.30)",
              padding: "22px 22px 18px",
            }}
          >
            <div style={{ fontSize: T.fontMd, fontWeight: 700, color: C.text, marginBottom: 6 }}>
              {pendingConfirm.title}
            </div>
            <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.55, marginBottom: 18 }}>
              {pendingConfirm.body}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button
                onClick={() => setPendingConfirm(null)}
                style={{
                  padding: "8px 14px", borderRadius: 8,
                  background: "transparent", color: C.textMid,
                  border: "1px solid #E5E7EB",
                  fontSize: 12, fontWeight: 600, cursor: "pointer",
                }}
              >Cancel</button>
              <button
                onClick={pendingConfirm.onConfirm}
                style={{
                  padding: "8px 14px", borderRadius: 8,
                  background: pendingConfirm.confirmDanger ? "#C73E3E" : C.primary,
                  color: "#fff",
                  fontSize: 12, fontWeight: 700, cursor: "pointer",
                  border: "none",
                }}
              >{pendingConfirm.confirmLabel || "Confirm"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── TeamManagementApp — wraps UserManagementModule with built-in mock data ─── */
function TeamManagementApp({ darkMode = false, forceTab = null }) {
  return <UserManagementModule currentUser={mockCurrentUser} londonBranchUsers={mockLondonBranchUsers} darkMode={darkMode} forceTab={forceTab} />;
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function CommunicationHubCore() {
  // ─── Top-level navigation ───
  const [activePage, setActivePage] = useState("communication-hub"); // dashboard | communication-hub | commission-promotional | ...

  // ─── App launcher state — controls which UAPP application is active ───
  // Defaults to "comms" so the user lands directly on the Communication Hub app.
  // crm/comms route to the existing flows; others render placeholder screens.
  const [currentApp, setCurrentApp] = useState("comms");
  const [showAppLauncher, setShowAppLauncher] = useState(false);
  const appLauncherRef = useRef(null);

  // ─── Group member management UI state ───
  const [showMembersPanel, setShowMembersPanel] = useState(false);
  const [memberMenuOpen, setMemberMenuOpen] = useState(null); // userId or null
  const [showAddMemberPicker, setShowAddMemberPicker] = useState(false);
  // Lifted so the inline Add Member panel inside Manage Members can use it.
  // Resets to "" whenever the picker is closed (handled by setShowAddMemberPicker callers).
  const [pickerSearch, setPickerSearch] = useState("");
  const [memberToast, setMemberToast] = useState(null); // { text, kind }
  const [confirmLeaveGroup, setConfirmLeaveGroup] = useState(false);

  // Staged draft of members + admins while the manage-members modal is open.
  // Lifted to component scope (instead of inside the modal) to avoid hook-order
  // issues since the modal is rendered as a function call.
  const [draftMembers, setDraftMembers] = useState([]);
  const [draftAdmins, setDraftAdmins] = useState([]);
  const [draftGroupId, setDraftGroupId] = useState(null);

  // ─── Per-user member-event notifications (added/removed/made-admin) ───
  // Each entry: { id, toUserId, fromUserId, groupId, type, time, dismissed }
  // type: "added" | "removed" | "made_admin" | "removed_admin"
  const [memberEvents, setMemberEvents] = useState([]);
  // Which sidebar parent items are expanded to show sub-items
  const [expandedSidebarGroups, setExpandedSidebarGroups] = useState({}); // { commission: true, ... }
  const [hubFeature, setHubFeature] = useState("chats"); // chats | calendar
  const [settingsSubItem, setSettingsSubItem] = useState("settings-users"); // which settings sub-item is active
  // ── Webhooks page state (lifted here because WebhooksPage is conditionally called) ──
  const [whTab, setWhTab] = useState("applications");
  const [whDrawer, setWhDrawer] = useState(null);
  const [whToast, setWhToast] = useState(null);
  const [whSearch, setWhSearch] = useState("");

  // ─── Chat state ───
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [favouritesByUser, setFavouritesByUser] = useState({
    // Shamim has marked his frequent contacts as favourites
    "u-shamim": { "u-md-shamim": true, "u-andreea": true, "g-leadership": true, "g-marketing": true },
    // Md Shamim too
    "u-md-shamim": { "u-andreea": true, "u-laura": true, "g-sept-intake-2026": true },
    // Raj
    "u-raj": { "u-jennifer": true, "g-uk-visa-help": true },
  });
  const [hiddenByUser, setHiddenByUser] = useState({}); // { [viewerId]: { [contactId]: true } } — "delete chat"
  const [pinnedByUser, setPinnedByUser] = useState({
    // Shamim pins his most-used groups + 1 DM
    "u-shamim": { "g-leadership": true, "u-md-shamim": true },
    // Md Shamim pins the sept intake squad and his sales team
    "u-md-shamim": { "g-sept-intake-2026": true, "g-sales-team": true },
    // Raj pins the visa help group
    "u-raj": { "g-uk-visa-help": true },
  }); // { [viewerId]: { [contactId]: true } } — "pin to top"
  // Per-user archive state. Once a chat is archived for a viewer it disappears
  // from their main chat list and shows up in Settings → Archive instead.
  // Seeded with realistic stale conversations so the Archive view has demo content.
  const [archivedByUser, setArchivedByUser] = useState({
    "u-shamim": {
      // Shamim has tidied up his chat list — archived a few less-active DMs and one past app group
      "u-roni":         true, // quiet contact, no recent activity
      "u-rakib":        true, // legacy conversation
      "u-testa":        true, // old DM from before role change
      "g-app-117452":   true, // student enrolled, group archived after enrollment
    },
    "u-md-shamim": {
      "u-asad":         true, // archived after Asad changed teams
      "u-roni":         true,
    },
    "u-andreea": {
      "u-laura":        true, // old 1:1 thread, now talk in Sales group
      "g-app-117453":   true, // past student application — closed
    },
    "u-jennifer": {
      "u-rakib":        true,
      "u-nadia":        true,
    },
    "u-raj": {
      "u-siam":         true, // historical DM
    },
  }); // { [viewerId]: { [contactId]: true } } — "archive"
  const [chatRowMenuOpen, setChatRowMenuOpen] = useState(null); // contact/group id with open ⋮ menu

  /* ─── Main-hub confirm dialog (shared with archive flow + delete flow) ───
     Shape: { title, body, confirmLabel, confirmDanger, onConfirm } */
  const [hubConfirm, setHubConfirm] = useState(null);

  /* ─── Archive flow helpers ───
     Unarchive returns the chat to active list. Delete clears all messages
     and the bookmark/archive flag. Both require explicit confirmation. */
  const requestUnarchive = (chatId, label) => {
    setHubConfirm({
      title: "Unarchive Conversation?",
      body: `This conversation${label ? ` with ${label}` : ""} will return to your active chats.`,
      confirmLabel: "Confirm Unarchive",
      confirmDanger: false,
      onConfirm: () => {
        setArchivedByUser(prev => {
          const myMap = { ...(prev[currentUser.id] || {}) };
          delete myMap[chatId];
          return { ...prev, [currentUser.id]: myMap };
        });
        setHubConfirm(null);
      },
    });
  };
  const requestDeleteArchivedChat = (chatId, label) => {
    setHubConfirm({
      title: "Delete Conversation?",
      body: `This action cannot be undone.${label ? ` Messages with ${label} will be permanently removed.` : ""}`,
      confirmLabel: "Delete Permanently",
      confirmDanger: true,
      onConfirm: () => {
        // Clear messages thread (DM uses combined key, group uses group id)
        setMessages(prev => {
          const next = { ...prev };
          // Try both patterns
          delete next[chatId];
          const dmKey = threadId(currentUser.id, chatId);
          delete next[dmKey];
          return next;
        });
        // Remove archive flag
        setArchivedByUser(prev => {
          const myMap = { ...(prev[currentUser.id] || {}) };
          delete myMap[chatId];
          return { ...prev, [currentUser.id]: myMap };
        });
        // Close conversation if open
        if (activeChatId === chatId) setActiveChatId(null);
        setHubConfirm(null);
      },
    });
  };
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatTab, setChatTab] = useState("all"); // all | unread | favourites | groups | archive
  const [chatSearch, setChatSearch] = useState("");

  // ─── Reactions + Reply state ───
  // replyingToByChat: { [chatId]: { id, from, fromName, text } } — what we're quoting in next send
  // emojiPickerForMsg: messageId of the bubble currently showing its emoji picker
  // hoveredMsgId: messageId currently being hovered (JS-based, replaces CSS :hover
  //   so we can add a grace period when the cursor crosses the gap to the toolbar)
  const [replyingToByChat, setReplyingToByChat] = useState({});
  const [emojiPickerForMsg, setEmojiPickerForMsg] = useState(null);
  const [hoveredMsgId, setHoveredMsgId] = useState(null);
  const hoverHideTimerRef = useRef(null);

  // ─── Share-to-chat modal state ───
  // sharePostTarget: the post object to share. selectedTargets: chatIds (DM ids or group ids).
  // shareToComment: optional caption that prepends the share card in the recipient chat.
  const [sharePostTarget, setSharePostTarget] = useState(null);
  const [shareSelectedTargets, setShareSelectedTargets] = useState([]);
  const [shareToComment, setShareToComment] = useState("");
  const [shareToSearch, setShareToSearch] = useState("");

  // Reset selection state whenever target changes
  useEffect(() => {
    if (sharePostTarget) {
      setShareSelectedTargets([]);
      setShareToComment("");
      setShareToSearch("");
    }
  }, [sharePostTarget?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  function toggleShareTarget(id) {
    setShareSelectedTargets(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  }
  function confirmSharePost() {
    if (!sharePostTarget || shareSelectedTargets.length === 0) return;
    const post = sharePostTarget;
    const author = findUser(post.author);
    const caption = shareToComment.trim();
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;

    setMessages(prev => {
      const next = { ...prev };
      shareSelectedTargets.forEach(targetId => {
        // DM target → use thread key. Group target → use group id directly.
        const isGroup = targetId.startsWith("g-");
        const chatKey = isGroup ? targetId : threadId(currentUser.id, targetId);
        const list = next[chatKey] || [];
        // 1) Optional caption message (sent FIRST so the share card follows)
        const baseId = `m-shared-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const messages = [];
        if (caption) {
          messages.push({
            id: `${baseId}-c`,
            from: currentUser.id,
            text: caption,
            time,
          });
        }
        // 2) Shared post card
        messages.push({
          id: baseId,
          from: currentUser.id,
          time,
          type: "shared_post",
          sharedPost: {
            id: post.id,
            title: post.title || (post.body || "").split("\n")[0].slice(0, 80),
            body: (post.body || "").slice(0, 240),
            authorId: post.author,
            authorName: author?.name || "Unknown",
            category: post.category,
            audience: post.audience,
            attachmentPreview: post.image || (post.attachments && post.attachments[0]) || null,
          },
        });
        next[chatKey] = [...list, ...messages];
      });
      return next;
    });

    // Toast confirmation re-uses memberToast pattern
    setMemberToast({
      kind: "info",
      text: `Shared with ${shareSelectedTargets.length} ${shareSelectedTargets.length === 1 ? "chat" : "chats"}`,
    });
    setTimeout(() => setMemberToast(null), 2500);

    // Close the modal
    setSharePostTarget(null);
  }

  // ─── Edit + Delete state ───
  // editingMsgId: messageId currently in inline-edit mode; editingDraft holds the draft
  // msgMenuOpen: messageId whose ⋯ context menu is open (one at a time)
  const [editingMsgId, setEditingMsgId] = useState(null);
  const [editingDraft, setEditingDraft] = useState("");
  const [msgMenuOpen, setMsgMenuOpen] = useState(null);

  /* ─── Message mutation helpers ─── */
  // Edit own message in place. Marks as edited with ISO timestamp + appends
  // to internal editHistory (frontend-side audit log).
  function startEditMessage(message) {
    if (message.deleted) return; // can't edit a tombstone
    setEditingMsgId(message.id);
    setEditingDraft(message.text || "");
    setMsgMenuOpen(null);
  }
  function cancelEditMessage() {
    setEditingMsgId(null);
    setEditingDraft("");
  }
  function saveEditMessage(chatKey, messageId) {
    const trimmed = editingDraft.trim();
    if (!trimmed) return; // empty → cancel
    setMessages(prev => {
      const list = prev[chatKey] || [];
      const next = list.map(m => {
        if (m.id !== messageId) return m;
        if (m.text === trimmed) return m; // unchanged
        const history = Array.isArray(m.editHistory) ? m.editHistory : [];
        return {
          ...m,
          text: trimmed,
          edited: true,
          editedAt: new Date().toISOString(),
          editHistory: [...history, { text: m.text, at: new Date().toISOString() }],
        };
      });
      return { ...prev, [chatKey]: next };
    });
    setEditingMsgId(null);
    setEditingDraft("");
  }
  // Soft-delete (leaves a tombstone in place). Distinguishes self-delete vs
  // admin-removed so the tombstone copy can differ.
  function deleteMessage(chatKey, messageId, byAdmin = false, adminName = "") {
    setMessages(prev => {
      const list = prev[chatKey] || [];
      const next = list.map(m => {
        if (m.id !== messageId) return m;
        return {
          ...m,
          deleted: true,
          deletedAt: new Date().toISOString(),
          deletedByAdmin: byAdmin,
          deletedByAdminName: byAdmin ? adminName : "",
          // strip rich content — attachments deleted with message
          text: "",
          reactions: {},
          replyTo: null,
          attachments: [],
        };
      });
      return { ...prev, [chatKey]: next };
    });
    setMsgMenuOpen(null);
  }
  function requestDeleteMessage(chatKey, message) {
    setHubConfirm({
      title: "Delete Message?",
      body: "This message will be permanently removed.",
      confirmLabel: "Delete",
      confirmDanger: true,
      onConfirm: () => {
        deleteMessage(chatKey, message.id, false);
        setHubConfirm(null);
      },
    });
  }
  function requestAdminRemoveMessage(chatKey, message) {
    setHubConfirm({
      title: "Remove User Message?",
      body: "This message will be removed for all group members.",
      confirmLabel: "Remove Message",
      confirmDanger: true,
      onConfirm: () => {
        deleteMessage(chatKey, message.id, true, currentUser.name);
        setHubConfirm(null);
      },
    });
  }
  // Is the current user an admin of the given group?
  function currentUserIsGroupAdmin(group) {
    if (!group) return false;
    if (currentUser.type === "admin") return true;
    return Array.isArray(group.admins) && group.admins.includes(currentUser.id);
  }

  // Show actions instantly on mouse-enter; on mouse-leave, wait 200ms before
  // hiding so the cursor has time to traverse the small gap between bubble
  // and toolbar without the toolbar disappearing.
  const onMsgEnter = (id) => {
    if (hoverHideTimerRef.current) {
      clearTimeout(hoverHideTimerRef.current);
      hoverHideTimerRef.current = null;
    }
    setHoveredMsgId(id);
  };
  const onMsgLeave = () => {
    if (hoverHideTimerRef.current) clearTimeout(hoverHideTimerRef.current);
    hoverHideTimerRef.current = setTimeout(() => {
      setHoveredMsgId(null);
      hoverHideTimerRef.current = null;
    }, 200);
  };

  // Close emoji picker when clicking anywhere outside the picker / toolbar
  useEffect(() => {
    if (!emojiPickerForMsg) return;
    const onDocClick = (e) => {
      // If the click target isn't inside a hover-actions toolbar, close the picker
      if (!e.target.closest || !e.target.closest(".msg-hover-actions")) {
        setEmojiPickerForMsg(null);
      }
    };
    // Use capture so it fires before any bubble handlers
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [emojiPickerForMsg]);

  // ─── Settings state ───
  // Settings only shows Appearance now; Archive lives in chat sidebar,
  // Saved Posts in feed scope tabs. The settingsTab state is gone.

  // ─── Permissions admin state (admin-editable) ───
  const [permSets, setPermSets] = useState(INITIAL_PERMISSION_SETS);
  const [typeAssignments, setTypeAssignments] = useState(INITIAL_TYPE_ASSIGNMENTS);
  const [typeAssignDropdown, setTypeAssignDropdown] = useState(null); // typeId or null
  const [permsDirty, setPermsDirty] = useState(false);
  const [permsSavedToast, setPermsSavedToast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // ─── CRM Student module state ───
  // null = list view; a student id = edit view for that student. Wired to
  // sidebar Student item; clicking the row's edit icon flips to the form.
  const [editingStudentId, setEditingStudentId] = useState(null);
  // Active tab inside the student edit form (Personal / Contact / Application / …)
  const [studentEditTab, setStudentEditTab] = useState("Personal");
  // List filters — all start unset; apply against the seeded student dataset.
  const [studentFilters, setStudentFilters] = useState({
    branch: "", teamLeader: "", salesManager: "",
    type: "", consultant: "", accountStatus: "",
    search: "", isConsultant: false,
  });
  const [studentPage, setStudentPage] = useState(1);
  const [studentPerPage, setStudentPerPage] = useState(15);
  const [studentOrderBy, setStudentOrderBy] = useState("");

  // ─── UAPP Leads sub-page routing ───
  // Which item from the Leads sidebar is active. Defaults to dashboard; the
  // Marketing item flips to the marketing module with its own internal tabs.
  const [leadsPage, setLeadsPage] = useState("dashboard");
  // Active sub-tab inside the Marketing module: ads | forms | events
  const [marketingTab, setMarketingTab] = useState("ads");
  // Modal/dialog state for marketing sub-modules
  const [marketingDialog, setMarketingDialog] = useState(null); // { kind, data } | null

  // ─── Marketing events — shared state ──────────────────────────
  // Lifted to the main component so the Comms Hub PromotionsRail can read
  // the same list. Creating an event in Leads → Marketing → Events also
  // surfaces it in the right rail of the news feed as a promotional card.
  const [marketingEvents, setMarketingEvents] = useState([
    { id: "E-501", name: "MBA Pathways 2026 — Live Webinar",       kind: "Webinar",  status: "Live",      date: "Today, 6:00 PM",      attendees: 287, capacity: 500, rsvps: 412, bannerGradient: ["#FC7300","#FF9233"], description: "Live broadcast covering MBA programmes, intake deadlines and partner universities.", promoted: true, createdAt: Date.now() - 86400000 * 30 },
    { id: "E-502", name: "September Intake Q&A — Bath Spa",         kind: "Q&A",      status: "Published", date: "Sep 18, 2026",        attendees:   0, capacity: 250, rsvps: 184, bannerGradient: ["#045D5E","#0AAEB0"], description: "Live Q&A with Bath Spa University London admissions team.", promoted: true, createdAt: Date.now() - 86400000 * 14 },
    { id: "E-503", name: "UK Visa Application Workshop",            kind: "Workshop", status: "Published", date: "Sep 24, 2026",        attendees:   0, capacity: 120, rsvps:  87, bannerGradient: ["#7C3AED","#A855F7"], description: "Step-by-step guidance through the UK student visa application.", promoted: false, createdAt: Date.now() - 86400000 * 10 },
    { id: "E-504", name: "Foundation Year Open Day — London",       kind: "Seminar",  status: "Published", date: "Oct 02, 2026",        attendees:   0, capacity: 400, rsvps: 256, bannerGradient: ["#0EA5E9","#38BDF8"], description: "Open day for foundation-year programmes at our London campus.", promoted: true, createdAt: Date.now() - 86400000 * 7 },
    { id: "E-505", name: "MSc Data Analytics — Spring Recruitment", kind: "Webinar",  status: "Draft",     date: "TBA",                 attendees:   0, capacity: 300, rsvps:   0, bannerGradient: ["#10B981","#34D399"], description: "Draft — programme overview for the spring 2027 intake.", promoted: false, createdAt: Date.now() - 86400000 * 3 },
    { id: "E-506", name: "Romanian Student Welcome Reception",      kind: "Seminar",  status: "Completed", date: "Aug 28, 2026",        attendees: 134, capacity: 150, rsvps: 148, bannerGradient: ["#DB2777","#F472B6"], description: "Welcome reception for Romanian students starting in the autumn intake.", promoted: false, createdAt: Date.now() - 86400000 * 90 },
  ]);
  // Create/edit-event modal. null = closed; otherwise an event-shaped draft.
  // When draft.id is undefined we treat it as a "new" event being created.
  const [eventDraft, setEventDraft] = useState(null);
  // Pop-up toast confirming successful event creation (auto-dismisses).
  const [eventCreatedToast, setEventCreatedToast] = useState(null);
  useEffect(() => {
    if (!eventCreatedToast) return;
    const t = setTimeout(() => setEventCreatedToast(null), 4000);
    return () => clearTimeout(t);
  }, [eventCreatedToast]);

  // Sync the runtime `C` palette with the current theme. This runs synchronously
  // during every render BEFORE any sub-component reads from C, so all inline
  // styles across the entire tree pick up the right values without prop-drilling
  // a theme context through 24,000 lines of components.
  Object.assign(C, darkMode ? C_DARK : C_LIGHT);

  // ─── Share-to modal state ───
  // (Old `shareModalPostId`/`shareSentToast` state removed — replaced by
  // `sharePostTarget` and the unified hub Share modal earlier in this file.)
  const [draftText, setDraftText] = useState("");
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  // Right-side "More" menu in the open-chat header (DM + group). Stores active chat id when open.
  const [chatViewMenuOpen, setChatViewMenuOpen] = useState(null);
  const [composingNew, setComposingNew] = useState(false);
  const [composeQuery, setComposeQuery] = useState("");
  const [composeSelected, setComposeSelected] = useState(null);
  const [composeDropdown, setComposeDropdown] = useState(false);
  const [attachMenu, setAttachMenu] = useState(null); // null | "main" | "apps" | "files" | "photos"

  // ─── Message templates state (admission team + admin only) ───
  // 3-step wizard: "app" → "topics" → "templates"
  const [templatesMenu, setTemplatesMenu] = useState(null); // null | "app" | "topics" | "templates"
  const [selectedApp, setSelectedApp] = useState(null);      // picked APPLICATION record
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [appSearchQuery, setAppSearchQuery] = useState("");
  const [appPickerSearch, setAppPickerSearch] = useState("");

  // ─── Groups + Invitations ───
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [invitations, setInvitations] = useState(INITIAL_INVITATIONS);
  const [showNotifications, setShowNotifications] = useState(false);
  // ─── Meeting reminders (15-min before start) ───
  // activeReminders is a map { [meetingId]: true } of currently-firing reminders
  // dismissedByUser is { [userId]: { [meetingId]: true } } so dismissals are per-attendee
  // mt-1 starts pre-fired — the demo's seeded "imminent" meeting
  const [activeReminders, setActiveReminders] = useState({ "mt-1": true });
  const [dismissedByUser, setDismissedByUser] = useState({});

  // ─── News Feed state ───
  const [feedPosts, setFeedPosts] = useState(INITIAL_FEED_POSTS);
  const [feedSearch, setFeedSearch] = useState("");
  const [feedScope, setFeedScope] = useState("for_you"); // for_you | team | company
  // ── Content Preferences for Team Updates personalization ──
  const [contentPrefs, setContentPrefs] = useState({
    seeMore: ["offer", "admission", "deadline"],   // category keys to prioritize
    seeLess: [],                                     // category keys to rank lower
    muted:   [],                                     // category keys to hide entirely
    preferredDepts: ["admission"],                   // dept keys to boost
    hiddenDepts:    [],                              // dept keys to suppress
    priorityOn:     true,                            // always surface high-priority posts
  });
  // Custom topics created by the user (appear alongside built-in topics)
  const [customTopics, setCustomTopics] = useState([]);
  const [customDepts, setCustomDepts] = useState([]);
  const [newTopicInput, setNewTopicInput] = useState("");
  const [addingTopicTo, setAddingTopicTo] = useState(null); // "seeMore" | "seeLess" | "muted" | null
  // ── Promotions & Campaigns state ──
  const [promoCategories, setPromoCategories] = useState([
    { id: "pc-1", name: "New University", priority: 1, color: "#7C3AED", active: true, templateId: "tpl-uni-default", items: [
      { id: "pi-1", title: "London Metropolitan University", desc: "Now accepting applications for September 2026 intake", badge: "New" },
      { id: "pi-2", title: "University of Greenwich", desc: "Scholarships available for international students", badge: "Hot" },
    ]},
    { id: "pc-2", name: "Commission News", priority: 2, color: "#F59E0B", active: true, templateId: "tpl-generic", items: [
      { id: "pi-3", title: "Earn up to £1,500 per student", desc: "Increased commission for Bath Spa referrals", badge: "💰" },
    ]},
    { id: "pc-3", name: "Scholarship Updates", priority: 3, color: "#10B981", active: true, templateId: "tpl-generic", items: [
      { id: "pi-4", title: "50% tuition waiver — Coventry", desc: "Available for Jan 2027 intake, limited seats", badge: "🎓" },
    ]},
    { id: "pc-4", name: "Intake Alerts", priority: 4, color: "#EF4444", active: true, templateId: "tpl-generic", items: [
      { id: "pi-5", title: "September 2026 closing soon", desc: "5 universities closing applications in 2 weeks", badge: "⏰" },
    ]},
    { id: "pc-5", name: "Events & Webinars", priority: 5, color: "#3B82F6", active: false, templateId: "tpl-event-default", items: [] },
  ]);
  const [promoDrawer, setPromoDrawer] = useState(null); // { mode: "add-cat"|"edit-cat"|"add-item"|"edit-item", data }
  const [promoDraft, setPromoDraft] = useState({});
  const [promoExpandedCat, setPromoExpandedCat] = useState(null);
  const [promoDragIdx, setPromoDragIdx] = useState(null);
  const [promoDragOverIdx, setPromoDragOverIdx] = useState(null);
  const [promoTab, setPromoTab] = useState("categories");
  const [promoCenterOpen, setPromoCenterOpen] = useState(false);
  const [promoCenterFilter, setPromoCenterFilter] = useState("all");
  const [promoCenterSearch, setPromoCenterSearch] = useState("");
  const [commTemplates, setCommTemplates] = useState([
    { id: "tpl-comm", type: "commission", name: "Commission", isDefault: true,
      statusLabel: "ACTIVE · {{campaign_count}} CAMPAIGNS", mainHeader: "Earn up to {{commission_amount}} per student",
      cardTitle: "{{university}}", cardSubtitle: "{{minimum_student_requirement}}+ students · {{account_intake}}",
      dateLine: "From {{start_from}}", badgeText: "{{commission_group}}", amountText: "{{commission_amount}}", ctaText: "View all {{campaign_count}} campaigns" },
    { id: "tpl-uni", type: "university", name: "University", isDefault: true,
      statusLabel: "NEW · {{item_count}} UNIVERSITIES", mainHeader: "New partner universities added",
      cardTitle: "{{university_name}}", cardSubtitle: "{{location}}",
      dateLine: "Added {{added_date}}", badgeText: "{{ranking}}", amountText: "", ctaText: "View all {{item_count}} universities" },
    { id: "tpl-course", type: "course", name: "Course", isDefault: true,
      statusLabel: "{{item_count}} NEW COURSES", mainHeader: "Latest courses available",
      cardTitle: "{{course_name}}", cardSubtitle: "{{university}} · {{level}}",
      dateLine: "Intake: {{intake}}", badgeText: "{{mode}}", amountText: "", ctaText: "Browse all {{item_count}} courses" },
    { id: "tpl-event", type: "event", name: "Event", isDefault: true,
      statusLabel: "UPCOMING EVENT", mainHeader: "{{event_title}}",
      cardTitle: "{{event_title}}", cardSubtitle: "{{event_location}}",
      dateLine: "{{event_date}}", badgeText: "{{event_type}}", amountText: "", ctaText: "View event details" },
    { id: "tpl-generic", type: "generic", name: "Generic", isDefault: true,
      statusLabel: "{{item_count}} ITEMS", mainHeader: "{{category_name}}",
      cardTitle: "{{item_title}}", cardSubtitle: "{{item_description}}",
      dateLine: "", badgeText: "{{badge}}", amountText: "", ctaText: "View all" },
  ]);
  const TEMPLATE_TYPES = [
    { id: "commission", label: "Commission", color: "#FC7300" },
    { id: "university", label: "University", color: "#7C3AED" },
    { id: "course", label: "Course", color: "#DB2777" },
    { id: "event", label: "Event", color: "#3B82F6" },
    { id: "generic", label: "Generic", color: "#64748B" },
  ];
  const TEMPLATE_PLACEHOLDERS = {
    commission: [ { key: "university", label: "University" }, { key: "minimum_student_requirement", label: "Min. Students" }, { key: "start_from", label: "Start Date" }, { key: "account_intake", label: "Intake" }, { key: "commission_amount", label: "Amount" }, { key: "commission_group", label: "Group" }, { key: "campaign_count", label: "Count" } ],
    university: [ { key: "university_name", label: "Name" }, { key: "location", label: "Location" }, { key: "ranking", label: "Ranking" }, { key: "added_date", label: "Added" }, { key: "item_count", label: "Count" } ],
    course: [ { key: "course_name", label: "Course" }, { key: "university", label: "University" }, { key: "level", label: "Level" }, { key: "mode", label: "Mode" }, { key: "intake", label: "Intake" }, { key: "item_count", label: "Count" } ],
    event: [ { key: "event_title", label: "Title" }, { key: "event_date", label: "Date" }, { key: "event_location", label: "Location" }, { key: "event_type", label: "Type" } ],
    generic: [ { key: "category_name", label: "Category" }, { key: "item_title", label: "Title" }, { key: "item_description", label: "Description" }, { key: "badge", label: "Badge" }, { key: "item_count", label: "Count" } ],
  };
  const TEMPLATE_SAMPLE = {
    commission: { university: "University of Suffolk", minimum_student_requirement: "3", start_from: "5 May 2026", account_intake: "Nov 2026-Feb 2027", commission_amount: "£1,500", commission_group: "UK Freelance Consultant", campaign_count: "3" },
    university: { university_name: "Bath Spa University London", location: "London, UK", ranking: "Top 50", added_date: "12 May 2026", item_count: "4" },
    course: { course_name: "MSc Data Analytics", university: "Coventry University", level: "Postgraduate", mode: "Full-time", intake: "September 2026", item_count: "6" },
    event: { event_title: "UK University Fair 2026", event_date: "25 June 2026", event_location: "ExCeL London", event_type: "Fair" },
    generic: { category_name: "Scholarship Updates", item_title: "50% tuition waiver", item_description: "Available for Jan 2027", badge: "🎓", item_count: "3" },
  };
  const [editingTplType, setEditingTplType] = useState("commission");
  // Entries created under each template type
  const [tplEntries, setTplEntries] = useState({
    commission: [
      { id: "te-1", data: { university: "London Metropolitan University", minimum_student_requirement: "5", start_from: "28 Feb 2026", account_intake: "Jul 2026-Oct 2026", commission_amount: "£700", commission_group: "UK Freelance Consultant", campaign_count: "3" }, completed: true },
      { id: "te-2", data: { university: "University of Suffolk — LSC", minimum_student_requirement: "3", start_from: "5 May 2026", account_intake: "Nov 2026-Feb 2027", commission_amount: "£1,500", commission_group: "UK Freelance Consultant", campaign_count: "3" }, completed: true },
    ],
    university: [
      { id: "te-3", data: { university_name: "Bath Spa University London", location: "London, UK", ranking: "Top 50", added_date: "12 May 2026", item_count: "4" }, completed: true },
    ],
    course: [],
    event: [],
    generic: [],
  });
  const [tplAddingTo, setTplAddingTo] = useState(null); // type key when adding new entry
  const [tplNewEntry, setTplNewEntry] = useState({});
  // Custom template types created by user
  const [customTplTypes, setCustomTplTypes] = useState([]);
  const [showCreateTpl, setShowCreateTpl] = useState(false);
  const [newTplDraft, setNewTplDraft] = useState({ name: "", color: "#6366F1", fields: [] });
  const [newFieldDraft, setNewFieldDraft] = useState({ label: "", type: "text" });
  const [feedExpandedComments, setFeedExpandedComments] = useState({}); // { [postId]: true }
  const [feedReactionPickerOpen, setFeedReactionPickerOpen] = useState(null);
  const [feedCommentDraftByPost, setFeedCommentDraftByPost] = useState({});

  // ─── Facebook-style inline composer ───
  const [feedComposeExpanded, setFeedComposeExpanded] = useState(false);
  const [feedDraft, setFeedDraft] = useState({
    body: "",
    photos: [],          // [{ id, label, color }]
    tagged: [],          // userId[]
    location: "",
    feeling: null,       // { id, label, emoji }
    category: "announcement",
    audience: "all",
    priority: "medium",
  });
  const [feedComposerSheet, setFeedComposerSheet] = useState(null); // null | "tag" | "feeling" | "audience" | "category"
  const [feedTagSearch, setFeedTagSearch] = useState("");

  // ─── News Feed activity (likes/comments/shares notifications) ───
  // Each entry: { id, type: "react" | "comment" | "share", actorId, postId, reactionId?, commentText?, createdAt, read }
  const [feedActivity, setFeedActivity] = useState([]);
  // Per-user dismissal of feed notifications
  const [readFeedActivityByUser, setReadFeedActivityByUser] = useState({});

  // ─── Saved / bookmarked posts (per user) ───
  // { [viewerId]: { [postId]: { savedAt: "..." } } }
  // Seeded with realistic bookmarks so the Settings → Saved tab has demo content.
  // savedAt timestamps are roughly recent so newest-first sort produces a nice list.
  const [bookmarksByUser, setBookmarksByUser] = useState({
    "u-shamim": {
      // Admin saves the high-leverage announcements: deadlines, partnerships, compliance
      "post-2":  { savedAt: "2026-04-26T09:14:00Z" }, // Narcis Bilcan — ready for offer letter
      "post-4":  { savedAt: "2026-04-25T16:02:00Z" }, // Sep/Oct 2026 intake admissions open
      "post-5":  { savedAt: "2026-04-24T11:38:00Z" }, // Bath Spa University partnership
      "post-deleted-archive-1": { savedAt: "2026-04-24T08:00:00Z" }, // ← post that was since deleted from feed (demonstrates "removed" state)
      "post-11": { savedAt: "2026-04-23T08:50:00Z" }, // Compliance reminder — original docs
      "post-12": { savedAt: "2026-04-22T14:22:00Z" }, // Ulster MBA pathways
    },
    "u-md-shamim": {
      // Sales head saves performance + commission posts to share with team
      "post-3":  { savedAt: "2026-04-26T07:30:00Z" }, // £1,500 commission LSC
      "post-10": { savedAt: "2026-04-25T18:12:00Z" }, // Weekly performance — strong May
      "post-15": { savedAt: "2026-04-24T09:05:00Z" }, // Sales bookmark
    },
    "u-andreea": {
      // Team lead saves marketing + scripts
      "post-7":  { savedAt: "2026-04-26T13:20:00Z" }, // Marketing post w/ engagement actions
      "post-9":  { savedAt: "2026-04-25T10:45:00Z" }, // Recruitment templates
      "post-3":  { savedAt: "2026-04-23T15:00:00Z" }, // Commission opportunity
    },
    "u-raj": {
      // Admission officer saves intake + compliance
      "post-1":  { savedAt: "2026-04-26T11:10:00Z" }, // June deadline approaching
      "post-4":  { savedAt: "2026-04-26T10:55:00Z" }, // Sep/Oct intake
      "post-11": { savedAt: "2026-04-24T16:40:00Z" }, // Compliance reminder
      "post-13": { savedAt: "2026-04-23T09:15:00Z" }, // Admission post
    },
    "u-jennifer": {
      "post-4":  { savedAt: "2026-04-25T14:30:00Z" },
      "post-14": { savedAt: "2026-04-22T08:40:00Z" }, // Welcome to the team
    },
    "u-laura": {
      "post-3":  { savedAt: "2026-04-26T12:00:00Z" },
      "post-10": { savedAt: "2026-04-25T17:25:00Z" },
    },
  });
  const [bookmarkToast, setBookmarkToast] = useState(null); // { saved: bool, postTitle: string } | null

  // ─── "What You Missed" — per-user dismissed posts in this session ───
  // { [viewerId]: { [postId]: true } }
  const [dismissedMissedByUser, setDismissedMissedByUser] = useState({});

  // ─── Scheduled posts state ───
  // Shape: same as feed post but with status: "scheduled" and scheduled_at: ISO
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [showScheduledFlyout, setShowScheduledFlyout] = useState(false);
  const [scheduleEnabled, setScheduleEnabled] = useState(false); // composer toggle
  const [scheduleDate, setScheduleDate] = useState(""); // YYYY-MM-DD
  const [scheduleTime, setScheduleTime] = useState(""); // HH:MM

  // ─── Promotional commissions (system admin managed) ───
  const [promotionalCommissions, setPromotionalCommissions] = useState(INITIAL_PROMOTIONAL_COMMISSIONS);
  const [commissionDraft, setCommissionDraft] = useState(null); // null = closed; {} = create; {...} = edit
  const [commissionToast, setCommissionToast] = useState(null); // { kind: "created" | "updated" | "deleted", id }

  // ─── Recently-added universities (managed from sidebar → University → Universities) ───
  const [newUniversities, setNewUniversities] = useState(INITIAL_NEW_UNIVERSITIES);
  const [universityDraft, setUniversityDraft] = useState(null); // null=closed; new={...} | edit={...with id}
  const [universityToast, setUniversityToast] = useState(null); // { kind: "created"|"updated"|"deleted" }

  // ─── Recently-added courses (managed from sidebar → University → Programs) ───
  const [newCourses, setNewCourses] = useState(INITIAL_NEW_COURSES);
  const [courseDraft, setCourseDraft] = useState(null);
  const [courseToast, setCourseToast] = useState(null);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const [groupForm, setGroupForm] = useState({ name: "", picked: {} }); // picked = { [userId]: true }
  const [groupMemberSearch, setGroupMemberSearch] = useState("");
  const [showComposeMenu, setShowComposeMenu] = useState(false);

  // ─── Account switcher ───
  const [currentUser, setCurrentUser] = useState(findUser(DEFAULT_USER_ID));
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
  const [accountSwitcherSearch, setAccountSwitcherSearch] = useState("");

  // ─── Booking state ───
  const [calendarTab, setCalendarTab] = useState("book"); // book | scheduled | availability
  const [scheduledTab, setScheduledTab] = useState("upcoming"); // upcoming | passed | canceled
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [bookingContact, setBookingContact] = useState(null);
  const [bookingSearch, setBookingSearch] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [meetings, setMeetings] = useState(INITIAL_MEETINGS);
  const [bookingConfirm, setBookingConfirm] = useState(null);

  // ─── Group Meeting Scheduler ───
  const [meetingMode, setMeetingMode] = useState("individual"); // individual | group
  const [groupStep, setGroupStep] = useState("participants");   // participants | scheduling | details | confirmation | success
  const [groupParticipants, setGroupParticipants] = useState([]); // [userId,...]
  const [groupParticipantSearch, setGroupParticipantSearch] = useState("");
  const [groupDuration, setGroupDuration] = useState(60); // minutes (30, 60, 90, 120)
  const [groupSelection, setGroupSelection] = useState(null); // { startSlot, endSlot } | null
  const [groupDragStart, setGroupDragStart] = useState(null); // slot index while dragging
  const [groupHoverCell, setGroupHoverCell] = useState(null); // { userId, slot }
  const [groupConflictExpanded, setGroupConflictExpanded] = useState(false);
  const [groupDetails, setGroupDetails] = useState({
    title: "",
    description: "",
    location: "Online — link generated automatically",
    timezone: "Europe/London (GMT+1)",
  });
  const [groupScheduledMeeting, setGroupScheduledMeeting] = useState(null); // success-state record

  // Pre-compute every user's calendar once per session — stable across renders
  const groupCalendars = useMemo(() => {
    const map = {};
    USERS.forEach(u => { map[u.id] = generateUserCalendar(u.id); });
    return map;
  }, []);

  // Map group iconName → Lucide component
  const GROUP_ICONS = {
    Briefcase, GraduationCap, Star, Users, Building2, Shield,
    MessagesSquare, Network, Coffee, Sparkles,
    // Reaction icons (used by reaction picker + feed activity notifications)
    ThumbsUp, Lightbulb, PartyPopper,
    // Other feed-related icons referenced by iconName in seed data
    Megaphone, Hash, Clock, CalendarDays, UserPlus, MessageSquare, Repeat2,
  };
  const getGroupIcon = (iconName) => GROUP_ICONS[iconName] || Users;

  // ─── Availability ───
  const [availability, setAvailability] = useState({
    Mon: { active: true, from: "09:00", to: "17:00" },
    Tue: { active: true, from: "09:00", to: "17:00" },
    Wed: { active: true, from: "09:00", to: "17:00" },
    Thu: { active: true, from: "09:00", to: "17:00" },
    Fri: { active: true, from: "09:00", to: "17:00" },
    Sat: { active: false, from: "10:00", to: "14:00" },
    Sun: { active: false, from: "10:00", to: "14:00" },
  });
  const [meetingDuration, setMeetingDuration] = useState(30);
  const [savedAvail, setSavedAvail] = useState(false);

  // ─── Schedule calendar state ────────────────────────────────
  const [schedView, setSchedView] = useState("week");
  const [schedDate, setSchedDate] = useState(new Date());
  const [schedViewUserId, setSchedViewUserId] = useState(null); // admin: view another user's schedule
  const [schedUserSearch, setSchedUserSearch] = useState("");
  const [schedSelected, setSchedSelected] = useState(null); // block id being edited
  const [schedDrawerOpen, setSchedDrawerOpen] = useState(false);
  const [schedDraft, setSchedDraft] = useState(null); // draft block for create/edit
  const [schedFilters, setSchedFilters] = useState({
    statuses: ["available","busy","meeting","focus","away"], search: ""
  });
  const [schedSettings, setSchedSettings] = useState({
    meetingDuration: 30, timezone: "Europe/London", bufferMinutes: 5,
    workingHours: { start: "08:00", end: "18:00" },
    bookingWindow: { minNoticeHours: 2, maxDaysInAdvance: 30 },
  });
  // Seed realistic blocks for this week
  const [schedBlocks, setSchedBlocks] = useState(() => {
    const now = new Date();
    const monday = new Date(now); monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    const d = (dayOff, h, m = 0) => { const t = new Date(monday); t.setDate(monday.getDate() + dayOff); t.setHours(h, m, 0, 0); return t.toISOString(); };
    return [
      { id: "sb-1", userId: "u-shamim", title: "Morning availability",  status: "available", start: d(0, 9), end: d(0, 10), notes: "", isRecurring: true, recurrenceRule: "weekly", createdAt: d(0, 0), updatedAt: d(0, 0) },
      { id: "sb-2", userId: "u-shamim", title: "Team standup",          status: "meeting",   start: d(0, 10), end: d(0, 10, 30), notes: "Weekly sync", isRecurring: true, recurrenceRule: "weekly", createdAt: d(0, 0), updatedAt: d(0, 0) },
      { id: "sb-3", userId: "u-shamim", title: "Deep work",             status: "focus",     start: d(0, 14), end: d(0, 16), notes: "No interruptions", isRecurring: false, createdAt: d(0, 0), updatedAt: d(0, 0) },
      { id: "sb-4", userId: "u-shamim", title: "Open hours",            status: "available", start: d(1, 9), end: d(1, 12), notes: "Walk-ins welcome", isRecurring: true, recurrenceRule: "weekly", createdAt: d(0, 0), updatedAt: d(0, 0) },
      { id: "sb-5", userId: "u-shamim", title: "Client call — Bath Spa",status: "meeting",   start: d(1, 14), end: d(1, 15), notes: "Admissions review", isRecurring: false, createdAt: d(0, 0), updatedAt: d(0, 0) },
      { id: "sb-7", userId: "u-shamim", title: "Morning availability",  status: "available", start: d(2, 9), end: d(2, 11), notes: "", isRecurring: true, recurrenceRule: "weekly", createdAt: d(0, 0), updatedAt: d(0, 0) },
      { id: "sb-8", userId: "u-shamim", title: "Sprint planning",       status: "meeting",   start: d(2, 11), end: d(2, 12), notes: "Bi-weekly sprint", isRecurring: true, recurrenceRule: "weekly", createdAt: d(0, 0), updatedAt: d(0, 0) },
      { id: "sb-9", userId: "u-shamim", title: "Afternoon available",   status: "available", start: d(2, 14), end: d(2, 17), notes: "", isRecurring: false, createdAt: d(0, 0), updatedAt: d(0, 0) },
      { id: "sb-10",userId: "u-shamim", title: "Open for bookings",     status: "available", start: d(3, 9), end: d(3, 12), notes: "", isRecurring: true, recurrenceRule: "weekly", createdAt: d(0, 0), updatedAt: d(0, 0) },
      { id: "sb-11",userId: "u-shamim", title: "Code review block",     status: "focus",     start: d(3, 14), end: d(3, 16), notes: "PR reviews", isRecurring: false, createdAt: d(0, 0), updatedAt: d(0, 0) },
      { id: "sb-12",userId: "u-shamim", title: "All-day available",     status: "available", start: d(4, 9), end: d(4, 12), notes: "", isRecurring: true, recurrenceRule: "weekly", createdAt: d(0, 0), updatedAt: d(0, 0) },
      { id: "sb-13",userId: "u-shamim", title: "Team retrospective",    status: "meeting",   start: d(4, 14), end: d(4, 15), notes: "Sprint retro", isRecurring: true, recurrenceRule: "weekly", createdAt: d(0, 0), updatedAt: d(0, 0) },
      { id: "sb-14",userId: "u-shamim", title: "Admin / emails",        status: "busy",      start: d(4, 15, 30), end: d(4, 17), notes: "", isRecurring: false, createdAt: d(0, 0), updatedAt: d(0, 0) },
    ];
  });

  const messagesEndRef = useRef(null);
  const headerMenuRef = useRef(null);
  const attachMenuRef = useRef(null);
  const accountSwitcherRef = useRef(null);
  const notificationsRef = useRef(null);
  const composeMenuRef = useRef(null);

  // ─── Auto-scroll on new message ───
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatId, messages]);

  // ─── Mark unread messages addressed to me as read when I open the thread ───
  useEffect(() => {
    if (!activeChatId) return;
    const isGroup = !!groups.find(g => g.id === activeChatId);
    if (isGroup) {
      const thread = messages[activeChatId] || [];
      const hasUnread = thread.some(m => m.from !== currentUser.id && !(m.readBy || []).includes(currentUser.id));
      if (!hasUnread) return;
      setMessages(p => ({
        ...p,
        [activeChatId]: (p[activeChatId] || []).map(m =>
          m.from !== currentUser.id && !(m.readBy || []).includes(currentUser.id)
            ? { ...m, readBy: [...(m.readBy || []), currentUser.id] }
            : m
        ),
      }));
    } else {
      const tid = threadId(currentUser.id, activeChatId);
      const thread = messages[tid] || [];
      const hasUnread = thread.some(m => m.to === currentUser.id && !m.read);
      if (!hasUnread) return;
      setMessages(p => ({
        ...p,
        [tid]: (p[tid] || []).map(m =>
          m.to === currentUser.id && !m.read ? { ...m, read: true } : m
        ),
      }));
    }
  }, [activeChatId, currentUser.id]);

  // ─── Reset chat state when switching user accounts ───
  useEffect(() => {
    setActiveChatId(null);
    setComposingNew(false);
    setComposeSelected(null);
    setComposeQuery("");
    setDraftText("");
    setAttachMenu(null);
    setShowHeaderMenu(false);
  }, [currentUser.id]);

  // ─── Mark feed posts as seen when user views the feed (and on user switch) ───
  useEffect(() => {
    if (hubFeature !== "feed") return;
    setFeedPosts(p => p.map(post =>
      post.seenBy.includes(currentUser.id)
        ? post
        : { ...post, seenBy: [...post.seenBy, currentUser.id] }
    ));
  }, [hubFeature, currentUser.id]);

  // ─── Close menu on outside click ───
  useEffect(() => {
    function onClick(e) {
      if (headerMenuRef.current && !headerMenuRef.current.contains(e.target)) {
        setShowHeaderMenu(false);
      }
    }
    if (showHeaderMenu) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [showHeaderMenu]);

  // ─── Close attach menu on outside click ───
  useEffect(() => {
    function onClick(e) {
      if (attachMenuRef.current && !attachMenuRef.current.contains(e.target)) {
        setAttachMenu(null);
        setAppPickerSearch("");
      }
    }
    if (attachMenu) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [attachMenu]);

  // ─── Close chat-row 3-dot menu (and chat-view header menu) on outside click ───
  useEffect(() => {
    function onClick(e) {
      // Close if click is anywhere outside any [data-rowmenu] panel and outside a menu trigger button
      const menuEl = document.querySelector('[data-rowmenu="true"]');
      if (menuEl && !menuEl.contains(e.target)) {
        // Also check if the click was on the trigger button itself — that has its own toggle
        if (!e.target.closest('button[aria-label="Chat options"]')) {
          setChatRowMenuOpen(null);
          setChatViewMenuOpen(null);
        }
      }
    }
    if (chatRowMenuOpen || chatViewMenuOpen) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [chatRowMenuOpen, chatViewMenuOpen]);

  // ─── Close account switcher on outside click ───
  useEffect(() => {
    function onClick(e) {
      if (accountSwitcherRef.current && !accountSwitcherRef.current.contains(e.target)) {
        setShowAccountSwitcher(false);
        setAccountSwitcherSearch("");
      }
    }
    if (showAccountSwitcher) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [showAccountSwitcher]);

  // ─── Close notifications panel on outside click ───
  useEffect(() => {
    function onClick(e) {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    }
    if (showNotifications) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [showNotifications]);

  // ─── Close app launcher on outside click + ESC ───
  useEffect(() => {
    function onClick(e) {
      if (appLauncherRef.current && !appLauncherRef.current.contains(e.target)) {
        setShowAppLauncher(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setShowAppLauncher(false);
    }
    if (showAppLauncher) {
      document.addEventListener("mousedown", onClick);
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [showAppLauncher]);

  // ─── Close compose-type menu on outside click ───
  useEffect(() => {
    function onClick(e) {
      if (composeMenuRef.current && !composeMenuRef.current.contains(e.target)) {
        setShowComposeMenu(false);
      }
    }
    if (showComposeMenu) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [showComposeMenu]);

  // ─── Derived from current viewer ───
  const myFavourites = favouritesByUser[currentUser.id] || {};
  const myHidden = hiddenByUser[currentUser.id] || {};
  const myPinned = pinnedByUser[currentUser.id] || {};
  const myArchived = archivedByUser[currentUser.id] || {};
  const myBookmarks = bookmarksByUser[currentUser.id] || {};
  const myDismissedMissed = dismissedMissedByUser[currentUser.id] || {};

  // ─── "What You Missed" derived: posts the user hasn't seen, high/medium priority,
  // recent. Limit 5. Re-derived as feedPosts and seenBy mutate.
  const missedItems = useMemo(() => {
    return feedPosts
      .filter(p => canSeePost(p, currentUser))
      .filter(p => !p.seenBy.includes(currentUser.id))           // not yet seen
      .filter(p => p.priority === "high" || p.priority === "medium")
      .filter(p => !myDismissedMissed[p.id])                     // not dismissed
      .filter(p => p.status !== "scheduled")                     // never include scheduled
      .sort((a, b) => {
        // High priority first; then recency proxy via timestamp position
        const pri = (p) => p.priority === "high" ? 2 : p.priority === "medium" ? 1 : 0;
        return pri(b) - pri(a);
      })
      .slice(0, 5);
  }, [feedPosts, currentUser.id, myDismissedMissed]); // eslint-disable-line react-hooks/exhaustive-deps

  // Decorate every other user with this viewer's perspective on their thread
  const decoratedContacts = useMemo(() => {
    // For students: only show designated consultant + admission managers
    const isStudent = currentUser.type === "student";
    const studentAllowedIds = isStudent ? [
      // Each student gets 1 consultant + up to 3 admission managers
      "u-tousif",   // designated consultant
      "u-nur",      // admission manager
      "u-raj",      // global admission manager
      "u-jennifer", // branch manager (admission)
    ] : null;

    return USERS
      .filter(u => {
        if (u.id === currentUser.id) return false;
        if (myHidden[u.id] || myArchived[u.id]) return false;
        // Students: only see their designated contacts
        if (isStudent) return studentAllowedIds.includes(u.id);
        // Staff: hide students from DM list (they chat through groups)
        if (u.type === "student") return false;
        return true;
      })
      .map(u => {
        const tid = threadId(currentUser.id, u.id);
        const thread = messages[tid] || [];
        const last = thread[thread.length - 1];
        let preview = "No messages yet";
        if (last) {
          const fromMe = last.from === currentUser.id;
          const body = last.type === "application"
            ? `Link · #${last.application?.id || "Application"}`
            : last.type === "shared_post"
              ? `↗ Shared a post by ${last.sharedPost?.authorName || "someone"}`
              : (last.text || "");
          preview = (fromMe ? "You: " : "") + body;
          if (preview.length > 48) preview = preview.slice(0, 47) + "…";
        }
        const unread = thread.filter(m => m.to === currentUser.id && !m.read).length;
        return {
          ...u,
          lastMessage: preview,
          time: last ? last.time : "",
          hasMessages: thread.length > 0,
          unread,
          isFavourite: !!myFavourites[u.id],
          isPinned: !!myPinned[u.id],
          isArchived: !!myArchived[u.id],
          threadKey: tid,
        };
      });
  }, [currentUser.id, currentUser.type, messages, myFavourites, myHidden, myPinned, myArchived]);

  // Find the active contact. Lookup from decoratedContacts FIRST (active list);
  // fall back to a synthesized archived-contact entry so that opening an
  // archived chat actually renders the conversation thread (the user expects
  // a read-only view, not nothing).
  const activeContact = useMemo(() => {
    const fromActive = decoratedContacts.find(c => c.id === activeChatId);
    if (fromActive) return fromActive;
    if (!activeChatId) return null;
    const archivedUser = USERS.find(u => u.id === activeChatId);
    if (!archivedUser || !myArchived[archivedUser.id]) return null;
    const dmKey = threadId(currentUser.id, archivedUser.id);
    const msgs = messages[dmKey] || [];
    const last = msgs[msgs.length - 1];
    return {
      ...archivedUser,
      unread: 0,
      isFavourite: !!myFavourites[archivedUser.id],
      isPinned: false,
      isArchived: true,
      hasMessages: !!last,
      last: last?.text || "",
      time: last?.time || "",
    };
  }, [decoratedContacts, activeChatId, currentUser.id, messages, myFavourites, myArchived]);

  // ─── Groups: my groups (where current user is a member) with previews ───
  const decoratedGroups = useMemo(() => {
    return groups
      .filter(g => g.members.includes(currentUser.id))
      .filter(g => !myArchived[g.id] && !myHidden[g.id])
      .filter(g => !g.archived) // global archive (e.g. enrolled app groups past 7 days)
      .map(g => {
        const thread = messages[g.id] || [];
        const last = thread[thread.length - 1];
        let preview = "No messages yet";
        let senderName = "";
        if (last) {
          const fromMe = last.from === currentUser.id;
          const sender = findUser(last.from);
          senderName = fromMe ? "You" : (sender?.name.split(" ")[0] || "");
          const body = last.type === "application"
            ? `Link · #${last.application?.id || "Application"}`
            : last.type === "shared_post"
              ? `↗ Shared a post by ${last.sharedPost?.authorName || "someone"}`
              : (last.text || "");
          preview = `${senderName}: ${body}`;
          if (preview.length > 48) preview = preview.slice(0, 47) + "…";
        }
        const unread = thread.filter(m => m.from !== currentUser.id && !(m.readBy || []).includes(currentUser.id)).length;
        return {
          ...g,
          isGroup: true,
          lastMessage: preview,
          time: last ? last.time : g.createdAt,
          hasMessages: thread.length > 0,
          unread,
          isFavourite: !!myFavourites[g.id],
          isPinned: !!myPinned[g.id],
          isArchived: !!myArchived[g.id],
          threadKey: g.id,
          isAdmin: (g.admins || []).includes(currentUser.id),
        };
      });
  }, [groups, messages, currentUser.id, myFavourites, myPinned, myArchived, myHidden]);

  // Same pattern as activeContact — fall back to archived-group lookup so
  // archived groups can still open in read-only mode.
  const activeGroup = useMemo(() => {
    const fromActive = decoratedGroups.find(g => g.id === activeChatId);
    if (fromActive) return fromActive;
    if (!activeChatId) return null;
    const archivedGrp = groups.find(g => g.id === activeChatId);
    if (!archivedGrp || !myArchived[archivedGrp.id]) return null;
    if (!archivedGrp.members?.includes(currentUser.id)) return null;
    const grpMsgs = messages[archivedGrp.id] || [];
    const last = grpMsgs[grpMsgs.length - 1];
    return {
      ...archivedGrp,
      unread: 0,
      isFavourite: !!myFavourites[archivedGrp.id],
      isPinned: false,
      isArchived: true,
      hasMessages: !!last,
      last: last?.text || "",
      time: last?.time || "",
    };
  }, [decoratedGroups, activeChatId, groups, currentUser.id, messages, myFavourites, myArchived]);

  // ─── Invitations addressed to the current viewer ───
  const myPendingInvites = useMemo(() => {
    return invitations.filter(i => i.toUserId === currentUser.id && i.status === "pending");
  }, [invitations, currentUser.id]);

  // ─── Meeting invitations awaiting my response ───
  // I'm an attendee with status: "pending" and I'm NOT the organizer.
  const myPendingMeetingInvites = useMemo(() => {
    const all = [];
    ["upcoming"].forEach(bucket => {
      (meetings[bucket] || []).forEach(mt => {
        if (mt.organizer === currentUser.id) return;
        const a = (mt.attendees || []).find(x => x.userId === currentUser.id);
        if (a && a.status === "pending") {
          all.push({ meeting: mt });
        }
      });
    });
    return all;
  }, [meetings, currentUser.id]);

  // ─── Feed activity for my posts (likes/comments/shares from others) ───
  const myFeedActivity = useMemo(() => {
    const myReadMap = readFeedActivityByUser[currentUser.id] || {};
    return feedActivity.filter(a => a.ownerId === currentUser.id && !myReadMap[a.id]);
  }, [feedActivity, readFeedActivityByUser, currentUser.id]);

  // ─── Member events targeted at the current user (bell notifications) ───
  const myMemberEvents = useMemo(() => {
    return memberEvents.filter(e => e.toUserId === currentUser.id && !e.dismissed);
  }, [memberEvents, currentUser.id]);

  // Combined badge count for the bell — group invites + meeting invites + feed activity + member events
  const totalPendingNotifications = myPendingInvites.length + myPendingMeetingInvites.length + myFeedActivity.length + myMemberEvents.length;

  const filteredContacts = useMemo(() => {
    let list = decoratedContacts;
    if (chatSearch.trim()) {
      const q = chatSearch.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q));
    }
    if (chatTab === "unread") list = list.filter(c => c.unread > 0);
    if (chatTab === "favourites") list = list.filter(c => c.isFavourite);
    if (chatTab === "groups") list = []; // groups handled separately below
    if (chatTab === "archive") list = []; // archive handled by archivedItems
    return list;
  }, [decoratedContacts, chatTab, chatSearch]);

  const filteredGroups = useMemo(() => {
    let list = decoratedGroups;
    if (chatSearch.trim()) {
      const q = chatSearch.toLowerCase();
      list = list.filter(g => g.name.toLowerCase().includes(q));
    }
    if (chatTab === "unread") list = list.filter(g => g.unread > 0);
    if (chatTab === "favourites") list = list.filter(g => g.isFavourite);
    if (chatTab === "archive") list = []; // archive handled by archivedItems
    return list;
  }, [decoratedGroups, chatTab, chatSearch]);

  /* ─── Archived items list ───
     Both archived DMs and archived groups, merged into a single list and
     sorted by last-message timestamp (newest first) so the most recently
     archived/active conversations appear at the top. */
  const archivedItems = useMemo(() => {
    const items = [];
    USERS.forEach(u => {
      if (u.id === currentUser.id) return;
      if (!myArchived[u.id]) return;
      const dmKey = threadId(currentUser.id, u.id);
      const dmMsgs = messages[dmKey] || [];
      const last = dmMsgs[dmMsgs.length - 1];
      items.push({
        kind: "dm",
        id: u.id,
        contact: u,
        lastMessage: last,
        lastTime: last?.time || "",
        sortKey: last?.timestamp || last?.time || "",
      });
    });
    groups.forEach(g => {
      if (!g.members?.includes(currentUser.id)) return;
      if (!myArchived[g.id]) return;
      const grpMsgs = messages[g.id] || [];
      const last = grpMsgs[grpMsgs.length - 1];
      items.push({
        kind: "group",
        id: g.id,
        group: g,
        lastMessage: last,
        lastTime: last?.time || "",
        sortKey: last?.timestamp || last?.time || "",
      });
    });
    let list = items.sort((a, b) => (b.sortKey || "").localeCompare(a.sortKey || ""));
    if (chatSearch.trim()) {
      const q = chatSearch.toLowerCase();
      list = list.filter(it => {
        const name = it.kind === "dm" ? it.contact.name : it.group.name;
        return name.toLowerCase().includes(q);
      });
    }
    return list;
  }, [myArchived, messages, currentUser.id, groups, chatSearch]);

  // Pinned chats float to the top (across both contacts + groups)
  // (favourites/regulars helpers are computed inline in ChatListPanel below)

  const bookingContactsFiltered = useMemo(() => {
    if (!bookingSearch.trim()) return decoratedContacts;
    const q = bookingSearch.toLowerCase();
    return decoratedContacts.filter(c => c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q));
  }, [decoratedContacts, bookingSearch]);

  // ─── Actions ───
  const sendMessage = () => {
    if (!draftText.trim() || !activeChatId) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    if (activeGroup) {
      const replyTo = replyingToByChat[activeGroup.id] || null;
      const newMsg = {
        id: `m-${Date.now()}`,
        from: currentUser.id,
        text: draftText.trim(),
        time,
        readBy: [currentUser.id],
        replyTo: replyTo, // { id, from, fromName, text } or null
      };
      setMessages(p => ({ ...p, [activeGroup.id]: [...(p[activeGroup.id] || []), newMsg] }));
      clearReply(activeGroup.id);
    } else {
      const tid = threadId(currentUser.id, activeChatId);
      const replyTo = replyingToByChat[tid] || null;
      const newMsg = {
        id: `m-${Date.now()}`,
        from: currentUser.id,
        to: activeChatId,
        text: draftText.trim(),
        time,
        read: false,
        replyTo: replyTo,
      };
      setMessages(p => ({ ...p, [tid]: [...(p[tid] || []), newMsg] }));
      clearReply(tid);
    }
    setDraftText("");
  };

  // ─── Reactions: 6 quick reactions, one per user per emoji ───
  const REACTIONS = ["👍", "❤️", "😂", "😮", "😢", "🎉"];
  const toggleReaction = (chatKey, messageId, emoji) => {
    setMessages(prev => {
      const thread = prev[chatKey] || [];
      return {
        ...prev,
        [chatKey]: thread.map(m => {
          if (m.id !== messageId) return m;
          const reactions = { ...(m.reactions || {}) };
          const list = reactions[emoji] || [];
          if (list.includes(currentUser.id)) {
            const next = list.filter(uid => uid !== currentUser.id);
            if (next.length === 0) delete reactions[emoji];
            else reactions[emoji] = next;
          } else {
            reactions[emoji] = [...list, currentUser.id];
          }
          return { ...m, reactions };
        }),
      };
    });
    setEmojiPickerForMsg(null);
  };

  // ─── Reply: stage which message we're replying to ───
  const setReplyTarget = (chatKey, message) => {
    if (!message) return;
    const sender = message.from === currentUser.id ? currentUser : findUser(message.from);
    const fullText = (message.text || "").trim();
    const preview = fullText.length > 90 ? fullText.slice(0, 87) + "…" : fullText;
    setReplyingToByChat(prev => ({
      ...prev,
      [chatKey]: {
        id: message.id,
        from: message.from,
        fromName: sender?.name || "Unknown",
        text: preview || "(attachment)",
      },
    }));
  };
  const clearReply = (chatKey) => {
    setReplyingToByChat(prev => {
      if (!(chatKey in prev)) return prev;
      const next = { ...prev };
      delete next[chatKey];
      return next;
    });
  };


  const toggleFavourite = (contactId) => {
    setFavouritesByUser(p => {
      const my = p[currentUser.id] || {};
      const updated = { ...my, [contactId]: !my[contactId] };
      if (!updated[contactId]) delete updated[contactId];
      return { ...p, [currentUser.id]: updated };
    });
    setShowHeaderMenu(false);
  };

  const deleteChat = (contactId) => {
    // Hide this contact for the current viewer; don't actually purge messages
    // (the other party should still see the conversation)
    setHiddenByUser(p => {
      const my = p[currentUser.id] || {};
      return { ...p, [currentUser.id]: { ...my, [contactId]: true } };
    });
    if (activeChatId === contactId) setActiveChatId(null);
    setShowHeaderMenu(false);
    setChatRowMenuOpen(null);
  };

  const togglePin = (chatId) => {
    setPinnedByUser(p => {
      const my = p[currentUser.id] || {};
      const updated = { ...my, [chatId]: !my[chatId] };
      if (!updated[chatId]) delete updated[chatId];
      return { ...p, [currentUser.id]: updated };
    });
    setChatRowMenuOpen(null);
  };

  const archiveChat = (chatId) => {
    setArchivedByUser(p => {
      const my = p[currentUser.id] || {};
      return { ...p, [currentUser.id]: { ...my, [chatId]: true } };
    });
    if (activeChatId === chatId) setActiveChatId(null);
    setChatRowMenuOpen(null);
  };

  // (Dead `unarchiveChat` removed — requestUnarchive does the work inline now.)

  const openBookingFromChat = (id) => {
    const c = decoratedContacts.find(x => x.id === id);
    setBookingContact(c);
    setHubFeature("calendar");
    setCalendarTab("book");
    setShowHeaderMenu(false);
  };

  const confirmBooking = () => {
    if (!bookingContact || !selectedSlot) return;
    const dateStr = fmtDate(calYear, calMonth, selectedDate);
    const [start, end] = selectedSlot.split(" - ");
    const newMt = {
      id: `mt-${Date.now()}`,
      organizer: currentUser.id,
      title: "1:1 Meeting",
      date: dateStr,
      start, end,
      timezone: "Europe/London (GMT+1)",
      location: "Online — link generated automatically",
      duration: meetingDuration,
      attendees: [
        { userId: currentUser.id,    status: "accepted", respondedAt: "now" },
        { userId: bookingContact.id, status: "pending" },
      ],
      with: bookingContact.id,
    };
    setMeetings(p => ({ ...p, upcoming: [newMt, ...p.upcoming] }));
    setBookingConfirm({
      contact: bookingContact,
      date: prettyDate(calYear, calMonth, selectedDate),
      fullDate: new Date(calYear, calMonth, selectedDate).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
      slot: selectedSlot,
      duration: meetingDuration,
      meetingId: newMt.id,
    });
    setSelectedSlot(null);
  };

  const dismissBookingConfirm = () => setBookingConfirm(null);

  const goToScheduledMeetings = () => {
    setBookingConfirm(null);
    setCalendarTab("scheduled");
    setScheduledTab("upcoming");
  };

  // ─── Group Meeting actions ───
  const toggleGroupParticipant = (userId) => {
    setGroupParticipants(p => p.includes(userId) ? p.filter(id => id !== userId) : [...p, userId]);
  };

  const removeGroupParticipant = (userId) => {
    setGroupParticipants(p => p.filter(id => id !== userId));
    // If selection still valid, leave it — rollup auto-recomputes
  };

  const groupGoToScheduling = () => {
    if (groupParticipants.length < 2) return;
    setGroupStep("scheduling");
    setGroupSelection(null);
  };

  const groupApplySuggestion = (suggestion) => {
    setGroupSelection({ startSlot: suggestion.startSlot, endSlot: suggestion.endSlot });
    setGroupConflictExpanded(false);
  };

  const groupBeginDrag = (slot) => {
    setGroupDragStart(slot);
    setGroupSelection({ startSlot: slot, endSlot: slot });
  };

  const groupExtendDrag = (slot) => {
    if (groupDragStart === null) return;
    const start = Math.min(groupDragStart, slot);
    const end = Math.max(groupDragStart, slot);
    setGroupSelection({ startSlot: start, endSlot: end });
  };

  const groupEndDrag = () => setGroupDragStart(null);

  const groupGoToDetails = () => {
    if (!groupSelection) return;
    setGroupStep("details");
  };

  const groupBackToScheduling = () => setGroupStep("scheduling");
  const groupBackToParticipants = () => setGroupStep("participants");

  const groupGoToConfirmation = () => {
    if (!groupDetails.title.trim()) return;
    setGroupStep("confirmation");
  };

  const groupScheduleMeeting = () => {
    const dateStr = fmtDate(calYear, calMonth, selectedDate);
    const start = slotLabel(groupSelection.startSlot).trim();
    const end = slotLabel(groupSelection.endSlot + 1).trim();
    const attendees = [
      { userId: currentUser.id, status: "accepted", respondedAt: "now" },
      ...groupParticipants.map(uid => ({ userId: uid, status: "pending" })),
    ];
    const newMt = {
      id: `gmt-${Date.now()}`,
      groupMeeting: true,
      organizer: currentUser.id,
      title: groupDetails.title,
      description: groupDetails.description,
      date: dateStr,
      start, end,
      durationSlots: groupSelection.endSlot - groupSelection.startSlot + 1,
      duration: groupDuration,
      timezone: groupDetails.timezone,
      location: groupDetails.location,
      attendees,
      // legacy compat for existing renderers
      participants: [currentUser.id, ...groupParticipants],
    };
    setMeetings(p => ({ ...p, upcoming: [newMt, ...p.upcoming] }));
    setGroupScheduledMeeting(newMt);
    setGroupStep("success");
  };

  const groupResetWizard = () => {
    setGroupStep("participants");
    setGroupParticipants([]);
    setGroupParticipantSearch("");
    setGroupSelection(null);
    setGroupDuration(60);
    setGroupDetails({
      title: "",
      description: "",
      location: "Online — link generated automatically",
      timezone: "Europe/London (GMT+1)",
    });
    setGroupScheduledMeeting(null);
    setGroupConflictExpanded(false);
  };

  const groupViewMeeting = () => {
    groupResetWizard();
    setMeetingMode("individual"); // back to default tab content
    setCalendarTab("scheduled");
    setScheduledTab("upcoming");
  };

  // ─── News Feed actions ───
  // ─── Internal helper: record feed activity for the post owner ───
  const recordFeedActivity = (post, type, extra = {}) => {
    if (!post || post.author === currentUser.id) return; // don't notify yourself
    setFeedActivity(p => [{
      id: `fa-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type, // "react" | "comment" | "share"
      actorId: currentUser.id,
      ownerId: post.author,
      postId: post.id,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
      ...extra,
    }, ...p]);
  };

  const feedReact = (postId, reactionId) => {
    let actedPost = null;
    let didAdd = false;
    setFeedPosts(p => p.map(post => {
      if (post.id !== postId) return post;
      actedPost = post;
      // Determine the user's existing reaction (if any) and whether they re-clicked the same one
      const reactions = { ...(post.reactions || {}) };
      const existing = Object.keys(reactions).find(k => (reactions[k] || []).includes(currentUser.id));
      const sameAsExisting = existing === reactionId;

      // Remove the user from EVERY reaction first (only one reaction allowed per user per post)
      Object.keys(reactions).forEach(k => {
        reactions[k] = (reactions[k] || []).filter(id => id !== currentUser.id);
      });

      // If they didn't just toggle off the same reaction, add the new one
      if (!sameAsExisting) {
        reactions[reactionId] = [...(reactions[reactionId] || []), currentUser.id];
        didAdd = true;
      } else {
        didAdd = false;
      }
      return { ...post, reactions };
    }));
    setFeedReactionPickerOpen(null);
    if (didAdd && actedPost) recordFeedActivity(actedPost, "react", { reactionId });
  };

  const feedAcknowledge = (postId) => {
    setFeedPosts(p => p.map(post =>
      post.id === postId && !post.acknowledgedBy.includes(currentUser.id)
        ? { ...post, acknowledgedBy: [...post.acknowledgedBy, currentUser.id] }
        : post
    ));
  };

  const feedTogglePin = (postId) => {
    setFeedPosts(p => p.map(post =>
      post.id === postId ? { ...post, pinned: !post.pinned } : post
    ));
  };

  const feedToggleComments = (postId) => {
    setFeedExpandedComments(p => ({ ...p, [postId]: !p[postId] }));
  };

  const feedAddComment = (postId) => {
    const text = (feedCommentDraftByPost[postId] || "").trim();
    if (!text) return;
    let actedPost = null;
    setFeedPosts(p => p.map(post => {
      if (post.id !== postId) return post;
      actedPost = post;
      return { ...post, comments: [...(post.comments || []), {
        id: `c-${Date.now()}`, author: currentUser.id, text, time: "just now",
      }] };
    }));
    setFeedCommentDraftByPost(p => ({ ...p, [postId]: "" }));
    if (actedPost) recordFeedActivity(actedPost, "comment", { commentText: text.slice(0, 80) });
  };

  // (Dead `feedShare` removed — Share button now opens the unified hub Share
  // modal via `setSharePostTarget(post)` directly; no intermediate handler.)

  // Toggle a bookmark for the current user. Optimistic; in production this
  // would POST/DELETE /save-post and reconcile on response.
  const toggleBookmark = (postId) => {
    const post = feedPosts.find(p => p.id === postId);
    setBookmarksByUser(p => {
      const my = p[currentUser.id] || {};
      const isCurrentlySaved = !!my[postId];
      const updated = { ...my };
      if (isCurrentlySaved) {
        delete updated[postId];
      } else {
        updated[postId] = { savedAt: new Date().toISOString() };
      }
      // Toast feedback
      const title = post?.title || (post?.body || "").split("\n")[0].slice(0, 60) || "post";
      setBookmarkToast({ saved: !isCurrentlySaved, postTitle: title });
      setTimeout(() => setBookmarkToast(null), 2400);
      return { ...p, [currentUser.id]: updated };
    });
  };

  // Dismiss a single "What You Missed" item for this user
  const dismissMissed = (postId) => {
    setDismissedMissedByUser(p => {
      const my = p[currentUser.id] || {};
      return { ...p, [currentUser.id]: { ...my, [postId]: true } };
    });
  };

  // Dismiss all currently-shown missed items
  const dismissAllMissed = () => {
    setDismissedMissedByUser(p => {
      const my = { ...(p[currentUser.id] || {}) };
      missedItems.forEach(post => { my[post.id] = true; });
      return { ...p, [currentUser.id]: my };
    });
  };

  // ─── Scheduling permissions: admin OR senior leader (level ≤ 2) ───
  const canSchedulePosts = () => currentUser.type === "admin" || currentUser.level <= 2;

  // Scheduled posts authored by the current user
  const myScheduledPosts = useMemo(() => {
    return scheduledPosts
      .filter(p => p.author === currentUser.id)
      .sort((a, b) => (a.scheduled_at || "").localeCompare(b.scheduled_at || ""));
  }, [scheduledPosts, currentUser.id]);

  // Schedule a post: takes the current draft and creates a scheduled post
  const schedulePost = () => {
    if (!feedDraft.body.trim() && (feedDraft.photos || []).length === 0) return;
    if (!scheduleDate || !scheduleTime) return;
    const isoTarget = new Date(`${scheduleDate}T${scheduleTime}:00`).toISOString();
    const newPost = {
      id: `sched-${Date.now()}`,
      type: "text",
      category: feedDraft.category,
      priority: feedDraft.priority,
      pinned: false,
      mustAcknowledge: false,
      author: currentUser.id,
      audience: feedDraft.audience,
      timestamp: "scheduled",
      fullTimestamp: `Scheduled for ${new Date(isoTarget).toLocaleString()}`,
      body: feedDraft.body,
      photos: feedDraft.photos || [],
      tagged: feedDraft.tagged || [],
      location: feedDraft.location || "",
      feeling: feedDraft.feeling,
      reactions: {},
      comments: [],
      seenBy: [currentUser.id],
      acknowledgedBy: [],
      // scheduling metadata
      status: "scheduled",
      scheduled_at: isoTarget,
      scheduled_by: currentUser.id,
    };
    setScheduledPosts(prev => [...prev, newPost]);
    // Reset composer
    setFeedComposeExpanded(false);
    setFeedComposerSheet(null);
    setScheduleEnabled(false);
    setScheduleDate("");
    setScheduleTime("");
    setFeedTagSearch("");
    setTemplatesMenu(null);
    setSelectedTopicId(null);
    setFeedDraft({
      body: "", photos: [], tagged: [], location: "", feeling: null,
      category: "announcement", audience: "all", priority: "medium",
    });
    setBookmarkToast({ saved: true, postTitle: `Scheduled for ${new Date(isoTarget).toLocaleString()}` });
    setTimeout(() => setBookmarkToast(null), 2400);
  };

  const cancelScheduled = (postId) => {
    setScheduledPosts(prev => prev.filter(p => p.id !== postId));
  };

  const publishScheduledNow = (postId) => {
    const post = scheduledPosts.find(p => p.id === postId);
    if (!post) return;
    const published = {
      ...post,
      id: `post-${Date.now()}`,
      status: "published",
      timestamp: "now",
      fullTimestamp: "Just now",
      scheduled_at: null,
    };
    setFeedPosts(prev => [published, ...prev]);
    setScheduledPosts(prev => prev.filter(p => p.id !== postId));
  };

  // ─── Promotional commissions: who can manage, who can see ───
  // Only the System Admin / CEO / company-level admins (type==="admin") manage these.
  const canManageCommissions = () => currentUser.type === "admin";

  // ─── Permissions admin helpers ───
  const getSet = (setId) => permSets.find(s => s.id === setId);
  const setHasPerm = (set, permId) => set?.permissions?.includes(permId);

  // Count granular permissions for a module within a permission set
  const countModulePerms = (set, moduleKey) => {
    const mod = COMM_HUB_PERMISSION_MAP[moduleKey];
    if (!mod) return { enabled: 0, total: 0 };
    const total = mod.granular.length;
    const enabled = mod.granular.filter(g => setHasPerm(set, g.id)).length;
    return { enabled, total };
  };

  // Whether the module-access toggle is on for this set
  const isModuleEnabled = (set, moduleKey) => {
    const mod = COMM_HUB_PERMISSION_MAP[moduleKey];
    return mod && setHasPerm(set, mod.moduleAccess.id);
  };

  // Toggle a single permission with dependency logic.
  // - Turning OFF moduleAccess removes everything in that module.
  // - Turning ON a granular permission auto-enables base + moduleAccess.
  // - Turning OFF base removes all granular for that module (but keeps moduleAccess).
  const togglePerm = (setId, permId) => {
    setPermSets(prev => prev.map(set => {
      if (set.id !== setId) return set;
      const has = set.permissions.includes(permId);
      let perms = new Set(set.permissions);

      // Identify which module this permission belongs to
      const [moduleKey, action] = permId.split(":");
      const mod = COMM_HUB_PERMISSION_MAP[moduleKey];
      if (!mod) return set;

      const allModulePermIds = [
        mod.moduleAccess.id, mod.base.id,
        ...mod.granular.map(g => g.id),
      ];

      if (has) {
        // Turning OFF
        perms.delete(permId);
        if (permId === mod.moduleAccess.id) {
          // Cascade: removing moduleAccess removes the entire module
          allModulePermIds.forEach(id => perms.delete(id));
        } else if (permId === mod.base.id) {
          // Cascade: removing base removes all granular but keeps moduleAccess
          mod.granular.forEach(g => perms.delete(g.id));
        }
      } else {
        // Turning ON
        perms.add(permId);
        if (mod.granular.some(g => g.id === permId)) {
          // Granular requires base + moduleAccess
          perms.add(mod.base.id);
          perms.add(mod.moduleAccess.id);
        } else if (permId === mod.base.id) {
          // Base requires moduleAccess
          perms.add(mod.moduleAccess.id);
        }
      }

      return { ...set, permissions: [...perms] };
    }));
    setPermsDirty(true);
  };

  // Toggle the entire module on/off (the master switch in the left column).
  // ON = moduleAccess + base + all granular. OFF = remove everything for that module.
  const toggleModule = (setId, moduleKey) => {
    setPermSets(prev => prev.map(set => {
      if (set.id !== setId) return set;
      const mod = COMM_HUB_PERMISSION_MAP[moduleKey];
      if (!mod) return set;
      const wasEnabled = setHasPerm(set, mod.moduleAccess.id);
      const allModulePermIds = [
        mod.moduleAccess.id, mod.base.id,
        ...mod.granular.map(g => g.id),
      ];
      let perms = new Set(set.permissions);
      if (wasEnabled) {
        // Turn module off → remove everything
        allModulePermIds.forEach(id => perms.delete(id));
      } else {
        // Turn module on → enable everything
        allModulePermIds.forEach(id => perms.add(id));
      }
      return { ...set, permissions: [...perms] };
    }));
    setPermsDirty(true);
  };

  // Save changes (in this demo: just clears dirty flag and shows toast).
  // In production: persist to backend.
  const savePermChanges = () => {
    setPermsDirty(false);
    setPermsSavedToast(true);
    setTimeout(() => setPermsSavedToast(false), 2400);
  };

  // Assign a permission set to a user type
  const assignTypeToSet = (typeId, setId) => {
    setTypeAssignments(prev => ({ ...prev, [typeId]: setId }));
    setTypeAssignDropdown(null);
    setPermsDirty(true);
  };



  // Visible to user: admins see all; others see commissions matching their commission group.
  // For the demo data we don't have user.commissionGroup, so we fall back to showing all
  // active commissions (mirrors current production where consultants see commissions
  // their group qualifies for — exact group matching would be added when user records
  // grow that field).
  const visibleCommissions = useMemo(() => {
    return promotionalCommissions.filter(c => c.status === "active");
  }, [promotionalCommissions]);

  // Marketing events that should surface in the Comms Hub right rail:
  // promoted + Published or Live. Sorted: Live events first (urgency),
  // then by recency. Capped at 5 for the card (inline shows top 2 +
  // "View all" link to the rest).
  const promotedMarketingEvents = useMemo(() => {
    return marketingEvents
      .filter(e => e.promoted && (e.status === "Published" || e.status === "Live"))
      .sort((a, b) => {
        // Live always wins over Published
        if (a.status === "Live" && b.status !== "Live") return -1;
        if (b.status === "Live" && a.status !== "Live") return 1;
        return (b.createdAt || 0) - (a.createdAt || 0);
      })
      .slice(0, 5);
  }, [marketingEvents]);

  // Open the create/edit modal
  const openCommissionCreate = () => setCommissionDraft({
    id: null, // null id = new
    university: "",
    minimumStudents: "",
    startFrom: "",
    accountIntake: "",
    commissionAmount: "",
    commissionGroup: "",
  });
  const openCommissionEdit = (commission) => setCommissionDraft({ ...commission });
  const closeCommissionDraft = () => setCommissionDraft(null);

  // Save (create or update) — must validate required fields
  const saveCommission = () => {
    if (!commissionDraft) return;
    const { id, university, minimumStudents, startFrom, accountIntake, commissionAmount, commissionGroup } = commissionDraft;
    if (!university || !minimumStudents || !startFrom || !accountIntake || !commissionAmount || !commissionGroup) return;

    if (id) {
      // Update
      setPromotionalCommissions(prev => prev.map(c => c.id === id ? {
        ...c,
        university, minimumStudents: Number(minimumStudents), startFrom,
        accountIntake, commissionAmount: Number(commissionAmount), commissionGroup,
      } : c));
      setCommissionToast({ kind: "updated" });
    } else {
      // Create
      const newCommission = {
        id: `comm-${Date.now()}`,
        university, minimumStudents: Number(minimumStudents), startFrom,
        accountIntake, commissionAmount: Number(commissionAmount), commissionGroup,
        createdBy: currentUser.id,
        createdAt: new Date().toISOString(),
        status: "active",
      };
      setPromotionalCommissions(prev => [newCommission, ...prev]);
      setCommissionToast({ kind: "created" });
    }
    setTimeout(() => setCommissionToast(null), 2400);
    setCommissionDraft(null);
  };

  const deleteCommission = (id) => {
    setPromotionalCommissions(prev => prev.filter(c => c.id !== id));
    setCommissionToast({ kind: "deleted" });
    setTimeout(() => setCommissionToast(null), 2400);
  };

  // ─── Universities CRUD ───
  // Permission: System Admin OR any member of the Admission team.
  // Sales team is excluded — they don't curate the university portfolio.
  const canManageUniversities = () => currentUser.type === "admin" || currentUser.type === "admission";

  const openUniversityCreate = () => setUniversityDraft({
    id: null,
    name: "", shortName: "",
    logoBg: "#045D5E",   // default brand teal swatch
    logoInitials: "",
    country: "UK (England)",
    type: "Public",
    branch: "London Office",
    recruitment: { homeUK: true, eu: false, international: false },
  });
  const openUniversityEdit = (uni) => setUniversityDraft({ ...uni, recruitment: { ...uni.recruitment } });
  const closeUniversityDraft = () => setUniversityDraft(null);

  const saveUniversity = () => {
    if (!universityDraft) return;
    const { id, name, shortName, logoBg, logoInitials, country, type, branch, recruitment } = universityDraft;
    if (!name.trim() || !shortName.trim() || !logoInitials.trim()) return;
    const cleanInitials = logoInitials.toUpperCase().slice(0, 3);

    if (id) {
      setNewUniversities(prev => prev.map(u => u.id === id ? {
        ...u,
        name: name.trim(), shortName: shortName.trim(),
        logoBg, logoInitials: cleanInitials,
        country, type, branch,
        recruitment: { ...recruitment },
      } : u));
      setUniversityToast({ kind: "updated" });
    } else {
      const newUni = {
        id: `uni-${Date.now()}`,
        name: name.trim(), shortName: shortName.trim(),
        logoBg, logoInitials: cleanInitials,
        country, type, branch,
        recruitment: { ...recruitment },
        addedAt: new Date().toISOString(),
      };
      setNewUniversities(prev => [newUni, ...prev]);
      setUniversityToast({ kind: "created" });
    }
    setTimeout(() => setUniversityToast(null), 2400);
    setUniversityDraft(null);
  };

  const deleteUniversity = (id) => {
    setNewUniversities(prev => prev.filter(u => u.id !== id));
    setUniversityToast({ kind: "deleted" });
    setTimeout(() => setUniversityToast(null), 2400);
  };

  // ─── Courses CRUD ───
  // Permission: System Admin OR any member of the Admission team. Same rule as universities.
  const canManageCourses = () => currentUser.type === "admin" || currentUser.type === "admission";

  // ─── Message templates ───
  // Permission: System Admin OR any member of the Admission team.
  // Sales team doesn't author admission updates.
  const canUseTemplates = () => currentUser.type === "admin" || currentUser.type === "admission";

  // Look up an application by ID (case-insensitive partial match for the @ picker).
  // (Dead `findApplication` removed — application lookups happen inline.)

  // Resolve a template body's placeholders against an application + the current user (= manager).
  // Placeholders supported: {{consultant}}, {{student}}, {{university}}, {{course}}, {{intake}}, {{manager}}
  const resolveTemplate = (body, app, managerName) => {
    if (!body) return "";
    const consultant = app ? (findUser(app.consultantId)?.name || "[consultant]") : "{{consultant}}";
    const student    = app ? app.studentName     : "{{student}}";
    const university = app ? app.universityName  : "{{university}}";
    const course     = app ? app.courseName      : "{{course}}";
    const intake     = app ? app.intake          : "{{intake}}";
    const manager    = managerName               || "{{manager}}";
    return body
      .replace(/\{\{\s*consultant\s*\}\}/g, consultant)
      .replace(/\{\{\s*student\s*\}\}/g, student)
      .replace(/\{\{\s*university\s*\}\}/g, university)
      .replace(/\{\{\s*course\s*\}\}/g, course)
      .replace(/\{\{\s*intake\s*\}\}/g, intake)
      .replace(/\{\{\s*manager\s*\}\}/g, manager);
  };

  // Filter applications by search query
  const filteredApps = useMemo(() => {
    // Only show applications with "Unconditional Offer Letter" status
    const unconditional = APPLICATIONS.filter(a => a.status === "Unconditional Offer Letter");
    const q = (appSearchQuery || "").toLowerCase().trim();
    if (!q) return unconditional;
    return unconditional.filter(a =>
      a.id.toLowerCase().includes(q) ||
      a.studentName.toLowerCase().includes(q) ||
      a.universityName.toLowerCase().includes(q) ||
      a.uappId.toLowerCase().includes(q)
    );
  }, [appSearchQuery]);

  // Open the templates wizard (step 1 = pick app)
  const openTemplatesWizard = () => {
    setTemplatesMenu("app");
    setSelectedApp(null);
    setSelectedTopicId(null);
    setAppSearchQuery("");
    setFeedComposerSheet(null); // close any open sheet
  };

  // Close the entire wizard
  const closeTemplatesWizard = () => {
    setTemplatesMenu(null);
    setSelectedApp(null);
    setSelectedTopicId(null);
    setAppSearchQuery("");
  };

  // Step 1 → templates: User picked an app → skip topic selection
  // (topic is always "uncond-offer" since we only show unconditional offers)
  const wizardPickApp = (app) => {
    setSelectedApp(app);
    setSelectedTopicId("uncond-offer");
    setTemplatesMenu("templates");
  };

  // Step 2 → 3: User picked a topic
  const wizardPickTopic = (topicId) => {
    setSelectedTopicId(topicId);
    setTemplatesMenu("templates");
  };

  // Step 3 → done: User picked a template. Fully resolve and insert.
  const wizardPickTemplate = (template) => {
    const resolved = resolveTemplate(template.body, selectedApp, currentUser.name);
    setFeedDraft(d => ({ ...d, body: resolved, category: "offer" }));
    setFeedComposeExpanded(true);
    closeTemplatesWizard();
  };


  const openCourseCreate = () => setCourseDraft({
    id: null,
    title: "",
    universityShort: "",
    universityName: "",
    educationLevel: "Undergraduate",
    department: "",
    campus: "London",
    intake: "September 2026",
  });
  const openCourseEdit = (course) => setCourseDraft({ ...course });
  const closeCourseDraft = () => setCourseDraft(null);

  const saveCourse = () => {
    if (!courseDraft) return;
    const { id, title, universityShort, universityName, educationLevel, department, campus, intake } = courseDraft;
    if (!title.trim() || !universityName || !department.trim() || !intake) return;

    // Resolve universityShort from the picked universityName (look it up in newUniversities)
    const matchedUni = newUniversities.find(u => u.name === universityName);
    const resolvedShort = universityShort || matchedUni?.shortName || universityName.split(" ").map(w => w[0]).join("").slice(0, 4).toUpperCase();

    if (id) {
      setNewCourses(prev => prev.map(c => c.id === id ? {
        ...c,
        title: title.trim(),
        universityShort: resolvedShort,
        universityName,
        educationLevel, department: department.trim(), campus, intake,
      } : c));
      setCourseToast({ kind: "updated" });
    } else {
      const newCourse = {
        id: `course-${Date.now()}`,
        title: title.trim(),
        universityShort: resolvedShort,
        universityName,
        educationLevel, department: department.trim(), campus, intake,
        addedAt: new Date().toISOString(),
      };
      setNewCourses(prev => [newCourse, ...prev]);
      setCourseToast({ kind: "created" });
    }
    setTimeout(() => setCourseToast(null), 2400);
    setCourseDraft(null);
  };

  const deleteCourse = (id) => {
    setNewCourses(prev => prev.filter(c => c.id !== id));
    setCourseToast({ kind: "deleted" });
    setTimeout(() => setCourseToast(null), 2400);
  };
  const dismissFeedActivity = (activityId) => {
    setReadFeedActivityByUser(p => {
      const my = p[currentUser.id] || {};
      return { ...p, [currentUser.id]: { ...my, [activityId]: true } };
    });
  };

  const dismissAllFeedActivity = () => {
    setReadFeedActivityByUser(p => {
      const my = p[currentUser.id] || {};
      const updated = { ...my };
      myFeedActivity.forEach(a => { updated[a.id] = true; });
      return { ...p, [currentUser.id]: updated };
    });
  };

  const feedPublish = () => {
    if (!feedDraft.body.trim() && (feedDraft.photos || []).length === 0) return;
    const newPost = {
      id: `post-${Date.now()}`,
      type: "text",
      category: feedDraft.category,
      priority: feedDraft.priority,
      pinned: false,
      mustAcknowledge: false,
      author: currentUser.id,
      audience: feedDraft.audience,
      timestamp: "now",
      fullTimestamp: "Just now",
      body: feedDraft.body,
      photos: feedDraft.photos || [],
      tagged: feedDraft.tagged || [],
      location: feedDraft.location || "",
      feeling: feedDraft.feeling,
      reactions: {},
      comments: [],
      seenBy: [currentUser.id],
      acknowledgedBy: [],
    };
    setFeedPosts(p => [newPost, ...p]);
    setFeedComposeExpanded(false);
    setFeedComposerSheet(null);
    setFeedTagSearch("");
    setTemplatesMenu(null);
    setSelectedTopicId(null);
    setFeedDraft({
      body: "", photos: [], tagged: [], location: "", feeling: null,
      category: "announcement", audience: "all", priority: "medium",
    });
  };

  // ─── Facebook-style composer helpers ───
  const feedComposerToggleTag = (userId) => {
    setFeedDraft(p => ({
      ...p,
      tagged: p.tagged.includes(userId)
        ? p.tagged.filter(id => id !== userId)
        : [...p.tagged, userId],
    }));
  };
  const feedComposerTogglePhoto = (photo) => {
    setFeedDraft(p => {
      const has = (p.photos || []).find(x => x.id === photo.id);
      return {
        ...p,
        photos: has
          ? p.photos.filter(x => x.id !== photo.id)
          : [...(p.photos || []), photo],
      };
    });
  };
  const feedComposerSetFeeling = (feeling) => {
    setFeedDraft(p => ({ ...p, feeling: p.feeling?.id === feeling.id ? null : feeling }));
    setFeedComposerSheet(null);
  };
  const feedComposerSetLocation = (loc) => {
    setFeedDraft(p => ({ ...p, location: loc }));
  };
  const feedComposerCollapse = () => {
    setFeedComposeExpanded(false);
    setFeedComposerSheet(null);
    setFeedTagSearch("");
    setTemplatesMenu(null);
    setSelectedTopicId(null);
    setFeedDraft({
      body: "", photos: [], tagged: [], location: "", feeling: null,
      category: "announcement", audience: "all", priority: "medium",
    });
  };

  // ─── Derived feed data ───
  const myUnreadFeedCount = useMemo(() => {
    return feedPosts.filter(p => !p.seenBy.includes(currentUser.id) && canSeePost(p, currentUser)).length;
  }, [feedPosts, currentUser.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const visibleFeedPosts = useMemo(() => {
    let list = feedPosts.filter(p => canSeePost(p, currentUser));

    // Search
    if (feedSearch.trim()) {
      const q = feedSearch.toLowerCase();
      list = list.filter(p => {
        const author = findUser(p.author);
        return (
          (p.title || "").toLowerCase().includes(q) ||
          (p.body || "").toLowerCase().includes(q) ||
          (p.structured?.studentName || "").toLowerCase().includes(q) ||
          (p.structured?.university || "").toLowerCase().includes(q) ||
          (author?.name || "").toLowerCase().includes(q)
        );
      });
    }

    // ─── Scope filter (NEW RULE) ───
    // For You    : posts the user authored OR is mentioned in (tagged / assignedTo / commenter)
    // Team Updates: posts targeted at the user's department (admin sees all team-targeted)
    // Company Wide: every post the user can see (the full list)

    // Helper: does this post mention the user in any way?
    const isMentioned = (p, viewerId) => {
      if (Array.isArray(p.tagged) && p.tagged.includes(viewerId)) return true;
      if (p.structured?.assignedTo === viewerId) return true;
      // If they've commented, they're effectively engaged with it
      if (Array.isArray(p.comments) && p.comments.some(c => c.author === viewerId)) return true;
      return false;
    };

    let scoped;
    if (feedScope === "saved") {
      // Saved Posts — pull from current user's bookmarks. Posts that no longer
      // exist in the feed remain visible as "removed" placeholders.
      const myMarks = bookmarksByUser[currentUser.id] || {};
      scoped = Object.keys(myMarks).map(id => {
        const post = list.find(p => p.id === id);
        if (post) return { ...post, savedAt: myMarks[id]?.savedAt };
        return { id, removed: true, savedAt: myMarks[id]?.savedAt, pinned: false };
      });
      // Sort newest-saved first
      return scoped.sort((a, b) => (b.savedAt || "").localeCompare(a.savedAt || ""));
    } else if (feedScope === "company") {
      // Everything the user can see
      scoped = list;
    } else if (feedScope === "team") {
      // Team Updates: personalized feed using content preferences.
      // Step 1: scope to department-relevant posts
      let pool;
      if (currentUser.dept === "system") {
        pool = list.filter(p => p.audience === "sales" || p.audience === "admission" || p.audience === "leadership" || p.audience === "all");
      } else {
        pool = list.filter(p =>
          p.audience === currentUser.dept ||
          p.audience === "all" ||
          (p.audience === "leadership" && currentUser.level <= 3)
        );
      }
      // Step 2: exclude muted categories + hidden departments
      pool = pool.filter(p => {
        if (contentPrefs.muted.includes(p.category)) return false;
        const authorUser = findUser(p.author);
        if (authorUser && contentPrefs.hiddenDepts.includes(authorUser.dept)) return false;
        return true;
      });
      // Step 3: score each post
      scoped = pool.map(p => {
        let score = 0;
        if (contentPrefs.seeMore.includes(p.category)) score += 10;
        if (contentPrefs.seeLess.includes(p.category)) score -= 5;
        const authorUser = findUser(p.author);
        if (authorUser && contentPrefs.preferredDepts.includes(authorUser.dept)) score += 5;
        if (contentPrefs.priorityOn && p.priority === "high") score += 15;
        if (p.urgent) score += 20;
        return { ...p, _score: score };
      });
      // Step 4: sort by score desc, then chronological
      scoped.sort((a, b) => (b._score || 0) - (a._score || 0));
    } else {
      // For You: authored by user OR they are mentioned/tagged/assigned/commented.
      scoped = list.filter(p =>
        p.author === currentUser.id ||
        isMentioned(p, currentUser.id)
      );
    }

    // Pinned first, then preserve seed order (chronological)
    return [
      ...scoped.filter(p => p.pinned),
      ...scoped.filter(p => !p.pinned),
    ];
  }, [feedPosts, feedSearch, feedScope, currentUser.id, currentUser.dept, currentUser.level, bookmarksByUser, contentPrefs]); // eslint-disable-line react-hooks/exhaustive-deps

  const openCompose = () => {
    setComposingNew(true);
    setActiveChatId(null);
    setComposeSelected(null);
    setComposeQuery("");
    setDraftText("");
    setComposeDropdown(false);
  };

  const closeCompose = () => {
    setComposingNew(false);
    setComposeSelected(null);
    setComposeQuery("");
    setComposeDropdown(false);
  };

  const pickComposeContact = (c) => {
    setComposeSelected(c);
    setComposeQuery("");
    setComposeDropdown(false);
  };

  const clearComposePick = () => {
    setComposeSelected(null);
    setComposeQuery("");
    setComposeDropdown(true);
  };

  const sendComposed = () => {
    if (!composeSelected || !draftText.trim()) return;
    const tid = threadId(currentUser.id, composeSelected.id);
    const newMsg = {
      id: `m-${Date.now()}`,
      from: currentUser.id,
      to: composeSelected.id,
      text: draftText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
      read: false,
    };
    setMessages(p => ({ ...p, [tid]: [...(p[tid] || []), newMsg] }));
    setDraftText("");
    setActiveChatId(composeSelected.id);
    setComposingNew(false);
    setComposeSelected(null);
    setComposeQuery("");
  };

  const sendApplication = (app) => {
    const targetId = composingNew ? composeSelected?.id : activeChatId;
    if (!targetId) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    if (activeGroup && !composingNew) {
      const newMsg = {
        id: `m-${Date.now()}`,
        from: currentUser.id,
        type: "application",
        application: app,
        time,
        readBy: [currentUser.id],
      };
      setMessages(p => ({ ...p, [activeGroup.id]: [...(p[activeGroup.id] || []), newMsg] }));
    } else {
      const tid = threadId(currentUser.id, targetId);
      const newMsg = {
        id: `m-${Date.now()}`,
        from: currentUser.id,
        to: targetId,
        type: "application",
        application: app,
        time,
        read: false,
      };
      setMessages(p => ({ ...p, [tid]: [...(p[tid] || []), newMsg] }));
    }
    if (composingNew) {
      setActiveChatId(composeSelected.id);
      setComposingNew(false);
      setComposeSelected(null);
      setComposeQuery("");
    }
    setAttachMenu(null);
    setAppPickerSearch("");
  };

  // ─── Group + Invitation actions ───
  const openGroup = (groupId) => {
    setActiveChatId(groupId);
    setComposingNew(false);
  };

  const createGroup = () => {
    const name = groupForm.name.trim();
    if (!name) return;
    const pickedIds = Object.keys(groupForm.picked).filter(id => groupForm.picked[id]);
    if (pickedIds.length === 0) return;

    // Split into direct (added straight away) vs invite (must accept)
    const directIds = [];
    const inviteIds = [];
    pickedIds.forEach(id => {
      const target = findUser(id);
      const mode = membershipMode(currentUser, target);
      if (mode === "direct") directIds.push(id);
      else inviteIds.push(id);
    });

    const newGroupId = `g-${Date.now()}`;
    const newGroup = {
      id: newGroupId,
      name,
      description: "",
      color: ROLE_GROUPS.find(r => r.id === currentUser.type)?.accent || C.primary,
      iconName: "Users",
      createdBy: currentUser.id,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
      members: [currentUser.id, ...directIds],
      admins: [currentUser.id],
    };
    setGroups(p => [newGroup, ...p]);

    // Fire invitations for upper-hierarchy / cross-team picks
    if (inviteIds.length > 0) {
      const newInvites = inviteIds.map((id, i) => ({
        id: `inv-${Date.now()}-${i}`,
        groupId: newGroupId,
        fromUserId: currentUser.id,
        toUserId: id,
        sentAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
        status: "pending",
      }));
      setInvitations(p => [...p, ...newInvites]);
    }

    // Reset form, close modal, open the new group
    setGroupForm({ name: "", picked: {} });
    setGroupMemberSearch("");
    setCreateGroupOpen(false);
    setActiveChatId(newGroupId);
  };

  const acceptInvitation = (invId) => {
    const inv = invitations.find(i => i.id === invId);
    if (!inv) return;
    setInvitations(p => p.map(i => i.id === invId ? { ...i, status: "accepted" } : i));
    setGroups(p => p.map(g =>
      g.id === inv.groupId && !g.members.includes(inv.toUserId)
        ? { ...g, members: [...g.members, inv.toUserId] }
        : g
    ));
  };

  const rejectInvitation = (invId) => {
    setInvitations(p => p.map(i => i.id === invId ? { ...i, status: "rejected" } : i));
  };

  // Manually archive an application group (consultant or admission manager).
  // Sets the group's global archived flag so it disappears for everyone.
  const archiveAppGroup = (groupId) => {
    setGroups(prev => prev.map(g =>
      g.id === groupId
        ? { ...g, archived: true, archivedAt: new Date().toISOString() }
        : g
    ));
    setActiveChatId(null); // close the conversation since it's now archived
  };

  // ─── Group member management (regular groups only — app groups are closed) ───

  // (Group-member helpers `addGroupMember`, `removeGroupMember`, `makeGroupAdmin`,
  // and `demoteGroupAdmin` were replaced by the staged-draft flow that commits
  // multiple changes at once via `commitMembershipDraft`. The old single-action
  // helpers are removed; see Members panel for the new flow.)

  // Leave a group (any member). Returns true if left, false if blocked.
  // Blocks the last admin from leaving — they must promote someone first.
  const leaveGroup = (groupId) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return false;
    const admins = group.admins || [];
    const isLastAdmin = admins.length === 1 && admins[0] === currentUser.id;
    if (isLastAdmin) return false; // caller should show an error toast
    setGroups(prev => prev.map(g => {
      if (g.id !== groupId) return g;
      return {
        ...g,
        members: g.members.filter(m => m !== currentUser.id),
        admins: (g.admins || []).filter(a => a !== currentUser.id),
      };
    }));
    setActiveChatId(null);
    return true;
  };

  // Open the Manage Members modal for a given group, seeding the draft state.
  const openMembersPanel = (group) => {
    if (!group) return;
    setDraftMembers(group.members);
    setDraftAdmins(group.admins || []);
    setDraftGroupId(group.id);
    setShowMembersPanel(true);
    setMemberMenuOpen(null);
  };

  // Append a system message to a group's chat (visible to all current members).
  const appendGroupSystemMessage = (groupId, text) => {
    const newMsg = {
      id: `sys-${groupId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type: "system",
      text,
      from: "system",
      time: "Just now",
      read: true,
    };
    setMessages(p => ({ ...p, [groupId]: [...(p[groupId] || []), newMsg] }));
  };

  // Lightweight "x minutes ago" formatter for notification timestamps.
  const timeAgo = (iso) => {
    if (!iso) return "Just now";
    const ms = Date.now() - new Date(iso).getTime();
    if (ms < 60_000) return "Just now";
    const mins = Math.floor(ms / 60_000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  // Notify a specific user about a member event (so it shows in their bell panel).
  const notifyMemberEvent = (toUserId, fromUserId, groupId, type) => {
    if (toUserId === fromUserId) return; // never notify yourself
    setMemberEvents(prev => [...prev, {
      id: `mev-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      toUserId, fromUserId, groupId, type,
      time: new Date().toISOString(),
      dismissed: false,
    }]);
  };

  // Dismiss a member-event notification (called from the bell panel).
  const dismissMemberEvent = (eventId) => {
    setMemberEvents(prev => prev.map(e =>
      e.id === eventId ? { ...e, dismissed: true } : e
    ));
  };

  // ─── Switch between UAPP applications (CRM, Comms Hub, Leads, etc.) ───
  // Closes the launcher and routes to the right initial page within each app.
  const switchApp = (appId) => {
    setShowAppLauncher(false);
    setCurrentApp(appId);
    if (appId === "crm") {
      setActivePage("dashboard");
    } else if (appId === "comms") {
      setActivePage("communication-hub");
      setHubFeature("feed");
    }
    // For leads/chat/knowledge/website, the placeholder screen renders based on currentApp
  };

  // ─── Meeting response actions ───
  const respondToMeeting = (meetingId, response) => {
    const ts = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    setMeetings(p => {
      const updateBucket = (list) => list.map(mt => {
        if (mt.id !== meetingId) return mt;
        const attendees = (mt.attendees || []).map(a =>
          a.userId === currentUser.id ? { ...a, status: response, respondedAt: ts } : a
        );
        return { ...mt, attendees };
      });
      return {
        ...p,
        upcoming: updateBucket(p.upcoming || []),
        passed: updateBucket(p.passed || []),
        canceled: updateBucket(p.canceled || []),
      };
    });
  };
  const acceptMeeting = (meetingId) => respondToMeeting(meetingId, "accepted");
  const rejectMeeting = (meetingId) => respondToMeeting(meetingId, "rejected");

  // ─── Reminder actions ───
  const triggerReminder = (meetingId) => {
    setActiveReminders(p => ({ ...p, [meetingId]: true }));
  };

  const dismissReminder = (meetingId) => {
    setDismissedByUser(p => {
      const my = p[currentUser.id] || {};
      return { ...p, [currentUser.id]: { ...my, [meetingId]: true } };
    });
  };

  const snoozeReminder = (meetingId) => {
    // Snooze for the demo simply dismisses; in a real backend it would re-fire in 5 min
    dismissReminder(meetingId);
  };

  // Reminders visible to the current viewer:
  //  · meeting is in the upcoming bucket
  //  · current user is an attendee with status === "accepted"
  //  · reminder is active (manually triggered or auto-fired)
  //  · current user hasn't dismissed it
  const myActiveReminders = useMemo(() => {
    const myDismissed = dismissedByUser[currentUser.id] || {};
    return (meetings.upcoming || [])
      .filter(mt => activeReminders[mt.id] && !myDismissed[mt.id])
      .filter(mt => {
        const a = (mt.attendees || []).find(x => x.userId === currentUser.id);
        return a && a.status === "accepted";
      });
  }, [meetings, activeReminders, dismissedByUser, currentUser.id]);

  // ═══ GLOBAL CSS ═══
  const globalCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700;800;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root { width: 100%; height: 100%; }
    body { font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; background: ${C.bg}; color: ${C.text}; }
    button { font-family: inherit; cursor: pointer; border: none; background: none; }
    input, textarea { font-family: inherit; outline: none; }
    input:focus, textarea:focus { border-color: ${C.primary} !important; box-shadow: 0 0 0 3px ${C.primary20} !important; }

    .smooth { transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1); }
    .lift:hover { transform: translateY(-1px); }
    .pop { animation: pop 0.32s cubic-bezier(0.34, 1.56, 0.64, 1); }
    @keyframes pop { from { opacity: 0; transform: scale(0.96) } to { opacity: 1; transform: scale(1) } }

    /* Reduced motion: respect user preference */
    @media (prefers-reduced-motion: reduce) {
      .smooth, .lift, .pop, .slide-r, .fade-up { animation: none !important; transition: none !important; transform: none !important; }
    }

    /* Focus visible: keyboard-only focus ring */
    button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
      outline: 2px solid ${C.primary};
      outline-offset: 2px;
    }
    button:focus:not(:focus-visible) { outline: none; }

    /* Hide horizontal scrollbar on tab strips and similar overflow-x containers.
       The inline scrollbarWidth/msOverflowStyle properties handle Firefox/IE,
       and this rule handles WebKit (Chrome/Safari). Element still scrolls,
       just without a visible bar. */
    .no-scrollbar::-webkit-scrollbar { display: none; height: 0; width: 0; }

    .slide-r { animation: sR 0.34s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes sR { from { opacity: 0; transform: translateX(20px) } to { opacity: 1; transform: translateX(0) } }

    .fade-up { animation: fU 0.32s ease; }
    @keyframes fU { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }

    .pulse-dot { animation: pd 1.4s ease-in-out infinite; }
    @keyframes pd { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }

    /* Message hover actions — React + Reply toolbar floats above the bubble.
       Visibility is controlled by JS state (hoveredMsgId / emojiPickerForMsg)
       not CSS :hover, so a 200ms grace period prevents flicker when the
       cursor crosses the small gap between bubble and toolbar. */
    .msg-hover-wrap { position: relative; }
    .msg-hover-actions button:hover {
      cursor: pointer;
    }

    .typing-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${C.textSoft}; margin: 0 1px; animation: typ 1.2s infinite; }
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typ { 0%, 60%, 100% { transform: translateY(0) } 30% { transform: translateY(-5px) } }

    .reminder-pop {
      animation: rPop 0.42s cubic-bezier(0.16, 1, 0.3, 1) backwards;
    }
    @keyframes rPop {
      from { opacity: 0; transform: translateX(28px) scale(0.95); }
      to   { opacity: 1; transform: translateX(0) scale(1); }
    }
    .reminder-shimmer {
      animation: rShim 2.4s linear infinite;
    }
    @keyframes rShim {
      from { transform: translateX(-100%); }
      to   { transform: translateX(100%); }
    }
    .reminder-dot {
      animation: rDot 1.2s ease-in-out infinite;
    }
    @keyframes rDot {
      0%, 100% { opacity: 0.45; transform: scale(0.85); }
      50%      { opacity: 1;    transform: scale(1.15); }
    }

    /* Hide promotional right rail on narrow viewports so the feed stays usable */
    @media (max-width: 1100px) {
      .promo-rail { display: none !important; }
    }
    .promo-card { will-change: transform, box-shadow; }

    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: ${C.bg}; }
    ::-webkit-scrollbar-thumb { background: rgba(4,93,94,0.18); border-radius: 4px; border: 2px solid ${C.bg}; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(4,93,94,0.35); }

    .navbtn { transition: all 0.15s ease; }
    .navbtn:hover { background: ${C.primary10}; }

    .chatrow { transition: all 0.14s ease; cursor: pointer; }
    .chatrow:hover { background: ${C.primary05}; }
    .chatrow.active { background: ${C.primary10}; }

    .timeslot { transition: all 0.14s ease; cursor: pointer; }
    .timeslot:hover { border-color: ${C.primary} !important; background: ${C.primary05} !important; }
    .timeslot.selected { background: ${C.primary} !important; color: #fff !important; border-color: ${C.primary} !important; }

    .daycell { transition: all 0.14s ease; cursor: pointer; }
    .daycell:hover:not(.disabled) { background: ${C.primary10}; }

    .iconbtn { transition: all 0.14s ease; }
    .iconbtn:hover { background: ${C.primary10}; color: ${C.primary}; }
  `;

  /* ═══════════════════════════════════════════════════════════════
     SIDEBAR COMPONENTS
     ═══════════════════════════════════════════════════════════════ */
  const sidebarItems = [
    { id: "dashboard", Icon: LayoutDashboard, label: "Dashboard" },
    { id: "profile", Icon: User, label: "My Profile" },
    { id: "staff", Icon: Users, label: "Staff", chev: true },
    { id: "affiliates", Icon: UserCog, label: "Affiliates", chev: true },
    { id: "referrers", Icon: UserPlus, label: "Referrers", chev: true },
    { id: "consultant", Icon: Briefcase, label: "Consultant", chev: true },
    { id: "student", Icon: GraduationCap, label: "Student" },
    { id: "lead", Icon: Pin, label: "Lead Students" },
    {
      id: "uni",
      Icon: Building2,
      label: "University",
      chev: true,
      subItems: [
        { id: "uni-list",       label: "Universities" },
        { id: "uni-programs",   label: "Programs" },
        { id: "uni-intakes",    label: "Manage Intakes" },
      ],
    },
    { id: "search-apply", Icon: Search, label: "Search & Apply" },
    { id: "applications", Icon: FileText, label: "Applications" },
    { id: "interested", Icon: FileText, label: "Interest Applications" },
    {
      id: "commission",
      Icon: Wallet,
      label: "Commission",
      chev: true,
      subItems: [
        { id: "commission-promotional", label: "Promotional Commission List" },
        { id: "commission-account", label: "Account Intakes" },
        { id: "commission-distribution", label: "Distribution Settings" },
      ],
    },
    { id: "accounts", Icon: Network, label: "Accounts", chev: true },
    { id: "providers", Icon: Globe, label: "Providers" },
    { id: "branch", Icon: GitBranch, label: "Branch" },
    { id: "report", Icon: BarChart3, label: "Report" },
    { id: "pipeline", Icon: BarChart2, label: "Pipeline", chev: true },
    { id: "settings", Icon: Cog, label: "Settings", chev: true },
    { id: "ism", Icon: Inbox, label: "ISM" },
    { id: "contents", Icon: FileText, label: "Contents" },
    { id: "notice", Icon: AlertCircle, label: "Notice" },
    { id: "live-intake", Icon: CalendarDays, label: "Live Intake" },
    { id: "help", Icon: Info, label: "Help" },
    { id: "login-history", Icon: Clock, label: "Login History" },
    { id: "tc", Icon: FileCheck, label: "T&C" },
  ];

  // The CRM sidebar is always full-width; the collapsed mode (when comm hub
  // was a CRM feature) is no longer needed since Comms Hub is now its own app.
  const collapsed = false;
  // The sidebar group key for the *current* activePage's parent (for highlighting)
  const activeParentGroup =
    activePage.startsWith("commission-") ? "commission" :
    activePage.startsWith("uni-") ? "uni" :
    null;

  function FullSidebar() {
    return (
      <aside style={{
        width: collapsed ? 56 : 232,
        background: C.surface,
        borderRight: `1px solid ${C.border}`,
        display: "flex", flexDirection: "column",
        position: "sticky", top: 0, height: "100vh",
        flexShrink: 0,
        transition: "width 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        zIndex: 5,
      }}>
        {/* Logo */}
        <div style={{
          padding: collapsed ? "18px 0" : "20px 18px",
          borderBottom: `1px solid ${C.divider}`,
          display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: 10, minHeight: 64,
        }}>
          {collapsed ? (
            <button
              onClick={() => setActivePage("dashboard")}
              className="iconbtn smooth"
              style={{
                width: 36, height: 36, borderRadius: 9,
                background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
              title="Back to dashboard"
            >
              <ChevronsRight size={16} color="#fff" style={{ transform: "rotate(180deg)" }} />
            </button>
          ) : (
            <>
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <GraduationCap size={18} color="#fff" />
              </div>
              <div style={{ lineHeight: 1.1 }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: C.primary, letterSpacing: "-0.02em" }}>
                  U<span style={{ color: C.secondary }}>APP</span>
                </div>
                <div style={{ fontSize: 8, color: C.textSoft, fontWeight: 600, letterSpacing: "0.06em" }}>
                  GLOBAL UNIVERSITY<br />APPLICATION PORTAL
                </div>
              </div>
            </>
          )}
        </div>

        {/* Nav items */}
        <nav style={{
          flex: 1, padding: collapsed ? "10px 6px" : "12px 10px",
          display: "flex", flexDirection: "column", gap: 2,
          overflowY: "auto",
        }}>
          {sidebarItems.map(({ id, Icon, label, chev, subItems }) => {
            const active = id === activePage;
            const isParentOfActive = activeParentGroup === id;
            const isExpanded = expandedSidebarGroups[id] || isParentOfActive;
            const handleClick = () => {
              if (chev && subItems && !collapsed) {
                // Toggle the expansion (don't navigate to the parent itself)
                setExpandedSidebarGroups(p => ({ ...p, [id]: !p[id] }));
              } else {
                setActivePage(id);
                // Sidebar navigation always exits any in-progress student edit
                // — the form is only entered via row-level edit icons.
                setEditingStudentId(null);
              }
            };
            const button = (
              <button
                key={id}
                onClick={handleClick}
                className="navbtn smooth"
                style={{
                  width: "100%",
                  display: "flex", alignItems: "center",
                  justifyContent: collapsed ? "center" : "flex-start",
                  gap: 11, padding: collapsed ? "10px 0" : "9px 11px",
                  borderRadius: 9,
                  background: active ? C.primary : (isParentOfActive ? C.primary05 : "transparent"),
                  color: active ? "#fff" : (isParentOfActive ? C.primary : C.textMid),
                  fontSize: 12.5,
                  fontWeight: active || isParentOfActive ? 600 : 500,
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <Icon size={16} />
                {!collapsed && <span style={{ flex: 1 }}>{label}</span>}
                {!collapsed && chev && (
                  <ChevronDown
                    size={13}
                    opacity={0.55}
                    style={{
                      transition: "transform 0.18s ease",
                      transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
                    }}
                  />
                )}
              </button>
            );
            const wrapped = collapsed ? <Tooltip key={id} label={label}>{button}</Tooltip> : button;

            // Render sub-items beneath (only when sidebar is expanded AND group is expanded)
            const subList = !collapsed && isExpanded && subItems && subItems.length > 0 ? (
              <div key={id + "-sublist"} style={{
                paddingLeft: 28, paddingTop: 2, paddingBottom: 4,
                display: "flex", flexDirection: "column", gap: 1,
              }}>
                {subItems.map(sub => {
                  const subActive = sub.id === activePage;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setActivePage(sub.id)}
                      className="smooth"
                      style={{
                        width: "100%",
                        padding: "7px 11px", borderRadius: 7,
                        background: subActive ? C.primary10 : "transparent",
                        color: subActive ? C.primary : C.textMid,
                        fontSize: 11.5,
                        fontWeight: subActive ? 600 : 500,
                        textAlign: "left",
                        position: "relative",
                        display: "flex", alignItems: "center", gap: 8,
                        borderLeft: `2px solid ${subActive ? C.primary : C.divider}`,
                      }}
                      onMouseEnter={e => { if (!subActive) { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; } }}
                      onMouseLeave={e => { if (!subActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; } }}
                    >
                      {sub.label}
                    </button>
                  );
                })}
              </div>
            ) : null;

            return (
              <Fragment key={id + "-frag"}>
                {wrapped}
                {subList}
              </Fragment>
            );
          })}
        </nav>
      </aside>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     COMMUNICATION HUB SUB-NAV (vertical icons strip)
     ═══════════════════════════════════════════════════════════════ */
  function HubSubNav() {
    // Sum of pending booking actions for the current user:
    //   • DM/group meeting invitations awaiting my response (myPendingInvites)
    //   • Meeting attendee entries where my status === "pending" (myPendingMeetingInvites)
    // Both feed into one badge so users don't miss anything time-sensitive.
    const bookingBadge = (myPendingInvites?.length || 0) + (myPendingMeetingInvites?.length || 0);

    const isAdmin = currentUser.type === "admin";
    const isStudent = currentUser.type === "student";
    const isStaff = !isAdmin && !isStudent; // sales or admission

    // Build sidebar items based on user role
    const items = [];
    if (!isStudent) items.push({ id: "feed", Icon: Newspaper, label: "News Feed", badge: myUnreadFeedCount });
    items.push({ id: "chats", Icon: MessageCircleMore, label: "Chats", badge: decoratedContacts.reduce((a, c) => a + (c.unread || 0), 0) });
    items.push({ id: "calendar", Icon: CalendarIcon, label: "Bookings", badge: bookingBadge });
    if (!isStudent) items.push({ id: "availability", Icon: Clock, label: "My Schedule" });
    // Settings: admin sees all sub-items, staff sees only Feed Preferences + Timezone
    if (!isStudent) {
      const settingsSubItems = isAdmin
        ? [
            { id: "settings-users",       Icon: Users,  label: "Users" },
            { id: "settings-permissions", Icon: Shield, label: "Permissions" },
            { id: "settings-webhooks",    Icon: Zap,    label: "Webhooks" },
            { id: "settings-promos",     Icon: Megaphone, label: "Promotions" },
            { id: "settings-algorithm",  Icon: SlidersHorizontal, label: "Feed Preferences" },
            { id: "settings-timezone",    Icon: Globe,  label: "Timezone Settings" },
          ]
        : [
            { id: "settings-algorithm",  Icon: SlidersHorizontal, label: "Feed Preferences" },
            { id: "settings-timezone",    Icon: Globe,  label: "Timezone Settings" },
          ];
      items.push({ id: "settings", Icon: Cog, label: "Settings", expandable: true, subItems: settingsSubItems });
    }
    return (
      <aside style={{
        width: 232,
        background: C.surface,
        borderRight: `1px solid ${C.border}`,
        display: "flex", flexDirection: "column",
        flexShrink: 0,
      }}>
        {/* Section header — gives the sidebar an identity */}
        <div style={{
          padding: "20px 16px 16px",
          borderBottom: `1px solid ${C.divider}`,
          display: "flex", alignItems: "center", gap: 11,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: C.primary,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Headphones size={15} color="#fff" strokeWidth={2.2} />
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text, letterSpacing: "-0.01em" }}>
              Comms Hub
            </div>
            <div style={{ fontSize: 11, color: C.textSoft, fontWeight: 500 }}>
              UAPP Communication
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav style={{
          flex: 1, padding: "12px 10px",
          display: "flex", flexDirection: "column", gap: 2,
          overflowY: "auto",
        }}>
          {items.map((item) => {
            const { id, Icon, label, badge, expandable, subItems } = item;
            const isSettings = id === "settings";
            const active = isSettings ? hubFeature === "settings" : hubFeature === id;
            const expanded = isSettings && hubFeature === "settings";
            return (
              <Fragment key={id}>
                <button
                  onClick={() => {
                    if (isSettings) {
                      if (hubFeature === "settings") {
                        // Already in settings — toggle back to feed (or stay)
                      } else {
                        setHubFeature("settings");
                      }
                    } else {
                      setHubFeature(id);
                    }
                  }}
                  className="navbtn smooth"
                  style={{
                    width: "100%",
                    display: "flex", alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 11, padding: "11px 14px",
                    borderRadius: T.radMd,
                    background: active ? C.primary10 : "transparent",
                    color: active ? C.primary : C.textMid,
                    fontSize: 13,
                    fontWeight: active ? 600 : 500,
                    textAlign: "left",
                    position: "relative",
                    fontFamily: "'Roboto', sans-serif",
                    border: "none", cursor: "pointer",
                  }}
                >
                  <Icon size={15} />
                  <span style={{ flex: 1 }}>{label}</span>
                  {badge > 0 && (
                    <span style={{
                      minWidth: 18, height: 18, padding: "0 5px",
                      borderRadius: T.radFull,
                      background: C.secondaryDark,
                      color: "#fff",
                      fontSize: T.fontXs, fontWeight: 700,
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {badge > 99 ? "99+" : badge}
                    </span>
                  )}
                  {expandable && (
                    expanded
                      ? <ChevronDown size={13} color={active ? C.primary : C.textVerySoft} />
                      : <ChevronRight size={13} color={C.textVerySoft} />
                  )}
                </button>
                {/* Sub-items for Settings */}
                {expanded && subItems && subItems.map(sub => {
                  const SI = sub.Icon;
                  const subActive = settingsSubItem === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => { setHubFeature("settings"); setSettingsSubItem(sub.id); }}
                      className="smooth"
                      style={{
                        margin: "0 0 1px 16px", padding: "7px 12px 7px 20px",
                        borderRadius: 8, width: "calc(100% - 16px)",
                        display: "flex", alignItems: "center", gap: 9,
                        background: subActive ? C.primary10 : "transparent",
                        color: subActive ? C.primary : C.textMid,
                        fontSize: 12, fontWeight: subActive ? 600 : 500,
                        textAlign: "left", cursor: "pointer",
                        border: "none", position: "relative",
                      }}
                      onMouseEnter={e => { if (!subActive) e.currentTarget.style.background = C.bg; }}
                      onMouseLeave={e => { if (!subActive) e.currentTarget.style.background = "transparent"; }}
                    >
                      <span style={{
                        position: "absolute", left: 6, top: "50%",
                        width: 6, height: 1,
                        background: subActive ? C.primary : C.textVerySoft,
                        transform: "translateY(-50%)",
                      }} />
                      <SI size={12} />
                      <span>{sub.label}</span>
                    </button>
                  );
                })}
              </Fragment>
            );
          })}
        </nav>

        {/* Footer hint */}
        <div style={{
          padding: "12px 16px",
          borderTop: `1px solid ${C.divider}`,
          fontSize: T.fontXs, color: C.textSoft,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <LayoutGrid size={11} color={C.textVerySoft} />
          <span>Switch apps from the topbar</span>
        </div>
      </aside>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     CHAT LIST PANEL
     ═══════════════════════════════════════════════════════════════ */


  /* ─── Shared 3-dot dropdown for chat-list rows (DMs + groups) ─── */


  /* ─── Same 4 actions as the row menu, but positioned for the open-chat header ─── */




  /* ─── Group row (in chat list) ─── */


  /* ═══════════════════════════════════════════════════════════════
     CHAT VIEW (active conversation OR empty state)
     ═══════════════════════════════════════════════════════════════ */


  /* ═══════════════════════════════════════════════════════════════
     Templates Wizard — 3 steps rendered inline in the feed composer
     Step 1: Pick an application (APP ID)
     Step 2: Pick a topic (Unconditional Offer, etc.)
     Step 3: Pick a template → auto-fills with student data → done
     ═══════════════════════════════════════════════════════════════ */


  /* ─── Attach (+) menu — main + applications views ─── */



  /* ─── ReactionsRow — chip strip below message bubble ─── */


  /* ─── ReplyQuote — small quoted card rendered inside a bubble for replies ─── */


  /* ─── MessageHoverActions — React + Reply toolbar ───
     Sits ABOVE the bubble (top: -32px) with no gap, controlled by JS hover
     state instead of CSS :hover. The 200ms grace period on mouse-leave
     lets the cursor cross to the toolbar without it disappearing. */


  /* ─── SharedPostCard — clickable rich preview that appears in chats when
     a feed post is shared. Click → jumps to News Feed. ─── */






  /* ─── Group chat view ─── */
  /* ═══════════════════════════════════════════════════════════════
     GROUP MEMBERS PANEL — slide-in side drawer from the right.
     Lists every member with online status. Admins see actions per
     member (Make admin / Remove). Everyone sees a "Leave group" button
     unless they're the last admin or the group is closed (app group).
     ═══════════════════════════════════════════════════════════════ */

  /* ═══════════════════════════════════════════════════════════════
     GROUP MEMBERS MODAL — centered modal (not a side drawer).
     Changes are STAGED in local draft state; nothing commits until
     the admin clicks "Save changes". Cancel discards everything.
     On Save, we diff draft vs original and:
       - emit a system message in the group chat for each change
       - notify each affected user via memberEvents (bell panel)
     ═══════════════════════════════════════════════════════════════ */


  /* ─── Add Member Picker — modal user list filtered to add-able users ─── */

  /* ─── Generic confirmation dialog ─── */




  /* ─── Group message bubble — shows sender name above each incoming message ─── */




  /* ═══════════════════════════════════════════════════════════════
     GROUP MEETING SCHEDULER — WIZARD
     ═══════════════════════════════════════════════════════════════ */


  /* ─── Shared wizard action bar — Back on left, Next on right.
        Single source of truth for navigation across all 4 steps. ─── */


  /* ─── Stepper / breadcrumb showing the 4 wizard stages ─── */


  /* ─── STEP 1: Participant Selection ─── */


  /* ─── STEP 2: Scheduling Assistant (the heart of this feature) ─── */


  /* ─── Availability grid (sticky headers, click-and-drag selection) ─── */


  /* ─── Conflict slide-in panel ─── */


  /* ─── STEP 3: Meeting details ─── */


  /* ─── STEP 4: Confirmation summary ─── */


  /* ─── STEP 5: Success ─── */


  // ─── Small helpers ───




  /* ═══════════════════════════════════════════════════════════════
     NEWS FEED VIEW
     ═══════════════════════════════════════════════════════════════ */


  /* ─── Right-rail container — max 2 items per category + View All CTA ─── */


  /* ─── Commission promo card — driven by promotionalCommissions state ─── */


  /* ─── University promo card — recently-added universities (rail card #2) ─── */


  /* ─── Course promo card — recently-added programs (rail card #3) ─── */


  /* ─── Event promo card — single curated event (rail card #4, mock for now) ─── */


  /* ─── Scope tabs: For You / Team Updates / Company Wide ─── */
  // ═══════════════════════════════════════════════════════════════
  // YOUR ALGORITHM — Content preferences page (Settings sub-item)
  // Allows users to customize their Team Updates feed by choosing
  // topics/departments to see more of, less of, or mute entirely.
  // ═══════════════════════════════════════════════════════════════
  // ═══════════════════════════════════════════════════════════════
  // PROMOTIONS & CAMPAIGNS SETTINGS
  // Manage promo categories + items that appear in the News Feed
  // promotions rail. Categories can be prioritized via up/down.
  // ═══════════════════════════════════════════════════════════════






  /* ─── AI-Powered "What You Missed" carousel ─── */


  /* ─── Facebook-style inline composer ─── */


  /* ─── Placeholder card for a saved post whose original was deleted ─── */


  /* ─── A single post card ─── */


  /* ─── Render the post body — switches by type ─── */


  /* ═══════════════════════════════════════════════════════════════
     BOOKING / CALENDAR VIEW
     ═══════════════════════════════════════════════════════════════ */


  /* ═══════════════════════════════════════════════════════════════
     MY AVAILABILITY VIEW (top-level)
     Wraps MyAvailabilityTab with its own page header so it can live
     beside Bookings instead of nested inside it.
     ═══════════════════════════════════════════════════════════════ */
  // ═══════════════════════════════════════════════════════════════
  // SCHEDULE CALENDAR — availability calendar inspired by Google
  // Calendar / Teams / Calendly. Five views (Day/Week/Work Week/
  // Month/Agenda), click-to-create, edit drawer, settings panel,
  // and full dark mode. Only "available" blocks are bookable.
  // ═══════════════════════════════════════════════════════════════
  // ═══════════════════════════════════════════════════════════════
  // WEBHOOKS & INTEGRATIONS PAGE — enterprise-grade webhook builder
  // with applications, event registry, delivery logs, retry queue,
  // templates, and global settings. All state is local + mock data.
  // ═══════════════════════════════════════════════════════════════


  // ═══════════════════════════════════════════════════════════════
  // SCHEDULE CALENDAR
  // ═══════════════════════════════════════════════════════════════


  /* ─── Book a Meeting Tab ─── */




  /* ─── Scheduled Meeting Tab ─── */


  /* ─── My Availability Tab ─── */


  /* ═══════════════════════════════════════════════════════════════
     DASHBOARD VIEW (default page when not in Communication Hub)
     ═══════════════════════════════════════════════════════════════ */
  function Dashboard() {
    const stats = [
      { value: "340", label: "TOTAL APPLICATION", sub: "238 Students", color: C.primary },
      { value: "73", label: "NEW APPLICATION", color: C.primary },
      { value: "82", label: "SUBMITTED TO UNIVERSITY", color: C.primary },
      { value: "53", label: "CONDITIONAL OFFER LETTER", color: C.primary },
      { value: "42", label: "LEAD STUDENTS", color: C.secondary, bg: C.sec10 },
      { value: "30", label: "UNCONDITIONAL OFFER LETTER", color: C.secondary, bg: C.sec10 },
      { value: "66", label: "APPLICATION CANCELLED", color: C.primary },
      { value: "6", label: "REGISTERED", color: C.primary },
      { value: "255", label: "NEW CONSULTANTS", color: C.primary },
      { value: "2.5%", label: "CONVERSION RATE", color: C.success, bg: C.successBg },
    ];
    return (
      <div style={{ flex: 1, padding: 26, overflowY: "auto" }}>
        <h1 style={{
          fontFamily: "'Roboto', sans-serif", fontSize: 26, fontWeight: 700,
          color: C.text, marginBottom: 4, letterSpacing: "-0.01em",
        }}>
          Dashboard
        </h1>
        <p style={{ fontSize: 12.5, color: C.textSoft, marginBottom: 22 }}>
          Welcome back, Admin. Here's what's happening today.
        </p>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14,
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: 18, borderRadius: T.radLg,
              background: s.bg || C.surface,
              border: `1px solid ${C.border}`,
              boxShadow: C.shadow,
            }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: s.color, marginBottom: 4 }}>
                {s.value}
              </div>
              <div style={{
                fontSize: 9.5, fontWeight: 700, color: C.textMid,
                letterSpacing: "0.06em",
              }}>{s.label}</div>
              {s.sub && (
                <div style={{ fontSize: 9, color: C.textSoft, marginTop: 3 }}>
                  {s.sub}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 30, padding: 22, borderRadius: T.radLg,
          background: C.surface, border: `1px solid ${C.border}`,
          boxShadow: C.shadow,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ fontFamily: "'Roboto', sans-serif", fontSize: 17, fontWeight: 700, color: C.text }}>
              New Applications
            </h3>
            <span style={{
              padding: "3px 9px", borderRadius: T.radFull,
              background: C.primary10, color: C.primary,
              fontSize: T.fontXs, fontWeight: 700,
            }}>6</span>
          </div>
          <div style={{ fontSize: 12, color: C.textSoft, padding: "20px 0", textAlign: "center" }}>
            Switch to <strong style={{ color: C.text }}>Comms Hub</strong> from the app launcher (top-right) to open chats and bookings →
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     ACCOUNT SWITCHER DROPDOWN
     ═══════════════════════════════════════════════════════════════ */
  function renderAccountSwitcher() {
    const switchTo = (user) => {
      setCurrentUser(user);
      setShowAccountSwitcher(false);
      setAccountSwitcherSearch("");
    };

    const q = accountSwitcherSearch.trim().toLowerCase();
    const filterUsers = (users) => q
      ? users.filter(u => u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q))
      : users;

    return (
      <div className="pop" style={{
        position: "absolute", top: "calc(100% + 8px)", right: 0,
        background: C.surface, borderRadius: T.radLg,
        boxShadow: C.shadowLg, border: `1px solid ${C.border}`,
        width: 360, maxHeight: 540, zIndex: 60,
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          padding: "12px 16px 10px",
          borderBottom: `1px solid ${C.divider}`,
          background: C.bg,
        }}>
          <div style={{
            fontSize: T.fontXs, fontWeight: 700, color: C.textMid,
            letterSpacing: "0.10em", marginBottom: 8,
          }}>
            SWITCH USER ACCOUNT
          </div>
          <div style={{ position: "relative" }}>
            <Search size={13} color={C.textSoft} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={accountSwitcherSearch}
              onChange={e => setAccountSwitcherSearch(e.target.value)}
              placeholder="Search by name or role"
              style={{
                width: "100%", padding: "7px 10px 7px 30px",
                borderRadius: 8, border: `1px solid ${C.border}`,
                background: C.surface, fontSize: 11.5, color: C.text,
              }}
            />
          </div>
        </div>

        {/* Groups + users */}
        <div style={{ overflowY: "auto", flex: 1, padding: "6px 0" }}>
          {ROLE_GROUPS.map(group => {
            const allInGroup = USERS.filter(u => u.type === group.id);
            const filtered = filterUsers(allInGroup);
            if (filtered.length === 0) return null;
            const GroupIcon = group.Icon;
            return (
              <div key={group.id} style={{ marginBottom: 4 }}>
                {/* Group header */}
                <div style={{
                  margin: "6px 12px 6px",
                  padding: "7px 12px",
                  borderRadius: 8,
                  background: group.accentBg,
                  border: `1px solid ${group.accentBorder}`,
                  display: "flex", alignItems: "center", gap: 7,
                  fontSize: T.fontXs, fontWeight: 700, color: group.accent,
                  letterSpacing: "0.08em",
                }}>
                  <GroupIcon size={12} />
                  {group.label}
                  <span style={{
                    marginLeft: "auto",
                    fontSize: 9, fontWeight: 700,
                    background: "rgba(255,255,255,0.55)",
                    color: group.accent,
                    padding: "1px 7px", borderRadius: T.radFull,
                  }}>{filtered.length}</span>
                </div>

                {/* Users */}
                {filtered.map(u => {
                  const active = u.id === currentUser.id;
                  return (
                    <button
                      key={u.id}
                      onClick={() => switchTo(u)}
                      className="smooth"
                      style={{
                        width: "100%", padding: "9px 16px 9px 13px",
                        display: "flex", alignItems: "center", gap: 11,
                        background: active ? group.accentBg : "transparent",
                        textAlign: "left", position: "relative",
                        borderLeft: active ? `3px solid ${group.accent}` : "3px solid transparent",
                      }}
                      onMouseEnter={e => { if (!active) e.currentTarget.style.background = C.primary05; }}
                      onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
                    >
                      <Avatar contact={u} size={36} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 13, fontWeight: 700,
                          color: active ? group.accent : C.text,
                          lineHeight: 1.15,
                        }}>{u.name}</div>
                        <div style={{
                          fontSize: T.fontXs, color: active ? group.accent : C.textSoft,
                          marginTop: 2, opacity: active ? 0.9 : 1,
                        }}>{u.role}</div>
                      </div>
                      {active && (
                        <div style={{
                          width: 22, height: 22, borderRadius: "50%",
                          background: group.accent, color: "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}

          {/* No matches */}
          {ROLE_GROUPS.every(g => filterUsers(USERS.filter(u => u.type === g.id)).length === 0) && (
            <div style={{ padding: "32px 16px", textAlign: "center", color: C.textSoft, fontSize: 11.5 }}>
              No users match "{accountSwitcherSearch}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: "10px 16px",
          borderTop: `1px solid ${C.divider}`,
          background: C.bg,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontSize: 11,
        }}>
          <span style={{ color: C.textMid }}>Viewing as</span>
          <span style={{
            color: ROLE_GROUPS.find(g => g.id === currentUser.type)?.accent || C.primary,
            fontWeight: 700,
          }}>
            {currentUser.name}
          </span>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     NOTIFICATIONS PANEL — pending group invitations
     ═══════════════════════════════════════════════════════════════ */
  function renderNotificationsPanel() {
    return (
      <div className="pop" style={{
        position: "absolute", top: "calc(100% + 8px)", right: 0,
        background: C.surface, borderRadius: T.radLg,
        boxShadow: C.shadowLg, border: `1px solid ${C.border}`,
        width: 380, maxHeight: 500, zIndex: 60,
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          padding: "14px 16px",
          borderBottom: `1px solid ${C.divider}`,
          background: C.bg,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: T.fontMd, fontWeight: 700, color: C.text }}>
              Notifications
            </div>
            <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>
              {totalPendingNotifications === 0
                ? "You're all caught up"
                : `${totalPendingNotifications} pending`}
            </div>
          </div>
          {totalPendingNotifications > 0 && (
            <span style={{
              fontSize: 9.5, fontWeight: 700, color: "#fff",
              background: C.secondary, padding: "2px 8px", borderRadius: T.radFull,
            }}>{totalPendingNotifications}</span>
          )}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {totalPendingNotifications === 0 ? (
            <div style={{
              padding: "40px 24px", textAlign: "center",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: C.primary05, border: `1px dashed ${C.borderStrong}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Bell size={20} color={C.textVerySoft} />
              </div>
              <div style={{ fontSize: 12.5, color: C.textMid, fontWeight: 600 }}>
                No new notifications
              </div>
              <div style={{ fontSize: T.fontXs, color: C.textSoft }}>
                Invitations and feed activity will appear here.
              </div>
            </div>
          ) : (
            <>
              {/* ─── Meeting invitations ─── */}
              {myPendingMeetingInvites.length > 0 && (
                <>
                  <div style={{
                    padding: "10px 16px 6px",
                    fontSize: 9.5, fontWeight: 700, color: C.textSoft,
                    letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <CalendarDays size={11} color={C.primary} />
                    MEETING INVITATIONS
                    <span style={{
                      marginLeft: 4, fontSize: 9, fontWeight: 700, color: C.primary,
                      background: C.primary10, padding: "1px 6px", borderRadius: T.radFull,
                    }}>{myPendingMeetingInvites.length}</span>
                  </div>
                  {myPendingMeetingInvites.map(({ meeting }) => {
                    const organizer = findUser(meeting.organizer);
                    if (!organizer) return null;
                    const totalAttendees = (meeting.attendees || []).length;
                    return (
                      <div key={meeting.id} style={{
                        padding: "12px 16px",
                        borderBottom: `1px solid ${C.divider}`,
                      }}>
                        <div style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                          <Avatar contact={organizer} size={36} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.4 }}>
                              <strong style={{ fontWeight: 700 }}>{organizer.name}</strong>
                              <span style={{ color: C.textMid }}> invited you to </span>
                              <strong style={{ fontWeight: 700, color: C.primary }}>
                                {meeting.title}
                              </strong>
                            </div>
                            {/* Meeting details mini-card */}
                            <div style={{
                              marginTop: 6, padding: "7px 9px",
                              borderRadius: 7, background: C.bg, border: `1px solid ${C.border}`,
                              display: "flex", flexDirection: "column", gap: 2,
                            }}>
                              <div style={{ fontSize: T.fontXs, color: C.text, fontWeight: 600,
                                display: "flex", alignItems: "center", gap: 5 }}>
                                <CalendarDays size={10} color={C.primary} />
                                {new Date(meeting.date + "T00:00:00").toLocaleDateString(undefined, {
                                  weekday: "short", month: "short", day: "numeric"
                                })}
                                <span style={{ color: C.textSoft }}>·</span>
                                <Clock size={10} color={C.primary} />
                                {meeting.start} – {meeting.end}
                              </div>
                              <div style={{ fontSize: 9.5, color: C.textSoft, display: "flex", alignItems: "center", gap: 4 }}>
                                <Users size={9} />
                                {totalAttendees} {totalAttendees === 1 ? "attendee" : "attendees"}
                                {meeting.duration && <><span>·</span><span>{meeting.duration} min</span></>}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 10, marginLeft: 47 }}>
                          <button
                            onClick={() => acceptMeeting(meeting.id)}
                            className="smooth"
                            style={{
                              flex: 1, padding: "7px 14px", borderRadius: 8,
                              background: C.primary, color: "#fff",
                              fontSize: 11.5, fontWeight: 600,
                              display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = C.primaryDark}
                            onMouseLeave={e => e.currentTarget.style.background = C.primary}
                          >
                            <Check size={13} strokeWidth={3} />
                            Accept
                          </button>
                          <button
                            onClick={() => rejectMeeting(meeting.id)}
                            className="smooth"
                            style={{
                              flex: 1, padding: "7px 14px", borderRadius: 8,
                              background: "transparent", color: C.textMid,
                              fontSize: 11.5, fontWeight: 600,
                              border: `1px solid ${C.border}`,
                              display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = C.dangerBg; e.currentTarget.style.color = C.danger; e.currentTarget.style.borderColor = "rgba(239,68,68,0.18)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; e.currentTarget.style.borderColor = C.border; }}
                          >
                            <X size={13} strokeWidth={3} />
                            Reject
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}

              {/* ─── Group invitations ─── */}
              {myPendingInvites.length > 0 && (
                <>
                  <div style={{
                    padding: "10px 16px 6px",
                    fontSize: 9.5, fontWeight: 700, color: C.textSoft,
                    letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <Users size={11} color={C.secondary} />
                    GROUP INVITATIONS
                    <span style={{
                      marginLeft: 4, fontSize: 9, fontWeight: 700, color: C.secondary,
                      background: C.sec10, padding: "1px 6px", borderRadius: T.radFull,
                    }}>{myPendingInvites.length}</span>
                  </div>
                  {myPendingInvites.map(inv => {
                    const fromUser = findUser(inv.fromUserId);
                    const group = groups.find(g => g.id === inv.groupId);
                    if (!fromUser || !group) return null;
                    return (
                      <div key={inv.id} style={{
                        padding: "12px 16px",
                        borderBottom: `1px solid ${C.divider}`,
                      }}>
                        <div style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                          <Avatar contact={fromUser} size={36} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.4 }}>
                              <strong style={{ fontWeight: 700 }}>{fromUser.name}</strong>
                              <span style={{ color: C.textMid }}> invited you to join </span>
                              <strong style={{ fontWeight: 700, color: group.color }}>
                                {(() => { const Ico = getGroupIcon(group.iconName); return <Ico size={11} style={{ display: "inline-block", verticalAlign: "-1.5px", marginRight: 3 }} strokeWidth={2.4} />; })()}
                                {group.name}
                              </strong>
                            </div>
                            <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 4, display: "flex", alignItems: "center", gap: 8 }}>
                              <span>{fromUser.role}</span>
                              <span>·</span>
                              <span>{inv.sentAt}</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 10, marginLeft: 47 }}>
                          <button
                            onClick={() => acceptInvitation(inv.id)}
                            className="smooth"
                            style={{
                              flex: 1, padding: "7px 14px", borderRadius: 8,
                              background: C.primary, color: "#fff",
                              fontSize: 11.5, fontWeight: 600,
                              display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = C.primaryDark}
                            onMouseLeave={e => e.currentTarget.style.background = C.primary}
                          >
                            <Check size={13} strokeWidth={3} />
                            Accept
                          </button>
                          <button
                            onClick={() => rejectInvitation(inv.id)}
                            className="smooth"
                            style={{
                              flex: 1, padding: "7px 14px", borderRadius: 8,
                              background: "transparent", color: C.textMid,
                              fontSize: 11.5, fontWeight: 600,
                              border: `1px solid ${C.border}`,
                              display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = C.dangerBg; e.currentTarget.style.color = C.danger; e.currentTarget.style.borderColor = "rgba(239,68,68,0.18)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; e.currentTarget.style.borderColor = C.border; }}
                          >
                            <X size={13} strokeWidth={3} />
                            Reject
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}

              {/* ─── Feed activity (likes / comments / shares) ─── */}
              {myFeedActivity.length > 0 && (
                <>
                  <div style={{
                    padding: "10px 16px 6px",
                    fontSize: 9.5, fontWeight: 700, color: C.textSoft,
                    letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <Newspaper size={11} color="#7C3AED" />
                    FEED ACTIVITY
                    <span style={{
                      marginLeft: 4, fontSize: 9, fontWeight: 700, color: "#7C3AED",
                      background: "rgba(124,58,237,0.10)", padding: "1px 6px", borderRadius: T.radFull,
                    }}>{myFeedActivity.length}</span>
                    {myFeedActivity.length > 1 && (
                      <button
                        onClick={dismissAllFeedActivity}
                        className="smooth"
                        style={{
                          marginLeft: "auto", fontSize: 9.5, fontWeight: 600, color: C.textSoft,
                          background: "transparent", padding: "2px 6px", borderRadius: 5,
                          letterSpacing: "0",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSoft; }}
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  {myFeedActivity.slice(0, 12).map(act => {
                    const actor = findUser(act.actorId);
                    const post = feedPosts.find(p => p.id === act.postId);
                    if (!actor || !post) return null;

                    let actionText = "";
                    let ActionIcon = ThumbsUp;
                    let actionColor = "#7C3AED";
                    if (act.type === "react") {
                      const r = REACTION_TYPES.find(x => x.id === act.reactionId);
                      ActionIcon = GROUP_ICONS[r?.iconName] || ThumbsUp;
                      actionColor = act.reactionId === "celebrate" ? "#FC7300"
                                  : act.reactionId === "insightful" ? "#F59E0B"
                                  : C.primary;
                      actionText = r ? `reacted with ${r.label}` : "reacted to";
                    } else if (act.type === "comment") {
                      ActionIcon = MessageSquare;
                      actionColor = "#0EA5E9";
                      actionText = "commented on";
                    } else if (act.type === "share") {
                      ActionIcon = Repeat2;
                      actionColor = "#10B981";
                      actionText = "shared";
                    }

                    const postSnippet = post.title || (post.body || "").split("\n")[0].slice(0, 64) || "your post";

                    return (
                      <div key={act.id} style={{
                        padding: "12px 16px",
                        borderBottom: `1px solid ${C.divider}`,
                        display: "flex", gap: 11, alignItems: "flex-start",
                      }}>
                        <div style={{ position: "relative", flexShrink: 0 }}>
                          <Avatar contact={actor} size={36} />
                          <div style={{
                            position: "absolute", bottom: -2, right: -2,
                            width: 18, height: 18, borderRadius: "50%",
                            background: actionColor, color: "#fff",
                            border: `2px solid ${C.surface}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <ActionIcon size={9} strokeWidth={2.4} />
                          </div>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.4 }}>
                            <strong style={{ fontWeight: 700 }}>{actor.name}</strong>
                            <span style={{ color: C.textMid }}> {actionText} </span>
                            <span style={{ color: C.text, fontWeight: 600 }}>your post</span>
                          </div>
                          <div style={{
                            fontSize: T.fontXs, color: C.textSoft, marginTop: 3,
                            lineHeight: 1.4,
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                            maxWidth: "100%",
                          }}>
                            "{postSnippet}"
                          </div>
                          {act.commentText && (
                            <div style={{
                              marginTop: 5, padding: "5px 9px",
                              borderRadius: 6, background: C.bg, border: `1px solid ${C.border}`,
                              fontSize: T.fontXs, color: C.textMid, lineHeight: 1.4,
                            }}>
                              {act.commentText}
                            </div>
                          )}
                          <div style={{ fontSize: 9.5, color: C.textSoft, marginTop: 4 }}>
                            {act.createdAt}
                          </div>
                        </div>
                        <button
                          onClick={() => dismissFeedActivity(act.id)}
                          className="iconbtn smooth"
                          style={{
                            width: 22, height: 22, borderRadius: 5, color: C.textSoft,
                            background: "transparent", flexShrink: 0,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSoft; }}
                        >
                          <X size={11} />
                        </button>
                      </div>
                    );
                  })}
                </>
              )}

              {/* ─── Member events (added/removed/promoted/demoted) ─── */}
              {myMemberEvents.length > 0 && (
                <>
                  <div style={{
                    fontSize: T.fontXs, fontWeight: 700, color: "#0EA5E9",
                    letterSpacing: "0.06em",
                    padding: "12px 14px 6px",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <Users size={11} color="#0EA5E9" />
                    GROUP MEMBERSHIP
                    <span style={{
                      marginLeft: 4, fontSize: 9, fontWeight: 700, color: "#0EA5E9",
                      background: "rgba(14,165,233,0.10)", padding: "1px 6px", borderRadius: T.radFull,
                    }}>{myMemberEvents.length}</span>
                  </div>
                  {myMemberEvents.slice(0, 12).map(ev => {
                    const fromUser = findUser(ev.fromUserId);
                    const group = groups.find(g => g.id === ev.groupId);
                    if (!fromUser || !group) return null;
                    const text =
                      ev.type === "added"         ? `added you to ${group.name}` :
                      ev.type === "removed"       ? `removed you from ${group.name}` :
                      ev.type === "made_admin"    ? `made you an admin of ${group.name}` :
                      ev.type === "removed_admin" ? `removed you as admin of ${group.name}` :
                      `updated your role in ${group.name}`;
                    const Icon =
                      ev.type === "added"         ? UserPlus :
                      ev.type === "removed"       ? Trash2 :
                      ev.type === "made_admin"    ? Shield :
                      Shield;
                    const accent =
                      ev.type === "added"         ? "#22C55E" :
                      ev.type === "removed"       ? "#EF4444" :
                      ev.type === "made_admin"    ? "#FC7300" :
                      "#94A3B8";
                    return (
                      <div key={ev.id} style={{
                        padding: "10px 14px",
                        display: "flex", alignItems: "flex-start", gap: 10,
                        borderTop: `1px solid ${C.divider}`,
                      }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: 7,
                          background: accent + "1A", color: accent,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          <Icon size={13} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.45 }}>
                            <span style={{ fontWeight: 700 }}>{fromUser.name}</span>{" "}
                            <span>{text}</span>
                          </div>
                          <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 2 }}>
                            {timeAgo(ev.time)}
                          </div>
                        </div>
                        <button
                          onClick={() => dismissMemberEvent(ev.id)}
                          aria-label="Dismiss"
                          className="iconbtn smooth"
                          style={{
                            width: 22, height: 22, borderRadius: 5, color: C.textSoft,
                            background: "transparent", flexShrink: 0,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSoft; }}
                        >
                          <X size={11} />
                        </button>
                      </div>
                    );
                  })}
                </>
              )}
            </>
          )}
        </div>

        {/* Footer hint */}
        <div style={{
          padding: "10px 16px",
          borderTop: `1px solid ${C.divider}`,
          background: C.bg,
          fontSize: T.fontXs, color: C.textSoft, textAlign: "center",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
        }}>
          <AlertCircle size={11} />
          Every meeting needs your response — Accept or Reject.
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     CREATE GROUP MODAL — picker that distinguishes direct-add vs invite
     ═══════════════════════════════════════════════════════════════ */
  function renderCreateGroupModal() {
    if (!createGroupOpen) return null;

    const q = groupMemberSearch.trim().toLowerCase();
    const candidateUsers = USERS
      .filter(u => u.id !== currentUser.id)
      .filter(u => !q || u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q));

    const togglePick = (id) => {
      setGroupForm(p => ({
        ...p,
        picked: { ...p.picked, [id]: !p.picked[id] },
      }));
    };

    const pickedCount = Object.values(groupForm.picked).filter(Boolean).length;
    const directCount = USERS.filter(u => groupForm.picked[u.id] && membershipMode(currentUser, u) === "direct").length;
    const inviteCount = pickedCount - directCount;

    // Group candidates by role section
    const grouped = ROLE_GROUPS.map(rg => ({
      ...rg,
      users: candidateUsers
        .filter(u => u.type === rg.filterType)
        .sort((a, b) => a.level - b.level),
    })).filter(g => g.users.length > 0);

    return (
      <div
        onClick={() => setCreateGroupOpen(false)}
        style={{
          position: "fixed", inset: 0, background: "rgba(13,31,31,0.4)",
          backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 200,
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          className="pop"
          style={{
            background: C.surface, borderRadius: T.radXl,
            boxShadow: C.shadowLg, width: 540, maxWidth: "92vw", maxHeight: "85vh",
            display: "flex", flexDirection: "column", overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "18px 22px",
            borderBottom: `1px solid ${C.divider}`,
            display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12,
          }}>
            <div>
              <h3 style={{ fontFamily: "'Roboto', sans-serif", fontSize: 20, fontWeight: 700, color: C.text }}>
                Create new group
              </h3>
              <p style={{ fontSize: 11.5, color: C.textSoft, marginTop: 3 }}>
                You'll be the group admin. Pick members from your team or invite people across departments.
              </p>
            </div>
            <button
              onClick={() => setCreateGroupOpen(false)}
              className="iconbtn smooth"
              style={{
                width: 32, height: 32, borderRadius: 8, color: C.textMid,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <X size={17} />
            </button>
          </div>

          {/* Group name */}
          <div style={{ padding: "14px 22px 0" }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: C.textMid, letterSpacing: "0.04em" }}>
              GROUP NAME
            </label>
            <input
              autoFocus
              value={groupForm.name}
              onChange={e => setGroupForm(p => ({ ...p, name: e.target.value }))}
              placeholder="e.g. UK Sales Q2 War Room"
              style={{
                width: "100%", padding: "10px 12px", marginTop: 6,
                borderRadius: T.radMd, border: `1px solid ${C.border}`,
                background: C.bg, fontSize: 13, color: C.text, fontWeight: 500,
              }}
            />
          </div>

          {/* Members search */}
          <div style={{ padding: "14px 22px 8px" }}>
            <label style={{
              fontSize: 11, fontWeight: 700, color: C.textMid, letterSpacing: "0.04em",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span>ADD MEMBERS</span>
              {pickedCount > 0 && (
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {directCount > 0 && (
                    <span style={{
                      fontSize: 9, fontWeight: 700, color: C.primary,
                      background: C.primary10, padding: "2px 7px", borderRadius: T.radFull,
                    }}>{directCount} direct</span>
                  )}
                  {inviteCount > 0 && (
                    <span style={{
                      fontSize: 9, fontWeight: 700, color: C.secondary,
                      background: C.sec10, padding: "2px 7px", borderRadius: T.radFull,
                    }}>{inviteCount} invite</span>
                  )}
                </span>
              )}
            </label>
            <div style={{ position: "relative", marginTop: 6 }}>
              <Search size={13} color={C.textSoft} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
              <input
                value={groupMemberSearch}
                onChange={e => setGroupMemberSearch(e.target.value)}
                placeholder="Search by name, role, or department"
                style={{
                  width: "100%", padding: "9px 11px 9px 32px",
                  borderRadius: 9, border: `1px solid ${C.border}`,
                  background: C.bg, fontSize: 12, color: C.text,
                }}
              />
            </div>
          </div>

          {/* Member list */}
          <div style={{ flex: 1, overflowY: "auto", padding: "0 14px 6px" }}>
            {grouped.map(rg => (
              <div key={rg.id} style={{ marginBottom: 6 }}>
                <div style={{
                  margin: "10px 8px 4px",
                  padding: "5px 10px", borderRadius: 6,
                  background: rg.accentBg, border: `1px solid ${rg.accentBorder}`,
                  fontSize: 9.5, fontWeight: 700, color: rg.accent,
                  letterSpacing: "0.08em",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <rg.Icon size={11} />
                  {rg.label}
                </div>
                {rg.users.map(u => {
                  const picked = !!groupForm.picked[u.id];
                  const mode = membershipMode(currentUser, u);
                  return (
                    <button
                      key={u.id}
                      onClick={() => togglePick(u.id)}
                      className="smooth"
                      style={{
                        width: "100%", padding: "9px 10px", borderRadius: 9,
                        display: "flex", alignItems: "center", gap: 11,
                        background: picked ? C.primary05 : "transparent",
                        textAlign: "left",
                        border: picked ? `1px solid ${C.primary30}` : "1px solid transparent",
                      }}
                      onMouseEnter={e => { if (!picked) e.currentTarget.style.background = C.bg; }}
                      onMouseLeave={e => { if (!picked) e.currentTarget.style.background = "transparent"; }}
                    >
                      <Avatar contact={u} size={32} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: C.text }}>{u.name}</div>
                        <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>
                          {u.role}
                        </div>
                      </div>
                      {/* Mode badge */}
                      {picked && (
                        <span style={{
                          fontSize: 9, fontWeight: 700,
                          padding: "3px 8px", borderRadius: T.radFull,
                          background: mode === "direct" ? C.primary10 : C.sec10,
                          color: mode === "direct" ? C.primary : C.secondary,
                          display: "flex", alignItems: "center", gap: 4,
                        }}>
                          {mode === "direct" ? <Check size={10} strokeWidth={3} /> : <MailOpen size={10} strokeWidth={2.4} />}
                          {mode === "direct" ? "Direct add" : "Will invite"}
                        </span>
                      )}
                      <div style={{
                        width: 18, height: 18, borderRadius: 5,
                        border: `2px solid ${picked ? C.primary : C.border}`,
                        background: picked ? C.primary : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        {picked && <Check size={11} color="#fff" strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
            {grouped.length === 0 && (
              <div style={{ padding: "30px 12px", textAlign: "center", color: C.textSoft, fontSize: 12 }}>
                No users match "{groupMemberSearch}".
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: "12px 22px",
            borderTop: `1px solid ${C.divider}`,
            background: C.bg,
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
          }}>
            <div style={{ fontSize: T.fontXs, color: C.textSoft, lineHeight: 1.4 }}>
              {pickedCount === 0 ? (
                "Select at least one member."
              ) : (
                <>
                  {directCount} added immediately
                  {inviteCount > 0 && <>, {inviteCount} will receive an invitation</>}
                </>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setCreateGroupOpen(false)}
                className="smooth"
                style={{
                  padding: "9px 16px", borderRadius: 9,
                  background: "transparent", color: C.textMid,
                  border: `1px solid ${C.border}`,
                  fontSize: 12, fontWeight: 600,
                }}
              >
                Cancel
              </button>
              <button
                onClick={createGroup}
                disabled={!groupForm.name.trim() || pickedCount === 0}
                className="smooth"
                style={{
                  padding: "9px 18px", borderRadius: 9,
                  background: groupForm.name.trim() && pickedCount > 0
                    ? `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`
                    : C.primary20,
                  color: "#fff",
                  fontSize: 12, fontWeight: 700,
                  cursor: groupForm.name.trim() && pickedCount > 0 ? "pointer" : "not-allowed",
                  boxShadow: groupForm.name.trim() && pickedCount > 0 ? "0 4px 12px rgba(4,93,94,0.22)" : "none",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                <Plus size={13} />
                Create group
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }


  /* ═══════════════════════════════════════════════════════════════
     MEETING REMINDERS — top-right toast stack, fires 15 min before
     ═══════════════════════════════════════════════════════════════ */
  function renderMeetingReminders() {
    if (myActiveReminders.length === 0) return null;
    const visible = myActiveReminders.slice(0, 3);
    const hiddenCount = myActiveReminders.length - visible.length;

    return (
      <div style={{
        position: "fixed",
        top: 76, right: 18,
        zIndex: 250,
        display: "flex", flexDirection: "column", gap: 10,
        width: 340,
        pointerEvents: "none",
      }}>
        {visible.map((mt, idx) => {
          const isGroupMt = !!mt.groupMeeting;
          const otherAttendee = (mt.attendees || []).find(a => a.userId !== currentUser.id);
          const cpUser = isGroupMt ? null : findUser(mt.with || otherAttendee?.userId);
          const totalAtt = (mt.attendees || []).length;
          const accepted = (mt.attendees || []).filter(a => a.status === "accepted").length;
          const titleText = isGroupMt
            ? mt.title
            : `${mt.title || "Meeting"} with ${cpUser?.name?.split(" ")[0] || ""}`;

          return (
            <div
              key={mt.id}
              className="reminder-pop"
              style={{
                background: C.surface,
                borderRadius: T.radLg,
                border: `1px solid ${C.border}`,
                boxShadow: "0 12px 32px rgba(13,31,31,0.18), 0 2px 6px rgba(13,31,31,0.06)",
                overflow: "hidden",
                pointerEvents: "auto",
                animationDelay: `${idx * 70}ms`,
                position: "relative",
              }}
            >
              {/* Top accent bar — pulsing */}
              <div style={{
                height: 3,
                background: `linear-gradient(90deg, ${C.secondary}, ${C.warning})`,
                position: "relative", overflow: "hidden",
              }}>
                <div className="reminder-shimmer" style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
                }} />
              </div>

              <div style={{ padding: "13px 14px 12px" }}>
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 11 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: T.radMd,
                    background: `linear-gradient(135deg, ${C.secondary}, #f59e0b)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: `0 3px 10px rgba(252,115,0,0.32)`,
                  }}>
                    <Bell size={16} color="#fff" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                      fontSize: 9.5, fontWeight: 700, color: C.secondary,
                      letterSpacing: "0.07em",
                    }}>
                      <span>STARTING IN 15 MIN</span>
                      <span className="reminder-dot" style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: C.secondary,
                      }} />
                    </div>
                    <div style={{
                      fontSize: 13, fontWeight: 700, color: C.text, marginTop: 3,
                      lineHeight: 1.25,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {titleText}
                    </div>
                    <div style={{
                      fontSize: T.fontXs, color: C.textMid, marginTop: 3,
                      display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap",
                    }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Clock size={10} /> {mt.start} – {mt.end}
                      </span>
                      <span>·</span>
                      {isGroupMt ? (
                        <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <Users size={10} /> {accepted}/{totalAtt} attending
                        </span>
                      ) : cpUser && (
                        <span style={{ color: C.textSoft }}>{cpUser.role}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => dismissReminder(mt.id)}
                    className="iconbtn smooth"
                    style={{
                      width: 24, height: 24, borderRadius: 6,
                      color: C.textSoft, background: "transparent",
                      flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSoft; }}
                  >
                    <X size={13} />
                  </button>
                </div>

                {/* Avatar strip for group / 1-on-1 */}
                {isGroupMt && (
                  <div style={{
                    marginTop: 10, marginLeft: 47,
                    display: "flex",
                  }}>
                    {(mt.attendees || []).slice(0, 5).map((a, i) => {
                      const u = findUser(a.userId);
                      return u ? (
                        <div key={a.userId} style={{
                          marginLeft: i === 0 ? 0 : -6,
                          border: `2px solid ${C.surface}`,
                          borderRadius: "50%",
                          zIndex: 5 - i,
                          opacity: a.status === "accepted" ? 1 : 0.45,
                        }}>
                          <Avatar contact={u} size={22} />
                        </div>
                      ) : null;
                    })}
                    {totalAtt > 5 && (
                      <div style={{
                        marginLeft: -6,
                        width: 22, height: 22, borderRadius: "50%",
                        background: C.bg, color: C.textMid,
                        border: `2px solid ${C.surface}`,
                        fontSize: 9, fontWeight: 700,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>+{totalAtt - 5}</div>
                    )}
                  </div>
                )}

                {/* Action row */}
                <div style={{ display: "flex", gap: 6, marginTop: 12, marginLeft: 47 }}>
                  <button
                    onClick={() => dismissReminder(mt.id)}
                    className="smooth"
                    style={{
                      flex: 1, padding: "7px 10px", borderRadius: 7,
                      background: C.primary, color: "#fff",
                      fontSize: 11, fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = C.primaryDark}
                    onMouseLeave={e => e.currentTarget.style.background = C.primary}
                  >
                    <Video size={11} />
                    Join now
                  </button>
                  <button
                    onClick={() => snoozeReminder(mt.id)}
                    className="smooth"
                    style={{
                      padding: "7px 10px", borderRadius: 7,
                      background: "transparent", color: C.textMid,
                      border: `1px solid ${C.border}`,
                      fontSize: 11, fontWeight: 600,
                      display: "flex", alignItems: "center", gap: 4,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = C.bg}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    Snooze 5m
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {hiddenCount > 0 && (
          <div style={{
            padding: "8px 12px", borderRadius: T.radMd,
            background: C.surface, border: `1px solid ${C.border}`,
            fontSize: T.fontXs, fontWeight: 600, color: C.textMid,
            textAlign: "center",
            pointerEvents: "auto",
            boxShadow: "0 6px 18px rgba(13,31,31,0.10)",
          }}>
            +{hiddenCount} more {hiddenCount === 1 ? "reminder" : "reminders"}
          </div>
        )}
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     BOOKING CONFIRMATION MODAL — shown after a meeting is created
     ═══════════════════════════════════════════════════════════════ */
  function renderBookingConfirmModal() {
    if (!bookingConfirm) return null;
    const c = bookingConfirm.contact;

    return (
      <div
        onClick={dismissBookingConfirm}
        style={{
          position: "fixed", inset: 0, background: "rgba(13,31,31,0.42)",
          backdropFilter: "blur(5px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 200,
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          className="pop"
          style={{
            background: C.surface, borderRadius: 18,
            boxShadow: C.shadowLg, width: 460, maxWidth: "92vw",
            display: "flex", flexDirection: "column", overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Decorative header band */}
          <div style={{
            height: 110, position: "relative",
            background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryLight} 60%, ${C.success} 100%)`,
            overflow: "hidden",
          }}>
            {/* subtle ring decoration */}
            <div style={{
              position: "absolute", top: -40, right: -40,
              width: 160, height: 160, borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.18)",
            }} />
            <div style={{
              position: "absolute", top: 10, right: 10,
              width: 90, height: 90, borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.12)",
            }} />
            {/* Close X */}
            <button
              onClick={dismissBookingConfirm}
              className="iconbtn smooth"
              style={{
                position: "absolute", top: 12, right: 12,
                width: 32, height: 32, borderRadius: 8,
                background: "rgba(255,255,255,0.16)",
                color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(4px)",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.28)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.16)"}
            >
              <X size={16} />
            </button>

            {/* Big success ring + check */}
            <div style={{
              position: "absolute", left: "50%", bottom: -42,
              transform: "translateX(-50%)",
              width: 84, height: 84, borderRadius: "50%",
              background: C.surface,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              border: `4px solid ${C.surface}`,
            }}>
              <div className="cpop" style={{
                width: 64, height: 64, borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.success}, #34d399)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 6px 18px rgba(16,185,129,0.42)`,
              }}>
                <Check size={34} color="#fff" strokeWidth={3.5} />
              </div>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "60px 26px 22px", textAlign: "center" }}>
            <h3 style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: T.fontXl, fontWeight: 700, color: C.text,
              letterSpacing: "-0.01em",
            }}>
              Meeting created
            </h3>
            <p style={{ fontSize: 12.5, color: C.textMid, marginTop: 6 }}>
              Your booking is confirmed and added to your calendar.
            </p>

            {/* Meeting details card */}
            <div style={{
              marginTop: 22,
              borderRadius: 13,
              border: `1px solid ${C.border}`,
              background: C.bg,
              overflow: "hidden",
              textAlign: "left",
            }}>
              {/* Attendee row */}
              <div style={{
                padding: "14px 16px",
                display: "flex", alignItems: "center", gap: 12,
                borderBottom: `1px solid ${C.divider}`,
                background: C.surface,
              }}>
                <Avatar contact={c} size={42} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 9.5, fontWeight: 700, color: C.textSoft,
                    letterSpacing: "0.10em",
                  }}>WITH</div>
                  <div style={{
                    fontSize: 14.5, fontWeight: 700, color: C.text, marginTop: 1,
                  }}>{c.name}</div>
                  <div style={{
                    fontSize: 11, color: C.primary, fontWeight: 600, marginTop: 1,
                  }}>{c.role}</div>
                </div>
                <span style={{
                  fontSize: 9.5, fontWeight: 700,
                  padding: "4px 9px", borderRadius: T.radFull,
                  background: C.successBg, color: C.success,
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: "50%", background: C.success,
                  }} />
                  Confirmed
                </span>
              </div>

              {/* Detail rows */}
              <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 11 }}>
                <DetailRow Icon={CalendarDays} label="Date">
                  {bookingConfirm.fullDate}
                </DetailRow>
                <DetailRow Icon={Clock} label="Time">
                  {bookingConfirm.slot}
                  <span style={{ color: C.textSoft, fontWeight: 500, marginLeft: 6 }}>
                    · {bookingConfirm.duration} min
                  </span>
                </DetailRow>
                <DetailRow Icon={Globe} label="Timezone">
                  Europe/London (GMT+1)
                </DetailRow>
                <DetailRow Icon={Video} label="Location">
                  Online — link will be sent via email
                </DetailRow>
              </div>
            </div>

            {/* Footer note */}
            <div style={{
              marginTop: 14, padding: "9px 12px",
              borderRadius: T.radMd, background: C.primary05,
              border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", gap: 8,
              fontSize: T.fontXs, color: C.textMid, textAlign: "left",
            }}>
              <AlertCircle size={12} color={C.primary} style={{ flexShrink: 0 }} />
              <span>
                Invitation sent to <strong style={{ fontWeight: 700, color: C.text }}>{c.name.split(" ")[0]}</strong> — you'll see the meeting in your schedule once they accept.
              </span>
            </div>
          </div>

          {/* Actions */}
          <div style={{
            padding: "0 26px 22px",
            display: "flex", gap: 10,
          }}>
            <button
              onClick={dismissBookingConfirm}
              className="smooth"
              style={{
                flex: 1, padding: "11px 16px", borderRadius: 11,
                background: "transparent", color: C.textMid,
                border: `1.5px solid ${C.border}`,
                fontSize: 12.5, fontWeight: 600,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; }}
            >
              Done
            </button>
            <button
              onClick={goToScheduledMeetings}
              className="smooth"
              style={{
                flex: 1.4, padding: "11px 16px", borderRadius: 11,
                background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`,
                color: "#fff",
                fontSize: 12.5, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                boxShadow: "0 4px 14px rgba(4,93,94,0.22)",
              }}
            >
              <CalendarDays size={14} />
              View in Schedule
            </button>
          </div>
        </div>
      </div>
    );
  }

  function DetailRow({ Icon, label, children }) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: C.surface, border: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon size={14} color={C.primary} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 9, fontWeight: 700, color: C.textSoft,
            letterSpacing: "0.10em",
          }}>{label.toUpperCase()}</div>
          <div style={{
            fontSize: 12.5, fontWeight: 600, color: C.text, marginTop: 1,
          }}>{children}</div>
        </div>
      </div>
    );
  }
  function renderCommissionDraft() {
    if (!commissionDraft) return null;
    const isEdit = !!commissionDraft.id;
    const close = closeCommissionDraft;
    const update = (field, value) => setCommissionDraft(d => ({ ...d, [field]: value }));

    const isValid =
      commissionDraft.university &&
      commissionDraft.minimumStudents &&
      Number(commissionDraft.minimumStudents) > 0 &&
      commissionDraft.startFrom &&
      commissionDraft.accountIntake &&
      commissionDraft.commissionAmount &&
      Number(commissionDraft.commissionAmount) > 0 &&
      commissionDraft.commissionGroup;

    const fieldLabel = (text, required = true) => (
      <div style={{
        fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 5,
      }}>
        {text} {required && <span style={{ color: C.danger }}>*</span>}
      </div>
    );

    const fieldStyle = {
      width: "100%", padding: "9px 12px", borderRadius: 8,
      background: C.surface, border: `1px solid ${C.border}`,
      fontSize: 12.5, color: C.text, fontFamily: "inherit",
      outline: "none",
    };

    return (
      <div
        onClick={close}
        style={{
          position: "fixed", inset: 0, zIndex: 110,
          background: "rgba(13,31,31,0.55)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20,
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          className="fade-up"
          style={{
            width: "100%", maxWidth: 480,
            background: C.surface, borderRadius: T.radLg,
            border: `1px solid ${C.border}`,
            boxShadow: "0 20px 60px rgba(13,31,31,0.30)",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "16px 20px",
            borderBottom: `1px solid ${C.divider}`,
            display: "flex", alignItems: "center", gap: 11,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "rgba(252,115,0,0.10)", color: C.secondary,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {isEdit ? <Edit3 size={15} /> : <Plus size={15} strokeWidth={2.5} />}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: T.fontMd, fontWeight: 700, color: C.text,
                letterSpacing: "-0.01em",
              }}>{isEdit ? "Edit" : "Add"} Promotional Commission</h3>
            </div>
            <button
              onClick={close}
              className="iconbtn smooth"
              style={{
                width: 30, height: 30, borderRadius: 7,
                color: C.textMid, background: "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; }}
            >
              <X size={15} />
            </button>
          </div>

          {/* Form */}
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              {fieldLabel("University")}
              <select
                value={commissionDraft.university}
                onChange={e => update("university", e.target.value)}
                style={fieldStyle}
              >
                <option value="">Select University</option>
                {COMMISSION_UNIVERSITIES.map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            <div>
              {fieldLabel("Minimum Student Requirement")}
              <input
                type="number"
                min="1"
                value={commissionDraft.minimumStudents}
                onChange={e => update("minimumStudents", e.target.value)}
                placeholder="Enter Minimum Student Requirement"
                style={fieldStyle}
              />
            </div>

            <div>
              {fieldLabel("Start From")}
              <input
                type="date"
                value={commissionDraft.startFrom}
                onChange={e => update("startFrom", e.target.value)}
                style={fieldStyle}
              />
            </div>

            <div>
              {fieldLabel("Account Intake")}
              <select
                value={commissionDraft.accountIntake}
                onChange={e => update("accountIntake", e.target.value)}
                style={fieldStyle}
              >
                <option value="">Select Intake</option>
                {COMMISSION_INTAKES.map(it => (
                  <option key={it} value={it}>{it}</option>
                ))}
              </select>
            </div>

            <div>
              {fieldLabel("Commission Amount")}
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                  fontSize: 13, fontWeight: 700, color: C.textMid,
                }}>£</span>
                <input
                  type="number"
                  min="1"
                  value={commissionDraft.commissionAmount}
                  onChange={e => update("commissionAmount", e.target.value)}
                  placeholder="Enter Commission Amount"
                  style={{ ...fieldStyle, paddingLeft: 26 }}
                />
              </div>
            </div>

            <div>
              {fieldLabel("Commission Group")}
              <select
                value={commissionDraft.commissionGroup}
                onChange={e => update("commissionGroup", e.target.value)}
                style={fieldStyle}
              >
                <option value="">Select Commission</option>
                {COMMISSION_GROUPS.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            padding: "12px 20px",
            borderTop: `1px solid ${C.divider}`,
            display: "flex", justifyContent: "flex-end", gap: 8,
          }}>
            <button
              onClick={close}
              className="smooth"
              style={{
                padding: "8px 16px", borderRadius: 8,
                background: "transparent", color: C.textMid,
                border: `1px solid ${C.border}`,
                fontSize: 12, fontWeight: 600,
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.bg}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              Cancel
            </button>
            <button
              onClick={saveCommission}
              disabled={!isValid}
              className="smooth"
              style={{
                padding: "8px 22px", borderRadius: 8,
                background: isValid ? C.secondary : "rgba(252,115,0,0.30)",
                color: "#fff", fontSize: 12, fontWeight: 700,
                cursor: isValid ? "pointer" : "not-allowed",
              }}
              onMouseEnter={e => { if (isValid) e.currentTarget.style.background = PROMO_PALETTE.gradientFrom; }}
              onMouseLeave={e => { if (isValid) e.currentTarget.style.background = C.secondary; }}
            >
              {isEdit ? "Save changes" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     Commission toast — feedback for create/update/delete
     ═══════════════════════════════════════════════════════════════ */
  function renderCommissionToast() {
    if (!commissionToast) return null;
    const labels = {
      created: "Promotional commission added",
      updated: "Commission updated",
      deleted: "Commission removed",
    };
    return (
      <div
        className="fade-up"
        style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          zIndex: 120,
          background: C.text, color: C.surface,
          padding: "10px 18px", borderRadius: T.radMd,
          fontSize: 12, fontWeight: 600,
          boxShadow: "0 8px 24px rgba(13,31,31,0.30)",
          display: "flex", alignItems: "center", gap: 8,
        }}
      >
        <CircleCheck size={14} color="#34D399" />
        {labels[commissionToast.kind] || "Updated"}
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     University create/edit modal
     ═══════════════════════════════════════════════════════════════ */
  function renderUniversityDraft() {
    if (!universityDraft) return null;
    const isEdit = !!universityDraft.id;
    const close = closeUniversityDraft;
    const update = (field, value) => setUniversityDraft(d => ({ ...d, [field]: value }));
    const updateRecruitment = (field, value) => setUniversityDraft(d => ({
      ...d, recruitment: { ...d.recruitment, [field]: value },
    }));

    const isValid =
      universityDraft.name.trim() &&
      universityDraft.shortName.trim() &&
      universityDraft.logoInitials.trim();

    const fieldLabel = (text, required = true) => (
      <div style={{ fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 5 }}>
        {text} {required && <span style={{ color: C.danger }}>*</span>}
      </div>
    );
    const fieldStyle = {
      width: "100%", padding: "9px 12px", borderRadius: 8,
      background: C.surface, border: `1px solid ${C.border}`,
      fontSize: 12.5, color: C.text, fontFamily: "inherit", outline: "none",
    };

    // Logo colour swatches user can pick from
    const swatches = ["#003B71", "#C8102E", "#7C2D8E", "#045D5E", "#FC7300", "#1F2937", "#0EA5E9", "#16A34A"];

    // Recruitment switch component (matches PDF's Yes/No radio styling)
    const recruitSwitch = (label, on, onChange) => (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 11px", borderRadius: 7,
        background: C.bg, border: `1px solid ${C.border}`,
      }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{label}</span>
        <div style={{ display: "flex", gap: 4 }}>
          <button
            onClick={() => onChange(true)}
            className="smooth"
            style={{
              padding: "5px 12px", borderRadius: 6,
              fontSize: 11, fontWeight: 700,
              background: on ? C.secondary : "transparent",
              color: on ? "#fff" : C.textMid,
              border: `1px solid ${on ? C.secondary : C.border}`,
            }}
          >Yes</button>
          <button
            onClick={() => onChange(false)}
            className="smooth"
            style={{
              padding: "5px 12px", borderRadius: 6,
              fontSize: 11, fontWeight: 700,
              background: !on ? C.text : "transparent",
              color: !on ? "#fff" : C.textMid,
              border: `1px solid ${!on ? C.text : C.border}`,
            }}
          >No</button>
        </div>
      </div>
    );

    return (
      <div
        onClick={close}
        style={{
          position: "fixed", inset: 0, zIndex: 110,
          background: "rgba(13,31,31,0.55)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20,
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          className="fade-up"
          style={{
            width: "100%", maxWidth: 540, maxHeight: "90vh",
            background: C.surface, borderRadius: T.radLg,
            border: `1px solid ${C.border}`,
            boxShadow: "0 20px 60px rgba(13,31,31,0.30)",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "16px 20px",
            borderBottom: `1px solid ${C.divider}`,
            display: "flex", alignItems: "center", gap: 11,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: C.primary10, color: C.primary,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {isEdit ? <Edit3 size={15} /> : <Plus size={15} strokeWidth={2.5} />}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: T.fontMd, fontWeight: 700, color: C.text,
                letterSpacing: "-0.01em",
              }}>{isEdit ? "Edit" : "Add"} University</h3>
              <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>
                Essential information surfaced on the News Feed promotion rail
              </div>
            </div>
            <button
              onClick={close}
              className="iconbtn smooth"
              style={{
                width: 30, height: 30, borderRadius: 7,
                color: C.textMid, background: "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; }}
            >
              <X size={15} />
            </button>
          </div>

          {/* Form */}
          <div style={{ padding: "16px 20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Logo preview + initials + colour */}
            <div>
              {fieldLabel("Logo")}
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", borderRadius: 8,
                background: C.bg, border: `1px solid ${C.border}`,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 8,
                  background: universityDraft.logoBg, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 800, letterSpacing: "0.02em",
                  flexShrink: 0,
                }}>
                  {(universityDraft.logoInitials || "??").toUpperCase().slice(0, 3)}
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
                  <input
                    type="text"
                    value={universityDraft.logoInitials}
                    onChange={e => update("logoInitials", e.target.value.toUpperCase().slice(0, 3))}
                    placeholder="Initials (e.g. AR)"
                    style={{ ...fieldStyle, padding: "6px 10px" }}
                    maxLength={3}
                  />
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {swatches.map(color => (
                      <button
                        key={color}
                        onClick={() => update("logoBg", color)}
                        className="smooth"
                        style={{
                          width: 22, height: 22, borderRadius: 5,
                          background: color,
                          border: universityDraft.logoBg === color
                            ? `2px solid ${C.text}`
                            : `1px solid ${C.border}`,
                          padding: 0,
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10 }}>
              <div>
                {fieldLabel("University Name")}
                <input
                  type="text"
                  value={universityDraft.name}
                  onChange={e => update("name", e.target.value)}
                  placeholder="Anglia Ruskin University, London"
                  style={fieldStyle}
                />
              </div>
              <div>
                {fieldLabel("Short name")}
                <input
                  type="text"
                  value={universityDraft.shortName}
                  onChange={e => update("shortName", e.target.value)}
                  placeholder="ARUL"
                  style={fieldStyle}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              <div>
                {fieldLabel("Country")}
                <select value={universityDraft.country} onChange={e => update("country", e.target.value)} style={fieldStyle}>
                  {["UK (England)", "UK (Scotland)", "UK (Wales)", "UK (Northern Ireland)", "Ireland", "USA", "Canada", "Australia"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                {fieldLabel("Type")}
                <select value={universityDraft.type} onChange={e => update("type", e.target.value)} style={fieldStyle}>
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </div>
              <div>
                {fieldLabel("Branch", false)}
                <select value={universityDraft.branch} onChange={e => update("branch", e.target.value)} style={fieldStyle}>
                  {["London Office", "Birmingham", "Manchester", "Leeds", "Glasgow"].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Recruitment Type — mirrors PDF page 2 */}
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 7,
                letterSpacing: "0.04em", textTransform: "uppercase",
              }}>Recruitment Type</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {recruitSwitch("Home/UK",       universityDraft.recruitment.homeUK,        v => updateRecruitment("homeUK", v))}
                {recruitSwitch("EU/EEU",        universityDraft.recruitment.eu,            v => updateRecruitment("eu", v))}
                {recruitSwitch("International", universityDraft.recruitment.international, v => updateRecruitment("international", v))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            padding: "12px 20px",
            borderTop: `1px solid ${C.divider}`,
            display: "flex", justifyContent: "flex-end", gap: 8,
          }}>
            <button
              onClick={close}
              className="smooth"
              style={{
                padding: "8px 16px", borderRadius: 8,
                background: "transparent", color: C.textMid,
                border: `1px solid ${C.border}`,
                fontSize: 12, fontWeight: 600,
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.bg}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >Cancel</button>
            <button
              onClick={saveUniversity}
              disabled={!isValid}
              className="smooth"
              style={{
                padding: "8px 22px", borderRadius: 8,
                background: isValid ? C.secondary : "rgba(252,115,0,0.30)",
                color: "#fff", fontSize: 12, fontWeight: 700,
                cursor: isValid ? "pointer" : "not-allowed",
              }}
              onMouseEnter={e => { if (isValid) e.currentTarget.style.background = PROMO_PALETTE.gradientFrom; }}
              onMouseLeave={e => { if (isValid) e.currentTarget.style.background = C.secondary; }}
            >{isEdit ? "Save changes" : "Save university"}</button>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     University toast
     ═══════════════════════════════════════════════════════════════ */
  function renderUniversityToast() {
    if (!universityToast) return null;
    const labels = {
      created: "University added",
      updated: "University updated",
      deleted: "University removed",
    };
    return (
      <div className="fade-up" style={{
        position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
        zIndex: 120,
        background: C.text, color: C.surface,
        padding: "10px 18px", borderRadius: T.radMd,
        fontSize: 12, fontWeight: 600,
        boxShadow: "0 8px 24px rgba(13,31,31,0.30)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <CircleCheck size={14} color="#34D399" />
        {labels[universityToast.kind] || "Updated"}
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     Course create/edit modal
     ═══════════════════════════════════════════════════════════════ */
  function renderCourseDraft() {
    if (!courseDraft) return null;
    const isEdit = !!courseDraft.id;
    const close = closeCourseDraft;
    const update = (field, value) => setCourseDraft(d => ({ ...d, [field]: value }));

    const isValid =
      courseDraft.title.trim() &&
      courseDraft.universityName &&
      courseDraft.department.trim() &&
      courseDraft.intake;

    const fieldLabel = (text, required = true) => (
      <div style={{ fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 5 }}>
        {text} {required && <span style={{ color: C.danger }}>*</span>}
      </div>
    );
    const fieldStyle = {
      width: "100%", padding: "9px 12px", borderRadius: 8,
      background: C.surface, border: `1px solid ${C.border}`,
      fontSize: 12.5, color: C.text, fontFamily: "inherit", outline: "none",
    };

    return (
      <div
        onClick={close}
        style={{
          position: "fixed", inset: 0, zIndex: 110,
          background: "rgba(13,31,31,0.55)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20,
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          className="fade-up"
          style={{
            width: "100%", maxWidth: 540, maxHeight: "90vh",
            background: C.surface, borderRadius: T.radLg,
            border: `1px solid ${C.border}`,
            boxShadow: "0 20px 60px rgba(13,31,31,0.30)",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div style={{
            padding: "16px 20px",
            borderBottom: `1px solid ${C.divider}`,
            display: "flex", alignItems: "center", gap: 11,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: C.primary10, color: C.primary,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {isEdit ? <Edit3 size={15} /> : <Plus size={15} strokeWidth={2.5} />}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: T.fontMd, fontWeight: 700, color: C.text,
                letterSpacing: "-0.01em",
              }}>{isEdit ? "Edit" : "Add"} Course</h3>
              <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>
                Essential information surfaced on the News Feed promotion rail
              </div>
            </div>
            <button
              onClick={close}
              className="iconbtn smooth"
              style={{
                width: 30, height: 30, borderRadius: 7,
                color: C.textMid, background: "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; }}
            >
              <X size={15} />
            </button>
          </div>

          <div style={{ padding: "16px 20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              {fieldLabel("University")}
              <select
                value={courseDraft.universityName}
                onChange={e => update("universityName", e.target.value)}
                style={fieldStyle}
              >
                <option value="">Select University</option>
                {newUniversities.map(u => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
              {newUniversities.length === 0 && (
                <div style={{ fontSize: T.fontXs, color: C.danger, marginTop: 5, fontWeight: 500 }}>
                  No universities exist yet. Add one first.
                </div>
              )}
            </div>

            <div>
              {fieldLabel("Course Name")}
              <input
                type="text"
                value={courseDraft.title}
                onChange={e => update("title", e.target.value)}
                placeholder="BSc (Hons) International Business Management"
                style={fieldStyle}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                {fieldLabel("Education Level")}
                <select value={courseDraft.educationLevel} onChange={e => update("educationLevel", e.target.value)} style={fieldStyle}>
                  {["Undergraduate", "Undergraduate with Foundation Year", "Postgraduate", "PhD / Doctorate", "Diploma"].map(lvl => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>
              <div>
                {fieldLabel("Department")}
                <input
                  type="text"
                  value={courseDraft.department}
                  onChange={e => update("department", e.target.value)}
                  placeholder="Business / Architecture / Law…"
                  style={fieldStyle}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                {fieldLabel("Campus")}
                <select value={courseDraft.campus} onChange={e => update("campus", e.target.value)} style={fieldStyle}>
                  {["London", "Cambridge", "Newcastle", "Manchester", "Birmingham", "Leeds"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                {fieldLabel("Current Intake")}
                <select value={courseDraft.intake} onChange={e => update("intake", e.target.value)} style={fieldStyle}>
                  {["September 2026", "January 2027", "May 2027", "September 2027", "January 2028"].map(i => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div style={{
            padding: "12px 20px",
            borderTop: `1px solid ${C.divider}`,
            display: "flex", justifyContent: "flex-end", gap: 8,
          }}>
            <button
              onClick={close}
              className="smooth"
              style={{
                padding: "8px 16px", borderRadius: 8,
                background: "transparent", color: C.textMid,
                border: `1px solid ${C.border}`,
                fontSize: 12, fontWeight: 600,
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.bg}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >Cancel</button>
            <button
              onClick={saveCourse}
              disabled={!isValid}
              className="smooth"
              style={{
                padding: "8px 22px", borderRadius: 8,
                background: isValid ? C.secondary : "rgba(252,115,0,0.30)",
                color: "#fff", fontSize: 12, fontWeight: 700,
                cursor: isValid ? "pointer" : "not-allowed",
              }}
              onMouseEnter={e => { if (isValid) e.currentTarget.style.background = PROMO_PALETTE.gradientFrom; }}
              onMouseLeave={e => { if (isValid) e.currentTarget.style.background = C.secondary; }}
            >{isEdit ? "Save changes" : "Save course"}</button>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     Course toast
     ═══════════════════════════════════════════════════════════════ */
  function renderCourseToast() {
    if (!courseToast) return null;
    const labels = {
      created: "Course added",
      updated: "Course updated",
      deleted: "Course removed",
    };
    return (
      <div className="fade-up" style={{
        position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
        zIndex: 120,
        background: C.text, color: C.surface,
        padding: "10px 18px", borderRadius: T.radMd,
        fontSize: 12, fontWeight: 600,
        boxShadow: "0 8px 24px rgba(13,31,31,0.30)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <CircleCheck size={14} color="#34D399" />
        {labels[courseToast.kind] || "Updated"}
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     Scheduled posts flyout — list + manage user's scheduled posts
     ═══════════════════════════════════════════════════════════════ */
  function renderScheduledFlyout() {
    if (!showScheduledFlyout) return null;
    const close = () => setShowScheduledFlyout(false);

    return (
      <div
        onClick={close}
        style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(13,31,31,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20,
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          className="fade-up"
          style={{
            width: "100%", maxWidth: 520, maxHeight: "82vh",
            background: C.surface, borderRadius: T.radLg,
            border: `1px solid ${C.border}`,
            boxShadow: "0 20px 60px rgba(13,31,31,0.20)",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "16px 20px",
            borderBottom: `1px solid ${C.divider}`,
            display: "flex", alignItems: "center", gap: 11,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: C.primary10, color: C.primary,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Clock size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: T.fontMd, fontWeight: 700, color: C.text,
                letterSpacing: "-0.01em",
              }}>Scheduled posts</h3>
              <div style={{ fontSize: 11, color: C.textSoft, marginTop: 1 }}>
                {myScheduledPosts.length === 0
                  ? "Nothing queued"
                  : `${myScheduledPosts.length} queued · oldest publishes ${
                      new Date(myScheduledPosts[0].scheduled_at).toLocaleString(undefined, {
                        weekday: "long", hour: "2-digit", minute: "2-digit", hour12: false,
                      })
                    }`}
              </div>
            </div>
            <button
              onClick={close}
              className="iconbtn smooth"
              style={{
                width: 30, height: 30, borderRadius: 7,
                color: C.textMid, background: "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; }}
            >
              <X size={15} />
            </button>
          </div>

          {/* List */}
          <div style={{ flex: 1, overflowY: "auto", padding: 8 }}>
            {myScheduledPosts.length === 0 ? (
              <div style={{
                padding: "44px 16px", margin: 8,
                textAlign: "center",
                borderRadius: T.radMd, background: C.bg, border: `1px dashed ${C.border}`,
              }}>
                <Clock size={26} color={C.textVerySoft} style={{ marginBottom: 10 }} />
                <div style={{ fontSize: 13, color: C.textMid, fontWeight: 600 }}>
                  No scheduled posts
                </div>
                <div style={{ fontSize: 11, color: C.textSoft, marginTop: 4, lineHeight: 1.5 }}>
                  Use the <strong>Schedule</strong> button when composing a post to queue one for later.
                </div>
              </div>
            ) : (
              myScheduledPosts.map(post => {
                const c = FEED_CATEGORIES[post.category];
                const aud = FEED_AUDIENCES[post.audience];
                const dt = new Date(post.scheduled_at);
                const day = dt.toLocaleDateString(undefined, { weekday: "short" }).toUpperCase().slice(0, 3);
                const num = dt.getDate();
                const month = dt.toLocaleDateString(undefined, { month: "short" }).toUpperCase().slice(0, 3);
                const time = dt.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false });
                const snippet = post.body?.split("\n")[0]?.slice(0, 80) || "(no body)";

                return (
                  <div
                    key={post.id}
                    className="smooth"
                    style={{
                      padding: "10px 12px", borderRadius: 9,
                      display: "flex", alignItems: "flex-start", gap: 10,
                      border: "1px solid transparent",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.borderColor = C.border; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}
                  >
                    {/* Date badge */}
                    <div style={{
                      width: 56, flexShrink: 0,
                      textAlign: "center",
                      background: C.primary, color: "#fff",
                      borderRadius: 7, padding: "6px 4px",
                    }}>
                      <div style={{ fontSize: 9, fontWeight: 700, opacity: 0.85, letterSpacing: "0.05em" }}>{day}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1, marginTop: 2 }}>{num}</div>
                      <div style={{ fontSize: 9, fontWeight: 600, opacity: 0.85, marginTop: 1 }}>{month}</div>
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 12.5, fontWeight: 600, color: C.text,
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>{snippet}</div>
                      <div style={{
                        fontSize: T.fontXs, color: C.textSoft, marginTop: 3,
                        display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap",
                      }}>
                        <span>{time}</span>
                        <span style={{ color: C.textVerySoft }}>·</span>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 4,
                          fontSize: 9.5, fontWeight: 600, color: C.textMid,
                          background: C.surface, border: `1px solid ${C.border}`,
                          padding: "1px 7px", borderRadius: 5,
                        }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: c?.color }} />
                          {c?.label}
                        </span>
                        <span style={{ color: C.textVerySoft }}>·</span>
                        <span>To: {aud?.label || post.audience}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
                      <Tooltip label="Publish now">
                        <button
                          onClick={() => publishScheduledNow(post.id)}
                          className="iconbtn smooth"
                          style={{
                            width: 28, height: 28, borderRadius: 7,
                            color: C.primary, background: "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = C.primary10}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        >
                          <Send size={12} />
                        </button>
                      </Tooltip>
                      <Tooltip label="Delete">
                        <button
                          onClick={() => cancelScheduled(post.id)}
                          className="iconbtn smooth"
                          style={{
                            width: 28, height: 28, borderRadius: 7,
                            color: C.textSoft, background: "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = C.dangerBg; e.currentTarget.style.color = C.danger; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSoft; }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     Bookmark toast — feedback after save/unsave
     ═══════════════════════════════════════════════════════════════ */
  function renderBookmarkToast() {
    if (!bookmarkToast) return null;
    return (
      <div
        className="fade-up"
        style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          zIndex: 110,
          background: C.text, color: C.surface,
          padding: "10px 18px", borderRadius: T.radMd,
          fontSize: 12, fontWeight: 600,
          boxShadow: "0 8px 24px rgba(13,31,31,0.30)",
          display: "flex", alignItems: "center", gap: 8,
        }}
      >
        <Bookmark size={13} fill={bookmarkToast.saved ? "#34D399" : "none"} color="#34D399" />
        {bookmarkToast.saved ? (
          <>
            Saved to your bookmarks
            <button
              onClick={() => { setHubFeature("feed"); setFeedScope("saved"); setBookmarkToast(null); }}
              style={{
                color: "#34D399", textDecoration: "underline",
                fontWeight: 700, marginLeft: 4,
              }}
            >View →</button>
          </>
        ) : (
          <>Removed from bookmarks</>
        )}
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     PROMOTIONAL COMMISSION VIEW — full page, system-admin only
     Reachable from: Sidebar → Commission → Promotional Commission List
     ═══════════════════════════════════════════════════════════════ */
  function PromotionalCommissionView() {
    // Permission gate — non-admins see a friendly "no access" page
    if (!canManageCommissions()) {
      return (
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          padding: 32, background: C.bg,
        }}>
          <div style={{
            maxWidth: 420, textAlign: "center",
            padding: "44px 32px", borderRadius: T.radLg,
            background: C.surface, border: `1px solid ${C.border}`,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: C.bg, margin: "0 auto 16px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Shield size={24} color={C.textVerySoft} />
            </div>
            <h3 style={{ fontSize: T.fontMd, fontWeight: 700, color: C.text, marginBottom: 6 }}>
              Restricted area
            </h3>
            <p style={{ fontSize: 12, color: C.textSoft, lineHeight: 1.55 }}>
              Promotional commissions are managed by your System Admin. If you need access, contact your administrator.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        background: C.bg, overflow: "hidden",
      }}>
        {/* Page header — mirrors the breadcrumb pattern in the PDF */}
        <div style={{
          padding: "16px 28px",
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
            <button
              onClick={() => setActivePage("dashboard")}
              className="smooth"
              style={{
                fontSize: 12.5, fontWeight: 500, color: C.textMid,
                background: "transparent", padding: "4px 8px", borderRadius: 6,
                display: "inline-flex", alignItems: "center", gap: 5,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; }}
            >
              <LayoutDashboard size={13} />
              Dashboard
            </button>
            <span style={{ color: C.textVerySoft, fontWeight: 700 }}>/</span>
            <span style={{
              fontSize: 12.5, fontWeight: 700, color: C.secondary,
            }}>Promotional Commission List</span>
          </div>
          <button
            onClick={() => setActivePage("dashboard")}
            className="smooth"
            style={{
              padding: "7px 14px", borderRadius: 8,
              background: "transparent", color: C.textMid,
              border: `1px solid ${C.border}`,
              fontSize: 12, fontWeight: 600,
              display: "inline-flex", alignItems: "center", gap: 5,
            }}
            onMouseEnter={e => e.currentTarget.style.background = C.bg}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <ArrowLeft size={12} />
            Back
          </button>
        </div>

        {/* Action row — Add button + total count */}
        <div style={{
          padding: "16px 28px",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <button
            onClick={openCommissionCreate}
            className="smooth"
            style={{
              padding: "9px 16px", borderRadius: 8,
              background: C.secondary, color: "#fff",
              fontSize: 12.5, fontWeight: 700,
              display: "inline-flex", alignItems: "center", gap: 6,
              boxShadow: "0 1px 2px rgba(252,115,0,0.20)",
            }}
            onMouseEnter={e => e.currentTarget.style.background = PROMO_PALETTE.gradientFrom}
            onMouseLeave={e => e.currentTarget.style.background = C.secondary}
          >
            <Plus size={14} strokeWidth={2.6} />
            Add Promotional Commission
          </button>
          <div style={{ flex: 1 }} />
          <span style={{
            fontSize: 11.5, color: C.textMid, fontWeight: 500,
          }}>
            Total{" "}
            <span style={{
              display: "inline-block",
              padding: "2px 8px", borderRadius: T.radFull,
              background: C.secondary, color: "#fff",
              fontSize: 11, fontWeight: 700,
              margin: "0 4px",
            }}>{promotionalCommissions.length}</span>{" "}
            Promotional Commission Found
          </span>
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 28px 28px" }}>
          <div style={{
            background: C.surface, borderRadius: T.radLg,
            border: `1px solid ${C.border}`,
            overflow: "hidden",
          }}>
            {/* Header row */}
            <div style={{
              padding: "12px 18px",
              display: "grid",
              gridTemplateColumns: "1.4fr 1.7fr 1fr 1.2fr 100px",
              gap: 14,
              fontSize: T.fontXs, fontWeight: 700, color: C.text,
              letterSpacing: "0.03em",
              borderBottom: `1px solid ${C.divider}`,
              background: C.bg,
            }}>
              <div>Account Intake</div>
              <div>University</div>
              <div>Commission Amount</div>
              <div>Commission Group</div>
              <div style={{ textAlign: "right" }}>Action</div>
            </div>

            {/* Rows or empty state */}
            {promotionalCommissions.length === 0 ? (
              <div style={{
                padding: "60px 24px", textAlign: "center",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 11,
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: C.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Briefcase size={22} color={C.textVerySoft} />
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: C.textMid }}>
                  No promotional commissions yet
                </h4>
                <p style={{ fontSize: 11.5, color: C.textSoft, maxWidth: 360, lineHeight: 1.5 }}>
                  Click <strong>Add Promotional Commission</strong> to create one. New entries appear automatically in the Promotions &amp; Campaigns rail of the News Feed.
                </p>
              </div>
            ) : (
              promotionalCommissions.map((c, i) => {
                const isLast = i === promotionalCommissions.length - 1;
                return (
                  <div
                    key={c.id}
                    style={{
                      padding: "14px 18px",
                      display: "grid",
                      gridTemplateColumns: "1.4fr 1.7fr 1fr 1.2fr 100px",
                      gap: 14, alignItems: "center",
                      borderBottom: isLast ? "none" : `1px solid ${C.divider}`,
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = C.bg}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>
                      {c.accountIntake}
                      <div style={{
                        fontSize: T.fontXs, color: C.textSoft, fontWeight: 500, marginTop: 3,
                      }}>
                        From {new Date(c.startFrom).toLocaleDateString(undefined, {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                        {" · "}
                        Min {c.minimumStudents} students
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>
                      {c.university}
                    </div>
                    <div style={{
                      fontSize: 14, fontWeight: 800, color: C.secondary,
                    }}>£{c.commissionAmount.toLocaleString()}</div>
                    <div style={{
                      fontSize: 11.5, color: C.textMid, fontWeight: 500,
                    }}>{c.commissionGroup}</div>
                    <div style={{ display: "flex", gap: 5, justifyContent: "flex-end" }}>
                      <Tooltip label="Edit">
                        <button
                          onClick={() => openCommissionEdit(c)}
                          className="smooth"
                          style={{
                            width: 30, height: 30, borderRadius: 7,
                            color: C.primary, background: C.primary05,
                            border: `1px solid ${C.primary20}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = C.primary10; }}
                          onMouseLeave={e => { e.currentTarget.style.background = C.primary05; }}
                        >
                          <Edit3 size={13} />
                        </button>
                      </Tooltip>
                      <Tooltip label="Delete">
                        <button
                          onClick={() => deleteCommission(c.id)}
                          className="smooth"
                          style={{
                            width: 30, height: 30, borderRadius: 7,
                            color: C.danger, background: C.dangerBg,
                            border: `1px solid rgba(233,68,90,0.20)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(233,68,90,0.16)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = C.dangerBg; }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     UNIVERSITIES VIEW — full page, system-admin only
     Reachable from: Sidebar → University → Universities
     ═══════════════════════════════════════════════════════════════ */
  function UniversitiesView() {
    if (!canManageUniversities()) {
      return (
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          padding: 32, background: C.bg,
        }}>
          <div style={{
            maxWidth: 420, textAlign: "center",
            padding: "44px 32px", borderRadius: T.radLg,
            background: C.surface, border: `1px solid ${C.border}`,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%", background: C.bg,
              margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Shield size={24} color={C.textVerySoft} />
            </div>
            <h3 style={{ fontSize: T.fontMd, fontWeight: 700, color: C.text, marginBottom: 6 }}>
              Restricted area
            </h3>
            <p style={{ fontSize: 12, color: C.textSoft, lineHeight: 1.55 }}>
              University management is restricted to the System Admin and the Admission team. If you need access, contact a team member with the right permissions.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        background: C.bg, overflow: "hidden",
      }}>
        {/* Page header — breadcrumb */}
        <div style={{
          padding: "16px 28px",
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
            <button
              onClick={() => setActivePage("dashboard")}
              className="smooth"
              style={{
                fontSize: 12.5, fontWeight: 500, color: C.textMid,
                background: "transparent", padding: "4px 8px", borderRadius: 6,
                display: "inline-flex", alignItems: "center", gap: 5,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; }}
            >
              <LayoutDashboard size={13} />
              Dashboard
            </button>
            <span style={{ color: C.textVerySoft, fontWeight: 700 }}>/</span>
            <span style={{ fontSize: 12.5, fontWeight: 500, color: C.textMid }}>University</span>
            <span style={{ color: C.textVerySoft, fontWeight: 700 }}>/</span>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: C.secondary }}>University List</span>
          </div>
          <button
            onClick={() => setActivePage("dashboard")}
            className="smooth"
            style={{
              padding: "7px 14px", borderRadius: 8,
              background: "transparent", color: C.textMid,
              border: `1px solid ${C.border}`,
              fontSize: 12, fontWeight: 600,
              display: "inline-flex", alignItems: "center", gap: 5,
            }}
            onMouseEnter={e => e.currentTarget.style.background = C.bg}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <ArrowLeft size={12} />
            Back
          </button>
        </div>

        {/* Action row */}
        <div style={{ padding: "16px 28px", display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={openUniversityCreate}
            className="smooth"
            style={{
              padding: "9px 16px", borderRadius: 8,
              background: C.secondary, color: "#fff",
              fontSize: 12.5, fontWeight: 700,
              display: "inline-flex", alignItems: "center", gap: 6,
              boxShadow: "0 1px 2px rgba(252,115,0,0.20)",
            }}
            onMouseEnter={e => e.currentTarget.style.background = PROMO_PALETTE.gradientFrom}
            onMouseLeave={e => e.currentTarget.style.background = C.secondary}
          >
            <Plus size={14} strokeWidth={2.6} />
            Add University
          </button>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 11.5, color: C.textMid, fontWeight: 500 }}>
            Total{" "}
            <span style={{
              display: "inline-block",
              padding: "2px 8px", borderRadius: T.radFull,
              background: C.secondary, color: "#fff",
              fontSize: 11, fontWeight: 700, margin: "0 4px",
            }}>{newUniversities.length}</span>{" "}
            {newUniversities.length === 1 ? "University" : "Universities"} Found
          </span>
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 28px 28px" }}>
          <div style={{
            background: C.surface, borderRadius: T.radLg,
            border: `1px solid ${C.border}`, overflow: "hidden",
          }}>
            {/* Header */}
            <div style={{
              padding: "12px 18px",
              display: "grid",
              gridTemplateColumns: "60px 2fr 1fr 0.8fr 1.5fr 100px",
              gap: 14, alignItems: "center",
              fontSize: T.fontXs, fontWeight: 700, color: C.text,
              letterSpacing: "0.03em",
              borderBottom: `1px solid ${C.divider}`,
              background: C.bg,
            }}>
              <div>Logo</div>
              <div>Name</div>
              <div>Country</div>
              <div>Type</div>
              <div>Recruitment</div>
              <div style={{ textAlign: "right" }}>Action</div>
            </div>

            {newUniversities.length === 0 ? (
              <div style={{
                padding: "60px 24px", textAlign: "center",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 11,
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%", background: C.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Building2 size={22} color={C.textVerySoft} />
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: C.textMid }}>
                  No universities yet
                </h4>
                <p style={{ fontSize: 11.5, color: C.textSoft, maxWidth: 360, lineHeight: 1.5 }}>
                  Click <strong>Add University</strong> to register your first university partner.
                </p>
              </div>
            ) : (
              newUniversities.map((u, i) => {
                const isLast = i === newUniversities.length - 1;
                const recruitChips = [];
                if (u.recruitment.homeUK) recruitChips.push("Home/UK");
                if (u.recruitment.eu) recruitChips.push("EU/EEU");
                if (u.recruitment.international) recruitChips.push("Int'l");
                return (
                  <div
                    key={u.id}
                    style={{
                      padding: "12px 18px",
                      display: "grid",
                      gridTemplateColumns: "60px 2fr 1fr 0.8fr 1.5fr 100px",
                      gap: 14, alignItems: "center",
                      borderBottom: isLast ? "none" : `1px solid ${C.divider}`,
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = C.bg}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 7,
                      background: u.logoBg, color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 800,
                    }}>{u.logoInitials}</div>
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: C.text }}>
                        {u.name}
                      </div>
                      <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 2 }}>
                        {u.shortName} · {u.branch}
                      </div>
                    </div>
                    <div style={{ fontSize: 11.5, color: C.text }}>{u.country}</div>
                    <div>
                      <span style={{
                        fontSize: T.fontXs, fontWeight: 700,
                        padding: "3px 8px", borderRadius: 4,
                        background: u.type === "Public" ? C.primary05 : "rgba(252,115,0,0.08)",
                        color: u.type === "Public" ? C.primary : C.secondary,
                        border: `1px solid ${u.type === "Public" ? C.primary30 : "rgba(252,115,0,0.25)"}`,
                      }}>{u.type}</span>
                    </div>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {recruitChips.length === 0 ? (
                        <span style={{ fontSize: T.fontXs, color: C.textSoft, fontStyle: "italic" }}>
                          None
                        </span>
                      ) : recruitChips.map(label => (
                        <span key={label} style={{
                          fontSize: 9.5, fontWeight: 700,
                          padding: "2px 6px", borderRadius: 4,
                          background: "rgba(252,115,0,0.08)",
                          color: C.secondary,
                          border: `1px solid rgba(252,115,0,0.22)`,
                        }}>{label}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 5, justifyContent: "flex-end" }}>
                      <Tooltip label="Edit">
                        <button
                          onClick={() => openUniversityEdit(u)}
                          className="smooth"
                          style={{
                            width: 30, height: 30, borderRadius: 7,
                            color: C.primary, background: C.primary05,
                            border: `1px solid ${C.primary20}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = C.primary10; }}
                          onMouseLeave={e => { e.currentTarget.style.background = C.primary05; }}
                        >
                          <Edit3 size={13} />
                        </button>
                      </Tooltip>
                      <Tooltip label="Delete">
                        <button
                          onClick={() => deleteUniversity(u.id)}
                          className="smooth"
                          style={{
                            width: 30, height: 30, borderRadius: 7,
                            color: C.danger, background: C.dangerBg,
                            border: `1px solid rgba(233,68,90,0.20)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(233,68,90,0.16)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = C.dangerBg; }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     PROGRAMS VIEW — full page, system-admin only
     Reachable from: Sidebar → University → Programs
     ═══════════════════════════════════════════════════════════════ */
  function ProgramsView() {
    if (!canManageCourses()) {
      return (
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          padding: 32, background: C.bg,
        }}>
          <div style={{
            maxWidth: 420, textAlign: "center",
            padding: "44px 32px", borderRadius: T.radLg,
            background: C.surface, border: `1px solid ${C.border}`,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%", background: C.bg,
              margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Shield size={24} color={C.textVerySoft} />
            </div>
            <h3 style={{ fontSize: T.fontMd, fontWeight: 700, color: C.text, marginBottom: 6 }}>
              Restricted area
            </h3>
            <p style={{ fontSize: 12, color: C.textSoft, lineHeight: 1.55 }}>
              Programs management is restricted to the System Admin and the Admission team. If you need access, contact a team member with the right permissions.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        background: C.bg, overflow: "hidden",
      }}>
        <div style={{
          padding: "16px 28px",
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
            <button
              onClick={() => setActivePage("dashboard")}
              className="smooth"
              style={{
                fontSize: 12.5, fontWeight: 500, color: C.textMid,
                background: "transparent", padding: "4px 8px", borderRadius: 6,
                display: "inline-flex", alignItems: "center", gap: 5,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; }}
            >
              <LayoutDashboard size={13} />
              Dashboard
            </button>
            <span style={{ color: C.textVerySoft, fontWeight: 700 }}>/</span>
            <span style={{ fontSize: 12.5, fontWeight: 500, color: C.textMid }}>University</span>
            <span style={{ color: C.textVerySoft, fontWeight: 700 }}>/</span>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: C.secondary }}>Course List</span>
          </div>
          <button
            onClick={() => setActivePage("dashboard")}
            className="smooth"
            style={{
              padding: "7px 14px", borderRadius: 8,
              background: "transparent", color: C.textMid,
              border: `1px solid ${C.border}`,
              fontSize: 12, fontWeight: 600,
              display: "inline-flex", alignItems: "center", gap: 5,
            }}
            onMouseEnter={e => e.currentTarget.style.background = C.bg}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <ArrowLeft size={12} />
            Back
          </button>
        </div>

        <div style={{ padding: "16px 28px", display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={openCourseCreate}
            disabled={newUniversities.length === 0}
            className="smooth"
            style={{
              padding: "9px 16px", borderRadius: 8,
              background: newUniversities.length === 0 ? "rgba(252,115,0,0.30)" : C.secondary,
              color: "#fff",
              fontSize: 12.5, fontWeight: 700,
              display: "inline-flex", alignItems: "center", gap: 6,
              boxShadow: newUniversities.length === 0 ? "none" : "0 1px 2px rgba(252,115,0,0.20)",
              cursor: newUniversities.length === 0 ? "not-allowed" : "pointer",
            }}
            onMouseEnter={e => { if (newUniversities.length > 0) e.currentTarget.style.background = PROMO_PALETTE.gradientFrom; }}
            onMouseLeave={e => { if (newUniversities.length > 0) e.currentTarget.style.background = C.secondary; }}
            title={newUniversities.length === 0 ? "Add a university first before creating a course" : ""}
          >
            <Plus size={14} strokeWidth={2.6} />
            Add Course
          </button>
          {newUniversities.length === 0 && (
            <span style={{ fontSize: 11, color: C.textSoft, fontStyle: "italic" }}>
              Add a university first
            </span>
          )}
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 11.5, color: C.textMid, fontWeight: 500 }}>
            Total{" "}
            <span style={{
              display: "inline-block",
              padding: "2px 8px", borderRadius: T.radFull,
              background: C.secondary, color: "#fff",
              fontSize: 11, fontWeight: 700, margin: "0 4px",
            }}>{newCourses.length}</span>{" "}
            {newCourses.length === 1 ? "Course" : "Courses"} Found
          </span>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 28px 28px" }}>
          <div style={{
            background: C.surface, borderRadius: T.radLg,
            border: `1px solid ${C.border}`, overflow: "hidden",
          }}>
            <div style={{
              padding: "12px 18px",
              display: "grid",
              gridTemplateColumns: "2.4fr 1fr 1fr 0.7fr 1fr 100px",
              gap: 14, alignItems: "center",
              fontSize: T.fontXs, fontWeight: 700, color: C.text,
              letterSpacing: "0.03em",
              borderBottom: `1px solid ${C.divider}`,
              background: C.bg,
            }}>
              <div>Course Title</div>
              <div>University</div>
              <div>Education Level</div>
              <div>Campus</div>
              <div>Intake</div>
              <div style={{ textAlign: "right" }}>Action</div>
            </div>

            {newCourses.length === 0 ? (
              <div style={{
                padding: "60px 24px", textAlign: "center",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 11,
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%", background: C.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <FileText size={22} color={C.textVerySoft} />
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: C.textMid }}>
                  No courses yet
                </h4>
                <p style={{ fontSize: 11.5, color: C.textSoft, maxWidth: 360, lineHeight: 1.5 }}>
                  Click <strong>Add Course</strong> to register a new program.
                </p>
              </div>
            ) : (
              newCourses.map((c, i) => {
                const isLast = i === newCourses.length - 1;
                return (
                  <div
                    key={c.id}
                    style={{
                      padding: "12px 18px",
                      display: "grid",
                      gridTemplateColumns: "2.4fr 1fr 1fr 0.7fr 1fr 100px",
                      gap: 14, alignItems: "center",
                      borderBottom: isLast ? "none" : `1px solid ${C.divider}`,
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = C.bg}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{ fontSize: 12.5, color: C.text, fontWeight: 600, lineHeight: 1.4 }}>
                      {c.title}
                      <div style={{ fontSize: T.fontXs, color: C.textSoft, fontWeight: 500, marginTop: 2 }}>
                        {c.department}
                      </div>
                    </div>
                    <div style={{ fontSize: 11.5, color: C.text }}>
                      {c.universityShort}
                    </div>
                    <div>
                      <span style={{
                        fontSize: 9.5, fontWeight: 700,
                        padding: "3px 7px", borderRadius: 4,
                        background: C.primary05, color: C.primary,
                        border: `1px solid ${C.primary30}`,
                      }}>{c.educationLevel}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: C.textMid }}>{c.campus}</div>
                    <div style={{ fontSize: 11.5, color: C.text, fontWeight: 500 }}>{c.intake}</div>
                    <div style={{ display: "flex", gap: 5, justifyContent: "flex-end" }}>
                      <Tooltip label="Edit">
                        <button
                          onClick={() => openCourseEdit(c)}
                          className="smooth"
                          style={{
                            width: 30, height: 30, borderRadius: 7,
                            color: C.primary, background: C.primary05,
                            border: `1px solid ${C.primary20}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = C.primary10; }}
                          onMouseLeave={e => { e.currentTarget.style.background = C.primary05; }}
                        >
                          <Edit3 size={13} />
                        </button>
                      </Tooltip>
                      <Tooltip label="Delete">
                        <button
                          onClick={() => deleteCourse(c.id)}
                          className="smooth"
                          style={{
                            width: 30, height: 30, borderRadius: 7,
                            color: C.danger, background: C.dangerBg,
                            border: `1px solid rgba(233,68,90,0.20)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(233,68,90,0.16)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = C.dangerBg; }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     SETTINGS VIEW — full-page, four tabs: Archive / Saved / Appearance / Permissions
     ═══════════════════════════════════════════════════════════════ */
  /* ═══════════════════════════════════════════════════════════════
     PERMISSIONS ADMIN VIEW — admin-only granular permission editor.
     Renders inside Settings → Permissions tab when current user is admin.
     Layout per the spec:
       1. User Type Permissions panel (4 role cards with set-assignment dropdowns)
       2. Permission Sets cards (selectable, click to edit)
       3. Active set editor (left: module list with master toggles, right: base + granular for selected module)
     ═══════════════════════════════════════════════════════════════ */

  /* ═══════════════════════════════════════════════════════════════
     SETTINGS — Appearance only.
     Archive lives in the chat sidebar, Saved Posts in the feed scope tabs,
     and Permissions in the Team module.
     ═══════════════════════════════════════════════════════════════ */
  /* ═══════════════════════════════════════════════════════════════
     TOP BAR
     ═══════════════════════════════════════════════════════════════ */
  /* ═══════════════════════════════════════════════════════════════
     APP LAUNCHER — 3-column grid of UAPP apps in the topbar.
     The current app is hidden from the grid (Google/Microsoft pattern).
     ═══════════════════════════════════════════════════════════════ */
  function AppLauncher() {
    const visibleApps = APPS.filter(a => a.id !== currentApp);
    const currentMeta = APPS.find(a => a.id === currentApp);

    return (
      <div ref={appLauncherRef} style={{ position: "relative" }}>
        <Tooltip label="UAPP apps" position="bottom">
          <button
            onClick={() => setShowAppLauncher(s => !s)}
            aria-label="Open app launcher"
            className="iconbtn smooth"
            style={{
              width: 36, height: 36, borderRadius: 9,
              color: showAppLauncher ? C.primary : C.textMid,
              background: showAppLauncher ? C.primary10 : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <LayoutGrid size={17} />
          </button>
        </Tooltip>

        {showAppLauncher && (
          <div
            className="fade-up"
            style={{
              position: "absolute", top: "calc(100% + 10px)", right: 0,
              width: 360,
              background: C.surface, borderRadius: T.radXl,
              border: `1px solid ${C.border}`,
              boxShadow: "0 16px 48px rgba(13,31,31,0.18)",
              overflow: "hidden",
              zIndex: 100,
            }}
          >
            {/* Header */}
            <div style={{
              padding: "16px 18px 10px",
              background: `linear-gradient(180deg, ${C.surface}, ${C.bg})`,
              borderBottom: `1px solid ${C.divider}`,
            }}>
              <div style={{
                fontSize: 14, fontWeight: 700, color: C.text,
                letterSpacing: "-0.01em",
              }}>Your UAPP apps</div>
              <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>
                You're in <span style={{ fontWeight: 700, color: currentMeta?.color || C.primary }}>{currentMeta?.name || "—"}</span>. Tap to switch.
              </div>
            </div>

            {/* Apps grid */}
            <div style={{
              padding: "10px 8px 14px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
            }}>
              {visibleApps.map(app => {
                const Icon = app.Icon;
                return (
                  <button
                    key={app.id}
                    onClick={() => switchApp(app.id)}
                    className="smooth"
                    style={{
                      padding: "14px 6px",
                      borderRadius: T.radLg,
                      background: "transparent",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                      cursor: "pointer",
                      border: "1px solid transparent",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = C.bg;
                      e.currentTarget.style.borderColor = C.divider;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    <div style={{
                      width: 46, height: 46, borderRadius: T.radLg,
                      background: app.bg,
                      color: app.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: `0 2px 8px ${app.color}1F`,
                      transition: "transform 0.18s ease",
                    }}>
                      <Icon size={20} strokeWidth={2.2} />
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 600, color: C.text,
                      textAlign: "center", lineHeight: 1.25,
                    }}>{app.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     CRM STUDENT MODULE — list view + edit form
     Surfaces in CRM when activePage === "student". The list shows a
     paginated, filterable table of student records; clicking the edit
     icon flips into a tabbed form that mirrors the production CRM's
     Student edit experience (Personal / Contact / Application / etc).
     ═══════════════════════════════════════════════════════════════ */

  // Seeded student dataset — shape mirrors the production CRM rows.
  // The visible page is rendered from this slice; pagination math reports
  // the larger total to match the real-system feel.
  const crmStudents = [
    { id: "STD23215", title: "",      firstName: "Bose",      lastName: "Ademiluyi",            phone: "",            email: "bose.ademiluyi@example.com",  consultant: "Victor Daudu",            teamLeader: "Victor Daudu",      salesManager: "Laura Gavieiro Agud", branch: "London Office", regDate: "22/04/2026", verified: false, blacklist: false },
    { id: "STD23214", title: "",      firstName: "Elizabeth", lastName: "Elizabeth",            phone: "",            email: "elizabeth.e@example.com",     consultant: "Victor Daudu",            teamLeader: "Victor Daudu",      salesManager: "Laura Gavieiro Agud", branch: "London Office", regDate: "22/04/2026", verified: false, blacklist: false },
    { id: "STD23212", title: "Miss.", firstName: "Gabriela",  lastName: "Catalina Birladianu",  phone: "+447900000023", email: "gcb@example.com",            consultant: "Andrada-Cristina Balan",  teamLeader: "Andreea Cimpoi",    salesManager: "Laura Gavieiro Agud", branch: "London Office", regDate: "22/04/2026", verified: true,  blacklist: false },
    { id: "STD23211", title: "Mr.",   firstName: "Akpovine",  lastName: "Franklin Egigba",      phone: "+2348012345678", email: "afe@example.com",          consultant: "Ilunosen Ann Oyana",      teamLeader: "Taiwo Thomas",      salesManager: "",                    branch: "NG Lagos",      regDate: "22/04/2026", verified: true,  blacklist: false },
    { id: "STD23210", title: "Mr.",   firstName: "Erdal",     lastName: "Cirak",                phone: "+447900000019", email: "erdal.c@example.com",        consultant: "Cristina-Georgiana Neacsu", teamLeader: "Andreea Cimpoi", salesManager: "Laura Gavieiro Agud", branch: "London Office", regDate: "22/04/2026", verified: true,  blacklist: false },
    { id: "STD23209", title: "Mr.",   firstName: "Victor",    lastName: "Oluwasina Adesemoye",  phone: "+2348012345699", email: "voa@example.com",          consultant: "Ilunosen Ann Oyana",      teamLeader: "Taiwo Thomas",      salesManager: "",                    branch: "NG Lagos",      regDate: "22/04/2026", verified: true,  blacklist: false },
    { id: "STD23208", title: "Mrs.",  firstName: "Rukayat",   lastName: "Adebisi Obanor",       phone: "+2348012345621", email: "rao@example.com",          consultant: "Jennifer Abeje Adofikwu",  teamLeader: "Taiwo Thomas",      salesManager: "",                    branch: "NG Lagos",      regDate: "22/04/2026", verified: true,  blacklist: false },
    { id: "STD23206", title: "Ms.",   firstName: "Adekemi",   lastName: "Adeleye",              phone: "+447900000017", email: "adek@example.com",            consultant: "Michael Ogunbowale",      teamLeader: "Victor Daudu",      salesManager: "Laura Gavieiro Agud", branch: "London Office", regDate: "22/04/2026", verified: true,  blacklist: false },
    { id: "STD23204", title: "Mrs.",  firstName: "Eleni",     lastName: "Sidiropoulou",         phone: "+447900000016", email: "esid@example.com",            consultant: "Cristina-Elena Nica",     teamLeader: "Andreea Cimpoi",    salesManager: "Laura Gavieiro Agud", branch: "London Office", regDate: "22/04/2026", verified: true,  blacklist: false },
    { id: "STD23203", title: "Mr.",   firstName: "Uchenna",   lastName: "Caleb Iheakolam",      phone: "+2348012345700", email: "uchi@example.com",          consultant: "Jennifer Abeje Adofikwu",  teamLeader: "Taiwo Thomas",      salesManager: "",                    branch: "NG Lagos",      regDate: "22/04/2026", verified: true,  blacklist: false },
    { id: "STD23202", title: "Mrs.",  firstName: "Maria",     lastName: "Adriana Dehel",        phone: "+407212345678", email: "mad@example.com",            consultant: "Andrada-Cristina Balan",  teamLeader: "Andreea Cimpoi",    salesManager: "Laura Gavieiro Agud", branch: "London Office", regDate: "22/04/2026", verified: true,  blacklist: false },
    { id: "STD23201", title: "Mr.",   firstName: "Felipe",    lastName: "Giraldo Restrepo",     phone: "+447845405305",  email: "jfgr0291@gmail.com",         consultant: "Oana-Maria Voinea",       teamLeader: "Andreea Cimpoi",    salesManager: "Laura Gavieiro Agud", branch: "London Office", regDate: "22/04/2026", verified: true,  blacklist: false, dob: "1991-01-02", nationality: "Spain", residence: "United Kingdom", birthCountry: "Colombia", passportId: "PA0950738", passportIssue: "2022-09-23", passportExpiry: "2032-09-23", gender: "Male", maritalStatus: "Single" },
    { id: "STD23200", title: "Ms.",   firstName: "Sofia",     lastName: "Petrescu",             phone: "+407212345601", email: "sofia.p@example.com",        consultant: "Andrada-Cristina Balan",  teamLeader: "Andreea Cimpoi",    salesManager: "Laura Gavieiro Agud", branch: "London Office", regDate: "21/04/2026", verified: true,  blacklist: false },
    { id: "STD23199", title: "Mr.",   firstName: "Olawale",   lastName: "Ayoola Bamgbose",      phone: "+2348012345701", email: "oab@example.com",          consultant: "Ilunosen Ann Oyana",      teamLeader: "Taiwo Thomas",      salesManager: "",                    branch: "NG Lagos",      regDate: "21/04/2026", verified: false, blacklist: false },
    { id: "STD23198", title: "Mrs.",  firstName: "Ioana",     lastName: "Marinescu",            phone: "+407212345699", email: "im@example.com",            consultant: "Cristina-Elena Nica",     teamLeader: "Andreea Cimpoi",    salesManager: "Laura Gavieiro Agud", branch: "London Office", regDate: "21/04/2026", verified: true,  blacklist: true },
  ];
  const crmStudentsTotalCount = 11559; // mirrors the production-feeling total

  // Apply filters → return the visible slice + total filtered count.
  const filteredStudents = crmStudents.filter(s => {
    const f = studentFilters;
    if (f.branch && s.branch !== f.branch) return false;
    if (f.teamLeader && s.teamLeader !== f.teamLeader) return false;
    if (f.salesManager && s.salesManager !== f.salesManager) return false;
    if (f.consultant && s.consultant !== f.consultant) return false;
    if (f.search) {
      const q = f.search.toLowerCase();
      const fullName = `${s.title} ${s.firstName} ${s.lastName}`.toLowerCase();
      if (!s.id.toLowerCase().includes(q) && !fullName.includes(q) && !s.email.toLowerCase().includes(q)) return false;
    }
    return true;
  });
  const studentPageStart = (studentPage - 1) * studentPerPage;
  const studentVisible = filteredStudents.slice(studentPageStart, studentPageStart + studentPerPage);
  // Paged total reflects the large mock total when no filters applied — matches
  // production "Total 11559 items" feel — and the actual filtered count when filters change.
  const studentTotalShown = (studentFilters.branch || studentFilters.teamLeader || studentFilters.salesManager ||
                             studentFilters.consultant || studentFilters.search)
    ? filteredStudents.length
    : crmStudentsTotalCount;

  // List of available filter options (derived from data + a few extras to feel real)
  const branchOptions       = Array.from(new Set(crmStudents.map(s => s.branch))).filter(Boolean);
  const teamLeaderOptions   = Array.from(new Set(crmStudents.map(s => s.teamLeader))).filter(Boolean);
  const salesManagerOptions = Array.from(new Set(crmStudents.map(s => s.salesManager))).filter(Boolean);
  const consultantOptions   = Array.from(new Set(crmStudents.map(s => s.consultant))).filter(Boolean);

  // ─── StudentListView — the main paginated table screen ─────────
  function StudentListView() {
    // Theme-aware table header — light teal in light mode, soft tint in dark mode.
    const headerBg = darkMode ? "rgba(63,181,183,0.10)" : "#E0F2F1";
    // Field input shared style. Centralized so all the form controls match.
    const inputStyle = {
      width: "100%", padding: "10px 12px",
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 6,
      fontSize: 13, color: C.text,
      fontFamily: "'Roboto', sans-serif",
      outline: "none",
      appearance: "none",
    };
    const selectStyle = {
      ...inputStyle,
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(C.textSoft)}' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 12px center",
      paddingRight: 36,
    };
    return (
      <div style={{
        flex: 1, overflowY: "auto", background: C.bg,
        padding: "20px 24px",
      }}>
        {/* ── Page header banner: teal bar with breadcrumb + Back button ── */}
        <div style={{
          background: C.primary,
          borderRadius: 8,
          padding: "16px 22px",
          marginBottom: 22,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: darkMode ? "0 2px 8px rgba(0,0,0,0.25)" : "0 1px 3px rgba(0,0,0,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff" }}>
            <Home size={16} />
            <span style={{ fontSize: 14, fontWeight: 600 }}>Dashboard</span>
            <span style={{ fontSize: 14, opacity: 0.7 }}>/</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.secondary }}>Student List</span>
          </div>
          <button
            onClick={() => setActivePage("dashboard")}
            className="smooth"
            style={{
              padding: "6px 14px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.35)",
              borderRadius: 6,
              color: "#fff", fontSize: 12.5, fontWeight: 600,
              display: "flex", alignItems: "center", gap: 6,
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={13} /> Back
          </button>
        </div>

        {/* ── Filter card ── */}
        <div style={{
          background: C.surface,
          borderRadius: 8,
          border: `1px solid ${C.border}`,
          padding: "20px 22px",
          marginBottom: 18,
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 16,
            marginBottom: 14,
          }}>
            <select
              value={studentFilters.branch}
              onChange={e => setStudentFilters({ ...studentFilters, branch: e.target.value })}
              style={selectStyle}
            >
              <option value="">Select Branch</option>
              {branchOptions.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <select
              value={studentFilters.teamLeader}
              onChange={e => setStudentFilters({ ...studentFilters, teamLeader: e.target.value })}
              style={selectStyle}
            >
              <option value="">Select Sales Team Leader</option>
              {teamLeaderOptions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select
              value={studentFilters.salesManager}
              onChange={e => setStudentFilters({ ...studentFilters, salesManager: e.target.value })}
              style={selectStyle}
            >
              <option value="">Select Sales Manager</option>
              {salesManagerOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 16,
            marginBottom: 14,
          }}>
            <select
              value={studentFilters.type}
              onChange={e => setStudentFilters({ ...studentFilters, type: e.target.value })}
              style={selectStyle}
            >
              <option value="">Type</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="postgraduate">Postgraduate</option>
              <option value="phd">PhD</option>
              <option value="foundation">Foundation</option>
            </select>
            <select
              value={studentFilters.consultant}
              onChange={e => setStudentFilters({ ...studentFilters, consultant: e.target.value })}
              style={selectStyle}
            >
              <option value="">Select Consultant</option>
              {consultantOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={studentFilters.accountStatus}
              onChange={e => setStudentFilters({ ...studentFilters, accountStatus: e.target.value })}
              style={selectStyle}
            >
              <option value="">Accounts Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              placeholder="UAPP ID, Name, Email"
              value={studentFilters.search}
              onChange={e => setStudentFilters({ ...studentFilters, search: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <input
              type="checkbox"
              id="isConsultantChk"
              checked={studentFilters.isConsultant}
              onChange={e => setStudentFilters({ ...studentFilters, isConsultant: e.target.checked })}
              style={{ width: 14, height: 14, accentColor: C.primary, cursor: "pointer" }}
            />
            <label htmlFor="isConsultantChk" style={{ fontSize: 13, color: C.text, cursor: "pointer" }}>Is Consultant?</label>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 12.5, color: darkMode ? "#7DD3FC" : "#0369A1",
          }}>
            <span style={{
              width: 18, height: 18, borderRadius: "50%",
              background: darkMode ? "rgba(14,165,233,0.18)" : "#E0F2FE",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Info size={11} color={darkMode ? "#7DD3FC" : "#0369A1"} />
            </span>
            Name should not include title.
          </div>
        </div>

        {/* ── Action bar: Add Student + Order/Showing/Print ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 14,
          flexWrap: "wrap", gap: 12,
        }}>
          <button
            onClick={() => { setEditingStudentId("new"); setStudentEditTab("Personal"); }}
            className="smooth"
            style={{
              padding: "10px 18px",
              background: C.primary,
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 13, fontWeight: 600,
              display: "flex", alignItems: "center", gap: 8,
              cursor: "pointer",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            <Plus size={15} strokeWidth={2.5} /> Add Student
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: C.textMid }}>Order By :</span>
              <select
                value={studentOrderBy}
                onChange={e => setStudentOrderBy(e.target.value)}
                style={{ ...selectStyle, width: 120, padding: "8px 10px" }}
              >
                <option value="">Order By</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="name-asc">Name A→Z</option>
                <option value="name-desc">Name Z→A</option>
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: C.textMid }}>Showing :</span>
              <select
                value={studentPerPage}
                onChange={e => { setStudentPerPage(parseInt(e.target.value)); setStudentPage(1); }}
                style={{ ...selectStyle, width: 70, padding: "8px 10px" }}
              >
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <Tooltip label="Print" position="bottom">
              <button
                className="smooth"
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "transparent", border: `1px solid ${C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: C.textMid, cursor: "pointer",
                }}
              >
                <FileText size={15} />
              </button>
            </Tooltip>
            <Tooltip label="View options" position="bottom">
              <button
                className="smooth"
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "transparent", border: `1px solid ${C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: C.textMid, cursor: "pointer",
                }}
              >
                <MoreHorizontal size={15} />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* ── Data table ── */}
        <div style={{
          background: C.surface,
          borderRadius: 8,
          border: `1px solid ${C.border}`,
          overflow: "hidden",
          marginBottom: 18,
        }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1200, fontFamily: "'Roboto', sans-serif" }}>
              <thead>
                <tr style={{ background: headerBg }}>
                  {["UAPP ID", "Full Name", "Contact", "Consultant", "Sales Team Leader", "Sales Manager", "Branch", "UAPP Reg Date", "Password", "Black List", "Verified", "Action"].map(h => (
                    <th key={h} style={{
                      padding: "12px 14px",
                      fontSize: 12, fontWeight: 700,
                      color: C.text,
                      textAlign: h === "Action" ? "center" : "left",
                      whiteSpace: "nowrap",
                      borderBottom: `1px solid ${C.border}`,
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {studentVisible.map((s, idx) => {
                  const fullName = `${s.title ? s.title + " " : ""}${s.firstName} ${s.lastName}`;
                  return (
                    <tr key={s.id} style={{
                      borderBottom: `1px solid ${C.border}`,
                      background: idx % 2 === 0 ? "transparent" : (darkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)"),
                    }}>
                      <td style={{ padding: "10px 14px", fontSize: 12.5, color: C.primary, fontWeight: 500 }}>{s.id}</td>
                      <td style={{ padding: "10px 14px", fontSize: 12.5, color: C.primary, fontWeight: 500 }}>{fullName}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ display: "flex", gap: 8, color: C.textSoft }}>
                          {s.phone && <Tooltip label={s.phone} position="top"><Phone size={13} /></Tooltip>}
                          {s.email && <Tooltip label={s.email} position="top"><Mail size={13} /></Tooltip>}
                        </div>
                      </td>
                      <td style={{ padding: "10px 14px", fontSize: 12.5, color: C.primary, fontWeight: 500 }}>{s.consultant}</td>
                      <td style={{ padding: "10px 14px", fontSize: 12.5, color: C.primary, fontWeight: 500 }}>{s.teamLeader}</td>
                      <td style={{ padding: "10px 14px", fontSize: 12.5, color: C.primary, fontWeight: 500 }}>{s.salesManager}</td>
                      <td style={{ padding: "10px 14px", fontSize: 12.5, color: C.primary, fontWeight: 500 }}>{s.branch}</td>
                      <td style={{ padding: "10px 14px", fontSize: 12.5, color: C.text }}>{s.regDate}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <button className="smooth" style={{
                          padding: 0, background: "transparent", border: "none",
                          color: darkMode ? "#7DD3FC" : "#2563EB",
                          fontSize: 12.5, cursor: "pointer", fontWeight: 500,
                        }}>Change</button>
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center",
                          width: 32, height: 18, padding: 2,
                          background: s.blacklist ? C.primary : C.border,
                          borderRadius: T.radFull,
                          justifyContent: s.blacklist ? "flex-end" : "flex-start",
                          transition: "all 0.2s ease",
                        }}>
                          <span style={{
                            width: 14, height: 14, borderRadius: "50%",
                            background: "#fff",
                          }} />
                        </span>
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          {s.verified ? (
                            <>
                              <span style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>Verified</span>
                              <button className="smooth" style={{
                                padding: 0, background: "transparent", border: "none",
                                color: darkMode ? "#7DD3FC" : "#2563EB",
                                fontSize: 11.5, cursor: "pointer", textAlign: "left", fontWeight: 500,
                              }}>Resend Login</button>
                            </>
                          ) : (
                            <button className="smooth" style={{
                              padding: 0, background: "transparent", border: "none",
                              color: darkMode ? "#7DD3FC" : "#2563EB",
                              fontSize: 12, cursor: "pointer", textAlign: "left", fontWeight: 500,
                            }}>Resend</button>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                          <Tooltip label="View" position="top">
                            <button className="smooth" style={{
                              width: 28, height: 28, borderRadius: 4,
                              background: C.primary, color: "#fff",
                              border: "none", cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                              <Eye size={14} />
                            </button>
                          </Tooltip>
                          <Tooltip label="Edit" position="top">
                            <button
                              onClick={() => { setEditingStudentId(s.id); setStudentEditTab("Personal"); }}
                              className="smooth" style={{
                                width: 28, height: 28, borderRadius: 4,
                                background: C.secondary, color: "#fff",
                                border: "none", cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}
                            >
                              <Edit2 size={14} />
                            </button>
                          </Tooltip>
                          <Tooltip label="Delete" position="top">
                            <button className="smooth" style={{
                              width: 28, height: 28, borderRadius: 4,
                              background: C.danger, color: "#fff",
                              border: "none", cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                              <Trash2 size={14} />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Pagination ── */}
        {(() => {
          const totalPages = Math.max(1, Math.ceil((studentTotalShown === crmStudentsTotalCount ? crmStudentsTotalCount : filteredStudents.length) / studentPerPage));
          // Build a page window around the current page (3 before, 3 after).
          const pageWindow = [];
          for (let p = Math.max(1, studentPage - 5); p <= Math.min(totalPages, studentPage + 4); p++) pageWindow.push(p);
          return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button
                  onClick={() => setStudentPage(1)}
                  disabled={studentPage === 1}
                  className="smooth"
                  style={{
                    padding: "7px 14px", background: "transparent",
                    border: `1px solid ${C.border}`, borderRadius: 6,
                    color: studentPage === 1 ? C.textVerySoft : C.textMid,
                    cursor: studentPage === 1 ? "not-allowed" : "pointer",
                    fontSize: 13,
                  }}
                >First</button>
                <button
                  onClick={() => setStudentPage(p => Math.max(1, p - 1))}
                  disabled={studentPage === 1}
                  className="smooth"
                  style={{
                    width: 34, height: 34, borderRadius: 6,
                    background: "transparent", border: `1px solid ${C.border}`,
                    color: studentPage === 1 ? C.textVerySoft : C.textMid,
                    cursor: studentPage === 1 ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                ><ChevronLeft size={14} /></button>
                {pageWindow.map(p => (
                  <button
                    key={p}
                    onClick={() => setStudentPage(p)}
                    className="smooth"
                    style={{
                      width: 34, height: 34, borderRadius: 6,
                      background: p === studentPage ? C.primary : "transparent",
                      border: p === studentPage ? `1px solid ${C.primary}` : `1px solid ${C.border}`,
                      color: p === studentPage ? "#fff" : C.textMid,
                      cursor: "pointer",
                      fontSize: 13, fontWeight: p === studentPage ? 700 : 500,
                    }}
                  >{p}</button>
                ))}
                <button
                  onClick={() => setStudentPage(p => Math.min(totalPages, p + 1))}
                  disabled={studentPage === totalPages}
                  className="smooth"
                  style={{
                    width: 34, height: 34, borderRadius: 6,
                    background: "transparent", border: `1px solid ${C.border}`,
                    color: studentPage === totalPages ? C.textVerySoft : C.textMid,
                    cursor: studentPage === totalPages ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                ><ChevronRight size={14} /></button>
                <button
                  onClick={() => setStudentPage(totalPages)}
                  disabled={studentPage === totalPages}
                  className="smooth"
                  style={{
                    padding: "7px 14px", background: "transparent",
                    border: `1px solid ${C.border}`, borderRadius: 6,
                    color: studentPage === totalPages ? C.textVerySoft : C.textMid,
                    cursor: studentPage === totalPages ? "not-allowed" : "pointer",
                    fontSize: 13,
                  }}
                >Last</button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 16, color: C.secondary, fontWeight: 700 }}>
                  Total {studentTotalShown.toLocaleString()} items
                </span>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: `conic-gradient(${C.secondary} 0deg, ${C.primary} 120deg, #FFD600 240deg, ${C.secondary} 360deg)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: C.surface,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Globe size={14} color={C.primary} />
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    );
  }

  // ─── StudentEditView — tabbed form (Personal / Contact / Application / …) ─────────
  function StudentEditView() {
    // The student record being edited (or empty defaults when creating new).
    const baseStudent = crmStudents.find(s => s.id === editingStudentId) || {};
    // "Review and Sign" tab removed per request — the form now ends at Documents.
    const tabs = ["Personal", "Contact", "Application", "Funding", "Education", "ELT Score", "Experience", "Reference", "Emergency Contact", "Statement", "Others", "Documents"];
    const tabIdx = Math.max(0, tabs.indexOf(studentEditTab));

    // ─── Modern input styling ─────────────────────────────────────
    // Floating-feel inputs: clean single border, soft focus state, generous
    // padding. The dropdown arrow uses an inline SVG so we don't need a
    // chevron div per select.
    const inputStyle = {
      width: "100%", padding: "11px 14px",
      background: darkMode ? "rgba(255,255,255,0.03)" : "#FAFBFC",
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      fontSize: 13.5, color: C.text,
      fontFamily: "'Roboto', sans-serif",
      outline: "none",
      transition: "border-color 0.18s ease, background 0.18s ease",
    };
    const selectStyle = {
      ...inputStyle,
      appearance: "none",
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(C.textSoft)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 14px center",
      paddingRight: 38,
    };
    // Field shell — label above input with required-asterisk indicator.
    const Field = ({ label, required = true, children, span = 1 }) => (
      <div style={{ gridColumn: `span ${span}` }}>
        <label style={{
          display: "block", fontSize: 11.5, fontWeight: 600,
          color: C.textMid, marginBottom: 7,
          fontFamily: "'Roboto', sans-serif",
          letterSpacing: "0.02em", textTransform: "uppercase",
        }}>
          {label}
          {required && <span style={{ color: C.danger, marginLeft: 4 }}>*</span>}
        </label>
        {children}
      </div>
    );

    // ─── Modern segmented control (replaces ugly bare radios) ──────
    // Used for Title, Gender, Marital Status. Single visual unit with
    // a sliding "active" pill — clean, mobile-friendly, accessible.
    const Segmented = ({ name, options, value, onChange }) => {
      const [val, setVal] = useState(value);
      return (
        <div style={{
          display: "inline-flex", padding: 3,
          background: darkMode ? "rgba(255,255,255,0.04)" : "#F1F4F6",
          borderRadius: 9, border: `1px solid ${C.border}`,
          flexWrap: "wrap", gap: 0,
        }}>
          {options.map(opt => {
            const active = val === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => { setVal(opt); onChange && onChange(opt); }}
                className="smooth"
                style={{
                  padding: "7px 18px",
                  background: active ? C.surface : "transparent",
                  color: active ? C.primary : C.textMid,
                  fontSize: 12.5, fontWeight: active ? 700 : 500,
                  border: "none",
                  borderRadius: 7,
                  cursor: "pointer",
                  fontFamily: "'Roboto', sans-serif",
                  boxShadow: active
                    ? (darkMode ? "0 1px 3px rgba(0,0,0,0.35)" : "0 1px 3px rgba(0,0,0,0.08)")
                    : "none",
                }}
              >{opt}</button>
            );
          })}
        </div>
      );
    };

    // ─── Section card shell — groups related fields with header + icon ─
    const Section = ({ icon: Icon, title, subtitle, children }) => (
      <div style={{
        background: C.surface,
        borderRadius: T.radLg,
        border: `1px solid ${C.border}`,
        padding: "22px 24px 24px",
        marginBottom: 18,
        boxShadow: darkMode ? "0 1px 3px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.04)",
      }}>
        <div style={{
          display: "flex", alignItems: "flex-start", gap: 12,
          paddingBottom: 18, marginBottom: 20,
          borderBottom: `1px solid ${C.divider}`,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: T.radMd,
            background: C.primary10, color: C.primary,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <Icon size={17} />
          </div>
          <div>
            <h4 style={{
              fontSize: 14.5, fontWeight: 700, color: C.text,
              fontFamily: "'Roboto', sans-serif",
              letterSpacing: "-0.01em",
            }}>{title}</h4>
            {subtitle && (
              <p style={{ fontSize: 12, color: C.textSoft, marginTop: 2 }}>{subtitle}</p>
            )}
          </div>
        </div>
        {children}
      </div>
    );

    return (
      <div style={{
        flex: 1, overflowY: "auto", background: C.bg,
        display: "flex", flexDirection: "column",
      }}>
        {/* ── Sticky header: breadcrumb + Back ── */}
        <div style={{
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          padding: "14px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => setEditingStudentId(null)}
              className="smooth"
              style={{
                width: 32, height: 32, borderRadius: 8,
                background: darkMode ? "rgba(255,255,255,0.04)" : "#F1F4F6",
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: C.textMid,
              }}
            >
              <ArrowLeft size={15} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5 }}>
              <Home size={13} color={C.textSoft} />
              <span style={{ color: C.textSoft }}>Dashboard</span>
              <ChevronRight size={11} color={C.textVerySoft} />
              <button
                onClick={() => setEditingStudentId(null)}
                className="smooth"
                style={{
                  background: "transparent", border: "none", padding: 0, cursor: "pointer",
                  color: C.textSoft, fontSize: 12.5,
                  fontFamily: "'Roboto', sans-serif",
                }}
              >Students</button>
              <ChevronRight size={11} color={C.textVerySoft} />
              <span style={{ color: C.text, fontWeight: 600 }}>
                {editingStudentId === "new"
                  ? "Add Student"
                  : `${baseStudent.firstName || ""} ${baseStudent.lastName || ""}`.trim() || `Edit ${editingStudentId}`}
              </span>
            </div>
          </div>
          {/* Step counter — small badge so users know how many tabs there are */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "6px 12px",
            background: C.primary10, color: C.primary,
            borderRadius: T.radFull, fontSize: 11.5, fontWeight: 700,
          }}>
            <span style={{ opacity: 0.7 }}>Step</span>
            {tabIdx + 1} / {tabs.length}
          </div>
        </div>

        {/* ── Modern pill tab strip ── */}
        <div style={{
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          padding: "10px 28px 0",
          display: "flex", overflowX: "auto", gap: 4,
          flexShrink: 0,
        }}>
          {tabs.map((t, i) => {
            const active = t === studentEditTab;
            const completed = i < tabIdx;
            return (
              <button
                key={t}
                onClick={() => setStudentEditTab(t)}
                className="smooth"
                style={{
                  padding: "10px 16px",
                  background: "transparent",
                  color: active ? C.primary : (completed ? C.text : C.textSoft),
                  border: "none",
                  fontSize: 12.5, fontWeight: active ? 700 : 500,
                  cursor: "pointer",
                  fontFamily: "'Roboto', sans-serif",
                  whiteSpace: "nowrap",
                  position: "relative",
                  display: "flex", alignItems: "center", gap: 6,
                  borderBottom: active
                    ? `2px solid ${C.primary}`
                    : "2px solid transparent",
                  marginBottom: -1,
                }}
              >
                {completed && <Check size={12} color={C.success} strokeWidth={3} />}
                {t}
              </button>
            );
          })}
        </div>

        {/* ── Form body ── */}
        <div style={{ flex: 1, padding: "28px 28px 100px" }}>
          <div style={{ maxWidth: 920, margin: "0 auto" }}>

            {studentEditTab === "Personal" && (
              <>
                {/* Page heading */}
                <div style={{ marginBottom: 22 }}>
                  <h2 style={{
                    fontSize: T.fontXl, fontWeight: 700, color: C.text,
                    letterSpacing: "-0.01em", marginBottom: 4,
                    fontFamily: "'Roboto', sans-serif",
                  }}>Personal Information</h2>
                  <p style={{ fontSize: 13, color: C.textSoft }}>
                    Basic identity, contact, and citizenship details.
                  </p>
                </div>

                {/* ─── Profile + Identity (header card) ─── */}
                <div style={{
                  background: C.surface,
                  borderRadius: T.radLg,
                  border: `1px solid ${C.border}`,
                  padding: "26px 28px",
                  marginBottom: 18,
                  boxShadow: darkMode ? "0 1px 3px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.04)",
                  display: "flex", gap: 24,
                  alignItems: "flex-start", flexWrap: "wrap",
                }}>
                  {/* Avatar with camera overlay */}
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div style={{
                      width: 96, height: 96, borderRadius: "50%",
                      background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight || C.primary})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: 32, fontWeight: 700,
                      letterSpacing: "-0.02em",
                      boxShadow: darkMode ? "0 4px 16px rgba(0,0,0,0.4)" : "0 4px 16px rgba(4,93,94,0.18)",
                    }}>
                      {((baseStudent.firstName || "J")[0] + (baseStudent.lastName || "G")[0]).toUpperCase()}
                    </div>
                    <button
                      type="button"
                      className="smooth"
                      style={{
                        position: "absolute", bottom: -2, right: -2,
                        width: 32, height: 32, borderRadius: "50%",
                        background: C.surface, color: C.primary,
                        border: `2px solid ${C.surface}`,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer",
                      }}
                      title="Upload photo"
                    >
                      <ImageIcon size={13} />
                    </button>
                  </div>

                  {/* Identity fields — name + consultant */}
                  <div style={{ flex: 1, minWidth: 280 }}>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 14,
                    }}>
                      <Field label="First Name">
                        <input type="text" defaultValue={baseStudent.firstName || "John Felipe"} style={inputStyle} />
                      </Field>
                      <Field label="Last Name">
                        <input type="text" defaultValue={baseStudent.lastName || "Giraldo Restrepo"} style={inputStyle} />
                      </Field>
                    </div>
                    <div style={{ marginTop: 14 }}>
                      <Field label="Consultant">
                        <select defaultValue={baseStudent.consultant || "Oana-Maria Voinea"} style={selectStyle}>
                          {consultantOptions.concat(["Oana-Maria Voinea"]).filter((v, i, a) => a.indexOf(v) === i).map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <div style={{ marginTop: 14 }}>
                      <label style={{
                        display: "block", fontSize: 11.5, fontWeight: 600,
                        color: C.textMid, marginBottom: 7,
                        letterSpacing: "0.02em", textTransform: "uppercase",
                        fontFamily: "'Roboto', sans-serif",
                      }}>Title <span style={{ color: C.danger, marginLeft: 4 }}>*</span></label>
                      <Segmented name="title" options={["Mr.", "Miss.", "Ms.", "Mrs.", "Mx"]} value={baseStudent.title || "Mr."} />
                    </div>
                  </div>
                </div>

                {/* ─── Identity Documents ─── */}
                <Section icon={FileText} title="Identity Documents" subtitle="Passport or national ID details for verification.">
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}>
                    <Field label="Date of Birth">
                      <input type="date" defaultValue={baseStudent.dob || "1991-01-02"} style={inputStyle} />
                    </Field>
                    <Field label="Passport / ID">
                      <input type="text" defaultValue={baseStudent.passportId || "PA0950738"} style={inputStyle} />
                    </Field>
                    <Field label="Issue Date">
                      <input type="date" defaultValue={baseStudent.passportIssue || "2022-09-23"} style={inputStyle} />
                    </Field>
                    <Field label="Expiry Date">
                      <input type="date" defaultValue={baseStudent.passportExpiry || "2032-09-23"} style={inputStyle} />
                    </Field>
                  </div>
                </Section>

                {/* ─── Demographics ─── */}
                <Section icon={UserCheck} title="Demographics" subtitle="Used for university applications and visa documentation.">
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div>
                      <label style={{
                        display: "block", fontSize: 11.5, fontWeight: 600,
                        color: C.textMid, marginBottom: 7,
                        letterSpacing: "0.02em", textTransform: "uppercase",
                      }}>Gender <span style={{ color: C.danger, marginLeft: 4 }}>*</span></label>
                      <Segmented name="gender" options={["Male", "Female", "Others"]} value={baseStudent.gender || "Male"} />
                    </div>
                    <div>
                      <label style={{
                        display: "block", fontSize: 11.5, fontWeight: 600,
                        color: C.textMid, marginBottom: 7,
                        letterSpacing: "0.02em", textTransform: "uppercase",
                      }}>Marital Status <span style={{ color: C.danger, marginLeft: 4 }}>*</span></label>
                      <Segmented name="marital" options={["Single", "Married"]} value={baseStudent.maritalStatus || "Single"} />
                    </div>
                  </div>
                </Section>

                {/* ─── Contact ─── */}
                <Section icon={Phone} title="Contact" subtitle="How we'll reach the student during the application process.">
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}>
                    <Field label="Phone Number">
                      <div style={{ display: "flex", gap: 8 }}>
                        <select style={{ ...selectStyle, width: 78, paddingRight: 28 }} defaultValue="GB">
                          <option value="GB">🇬🇧</option>
                          <option value="US">🇺🇸</option>
                          <option value="ES">🇪🇸</option>
                          <option value="NG">🇳🇬</option>
                          <option value="RO">🇷🇴</option>
                        </select>
                        <input type="text" defaultValue={baseStudent.phone || "+44 7845 405305"} style={inputStyle} />
                      </div>
                    </Field>
                    <Field label="Email">
                      <input type="email" defaultValue={baseStudent.email || "jfgr0291@gmail.com"} style={inputStyle} />
                    </Field>
                  </div>
                </Section>

                {/* ─── Geography ─── */}
                <Section icon={MapPin} title="Geography" subtitle="Country of birth, residence, and nationality.">
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 16,
                  }}>
                    <Field label="Country of Birth">
                      <select defaultValue={baseStudent.birthCountry || "Colombia"} style={selectStyle}>
                        {["Colombia","United Kingdom","Spain","Nigeria","Romania","Greece","Turkey","India","Pakistan","Bangladesh","United States"].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Country of Residence">
                      <select defaultValue={baseStudent.residence || "United Kingdom"} style={selectStyle}>
                        {["United Kingdom","Spain","Colombia","Nigeria","Romania","Greece","Turkey","India","Pakistan","Bangladesh","United States"].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Nationality">
                      <select defaultValue={baseStudent.nationality || "Spain"} style={selectStyle}>
                        {["Spain","United Kingdom","Colombia","Nigeria","Romania","Greece","Turkey","India","Pakistan","Bangladesh","United States"].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </Section>
              </>
            )}

            {/* Placeholder for non-Personal tabs */}
            {studentEditTab !== "Personal" && (
              <div style={{
                marginTop: 40, textAlign: "center",
                background: C.surface, borderRadius: T.radLg,
                border: `1px solid ${C.border}`,
                padding: "60px 40px",
                boxShadow: darkMode ? "0 1px 3px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.04)",
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: T.radXl,
                  background: C.primary10, color: C.primary,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 18,
                }}>
                  <FileText size={28} />
                </div>
                <h3 style={{
                  fontSize: T.fontLg, fontWeight: 700, color: C.text,
                  marginBottom: 6, letterSpacing: "-0.01em",
                }}>{studentEditTab}</h3>
                <p style={{ fontSize: 13.5, color: C.textSoft, marginBottom: 0, maxWidth: 400, margin: "0 auto" }}>
                  This section will contain the {studentEditTab.toLowerCase()} fields once wired up.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Sticky bottom action bar ── */}
        <div style={{
          position: "sticky", bottom: 0,
          background: C.surface,
          borderTop: `1px solid ${C.border}`,
          padding: "14px 28px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexShrink: 0,
          boxShadow: darkMode ? "0 -2px 12px rgba(0,0,0,0.3)" : "0 -2px 12px rgba(0,0,0,0.04)",
        }}>
          <div style={{ fontSize: 11.5, color: C.textSoft }}>
            <span style={{ fontWeight: 600, color: C.textMid }}>{tabIdx + 1}</span>
            <span style={{ margin: "0 4px" }}>of</span>
            <span>{tabs.length}</span>
            <span style={{ margin: "0 8px", color: C.textVerySoft }}>•</span>
            <span style={{ color: C.text, fontWeight: 500 }}>{studentEditTab}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setEditingStudentId(null)}
              className="smooth"
              style={{
                padding: "9px 18px",
                background: "transparent",
                color: C.textMid,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                fontSize: 13, fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Roboto', sans-serif",
              }}
            >Cancel</button>
            {tabIdx > 0 && (
              <button
                onClick={() => setStudentEditTab(tabs[tabIdx - 1])}
                className="smooth"
                style={{
                  padding: "9px 18px",
                  background: "transparent",
                  color: C.text,
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  fontSize: 13, fontWeight: 600,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                  fontFamily: "'Roboto', sans-serif",
                }}
              ><ArrowLeft size={13} /> Previous</button>
            )}
            <button
              onClick={() => {
                if (tabIdx < tabs.length - 1) setStudentEditTab(tabs[tabIdx + 1]);
              }}
              className="smooth"
              style={{
                padding: "9px 22px",
                background: C.primary,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 13, fontWeight: 700,
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
                fontFamily: "'Roboto', sans-serif",
                boxShadow: darkMode ? "0 2px 6px rgba(0,0,0,0.4)" : "0 2px 6px rgba(4,93,94,0.18)",
              }}
            >{tabIdx === tabs.length - 1 ? "Save" : "Save & Next"} <ArrowRight size={13} /></button>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     MARKETING MODULE — Marketing surface of the UAPP Leads app.
     Three sub-modules accessed via a tab strip at the top:
       • Ads — campaign management with platform mix, budget/ROI,
         status pills, and performance metrics (CTR / CPC / conversions)
       • Forms — lead capture form builder with field overview,
         submission counters, conversion rate, and embed code dialog
       • Events — webinar/workshop/seminar manager with banner cards,
         attendee tracking, status, and a published-event slider preview
     All sub-modules share the same visual language: section cards
     with icon headers, modern stat tiles, segmented controls for
     filters, and full dark-mode coverage via the C palette.
     ═══════════════════════════════════════════════════════════════ */
  function MarketingModule() {
    // The active sub-module is driven by marketingTab. Each has its own header
    // metadata (title, lede, primary action label) so the hero feels tailored.
    const subModuleMeta = {
      ads: {
        title: "Ads", lede: "Manage paid campaigns across Google, Meta, LinkedIn and TikTok — track CTR, CPC, conversions and ROI in one place.",
        Icon: Megaphone, gradient: ["#FC7300","#FF9233"],
        primaryAction: "New Campaign",
      },
      forms: {
        title: "Forms", lede: "Build lead-capture forms with drag-and-drop fields, track submissions and conversion rates, and embed forms on any website.",
        Icon: ClipboardCheck, gradient: ["#0EA5E9","#38BDF8"],
        primaryAction: "New Form",
      },
      events: {
        title: "Events", lede: "Host webinars, workshops and seminars. Customize banners, manage RSVPs, and broadcast live to attendees.",
        Icon: CalendarDays, gradient: ["#7C3AED","#A855F7"],
        primaryAction: "New Event",
      },
    };
    const meta = subModuleMeta[marketingTab] || subModuleMeta.ads;
    const MetaIcon = meta.Icon;

    return (
      <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
        {/* ── Page hero: contextual title for the active sub-module ── */}
        <div style={{
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          padding: "26px 36px",
        }}>
          {/* Breadcrumb */}
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 11.5, color: C.textSoft, marginBottom: 12,
          }}>
            <Megaphone size={12} />
            <span>Marketing</span>
            <ChevronRight size={10} color={C.textVerySoft} />
            <span style={{ color: C.text, fontWeight: 600 }}>{meta.title}</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, maxWidth: 600 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 11,
                background: `linear-gradient(135deg, ${meta.gradient[0]}, ${meta.gradient[1]})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                boxShadow: `0 4px 14px ${meta.gradient[0]}40`,
              }}>
                <MetaIcon size={20} color="#fff" />
              </div>
              <div>
                <h1 style={{
                  fontSize: T.fontXl, fontWeight: 700, color: C.text,
                  letterSpacing: "-0.015em", marginBottom: 4,
                  fontFamily: "'Roboto', sans-serif",
                }}>{meta.title}</h1>
                <p style={{ fontSize: T.fontSm, color: C.textSoft, lineHeight: T.lineBody }}>
                  {meta.lede}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button className="smooth" style={{
                padding: "9px 14px", background: "transparent",
                border: `1px solid ${C.border}`, borderRadius: 8,
                color: C.textMid, fontSize: 12.5, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6, cursor: "pointer",
              }}><BarChart3 size={13} /> Analytics</button>
              <button
                onClick={() => {
                  if (marketingTab === "events") {
                    // Open the create-event modal with sensible defaults.
                    setEventDraft({
                      name: "",
                      kind: "Webinar",
                      date: "",
                      time: "",
                      capacity: 200,
                      description: "",
                      bannerGradient: ["#FC7300","#FF9233"],
                      status: "Draft",
                      promoted: true,
                    });
                  }
                  // (Ads/Forms create flows are placeholder for now.)
                }}
                className="smooth" style={{
                padding: "9px 16px", background: C.primary,
                border: "none", borderRadius: 8, color: "#fff",
                fontSize: 12.5, fontWeight: 700,
                display: "flex", alignItems: "center", gap: 6, cursor: "pointer",
                boxShadow: darkMode ? "0 2px 6px rgba(0,0,0,0.4)" : "0 2px 6px rgba(4,93,94,0.18)",
              }}><Plus size={13} strokeWidth={2.5} /> {meta.primaryAction}</button>
            </div>
          </div>
        </div>

        {/* ── Active sub-module ── */}
        {marketingTab === "ads"    && <AdsSubmodule />}
        {marketingTab === "forms"  && <FormsSubmodule />}
        {marketingTab === "events" && <EventsSubmodule />}

        {/* Dialog/modal overlay (rendered last so it sits on top) */}
        {marketingDialog && <MarketingDialog />}
      </div>
    );
  }

  // ─── Shared visual primitives for the marketing module ──────────
  // (Sit at component scope so they share state and C palette closure.)
  function StatTile({ Icon, label, value, delta, accent }) {
    const color = accent || C.primary;
    return (
      <div style={{
        background: C.surface, borderRadius: T.radLg,
        border: `1px solid ${C.border}`,
        padding: "16px 18px",
        boxShadow: darkMode ? "0 1px 3px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.04)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: darkMode ? `${color}26` : `${color}1A`,
            color: color,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon size={15} />
          </div>
          {delta && (
            <span style={{
              fontSize: 11, fontWeight: 700,
              color: delta.startsWith("+") ? C.success : C.danger,
            }}>{delta}</span>
          )}
        </div>
        <div style={{ fontSize: 11, color: C.textSoft, fontWeight: 600, letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: T.fontXl, fontWeight: 700, color: C.text, letterSpacing: "-0.02em" }}>{value}</div>
      </div>
    );
  }
  function StatusPill({ status }) {
    const palette = {
      Active:    { fg: C.success, bg: darkMode ? "rgba(52,211,153,0.14)" : "rgba(16,185,129,0.10)" },
      Paused:    { fg: C.warn,    bg: darkMode ? "rgba(251,191,36,0.16)" : "rgba(245,158,11,0.10)" },
      Completed: { fg: C.textSoft, bg: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)" },
      Draft:     { fg: C.textSoft, bg: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)" },
      Published: { fg: "#2563EB", bg: darkMode ? "rgba(59,130,246,0.18)" : "rgba(37,99,235,0.10)" },
      Live:      { fg: C.danger,  bg: darkMode ? "rgba(248,113,113,0.18)" : "rgba(239,68,68,0.10)" },
    };
    const p = palette[status] || palette.Draft;
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        padding: "3px 9px", borderRadius: T.radFull,
        background: p.bg, color: p.fg,
        fontSize: 11, fontWeight: 700, letterSpacing: "0.02em",
      }}>
        {status === "Live" && <CircleDot size={9} fill={p.fg} />}
        {status}
      </span>
    );
  }
  function PlatformBadge({ platform }) {
    const map = {
      "Google Ads":  { fg: "#4285F4", bg: darkMode ? "rgba(66,133,244,0.18)" : "rgba(66,133,244,0.10)", initial: "G" },
      "Meta Ads":    { fg: "#0668E1", bg: darkMode ? "rgba(6,104,225,0.20)" : "rgba(6,104,225,0.10)",   initial: "M" },
      "LinkedIn":    { fg: "#0A66C2", bg: darkMode ? "rgba(10,102,194,0.20)" : "rgba(10,102,194,0.10)", initial: "L" },
      "TikTok":      { fg: darkMode ? "#fff" : "#000", bg: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", initial: "T" },
    };
    const p = map[platform] || map["Google Ads"];
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "4px 10px 4px 4px", borderRadius: T.radFull,
        background: p.bg, color: p.fg,
        fontSize: 11.5, fontWeight: 600,
      }}>
        <span style={{
          width: 20, height: 20, borderRadius: "50%",
          background: p.fg, color: "#fff",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontSize: T.fontXs, fontWeight: 800,
        }}>{p.initial}</span>
        {platform}
      </span>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // 🎯 ADS SUB-MODULE
  // Campaign management surface with stats, filters, and a row-rich
  // campaign list. Each row shows platform, budget, performance, status.
  // ═══════════════════════════════════════════════════════════════
  function AdsSubmodule() {
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterPlatform, setFilterPlatform] = useState("All");
    const campaigns = [
      { id: "C-1024", name: "September Intake — UK MBA push",      platform: "Google Ads", budget: 4500, spent: 3120, ctr: 4.8, cpc: 1.42, conversions: 218, status: "Active",    startDate: "Aug 15", endDate: "Sep 30" },
      { id: "C-1023", name: "EU Postgraduate Awareness",            platform: "Meta Ads",   budget: 3200, spent: 2890, ctr: 3.2, cpc: 0.94, conversions: 146, status: "Active",    startDate: "Aug 01", endDate: "Sep 15" },
      { id: "C-1022", name: "Nigerian Branch — Bachelor's Programs", platform: "Meta Ads",   budget: 2800, spent: 2800, ctr: 5.1, cpc: 0.61, conversions: 312, status: "Completed", startDate: "Jul 10", endDate: "Aug 10" },
      { id: "C-1021", name: "LinkedIn Sponsored — MBA / EMBA",       platform: "LinkedIn",   budget: 5000, spent: 1850, ctr: 2.1, cpc: 6.80, conversions:  47, status: "Active",    startDate: "Aug 20", endDate: "Oct 20" },
      { id: "C-1020", name: "Gen Z Foundation Year retargeting",     platform: "TikTok",     budget: 1800, spent:  920, ctr: 6.4, cpc: 0.38, conversions: 184, status: "Paused",    startDate: "Aug 05", endDate: "Sep 05" },
      { id: "C-1019", name: "Romania — STEM Pathway",                platform: "Google Ads", budget: 2200, spent: 1640, ctr: 3.9, cpc: 1.21, conversions: 102, status: "Active",    startDate: "Aug 22", endDate: "Oct 22" },
    ];
    const filtered = campaigns.filter(c =>
      (filterStatus === "All" || c.status === filterStatus) &&
      (filterPlatform === "All" || c.platform === filterPlatform)
    );
    const totalBudget = campaigns.reduce((s, c) => s + c.budget, 0);
    const totalSpent  = campaigns.reduce((s, c) => s + c.spent, 0);
    const totalConv   = campaigns.reduce((s, c) => s + c.conversions, 0);
    const avgCtr      = (campaigns.reduce((s, c) => s + c.ctr, 0) / campaigns.length).toFixed(1);

    return (
      <div style={{ padding: "26px 36px 60px" }}>
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
          <StatTile Icon={Wallet}     label="Total Budget"      value={`£${totalBudget.toLocaleString()}`} delta="+12%" accent={C.primary} />
          <StatTile Icon={TrendingUp} label="Spent This Month"  value={`£${totalSpent.toLocaleString()}`}  delta="+8%"  accent={C.secondary} />
          <StatTile Icon={Target}     label="Total Conversions" value={totalConv.toLocaleString()}          delta="+24%" accent="#10B981" />
          <StatTile Icon={Activity}   label="Avg CTR"           value={`${avgCtr}%`}                        delta="+0.4%" accent="#3B82F6" />
        </div>

        {/* Filter bar */}
        <div style={{
          background: C.surface, borderRadius: T.radLg,
          border: `1px solid ${C.border}`,
          padding: "14px 18px", marginBottom: 16,
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.textMid, letterSpacing: "0.04em", textTransform: "uppercase" }}>Filter</span>
            <div style={{
              display: "inline-flex", padding: 3,
              background: darkMode ? "rgba(255,255,255,0.04)" : "#F1F4F6",
              borderRadius: 8, border: `1px solid ${C.border}`,
            }}>
              {["All","Active","Paused","Completed"].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)} className="smooth" style={{
                  padding: "6px 14px",
                  background: filterStatus === s ? C.surface : "transparent",
                  color: filterStatus === s ? C.primary : C.textMid,
                  fontSize: 11.5, fontWeight: filterStatus === s ? 700 : 500,
                  border: "none", borderRadius: 6, cursor: "pointer",
                  boxShadow: filterStatus === s ? (darkMode ? "0 1px 3px rgba(0,0,0,0.35)" : "0 1px 3px rgba(0,0,0,0.08)") : "none",
                }}>{s}</button>
              ))}
            </div>
            <select
              value={filterPlatform}
              onChange={e => setFilterPlatform(e.target.value)}
              style={{
                padding: "7px 30px 7px 12px",
                background: C.surface, color: C.text,
                border: `1px solid ${C.border}`, borderRadius: 7,
                fontSize: 12, fontWeight: 600,
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(C.textSoft)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                cursor: "pointer",
              }}
            >
              <option>All</option>
              <option>Google Ads</option>
              <option>Meta Ads</option>
              <option>LinkedIn</option>
              <option>TikTok</option>
            </select>
          </div>
          <div style={{ fontSize: 12, color: C.textSoft }}>
            <strong style={{ color: C.text }}>{filtered.length}</strong> of {campaigns.length} campaigns
          </div>
        </div>

        {/* Campaigns list — card rows for visual density */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(c => {
            const spentPct = Math.min(100, Math.round((c.spent / c.budget) * 100));
            const roi = c.spent > 0 ? Math.round((c.conversions * 25 / c.spent) * 100) : 0; // mock ROI
            return (
              <div key={c.id} style={{
                background: C.surface, borderRadius: T.radLg,
                border: `1px solid ${C.border}`,
                padding: "16px 18px",
                boxShadow: darkMode ? "0 1px 3px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.03)",
                display: "grid",
                gridTemplateColumns: "minmax(220px, 1.4fr) 1fr 1fr 1fr 1fr auto",
                alignItems: "center", gap: 18,
              }}>
                {/* Name + platform */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, color: C.textSoft, fontWeight: 600 }}>{c.id}</span>
                    <StatusPill status={c.status} />
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text, letterSpacing: "-0.005em" }}>{c.name}</div>
                  <PlatformBadge platform={c.platform} />
                </div>
                {/* Budget with progress bar */}
                <div>
                  <div style={{ fontSize: T.fontXs, color: C.textSoft, fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>Budget</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>£{c.spent.toLocaleString()} / £{c.budget.toLocaleString()}</div>
                  <div style={{ marginTop: 6, height: 4, borderRadius: T.radFull, background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", overflow: "hidden" }}>
                    <div style={{ width: `${spentPct}%`, height: "100%", background: spentPct > 90 ? C.danger : spentPct > 70 ? C.warn : C.success, borderRadius: 999 }} />
                  </div>
                </div>
                {/* CTR */}
                <div>
                  <div style={{ fontSize: T.fontXs, color: C.textSoft, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>CTR</div>
                  <div style={{ fontSize: T.fontMd, fontWeight: 700, color: C.text, marginTop: 2 }}>{c.ctr}%</div>
                </div>
                {/* CPC */}
                <div>
                  <div style={{ fontSize: T.fontXs, color: C.textSoft, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>CPC</div>
                  <div style={{ fontSize: T.fontMd, fontWeight: 700, color: C.text, marginTop: 2 }}>£{c.cpc.toFixed(2)}</div>
                </div>
                {/* Conversions + ROI */}
                <div>
                  <div style={{ fontSize: T.fontXs, color: C.textSoft, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Conversions</div>
                  <div style={{ fontSize: T.fontMd, fontWeight: 700, color: C.text, marginTop: 2, display: "flex", alignItems: "baseline", gap: 6 }}>
                    {c.conversions}
                    <span style={{ fontSize: T.fontXs, color: roi > 100 ? C.success : C.warn, fontWeight: 700 }}>ROI {roi}%</span>
                  </div>
                </div>
                {/* Actions */}
                <div style={{ display: "flex", gap: 4 }}>
                  <Tooltip label="View" position="top">
                    <button className="smooth" style={{ width: 30, height: 30, borderRadius: 7, background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Eye size={13} /></button>
                  </Tooltip>
                  <Tooltip label="Edit" position="top">
                    <button className="smooth" style={{ width: 30, height: 30, borderRadius: 7, background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Edit2 size={13} /></button>
                  </Tooltip>
                  <Tooltip label={c.status === "Paused" ? "Resume" : "Pause"} position="top">
                    <button className="smooth" style={{ width: 30, height: 30, borderRadius: 7, background: "transparent", border: `1px solid ${C.border}`, color: c.status === "Paused" ? C.success : C.warn, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {c.status === "Paused" ? <Activity size={13} /> : <Ban size={13} />}
                    </button>
                  </Tooltip>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ padding: "60px 20px", textAlign: "center", background: C.surface, borderRadius: T.radLg, border: `1px solid ${C.border}` }}>
              <Megaphone size={32} color={C.textVerySoft} style={{ marginBottom: 10 }} />
              <div style={{ fontSize: 13, color: C.textSoft }}>No campaigns match the current filter.</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // 📋 FORMS SUB-MODULE
  // Lead capture form builder. Each card represents a form; clicking
  // through reveals the field overview and a "View Embed Code" CTA.
  // ═══════════════════════════════════════════════════════════════
  function FormsSubmodule() {
    const forms = [
      { id: "F-101", name: "Website Contact Form",     type: "Contact",     fields: ["First Name","Last Name","Email","Phone","Message"],         submissions: 1428, conversionRate: 18.4, updated: "2 days ago", status: "Active" },
      { id: "F-102", name: "Bachelor's Programme Inquiry", type: "Application", fields: ["Full Name","Email","Phone","Country","Programme","Start Date"], submissions: 892, conversionRate: 24.1, updated: "5 days ago", status: "Active" },
      { id: "F-103", name: "MBA Pre-application",      type: "Application", fields: ["Full Name","Email","WhatsApp","LinkedIn","Years of Experience","Current Role"], submissions: 312, conversionRate: 31.2, updated: "1 week ago", status: "Active" },
      { id: "F-104", name: "Newsletter Signup",        type: "Inquiry",     fields: ["Email","Preferred Intake"], submissions: 2104, conversionRate: 8.7, updated: "today", status: "Active" },
      { id: "F-105", name: "September Webinar RSVP",   type: "Event",       fields: ["Name","Email","Country","How did you hear about us"], submissions: 456, conversionRate: 41.3, updated: "yesterday", status: "Draft" },
      { id: "F-106", name: "Scholarship Application 2026", type: "Application", fields: ["Full Name","Email","Document Upload","Personal Statement","Referee Email"], submissions: 0, conversionRate: 0, updated: "1 month ago", status: "Draft" },
    ];
    const totalSubmissions = forms.reduce((s, f) => s + f.submissions, 0);
    const avgConversion = (forms.filter(f => f.submissions > 0).reduce((s, f) => s + f.conversionRate, 0) / Math.max(1, forms.filter(f => f.submissions > 0).length)).toFixed(1);
    const activeCount = forms.filter(f => f.status === "Active").length;

    return (
      <div style={{ padding: "26px 36px 60px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
          <StatTile Icon={ClipboardCheck} label="Active Forms"     value={activeCount}                       accent={C.primary} />
          <StatTile Icon={Inbox}          label="Total Submissions" value={totalSubmissions.toLocaleString()} delta="+18%" accent={C.secondary} />
          <StatTile Icon={TrendingUp}     label="Avg Conversion"    value={`${avgConversion}%`}              delta="+2.1%" accent="#10B981" />
          <StatTile Icon={Zap}            label="Auto-routed Leads" value="847"                             delta="+34%" accent="#3B82F6" />
        </div>

        {/* Form cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: 14,
        }}>
          {forms.map(f => (
            <div key={f.id} style={{
              background: C.surface, borderRadius: T.radLg,
              border: `1px solid ${C.border}`,
              padding: "20px 22px 18px",
              boxShadow: darkMode ? "0 1px 3px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.04)",
              display: "flex", flexDirection: "column", gap: 14,
            }}>
              {/* Header: type tag + status */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 9,
                    background: darkMode ? "rgba(252,115,0,0.16)" : "rgba(252,115,0,0.10)",
                    color: C.secondary,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <FileText size={15} />
                  </div>
                  <div>
                    <div style={{ fontSize: T.fontXs, color: C.textSoft, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>{f.type}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.text, lineHeight: 1.25 }}>{f.name}</div>
                  </div>
                </div>
                <StatusPill status={f.status} />
              </div>

              {/* Field count chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {f.fields.slice(0, 4).map(field => (
                  <span key={field} style={{
                    padding: "3px 9px", borderRadius: 6,
                    background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    color: C.textMid, fontSize: T.fontXs, fontWeight: 500,
                  }}>{field}</span>
                ))}
                {f.fields.length > 4 && (
                  <span style={{
                    padding: "3px 9px", borderRadius: 6,
                    background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    color: C.textSoft, fontSize: T.fontXs, fontWeight: 700,
                  }}>+{f.fields.length - 4}</span>
                )}
              </div>

              {/* Metrics row */}
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14,
                paddingTop: 14, borderTop: `1px solid ${C.divider}`,
              }}>
                <div>
                  <div style={{ fontSize: T.fontXs, color: C.textSoft, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 3 }}>Submissions</div>
                  <div style={{ fontSize: T.fontLg, fontWeight: 700, color: C.text, letterSpacing: "-0.01em" }}>{f.submissions.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: T.fontXs, color: C.textSoft, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 3 }}>Conversion</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: f.conversionRate > 20 ? C.success : C.text, letterSpacing: "-0.01em" }}>
                    {f.conversionRate.toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Footer actions */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4 }}>
                <span style={{ fontSize: T.fontXs, color: C.textSoft }}>Updated {f.updated}</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    onClick={() => setMarketingDialog({ kind: "preview", data: f })}
                    className="smooth"
                    style={{
                      padding: "6px 10px",
                      background: "transparent", border: `1px solid ${C.border}`,
                      borderRadius: 6, color: C.textMid,
                      fontSize: 11, fontWeight: 600, cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 4,
                    }}><Eye size={11} /> Preview</button>
                  <button
                    onClick={() => setMarketingDialog({ kind: "embed", data: f })}
                    className="smooth"
                    style={{
                      padding: "6px 10px",
                      background: C.primary10, border: `1px solid ${darkMode ? "rgba(63,181,183,0.30)" : "rgba(4,93,94,0.15)"}`,
                      borderRadius: 6, color: C.primary,
                      fontSize: 11, fontWeight: 700, cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 4,
                    }}><LinkIcon size={11} /> Embed</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // 📅 EVENTS SUB-MODULE
  // Webinar/workshop/seminar manager with banner cards, attendee
  // tracking, and status. Includes a published-event slider preview.
  // ═══════════════════════════════════════════════════════════════
  function EventsSubmodule() {
    const events = marketingEvents;
    const liveEvent = events.find(e => e.status === "Live");
    const upcoming = events.filter(e => e.status === "Published");
    const totalRSVPs = events.reduce((s, e) => s + e.rsvps, 0);

    return (
      <div style={{ padding: "26px 36px 60px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
          <StatTile Icon={CalendarDays} label="Total Events"   value={events.length}                  accent={C.primary} />
          <StatTile Icon={CircleDot}    label="Live Now"       value={events.filter(e => e.status === "Live").length} accent={C.danger} />
          <StatTile Icon={Users}        label="Total RSVPs"    value={totalRSVPs.toLocaleString()}    delta="+45%" accent="#10B981" />
          <StatTile Icon={Eye}          label="Avg Attendance" value="68%"                            delta="+5%"  accent={C.secondary} />
        </div>

        {/* Live event hero card (only if there is one live) */}
        {liveEvent && (
          <div style={{
            position: "relative",
            background: `linear-gradient(135deg, ${liveEvent.bannerGradient[0]} 0%, ${liveEvent.bannerGradient[1]} 100%)`,
            borderRadius: T.radLg, padding: "26px 28px",
            marginBottom: 22, overflow: "hidden",
            color: "#fff",
            boxShadow: "0 8px 32px rgba(252,115,0,0.25)",
          }}>
            {/* Decorative shapes */}
            <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.10)" }} />
            <div style={{ position: "absolute", bottom: -60, right: 80, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, position: "relative", zIndex: 1, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "3px 9px", borderRadius: T.radFull,
                    background: "rgba(255,255,255,0.20)", color: "#fff",
                    fontSize: T.fontXs, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
                  }}>
                    <CircleDot size={9} fill="#fff" /> Live Now
                  </span>
                  <span style={{ fontSize: 12, opacity: 0.85, fontWeight: 600 }}>{liveEvent.kind}</span>
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.015em", marginBottom: 6 }}>{liveEvent.name}</h2>
                <div style={{ fontSize: 13, opacity: 0.92, marginBottom: 14 }}>{liveEvent.date}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                  <div>
                    <div style={{ fontSize: T.fontXs, opacity: 0.7, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Attendees</div>
                    <div style={{ fontSize: 22, fontWeight: 800 }}>{liveEvent.attendees} <span style={{ fontSize: 13, opacity: 0.7, fontWeight: 600 }}>/ {liveEvent.capacity}</span></div>
                  </div>
                  <div>
                    <div style={{ fontSize: T.fontXs, opacity: 0.7, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>RSVPs</div>
                    <div style={{ fontSize: 22, fontWeight: 800 }}>{liveEvent.rsvps}</div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button className="smooth" style={{
                  padding: "11px 22px",
                  background: "#fff", color: liveEvent.bannerGradient[0],
                  border: "none", borderRadius: 9,
                  fontSize: 13, fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}><Video size={14} /> Join Broadcast</button>
                <button className="smooth" style={{
                  padding: "9px 18px",
                  background: "rgba(255,255,255,0.12)", color: "#fff",
                  border: "1px solid rgba(255,255,255,0.30)", borderRadius: 9,
                  fontSize: 12, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                }}><Users size={12} /> Manage Attendees</button>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming events — slider preview */}
        {upcoming.length > 0 && (
          <div style={{ marginBottom: 22 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <h3 style={{ fontSize: T.fontMd, fontWeight: 700, color: C.text, letterSpacing: "-0.01em" }}>Upcoming events</h3>
              <button className="smooth" style={{
                padding: "5px 12px", background: "transparent",
                border: "none", color: C.primary,
                fontSize: 12, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 4,
              }}>View calendar <ChevronRight size={12} /></button>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 14,
            }}>
              {upcoming.map(e => (
                <div key={e.id} style={{
                  background: C.surface, borderRadius: T.radLg,
                  border: `1px solid ${C.border}`,
                  overflow: "hidden",
                  boxShadow: darkMode ? "0 1px 3px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.04)",
                }}>
                  {/* Banner */}
                  <div style={{
                    height: 90, position: "relative",
                    background: `linear-gradient(135deg, ${e.bannerGradient[0]} 0%, ${e.bannerGradient[1]} 100%)`,
                  }}>
                    <div style={{ position: "absolute", top: 10, left: 12 }}>
                      <StatusPill status={e.status} />
                    </div>
                    <div style={{ position: "absolute", bottom: 10, right: 12, color: "#fff", fontSize: 11, fontWeight: 700, opacity: 0.9, letterSpacing: "0.05em", textTransform: "uppercase" }}>{e.kind}</div>
                  </div>
                  {/* Body */}
                  <div style={{ padding: "14px 16px 16px" }}>
                    <h4 style={{ fontSize: 13.5, fontWeight: 700, color: C.text, lineHeight: 1.3, marginBottom: 6 }}>{e.name}</h4>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
                      <CalendarDays size={11} color={C.textSoft} />
                      <span style={{ fontSize: 11.5, color: C.textSoft, fontWeight: 500 }}>{e.date}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ fontSize: 11, color: C.textMid }}>
                        <strong style={{ color: C.text, fontWeight: 700 }}>{e.rsvps}</strong> RSVPs
                        <span style={{ margin: "0 5px", color: C.textVerySoft }}>•</span>
                        <span>{e.capacity} cap.</span>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: e.rsvps / e.capacity > 0.7 ? C.warn : C.textSoft }}>
                        {Math.round((e.rsvps / e.capacity) * 100)}%
                      </span>
                    </div>
                    <div style={{ height: 4, borderRadius: T.radFull, background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", overflow: "hidden", marginBottom: 12 }}>
                      <div style={{ width: `${(e.rsvps / e.capacity) * 100}%`, height: "100%", background: e.bannerGradient[0], borderRadius: 999 }} />
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="smooth" style={{ flex: 1, padding: "7px 0", background: C.primary, border: "none", color: "#fff", borderRadius: 7, fontSize: 11.5, fontWeight: 700, cursor: "pointer" }}>Manage</button>
                      <button className="smooth" style={{ width: 32, height: 30, background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, borderRadius: 7, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><LinkIcon size={11} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past + draft events table */}
        <div>
          <h3 style={{ fontSize: T.fontMd, fontWeight: 700, color: C.text, marginBottom: 12, letterSpacing: "-0.01em" }}>All events</h3>
          <div style={{ background: C.surface, borderRadius: T.radLg, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: darkMode ? "rgba(63,181,183,0.08)" : "#F1F4F6" }}>
                  {["Event","Kind","Date","RSVPs","Status","Action"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, color: C.textMid, textAlign: "left", letterSpacing: "0.04em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {events.map((e, i) => (
                  <tr key={e.id} style={{ borderTop: i === 0 ? "none" : `1px solid ${C.divider}` }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 6, height: 32, borderRadius: 3, background: `linear-gradient(180deg, ${e.bannerGradient[0]}, ${e.bannerGradient[1]})`, flexShrink: 0 }} />
                        <div>
                          <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text }}>{e.name}</div>
                          <div style={{ fontSize: T.fontXs, color: C.textSoft }}>{e.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 12, color: C.textMid }}>{e.kind}</td>
                    <td style={{ padding: "12px 16px", fontSize: 12, color: C.textMid }}>{e.date}</td>
                    <td style={{ padding: "12px 16px", fontSize: 12, color: C.text, fontWeight: 600 }}>{e.rsvps} / {e.capacity}</td>
                    <td style={{ padding: "12px 16px" }}><StatusPill status={e.status} /></td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 4 }}>
                        <Tooltip label="View" position="top"><button className="smooth" style={{ width: 28, height: 28, background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Eye size={12} /></button></Tooltip>
                        <Tooltip label="Edit" position="top"><button className="smooth" style={{ width: 28, height: 28, background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Edit2 size={12} /></button></Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // ─── Modal/dialog for forms (preview + embed code) ───────────────
  // ─── EventsPromoCard — surfaces promoted marketing events in the
  // Comms Hub right rail. When the user creates an event with promoted=true,
  // this card appears alongside the commission/university/course promos.
  function EventsPromoCard({ events }) {
    const ACCENT = "#DB2777"; // rose accent for events
    const PALETTE = {
      bg:       darkMode ? "rgba(219,39,119,0.10)" : "#FDF1F5",
      bgHover:  darkMode ? "rgba(219,39,119,0.18)" : "#FAE3EC",
      border:   darkMode ? "rgba(219,39,119,0.30)" : "#F5D2DE",
      accent:   ACCENT,
      accent10: "rgba(219,39,119,0.10)",
      accent30: "rgba(219,39,119,0.28)",
    };
    return (
      <div style={{
        background: PALETTE.bg, borderRadius: T.radLg,
        border: `1px solid ${PALETTE.border}`,
        padding: "14px 14px 12px",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 7,
            background: PALETTE.accent, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}><CalendarDays size={13} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: C.textSoft, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>Marketing Events</div>
            <div style={{ fontSize: 13, color: C.text, fontWeight: 700, letterSpacing: "-0.01em" }}>Upcoming sessions</div>
          </div>
          <span style={{
            padding: "2px 7px", borderRadius: T.radFull,
            background: PALETTE.accent30, color: PALETTE.accent,
            fontSize: T.fontXs, fontWeight: 700,
          }}>{events.length}</span>
        </div>

        {/* Event mini-cards (max 2) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {events.slice(0, 2).map(e => (
            <div key={e.id} style={{
              background: C.surface, borderRadius: 9,
              border: `1px solid ${darkMode ? C.border : "rgba(245,210,222,0.6)"}`,
              overflow: "hidden",
            }}>
              {/* Mini banner */}
              <div style={{
                height: 36,
                background: `linear-gradient(135deg, ${e.bannerGradient[0]}, ${e.bannerGradient[1]})`,
                position: "relative",
              }}>
                <div style={{
                  position: "absolute", top: 6, right: 8,
                  padding: "2px 7px", borderRadius: T.radFull,
                  background: "rgba(255,255,255,0.22)", color: "#fff",
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
                  display: "inline-flex", alignItems: "center", gap: 4,
                }}>
                  {e.status === "Live" && <CircleDot size={7} fill="#fff" />}
                  {e.status}
                </div>
                <div style={{
                  position: "absolute", bottom: 5, left: 9,
                  color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
                  opacity: 0.95,
                }}>{e.kind}</div>
              </div>
              {/* Body */}
              <div style={{ padding: "9px 11px 11px" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.text, lineHeight: 1.3, marginBottom: 5, letterSpacing: "-0.005em" }}>{e.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 7 }}>
                  <Clock size={10} color={C.textSoft} />
                  <span style={{ fontSize: T.fontXs, color: C.textSoft, fontWeight: 500 }}>{e.date}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: T.fontXs, color: C.textMid }}>
                    <strong style={{ color: C.text, fontWeight: 700 }}>{e.rsvps}</strong> RSVPs
                  </span>
                  <button
                    onClick={() => { setCurrentApp("leads"); setLeadsPage("marketing"); setMarketingTab("events"); }}
                    className="smooth" style={{
                      padding: "4px 9px", background: PALETTE.accent,
                      color: "#fff", border: "none", borderRadius: 6,
                      fontSize: T.fontXs, fontWeight: 700, cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 3,
                    }}
                  >View <ChevronRight size={9} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See all link */}
        {events.length > 2 && (
          <button
            onClick={() => { setCurrentApp("leads"); setLeadsPage("marketing"); setMarketingTab("events"); }}
            className="smooth" style={{
              marginTop: 10, width: "100%", padding: "7px 0",
              background: "transparent", border: `1px solid ${PALETTE.border}`,
              borderRadius: 7, color: PALETTE.accent,
              fontSize: 11, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
            }}
          >View all {events.length} events <ChevronRight size={10} /></button>
        )}
      </div>
    );
  }

  // ─── EventCreateModal — full create/edit form for events
  // Triggered by "New Event" CTA in the marketing hero. On Save, prepends
  // the new event to marketingEvents and (if promoted=true) makes it visible
  // in the Comms Hub right rail.
  function EventCreateModal() {
    if (!eventDraft) return null;
    const draft = eventDraft;
    const isEditing = !!draft.id;

    // Color palette presets for the banner gradient. Each preset is a pair of
    // hex codes that interpolate to create the banner background.
    const gradientPresets = [
      { name: "Orange",  colors: ["#FC7300","#FF9233"] },
      { name: "Teal",    colors: ["#045D5E","#0AAEB0"] },
      { name: "Purple",  colors: ["#7C3AED","#A855F7"] },
      { name: "Sky",     colors: ["#0EA5E9","#38BDF8"] },
      { name: "Emerald", colors: ["#10B981","#34D399"] },
      { name: "Rose",    colors: ["#DB2777","#F472B6"] },
      { name: "Indigo",  colors: ["#4F46E5","#818CF8"] },
      { name: "Amber",   colors: ["#F59E0B","#FCD34D"] },
    ];

    const update = (patch) => setEventDraft({ ...draft, ...patch });
    const canSave = draft.name.trim().length > 2 && draft.date && draft.capacity > 0;

    const save = () => {
      if (!canSave) return;
      // Format the date — combine date + optional time into a display string.
      const d = new Date(draft.date + (draft.time ? `T${draft.time}` : "T00:00"));
      const isValid = !isNaN(d.getTime());
      let displayDate = draft.date;
      if (isValid) {
        const today = new Date(); today.setHours(0,0,0,0);
        const eventDay = new Date(d); eventDay.setHours(0,0,0,0);
        const isToday = eventDay.getTime() === today.getTime();
        if (isToday && draft.time) {
          const [h, m] = draft.time.split(":");
          const hh = parseInt(h);
          const period = hh >= 12 ? "PM" : "AM";
          const dispH = hh % 12 || 12;
          displayDate = `Today, ${dispH}:${m} ${period}`;
        } else {
          displayDate = d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
          if (draft.time) {
            const [h, m] = draft.time.split(":");
            const hh = parseInt(h);
            const period = hh >= 12 ? "PM" : "AM";
            const dispH = hh % 12 || 12;
            displayDate += ` · ${dispH}:${m} ${period}`;
          }
        }
      }
      const newEvent = {
        id: draft.id || `E-${Date.now().toString().slice(-4)}`,
        name: draft.name.trim(),
        kind: draft.kind,
        status: draft.status,
        date: displayDate,
        attendees: draft.status === "Live" ? draft.attendees || 0 : 0,
        capacity: parseInt(draft.capacity) || 100,
        rsvps: draft.rsvps || 0,
        bannerGradient: draft.bannerGradient,
        description: draft.description.trim(),
        promoted: !!draft.promoted,
        createdAt: draft.createdAt || Date.now(),
      };
      setMarketingEvents(prev => isEditing
        ? prev.map(e => e.id === newEvent.id ? newEvent : e)
        : [newEvent, ...prev]
      );
      setEventDraft(null);
      setEventCreatedToast(newEvent);
    };

    return (
      <div
        onClick={() => setEventDraft(null)}
        style={{
          position: "fixed", inset: 0, zIndex: 2100,
          background: "rgba(0,0,0,0.55)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24,
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: C.surface, borderRadius: T.radXl,
            maxWidth: 720, width: "100%",
            maxHeight: "90vh", overflowY: "auto",
            boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
          }}
        >
          {/* ── Header with live banner preview ── */}
          <div style={{
            position: "relative", height: 120,
            background: `linear-gradient(135deg, ${draft.bannerGradient[0]} 0%, ${draft.bannerGradient[1]} 100%)`,
            borderTopLeftRadius: 16, borderTopRightRadius: 16,
            overflow: "hidden",
          }}>
            {/* Decorative circles */}
            <div style={{ position: "absolute", top: -30, right: -20, width: 130, height: 130, borderRadius: "50%", background: "rgba(255,255,255,0.10)" }} />
            <div style={{ position: "absolute", bottom: -40, right: 80, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
            <button
              onClick={() => setEventDraft(null)}
              style={{
                position: "absolute", top: 14, right: 14,
                width: 32, height: 32, borderRadius: 8,
                background: "rgba(255,255,255,0.20)", color: "#fff",
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            ><X size={16} /></button>
            <div style={{ position: "absolute", bottom: 16, left: 24, color: "#fff" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: T.radFull, background: "rgba(255,255,255,0.22)", fontSize: T.fontXs, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8 }}>
                <CalendarDays size={11} /> {isEditing ? "Edit event" : "New event"}
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>
                {draft.name || "Untitled event"}
              </h2>
            </div>
          </div>

          {/* ── Form body ── */}
          <div style={{ padding: "22px 26px" }}>
            {/* Banner gradient picker */}
            <div style={{ marginBottom: 22 }}>
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: C.textMid, marginBottom: 8, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                Banner color
              </label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {gradientPresets.map(p => {
                  const isSelected = draft.bannerGradient[0] === p.colors[0];
                  return (
                    <button
                      key={p.name}
                      onClick={() => update({ bannerGradient: p.colors })}
                      className="smooth"
                      title={p.name}
                      style={{
                        width: 40, height: 40, borderRadius: T.radMd,
                        background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})`,
                        border: isSelected ? `3px solid ${C.text}` : `2px solid ${C.border}`,
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      {isSelected && (
                        <Check size={14} color="#fff" strokeWidth={3} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
                      )}
                    </button>
                  );
                })}
              </div>
              <div style={{ marginTop: 8, fontSize: 11, color: C.textSoft, display: "flex", alignItems: "center", gap: 5 }}>
                <ImageIcon size={11} />
                Or upload a banner photo (max 4MB, JPG/PNG)
              </div>
            </div>

            {/* Event name */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: C.textMid, marginBottom: 7, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                Event name <span style={{ color: C.danger, marginLeft: 3 }}>*</span>
              </label>
              <input
                type="text"
                value={draft.name}
                onChange={e => update({ name: e.target.value })}
                placeholder="e.g. October Open Day — London Campus"
                autoFocus
                style={{
                  width: "100%", padding: "11px 14px",
                  background: darkMode ? "rgba(255,255,255,0.03)" : "#FAFBFC",
                  border: `1px solid ${C.border}`, borderRadius: 8,
                  fontSize: 14, color: C.text, outline: "none",
                  fontFamily: "'Roboto', sans-serif",
                }}
              />
            </div>

            {/* Two-column: kind + capacity */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: C.textMid, marginBottom: 7, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                  Event kind <span style={{ color: C.danger, marginLeft: 3 }}>*</span>
                </label>
                <select
                  value={draft.kind}
                  onChange={e => update({ kind: e.target.value })}
                  style={{
                    width: "100%", padding: "11px 38px 11px 14px",
                    background: darkMode ? "rgba(255,255,255,0.03)" : "#FAFBFC",
                    border: `1px solid ${C.border}`, borderRadius: 8,
                    fontSize: 13.5, color: C.text, outline: "none",
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(C.textSoft)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 14px center",
                  }}
                >
                  {["Webinar","Workshop","Seminar","Q&A","Open Day","Networking"].map(k => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: C.textMid, marginBottom: 7, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                  Capacity <span style={{ color: C.danger, marginLeft: 3 }}>*</span>
                </label>
                <input
                  type="number"
                  min="1" max="10000"
                  value={draft.capacity}
                  onChange={e => update({ capacity: parseInt(e.target.value) || 0 })}
                  style={{
                    width: "100%", padding: "11px 14px",
                    background: darkMode ? "rgba(255,255,255,0.03)" : "#FAFBFC",
                    border: `1px solid ${C.border}`, borderRadius: 8,
                    fontSize: 13.5, color: C.text, outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Two-column: date + time */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: C.textMid, marginBottom: 7, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                  Date <span style={{ color: C.danger, marginLeft: 3 }}>*</span>
                </label>
                <input
                  type="date"
                  value={draft.date}
                  onChange={e => update({ date: e.target.value })}
                  style={{
                    width: "100%", padding: "11px 14px",
                    background: darkMode ? "rgba(255,255,255,0.03)" : "#FAFBFC",
                    border: `1px solid ${C.border}`, borderRadius: 8,
                    fontSize: 13.5, color: C.text, outline: "none",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: C.textMid, marginBottom: 7, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                  Time
                </label>
                <input
                  type="time"
                  value={draft.time}
                  onChange={e => update({ time: e.target.value })}
                  style={{
                    width: "100%", padding: "11px 14px",
                    background: darkMode ? "rgba(255,255,255,0.03)" : "#FAFBFC",
                    border: `1px solid ${C.border}`, borderRadius: 8,
                    fontSize: 13.5, color: C.text, outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: C.textMid, marginBottom: 7, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                Description
              </label>
              <textarea
                value={draft.description}
                onChange={e => update({ description: e.target.value })}
                placeholder="Tell attendees what to expect, who's speaking, and what they'll learn."
                rows={3}
                style={{
                  width: "100%", padding: "11px 14px",
                  background: darkMode ? "rgba(255,255,255,0.03)" : "#FAFBFC",
                  border: `1px solid ${C.border}`, borderRadius: 8,
                  fontSize: 13, color: C.text, outline: "none",
                  fontFamily: "'Roboto', sans-serif",
                  resize: "vertical",
                  lineHeight: 1.5,
                }}
              />
            </div>

            {/* Status: segmented control */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: C.textMid, marginBottom: 7, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                Status
              </label>
              <div style={{
                display: "inline-flex", padding: 3,
                background: darkMode ? "rgba(255,255,255,0.04)" : "#F1F4F6",
                borderRadius: 9, border: `1px solid ${C.border}`,
              }}>
                {["Draft","Published","Live"].map(s => {
                  const active = draft.status === s;
                  return (
                    <button
                      key={s}
                      onClick={() => update({ status: s })}
                      className="smooth"
                      style={{
                        padding: "7px 16px",
                        background: active ? C.surface : "transparent",
                        color: active ? C.primary : C.textMid,
                        fontSize: 12.5, fontWeight: active ? 700 : 500,
                        border: "none", borderRadius: 7,
                        cursor: "pointer",
                        boxShadow: active ? (darkMode ? "0 1px 3px rgba(0,0,0,0.35)" : "0 1px 3px rgba(0,0,0,0.08)") : "none",
                      }}
                    >{s}</button>
                  );
                })}
              </div>
              <p style={{ fontSize: 11, color: C.textSoft, marginTop: 6, lineHeight: 1.5 }}>
                <strong style={{ color: C.text }}>Draft</strong> — not visible publicly.{" "}
                <strong style={{ color: C.text }}>Published</strong> — open for RSVPs.{" "}
                <strong style={{ color: C.text }}>Live</strong> — currently broadcasting.
              </p>
            </div>

            {/* Promote to feed toggle — the killer link to Comms Hub */}
            <div style={{
              padding: "14px 16px", borderRadius: T.radMd,
              background: darkMode ? "rgba(252,115,0,0.10)" : "#FFF5EB",
              border: `1px solid ${darkMode ? "rgba(252,115,0,0.30)" : "#FDDCB5"}`,
              marginBottom: 22,
            }}>
              <label style={{
                display: "flex", alignItems: "flex-start", gap: 11, cursor: "pointer",
              }}>
                <input
                  type="checkbox"
                  checked={draft.promoted}
                  onChange={e => update({ promoted: e.target.checked })}
                  style={{ width: 16, height: 16, accentColor: C.secondary, marginTop: 1, cursor: "pointer", flexShrink: 0 }}
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 2 }}>
                    Promote to news feed
                  </div>
                  <div style={{ fontSize: 11.5, color: C.textSoft, lineHeight: 1.5 }}>
                    Show this event in the Communication Hub's promotional rail so teammates see it alongside campaigns, universities, and courses.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* ── Sticky footer ── */}
          <div style={{
            padding: "14px 26px",
            borderTop: `1px solid ${C.border}`,
            background: C.surface,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            borderBottomLeftRadius: 16, borderBottomRightRadius: 16,
          }}>
            <span style={{ fontSize: 11.5, color: C.textSoft }}>
              {draft.promoted
                ? <><Megaphone size={11} style={{ verticalAlign: "middle" }} color={C.secondary} /> Will appear in News Feed promotions</>
                : "Saved to Events only"}
            </span>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setEventDraft(null)}
                className="smooth"
                style={{
                  padding: "9px 18px",
                  background: "transparent",
                  color: C.textMid,
                  border: `1px solid ${C.border}`,
                  borderRadius: 8, fontSize: 13, fontWeight: 600,
                  cursor: "pointer",
                }}
              >Cancel</button>
              <button
                onClick={save}
                disabled={!canSave}
                className="smooth"
                style={{
                  padding: "9px 22px",
                  background: canSave ? C.primary : (darkMode ? "rgba(255,255,255,0.08)" : "#E5E7EB"),
                  color: canSave ? "#fff" : C.textVerySoft,
                  border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700,
                  cursor: canSave ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              ><Check size={13} strokeWidth={2.5} /> {isEditing ? "Save changes" : "Create event"}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Event-created success toast ───
  function EventCreatedToast() {
    if (!eventCreatedToast) return null;
    const e = eventCreatedToast;
    return (
      <div
        className="fade-up"
        style={{
          position: "fixed", bottom: 24, right: 24,
          background: C.surface, color: C.text,
          padding: "14px 18px 14px 14px",
          borderRadius: T.radLg,
          border: `1px solid ${C.border}`,
          boxShadow: "0 12px 36px rgba(0,0,0,0.28)",
          display: "flex", alignItems: "center", gap: 14,
          maxWidth: 380,
          zIndex: 3500,
        }}
      >
        <div style={{
          width: 44, height: 44, borderRadius: T.radMd,
          background: `linear-gradient(135deg, ${e.bannerGradient[0]}, ${e.bannerGradient[1]})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <CalendarDays size={20} color="#fff" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 2 }}>
            Event created
          </div>
          <div style={{ fontSize: 11.5, color: C.textSoft, lineHeight: 1.4 }}>
            <strong style={{ color: C.text }}>{e.name}</strong>
            {e.promoted && <> · Promoted to News Feed</>}
          </div>
        </div>
        <button
          onClick={() => setEventCreatedToast(null)}
          style={{
            background: "transparent", border: "none", padding: 6,
            color: C.textSoft, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        ><X size={14} /></button>
      </div>
    );
  }

  function MarketingDialog() {
    if (!marketingDialog) return null;
    const { kind, data } = marketingDialog;
    return (
      <div
        onClick={() => setMarketingDialog(null)}
        style={{
          position: "fixed", inset: 0, zIndex: 2000,
          background: "rgba(0,0,0,0.55)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24,
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: C.surface, borderRadius: T.radLg,
            maxWidth: 600, width: "100%",
            maxHeight: "85vh", overflowY: "auto",
            boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{
            padding: "18px 22px",
            borderBottom: `1px solid ${C.border}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <div style={{ fontSize: 11, color: C.textSoft, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 2 }}>
                {kind === "preview" ? "Form Preview" : "Embed Code"}
              </div>
              <h3 style={{ fontSize: T.fontMd, fontWeight: 700, color: C.text }}>{data.name}</h3>
            </div>
            <button
              onClick={() => setMarketingDialog(null)}
              className="smooth"
              style={{ width: 32, height: 32, borderRadius: 8, background: "transparent", border: "none", color: C.textMid, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            ><X size={16} /></button>
          </div>
          <div style={{ padding: "22px" }}>
            {kind === "preview" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {data.fields.map(f => (
                  <div key={f}>
                    <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: C.textMid, marginBottom: 6, letterSpacing: "0.02em", textTransform: "uppercase" }}>{f}</label>
                    <input type="text" disabled placeholder={`Enter ${f.toLowerCase()}…`} style={{
                      width: "100%", padding: "10px 12px",
                      background: darkMode ? "rgba(255,255,255,0.03)" : "#FAFBFC",
                      border: `1px solid ${C.border}`, borderRadius: 8,
                      fontSize: 13, color: C.text,
                    }} />
                  </div>
                ))}
                <button style={{
                  padding: "11px 0", marginTop: 6,
                  background: C.primary, color: "#fff",
                  border: "none", borderRadius: 8,
                  fontSize: 13, fontWeight: 700, cursor: "pointer",
                }}>Submit</button>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: 12.5, color: C.textSoft, marginBottom: 12, lineHeight: 1.55 }}>
                  Paste this snippet into your website's HTML to embed the form. The form responds to the parent container's width.
                </p>
                <pre style={{
                  background: darkMode ? "#0A1414" : "#0F172A",
                  color: "#A6F5F7",
                  padding: "14px 16px",
                  borderRadius: 8,
                  fontSize: 11.5, lineHeight: 1.55,
                  fontFamily: "'Monaco','Menlo','Courier New', monospace",
                  overflowX: "auto",
                  margin: 0,
                }}>{`<script src="https://embed.uapp.uk/forms.js"></script>
<div data-uapp-form="${data.id}"
     data-uapp-theme="auto"></div>`}</pre>
                <button
                  onClick={() => setMarketingDialog(null)}
                  style={{
                    marginTop: 14, padding: "10px 0", width: "100%",
                    background: C.primary, color: "#fff",
                    border: "none", borderRadius: 8,
                    fontSize: 12.5, fontWeight: 700, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}><LinkIcon size={13} /> Copy code</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     UAPP LEADS — full standalone app with its own sidebar + dashboard.
     Distinct topbar branding (UAPP Leads orange) replaces the standard
     hub topbar when the user is in this app. Only Dashboard is wired;
     the rest of the sidebar nav items render a small "Coming soon"
     section so the IA is visible.
     ═══════════════════════════════════════════════════════════════ */
  function LeadsApp() {
    // Mock data for the dashboard
    const tasks = [
      { id: "lt-1", kind: "call",  title: "Follow up call with Emma Thompson",        owner: "Simona", date: "Feb 10, 2026", status: "Overdue" },
      { id: "lt-2", kind: "email", title: "Send application checklist to Aron James", owner: "Simona", date: "Feb 15, 2026", status: "Pending" },
      { id: "lt-3", kind: "cal",   title: "Schedule visa consultation with Marcus Lee", owner: "Simona", date: "Feb 18, 2026", status: "New" },
      { id: "lt-4", kind: "email", title: "Send university options to Jennifer White", owner: "Simona", date: "Feb 16, 2026", status: "Pending" },
      { id: "lt-5", kind: "call",  title: "Call Sophia Martinez - follow up",          owner: "Simona", date: "Feb 17, 2026", status: "Pending" },
    ];
    const performers = [
      { rank: 1, initials: "AN", name: "Andreea", role: "Sales Team Leader", level: "Level 6", levelLabel: "Senior Expert", efficiency: 95, color: "#9333EA" },
      { rank: 2, initials: "VI", name: "Victor",  role: "Sales Team Leader", level: "Level 6", levelLabel: "Senior Expert", efficiency: 93, color: "#3B82F6" },
      { rank: 3, initials: "SI", name: "Simona",  role: "Consultant",        level: "Level 5", levelLabel: "Expert",        efficiency: 89, color: "#EC4899" },
      { rank: 4, initials: "LE", name: "Lenke",   role: "Consultant",        level: "Level 5", levelLabel: "Expert",        efficiency: 87, color: "#10B981" },
      { rank: 5, initials: "AN", name: "Ana",     role: "Consultant",        level: "Level 4", levelLabel: "Specialist",    efficiency: 85, color: "#F59E0B" },
    ];
    const recentActivity = [
      { id: "ra-1", who: "Simona", verb: "emailed",   subject: "Emma Thompson",  detail: "Application requirements summary", at: "2 hours ago" },
      { id: "ra-2", who: "Andreea", verb: "called",   subject: "Marcus Lee",     detail: "Visa consultation scheduled",       at: "4 hours ago" },
      { id: "ra-3", who: "Lenke",  verb: "added",     subject: "Sophia Martinez", detail: "New lead from website form",       at: "yesterday" },
    ];

    const KIND_VISUAL = {
      call:  { Icon: Phone,        accent: "#EF4444", bg: "rgba(239,68,68,0.10)" },
      email: { Icon: Mail,         accent: "#F59E0B", bg: "rgba(245,158,11,0.10)" },
      cal:   { Icon: CalendarDays, accent: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
    };
    const STATUS_VISUAL = {
      Overdue: { fg: "#EF4444", bg: "rgba(239,68,68,0.10)",  border: "rgba(239,68,68,0.20)" },
      Pending: { fg: "#D97706", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.24)" },
      New:     { fg: "#2563EB", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.24)" },
      Done:    { fg: "#059669", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.24)" },
    };

    const navOverview = [
      { id: "dashboard",      Icon: LayoutDashboard, label: "Dashboard" },
      { id: "subscriber",     Icon: User,            label: "Subscriber" },
      { id: "contacts",       Icon: User,            label: "Contacts" },
      { id: "leads",          Icon: GitBranch,       label: "Leads" },
      { id: "student",        Icon: GraduationCap,   label: "Student" },
      { id: "pipeline",       Icon: Network,         label: "Pipeline" },
      { id: "archive",        Icon: Archive,         label: "Archive" },
    ];
    const navTools = [
      { id: "tasks",          Icon: CheckCircle,       label: "Tasks" },
      { id: "message",        Icon: MessageCircleMore, label: "Message" },
      { id: "calls",          Icon: Phone,             label: "Calls" },
      { id: "template",       Icon: FileText,          label: "Template" },
      { id: "automation",     Icon: Zap,               label: "Automation" },
      { id: "integration",    Icon: Plug,              label: "Integration" },
      { id: "marketing",      Icon: Megaphone,         label: "Marketing", expandable: true,
        subItems: [
          { id: "ads",    Icon: Megaphone,       label: "Ads" },
          { id: "forms",  Icon: ClipboardCheck,  label: "Forms" },
          { id: "events", Icon: CalendarDays,    label: "Events" },
        ],
      },
      { id: "team",           Icon: Users,             label: "Team Management" },
      { id: "reporting",      Icon: BarChart3,         label: "Reporting", expandable: true },
    ];

    return (
      <div style={{ flex: 1, display: "flex", minHeight: 0, background: C.bg }}>
        {/* Leads sidebar */}
        <aside style={{
          width: 240, flexShrink: 0,
          background: C.surface,
          borderRight: `1px solid ${C.border}`,
          display: "flex", flexDirection: "column",
          padding: "18px 0",
          overflowY: "auto",
        }}>
          <div style={{
            padding: "0 18px", marginBottom: 14,
            fontSize: T.fontXs, fontWeight: 700, color: C.textSoft,
            letterSpacing: "0.10em",
          }}>OVERVIEW</div>
          {navOverview.map(item => {
            const I = item.Icon;
            const a = item.id === leadsPage;
            return (
              <button key={item.id}
                onClick={() => setLeadsPage(item.id)}
                className="smooth"
                style={{
                  margin: "0 10px 2px", padding: "9px 14px",
                  borderRadius: 8,
                  display: "flex", alignItems: "center", gap: 11,
                  background: a ? C.primary10 : "transparent",
                  color: a ? C.primary : C.textMid,
                  fontSize: 13, fontWeight: a ? 700 : 500,
                  textAlign: "left",
                  cursor: "pointer",
                  border: "none", width: "calc(100% - 20px)",
                }}
                onMouseEnter={e => { if (!a) e.currentTarget.style.background = C.bg; }}
                onMouseLeave={e => { if (!a) e.currentTarget.style.background = "transparent"; }}
              >
                <I size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div style={{
            padding: "20px 18px 14px",
            fontSize: T.fontXs, fontWeight: 700, color: C.textSoft,
            letterSpacing: "0.10em",
          }}>TOOLS</div>
          {navTools.map(item => {
            const I = item.Icon;
            // Marketing is the "active parent" when leadsPage is marketing (and the
            // active sub-item is determined by marketingTab). Other items follow the
            // simple id-match rule.
            const isMarketing = item.id === "marketing";
            const a = isMarketing ? leadsPage === "marketing" : item.id === leadsPage;
            // Marketing auto-expands when on its page; otherwise collapsed.
            const expanded = isMarketing && leadsPage === "marketing";
            return (
              <Fragment key={item.id}>
                <button
                  onClick={() => {
                    if (isMarketing) {
                      // Click on Marketing → navigate to marketing module (open if closed,
                      // collapse to dashboard if already open).
                      if (leadsPage === "marketing") setLeadsPage("dashboard");
                      else { setLeadsPage("marketing"); setMarketingTab("ads"); }
                    } else {
                      setLeadsPage(item.id);
                    }
                  }}
                  className="smooth"
                  style={{
                    margin: "0 10px 2px", padding: "9px 14px",
                    borderRadius: 8,
                    display: "flex", alignItems: "center", gap: 11,
                    background: a ? C.primary10 : "transparent",
                    color: a ? C.primary : C.textMid,
                    fontSize: 13, fontWeight: a ? 700 : 500,
                    textAlign: "left",
                    cursor: "pointer",
                    border: "none", width: "calc(100% - 20px)",
                  }}
                  onMouseEnter={e => { if (!a) e.currentTarget.style.background = C.bg; }}
                  onMouseLeave={e => { if (!a) e.currentTarget.style.background = "transparent"; }}
                >
                  <I size={16} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.expandable && (
                    expanded
                      ? <ChevronDown size={14} color={a ? C.primary : C.textVerySoft} />
                      : <ChevronRight size={14} color={C.textVerySoft} />
                  )}
                </button>

                {/* Marketing sub-menu: rendered only when expanded. Each sub-item
                    is indented and shows the active state when its tab is chosen. */}
                {expanded && item.subItems && item.subItems.map(sub => {
                  const SI = sub.Icon;
                  const subActive = marketingTab === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => { setLeadsPage("marketing"); setMarketingTab(sub.id); }}
                      className="smooth"
                      style={{
                        margin: "0 10px 2px 18px", padding: "7px 12px 7px 22px",
                        borderRadius: 7,
                        display: "flex", alignItems: "center", gap: 10,
                        background: subActive ? C.primary10 : "transparent",
                        color: subActive ? C.primary : C.textMid,
                        fontSize: 12.5, fontWeight: subActive ? 700 : 500,
                        textAlign: "left",
                        cursor: "pointer",
                        border: "none",
                        width: "calc(100% - 28px)",
                        // Indentation rail — subtle vertical line on the left
                        position: "relative",
                      }}
                      onMouseEnter={e => { if (!subActive) e.currentTarget.style.background = C.bg; }}
                      onMouseLeave={e => { if (!subActive) e.currentTarget.style.background = "transparent"; }}
                    >
                      {/* Sub-menu rail indicator */}
                      <span style={{
                        position: "absolute", left: 7, top: "50%",
                        width: 7, height: 1,
                        background: subActive ? C.primary : C.textVerySoft,
                        transform: "translateY(-50%)",
                      }} />
                      <SI size={13} />
                      <span>{sub.label}</span>
                    </button>
                  );
                })}
              </Fragment>
            );
          })}

          <div style={{ flex: 1 }} />
          <div style={{
            padding: "12px 18px", borderTop: `1px solid ${C.divider}`,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "#1A2332", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700,
            }}>N</div>
            <div style={{ fontSize: T.fontXs, color: C.textVerySoft }}>UAPP Leads v1.0</div>
          </div>
        </aside>

        {/* Main content — routed by leadsPage */}
        {leadsPage === "marketing" ? <MarketingModule /> : (
        <div style={{ flex: 1, overflowY: "auto", padding: "30px 36px 60px" }}>
          {/* Header */}
          <div style={{ marginBottom: 22 }}>
            <h1 style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: 28, fontWeight: 700, color: C.text,
              letterSpacing: "-0.015em", marginBottom: 4,
            }}>{leadsPage === "dashboard" ? "Dashboard" : leadsPage.charAt(0).toUpperCase() + leadsPage.slice(1)}</h1>
            <p style={{ fontSize: 13, color: C.textSoft }}>
              Welcome back, {currentUser.name} - {currentUser.role}
            </p>
          </div>

          {/* Stat cards row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16, marginBottom: 22,
          }}>
            {[
              { label: "Total Leads",     value: "0",  Icon: Users },
              { label: "New Leads",       value: "0",  Icon: UserPlus },
              { label: "Conversion Rate", value: "0%", Icon: Target },
              { label: "Task Completion", value: "0%", Icon: CheckCircle },
            ].map(card => (
              <div key={card.label} style={{
                background: C.surface, borderRadius: T.radLg,
                border: `1px solid ${C.border}`, padding: "18px 20px",
                boxShadow: "0 1px 3px rgba(13,31,31,0.03)",
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                  marginBottom: 16,
                }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: C.textMid }}>{card.label}</div>
                  <card.Icon size={16} color={C.textVerySoft} />
                </div>
                <div style={{ fontSize: 30, fontWeight: 700, color: C.text, lineHeight: 1, marginBottom: 12 }}>
                  {card.value}
                </div>
                <div style={{
                  fontSize: T.fontXs, color: C.textSoft,
                  display: "flex", alignItems: "center", gap: 5,
                }}>
                  <span style={{ color: "#EF4444", fontSize: 13 }}>↘</span>
                  <span>— from last period</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tasks + Top Performers */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 16, marginBottom: 22,
          }}>
            {/* Tasks */}
            <div style={{
              background: C.surface, borderRadius: T.radLg,
              border: `1px solid ${C.border}`, padding: "18px 20px",
              boxShadow: "0 1px 3px rgba(13,31,31,0.03)",
            }}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginBottom: 14,
              }}>
                <div style={{ fontSize: T.fontMd, fontWeight: 700, color: C.text }}>Tasks</div>
                <div style={{ display: "flex", gap: 14, fontSize: 11.5, fontWeight: 600 }}>
                  <span style={{ color: "#2563EB" }}>5 New</span>
                  <span style={{ color: "#D97706" }}>6 Pending</span>
                  <span style={{ color: "#EF4444" }}>5 Overdue</span>
                  <span style={{ color: "#059669" }}>5 Done</span>
                </div>
              </div>

              {tasks.map(t => {
                const k = KIND_VISUAL[t.kind];
                const s = STATUS_VISUAL[t.status];
                return (
                  <div key={t.id} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 0", borderBottom: `1px solid ${C.divider}`,
                  }}>
                    <div style={{
                      width: 3, alignSelf: "stretch", borderRadius: 2,
                      background: k.accent,
                    }} />
                    <div style={{
                      width: 36, height: 36, borderRadius: 9,
                      background: k.bg, color: k.accent,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <k.Icon size={15} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: T.fontBase, fontWeight: 600, color: C.text, marginBottom: 3 }}>
                        {t.title}
                      </div>
                      <div style={{ fontSize: 11, color: C.textSoft }}>
                        {t.owner} · {t.date}
                      </div>
                    </div>
                    <div style={{
                      padding: "3px 10px", borderRadius: T.radFull,
                      background: s.bg, color: s.fg,
                      fontSize: T.fontXs, fontWeight: 700,
                      border: `1px solid ${s.border}`,
                    }}>{t.status}</div>
                  </div>
                );
              })}

              <div style={{ textAlign: "center", marginTop: 14 }}>
                <button className="smooth" style={{
                  fontSize: 12.5, fontWeight: 600, color: C.primary,
                  padding: "6px 14px", borderRadius: 6,
                  background: "transparent",
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.primary10}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >View All 21 Tasks</button>
              </div>
            </div>

            {/* Top Performers */}
            <div style={{
              background: C.surface, borderRadius: T.radLg,
              border: `1px solid ${C.border}`, padding: "18px 20px",
              boxShadow: "0 1px 3px rgba(13,31,31,0.03)",
            }}>
              <div style={{ fontSize: T.fontMd, fontWeight: 700, color: C.text, marginBottom: 14 }}>
                Top Performers
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "30px 1.5fr 1fr 1fr 60px",
                gap: 8, alignItems: "center",
                fontSize: T.fontXs, fontWeight: 700, color: C.textSoft,
                paddingBottom: 8, borderBottom: `1px solid ${C.divider}`,
                letterSpacing: "0.04em",
              }}>
                <div>Rank</div>
                <div>Name</div>
                <div>Level</div>
                <div></div>
                <div style={{ textAlign: "right" }}>Efficiency</div>
              </div>
              {performers.map(p => {
                const isMedal = p.rank <= 3;
                const medalColor = p.rank === 1 ? "#F59E0B" : p.rank === 2 ? "#9CA3AF" : "#A16207";
                return (
                  <div key={p.rank} style={{
                    display: "grid",
                    gridTemplateColumns: "30px 1.5fr 1fr 1fr 60px",
                    gap: 8, alignItems: "center",
                    padding: "11px 0", borderBottom: `1px solid ${C.divider}`,
                  }}>
                    <div>
                      {isMedal ? (
                        <Award size={18} color={medalColor} fill={medalColor + "33"} />
                      ) : (
                        <span style={{ fontSize: 12, fontWeight: 700, color: C.textSoft }}>#{p.rank}</span>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: p.color, color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: T.fontXs, fontWeight: 700,
                      }}>{p.initials}</div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text }}>{p.name}</div>
                        <div style={{ fontSize: T.fontXs, color: C.textSoft }}>{p.role}</div>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11.5, fontWeight: 600, color: C.text }}>{p.level}</div>
                      <div style={{ fontSize: T.fontXs, color: C.textSoft }}>{p.levelLabel}</div>
                    </div>
                    <div style={{
                      height: 4, borderRadius: 2,
                      background: C.bg, position: "relative", overflow: "hidden",
                    }}>
                      <div style={{
                        position: "absolute", left: 0, top: 0, bottom: 0,
                        width: p.efficiency + "%",
                        background: p.efficiency >= 90 ? "#10B981" : "#F59E0B",
                        borderRadius: 2,
                      }} />
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.text, textAlign: "right" }}>
                      {p.efficiency}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{
            background: C.surface, borderRadius: T.radLg,
            border: `1px solid ${C.border}`, padding: "18px 20px",
            boxShadow: "0 1px 3px rgba(13,31,31,0.03)",
          }}>
            <div style={{ fontSize: T.fontMd, fontWeight: 700, color: C.text, marginBottom: 14 }}>
              Recent Activity
            </div>
            {recentActivity.map(a => (
              <div key={a.id} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 0", borderBottom: `1px solid ${C.divider}`,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 9,
                  background: C.primary10, color: C.primary,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {a.verb === "emailed" && <Mail size={14} />}
                  {a.verb === "called" && <Phone size={14} />}
                  {a.verb === "added" && <UserPlus size={14} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, color: C.text }}>
                    <strong style={{ fontWeight: 700 }}>{a.who}</strong>
                    {" "}{a.verb}{" "}
                    <strong style={{ fontWeight: 700 }}>{a.subject}</strong>
                    {" — "}
                    <span style={{ color: C.textMid }}>{a.detail}</span>
                  </div>
                  <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 2 }}>{a.at}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     APP PLACEHOLDER — rendered for apps that aren't fully wired in.
     Friendly screen with the app's icon, name, tagline, and a button
     to jump back to CRM. The launcher in the topbar stays available.
     ═══════════════════════════════════════════════════════════════ */
  function AppPlaceholder() {
    const app = APPS.find(a => a.id === currentApp);
    if (!app) return null;
    const Icon = app.Icon;

    return (
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "40px 24px",
        background: `linear-gradient(180deg, ${C.bg}, ${app.bg})`,
      }}>
        <div style={{
          maxWidth: 520, textAlign: "center",
          background: C.surface,
          padding: "44px 36px 36px",
          borderRadius: 18,
          border: `1px solid ${C.border}`,
          boxShadow: "0 8px 32px rgba(13,31,31,0.06)",
        }}>
          <div style={{
            width: 76, height: 76, borderRadius: 18,
            background: app.bg, color: app.color,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            marginBottom: 18,
            boxShadow: `0 6px 20px ${app.color}33`,
          }}>
            <Icon size={34} strokeWidth={2} />
          </div>
          <h1 style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: 26, fontWeight: 700, color: C.text,
            letterSpacing: "-0.01em",
            marginBottom: 8,
          }}>{app.name}</h1>
          <p style={{
            fontSize: 14, color: C.textMid, lineHeight: 1.5,
            marginBottom: 6,
          }}>{app.tagline}</p>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 12px", borderRadius: T.radFull,
            background: app.color + "14", color: app.color,
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.04em",
            marginTop: 14,
          }}>
            <Sparkles size={11} />
            COMING SOON
          </div>
          <p style={{
            fontSize: 12, color: C.textSoft, lineHeight: 1.55,
            marginTop: 22, maxWidth: 380, marginLeft: "auto", marginRight: "auto",
          }}>
            This app is part of the UAPP ecosystem and is currently in development. While we finish it, you can switch back to CRM or Comms Hub from the launcher.
          </p>

          <div style={{
            display: "flex", gap: 10, justifyContent: "center",
            marginTop: 26,
          }}>
            <button
              onClick={() => switchApp("crm")}
              className="smooth"
              style={{
                padding: "10px 18px", borderRadius: T.radMd,
                background: C.primary, color: "#fff",
                fontSize: 12.5, fontWeight: 700,
                display: "inline-flex", alignItems: "center", gap: 6,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(4,93,94,0.20)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#034647"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.primary; }}
            >
              <Briefcase size={13} />
              Open CRM
            </button>
            <button
              onClick={() => switchApp("comms")}
              className="smooth"
              style={{
                padding: "10px 18px", borderRadius: T.radMd,
                background: C.surface, color: C.text,
                fontSize: 12.5, fontWeight: 700,
                display: "inline-flex", alignItems: "center", gap: 6,
                border: `1px solid ${C.border}`,
                cursor: "pointer",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.bg; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.surface; }}
            >
              <Headphones size={13} />
              Open Comms Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  function TopBar() {
    return (
      <div style={{
        background: C.surface, borderBottom: `1px solid ${C.border}`,
        padding: "0 22px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {activePage === "communication-hub" && (
            <div style={{
              fontSize: 11, color: C.textMid, fontWeight: 600,
              padding: "4px 10px", borderRadius: 6,
              background: C.primary05, border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <MessagesSquare size={12} color={C.primary} />
              Communication Hub
              {hubFeature !== "chats" && (
                <>
                  <ChevronRight size={11} color={C.textSoft} />
                  <span style={{ color: C.text }}>
                    {hubFeature === "calendar" && "Meetings"}
                    {hubFeature === "availability" && "My Schedule"}
                    {hubFeature === "feed" && "News Feed"}
                    {hubFeature === "settings" && "Settings"}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Theme toggle (light/dark) — sits leftmost so it's a stable
              utility action, separated from the conversational/notification
              cluster (msg + bell). */}
          <Tooltip label={darkMode ? "Switch to light mode" : "Switch to dark mode"} position="bottom">
            <button
              onClick={() => setDarkMode(d => !d)}
              className="iconbtn smooth"
              aria-label="Toggle theme"
              style={{
                width: 36, height: 36, borderRadius: 9,
                color: darkMode ? C.secondary : C.textMid,
                background: "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </Tooltip>
          <Tooltip label="Quick chat" position="bottom">
            <button
              onClick={() => { setActivePage("communication-hub"); setHubFeature("chats"); }}
              className="iconbtn smooth"
              style={{ width: 36, height: 36, borderRadius: 9, color: C.textMid, position: "relative" }}
            >
              <MessagesSquare size={17} />
              {decoratedContacts.some(c => c.unread > 0) && (
                <span style={{
                  position: "absolute", top: 7, right: 7,
                  width: 7, height: 7, borderRadius: "50%",
                  background: C.secondary, border: `2px solid ${C.surface}`,
                }} />
              )}
            </button>
          </Tooltip>
          {/* Notification bell + panel */}
          <div ref={notificationsRef} style={{ position: "relative" }}>
            <Tooltip label="Notifications" position="bottom">
              <button
                onClick={() => setShowNotifications(s => !s)}
                className="iconbtn smooth"
                style={{
                  width: 36, height: 36, borderRadius: 9,
                  color: showNotifications ? C.primary : C.textMid,
                  background: showNotifications ? C.primary10 : "transparent",
                  position: "relative",
                }}
              >
                <Bell size={17} />
                {totalPendingNotifications > 0 && (
                  <span style={{
                    position: "absolute", top: 6, right: 6, padding: "0 5px",
                    height: 14, minWidth: 14, borderRadius: T.radFull,
                    background: C.secondary, color: "#fff",
                    fontSize: 9, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: `2px solid ${C.surface}`,
                  }}>{totalPendingNotifications}</span>
                )}
              </button>
            </Tooltip>
            {showNotifications && renderNotificationsPanel()}
          </div>

          {/* App launcher — between bell and user info */}
          {AppLauncher()}

          {/* Profile chip + account switcher */}
          <div ref={accountSwitcherRef} style={{ position: "relative" }}>
            <button
              onClick={() => setShowAccountSwitcher(s => !s)}
              className="smooth"
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "5px 12px 5px 5px", borderRadius: T.radLg,
                background: showAccountSwitcher ? C.primary10 : C.bg,
                border: `1px solid ${showAccountSwitcher ? C.primary30 : C.border}`,
                cursor: "pointer",
              }}
            >
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: currentUser.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, color: "#fff",
              }}>{currentUser.initials}</div>
              <div style={{ lineHeight: 1.2, textAlign: "left" }}>
                <div style={{
                  fontSize: 11.5, fontWeight: 700, color: C.text,
                  textTransform: "uppercase", letterSpacing: "0.02em",
                }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: 9.5, color: C.textSoft }}>{currentUser.role}</div>
              </div>
              <ChevronDown
                size={14}
                color={C.textMid}
                style={{
                  transition: "transform 0.18s ease",
                  transform: showAccountSwitcher ? "rotate(180deg)" : "rotate(0)",
                  marginLeft: 2,
                }}
              />
            </button>

            {showAccountSwitcher && renderAccountSwitcher()}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     COMPOSE VIEW (inline new-chat — Teams/WhatsApp pattern)
     ═══════════════════════════════════════════════════════════════ */


  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */
  const moduleContext = {
    DetailRow: typeof DetailRow !== "undefined" ? DetailRow : undefined,
    Tooltip: typeof Tooltip !== "undefined" ? Tooltip : undefined,
    Avatar: typeof Avatar !== "undefined" ? Avatar : undefined,
    AgendaView: typeof AgendaView !== "undefined" ? AgendaView : undefined,
    BlockChip: typeof BlockChip !== "undefined" ? BlockChip : undefined,
    BlockDrawer: typeof BlockDrawer !== "undefined" ? BlockDrawer : undefined,
    C: typeof C !== "undefined" ? C : undefined,
    COLORS: typeof COLORS !== "undefined" ? COLORS : undefined,
    COL_WIDTH: typeof COL_WIDTH !== "undefined" ? COL_WIDTH : undefined,
    DAY_LABELS: typeof DAY_LABELS !== "undefined" ? DAY_LABELS : undefined,
    DEPTS: typeof DEPTS !== "undefined" ? DEPTS : undefined,
    DrawerOverlay: typeof DrawerOverlay !== "undefined" ? DrawerOverlay : undefined,
    END_HOUR: typeof END_HOUR !== "undefined" ? END_HOUR : undefined,
    FEED_AUDIENCES: typeof FEED_AUDIENCES !== "undefined" ? FEED_AUDIENCES : undefined,
    FEED_CATEGORIES: typeof FEED_CATEGORIES !== "undefined" ? FEED_CATEGORIES : undefined,
    FEED_PRIORITIES: typeof FEED_PRIORITIES !== "undefined" ? FEED_PRIORITIES : undefined,
    FEELINGS: typeof FEELINGS !== "undefined" ? FEELINGS : undefined,
    FIELD_TYPES: typeof FIELD_TYPES !== "undefined" ? FIELD_TYPES : undefined,
    GRID_SLOTS: typeof GRID_SLOTS !== "undefined" ? GRID_SLOTS : undefined,
    GROUP_ICONS: typeof GROUP_ICONS !== "undefined" ? GROUP_ICONS : undefined,
    GroupMeetingFlow: typeof GroupMeetingFlow !== "undefined" ? GroupMeetingFlow : undefined,
    HOURS: typeof HOURS !== "undefined" ? HOURS : undefined,
    HOUR_H: typeof HOUR_H !== "undefined" ? HOUR_H : undefined,
    Icon: typeof Icon !== "undefined" ? Icon : undefined,
    Infinity: typeof Infinity !== "undefined" ? Infinity : undefined,
    MESSAGE_TOPICS: typeof MESSAGE_TOPICS !== "undefined" ? MESSAGE_TOPICS : undefined,
    MONTH_NAMES: typeof MONTH_NAMES !== "undefined" ? MONTH_NAMES : undefined,
    MonthGrid: typeof MonthGrid !== "undefined" ? MonthGrid : undefined,
    ORANGE: typeof ORANGE !== "undefined" ? ORANGE : undefined,
    PINK: typeof PINK !== "undefined" ? PINK : undefined,
    PURPLE: typeof PURPLE !== "undefined" ? PURPLE : undefined,
    REACTIONS: typeof REACTIONS !== "undefined" ? REACTIONS : undefined,
    REACTION_TYPES: typeof REACTION_TYPES !== "undefined" ? REACTION_TYPES : undefined,
    ROLE_GROUPS: typeof ROLE_GROUPS !== "undefined" ? ROLE_GROUPS : undefined,
    ROW_HEIGHT: typeof ROW_HEIGHT !== "undefined" ? ROW_HEIGHT : undefined,
    SAMPLE_APPLICATIONS: typeof SAMPLE_APPLICATIONS !== "undefined" ? SAMPLE_APPLICATIONS : undefined,
    SAMPLE_PHOTO_LIBRARY: typeof SAMPLE_PHOTO_LIBRARY !== "undefined" ? SAMPLE_PHOTO_LIBRARY : undefined,
    START_HOUR: typeof START_HOUR !== "undefined" ? START_HOUR : undefined,
    STATUS: typeof STATUS !== "undefined" ? STATUS : undefined,
    SaveIcon: typeof SaveIcon !== "undefined" ? SaveIcon : undefined,
    Section: typeof Section !== "undefined" ? Section : undefined,
    SettingsPanel: typeof SettingsPanel !== "undefined" ? SettingsPanel : undefined,
    T: typeof T !== "undefined" ? T : undefined,
    TEMPLATE_PLACEHOLDERS: typeof TEMPLATE_PLACEHOLDERS !== "undefined" ? TEMPLATE_PLACEHOLDERS : undefined,
    TEMPLATE_SAMPLE: typeof TEMPLATE_SAMPLE !== "undefined" ? TEMPLATE_SAMPLE : undefined,
    TEMPLATE_TYPES: typeof TEMPLATE_TYPES !== "undefined" ? TEMPLATE_TYPES : undefined,
    TIME_COL_WIDTH: typeof TIME_COL_WIDTH !== "undefined" ? TIME_COL_WIDTH : undefined,
    TIME_SLOTS: typeof TIME_SLOTS !== "undefined" ? TIME_SLOTS : undefined,
    TOPICS: typeof TOPICS !== "undefined" ? TOPICS : undefined,
    TPLCOLORS: typeof TPLCOLORS !== "undefined" ? TPLCOLORS : undefined,
    TimeGrid: typeof TimeGrid !== "undefined" ? TimeGrid : undefined,
    USERS: typeof USERS !== "undefined" ? USERS : undefined,
    _: typeof _ !== "undefined" ? _ : undefined,
    a: typeof a !== "undefined" ? a : undefined,
    acc: typeof acc !== "undefined" ? acc : undefined,
    accent: typeof accent !== "undefined" ? accent : undefined,
    accentColor: typeof accentColor !== "undefined" ? accentColor : undefined,
    acceptMeeting: typeof acceptMeeting !== "undefined" ? acceptMeeting : undefined,
    acceptedCount: typeof acceptedCount !== "undefined" ? acceptedCount : undefined,
    active: typeof active !== "undefined" ? active : undefined,
    activeCats: typeof activeCats !== "undefined" ? activeCats : undefined,
    activeChatId: typeof activeChatId !== "undefined" ? activeChatId : undefined,
    activeContact: typeof activeContact !== "undefined" ? activeContact : undefined,
    activeGroup: typeof activeGroup !== "undefined" ? activeGroup : undefined,
    activeReminders: typeof activeReminders !== "undefined" ? activeReminders : undefined,
    addCustomDept: typeof addCustomDept !== "undefined" ? addCustomDept : undefined,
    addCustomTopic: typeof addCustomTopic !== "undefined" ? addCustomTopic : undefined,
    addDays: typeof addDays !== "undefined" ? addDays : undefined,
    addFieldToDraft: typeof addFieldToDraft !== "undefined" ? addFieldToDraft : undefined,
    addedIds: typeof addedIds !== "undefined" ? addedIds : undefined,
    addingTopicTo: typeof addingTopicTo !== "undefined" ? addingTopicTo : undefined,
    alert: typeof alert !== "undefined" ? alert : undefined,
    alertCard: typeof alertCard !== "undefined" ? alertCard : undefined,
    allBlocks: typeof allBlocks !== "undefined" ? allBlocks : undefined,
    allBlocksRaw: typeof allBlocksRaw !== "undefined" ? allBlocksRaw : undefined,
    allChats: typeof allChats !== "undefined" ? allChats : undefined,
    allDepts: typeof allDepts !== "undefined" ? allDepts : undefined,
    allFreeSuggestion: typeof allFreeSuggestion !== "undefined" ? allFreeSuggestion : undefined,
    allIds: typeof allIds !== "undefined" ? allIds : undefined,
    allParticipants: typeof allParticipants !== "undefined" ? allParticipants : undefined,
    allPlaceholders: typeof allPlaceholders !== "undefined" ? allPlaceholders : undefined,
    allPromoData: typeof allPromoData !== "undefined" ? allPromoData : undefined,
    allSamples: typeof allSamples !== "undefined" ? allSamples : undefined,
    allTopics: typeof allTopics !== "undefined" ? allTopics : undefined,
    allTplTypes: typeof allTplTypes !== "undefined" ? allTplTypes : undefined,
    allVisible: typeof allVisible !== "undefined" ? allVisible : undefined,
    amount: typeof amount !== "undefined" ? amount : undefined,
    app: typeof app !== "undefined" ? app : undefined,
    appPickerSearch: typeof appPickerSearch !== "undefined" ? appPickerSearch : undefined,
    appSearchQuery: typeof appSearchQuery !== "undefined" ? appSearchQuery : undefined,
    appendGroupSystemMessage: typeof appendGroupSystemMessage !== "undefined" ? appendGroupSystemMessage : undefined,
    apps: typeof apps !== "undefined" ? apps : undefined,
    archiveAppGroup: typeof archiveAppGroup !== "undefined" ? archiveAppGroup : undefined,
    archiveChat: typeof archiveChat !== "undefined" ? archiveChat : undefined,
    archivedCount: typeof archivedCount !== "undefined" ? archivedCount : undefined,
    archivedItems: typeof archivedItems !== "undefined" ? archivedItems : undefined,
    archivedTargetId: typeof archivedTargetId !== "undefined" ? archivedTargetId : undefined,
    assignedTo: typeof assignedTo !== "undefined" ? assignedTo : undefined,
    attachMenu: typeof attachMenu !== "undefined" ? attachMenu : undefined,
    attachMenuRef: typeof attachMenuRef !== "undefined" ? attachMenuRef : undefined,
    aud: typeof aud !== "undefined" ? aud : undefined,
    author: typeof author !== "undefined" ? author : undefined,
    availHours: typeof availHours !== "undefined" ? availHours : undefined,
    availability: typeof availability !== "undefined" ? availability : undefined,
    b: typeof b !== "undefined" ? b : undefined,
    bEnd: typeof bEnd !== "undefined" ? bEnd : undefined,
    bStart: typeof bStart !== "undefined" ? bStart : undefined,
    backAction: typeof backAction !== "undefined" ? backAction : undefined,
    backLabel: typeof backLabel !== "undefined" ? backLabel : undefined,
    badge: typeof badge !== "undefined" ? badge : undefined,
    base: typeof base !== "undefined" ? base : undefined,
    baseBlocks: typeof baseBlocks !== "undefined" ? baseBlocks : undefined,
    be: typeof be !== "undefined" ? be : undefined,
    bestSuggestion: typeof bestSuggestion !== "undefined" ? bestSuggestion : undefined,
    bgBase: typeof bgBase !== "undefined" ? bgBase : undefined,
    block: typeof block !== "undefined" ? block : undefined,
    blocks: typeof blocks !== "undefined" ? blocks : undefined,
    blocksForDay: typeof blocksForDay !== "undefined" ? blocksForDay : undefined,
    body: typeof body !== "undefined" ? body : undefined,
    bodyText: typeof bodyText !== "undefined" ? bodyText : undefined,
    bookedH: typeof bookedH !== "undefined" ? bookedH : undefined,
    bookingBlocks: typeof bookingBlocks !== "undefined" ? bookingBlocks : undefined,
    bookingContact: typeof bookingContact !== "undefined" ? bookingContact : undefined,
    bookingContactsFiltered: typeof bookingContactsFiltered !== "undefined" ? bookingContactsFiltered : undefined,
    bookingSearch: typeof bookingSearch !== "undefined" ? bookingSearch : undefined,
    bookmarksByUser: typeof bookmarksByUser !== "undefined" ? bookmarksByUser : undefined,
    bs: typeof bs !== "undefined" ? bs : undefined,
    btnSm: typeof btnSm !== "undefined" ? btnSm : undefined,
    buildCalendarGrid: typeof buildCalendarGrid !== "undefined" ? buildCalendarGrid : undefined,
    c: typeof c !== "undefined" ? c : undefined,
    cal: typeof cal !== "undefined" ? cal : undefined,
    calMonth: typeof calMonth !== "undefined" ? calMonth : undefined,
    calYear: typeof calYear !== "undefined" ? calYear : undefined,
    calendarTab: typeof calendarTab !== "undefined" ? calendarTab : undefined,
    canArchiveAppGroup: typeof canArchiveAppGroup !== "undefined" ? canArchiveAppGroup : undefined,
    canManageCommissions: typeof canManageCommissions !== "undefined" ? canManageCommissions : undefined,
    canManualArchive: typeof canManualArchive !== "undefined" ? canManualArchive : undefined,
    canPost: typeof canPost !== "undefined" ? canPost : undefined,
    canSchedulePosts: typeof canSchedulePosts !== "undefined" ? canSchedulePosts : undefined,
    canSeePost: typeof canSeePost !== "undefined" ? canSeePost : undefined,
    canSend: typeof canSend !== "undefined" ? canSend : undefined,
    canShowMenu: typeof canShowMenu !== "undefined" ? canShowMenu : undefined,
    canUseTemplates: typeof canUseTemplates !== "undefined" ? canUseTemplates : undefined,
    cancelEditMessage: typeof cancelEditMessage !== "undefined" ? cancelEditMessage : undefined,
    cancelMeeting: typeof cancelMeeting !== "undefined" ? cancelMeeting : undefined,
    candidates: typeof candidates !== "undefined" ? candidates : undefined,
    cat: typeof cat !== "undefined" ? cat : undefined,
    catId: typeof catId !== "undefined" ? catId : undefined,
    cell: typeof cell !== "undefined" ? cell : undefined,
    cellStyle: typeof cellStyle !== "undefined" ? cellStyle : undefined,
    cells: typeof cells !== "undefined" ? cells : undefined,
    chat: typeof chat !== "undefined" ? chat : undefined,
    chatKey: typeof chatKey !== "undefined" ? chatKey : undefined,
    chatRowMenuOpen: typeof chatRowMenuOpen !== "undefined" ? chatRowMenuOpen : undefined,
    chatSearch: typeof chatSearch !== "undefined" ? chatSearch : undefined,
    chatTab: typeof chatTab !== "undefined" ? chatTab : undefined,
    chatViewMenuOpen: typeof chatViewMenuOpen !== "undefined" ? chatViewMenuOpen : undefined,
    chipKey: typeof chipKey !== "undefined" ? chipKey : undefined,
    clearComposePick: typeof clearComposePick !== "undefined" ? clearComposePick : undefined,
    clearReply: typeof clearReply !== "undefined" ? clearReply : undefined,
    close: typeof close !== "undefined" ? close : undefined,
    closeCompose: typeof closeCompose !== "undefined" ? closeCompose : undefined,
    closeModal: typeof closeModal !== "undefined" ? closeModal : undefined,
    closeTemplatesWizard: typeof closeTemplatesWizard !== "undefined" ? closeTemplatesWizard : undefined,
    code: typeof code !== "undefined" ? code : undefined,
    codeBg: typeof codeBg !== "undefined" ? codeBg : undefined,
    codeBlock: typeof codeBlock !== "undefined" ? codeBlock : undefined,
    codeColor: typeof codeColor !== "undefined" ? codeColor : undefined,
    codeTd: typeof codeTd !== "undefined" ? codeTd : undefined,
    color: typeof color !== "undefined" ? color : undefined,
    comm: typeof comm !== "undefined" ? comm : undefined,
    commTemplates: typeof commTemplates !== "undefined" ? commTemplates : undefined,
    commissions: typeof commissions !== "undefined" ? commissions : undefined,
    companyCount: typeof companyCount !== "undefined" ? companyCount : undefined,
    composeDropdown: typeof composeDropdown !== "undefined" ? composeDropdown : undefined,
    composeMenuRef: typeof composeMenuRef !== "undefined" ? composeMenuRef : undefined,
    composeQuery: typeof composeQuery !== "undefined" ? composeQuery : undefined,
    composeSelected: typeof composeSelected !== "undefined" ? composeSelected : undefined,
    composingNew: typeof composingNew !== "undefined" ? composingNew : undefined,
    confirmBooking: typeof confirmBooking !== "undefined" ? confirmBooking : undefined,
    confirmDanger: typeof confirmDanger !== "undefined" ? confirmDanger : undefined,
    confirmLabel: typeof confirmLabel !== "undefined" ? confirmLabel : undefined,
    confirmLeaveGroup: typeof confirmLeaveGroup !== "undefined" ? confirmLeaveGroup : undefined,
    confirmation: typeof confirmation !== "undefined" ? confirmation : undefined,
    conflictCount: typeof conflictCount !== "undefined" ? conflictCount : undefined,
    consultant: typeof consultant !== "undefined" ? consultant : undefined,
    contact: typeof contact !== "undefined" ? contact : undefined,
    contentPrefs: typeof contentPrefs !== "undefined" ? contentPrefs : undefined,
    count: typeof count !== "undefined" ? count : undefined,
    course: typeof course !== "undefined" ? course : undefined,
    courses: typeof courses !== "undefined" ? courses : undefined,
    cp: typeof cp !== "undefined" ? cp : undefined,
    cpUser: typeof cpUser !== "undefined" ? cpUser : undefined,
    ct: typeof ct !== "undefined" ? ct : undefined,
    cu: typeof cu !== "undefined" ? cu : undefined,
    currentIdx: typeof currentIdx !== "undefined" ? currentIdx : undefined,
    currentUser: typeof currentUser !== "undefined" ? currentUser : undefined,
    currentUserIsGroupAdmin: typeof currentUserIsGroupAdmin !== "undefined" ? currentUserIsGroupAdmin : undefined,
    customDepts: typeof customDepts !== "undefined" ? customDepts : undefined,
    customTopics: typeof customTopics !== "undefined" ? customTopics : undefined,
    customTplTypes: typeof customTplTypes !== "undefined" ? customTplTypes : undefined,
    d: typeof d !== "undefined" ? d : undefined,
    danger: typeof danger !== "undefined" ? danger : undefined,
    darkMode: typeof darkMode !== "undefined" ? darkMode : undefined,
    data: typeof data !== "undefined" ? data : undefined,
    dateKey: typeof dateKey !== "undefined" ? dateKey : undefined,
    dateLabel: typeof dateLabel !== "undefined" ? dateLabel : undefined,
    datePart: typeof datePart !== "undefined" ? datePart : undefined,
    dateStr: typeof dateStr !== "undefined" ? dateStr : undefined,
    day: typeof day !== "undefined" ? day : undefined,
    dayBlocks: typeof dayBlocks !== "undefined" ? dayBlocks : undefined,
    dayEnd: typeof dayEnd !== "undefined" ? dayEnd : undefined,
    dayLong: typeof dayLong !== "undefined" ? dayLong : undefined,
    dayNames: typeof dayNames !== "undefined" ? dayNames : undefined,
    dayStart: typeof dayStart !== "undefined" ? dayStart : undefined,
    days: typeof days !== "undefined" ? days : undefined,
    daysLeft: typeof daysLeft !== "undefined" ? daysLeft : undefined,
    daysSince: typeof daysSince !== "undefined" ? daysSince : undefined,
    decorated: typeof decorated !== "undefined" ? decorated : undefined,
    decoratedContacts: typeof decoratedContacts !== "undefined" ? decoratedContacts : undefined,
    deleteCat: typeof deleteCat !== "undefined" ? deleteCat : undefined,
    deleteChat: typeof deleteChat !== "undefined" ? deleteChat : undefined,
    deleteDraft: typeof deleteDraft !== "undefined" ? deleteDraft : undefined,
    deleteEntry: typeof deleteEntry !== "undefined" ? deleteEntry : undefined,
    deleteItem: typeof deleteItem !== "undefined" ? deleteItem : undefined,
    demotedIds: typeof demotedIds !== "undefined" ? demotedIds : undefined,
    desc: typeof desc !== "undefined" ? desc : undefined,
    di: typeof di !== "undefined" ? di : undefined,
    dir: typeof dir !== "undefined" ? dir : undefined,
    dismissAllMissed: typeof dismissAllMissed !== "undefined" ? dismissAllMissed : undefined,
    dismissMissed: typeof dismissMissed !== "undefined" ? dismissMissed : undefined,
    dmKey: typeof dmKey !== "undefined" ? dmKey : undefined,
    done: typeof done !== "undefined" ? done : undefined,
    dot: typeof dot !== "undefined" ? dot : undefined,
    draftAdmins: typeof draftAdmins !== "undefined" ? draftAdmins : undefined,
    draftGroupId: typeof draftGroupId !== "undefined" ? draftGroupId : undefined,
    draftHasAdmin: typeof draftHasAdmin !== "undefined" ? draftHasAdmin : undefined,
    draftMembers: typeof draftMembers !== "undefined" ? draftMembers : undefined,
    draftText: typeof draftText !== "undefined" ? draftText : undefined,
    dt: typeof dt !== "undefined" ? dt : undefined,
    dur: typeof dur !== "undefined" ? dur : undefined,
    durLabel: typeof durLabel !== "undefined" ? durLabel : undefined,
    durMin: typeof durMin !== "undefined" ? durMin : undefined,
    durMs: typeof durMs !== "undefined" ? durMs : undefined,
    durationSlots: typeof durationSlots !== "undefined" ? durationSlots : undefined,
    e: typeof e !== "undefined" ? e : undefined,
    editingDraft: typeof editingDraft !== "undefined" ? editingDraft : undefined,
    editingMsgId: typeof editingMsgId !== "undefined" ? editingMsgId : undefined,
    editingTplType: typeof editingTplType !== "undefined" ? editingTplType : undefined,
    emoji: typeof emoji !== "undefined" ? emoji : undefined,
    emojiPickerForMsg: typeof emojiPickerForMsg !== "undefined" ? emojiPickerForMsg : undefined,
    end: typeof end !== "undefined" ? end : undefined,
    endISO: typeof endISO !== "undefined" ? endISO : undefined,
    enrolled: typeof enrolled !== "undefined" ? enrolled : undefined,
    entries: typeof entries !== "undefined" ? entries : undefined,
    entry: typeof entry !== "undefined" ? entry : undefined,
    entryId: typeof entryId !== "undefined" ? entryId : undefined,
    ev: typeof ev !== "undefined" ? ev : undefined,
    events: typeof events !== "undefined" ? events : undefined,
    ex: typeof ex !== "undefined" ? ex : undefined,
    existingMessages: typeof existingMessages !== "undefined" ? existingMessages : undefined,
    expandedBlocks: typeof expandedBlocks !== "undefined" ? expandedBlocks : undefined,
    expandedCat: typeof expandedCat !== "undefined" ? expandedCat : undefined,
    f: typeof f !== "undefined" ? f : undefined,
    fType: typeof fType !== "undefined" ? fType : undefined,
    feedAcknowledge: typeof feedAcknowledge !== "undefined" ? feedAcknowledge : undefined,
    feedAddComment: typeof feedAddComment !== "undefined" ? feedAddComment : undefined,
    feedCommentDraftByPost: typeof feedCommentDraftByPost !== "undefined" ? feedCommentDraftByPost : undefined,
    feedComposeExpanded: typeof feedComposeExpanded !== "undefined" ? feedComposeExpanded : undefined,
    feedComposerCollapse: typeof feedComposerCollapse !== "undefined" ? feedComposerCollapse : undefined,
    feedComposerSetFeeling: typeof feedComposerSetFeeling !== "undefined" ? feedComposerSetFeeling : undefined,
    feedComposerSetLocation: typeof feedComposerSetLocation !== "undefined" ? feedComposerSetLocation : undefined,
    feedComposerSheet: typeof feedComposerSheet !== "undefined" ? feedComposerSheet : undefined,
    feedComposerTogglePhoto: typeof feedComposerTogglePhoto !== "undefined" ? feedComposerTogglePhoto : undefined,
    feedComposerToggleTag: typeof feedComposerToggleTag !== "undefined" ? feedComposerToggleTag : undefined,
    feedDraft: typeof feedDraft !== "undefined" ? feedDraft : undefined,
    feedExpandedComments: typeof feedExpandedComments !== "undefined" ? feedExpandedComments : undefined,
    feedPosts: typeof feedPosts !== "undefined" ? feedPosts : undefined,
    feedPublish: typeof feedPublish !== "undefined" ? feedPublish : undefined,
    feedReact: typeof feedReact !== "undefined" ? feedReact : undefined,
    feedReactionPickerOpen: typeof feedReactionPickerOpen !== "undefined" ? feedReactionPickerOpen : undefined,
    feedScope: typeof feedScope !== "undefined" ? feedScope : undefined,
    feedSearch: typeof feedSearch !== "undefined" ? feedSearch : undefined,
    feedTagSearch: typeof feedTagSearch !== "undefined" ? feedTagSearch : undefined,
    feedToggleComments: typeof feedToggleComments !== "undefined" ? feedToggleComments : undefined,
    feedTogglePin: typeof feedTogglePin !== "undefined" ? feedTogglePin : undefined,
    field: typeof field !== "undefined" ? field : undefined,
    fieldStyle: typeof fieldStyle !== "undefined" ? fieldStyle : undefined,
    fields: typeof fields !== "undefined" ? fields : undefined,
    filled: typeof filled !== "undefined" ? filled : undefined,
    filter: typeof filter !== "undefined" ? filter : undefined,
    filteredApps: typeof filteredApps !== "undefined" ? filteredApps : undefined,
    filteredContacts: typeof filteredContacts !== "undefined" ? filteredContacts : undefined,
    filteredGroups: typeof filteredGroups !== "undefined" ? filteredGroups : undefined,
    findUser: typeof findUser !== "undefined" ? findUser : undefined,
    first: typeof first !== "undefined" ? first : undefined,
    fmtH: typeof fmtH !== "undefined" ? fmtH : undefined,
    focusHours: typeof focusHours !== "undefined" ? focusHours : undefined,
    forYouCount: typeof forYouCount !== "undefined" ? forYouCount : undefined,
    fromMe: typeof fromMe !== "undefined" ? fromMe : undefined,
    ft: typeof ft !== "undefined" ? ft : undefined,
    fullyFree: typeof fullyFree !== "undefined" ? fullyFree : undefined,
    g: typeof g !== "undefined" ? g : undefined,
    getCatData: typeof getCatData !== "undefined" ? getCatData : undefined,
    getGroupIcon: typeof getGroupIcon !== "undefined" ? getGroupIcon : undefined,
    getMonday: typeof getMonday !== "undefined" ? getMonday : undefined,
    goToday: typeof goToday !== "undefined" ? goToday : undefined,
    group: typeof group !== "undefined" ? group : undefined,
    groupApplySuggestion: typeof groupApplySuggestion !== "undefined" ? groupApplySuggestion : undefined,
    groupBackToParticipants: typeof groupBackToParticipants !== "undefined" ? groupBackToParticipants : undefined,
    groupBackToScheduling: typeof groupBackToScheduling !== "undefined" ? groupBackToScheduling : undefined,
    groupBeginDrag: typeof groupBeginDrag !== "undefined" ? groupBeginDrag : undefined,
    groupCalendars: typeof groupCalendars !== "undefined" ? groupCalendars : undefined,
    groupConflictExpanded: typeof groupConflictExpanded !== "undefined" ? groupConflictExpanded : undefined,
    groupDetails: typeof groupDetails !== "undefined" ? groupDetails : undefined,
    groupDuration: typeof groupDuration !== "undefined" ? groupDuration : undefined,
    groupEndDrag: typeof groupEndDrag !== "undefined" ? groupEndDrag : undefined,
    groupExtendDrag: typeof groupExtendDrag !== "undefined" ? groupExtendDrag : undefined,
    groupGoToConfirmation: typeof groupGoToConfirmation !== "undefined" ? groupGoToConfirmation : undefined,
    groupGoToDetails: typeof groupGoToDetails !== "undefined" ? groupGoToDetails : undefined,
    groupGoToScheduling: typeof groupGoToScheduling !== "undefined" ? groupGoToScheduling : undefined,
    groupHoverCell: typeof groupHoverCell !== "undefined" ? groupHoverCell : undefined,
    groupParticipantSearch: typeof groupParticipantSearch !== "undefined" ? groupParticipantSearch : undefined,
    groupParticipants: typeof groupParticipants !== "undefined" ? groupParticipants : undefined,
    groupResetWizard: typeof groupResetWizard !== "undefined" ? groupResetWizard : undefined,
    groupScheduleMeeting: typeof groupScheduleMeeting !== "undefined" ? groupScheduleMeeting : undefined,
    groupScheduledMeeting: typeof groupScheduledMeeting !== "undefined" ? groupScheduledMeeting : undefined,
    groupSelection: typeof groupSelection !== "undefined" ? groupSelection : undefined,
    groupStep: typeof groupStep !== "undefined" ? groupStep : undefined,
    groupViewMeeting: typeof groupViewMeeting !== "undefined" ? groupViewMeeting : undefined,
    grouped: typeof grouped !== "undefined" ? grouped : undefined,
    h: typeof h !== "undefined" ? h : undefined,
    half: typeof half !== "undefined" ? half : undefined,
    handleCancel: typeof handleCancel !== "undefined" ? handleCancel : undefined,
    handleDragEnd: typeof handleDragEnd !== "undefined" ? handleDragEnd : undefined,
    handleDragOver: typeof handleDragOver !== "undefined" ? handleDragOver : undefined,
    handleDragStart: typeof handleDragStart !== "undefined" ? handleDragStart : undefined,
    handleDrop: typeof handleDrop !== "undefined" ? handleDrop : undefined,
    handleLeaveConfirm: typeof handleLeaveConfirm !== "undefined" ? handleLeaveConfirm : undefined,
    handleSave: typeof handleSave !== "undefined" ? handleSave : undefined,
    handleSlotClick: typeof handleSlotClick !== "undefined" ? handleSlotClick : undefined,
    handleToggle: typeof handleToggle !== "undefined" ? handleToggle : undefined,
    handleToggleMenu: typeof handleToggleMenu !== "undefined" ? handleToggleMenu : undefined,
    hasAway: typeof hasAway !== "undefined" ? hasAway : undefined,
    hasBusy: typeof hasBusy !== "undefined" ? hasBusy : undefined,
    hasChanges: typeof hasChanges !== "undefined" ? hasChanges : undefined,
    hasConflict: typeof hasConflict !== "undefined" ? hasConflict : undefined,
    hasHistory: typeof hasHistory !== "undefined" ? hasHistory : undefined,
    hasOoh: typeof hasOoh !== "undefined" ? hasOoh : undefined,
    hasRecipient: typeof hasRecipient !== "undefined" ? hasRecipient : undefined,
    hasTentative: typeof hasTentative !== "undefined" ? hasTentative : undefined,
    headerMenuRef: typeof headerMenuRef !== "undefined" ? headerMenuRef : undefined,
    horizon: typeof horizon !== "undefined" ? horizon : undefined,
    hour: typeof hour !== "undefined" ? hour : undefined,
    hourHeight: typeof hourHeight !== "undefined" ? hourHeight : undefined,
    hoverBg: typeof hoverBg !== "undefined" ? hoverBg : undefined,
    hoveredMsgId: typeof hoveredMsgId !== "undefined" ? hoveredMsgId : undefined,
    hr: typeof hr !== "undefined" ? hr : undefined,
    i: typeof i !== "undefined" ? i : undefined,
    iAmAdmin: typeof iAmAdmin !== "undefined" ? iAmAdmin : undefined,
    id: typeof id !== "undefined" ? id : undefined,
    idx: typeof idx !== "undefined" ? idx : undefined,
    inMonth: typeof inMonth !== "undefined" ? inMonth : undefined,
    inWH: typeof inWH !== "undefined" ? inWH : undefined,
    inputType: typeof inputType !== "undefined" ? inputType : undefined,
    instances: typeof instances !== "undefined" ? instances : undefined,
    isActive: typeof isActive !== "undefined" ? isActive : undefined,
    isAdding: typeof isAdding !== "undefined" ? isAdding : undefined,
    isAdmin: typeof isAdmin !== "undefined" ? isAdmin : undefined,
    isApp: typeof isApp !== "undefined" ? isApp : undefined,
    isAppGroup: typeof isAppGroup !== "undefined" ? isAppGroup : undefined,
    isAuthor: typeof isAuthor !== "undefined" ? isAuthor : undefined,
    isCustom: typeof isCustom !== "undefined" ? isCustom : undefined,
    isDemoted: typeof isDemoted !== "undefined" ? isDemoted : undefined,
    isDragOver: typeof isDragOver !== "undefined" ? isDragOver : undefined,
    isDragging: typeof isDragging !== "undefined" ? isDragging : undefined,
    isExpanded: typeof isExpanded !== "undefined" ? isExpanded : undefined,
    isGroup: typeof isGroup !== "undefined" ? isGroup : undefined,
    isGroupAdmin: typeof isGroupAdmin !== "undefined" ? isGroupAdmin : undefined,
    isGroupMt: typeof isGroupMt !== "undefined" ? isGroupMt : undefined,
    isHourMark: typeof isHourMark !== "undefined" ? isHourMark : undefined,
    isHovered: typeof isHovered !== "undefined" ? isHovered : undefined,
    isLastDraftAdmin: typeof isLastDraftAdmin !== "undefined" ? isLastDraftAdmin : undefined,
    isLinkedIn: typeof isLinkedIn !== "undefined" ? isLinkedIn : undefined,
    isMe: typeof isMe !== "undefined" ? isMe : undefined,
    isMemberAdmin: typeof isMemberAdmin !== "undefined" ? isMemberAdmin : undefined,
    isMute: typeof isMute !== "undefined" ? isMute : undefined,
    isNew: typeof isNew !== "undefined" ? isNew : undefined,
    isNewlyAdded: typeof isNewlyAdded !== "undefined" ? isNewlyAdded : undefined,
    isOffer: typeof isOffer !== "undefined" ? isOffer : undefined,
    isOpen: typeof isOpen !== "undefined" ? isOpen : undefined,
    isOrganizer: typeof isOrganizer !== "undefined" ? isOrganizer : undefined,
    isPast: typeof isPast !== "undefined" ? isPast : undefined,
    isPromoted: typeof isPromoted !== "undefined" ? isPromoted : undefined,
    isReady: typeof isReady !== "undefined" ? isReady : undefined,
    isShared: typeof isShared !== "undefined" ? isShared : undefined,
    isStudent: typeof isStudent !== "undefined" ? isStudent : undefined,
    isToday: typeof isToday !== "undefined" ? isToday : undefined,
    isToday2: typeof isToday2 !== "undefined" ? isToday2 : undefined,
    isUnread: typeof isUnread !== "undefined" ? isUnread : undefined,
    isUrgent: typeof isUrgent !== "undefined" ? isUrgent : undefined,
    isoStr: typeof isoStr !== "undefined" ? isoStr : undefined,
    it: typeof it !== "undefined" ? it : undefined,
    item: typeof item !== "undefined" ? item : undefined,
    itemId: typeof itemId !== "undefined" ? itemId : undefined,
    items: typeof items !== "undefined" ? items : undefined,
    k: typeof k !== "undefined" ? k : undefined,
    key: typeof key !== "undefined" ? key : undefined,
    keys: typeof keys !== "undefined" ? keys : undefined,
    kind: typeof kind !== "undefined" ? kind : undefined,
    kpis: typeof kpis !== "undefined" ? kpis : undefined,
    l: typeof l !== "undefined" ? l : undefined,
    label: typeof label !== "undefined" ? label : undefined,
    labelStyle: typeof labelStyle !== "undefined" ? labelStyle : undefined,
    lbl: typeof lbl !== "undefined" ? lbl : undefined,
    leaveGroup: typeof leaveGroup !== "undefined" ? leaveGroup : undefined,
    leftSummary: typeof leftSummary !== "undefined" ? leftSummary : undefined,
    line: typeof line !== "undefined" ? line : undefined,
    link: typeof link !== "undefined" ? link : undefined,
    list: typeof list !== "undefined" ? list : undefined,
    loc: typeof loc !== "undefined" ? loc : undefined,
    logs: typeof logs !== "undefined" ? logs : undefined,
    m: typeof m !== "undefined" ? m : undefined,
    matches: typeof matches !== "undefined" ? matches : undefined,
    maxAmount: typeof maxAmount !== "undefined" ? maxAmount : undefined,
    maxP: typeof maxP !== "undefined" ? maxP : undefined,
    me: typeof me !== "undefined" ? me : undefined,
    meetingBlocks: typeof meetingBlocks !== "undefined" ? meetingBlocks : undefined,
    meetingCount: typeof meetingCount !== "undefined" ? meetingCount : undefined,
    meetingDuration: typeof meetingDuration !== "undefined" ? meetingDuration : undefined,
    meetingMode: typeof meetingMode !== "undefined" ? meetingMode : undefined,
    meetings: typeof meetings !== "undefined" ? meetings : undefined,
    memberMenuOpen: typeof memberMenuOpen !== "undefined" ? memberMenuOpen : undefined,
    memberToast: typeof memberToast !== "undefined" ? memberToast : undefined,
    memberUsers: typeof memberUsers !== "undefined" ? memberUsers : undefined,
    menuOpen: typeof menuOpen !== "undefined" ? menuOpen : undefined,
    message: typeof message !== "undefined" ? message : undefined,
    messages: typeof messages !== "undefined" ? messages : undefined,
    messagesEndRef: typeof messagesEndRef !== "undefined" ? messagesEndRef : undefined,
    meta: typeof meta !== "undefined" ? meta : undefined,
    min: typeof min !== "undefined" ? min : undefined,
    minDate: typeof minDate !== "undefined" ? minDate : undefined,
    minDateTime: typeof minDateTime !== "undefined" ? minDateTime : undefined,
    mine: typeof mine !== "undefined" ? mine : undefined,
    missedItems: typeof missedItems !== "undefined" ? missedItems : undefined,
    mode: typeof mode !== "undefined" ? mode : undefined,
    mon: typeof mon !== "undefined" ? mon : undefined,
    monthNames: typeof monthNames !== "undefined" ? monthNames : undefined,
    moved: typeof moved !== "undefined" ? moved : undefined,
    ms: typeof ms !== "undefined" ? ms : undefined,
    msSince: typeof msSince !== "undefined" ? msSince : undefined,
    msg: typeof msg !== "undefined" ? msg : undefined,
    msgMenuOpen: typeof msgMenuOpen !== "undefined" ? msgMenuOpen : undefined,
    msgs: typeof msgs !== "undefined" ? msgs : undefined,
    mt: typeof mt !== "undefined" ? mt : undefined,
    myAck: typeof myAck !== "undefined" ? myAck : undefined,
    myArchived: typeof myArchived !== "undefined" ? myArchived : undefined,
    myAttendee: typeof myAttendee !== "undefined" ? myAttendee : undefined,
    myBookmarks: typeof myBookmarks !== "undefined" ? myBookmarks : undefined,
    myCount: typeof myCount !== "undefined" ? myCount : undefined,
    myFavourites: typeof myFavourites !== "undefined" ? myFavourites : undefined,
    myReaction: typeof myReaction !== "undefined" ? myReaction : undefined,
    myReactions: typeof myReactions !== "undefined" ? myReactions : undefined,
    myScheduledPosts: typeof myScheduledPosts !== "undefined" ? myScheduledPosts : undefined,
    myStatus: typeof myStatus !== "undefined" ? myStatus : undefined,
    n: typeof n !== "undefined" ? n : undefined,
    name: typeof name !== "undefined" ? name : undefined,
    navigate: typeof navigate !== "undefined" ? navigate : undefined,
    newCourses: typeof newCourses !== "undefined" ? newCourses : undefined,
    newEnd: typeof newEnd !== "undefined" ? newEnd : undefined,
    newField: typeof newField !== "undefined" ? newField : undefined,
    newFieldDraft: typeof newFieldDraft !== "undefined" ? newFieldDraft : undefined,
    newStart: typeof newStart !== "undefined" ? newStart : undefined,
    newTopicInput: typeof newTopicInput !== "undefined" ? newTopicInput : undefined,
    newTplDraft: typeof newTplDraft !== "undefined" ? newTplDraft : undefined,
    newType: typeof newType !== "undefined" ? newType : undefined,
    newUniversities: typeof newUniversities !== "undefined" ? newUniversities : undefined,
    newlyAddedCount: typeof newlyAddedCount !== "undefined" ? newlyAddedCount : undefined,
    noCommonOverlap: typeof noCommonOverlap !== "undefined" ? noCommonOverlap : undefined,
    nonRecurring: typeof nonRecurring !== "undefined" ? nonRecurring : undefined,
    notifyMemberEvent: typeof notifyMemberEvent !== "undefined" ? notifyMemberEvent : undefined,
    now: typeof now !== "undefined" ? now : undefined,
    num: typeof num !== "undefined" ? num : undefined,
    o: typeof o !== "undefined" ? o : undefined,
    oEnd: typeof oEnd !== "undefined" ? oEnd : undefined,
    oStart: typeof oStart !== "undefined" ? oStart : undefined,
    ok: typeof ok !== "undefined" ? ok : undefined,
    oldEnd: typeof oldEnd !== "undefined" ? oldEnd : undefined,
    oldStart: typeof oldStart !== "undefined" ? oldStart : undefined,
    on: typeof on !== "undefined" ? on : undefined,
    onCancel: typeof onCancel !== "undefined" ? onCancel : undefined,
    onClick: typeof onClick !== "undefined" ? onClick : undefined,
    onConfirm: typeof onConfirm !== "undefined" ? onConfirm : undefined,
    onMsgEnter: typeof onMsgEnter !== "undefined" ? onMsgEnter : undefined,
    onMsgLeave: typeof onMsgLeave !== "undefined" ? onMsgLeave : undefined,
    onlyAdding: typeof onlyAdding !== "undefined" ? onlyAdding : undefined,
    onlyAdminChg: typeof onlyAdminChg !== "undefined" ? onlyAdminChg : undefined,
    onlyRemoving: typeof onlyRemoving !== "undefined" ? onlyRemoving : undefined,
    openAddCat: typeof openAddCat !== "undefined" ? openAddCat : undefined,
    openAddItem: typeof openAddItem !== "undefined" ? openAddItem : undefined,
    openBookingFromChat: typeof openBookingFromChat !== "undefined" ? openBookingFromChat : undefined,
    openCenter: typeof openCenter !== "undefined" ? openCenter : undefined,
    openCompose: typeof openCompose !== "undefined" ? openCompose : undefined,
    openCreate: typeof openCreate !== "undefined" ? openCreate : undefined,
    openEdit: typeof openEdit !== "undefined" ? openEdit : undefined,
    openEditCat: typeof openEditCat !== "undefined" ? openEditCat : undefined,
    openEditItem: typeof openEditItem !== "undefined" ? openEditItem : undefined,
    openGroup: typeof openGroup !== "undefined" ? openGroup : undefined,
    openMembersPanel: typeof openMembersPanel !== "undefined" ? openMembersPanel : undefined,
    openTemplatesWizard: typeof openTemplatesWizard !== "undefined" ? openTemplatesWizard : undefined,
    opt: typeof opt !== "undefined" ? opt : undefined,
    original: typeof original !== "undefined" ? original : undefined,
    originalAdmins: typeof originalAdmins !== "undefined" ? originalAdmins : undefined,
    originalDeleted: typeof originalDeleted !== "undefined" ? originalDeleted : undefined,
    originalMembers: typeof originalMembers !== "undefined" ? originalMembers : undefined,
    otherAttendee: typeof otherAttendee !== "undefined" ? otherAttendee : undefined,
    otherAttendees: typeof otherAttendees !== "undefined" ? otherAttendees : undefined,
    overflow: typeof overflow !== "undefined" ? overflow : undefined,
    overlap: typeof overlap !== "undefined" ? overlap : undefined,
    overlaps: typeof overlaps !== "undefined" ? overlaps : undefined,
    p: typeof p !== "undefined" ? p : undefined,
    pad: typeof pad !== "undefined" ? pad : undefined,
    pad2: typeof pad2 !== "undefined" ? pad2 : undefined,
    paraStyle: typeof paraStyle !== "undefined" ? paraStyle : undefined,
    parseLocalInput: typeof parseLocalInput !== "undefined" ? parseLocalInput : undefined,
    parseTime: typeof parseTime !== "undefined" ? parseTime : undefined,
    past: typeof past !== "undefined" ? past : undefined,
    pastCount: typeof pastCount !== "undefined" ? pastCount : undefined,
    patch: typeof patch !== "undefined" ? patch : undefined,
    pendingCount: typeof pendingCount !== "undefined" ? pendingCount : undefined,
    period: typeof period !== "undefined" ? period : undefined,
    ph: typeof ph !== "undefined" ? ph : undefined,
    pickComposeContact: typeof pickComposeContact !== "undefined" ? pickComposeContact : undefined,
    picked: typeof picked !== "undefined" ? picked : undefined,
    pickerOpen: typeof pickerOpen !== "undefined" ? pickerOpen : undefined,
    pickerSearch: typeof pickerSearch !== "undefined" ? pickerSearch : undefined,
    pillActive: typeof pillActive !== "undefined" ? pillActive : undefined,
    pillFailed: typeof pillFailed !== "undefined" ? pillFailed : undefined,
    pillPaused: typeof pillPaused !== "undefined" ? pillPaused : undefined,
    pillSuccess: typeof pillSuccess !== "undefined" ? pillSuccess : undefined,
    pinned: typeof pinned !== "undefined" ? pinned : undefined,
    placeholders: typeof placeholders !== "undefined" ? placeholders : undefined,
    platformColor: typeof platformColor !== "undefined" ? platformColor : undefined,
    post: typeof post !== "undefined" ? post : undefined,
    prettyDate: typeof prettyDate !== "undefined" ? prettyDate : undefined,
    prev: typeof prev !== "undefined" ? prev : undefined,
    prevDur: typeof prevDur !== "undefined" ? prevDur : undefined,
    preview: typeof preview !== "undefined" ? preview : undefined,
    primaryAction: typeof primaryAction !== "undefined" ? primaryAction : undefined,
    primaryDisabled: typeof primaryDisabled !== "undefined" ? primaryDisabled : undefined,
    primaryHelp: typeof primaryHelp !== "undefined" ? primaryHelp : undefined,
    primaryIcon: typeof primaryIcon !== "undefined" ? primaryIcon : undefined,
    primaryLabel: typeof primaryLabel !== "undefined" ? primaryLabel : undefined,
    promoCategories: typeof promoCategories !== "undefined" ? promoCategories : undefined,
    promoDraft: typeof promoDraft !== "undefined" ? promoDraft : undefined,
    promoDragIdx: typeof promoDragIdx !== "undefined" ? promoDragIdx : undefined,
    promoDragOverIdx: typeof promoDragOverIdx !== "undefined" ? promoDragOverIdx : undefined,
    promoDrawer: typeof promoDrawer !== "undefined" ? promoDrawer : undefined,
    promoExpandedCat: typeof promoExpandedCat !== "undefined" ? promoExpandedCat : undefined,
    promoTab: typeof promoTab !== "undefined" ? promoTab : undefined,
    promotedIds: typeof promotedIds !== "undefined" ? promotedIds : undefined,
    promotedMarketingEvents: typeof promotedMarketingEvents !== "undefined" ? promotedMarketingEvents : undefined,
    q: typeof q !== "undefined" ? q : undefined,
    r: typeof r !== "undefined" ? r : undefined,
    recencyScore: typeof recencyScore !== "undefined" ? recencyScore : undefined,
    recruitChip: typeof recruitChip !== "undefined" ? recruitChip : undefined,
    rejectMeeting: typeof rejectMeeting !== "undefined" ? rejectMeeting : undefined,
    rejectedCount: typeof rejectedCount !== "undefined" ? rejectedCount : undefined,
    remaining: typeof remaining !== "undefined" ? remaining : undefined,
    removeFieldFromDraft: typeof removeFieldFromDraft !== "undefined" ? removeFieldFromDraft : undefined,
    removeGroupParticipant: typeof removeGroupParticipant !== "undefined" ? removeGroupParticipant : undefined,
    removedIds: typeof removedIds !== "undefined" ? removedIds : undefined,
    renderRow: typeof renderRow !== "undefined" ? renderRow : undefined,
    renderTemplatesMenu: typeof renderTemplatesMenu !== "undefined" ? renderTemplatesMenu : undefined,
    reordered: typeof reordered !== "undefined" ? reordered : undefined,
    replyTo: typeof replyTo !== "undefined" ? replyTo : undefined,
    replyingToByChat: typeof replyingToByChat !== "undefined" ? replyingToByChat : undefined,
    requestAdminRemoveMessage: typeof requestAdminRemoveMessage !== "undefined" ? requestAdminRemoveMessage : undefined,
    requestDeleteArchivedChat: typeof requestDeleteArchivedChat !== "undefined" ? requestDeleteArchivedChat : undefined,
    requestDeleteMessage: typeof requestDeleteMessage !== "undefined" ? requestDeleteMessage : undefined,
    requestUnarchive: typeof requestUnarchive !== "undefined" ? requestUnarchive : undefined,
    resolvePlaceholders: typeof resolvePlaceholders !== "undefined" ? resolvePlaceholders : undefined,
    resolveTemplate: typeof resolveTemplate !== "undefined" ? resolveTemplate : undefined,
    restCount: typeof restCount !== "undefined" ? restCount : undefined,
    retryQueue: typeof retryQueue !== "undefined" ? retryQueue : undefined,
    rg: typeof rg !== "undefined" ? rg : undefined,
    rollup: typeof rollup !== "undefined" ? rollup : undefined,
    rollupAvailability: typeof rollupAvailability !== "undefined" ? rollupAvailability : undefined,
    rule: typeof rule !== "undefined" ? rule : undefined,
    s: typeof s !== "undefined" ? s : undefined,
    sameDay: typeof sameDay !== "undefined" ? sameDay : undefined,
    sample: typeof sample !== "undefined" ? sample : undefined,
    saveAccent: typeof saveAccent !== "undefined" ? saveAccent : undefined,
    saveAccentHover: typeof saveAccentHover !== "undefined" ? saveAccentHover : undefined,
    saveCustomTemplate: typeof saveCustomTemplate !== "undefined" ? saveCustomTemplate : undefined,
    saveDraft: typeof saveDraft !== "undefined" ? saveDraft : undefined,
    saveDrawer: typeof saveDrawer !== "undefined" ? saveDrawer : undefined,
    saveEditMessage: typeof saveEditMessage !== "undefined" ? saveEditMessage : undefined,
    saveLabel: typeof saveLabel !== "undefined" ? saveLabel : undefined,
    saveNewEntry: typeof saveNewEntry !== "undefined" ? saveNewEntry : undefined,
    savedAvail: typeof savedAvail !== "undefined" ? savedAvail : undefined,
    savedCount: typeof savedCount !== "undefined" ? savedCount : undefined,
    schedBlocks: typeof schedBlocks !== "undefined" ? schedBlocks : undefined,
    schedDate: typeof schedDate !== "undefined" ? schedDate : undefined,
    schedDraft: typeof schedDraft !== "undefined" ? schedDraft : undefined,
    schedDrawerOpen: typeof schedDrawerOpen !== "undefined" ? schedDrawerOpen : undefined,
    schedFilters: typeof schedFilters !== "undefined" ? schedFilters : undefined,
    schedSelected: typeof schedSelected !== "undefined" ? schedSelected : undefined,
    schedSettings: typeof schedSettings !== "undefined" ? schedSettings : undefined,
    schedView: typeof schedView !== "undefined" ? schedView : undefined,
    schedViewUserId: typeof schedViewUserId !== "undefined" ? schedViewUserId : undefined,
    scheduleDate: typeof scheduleDate !== "undefined" ? scheduleDate : undefined,
    scheduleEnabled: typeof scheduleEnabled !== "undefined" ? scheduleEnabled : undefined,
    schedulePost: typeof schedulePost !== "undefined" ? schedulePost : undefined,
    scheduleTime: typeof scheduleTime !== "undefined" ? scheduleTime : undefined,
    scheduledTab: typeof scheduledTab !== "undefined" ? scheduledTab : undefined,
    secStyle: typeof secStyle !== "undefined" ? secStyle : undefined,
    seeMoreLabels: typeof seeMoreLabels !== "undefined" ? seeMoreLabels : undefined,
    sel: typeof sel !== "undefined" ? sel : undefined,
    selected: typeof selected !== "undefined" ? selected : undefined,
    selectedApp: typeof selectedApp !== "undefined" ? selectedApp : undefined,
    selectedDate: typeof selectedDate !== "undefined" ? selectedDate : undefined,
    selectedSlot: typeof selectedSlot !== "undefined" ? selectedSlot : undefined,
    selectedTopicId: typeof selectedTopicId !== "undefined" ? selectedTopicId : undefined,
    settingsSubItem: typeof settingsSubItem !== "undefined" ? settingsSubItem : undefined,
    sendApplication: typeof sendApplication !== "undefined" ? sendApplication : undefined,
    sendComposed: typeof sendComposed !== "undefined" ? sendComposed : undefined,
    sendMessage: typeof sendMessage !== "undefined" ? sendMessage : undefined,
    sender: typeof sender !== "undefined" ? sender : undefined,
    setActiveChatId: typeof setActiveChatId !== "undefined" ? setActiveChatId : undefined,
    setActivePage: typeof setActivePage !== "undefined" ? setActivePage : undefined,
    setAddingTopicTo: typeof setAddingTopicTo !== "undefined" ? setAddingTopicTo : undefined,
    setAppPickerSearch: typeof setAppPickerSearch !== "undefined" ? setAppPickerSearch : undefined,
    setAppSearchQuery: typeof setAppSearchQuery !== "undefined" ? setAppSearchQuery : undefined,
    setAttachMenu: typeof setAttachMenu !== "undefined" ? setAttachMenu : undefined,
    setAvailability: typeof setAvailability !== "undefined" ? setAvailability : undefined,
    setBookingContact: typeof setBookingContact !== "undefined" ? setBookingContact : undefined,
    setBookingSearch: typeof setBookingSearch !== "undefined" ? setBookingSearch : undefined,
    setCalMonth: typeof setCalMonth !== "undefined" ? setCalMonth : undefined,
    setCalYear: typeof setCalYear !== "undefined" ? setCalYear : undefined,
    setCalendarTab: typeof setCalendarTab !== "undefined" ? setCalendarTab : undefined,
    setChatRowMenuOpen: typeof setChatRowMenuOpen !== "undefined" ? setChatRowMenuOpen : undefined,
    setChatSearch: typeof setChatSearch !== "undefined" ? setChatSearch : undefined,
    setChatTab: typeof setChatTab !== "undefined" ? setChatTab : undefined,
    setChatViewMenuOpen: typeof setChatViewMenuOpen !== "undefined" ? setChatViewMenuOpen : undefined,
    setComposeDropdown: typeof setComposeDropdown !== "undefined" ? setComposeDropdown : undefined,
    setComposeQuery: typeof setComposeQuery !== "undefined" ? setComposeQuery : undefined,
    setComposingNew: typeof setComposingNew !== "undefined" ? setComposingNew : undefined,
    setConfirmLeaveGroup: typeof setConfirmLeaveGroup !== "undefined" ? setConfirmLeaveGroup : undefined,
    setContentPrefs: typeof setContentPrefs !== "undefined" ? setContentPrefs : undefined,
    setCreateGroupOpen: typeof setCreateGroupOpen !== "undefined" ? setCreateGroupOpen : undefined,
    setCustomDepts: typeof setCustomDepts !== "undefined" ? setCustomDepts : undefined,
    setCustomTopics: typeof setCustomTopics !== "undefined" ? setCustomTopics : undefined,
    setCustomTplTypes: typeof setCustomTplTypes !== "undefined" ? setCustomTplTypes : undefined,
    setDraftAdmins: typeof setDraftAdmins !== "undefined" ? setDraftAdmins : undefined,
    setDraftGroupId: typeof setDraftGroupId !== "undefined" ? setDraftGroupId : undefined,
    setDraftMembers: typeof setDraftMembers !== "undefined" ? setDraftMembers : undefined,
    setDraftText: typeof setDraftText !== "undefined" ? setDraftText : undefined,
    setEditingDraft: typeof setEditingDraft !== "undefined" ? setEditingDraft : undefined,
    setEditingTplType: typeof setEditingTplType !== "undefined" ? setEditingTplType : undefined,
    setEmojiPickerForMsg: typeof setEmojiPickerForMsg !== "undefined" ? setEmojiPickerForMsg : undefined,
    setExpandedCat: typeof setExpandedCat !== "undefined" ? setExpandedCat : undefined,
    setFeedCommentDraftByPost: typeof setFeedCommentDraftByPost !== "undefined" ? setFeedCommentDraftByPost : undefined,
    setFeedComposeExpanded: typeof setFeedComposeExpanded !== "undefined" ? setFeedComposeExpanded : undefined,
    setFeedComposerSheet: typeof setFeedComposerSheet !== "undefined" ? setFeedComposerSheet : undefined,
    setFeedDraft: typeof setFeedDraft !== "undefined" ? setFeedDraft : undefined,
    setFeedReactionPickerOpen: typeof setFeedReactionPickerOpen !== "undefined" ? setFeedReactionPickerOpen : undefined,
    setFeedScope: typeof setFeedScope !== "undefined" ? setFeedScope : undefined,
    setFeedSearch: typeof setFeedSearch !== "undefined" ? setFeedSearch : undefined,
    setFeedTagSearch: typeof setFeedTagSearch !== "undefined" ? setFeedTagSearch : undefined,
    setGroupConflictExpanded: typeof setGroupConflictExpanded !== "undefined" ? setGroupConflictExpanded : undefined,
    setGroupDetails: typeof setGroupDetails !== "undefined" ? setGroupDetails : undefined,
    setGroupDuration: typeof setGroupDuration !== "undefined" ? setGroupDuration : undefined,
    setGroupHoverCell: typeof setGroupHoverCell !== "undefined" ? setGroupHoverCell : undefined,
    setGroupParticipantSearch: typeof setGroupParticipantSearch !== "undefined" ? setGroupParticipantSearch : undefined,
    setGroupSelection: typeof setGroupSelection !== "undefined" ? setGroupSelection : undefined,
    setGroupStep: typeof setGroupStep !== "undefined" ? setGroupStep : undefined,
    setGroups: typeof setGroups !== "undefined" ? setGroups : undefined,
    setHubFeature: typeof setHubFeature !== "undefined" ? setHubFeature : undefined,
    setMeetingDuration: typeof setMeetingDuration !== "undefined" ? setMeetingDuration : undefined,
    setMeetingMode: typeof setMeetingMode !== "undefined" ? setMeetingMode : undefined,
    setMeetings: typeof setMeetings !== "undefined" ? setMeetings : undefined,
    setMemberMenuOpen: typeof setMemberMenuOpen !== "undefined" ? setMemberMenuOpen : undefined,
    setMemberToast: typeof setMemberToast !== "undefined" ? setMemberToast : undefined,
    setMsgMenuOpen: typeof setMsgMenuOpen !== "undefined" ? setMsgMenuOpen : undefined,
    setNewFieldDraft: typeof setNewFieldDraft !== "undefined" ? setNewFieldDraft : undefined,
    setNewTopicInput: typeof setNewTopicInput !== "undefined" ? setNewTopicInput : undefined,
    setNewTplDraft: typeof setNewTplDraft !== "undefined" ? setNewTplDraft : undefined,
    setPickerSearch: typeof setPickerSearch !== "undefined" ? setPickerSearch : undefined,
    setPromoCategories: typeof setPromoCategories !== "undefined" ? setPromoCategories : undefined,
    setPromoCenterFilter: typeof setPromoCenterFilter !== "undefined" ? setPromoCenterFilter : undefined,
    setPromoCenterOpen: typeof setPromoCenterOpen !== "undefined" ? setPromoCenterOpen : undefined,
    setPromoCenterSearch: typeof setPromoCenterSearch !== "undefined" ? setPromoCenterSearch : undefined,
    setPromoDraft: typeof setPromoDraft !== "undefined" ? setPromoDraft : undefined,
    setPromoDragIdx: typeof setPromoDragIdx !== "undefined" ? setPromoDragIdx : undefined,
    setPromoDragOverIdx: typeof setPromoDragOverIdx !== "undefined" ? setPromoDragOverIdx : undefined,
    setPromoDrawer: typeof setPromoDrawer !== "undefined" ? setPromoDrawer : undefined,
    setPromoExpandedCat: typeof setPromoExpandedCat !== "undefined" ? setPromoExpandedCat : undefined,
    setPromoTab: typeof setPromoTab !== "undefined" ? setPromoTab : undefined,
    setReplyTarget: typeof setReplyTarget !== "undefined" ? setReplyTarget : undefined,
    setSavedAvail: typeof setSavedAvail !== "undefined" ? setSavedAvail : undefined,
    setSchedBlocks: typeof setSchedBlocks !== "undefined" ? setSchedBlocks : undefined,
    setSchedDate: typeof setSchedDate !== "undefined" ? setSchedDate : undefined,
    setSchedDraft: typeof setSchedDraft !== "undefined" ? setSchedDraft : undefined,
    setSchedDrawerOpen: typeof setSchedDrawerOpen !== "undefined" ? setSchedDrawerOpen : undefined,
    setSchedFilters: typeof setSchedFilters !== "undefined" ? setSchedFilters : undefined,
    setSchedSelected: typeof setSchedSelected !== "undefined" ? setSchedSelected : undefined,
    setSchedSettings: typeof setSchedSettings !== "undefined" ? setSchedSettings : undefined,
    setSchedView: typeof setSchedView !== "undefined" ? setSchedView : undefined,
    setSchedViewUserId: typeof setSchedViewUserId !== "undefined" ? setSchedViewUserId : undefined,
    setScheduleDate: typeof setScheduleDate !== "undefined" ? setScheduleDate : undefined,
    setScheduleEnabled: typeof setScheduleEnabled !== "undefined" ? setScheduleEnabled : undefined,
    setScheduleTime: typeof setScheduleTime !== "undefined" ? setScheduleTime : undefined,
    setScheduledTab: typeof setScheduledTab !== "undefined" ? setScheduledTab : undefined,
    setSelectedDate: typeof setSelectedDate !== "undefined" ? setSelectedDate : undefined,
    setSelectedSlot: typeof setSelectedSlot !== "undefined" ? setSelectedSlot : undefined,
    setSelectedTopicId: typeof setSelectedTopicId !== "undefined" ? setSelectedTopicId : undefined,
    setSettingsSubItem: typeof setSettingsSubItem !== "undefined" ? setSettingsSubItem : undefined,
    setSharePostTarget: typeof setSharePostTarget !== "undefined" ? setSharePostTarget : undefined,
    setShowAddMemberPicker: typeof setShowAddMemberPicker !== "undefined" ? setShowAddMemberPicker : undefined,
    setShowComposeMenu: typeof setShowComposeMenu !== "undefined" ? setShowComposeMenu : undefined,
    setShowCreateTpl: typeof setShowCreateTpl !== "undefined" ? setShowCreateTpl : undefined,
    setShowHeaderMenu: typeof setShowHeaderMenu !== "undefined" ? setShowHeaderMenu : undefined,
    setShowMembersPanel: typeof setShowMembersPanel !== "undefined" ? setShowMembersPanel : undefined,
    setShowScheduledFlyout: typeof setShowScheduledFlyout !== "undefined" ? setShowScheduledFlyout : undefined,
    setTemplatesMenu: typeof setTemplatesMenu !== "undefined" ? setTemplatesMenu : undefined,
    setTplAddingTo: typeof setTplAddingTo !== "undefined" ? setTplAddingTo : undefined,
    setTplEntries: typeof setTplEntries !== "undefined" ? setTplEntries : undefined,
    setTplNewEntry: typeof setTplNewEntry !== "undefined" ? setTplNewEntry : undefined,
    setWhDrawer: typeof setWhDrawer !== "undefined" ? setWhDrawer : undefined,
    setWhSearch: typeof setWhSearch !== "undefined" ? setWhSearch : undefined,
    setWhTab: typeof setWhTab !== "undefined" ? setWhTab : undefined,
    setWhToast: typeof setWhToast !== "undefined" ? setWhToast : undefined,
    shortUni: typeof shortUni !== "undefined" ? shortUni : undefined,
    showActions: typeof showActions !== "undefined" ? showActions : undefined,
    showAddMemberPicker: typeof showAddMemberPicker !== "undefined" ? showAddMemberPicker : undefined,
    showComposeMenu: typeof showComposeMenu !== "undefined" ? showComposeMenu : undefined,
    showCreateTpl: typeof showCreateTpl !== "undefined" ? showCreateTpl : undefined,
    showHeaderMenu: typeof showHeaderMenu !== "undefined" ? showHeaderMenu : undefined,
    showMembersPanel: typeof showMembersPanel !== "undefined" ? showMembersPanel : undefined,
    showSlots: typeof showSlots !== "undefined" ? showSlots : undefined,
    showToast: typeof showToast !== "undefined" ? showToast : undefined,
    shown: typeof shown !== "undefined" ? shown : undefined,
    slot: typeof slot !== "undefined" ? slot : undefined,
    slotIsSelected: typeof slotIsSelected !== "undefined" ? slotIsSelected : undefined,
    slotLabel: typeof slotLabel !== "undefined" ? slotLabel : undefined,
    slotRangeLabel: typeof slotRangeLabel !== "undefined" ? slotRangeLabel : undefined,
    sorted: typeof sorted !== "undefined" ? sorted : undefined,
    sp: typeof sp !== "undefined" ? sp : undefined,
    st: typeof st !== "undefined" ? st : undefined,
    stageAddMember: typeof stageAddMember !== "undefined" ? stageAddMember : undefined,
    stageDemoteAdmin: typeof stageDemoteAdmin !== "undefined" ? stageDemoteAdmin : undefined,
    stageMakeAdmin: typeof stageMakeAdmin !== "undefined" ? stageMakeAdmin : undefined,
    stageRemoveMember: typeof stageRemoveMember !== "undefined" ? stageRemoveMember : undefined,
    stages: typeof stages !== "undefined" ? stages : undefined,
    start: typeof start !== "undefined" ? start : undefined,
    startDate: typeof startDate !== "undefined" ? startDate : undefined,
    startDay: typeof startDay !== "undefined" ? startDay : undefined,
    startEditMessage: typeof startEditMessage !== "undefined" ? startEditMessage : undefined,
    startISO: typeof startISO !== "undefined" ? startISO : undefined,
    status: typeof status !== "undefined" ? status : undefined,
    step: typeof step !== "undefined" ? step : undefined,
    stepDays: typeof stepDays !== "undefined" ? stepDays : undefined,
    stop: typeof stop !== "undefined" ? stop : undefined,
    studentAllowedIds: typeof studentAllowedIds !== "undefined" ? studentAllowedIds : undefined,
    subField: typeof subField !== "undefined" ? subField : undefined,
    subTabs: typeof subTabs !== "undefined" ? subTabs : undefined,
    subtitle: typeof subtitle !== "undefined" ? subtitle : undefined,
    suggestTimeSlots: typeof suggestTimeSlots !== "undefined" ? suggestTimeSlots : undefined,
    suggestions: typeof suggestions !== "undefined" ? suggestions : undefined,
    sum: typeof sum !== "undefined" ? sum : undefined,
    summary: typeof summary !== "undefined" ? summary : undefined,
    sun: typeof sun !== "undefined" ? sun : undefined,
    t: typeof t !== "undefined" ? t : undefined,
    tabs: typeof tabs !== "undefined" ? tabs : undefined,
    taggedUsers: typeof taggedUsers !== "undefined" ? taggedUsers : undefined,
    target: typeof target !== "undefined" ? target : undefined,
    targetField: typeof targetField !== "undefined" ? targetField : undefined,
    tblHd: typeof tblHd !== "undefined" ? tblHd : undefined,
    tblTd: typeof tblTd !== "undefined" ? tblTd : undefined,
    tdStyle: typeof tdStyle !== "undefined" ? tdStyle : undefined,
    teamCount: typeof teamCount !== "undefined" ? teamCount : undefined,
    templates: typeof templates !== "undefined" ? templates : undefined,
    templatesMenu: typeof templatesMenu !== "undefined" ? templatesMenu : undefined,
    text: typeof text !== "undefined" ? text : undefined,
    thStyle: typeof thStyle !== "undefined" ? thStyle : undefined,
    thisWeekBlocks: typeof thisWeekBlocks !== "undefined" ? thisWeekBlocks : undefined,
    threadId: typeof threadId !== "undefined" ? threadId : undefined,
    timePart: typeof timePart !== "undefined" ? timePart : undefined,
    timeStr: typeof timeStr !== "undefined" ? timeStr : undefined,
    timeStringToMinutesAgo: typeof timeStringToMinutesAgo !== "undefined" ? timeStringToMinutesAgo : undefined,
    title: typeof title !== "undefined" ? title : undefined,
    titleField: typeof titleField !== "undefined" ? titleField : undefined,
    titleText: typeof titleText !== "undefined" ? titleText : undefined,
    toLocalInput: typeof toLocalInput !== "undefined" ? toLocalInput : undefined,
    today: typeof today !== "undefined" ? today : undefined,
    todayBlocks: typeof todayBlocks !== "undefined" ? todayBlocks : undefined,
    todayFree: typeof todayFree !== "undefined" ? todayFree : undefined,
    today_: typeof today_ !== "undefined" ? today_ : undefined,
    toggleBookmark: typeof toggleBookmark !== "undefined" ? toggleBookmark : undefined,
    toggleCatActive: typeof toggleCatActive !== "undefined" ? toggleCatActive : undefined,
    toggleFavourite: typeof toggleFavourite !== "undefined" ? toggleFavourite : undefined,
    toggleGroupParticipant: typeof toggleGroupParticipant !== "undefined" ? toggleGroupParticipant : undefined,
    toggleList: typeof toggleList !== "undefined" ? toggleList : undefined,
    togglePin: typeof togglePin !== "undefined" ? togglePin : undefined,
    toggleReaction: typeof toggleReaction !== "undefined" ? toggleReaction : undefined,
    tooltip: typeof tooltip !== "undefined" ? tooltip : undefined,
    top: typeof top !== "undefined" ? top : undefined,
    topMin: typeof topMin !== "undefined" ? topMin : undefined,
    topic: typeof topic !== "undefined" ? topic : undefined,
    totalAtt: typeof totalAtt !== "undefined" ? totalAtt : undefined,
    totalAudience: typeof totalAudience !== "undefined" ? totalAudience : undefined,
    totalChanges: typeof totalChanges !== "undefined" ? totalChanges : undefined,
    totalCount: typeof totalCount !== "undefined" ? totalCount : undefined,
    totalItems: typeof totalItems !== "undefined" ? totalItems : undefined,
    totalReactions: typeof totalReactions !== "undefined" ? totalReactions : undefined,
    totalWH: typeof totalWH !== "undefined" ? totalWH : undefined,
    tp: typeof tp !== "undefined" ? tp : undefined,
    tpl: typeof tpl !== "undefined" ? tpl : undefined,
    tplAddingTo: typeof tplAddingTo !== "undefined" ? tplAddingTo : undefined,
    tplEntries: typeof tplEntries !== "undefined" ? tplEntries : undefined,
    tplNewEntry: typeof tplNewEntry !== "undefined" ? tplNewEntry : undefined,
    tpls: typeof tpls !== "undefined" ? tpls : undefined,
    triggerReminder: typeof triggerReminder !== "undefined" ? triggerReminder : undefined,
    tt: typeof tt !== "undefined" ? tt : undefined,
    type: typeof type !== "undefined" ? type : undefined,
    typeId: typeof typeId !== "undefined" ? typeId : undefined,
    typeInfo: typeof typeInfo !== "undefined" ? typeInfo : undefined,
    tz: typeof tz !== "undefined" ? tz : undefined,
    u: typeof u !== "undefined" ? u : undefined,
    uid: typeof uid !== "undefined" ? uid : undefined,
    uni: typeof uni !== "undefined" ? uni : undefined,
    universities: typeof universities !== "undefined" ? universities : undefined,
    unpinned: typeof unpinned !== "undefined" ? unpinned : undefined,
    upcomingCount: typeof upcomingCount !== "undefined" ? upcomingCount : undefined,
    upd: typeof upd !== "undefined" ? upd : undefined,
    updatePref: typeof updatePref !== "undefined" ? updatePref : undefined,
    user: typeof user !== "undefined" ? user : undefined,
    userId: typeof userId !== "undefined" ? userId : undefined,
    userIds: typeof userIds !== "undefined" ? userIds : undefined,
    v: typeof v !== "undefined" ? v : undefined,
    val: typeof val !== "undefined" ? val : undefined,
    viewDays: typeof viewDays !== "undefined" ? viewDays : undefined,
    views: typeof views !== "undefined" ? views : undefined,
    visible: typeof visible !== "undefined" ? visible : undefined,
    visibleCommissions: typeof visibleCommissions !== "undefined" ? visibleCommissions : undefined,
    visibleFeedPosts: typeof visibleFeedPosts !== "undefined" ? visibleFeedPosts : undefined,
    visibleMemberIds: typeof visibleMemberIds !== "undefined" ? visibleMemberIds : undefined,
    visibleMembers: typeof visibleMembers !== "undefined" ? visibleMembers : undefined,
    w: typeof w !== "undefined" ? w : undefined,
    wasMemberAdmin: typeof wasMemberAdmin !== "undefined" ? wasMemberAdmin : undefined,
    webhooks: typeof webhooks !== "undefined" ? webhooks : undefined,
    wh: typeof wh !== "undefined" ? wh : undefined,
    whDrawer: typeof whDrawer !== "undefined" ? whDrawer : undefined,
    whEnd: typeof whEnd !== "undefined" ? whEnd : undefined,
    whSearch: typeof whSearch !== "undefined" ? whSearch : undefined,
    whStart: typeof whStart !== "undefined" ? whStart : undefined,
    whTab: typeof whTab !== "undefined" ? whTab : undefined,
    whToast: typeof whToast !== "undefined" ? whToast : undefined,
    when: typeof when !== "undefined" ? when : undefined,
    wizardPickApp: typeof wizardPickApp !== "undefined" ? wizardPickApp : undefined,
    wizardPickTemplate: typeof wizardPickTemplate !== "undefined" ? wizardPickTemplate : undefined,
    wizardPickTopic: typeof wizardPickTopic !== "undefined" ? wizardPickTopic : undefined,
    x: typeof x !== "undefined" ? x : undefined,
    y: typeof y !== "undefined" ? y : undefined,
    renderTeamManagement: () => (
      <TeamManagementApp
        darkMode={darkMode}
        forceTab={
          settingsSubItem === "settings-users"
            ? "Users"
            : settingsSubItem === "settings-permissions"
            ? "Permissions"
            : settingsSubItem === "settings-timezone"
            ? "Timezone Settings"
            : null
        }
      />
    ),
  };

  return (
    <>
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: globalCSS }} />
      <div style={{
        display: "flex", minHeight: "100vh", height: "100vh",
        background: C.bg, color: C.text,
        fontFamily: "'Roboto', system-ui, sans-serif",
      }}>
        {/* Sidebar shows only for CRM. Comms Hub is a standalone app —
            its own HubSubNav (Chats / Bookings / Feed / Settings) is the navigation. */}
        {currentApp === "crm" && FullSidebar()}

        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          {TopBar()}
          <div style={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>
            {/* UAPP Leads — full standalone app */}
            {currentApp === "leads" && LeadsApp()}

            {/* Other placeholder apps (Chat / Knowledge / Website) */}
            {currentApp !== "crm" && currentApp !== "comms" && currentApp !== "leads" && AppPlaceholder()}

            {/* CRM and Comms Hub use the existing flow */}
            {(currentApp === "crm" || currentApp === "comms") && (
              <>
                {activePage === "commission-promotional" && PromotionalCommissionView()}
                {activePage === "uni-list" && UniversitiesView()}
                {activePage === "uni-programs" && ProgramsView()}

                {/* CRM Student module — list view + edit form, controlled by editingStudentId */}
                {currentApp === "crm" && activePage === "student" && (
                  editingStudentId ? StudentEditView() : StudentListView()
                )}

                {activePage !== "communication-hub" &&
                 activePage !== "commission-promotional" &&
                 activePage !== "uni-list" &&
                 activePage !== "uni-programs" &&
                 !(currentApp === "crm" && activePage === "student") && Dashboard()}

                {activePage === "communication-hub" && (
                  <div className="slide-r" style={{ flex: 1, display: "flex", minHeight: 0 }}>
                    {HubSubNav()}

                    {hubFeature === "chats" && (
                      <ChatsModule ctx={moduleContext} />
                    )}

                    {hubFeature === "calendar" && (
                      <BookingsModule ctx={moduleContext} />
                    )}

                    {hubFeature === "availability" && (
                      <MyScheduleModule ctx={moduleContext} />
                    )}

                    {hubFeature === "feed" && (
                      <NewsFeedModule ctx={moduleContext} />
                    )}

                    {hubFeature === "settings" && (
                      <SettingsModule ctx={moduleContext} />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* App-wide modals */}
      {renderCreateGroupModal()}
      {renderBookingConfirmModal()}
      {renderBookmarkToast()}
      {renderScheduledFlyout()}
      {renderCommissionDraft()}
      {renderCommissionToast()}
      {renderUniversityDraft()}
      {renderUniversityToast()}
      {renderCourseDraft()}
      {renderCourseToast()}
      {renderMeetingReminders()}

      {/* ─── Share post to chat modal — DMs + groups, with optional caption ─── */}
      {sharePostTarget && (() => {
        const post = sharePostTarget;
        const author = findUser(post.author);
        const cat = FEED_CATEGORIES[post.category];
        const q = shareToSearch.toLowerCase();
        // Available DM targets — exclude self, excludes archived (can't send there)
        const availableDMs = USERS
          .filter(u => u.id !== currentUser.id && !(archivedByUser[currentUser.id]?.[u.id]))
          .filter(u => !q || u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q));
        // Available groups — only ones the user is a member of, not archived
        const availableGroups = groups
          .filter(g => g.members?.includes(currentUser.id))
          .filter(g => !(archivedByUser[currentUser.id]?.[g.id]))
          .filter(g => !q || g.name.toLowerCase().includes(q));

        return (
          <div
            onClick={() => setSharePostTarget(null)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(13,31,31,0.50)",
              zIndex: 4000,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 20,
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              className="fade-up"
              style={{
                width: "100%", maxWidth: 540,
                maxHeight: "85vh",
                background: C.surface, borderRadius: T.radLg,
                boxShadow: "0 24px 64px rgba(13,31,31,0.30)",
                display: "flex", flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div style={{
                padding: "16px 20px 12px",
                borderBottom: `1px solid ${C.border}`,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: C.primary10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Repeat2 size={15} color={C.primary} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: C.text }}>Share post</div>
                  <div style={{ fontSize: 11, color: C.textSoft, marginTop: 1 }}>
                    Send this post to one or more chats
                  </div>
                </div>
                <button
                  onClick={() => setSharePostTarget(null)}
                  className="iconbtn smooth"
                  style={{ width: 28, height: 28, borderRadius: 7, color: C.textMid, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <X size={15} />
                </button>
              </div>

              {/* Post preview */}
              <div style={{ padding: "12px 20px", background: C.bg, borderBottom: `1px solid ${C.border}` }}>
                <div style={{
                  display: "flex", gap: 10, alignItems: "flex-start",
                  background: C.surface, padding: 10, borderRadius: 9,
                  border: `1px solid ${C.border}`,
                }}>
                  <Avatar contact={author} size={28} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 2 }}>
                      {author?.name} · <span style={{ color: cat?.color, fontWeight: 600 }}>{cat?.label}</span>
                    </div>
                    <div style={{
                      fontSize: 12.5, fontWeight: 600, color: C.text,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {post.title || (post.body || "").split("\n")[0].slice(0, 80)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional comment */}
              <div style={{ padding: "12px 20px 4px" }}>
                <input
                  value={shareToComment}
                  onChange={e => setShareToComment(e.target.value)}
                  placeholder="Add a comment (optional)"
                  style={{
                    width: "100%", padding: "9px 12px",
                    borderRadius: 8, border: `1px solid ${C.border}`,
                    fontSize: 12.5, color: C.text,
                    fontFamily: "'Roboto', sans-serif",
                  }}
                />
              </div>

              {/* Search */}
              <div style={{ padding: "8px 20px 6px" }}>
                <div style={{ position: "relative" }}>
                  <Search size={13} color={C.textSoft} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    value={shareToSearch}
                    onChange={e => setShareToSearch(e.target.value)}
                    placeholder="Search people or groups…"
                    style={{
                      width: "100%", padding: "8px 12px 8px 32px",
                      borderRadius: 8, border: `1px solid ${C.border}`,
                      fontSize: 12, color: C.text,
                      fontFamily: "'Roboto', sans-serif",
                      background: C.bg,
                    }}
                  />
                </div>
              </div>

              {/* Recipient list */}
              <div style={{ flex: 1, overflowY: "auto", padding: "4px 20px 12px" }}>
                {availableGroups.length > 0 && (
                  <>
                    <div style={{
                      padding: "8px 4px 6px",
                      fontSize: 9.5, fontWeight: 700, color: C.textSoft,
                      letterSpacing: "0.10em", textTransform: "uppercase",
                    }}>Groups</div>
                    {availableGroups.map(g => {
                      const selected = shareSelectedTargets.includes(g.id);
                      return (
                        <button
                          key={g.id}
                          onClick={() => toggleShareTarget(g.id)}
                          style={{
                            width: "100%", textAlign: "left",
                            padding: "8px 8px", borderRadius: 8,
                            background: selected ? C.primary10 : "transparent",
                            border: `1px solid ${selected ? C.primary30 : "transparent"}`,
                            display: "flex", alignItems: "center", gap: 10,
                            cursor: "pointer", marginBottom: 2,
                            fontFamily: "'Roboto', sans-serif",
                          }}
                          onMouseEnter={e => { if (!selected) e.currentTarget.style.background = C.bg; }}
                          onMouseLeave={e => { if (!selected) e.currentTarget.style.background = "transparent"; }}
                        >
                          <div style={{
                            width: 32, height: 32, borderRadius: 8,
                            background: g.color || C.primary, color: "#fff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 12, fontWeight: 700, flexShrink: 0,
                          }}>{(g.name || "G").slice(0, 1).toUpperCase()}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 12.5, fontWeight: 600, color: C.text }}>{g.name}</div>
                            <div style={{ fontSize: T.fontXs, color: C.textSoft }}>{g.members?.length || 0} members</div>
                          </div>
                          <div style={{
                            width: 18, height: 18, borderRadius: 5,
                            background: selected ? C.primary : "transparent",
                            border: `1.5px solid ${selected ? C.primary : C.borderStrong}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                          }}>
                            {selected && <Check size={11} color="#fff" strokeWidth={3} />}
                          </div>
                        </button>
                      );
                    })}
                  </>
                )}

                {availableDMs.length > 0 && (
                  <>
                    <div style={{
                      padding: "12px 4px 6px",
                      fontSize: 9.5, fontWeight: 700, color: C.textSoft,
                      letterSpacing: "0.10em", textTransform: "uppercase",
                    }}>Direct messages</div>
                    {availableDMs.map(u => {
                      const selected = shareSelectedTargets.includes(u.id);
                      return (
                        <button
                          key={u.id}
                          onClick={() => toggleShareTarget(u.id)}
                          style={{
                            width: "100%", textAlign: "left",
                            padding: "8px 8px", borderRadius: 8,
                            background: selected ? C.primary10 : "transparent",
                            border: `1px solid ${selected ? C.primary30 : "transparent"}`,
                            display: "flex", alignItems: "center", gap: 10,
                            cursor: "pointer", marginBottom: 2,
                            fontFamily: "'Roboto', sans-serif",
                          }}
                          onMouseEnter={e => { if (!selected) e.currentTarget.style.background = C.bg; }}
                          onMouseLeave={e => { if (!selected) e.currentTarget.style.background = "transparent"; }}
                        >
                          <Avatar contact={u} size={32} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 12.5, fontWeight: 600, color: C.text }}>{u.name}</div>
                            <div style={{ fontSize: T.fontXs, color: C.textSoft }}>{u.role}</div>
                          </div>
                          <div style={{
                            width: 18, height: 18, borderRadius: 5,
                            background: selected ? C.primary : "transparent",
                            border: `1.5px solid ${selected ? C.primary : C.borderStrong}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                          }}>
                            {selected && <Check size={11} color="#fff" strokeWidth={3} />}
                          </div>
                        </button>
                      );
                    })}
                  </>
                )}

                {availableGroups.length === 0 && availableDMs.length === 0 && (
                  <div style={{ padding: "30px 0", textAlign: "center", color: C.textSoft, fontSize: 12 }}>
                    No matches.
                  </div>
                )}
              </div>

              {/* Footer */}
              <div style={{
                padding: "12px 20px",
                borderTop: `1px solid ${C.border}`,
                background: C.bg,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ fontSize: 11.5, color: C.textMid }}>
                  {shareSelectedTargets.length === 0
                    ? "Select at least one chat"
                    : `${shareSelectedTargets.length} ${shareSelectedTargets.length === 1 ? "chat" : "chats"} selected`}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => setSharePostTarget(null)}
                    style={{
                      padding: "8px 14px", borderRadius: 8,
                      background: "transparent", color: C.textMid,
                      border: `1px solid ${C.border}`,
                      fontSize: 12, fontWeight: 600, cursor: "pointer",
                    }}
                  >Cancel</button>
                  <button
                    onClick={confirmSharePost}
                    disabled={shareSelectedTargets.length === 0}
                    style={{
                      padding: "8px 16px", borderRadius: 8,
                      background: shareSelectedTargets.length === 0 ? C.bg : C.primary,
                      color: shareSelectedTargets.length === 0 ? C.textVerySoft : "#fff",
                      fontSize: 12, fontWeight: 700,
                      border: shareSelectedTargets.length === 0 ? `1px solid ${C.border}` : "none",
                      cursor: shareSelectedTargets.length === 0 ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", gap: 6,
                    }}
                  >
                    <Send size={12} />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── Hub confirm dialog — used by archive/delete/etc. ─── */}
      {/* Event create/edit modal — opens when New Event clicked in marketing,
          surfaces above all other content with its own backdrop. */}
      <EventCreateModal />

      {/* ═══ Promotions Center — read-only drawer for all users ═══ */}
      {promoCenterOpen && (() => {
        const allPromo = [];
        (visibleCommissions || []).forEach(c => allPromo.push({ ...c, _type: "commission", _title: c.university, _subtitle: `${c.minimumStudents}+ students · ${c.accountIntake}`, _amount: c.commissionAmount, _badge: c.commissionGroup, _date: c.startFrom, _color: "#FC7300" }));
        (newUniversities || []).forEach(u => allPromo.push({ ...u, _type: "university", _title: u.name, _subtitle: u.location, _badge: u.ranking ? `#${u.ranking}` : "New", _date: u.addedAt, _color: "#7C3AED" }));
        (newCourses || []).forEach(c => allPromo.push({ ...c, _type: "course", _title: c.name, _subtitle: `${c.university} · ${c.level}`, _badge: c.mode, _date: c.intake, _color: "#DB2777" }));
        (promotedMarketingEvents || []).forEach(e => allPromo.push({ ...e, _type: "event", _title: e.title || e.name, _subtitle: e.date || e.eventDate, _badge: e.type || e.eventType, _date: e.date, _color: "#3B82F6" }));
        promoCategories.filter(c => c.active && c.items?.length > 0).forEach(cat => {
          const mapped = { commission: true, university: true, course: true, event: true };
          if (!mapped[cat.name === "Commission News" ? "x" : ""]) {
            cat.items.forEach(item => allPromo.push({ ...item, _type: "generic", _title: item.title, _subtitle: item.desc, _badge: item.badge, _color: cat.color }));
          }
        });

        const filters = [
          { id: "all", label: "All" },
          ...(visibleCommissions?.length ? [{ id: "commission", label: "Commission" }] : []),
          ...(newUniversities?.length ? [{ id: "university", label: "Universities" }] : []),
          ...(newCourses?.length ? [{ id: "course", label: "Courses" }] : []),
          ...(promotedMarketingEvents?.length ? [{ id: "event", label: "Events" }] : []),
        ];

        const filtered = allPromo.filter(p => {
          if (promoCenterFilter !== "all" && p._type !== promoCenterFilter) return false;
          if (promoCenterSearch) {
            const q = promoCenterSearch.toLowerCase();
            return (p._title || "").toLowerCase().includes(q) || (p._subtitle || "").toLowerCase().includes(q);
          }
          return true;
        });

        return (
          <div onClick={() => setPromoCenterOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 2100, background: "rgba(0,0,0,0.35)", display: "flex", justifyContent: "flex-end" }}>
            <div onClick={e => e.stopPropagation()} style={{ width: 480, maxWidth: "92vw", background: C.surface, height: "100%", display: "flex", flexDirection: "column", boxShadow: "0 0 40px rgba(0,0,0,0.2)" }}>
              {/* Sticky header */}
              <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <h2 style={{ fontSize: T.fontLg, fontWeight: 700, color: C.text }}>Promotions & Campaigns</h2>
                  <button onClick={() => setPromoCenterOpen(false)} aria-label="Close" style={{ background: "transparent", border: "none", color: C.textMid, cursor: "pointer", padding: 4 }}><X size={20} /></button>
                </div>
                <p style={{ fontSize: T.fontSm, color: C.textSoft, marginBottom: 2 }}>Latest campaigns, university updates, intake alerts and events.</p>
                <div style={{ fontSize: T.fontXs, color: C.textVerySoft }}>Read-only · Managed by System Admin</div>

                {/* Filter chips */}
                <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
                  {filters.map(f => {
                    const active = promoCenterFilter === f.id;
                    return (
                      <button key={f.id} onClick={() => setPromoCenterFilter(f.id)} className="smooth" style={{
                        padding: "6px 14px", borderRadius: T.radFull, fontSize: T.fontSm, fontWeight: active ? 600 : 500, cursor: "pointer",
                        background: active ? C.primary10 : "transparent",
                        color: active ? C.primary : C.textSoft,
                        border: `1px solid ${active ? C.primary : C.border}`,
                      }}>{f.label}</button>
                    );
                  })}
                </div>

                {/* Search */}
                <div style={{ position: "relative", marginTop: 12 }}>
                  <Search size={14} color={C.textSoft} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                  <input value={promoCenterSearch} onChange={e => setPromoCenterSearch(e.target.value)} placeholder="Search promotions…" style={{
                    width: "100%", padding: "9px 12px 9px 34px", borderRadius: T.radMd,
                    border: `1px solid ${C.border}`, background: C.bg, fontSize: T.fontSm, color: C.text,
                  }} />
                </div>
              </div>

              {/* Scrollable body */}
              <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
                {filtered.length === 0 ? (
                  <div style={{ padding: "40px 20px", textAlign: "center" }}>
                    <div style={{ fontSize: T.fontBase, fontWeight: 600, color: C.text, marginBottom: 4 }}>No active promotions right now</div>
                    <div style={{ fontSize: T.fontSm, color: C.textSoft, lineHeight: T.lineBody }}>New campaigns will appear here when published by your System Admin.</div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {filtered.map((p, i) => (
                      <div key={p.id || i} style={{ background: C.bg, borderRadius: T.radMd, border: `1px solid ${C.border}`, padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: T.fontBase, fontWeight: 600, color: C.text, lineHeight: T.lineTight }}>{p._title}</div>
                            {p._subtitle && <div style={{ fontSize: T.fontSm, color: C.textMid, marginTop: 3, lineHeight: T.lineBody }}>{p._subtitle}</div>}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                            {p._amount && <div style={{ fontSize: T.fontMd, fontWeight: 700, color: p._color }}>{p._amount}</div>}
                            {p._badge && <span style={{ fontSize: T.fontXs, fontWeight: 600, padding: "2px 8px", borderRadius: T.radSm, background: `${p._color}10`, color: p._color }}>{p._badge}</span>}
                          </div>
                        </div>
                        {p._date && (
                          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, fontSize: T.fontXs, color: C.textSoft }}>
                            <Clock size={11} /> {p._date}
                          </div>
                        )}
                        {/* Inline details for commission type */}
                        {p._type === "commission" && p.commissionGroup && (
                          <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
                            <span style={{ fontSize: T.fontXs, padding: "2px 8px", borderRadius: T.radSm, background: C.bg, border: `1px solid ${C.border}`, color: C.textMid }}>Min. {p.minimumStudents} students</span>
                            <span style={{ fontSize: T.fontXs, padding: "2px 8px", borderRadius: T.radSm, background: C.bg, border: `1px solid ${C.border}`, color: C.textMid }}>{p.commissionGroup}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Toast that confirms event creation (auto-dismisses) */}
      <EventCreatedToast />

      {hubConfirm && (
        <div
          onClick={() => setHubConfirm(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setHubConfirm(null);
            if (e.key === "Enter") hubConfirm.onConfirm?.();
          }}
          tabIndex={-1}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(13,31,31,0.50)",
            zIndex: 4000,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20,
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="fade-up"
            style={{
              width: "100%", maxWidth: 400,
              background: C.surface, borderRadius: T.radLg,
              boxShadow: "0 24px 64px rgba(13,31,31,0.30)",
              padding: "22px 22px 18px",
            }}
          >
            <div style={{ fontSize: T.fontMd, fontWeight: 700, color: C.text, marginBottom: 6 }}>
              {hubConfirm.title}
            </div>
            <div style={{ fontSize: T.fontSm, color: C.textMid, lineHeight: T.lineBody5, marginBottom: 18 }}>
              {hubConfirm.body}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button
                onClick={() => setHubConfirm(null)}
                style={{
                  padding: "9px 16px", borderRadius: 8,
                  background: "transparent", color: C.textMid,
                  border: `1px solid ${C.border}`,
                  fontSize: 12.5, fontWeight: 600, cursor: "pointer",
                }}
              >Cancel</button>
              <button
                onClick={hubConfirm.onConfirm}
                style={{
                  padding: "9px 16px", borderRadius: 8,
                  background: hubConfirm.confirmDanger ? C.danger : C.primary,
                  color: "#fff",
                  fontSize: 12.5, fontWeight: 700, cursor: "pointer",
                  border: "none",
                }}
              >{hubConfirm.confirmLabel || "Confirm"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
