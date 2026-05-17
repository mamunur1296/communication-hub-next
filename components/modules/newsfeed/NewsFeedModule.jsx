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

export default function NewsFeedModule({ ctx }) {
  const {
    Tooltip,
    Avatar,
    C,
    FEED_AUDIENCES,
    FEED_CATEGORIES,
    FEED_PRIORITIES,
    FEELINGS,
    GROUP_ICONS,
    ORANGE,
    PINK,
    PURPLE,
    REACTION_TYPES,
    SAMPLE_PHOTO_LIBRARY,
    T,
    USERS,
    a,
    acc,
    active,
    activeCats,
    allPromoData,
    allVisible,
    amount,
    assignedTo,
    aud,
    author,
    b,
    badge,
    bodyText,
    bookmarksByUser,
    c,
    canManageCommissions,
    canPost,
    canSchedulePosts,
    canSeePost,
    canUseTemplates,
    cat,
    closeTemplatesWizard,
    color,
    comm,
    commissions,
    companyCount,
    confirmation,
    course,
    courses,
    cu,
    currentUser,
    darkMode,
    dismissAllMissed,
    dismissMissed,
    e,
    f,
    feedAcknowledge,
    feedAddComment,
    feedCommentDraftByPost,
    feedComposeExpanded,
    feedComposerCollapse,
    feedComposerSetFeeling,
    feedComposerSetLocation,
    feedComposerSheet,
    feedComposerTogglePhoto,
    feedComposerToggleTag,
    feedDraft,
    feedExpandedComments,
    feedPosts,
    feedPublish,
    feedReact,
    feedReactionPickerOpen,
    feedScope,
    feedSearch,
    feedTagSearch,
    feedToggleComments,
    feedTogglePin,
    filter,
    findUser,
    forYouCount,
    getCatData,
    i,
    id,
    idx,
    isAdmin,
    isAuthor,
    isLinkedIn,
    isOffer,
    isPast,
    isReady,
    isUnread,
    isUrgent,
    item,
    items,
    label,
    line,
    link,
    list,
    loc,
    maxAmount,
    minDate,
    minDateTime,
    missedItems,
    myAck,
    myBookmarks,
    myCount,
    myReaction,
    myReactions,
    myScheduledPosts,
    newCourses,
    newUniversities,
    now,
    o,
    on,
    openCenter,
    openTemplatesWizard,
    p,
    ph,
    picked,
    platformColor,
    post,
    promoCategories,
    promotedMarketingEvents,
    r,
    recruitChip,
    remaining,
    renderTemplatesMenu,
    restCount,
    s,
    savedCount,
    scheduleDate,
    scheduleEnabled,
    schedulePost,
    scheduleTime,
    setActivePage,
    setFeedCommentDraftByPost,
    setFeedComposeExpanded,
    setFeedComposerSheet,
    setFeedDraft,
    setFeedReactionPickerOpen,
    setFeedScope,
    setFeedSearch,
    setFeedTagSearch,
    setHubFeature,
    setPromoCenterFilter,
    setPromoCenterOpen,
    setPromoCenterSearch,
    setScheduleDate,
    setScheduleEnabled,
    setScheduleTime,
    setSettingsSubItem,
    setSharePostTarget,
    setShowScheduledFlyout,
    shortUni,
    shown,
    sorted,
    startDate,
    subtitle,
    sum,
    summary,
    t,
    tabs,
    taggedUsers,
    target,
    teamCount,
    templatesMenu,
    title,
    toggleBookmark,
    top,
    totalAudience,
    totalItems,
    totalReactions,
    type,
    tz,
    u,
    uni,
    universities,
    visibleCommissions,
    visibleFeedPosts,
    x
  } = ctx;

function NewsFeedView() {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
        {/* Toolbar — search only. Centered with the reading column; subtle bottom hairline. */}
        <div style={{
          background: C.surface, borderBottom: `1px solid ${C.divider}`,
          padding: "14px 28px", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, maxWidth: 1080, margin: "0 auto" }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 720 }}>
              <Search size={14} color={C.textSoft} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" }} />
              <input
                value={feedSearch}
                onChange={e => setFeedSearch(e.target.value)}
                placeholder="Search posts by keyword, student, university…"
                style={{
                  width: "100%", padding: "10px 14px 10px 36px",
                  borderRadius: T.radMd, border: `1px solid ${C.border}`,
                  background: C.bg, fontSize: 13, color: C.text,
                  outline: "none",
                  fontFamily: "'Roboto', sans-serif",
                }}
              />
            </div>
          </div>
        </div>

        {/* Feed body — single scroll container with generous reading rhythm. */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "24px 28px",
          scrollbarGutter: "stable",
        }}>
          <div style={{
            maxWidth: 1080, margin: "0 auto",
            display: "flex", gap: 22, alignItems: "flex-start",
          }}>
            {/* Main feed column — 720px reading width per design spec */}
            <div style={{
              flex: "1 1 720px", maxWidth: 720, minWidth: 0,
              display: "flex", flexDirection: "column", gap: 16,
            }}>
              {/* Role-based scope tabs (For You / Team / Company) */}
              {FeedScopeTabs()}

              {/* AI-Powered "What You Missed" carousel */}
              {WhatYouMissed()}

              {/* Inline Facebook-style composer at top of feed */}
              {FeedComposer()}

              {visibleFeedPosts.length === 0 ? (
                <div style={{
                  padding: "60px 24px", textAlign: "center",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: C.surface, border: `1px dashed ${C.borderStrong}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {feedScope === "saved" ? <Bookmark size={22} color={C.textVerySoft} /> : <Newspaper size={22} color={C.textVerySoft} />}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.textMid }}>
                    {feedSearch.trim()
                      ? `No posts match "${feedSearch}"`
                      : feedScope === "saved"
                        ? "No saved posts yet."
                        : "No posts in this view yet"}
                  </div>
                  <div style={{ fontSize: 11.5, color: C.textSoft }}>
                    {feedSearch.trim()
                      ? "Try a different keyword or clear your search."
                      : feedScope === "saved"
                        ? "Tap the bookmark icon on any post to save it for later."
                        : "Switch tabs or create a new post to get started."}
                  </div>
                </div>
              ) : (
                visibleFeedPosts.map(post => post.removed
                  ? <RemovedPostCard key={post.id} post={post} />
                  : FeedPostCard({ post })
                )
              )}
            </div>

            {/* Right rail — scrolls naturally with the feed */}
            {PromotionsRail()}
          </div>
        </div>
      </div>
    );
  }

function PromotionsRail() {
    const openCenter = (filter) => { setPromoCenterFilter(filter || "all"); setPromoCenterSearch(""); setPromoCenterOpen(true); };
    const isAdmin = currentUser.type === "admin" || currentUser.role === "System Admin";

    // Collect all promo data sources
    const allPromoData = {
      commission: visibleCommissions || [],
      university: newUniversities || [],
      course: newCourses || [],
      event: promotedMarketingEvents || [],
    };

    // Category-to-data mapping
    const getCatData = (cat) => {
      if (cat.name === "Commission News") return { type: "commission", items: allPromoData.commission };
      if (cat.name === "New University") return { type: "university", items: allPromoData.university };
      if (cat.name === "Intake Alerts") return { type: "course", items: allPromoData.course };
      if (cat.name === "Events & Webinars") return { type: "event", items: allPromoData.event };
      return { type: "generic", items: cat.items || [] };
    };

    // Compact card renderer for 2-item preview
    const MiniCard = ({ title, subtitle, amount, badge, color }) => (
      <div style={{ padding: "8px 10px", borderRadius: T.radSm, background: C.bg, border: `1px solid ${C.border}`, marginBottom: 4 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: T.fontSm, fontWeight: 600, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>
            {subtitle && <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{subtitle}</div>}
          </div>
          {amount && <div style={{ fontSize: T.fontSm, fontWeight: 700, color: color || C.secondary, whiteSpace: "nowrap" }}>{amount}</div>}
          {badge && !amount && <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: T.radSm, background: `${color || C.secondary}12`, color: color || C.secondary }}>{badge}</span>}
        </div>
      </div>
    );

    const activeCats = [...promoCategories].filter(c => c.active).sort((a, b) => a.priority - b.priority);
    const totalItems = activeCats.reduce((sum, cat) => sum + getCatData(cat).items.length, 0);

    return (
      <div className="promo-rail" style={{ width: 330, flexShrink: 0, display: "flex", flexDirection: "column", gap: T.sp3 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
          <div style={{ fontSize: T.fontXs, fontWeight: 700, color: C.textSoft, letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 5 }}>
            <Sparkles size={11} color={C.secondary} />
            PROMOTIONS & CAMPAIGNS
          </div>
          <button onClick={() => openCenter("all")} className="smooth" style={{ fontSize: T.fontXs, fontWeight: 600, color: C.textSoft, background: "transparent", padding: "2px 6px", borderRadius: T.radSm }}
            onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSoft; }}
          >See all</button>
        </div>

        {/* Category cards — max 2 items each */}
        {activeCats.map(cat => {
          const { type, items } = getCatData(cat);
          if (items.length === 0) return null;
          const color = cat.color || C.secondary;
          const shown = items.slice(0, 2);
          const remaining = items.length - 2;

          return (
            <div key={cat.id} style={{ background: C.surface, borderRadius: T.radLg, border: `1px solid ${C.border}`, overflow: "hidden" }}>
              <div style={{ padding: "10px 12px", background: `${color}08`, borderBottom: `1px solid ${color}15` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", color, textTransform: "uppercase" }}>{items.length} {cat.name.toUpperCase()}</span>
                  <Briefcase size={11} color={color} />
                </div>
              </div>
              <div style={{ padding: "8px 10px" }}>
                {type === "commission" && shown.map(c => (
                  <MiniCard key={c.id} title={c.university} subtitle={`${c.minimumStudents}+ students · ${c.accountIntake}`} amount={c.commissionAmount} color={color} />
                ))}
                {type === "university" && shown.map(u => (
                  <MiniCard key={u.id} title={u.name} subtitle={u.location} badge={u.ranking ? `#${u.ranking}` : "New"} color={color} />
                ))}
                {type === "course" && shown.map(c => (
                  <MiniCard key={c.id} title={c.name} subtitle={`${c.university} · ${c.level}`} badge={c.mode} color={color} />
                ))}
                {type === "event" && shown.map(e => (
                  <MiniCard key={e.id || e.title} title={e.title || e.name} subtitle={e.date || e.eventDate} badge={e.type || e.eventType} color={color} />
                ))}
                {type === "generic" && shown.map(item => (
                  <MiniCard key={item.id} title={item.title} subtitle={item.desc} badge={item.badge} color={color} />
                ))}
                {/* View All CTA */}
                {remaining > 0 && (
                  <button onClick={() => openCenter(type)} className="smooth" style={{
                    width: "100%", padding: "7px 0", borderRadius: T.radSm, marginTop: 2,
                    border: `1px solid ${color}20`, background: "transparent",
                    color, fontSize: T.fontXs, fontWeight: 600, cursor: "pointer",
                  }}>View all {items.length} {cat.name.toLowerCase()}</button>
                )}
              </div>
            </div>
          );
        })}

        {totalItems === 0 && (
          <div style={{ padding: "24px 16px", textAlign: "center", fontSize: T.fontSm, color: C.textSoft, lineHeight: T.lineBody }}>
            No active promotions right now.<br />New campaigns will appear here when published.
          </div>
        )}

        <div style={{ marginTop: 2, padding: "8px 12px", fontSize: T.fontXs, color: C.textVerySoft, textAlign: "center" }}>
          {isAdmin ? <button onClick={() => { setHubFeature("settings"); setSettingsSubItem("settings-promos"); }} style={{ background: "transparent", border: "none", color: C.primary, fontSize: T.fontXs, fontWeight: 600, cursor: "pointer" }}>Manage promotions</button> : "Managed by System Admin"}
        </div>
      </div>
    );
  }

