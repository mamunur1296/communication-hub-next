import { Fragment } from "react";
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

export default function MyScheduleModule({ ctx }) {
  const {
    AgendaView,
    BlockChip,
    BlockDrawer,
    C,
    END_HOUR,
    HOURS,
    HOUR_H,
    MonthGrid,
    START_HOUR,
    STATUS,
    SettingsPanel,
    T,
    TimeGrid,
    USERS,
    _,
    a,
    active,
    addDays,
    alert,
    allBlocks,
    allBlocksRaw,
    availHours,
    availability,
    b,
    bEnd,
    bStart,
    baseBlocks,
    be,
    bgBase,
    block,
    blocks,
    blocksForDay,
    bookedH,
    bookingBlocks,
    bs,
    c,
    chipKey,
    currentUser,
    d,
    darkMode,
    dateKey,
    dateLabel,
    datePart,
    dateStr,
    day,
    dayBlocks,
    dayEnd,
    dayLong,
    dayNames,
    dayStart,
    days,
    deleteDraft,
    di,
    dir,
    dur,
    durLabel,
    durMin,
    durMs,
    e,
    end,
    endISO,
    ev,
    expandedBlocks,
    f,
    fieldStyle,
    findUser,
    first,
    fmtH,
    focusHours,
    getMonday,
    goToday,
    grouped,
    h,
    half,
    handleSlotClick,
    hasAway,
    hasConflict,
    horizon,
    hour,
    hourHeight,
    hoverBg,
    hr,
    i,
    inMonth,
    inWH,
    instances,
    isNew,
    isToday,
    isToday2,
    isoStr,
    key,
    keys,
    m,
    me,
    meetingBlocks,
    meetingCount,
    meetingDuration,
    meetings,
    min,
    mon,
    monthNames,
    ms,
    mt,
    n,
    name,
    navigate,
    newEnd,
    newStart,
    nonRecurring,
    now,
    oEnd,
    oStart,
    oldEnd,
    oldStart,
    openCreate,
    openEdit,
    otherAttendees,
    overflow,
    overlap,
    overlaps,
    p,
    pad,
    pad2,
    parseLocalInput,
    parseTime,
    patch,
    period,
    prev,
    prevDur,
    r,
    rule,
    s,
    sameDay,
    saveDraft,
    savedAvail,
    schedBlocks,
    schedDate,
    schedDraft,
    schedDrawerOpen,
    schedFilters,
    schedSelected,
    schedSettings,
    schedView,
    schedViewUserId,
    sel,
    setAvailability,
    setMeetingDuration,
    setSavedAvail,
    setSchedBlocks,
    setSchedDate,
    setSchedDraft,
    setSchedDrawerOpen,
    setSchedFilters,
    setSchedSelected,
    setSchedSettings,
    setSchedView,
    setSchedViewUserId,
    sorted,
    st,
    start,
    startDay,
    startISO,
    stepDays,
    subtitle,
    sun,
    t,
    thisWeekBlocks,
    timePart,
    timeStr,
    toLocalInput,
    today,
    todayBlocks,
    todayFree,
    topMin,
    totalWH,
    tz,
    u,
    upd,
    v,
    val,
    viewDays,
    views,
    w,
    wh,
    whEnd,
    whStart,
    y
  } = ctx;

function AvailabilityView() {
    // ── Timezone-safe helpers for datetime-local inputs ──
    // The <input type="datetime-local"> works in local time, but our state stores ISO (UTC).
    // These helpers convert correctly to avoid the ±1 hour shift.
    const toLocalInput = (isoStr) => {
      const d = new Date(isoStr);
      const pad = (n) => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };
    const parseLocalInput = (val) => {
      if (!val) return null;
      const [datePart, timePart] = val.split("T");
      const [y, m, day] = datePart.split("-").map(Number);
      const [h, min] = timePart.split(":").map(Number);
      return new Date(y, m - 1, day, h, min, 0, 0);
    };
    // ── Status palette (soft, muted, eye-soothing) ──
    const STATUS = {
      available: { bg: darkMode ? "rgba(34,197,94,0.16)" : "rgba(34,197,94,0.14)",  border: "rgba(34,197,94,0.45)",  text: darkMode ? "#4ADE80" : "#15803D", label: "Available",  icon: Check },
      busy:      { bg: darkMode ? "rgba(239,68,68,0.14)" : "rgba(239,68,68,0.10)",  border: "rgba(239,68,68,0.40)",  text: darkMode ? "#FCA5A5" : "#DC2626", label: "Busy",       icon: Ban },
      meeting:   { bg: darkMode ? "rgba(59,130,246,0.16)" : "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.40)", text: darkMode ? "#93C5FD" : "#2563EB", label: "Meeting",    icon: Video },
      focus:     { bg: darkMode ? "rgba(139,92,246,0.16)" : "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.40)", text: darkMode ? "#C4B5FD" : "#7C3AED", label: "Focus",      icon: Target },
      away:      { bg: darkMode ? "rgba(148,163,184,0.14)" : "rgba(148,163,184,0.12)", border: "rgba(148,163,184,0.35)", text: darkMode ? "#94A3B8" : "#64748B", label: "Away",  icon: Clock },
    };

    // ── Calendar helpers ──
    const HOUR_H = 56; // px per hour in time grid
    const START_HOUR = 6; // 6 AM
    const END_HOUR = 22;  // 10 PM
    const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => i + START_HOUR);
    const fmtH = h => { const hr = h % 12 || 12; return `${hr} ${h < 12 ? "AM" : "PM"}`; };
    const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    const getMonday = (d) => { const m = new Date(d); m.setDate(d.getDate() - ((d.getDay() + 6) % 7)); m.setHours(0,0,0,0); return m; };
    const addDays = (d, n) => { const r = new Date(d); r.setDate(d.getDate() + n); return r; };
    const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const dayNamesFull = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    // Computed each render (no useMemo — this function is conditionally called,
    // so hooks would violate React's rules). Lightweight date math is fine.
    const viewDays = (() => {
      if (schedView === "day") return [new Date(schedDate)];
      if (schedView === "month") {
        const first = new Date(schedDate.getFullYear(), schedDate.getMonth(), 1);
        const startDay = (first.getDay() + 6) % 7; // Mon=0
        const start = addDays(first, -startDay);
        return Array.from({ length: 42 }, (_, i) => addDays(start, i));
      }
      const mon = getMonday(schedDate);
      if (schedView === "workweek") return Array.from({ length: 5 }, (_, i) => addDays(mon, i));
      return Array.from({ length: 7 }, (_, i) => addDays(mon, i)); // week
    })();

    // ── Derive meeting blocks from Bookings module ──
    // Convert upcoming + past meetings into schedule-block-shaped objects so
    // they render in the calendar alongside manually created availability blocks.
    const parseTime = (dateStr, timeStr) => {
      // dateStr: "2026-05-02", timeStr: "10:00 AM" → Date
      const [t, period] = timeStr.trim().split(" ");
      let [h, m] = t.split(":").map(Number);
      if (period === "PM" && h !== 12) h += 12;
      if (period === "AM" && h === 12) h = 0;
      const d = new Date(dateStr); d.setHours(h, m, 0, 0);
      return d;
    };
    const bookingBlocks = [...(meetings.upcoming || []), ...(meetings.passed || [])].map(mt => {
      const start = parseTime(mt.date, mt.start);
      const end = parseTime(mt.date, mt.end);
      const organizer = findUser(mt.organizer);
      const otherAttendees = (mt.attendees || []).filter(a => a.userId !== currentUser.id).map(a => findUser(a.userId)?.name).filter(Boolean);
      const subtitle = otherAttendees.length > 0 ? ` — with ${otherAttendees.slice(0, 2).join(", ")}` : "";
      return {
        id: `bk-${mt.id}`,
        userId: mt.organizer,
        title: `${mt.title}${subtitle}`,
        status: "meeting",
        start: start.toISOString(),
        end: end.toISOString(),
        notes: mt.location || "",
        isRecurring: false,
        isBooking: true, // flag so we don't allow editing booking blocks from here
        createdAt: start.toISOString(),
        updatedAt: start.toISOString(),
      };
    });
    // Combined blocks = user-created availability + bookings
    const baseBlocks = [...schedBlocks, ...bookingBlocks];

    // ── Expand recurring blocks into future instances ──
    // For each recurring block, generate copies for upcoming weeks/days
    // up to 8 weeks ahead so they appear on the calendar.
    const expandedBlocks = (() => {
      const instances = [];
      const nonRecurring = baseBlocks.filter(b => !b.isRecurring); // fixed blocks + bookings
      const now = new Date(); now.setHours(0, 0, 0, 0);
      const horizon = addDays(now, 56);
      // Helper: check if a time range overlaps with any non-recurring block
      const hasConflict = (s, e) => nonRecurring.some(b => {
        const bs = new Date(b.start); const be = new Date(b.end);
        return s < be && e > bs;
      });
      baseBlocks.forEach(b => {
        instances.push(b);
        if (!b.isRecurring || !b.recurrenceRule) return;
        const bStart = new Date(b.start);
        const bEnd = new Date(b.end);
        const dur = bEnd - bStart;
        const rule = b.recurrenceRule;
        const stepDays = rule === "daily" ? 1 : rule === "weekly" ? 7 : rule === "biweekly" ? 14 : 30;
        for (let i = 1; i <= (rule === "daily" ? 56 : rule === "monthly" ? 3 : 8); i++) {
          const newStart = new Date(bStart.getTime() + i * stepDays * 86400000);
          if (newStart > horizon) break;
          const newEnd = new Date(newStart.getTime() + dur);
          // Skip if this instance conflicts with a fixed block or booking
          if (hasConflict(newStart, newEnd)) continue;
          instances.push({
            ...b, id: `${b.id}-r${i}`,
            start: newStart.toISOString(), end: newEnd.toISOString(),
            _recurring: true,
          });
        }
      });
      return instances;
    })();

    const allBlocksRaw = expandedBlocks;

    // ── Conflict resolution: meetings/bookings suppress overlapping availability ──
    // If a meeting exists at a time, any "available" block overlapping that time is hidden.
    const meetingBlocks = allBlocksRaw.filter(b => b.status === "meeting" || b.status === "busy" || b.status === "focus" || b.isBooking);
    const allBlocks = allBlocksRaw.filter(b => {
      if (b.status !== "available") return true; // keep non-available blocks
      const bs = new Date(b.start); const be = new Date(b.end);
      // Check if any meeting/booking overlaps with this availability block
      const hasConflict = meetingBlocks.some(m => {
        if (m.id === b.id) return false;
        const ms = new Date(m.start); const me = new Date(m.end);
        return ms < be && me > bs; // overlap
      });
      return !hasConflict; // hide availability if a meeting exists at that time
    });

    // ── blocksForDay: supports multi-day blocks (e.g. holidays spanning several days) ──
    // If a day has an "away" block, only show away blocks (hides meetings/available).
    const blocksForDay = (day) => {
      const dayStart = new Date(day); dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(day); dayEnd.setHours(23, 59, 59, 999);
      const dayBlocks = allBlocks.filter(b => {
        const bs = new Date(b.start);
        const be = new Date(b.end);
        const overlaps = bs <= dayEnd && be >= dayStart;
        return overlaps && schedFilters.statuses.includes(b.status) &&
          (!schedFilters.search || (b.title || "").toLowerCase().includes(schedFilters.search.toLowerCase()));
      });
      // If any away block covers this day, only show away blocks
      const hasAway = dayBlocks.some(b => b.status === "away");
      return hasAway ? dayBlocks.filter(b => b.status === "away") : dayBlocks;
    };

    const navigate = (dir) => {
      const d = new Date(schedDate);
      if (schedView === "month") d.setMonth(d.getMonth() + dir);
      else if (schedView === "day") d.setDate(d.getDate() + dir);
      else d.setDate(d.getDate() + dir * 7);
      setSchedDate(d);
    };
    const goToday = () => setSchedDate(new Date());

    const dateLabel = (() => {
      if (schedView === "day") return schedDate.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      if (schedView === "month") return `${monthNames[schedDate.getMonth()]} ${schedDate.getFullYear()}`;
      const mon = getMonday(schedDate);
      const sun = addDays(mon, 6);
      if (mon.getMonth() === sun.getMonth()) return `${mon.getDate()} – ${sun.getDate()} ${monthNames[mon.getMonth()]} ${mon.getFullYear()}`;
      return `${mon.getDate()} ${monthNames[mon.getMonth()].slice(0,3)} – ${sun.getDate()} ${monthNames[sun.getMonth()].slice(0,3)} ${sun.getFullYear()}`;
    })();

    // ── Block CRUD ──
    const openCreate = (startISO, endISO) => {
      const durMs = (schedSettings.meetingDuration || 30) * 60000;
      setSchedDraft({
        id: null, userId: currentUser.id, title: "", status: "available",
        start: startISO || new Date().toISOString(),
        end: endISO || new Date(Date.now() + durMs).toISOString(),
        notes: "", isRecurring: false, recurrenceRule: "weekly",
      });
      setSchedDrawerOpen(true);
    };
    const openEdit = (block) => {
      if (block.isBooking) return; // Booking blocks are managed in the Bookings module
      if (block._recurring) return; // Generated recurring instance — edit the original
      setSchedDraft({ ...block });
      setSchedSelected(block.id);
      setSchedDrawerOpen(true);
    };
    const saveDraft = () => {
      if (!schedDraft) return;
      const s = new Date(schedDraft.start);
      let e = new Date(schedDraft.end);
      if (e <= s) {
        const dur = (schedSettings.meetingDuration || 30) * 60000;
        e = new Date(s.getTime() + dur);
        schedDraft.end = e.toISOString();
      }
      // Check for overlapping blocks (excluding the block being edited)
      const overlap = schedBlocks.find(b => {
        if (schedDraft.id && b.id === schedDraft.id) return false; // skip self
        const bs = new Date(b.start); const be = new Date(b.end);
        return s < be && e > bs; // time ranges overlap
      });
      if (overlap) {
        const oStart = new Date(overlap.start).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
        const oEnd = new Date(overlap.end).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
        alert(`This time conflicts with "${overlap.title || overlap.status}" (${oStart}\u2013${oEnd}). Please choose a different time.`);
        return;
      }
      const now = new Date().toISOString();
      if (schedDraft.id) {
        setSchedBlocks(prev => prev.map(b => b.id === schedDraft.id ? { ...schedDraft, updatedAt: now } : b));
      } else {
        setSchedBlocks(prev => [...prev, { ...schedDraft, id: `sb-${Date.now()}`, createdAt: now, updatedAt: now }]);
      }
      setSchedDrawerOpen(false); setSchedDraft(null); setSchedSelected(null);
      setSchedDate(new Date(schedDraft.start));
    };
    const deleteDraft = () => {
      if (schedDraft?.id) setSchedBlocks(prev => prev.filter(b => b.id !== schedDraft.id));
      setSchedDrawerOpen(false); setSchedDraft(null); setSchedSelected(null);
    };
    const handleSlotClick = (day, hour, half) => {
      const s = new Date(day); s.setHours(hour, half ? 30 : 0, 0, 0);
      const e = new Date(s.getTime() + (schedSettings.meetingDuration || 30) * 60000);
      openCreate(s.toISOString(), e.toISOString());
    };

    // ── Summary metrics ──
    const thisWeekBlocks = (() => {
      const mon = getMonday(new Date()); const sun = addDays(mon, 7);
      return allBlocks.filter(b => { const s = new Date(b.start); return s >= mon && s < sun; });
    })();
    const availHours = thisWeekBlocks.filter(b => b.status === "available").reduce((s, b) => s + (new Date(b.end) - new Date(b.start)) / 3600000, 0);
    const meetingCount = thisWeekBlocks.filter(b => b.status === "meeting").length;
    const focusHours = thisWeekBlocks.filter(b => b.status === "focus").reduce((s, b) => s + (new Date(b.end) - new Date(b.start)) / 3600000, 0);
    const todayFree = (() => {
      const today = new Date(); today.setHours(0,0,0,0);
      const todayBlocks = allBlocks.filter(b => sameDay(new Date(b.start), today));
      const wh = schedSettings.workingHours;
      const whStart = parseInt(wh.start); const whEnd = parseInt(wh.end);
      const totalWH = whEnd - whStart;
      const bookedH = todayBlocks.reduce((s, b) => s + (new Date(b.end) - new Date(b.start)) / 3600000, 0);
      return Math.max(0, totalWH - bookedH);
    })();

    // ═══ Render a single block chip in the time grid ═══
    const BlockChip = ({ key: chipKey, block, hourHeight }) => {
      const s = new Date(block.start); const e = new Date(block.end);
      const topMin = (s.getHours() - START_HOUR) * 60 + s.getMinutes();
      const durMin = (e - s) / 60000;
      const st = STATUS[block.status] || STATUS.available;
      const StIcon = st.icon;
      return (
        <div
          key={chipKey}
          onClick={(ev) => { ev.stopPropagation(); openEdit(block); }}
          className="smooth"
          style={{
            position: "absolute",
            top: topMin * (hourHeight / 60),
            height: Math.max(20, durMin * (hourHeight / 60) - 2),
            left: 2, right: 2,
            background: st.bg, borderLeft: `3px solid ${st.border}`,
            borderRadius: 6, padding: "4px 7px",
            cursor: (block.isBooking || block._recurring) ? "default" : "pointer", overflow: "hidden",
            zIndex: schedSelected === block.id ? 10 : 1,
            boxShadow: schedSelected === block.id ? `0 0 0 2px ${st.border}` : "none",
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, color: st.text, lineHeight: 1.2, display: "flex", alignItems: "center", gap: 4 }}>
            <StIcon size={10} />
            {block.title || st.label}
          </div>
          {durMin >= 30 && (
            <div style={{ fontSize: T.fontXs, color: st.text, opacity: 0.7, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
              {s.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} – {e.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
              {block.isBooking && <span style={{ fontSize: 9, fontWeight: 700, opacity: 0.9, letterSpacing: "0.03em" }}>· Booking</span>}
            </div>
          )}
        </div>
      );
    };

    // ═══ TIME GRID (shared by Day, Week, Work Week) ═══
    const TimeGrid = ({ days }) => {
      const isToday = (d) => sameDay(d, new Date());
      return (
        <div style={{ flex: 1, overflowY: "auto", overflowX: "auto" }}>
          <div style={{ display: "flex", minWidth: days.length > 1 ? 700 : 300 }}>
            {/* Time gutter */}
            <div style={{ width: 56, flexShrink: 0, borderRight: `1px solid ${C.divider}`, paddingTop: 44 }}>
              {HOURS.map(h => (
                <div key={h} style={{ height: HOUR_H, display: "flex", alignItems: "flex-start", justifyContent: "flex-end", paddingRight: 8, paddingTop: 0 }}>
                  <span style={{ fontSize: T.fontXs, color: C.textSoft, fontWeight: 500, lineHeight: 1, transform: "translateY(-5px)" }}>{fmtH(h)}</span>
                </div>
              ))}
            </div>
            {/* Day columns */}
            {days.map((day, di) => {
              const today = isToday(day);
              const blocks = blocksForDay(day);
              return (
                <div key={di} style={{ flex: 1, minWidth: 90, borderRight: di < days.length - 1 ? `1px solid ${C.divider}` : "none" }}>
                  {/* Day header */}
                  <div style={{
                    height: 44, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: C.surface, zIndex: 5,
                  }}>
                    <div style={{ fontSize: T.fontXs, fontWeight: 600, color: today ? C.primary : C.textSoft, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      {dayNames[day.getDay()]}
                    </div>
                    <div style={{
                      fontSize: 18, fontWeight: 700, color: today ? "#fff" : C.text, lineHeight: 1,
                      ...(today ? { background: C.primary, borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" } : {}),
                    }}>{day.getDate()}</div>
                  </div>
                  {/* Hour slots — split into 30-min halves */}
                  <div style={{ position: "relative" }}>
                    {HOURS.map(h => {
                      const inWH = h >= parseInt(schedSettings.workingHours.start) && h < parseInt(schedSettings.workingHours.end);
                      const bgBase = inWH ? "transparent" : (darkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)");
                      const hoverBg = darkMode ? "rgba(4,93,94,0.15)" : "rgba(4,93,94,0.06)";
                      const pad2 = (n) => String(n).padStart(2, "0");
                      const durLabel = `${schedSettings.meetingDuration || 30}min`;
                      return (
                        <div key={h} style={{ height: HOUR_H, borderBottom: `1px solid ${C.divider}`, display: "flex", flexDirection: "column" }}>
                          {[0, 1].map(half => (
                            <div
                              key={half}
                              onClick={() => handleSlotClick(day, h, half)}
                              title={`${pad2(h)}:${half ? "30" : "00"} — Click to create ${durLabel} event`}
                              style={{
                                flex: 1, cursor: "pointer", position: "relative",
                                borderBottom: half === 0 ? `1px dashed ${darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}` : "none",
                                background: bgBase,
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.background = hoverBg;
                                e.currentTarget.querySelector(".slot-hint").style.opacity = "1";
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.background = bgBase;
                                e.currentTarget.querySelector(".slot-hint").style.opacity = "0";
                              }}
                            >
                              <div className="slot-hint" style={{
                                position: "absolute", left: 4, top: "50%", transform: "translateY(-50%)",
                                fontSize: T.fontXs, fontWeight: 600, color: C.primary, opacity: 0,
                                pointerEvents: "none", display: "flex", alignItems: "center", gap: 3,
                                transition: "opacity 0.15s",
                              }}>
                                <Plus size={10} /> {pad2(h)}:{half ? "30" : "00"}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                    {/* Blocks overlaid */}
                    {blocks.map(b => BlockChip({ key: b.id, block: b, hourHeight: HOUR_H }))}
                    {/* Current time indicator */}
                    {today && (() => {
                      const now = new Date(); const min = (now.getHours() - START_HOUR) * 60 + now.getMinutes();
                      if (min < 0 || min > (END_HOUR - START_HOUR) * 60) return null;
                      return <div style={{ position: "absolute", top: min * (HOUR_H / 60), left: 0, right: 0, height: 2, background: C.danger, zIndex: 20, pointerEvents: "none" }}>
                        <div style={{ position: "absolute", left: -4, top: -3, width: 8, height: 8, borderRadius: "50%", background: C.danger }} />
                      </div>;
                    })()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    // ═══ MONTH VIEW ═══
    const MonthGrid = () => {
      const today = new Date();
      return (
        <div style={{ flex: 1, overflowY: "auto", padding: "0 2px" }}>
          {/* Day-of-week headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: `1px solid ${C.border}` }}>
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
              <div key={d} style={{ padding: "10px 8px", fontSize: T.fontXs, fontWeight: 600, color: C.textSoft, textTransform: "uppercase", textAlign: "center", letterSpacing: "0.04em" }}>{d}</div>
            ))}
          </div>
          {/* Weeks */}
          {Array.from({ length: 6 }, (_, w) => (
            <div key={w} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", minHeight: 90 }}>
              {viewDays.slice(w * 7, w * 7 + 7).map((day, di) => {
                const inMonth = day.getMonth() === schedDate.getMonth();
                const isToday2 = sameDay(day, today);
                const dayBlocks = blocksForDay(day).slice(0, 3);
                const overflow = blocksForDay(day).length - 3;
                return (
                  <div
                    key={di}
                    onClick={() => { setSchedDate(day); setSchedView("day"); }}
                    style={{
                      borderRight: di < 6 ? `1px solid ${C.divider}` : "none",
                      borderBottom: `1px solid ${C.divider}`,
                      padding: "4px 5px", cursor: "pointer",
                      opacity: inMonth ? 1 : 0.4,
                      background: isToday2 ? (darkMode ? "rgba(63,181,183,0.06)" : "rgba(4,93,94,0.03)") : "transparent",
                    }}
                  >
                    <div style={{
                      fontSize: 12, fontWeight: isToday2 ? 700 : 500, marginBottom: 3,
                      color: isToday2 ? C.primary : C.text, textAlign: "right",
                    }}>{day.getDate()}</div>
                    {dayBlocks.map(b => {
                      const st = STATUS[b.status] || STATUS.available;
                      return (
                        <div key={b.id} onClick={ev => { ev.stopPropagation(); openEdit(b); }} style={{
                          fontSize: T.fontXs, fontWeight: 600, color: st.text,
                          background: st.bg, borderRadius: 4, padding: "1px 5px",
                          marginBottom: 2, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
                          borderLeft: `2px solid ${st.border}`,
                        }}>{b.title || st.label}</div>
                      );
                    })}
                    {overflow > 0 && <div style={{ fontSize: 9.5, color: C.textSoft, fontWeight: 600, paddingLeft: 4 }}>+{overflow} more</div>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      );
    };

    // ═══ AGENDA VIEW ═══
    const AgendaView = () => {
      const grouped = {};
      const sorted = [...allBlocks].filter(b => schedFilters.statuses.includes(b.status)).sort((a, b) => new Date(a.start) - new Date(b.start));
      sorted.forEach(b => {
        const key = new Date(b.start).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
        (grouped[key] = grouped[key] || []).push(b);
      });
      const keys = Object.keys(grouped);
      if (keys.length === 0) return (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 60 }}>
          <div style={{ textAlign: "center" }}>
            <CalendarDays size={40} color={C.textVerySoft} style={{ marginBottom: 12 }} />
            <div style={{ fontSize: T.fontMd, fontWeight: 600, color: C.text, marginBottom: 4 }}>No availability blocks yet</div>
            <div style={{ fontSize: 13, color: C.textSoft, marginBottom: 16 }}>Create your first block to get started.</div>
            <button onClick={() => openCreate()} className="smooth" style={{ padding: "9px 18px", background: C.primary, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Create New Event</button>
          </div>
        </div>
      );
      return (
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {keys.map(dateKey => (
            <div key={dateKey} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.textSoft, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 8, paddingLeft: 4 }}>{dateKey}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {grouped[dateKey].map(b => {
                  const st = STATUS[b.status]; const StI = st.icon;
                  const s = new Date(b.start); const e = new Date(b.end);
                  return (
                    <div key={b.id} onClick={() => openEdit(b)} className="smooth" style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                      background: C.surface, borderRadius: T.radMd, border: `1px solid ${C.border}`,
                      cursor: "pointer",
                    }}
                      onMouseEnter={ev => { ev.currentTarget.style.borderColor = st.border; }}
                      onMouseLeave={ev => { ev.currentTarget.style.borderColor = C.border; }}
                    >
                      <div style={{ width: 4, height: 36, borderRadius: 2, background: st.border, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: C.text }}>{b.title || st.label}</div>
                        <div style={{ fontSize: 11.5, color: C.textSoft, marginTop: 2 }}>
                          {s.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} – {e.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                          {b.isRecurring && <> · <Repeat2 size={10} style={{ verticalAlign: "middle" }} /> Recurring</>}
                          {b.isBooking && <> · <CalendarDays size={10} style={{ verticalAlign: "middle" }} /> Booking</>}
                        </div>
                      </div>
                      <span style={{ fontSize: T.fontXs, fontWeight: 600, color: st.text, background: st.bg, padding: "3px 9px", borderRadius: 6, display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <StI size={10} /> {st.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      );
    };

    // ═══ DRAWER (create / edit block) ═══
    const BlockDrawer = () => {
      if (!schedDrawerOpen || !schedDraft) return null;
      const isNew = !schedDraft.id;
      const upd = (patch) => setSchedDraft(d => ({ ...d, ...patch }));
      const fieldStyle = {
        width: "100%", padding: "9px 12px", background: darkMode ? "rgba(255,255,255,0.03)" : "#FAFBFC",
        border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, color: C.text, outline: "none",
      };
      return (
        <div onClick={() => { setSchedDrawerOpen(false); setSchedDraft(null); setSchedSelected(null); }}
          style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.35)", display: "flex", justifyContent: "flex-end" }}>
          <div onClick={ev => ev.stopPropagation()} className="slide-r"
            style={{ width: 400, maxWidth: "90vw", background: C.surface, height: "100%", display: "flex", flexDirection: "column", boxShadow: "0 0 40px rgba(0,0,0,0.2)" }}>
            {/* Header */}
            <div style={{ padding: "18px 22px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ fontSize: T.fontMd, fontWeight: 600, color: C.text }}>{isNew ? "New Event" : "Edit block"}</h3>
              <button onClick={() => { setSchedDrawerOpen(false); setSchedDraft(null); setSchedSelected(null); }} style={{ background: "transparent", border: "none", color: C.textMid, cursor: "pointer" }}><X size={18} /></button>
            </div>
            {/* Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px", display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Title */}
              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.03em" }}>Title</label>
                <input value={schedDraft.title} onChange={ev => upd({ title: ev.target.value })} placeholder="e.g. Morning availability" autoFocus style={fieldStyle} />
              </div>
              {/* Status selector */}
              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.03em" }}>Status</label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {Object.entries(STATUS).map(([key, st]) => {
                    const active = schedDraft.status === key; const StI = st.icon;
                    return (
                      <button key={key} onClick={() => upd({ status: key })} className="smooth" style={{
                        padding: "7px 13px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                        background: active ? st.bg : "transparent", color: active ? st.text : C.textSoft,
                        border: `1.5px solid ${active ? st.border : C.border}`, cursor: "pointer",
                        display: "inline-flex", alignItems: "center", gap: 5,
                      }}><StI size={12} /> {st.label}</button>
                    );
                  })}
                </div>
              </div>
              {/* Date/time */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.03em" }}>Start</label>
                  <input type="datetime-local" value={toLocalInput(schedDraft.start)} onChange={ev => {
                    const newStart = parseLocalInput(ev.target.value);
                    if (!newStart) return;
                    // Auto-adjust end to maintain duration (or use meeting setting for new events)
                    const oldStart = new Date(schedDraft.start);
                    const oldEnd = new Date(schedDraft.end);
                    const prevDur = oldEnd - oldStart;
                    const dur = prevDur > 0 ? prevDur : (schedSettings.meetingDuration || 30) * 60000;
                    upd({ start: newStart.toISOString(), end: new Date(newStart.getTime() + dur).toISOString() });
                  }} style={fieldStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.03em" }}>End</label>
                  <input type="datetime-local" value={toLocalInput(schedDraft.end)} onChange={ev => {
                    const newEnd = parseLocalInput(ev.target.value);
                    if (!newEnd) return;
                    upd({ end: newEnd.toISOString() });
                  }} style={fieldStyle} />
                </div>
              </div>
              {/* Recurrence */}
              <div>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input type="checkbox" checked={!!schedDraft.isRecurring} onChange={ev => upd({ isRecurring: ev.target.checked })} style={{ accentColor: C.primary }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>Recurring</span>
                </label>
                {schedDraft.isRecurring && (
                  <select value={schedDraft.recurrenceRule || "weekly"} onChange={ev => upd({ recurrenceRule: ev.target.value })} style={{ ...fieldStyle, marginTop: 8 }}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                )}
              </div>
              {/* Notes */}
              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.03em" }}>Notes</label>
                <textarea value={schedDraft.notes || ""} onChange={ev => upd({ notes: ev.target.value })} rows={3} placeholder="Optional notes…" style={{ ...fieldStyle, resize: "vertical" }} />
              </div>
            </div>
            {/* Time confirmation bar */}
            <div style={{ padding: "10px 22px", background: C.primary05, borderTop: `1px solid ${C.border}`, fontSize: 12.5, color: C.textMid, display: "flex", alignItems: "center", gap: 6 }}>
              <CalendarDays size={13} color={C.primary} />
              <span>
                <strong style={{ color: C.text }}>
                  {new Date(schedDraft.start).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
                </strong>
                {" · "}
                {new Date(schedDraft.start).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                {" – "}
                {new Date(schedDraft.end).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                {" · "}
                {Math.round((new Date(schedDraft.end) - new Date(schedDraft.start)) / 60000)} min
              </span>
              {schedDraft.isRecurring && <span style={{ marginLeft: 4, fontSize: 11, fontWeight: 600, color: C.primary }}>· Repeats {schedDraft.recurrenceRule}</span>}
            </div>
            {/* Footer */}
            <div style={{ padding: "14px 22px", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
              {!isNew && <button onClick={deleteDraft} className="smooth" style={{ padding: "9px 14px", borderRadius: 8, background: C.dangerBg, color: C.danger, border: "none", fontSize: 12.5, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><Trash2 size={13} /> Delete</button>}
              <div style={{ flex: 1 }} />
              <button onClick={() => { setSchedDrawerOpen(false); setSchedDraft(null); setSchedSelected(null); }} className="smooth" style={{ padding: "9px 16px", borderRadius: 8, background: "transparent", color: C.textMid, border: `1px solid ${C.border}`, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
              <button onClick={saveDraft} className="smooth" style={{ padding: "9px 18px", borderRadius: 8, background: C.primary, color: "#fff", border: "none", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>{isNew ? "Create" : "Save changes"}</button>
            </div>
          </div>
        </div>
      );
    };

    // ═══ SETTINGS PANEL (right sidebar) ═══
    const SettingsPanel = () => (
      <div style={{
        width: 260, flexShrink: 0, borderLeft: `1px solid ${C.border}`,
        background: C.surface, overflowY: "auto", padding: "18px 16px",
        display: "flex", flexDirection: "column", gap: 18,
      }}>
        {/* Summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { label: "Available", value: `${availHours.toFixed(1)}h`, color: STATUS.available.text },
            { label: "Meetings", value: meetingCount, color: STATUS.meeting.text },
            { label: "Focus", value: `${focusHours.toFixed(1)}h`, color: STATUS.focus.text },
            { label: "Free today", value: `${todayFree.toFixed(1)}h`, color: C.primary },
          ].map(c => (
            <div key={c.label} style={{ padding: "10px 10px", borderRadius: T.radMd, background: C.bg, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: T.fontXs, fontWeight: 600, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: c.color }}>{c.value}</div>
            </div>
          ))}
        </div>
        {/* Status legend */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Status legend</div>
          {Object.entries(STATUS).map(([key, st]) => {
            const StI = st.icon;
            const active = schedFilters.statuses.includes(key);
            return (
              <label key={key} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", cursor: "pointer", opacity: active ? 1 : 0.4 }}>
                <input type="checkbox" checked={active} onChange={() => {
                  setSchedFilters(f => ({
                    ...f,
                    statuses: active ? f.statuses.filter(s => s !== key) : [...f.statuses, key],
                  }));
                }} style={{ accentColor: st.text }} />
                <span style={{ width: 8, height: 8, borderRadius: 2, background: st.border, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{st.label}</span>
              </label>
            );
          })}
        </div>
        {/* Meeting settings */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Meeting settings</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 4 }}>Duration</div>
              <div style={{ display: "flex", gap: 4 }}>
                {[15,30,45,60].map(d => (
                  <button key={d} onClick={() => setSchedSettings(s => ({ ...s, meetingDuration: d }))} className="smooth" style={{
                    flex: 1, padding: "6px 0", borderRadius: 6, fontSize: 11, fontWeight: 600,
                    background: schedSettings.meetingDuration === d ? C.primary10 : "transparent",
                    color: schedSettings.meetingDuration === d ? C.primary : C.textSoft,
                    border: `1px solid ${schedSettings.meetingDuration === d ? C.primaryBorder : C.border}`, cursor: "pointer",
                  }}>{d}m</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 4 }}>Buffer between meetings</div>
              <div style={{ display: "flex", gap: 4 }}>
                {[0,5,10,15].map(b => (
                  <button key={b} onClick={() => setSchedSettings(s => ({ ...s, bufferMinutes: b }))} className="smooth" style={{
                    flex: 1, padding: "6px 0", borderRadius: 6, fontSize: 11, fontWeight: 600,
                    background: schedSettings.bufferMinutes === b ? C.primary10 : "transparent",
                    color: schedSettings.bufferMinutes === b ? C.primary : C.textSoft,
                    border: `1px solid ${schedSettings.bufferMinutes === b ? C.primaryBorder : C.border}`, cursor: "pointer",
                  }}>{b}m</button>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 4 }}>Work starts</div>
                <input type="time" value={schedSettings.workingHours.start} onChange={ev => setSchedSettings(s => ({ ...s, workingHours: { ...s.workingHours, start: ev.target.value } }))}
                  style={{ width: "100%", padding: "6px 8px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 11 }} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 4 }}>Work ends</div>
                <input type="time" value={schedSettings.workingHours.end} onChange={ev => setSchedSettings(s => ({ ...s, workingHours: { ...s.workingHours, end: ev.target.value } }))}
                  style={{ width: "100%", padding: "6px 8px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 11 }} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 4 }}>Timezone</div>
              <select value={schedSettings.timezone} onChange={ev => setSchedSettings(s => ({ ...s, timezone: ev.target.value }))}
                style={{ width: "100%", padding: "6px 8px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 11, appearance: "none" }}>
                {["Europe/London","America/New_York","America/Los_Angeles","Asia/Dhaka","Europe/Bucharest","Asia/Dubai"].map(tz => <option key={tz} value={tz}>{tz.replace(/_/g, " ")}</option>)}
              </select>
            </div>
          </div>
        </div>
        {/* Integrations (UI only) */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Integrations</div>
          {["Google Calendar","Outlook Calendar"].map(name => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0" }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: C.bg, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CalendarDays size={13} color={C.textSoft} />
              </div>
              <div style={{ flex: 1, fontSize: 12, fontWeight: 500, color: C.text }}>{name}</div>
              <button className="smooth" style={{ padding: "4px 10px", borderRadius: 6, background: "transparent", border: `1px solid ${C.border}`, color: C.textSoft, fontSize: T.fontXs, fontWeight: 600, cursor: "pointer" }}>Connect</button>
            </div>
          ))}
        </div>
      </div>
    );

    // ═══ MAIN RENDER ═══
    const views = [
      { id: "day", label: "Day" },
      { id: "week", label: "Week" },
      { id: "workweek", label: "Work Week" },
      { id: "month", label: "Month" },
      { id: "agenda", label: "Agenda" },
    ];
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, overflow: "hidden" }}>
        {/* ── Toolbar ── */}
        <div style={{
          background: C.surface, borderBottom: `1px solid ${C.border}`,
          padding: "14px 20px",
          display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
        }}>
          <h2 style={{ fontSize: T.fontXl, fontWeight: 600, color: C.text, letterSpacing: "-0.015em", marginRight: 8, fontFamily: "'Roboto', sans-serif" }}>Schedule</h2>
          {/* Admin: user selector to view anyone's schedule */}
          {currentUser.type === "admin" && (
            <div style={{ position: "relative" }}>
              <select
                value={schedViewUserId || currentUser.id}
                onChange={e => setSchedViewUserId(e.target.value === currentUser.id ? null : e.target.value)}
                style={{
                  padding: "6px 28px 6px 10px", borderRadius: 7, fontSize: 12, fontWeight: 600,
                  background: schedViewUserId ? C.primary10 : "transparent",
                  color: schedViewUserId ? C.primary : C.textMid,
                  border: `1px solid ${schedViewUserId ? C.primary : C.border}`,
                  cursor: "pointer", appearance: "auto",
                }}
              >
                <option value={currentUser.id}>My Schedule</option>
                {USERS.filter(u => u.type !== "student" && u.id !== currentUser.id).map(u => (
                  <option key={u.id} value={u.id}>{u.name} — {u.role}</option>
                ))}
              </select>
            </div>
          )}
          <button onClick={goToday} className="smooth" style={{
            padding: "6px 14px", borderRadius: 7, fontSize: 12, fontWeight: 600,
            background: "transparent", color: C.textMid, border: `1px solid ${C.border}`, cursor: "pointer",
          }}>Today</button>
          <div style={{ display: "flex", gap: 2 }}>
            <button onClick={() => navigate(-1)} className="smooth" style={{ width: 30, height: 30, borderRadius: 7, background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronLeft size={15} /></button>
            <button onClick={() => navigate(1)} className="smooth" style={{ width: 30, height: 30, borderRadius: 7, background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronRight size={15} /></button>
          </div>
          <span style={{ fontSize: T.fontMd, fontWeight: 600, color: C.text, minWidth: 180 }}>{dateLabel}</span>
          <div style={{ flex: 1 }} />
          {/* View switcher */}
          <div style={{ display: "inline-flex", padding: 3, borderRadius: 8, background: darkMode ? "rgba(255,255,255,0.04)" : "#F1F5F9", border: `1px solid ${C.border}` }}>
            {views.map(v => {
              const a = schedView === v.id;
              return <button key={v.id} onClick={() => setSchedView(v.id)} className="smooth" style={{
                padding: "5px 12px", borderRadius: 6, fontSize: 11.5, fontWeight: a ? 600 : 500,
                background: a ? C.surface : "transparent", color: a ? C.primary : C.textSoft,
                border: "none", cursor: "pointer",
                boxShadow: a ? C.shadow : "none",
              }}>{v.label}</button>;
            })}
          </div>
          <button onClick={() => openCreate()} className="smooth" style={{
            padding: "8px 16px", borderRadius: 8, background: C.primary, color: "#fff",
            border: "none", fontSize: 12.5, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}><Plus size={14} strokeWidth={2.5} /> New</button>
        </div>

        {/* ── Content: calendar + settings panel ── */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Calendar area */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.surface }}>
            {schedView === "month" ? MonthGrid()
              : schedView === "agenda" ? AgendaView()
              : TimeGrid({ days: viewDays })}
          </div>
          {/* Settings sidebar */}
          {SettingsPanel()}
        </div>
        {/* Drawer overlay */}
        {BlockDrawer()}
      </div>
    );
  }

function MyAvailabilityTab() {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dayLong = { Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday", Sun: "Sunday" };

    return (
      <div className="fade-up" style={{
        flex: 1, padding: "22px 26px",
        display: "grid", gridTemplateColumns: "1fr 320px", gap: 28,
        overflowY: "auto",
      }}>
        {/* Weekly availability */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>
            Weekly hours
          </h3>
          <p style={{ fontSize: 11.5, color: C.textSoft, marginBottom: 18 }}>
            Set the times you're available. Contacts can only book within these slots.
          </p>
          <div style={{
            border: `1px solid ${C.border}`, borderRadius: T.radLg,
            background: C.surface, overflow: "hidden",
          }}>
            {days.map((d, i) => {
              const a = availability[d];
              return (
                <div key={d} style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr auto",
                  alignItems: "center", gap: 14,
                  padding: "12px 16px",
                  borderBottom: i < 6 ? `1px solid ${C.divider}` : "none",
                  opacity: a.active ? 1 : 0.55,
                }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}>
                    <div
                      onClick={() => setAvailability(p => ({ ...p, [d]: { ...p[d], active: !p[d].active } }))}
                      className="smooth"
                      style={{
                        width: 32, height: 18, borderRadius: T.radFull,
                        background: a.active ? C.primary : C.border,
                        position: "relative",
                      }}
                    >
                      <div style={{
                        position: "absolute", top: 2, left: a.active ? 16 : 2,
                        width: 14, height: 14, borderRadius: "50%",
                        background: C.surface, transition: "left 0.16s ease",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
                      }} />
                    </div>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: C.text }}>{dayLong[d]}</span>
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input
                      type="time"
                      value={a.from}
                      onChange={e => setAvailability(p => ({ ...p, [d]: { ...p[d], from: e.target.value } }))}
                      disabled={!a.active}
                      style={{
                        padding: "6px 10px", borderRadius: 7,
                        border: `1px solid ${C.border}`, background: C.bg,
                        fontSize: 11.5, color: C.text, width: 110,
                      }}
                    />
                    <span style={{ fontSize: 11, color: C.textSoft }}>to</span>
                    <input
                      type="time"
                      value={a.to}
                      onChange={e => setAvailability(p => ({ ...p, [d]: { ...p[d], to: e.target.value } }))}
                      disabled={!a.active}
                      style={{
                        padding: "6px 10px", borderRadius: 7,
                        border: `1px solid ${C.border}`, background: C.bg,
                        fontSize: 11.5, color: C.text, width: 110,
                      }}
                    />
                  </div>
                  <button
                    onClick={() => setAvailability(p => ({ ...p, [d]: { from: "09:00", to: "17:00", active: p[d].active } }))}
                    className="iconbtn smooth"
                    style={{ width: 28, height: 28, borderRadius: 6, color: C.textMid }}
                    title="Reset"
                  >
                    <RefreshCcw size={12} />
                  </button>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button
              onClick={() => { setSavedAvail(true); setTimeout(() => setSavedAvail(false), 2200); }}
              className="smooth"
              style={{
                padding: "9px 20px", borderRadius: T.radMd,
                background: C.primary, color: "#fff",
                fontSize: 12.5, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 7,
              }}
            >
              <Check size={14} />
              Save Availability
            </button>
            {savedAvail && (
              <span className="pop" style={{
                padding: "9px 14px", borderRadius: T.radMd,
                background: C.successBg, color: C.success,
                fontSize: 11.5, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <CircleCheck size={14} />
                Saved
              </span>
            )}
          </div>
        </div>

        {/* Sidebar settings */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>
            Meeting settings
          </h3>
          <p style={{ fontSize: 11.5, color: C.textSoft, marginBottom: 18 }}>
            Default meeting length and timezone.
          </p>
          <div style={{
            border: `1px solid ${C.border}`, borderRadius: T.radLg,
            background: C.surface, padding: 16,
          }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 7, display: "block" }}>
                Meeting Duration
              </label>
              <div style={{ display: "flex", gap: 6 }}>
                {[15, 30, 45, 60].map(d => {
                  const sel = meetingDuration === d;
                  return (
                    <button
                      key={d}
                      onClick={() => setMeetingDuration(d)}
                      className="smooth"
                      style={{
                        flex: 1, padding: "8px 0", borderRadius: 8,
                        background: sel ? C.primary : C.bg,
                        color: sel ? "#fff" : C.text,
                        fontSize: 11.5, fontWeight: 600,
                        border: sel ? `1px solid ${C.primary}` : `1px solid ${C.border}`,
                      }}
                    >
                      {d}m
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 7, display: "block" }}>
                Timezone
              </label>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "9px 12px", borderRadius: 8,
                background: C.bg, border: `1px solid ${C.border}`,
                fontSize: 11.5, color: C.text,
              }}>
                <Globe size={13} color={C.textMid} />
                Europe/London (GMT+1)
              </div>
            </div>

            <div style={{ marginBottom: 0 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 7, display: "block" }}>
                Buffer before/after
              </label>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "9px 12px", borderRadius: 8,
                background: C.bg, border: `1px solid ${C.border}`,
                fontSize: 11.5, color: C.text,
              }}>
                <Coffee size={13} color={C.textMid} />
                5 minutes between meetings
              </div>
            </div>
          </div>

          <div style={{
            marginTop: 16, padding: 14, borderRadius: T.radLg,
            background: C.sec10, border: `1px solid ${C.secBorder}`,
            display: "flex", gap: 10, alignItems: "flex-start",
          }}>
            <AlertCircle size={16} color={C.secondary} style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ fontSize: 11, color: C.text, lineHeight: 1.5 }}>
              <strong>Tip:</strong> Sync your Google Calendar to automatically block out conflicting times.
              <button style={{
                color: C.secondary, fontWeight: 700, marginLeft: 4, cursor: "pointer",
              }}>Connect →</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return AvailabilityView();
}
