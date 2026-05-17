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

export default function ChatsModule({ ctx }) {
  const {
    DetailRow,
    Tooltip,
    Avatar,
    C,
    COL_WIDTH,
    FEED_CATEGORIES,
    GRID_SLOTS,
    Icon,
    Infinity,
    MESSAGE_TOPICS,
    REACTIONS,
    ROLE_GROUPS,
    ROW_HEIGHT,
    SAMPLE_APPLICATIONS,
    SaveIcon,
    T,
    TIME_COL_WIDTH,
    USERS,
    _,
    a,
    active,
    activeChatId,
    activeContact,
    activeGroup,
    addedIds,
    alert,
    allChats,
    allFreeSuggestion,
    allIds,
    allParticipants,
    app,
    appPickerSearch,
    appSearchQuery,
    appendGroupSystemMessage,
    apps,
    archiveAppGroup,
    archiveChat,
    archivedCount,
    archivedItems,
    archivedTargetId,
    attachMenu,
    attachMenuRef,
    author,
    b,
    backAction,
    backLabel,
    base,
    bestSuggestion,
    body,
    c,
    cal,
    calMonth,
    calYear,
    canArchiveAppGroup,
    canManualArchive,
    canSend,
    canShowMenu,
    cancelEditMessage,
    candidates,
    cat,
    cell,
    cellStyle,
    chat,
    chatKey,
    chatRowMenuOpen,
    chatSearch,
    chatTab,
    chatViewMenuOpen,
    clearComposePick,
    clearReply,
    closeCompose,
    closeModal,
    closeTemplatesWizard,
    color,
    composeDropdown,
    composeMenuRef,
    composeQuery,
    composeSelected,
    composingNew,
    confirmDanger,
    confirmLabel,
    confirmLeaveGroup,
    conflictCount,
    consultant,
    contact,
    count,
    currentIdx,
    currentUser,
    currentUserIsGroupAdmin,
    d,
    danger,
    daysLeft,
    daysSince,
    decorated,
    decoratedContacts,
    deleteChat,
    demotedIds,
    dmKey,
    done,
    dot,
    draftAdmins,
    draftGroupId,
    draftHasAdmin,
    draftMembers,
    draftText,
    durationSlots,
    e,
    editingDraft,
    editingMsgId,
    emoji,
    emojiPickerForMsg,
    enrolled,
    existingMessages,
    filteredApps,
    filteredContacts,
    filteredGroups,
    findUser,
    fromMe,
    fullyFree,
    g,
    getGroupIcon,
    group,
    groupApplySuggestion,
    groupBackToParticipants,
    groupBackToScheduling,
    groupBeginDrag,
    groupCalendars,
    groupConflictExpanded,
    groupDetails,
    groupDuration,
    groupEndDrag,
    groupExtendDrag,
    groupGoToConfirmation,
    groupGoToDetails,
    groupGoToScheduling,
    groupHoverCell,
    groupParticipantSearch,
    groupParticipants,
    groupResetWizard,
    groupScheduleMeeting,
    groupScheduledMeeting,
    groupSelection,
    groupStep,
    groupViewMeeting,
    grouped,
    handleCancel,
    handleLeaveConfirm,
    handleSave,
    handleToggle,
    handleToggleMenu,
    hasBusy,
    hasChanges,
    hasHistory,
    hasOoh,
    hasRecipient,
    hasTentative,
    headerMenuRef,
    hoveredMsgId,
    i,
    iAmAdmin,
    id,
    isActive,
    isApp,
    isAppGroup,
    isDemoted,
    isGroup,
    isGroupAdmin,
    isHourMark,
    isHovered,
    isLastDraftAdmin,
    isMe,
    isMemberAdmin,
    isNewlyAdded,
    isOpen,
    isPromoted,
    isShared,
    isStudent,
    it,
    item,
    items,
    label,
    leaveGroup,
    leftSummary,
    m,
    matches,
    memberMenuOpen,
    memberToast,
    memberUsers,
    menuOpen,
    message,
    messages,
    messagesEndRef,
    meta,
    mine,
    msSince,
    msgMenuOpen,
    msgs,
    myArchived,
    myFavourites,
    newlyAddedCount,
    noCommonOverlap,
    notifyMemberEvent,
    now,
    ok,
    onCancel,
    onClick,
    onConfirm,
    onMsgEnter,
    onMsgLeave,
    onlyAdding,
    onlyAdminChg,
    onlyRemoving,
    openBookingFromChat,
    openCompose,
    openGroup,
    openMembersPanel,
    opt,
    original,
    originalAdmins,
    originalDeleted,
    originalMembers,
    p,
    pickComposeContact,
    picked,
    pickerOpen,
    pickerSearch,
    pinned,
    prev,
    preview,
    primaryAction,
    primaryDisabled,
    primaryHelp,
    primaryIcon,
    primaryLabel,
    promotedIds,
    q,
    r,
    recencyScore,
    removeGroupParticipant,
    removedIds,
    renderRow,
    replyTo,
    replyingToByChat,
    requestAdminRemoveMessage,
    requestDeleteArchivedChat,
    requestDeleteMessage,
    requestUnarchive,
    resolveTemplate,
    rg,
    rollup,
    rollupAvailability,
    s,
    saveAccent,
    saveAccentHover,
    saveEditMessage,
    saveLabel,
    selected,
    selectedApp,
    selectedDate,
    selectedTopicId,
    sendApplication,
    sendComposed,
    sendMessage,
    sender,
    setActiveChatId,
    setAppPickerSearch,
    setAppSearchQuery,
    setAttachMenu,
    setChatRowMenuOpen,
    setChatSearch,
    setChatTab,
    setChatViewMenuOpen,
    setComposeDropdown,
    setComposeQuery,
    setComposingNew,
    setConfirmLeaveGroup,
    setCreateGroupOpen,
    setDraftAdmins,
    setDraftGroupId,
    setDraftMembers,
    setDraftText,
    setEditingDraft,
    setEmojiPickerForMsg,
    setGroupConflictExpanded,
    setGroupDetails,
    setGroupDuration,
    setGroupHoverCell,
    setGroupParticipantSearch,
    setGroupSelection,
    setGroupStep,
    setGroups,
    setHubFeature,
    setMeetingMode,
    setMemberMenuOpen,
    setMemberToast,
    setMsgMenuOpen,
    setPickerSearch,
    setReplyTarget,
    setSelectedTopicId,
    setShowAddMemberPicker,
    setShowComposeMenu,
    setShowHeaderMenu,
    setShowMembersPanel,
    setTemplatesMenu,
    showActions,
    showAddMemberPicker,
    showComposeMenu,
    showHeaderMenu,
    showMembersPanel,
    slot,
    slotIsSelected,
    slotLabel,
    slotRangeLabel,
    sp,
    stageAddMember,
    stageDemoteAdmin,
    stageMakeAdmin,
    stageRemoveMember,
    stages,
    startEditMessage,
    status,
    stop,
    studentAllowedIds,
    suggestTimeSlots,
    suggestions,
    summary,
    t,
    tabs,
    templatesMenu,
    threadId,
    timeStringToMinutesAgo,
    title,
    toggleFavourite,
    toggleGroupParticipant,
    togglePin,
    toggleReaction,
    tooltip,
    topic,
    totalChanges,
    totalCount,
    u,
    uid,
    unpinned,
    user,
    userId,
    userIds,
    visible,
    visibleMemberIds,
    visibleMembers,
    wasMemberAdmin,
    wizardPickApp,
    wizardPickTemplate,
    wizardPickTopic
  } = ctx;

function ChatListPanel() {
    const archivedCount = archivedItems.length;
    const tabs = [
      { id: "all", label: "All", showDot: decoratedContacts.some(c => c.unread > 0) },
      { id: "unread", label: "Unread" },
      { id: "favourites", label: "Favourites" },
      { id: "groups", label: "Groups" },
      { id: "archive", label: "Archive", count: archivedCount },
    ];
    return (
      <div style={{
        width: 348, background: C.surface,
        borderRight: `1px solid ${C.border}`,
        display: "flex", flexDirection: "column",
        flexShrink: 0,
      }}>
        {/* Header */}
        <div style={{ padding: "20px 18px 14px", display: "flex", alignItems: "center", gap: 8 }}>
          <h2 style={{ flex: 1, fontFamily: "'Roboto', sans-serif", fontSize: 20, fontWeight: 600, color: C.text, letterSpacing: "-0.015em" }}>
            Chats
          </h2>
          <Tooltip label="Search" position="bottom">
            <button className="iconbtn smooth" style={{
              width: 32, height: 32, borderRadius: 8, color: C.textMid,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "none", background: "transparent", cursor: "pointer",
            }}>
              <Search size={16} />
            </button>
          </Tooltip>

          {/* Compose menu — hidden for students (they can only reply in existing chats) */}
          {currentUser.type !== "student" && (
          <div ref={composeMenuRef} style={{ position: "relative", display: "inline-flex" }}>
            <Tooltip label="New chat or group" position="bottom">
              <button
                onClick={() => setShowComposeMenu(s => !s)}
                className="iconbtn smooth"
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  color: (composingNew || showComposeMenu) ? C.primary : C.textMid,
                  background: (composingNew || showComposeMenu) ? C.primary10 : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Edit3 size={16} />
              </button>
            </Tooltip>

            {showComposeMenu && (
              <div className="pop" style={{
                position: "absolute", top: "calc(100% + 6px)", right: 0,
                background: C.surface, borderRadius: T.radLg,
                boxShadow: C.shadowMd, border: `1px solid ${C.border}`,
                width: 220, padding: 6, zIndex: 50,
              }}>
                <button
                  onClick={() => { setShowComposeMenu(false); openCompose(); }}
                  className="smooth"
                  style={{
                    width: "100%", padding: "10px 11px", borderRadius: 9,
                    display: "flex", alignItems: "center", gap: 11,
                    background: "transparent", textAlign: "left",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = C.primary05}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 9,
                    background: C.primary10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <MessagesSquare size={15} color={C.primary} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: C.text, lineHeight: 1.15 }}>
                      New chat
                    </div>
                    <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>
                      Direct message a contact
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => { setShowComposeMenu(false); setCreateGroupOpen(true); }}
                  className="smooth"
                  style={{
                    width: "100%", padding: "10px 11px", borderRadius: 9,
                    display: "flex", alignItems: "center", gap: 11,
                    background: "transparent", textAlign: "left",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = C.primary05}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 9,
                    background: C.sec10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Users size={15} color={C.secondary} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: C.text, lineHeight: 1.15 }}>
                      New group
                    </div>
                    <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>
                      Create a group chat
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
          )}
        </div>

        {/* Search input */}
        <div style={{ padding: "0 18px 10px" }}>
          <div style={{ position: "relative" }}>
            <Search size={14} color={C.textSoft} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={chatSearch}
              onChange={e => setChatSearch(e.target.value)}
              placeholder="Search conversations..."
              style={{
                width: "100%", padding: "8px 10px 8px 32px",
                borderRadius: 8, border: `1px solid ${C.border}`,
                background: C.bg, fontSize: 12.5, color: C.text,
              }}
            />
          </div>
        </div>

        {/* Tabs — pill style. Horizontal scroll fallback is kept as a
            safety net in case future labels overflow on narrow viewports. */}
        <div
          className="no-scrollbar"
          style={{
            display: "flex",
            padding: "0 12px 10px",
            gap: 3,
            borderBottom: `1px solid ${C.divider}`,
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {tabs.map(t => {
            const active = chatTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setChatTab(t.id)}
                className="smooth"
                style={{
                  padding: "5px 10px", borderRadius: 7,
                  fontSize: 11, fontWeight: 600,
                  background: active ? C.primary : "transparent",
                  color: active ? "#fff" : C.textMid,
                  position: "relative",
                  display: "flex", alignItems: "center", gap: 4,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  border: "none", cursor: "pointer",
                }}
              >
                {t.label}
                {t.id === "all" && t.showDot && (
                  <span style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: active ? "#fff" : C.secondary,
                  }} />
                )}
                {t.id === "archive" && t.count > 0 && (
                  <span style={{
                    minWidth: 16, height: 14, padding: "0 4px",
                    borderRadius: 7, fontSize: 9, fontWeight: 700,
                    background: active ? "rgba(255,255,255,0.25)" : C.bg,
                    color: active ? "#fff" : C.textMid,
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                  }}>{t.count}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {(() => {
            // Recency score — smaller = more recent. No-message chats sort to the bottom.
            const recencyScore = (c) => c.hasMessages ? timeStringToMinutesAgo(c.time) : Infinity;
            const renderRow = (item) => item.isGroup
              ? GroupRow({ group: item })
              : <ChatRow key={item.id} contact={item} />;

            // Combined list of every chat the user can see in the current tab
            // (filtered by the chatTab logic in filteredContacts/filteredGroups already)
            const allChats = [...filteredContacts, ...filteredGroups];
            const pinned    = allChats.filter(c => c.isPinned).sort((a, b) => recencyScore(a) - recencyScore(b));
            const unpinned  = allChats.filter(c => !c.isPinned).sort((a, b) => recencyScore(a) - recencyScore(b));

            // ─── ALL / UNREAD: one mixed list, no sub-headers ───
            if (chatTab === "all" || chatTab === "unread") {
              return (
                <>
                  {pinned.length > 0 && (
                    <>
                      <div style={{
                        padding: "8px 18px 4px",
                        fontSize: 9.5, fontWeight: 700, color: C.textSoft,
                        letterSpacing: "0.10em", textTransform: "uppercase",
                        display: "flex", alignItems: "center", gap: 6,
                      }}>
                        <Pin size={10} />
                        Pinned
                      </div>
                      {pinned.map(renderRow)}
                    </>
                  )}
                  {unpinned.length > 0 && pinned.length > 0 && (
                    <div style={{ height: 4 }} />
                  )}
                  {unpinned.map(renderRow)}
                </>
              );
            }

            // ─── FAVOURITES: pinned at top, then all favourites by recency ───
            if (chatTab === "favourites") {
              return (
                <>
                  {pinned.length > 0 && (
                    <>
                      <div style={{
                        padding: "8px 18px 4px",
                        fontSize: 9.5, fontWeight: 700, color: C.textSoft,
                        letterSpacing: "0.10em", textTransform: "uppercase",
                        display: "flex", alignItems: "center", gap: 6,
                      }}>
                        <Pin size={10} />
                        Pinned
                      </div>
                      {pinned.map(renderRow)}
                    </>
                  )}
                  {unpinned.length > 0 && (
                    <>
                      <div style={{
                        padding: "8px 18px 4px",
                        marginTop: pinned.length ? 4 : 0,
                        fontSize: 9.5, fontWeight: 700, color: C.textSoft,
                        letterSpacing: "0.10em", textTransform: "uppercase",
                        display: "flex", alignItems: "center", gap: 6,
                      }}>
                        <Star size={10} />
                        Favourites
                      </div>
                      {unpinned.map(renderRow)}
                    </>
                  )}
                </>
              );
            }

            // ─── GROUPS: pinned + unpinned groups, both by recency ───
            if (chatTab === "groups") {
              return (
                <>
                  {pinned.length > 0 && (
                    <>
                      <div style={{
                        padding: "8px 18px 4px",
                        fontSize: 9.5, fontWeight: 700, color: C.textSoft,
                        letterSpacing: "0.10em", textTransform: "uppercase",
                        display: "flex", alignItems: "center", gap: 6,
                      }}>
                        <Pin size={10} />
                        Pinned
                      </div>
                      {pinned.map(renderRow)}
                    </>
                  )}
                  {unpinned.length > 0 && (
                    <>
                      <div style={{
                        padding: "8px 18px 4px",
                        marginTop: pinned.length ? 4 : 0,
                        fontSize: 9.5, fontWeight: 700, color: C.textSoft,
                        letterSpacing: "0.10em", textTransform: "uppercase",
                        display: "flex", alignItems: "center", gap: 6,
                      }}>
                        <ChevronDown size={11} />
                        Groups
                        <span style={{
                          background: C.primary10, color: C.primary,
                          fontSize: 9, fontWeight: 700,
                          padding: "1px 6px", borderRadius: T.radFull, marginLeft: 4,
                        }}>{unpinned.length}</span>
                      </div>
                      {unpinned.map(renderRow)}
                    </>
                  )}
                </>
              );
            }

            // ─── ARCHIVE: archived DMs + groups, sorted by last message time ───
            if (chatTab === "archive") {
              return (
                <>
                  {archivedItems.length > 0 && (
                    <div style={{
                      padding: "8px 18px 4px",
                      fontSize: 9.5, fontWeight: 700, color: C.textSoft,
                      letterSpacing: "0.10em", textTransform: "uppercase",
                      display: "flex", alignItems: "center", gap: 6,
                    }}>
                      <Archive size={10} />
                      Archived
                      <span style={{
                        background: C.bg, color: C.textMid,
                        fontSize: 9, fontWeight: 700,
                        padding: "1px 6px", borderRadius: T.radFull, marginLeft: 4,
                      }}>{archivedItems.length}</span>
                    </div>
                  )}
                  {archivedItems.map(it => {
                    if (it.kind === "dm") {
                      const decorated = {
                        ...it.contact,
                        unread: 0,
                        isFavourite: !!myFavourites[it.contact.id],
                        isPinned: false,
                        isArchived: true,
                        hasMessages: !!it.lastMessage,
                        last: it.lastMessage?.text || "",
                        time: it.lastTime || "",
                      };
                      return <ChatRow key={`arc-dm-${it.id}`} contact={decorated} />;
                    } else {
                      const decorated = {
                        ...it.group,
                        isGroup: true,
                        unread: 0,
                        isFavourite: !!myFavourites[it.group.id],
                        isPinned: false,
                        isArchived: true,
                        hasMessages: !!it.lastMessage,
                        last: it.lastMessage?.text || "",
                        time: it.lastTime || "",
                        members: it.group.members || [],
                      };
                      return <GroupRow key={`arc-grp-${it.id}`} group={decorated} />;
                    }
                  })}
                </>
              );
            }

            return null;
          })()}

          {/* Empty state — Archive */}
          {chatTab === "archive" && archivedItems.length === 0 && (
            <div style={{
              padding: "44px 24px", textAlign: "center",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: C.primary05, border: `1px dashed ${C.borderStrong}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Archive size={20} color={C.textVerySoft} />
              </div>
              <div style={{ fontSize: T.fontBase, fontWeight: 600, color: C.textMid }}>
                No archived conversations
              </div>
              <div style={{ fontSize: T.fontXs, color: C.textSoft, lineHeight: 1.5, maxWidth: 220 }}>
                Open the <MoreVertical size={10} style={{ verticalAlign: "-1px", margin: "0 1px" }} /> menu on any chat and pick <strong>Archive</strong> to move it here.
              </div>
            </div>
          )}

          {/* Empty state when Groups tab has no groups */}
          {chatTab === "groups" && filteredGroups.length === 0 && (
            <div style={{
              padding: "44px 24px", textAlign: "center",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: C.primary05, border: `1px dashed ${C.borderStrong}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Users size={20} color={C.textVerySoft} />
              </div>
              <div style={{ fontSize: T.fontBase, fontWeight: 600, color: C.textMid }}>
                No groups yet
              </div>
              <div style={{ fontSize: T.fontXs, color: C.textSoft, lineHeight: 1.5, maxWidth: 200 }}>
                Tap the <Edit3 size={10} style={{ verticalAlign: "-1px", margin: "0 1px" }} /> icon above and pick <strong>New group</strong> to create one.
              </div>
            </div>
          )}

          {/* Empty state when Favourites tab has nothing */}
          {chatTab === "favourites" && filteredContacts.length === 0 && filteredGroups.length === 0 && (
            <div style={{
              padding: "44px 24px", textAlign: "center",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: C.primary05, border: `1px dashed ${C.borderStrong}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Star size={20} color={C.textVerySoft} />
              </div>
              <div style={{ fontSize: T.fontBase, fontWeight: 600, color: C.textMid }}>
                No favourites yet
              </div>
              <div style={{ fontSize: T.fontXs, color: C.textSoft, lineHeight: 1.5, maxWidth: 220 }}>
                Tap the <MoreVertical size={10} style={{ verticalAlign: "-1px", margin: "0 1px" }} /> menu on any chat and pick <strong>Add to Favourites</strong>.
              </div>
            </div>
          )}

          {filteredContacts.length === 0 && filteredGroups.length === 0 && chatTab !== "groups" && chatTab !== "favourites" && chatTab !== "archive" && (
            <div style={{ padding: "40px 20px", textAlign: "center", color: C.textSoft, fontSize: 12 }}>
              No conversations match.
            </div>
          )}
        </div>
      </div>
    );
  }

function RowActionMenu({ chat }) {
    const isOpen = chatRowMenuOpen === chat.id;

    const stop = (e) => { e.stopPropagation(); };
    const handleToggleMenu = (e) => {
      e.stopPropagation();
      setChatRowMenuOpen(isOpen ? null : chat.id);
    };

    // Archived chats get a different (and shorter) menu: only Unarchive + Delete
    const items = chat.isArchived
      ? [
          {
            id: "unarchive",
            label: "Unarchive",
            icon: RefreshCcw,
            active: false,
            onClick: () => { setChatRowMenuOpen(null); requestUnarchive(chat.id, chat.name); },
          },
          {
            id: "delete",
            label: "Delete",
            icon: Trash2,
            danger: true,
            active: false,
            onClick: () => { setChatRowMenuOpen(null); requestDeleteArchivedChat(chat.id, chat.name); },
          },
        ]
      : [
      {
        id: "fav",
        label: chat.isFavourite ? "Remove from Favourites" : "Add to Favourites",
        icon: Star,
        active: chat.isFavourite,
        onClick: () => toggleFavourite(chat.id),
      },
      {
        id: "pin",
        label: chat.isPinned ? "Unpin" : "Pin to top",
        icon: Pin,
        active: chat.isPinned,
        onClick: () => togglePin(chat.id),
      },
      {
        id: "archive",
        label: "Archive",
        icon: Archive,
        active: false,
        onClick: () => archiveChat(chat.id),
      },
      {
        id: "delete",
        label: "Delete chat",
        icon: Trash2,
        danger: true,
        active: false,
        onClick: () => deleteChat(chat.id),
      },
    ];

    return (
      <div style={{ position: "relative", flexShrink: 0 }} onClick={stop}>
        <button
          onClick={handleToggleMenu}
          className="iconbtn smooth"
          style={{
            width: 26, height: 26, borderRadius: 6,
            color: isOpen ? C.text : C.textSoft,
            background: isOpen ? C.bg : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: isOpen ? 1 : 0.7,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; e.currentTarget.style.opacity = 1; }}
          onMouseLeave={e => { e.currentTarget.style.background = isOpen ? C.bg : "transparent"; e.currentTarget.style.color = isOpen ? C.text : C.textSoft; e.currentTarget.style.opacity = isOpen ? 1 : 0.7; }}
          aria-label="Chat options"
        >
          <MoreVertical size={14} />
        </button>
        {isOpen && (
          <div
            data-rowmenu="true"
            className="fade-up"
            style={{
              position: "absolute", top: "calc(100% + 4px)", right: 0,
              minWidth: 200,
              background: C.surface, borderRadius: 9,
              border: `1px solid ${C.border}`,
              boxShadow: "0 8px 24px rgba(13,31,31,0.12)",
              padding: 4,
              zIndex: 30,
            }}
          >
            {items.map((it, i) => {
              const Ico = it.icon;
              const color = it.danger ? C.danger : (it.active ? C.primary : C.text);
              return (
                <button
                  key={it.id}
                  onClick={(e) => { e.stopPropagation(); it.onClick(); }}
                  className="smooth"
                  style={{
                    width: "100%", padding: "8px 10px", borderRadius: 6,
                    background: "transparent", color,
                    fontSize: 12, fontWeight: 500,
                    display: "flex", alignItems: "center", gap: 9,
                    textAlign: "left",
                    borderTop: it.danger && i > 0 ? `1px solid ${C.divider}` : "none",
                    marginTop: it.danger && i > 0 ? 2 : 0,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = it.danger ? C.dangerBg : C.bg; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <Ico size={13} color={color} fill={it.active && it.id === "fav" ? C.primary : "none"} />
                  <span style={{ flex: 1 }}>{it.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

function ChatHeaderActionMenu({ chat }) {
    const isOpen = chatViewMenuOpen === chat.id;
    const handleToggle = (e) => {
      e.stopPropagation();
      setChatViewMenuOpen(isOpen ? null : chat.id);
    };

    const isAppGroup = chat.type === "application";
    const canArchiveAppGroup = isAppGroup && chat.admins?.includes(currentUser.id);
    // Detect group vs DM — only groups have a 'members' array.
    const isGroup = Array.isArray(chat.members);

    const items = [];

    // "Manage members" — visible only for groups; opens the side panel.
    if (isGroup) {
      items.push({
        id: "members",
        label: "Manage members",
        icon: Users,
        active: false,
        onClick: () => { openMembersPanel(chat); setChatViewMenuOpen(null); },
      });
    }

    items.push(
      {
        id: "fav",
        label: chat.isFavourite ? "Remove from Favourites" : "Add to Favourites",
        icon: Star,
        active: chat.isFavourite,
        onClick: () => { toggleFavourite(chat.id); setChatViewMenuOpen(null); },
      },
      {
        id: "pin",
        label: chat.isPinned ? "Unpin" : "Pin to top",
        icon: Pin,
        active: chat.isPinned,
        onClick: () => { togglePin(chat.id); setChatViewMenuOpen(null); },
      },
      {
        id: "archive",
        label: isAppGroup ? "Archive group (everyone)" : "Archive",
        icon: Archive,
        active: false,
        // For app groups: global archive (consultant/manager only).
        // For other chats: per-user archive (anyone can hide).
        disabled: isAppGroup && !canArchiveAppGroup,
        onClick: () => {
          if (isAppGroup) {
            if (canArchiveAppGroup) archiveAppGroup(chat.id);
          } else {
            archiveChat(chat.id);
          }
          setChatViewMenuOpen(null);
        },
      }
    );

    // Only non-app groups + DMs allow "Delete chat" — for app groups this would orphan the data.
    if (!isAppGroup) {
      items.push({
        id: "delete",
        label: "Delete chat",
        icon: Trash2,
        danger: true,
        active: false,
        onClick: () => { deleteChat(chat.id); setChatViewMenuOpen(null); },
      });
    }

    return (
      <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
        <Tooltip label="More" position="bottom">
          <button
            onClick={handleToggle}
            aria-label="Chat options"
            className="iconbtn smooth"
            style={{
              width: 34, height: 34, borderRadius: 9,
              color: isOpen ? C.text : C.textMid,
              background: isOpen ? C.bg : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
            onMouseLeave={e => { e.currentTarget.style.background = isOpen ? C.bg : "transparent"; e.currentTarget.style.color = isOpen ? C.text : C.textMid; }}
          >
            <MoreVertical size={16} />
          </button>
        </Tooltip>
        {isOpen && (
          <div
            data-rowmenu="true"
            className="fade-up"
            style={{
              position: "absolute", top: "calc(100% + 4px)", right: 0,
              minWidth: 220,
              background: C.surface, borderRadius: 9,
              border: `1px solid ${C.border}`,
              boxShadow: "0 8px 24px rgba(13,31,31,0.12)",
              padding: 4,
              zIndex: 30,
            }}
          >
            {items.map((it, i) => {
              const Ico = it.icon;
              const color = it.disabled ? C.textVerySoft : (it.danger ? C.danger : (it.active ? C.primary : C.text));
              return (
                <button
                  key={it.id}
                  onClick={(e) => { e.stopPropagation(); if (!it.disabled) it.onClick(); }}
                  disabled={it.disabled}
                  className="smooth"
                  style={{
                    width: "100%", padding: "8px 10px", borderRadius: 6,
                    background: "transparent", color,
                    fontSize: 12, fontWeight: 500,
                    display: "flex", alignItems: "center", gap: 9,
                    textAlign: "left",
                    borderTop: it.danger && i > 0 ? `1px solid ${C.divider}` : "none",
                    marginTop: it.danger && i > 0 ? 2 : 0,
                    cursor: it.disabled ? "not-allowed" : "pointer",
                    opacity: it.disabled ? 0.55 : 1,
                  }}
                  onMouseEnter={e => { if (!it.disabled) e.currentTarget.style.background = it.danger ? C.dangerBg : C.bg; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                  title={it.disabled ? "Only the assigned consultant or admission manager can archive this group" : ""}
                >
                  <Ico size={13} color={color} fill={it.active && it.id === "fav" ? C.primary : "none"} />
                  <span style={{ flex: 1 }}>{it.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

function ChatRow({ contact }) {
    const active = activeChatId === contact.id;
    return (
      <div
        onClick={() => { setActiveChatId(contact.id); setComposingNew(false); }}
        className={`chatrow ${active ? "active" : ""}`}
        style={{
          padding: "9px 18px", display: "flex",
          alignItems: "center", gap: 11,
          borderLeft: active ? `3px solid ${C.primary}` : `3px solid transparent`,
        }}
      >
        <Avatar contact={contact} size={36} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6,
          }}>
            <div style={{
              fontSize: T.fontBase, fontWeight: 600, color: C.text,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              display: "flex", alignItems: "center", gap: 5, minWidth: 0,
            }}>
              {contact.isPinned && <Pin size={9} color={C.textSoft} style={{ flexShrink: 0 }} />}
              <span style={{
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>{contact.name}</span>
              {contact.isFavourite && <Star size={10} color={C.primary} fill={C.primary} style={{ flexShrink: 0 }} />}
            </div>
            <div style={{ fontSize: T.fontXs, color: C.textSoft, fontWeight: 500, flexShrink: 0 }}>
              {contact.time}
            </div>
          </div>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginTop: 1,
          }}>
            <div style={{
              fontSize: 11, color: contact.unread ? C.text : C.textSoft,
              fontWeight: contact.unread ? 600 : 400,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              <span style={{ color: C.primary, fontWeight: 600, fontSize: 9, marginRight: 4 }}>
                {contact.role}
              </span>
              {contact.lastMessage}
            </div>
            {contact.unread > 0 && (
              <span style={{
                background: C.secondary, color: "#fff",
                borderRadius: T.radFull, padding: "1px 6px",
                fontSize: 9.5, fontWeight: 700, minWidth: 16, textAlign: "center",
              }}>
                {contact.unread}
              </span>
            )}
          </div>
        </div>
        <RowActionMenu chat={contact} />
      </div>
    );
  }

function GroupRow({ group }) {
    const active = activeChatId === group.id;
    return (
      <div
        key={group.id}
        onClick={() => openGroup(group.id)}
        className={`chatrow ${active ? "active" : ""}`}
        style={{
          padding: "9px 18px", display: "flex",
          alignItems: "center", gap: 11,
          borderLeft: active ? `3px solid ${C.primary}` : "3px solid transparent",
        }}
      >
        {/* Group avatar — Lucide icon on colored bg */}
        <div style={{
          width: 36, height: 36, borderRadius: T.radMd,
          background: `linear-gradient(135deg, ${group.color}, ${group.color}cc)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          boxShadow: `0 2px 6px ${group.color}33`,
        }}>
          {(() => { const Ico = getGroupIcon(group.iconName); return <Ico size={17} color="#fff" strokeWidth={2.2} />; })()}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
            <div style={{
              fontSize: T.fontBase, fontWeight: 600, color: C.text,
              display: "flex", alignItems: "center", gap: 5, minWidth: 0,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {group.isPinned && <Pin size={9} color={C.textSoft} style={{ flexShrink: 0 }} />}
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {group.name}
              </span>
              {group.isFavourite && <Star size={10} color={C.primary} fill={C.primary} style={{ flexShrink: 0 }} />}
              {group.isAdmin && group.type !== "application" && (
                <span style={{
                  fontSize: 8, fontWeight: 700, color: C.secondary,
                  background: C.sec10, padding: "1px 5px", borderRadius: 4,
                  letterSpacing: "0.04em", flexShrink: 0,
                }}>ADMIN</span>
              )}
            </div>
            <div style={{ fontSize: T.fontXs, color: C.textSoft, fontWeight: 500, flexShrink: 0 }}>
              {group.time}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginTop: 1 }}>
            <div style={{
              fontSize: 11, color: group.unread ? C.text : C.textSoft,
              fontWeight: group.unread ? 600 : 400,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              <span style={{ color: C.primary, fontWeight: 600, fontSize: 9, marginRight: 4 }}>
                {group.members.length} members
              </span>
              {group.lastMessage}
            </div>
            {group.unread > 0 && (
              <span style={{
                background: C.secondary, color: "#fff",
                borderRadius: T.radFull, padding: "1px 6px",
                fontSize: 9.5, fontWeight: 700, minWidth: 16, textAlign: "center",
              }}>
                {group.unread}
              </span>
            )}
          </div>
        </div>
        <RowActionMenu chat={group} />
      </div>
    );
  }

function ChatViewArea() {
    if (activeGroup) return GroupChatView();
    if (!activeContact) return ChatEmptyState();
    const msgs = messages[threadId(currentUser.id, activeContact.id)] || [];
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg }}>
        {/* Chat Header */}
        <div style={{
          background: C.surface, borderBottom: `1px solid ${C.border}`,
          padding: "12px 22px", display: "flex", alignItems: "center", gap: 12,
          minHeight: 64, position: "relative",
        }}>
          <div
            ref={headerMenuRef}
            onClick={(e) => { e.stopPropagation(); setShowHeaderMenu(s => !s); }}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              cursor: "pointer", padding: "4px 8px", borderRadius: 8,
              transition: "background 0.14s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = C.primary05}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <Avatar contact={activeContact} size={40} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text, display: "flex", alignItems: "center", gap: 7 }}>
                {activeContact.name}
                {activeContact.isFavourite && <Star size={13} color={C.secondary} fill={C.secondary} />}
              </div>
              <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>
                <span style={{ color: C.primary, fontWeight: 600 }}>{activeContact.role}</span>
                {activeContact.online && <> · <span style={{ color: C.success, fontWeight: 600 }}>Online</span></>}
                {!activeContact.online && <> · Last seen today at 14:15</>}
              </div>
            </div>

            {/* Dropdown menu */}
            {showHeaderMenu && (
              <div className="pop" style={{
                position: "absolute", top: "100%", left: 12, marginTop: 4,
                background: C.surface, borderRadius: T.radLg,
                boxShadow: C.shadowMd, border: `1px solid ${C.border}`,
                padding: 6, minWidth: 200, zIndex: 50,
              }}>
                <DropdownItem
                  Icon={Star}
                  label={activeContact.isFavourite ? "Remove from Favourites" : "Add to Favourites"}
                  onClick={() => toggleFavourite(activeContact.id)}
                />
                <DropdownItem
                  Icon={CalendarDays}
                  label="Book Meeting"
                  onClick={() => openBookingFromChat(activeContact.id)}
                />
                <div style={{ height: 1, background: C.divider, margin: "4px 0" }} />
                <DropdownItem
                  Icon={Trash2}
                  label="Delete Chat"
                  onClick={() => deleteChat(activeContact.id)}
                  danger
                />
              </div>
            )}
          </div>

          <div style={{ flex: 1 }} />
          <Tooltip label="Voice call" position="bottom">
            <button className="iconbtn smooth" style={{ width: 34, height: 34, borderRadius: 9, color: C.textMid }}>
              <Phone size={16} />
            </button>
          </Tooltip>
          <Tooltip label="Video call" position="bottom">
            <button className="iconbtn smooth" style={{ width: 34, height: 34, borderRadius: 9, color: C.textMid }}>
              <Video size={16} />
            </button>
          </Tooltip>
          <ChatHeaderActionMenu chat={activeContact} />
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "20px 28px",
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          <div style={{ textAlign: "center", margin: "8px 0 16px" }}>
            <span style={{
              fontSize: 11, color: C.textSoft, fontWeight: 600,
              background: C.surface, padding: "4px 12px", borderRadius: T.radFull,
              border: `1px solid ${C.border}`,
            }}>Today</span>
          </div>
          {msgs.map(m => <MessageBubble key={m.id} message={m} contact={activeContact} />)}
          <div ref={messagesEndRef} />
        </div>

        {/* Composer (or read-only banner if archived) */}
        {activeContact && myArchived[activeContact.id] ? (
          <div style={{
            background: C.bg, borderTop: `1px solid ${C.border}`,
            padding: "14px 22px",
          }}>
            <div style={{
              padding: "12px 14px", borderRadius: T.radMd,
              background: C.surface, border: `1px dashed ${C.borderStrong}`,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: C.primary05,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Archive size={15} color={C.textMid} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text, marginBottom: 2 }}>
                  This conversation is archived
                </div>
                <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.5 }}>
                  To send messages, please unarchive this chat.
                </div>
              </div>
              <button
                onClick={() => requestUnarchive(activeContact.id, activeContact.name)}
                className="smooth"
                style={{
                  padding: "7px 14px", borderRadius: 7,
                  background: C.primary, color: "#fff",
                  fontSize: 11.5, fontWeight: 700,
                  border: "none", cursor: "pointer",
                  flexShrink: 0,
                  display: "flex", alignItems: "center", gap: 6,
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.primaryDark}
                onMouseLeave={e => e.currentTarget.style.background = C.primary}
              >
                <RefreshCcw size={12} />
                Unarchive
              </button>
            </div>
          </div>
        ) : (
        <div style={{
          background: C.surface, borderTop: `1px solid ${C.border}`,
          padding: "14px 22px", position: "relative",
        }}>
          {/* Reply banner — DM */}
          {activeContact && replyingToByChat[threadId(currentUser.id, activeContact.id)] && (() => {
            const r = replyingToByChat[threadId(currentUser.id, activeContact.id)];
            return (
              <div className="fade-up" style={{
                marginBottom: 8,
                background: C.primary05,
                borderLeft: `3px solid ${C.primary}`,
                borderRadius: "0 8px 8px 0",
                padding: "8px 12px",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <CornerUpLeft size={13} color={C.primary} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: T.fontXs, fontWeight: 700, color: C.primary }}>
                    Replying to {r.fromName}
                  </div>
                  <div style={{
                    fontSize: 11, color: C.textMid, marginTop: 1,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{r.text}</div>
                </div>
                <button
                  onClick={() => clearReply(threadId(currentUser.id, activeContact.id))}
                  className="iconbtn smooth"
                  style={{
                    width: 24, height: 24, borderRadius: 6,
                    color: C.textMid, background: "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                  aria-label="Cancel reply"
                  onMouseEnter={e => { e.currentTarget.style.background = C.bg; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <X size={12} />
                </button>
              </div>
            );
          })()}

          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: C.bg, borderRadius: T.radLg, padding: "8px 12px",
            border: `1px solid ${C.border}`,
          }}>
            <input
              value={draftText}
              onChange={e => setDraftText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Type message..."
              style={{
                flex: 1, padding: "8px 4px",
                background: "transparent", border: "none",
                fontSize: 13, color: C.text,
              }}
            />
            <Tooltip label="Emoji">
              <button className="iconbtn smooth" style={{ color: C.textMid, padding: 4, borderRadius: 6 }}>
                <Smile size={17} />
              </button>
            </Tooltip>
            <Tooltip label="Attach">
              <button
                onClick={() => setAttachMenu(m => m ? null : "main")}
                className="iconbtn smooth"
                style={{
                  color: attachMenu ? C.primary : C.textMid,
                  background: attachMenu ? C.primary10 : "transparent",
                  padding: 5, borderRadius: 7,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Plus size={18} style={{ transition: "transform 0.18s ease", transform: attachMenu ? "rotate(45deg)" : "rotate(0)" }} />
              </button>
            </Tooltip>
            <button
              onClick={sendMessage}
              disabled={!draftText.trim()}
              className="smooth"
              style={{
                width: 36, height: 36, borderRadius: T.radMd,
                background: draftText.trim() ? C.primary : C.primary20,
                color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: draftText.trim() ? "pointer" : "default",
              }}
            >
              <Send size={15} />
            </button>
          </div>
          <div style={{ position: "absolute", bottom: "100%", right: 22 }}>
            {renderAttachMenu()}
          </div>
        </div>
        )}
      </div>
    );
  }

function renderTemplatesMenu() {
    if (!templatesMenu) return null;

    // ─── Step 1: Pick Application ─────────────────────────────
    if (templatesMenu === "app") {
      return (
        <div className="fade-up" style={{
          background: C.surface, borderRadius: T.radLg,
          border: `1px solid ${C.border}`,
          boxShadow: "0 4px 16px rgba(13,31,31,0.10)",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            padding: "12px 14px",
            borderBottom: `1px solid ${C.divider}`,
            display: "flex", alignItems: "center", gap: 9,
            background: C.bg,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: "rgba(22,163,74,0.10)", color: "#16A34A",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <FileText size={14} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text }}>
                Select Application
              </div>
              <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>
                Showing unconditional offer applications only
              </div>
            </div>
            <button
              onClick={closeTemplatesWizard}
              className="iconbtn smooth"
              style={{
                width: 24, height: 24, borderRadius: 6,
                color: C.textMid, background: "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; }}
            >
              <X size={13} />
            </button>
          </div>

          {/* Search */}
          <div style={{ padding: "8px 12px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "7px 10px", borderRadius: 8,
              background: C.bg, border: `1px solid ${C.border}`,
            }}>
              <Search size={13} color={C.textSoft} />
              <input
                autoFocus
                value={appSearchQuery}
                onChange={e => setAppSearchQuery(e.target.value)}
                placeholder="Search by APP ID, student name, or university…"
                style={{
                  flex: 1, border: "none", background: "transparent",
                  fontSize: 12, color: C.text, outline: "none",
                }}
              />
            </div>
          </div>

          {/* Results */}
          <div style={{ maxHeight: 280, overflowY: "auto", padding: "0 6px 8px" }}>
            {filteredApps.length === 0 ? (
              <div style={{
                padding: "22px 14px", textAlign: "center",
                fontSize: 11, color: C.textSoft, lineHeight: 1.55,
              }}>
                No applications found.
              </div>
            ) : (
              filteredApps.map(app => {
                const consultant = findUser(app.consultantId);
                return (
                  <button
                    key={app.id}
                    onClick={() => wizardPickApp(app)}
                    className="smooth"
                    style={{
                      width: "100%",
                      padding: "9px 10px",
                      borderRadius: 8,
                      background: "transparent",
                      textAlign: "left",
                      display: "flex", alignItems: "flex-start", gap: 9,
                      cursor: "pointer",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = C.bg}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{
                      flexShrink: 0,
                      fontSize: 9.5, fontWeight: 800,
                      padding: "3px 7px", borderRadius: 5,
                      background: C.primary10, color: C.primary,
                      border: `1px solid ${C.primary30}`,
                      fontFamily: "ui-monospace, monospace",
                    }}>{app.id}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 11.5, fontWeight: 600, color: C.text,
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>{app.studentName}</div>
                      <div style={{
                        fontSize: T.fontXs, color: C.textSoft, marginTop: 2,
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>{app.universityName.split("_")[0].trim()}</div>
                      <div style={{
                        fontSize: 9.5, color: C.textMid, marginTop: 3,
                        display: "flex", alignItems: "center", gap: 5,
                      }}>
                        <span style={{ fontWeight: 600 }}>{consultant?.name || "—"}</span>
                        <span style={{ color: C.textVerySoft }}>·</span>
                        <span>{app.intake}</span>
                      </div>
                    </div>
                    <span style={{
                      fontSize: 8.5, fontWeight: 700,
                      padding: "2px 6px", borderRadius: 4,
                      background: app.statusColor, color: "#fff",
                      flexShrink: 0, whiteSpace: "nowrap",
                    }}>{app.status.length > 14 ? app.status.split(" ").slice(0, 2).join(" ") : app.status}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      );
    }

    // ─── Step 2: Pick Topic ───────────────────────────────────
    if (templatesMenu === "topics") {
      return (
        <div className="fade-up" style={{
          background: C.surface, borderRadius: T.radLg,
          border: `1px solid ${C.border}`,
          boxShadow: "0 4px 16px rgba(13,31,31,0.10)",
          overflow: "hidden",
        }}>
          <div style={{
            padding: "12px 14px",
            borderBottom: `1px solid ${C.divider}`,
            display: "flex", alignItems: "center", gap: 9,
            background: C.bg,
          }}>
            <button
              onClick={() => { setTemplatesMenu("app"); setSelectedTopicId(null); }}
              className="iconbtn smooth"
              style={{
                width: 24, height: 24, borderRadius: 6,
                color: C.textMid, background: "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; }}
            >
              <ArrowLeft size={13} />
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text }}>
                Step 2 — Choose Topic
              </div>
              <div style={{
                fontSize: T.fontXs, color: C.textSoft, marginTop: 1,
                display: "flex", alignItems: "center", gap: 5,
              }}>
                <span style={{
                  fontSize: 9, fontWeight: 700,
                  padding: "1px 6px", borderRadius: 4,
                  background: C.primary10, color: C.primary,
                  fontFamily: "ui-monospace, monospace",
                }}>{selectedApp?.id}</span>
                <span>{selectedApp?.studentName}</span>
              </div>
            </div>
            <button
              onClick={closeTemplatesWizard}
              className="iconbtn smooth"
              style={{
                width: 24, height: 24, borderRadius: 6,
                color: C.textMid, background: "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; }}
            >
              <X size={13} />
            </button>
          </div>

          {/* Topic tiles */}
          <div style={{
            padding: 10,
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7,
          }}>
            {MESSAGE_TOPICS.map(topic => (
              <button
                key={topic.id}
                onClick={() => wizardPickTopic(topic.id)}
                className="smooth"
                style={{
                  padding: "11px 11px 11px 14px",
                  borderRadius: 9,
                  background: C.bg, border: `1px solid ${C.border}`,
                  textAlign: "left",
                  display: "flex", flexWrap: "wrap", gap: 6,
                  cursor: "pointer",
                  position: "relative",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = topic.accent; e.currentTarget.style.background = C.surface; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bg; }}
              >
                <span style={{
                  position: "absolute", left: 0, top: 8, bottom: 8, width: 3,
                  borderRadius: 2, background: topic.accent,
                }} />
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14, lineHeight: 1 }}>{topic.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>
                    {topic.label}
                  </span>
                </div>
                <div style={{ fontSize: 9.5, color: C.textSoft, lineHeight: 1.45 }}>
                  {topic.description}
                </div>
                <div style={{
                  marginTop: 2, fontSize: 9.5, fontWeight: 600,
                  color: topic.accent,
                  display: "flex", alignItems: "center", gap: 3,
                }}>
                  {topic.templates.length} {topic.templates.length === 1 ? "template" : "templates"}
                  <ChevronRight size={9} strokeWidth={3} />
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // ─── Step 2: Pick Template (was Step 3 — topic step removed) ────
    if (templatesMenu === "templates") {
      const topic = MESSAGE_TOPICS.find(t => t.id === selectedTopicId);
      if (!topic) { setTemplatesMenu("app"); return null; }

      return (
        <div className="fade-up" style={{
          background: C.surface, borderRadius: T.radLg,
          border: `1px solid ${C.border}`,
          boxShadow: "0 4px 16px rgba(13,31,31,0.10)",
          overflow: "hidden",
        }}>
          <div style={{
            padding: "12px 14px",
            borderBottom: `1px solid ${C.divider}`,
            display: "flex", alignItems: "center", gap: 9,
            background: C.bg,
          }}>
            <button
              onClick={() => { setTemplatesMenu("app"); setSelectedTopicId(null); }}
              className="iconbtn smooth"
              style={{
                width: 24, height: 24, borderRadius: 6,
                color: C.textMid, background: "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; }}
            >
              <ArrowLeft size={13} />
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 12.5, fontWeight: 700, color: C.text,
                display: "flex", alignItems: "center", gap: 5,
              }}>
                <span>Choose Template</span>
              </div>
              <div style={{
                fontSize: T.fontXs, color: C.textSoft, marginTop: 1,
                display: "flex", alignItems: "center", gap: 5,
              }}>
                <span style={{
                  fontSize: 9, fontWeight: 700,
                  padding: "1px 6px", borderRadius: 4,
                  background: C.primary10, color: C.primary,
                  fontFamily: "ui-monospace, monospace",
                }}>{selectedApp?.id}</span>
                <span>{selectedApp?.studentName}</span>
                <span style={{ color: C.textVerySoft }}>·</span>
                <span style={{ fontSize: 9.5, color: "#16A34A", fontWeight: 600 }}>Unconditional</span>
              </div>
            </div>
            <button
              onClick={closeTemplatesWizard}
              className="iconbtn smooth"
              style={{
                width: 24, height: 24, borderRadius: 6,
                color: C.textMid, background: "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; }}
            >
              <X size={13} />
            </button>
          </div>

          {/* Template list — each shows a PREVIEW with the selected app data */}
          <div style={{
            padding: 8,
            display: "flex", flexDirection: "column", gap: 5,
            maxHeight: 360, overflowY: "auto",
          }}>
            {topic.templates.map(t => {
              // Live preview with the selected app's data
              const preview = resolveTemplate(t.preview, selectedApp, currentUser.name);
              return (
                <button
                  key={t.id}
                  onClick={() => wizardPickTemplate(t)}
                  className="smooth"
                  style={{
                    padding: "10px 12px",
                    borderRadius: 8,
                    background: C.bg, border: `1px solid ${C.border}`,
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = topic.accent; e.currentTarget.style.background = C.surface; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bg; }}
                >
                  <div style={{
                    fontSize: 11.5, fontWeight: 700, color: C.text, marginBottom: 4,
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6,
                  }}>
                    <span>{t.title}</span>
                    <span style={{
                      fontSize: 9, fontWeight: 700,
                      padding: "2px 6px", borderRadius: 4,
                      background: topic.accent, color: "#fff",
                    }}>USE</span>
                  </div>
                  <div style={{
                    fontSize: T.fontXs, color: C.textMid, lineHeight: 1.5,
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}>{preview}</div>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    return null;
  }

function renderAttachMenu() {
    if (!attachMenu) return null;

    const q = appPickerSearch.trim().toLowerCase();
    const apps = q
      ? SAMPLE_APPLICATIONS.filter(a =>
          a.id.toLowerCase().includes(q) ||
          a.course.toLowerCase().includes(q) ||
          a.university.toLowerCase().includes(q)
        )
      : SAMPLE_APPLICATIONS;

    return (
      <div
        ref={attachMenuRef}
        className="pop"
        style={{
          position: "absolute", bottom: "calc(100% + 10px)", right: 0,
          background: C.surface, borderRadius: T.radLg,
          boxShadow: C.shadowLg, border: `1px solid ${C.border}`,
          width: attachMenu === "apps" ? 380 : 260,
          maxHeight: 420, overflow: "hidden",
          zIndex: 50, display: "flex", flexDirection: "column",
        }}
      >
        {attachMenu === "main" && (
          <div style={{ padding: 8 }}>
            <div style={{
              padding: "8px 10px 6px", fontSize: 9.5, fontWeight: 700,
              color: C.textSoft, letterSpacing: "0.10em", textTransform: "uppercase",
            }}>
              Attach to message
            </div>
            {[
              { id: "files", Icon: File, label: "Files", sub: "PDF, DOCX up to 25MB", tint: C.primary, tintBg: C.primary10 },
              { id: "photos", Icon: ImageIcon, label: "Photos", sub: "JPG, PNG, GIF", tint: C.secondary, tintBg: C.sec10 },
              { id: "apps", Icon: FileText, label: "Applications", sub: "Send as a clickable link", tint: C.success, tintBg: C.successBg },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => {
                  if (opt.id === "apps") setAttachMenu("apps");
                  else alert(`${opt.label} picker coming soon — wire this up to your file uploader.`);
                }}
                className="smooth"
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 11,
                  padding: "10px 10px", borderRadius: T.radMd,
                  background: "transparent", textAlign: "left",
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.primary05}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: T.radMd,
                  background: opt.tintBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <opt.Icon size={17} color={opt.tint} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: T.fontBase, fontWeight: 600, color: C.text }}>{opt.label}</div>
                  <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>{opt.sub}</div>
                </div>
                <ChevronRight size={14} color={C.textSoft} />
              </button>
            ))}
          </div>
        )}

        {attachMenu === "apps" && (
          <>
            {/* Header */}
            <div style={{
              padding: "12px 14px 10px",
              borderBottom: `1px solid ${C.divider}`,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <button
                onClick={() => { setAttachMenu("main"); setAppPickerSearch(""); }}
                className="iconbtn smooth"
                style={{ width: 28, height: 28, borderRadius: 7, color: C.textMid, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <ArrowLeft size={15} />
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text, lineHeight: 1.1 }}>
                  Send an Application
                </div>
                <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>
                  Pick an application to share as a link
                </div>
              </div>
              <button
                onClick={() => { setAttachMenu(null); setAppPickerSearch(""); }}
                className="iconbtn smooth"
                style={{ width: 28, height: 28, borderRadius: 7, color: C.textMid, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Search */}
            <div style={{ padding: "10px 14px 8px" }}>
              <div style={{ position: "relative" }}>
                <Search size={13} color={C.textSoft} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  autoFocus
                  value={appPickerSearch}
                  onChange={e => setAppPickerSearch(e.target.value)}
                  placeholder="Search by App ID, course, or university"
                  style={{
                    width: "100%", padding: "7px 10px 7px 30px",
                    borderRadius: 8, border: `1px solid ${C.border}`,
                    background: C.bg, fontSize: 11.5, color: C.text,
                  }}
                />
              </div>
            </div>

            {/* List */}
            <div style={{ overflowY: "auto", flex: 1, padding: "0 6px 8px" }}>
              {apps.length === 0 ? (
                <div style={{ padding: "30px 12px", textAlign: "center", fontSize: 11.5, color: C.textSoft }}>
                  No applications match "{appPickerSearch}".
                </div>
              ) : (
                apps.map(app => (
                  <button
                    key={app.id}
                    onClick={() => sendApplication(app)}
                    className="smooth"
                    style={{
                      width: "100%", textAlign: "left",
                      padding: "10px 10px", borderRadius: 9,
                      background: "transparent",
                      borderBottom: `1px solid ${C.divider}`,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = C.primary05}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      fontSize: 11.5, fontWeight: 700, color: C.text, marginBottom: 4,
                    }}>
                      <span>#{app.id}</span>
                      <span style={{ color: C.textSoft, fontWeight: 500 }}>{app.date}</span>
                    </div>
                    <div style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                      <div style={{
                        width: 30, minWidth: 30, height: 30, borderRadius: 6,
                        background: app.uniColor,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 8.5, fontWeight: 800, color: "#fff", letterSpacing: "0.04em",
                      }}>{app.uniCode}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 11.5, fontWeight: 600, color: C.text, lineHeight: 1.3,
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>
                          {app.course}
                        </div>
                        <div style={{
                          fontSize: T.fontXs, color: C.textSoft, marginTop: 1,
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>
                          {app.university}
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div style={{
              padding: "10px 14px",
              borderTop: `1px solid ${C.divider}`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: C.bg,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11.5, fontWeight: 700, color: C.primary }}>
                <FileText size={13} />
                Applications
              </div>
              <ChevronRight size={13} color={C.primary} />
            </div>
          </>
        )}
      </div>
    );
  }

function ReactionsRow({ message, chatKey, fromMe }) {
    if (!message.reactions || Object.keys(message.reactions).length === 0) return null;
    return (
      <div style={{
        display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap",
        justifyContent: fromMe ? "flex-end" : "flex-start",
      }}>
        {Object.entries(message.reactions).map(([emoji, userIds]) => {
          if (!userIds || userIds.length === 0) return null;
          const mine = userIds.includes(currentUser.id);
          const tooltip = userIds.map(uid => findUser(uid)?.name).filter(Boolean).join(", ") + ` reacted with ${emoji}`;
          return (
            <button
              key={emoji}
              onClick={() => toggleReaction(chatKey, message.id, emoji)}
              title={tooltip}
              className="smooth"
              style={{
                padding: "2px 8px", borderRadius: T.radFull,
                background: mine ? C.primary10 : C.surface,
                border: `1px solid ${mine ? C.primary30 : C.border}`,
                fontSize: 11, color: C.text,
                cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 4,
                lineHeight: 1.2,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              <span style={{ fontSize: 12 }}>{emoji}</span>
              <span style={{ fontSize: T.fontXs, fontWeight: 600 }}>{userIds.length}</span>
            </button>
          );
        })}
      </div>
    );
  }

function ReplyQuote({ replyTo, fromMe, chatKey }) {
    if (!replyTo) return null;
    // Look up the current state of the original — if it's been deleted since
    // the reply was sent, show "Original message unavailable" instead of
    // the snapshot text.
    const original = chatKey ? (messages[chatKey] || []).find(m => m.id === replyTo.id) : null;
    const originalDeleted = original?.deleted === true;
    return (
      <div style={{
        borderLeft: `3px solid ${fromMe ? "rgba(255,255,255,0.55)" : C.primary30}`,
        paddingLeft: 8, marginBottom: 6, paddingTop: 1, paddingBottom: 1,
        opacity: originalDeleted ? 0.7 : 0.92,
      }}>
        <div style={{
          fontSize: T.fontXs, fontWeight: 700, marginBottom: 1,
          color: fromMe ? "rgba(255,255,255,0.92)" : C.primary,
        }}>{replyTo.fromName}</div>
        <div style={{
          fontSize: 11, lineHeight: 1.35,
          color: fromMe ? "rgba(255,255,255,0.78)" : C.textMid,
          fontStyle: originalDeleted ? "italic" : "normal",
          maxWidth: 260,
          overflow: "hidden", textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          display: "flex", alignItems: "center", gap: 4,
        }}>
          {originalDeleted && <Ban size={10} style={{ flexShrink: 0 }} />}
          {originalDeleted ? "Original message unavailable" : replyTo.text}
        </div>
      </div>
    );
  }

function MessageHoverActions({ chatKey, message, fromMe, isGroupAdmin = false }) {
    const pickerOpen = emojiPickerForMsg === message.id;
    const menuOpen   = msgMenuOpen === message.id;
    const isHovered  = hoveredMsgId === message.id;
    const visible    = pickerOpen || menuOpen || isHovered;

    // Reactions/reply are hidden on tombstones; only own author can edit/delete,
    // and group admins can also remove others' messages.
    if (message.deleted) return null;

    // Read-only mode: archived chats suppress the entire hover toolbar so users
    // can't react, reply, edit, or delete inside an archived conversation.
    // (chatKey is the dmKey for DMs or group.id for groups; both are valid keys
    // into archivedByUser since archives are tracked by chat target id.)
    const archivedTargetId = chatKey && chatKey.startsWith("g-")
      ? chatKey  // group id
      : (chatKey ? chatKey.replace(currentUser.id, "").replace(/^_+|_+$/g, "") : null); // strip self id from dmKey
    if (archivedTargetId && myArchived[archivedTargetId]) return null;

    const canShowMenu = fromMe || isGroupAdmin;

    return (
      <div
        className="msg-hover-actions"
        // Keep listener active even when invisible so re-entering re-fires hover.
        onMouseEnter={() => onMsgEnter(message.id)}
        onMouseLeave={onMsgLeave}
        style={{
          position: "absolute",
          top: -34,
          [fromMe ? "right" : "left"]: 4,
          display: "flex", gap: 1,
          background: C.surface,
          padding: 3,
          borderRadius: 8,
          border: `1px solid ${C.border}`,
          boxShadow: "0 4px 14px rgba(13,31,31,0.10)",
          zIndex: 5,
          whiteSpace: "nowrap",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity 0.12s ease",
        }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); setEmojiPickerForMsg(emojiPickerForMsg === message.id ? null : message.id); }}
          title="React"
          aria-label="Add reaction"
          style={{
            width: 26, height: 26, borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: C.textMid, background: "transparent",
            cursor: "pointer", border: "none",
            transition: "background 0.12s, color 0.12s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.primary; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; }}
        >
          <SmilePlus size={14} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setReplyTarget(chatKey, message); setEmojiPickerForMsg(null); }}
          title="Reply"
          aria-label="Reply to message"
          style={{
            width: 26, height: 26, borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: C.textMid, background: "transparent",
            cursor: "pointer", border: "none",
            transition: "background 0.12s, color 0.12s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.primary; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; }}
        >
          <CornerUpLeft size={14} />
        </button>
        {canShowMenu && (
          <button
            onClick={(e) => { e.stopPropagation(); setMsgMenuOpen(menuOpen ? null : message.id); setEmojiPickerForMsg(null); }}
            title="More"
            aria-label="More options"
            style={{
              width: 26, height: 26, borderRadius: 6,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: menuOpen ? C.primary : C.textMid,
              background: menuOpen ? C.bg : "transparent",
              cursor: "pointer", border: "none",
              transition: "background 0.12s, color 0.12s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.primary; }}
            onMouseLeave={e => { e.currentTarget.style.background = menuOpen ? C.bg : "transparent"; e.currentTarget.style.color = menuOpen ? C.primary : C.textMid; }}
          >
            <MoreVertical size={14} />
          </button>
        )}

        {/* Edit / Delete dropdown — appears below the toolbar */}
        {menuOpen && canShowMenu && (
          <div
            onClick={e => e.stopPropagation()}
            className="fade-up"
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              [fromMe ? "right" : "left"]: 0,
              background: C.surface,
              borderRadius: 9,
              border: `1px solid ${C.border}`,
              boxShadow: "0 8px 22px rgba(13,31,31,0.16)",
              padding: 5, minWidth: 170,
              zIndex: 30,
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            {fromMe && (
              <button
                onClick={() => { startEditMessage(message); }}
                style={{
                  width: "100%", textAlign: "left",
                  padding: "8px 10px", borderRadius: 6,
                  background: "transparent", border: "none",
                  fontSize: 12, color: C.text, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 9,
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.bg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <Edit3 size={13} color={C.textMid} />
                Edit
              </button>
            )}
            {fromMe && (
              <button
                onClick={() => { setMsgMenuOpen(null); requestDeleteMessage(chatKey, message); }}
                style={{
                  width: "100%", textAlign: "left",
                  padding: "8px 10px", borderRadius: 6,
                  background: "transparent", border: "none",
                  fontSize: 12, color: C.danger, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 9,
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.dangerBg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <Trash2 size={13} />
                Delete
              </button>
            )}
            {!fromMe && isGroupAdmin && (
              <button
                onClick={() => { setMsgMenuOpen(null); requestAdminRemoveMessage(chatKey, message); }}
                style={{
                  width: "100%", textAlign: "left",
                  padding: "8px 10px", borderRadius: 6,
                  background: "transparent", border: "none",
                  fontSize: 12, color: C.danger, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 9,
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.dangerBg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <Shield size={13} />
                Remove Message
              </button>
            )}
          </div>
        )}

        {/* Emoji quick-picker — appears just below toolbar so cursor doesn't
            need to traverse a gap. Click outside (handled by global click) closes it. */}
        {pickerOpen && (
          <div
            onClick={e => e.stopPropagation()}
            className="fade-up"
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              [fromMe ? "right" : "left"]: 0,
              background: C.surface, padding: 4,
              borderRadius: T.radFull,
              border: `1px solid ${C.border}`,
              boxShadow: "0 6px 18px rgba(13,31,31,0.18)",
              display: "flex", gap: 1,
              zIndex: 30,
              pointerEvents: "auto",
            }}
          >
            {REACTIONS.map(emoji => (
              <button
                key={emoji}
                onClick={(e) => { e.stopPropagation(); toggleReaction(chatKey, message.id, emoji); }}
                style={{
                  width: 30, height: 30, borderRadius: "50%",
                  fontSize: 16, border: "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "transform 0.12s, background 0.12s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.transform = "scale(1.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
                title={`React with ${emoji}`}
              >{emoji}</button>
            ))}
          </div>
        )}
      </div>
    );
  }

function SharedPostCard({ message, fromMe }) {
    const sp = message.sharedPost;
    const cat = FEED_CATEGORIES[sp.category];
    const author = findUser(sp.authorId);
    return (
      <div
        onClick={() => { setHubFeature("feed"); /* jump to feed */ }}
        className="smooth"
        style={{
          background: C.surface,
          borderRadius: T.radLg,
          border: `1.5px solid ${C.primary30}`,
          padding: 0,
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(4,93,94,0.10)",
          maxWidth: 320,
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.boxShadow = "0 4px 14px rgba(4,93,94,0.18)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = C.primary30; e.currentTarget.style.boxShadow = "0 2px 8px rgba(4,93,94,0.10)"; }}
      >
        {/* Top label */}
        <div style={{
          padding: "6px 12px",
          background: C.primary05,
          borderBottom: `1px solid ${C.border}`,
          fontSize: 9.5, fontWeight: 700, color: C.primary,
          letterSpacing: "0.10em", textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <Newspaper size={10} />
          Shared from News Feed
        </div>
        {/* Body */}
        <div style={{ padding: "10px 12px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 7, marginBottom: 6,
          }}>
            <Avatar contact={author} size={22} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.text, lineHeight: 1.2 }}>
                {sp.authorName}
              </div>
              {cat && (
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 4, marginTop: 1,
                  fontSize: 9.5, fontWeight: 600, color: cat.color,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: cat.color }} />
                  {cat.label}
                </div>
              )}
            </div>
          </div>
          {sp.title && (
            <div style={{
              fontSize: 12.5, fontWeight: 700, color: C.text,
              marginBottom: 4, lineHeight: 1.3,
            }}>{sp.title}</div>
          )}
          {sp.body && (
            <div style={{
              fontSize: 11.5, color: C.textMid, lineHeight: T.lineBody,
              display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>{sp.body}</div>
          )}
          {sp.attachmentPreview && (
            <div style={{
              marginTop: 8,
              padding: "7px 10px",
              borderRadius: 7,
              background: C.bg,
              border: `1px solid ${C.border}`,
              fontSize: T.fontXs, color: C.textSoft,
              display: "flex", alignItems: "center", gap: 7,
            }}>
              <ImageIcon size={11} />
              Attachment
            </div>
          )}
          <div style={{
            marginTop: 8, paddingTop: 7,
            borderTop: `1px solid ${C.border}`,
            fontSize: T.fontXs, color: C.primary, fontWeight: 700,
            display: "flex", alignItems: "center", gap: 4,
          }}>
            Open in News Feed
            <ChevronRight size={10} strokeWidth={3} />
          </div>
        </div>
      </div>
    );
  }

function MessageBubble({ message, contact }) {
    const fromMe = message.from === currentUser.id;
    const isApp = message.type === "application";
    const app = message.application;
    const isShared = message.type === "shared_post";

    // Shared post card — rich preview with author + category + jump-to-feed
    if (isShared && message.sharedPost && !message.deleted) {
      return (
        <div className="fade-up" style={{
          display: "flex", justifyContent: fromMe ? "flex-end" : "flex-start",
          gap: 8, alignItems: "flex-end",
        }}>
          {!fromMe && <Avatar contact={contact} size={28} />}
          <div style={{ maxWidth: "70%" }}>
            <SharedPostCard message={message} fromMe={fromMe} />
          </div>
        </div>
      );
    }

    // Application card message
    if (isApp && app) {
      return (
        <div className="fade-up" style={{
          display: "flex", justifyContent: fromMe ? "flex-end" : "flex-start",
          gap: 8, alignItems: "flex-end",
        }}>
          {!fromMe && <Avatar contact={contact} size={28} />}
          <div
            onClick={() => alert(`Opening application #${app.id}\n\nIn your app this would route to /applications/${app.id}`)}
            className="smooth"
            style={{
              maxWidth: 340, minWidth: 280, cursor: "pointer",
              background: fromMe ? C.primary : C.surface,
              color: fromMe ? "#fff" : C.text,
              padding: "12px 14px",
              borderRadius: fromMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              boxShadow: "0 2px 8px rgba(4,93,94,0.10)",
              border: fromMe ? "none" : `1px solid ${C.border}`,
              transition: "transform 0.14s ease, box-shadow 0.14s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(4,93,94,0.18)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(4,93,94,0.10)"; }}
          >
            {/* Header row */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              fontSize: 11, fontWeight: 700, marginBottom: 9,
              color: fromMe ? "rgba(255,255,255,0.82)" : C.textSoft, letterSpacing: "0.02em",
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <LinkIcon size={11} />
                #{app.id}
              </span>
              <span style={{ fontWeight: 500 }}>{app.date}</span>
            </div>
            {/* Body */}
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{
                width: 36, minWidth: 36, height: 36, borderRadius: 7,
                background: fromMe ? "rgba(255,255,255,0.16)" : app.uniColor,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9.5, fontWeight: 800, color: "#fff", letterSpacing: "0.04em",
                border: fromMe ? "1px solid rgba(255,255,255,0.22)" : "none",
              }}>
                {app.uniCode}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 12.5, fontWeight: 700, lineHeight: 1.35, marginBottom: 2,
                  color: fromMe ? "#fff" : C.text,
                  overflow: "hidden", textOverflow: "ellipsis",
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                }}>
                  {app.course}
                </div>
                <div style={{
                  fontSize: T.fontXs, lineHeight: 1.3,
                  color: fromMe ? "rgba(255,255,255,0.78)" : C.textMid,
                }}>
                  {app.university}
                </div>
              </div>
            </div>
            {/* Footer */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginTop: 11, paddingTop: 9,
              borderTop: `1px solid ${fromMe ? "rgba(255,255,255,0.18)" : C.divider}`,
            }}>
              <span style={{
                fontSize: 11, fontWeight: 600,
                color: fromMe ? "#fff" : C.primary,
                display: "flex", alignItems: "center", gap: 5,
              }}>
                <ExternalLink size={12} />
                Open application
              </span>
              <span style={{
                fontSize: 9.5, fontWeight: 500,
                color: fromMe ? "rgba(255,255,255,0.72)" : C.textSoft,
                display: "flex", alignItems: "center", gap: 3,
              }}>
                {message.time}
                {fromMe && <Check size={11} />}
              </span>
            </div>
          </div>
        </div>
      );
    }

    // Default text message
    const dmKey = threadId(currentUser.id, message.from === currentUser.id ? message.to : message.from);
    return (
      <div style={{
        display: "flex", justifyContent: fromMe ? "flex-end" : "flex-start",
        gap: 8, alignItems: "flex-end",
      }}>
        {!fromMe && <Avatar contact={contact} size={28} />}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "65%", alignItems: fromMe ? "flex-end" : "flex-start" }}>
          <div
            className="msg-hover-wrap"
            onMouseEnter={() => onMsgEnter(message.id)}
            onMouseLeave={onMsgLeave}
            style={{
              background: message.deleted
                ? C.bg
                : (fromMe ? C.primary : C.surface),
              color: message.deleted
                ? C.textSoft
                : (fromMe ? "#fff" : C.text),
              padding: "9px 13px",
              borderRadius: fromMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              fontSize: 12.5, lineHeight: T.lineBody,
              boxShadow: message.deleted ? "none" : "0 1px 3px rgba(4,93,94,0.06)",
              border: message.deleted
                ? `1px dashed ${C.border}`
                : (fromMe ? "none" : `1px solid ${C.border}`),
              fontStyle: message.deleted ? "italic" : "normal",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              position: "relative",
            }}
          >
            <MessageHoverActions chatKey={dmKey} message={message} fromMe={fromMe} />
            {message.deleted ? (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Ban size={12} />
                {message.deletedByAdmin
                  ? `This message was removed by admin${message.deletedByAdminName ? ` (${message.deletedByAdminName})` : ""}.`
                  : "This message was deleted."}
              </div>
            ) : editingMsgId === message.id ? (
              <div onClick={e => e.stopPropagation()}>
                <textarea
                  autoFocus
                  value={editingDraft}
                  onChange={e => setEditingDraft(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Escape") { e.preventDefault(); cancelEditMessage(); }
                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); saveEditMessage(dmKey, message.id); }
                  }}
                  style={{
                    width: "100%", minWidth: 200,
                    padding: "6px 8px", borderRadius: 6,
                    background: "rgba(255,255,255,0.95)", color: C.text,
                    fontSize: 12.5, lineHeight: T.lineBody,
                    border: `1px solid ${fromMe ? "rgba(255,255,255,0.3)" : C.border}`,
                    fontFamily: "inherit", resize: "vertical",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginTop: 6 }}>
                  <button
                    onClick={cancelEditMessage}
                    style={{
                      padding: "4px 9px", borderRadius: 5,
                      background: "transparent",
                      color: fromMe ? "rgba(255,255,255,0.85)" : C.textMid,
                      border: `1px solid ${fromMe ? "rgba(255,255,255,0.4)" : C.border}`,
                      fontSize: T.fontXs, fontWeight: 600, cursor: "pointer",
                    }}
                  >Cancel</button>
                  <button
                    onClick={() => saveEditMessage(dmKey, message.id)}
                    style={{
                      padding: "4px 9px", borderRadius: 5,
                      background: fromMe ? "#fff" : C.primary,
                      color: fromMe ? C.primary : "#fff",
                      border: "none",
                      fontSize: T.fontXs, fontWeight: 700, cursor: "pointer",
                    }}
                  >Save</button>
                </div>
                <div style={{
                  fontSize: 9.5, marginTop: 5,
                  color: fromMe ? "rgba(255,255,255,0.72)" : C.textSoft,
                }}>
                  Enter to save · Esc to cancel
                </div>
              </div>
            ) : (
              <>
                <ReplyQuote replyTo={message.replyTo} fromMe={fromMe} chatKey={dmKey} />
                {message.text}
              </>
            )}
            <div style={{
              fontSize: 9.5, marginTop: 4,
              color: message.deleted
                ? C.textVerySoft
                : (fromMe ? "rgba(255,255,255,0.72)" : C.textSoft),
              textAlign: "right", fontWeight: 500,
              display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 4,
            }}>
              {message.time}
              {message.edited && !message.deleted && (
                <Tooltip label={`Edited ${message.editedAt ? "at " + message.editedAt.slice(11, 16) : "recently"}`}>
                  <span style={{ fontStyle: "italic", opacity: 0.85 }}>· Edited</span>
                </Tooltip>
              )}
              {fromMe && !message.deleted && <Check size={11} />}
            </div>
          </div>
          {!message.deleted && <ReactionsRow message={message} chatKey={dmKey} fromMe={fromMe} />}
        </div>
      </div>
    );
  }

function DropdownItem({ Icon, label, onClick, danger }) {
    return (
      <button
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className="smooth"
        style={{
          width: "100%", padding: "9px 12px",
          display: "flex", alignItems: "center", gap: 10,
          borderRadius: 8, fontSize: 12.5, fontWeight: 500,
          color: danger ? C.danger : C.text, textAlign: "left",
        }}
        onMouseEnter={e => e.currentTarget.style.background = danger ? C.dangerBg : C.primary05}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >
        <Icon size={15} />
        {label}
      </button>
    );
  }

function GroupMembersPanel({ group }) {
    if (!group || !showMembersPanel) return null;

    const isAppGroup = group.type === "application";
    const iAmAdmin = currentUser.type !== "student" && (group.admins || []).includes(currentUser.id);

    // Reset draft if the active group changed (defensive — openMembersPanel seeds it).
    if (draftGroupId !== group.id) {
      setDraftMembers(group.members);
      setDraftAdmins(group.admins || []);
      setDraftGroupId(group.id);
      return null; // re-render after the state settles
    }

    // ─── Compute diff between original and draft ───
    const originalMembers = group.members;
    const originalAdmins = group.admins || [];
    const addedIds   = draftMembers.filter(m => !originalMembers.includes(m));
    const removedIds = originalMembers.filter(m => !draftMembers.includes(m));
    const promotedIds = draftAdmins.filter(a => !originalAdmins.includes(a) && draftMembers.includes(a));
    const demotedIds  = originalAdmins.filter(a => !draftAdmins.includes(a) && draftMembers.includes(a));
    const totalChanges = addedIds.length + removedIds.length + promotedIds.length + demotedIds.length;
    const hasChanges = totalChanges > 0;

    // ─── Context-aware Save button: verb + icon match the dominant action ───
    // Pure scenarios get a specific verb ("Add" / "Remove" / "Confirm"); mixed
    // changes fall back to "Save changes (N)". This makes the interaction feel
    // intentional rather than generic.
    const onlyAdding   = addedIds.length    > 0 && removedIds.length === 0 && promotedIds.length === 0 && demotedIds.length === 0;
    const onlyRemoving = removedIds.length  > 0 && addedIds.length    === 0 && promotedIds.length === 0 && demotedIds.length === 0;
    const onlyAdminChg = (promotedIds.length + demotedIds.length) > 0 && addedIds.length === 0 && removedIds.length === 0;

    let saveLabel = "Save changes";
    let SaveIcon = Check;
    let saveAccent = C.primary;
    let saveAccentHover = "#034647";

    if (hasChanges) {
      if (onlyAdding) {
        const count = addedIds.length;
        saveLabel = count === 1 ? "Add" : `Add ${count}`;
        SaveIcon = UserPlus;
        // Adding stays primary teal — it's a positive growth action.
      } else if (onlyRemoving) {
        const count = removedIds.length;
        saveLabel = count === 1 ? "Remove" : `Remove ${count}`;
        SaveIcon = Trash2;
        // Removing tints toward danger to match the destructive nature.
        saveAccent = C.danger;
        saveAccentHover = "#A92F2F";
      } else if (onlyAdminChg) {
        const count = promotedIds.length + demotedIds.length;
        saveLabel = count === 1 ? "Confirm" : `Confirm ${count}`;
        SaveIcon = Shield;
        // Admin changes — secondary orange (matches the ADMIN pill color).
        saveAccent = C.secondary;
        saveAccentHover = "#D86200";
      } else {
        // Mixed actions — generic save with count
        saveLabel = `Save changes (${totalChanges})`;
        SaveIcon = Check;
      }
    }

    // Last-admin guard: prevent saving a state with zero admins
    const draftHasAdmin = draftAdmins.some(a => draftMembers.includes(a));

    const closeModal = () => {
      setShowMembersPanel(false);
      setMemberMenuOpen(null);
    };

    // ─── Staging actions (no commit) ───
    const stageAddMember = (userId) => {
      if (!draftMembers.includes(userId)) {
        setDraftMembers(prev => [...prev, userId]);
      }
    };
    const stageRemoveMember = (userId) => {
      setDraftMembers(prev => prev.filter(m => m !== userId));
      setDraftAdmins(prev => prev.filter(a => a !== userId));
      setMemberMenuOpen(null);
    };
    const stageMakeAdmin = (userId) => {
      setDraftAdmins(prev => prev.includes(userId) ? prev : [...prev, userId]);
      setMemberMenuOpen(null);
    };
    const stageDemoteAdmin = (userId) => {
      setDraftAdmins(prev => prev.filter(a => a !== userId));
      setMemberMenuOpen(null);
    };

    // ─── Save: apply diff, emit system messages, notify users ───
    const handleSave = () => {
      if (!hasChanges) { closeModal(); return; }
      if (!draftHasAdmin) {
        setMemberToast({ text: "A group must have at least one admin", kind: "error" });
        setTimeout(() => setMemberToast(null), 3000);
        return;
      }

      // Apply the diff to the group
      setGroups(prev => prev.map(g =>
        g.id === group.id
          ? { ...g, members: draftMembers, admins: draftAdmins }
          : g
      ));

      // Emit system messages + notifications for each change
      addedIds.forEach(uid => {
        const u = findUser(uid);
        if (!u) return;
        appendGroupSystemMessage(group.id, `${currentUser.name} added ${u.name}`);
        notifyMemberEvent(uid, currentUser.id, group.id, "added");
      });
      removedIds.forEach(uid => {
        const u = findUser(uid);
        if (!u) return;
        appendGroupSystemMessage(group.id, `${currentUser.name} removed ${u.name}`);
        notifyMemberEvent(uid, currentUser.id, group.id, "removed");
      });
      promotedIds.forEach(uid => {
        const u = findUser(uid);
        if (!u) return;
        appendGroupSystemMessage(group.id, `${u.name} is now an admin`);
        notifyMemberEvent(uid, currentUser.id, group.id, "made_admin");
      });
      demotedIds.forEach(uid => {
        const u = findUser(uid);
        if (!u) return;
        appendGroupSystemMessage(group.id, `${u.name} is no longer an admin`);
        notifyMemberEvent(uid, currentUser.id, group.id, "removed_admin");
      });

      // Toast summarising what just happened
      const summary = [
        addedIds.length    && `${addedIds.length} added`,
        removedIds.length  && `${removedIds.length} removed`,
        promotedIds.length && `${promotedIds.length} promoted`,
        demotedIds.length  && `${demotedIds.length} demoted`,
      ].filter(Boolean).join(" · ");
      setMemberToast({ text: `Saved: ${summary}`, kind: "success" });
      setTimeout(() => setMemberToast(null), 2800);
      closeModal();
    };

    const handleCancel = () => {
      // Discard draft and close — no warning since this is non-destructive
      setDraftMembers(group.members);
      setDraftAdmins(group.admins || []);
      closeModal();
    };

    const handleLeaveConfirm = () => {
      const ok = leaveGroup(group.id);
      setConfirmLeaveGroup(false);
      closeModal();
      if (!ok) {
        setMemberToast({ text: "Promote another member to admin before you leave", kind: "error" });
        setTimeout(() => setMemberToast(null), 3000);
      } else {
        appendGroupSystemMessage(group.id, `${currentUser.name} left the group`);
        setMemberToast({ text: `You left ${group.name}`, kind: "info" });
        setTimeout(() => setMemberToast(null), 2400);
      }
    };

    // Build the visible member list from the DRAFT (so additions/removals show live)
    const visibleMemberIds = draftMembers;
    const visibleMembers = visibleMemberIds.map(id => findUser(id)).filter(Boolean);
    const isLastDraftAdmin = draftAdmins.length === 1 && draftAdmins[0] === currentUser.id && draftMembers.includes(currentUser.id);

    return (
      <>
        {/* Overlay */}
        <div
          onClick={() => { if (!hasChanges) closeModal(); else setMemberMenuOpen(null); }}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(13,31,31,0.45)",
            zIndex: 80,
            animation: "fadeIn 0.18s ease",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20,
          }}
        >
          {/* Modal */}
          <div
            onClick={(e) => { e.stopPropagation(); }}
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
              padding: "16px 20px",
              borderBottom: `1px solid ${C.divider}`,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                background: `linear-gradient(135deg, ${group.color}, ${group.color}cc)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {(() => {
                  const Ico = getGroupIcon(group.iconName);
                  return <Ico size={16} color="#fff" strokeWidth={2.2} />;
                })()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>
                  Manage members · {group.name}
                </div>
                <div style={{ fontSize: 11, color: C.textSoft, marginTop: 1 }}>
                  {visibleMembers.length} {visibleMembers.length === 1 ? "member" : "members"} · {draftAdmins.filter(a => draftMembers.includes(a)).length} admin{draftAdmins.filter(a => draftMembers.includes(a)).length === 1 ? "" : "s"}
                  {hasChanges && <span style={{ color: C.secondary, fontWeight: 700 }}> · {totalChanges} unsaved {totalChanges === 1 ? "change" : "changes"}</span>}
                </div>
              </div>
              <button
                onClick={handleCancel}
                className="iconbtn smooth"
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  color: C.textMid, display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body — either members list (default) OR inline Add Member panel */}
            {!showAddMemberPicker ? (
              <>
            {/* Add member button (admin + non-app group) */}
            {iAmAdmin && !isAppGroup && (
              <div style={{ padding: "12px 16px 0" }}>
                <button
                  onClick={() => setShowAddMemberPicker(true)}
                  className="smooth"
                  style={{
                    width: "100%",
                    padding: "10px 14px", borderRadius: 9,
                    background: C.primary05, color: C.primary,
                    border: `1px dashed ${C.primary30}`,
                    fontSize: 12.5, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.primary10; }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.primary05; }}
                >
                  <UserPlus size={14} />
                  Add member
                </button>
              </div>
            )}

            {/* Closed group notice */}
            {isAppGroup && (
              <div style={{
                margin: "12px 16px 0",
                padding: "10px 12px", borderRadius: 8,
                background: "rgba(13,31,31,0.04)",
                fontSize: 11, color: C.textSoft, lineHeight: 1.5,
                display: "flex", gap: 9,
              }}>
                <Shield size={13} color={C.textMid} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>This is a <strong>closed application group</strong>. Members are locked to the assigned consultant, admission manager, and student.</span>
              </div>
            )}

            {/* Section label */}
            <div style={{
              padding: "16px 20px 8px",
              fontSize: 9.5, fontWeight: 700, color: C.textSoft,
              letterSpacing: "0.06em",
            }}>MEMBERS · {visibleMembers.length}</div>

            {/* Members list (scrolls inside the modal body) */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0 12px 12px" }}>
              {visibleMembers.map(user => {
                const isMemberAdmin = draftAdmins.includes(user.id);
                const wasMemberAdmin = originalAdmins.includes(user.id);
                const isMe = user.id === currentUser.id;
                const isStudent = user.type === "student";
                const isNewlyAdded = !originalMembers.includes(user.id);
                const isPromoted = isMemberAdmin && !wasMemberAdmin;
                const isDemoted = !isMemberAdmin && wasMemberAdmin;
                const showActions = iAmAdmin && !isMe && !isAppGroup && !isStudent;

                return (
                  <div
                    key={user.id}
                    style={{
                      padding: "10px 10px",
                      borderRadius: 9,
                      display: "flex", alignItems: "center", gap: 11,
                      position: "relative",
                      background: isNewlyAdded ? "rgba(34,197,94,0.06)" : "transparent",
                      border: isNewlyAdded ? `1px solid rgba(34,197,94,0.20)` : `1px solid transparent`,
                      marginBottom: 2,
                    }}
                    onMouseEnter={e => { if (!isNewlyAdded) e.currentTarget.style.background = C.bg; }}
                    onMouseLeave={e => { if (!isNewlyAdded) e.currentTarget.style.background = "transparent"; }}
                  >
                    {/* Avatar */}
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%",
                        background: user.color,
                        color: "#fff",
                        fontSize: 12, fontWeight: 700,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>{user.initials}</div>
                      {user.online && !isStudent && (
                        <span style={{
                          position: "absolute", bottom: 0, right: 0,
                          width: 10, height: 10, borderRadius: "50%",
                          background: "#22C55E",
                          border: `2px solid ${C.surface}`,
                        }} />
                      )}
                    </div>

                    {/* Name + role + change badges */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap",
                        fontSize: 12.5, fontWeight: 600, color: C.text,
                      }}>
                        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {user.name}{isMe && <span style={{ color: C.textSoft, fontWeight: 500 }}> (You)</span>}
                        </span>
                        {isMemberAdmin && (
                          <span style={{
                            fontSize: 8.5, fontWeight: 800,
                            padding: "1px 6px", borderRadius: 3,
                            background: C.secondary, color: "#fff",
                            letterSpacing: "0.04em",
                          }}>ADMIN</span>
                        )}
                        {/* Consistent MEMBER chip for non-admin/non-student so role
                            hierarchy reads cleanly across every row (per UX feedback). */}
                        {!isMemberAdmin && !isStudent && (
                          <span style={{
                            fontSize: 8.5, fontWeight: 700,
                            padding: "1px 6px", borderRadius: 3,
                            background: C.bg, color: C.textSoft,
                            border: `1px solid ${C.border}`,
                            letterSpacing: "0.04em",
                          }}>MEMBER</span>
                        )}
                        {isStudent && (
                          <span style={{
                            fontSize: 8.5, fontWeight: 800,
                            padding: "1px 6px", borderRadius: 3,
                            background: C.bg, color: C.textMid,
                            border: `1px solid ${C.border}`,
                            letterSpacing: "0.04em",
                          }}>STUDENT</span>
                        )}
                        {/* Pending-change pills */}
                        {isNewlyAdded && (
                          <span style={{
                            fontSize: 8.5, fontWeight: 800,
                            padding: "1px 6px", borderRadius: 3,
                            background: "#22C55E", color: "#fff",
                            letterSpacing: "0.04em",
                          }}>+ NEW</span>
                        )}
                        {isPromoted && !isNewlyAdded && (
                          <span style={{
                            fontSize: 8.5, fontWeight: 800,
                            padding: "1px 6px", borderRadius: 3,
                            background: "rgba(252,115,0,0.12)", color: C.secondary,
                            letterSpacing: "0.04em",
                            border: `1px solid rgba(252,115,0,0.30)`,
                          }}>↑ PROMOTED</span>
                        )}
                        {isDemoted && (
                          <span style={{
                            fontSize: 8.5, fontWeight: 800,
                            padding: "1px 6px", borderRadius: 3,
                            background: "rgba(148,163,184,0.16)", color: "#64748B",
                            letterSpacing: "0.04em",
                          }}>↓ DEMOTED</span>
                        )}
                      </div>
                      <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>
                        {user.role}
                      </div>
                    </div>

                    {/* Action menu (admin only, not on self) */}
                    {showActions && (
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setMemberMenuOpen(memberMenuOpen === user.id ? null : user.id);
                          }}
                          className="iconbtn smooth"
                          style={{
                            width: 30, height: 30, borderRadius: 7,
                            color: C.textMid,
                            background: memberMenuOpen === user.id ? C.bg : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                          aria-label="Member actions"
                        >
                          <MoreVertical size={14} />
                        </button>
                        {memberMenuOpen === user.id && (
                          <div
                            onClick={e => e.stopPropagation()}
                            className="fade-up"
                            style={{
                              position: "absolute", top: "calc(100% + 4px)", right: 0,
                              minWidth: 200,
                              background: C.surface, borderRadius: 9,
                              border: `1px solid ${C.border}`,
                              boxShadow: "0 8px 24px rgba(13,31,31,0.12)",
                              padding: 4,
                              zIndex: 100,
                            }}
                          >
                            {!isMemberAdmin && (
                              <button
                                onClick={() => stageMakeAdmin(user.id)}
                                className="smooth"
                                style={{
                                  width: "100%", padding: "8px 10px", borderRadius: 6,
                                  background: "transparent", color: C.text,
                                  fontSize: 12, fontWeight: 500,
                                  display: "flex", alignItems: "center", gap: 9,
                                  textAlign: "left", cursor: "pointer",
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = C.bg}
                                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                              >
                                <Shield size={13} color={C.secondary} />
                                <span>Make admin</span>
                              </button>
                            )}
                            {isMemberAdmin && draftAdmins.length > 1 && (
                              <button
                                onClick={() => stageDemoteAdmin(user.id)}
                                className="smooth"
                                style={{
                                  width: "100%", padding: "8px 10px", borderRadius: 6,
                                  background: "transparent", color: C.text,
                                  fontSize: 12, fontWeight: 500,
                                  display: "flex", alignItems: "center", gap: 9,
                                  textAlign: "left", cursor: "pointer",
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = C.bg}
                                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                              >
                                <Shield size={13} color={C.textMid} />
                                <span>Remove admin</span>
                              </button>
                            )}
                            <button
                              onClick={() => stageRemoveMember(user.id)}
                              className="smooth"
                              style={{
                                width: "100%", padding: "8px 10px", borderRadius: 6,
                                background: "transparent", color: C.danger,
                                fontSize: 12, fontWeight: 500,
                                display: "flex", alignItems: "center", gap: 9,
                                textAlign: "left", cursor: "pointer",
                                borderTop: `1px solid ${C.divider}`,
                                marginTop: 2,
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = C.dangerBg}
                              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                            >
                              <Trash2 size={13} />
                              <span>Remove from group</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Show removed members in dimmed strikethrough */}
              {removedIds.length > 0 && (
                <>
                  <div style={{
                    padding: "10px 10px 4px", fontSize: 9.5, fontWeight: 700,
                    color: C.danger, letterSpacing: "0.06em",
                  }}>WILL BE REMOVED · {removedIds.length}</div>
                  {removedIds.map(uid => {
                    const u = findUser(uid);
                    if (!u) return null;
                    return (
                      <div key={uid} style={{
                        padding: "9px 10px", borderRadius: 9,
                        display: "flex", alignItems: "center", gap: 11,
                        background: C.dangerBg,
                        border: `1px solid ${C.danger}33`,
                        marginBottom: 2,
                        opacity: 0.85,
                      }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: "50%",
                          background: u.color, color: "#fff",
                          fontSize: 11, fontWeight: 700,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          opacity: 0.6,
                        }}>{u.initials}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: 12.5, fontWeight: 600, color: C.text,
                            textDecoration: "line-through",
                            textDecorationColor: C.danger,
                          }}>{u.name}</div>
                          <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>{u.role}</div>
                        </div>
                        <button
                          onClick={() => setDraftMembers(prev => [...prev, uid])}
                          className="smooth"
                          style={{
                            padding: "4px 9px", borderRadius: 6,
                            background: "transparent", color: C.text,
                            fontSize: T.fontXs, fontWeight: 700,
                            border: `1px solid ${C.border}`,
                            cursor: "pointer",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = C.bg; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                          title="Undo remove"
                        >Undo</button>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
              </>
            ) : (
              /* ─── Inline Add Member panel ─── Replaces members list when active. */
              <>
                {/* Back to members header */}
                <div style={{
                  padding: "10px 14px",
                  borderBottom: `1px solid ${C.divider}`,
                  display: "flex", alignItems: "center", gap: 10,
                  background: C.bg,
                }}>
                  <button
                    onClick={() => { setShowAddMemberPicker(false); setPickerSearch(""); }}
                    className="smooth"
                    style={{
                      padding: "6px 10px", borderRadius: 7,
                      background: "transparent", color: C.textMid,
                      border: "none", cursor: "pointer",
                      fontSize: 12, fontWeight: 600,
                      display: "inline-flex", alignItems: "center", gap: 5,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.surface; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <ArrowLeft size={13} />
                    Back to members
                  </button>
                  <div style={{ flex: 1 }} />
                  {(() => {
                    const newlyAddedCount = draftMembers.filter(id => !originalMembers.includes(id)).length;
                    return newlyAddedCount > 0 && (
                      <span style={{
                        padding: "3px 10px", borderRadius: T.radFull,
                        background: "rgba(34,197,94,0.10)",
                        color: "#16A34A",
                        fontSize: T.fontXs, fontWeight: 700,
                        display: "inline-flex", alignItems: "center", gap: 4,
                      }}>
                        <Check size={11} strokeWidth={3} />
                        {newlyAddedCount} added
                      </span>
                    );
                  })()}
                </div>

                {/* Sub-header */}
                <div style={{ padding: "16px 20px 10px" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Add members</div>
                  <div style={{ fontSize: 11.5, color: C.textSoft, marginTop: 2 }}>
                    Pick teammates to add to {group.name}. They'll be added when you save.
                  </div>
                </div>

                {/* Search */}
                <div style={{ padding: "0 16px 12px" }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "9px 12px", borderRadius: 9,
                    background: C.bg,
                    border: `1px solid ${C.border}`,
                  }}>
                    <Search size={14} color={C.textSoft} />
                    <input
                      value={pickerSearch || ""}
                      onChange={e => setPickerSearch(e.target.value)}
                      placeholder="Search by name or role…"
                      autoFocus
                      style={{
                        flex: 1, background: "transparent", border: "none",
                        outline: "none", fontSize: 13, color: C.text,
                      }}
                    />
                  </div>
                </div>

                {/* Candidates list */}
                <div style={{ flex: 1, overflowY: "auto", padding: "0 12px 12px" }}>
                  {(() => {
                    const candidates = USERS.filter(u =>
                      u.id !== currentUser.id &&
                      u.type !== "student" &&
                      !draftMembers.includes(u.id) &&
                      (!pickerSearch || pickerSearch.trim() === "" ||
                       u.name.toLowerCase().includes((pickerSearch || "").toLowerCase()) ||
                       u.role.toLowerCase().includes((pickerSearch || "").toLowerCase()))
                    );
                    if (candidates.length === 0) {
                      return (
                        <div style={{
                          padding: "32px 20px", textAlign: "center",
                          fontSize: 12.5, color: C.textSoft,
                        }}>
                          {pickerSearch && pickerSearch.trim()
                            ? `No teammates match "${pickerSearch}"`
                            : "Everyone is already in this group"}
                        </div>
                      );
                    }
                    return candidates.map(user => (
                      <div
                        key={user.id}
                        style={{
                          padding: "10px 12px", borderRadius: 9,
                          display: "flex", alignItems: "center", gap: 11,
                          marginBottom: 2,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = C.bg; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                      >
                        <div style={{ position: "relative", flexShrink: 0 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: "50%",
                            background: user.color, color: "#fff",
                            fontSize: 12, fontWeight: 700,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>{user.initials}</div>
                          {user.online && (
                            <span style={{
                              position: "absolute", bottom: 0, right: 0,
                              width: 10, height: 10, borderRadius: "50%",
                              background: "#22C55E",
                              border: `2px solid ${C.surface}`,
                            }} />
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: T.fontBase, fontWeight: 600, color: C.text }}>{user.name}</div>
                          <div style={{ fontSize: 11, color: C.textSoft, marginTop: 1 }}>{user.role}</div>
                        </div>
                        {/* Add button — proper text label per UX feedback (replaces lone + icon) */}
                        <button
                          onClick={() => stageAddMember(user.id)}
                          className="smooth"
                          style={{
                            padding: "6px 14px", borderRadius: 7,
                            background: C.primary, color: "#fff",
                            border: "none", cursor: "pointer",
                            fontSize: 11.5, fontWeight: 700,
                            display: "inline-flex", alignItems: "center", gap: 5,
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = C.primaryDark; }}
                          onMouseLeave={e => { e.currentTarget.style.background = C.primary; }}
                        >
                          <Plus size={12} strokeWidth={3} />
                          Add
                        </button>
                      </div>
                    ));
                  })()}
                </div>

                {/* Done footer — primary path back to members list */}
                <div style={{
                  padding: "12px 16px",
                  borderTop: `1px solid ${C.divider}`,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: C.bg,
                }}>
                  <span style={{ fontSize: 11, color: C.textSoft }}>
                    Tip — added teammates aren't committed until you press <strong style={{ color: C.text }}>Save changes</strong>.
                  </span>
                  <button
                    onClick={() => { setShowAddMemberPicker(false); setPickerSearch(""); }}
                    className="smooth"
                    style={{
                      padding: "8px 18px", borderRadius: 8,
                      background: C.primary, color: "#fff",
                      border: "none", cursor: "pointer",
                      fontSize: 12, fontWeight: 700,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.primaryDark; }}
                    onMouseLeave={e => { e.currentTarget.style.background = C.primary; }}
                  >Done</button>
                </div>
              </>
            )}
            <div style={{
              padding: "12px 16px",
              borderTop: `1px solid ${C.divider}`,
              background: hasChanges ? "rgba(252,115,0,0.04)" : C.surface,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              {/* Leave group on the left (non-admin path or always-available secondary) */}
              {!isAppGroup && group.members.includes(currentUser.id) && !hasChanges && (
                isLastDraftAdmin ? (
                  <span style={{
                    fontSize: T.fontXs, color: C.textSoft, lineHeight: 1.4,
                    display: "inline-flex", alignItems: "center", gap: 6,
                  }}>
                    <AlertCircle size={11} color={C.secondary} />
                    Promote someone first to leave
                  </span>
                ) : (
                  <button
                    onClick={() => setConfirmLeaveGroup(true)}
                    className="smooth"
                    style={{
                      padding: "8px 12px", borderRadius: 8,
                      background: "transparent", color: C.danger,
                      border: `1px solid ${C.danger}33`,
                      fontSize: 11.5, fontWeight: 700,
                      display: "inline-flex", alignItems: "center", gap: 6,
                      cursor: "pointer",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.dangerBg; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <ArrowLeft size={11} />
                    Leave group
                  </button>
                )
              )}

              {/* Spacer */}
              <div style={{ flex: 1 }} />

              {/* Cancel + Save (right side) */}
              <button
                onClick={handleCancel}
                className="smooth"
                style={{
                  padding: "9px 16px", borderRadius: 8,
                  background: "transparent", color: C.textMid,
                  border: `1px solid ${C.border}`,
                  fontSize: 12, fontWeight: 600,
                  cursor: "pointer",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.bg; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >Cancel</button>
              <button
                onClick={handleSave}
                disabled={!hasChanges || !draftHasAdmin}
                className="smooth"
                style={{
                  padding: "9px 16px", borderRadius: 8,
                  background: hasChanges && draftHasAdmin ? saveAccent : C.primary20,
                  color: "#fff",
                  fontSize: 12, fontWeight: 700,
                  cursor: hasChanges && draftHasAdmin ? "pointer" : "not-allowed",
                  border: "none",
                  opacity: hasChanges && draftHasAdmin ? 1 : 0.7,
                  display: "inline-flex", alignItems: "center", gap: 6,
                  transition: "background 0.18s ease",
                }}
                onMouseEnter={e => { if (hasChanges && draftHasAdmin) e.currentTarget.style.background = saveAccentHover; }}
                onMouseLeave={e => { if (hasChanges && draftHasAdmin) e.currentTarget.style.background = saveAccent; }}
              >
                <SaveIcon size={12} strokeWidth={2.5} />
                {saveLabel}
              </button>
            </div>
          </div>
        </div>

        {/* (Legacy stacked Add Member modal removed — the inline panel
            inside Manage Members now handles this flow.) */}

        {/* Confirm leave group */}
        {confirmLeaveGroup && (
          <ConfirmDialog
            title="Leave this group?"
            body={`You'll stop receiving messages from ${group.name}. You can be re-invited later by an admin.`}
            confirmLabel="Leave group"
            confirmDanger
            onCancel={() => setConfirmLeaveGroup(false)}
            onConfirm={handleLeaveConfirm}
          />
        )}
      </>
    );
  }

function ConfirmDialog({ title, body, confirmLabel = "Confirm", confirmDanger = false, onCancel, onConfirm }) {
    return (
      <div
        onClick={onCancel}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(13,31,31,0.50)",
          zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20,
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
            {title}
          </div>
          <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.55, marginBottom: 18 }}>
            {body}
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button
              onClick={onCancel}
              className="smooth"
              style={{
                padding: "8px 14px", borderRadius: 8,
                background: "transparent", color: C.textMid,
                border: `1px solid ${C.border}`,
                fontSize: 12, fontWeight: 600,
                cursor: "pointer",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.bg; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >Cancel</button>
            <button
              onClick={onConfirm}
              className="smooth"
              style={{
                padding: "8px 14px", borderRadius: 8,
                background: confirmDanger ? C.danger : C.primary,
                color: "#fff",
                fontSize: 12, fontWeight: 700,
                cursor: "pointer",
                border: "none",
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.92"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
            >{confirmLabel}</button>
          </div>
        </div>
      </div>
    );
  }

function GroupChatView() {
    if (!activeGroup) return null;
    const msgs = messages[activeGroup.id] || [];
    const memberUsers = activeGroup.members.map(id => findUser(id)).filter(Boolean);

    return (
      <>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg }}>
        {/* Group header */}
        <div style={{
          background: C.surface, borderBottom: `1px solid ${C.border}`,
          padding: "12px 22px", display: "flex", alignItems: "center", gap: 12,
          minHeight: 64, position: "relative",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "4px 8px", borderRadius: 8,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 11,
              background: `linear-gradient(135deg, ${activeGroup.color}, ${activeGroup.color}cc)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 3px 10px ${activeGroup.color}44`,
            }}>
              {(() => { const Ico = getGroupIcon(activeGroup.iconName); return <Ico size={19} color="#fff" strokeWidth={2.2} />; })()}
            </div>
            <div>
              <div style={{
                fontSize: 14, fontWeight: 700, color: C.text,
                display: "flex", alignItems: "center", gap: 7,
                fontFamily: activeGroup.type === "application" ? "ui-monospace, monospace" : undefined,
              }}>
                {activeGroup.name}
                {activeGroup.isAdmin && activeGroup.type !== "application" && (
                  <span style={{
                    fontSize: 9, fontWeight: 700, color: C.secondary,
                    background: C.sec10, padding: "2px 6px", borderRadius: 5,
                    letterSpacing: "0.04em",
                  }}>YOU&apos;RE ADMIN</span>
                )}
              </div>
              <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>
                {/* App groups always have 3 fixed members — don't show the manage link */}
                {activeGroup.type !== "application" ? (
                  <button
                    onClick={() => openMembersPanel(activeGroup)}
                    className="smooth"
                    style={{
                      color: C.primary, fontWeight: 600,
                      background: "transparent", border: "none",
                      padding: 0, cursor: "pointer",
                      fontSize: T.fontXs,
                      textDecoration: "none",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.textDecoration = "underline"; }}
                    onMouseLeave={e => { e.currentTarget.style.textDecoration = "none"; }}
                    title="View and manage members"
                  >
                    {activeGroup.members.length} members
                  </button>
                ) : (
                  <span style={{ color: C.textSoft }}>
                    {activeGroup.studentName || "Application group"}
                  </span>
                )}
                {activeGroup.description && activeGroup.type !== "application" && <> · {activeGroup.description}</>}
              </div>
            </div>
          </div>

          {/* Member chips, max 5 visible */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 0 }}>
            <div style={{ display: "flex" }}>
              {memberUsers.slice(0, 5).map((u, i) => (
                <div key={u.id} style={{
                  marginLeft: i === 0 ? 0 : -8,
                  border: `2px solid ${C.surface}`,
                  borderRadius: "50%",
                  zIndex: 5 - i,
                }}>
                  <Avatar contact={u} size={28} />
                </div>
              ))}
              {memberUsers.length > 5 && (
                <div style={{
                  marginLeft: -8,
                  width: 28, height: 28, borderRadius: "50%",
                  background: C.bg, color: C.textMid,
                  border: `2px solid ${C.surface}`,
                  fontSize: T.fontXs, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  +{memberUsers.length - 5}
                </div>
              )}
            </div>
          </div>

          <ChatHeaderActionMenu chat={activeGroup} />
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "20px 28px",
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          {/* "Group created by" header — only shown for user-created groups, not system-generated app groups */}
          {activeGroup.type !== "application" && (
            <div style={{ textAlign: "center", margin: "8px 0 16px" }}>
              <span style={{
                fontSize: 11, color: C.textSoft, fontWeight: 600,
                background: C.surface, padding: "4px 12px", borderRadius: T.radFull,
                border: `1px solid ${C.border}`,
              }}>Group · created by {findUser(activeGroup.createdBy)?.name.split(" ")[0]}</span>
            </div>
          )}
          {msgs.map(m => GroupMessageBubble({ message: m }))}
          <div ref={messagesEndRef} />
        </div>

        {/* Enrollment auto-archive banner — shows for app-groups when status is "Enrolled" */}
        {activeGroup.type === "application" && activeGroup.applicationStatus === "Enrolled" && !activeGroup.archived && (() => {
          const enrolled = activeGroup.enrolledAt ? new Date(activeGroup.enrolledAt) : new Date();
          const now = new Date("2026-05-07T12:00:00Z");
          const msSince = now - enrolled;
          const daysSince = Math.max(0, Math.floor(msSince / (1000 * 60 * 60 * 24)));
          const daysLeft = Math.max(0, 7 - daysSince);
          const canManualArchive = activeGroup.admins?.includes(currentUser.id);

          return (
            <div style={{
              padding: "10px 22px",
              background: "rgba(22,163,74,0.06)",
              borderTop: `1px solid rgba(22,163,74,0.20)`,
              display: "flex", alignItems: "center", gap: 12,
              flexShrink: 0,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 7,
                background: "rgba(22,163,74,0.12)", color: "#16A34A",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Archive size={13} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: C.text }}>
                  Student enrolled — group will archive in {daysLeft} {daysLeft === 1 ? "day" : "days"}
                </div>
                <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>
                  Auto-archived {daysSince > 0 ? `${daysSince} day${daysSince === 1 ? "" : "s"} after enrollment` : "after enrollment"} · Conversation will move to your Settings → Archive
                </div>
              </div>
              {canManualArchive && (
                <button
                  onClick={() => archiveAppGroup(activeGroup.id)}
                  className="smooth"
                  style={{
                    padding: "7px 12px", borderRadius: 7,
                    background: "#16A34A", color: "#fff",
                    fontSize: 11, fontWeight: 700,
                    display: "inline-flex", alignItems: "center", gap: 5,
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#138A3E"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#16A34A"; }}
                >
                  <Archive size={11} />
                  Archive now
                </button>
              )}
            </div>
          );
        })()}

        {/* Composer (or read-only banner if archived) */}
        {activeGroup && myArchived[activeGroup.id] ? (
          <div style={{
            background: C.bg, borderTop: `1px solid ${C.border}`,
            padding: "14px 22px",
          }}>
            <div style={{
              padding: "12px 14px", borderRadius: T.radMd,
              background: C.surface, border: `1px dashed ${C.borderStrong}`,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: C.primary05,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Archive size={15} color={C.textMid} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text, marginBottom: 2 }}>
                  This conversation is archived
                </div>
                <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.5 }}>
                  To send messages, please unarchive this chat.
                </div>
              </div>
              <button
                onClick={() => requestUnarchive(activeGroup.id, activeGroup.name)}
                className="smooth"
                style={{
                  padding: "7px 14px", borderRadius: 7,
                  background: C.primary, color: "#fff",
                  fontSize: 11.5, fontWeight: 700,
                  border: "none", cursor: "pointer",
                  flexShrink: 0,
                  display: "flex", alignItems: "center", gap: 6,
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.primaryDark}
                onMouseLeave={e => e.currentTarget.style.background = C.primary}
              >
                <RefreshCcw size={12} />
                Unarchive
              </button>
            </div>
          </div>
        ) : (
        <div style={{
          background: C.surface, borderTop: `1px solid ${C.border}`,
          padding: "14px 22px", position: "relative",
        }}>
          {/* Reply banner — group */}
          {replyingToByChat[activeGroup.id] && (() => {
            const r = replyingToByChat[activeGroup.id];
            return (
              <div className="fade-up" style={{
                marginBottom: 8,
                background: C.primary05,
                borderLeft: `3px solid ${C.primary}`,
                borderRadius: "0 8px 8px 0",
                padding: "8px 12px",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <CornerUpLeft size={13} color={C.primary} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: T.fontXs, fontWeight: 700, color: C.primary }}>
                    Replying to {r.fromName}
                  </div>
                  <div style={{
                    fontSize: 11, color: C.textMid, marginTop: 1,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{r.text}</div>
                </div>
                <button
                  onClick={() => clearReply(activeGroup.id)}
                  className="iconbtn smooth"
                  style={{
                    width: 24, height: 24, borderRadius: 6,
                    color: C.textMid, background: "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                  aria-label="Cancel reply"
                  onMouseEnter={e => { e.currentTarget.style.background = C.bg; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <X size={12} />
                </button>
              </div>
            );
          })()}

          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: C.bg, borderRadius: T.radLg, padding: "8px 12px",
            border: `1px solid ${C.border}`,
          }}>
            <input
              value={draftText}
              onChange={e => setDraftText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder={`Message ${activeGroup.name}…`}
              style={{
                flex: 1, padding: "8px 4px",
                background: "transparent", border: "none",
                fontSize: 13, color: C.text,
              }}
            />
            <Tooltip label="Emoji">
              <button className="iconbtn smooth" style={{ color: C.textMid, padding: 4, borderRadius: 6 }}>
                <Smile size={17} />
              </button>
            </Tooltip>
            <Tooltip label="Attach">
              <button
                onClick={() => setAttachMenu(m => m ? null : "main")}
                className="iconbtn smooth"
                style={{
                  color: attachMenu ? C.primary : C.textMid,
                  background: attachMenu ? C.primary10 : "transparent",
                  padding: 5, borderRadius: 7,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Plus size={18} style={{ transition: "transform 0.18s ease", transform: attachMenu ? "rotate(45deg)" : "rotate(0)" }} />
              </button>
            </Tooltip>
            <button
              onClick={sendMessage}
              disabled={!draftText.trim()}
              className="smooth"
              style={{
                width: 36, height: 36, borderRadius: T.radMd,
                background: draftText.trim() ? C.primary : C.primary20,
                color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: draftText.trim() ? "pointer" : "default",
              }}
            >
              <Send size={15} />
            </button>
          </div>
          <div style={{ position: "absolute", bottom: "100%", right: 22 }}>
            {renderAttachMenu()}
          </div>
        </div>
        )}
      </div>

      {/* Group members side panel + member toast — render outside the main column */}
      {GroupMembersPanel({ group: activeGroup })}

      {memberToast && (
        <div className="fade-up" style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          zIndex: 300,
          background: C.text, color: C.surface,
          padding: "10px 18px", borderRadius: T.radMd,
          fontSize: 12, fontWeight: 600,
          boxShadow: "0 8px 24px rgba(13,31,31,0.30)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          {memberToast.kind === "error" ? (
            <AlertCircle size={14} color="#FB7185" />
          ) : memberToast.kind === "success" ? (
            <CircleCheck size={14} color="#34D399" />
          ) : (
            <Check size={14} color="#34D399" />
          )}
          {memberToast.text}
        </div>
      )}
      </>
    );
  }

function GroupMessageBubble({ message }) {
    const fromMe = message.from === currentUser.id;
    const sender = findUser(message.from);
    const isApp = message.type === "application";
    const isShared = message.type === "shared_post";

    // Shared post card in group
    if (isShared && message.sharedPost && !message.deleted) {
      const fromMe = message.from === currentUser.id;
      return (
        <div className="fade-up" style={{
          display: "flex", justifyContent: fromMe ? "flex-end" : "flex-start",
          gap: 8, alignItems: "flex-end",
        }}>
          {!fromMe && <Avatar contact={sender} size={28} />}
          <div style={{ maxWidth: "70%" }}>
            {!fromMe && (
              <div style={{
                fontSize: T.fontXs, fontWeight: 700, color: sender?.color || C.textMid,
                marginBottom: 2, marginLeft: 6,
              }}>{sender?.name}</div>
            )}
            <SharedPostCard message={message} fromMe={fromMe} />
          </div>
        </div>
      );
    }

    // ─── System message (member added/removed/promoted/demoted) ───
    // Renders as a centered pill, no avatar, no bubble.
    if (message.type === "system") {
      return (
        <div className="fade-up" style={{
          display: "flex", justifyContent: "center",
          margin: "6px 0",
        }}>
          <div style={{
            padding: "5px 12px", borderRadius: T.radFull,
            background: C.bg,
            border: `1px solid ${C.divider}`,
            fontSize: T.fontXs, color: C.textSoft, fontWeight: 500,
            lineHeight: 1.4,
            display: "inline-flex", alignItems: "center", gap: 6,
            maxWidth: "85%",
          }}>
            <Users size={11} color={C.textVerySoft} />
            <span>{message.text}</span>
          </div>
        </div>
      );
    }

    if (isApp && message.application) {
      // Reuse app card with group-aware sender label
      return (
        <div className="fade-up" style={{
          display: "flex", justifyContent: fromMe ? "flex-end" : "flex-start",
          gap: 8, alignItems: "flex-end",
        }}>
          {!fromMe && sender && <Avatar contact={sender} size={28} />}
          <div style={{ display: "flex", flexDirection: "column", maxWidth: "70%" }}>
            {!fromMe && sender && (
              <div style={{
                fontSize: T.fontXs, fontWeight: 600, color: sender.color,
                marginBottom: 3, marginLeft: 6,
              }}>{sender.name}</div>
            )}
            {MessageBubble({ message: { ...message, to: currentUser.id }, contact: sender || currentUser })}
          </div>
        </div>
      );
    }

    return (
      <div style={{
        display: "flex", justifyContent: fromMe ? "flex-end" : "flex-start",
        gap: 8, alignItems: "flex-end",
      }}>
        {!fromMe && sender && <Avatar contact={sender} size={28} />}
        <div style={{
          maxWidth: "65%",
          display: "flex", flexDirection: "column",
          alignItems: fromMe ? "flex-end" : "flex-start",
        }}>
          {!fromMe && sender && (
            <div style={{
              fontSize: T.fontXs, fontWeight: 700, color: sender.color,
              marginBottom: 2, marginLeft: 6,
            }}>{sender.name}</div>
          )}
          <div
            className="msg-hover-wrap"
            onMouseEnter={() => onMsgEnter(message.id)}
            onMouseLeave={onMsgLeave}
            style={{
              background: message.deleted
                ? C.bg
                : (fromMe ? C.primary : C.surface),
              color: message.deleted
                ? C.textSoft
                : (fromMe ? "#fff" : C.text),
              padding: "9px 13px",
              borderRadius: fromMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              fontSize: 12.5, lineHeight: T.lineBody,
              boxShadow: message.deleted ? "none" : "0 1px 3px rgba(4,93,94,0.06)",
              border: message.deleted
                ? `1px dashed ${C.border}`
                : (fromMe ? "none" : `1px solid ${C.border}`),
              fontStyle: message.deleted ? "italic" : "normal",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              position: "relative",
            }}
          >
            <MessageHoverActions chatKey={activeGroup?.id} message={message} fromMe={fromMe} isGroupAdmin={currentUserIsGroupAdmin(activeGroup)} />
            {message.deleted ? (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Ban size={12} />
                {message.deletedByAdmin
                  ? `This message was removed by admin${message.deletedByAdminName ? ` (${message.deletedByAdminName})` : ""}.`
                  : "This message was deleted."}
              </div>
            ) : editingMsgId === message.id ? (
              <div onClick={e => e.stopPropagation()}>
                <textarea
                  autoFocus
                  value={editingDraft}
                  onChange={e => setEditingDraft(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Escape") { e.preventDefault(); cancelEditMessage(); }
                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); saveEditMessage(activeGroup?.id, message.id); }
                  }}
                  style={{
                    width: "100%", minWidth: 200,
                    padding: "6px 8px", borderRadius: 6,
                    background: "rgba(255,255,255,0.95)", color: C.text,
                    fontSize: 12.5, lineHeight: T.lineBody,
                    border: `1px solid ${fromMe ? "rgba(255,255,255,0.3)" : C.border}`,
                    fontFamily: "inherit", resize: "vertical",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginTop: 6 }}>
                  <button
                    onClick={cancelEditMessage}
                    style={{
                      padding: "4px 9px", borderRadius: 5,
                      background: "transparent",
                      color: fromMe ? "rgba(255,255,255,0.85)" : C.textMid,
                      border: `1px solid ${fromMe ? "rgba(255,255,255,0.4)" : C.border}`,
                      fontSize: T.fontXs, fontWeight: 600, cursor: "pointer",
                    }}
                  >Cancel</button>
                  <button
                    onClick={() => saveEditMessage(activeGroup?.id, message.id)}
                    style={{
                      padding: "4px 9px", borderRadius: 5,
                      background: fromMe ? "#fff" : C.primary,
                      color: fromMe ? C.primary : "#fff",
                      border: "none",
                      fontSize: T.fontXs, fontWeight: 700, cursor: "pointer",
                    }}
                  >Save</button>
                </div>
                <div style={{
                  fontSize: 9.5, marginTop: 5,
                  color: fromMe ? "rgba(255,255,255,0.72)" : C.textSoft,
                }}>
                  Enter to save · Esc to cancel
                </div>
              </div>
            ) : (
              <>
                <ReplyQuote replyTo={message.replyTo} fromMe={fromMe} chatKey={activeGroup?.id} />
                {message.text}
              </>
            )}
            <div style={{
              fontSize: 9.5, marginTop: 4,
              color: message.deleted
                ? C.textVerySoft
                : (fromMe ? "rgba(255,255,255,0.72)" : C.textSoft),
              textAlign: "right", fontWeight: 500,
              display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 4,
            }}>
              {message.time}
              {message.edited && !message.deleted && (
                <Tooltip label={`Edited ${message.editedAt ? "at " + message.editedAt.slice(11, 16) : "recently"}`}>
                  <span style={{ fontStyle: "italic", opacity: 0.85 }}>· Edited</span>
                </Tooltip>
              )}
              {fromMe && !message.deleted && <Check size={11} />}
            </div>
          </div>
          {!message.deleted && <ReactionsRow message={message} chatKey={activeGroup?.id} fromMe={fromMe} />}
        </div>
      </div>
    );
  }

function ChatEmptyState() {
    return (
      <div style={{
        flex: 1, background: C.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", padding: 40,
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.primary10}, ${C.sec10})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 18, position: "relative",
        }}>
          <MessagesSquare size={32} color={C.primary} />
          <span style={{
            position: "absolute", top: 4, right: 4,
            width: 14, height: 14, borderRadius: "50%",
            background: C.secondary, border: `3px solid ${C.bg}`,
          }} />
        </div>
        <h3 style={{
          fontFamily: "'Roboto', sans-serif", fontSize: 22, color: C.text,
          fontWeight: 700, marginBottom: 6,
        }}>Start a New Conversation</h3>
        <p style={{ fontSize: 12.5, color: C.textSoft, marginBottom: 18, textAlign: "center", maxWidth: 320 }}>
          Pick a contact from the left, or create a brand new chat to get the conversation rolling.
        </p>
        <button
          onClick={openCompose}
          className="smooth"
          style={{
            padding: "10px 18px", borderRadius: T.radMd,
            background: C.primary, color: "#fff",
            fontSize: 12.5, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 8,
            boxShadow: "0 4px 14px rgba(4,93,94,0.20)",
          }}
          onMouseEnter={e => e.currentTarget.style.background = C.primaryDark}
          onMouseLeave={e => e.currentTarget.style.background = C.primary}
        >
          <Plus size={15} />
          Create a New Chat
        </button>
      </div>
    );
  }

function GroupMeetingFlow() {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.surface }}>
        {GroupStepper()}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {groupStep === "participants" && GroupParticipantSelection()}
          {groupStep === "scheduling"   && GroupSchedulingAssistant()}
          {groupStep === "details"      && GroupMeetingDetails()}
          {groupStep === "confirmation" && GroupConfirmation()}
          {groupStep === "success"      && GroupSuccess()}
        </div>
        {groupStep !== "success" && GroupWizardActionBar()}
      </div>
    );
  }

function GroupWizardActionBar() {
    // Per-step config — what to show + which action to fire
    const totalCount = groupParticipants.length + 1;
    let backLabel = "Back", backAction = null, primaryLabel = "", primaryAction = null;
    let primaryDisabled = true, primaryHelp = "";
    let primaryIcon = ChevronRight;
    let leftSummary = null;

    if (groupStep === "participants") {
      backLabel = "Cancel";
      backAction = () => { setMeetingMode("individual"); groupResetWizard(); };
      primaryLabel = "Next: Find a time";
      primaryAction = groupGoToScheduling;
      primaryDisabled = groupParticipants.length < 2;
      primaryHelp = groupParticipants.length === 0
        ? "Pick at least 2 participants"
        : groupParticipants.length === 1 ? "Add 1 more participant"
        : `${totalCount} participants ready`;
      leftSummary = (
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Users size={14} color={C.textMid} />
          <span style={{ fontSize: 11.5, fontWeight: 600, color: C.text }}>
            {groupParticipants.length} {groupParticipants.length === 1 ? "person" : "people"} selected
          </span>
          <span style={{ fontSize: T.fontXs, color: C.textSoft }}>· {primaryHelp}</span>
        </div>
      );
    }
    else if (groupStep === "scheduling") {
      backAction = groupBackToParticipants;
      primaryLabel = "Next: Details";
      primaryAction = groupGoToDetails;
      primaryDisabled = !groupSelection;
      primaryHelp = groupSelection ? "" : "Pick a time slot to continue";
      const rollup = groupSelection
        ? rollupAvailability([currentUser.id, ...groupParticipants], groupCalendars, groupSelection.startSlot, groupSelection.endSlot)
        : null;
      leftSummary = (
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Clock size={14} color={C.textMid} />
          {groupSelection ? (
            <>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: C.text }}>
                {slotRangeLabel(groupSelection.startSlot, groupSelection.endSlot)}
              </span>
              {rollup && (
                <span style={{
                  fontSize: 9.5, fontWeight: 700,
                  padding: "2px 7px", borderRadius: T.radFull,
                  background: rollup.available.length === totalCount ? C.successBg : "rgba(245,158,11,0.10)",
                  color: rollup.available.length === totalCount ? C.success : C.warning,
                }}>{rollup.available.length}/{totalCount} available</span>
              )}
            </>
          ) : (
            <span style={{ fontSize: 11, color: C.textSoft }}>{primaryHelp}</span>
          )}
        </div>
      );
    }
    else if (groupStep === "details") {
      backAction = groupBackToScheduling;
      primaryLabel = "Continue to confirm";
      primaryAction = groupGoToConfirmation;
      primaryDisabled = !groupDetails.title.trim();
      primaryHelp = groupDetails.title.trim() ? "" : "Add a meeting title to continue";
      leftSummary = (
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <FileText size={14} color={C.textMid} />
          <span style={{ fontSize: 11.5, fontWeight: 600, color: C.text }}>
            {groupDetails.title.trim() || "Untitled meeting"}
          </span>
          {primaryHelp && (
            <span style={{ fontSize: T.fontXs, color: C.textSoft }}>· {primaryHelp}</span>
          )}
        </div>
      );
    }
    else if (groupStep === "confirmation") {
      backAction = () => setGroupStep("details");
      backLabel = "Edit details";
      primaryLabel = "Schedule Meeting";
      primaryAction = groupScheduleMeeting;
      primaryDisabled = false;
      primaryIcon = CalendarDays;
      leftSummary = (
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <CircleCheck size={14} color={C.success} />
          <span style={{ fontSize: 11.5, fontWeight: 600, color: C.text }}>
            Ready to send {totalCount - 1} {totalCount - 1 === 1 ? "invitation" : "invitations"}
          </span>
        </div>
      );
    }

    const PrimaryIcon = primaryIcon;

    return (
      <div style={{
        padding: "12px 22px",
        borderTop: `1px solid ${C.divider}`,
        background: C.surface,
        display: "flex", alignItems: "center", gap: 12, flexShrink: 0,
      }}>
        {/* Back / Cancel */}
        <button
          onClick={backAction}
          className="smooth"
          style={{
            padding: "9px 14px", borderRadius: 8,
            background: "transparent", color: C.textMid,
            border: `1px solid ${C.border}`,
            fontSize: 12, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 5,
          }}
          onMouseEnter={e => e.currentTarget.style.background = C.bg}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          {backLabel === "Cancel" ? <X size={12} strokeWidth={2.5} /> : <ChevronLeft size={13} />}
          {backLabel}
        </button>

        {/* Center summary */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 0 }}>
          {leftSummary}
        </div>

        {/* Primary */}
        <button
          onClick={primaryAction}
          disabled={primaryDisabled}
          className="smooth"
          style={{
            padding: "9px 16px", borderRadius: 8,
            background: primaryDisabled ? C.primary20 : C.primary,
            color: "#fff", fontSize: 12, fontWeight: 700,
            cursor: primaryDisabled ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}
          onMouseEnter={e => { if (!primaryDisabled) e.currentTarget.style.background = C.primaryDark; }}
          onMouseLeave={e => { if (!primaryDisabled) e.currentTarget.style.background = C.primary; }}
        >
          <PrimaryIcon size={13} />
          {primaryLabel}
        </button>
      </div>
    );
  }

function GroupStepper() {
    if (groupStep === "success") return null;
    const stages = [
      { id: "participants", label: "Participants" },
      { id: "scheduling",   label: "Find a time" },
      { id: "details",      label: "Details" },
      { id: "confirmation", label: "Confirm" },
    ];
    const currentIdx = stages.findIndex(s => s.id === groupStep);
    return (
      <div style={{
        padding: "12px 26px",
        background: C.surface,
        borderBottom: `1px solid ${C.divider}`,
        display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
      }}>
        {stages.map((s, i) => {
          const done = i < currentIdx;
          const active = i === currentIdx;
          return (
            <Fragment key={s.id}>
              <button
                onClick={() => done && setGroupStep(s.id)}
                className="smooth"
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "5px 10px", borderRadius: 7,
                  cursor: done ? "pointer" : "default",
                  background: active ? C.primary10 : "transparent",
                  border: "none",
                }}
                onMouseEnter={e => { if (done) e.currentTarget.style.background = C.bg; }}
                onMouseLeave={e => { if (done) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: active ? C.primary : (done ? C.primary : C.bg),
                  color: active || done ? "#fff" : C.textSoft,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9.5, fontWeight: 700,
                  border: !active && !done ? `1px solid ${C.borderStrong}` : "none",
                  flexShrink: 0,
                }}>
                  {done ? <Check size={10} strokeWidth={3} /> : (i + 1)}
                </span>
                <span style={{
                  fontSize: 11.5, fontWeight: active ? 700 : 600,
                  color: active ? C.primary : (done ? C.text : C.textSoft),
                  whiteSpace: "nowrap",
                }}>{s.label}</span>
              </button>
              {i < stages.length - 1 && (
                <ChevronRight size={11} color={C.textVerySoft} style={{ flexShrink: 0 }} />
              )}
            </Fragment>
          );
        })}

        <div style={{ flex: 1 }} />

        <button
          onClick={() => { setMeetingMode("individual"); groupResetWizard(); }}
          className="smooth"
          style={{
            padding: "5px 11px", borderRadius: 7,
            fontSize: 11, fontWeight: 600, color: C.textSoft,
            background: "transparent", border: `1px solid ${C.border}`,
            display: "flex", alignItems: "center", gap: 5,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSoft; }}
        >
          <X size={11} strokeWidth={2.5} />
          Cancel
        </button>
      </div>
    );
  }

function GroupParticipantSelection() {
    const q = groupParticipantSearch.trim().toLowerCase();
    const studentAllowedIds = ["u-tousif", "u-nur", "u-raj", "u-jennifer"];
    const candidates = USERS
      .filter(u => u.id !== currentUser.id)
      .filter(u => currentUser.type === "student" ? studentAllowedIds.includes(u.id) : u.type !== "student")
      .filter(u => !q || u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q));

    const grouped = ROLE_GROUPS.map(rg => ({
      ...rg,
      users: candidates.filter(u => u.type === rg.filterType).sort((a, b) => a.level - b.level),
    })).filter(g => g.users.length > 0);

    return (
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* LEFT — searchable list */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          borderRight: `1px solid ${C.divider}`, overflow: "hidden",
        }}>
          <div style={{ padding: "16px 22px 10px" }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: C.textMid, letterSpacing: "0.04em",
            }}>STEP 1</div>
            <h3 style={{
              fontFamily: "'Roboto', sans-serif", fontSize: 18, fontWeight: 700,
              color: C.text, marginTop: 2,
            }}>
              Add participants
            </h3>
            <div style={{ position: "relative", marginTop: 12 }}>
              <Search size={14} color={C.textSoft} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
              <input
                value={groupParticipantSearch}
                onChange={e => setGroupParticipantSearch(e.target.value)}
                placeholder="Search by name, role or department"
                style={{
                  width: "100%", padding: "9px 12px 9px 32px",
                  borderRadius: 8, border: `1px solid ${C.border}`,
                  background: C.bg, fontSize: 12, color: C.text,
                }}
              />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "0 14px 14px" }}>
            {grouped.map(rg => (
              <div key={rg.id} style={{ marginBottom: 6 }}>
                <div style={{
                  margin: "8px 6px 4px",
                  padding: "5px 10px", borderRadius: 6,
                  background: rg.accentBg, border: `1px solid ${rg.accentBorder}`,
                  fontSize: 9.5, fontWeight: 700, color: rg.accent,
                  letterSpacing: "0.08em",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <rg.Icon size={11} />
                  {rg.label}
                  <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 700 }}>
                    {rg.users.length}
                  </span>
                </div>
                {rg.users.map(u => {
                  const picked = groupParticipants.includes(u.id);
                  return (
                    <button
                      key={u.id}
                      onClick={() => toggleGroupParticipant(u.id)}
                      className="smooth"
                      style={{
                        width: "100%", padding: "8px 10px", borderRadius: 8,
                        display: "flex", alignItems: "center", gap: 10,
                        background: picked ? C.primary05 : "transparent",
                        textAlign: "left",
                        border: picked ? `1px solid ${C.primary30}` : "1px solid transparent",
                      }}
                      onMouseEnter={e => { if (!picked) e.currentTarget.style.background = C.bg; }}
                      onMouseLeave={e => { if (!picked) e.currentTarget.style.background = "transparent"; }}
                    >
                      <Avatar contact={u} size={30} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{u.name}</div>
                        <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>{u.role}</div>
                      </div>
                      <div style={{
                        width: 17, height: 17, borderRadius: 5,
                        border: `1.5px solid ${picked ? C.primary : C.borderStrong}`,
                        background: picked ? C.primary : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        {picked && <Check size={10} color="#fff" strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
            {grouped.length === 0 && (
              <div style={{ padding: "32px 12px", textAlign: "center", color: C.textSoft, fontSize: 12 }}>
                No users match "{groupParticipantSearch}".
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — selected sidebar (fixed 280px to match other side panels) */}
        <div style={{
          width: 300, display: "flex", flexDirection: "column",
          background: C.surface, overflow: "hidden",
        }}>
          <div style={{ padding: "16px 20px 10px", borderBottom: `1px solid ${C.divider}` }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.textMid, letterSpacing: "0.06em" }}>
                SELECTED
              </div>
              <div style={{
                fontSize: 13, fontWeight: 700, color: C.primary,
              }}>
                {groupParticipants.length}
                <span style={{ fontSize: T.fontXs, fontWeight: 500, color: C.textSoft, marginLeft: 4 }}>
                  / {USERS.length - 1}
                </span>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "10px 14px" }}>
            {groupParticipants.length === 0 ? (
              <div style={{
                padding: "32px 16px", textAlign: "center",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: C.bg, border: `1px dashed ${C.borderStrong}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Users size={18} color={C.textVerySoft} />
                </div>
                <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.5 }}>
                  Tick a name on the left to add them.
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {groupParticipants.map(id => {
                  const u = findUser(id);
                  if (!u) return null;
                  return (
                    <div key={id} style={{
                      display: "flex", alignItems: "center", gap: 9,
                      padding: "6px 9px", borderRadius: 7,
                      background: C.bg, border: `1px solid ${C.border}`,
                    }}>
                      <Avatar contact={u} size={26} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11.5, fontWeight: 600, color: C.text }}>{u.name}</div>
                        <div style={{ fontSize: 9.5, color: C.textSoft }}>{u.role}</div>
                      </div>
                      <button
                        onClick={() => toggleGroupParticipant(id)}
                        className="iconbtn smooth"
                        style={{
                          width: 20, height: 20, borderRadius: 5,
                          color: C.textSoft, background: "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = C.dangerBg; e.currentTarget.style.color = C.danger; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSoft; }}
                      >
                        <X size={11} strokeWidth={2.5} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

function GroupSchedulingAssistant() {
    const allParticipants = [currentUser.id, ...groupParticipants];
    const durationSlots = Math.max(1, Math.round(groupDuration / 30));
    const suggestions = suggestTimeSlots(allParticipants, groupCalendars, durationSlots, 4);
    const rollup = groupSelection
      ? rollupAvailability(allParticipants, groupCalendars, groupSelection.startSlot, groupSelection.endSlot)
      : null;
    const conflictCount = rollup ? (rollup.busy.length + rollup.tentative.length + rollup.ooh.length) : 0;
    const totalCount = allParticipants.length;
    const bestSuggestion = suggestions[0];
    const noCommonOverlap = bestSuggestion && bestSuggestion.available === 0;
    const allFreeSuggestion = suggestions.find(s => s.available === totalCount);

    return (
      <div
        style={{ flex: 1, display: "flex", overflow: "hidden" }}
        onMouseUp={groupEndDrag}
        onMouseLeave={groupEndDrag}
      >
        {/* LEFT SIDEBAR — participants + summary */}
        <div style={{
          width: 280, display: "flex", flexDirection: "column",
          borderRight: `1px solid ${C.divider}`, background: C.surface, overflow: "hidden",
        }}>
          <div style={{ padding: "14px 18px 12px", borderBottom: `1px solid ${C.divider}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.textMid, letterSpacing: "0.04em" }}>
              STEP 2
            </div>
            <h3 style={{
              fontFamily: "'Roboto', sans-serif", fontSize: 18, fontWeight: 700,
              color: C.text, marginTop: 2,
            }}>
              Find a time
            </h3>
            <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 4 }}>
              {totalCount} participants
            </div>

            {/* Live availability pill */}
            {rollup && (
              <div className="fade-up" style={{
                marginTop: 12, padding: "9px 11px", borderRadius: 8,
                background: rollup.available.length === totalCount ? C.successBg
                          : rollup.available.length >= totalCount * 0.7 ? C.primary05
                          : C.dangerBg,
                border: `1px solid ${rollup.available.length === totalCount ? "rgba(16,185,129,0.20)"
                                  : rollup.available.length >= totalCount * 0.7 ? C.primary30
                                  : "rgba(239,68,68,0.18)"}`,
              }}>
                <div style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.06em",
                  color: rollup.available.length === totalCount ? C.success
                       : rollup.available.length >= totalCount * 0.7 ? C.primary
                       : C.danger,
                }}>SELECTED TIME</div>
                <div style={{
                  fontSize: 13, fontWeight: 700, color: C.text, marginTop: 2,
                }}>
                  {rollup.available.length} / {totalCount} available
                </div>
                <div style={{ fontSize: T.fontXs, color: C.textMid, marginTop: 1 }}>
                  {slotRangeLabel(groupSelection.startSlot, groupSelection.endSlot)}
                </div>
              </div>
            )}
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
            <div style={{
              padding: "4px 10px 6px", fontSize: 9.5, fontWeight: 700,
              color: C.textSoft, letterSpacing: "0.08em",
            }}>ATTENDEES</div>
            {allParticipants.map(id => {
              const u = findUser(id);
              if (!u) return null;
              const isMe = id === currentUser.id;
              let status = null;
              if (groupSelection) {
                const cal = groupCalendars[id];
                let hasBusy = false, hasOoh = false, hasTentative = false;
                for (let s = groupSelection.startSlot; s <= groupSelection.endSlot; s++) {
                  if (cal[s].status === "busy") hasBusy = true;
                  else if (cal[s].status === "ooh") hasOoh = true;
                  else if (cal[s].status === "tentative") hasTentative = true;
                }
                status = hasBusy ? "busy" : hasOoh ? "ooh" : hasTentative ? "tentative" : "available";
              }
              const dot = status === "available" ? C.success
                        : status === "tentative" ? C.warning
                        : status === "busy"      ? C.danger
                        : status === "ooh"       ? "#9CA3AF"
                        : "transparent";

              return (
                <div key={id} className="smooth" style={{
                  display: "flex", alignItems: "center", gap: 9,
                  padding: "6px 10px", borderRadius: 7,
                  background: "transparent",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = C.bg}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{ position: "relative" }}>
                    <Avatar contact={u} size={26} />
                    {status && (
                      <span style={{
                        position: "absolute", bottom: -1, right: -1,
                        width: 10, height: 10, borderRadius: "50%",
                        background: dot, border: `2px solid ${C.surface}`,
                      }} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 11.5, fontWeight: 600, color: C.text,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {u.name}{isMe && <span style={{ color: C.textSoft, fontWeight: 500 }}> (you)</span>}
                    </div>
                    <div style={{ fontSize: 9.5, color: C.textSoft }}>{u.role}</div>
                  </div>
                  {!isMe && (
                    <button
                      onClick={() => removeGroupParticipant(id)}
                      className="iconbtn smooth"
                      style={{
                        width: 18, height: 18, borderRadius: 4,
                        color: C.textSoft, background: "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = C.dangerBg; e.currentTarget.style.color = C.danger; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSoft; }}
                    >
                      <X size={10} strokeWidth={2.5} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* MAIN — toolbar + suggestions + grid + conflict */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.surface }}>
          {/* Top toolbar — date label + duration + legend */}
          <div style={{
            padding: "12px 22px", borderBottom: `1px solid ${C.divider}`,
            display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
            background: C.surface,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <CalendarDays size={14} color={C.primary} />
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, color: C.textSoft, letterSpacing: "0.06em" }}>
                  LOOKING AT
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text, marginTop: -1 }}>
                  {new Date(calYear, calMonth, selectedDate).toLocaleDateString(undefined, {
                    weekday: "short", month: "short", day: "numeric"
                  })}
                </div>
              </div>
            </div>

            <div style={{ width: 1, height: 26, background: C.divider }} />

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: C.textSoft, letterSpacing: "0.06em" }}>
                DURATION
              </span>
              <div style={{
                display: "inline-flex", padding: 2, borderRadius: 8,
                background: C.bg, border: `1px solid ${C.border}`,
              }}>
                {[30, 60, 90, 120].map(d => {
                  const active = groupDuration === d;
                  return (
                    <button
                      key={d}
                      onClick={() => setGroupDuration(d)}
                      className="smooth"
                      style={{
                        padding: "4px 10px", borderRadius: 6,
                        fontSize: 11, fontWeight: 600,
                        background: active ? C.surface : "transparent",
                        color: active ? C.primary : C.textMid,
                        boxShadow: active ? "0 1px 2px rgba(13,31,31,0.06)" : "none",
                        border: active ? `1px solid ${C.border}` : "1px solid transparent",
                      }}
                    >
                      {d < 60 ? `${d}m` : `${d / 60}h${d % 60 ? ` ${d % 60}m` : ""}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color legend */}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12, fontSize: T.fontXs, color: C.textMid }}>
              {LegendDot({ color: C.success, label: "Available" })}
              {LegendDot({ color: C.warning, label: "Tentative" })}
              {LegendDot({ color: C.danger,  label: "Busy" })}
              {LegendDot({ color: "#9CA3AF", label: "Out of hours" })}
            </div>
          </div>

          {/* Suggestion strip */}
          {suggestions.length > 0 && (
            <div style={{
              padding: "11px 22px",
              borderBottom: `1px solid ${C.divider}`,
              background: C.bg,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
                <Sparkles size={12} color={C.secondary} />
                <span style={{ fontSize: 9.5, fontWeight: 700, color: C.textMid, letterSpacing: "0.06em" }}>
                  SUGGESTED TIMES
                </span>
                {allFreeSuggestion && (
                  <span style={{
                    fontSize: 9, fontWeight: 700, color: C.success,
                    background: C.successBg, padding: "1px 7px", borderRadius: T.radFull,
                    display: "flex", alignItems: "center", gap: 3,
                  }}>
                    <CircleCheck size={9} /> Best slot found
                  </span>
                )}
                {noCommonOverlap && (
                  <span style={{
                    fontSize: 9, fontWeight: 700, color: C.danger,
                    background: C.dangerBg, padding: "1px 7px", borderRadius: T.radFull,
                  }}>
                    No fully-free window today
                  </span>
                )}
              </div>
              <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
                {suggestions.map((s, i) => {
                  const isActive = groupSelection &&
                    groupSelection.startSlot === s.startSlot &&
                    groupSelection.endSlot === s.endSlot;
                  const fullyFree = s.available === totalCount;
                  return (
                    <button
                      key={i}
                      onClick={() => groupApplySuggestion(s)}
                      className="smooth"
                      style={{
                        padding: "9px 12px", borderRadius: 9,
                        background: isActive ? C.primary : C.surface,
                        color: isActive ? "#fff" : C.text,
                        border: `1px solid ${isActive ? C.primary : (fullyFree ? "rgba(16,185,129,0.30)" : C.border)}`,
                        textAlign: "left", flexShrink: 0,
                        boxShadow: isActive ? "0 2px 6px rgba(4,93,94,0.18)" : "0 1px 2px rgba(13,31,31,0.04)",
                        minWidth: 158,
                      }}
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.borderColor = C.primary30; }}
                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.borderColor = fullyFree ? "rgba(16,185,129,0.30)" : C.border; }}
                    >
                      <div style={{
                        fontSize: 9, fontWeight: 700,
                        color: isActive ? "rgba(255,255,255,0.7)" : (fullyFree ? C.success : C.textSoft),
                        letterSpacing: "0.06em",
                        display: "flex", alignItems: "center", gap: 4,
                      }}>
                        {fullyFree && <CircleCheck size={10} />}
                        {fullyFree ? "ALL FREE" : `${s.available}/${totalCount} FREE`}
                      </div>
                      <div style={{ fontSize: 12.5, fontWeight: 700, marginTop: 2 }}>
                        {slotRangeLabel(s.startSlot, s.endSlot)}
                      </div>
                      {!fullyFree && (s.tentative > 0 || s.busy > 0) && (
                        <div style={{
                          fontSize: 9, fontWeight: 500,
                          color: isActive ? "rgba(255,255,255,0.75)" : C.textMid,
                          marginTop: 1, display: "flex", gap: 6,
                        }}>
                          {s.tentative > 0 && <span>{s.tentative} tentative</span>}
                          {s.busy > 0 && <span>{s.busy} busy</span>}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Availability grid */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
            {GroupAvailabilityGrid({ allParticipants })}
          </div>

          {/* Conflict panel */}
          {rollup && conflictCount > 0 && GroupConflictPanel({ rollup, conflictCount, totalCount })}
        </div>
      </div>
    );
  }

function GroupAvailabilityGrid({ allParticipants }) {
    const COL_WIDTH = 56;
    const TIME_COL_WIDTH = 72;
    const ROW_HEIGHT = 28;

    const slotIsSelected = (s) => groupSelection &&
      s >= groupSelection.startSlot && s <= groupSelection.endSlot;

    return (
      <div style={{ flex: 1, overflow: "auto", padding: "0 0 12px", position: "relative" }}>
        <div style={{
          display: "inline-flex", flexDirection: "column",
          minWidth: "100%", userSelect: "none",
        }}>
          {/* Sticky participant header row */}
          <div style={{
            display: "flex", position: "sticky", top: 0, zIndex: 5,
            background: C.surface, borderBottom: `1px solid ${C.borderStrong}`,
          }}>
            {/* Top-left corner cell */}
            <div style={{
              width: TIME_COL_WIDTH, flexShrink: 0,
              background: C.surface, borderRight: `1px solid ${C.divider}`,
              position: "sticky", left: 0, zIndex: 6,
            }} />
            {allParticipants.map(id => {
              const u = findUser(id);
              if (!u) return null;
              return (
                <div
                  key={id}
                  style={{
                    width: COL_WIDTH, flexShrink: 0,
                    padding: "10px 4px 8px",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", gap: 4,
                    borderRight: `1px solid ${C.divider}`,
                    background: id === currentUser.id ? C.primary05 : "transparent",
                  }}
                >
                  <Avatar contact={u} size={26} />
                  <div style={{
                    fontSize: 9, fontWeight: 600, color: C.textMid,
                    textAlign: "center", lineHeight: 1.2,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    width: COL_WIDTH - 8,
                  }}>
                    {u.name.split(" ")[0]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Body rows */}
          {Array.from({ length: GRID_SLOTS }).map((_, slot) => {
            const isHourMark = slot % 2 === 0;
            const selected = slotIsSelected(slot);
            return (
              <div key={slot} style={{ display: "flex", height: ROW_HEIGHT }}>
                {/* Sticky time cell */}
                <div
                  onMouseDown={() => groupBeginDrag(slot)}
                  onMouseEnter={() => groupExtendDrag(slot)}
                  style={{
                    width: TIME_COL_WIDTH, flexShrink: 0,
                    position: "sticky", left: 0, zIndex: 4,
                    background: selected ? C.primary10 : C.bg,
                    borderRight: `1px solid ${C.divider}`,
                    borderTop: isHourMark ? `1px solid ${C.borderStrong}` : `1px dashed ${C.divider}`,
                    display: "flex", alignItems: "center", paddingLeft: 12,
                    fontSize: T.fontXs, fontWeight: isHourMark ? 700 : 500,
                    color: selected ? C.primary : (isHourMark ? C.text : C.textSoft),
                    cursor: "ns-resize",
                  }}
                >
                  {isHourMark && slotLabel(slot)}
                </div>
                {/* Participant cells */}
                {allParticipants.map(id => {
                  const cal = groupCalendars[id];
                  const cell = cal[slot];
                  const cellStyle = cellStyleFor(cell.status, selected);
                  return (
                    <div
                      key={id + ":" + slot}
                      onMouseDown={(e) => { e.preventDefault(); groupBeginDrag(slot); }}
                      onMouseEnter={() => { groupExtendDrag(slot); setGroupHoverCell({ userId: id, slot }); }}
                      onMouseLeave={() => setGroupHoverCell(null)}
                      style={{
                        width: COL_WIDTH, flexShrink: 0,
                        borderRight: `1px solid ${C.divider}`,
                        borderTop: isHourMark ? `1px solid ${C.borderStrong}` : `1px dashed ${C.divider}`,
                        background: cellStyle.bg,
                        position: "relative",
                        cursor: "pointer",
                        boxShadow: cellStyle.shadow,
                        backgroundImage: cell.status === "ooh"
                          ? "repeating-linear-gradient(45deg, transparent 0 4px, rgba(0,0,0,0.04) 4px 8px)"
                          : "none",
                      }}
                    >
                      {/* Tooltip on hover (only the hovered cell) */}
                      {groupHoverCell &&
                        groupHoverCell.userId === id &&
                        groupHoverCell.slot === slot && (
                        <div style={{
                          position: "absolute", left: "calc(100% + 6px)", top: -4,
                          zIndex: 10,
                          background: C.text, color: C.surface,
                          fontSize: T.fontXs, fontWeight: 500,
                          padding: "5px 9px", borderRadius: 6,
                          whiteSpace: "nowrap",
                          boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
                          pointerEvents: "none",
                        }}>
                          <strong style={{ fontWeight: 700 }}>{findUser(id).name.split(" ")[0]}</strong>
                          {" · "}
                          {cell.status === "available" && "Available"}
                          {cell.status === "tentative" && `Tentative${cell.reason ? ` (${cell.reason})` : ""}`}
                          {cell.status === "busy"      && `Busy${cell.reason ? ` (${cell.reason})` : ""}`}
                          {cell.status === "ooh"       && "Outside working hours"}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Selection overlay — drawn after rows for cleaner visual */}
          {groupSelection && (
            <div style={{
              position: "absolute",
              left: 0, right: 0,
              top: ROW_HEIGHT + (groupSelection.startSlot * ROW_HEIGHT) + (groupSelection.startSlot >= 0 ? 0 : 0),
              height: (groupSelection.endSlot - groupSelection.startSlot + 1) * ROW_HEIGHT,
              border: `2px solid ${C.primary}`,
              borderRadius: 4,
              pointerEvents: "none",
              boxShadow: "0 0 0 4px rgba(4,93,94,0.10)",
              zIndex: 3,
            }} />
          )}
        </div>
      </div>
    );
  }

function GroupConflictPanel({ rollup, conflictCount, totalCount }) {
    return (
      <div className="fade-up" style={{
        borderTop: `1px solid ${C.divider}`,
        background: C.surface,
        padding: "12px 26px",
        display: "flex", flexDirection: "column", gap: 10,
        maxHeight: groupConflictExpanded ? 240 : 60,
        overflow: "hidden",
        transition: "max-height 0.22s ease",
      }}>
        <div
          onClick={() => setGroupConflictExpanded(s => !s)}
          style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
        >
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: C.dangerBg, color: C.danger,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <AlertCircle size={14} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text }}>
              {conflictCount} {conflictCount === 1 ? "person has" : "people have"} a conflict
            </div>
            <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>
              {rollup.busy.length} busy · {rollup.tentative.length} tentative · {rollup.ooh.length} outside hours
            </div>
          </div>
          <ChevronDown
            size={15}
            color={C.textMid}
            style={{
              transition: "transform 0.18s ease",
              transform: groupConflictExpanded ? "rotate(180deg)" : "rotate(0)",
            }}
          />
        </div>

        {groupConflictExpanded && (
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 6,
            overflowY: "auto", paddingRight: 4,
          }}>
            {[...rollup.busy.map(c => ({ ...c, k: "busy" })),
              ...rollup.tentative.map(c => ({ ...c, k: "tentative" })),
              ...rollup.ooh.map(c => ({ ...c, k: "ooh" }))]
              .map(c => {
                const u = findUser(c.id);
                if (!u) return null;
                const meta = c.k === "busy" ? { color: C.danger,  bg: C.dangerBg,  label: c.reason || "Busy" }
                          : c.k === "tentative" ? { color: C.warning, bg: "rgba(245,158,11,0.10)", label: c.reason || "Tentative" }
                          : { color: "#6B7280", bg: "rgba(156,163,175,0.16)", label: "Outside working hours" };
                return (
                  <div key={c.id + ":" + c.k} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "6px 10px", borderRadius: 7,
                  }}>
                    <Avatar contact={u} size={24} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11.5, fontWeight: 600, color: C.text }}>{u.name}</div>
                      <div style={{ fontSize: 9.5, color: meta.color }}>{meta.label}</div>
                    </div>
                    <span style={{
                      fontSize: 9, fontWeight: 700,
                      padding: "2px 7px", borderRadius: T.radFull,
                      background: meta.bg, color: meta.color,
                      letterSpacing: "0.04em", textTransform: "uppercase",
                    }}>{c.k === "ooh" ? "OOH" : c.k}</span>
                  </div>
                );
              })}
          </div>
        )}

        {/* Always-visible action buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setGroupSelection(null)}
            className="smooth"
            style={{
              padding: "7px 13px", borderRadius: 8,
              background: "transparent", color: C.textMid,
              border: `1px solid ${C.border}`,
              fontSize: 11, fontWeight: 600,
            }}
            onMouseEnter={e => e.currentTarget.style.background = C.bg}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            Pick another time
          </button>
          <button
            onClick={groupGoToDetails}
            className="smooth"
            style={{
              padding: "7px 13px", borderRadius: 8,
              background: C.secondary, color: "#fff",
              fontSize: 11, fontWeight: 700,
              display: "flex", alignItems: "center", gap: 5,
              boxShadow: "0 2px 8px rgba(252,115,0,0.25)",
            }}
          >
            Proceed anyway
            <ArrowRight size={11} />
          </button>
        </div>
      </div>
    );
  }

function GroupMeetingDetails() {
    const totalCount = groupParticipants.length + 1;
    return (
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div style={{ flex: 1, padding: "20px 28px", overflowY: "auto" }}>
          <div style={{ maxWidth: 540 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.textMid, letterSpacing: "0.04em" }}>
              STEP 3
            </div>
            <h3 style={{
              fontFamily: "'Roboto', sans-serif", fontSize: 18, fontWeight: 700,
              color: C.text, marginTop: 2,
            }}>
              Meeting details
            </h3>
            <p style={{ fontSize: 11.5, color: C.textSoft, marginTop: 3 }}>
              Add a title and any context. Participants will receive a calendar invite.
            </p>

            {/* Title */}
            <div style={{ marginTop: 18 }}>
              <label style={{ fontSize: T.fontXs, fontWeight: 700, color: C.textMid, letterSpacing: "0.04em" }}>
                MEETING TITLE *
              </label>
              <input
                autoFocus
                value={groupDetails.title}
                onChange={e => setGroupDetails(p => ({ ...p, title: e.target.value }))}
                placeholder="e.g. Q2 Planning Sync"
                style={{
                  width: "100%", marginTop: 5, padding: "10px 12px",
                  borderRadius: 8, border: `1px solid ${C.border}`,
                  background: C.bg, fontSize: 13, color: C.text, fontWeight: 500,
                }}
              />
            </div>

            {/* Description */}
            <div style={{ marginTop: 14 }}>
              <label style={{ fontSize: T.fontXs, fontWeight: 700, color: C.textMid, letterSpacing: "0.04em" }}>
                AGENDA / DESCRIPTION
              </label>
              <textarea
                value={groupDetails.description}
                onChange={e => setGroupDetails(p => ({ ...p, description: e.target.value }))}
                placeholder="What will you cover? (optional)"
                rows={4}
                style={{
                  width: "100%", marginTop: 5, padding: "10px 12px",
                  borderRadius: 8, border: `1px solid ${C.border}`,
                  background: C.bg, fontSize: 12, color: C.text, resize: "vertical",
                  fontFamily: "'Roboto', sans-serif",
                }}
              />
            </div>

            {/* Two-column row: timezone + location */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
              <div>
                <label style={{ fontSize: T.fontXs, fontWeight: 700, color: C.textMid, letterSpacing: "0.04em" }}>
                  TIMEZONE
                </label>
                <div style={{
                  marginTop: 5, padding: "0 12px",
                  borderRadius: 8, border: `1px solid ${C.border}`,
                  background: C.bg,
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <Globe size={13} color={C.primary} />
                  <select
                    value={groupDetails.timezone}
                    onChange={e => setGroupDetails(p => ({ ...p, timezone: e.target.value }))}
                    style={{
                      flex: 1, padding: "9px 0", border: "none", background: "transparent",
                      fontSize: 12, color: C.text, fontFamily: "'Roboto', sans-serif",
                      outline: "none", cursor: "pointer",
                    }}
                  >
                    <option>Europe/London (GMT+1)</option>
                    <option>Asia/Dhaka (GMT+6)</option>
                    <option>Asia/Dubai (GMT+4)</option>
                    <option>America/New York (GMT-4)</option>
                    <option>Asia/Singapore (GMT+8)</option>
                  </select>
                  <ChevronDown size={12} color={C.textSoft} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: T.fontXs, fontWeight: 700, color: C.textMid, letterSpacing: "0.04em" }}>
                  LOCATION / LINK
                </label>
                <div style={{
                  marginTop: 5, padding: "0 12px",
                  borderRadius: 8, border: `1px solid ${C.border}`,
                  background: C.bg,
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <Video size={13} color={C.primary} />
                  <input
                    value={groupDetails.location}
                    onChange={e => setGroupDetails(p => ({ ...p, location: e.target.value }))}
                    placeholder="Online — auto-generated"
                    style={{
                      flex: 1, padding: "9px 0",
                      border: "none", background: "transparent",
                      fontSize: 12, color: C.text,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right summary sidebar — matches scheduling sidebar width */}
        <div style={{
          width: 280, padding: "16px 18px",
          borderLeft: `1px solid ${C.divider}`,
          background: C.bg,
        }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: C.textSoft, letterSpacing: "0.08em" }}>
            SCHEDULED FOR
          </div>
          <div style={{
            fontSize: 14, fontWeight: 700, color: C.text, marginTop: 3,
          }}>
            {groupSelection && slotRangeLabel(groupSelection.startSlot, groupSelection.endSlot)}
          </div>
          <div style={{ fontSize: 11, color: C.textMid, marginTop: 2 }}>
            {new Date(calYear, calMonth, selectedDate).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
            {" · "}{groupDuration} min
          </div>

          <div style={{
            marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.divider}`,
          }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: C.textSoft, letterSpacing: "0.08em" }}>
              {totalCount} ATTENDEES
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
              {[currentUser.id, ...groupParticipants].slice(0, 8).map(id => {
                const u = findUser(id);
                return u ? <Avatar key={id} contact={u} size={26} /> : null;
              })}
              {totalCount > 8 && (
                <div style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: C.surface, border: `1px solid ${C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: T.fontXs, fontWeight: 700, color: C.textMid,
                }}>+{totalCount - 8}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

function GroupConfirmation() {
    const allIds = [currentUser.id, ...groupParticipants];
    const rollup = groupSelection
      ? rollupAvailability(allIds, groupCalendars, groupSelection.startSlot, groupSelection.endSlot)
      : null;

    return (
      <div style={{ flex: 1, overflow: "auto", padding: "24px 28px", background: C.bg }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textMid, letterSpacing: "0.04em", marginBottom: 12 }}>
            STEP 4 — CONFIRM
          </div>

          <div style={{
            background: C.surface, borderRadius: T.radLg, overflow: "hidden",
            border: `1px solid ${C.border}`,
          }}>
            {/* Banner */}
            <div style={{
              padding: "16px 20px",
              background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryLight} 100%)`,
              color: "#fff",
            }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, opacity: 0.85, letterSpacing: "0.08em" }}>
                READY TO SCHEDULE
              </div>
              <div style={{
                fontFamily: "'Roboto', sans-serif", fontSize: 19, fontWeight: 700, marginTop: 2,
              }}>
                {groupDetails.title || "Untitled meeting"}
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
              {groupDetails.description && (
                <div style={{
                  padding: "10px 12px", borderRadius: 8,
                  background: C.bg, border: `1px solid ${C.border}`,
                  fontSize: 11.5, color: C.textMid, lineHeight: 1.55,
                }}>
                  {groupDetails.description}
                </div>
              )}
              <DetailRow Icon={CalendarDays} label="Date">
                {new Date(calYear, calMonth, selectedDate).toLocaleDateString(undefined, {
                  weekday: "long", month: "long", day: "numeric", year: "numeric"
                })}
              </DetailRow>
              <DetailRow Icon={Clock} label="Time">
                {groupSelection && slotRangeLabel(groupSelection.startSlot, groupSelection.endSlot)}
                <span style={{ color: C.textSoft, fontWeight: 500, marginLeft: 6 }}>· {groupDuration} min</span>
              </DetailRow>
              <DetailRow Icon={Globe} label="Timezone">{groupDetails.timezone}</DetailRow>
              <DetailRow Icon={Video} label="Location">{groupDetails.location}</DetailRow>
              <DetailRow Icon={Users} label="Attendees">
                <span>{allIds.length} people</span>
                {rollup && (
                  <span style={{
                    fontSize: 9, fontWeight: 700,
                    padding: "2px 7px", borderRadius: T.radFull, marginLeft: 8,
                    background: rollup.available.length === allIds.length ? C.successBg : "rgba(245,158,11,0.10)",
                    color: rollup.available.length === allIds.length ? C.success : C.warning,
                  }}>{rollup.available.length}/{allIds.length} available</span>
                )}
              </DetailRow>

              {/* Avatar chip strip */}
              <div style={{
                marginTop: 4, padding: 10, borderRadius: 8,
                background: C.bg, border: `1px solid ${C.border}`,
                display: "flex", flexWrap: "wrap", gap: 6,
              }}>
                {allIds.map(id => {
                  const u = findUser(id);
                  if (!u) return null;
                  return (
                    <div key={id} style={{
                      display: "flex", alignItems: "center", gap: 7,
                      padding: "4px 10px 4px 4px", borderRadius: T.radFull,
                      background: C.surface, border: `1px solid ${C.border}`,
                    }}>
                      <Avatar contact={u} size={20} />
                      <span style={{ fontSize: T.fontXs, fontWeight: 600, color: C.text }}>
                        {u.name}{id === currentUser.id && <span style={{ color: C.textSoft, fontWeight: 500 }}> (you)</span>}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

function GroupSuccess() {
    const m = groupScheduledMeeting;
    if (!m) return null;
    return (
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        background: C.bg, padding: 24,
      }}>
        <div className="cpop" style={{
          background: C.surface, borderRadius: T.radLg,
          width: 460, maxWidth: "92vw",
          border: `1px solid ${C.border}`,
          display: "flex", flexDirection: "column", overflow: "hidden",
          position: "relative",
        }}>
          {/* Decorative gradient banner — matches booking confirm modal */}
          <div style={{
            height: 96, position: "relative",
            background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryLight} 60%, ${C.success} 100%)`,
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -36, right: -36,
              width: 140, height: 140, borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.18)",
            }} />
            <div style={{
              position: "absolute", top: 8, right: 8,
              width: 78, height: 78, borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.12)",
            }} />
            {/* Big success ring + check */}
            <div style={{
              position: "absolute", left: "50%", bottom: -36,
              transform: "translateX(-50%)",
              width: 76, height: 76, borderRadius: "50%",
              background: C.surface,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 6px 20px rgba(0,0,0,0.10)",
              border: `4px solid ${C.surface}`,
            }}>
              <div style={{
                width: 58, height: 58, borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.success}, #34d399)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 5px 14px rgba(16,185,129,0.42)`,
              }}>
                <Check size={30} color="#fff" strokeWidth={3.5} />
              </div>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "52px 24px 18px", textAlign: "center" }}>
            <h3 style={{
              fontFamily: "'Roboto', sans-serif", fontSize: 22, fontWeight: 700,
              color: C.text, letterSpacing: "-0.01em",
            }}>
              Meeting scheduled
            </h3>
            <p style={{ fontSize: 12, color: C.textMid, marginTop: 5 }}>
              Invitations sent to <strong>{m.attendees.length - 1}</strong> {m.attendees.length - 1 === 1 ? "attendee" : "attendees"}. They'll respond from their notifications.
            </p>

            {/* Meeting card */}
            <div style={{
              marginTop: 18, padding: "12px 14px",
              borderRadius: T.radMd, background: C.bg, border: `1px solid ${C.border}`,
              textAlign: "left",
            }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: C.textSoft, letterSpacing: "0.06em" }}>
                {new Date(calYear, calMonth, selectedDate).toLocaleDateString(undefined, {
                  weekday: "long", month: "long", day: "numeric"
                }).toUpperCase()}
              </div>
              <div style={{
                fontFamily: "'Roboto', sans-serif", fontSize: T.fontMd, fontWeight: 700, color: C.text, marginTop: 1,
              }}>
                {m.title}
              </div>
              <div style={{ fontSize: 11, color: C.textMid, marginTop: 2 }}>
                {m.start.trim()} – {m.end.trim()} · {m.timezone}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{
            padding: "0 24px 20px",
            display: "flex", gap: 8,
          }}>
            <button
              onClick={groupResetWizard}
              className="smooth"
              style={{
                flex: 1, padding: "10px 14px", borderRadius: T.radMd,
                background: "transparent", color: C.textMid,
                border: `1px solid ${C.border}`,
                fontSize: 12, fontWeight: 600,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMid; }}
            >
              Schedule another
            </button>
            <button
              onClick={groupViewMeeting}
              className="smooth"
              style={{
                flex: 1.3, padding: "10px 14px", borderRadius: T.radMd,
                background: C.primary, color: "#fff",
                fontSize: 12, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.primaryDark}
              onMouseLeave={e => e.currentTarget.style.background = C.primary}
            >
              <CalendarDays size={13} />
              View in Schedule
            </button>
          </div>
        </div>
      </div>
    );
  }

function cellStyleFor(status, selected) {
    const base = {
      available: { bg: "rgba(16,185,129,0.10)", solid: "rgba(16,185,129,0.18)" },
      tentative: { bg: "rgba(245,158,11,0.12)", solid: "rgba(245,158,11,0.22)" },
      busy:      { bg: "rgba(239,68,68,0.12)",  solid: "rgba(239,68,68,0.22)" },
      ooh:       { bg: "rgba(156,163,175,0.10)", solid: "rgba(156,163,175,0.18)" },
    }[status] || { bg: "transparent", solid: "transparent" };
    return {
      bg: selected ? base.solid : base.bg,
      shadow: selected ? "inset 0 0 0 1.5px rgba(4,93,94,0.45)" : "none",
    };
  }

function LegendDot({ color, label }) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
        <span style={{
          width: 9, height: 9, borderRadius: 2, background: color,
        }} />
        <span style={{ fontSize: 9.5, fontWeight: 600 }}>{label}</span>
      </span>
    );
  }

function ComposeView() {
    const q = composeQuery.trim().toLowerCase();
    const matches = q
      ? decoratedContacts.filter(c => c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q)).slice(0, 6)
      : [];

    const existingMessages = composeSelected ? (messages[threadId(currentUser.id, composeSelected.id)] || []) : [];
    const hasRecipient = !!composeSelected;
    const canSend = hasRecipient && draftText.trim().length > 0;

    return (
      <div className="fade-up" style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, minHeight: 0 }}>
        {/* "To:" Header */}
        <div style={{
          background: C.surface, borderBottom: `1px solid ${C.border}`,
          padding: "12px 22px", minHeight: 64,
          display: "flex", alignItems: "center", gap: 14,
          position: "relative", flexShrink: 0,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10, flex: 1,
            padding: "6px 4px",
          }}>
            <span style={{
              fontSize: 12, fontWeight: 700, color: C.textMid,
              letterSpacing: "0.04em", flexShrink: 0,
            }}>
              To:
            </span>

            {composeSelected ? (
              /* Selected recipient as chip */
              <div className="pop" style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "4px 6px 4px 4px", borderRadius: T.radFull,
                background: C.primary10,
                border: `1px solid ${C.primary30}`,
              }}>
                <Avatar contact={composeSelected} size={24} />
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: C.text }}>
                    {composeSelected.name}
                  </span>
                  <span style={{ fontSize: 9, color: C.primary, fontWeight: 600 }}>
                    {composeSelected.role}
                  </span>
                </div>
                <button
                  onClick={clearComposePick}
                  className="iconbtn smooth"
                  style={{
                    width: 20, height: 20, borderRadius: T.radFull,
                    color: C.textMid, marginLeft: 2,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <X size={11} />
                </button>
              </div>
            ) : (
              <input
                autoFocus
                value={composeQuery}
                onChange={e => { setComposeQuery(e.target.value); setComposeDropdown(true); }}
                onFocus={() => setComposeDropdown(true)}
                placeholder="Enter email or name"
                style={{
                  flex: 1, padding: "8px 0",
                  background: "transparent", border: "none",
                  fontSize: 13.5, color: C.text, fontWeight: 500,
                }}
              />
            )}
          </div>

          {hasRecipient && (
            <span style={{
              fontSize: T.fontXs, color: C.success, fontWeight: 700,
              padding: "3px 9px", borderRadius: T.radFull,
              background: C.successBg, display: "flex", alignItems: "center", gap: 5,
            }}>
              <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: C.success }} />
              Recipient found
            </span>
          )}

          <button
            onClick={closeCompose}
            className="iconbtn smooth"
            style={{
              width: 32, height: 32, borderRadius: 8,
              color: C.textMid,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            title="Cancel"
          >
            <X size={16} />
          </button>

          {/* Search dropdown */}
          {!composeSelected && composeDropdown && composeQuery.trim() && (
            <div className="pop" style={{
              position: "absolute", top: "calc(100% - 1px)", left: 22, right: 22,
              background: C.surface,
              borderRadius: "0 0 14px 14px",
              boxShadow: C.shadowMd, border: `1px solid ${C.border}`,
              borderTop: "none", maxHeight: 320, overflowY: "auto",
              zIndex: 30,
            }}>
              {matches.length > 0 ? (
                matches.map((c, i) => {
                  const hasHistory = (messages[threadId(currentUser.id, c.id)] || []).length > 0;
                  return (
                    <button
                      key={c.id}
                      onClick={() => pickComposeContact(c)}
                      className="smooth"
                      style={{
                        width: "100%", padding: "11px 18px",
                        display: "flex", alignItems: "center", gap: 12,
                        background: "transparent", textAlign: "left",
                        borderBottom: i < matches.length - 1 ? `1px solid ${C.divider}` : "none",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = C.primary05}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <Avatar contact={c} size={34} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: C.text }}>
                          {c.name}
                        </div>
                        <div style={{ fontSize: T.fontXs, color: C.textSoft, marginTop: 1 }}>
                          <span style={{ color: C.primary, fontWeight: 600 }}>{c.role}</span>
                          {hasHistory && <> · <span style={{ color: C.secondary, fontWeight: 600 }}>Existing chat</span></>}
                        </div>
                      </div>
                      <ChevronRight size={14} color={C.textSoft} />
                    </button>
                  );
                })
              ) : (
                <div style={{
                  padding: "22px 16px", textAlign: "center",
                  color: C.textSoft, fontSize: 12,
                }}>
                  No contacts match "{composeQuery}".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "20px 28px",
          display: "flex", flexDirection: "column", gap: 8, minHeight: 0,
        }}>
          {!composeSelected && (
            <div style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: 10, opacity: 0.7,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: C.primary05, border: `1px dashed ${C.borderStrong}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Search size={26} color={C.textVerySoft} />
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: C.textMid, marginTop: 6 }}>
                Find someone to start a conversation
              </div>
              <div style={{ fontSize: 11.5, color: C.textSoft, textAlign: "center", maxWidth: 280 }}>
                Type a name or email above. Once a recipient is found, you can send your first message.
              </div>
            </div>
          )}

          {composeSelected && existingMessages.length > 0 && (
            <>
              <div style={{ textAlign: "center", margin: "8px 0 16px" }}>
                <span style={{
                  fontSize: T.fontXs, color: C.textSoft, fontWeight: 600,
                  background: C.surface, padding: "4px 12px", borderRadius: T.radFull,
                  border: `1px solid ${C.border}`, letterSpacing: "0.04em",
                }}>PREVIOUS CONVERSATION</span>
              </div>
              {existingMessages.map(m => (
                <MessageBubble key={m.id} message={m} contact={composeSelected} />
              ))}
            </>
          )}

          {composeSelected && existingMessages.length === 0 && (
            <div style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: 8,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.primary10}, ${C.sec10})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 4,
              }}>
                <MessagesSquare size={26} color={C.primary} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>
                Say hi to {composeSelected.name.split(" ")[0]}
              </div>
              <div style={{ fontSize: 11.5, color: C.textSoft }}>
                This is the start of your conversation.
              </div>
            </div>
          )}
        </div>

        {/* Composer */}
        <div style={{
          background: C.surface, borderTop: `1px solid ${C.border}`,
          padding: "14px 22px", flexShrink: 0, position: "relative",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: C.bg, borderRadius: T.radLg, padding: "8px 12px",
            border: `1px solid ${hasRecipient ? C.border : C.divider}`,
            opacity: hasRecipient ? 1 : 0.7,
            transition: "opacity 0.18s ease",
          }}>
            <input
              value={draftText}
              onChange={e => setDraftText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendComposed()}
              disabled={!hasRecipient}
              placeholder={hasRecipient ? "Type your first message..." : "Find a recipient to start typing"}
              style={{
                flex: 1, padding: "8px 4px",
                background: "transparent", border: "none",
                fontSize: 13, color: C.text,
                cursor: hasRecipient ? "text" : "not-allowed",
              }}
            />
            <button
              disabled={!hasRecipient}
              className="iconbtn smooth"
              style={{
                color: hasRecipient ? C.textMid : C.textVerySoft,
                padding: 4, borderRadius: 6,
                cursor: hasRecipient ? "pointer" : "not-allowed",
              }}
            >
              <Smile size={17} />
            </button>
            <Tooltip label="Attach">
              <button
                onClick={() => hasRecipient && setAttachMenu(m => m ? null : "main")}
                disabled={!hasRecipient}
                className="iconbtn smooth"
                style={{
                  color: hasRecipient ? (attachMenu ? C.primary : C.textMid) : C.textVerySoft,
                  background: attachMenu && hasRecipient ? C.primary10 : "transparent",
                  padding: 5, borderRadius: 7,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: hasRecipient ? "pointer" : "not-allowed",
                }}
              >
                <Plus size={18} style={{ transition: "transform 0.18s ease", transform: (attachMenu && hasRecipient) ? "rotate(45deg)" : "rotate(0)" }} />
              </button>
            </Tooltip>
            <button
              onClick={sendComposed}
              disabled={!canSend}
              className="smooth"
              style={{
                width: 36, height: 36, borderRadius: T.radMd,
                background: canSend
                  ? `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`
                  : (hasRecipient ? C.primary30 : C.borderStrong),
                color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: canSend ? "pointer" : "not-allowed",
                boxShadow: canSend ? "0 4px 12px rgba(4,93,94,0.22)" : "none",
                transition: "all 0.18s ease",
              }}
              title={!hasRecipient ? "Find a recipient first" : (!draftText.trim() ? "Type a message" : "Send")}
            >
              <Send size={15} />
            </button>
          </div>
          {!hasRecipient && (
            <div style={{
              fontSize: T.fontXs, color: C.textSoft, marginTop: 8,
              display: "flex", alignItems: "center", gap: 6, paddingLeft: 4,
            }}>
              <AlertCircle size={11} />
              Send is disabled until a recipient is selected.
            </div>
          )}
          {/* Attach popover anchored to the right side of the composer */}
          <div style={{ position: "absolute", bottom: "100%", right: 22 }}>
            {renderAttachMenu()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {ChatListPanel()}
      {composingNew ? ComposeView() : ChatViewArea()}
    </>
  );
}