function CommissionPromoCard({ commissions }) {
    // Soft warm peach palette in light mode; in dark mode the peach would
    // bleach out the title, so we use a dark-friendly soft orange tint that
    // still keeps the card's "promotional" feel without losing legibility.
    const ORANGE = {
      bg:       darkMode ? "rgba(252,115,0,0.06)" : "rgba(252,115,0,0.04)",
      border:   darkMode ? "rgba(252,115,0,0.18)" : "rgba(252,115,0,0.12)",
      accent:   "#FC7300",
      accent10: "rgba(252,115,0,0.08)",
      accent30: "rgba(252,115,0,0.20)",
    };

    // Show top 2 by amount; "View all" if more
    const top = [...commissions].sort((a, b) => b.commissionAmount - a.commissionAmount).slice(0, 2);
    const restCount = commissions.length - top.length;
    const maxAmount = Math.max(...commissions.map(c => c.commissionAmount));

    return (
      <div style={{
        background: C.surface, borderRadius: T.radLg,
        border: `1px solid ${C.border}`,
        overflow: "hidden",
      }}>
        {/* Calm header band */}
        <div style={{
          padding: "11px 13px",
          background: ORANGE.bg,
          borderBottom: `1px solid ${ORANGE.border}`,
        }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 5,
          }}>
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.06em",
              color: ORANGE.accent, textTransform: "uppercase",
            }}>Active · {commissions.length} campaign{commissions.length !== 1 ? "s" : ""}</span>
            <Briefcase size={12} color={ORANGE.accent} />
          </div>
          <h3 style={{
            fontSize: 13.5, fontWeight: 700, lineHeight: 1.3,
            letterSpacing: "-0.005em",
            color: C.text,
          }}>Earn up to £{maxAmount.toLocaleString()} per student</h3>
        </div>

        {/* Card body — top items */}
        <div style={{ padding: "10px 12px 12px" }}>
          {top.map((comm, idx) => {
            const startDate = new Date(comm.startFrom).toLocaleDateString(undefined, {
              day: "numeric", month: "short", year: "numeric",
            });
            // Trim long uni names for the rail card
            const shortUni = comm.university.replace(/_.*$/, "").replace(/\s*-\s*.*$/, "").trim();
            return (
              <div
                key={comm.id}
                style={{
                  padding: "9px 10px",
                  borderRadius: 8,
                  background: C.bg,
                  border: `1px solid ${C.border}`,
                  marginBottom: idx < top.length - 1 ? 7 : 0,
                }}
              >
                <div style={{
                  display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                  gap: 9, marginBottom: 5,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 11.5, fontWeight: 700, color: C.text,
                      lineHeight: 1.3,
                    }}>{shortUni}</div>
                    <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 2 }}>
                      {comm.minimumStudents}+ students · {comm.accountIntake}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 14, fontWeight: 800, color: C.secondary,
                    flexShrink: 0,
                  }}>£{comm.commissionAmount.toLocaleString()}</div>
                </div>
                <div style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontSize: 9.5, color: C.textSoft, fontWeight: 500,
                }}>
                  <Clock size={9} />
                  <span>From {startDate}</span>
                  <span style={{ color: C.textVerySoft }}>·</span>
                  <span style={{
                    padding: "1px 5px", borderRadius: 4,
                    background: C.surface, border: `1px solid ${C.border}`,
                    fontWeight: 600, color: C.textMid,
                  }}>{comm.commissionGroup.split(" ").slice(0, 3).join(" ")}</span>
                </div>
              </div>
            );
          })}

          {restCount > 0 && (
            <button
              onClick={() => {
                if (canManageCommissions()) setActivePage("commission-promotional");
                // For non-admins, this could navigate to a dedicated read-only listing in the future.
                // For now, the rail's top 2 + count is the user-facing entry point.
              }}
              className="smooth"
              style={{
                width: "100%", marginTop: 8,
                padding: "7px 9px", borderRadius: 7,
                background: "transparent", color: C.secondary,
                fontSize: 11, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                border: `1px solid ${ORANGE.border}`,
                cursor: canManageCommissions() ? "pointer" : "default",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = ORANGE.accent10; e.currentTarget.style.borderColor = ORANGE.accent30; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = ORANGE.border; }}
            >
              View all {commissions.length} campaigns
              <ChevronRight size={11} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    );
  }

