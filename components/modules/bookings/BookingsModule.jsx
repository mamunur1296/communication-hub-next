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

export default function BookingsModule({ ctx }) {
  const {
    Tooltip,
    Avatar,
    C,
    DAY_LABELS,
    GroupMeetingFlow,
    MONTH_NAMES,
    T,
    TIME_SLOTS,
    a,
    acceptMeeting,
    acceptedCount,
    active,
    activeReminders,
    bookingContact,
    bookingContactsFiltered,
    bookingSearch,
    buildCalendarGrid,
    c,
    calMonth,
    calYear,
    calendarTab,
    cancelMeeting,
    cells,
    confirmBooking,
    cp,
    cpUser,
    currentUser,
    d,
    dt,
    e,
    findUser,
    groupResetWizard,
    groupStep,
    i,
    id,
    isGroupMt,
    isOrganizer,
    isPast,
    isToday,
    item,
    list,
    m,
    meetingDuration,
    meetingMode,
    meetings,
    mt,
    myAttendee,
    myStatus,
    otherAttendee,
    p,
    past,
    pastCount,
    pendingCount,
    prettyDate,
    rejectMeeting,
    rejectedCount,
    scheduledTab,
    sel,
    selectedDate,
    selectedSlot,
    setBookingContact,
    setBookingSearch,
    setCalMonth,
    setCalYear,
    setCalendarTab,
    setMeetingMode,
    setMeetings,
    setScheduledTab,
    setSelectedDate,
    setSelectedSlot,
    showSlots,
    slot,
    subTabs,
    t,
    titleText,
    today,
    today_,
    totalAtt,
    triggerReminder,
    u,
    upcomingCount,
    y
  } = ctx;

function BookingView() {
    const upcomingCount = (meetings.upcoming || []).length;
    const pastCount = (meetings.passed || []).length;
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, overflow: "hidden" }}>
        {/* Modern header — clean, premium */}
        <div style={{ padding: "28px 32px 0", background: C.surface, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <h2 style={{ fontFamily: "'Roboto', sans-serif", fontSize: T.fontXl, fontWeight: 700, color: C.text, letterSpacing: "-0.02em", marginBottom: 2 }}>
                Meetings
              </h2>
              <p style={{ fontSize: T.fontSm, color: C.textSoft }}>
                {currentUser.type === "student" ? "Book meetings with your consultant and admission team." : "Schedule, manage, and track your meetings."}
              </p>
            </div>
            {/* Quick stats */}
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ padding: "8px 16px", borderRadius: T.radMd, background: C.bg, border: `1px solid ${C.border}`, textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.primary }}>{upcomingCount}</div>
                <div style={{ fontSize: T.fontXs, color: C.textSoft, fontWeight: 500 }}>Upcoming</div>
              </div>
              <div style={{ padding: "8px 16px", borderRadius: T.radMd, background: C.bg, border: `1px solid ${C.border}`, textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.textMid }}>{pastCount}</div>
                <div style={{ fontSize: T.fontXs, color: C.textSoft, fontWeight: 500 }}>Completed</div>
              </div>
            </div>
          </div>

          {/* Segmented control — replaces underline tabs */}
          <div style={{ display: "inline-flex", background: C.bg, borderRadius: T.radMd, padding: 3, marginBottom: -1, border: `1px solid ${C.border}` }}>
            {[
              { id: "book", label: "Book a Meeting", icon: CalendarDays },
              { id: "scheduled", label: "Scheduled", icon: Clock },
            ].map(t => {
              const active = calendarTab === t.id;
              const TI = t.icon;
              return (
                <button key={t.id} onClick={() => setCalendarTab(t.id)} className="smooth" style={{
                  padding: "8px 20px", borderRadius: T.radSm, fontSize: T.fontSm, fontWeight: active ? 600 : 500,
                  background: active ? C.surface : "transparent",
                  color: active ? C.text : C.textSoft,
                  border: "none", cursor: "pointer",
                  boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <TI size={13} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content area */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {calendarTab === "book" && BookMeetingTab()}
          {calendarTab === "scheduled" && ScheduledMeetingTab()}
        </div>
      </div>
    );
  }

function BookMeetingTab() {
    return (
      <div className="fade-up" style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        {/* Meeting type toggle — modern segmented control */}
        <div style={{ padding: "14px 28px 10px", background: C.surface, flexShrink: 0 }}>
          <div style={{ display: "inline-flex", background: C.bg, borderRadius: T.radSm, padding: 2, border: `1px solid ${C.border}` }}>
            <button onClick={() => setMeetingMode("individual")} className="smooth" style={{
              padding: "6px 16px", borderRadius: T.radSm, fontSize: T.fontSm, fontWeight: meetingMode === "individual" ? 600 : 500,
              background: meetingMode === "individual" ? C.surface : "transparent",
              color: meetingMode === "individual" ? C.text : C.textSoft,
              border: "none", cursor: "pointer",
              boxShadow: meetingMode === "individual" ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              display: "flex", alignItems: "center", gap: 5,
            }}><User size={12} /> 1-on-1</button>
            <button onClick={() => { setMeetingMode("group"); if (groupStep === "success") groupResetWizard(); }} className="smooth" style={{
              padding: "6px 16px", borderRadius: T.radSm, fontSize: T.fontSm, fontWeight: meetingMode === "group" ? 600 : 500,
              background: meetingMode === "group" ? C.surface : "transparent",
              color: meetingMode === "group" ? C.text : C.textSoft,
              border: "none", cursor: "pointer",
              boxShadow: meetingMode === "group" ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              display: "flex", alignItems: "center", gap: 5,
            }}><Users size={12} /> Group</button>
          </div>
        </div>

        {/* Body */}
        {meetingMode === "group" ? GroupMeetingFlow() : IndividualBookingPanel()}
      </div>
    );
  }

function IndividualBookingPanel() {
    const cells = buildCalendarGrid(calYear, calMonth);
    const isToday = (d) => d === today.getDate() && calYear === today.getFullYear() && calMonth === today.getMonth();
    const isPast = (d) => {
      const dt = new Date(calYear, calMonth, d);
      const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      return dt < t;
    };

    const showSlots = bookingContact && selectedDate;

    return (
      <div className="fade-up" style={{
        display: "grid", gridTemplateColumns: showSlots ? "240px 1fr 220px" : "240px 1fr 220px",
        gap: 0, flex: 1, minHeight: 0,
      }}>
        {/* Contacts panel */}
        <div style={{
          padding: "20px 18px", borderRight: `1px solid ${C.divider}`,
          display: "flex", flexDirection: "column", minHeight: 0,
        }}>
          <div style={{ position: "relative", marginBottom: 14 }}>
            <Search size={14} color={C.textSoft} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={bookingSearch}
              onChange={e => setBookingSearch(e.target.value)}
              placeholder="search contacts"
              style={{
                width: "100%", padding: "8px 10px 8px 32px",
                borderRadius: 8, border: `1px solid ${C.border}`,
                background: C.bg, fontSize: 12, color: C.text,
              }}
            />
          </div>
          <div style={{ flex: 1, overflowY: "auto", marginRight: -8, paddingRight: 8 }}>
            {bookingContactsFiltered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "24px 12px", color: C.textSoft, fontSize: 11.5 }}>
                <Search size={28} style={{ opacity: 0.3, marginBottom: 8 }} />
                <div style={{ fontWeight: 600, marginBottom: 3 }}>No contacts found</div>
                <div style={{ fontSize: 10 }}>Search by name or email to find contacts.</div>
              </div>
            ) : (
              bookingContactsFiltered.map(c => {
                const sel = bookingContact?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setBookingContact(c)}
                    className="smooth"
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 10px", borderRadius: 9, marginBottom: 4,
                      background: sel ? C.primary10 : "transparent",
                      cursor: "pointer",
                      border: sel ? `1px solid ${C.primary30}` : "1px solid transparent",
                    }}
                  >
                    <Avatar contact={c} size={30} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11.5, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {c.name}
                      </div>
                      <div style={{ fontSize: 9.5, color: C.textSoft }}>{c.role}</div>
                    </div>
                    {sel ? (
                      <div style={{
                        width: 16, height: 16, borderRadius: "50%",
                        background: C.primary, display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Check size={10} color="#fff" />
                      </div>
                    ) : (
                      <div style={{
                        width: 16, height: 16, borderRadius: "50%",
                        border: `1.5px solid ${C.border}`,
                      }} />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Calendar */}
        <div style={{ padding: "20px 26px", display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text }}>
              Please Choose a Date
            </div>
            <div style={{ fontSize: T.fontBase, fontWeight: 600, color: C.text, display: "flex", alignItems: "center", gap: 8 }}>
              {MONTH_NAMES[calMonth]} {calYear}
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  onClick={() => {
                    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
                    else setCalMonth(m => m - 1);
                  }}
                  className="iconbtn smooth"
                  style={{ width: 26, height: 26, borderRadius: 6, color: C.textMid }}
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => {
                    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
                    else setCalMonth(m => m + 1);
                  }}
                  className="iconbtn smooth"
                  style={{ width: 26, height: 26, borderRadius: 6, color: C.textMid }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Day labels */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
            marginBottom: 6,
          }}>
            {DAY_LABELS.map(d => (
              <div key={d} style={{
                textAlign: "center", fontSize: 11, fontWeight: 600,
                color: C.textSoft, padding: "8px 0",
              }}>{d}</div>
            ))}
          </div>

          {/* Day grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
            gap: 2, flex: 1, minHeight: 0,
          }}>
            {cells.map((d, i) => {
              if (!d) return <div key={i} />;
              const past = isPast(d);
              const sel = d === selectedDate;
              const today_ = isToday(d);
              return (
                <button
                  key={i}
                  onClick={() => !past && setSelectedDate(d)}
                  disabled={past}
                  className={`daycell smooth ${past ? "disabled" : ""}`}
                  style={{
                    aspectRatio: "1.7 / 1",
                    minHeight: 40,
                    borderRadius: "50%",
                    fontSize: 12, fontWeight: sel || today_ ? 700 : 500,
                    color: past ? C.textVerySoft : (sel ? "#fff" : (today_ ? C.secondary : C.text)),
                    background: sel ? C.secondary : "transparent",
                    border: today_ && !sel ? `1.5px solid ${C.secondary}` : "1.5px solid transparent",
                    width: 36, height: 36,
                    margin: "auto",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {d}
                </button>
              );
            })}
          </div>

          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 0 0", marginTop: 8,
            borderTop: `1px solid ${C.divider}`,
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 11, color: C.textMid,
            }}>
              <Globe size={13} />
              Europe/London (GMT+1)
              <span style={{ color: C.textSoft }}>· {meetingDuration} min</span>
            </div>
            <button className="iconbtn smooth" style={{ width: 26, height: 26, borderRadius: 6, color: C.textMid }}>
              <RefreshCcw size={13} />
            </button>
          </div>
        </div>

        {/* Time slots */}
        <div style={{
          padding: "20px 18px", borderLeft: `1px solid ${C.divider}`,
          display: "flex", flexDirection: "column", minHeight: 0,
        }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text }}>
            Choose a Time
          </div>
          {bookingContact && selectedDate && (
            <div style={{ fontSize: 11.5, color: C.textMid, marginTop: 3, marginBottom: 14 }}>
              {prettyDate(calYear, calMonth, selectedDate)}
            </div>
          )}
          {!bookingContact || !selectedDate ? (
            <div style={{ marginTop: 24, fontSize: 11, color: C.textSoft, textAlign: "center", padding: "0 8px" }}>
              <Clock size={26} color={C.textVerySoft} style={{ marginBottom: 8 }} />
              <div>Select a date to see available time slots</div>
            </div>
          ) : (
            <div style={{ flex: 1, overflowY: "auto", marginRight: -8, paddingRight: 8, display: "flex", flexDirection: "column", gap: 7 }}>
              {TIME_SLOTS.map(slot => {
                const sel = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`timeslot ${sel ? "selected" : ""}`}
                    style={{
                      padding: "10px 12px", borderRadius: 9,
                      border: `1.5px solid ${sel ? C.primary : C.border}`,
                      background: sel ? C.primary : C.surface,
                      color: sel ? "#fff" : C.text,
                      fontSize: 11.5, fontWeight: 600, textAlign: "center",
                    }}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom bar with Booking CTA */}
        <div style={{
          gridColumn: "1 / -1",
          padding: "12px 26px",
          borderTop: `1px solid ${C.divider}`,
          display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12,
        }}>
          {selectedSlot && bookingContact && (
            <div style={{ fontSize: 11.5, color: C.textMid, fontWeight: 500, marginRight: 8 }}>
              {bookingContact.name} · {prettyDate(calYear, calMonth, selectedDate)} · {selectedSlot}
            </div>
          )}
          <button
            onClick={confirmBooking}
            disabled={!bookingContact || !selectedSlot}
            className="smooth"
            style={{
              padding: "10px 24px", borderRadius: T.radMd,
              background: bookingContact && selectedSlot
                ? `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`
                : C.primary20,
              color: "#fff", fontSize: 12.5, fontWeight: 700,
              cursor: bookingContact && selectedSlot ? "pointer" : "default",
              boxShadow: bookingContact && selectedSlot ? "0 4px 14px rgba(4,93,94,0.22)" : "none",
              display: "flex", alignItems: "center", gap: 7,
            }}
          >
            Booking
            <ChevronsRight size={14} />
          </button>
        </div>
      </div>
    );
  }

function ScheduledMeetingTab() {
    const subTabs = [
      { id: "upcoming", label: "Upcoming Meeting", count: meetings.upcoming.length },
      { id: "passed", label: "Passed Meeting", count: meetings.passed.length },
      { id: "canceled", label: "Canceled Meeting", count: meetings.canceled.length },
    ];
    const list = meetings[scheduledTab] || [];

    const cancelMeeting = (id) => {
      setMeetings(p => {
        const item = p.upcoming.find(m => m.id === id);
        if (!item) return p;
        return {
          ...p,
          upcoming: p.upcoming.filter(m => m.id !== id),
          canceled: [item, ...p.canceled],
        };
      });
    };

    return (
      <div className="fade-up" style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 28px 22px", overflow: "hidden" }}>
        {/* Filter pills — replaces underline tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 16, paddingBottom: 14 }}>
          <div style={{ display: "inline-flex", background: C.surface, borderRadius: T.radSm, padding: 2, border: `1px solid ${C.border}` }}>
            {subTabs.map(t => {
              const active = scheduledTab === t.id;
              return (
                <button key={t.id} onClick={() => setScheduledTab(t.id)} className="smooth" style={{
                  padding: "6px 14px", borderRadius: T.radSm, fontSize: T.fontSm, fontWeight: active ? 600 : 500,
                  background: active ? (t.id === "canceled" ? "rgba(239,68,68,0.06)" : C.primary05) : "transparent",
                  color: active ? (t.id === "canceled" ? C.danger : C.primary) : C.textSoft,
                  border: "none", cursor: "pointer",
                  boxShadow: active ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                  display: "flex", alignItems: "center", gap: 5,
                }}>
                  {t.label}
                  <span style={{
                    fontSize: T.fontXs, fontWeight: 700, padding: "0 6px", borderRadius: T.radFull,
                    background: active ? (t.id === "canceled" ? "rgba(239,68,68,0.10)" : C.primary10) : C.bg,
                    color: active ? (t.id === "canceled" ? C.danger : C.primary) : C.textMid,
                  }}>{t.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {list.length === 0 ? (
            <div style={{ padding: "60px 20px", textAlign: "center", color: C.textSoft }}>
              <CalendarDays size={40} style={{ opacity: 0.2, marginBottom: 12 }} />
              <div style={{ fontSize: T.fontMd, fontWeight: 600, marginBottom: 4, color: C.text }}>No meetings found</div>
              <div style={{ fontSize: T.fontSm, color: C.textSoft }}>
                {scheduledTab === "upcoming" && "Book a meeting to see it appear here."}
                {scheduledTab === "passed" && "Past meetings will show up here."}
                {scheduledTab === "canceled" && "Canceled meetings will be tracked here."}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {list.map(mt => {
                // ─── Determine: am I the organizer or invitee? What's my response? ───
                const isOrganizer = mt.organizer === currentUser.id;
                const myAttendee = (mt.attendees || []).find(a => a.userId === currentUser.id);
                const myStatus = myAttendee?.status || (isOrganizer ? "accepted" : null);
                const isGroupMt = !!mt.groupMeeting;

                // Counterparty for 1-on-1 = the OTHER attendee
                const otherAttendee = (mt.attendees || []).find(a => a.userId !== currentUser.id);
                const cpUser = isGroupMt ? null : findUser(mt.with || otherAttendee?.userId);
                const cp = cpUser || { name: "Unknown", initials: "?", color: C.bg, role: "" };

                // Aggregate response counts (only meaningful for organizer)
                const acceptedCount = (mt.attendees || []).filter(a => a.status === "accepted").length;
                const rejectedCount = (mt.attendees || []).filter(a => a.status === "rejected").length;
                const pendingCount  = (mt.attendees || []).filter(a => a.status === "pending").length;
                const totalAtt = (mt.attendees || []).length;

                // Title — group uses meeting.title, 1-on-1 uses "X with Y"
                const titleText = isGroupMt
                  ? mt.title
                  : `${mt.title || "Meeting"} with ${cp.name}`;

                return (
                  <div key={mt.id} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 18px", borderRadius: T.radLg,
                    border: `1px solid ${C.border}`, background: C.surface,
                    boxShadow: C.shadow,
                    opacity: myStatus === "rejected" ? 0.7 : 1,
                  }}>
                    {/* Date plate */}
                    <div style={{
                      width: 48, minWidth: 48, height: 56, borderRadius: T.radMd,
                      background: scheduledTab === "canceled" ? C.dangerBg : (scheduledTab === "passed" ? C.bg : C.primary10),
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      border: `1px solid ${scheduledTab === "canceled" ? "rgba(239,68,68,0.18)" : C.border}`,
                    }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: scheduledTab === "canceled" ? C.danger : C.primary, letterSpacing: "0.06em" }}>
                        {MONTH_NAMES[parseInt(mt.date.split("-")[1]) - 1]?.slice(0, 3).toUpperCase()}
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: scheduledTab === "canceled" ? C.danger : C.primary, lineHeight: 1 }}>
                        {parseInt(mt.date.split("-")[2])}
                      </div>
                    </div>

                    {/* Avatar (1-on-1) or stacked avatars (group) */}
                    {isGroupMt ? (
                      <div style={{ display: "flex", flexShrink: 0 }}>
                        {(mt.attendees || []).slice(0, 3).map((a, i) => {
                          const u = findUser(a.userId);
                          return u ? (
                            <div key={a.userId} style={{
                              marginLeft: i === 0 ? 0 : -10,
                              border: `2px solid ${C.surface}`,
                              borderRadius: "50%", zIndex: 3 - i,
                            }}>
                              <Avatar contact={u} size={32} />
                            </div>
                          ) : null;
                        })}
                        {totalAtt > 3 && (
                          <div style={{
                            marginLeft: -10,
                            width: 32, height: 32, borderRadius: "50%",
                            background: C.bg, color: C.textMid,
                            border: `2px solid ${C.surface}`,
                            fontSize: T.fontXs, fontWeight: 700,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>+{totalAtt - 3}</div>
                        )}
                      </div>
                    ) : (
                      <Avatar contact={cp} size={36} />
                    )}

                    {/* Title + meta */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 3,
                        display: "flex", alignItems: "center", gap: 7,
                      }}>
                        <span style={{
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        }}>{titleText}</span>
                        {isGroupMt && (
                          <span style={{
                            fontSize: 8.5, fontWeight: 700, color: C.primary,
                            background: C.primary10, padding: "1px 6px", borderRadius: 4,
                            letterSpacing: "0.04em",
                          }}>GROUP</span>
                        )}
                      </div>
                      <div style={{ fontSize: 11, color: C.textMid, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Clock size={11} /> {mt.start} – {mt.end}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <MapPin size={11} /> Online
                        </span>
                        {!isGroupMt && (
                          <span style={{ color: C.primary, fontWeight: 600, fontSize: 10 }}>{cp.role}</span>
                        )}
                        {isGroupMt && (
                          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10 }}>
                            <Users size={10} /> {totalAtt} attendees
                          </span>
                        )}
                      </div>

                      {/* Response status row — different for organizer vs invitee */}
                      {scheduledTab === "upcoming" && (
                        <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          {isOrganizer ? (
                            <>
                              <span style={{
                                fontSize: 9, fontWeight: 700, color: C.textSoft,
                                letterSpacing: "0.06em",
                              }}>RESPONSES</span>
                              {acceptedCount > 0 && (
                                <span style={{
                                  fontSize: 9.5, fontWeight: 700, color: C.success,
                                  background: C.successBg, padding: "1px 7px", borderRadius: T.radFull,
                                  display: "flex", alignItems: "center", gap: 3,
                                }}>
                                  <Check size={9} strokeWidth={3} /> {acceptedCount} accepted
                                </span>
                              )}
                              {pendingCount > 0 && (
                                <span style={{
                                  fontSize: 9.5, fontWeight: 700, color: C.warning,
                                  background: "rgba(245,158,11,0.10)", padding: "1px 7px", borderRadius: T.radFull,
                                }}>
                                  {pendingCount} awaiting
                                </span>
                              )}
                              {rejectedCount > 0 && (
                                <span style={{
                                  fontSize: 9.5, fontWeight: 700, color: C.danger,
                                  background: C.dangerBg, padding: "1px 7px", borderRadius: T.radFull,
                                }}>
                                  {rejectedCount} declined
                                </span>
                              )}
                            </>
                          ) : (
                            <>
                              {myStatus === "pending" && (
                                <span style={{
                                  fontSize: 9.5, fontWeight: 700, color: C.warning,
                                  background: "rgba(245,158,11,0.10)", padding: "2px 8px", borderRadius: T.radFull,
                                  display: "flex", alignItems: "center", gap: 4,
                                }}>
                                  <AlertCircle size={10} /> Awaiting your response
                                </span>
                              )}
                              {myStatus === "accepted" && (
                                <span style={{
                                  fontSize: 9.5, fontWeight: 700, color: C.success,
                                  background: C.successBg, padding: "2px 8px", borderRadius: T.radFull,
                                  display: "flex", alignItems: "center", gap: 4,
                                }}>
                                  <Check size={10} strokeWidth={3} /> You accepted
                                </span>
                              )}
                              {myStatus === "rejected" && (
                                <span style={{
                                  fontSize: 9.5, fontWeight: 700, color: C.danger,
                                  background: C.dangerBg, padding: "2px 8px", borderRadius: T.radFull,
                                  display: "flex", alignItems: "center", gap: 4,
                                }}>
                                  <X size={10} strokeWidth={3} /> You declined
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action area */}
                    {scheduledTab === "upcoming" && (
                      <>
                        {/* Invitee with pending response → Accept / Reject */}
                        {!isOrganizer && myStatus === "pending" && (
                          <div style={{ display: "flex", gap: 6 }}>
                            <button
                              onClick={() => acceptMeeting(mt.id)}
                              className="smooth"
                              style={{
                                padding: "7px 13px", borderRadius: 8,
                                background: C.primary, color: "#fff",
                                fontSize: 11.5, fontWeight: 600,
                                display: "flex", alignItems: "center", gap: 5,
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = C.primaryDark}
                              onMouseLeave={e => e.currentTarget.style.background = C.primary}
                            >
                              <Check size={12} strokeWidth={3} /> Accept
                            </button>
                            <button
                              onClick={() => rejectMeeting(mt.id)}
                              className="smooth"
                              style={{
                                padding: "7px 12px", borderRadius: 8,
                                background: "transparent", color: C.textMid,
                                fontSize: 11.5, fontWeight: 600,
                                border: `1px solid ${C.border}`,
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = C.dangerBg; e.currentTarget.style.color = C.danger; e.currentTarget.style.borderColor = "rgba(239,68,68,0.18)"; }}
                              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; e.currentTarget.style.borderColor = C.border; }}
                            >
                              Reject
                            </button>
                          </div>
                        )}

                        {/* Anyone who's already accepted → Join + Cancel */}
                        {myStatus === "accepted" && (
                          <>
                            <Tooltip label="Demo: simulate the 15-min reminder firing">
                              <button
                                onClick={() => triggerReminder(mt.id)}
                                className="iconbtn smooth"
                                style={{
                                  width: 32, height: 32, borderRadius: 8,
                                  color: activeReminders[mt.id] ? C.secondary : C.textSoft,
                                  background: activeReminders[mt.id] ? C.sec10 : "transparent",
                                  border: `1px solid ${activeReminders[mt.id] ? "rgba(252,115,0,0.30)" : C.border}`,
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                }}
                                onMouseEnter={e => { if (!activeReminders[mt.id]) { e.currentTarget.style.background = C.sec10; e.currentTarget.style.color = C.secondary; e.currentTarget.style.borderColor = "rgba(252,115,0,0.20)"; } }}
                                onMouseLeave={e => { if (!activeReminders[mt.id]) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSoft; e.currentTarget.style.borderColor = C.border; } }}
                              >
                                <Bell size={13} />
                              </button>
                            </Tooltip>
                            <button className="smooth" style={{
                              padding: "7px 14px", borderRadius: 8,
                              background: C.primary, color: "#fff",
                              fontSize: 11.5, fontWeight: 600,
                              display: "flex", alignItems: "center", gap: 6,
                            }}>
                              <Video size={13} /> Join
                            </button>
                            {isOrganizer && (
                              <button
                                onClick={() => cancelMeeting(mt.id)}
                                className="smooth"
                                style={{
                                  padding: "7px 12px", borderRadius: 8,
                                  background: "transparent", color: C.danger,
                                  fontSize: 11.5, fontWeight: 600,
                                  border: `1px solid ${C.danger}`,
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = C.danger; e.currentTarget.style.color = "#fff"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.danger; }}
                              >
                                Cancel
                              </button>
                            )}
                          </>
                        )}

                        {/* Already rejected — option to change mind */}
                        {!isOrganizer && myStatus === "rejected" && (
                          <button
                            onClick={() => acceptMeeting(mt.id)}
                            className="smooth"
                            style={{
                              padding: "7px 13px", borderRadius: 8,
                              background: "transparent", color: C.primary,
                              fontSize: 11.5, fontWeight: 600,
                              border: `1px solid ${C.primary30}`,
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = C.primary; e.currentTarget.style.color = "#fff"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.primary; }}
                          >
                            Change to Accept
                          </button>
                        )}
                      </>
                    )}
                    {scheduledTab === "passed" && (
                      <span style={{
                        padding: "5px 11px", borderRadius: T.radFull,
                        background: C.bg, color: C.textMid,
                        fontSize: T.fontXs, fontWeight: 600,
                      }}>Completed</span>
                    )}
                    {scheduledTab === "canceled" && (
                      <span style={{
                        padding: "5px 11px", borderRadius: T.radFull,
                        background: C.dangerBg, color: C.danger,
                        fontSize: T.fontXs, fontWeight: 600,
                      }}>Canceled</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return BookingView();
}