function UniversityPromoCard({ universities }) {
    // Soft lavender palette in light mode; in dark mode use a soft purple tint
    // that doesn't bleach out card text.
    const PURPLE = {
      bg:       darkMode ? "rgba(124,58,237,0.10)" : "#F5F0FB",
      bgHover:  darkMode ? "rgba(124,58,237,0.18)" : "#EDE5F7",
      border:   darkMode ? "rgba(124,58,237,0.30)" : "#E0D2F0",
      accent:   "#7C3AED",
      accent10: "rgba(124,58,237,0.10)",
      accent30: "rgba(124,58,237,0.28)",
    };

    // Sort newest first; show top 2
    const sorted = [...universities].sort((a, b) => (b.addedAt || "").localeCompare(a.addedAt || ""));
    const top = sorted.slice(0, 2);
    const restCount = universities.length - top.length;

    // Recruitment-type chip helper
    const recruitChip = (label, on) => (
      <span style={{
        fontSize: 9, fontWeight: 700,
        padding: "2px 6px", borderRadius: 4,
        background: on ? "rgba(252,115,0,0.10)" : C.bg,
        color: on ? C.secondary : C.textVerySoft,
        border: `1px solid ${on ? "rgba(252,115,0,0.25)" : C.border}`,
        letterSpacing: "0.02em",
      }}>{label}</span>
    );

    return (
      <div style={{
        background: C.surface, borderRadius: T.radLg,
        border: `1px solid ${PURPLE.border}`,
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(13,31,31,0.04)",
      }}>
        {/* Soft lavender header band */}
        <div style={{
          padding: "11px 13px",
          background: PURPLE.bg,
          borderBottom: `1px solid ${PURPLE.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{
            fontSize: T.fontXs, fontWeight: 700, color: PURPLE.accent,
            letterSpacing: "0.06em",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <GraduationCap size={12} color={PURPLE.accent} />
            NEW UNIVERSITIES
          </div>
          <div style={{
            fontSize: 9, fontWeight: 800, letterSpacing: "0.06em",
            padding: "2px 7px", borderRadius: 4,
            background: PURPLE.accent, color: "#fff",
          }}>NEW</div>
        </div>

        {/* List */}
        <div style={{ padding: "10px 12px 12px" }}>
          {top.map((uni, idx) => (
            <div
              key={uni.id}
              style={{
                padding: "10px 11px",
                borderRadius: 8,
                background: C.bg,
                border: `1px solid ${C.border}`,
                marginBottom: idx < top.length - 1 ? 7 : 0,
                display: "flex", alignItems: "flex-start", gap: 10,
              }}
            >
              {/* Logo placeholder — coloured square with initials */}
              <div style={{
                width: 36, height: 36, borderRadius: 7,
                background: uni.logoBg,
                color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11.5, fontWeight: 800, letterSpacing: "0.02em",
                flexShrink: 0,
              }}>{uni.logoInitials}</div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 11.5, fontWeight: 700, color: C.text,
                  lineHeight: 1.3,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>{uni.name}</div>
                <div style={{
                  fontSize: 9.5, color: C.textSoft, marginTop: 2,
                  display: "flex", alignItems: "center", gap: 5,
                }}>
                  <span>{uni.type}</span>
                  <span style={{ color: C.textVerySoft }}>·</span>
                  <span>{uni.country}</span>
                </div>

                {/* Recruitment-type chips */}
                <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                  {recruitChip("Home/UK", uni.recruitment.homeUK)}
                  {recruitChip("EU/EEU", uni.recruitment.eu)}
                  {recruitChip("Int'l", uni.recruitment.international)}
                </div>
              </div>
            </div>
          ))}

          {restCount > 0 && (
            <button
              className="smooth"
              style={{
                width: "100%", marginTop: 8,
                padding: "7px 9px", borderRadius: 7,
                background: "transparent", color: PURPLE.accent,
                fontSize: 11, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                border: `1px solid ${PURPLE.border}`,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = PURPLE.accent10; e.currentTarget.style.borderColor = PURPLE.accent30; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = PURPLE.border; }}
            >
              View {restCount} more {restCount === 1 ? "university" : "universities"}
              <ChevronRight size={11} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    );
  }

function CoursePromoCard({ courses }) {
    // Soft rose/pink palette in light mode; soft pink tint in dark mode.
    const PINK = {
      bg:       darkMode ? "rgba(219,39,119,0.10)" : "#FDF1F5",
      bgHover:  darkMode ? "rgba(219,39,119,0.18)" : "#FAE3EC",
      border:   darkMode ? "rgba(219,39,119,0.30)" : "#F5D2DE",
      accent:   "#DB2777",
      accent10: "rgba(219,39,119,0.10)",
      accent30: "rgba(219,39,119,0.28)",
    };

    const sorted = [...courses].sort((a, b) => (b.addedAt || "").localeCompare(a.addedAt || ""));
    const top = sorted.slice(0, 2);
    const restCount = courses.length - top.length;

    return (
      <div style={{
        background: C.surface, borderRadius: T.radLg,
        border: `1px solid ${PINK.border}`,
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(13,31,31,0.04)",
      }}>
        {/* Soft rose header band */}
        <div style={{
          padding: "11px 13px",
          background: PINK.bg,
          borderBottom: `1px solid ${PINK.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{
            fontSize: T.fontXs, fontWeight: 700, color: PINK.accent,
            letterSpacing: "0.06em",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <FileText size={12} color={PINK.accent} />
            NEW COURSES
          </div>
          <div style={{
            fontSize: 9, fontWeight: 800, letterSpacing: "0.06em",
            padding: "2px 7px", borderRadius: 4,
            background: PINK.accent, color: "#fff",
          }}>{courses.length}</div>
        </div>

        {/* List */}
        <div style={{ padding: "10px 12px 12px" }}>
          {top.map((course, idx) => (
            <div
              key={course.id}
              style={{
                padding: "10px 11px",
                borderRadius: 8,
                background: C.bg,
                border: `1px solid ${C.border}`,
                marginBottom: idx < top.length - 1 ? 7 : 0,
              }}
            >
              <div style={{
                fontSize: 11.5, fontWeight: 700, color: C.text,
                lineHeight: 1.35,
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                overflow: "hidden",
                marginBottom: 5,
              }}>{course.title}</div>
              <div style={{
                fontSize: T.fontXs, color: C.textSoft, marginBottom: 6,
                display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap",
              }}>
                <Building2 size={9} />
                <span style={{ fontWeight: 600, color: C.textMid }}>{course.universityShort}</span>
                <span style={{ color: C.textVerySoft }}>·</span>
                <span>{course.campus}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                <span style={{
                  fontSize: 9, fontWeight: 700,
                  padding: "2px 6px", borderRadius: 4,
                  background: PINK.accent10, color: PINK.accent,
                  border: `1px solid ${PINK.accent30}`,
                  letterSpacing: "0.02em",
                }}>{course.educationLevel}</span>
                <span style={{
                  fontSize: 9.5, color: C.textMid, fontWeight: 500,
                  display: "inline-flex", alignItems: "center", gap: 3,
                }}>
                  <CalendarDays size={9} />
                  {course.intake}
                </span>
              </div>
            </div>
          ))}

          {restCount > 0 && (
            <button
              className="smooth"
              style={{
                width: "100%", marginTop: 8,
                padding: "7px 9px", borderRadius: 7,
                background: "transparent", color: PINK.accent,
                fontSize: 11, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                border: `1px solid ${PINK.border}`,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = PINK.accent10; e.currentTarget.style.borderColor = PINK.accent30; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = PINK.border; }}
            >
              View {restCount} more {restCount === 1 ? "course" : "courses"}
              <ChevronRight size={11} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    );
  }

function FeedScopeTabs() {
    // Counts for badges
    const allVisible = feedPosts.filter(p => canSeePost(p, currentUser));

    // For You: authored by current user OR mentions current user
    const forYouCount = allVisible.filter(p =>
      p.author === currentUser.id ||
      (Array.isArray(p.tagged) && p.tagged.includes(currentUser.id)) ||
      p.structured?.assignedTo === currentUser.id ||
      (Array.isArray(p.comments) && p.comments.some(c => c.author === currentUser.id))
    ).length;

    // Team Updates: department-targeted (admin sees all team-targeted)
    const teamCount = allVisible.filter(p =>
      currentUser.dept === "system"
        ? (p.audience === "sales" || p.audience === "admission" || p.audience === "leadership")
        : (p.audience === currentUser.dept ||
           (p.audience === "leadership" && currentUser.level <= 3))
    ).length;

    // Company Wide: full visible set
    const companyCount = allVisible.length;

    // Saved Posts: total bookmarks (including ones whose post was removed)
    const savedCount = Object.keys(bookmarksByUser[currentUser.id] || {}).length;

    const tabs = [
      { id: "for_you", label: "For You",      count: forYouCount },
      { id: "team",    label: "Team Updates", count: teamCount },
      { id: "company", label: "Company Wide", count: companyCount },
      { id: "saved",   label: "Saved Posts",  count: savedCount, icon: Bookmark },
    ];

    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12, flexWrap: "wrap",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 2,
        }}>
          {tabs.map(t => {
            const active = feedScope === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setFeedScope(t.id)}
                className="smooth"
                style={{
                  padding: "7px 14px", borderRadius: 8,
                  fontSize: 12.5, fontWeight: active ? 600 : 500,
                  background: active ? C.primary10 : "transparent",
                  color: active ? C.primary : C.textSoft,
                  display: "inline-flex", alignItems: "center", gap: 5,
                  border: "none", cursor: "pointer",
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSoft; } }}
              >
                {t.label}
                {t.count !== undefined && t.count > 0 && (
                  <span style={{
                    fontSize: 9.5, fontWeight: 700,
                    padding: "1px 6px", borderRadius: T.radFull,
                    background: active ? C.primary20 : C.bg,
                    color: active ? C.primary : C.textSoft,
                  }}>{t.count}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Scheduled link — only for permitted users */}
        {canSchedulePosts() && myScheduledPosts.length > 0 && (
          <button
            onClick={() => setShowScheduledFlyout(true)}
            className="smooth"
            style={{
              padding: "5px 11px", borderRadius: 7,
              background: C.primary05, border: `1px solid ${C.primary20}`,
              color: C.primary, fontSize: 11.5, fontWeight: 600,
              display: "inline-flex", alignItems: "center", gap: 5,
            }}
            onMouseEnter={e => e.currentTarget.style.background = C.primary10}
            onMouseLeave={e => e.currentTarget.style.background = C.primary05}
          >
            <Clock size={11} />
            Scheduled
            <span style={{
              fontSize: 9.5, fontWeight: 700,
              padding: "1px 6px", borderRadius: T.radFull,
              background: C.primary10, color: C.primary,
            }}>{myScheduledPosts.length}</span>
            <ChevronRight size={11} strokeWidth={2.5} />
          </button>
        )}
      </div>
    );
  }

function WhatYouMissed() {
    if (missedItems.length === 0) return null;

    return (
      <div style={{
        background: C.surface, borderRadius: T.radLg,
        border: `1px solid ${C.border}`,
        padding: "12px 14px",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 9,
          marginBottom: 10, padding: "0 2px",
        }}>
          <Sparkles size={12} color={C.primary} />
          <span style={{
            fontSize: T.fontXs, fontWeight: 700, color: C.text,
            letterSpacing: "0.10em", textTransform: "uppercase",
          }}>What you missed</span>
          <span style={{
            fontSize: 9.5, fontWeight: 700,
            background: C.primary10, color: C.primary,
            padding: "1px 7px", borderRadius: T.radFull,
          }}>{missedItems.length}</span>
          <button
            onClick={dismissAllMissed}
            className="smooth"
            style={{
              marginLeft: "auto",
              fontSize: 11, fontWeight: 600, color: C.textSoft,
              padding: "4px 8px", borderRadius: 6,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSoft; }}
          >
            Mark all read
          </button>
        </div>

        {/* Horizontal track */}
        <div style={{
          display: "flex", gap: 10, overflowX: "auto",
          paddingBottom: 6, scrollSnapType: "x mandatory",
        }}>
          {missedItems.map(post => {
            const author = findUser(post.author);
            const c = FEED_CATEGORIES[post.category];
            // AI-style auto-summary: reuse title or first sentence
            const summary = post.title
              || (post.body || "").split(/\n+/)[0].slice(0, 140);
            return (
              <div
                key={post.id}
                className="missed-card smooth"
                style={{
                  flexShrink: 0, width: 280,
                  background: C.bg, border: `1px solid ${C.border}`,
                  borderRadius: T.radMd, padding: "11px 12px",
                  scrollSnapAlign: "start",
                  position: "relative",
                  cursor: "pointer",
                  transition: "transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.borderColor = C.primary30;
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(4,93,94,0.08)";
                  const x = e.currentTarget.querySelector(".missed-x");
                  if (x) x.style.opacity = "1";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.boxShadow = "none";
                  const x = e.currentTarget.querySelector(".missed-x");
                  if (x) x.style.opacity = "0";
                }}
              >
                <button
                  className="missed-x smooth"
                  onClick={(e) => { e.stopPropagation(); dismissMissed(post.id); }}
                  style={{
                    position: "absolute", top: 6, right: 6,
                    width: 20, height: 20, borderRadius: 5,
                    color: C.textVerySoft, opacity: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.color = C.text; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textVerySoft; }}
                >
                  <X size={11} strokeWidth={2.5} />
                </button>

                <div style={{
                  display: "flex", alignItems: "center", gap: 6, marginBottom: 7,
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: c?.color || C.textMid, flexShrink: 0,
                  }} />
                  <span style={{
                    fontSize: 9.5, fontWeight: 600, color: C.textMid,
                    letterSpacing: "0.02em",
                  }}>{c?.label}</span>
                  <span style={{
                    marginLeft: "auto",
                    fontSize: T.fontXs, color: C.textSoft, fontWeight: 500,
                  }}>{post.timestamp}</span>
                </div>

                <div style={{
                  fontSize: 11.5, color: C.text, lineHeight: 1.5,
                  display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
                  overflow: "hidden", marginBottom: 8,
                }}>{summary}</div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{
                    fontSize: T.fontXs, fontWeight: 700, color: C.primary,
                    display: "inline-flex", alignItems: "center", gap: 3,
                  }}>
                    View post
                    <ChevronRight size={10} strokeWidth={3} />
                  </span>
                  {post.priority === "high" && (
                    <span style={{
                      fontSize: 9, fontWeight: 700, color: C.primary,
                      background: C.primary05, border: `1px solid ${C.primary30}`,
                      padding: "1px 6px", borderRadius: 4,
                      letterSpacing: "0.04em", textTransform: "uppercase",
                      display: "inline-flex", alignItems: "center", gap: 3,
                    }}>
                      <AlertCircle size={8} />
                      Priority
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

function FeedComposer() {
    const aud = FEED_AUDIENCES[feedDraft.audience];
    const AudIcon = GROUP_ICONS[aud.iconName] || Users;
    const cat = FEED_CATEGORIES[feedDraft.category];
    const CatIcon = GROUP_ICONS[cat.iconName] || Hash;
    const canPost = feedDraft.body.trim() || (feedDraft.photos || []).length > 0;

    // Collapsed state — ultra-compact single-row "What's on your mind?" bar.
    // Icon buttons (photo/tag/feeling) are deferred to the expanded view to
    // reduce visual clutter per UX feedback. Click the bar to expand.
    if (!feedComposeExpanded) {
      return (
        <div style={{
          background: C.surface, borderRadius: T.radLg,
          border: `1px solid ${C.border}`,
          padding: "10px 14px",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <Avatar contact={currentUser} size={32} />
          <button
            onClick={() => setFeedComposeExpanded(true)}
            className="smooth"
            style={{
              flex: 1, textAlign: "left",
              padding: "9px 14px", borderRadius: T.radFull,
              background: C.bg, border: `1px solid ${C.border}`,
              fontSize: 13, color: C.textSoft, fontWeight: 500,
              cursor: "pointer",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.borderColor = C.borderStrong; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.borderColor = C.border; }}
          >
            What's on your mind, {currentUser.name.split(" ")[0]}?
          </button>
        </div>
      );
    }

    // Expanded state — full composer
    const taggedUsers = feedDraft.tagged.map(id => findUser(id)).filter(Boolean);

    return (
      <div className="fade-up" style={{
        background: C.surface, borderRadius: T.radLg,
        border: `1px solid ${C.border}`,
        boxShadow: "0 4px 14px rgba(13,31,31,0.06)",
        overflow: "hidden",
      }}>
        {/* Header — author + audience selector */}
        <div style={{
          padding: "14px 16px 0",
          display: "flex", alignItems: "flex-start", gap: 11,
        }}>
          <Avatar contact={currentUser} size={40} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>
              {currentUser.name}
              {feedDraft.feeling && (
                <span style={{ color: C.textMid, fontWeight: 500 }}>
                  {" "}is feeling {feedDraft.feeling.emoji} <strong style={{ color: C.text }}>{feedDraft.feeling.label}</strong>
                </span>
              )}
              {feedDraft.location && (
                <span style={{ color: C.textMid, fontWeight: 500 }}>
                  {" "}— at <strong style={{ color: C.text }}>{feedDraft.location}</strong>
                </span>
              )}
            </div>
            {taggedUsers.length > 0 && (
              <div style={{ fontSize: 11, color: C.textMid, marginTop: 2 }}>
                with {taggedUsers.slice(0, 2).map(u => (
                  <strong key={u.id} style={{ color: C.text, fontWeight: 600 }}>{u.name}</strong>
                )).reduce((p, c, i) => i === 0 ? [c] : [...p, ", ", c], [])}
                {taggedUsers.length > 2 && <> and <strong style={{ color: C.text, fontWeight: 600 }}>{taggedUsers.length - 2} other{taggedUsers.length - 2 === 1 ? "" : "s"}</strong></>}
              </div>
            )}
            <button
              onClick={() => setFeedComposerSheet(feedComposerSheet === "audience" ? null : "audience")}
              className="smooth"
              style={{
                marginTop: 5,
                padding: "3px 9px", borderRadius: 6,
                background: C.bg, border: `1px solid ${C.border}`,
                fontSize: T.fontXs, fontWeight: 600, color: C.textMid,
                display: "inline-flex", alignItems: "center", gap: 5,
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.surface}
              onMouseLeave={e => e.currentTarget.style.background = C.bg}
            >
              <AudIcon size={10} />
              {aud.label}
              <ChevronDown size={10} />
            </button>
          </div>
          <button
            onClick={feedComposerCollapse}
            className="iconbtn smooth"
            style={{
              width: 28, height: 28, borderRadius: 7,
              color: C.textSoft, background: "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSoft; }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Body textarea */}
        <div style={{ padding: "10px 16px 0", position: "relative" }}>
          <textarea
            autoFocus
            value={feedDraft.body}
            onChange={e => setFeedDraft(p => ({ ...p, body: e.target.value }))}
            placeholder={`What's on your mind, ${currentUser.name.split(" ")[0]}?`}
            rows={3}
            style={{
              width: "100%", padding: "8px 0",
              border: "none", background: "transparent",
              fontSize: 14, color: C.text, lineHeight: 1.5,
              fontFamily: "'Roboto', sans-serif",
              resize: "none", outline: "none",
            }}
          />
        </div>

        {/* Photo grid preview */}
        {feedDraft.photos.length > 0 && (
          <div style={{
            margin: "0 16px 12px",
            display: "grid",
            gridTemplateColumns: feedDraft.photos.length === 1 ? "1fr" : "repeat(auto-fill, minmax(120px, 1fr))",
            gap: 6, borderRadius: T.radMd, overflow: "hidden",
          }}>
            {feedDraft.photos.map(ph => (
              <div key={ph.id} style={{
                position: "relative",
                aspectRatio: feedDraft.photos.length === 1 ? "16/9" : "1/1",
                background: `linear-gradient(135deg, ${ph.color}, ${ph.color}cc)`,
                borderRadius: 8, overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ImageIcon size={28} color="rgba(255,255,255,0.7)" />
                <div style={{
                  position: "absolute", bottom: 6, left: 8,
                  fontSize: T.fontXs, fontWeight: 700, color: "#fff",
                  letterSpacing: "0.04em",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}>{ph.label.toUpperCase()}</div>
                <button
                  onClick={() => feedComposerTogglePhoto(ph)}
                  className="smooth"
                  style={{
                    position: "absolute", top: 6, right: 6,
                    width: 22, height: 22, borderRadius: "50%",
                    background: "rgba(0,0,0,0.55)", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.75)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.55)"}
                >
                  <X size={11} strokeWidth={3} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Action bar */}
        <div style={{
          margin: "0 16px",
          padding: "8px 12px",
          borderRadius: T.radMd, border: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
        }}>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: C.textMid }}>Add to your post</span>
          <div style={{ display: "flex", gap: 2 }}>
            <Tooltip label="Photo/video">
              <button
                onClick={() => setFeedComposerSheet(feedComposerSheet === "photo" ? null : "photo")}
                className="iconbtn smooth"
                style={{
                  width: 32, height: 32, borderRadius: 7,
                  color: feedComposerSheet === "photo" ? C.primary : C.textMid,
                  background: feedComposerSheet === "photo" ? C.primary05 : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.bg; }}
                onMouseLeave={e => { e.currentTarget.style.background = feedComposerSheet === "photo" ? C.primary05 : "transparent"; }}
              >
                <ImageIcon size={15} />
              </button>
            </Tooltip>
            <Tooltip label="Tag people">
              <button
                onClick={() => setFeedComposerSheet(feedComposerSheet === "tag" ? null : "tag")}
                className="iconbtn smooth"
                style={{
                  width: 32, height: 32, borderRadius: 7,
                  color: feedComposerSheet === "tag" ? C.primary : C.textMid,
                  background: feedComposerSheet === "tag" ? C.primary05 : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.bg; }}
                onMouseLeave={e => { e.currentTarget.style.background = feedComposerSheet === "tag" ? C.primary05 : "transparent"; }}
              >
                <UserPlus size={15} />
              </button>
            </Tooltip>
            <Tooltip label="Feeling/activity">
              <button
                onClick={() => setFeedComposerSheet(feedComposerSheet === "feeling" ? null : "feeling")}
                className="iconbtn smooth"
                style={{
                  width: 32, height: 32, borderRadius: 7,
                  color: feedComposerSheet === "feeling" ? C.primary : C.textMid,
                  background: feedComposerSheet === "feeling" ? C.primary05 : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.bg; }}
                onMouseLeave={e => { e.currentTarget.style.background = feedComposerSheet === "feeling" ? C.primary05 : "transparent"; }}
              >
                <Smile size={15} />
              </button>
            </Tooltip>
            <Tooltip label="Location">
              <button
                onClick={() => {
                  const loc = feedDraft.location ? "" : "London Office";
                  feedComposerSetLocation(loc);
                }}
                className="iconbtn smooth"
                style={{
                  width: 32, height: 32, borderRadius: 7,
                  color: feedDraft.location ? C.primary : C.textMid,
                  background: feedDraft.location ? C.primary05 : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.bg; }}
                onMouseLeave={e => { e.currentTarget.style.background = feedDraft.location ? C.primary05 : "transparent"; }}
              >
                <MapPin size={15} />
              </button>
            </Tooltip>
            <Tooltip label="Category">
              <button
                onClick={() => {
                  if (feedComposerSheet === "category") {
                    setFeedComposerSheet(null);
                  } else {
                    setFeedComposerSheet("category");
                    closeTemplatesWizard(); // close wizard if open so sheets don't collide
                  }
                }}
                className="iconbtn smooth"
                style={{
                  width: 32, height: 32, borderRadius: 7,
                  color: templatesMenu
                    ? "#16A34A"
                    : feedComposerSheet === "category" ? C.primary : C.textMid,
                  background: templatesMenu
                    ? "rgba(22,163,74,0.10)"
                    : feedComposerSheet === "category" ? C.primary05 : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: templatesMenu
                    ? "1px solid rgba(22,163,74,0.25)"
                    : "1px solid transparent",
                }}
                onMouseEnter={e => { if (!templatesMenu) e.currentTarget.style.background = C.bg; }}
                onMouseLeave={e => { if (!templatesMenu) e.currentTarget.style.background =
                  templatesMenu ? "rgba(22,163,74,0.10)" :
                  feedComposerSheet === "category" ? C.primary05 : "transparent"; }}
              >
                <CatIcon size={15} />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Sheet area — opens below the action bar based on which icon is active */}
        {feedComposerSheet && (
          <div className="fade-up" style={{
            margin: "10px 16px 0",
            padding: "12px 14px",
            borderRadius: T.radMd, background: C.bg, border: `1px solid ${C.border}`,
          }}>
            {feedComposerSheet === "photo" && (
              <>
                <div style={{ fontSize: T.fontXs, fontWeight: 700, color: C.textMid, letterSpacing: "0.06em", marginBottom: 8 }}>
                  ADD PHOTOS
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6 }}>
                  {SAMPLE_PHOTO_LIBRARY.map(ph => {
                    const picked = (feedDraft.photos || []).some(x => x.id === ph.id);
                    return (
                      <button
                        key={ph.id}
                        onClick={() => feedComposerTogglePhoto(ph)}
                        className="smooth"
                        style={{
                          aspectRatio: "1/1", borderRadius: 8,
                          background: `linear-gradient(135deg, ${ph.color}, ${ph.color}cc)`,
                          border: picked ? `2.5px solid ${C.primary}` : `2.5px solid transparent`,
                          position: "relative", overflow: "hidden",
                          cursor: "pointer",
                        }}
                      >
                        <ImageIcon size={18} color="rgba(255,255,255,0.7)"
                          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
                        {picked && (
                          <div style={{
                            position: "absolute", top: 4, right: 4,
                            width: 18, height: 18, borderRadius: "50%",
                            background: C.primary, color: "#fff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <Check size={11} strokeWidth={3} />
                          </div>
                        )}
                        <div style={{
                          position: "absolute", bottom: 3, left: 4,
                          fontSize: 8.5, fontWeight: 700, color: "#fff",
                          letterSpacing: "0.04em",
                        }}>{ph.label.toUpperCase()}</div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {feedComposerSheet === "tag" && (
              <>
                <div style={{ fontSize: T.fontXs, fontWeight: 700, color: C.textMid, letterSpacing: "0.06em", marginBottom: 8 }}>
                  TAG PEOPLE
                </div>
                <div style={{ position: "relative", marginBottom: 8 }}>
                  <Search size={12} color={C.textSoft} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    value={feedTagSearch}
                    onChange={e => setFeedTagSearch(e.target.value)}
                    placeholder="Search teammates"
                    style={{
                      width: "100%", padding: "7px 10px 7px 28px",
                      borderRadius: 7, border: `1px solid ${C.border}`,
                      background: C.surface, fontSize: 11.5, color: C.text,
                    }}
                  />
                </div>
                <div style={{ maxHeight: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
                  {USERS
                    .filter(u => u.id !== currentUser.id)
                    .filter(u => !feedTagSearch.trim() || u.name.toLowerCase().includes(feedTagSearch.toLowerCase()) || u.role.toLowerCase().includes(feedTagSearch.toLowerCase()))
                    .slice(0, 12)
                    .map(u => {
                      const picked = feedDraft.tagged.includes(u.id);
                      return (
                        <button
                          key={u.id}
                          onClick={() => feedComposerToggleTag(u.id)}
                          className="smooth"
                          style={{
                            padding: "6px 9px", borderRadius: 7,
                            background: picked ? C.primary05 : "transparent",
                            border: picked ? `1px solid ${C.primary30}` : "1px solid transparent",
                            display: "flex", alignItems: "center", gap: 9,
                            textAlign: "left",
                          }}
                          onMouseEnter={e => { if (!picked) e.currentTarget.style.background = C.surface; }}
                          onMouseLeave={e => { if (!picked) e.currentTarget.style.background = "transparent"; }}
                        >
                          <Avatar contact={u} size={26} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 11.5, fontWeight: 600, color: C.text }}>{u.name}</div>
                            <div style={{ fontSize: 9.5, color: C.textSoft }}>{u.role}</div>
                          </div>
                          <div style={{
                            width: 16, height: 16, borderRadius: 4,
                            border: `1.5px solid ${picked ? C.primary : C.borderStrong}`,
                            background: picked ? C.primary : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            {picked && <Check size={10} color="#fff" strokeWidth={3} />}
                          </div>
                        </button>
                      );
                    })}
                </div>
              </>
            )}

            {feedComposerSheet === "feeling" && (
              <>
                <div style={{ fontSize: T.fontXs, fontWeight: 700, color: C.textMid, letterSpacing: "0.06em", marginBottom: 8 }}>
                  HOW ARE YOU FEELING?
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                  {FEELINGS.map(f => {
                    const picked = feedDraft.feeling?.id === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => feedComposerSetFeeling(f)}
                        className="smooth"
                        style={{
                          padding: "8px 10px", borderRadius: 7,
                          background: picked ? C.primary05 : C.surface,
                          border: picked ? `1px solid ${C.primary30}` : `1px solid ${C.border}`,
                          fontSize: 11.5, fontWeight: 600, color: C.text,
                          display: "flex", alignItems: "center", gap: 6,
                        }}
                        onMouseEnter={e => { if (!picked) e.currentTarget.style.background = C.bg; }}
                        onMouseLeave={e => { if (!picked) e.currentTarget.style.background = C.surface; }}
                      >
                        <span style={{ fontSize: 16 }}>{f.emoji}</span>
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {feedComposerSheet === "audience" && (
              <>
                <div style={{ fontSize: T.fontXs, fontWeight: 700, color: C.textMid, letterSpacing: "0.06em", marginBottom: 8 }}>
                  WHO CAN SEE THIS POST?
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {Object.entries(FEED_AUDIENCES).map(([id, a]) => {
                    const Ico = GROUP_ICONS[a.iconName] || Users;
                    const picked = feedDraft.audience === id;
                    return (
                      <button
                        key={id}
                        onClick={() => { setFeedDraft(p => ({ ...p, audience: id })); setFeedComposerSheet(null); }}
                        className="smooth"
                        style={{
                          padding: "8px 11px", borderRadius: 7,
                          background: picked ? C.primary05 : C.surface,
                          border: picked ? `1px solid ${C.primary30}` : `1px solid ${C.border}`,
                          display: "flex", alignItems: "center", gap: 9,
                          textAlign: "left",
                        }}
                        onMouseEnter={e => { if (!picked) e.currentTarget.style.background = C.bg; }}
                        onMouseLeave={e => { if (!picked) e.currentTarget.style.background = C.surface; }}
                      >
                        <Ico size={14} color={picked ? C.primary : C.textMid} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: picked ? C.primary : C.text }}>{a.label}</span>
                        {picked && <Check size={12} color={C.primary} strokeWidth={3} style={{ marginLeft: "auto" }} />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {feedComposerSheet === "category" && (
              <>
                <div style={{ fontSize: T.fontXs, fontWeight: 700, color: C.textMid, letterSpacing: "0.06em", marginBottom: 8 }}>
                  POST CATEGORY
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {Object.entries(FEED_CATEGORIES).map(([id, c]) => {
                    const Ico = GROUP_ICONS[c.iconName] || Hash;
                    const picked = feedDraft.category === id;
                    const isOffer = id === "offer";
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          setFeedDraft(p => ({ ...p, category: id }));
                          setFeedComposerSheet(null);
                          // When "Offer Update" is picked by admission/admin, auto-open the wizard
                          if (isOffer && canUseTemplates()) {
                            openTemplatesWizard();
                          } else {
                            closeTemplatesWizard();
                          }
                        }}
                        className="smooth"
                        style={{
                          padding: "5px 11px", borderRadius: T.radFull,
                          fontSize: T.fontXs, fontWeight: 700,
                          background: picked ? c.color : c.bg,
                          color: picked ? "#fff" : c.color,
                          border: `1px solid ${picked ? c.color : c.border}`,
                          display: "flex", alignItems: "center", gap: 4,
                          letterSpacing: "0.03em",
                        }}
                      >
                        <Ico size={11} />
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* Schedule picker — only when toggled on by Schedule button */}

        {/* Templates picker — renders inline when templatesMenu is active */}
        {templatesMenu && canUseTemplates() && (
          <div className="fade-up" style={{
            margin: "10px 16px 0",
          }}>
            {renderTemplatesMenu()}
          </div>
        )}

        {scheduleEnabled && canSchedulePosts() && (() => {
          const now = new Date();
          const minDateTime = new Date(now.getTime() + 5 * 60 * 1000); // 5-min lead
          const minDate = minDateTime.toISOString().split("T")[0];
          const isPast = scheduleDate && scheduleTime &&
            new Date(`${scheduleDate}T${scheduleTime}:00`) < minDateTime;
          const isReady = scheduleDate && scheduleTime && !isPast;
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          let confirmation = null;
          if (isReady) {
            const target = new Date(`${scheduleDate}T${scheduleTime}:00`);
            confirmation = target.toLocaleString(undefined, {
              weekday: "long", day: "numeric", month: "long", year: "numeric",
              hour: "2-digit", minute: "2-digit", hour12: false,
            });
          }
          return (
            <div className="fade-up" style={{
              margin: "10px 16px 0",
              padding: "12px 14px",
              borderRadius: T.radMd, background: C.bg, border: `1px solid ${C.border}`,
            }}>
              <div style={{
                fontSize: T.fontXs, fontWeight: 700, color: C.textMid,
                letterSpacing: "0.06em", marginBottom: 9,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <Clock size={11} color={C.primary} />
                SCHEDULE THIS POST
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                <div>
                  <div style={{ fontSize: T.fontXs, fontWeight: 600, color: C.textMid, marginBottom: 4 }}>Date</div>
                  <input
                    type="date"
                    min={minDate}
                    value={scheduleDate}
                    onChange={e => setScheduleDate(e.target.value)}
                    style={{
                      width: "100%", padding: "8px 11px", borderRadius: 7,
                      background: C.surface, border: `1px solid ${C.border}`,
                      fontSize: 12, color: C.text, fontWeight: 500,
                    }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: T.fontXs, fontWeight: 600, color: C.textMid, marginBottom: 4 }}>Time</div>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={e => setScheduleTime(e.target.value)}
                    style={{
                      width: "100%", padding: "8px 11px", borderRadius: 7,
                      background: C.surface, border: `1px solid ${C.border}`,
                      fontSize: 12, color: C.text, fontWeight: 500,
                    }}
                  />
                </div>
              </div>
              <div style={{
                fontSize: T.fontXs, color: C.textSoft, marginTop: 7,
                display: "flex", alignItems: "center", gap: 5,
              }}>
                <Globe size={10} />
                Timezone: <strong style={{ color: C.text, fontWeight: 600 }}>{tz}</strong>
              </div>
              {isReady && (
                <div style={{
                  marginTop: 9, padding: "9px 11px", borderRadius: 7,
                  background: C.primary05, border: `1px solid ${C.primary20}`,
                  fontSize: 11, color: C.text, lineHeight: 1.5,
                  display: "flex", alignItems: "flex-start", gap: 7,
                }}>
                  <Sparkles size={11} color={C.primary} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span>Will publish on <strong>{confirmation}</strong>.</span>
                </div>
              )}
              {isPast && (
                <div style={{
                  marginTop: 9, padding: "8px 11px", borderRadius: 7,
                  background: C.dangerBg, border: `1px solid rgba(233,68,90,0.22)`,
                  fontSize: 11, color: C.danger, fontWeight: 600,
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <AlertCircle size={11} />
                  Pick a time at least 5 minutes from now.
                </div>
              )}
            </div>
          );
        })()}

        {/* Footer — Cancel + Schedule + Post */}
        <div style={{
          padding: "12px 16px",
          display: "flex", justifyContent: "flex-end", gap: 8, alignItems: "center",
          borderTop: `1px solid ${C.divider}`,
          marginTop: 12,
        }}>
          <button
            onClick={feedComposerCollapse}
            className="smooth"
            style={{
              padding: "8px 14px", borderRadius: 8,
              background: "transparent", color: C.textMid,
              border: `1px solid ${C.border}`,
              fontSize: 12, fontWeight: 600,
            }}
            onMouseEnter={e => e.currentTarget.style.background = C.bg}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            Cancel
          </button>

          {/* Schedule toggle — only for permitted users */}
          {canSchedulePosts() && (
            <button
              onClick={() => setScheduleEnabled(s => !s)}
              className="smooth"
              style={{
                padding: "8px 14px", borderRadius: 8,
                background: scheduleEnabled ? C.primary05 : "transparent",
                color: scheduleEnabled ? C.primary : C.textMid,
                border: `1px solid ${scheduleEnabled ? C.primary30 : C.border}`,
                fontSize: 12, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6,
              }}
              onMouseEnter={e => { if (!scheduleEnabled) e.currentTarget.style.background = C.bg; }}
              onMouseLeave={e => { if (!scheduleEnabled) e.currentTarget.style.background = "transparent"; }}
            >
              <Clock size={12} />
              {scheduleEnabled ? "Cancel schedule" : "Schedule"}
            </button>
          )}

          {scheduleEnabled && canSchedulePosts() ? (
            <button
              onClick={schedulePost}
              disabled={!canPost || !scheduleDate || !scheduleTime ||
                new Date(`${scheduleDate}T${scheduleTime}:00`) < new Date(Date.now() + 5*60*1000)}
              className="smooth"
              style={{
                padding: "8px 22px", borderRadius: 8,
                background: C.primary, color: "#fff",
                fontSize: 12, fontWeight: 700,
                display: "flex", alignItems: "center", gap: 6,
                opacity: (!canPost || !scheduleDate || !scheduleTime ||
                  new Date(`${scheduleDate}T${scheduleTime}:00`) < new Date(Date.now() + 5*60*1000)) ? 0.4 : 1,
                cursor: (!canPost || !scheduleDate || !scheduleTime) ? "not-allowed" : "pointer",
              }}
              onMouseEnter={e => { if (canPost && scheduleDate && scheduleTime) e.currentTarget.style.background = C.primaryDark; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.primary; }}
            >
              <Clock size={12} />
              Schedule post
            </button>
          ) : (
            <button
              onClick={feedPublish}
              disabled={!canPost}
              className="smooth"
              style={{
                padding: "8px 22px", borderRadius: 8,
                background: canPost ? C.primary : C.primary20,
                color: "#fff", fontSize: 12, fontWeight: 700,
                cursor: canPost ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", gap: 6,
              }}
              onMouseEnter={e => { if (canPost) e.currentTarget.style.background = C.primaryDark; }}
              onMouseLeave={e => { if (canPost) e.currentTarget.style.background = C.primary; }}
            >
              <Send size={12} />
              Post now
            </button>
          )}
        </div>
      </div>
    );
  }

function RemovedPostCard({ post }) {
    return (
      <div style={{
        background: C.bg, borderRadius: T.radLg,
        border: `1px dashed ${C.borderStrong}`,
        padding: "18px 20px",
        display: "flex", alignItems: "center", gap: 14,
        opacity: 0.85,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: C.surface, border: `1px dashed ${C.borderStrong}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Ban size={18} color={C.textVerySoft} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 13, fontWeight: 700, color: C.textMid,
            fontStyle: "italic", marginBottom: 3,
          }}>
            This post has been removed.
          </div>
          <div style={{
            fontSize: 11, color: C.textSoft,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              fontSize: 9.5, fontWeight: 700,
              color: C.danger, background: C.dangerBg,
              border: `1px solid ${C.danger}40`,
              padding: "1px 7px", borderRadius: 5,
            }}>
              <AlertCircle size={9} />
              REMOVED
            </span>
            <span>You saved this on {(post.savedAt || "").slice(0, 10)}</span>
          </div>
        </div>
        <Tooltip label="Remove from saved">
          <button
            onClick={() => toggleBookmark(post.id)}
            className="iconbtn smooth"
            style={{
              width: 32, height: 32, borderRadius: 8,
              color: C.textSoft, background: "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.dangerBg; e.currentTarget.style.color = C.danger; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSoft; }}
          >
            <Trash2 size={14} />
          </button>
        </Tooltip>
      </div>
    );
  }

function FeedPostCard({ post }) {
    const author = findUser(post.author);
    const cat = FEED_CATEGORIES[post.category];
    const pri = FEED_PRIORITIES[post.priority];
    const aud = FEED_AUDIENCES[post.audience];
    if (!author) return null;
    const CatIcon = GROUP_ICONS[cat.iconName] || Hash;
    const AudIcon = GROUP_ICONS[aud.iconName] || Users;
    const isUnread = !post.seenBy.includes(currentUser.id);
    const isUrgent = post.priority === "high";
    const isAuthor = post.author === currentUser.id;
    const isAdmin = currentUser.dept === "system" || (currentUser.dept === author.dept && currentUser.level <= 3);
    const myAck = post.acknowledgedBy.includes(currentUser.id);

    // Reaction totals
    const totalReactions = Object.values(post.reactions || {}).reduce((acc, list) => acc + list.length, 0);
    const myReactions = REACTION_TYPES.filter(r => (post.reactions?.[r.id] || []).includes(currentUser.id));
    const myReaction = myReactions[0];

    const totalAudience = post.audience === "all"
      ? USERS.length
      : USERS.filter(u => canSeePost(post, u)).length;

    return (
      <div
        key={post.id}
        className="fade-up"
        style={{
          background: C.surface, borderRadius: T.radLg,
          border: `1px solid ${C.border}`,
          overflow: "hidden",
          boxShadow: C.shadow,
          position: "relative",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        {/* Urgent left accent stripe — soft teal, not red */}
        {isUrgent && (
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: 3, background: C.primary,
          }} />
        )}

        {/* Pinned indicator — subtle, not shouty */}
        {post.pinned && (
          <div style={{
            padding: "5px 20px", background: "transparent",
            borderBottom: `1px solid ${C.divider}`,
            fontSize: 11, fontWeight: 600, color: C.textSoft,
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <Pin size={10} color={C.primary} />
            Pinned
          </div>
        )}

        {/* Header */}
        <div style={{ padding: "16px 20px 10px", display: "flex", gap: 12 }}>
          <Avatar contact={author} size={42} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.text, letterSpacing: "-0.005em" }}>{author.name}</span>
              {isUnread && (
                <span style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: C.secondary, flexShrink: 0,
                }} title="New for you" />
              )}
            </div>
            <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>
              {author.role}
            </div>
            <div style={{
              fontSize: 11.5, color: C.textSoft, marginTop: 4,
              display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
              lineHeight: 1.3,
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={10} /> {post.fullTimestamp || post.timestamp}
              </span>
              <span style={{ color: C.textVerySoft }}>·</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <AudIcon size={10} /> {aud.label}
              </span>
              <span style={{ color: C.textVerySoft }}>·</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Eye size={10} /> {post.seenBy.length}/{totalAudience}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 }}>
            {/* Category + priority + For-You context badges — minimal */}
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "flex-end" }}>
              {/* For-You context: show why the post is in this user's For You tab */}
              {feedScope === "for_you" && !post.pinned && post.author === currentUser.id && (
                <span style={{
                  fontSize: 9.5, fontWeight: 700, color: C.primary,
                  background: C.primary05, border: `1px solid ${C.primary30}`,
                  padding: "3px 8px", borderRadius: T.radFull,
                  display: "inline-flex", alignItems: "center", gap: 4,
                  letterSpacing: "0.02em",
                }}>
                  <User size={9} />
                  Your post
                </span>
              )}
              {feedScope === "for_you" && !post.pinned && post.author !== currentUser.id && (
                (post.tagged?.includes(currentUser.id) ||
                 post.structured?.assignedTo === currentUser.id ||
                 post.comments?.some(c => c.author === currentUser.id)) && (
                  <span style={{
                    fontSize: 9.5, fontWeight: 700, color: C.secondary,
                    background: "rgba(252,115,0,0.08)", border: `1px solid rgba(252,115,0,0.30)`,
                    padding: "3px 8px", borderRadius: T.radFull,
                    display: "inline-flex", alignItems: "center", gap: 4,
                    letterSpacing: "0.02em",
                  }}>
                    <AtSign size={9} />
                    {post.structured?.assignedTo === currentUser.id ? "Assigned to you" :
                     post.tagged?.includes(currentUser.id) ? "Mentioned" :
                     "You commented"}
                  </span>
                )
              )}
              <span style={{
                fontSize: 9.5, fontWeight: 600, color: C.textMid,
                background: C.bg, border: `1px solid ${C.border}`,
                padding: "3px 8px", borderRadius: 6,
                display: "flex", alignItems: "center", gap: 5,
                letterSpacing: "0.02em",
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: cat.color, flexShrink: 0,
                }} />
                {cat.label}
              </span>
              {post.priority === "high" && (
                <span style={{
                  fontSize: 9.5, fontWeight: 700, color: C.primary,
                  background: C.primary05, border: `1px solid ${C.primary30}`,
                  padding: "3px 8px", borderRadius: 6,
                  letterSpacing: "0.04em", textTransform: "uppercase",
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  <AlertCircle size={9} />
                  Priority
                </span>
              )}
            </div>

            {/* Per-user actions: bookmark always; admin pin only for admins */}
            <div style={{ display: "flex", gap: 4 }}>
              <Tooltip label={myBookmarks[post.id] ? "Remove bookmark" : "Save for later"}>
                <button
                  onClick={() => toggleBookmark(post.id)}
                  className="iconbtn smooth"
                  style={{
                    width: 24, height: 24, borderRadius: 6,
                    background: myBookmarks[post.id] ? C.primary10 : "transparent",
                    color: myBookmarks[post.id] ? C.primary : C.textSoft,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "transform 0.18s ease, background 0.15s ease, color 0.15s ease",
                  }}
                  onMouseEnter={e => { if (!myBookmarks[post.id]) { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; } }}
                  onMouseLeave={e => { if (!myBookmarks[post.id]) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSoft; } }}
                >
                  <Bookmark size={11}
                    fill={myBookmarks[post.id] ? C.primary : "none"}
                    strokeWidth={myBookmarks[post.id] ? 2 : 2}
                  />
                </button>
              </Tooltip>
              {isAdmin && (
                <Tooltip label={post.pinned ? "Unpin" : "Pin to top"}>
                  <button
                    onClick={() => feedTogglePin(post.id)}
                    className="iconbtn smooth"
                    style={{
                      width: 24, height: 24, borderRadius: 6,
                      background: post.pinned ? C.primary10 : "transparent",
                      color: post.pinned ? C.primary : C.textSoft,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                    onMouseEnter={e => { if (!post.pinned) { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; } }}
                    onMouseLeave={e => { if (!post.pinned) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSoft; } }}
                  >
                    <Pin size={11} />
                  </button>
                </Tooltip>
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        {post.title && (
          <div style={{
            padding: "0 18px 8px",
            fontFamily: "'Roboto', sans-serif",
            fontSize: 17, fontWeight: 700, color: C.text,
            lineHeight: 1.3, letterSpacing: "-0.01em",
          }}>
            {post.title}
          </div>
        )}

        {/* Body — render type-specific */}
        <div style={{ padding: "0 18px 12px" }}>
          {FeedPostBody({ post })}
        </div>

        {/* Photo grid (Facebook-style) */}
        {post.photos && post.photos.length > 0 && (
          <div style={{
            margin: "0 0 10px 0",
            display: "grid",
            gridTemplateColumns: post.photos.length === 1
              ? "1fr"
              : post.photos.length === 2
                ? "1fr 1fr"
                : "repeat(2, 1fr)",
            gap: 2,
          }}>
            {post.photos.slice(0, 4).map((ph, i) => (
              <div key={ph.id} style={{
                position: "relative",
                aspectRatio: post.photos.length === 1 ? "16/9" : "1/1",
                background: `linear-gradient(135deg, ${ph.color}, ${ph.color}cc)`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ImageIcon size={36} color="rgba(255,255,255,0.7)" />
                <div style={{
                  position: "absolute", bottom: 10, left: 14,
                  fontSize: 11, fontWeight: 700, color: "#fff",
                  letterSpacing: "0.04em",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}>{ph.label.toUpperCase()}</div>
                {/* "+N more" overlay on the 4th tile if there are more */}
                {i === 3 && post.photos.length > 4 && (
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "rgba(0,0,0,0.55)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 24, fontWeight: 800,
                    fontFamily: "'Roboto', sans-serif",
                  }}>+{post.photos.length - 4}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tagged people / Feeling / Location chips */}
        {(post.tagged?.length > 0 || post.feeling || post.location) && (
          <div style={{
            padding: "0 18px 12px",
            display: "flex", flexWrap: "wrap", gap: 6,
          }}>
            {post.feeling && (
              <span style={{
                padding: "3px 9px", borderRadius: T.radFull,
                background: C.bg, border: `1px solid ${C.border}`,
                fontSize: T.fontXs, fontWeight: 600, color: C.text,
                display: "inline-flex", alignItems: "center", gap: 4,
              }}>
                <span style={{ fontSize: 13 }}>{post.feeling.emoji}</span>
                feeling {post.feeling.label}
              </span>
            )}
            {post.location && (
              <span style={{
                padding: "3px 9px", borderRadius: T.radFull,
                background: C.bg, border: `1px solid ${C.border}`,
                fontSize: T.fontXs, fontWeight: 600, color: C.text,
                display: "inline-flex", alignItems: "center", gap: 4,
              }}>
                <MapPin size={10} color={C.textMid} />
                at {post.location}
              </span>
            )}
            {post.tagged?.length > 0 && (
              <span style={{
                padding: "3px 9px", borderRadius: T.radFull,
                background: C.bg, border: `1px solid ${C.border}`,
                fontSize: T.fontXs, fontWeight: 600, color: C.text,
                display: "inline-flex", alignItems: "center", gap: 4,
              }}>
                <UserPlus size={10} color={C.textMid} />
                with {post.tagged.slice(0, 2).map(id => findUser(id)?.name?.split(" ")[0]).filter(Boolean).join(", ")}
                {post.tagged.length > 2 && ` and ${post.tagged.length - 2} other${post.tagged.length - 2 === 1 ? "" : "s"}`}
              </span>
            )}
          </div>
        )}

        {/* Must-acknowledge banner */}
        {post.mustAcknowledge && !myAck && !isAuthor && (
          <div style={{
            margin: "0 18px 12px",
            padding: "10px 12px", borderRadius: 9,
            background: C.bg, border: `1px solid ${C.border}`,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <AlertCircle size={14} color={C.textMid} />
            <div style={{ flex: 1, fontSize: 11.5, fontWeight: 600, color: C.text }}>
              Must read — please acknowledge after reading
            </div>
            <button
              onClick={() => feedAcknowledge(post.id)}
              className="smooth"
              style={{
                padding: "6px 12px", borderRadius: 7,
                background: C.primary, color: "#fff",
                fontSize: 11, fontWeight: 700,
                display: "flex", alignItems: "center", gap: 4,
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.primaryDark}
              onMouseLeave={e => e.currentTarget.style.background = C.primary}
            >
              <Check size={11} strokeWidth={3} />
              Acknowledge
            </button>
          </div>
        )}
        {post.mustAcknowledge && myAck && (
          <div style={{
            margin: "0 18px 12px",
            padding: "8px 12px", borderRadius: 9,
            background: C.successBg, border: `1px solid rgba(16,185,129,0.20)`,
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 11, fontWeight: 600, color: C.success,
          }}>
            <Check size={12} strokeWidth={3} />
            You acknowledged this update
          </div>
        )}

        {/* Reactions summary + comment count */}
        {(totalReactions > 0 || (post.comments && post.comments.length > 0)) && (
          <div style={{
            padding: "0 18px 8px",
            display: "flex", alignItems: "center", gap: 8,
            fontSize: T.fontXs, color: C.textSoft,
            borderBottom: `1px solid ${C.divider}`,
            paddingBottom: 10,
          }}>
            {totalReactions > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ display: "flex" }}>
                  {REACTION_TYPES.filter(r => (post.reactions?.[r.id] || []).length > 0).slice(0, 3).map((r, i) => {
                    const Ico = GROUP_ICONS[r.iconName] || ThumbsUp;
                    return (
                      <div key={r.id} style={{
                        marginLeft: i === 0 ? 0 : -4,
                        width: 18, height: 18, borderRadius: "50%",
                        background: C.primary,
                        border: `1.5px solid ${C.surface}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        zIndex: 3 - i,
                      }}>
                        <Ico size={9} color="#fff" strokeWidth={2.4} />
                      </div>
                    );
                  })}
                </div>
                <span style={{ fontSize: T.fontXs, fontWeight: 600 }}>{totalReactions}</span>
              </div>
            )}
            <div style={{ flex: 1 }} />
            {post.comments && post.comments.length > 0 && (
              <button
                onClick={() => feedToggleComments(post.id)}
                className="smooth"
                style={{
                  fontSize: T.fontXs, color: C.textMid, fontWeight: 500,
                  background: "transparent", padding: "2px 0",
                }}
                onMouseEnter={e => e.currentTarget.style.color = C.primary}
                onMouseLeave={e => e.currentTarget.style.color = C.textMid}
              >
                {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}
              </button>
            )}
          </div>
        )}

        {/* Action bar */}
        <div style={{
          display: "flex", alignItems: "center", padding: "4px 6px",
          borderTop: totalReactions > 0 || (post.comments?.length > 0) ? "none" : `1px solid ${C.divider}`,
        }}>
          {/* Reaction picker (hover/click) */}
          <div style={{ position: "relative", flex: 1 }}>
            <button
              onClick={() => myReaction
                ? feedReact(post.id, myReaction.id)
                : feedReact(post.id, "like")}
              onMouseEnter={() => setFeedReactionPickerOpen(post.id)}
              className="smooth"
              style={{
                width: "100%", padding: "9px 10px", borderRadius: 7,
                background: myReaction ? C.primary05 : "transparent",
                color: myReaction ? C.primary : C.textMid,
                fontSize: 11.5, fontWeight: 600,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}
              onMouseLeave={(e) => {
                // hover-leave the button shouldn't immediately close picker
                if (!myReaction) e.currentTarget.style.background = "transparent";
              }}
            >
              {myReaction
                ? (() => { const Ico = GROUP_ICONS[myReaction.iconName] || ThumbsUp; return <Ico size={13} />; })()
                : <ThumbsUp size={13} />}
              {myReaction ? myReaction.label : "Like"}
            </button>

            {feedReactionPickerOpen === post.id && (
              <div
                onMouseLeave={() => setFeedReactionPickerOpen(null)}
                className="fade-up"
                style={{
                  position: "absolute", bottom: "calc(100% + 4px)", left: 0,
                  background: C.surface, borderRadius: T.radFull,
                  border: `1px solid ${C.border}`,
                  boxShadow: C.shadowMd,
                  padding: 4,
                  display: "flex", gap: 2,
                  zIndex: 10,
                }}
              >
                {REACTION_TYPES.map(r => {
                  const Ico = GROUP_ICONS[r.iconName] || ThumbsUp;
                  const myCount = (post.reactions?.[r.id] || []).includes(currentUser.id);
                  return (
                    <Tooltip key={r.id} label={r.label}>
                      <button
                        onClick={() => feedReact(post.id, r.id)}
                        className="smooth"
                        style={{
                          width: 32, height: 32, borderRadius: "50%",
                          background: myCount ? C.primary10 : "transparent",
                          color: myCount ? C.primary : C.textMid,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.transform = "scale(1.15)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = myCount ? C.primary10 : "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
                      >
                        <Ico size={15} />
                      </button>
                    </Tooltip>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={() => feedToggleComments(post.id)}
            className="smooth"
            style={{
              flex: 1, padding: "9px 10px", borderRadius: 7,
              background: feedExpandedComments[post.id] ? C.primary05 : "transparent",
              color: feedExpandedComments[post.id] ? C.primary : C.textMid,
              fontSize: 11.5, fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
            onMouseEnter={e => { if (!feedExpandedComments[post.id]) e.currentTarget.style.background = C.bg; }}
            onMouseLeave={e => { if (!feedExpandedComments[post.id]) e.currentTarget.style.background = "transparent"; }}
          >
            <MessageSquare size={13} />
            Comment
          </button>

          <button
            onClick={() => setSharePostTarget(post)}
            className="smooth"
            style={{
              flex: 1, padding: "9px 10px", borderRadius: 7,
              background: "transparent", color: C.textMid,
              fontSize: 11.5, fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
            onMouseEnter={e => e.currentTarget.style.background = C.bg}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <Repeat2 size={13} />
            Share
          </button>
        </div>

        {/* Comments thread */}
        {feedExpandedComments[post.id] && (
          <div className="fade-up" style={{
            borderTop: `1px solid ${C.divider}`, background: C.bg,
            padding: "12px 18px",
          }}>
            {(post.comments || []).map(c => {
              const cu = findUser(c.author);
              if (!cu) return null;
              return (
                <div key={c.id} style={{
                  display: "flex", gap: 9, marginBottom: 8,
                }}>
                  <Avatar contact={cu} size={26} />
                  <div style={{
                    flex: 1, background: C.surface, borderRadius: 9,
                    padding: "7px 10px", border: `1px solid ${C.border}`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>{cu.name}</span>
                      <span style={{ fontSize: 9.5, color: C.textSoft }}>· {c.time}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: C.textMid, marginTop: 2, lineHeight: 1.45 }}>
                      {c.text}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Comment composer */}
            <div style={{ display: "flex", gap: 9, marginTop: 4 }}>
              <Avatar contact={currentUser} size={26} />
              <div style={{
                flex: 1, background: C.surface, borderRadius: 9,
                border: `1px solid ${C.border}`,
                display: "flex", alignItems: "center", padding: "0 10px",
              }}>
                <input
                  value={feedCommentDraftByPost[post.id] || ""}
                  onChange={e => setFeedCommentDraftByPost(p => ({ ...p, [post.id]: e.target.value }))}
                  onKeyDown={e => e.key === "Enter" && feedAddComment(post.id)}
                  placeholder="Add a comment…"
                  style={{
                    flex: 1, padding: "8px 0", border: "none",
                    background: "transparent", fontSize: 11.5, color: C.text,
                  }}
                />
                <button
                  onClick={() => feedAddComment(post.id)}
                  disabled={!(feedCommentDraftByPost[post.id] || "").trim()}
                  className="iconbtn smooth"
                  style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: (feedCommentDraftByPost[post.id] || "").trim() ? C.primary : "transparent",
                    color: (feedCommentDraftByPost[post.id] || "").trim() ? "#fff" : C.textSoft,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Send size={11} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

function FeedPostBody({ post }) {
    const bodyText = (post.body || "").split("\n").map((line, i) => (
      <div key={i} style={{
        fontSize: 12.5, color: C.textMid, lineHeight: 1.6,
        marginBottom: line.trim() ? 4 : 0,
      }}>
        {line || "\u00A0"}
      </div>
    ));

    if (post.type === "admission_update" && post.structured) {
      const s = post.structured;
      const assignedTo = findUser(s.assignedTo);
      return (
        <>
          {bodyText}
          <div style={{
            marginTop: 12, padding: "12px 14px",
            borderRadius: 9, background: C.bg, border: `1px solid ${C.border}`,
            display: "flex", flexDirection: "column", gap: 8,
          }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: C.textSoft, letterSpacing: "0.06em" }}>
              ADMISSION UPDATE
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 14px", fontSize: 11.5 }}>
              <div style={{ color: C.textSoft, fontWeight: 600 }}>Student</div>
              <div style={{ color: C.text, fontWeight: 600 }}>{s.studentName}</div>
              <div style={{ color: C.textSoft, fontWeight: 600 }}>University</div>
              <div style={{ color: C.text, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{
                  width: 22, height: 22, borderRadius: 5,
                  background: s.uniColor, color: "#fff",
                  fontSize: 8, fontWeight: 800, letterSpacing: "0.04em",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{s.uniCode}</span>
                <span style={{ fontWeight: 600 }}>{s.university}</span>
              </div>
              <div style={{ color: C.textSoft, fontWeight: 600 }}>Status</div>
              <div>
                <span style={{
                  fontSize: T.fontXs, fontWeight: 700, color: C.success,
                  background: C.successBg, padding: "2px 8px", borderRadius: T.radFull,
                  border: `1px solid rgba(16,185,129,0.20)`,
                }}>✓ {s.offerType}</span>
              </div>
              {assignedTo && (
                <>
                  <div style={{ color: C.textSoft, fontWeight: 600 }}>Assigned to</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Avatar contact={assignedTo} size={18} />
                    <span style={{ color: C.text, fontWeight: 600 }}>{assignedTo.name}</span>
                  </div>
                </>
              )}
            </div>
            {s.actionRequired && (
              <div style={{
                marginTop: 4, padding: "8px 11px",
                borderRadius: 7, background: "rgba(252,115,0,0.06)",
                border: `1px solid rgba(252,115,0,0.18)`,
                fontSize: 11, color: C.text, lineHeight: 1.5,
                display: "flex", gap: 7, alignItems: "flex-start",
              }}>
                <AlertCircle size={12} color={C.secondary} style={{ flexShrink: 0, marginTop: 1 }} />
                <span><strong style={{ fontWeight: 700, color: C.secondary }}>Action required:</strong> {s.actionRequired}</span>
              </div>
            )}
          </div>
        </>
      );
    }

    if (post.type === "deadline") {
      return (
        <>
          {bodyText}
          {(post.deadlineDate || post.intake) && (
            <div style={{
              marginTop: 12, padding: "12px 14px",
              borderRadius: 9, background: C.bg,
              border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 9,
                background: C.primary,
                color: "#fff",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Clock size={16} />
              </div>
              <div style={{ flex: 1 }}>
                {post.intake && (
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: C.textSoft, letterSpacing: "0.06em" }}>
                    INTAKE · {post.intake.toUpperCase()}
                  </div>
                )}
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginTop: 2 }}>
                  {post.deadlineDate && post.deadlineDate !== "TBC"
                    ? `Deadline: ${new Date(post.deadlineDate + "T00:00:00").toLocaleDateString(undefined, { weekday: "short", month: "long", day: "numeric", year: "numeric" })}`
                    : "Deadline: TBC"}
                </div>
                {post.daysLeft !== undefined && (
                  <div style={{ fontSize: 11, color: C.textMid, fontWeight: 600, marginTop: 1 }}>
                    {post.daysLeft <= 0 ? "Today is the deadline!" : `${post.daysLeft} days remaining`}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      );
    }

    if (post.type === "promotion" && post.structured?.offers) {
      return (
        <>
          {bodyText}
          <div style={{
            marginTop: 12, display: "flex", flexDirection: "column", gap: 8,
          }}>
            {post.structured.offers.map((o, i) => (
              <div key={i} style={{
                padding: "12px 14px", borderRadius: 9,
                background: C.bg,
                border: `1px solid ${C.border}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: T.fontXs, fontWeight: 700, color: C.textSoft, letterSpacing: "0.06em" }}>
                      {o.threshold.toUpperCase()}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginTop: 2 }}>
                      {o.campus}
                    </div>
                    <div style={{ fontSize: T.fontXs, color: C.textMid, marginTop: 2 }}>
                      {o.breakdown}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 22, fontWeight: 800, color: C.primary,
                    flexShrink: 0,
                  }}>
                    {o.total}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }

    if (post.type === "marketing") {
      const link = post.link;
      const isLinkedIn = link?.platform === "linkedin";
      const platformColor = isLinkedIn ? "#0A66C2" : C.primary;

      return (
        <>
          {bodyText}

          {/* Link preview card (LinkedIn-style) */}
          {link && (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "block", marginTop: 12 }}
            >
              <div
                className="smooth"
                style={{
                  borderRadius: T.radMd, border: `1px solid ${C.border}`,
                  overflow: "hidden", background: C.surface,
                  cursor: "pointer",
                  transition: "border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = platformColor + "55";
                  e.currentTarget.style.boxShadow = `0 4px 14px ${platformColor}15`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Header — neutral, with small platform icon */}
                <div style={{
                  padding: "10px 14px",
                  background: C.bg,
                  borderBottom: `1px solid ${C.divider}`,
                  display: "flex", alignItems: "center", gap: 9,
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: 5,
                    background: isLinkedIn ? platformColor : C.primary,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {isLinkedIn ? <Linkedin size={13} color="#fff" /> : <LinkIcon size={12} color="#fff" />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 9, fontWeight: 700, color: C.textSoft,
                      letterSpacing: "0.08em",
                    }}>
                      {isLinkedIn ? "LINKEDIN POST" : "EXTERNAL LINK"}
                    </div>
                    <div style={{
                      fontSize: 11.5, fontWeight: 700, color: C.text, marginTop: 1,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {link.authorName}
                    </div>
                  </div>
                  <ExternalLink size={12} color={C.textSoft} style={{ flexShrink: 0 }} />
                </div>

                {/* Body — author + headline + preview */}
                <div style={{ padding: "12px 16px" }}>
                  {link.authorHeadline && (
                    <div style={{
                      fontSize: T.fontXs, color: C.textSoft, fontWeight: 500,
                      marginBottom: 8, lineHeight: 1.4,
                    }}>
                      {link.authorHeadline}
                    </div>
                  )}
                  {link.title && (
                    <div style={{
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: 14, fontWeight: 700, color: C.text,
                      lineHeight: 1.35, letterSpacing: "-0.01em",
                      marginBottom: 6,
                    }}>
                      {link.title}
                    </div>
                  )}
                  {link.preview && (
                    <div style={{
                      fontSize: 11.5, color: C.textMid, lineHeight: 1.55,
                      whiteSpace: "pre-wrap",
                    }}>
                      {link.preview.length > 220
                        ? link.preview.slice(0, 220) + "…"
                        : link.preview}
                    </div>
                  )}
                  {link.meta && (
                    <div style={{
                      marginTop: 10, fontSize: T.fontXs, color: C.textSoft, fontWeight: 500,
                      display: "flex", alignItems: "center", gap: 5,
                    }}>
                      <span>{link.meta}</span>
                    </div>
                  )}
                </div>

                {/* Footer stripe with the link URL */}
                <div style={{
                  padding: "8px 14px",
                  background: C.bg, borderTop: `1px solid ${C.divider}`,
                  fontSize: T.fontXs, color: C.textSoft, fontWeight: 500,
                  display: "flex", alignItems: "center", gap: 6,
                  whiteSpace: "nowrap", overflow: "hidden",
                }}>
                  <LinkIcon size={10} />
                  <span style={{
                    flex: 1, minWidth: 0,
                    overflow: "hidden", textOverflow: "ellipsis",
                    color: C.textMid, fontWeight: 600,
                  }}>
                    {(() => {
                      try { return new URL(link.url).hostname.replace(/^www\./, "") + new URL(link.url).pathname; }
                      catch { return link.url; }
                    })()}
                  </span>
                </div>
              </div>
            </a>
          )}

          {/* CTA action row — "support this post" buttons */}
          {post.cta?.kind === "social" && post.cta.actions && (
            <div style={{
              marginTop: 12, padding: "10px 12px",
              borderRadius: 9,
              background: C.bg,
              border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
                <Sparkles size={13} color={C.textMid} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 11.5, fontWeight: 600, color: C.text, lineHeight: 1.4 }}>
                  Support this post —
                  <span style={{ color: C.textMid, fontWeight: 500 }}> tap any action below</span>
                </span>
              </div>
              <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                {post.cta.actions.map(a => {
                  const Ico = GROUP_ICONS[a.iconName] || ThumbsUp;
                  return (
                    <a
                      key={a.id}
                      href={link?.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="smooth"
                      style={{
                        padding: "6px 11px", borderRadius: 7,
                        background: C.primary, color: "#fff",
                        fontSize: T.fontXs, fontWeight: 700,
                        textDecoration: "none",
                        display: "inline-flex", alignItems: "center", gap: 5,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = C.primaryDark}
                      onMouseLeave={e => e.currentTarget.style.background = C.primary}
                    >
                      <Ico size={11} />
                      {a.label}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </>
      );
    }

    // Default: text + announcement + partnership
    return bodyText;
  }

  return NewsFeedView();
}
