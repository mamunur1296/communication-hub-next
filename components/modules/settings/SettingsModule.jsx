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

export default function SettingsModule({ ctx }) {
  const {
    C,
    COLORS,
    DEPTS,
    DrawerOverlay,
    FIELD_TYPES,
    Section,
    T,
    TEMPLATE_PLACEHOLDERS,
    TEMPLATE_SAMPLE,
    TEMPLATE_TYPES,
    TOPICS,
    TPLCOLORS,
    _,
    a,
    accent,
    accentColor,
    active,
    addCustomDept,
    addCustomTopic,
    addFieldToDraft,
    addingTopicTo,
    alertCard,
    allDepts,
    allPlaceholders,
    allSamples,
    allTopics,
    allTplTypes,
    apps,
    b,
    btnSm,
    c,
    cat,
    catId,
    close,
    code,
    codeBg,
    codeBlock,
    codeColor,
    codeTd,
    commTemplates,
    contentPrefs,
    count,
    ct,
    customDepts,
    customTopics,
    customTplTypes,
    d,
    darkMode,
    data,
    deleteCat,
    deleteEntry,
    deleteItem,
    desc,
    e,
    editingTplType,
    entries,
    entry,
    entryId,
    ev,
    events,
    ex,
    expandedCat,
    f,
    fType,
    field,
    fieldStyle,
    fields,
    filled,
    ft,
    h,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    handleDrop,
    i,
    idx,
    inputType,
    isAdding,
    isCustom,
    isDragOver,
    isDragging,
    isExpanded,
    isMute,
    it,
    item,
    itemId,
    items,
    k,
    key,
    kind,
    kpis,
    l,
    label,
    labelStyle,
    lbl,
    list,
    logs,
    m,
    maxP,
    mode,
    moved,
    msg,
    name,
    newField,
    newFieldDraft,
    newTopicInput,
    newTplDraft,
    newType,
    num,
    onClick,
    openAddCat,
    openAddItem,
    openEditCat,
    openEditItem,
    p,
    paraStyle,
    pillActive,
    pillFailed,
    pillPaused,
    pillSuccess,
    placeholders,
    prev,
    promoCategories,
    promoDraft,
    promoDragIdx,
    promoDragOverIdx,
    promoDrawer,
    promoExpandedCat,
    promoTab,
    r,
    removeFieldFromDraft,
    reordered,
    resolvePlaceholders,
    retryQueue,
    s,
    sample,
    saveCustomTemplate,
    saveDrawer,
    saveNewEntry,
    secStyle,
    seeMoreLabels,
    settingsSubItem,
    setAddingTopicTo,
    setContentPrefs,
    setCustomDepts,
    setCustomTopics,
    setCustomTplTypes,
    setEditingTplType,
    setExpandedCat,
    setNewFieldDraft,
    setNewTopicInput,
    setNewTplDraft,
    setPromoCategories,
    setPromoDraft,
    setPromoDragIdx,
    setPromoDragOverIdx,
    setPromoDrawer,
    setPromoExpandedCat,
    setPromoTab,
    setShowCreateTpl,
    setTplAddingTo,
    setTplEntries,
    setTplNewEntry,
    setWhDrawer,
    setWhSearch,
    setWhTab,
    setWhToast,
    showCreateTpl,
    showToast,
    sorted,
    step,
    subField,
    summary,
    t,
    tabs,
    targetField,
    tblHd,
    tblTd,
    tdStyle,
    templates,
    text,
    thStyle,
    title,
    titleField,
    toggleCatActive,
    toggleList,
    tp,
    tpl,
    tplAddingTo,
    tplEntries,
    tplNewEntry,
    tpls,
    tt,
    typeId,
    typeInfo,
    updatePref,
    v,
    w,
    webhooks,
    whDrawer,
    whSearch,
    whTab,
    whToast,
    when
  } = ctx;

  const renderTeamManagement = ctx.renderTeamManagement;

function WebhooksPage() {
    // State is lifted to the main component (whTab, whDrawer, whToast, whSearch)
    // to avoid React hooks violation — this function is conditionally called.
    const showToast = (msg) => { setWhToast(msg); setTimeout(() => setWhToast(null), 3000); };

    // ── Mock data ──
    const apps = [
      { id: "app-crm", name: "CRM", slug: "crm", desc: "Customer relationship management", cat: "Internal", url: "https://api.uapp.uk/crm", color: "#045D5E", status: "active", webhooks: 4, lastSync: "2 min ago" },
      { id: "app-leads", name: "Leads", slug: "leads", desc: "Lead management & pipeline", cat: "Internal", url: "https://api.uapp.uk/leads", color: "#FC7300", status: "active", webhooks: 3, lastSync: "5 min ago" },
      { id: "app-comms", name: "Communication Hub", slug: "comms", desc: "Internal messaging & news feed", cat: "Internal", url: "https://api.uapp.uk/comms", color: "#2563EB", status: "active", webhooks: 2, lastSync: "1 min ago" },
      { id: "app-web", name: "Website", slug: "website", desc: "Public-facing website & forms", cat: "External", url: "https://www.uapp.uk/api", color: "#7C3AED", status: "active", webhooks: 1, lastSync: "12 min ago" },
      { id: "app-chat", name: "Chatuapp", slug: "chatuapp", desc: "Live chat & chatbot platform", cat: "Third-Party", url: "https://api.chatuapp.io", color: "#10B981", status: "active", webhooks: 2, lastSync: "8 min ago" },
      { id: "app-kb", name: "Knowledge Hub", slug: "knowledge", desc: "Documentation & knowledge base", cat: "Internal", url: "https://api.uapp.uk/kb", color: "#DB2777", status: "paused", webhooks: 0, lastSync: "3 days ago" },
    ];
    const webhooks = [
      { id: "wh-1", name: "New Lead → CRM", app: "CRM", dir: "Outgoing", event: "lead.created", url: "https://api.uapp.uk/crm/leads", status: "active", rate: 98.2, lastDel: "2 min ago", failures: 3 },
      { id: "wh-2", name: "Booking Created → Slack", app: "Communication Hub", dir: "Outgoing", event: "booking.created", url: "https://hooks.slack.com/services/T0/B0/xxx", status: "active", rate: 99.8, lastDel: "14 min ago", failures: 0 },
      { id: "wh-3", name: "Chat Message Sync", app: "Chatuapp", dir: "Bidirectional", event: "chat.message.sent", url: "https://api.chatuapp.io/webhooks", status: "active", rate: 97.5, lastDel: "1 min ago", failures: 7 },
      { id: "wh-4", name: "Lead Updated → Website", app: "Website", dir: "Outgoing", event: "lead.updated", url: "https://www.uapp.uk/api/sync", status: "paused", rate: 94.1, lastDel: "2 hours ago", failures: 12 },
      { id: "wh-5", name: "Form Submission → Leads", app: "Leads", dir: "Incoming", event: "form.submitted", url: "https://api.uapp.uk/leads/ingest", status: "active", rate: 100, lastDel: "22 min ago", failures: 0 },
      { id: "wh-6", name: "Payment Alert → Finance", app: "CRM", dir: "Outgoing", event: "payment.received", url: "https://api.uapp.uk/crm/finance", status: "active", rate: 99.1, lastDel: "1 hour ago", failures: 1 },
    ];
    const events = [
      { key: "lead.created", app: "CRM", desc: "Fired when a new lead is created", ver: "1.2", hooks: 2, schema: '{\n  "id": "lead_8f2a",\n  "email": "student@example.com",\n  "name": "Carolina Moraru",\n  "source": "website_form",\n  "created_at": "2026-05-13T10:30:00Z"\n}' },
      { key: "lead.updated", app: "CRM", desc: "Fired when a lead record changes", ver: "1.1", hooks: 1, schema: '{\n  "id": "lead_8f2a",\n  "changes": {\n    "status": { "from": "new", "to": "contacted" }\n  },\n  "updated_at": "2026-05-13T11:00:00Z"\n}' },
      { key: "booking.created", app: "Communication Hub", desc: "Fired when a booking is confirmed", ver: "1.0", hooks: 1, schema: '{\n  "id": "bk_9c1b",\n  "title": "Application Review",\n  "start": "2026-05-14T10:00:00Z",\n  "end": "2026-05-14T10:30:00Z",\n  "attendees": ["u-shamim", "u-andreea"]\n}' },
      { key: "chat.message.sent", app: "Chatuapp", desc: "Fired on every outbound chat message", ver: "2.0", hooks: 1, schema: '{\n  "id": "msg_a3d4",\n  "channel": "g-leadership",\n  "sender": "u-shamim",\n  "text": "Hello team",\n  "sent_at": "2026-05-13T14:05:00Z"\n}' },
      { key: "form.submitted", app: "Website", desc: "Fired when a web form is submitted", ver: "1.0", hooks: 1, schema: '{\n  "form_id": "F-101",\n  "fields": {\n    "name": "John Doe",\n    "email": "john@example.com"\n  },\n  "submitted_at": "2026-05-13T12:30:00Z"\n}' },
      { key: "payment.received", app: "CRM", desc: "Fired when a payment is processed", ver: "1.0", hooks: 1, schema: '{\n  "id": "pay_d9g0",\n  "amount": 1500,\n  "currency": "GBP",\n  "student_id": "STD23309",\n  "method": "bank_transfer"\n}' },
      { key: "student.enrolled", app: "CRM", desc: "Fired when student status changes to enrolled", ver: "1.0", hooks: 0, schema: '{\n  "student_id": "STD23309",\n  "university": "London Met",\n  "course": "MSc Business",\n  "intake": "September 2026",\n  "enrolled_at": "2026-05-13T09:00:00Z"\n}' },
      { key: "application.status.changed", app: "Leads", desc: "Fired on any application status transition", ver: "1.3", hooks: 0, schema: '{\n  "app_id": "APP117454",\n  "student": "Mahmud Hasan",\n  "from": "Conditional Offer",\n  "to": "Unconditional Offer",\n  "changed_at": "2026-05-13T08:00:00Z"\n}' },
    ];
    const logs = [
      { id: "dl-1", webhook: "New Lead → CRM", event: "lead.created", reqId: "req_8f2a", status: "success", code: 200, duration: 142, attempts: 1, ts: "Today 14:32" },
      { id: "dl-2", webhook: "Booking Created → Slack", event: "booking.created", reqId: "req_9c1b", status: "success", code: 200, duration: 89, attempts: 1, ts: "Today 14:18" },
      { id: "dl-3", webhook: "Chat Message Sync", event: "chat.message.sent", reqId: "req_a3d4", status: "failed", code: 502, duration: 3012, attempts: 3, ts: "Today 14:05" },
      { id: "dl-4", webhook: "Lead Updated → Website", event: "lead.updated", reqId: "req_b5e6", status: "failed", code: 408, duration: 30000, attempts: 5, ts: "Today 13:44" },
      { id: "dl-5", webhook: "New Lead → CRM", event: "lead.created", reqId: "req_c7f8", status: "success", code: 201, duration: 167, attempts: 1, ts: "Today 13:22" },
      { id: "dl-6", webhook: "Payment Alert → Finance", event: "payment.received", reqId: "req_d9g0", status: "success", code: 200, duration: 98, attempts: 1, ts: "Today 12:55" },
      { id: "dl-7", webhook: "Form Submission → Leads", event: "form.submitted", reqId: "req_e1h2", status: "success", code: 200, duration: 204, attempts: 1, ts: "Today 12:30" },
      { id: "dl-8", webhook: "Chat Message Sync", event: "chat.message.sent", reqId: "req_f3i4", status: "success", code: 200, duration: 115, attempts: 1, ts: "Today 12:12" },
    ];
    const retryQueue = [
      { id: "rq-1", webhook: "Chat Message Sync", event: "chat.message.sent", attempt: 3, nextRetry: "In 2 min", error: "502 Bad Gateway — upstream timeout" },
      { id: "rq-2", webhook: "Lead Updated → Website", event: "lead.updated", attempt: 5, nextRetry: "In 15 min", error: "408 Request Timeout — no response" },
    ];
    const templates = [
      { id: "tpl-1", name: "CRM Lead Sync", desc: "Sync new leads to your CRM in real-time", cat: "CRM", fields: ["lead.id","lead.email","lead.source"], installed: false, event: "lead.created", method: "POST", url: "https://api.uapp.uk/crm/leads", payload: '{\n  "event": "lead.created",\n  "lead": {\n    "id": "{{lead.id}}",\n    "email": "{{lead.email}}",\n    "source": "{{lead.source}}"\n  }\n}' },
      { id: "tpl-2", name: "Booking Notifications", desc: "Send Slack/Teams alerts when meetings are booked", cat: "Communication", fields: ["booking.title","booking.time","booking.attendees"], installed: true, event: "booking.created", method: "POST", url: "https://hooks.slack.com/services/...", payload: '{\n  "text": "New booking: {{booking.title}}",\n  "blocks": [{\n    "type": "section",\n    "text": "{{booking.time}} with {{booking.attendees}}"\n  }]\n}' },
      { id: "tpl-3", name: "Finance Payment Alerts", desc: "Notify finance team on payment events", cat: "Finance", fields: ["payment.amount","payment.student","payment.method"], installed: false, event: "payment.received", method: "POST", url: "https://api.uapp.uk/finance/notify", payload: '{\n  "type": "payment_alert",\n  "amount": "{{payment.amount}}",\n  "student": "{{payment.student}}",\n  "method": "{{payment.method}}"\n}' },
      { id: "tpl-4", name: "Slack Notifications", desc: "Forward key events to Slack channels", cat: "Integration", fields: ["event.type","event.data","event.timestamp"], installed: false, event: "*", method: "POST", url: "https://hooks.slack.com/services/...", payload: '{\n  "channel": "#webhooks",\n  "text": "[{{event.type}}] {{event.data}}",\n  "ts": "{{event.timestamp}}"\n}' },
      { id: "tpl-5", name: "Google Sheets Sync", desc: "Append event data rows to a Google Sheet", cat: "Integration", fields: ["sheet.id","row.data","timestamp"], installed: false, event: "lead.created", method: "POST", url: "https://sheets.googleapis.com/v4/...", payload: '{\n  "range": "Sheet1!A:D",\n  "values": [[\n    "{{row.data}}",\n    "{{timestamp}}"\n  ]]\n}' },
      { id: "tpl-6", name: "Student Enrollment Alert", desc: "Alert team when a student enrolls", cat: "CRM", fields: ["student.name","student.university","student.intake"], installed: false, event: "student.enrolled", method: "POST", url: "https://api.uapp.uk/notifications", payload: '{\n  "title": "Student Enrolled",\n  "student": "{{student.name}}",\n  "university": "{{student.university}}",\n  "intake": "{{student.intake}}"\n}' },
    ];

    // ── KPI metrics ──
    const kpis = [
      { label: "Applications", value: apps.length, icon: LayoutGrid, color: C.primary },
      { label: "Active Webhooks", value: webhooks.filter(w => w.status === "active").length, icon: Zap, color: "#10B981" },
      { label: "Delivered (24h)", value: "1,247", icon: Check, color: "#22C55E" },
      { label: "Failed", value: logs.filter(l => l.status === "failed").length, icon: AlertCircle, color: C.danger },
      { label: "Retry Queue", value: retryQueue.length, icon: RefreshCcw, color: "#F59E0B" },
      { label: "Avg Response", value: `${Math.round(logs.reduce((s, l) => s + l.duration, 0) / logs.length)}ms`, icon: Clock, color: "#3B82F6" },
    ];

    const tabs = [
      { id: "applications", label: "Applications" },
      { id: "webhooks", label: "Webhooks" },
      { id: "events", label: "Event Registry" },
      { id: "logs", label: "Delivery Logs" },
      { id: "retry", label: "Retry Queue", badge: retryQueue.length },
      { id: "templates", label: "Templates" },
      { id: "guide", label: "Integration Guide" },
    ];

    // ── Shared styles ──
    const thStyle = { padding: "10px 14px", fontSize: T.fontXs, fontWeight: 700, color: C.textSoft, textAlign: "left", letterSpacing: "0.04em", textTransform: "uppercase" };
    const tdStyle = { padding: "12px 14px", fontSize: 12.5, color: C.text };
    const pillActive = { padding: "3px 9px", borderRadius: T.radFull, background: "rgba(34,197,94,0.12)", color: "#16A34A", fontSize: T.fontXs, fontWeight: 700 };
    const pillPaused = { padding: "3px 9px", borderRadius: T.radFull, background: "rgba(245,158,11,0.12)", color: "#D97706", fontSize: T.fontXs, fontWeight: 700 };
    const pillFailed = { padding: "3px 9px", borderRadius: T.radFull, background: "rgba(239,68,68,0.10)", color: "#DC2626", fontSize: T.fontXs, fontWeight: 700 };
    const pillSuccess = { ...pillActive };
    const btnSm = { padding: "5px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, border: `1px solid ${C.border}`, background: "transparent", color: C.textMid, cursor: "pointer" };

    // ── Drawer ──
    const DrawerOverlay = () => {
      if (!whDrawer) return null;
      const { kind, data } = whDrawer;
      const close = () => setWhDrawer(null);
      return (
        <div onClick={close} style={{ position: "fixed", inset: 0, zIndex: 2100, background: "rgba(0,0,0,0.35)", display: "flex", justifyContent: "flex-end" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: 520, maxWidth: "90vw", background: C.surface, height: "100%", display: "flex", flexDirection: "column", boxShadow: "0 0 40px rgba(0,0,0,0.2)" }}>
            <div style={{ padding: "18px 22px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ fontSize: T.fontMd, fontWeight: 600, color: C.text }}>{kind === "add-app" ? "Add Application" : kind === "add-webhook" ? "Create Webhook" : kind === "log-detail" ? "Delivery Detail" : kind === "view-schema" ? "Event Schema" : kind === "view-template" ? "Template Preview" : "Details"}</h3>
              <button onClick={close} style={{ background: "transparent", border: "none", color: C.textMid, cursor: "pointer" }}><X size={18} /></button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px" }}>
              {kind === "add-app" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[["Application Name","e.g. Payments API"],["Slug","e.g. payments-api"],["Description","Brief description…"],["Base URL","https://api.example.com"]].map(([l, p]) => (
                    <div key={l}><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase" }}>{l}</label>
                    <input placeholder={p} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13 }} /></div>
                  ))}
                  <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase" }}>Category</label>
                  <select style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13 }}>
                    <option>Internal</option><option>External</option><option>Third-Party</option>
                  </select></div>
                  <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase" }}>Authentication</label>
                  <select style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13 }}>
                    <option>None</option><option>Bearer Token</option><option>API Key</option><option>Basic Auth</option><option>HMAC Signature</option><option>OAuth 2.0</option>
                  </select></div>
                </div>
              )}
              {kind === "add-webhook" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[["Webhook Name","e.g. Lead Created → Slack"],["Description","What does this webhook do?"],["Endpoint URL","https://hooks.example.com/webhook"]].map(([l, p]) => (
                    <div key={l}><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase" }}>{l}</label>
                    <input placeholder={p} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13 }} /></div>
                  ))}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase" }}>Application</label>
                    <select style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13 }}>
                      {apps.map(a => <option key={a.id}>{a.name}</option>)}
                    </select></div>
                    <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase" }}>Direction</label>
                    <select style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13 }}>
                      <option>Outgoing</option><option>Incoming</option><option>Bidirectional</option>
                    </select></div>
                  </div>
                  <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase" }}>Event</label>
                  <select style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13 }}>
                    {events.map(e => <option key={e.key}>{e.key}</option>)}
                  </select></div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase" }}>HTTP Method</label>
                    <select style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13 }}>
                      <option>POST</option><option>PUT</option><option>PATCH</option>
                    </select></div>
                    <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase" }}>Timeout (ms)</label>
                    <input type="number" defaultValue={5000} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13 }} /></div>
                  </div>
                  <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase" }}>Authentication</label>
                  <select style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13 }}>
                    <option>None</option><option>Bearer Token</option><option>API Key</option><option>Basic Auth</option><option>HMAC</option>
                  </select></div>
                  <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase" }}>Payload Template</label>
                  <textarea rows={5} defaultValue={'{\n  "event": "{{event.key}}",\n  "data": {\n    "id": "{{lead.id}}",\n    "email": "{{student.email}}",\n    "timestamp": "{{timestamp}}"\n  }\n}'} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: darkMode ? "#0A1414" : "#0F172A", color: "#A6F5F7", fontSize: 12, fontFamily: "'Monaco','Menlo',monospace", resize: "vertical" }} /></div>
                  <div style={{ padding: "12px", borderRadius: 8, background: C.bg, border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 6, textTransform: "uppercase" }}>Retry Policy</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                      {[["Max Attempts","3"],["Initial Delay","1000ms"],["Max Delay","60000ms"]].map(([l, v]) => (
                        <div key={l}><div style={{ fontSize: T.fontXs, color: C.textSoft, marginBottom: 3 }}>{l}</div>
                        <input defaultValue={v} style={{ width: "100%", padding: "6px 8px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 11 }} /></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {kind === "log-detail" && data && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {[["Webhook", data.webhook],["Event", data.event],["Request ID", data.reqId],["Status", data.status],["HTTP Code", data.code],["Duration", `${data.duration}ms`],["Attempts", data.attempts],["Timestamp", data.ts]].map(([l, v]) => (
                      <div key={l}><div style={{ fontSize: T.fontXs, fontWeight: 600, color: C.textSoft, textTransform: "uppercase" }}>{l}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: C.text, marginTop: 2 }}>{v}</div></div>
                    ))}
                  </div>
                  <div><div style={{ fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase" }}>Request Body</div>
                  <pre style={{ padding: "10px 12px", borderRadius: 8, background: darkMode ? "#0A1414" : "#0F172A", color: "#A6F5F7", fontSize: 11, fontFamily: "monospace", overflow: "auto" }}>
{`{
  "event": "${data.event}",
  "webhook_id": "${data.reqId}",
  "timestamp": "${new Date().toISOString()}"
}`}
                  </pre></div>
                  <div><div style={{ fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 5, textTransform: "uppercase" }}>Response</div>
                  <pre style={{ padding: "10px 12px", borderRadius: 8, background: darkMode ? "#0A1414" : "#0F172A", color: data.status === "success" ? "#86EFAC" : "#FCA5A5", fontSize: 11, fontFamily: "monospace" }}>
{data.status === "success" ? `{ "status": "ok", "received": true }` : `{ "error": "upstream_timeout", "code": ${data.code} }`}
                  </pre></div>
                </div>
              )}
              {kind === "view-schema" && data && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {[["Event Key", data.key],["Application", data.app],["Version", `v${data.ver}`],["Active Webhooks", data.hooks]].map(([l, v]) => (
                      <div key={l}><div style={{ fontSize: T.fontXs, fontWeight: 600, color: C.textSoft, textTransform: "uppercase" }}>{l}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: C.text, marginTop: 2 }}>{v}</div></div>
                    ))}
                  </div>
                  <div style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.5 }}>{data.desc}</div>
                  <div><div style={{ fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 6, textTransform: "uppercase" }}>Sample Payload</div>
                  <pre style={{ padding: "14px 16px", borderRadius: T.radMd, background: darkMode ? "#0A1414" : "#0F172A", color: "#A6F5F7", fontSize: 12, fontFamily: "'Monaco','Menlo',monospace", lineHeight: 1.6, overflow: "auto", margin: 0 }}>{data.schema}</pre></div>
                  <div style={{ padding: "10px 14px", borderRadius: 8, background: C.bg, border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 4 }}>How to use</div>
                    <div style={{ fontSize: 12, color: C.textSoft, lineHeight: 1.5 }}>Subscribe to <code style={{ fontSize: 11, padding: "1px 5px", borderRadius: 4, background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", fontFamily: "monospace", color: C.primary }}>{data.key}</code> in your webhook configuration. The payload above will be sent as the request body on each event.</div>
                  </div>
                </div>
              )}
              {kind === "view-template" && data && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <div style={{ fontSize: T.fontLg, fontWeight: 700, color: C.text, marginBottom: 4 }}>{data.name}</div>
                    <div style={{ fontSize: T.fontSm, color: C.textMid, lineHeight: T.lineBody }}>{data.desc}</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "14px", borderRadius: T.radMd, background: C.bg, border: `1px solid ${C.border}` }}>
                    {[["Category", data.cat],["Event", data.event],["Method", data.method],["Status", data.installed ? "Installed" : "Not installed"]].map(([l, v]) => (
                      <div key={l}><div style={{ fontSize: T.fontXs, fontWeight: 600, color: C.textSoft, textTransform: "uppercase" }}>{l}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: C.text, marginTop: 2 }}>{v}</div></div>
                    ))}
                  </div>
                  <div><div style={{ fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 6, textTransform: "uppercase" }}>Endpoint URL</div>
                  <div style={{ fontSize: 12, fontFamily: "monospace", color: C.textMid, padding: "8px 12px", borderRadius: 8, background: C.bg, border: `1px solid ${C.border}` }}>{data.url}</div></div>
                  <div><div style={{ fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 6, textTransform: "uppercase" }}>Required Fields</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {data.fields.map(f => <span key={f} style={{ padding: "3px 8px", borderRadius: 5, background: C.bg, border: `1px solid ${C.border}`, fontSize: 11, fontFamily: "monospace", color: C.primary }}>{f}</span>)}
                  </div></div>
                  <div><div style={{ fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 6, textTransform: "uppercase" }}>Payload Template</div>
                  <pre style={{ padding: "14px 16px", borderRadius: T.radMd, background: darkMode ? "#0A1414" : "#0F172A", color: "#A6F5F7", fontSize: 12, fontFamily: "'Monaco','Menlo',monospace", lineHeight: 1.6, overflow: "auto", margin: 0 }}>{data.payload}</pre></div>
                </div>
              )}
            </div>
            <div style={{ padding: "14px 22px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button onClick={close} style={{ ...btnSm, padding: "9px 16px" }}>{kind === "view-schema" || kind === "view-template" ? "Close" : "Cancel"}</button>
              {(kind === "add-app" || kind === "add-webhook") && <button onClick={() => { close(); showToast(`${kind === "add-app" ? "Application" : "Webhook"} created`); }} style={{ padding: "9px 18px", borderRadius: 8, background: C.primary, color: "#fff", border: "none", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>
                {kind === "add-app" ? "Add Application" : "Create Webhook"}
              </button>}
              {kind === "log-detail" && <button onClick={() => { close(); showToast("Retrying delivery…"); }} style={{ padding: "9px 18px", borderRadius: 8, background: C.secondary, color: "#fff", border: "none", fontSize: 12.5, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><RefreshCcw size={12} /> Retry</button>}
              {kind === "view-template" && !data.installed && <button onClick={() => { close(); showToast(`"${data.name}" installed`); }} style={{ padding: "9px 18px", borderRadius: 8, background: C.primary, color: "#fff", border: "none", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>Install Template</button>}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div style={{ padding: "28px 32px 60px", fontFamily: "'Roboto', sans-serif" }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: T.fontXl, fontWeight: 700, color: C.text, letterSpacing: "-0.015em", marginBottom: 4 }}>Webhooks & Integrations</h1>
          <p style={{ fontSize: 13, color: C.textSoft }}>Manage custom webhook subscriptions, application integrations, delivery logs, and automation workflows.</p>
        </div>

        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 22 }}>
          {kpis.map(k => {
            const KI = k.icon;
            return (
              <div key={k.label} style={{ background: C.surface, borderRadius: T.radLg, border: `1px solid ${C.border}`, padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: `${k.color}18`, color: k.color, display: "flex", alignItems: "center", justifyContent: "center" }}><KI size={14} /></div>
                </div>
                <div style={{ fontSize: T.fontXs, fontWeight: 600, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 3 }}>{k.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{k.value}</div>
              </div>
            );
          })}
        </div>

        {/* Tab strip */}
        <div style={{ display: "flex", gap: 2, borderBottom: `1px solid ${C.border}`, marginBottom: 20 }}>
          {tabs.map(t => {
            const a = whTab === t.id;
            return (
              <button key={t.id} onClick={() => { setWhTab(t.id); setWhSearch(""); }} className="smooth" style={{
                padding: "10px 16px", background: "transparent",
                color: a ? C.primary : C.textSoft, fontSize: 13, fontWeight: a ? 600 : 500,
                border: "none", cursor: "pointer",
                borderBottom: a ? `2px solid ${C.primary}` : "2px solid transparent", marginBottom: -1,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                {t.label}
                {t.badge > 0 && <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: T.radFull, background: "rgba(239,68,68,0.12)", color: C.danger }}>{t.badge}</span>}
              </button>
            );
          })}
        </div>

        {/* ══ APPLICATIONS TAB ══ */}
        {whTab === "applications" && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <Search size={14} color={C.textSoft} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input value={whSearch} onChange={e => setWhSearch(e.target.value)} placeholder="Search applications…" style={{ width: "100%", padding: "9px 12px 9px 34px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.surface, fontSize: 13, color: C.text }} />
              </div>
              <button onClick={() => setWhDrawer({ kind: "add-app" })} className="smooth" style={{ padding: "9px 16px", borderRadius: 8, background: C.primary, color: "#fff", border: "none", fontSize: 12.5, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><Plus size={13} /> Add Application</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
              {apps.filter(a => !whSearch || a.name.toLowerCase().includes(whSearch.toLowerCase())).map(a => (
                <div key={a.id} style={{ background: C.surface, borderRadius: T.radLg, border: `1px solid ${C.border}`, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: a.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800 }}>{a.name[0]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{a.name}</div>
                      <div style={{ fontSize: 11, color: C.textSoft }}>{a.cat}</div>
                    </div>
                    <span style={a.status === "active" ? pillActive : pillPaused}>{a.status === "active" ? "Active" : "Paused"}</span>
                  </div>
                  <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.4 }}>{a.desc}</div>
                  <div style={{ fontSize: 11, color: C.textSoft, display: "flex", gap: 12 }}>
                    <span><strong style={{ color: C.text }}>{a.webhooks}</strong> webhooks</span>
                    <span>Last sync: {a.lastSync}</span>
                  </div>
                  <div style={{ fontSize: T.fontXs, color: C.textSoft, fontFamily: "monospace", background: C.bg, padding: "4px 8px", borderRadius: 5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.url}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ══ WEBHOOKS TAB ══ */}
        {whTab === "webhooks" && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <Search size={14} color={C.textSoft} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input value={whSearch} onChange={e => setWhSearch(e.target.value)} placeholder="Search webhooks…" style={{ width: "100%", padding: "9px 12px 9px 34px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.surface, fontSize: 13, color: C.text }} />
              </div>
              <button onClick={() => setWhDrawer({ kind: "add-webhook" })} className="smooth" style={{ padding: "9px 16px", borderRadius: 8, background: C.primary, color: "#fff", border: "none", fontSize: 12.5, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><Plus size={13} /> Add Webhook</button>
            </div>
            <div style={{ background: C.surface, borderRadius: T.radLg, border: `1px solid ${C.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr style={{ background: darkMode ? "rgba(255,255,255,0.03)" : "#F8FAFC" }}>
                  {["Name","App","Direction","Event","Status","Success","Last Delivery","Actions"].map(h => <th key={h} style={thStyle}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {webhooks.filter(w => !whSearch || w.name.toLowerCase().includes(whSearch.toLowerCase())).map((w, i) => (
                    <tr key={w.id} style={{ borderTop: i > 0 ? `1px solid ${C.divider}` : "none" }}>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>{w.name}</td>
                      <td style={tdStyle}>{w.app}</td>
                      <td style={tdStyle}><span style={{ fontSize: T.fontXs, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: C.bg, border: `1px solid ${C.border}`, color: C.textMid }}>{w.dir}</span></td>
                      <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 11.5, color: C.primary }}>{w.event}</td>
                      <td style={tdStyle}><span style={w.status === "active" ? pillActive : pillPaused}>{w.status === "active" ? "Active" : "Paused"}</span></td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: w.rate > 98 ? "#16A34A" : w.rate > 95 ? "#D97706" : C.danger }}>{w.rate}%</td>
                      <td style={{ ...tdStyle, fontSize: 11.5, color: C.textSoft }}>{w.lastDel}</td>
                      <td style={tdStyle}>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button onClick={() => showToast("Test sent — 200 OK (142ms)")} style={btnSm} title="Test"><Zap size={11} /></button>
                          <button onClick={() => setWhDrawer({ kind: "add-webhook" })} style={btnSm} title="Edit"><Edit2 size={11} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ══ EVENT REGISTRY TAB ══ */}
        {whTab === "events" && (
          <div style={{ background: C.surface, borderRadius: T.radLg, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: darkMode ? "rgba(255,255,255,0.03)" : "#F8FAFC" }}>
                {["Event Key","Application","Description","Version","Webhooks","Actions"].map(h => <th key={h} style={thStyle}>{h}</th>)}
              </tr></thead>
              <tbody>
                {events.map((e, i) => (
                  <tr key={e.key} style={{ borderTop: i > 0 ? `1px solid ${C.divider}` : "none" }}>
                    <td style={{ ...tdStyle, fontFamily: "monospace", fontWeight: 600, color: C.primary }}>{e.key}</td>
                    <td style={tdStyle}>{e.app}</td>
                    <td style={{ ...tdStyle, color: C.textMid }}>{e.desc}</td>
                    <td style={tdStyle}><span style={{ fontSize: T.fontXs, fontWeight: 600, padding: "2px 7px", borderRadius: 4, background: C.bg, border: `1px solid ${C.border}` }}>v{e.ver}</span></td>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>{e.hooks}</td>
                    <td style={tdStyle}><button onClick={() => setWhDrawer({ kind: "view-schema", data: e })} style={btnSm}>View Schema</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ══ DELIVERY LOGS TAB ══ */}
        {whTab === "logs" && (
          <div style={{ background: C.surface, borderRadius: T.radLg, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: darkMode ? "rgba(255,255,255,0.03)" : "#F8FAFC" }}>
                {["Time","Webhook","Event","Request ID","Status","HTTP","Duration","Actions"].map(h => <th key={h} style={thStyle}>{h}</th>)}
              </tr></thead>
              <tbody>
                {logs.map((l, i) => (
                  <tr key={l.id} style={{ borderTop: i > 0 ? `1px solid ${C.divider}` : "none" }}>
                    <td style={{ ...tdStyle, fontSize: 11.5, color: C.textSoft }}>{l.ts}</td>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>{l.webhook}</td>
                    <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 11.5, color: C.primary }}>{l.event}</td>
                    <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 11, color: C.textSoft }}>{l.reqId}</td>
                    <td style={tdStyle}><span style={l.status === "success" ? pillSuccess : pillFailed}>{l.status}</span></td>
                    <td style={{ ...tdStyle, fontWeight: 600, color: l.code < 300 ? "#16A34A" : C.danger }}>{l.code}</td>
                    <td style={{ ...tdStyle, color: l.duration > 5000 ? C.danger : C.textMid }}>{l.duration}ms</td>
                    <td style={tdStyle}>
                      <button onClick={() => setWhDrawer({ kind: "log-detail", data: l })} style={btnSm}>Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ══ RETRY QUEUE TAB ══ */}
        {whTab === "retry" && (
          retryQueue.length === 0 ? (
            <div style={{ background: C.surface, borderRadius: T.radLg, border: `1px solid ${C.border}`, padding: "60px 20px", textAlign: "center" }}>
              <Check size={36} color={C.textVerySoft} style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>Queue is empty</div>
              <div style={{ fontSize: 12.5, color: C.textSoft }}>All deliveries have been processed successfully.</div>
            </div>
          ) : (
            <div style={{ background: C.surface, borderRadius: T.radLg, border: `1px solid ${C.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr style={{ background: darkMode ? "rgba(255,255,255,0.03)" : "#F8FAFC" }}>
                  {["Webhook","Event","Attempt","Next Retry","Error","Actions"].map(h => <th key={h} style={thStyle}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {retryQueue.map((r, i) => (
                    <tr key={r.id} style={{ borderTop: i > 0 ? `1px solid ${C.divider}` : "none" }}>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>{r.webhook}</td>
                      <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 11.5, color: C.primary }}>{r.event}</td>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>{r.attempt}</td>
                      <td style={{ ...tdStyle, color: C.secondary, fontWeight: 600, fontSize: 12 }}>{r.nextRetry}</td>
                      <td style={{ ...tdStyle, fontSize: 11.5, color: C.danger }}>{r.error}</td>
                      <td style={tdStyle}>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button onClick={() => showToast("Retrying now…")} style={{ ...btnSm, color: C.secondary, borderColor: C.secondary }}><RefreshCcw size={11} /> Retry</button>
                          <button onClick={() => showToast("Skipped")} style={btnSm}>Skip</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {/* ══ TEMPLATES TAB ══ */}
        {whTab === "templates" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
            {templates.map(t => (
              <div key={t.id} style={{ background: C.surface, borderRadius: T.radLg, border: `1px solid ${C.border}`, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{t.name}</div>
                  {t.installed && <span style={pillActive}>Installed</span>}
                </div>
                <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.4 }}>{t.desc}</div>
                <div style={{ fontSize: T.fontXs, color: C.textSoft }}><strong>Category:</strong> {t.cat}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {t.fields.map(f => <span key={f} style={{ padding: "2px 7px", borderRadius: 4, background: C.bg, border: `1px solid ${C.border}`, fontSize: T.fontXs, fontFamily: "monospace", color: C.textMid }}>{f}</span>)}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setWhDrawer({ kind: "view-template", data: t })} className="smooth" style={{
                    flex: 1, padding: "8px 0", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
                    background: "transparent", color: C.textMid, border: `1px solid ${C.border}`,
                  }}>Preview</button>
                  <button onClick={() => showToast(t.installed ? "Already installed" : `"${t.name}" installed`)} className="smooth" style={{
                    flex: 1, padding: "8px 0", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
                    background: t.installed ? "transparent" : C.primary,
                    color: t.installed ? C.textSoft : "#fff",
                    border: t.installed ? `1px solid ${C.border}` : "none",
                  }}>{t.installed ? "Installed" : "Install"}</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══ INTEGRATION GUIDE TAB ══ */}
        {whTab === "guide" && (() => {
          const codeBg = darkMode ? "#0A1414" : "#1E293B";
          const codeColor = darkMode ? "#D4D4D8" : "#E2E8F0";
          const secStyle = { fontSize: T.fontLg, fontWeight: 700, color: C.text, marginBottom: 8, marginTop: 32, letterSpacing: "-0.01em" };
          const paraStyle = { fontSize: 13.5, color: C.textMid, lineHeight: 1.7, marginBottom: 14 };
          const tblHd = { padding: "10px 16px", fontSize: 11, fontWeight: 700, color: C.textSoft, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.04em", background: darkMode ? "rgba(255,255,255,0.03)" : "#F8FAFC" };
          const tblTd = { padding: "12px 16px", fontSize: 12.5, color: C.text, borderTop: `1px solid ${C.divider}` };
          const codeTd = { ...tblTd, fontFamily: "'Monaco','Menlo',monospace", fontSize: 11.5, color: C.primary };
          const codeBlock = (label, code) => (
            <div style={{ borderRadius: T.radMd, overflow: "hidden", marginBottom: 18, border: `1px solid ${C.border}` }}>
              <div style={{ padding: "6px 14px", background: darkMode ? "rgba(255,255,255,0.04)" : "#F1F5F9", fontSize: 11, fontWeight: 600, color: C.textSoft }}>{label}</div>
              <pre style={{ margin: 0, padding: "16px 18px", background: codeBg, color: codeColor, fontSize: 12, lineHeight: 1.65, fontFamily: "'Monaco','Menlo','Courier New',monospace", overflowX: "auto", whiteSpace: "pre" }}>{code}</pre>
            </div>
          );
          const alertCard = (title, items, accent) => (
            <div style={{ padding: "16px 20px", borderRadius: T.radMd, background: `${accent}08`, border: `1px solid ${accent}22`, marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: accent, marginBottom: 8 }}>{title}</div>
              {items.map((it, i) => (
                <div key={i} style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.6, paddingLeft: 14, position: "relative", marginBottom: 4 }}>
                  <span style={{ position: "absolute", left: 0, color: accent }}>•</span>{it}
                </div>
              ))}
            </div>
          );
          return (
            <div style={{ maxWidth: 820, background: C.surface, borderRadius: T.radLg, border: `1px solid ${C.border}`, padding: "32px 36px 48px" }}>
              <h2 style={{ fontSize: T.fontXl, fontWeight: 700, color: C.text, marginBottom: 6, letterSpacing: "-0.015em" }}>Integration Guide</h2>
              <p style={paraStyle}>Complete technical reference for developers building webhook receivers for the UAPP platform.</p>

              {/* Quick Start */}
              <h3 style={secStyle}>Quick Start — Setup in 3 Steps</h3>
              {[
                ["1", "Create a webhook subscription", "Go to Settings → Webhooks → Add Webhook. Enter your endpoint URL, select the event (e.g. lead.created), and click Create."],
                ["2", "Copy the signing secret", "The secret is shown ONCE after creation. Copy it immediately and store it securely in your receiver's configuration. You'll use it to verify that requests actually come from UAPP."],
                ["3", 'Click "Send Test" to verify', "Use the Test button to send a webhook.ping event. Check your endpoint receives it and returns 200. Then trigger a real event to confirm end-to-end delivery."],
              ].map(([num, title, desc]) => (
                <div key={num} style={{ display: "flex", gap: 14, padding: "16px 18px", background: C.bg, borderRadius: T.radMd, border: `1px solid ${C.border}`, marginBottom: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{num}</div>
                  <div><div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 3 }}>{title}</div>
                  <div style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.55 }}>{desc}</div></div>
                </div>
              ))}

              {/* How Webhooks Work */}
              <h3 style={secStyle}>How Webhooks Work</h3>
              <p style={paraStyle}>When an event occurs in the UAPP platform (e.g. a new lead is created, a booking is confirmed), the system sends an HTTP POST request to each active webhook subscription matching the event.</p>
              {["A lead is created or a form is submitted on the platform", "Backend detects the event and queues a delivery per active subscription", "Background job POSTs JSON payload to your URL with HMAC-SHA256 signature", "Your endpoint verifies the signature and processes the data", "On failure (5xx / timeout), retries with exponential backoff up to 6 times over 24 hours"].map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.primary, minWidth: 16 }}>{i + 1}.</span>
                  <span style={{ fontSize: T.fontSm, color: C.textMid, lineHeight: T.lineBody }}>{step}</span>
                </div>
              ))}
              <div style={{ padding: "10px 14px", background: C.bg, borderRadius: 8, border: `1px solid ${C.border}`, marginTop: 12, marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>Deduplication: </span>
                <span style={{ fontSize: 12, color: C.textMid }}>The same event for the same entity only triggers once. If a visitor enters the same email again, no duplicate webhook is sent.</span>
              </div>

              {/* Payload Format */}
              <h3 style={secStyle}>Payload Format</h3>
              <p style={paraStyle}>Every webhook POST sends a JSON envelope with this structure:</p>
              {codeBlock("JSON", `{
  "version": 1,
  "event": "lead.created",
  "occurred_at": "2026-05-13T12:34:56.000Z",
  "tenant_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "data": {
    "session_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "john@example.com",
    "name": "John Doe",
    "phone": "+8801712345678",
    "consultants_name": null,
    "destination_country": "UK",
    "captured_at": "2026-05-13T12:34:56.000Z"
  }
}`)}
              <div style={{ borderRadius: T.radMd, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 18 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr>{["Field","Type","Description"].map(h => <th key={h} style={tblHd}>{h}</th>)}</tr></thead>
                  <tbody>
                    {[
                      ["version","number","Always 1. Branch on this for future schema changes."],
                      ["event","string","Event type: lead.created, booking.created, or webhook.ping"],
                      ["occurred_at","string","ISO 8601 timestamp when the event occurred"],
                      ["data.email","string","Contact email (always present for lead events)"],
                      ["data.name","string?","null if not provided. \"Guest\" means no name entered."],
                      ["data.phone","string?","null if not provided. WhatsApp number recommended."],
                      ["data.consultants_name","string?","Associated consultant name (if set by host platform)"],
                      ["data.destination_country","string?","Destination country (if set by host platform)"],
                      ["data.session_id","string","Chat session UUID — link back to the conversation"],
                    ].map(([f, t, d], i) => (
                      <tr key={i}><td style={codeTd}>{f}</td><td style={{ ...tblTd, fontFamily: "monospace", fontSize: 11.5, color: C.textSoft }}>{t}</td><td style={tblTd}>{d}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* HTTP Headers */}
              <h3 style={secStyle}>HTTP Headers</h3>
              <p style={paraStyle}>Every webhook request includes these headers:</p>
              <div style={{ borderRadius: T.radMd, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 18 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr>{["Header","Example","Description"].map(h => <th key={h} style={tblHd}>{h}</th>)}</tr></thead>
                  <tbody>
                    {[
                      ["Content-Type","application/json","Always JSON"],
                      ["User-Agent","UAPP-Webhook/1.0","Identifies the sender"],
                      ["X-UAPP-Event","lead.created","Event type"],
                      ["X-UAPP-Delivery","a1b2c3d4-…","Unique delivery ID — use for idempotency"],
                      ["X-UAPP-Timestamp","1714300000","Unix seconds when signed — reject if >5 min old"],
                      ["X-UAPP-Signature","sha256=a1b2c3…","HMAC-SHA256 of timestamp.rawBody"],
                    ].map(([h, ex, d], i) => (
                      <tr key={i}><td style={codeTd}>{h}</td><td style={{ ...tblTd, fontSize: 12, color: C.textSoft }}>{ex}</td><td style={tblTd}>{d}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Verifying Signatures */}
              <h3 style={secStyle}>Verifying Signatures</h3>
              <p style={paraStyle}><strong style={{ color: C.text }}>Always verify the signature</strong> before processing the payload. The signature proves the request came from UAPP, not an attacker.</p>
              <p style={paraStyle}>The signature is computed over the <strong style={{ color: C.text }}>raw bytes</strong> of: <code style={{ padding: "2px 6px", borderRadius: 4, background: C.bg, fontFamily: "monospace", fontSize: 12, color: C.primary }}>{"{timestamp}.{raw_body_bytes}"}</code></p>
              <div style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", marginBottom: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.danger }}>Important: </span>
                <span style={{ fontSize: 12, color: C.textMid }}>Sign the raw request body bytes, not the parsed/re-serialized JSON. Re-serializing may change key order or whitespace.</span>
              </div>

              {codeBlock("Node.js (Express)", `const crypto = require("crypto");

// IMPORTANT: Use express.raw() to get the exact bytes, not express.json()
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const secret = process.env.UAPP_WEBHOOK_SECRET;
  const timestamp = req.headers["x-uapp-timestamp"];
  const signature = req.headers["x-uapp-signature"];
  const rawBody = req.body; // Buffer — the exact bytes sent

  // 1. Check required headers
  if (!timestamp || !signature || !rawBody) {
    return res.status(401).json({ error: "Missing signature headers" });
  }

  // 2. Replay protection: reject if older than 5 minutes
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) {
    return res.status(401).json({ error: "Timestamp too old" });
  }

  // 3. Compute signature over "{timestamp}.{rawBodyBytes}"
  const expected = "sha256=" + crypto
    .createHmac("sha256", secret)
    .update(timestamp + "." + rawBody)
    .digest("hex");

  // 4. Timing-safe comparison
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  // 5. Process event
  const event = JSON.parse(rawBody);
  console.log("Event:", event.event, event.data);
  res.json({ success: true });
});`)}

              {codeBlock("Python (Flask)", `import hmac, hashlib, time, json
from flask import Flask, request, jsonify

WEBHOOK_SECRET = "whk_your_secret_here"

@app.route("/webhook", methods=["POST"])
def uapp_webhook():
    timestamp = request.headers.get("X-UAPP-Timestamp")
    signature = request.headers.get("X-UAPP-Signature")
    raw_body = request.get_data()  # bytes — the exact body

    # 1. Check required headers
    if not timestamp or not signature:
        return jsonify(error="Missing headers"), 401

    # 2. Replay protection
    if abs(time.time() - int(timestamp)) > 300:
        return jsonify(error="Timestamp too old"), 401

    # 3. Compute signature over "{timestamp}.{rawBodyBytes}"
    mac = hmac.new(
        WEBHOOK_SECRET.encode(),
        f"{timestamp}.".encode() + raw_body,
        hashlib.sha256
    ).hexdigest()
    expected = f"sha256={mac}"

    # 4. Timing-safe comparison
    if not hmac.compare_digest(signature, expected):
        return jsonify(error="Invalid signature"), 401

    # 5. Process event
    event = json.loads(raw_body)
    if event["event"] == "lead.created":
        lead = event["data"]
        print(f"New lead: {lead['email']} {lead.get('name')} {lead.get('phone')}")

    return jsonify(success=True)`)}

              {/* Retry Behavior */}
              <h3 style={secStyle}>Retry Behavior</h3>
              <p style={paraStyle}>Failed deliveries are retried automatically with exponential backoff. Each retry creates a separate delivery record visible in the Delivery Log.</p>
              <div style={{ borderRadius: T.radMd, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 12 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr>{["Attempt","Delay","Total elapsed"].map(h => <th key={h} style={tblHd}>{h}</th>)}</tr></thead>
                  <tbody>
                    {[["1","Immediate","0"],["2","30 seconds","30s"],["3","2 minutes","~2.5 min"],["4","10 minutes","~12.5 min"],["5","1 hour","~1.2 hours"],["6","6 hours","~7.2 hours"]].map(([a, d, t], i) => (
                      <tr key={i}><td style={{ ...tblTd, fontWeight: 600 }}>{a}</td><td style={tblTd}>{d}</td><td style={{ ...tblTd, color: C.textSoft }}>{t}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ ...paraStyle, fontSize: 12.5 }}>After all retries are exhausted, the delivery is marked "Retries Exhausted". You can manually redeliver from Settings → Webhooks → Delivery Log.</p>

              {/* Expected Responses */}
              <h3 style={secStyle}>Expected Responses</h3>
              <p style={paraStyle}>Your endpoint must respond within <strong style={{ color: C.text }}>30 seconds</strong>. If you need more time, return 200 immediately and process asynchronously.</p>
              <div style={{ borderRadius: T.radMd, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 18 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr>{["Your Response","What UAPP Does"].map(h => <th key={h} style={tblHd}>{h}</th>)}</tr></thead>
                  <tbody>
                    {[
                      ["2xx","Succeeded — delivery complete, no retry"],
                      ["410 Gone","Auto-deactivates the webhook subscription (you told us to stop)"],
                      ["4xx (other)","Failed, no retry — fix the issue on your end, then redeliver manually"],
                      ["5xx","Failed, will retry with exponential backoff"],
                      ["Timeout (>30s)","Failed, will retry — respond faster or process async"],
                    ].map(([r, d], i) => (
                      <tr key={i}><td style={{ ...codeTd, fontWeight: 600 }}>{r}</td><td style={tblTd}>{d}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Best Practices */}
              <h3 style={secStyle}>Best Practices</h3>
              {[
                ["Always verify signatures","Never process a webhook without checking the HMAC signature. Use timing-safe comparison to prevent timing attacks."],
                ["Check the timestamp",`Reject requests where X-UAPP-Timestamp is more than 5 minutes old. This prevents replay attacks.`],
                ["Sign over raw bytes","Compute the HMAC over the raw request body bytes, NOT a re-serialized string. Re-serializing JSON may change key order, producing a different signature."],
                ["Deduplicate on your side","Use X-UAPP-Delivery header or data.email as an idempotency key. Retries may deliver the same event multiple times."],
                ["Respond within 5 seconds","Return 200 immediately and process the lead asynchronously. Slow responses cause timeouts and unnecessary retries."],
                ["Return 410 to unsubscribe","If you want to permanently stop receiving webhooks, return 410 Gone. The subscription will be auto-deactivated."],
                ["Store the secret securely","Never commit the webhook secret to source control. Use environment variables or a secrets manager."],
              ].map(([title, desc], i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.primary, minWidth: 18 }}>{i + 1}.</span>
                  <span style={{ fontSize: T.fontSm, color: C.textMid, lineHeight: T.lineBody5 }}><strong style={{ color: C.text }}>{title}</strong> — {desc}</span>
                </div>
              ))}

              {/* Events Reference */}
              <h3 style={secStyle}>Events Reference</h3>
              <div style={{ borderRadius: T.radMd, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 12 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr>{["Event","When it fires","Data fields"].map(h => <th key={h} style={tblHd}>{h}</th>)}</tr></thead>
                  <tbody>
                    {[
                      ["lead.created","First time a lead is created in the system","session_id, email, name?, phone?, consultants_name?, destination_country?, captured_at"],
                      ["lead.updated","When a lead record is modified","id, changes, updated_at"],
                      ["booking.created","When a meeting is confirmed","id, title, start, end, attendees"],
                      ["form.submitted","When a web form is submitted","form_id, fields, submitted_at"],
                      ["payment.received","When a payment is processed","id, amount, currency, student_id, method"],
                      ["student.enrolled","When student status changes to enrolled","student_id, university, course, intake, enrolled_at"],
                      ["webhook.ping","When admin clicks Send Test","message"],
                    ].map(([ev, when, fields], i) => (
                      <tr key={i}><td style={codeTd}>{ev}</td><td style={tblTd}>{when}</td><td style={{ ...tblTd, fontSize: 12, color: C.textSoft }}>{fields}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ ...paraStyle, fontSize: 12 }}>More events (application.status.changed, chat.message.sent, session.created) will be added in future releases. The event list in the subscription form updates automatically from the server.</p>

              {/* Troubleshooting */}
              <h3 style={secStyle}>Troubleshooting</h3>
              {alertCard("401 Unauthorized — Signature mismatch", [
                "Verify the secret in your config matches the one from UAPP exactly (no extra whitespace)",
                "Make sure you sign the raw body bytes, not a re-serialized string",
                "In .NET, use IAsyncResourceFilter — IAsyncActionFilter reads empty body (model binding consumed it first)",
                "Check the timestamp is within 5 minutes of your server's clock",
              ], "#DC2626")}
              {alertCard("No webhook received", [
                "Check the webhook subscription is Active (toggle is ON)",
                "Verify the correct event is selected (e.g. lead.created)",
                "The same email only triggers once per tenant — try a new email",
                "Check the Delivery Log for error details",
                "Click \"Send Test\" to verify your endpoint is reachable",
              ], "#D97706")}
              {alertCard("Testing with webhook.site", [
                "Go to https://webhook.site — it gives you a unique URL. Create a webhook subscription with that URL, click Send Test, and inspect the request on webhook.site to see the exact headers and payload.",
              ], "#2563EB")}
            </div>
          );
        })()}

        {/* Toast */}
        {whToast && (
          <div style={{ position: "fixed", bottom: 24, right: 24, padding: "12px 20px", borderRadius: T.radMd, background: C.text, color: C.surface, fontSize: 13, fontWeight: 600, boxShadow: "0 8px 24px rgba(0,0,0,0.25)", zIndex: 3500, display: "flex", alignItems: "center", gap: 8 }}>
            <Check size={14} /> {whToast}
          </div>
        )}

        {/* Drawer */}
        {DrawerOverlay()}
      </div>
    );
  }

function PromoSettingsPage() {
    const sorted = [...promoCategories].sort((a, b) => a.priority - b.priority);
    const COLORS = ["#7C3AED","#F59E0B","#10B981","#EF4444","#3B82F6","#EC4899","#0EA5E9","#F97316","#6366F1","#14B8A6"];
    const expandedCat = promoExpandedCat;
    const setExpandedCat = setPromoExpandedCat;

    // Drag-and-drop reorder
    const handleDragStart = (idx) => { setPromoDragIdx(idx); };
    const handleDragOver = (e, idx) => { e.preventDefault(); setPromoDragOverIdx(idx); };
    const handleDrop = (idx) => {
      if (promoDragIdx === null || promoDragIdx === idx) { setPromoDragIdx(null); setPromoDragOverIdx(null); return; }
      const reordered = [...sorted];
      const [moved] = reordered.splice(promoDragIdx, 1);
      reordered.splice(idx, 0, moved);
      // Reassign priorities
      setPromoCategories(reordered.map((c, i) => ({ ...c, priority: i + 1 })));
      setPromoDragIdx(null); setPromoDragOverIdx(null);
    };
    const handleDragEnd = () => { setPromoDragIdx(null); setPromoDragOverIdx(null); };
    const toggleCatActive = (catId) => setPromoCategories(prev => prev.map(c => c.id === catId ? { ...c, active: !c.active } : c));
    const deleteCat = (catId) => setPromoCategories(prev => prev.filter(c => c.id !== catId));
    const deleteItem = (catId, itemId) => setPromoCategories(prev => prev.map(c => c.id === catId ? { ...c, items: c.items.filter(i => i.id !== itemId) } : c));
    const openAddCat = () => { setPromoDraft({ name: "", color: COLORS[promoCategories.length % COLORS.length], active: true }); setPromoDrawer({ mode: "add-cat" }); };
    const openEditCat = (cat) => { setPromoDraft({ ...cat }); setPromoDrawer({ mode: "edit-cat", catId: cat.id }); };
    const openAddItem = (catId) => { setPromoDraft({ title: "", desc: "", badge: "" }); setPromoDrawer({ mode: "add-item", catId }); };
    const openEditItem = (catId, item) => { setPromoDraft({ ...item }); setPromoDrawer({ mode: "edit-item", catId, itemId: item.id }); };
    const saveDrawer = () => {
      const { mode, catId, itemId } = promoDrawer || {};
      if (mode === "add-cat") { const maxP = promoCategories.reduce((m, c) => Math.max(m, c.priority), 0); setPromoCategories(prev => [...prev, { id: `pc-${Date.now()}`, ...promoDraft, priority: maxP + 1, items: [] }]); }
      else if (mode === "edit-cat") { setPromoCategories(prev => prev.map(c => c.id === catId ? { ...c, name: promoDraft.name, color: promoDraft.color, active: promoDraft.active, templateId: promoDraft.templateId } : c)); }
      else if (mode === "add-item") { setPromoCategories(prev => prev.map(c => c.id === catId ? { ...c, items: [...c.items, { id: `pi-${Date.now()}`, ...promoDraft }] } : c)); }
      else if (mode === "edit-item") { setPromoCategories(prev => prev.map(c => c.id === catId ? { ...c, items: c.items.map(i => i.id === itemId ? { ...i, ...promoDraft } : i) } : c)); }
      setPromoDrawer(null); setPromoDraft({});
    };

    const fieldStyle = { width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13 };
    const labelStyle = { display: "block", fontSize: T.fontXs, fontWeight: 600, color: C.textSoft, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" };

    return (
      <div style={{ padding: "28px 32px 60px", fontFamily: "'Roboto', sans-serif" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: T.fontXl, fontWeight: 600, color: C.text, letterSpacing: "-0.015em", marginBottom: 4 }}>Promotions & Campaigns</h1>
            <p style={{ fontSize: 13, color: C.textSoft }}>Manage promotion categories and commission templates for the News Feed.</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 2, borderBottom: `1px solid ${C.border}`, marginBottom: 22 }}>
          {[{ id: "categories", label: "Categories & Items" }, { id: "templates", label: "Templates" }].map(t => {
            const a = promoTab === t.id;
            return (
              <button key={t.id} onClick={() => setPromoTab(t.id)} className="smooth" style={{
                padding: "10px 18px", background: "transparent", fontSize: 13,
                fontWeight: a ? 600 : 500, color: a ? C.primary : C.textSoft,
                border: "none", cursor: "pointer", marginBottom: -1,
                borderBottom: a ? `2px solid ${C.primary}` : "2px solid transparent",
              }}>{t.label}</button>
            );
          })}
        </div>

        {/* ══ CATEGORIES TAB ══ */}
        {promoTab === "categories" && (
          <>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
              <button onClick={openAddCat} className="smooth" style={{ padding: "9px 18px", borderRadius: 8, background: C.primary, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Plus size={14} /> Add Category</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {sorted.map((cat, idx) => {
                const isExpanded = expandedCat === cat.id;
                const isDragging = promoDragIdx === idx;
                const isDragOver = promoDragOverIdx === idx && promoDragIdx !== idx;
                return (
                  <div
                    key={cat.id}
                    draggable
                    onDragStart={() => handleDragStart(idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDrop={() => handleDrop(idx)}
                    onDragEnd={handleDragEnd}
                    style={{
                      background: C.surface,
                      border: `1px solid ${isDragOver ? C.primary : C.border}`,
                      borderRadius: idx === 0 ? "12px 12px 0 0" : idx === sorted.length - 1 ? "0 0 12px 12px" : 0,
                      borderTop: idx > 0 ? "none" : undefined,
                      overflow: "hidden",
                      opacity: isDragging ? 0.5 : 1,
                      transition: "opacity 0.15s, border-color 0.15s",
                      borderTopWidth: isDragOver ? 2 : undefined,
                      borderTopStyle: isDragOver ? "solid" : undefined,
                      borderTopColor: isDragOver ? C.primary : undefined,
                    }}
                  >
                    <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                      {/* Drag handle */}
                      <div style={{ cursor: "grab", color: C.textVerySoft, display: "flex", alignItems: "center", padding: "4px 0" }}>
                        <GripVertical size={16} />
                      </div>
                      <div style={{ width: 24, height: 24, borderRadius: 6, background: `${cat.color}18`, color: cat.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>{cat.priority}</div>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: cat.color, flexShrink: 0 }} />
                      <button onClick={() => setExpandedCat(isExpanded ? null : cat.id)} style={{ flex: 1, textAlign: "left", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: cat.active ? C.text : C.textSoft, textDecoration: cat.active ? "none" : "line-through" }}>{cat.name}</div>
                        <div style={{ fontSize: 11.5, color: C.textSoft, marginTop: 1, display: "flex", alignItems: "center", gap: 6 }}>
                          {cat.items.length} {cat.items.length === 1 ? "item" : "items"}
                          {cat.templateId && (() => { const t = commTemplates.find(tp => tp.id === cat.templateId); return t ? <span style={{ fontSize: T.fontXs, fontWeight: 600, padding: "1px 6px", borderRadius: 4, background: C.primary10, color: C.primary }}>{t.name}</span> : null; })()}
                        </div>
                      </button>
                      <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 11.5, color: C.textSoft }}>
                        <input type="checkbox" checked={cat.active} onChange={() => toggleCatActive(cat.id)} style={{ accentColor: C.primary, width: 15, height: 15 }} />{cat.active ? "Active" : "Off"}
                      </label>
                      <button onClick={() => openEditCat(cat)} style={{ background: "transparent", border: "none", cursor: "pointer", color: C.textSoft, padding: 4 }}><Edit2 size={14} /></button>
                      <button onClick={() => deleteCat(cat.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: C.textVerySoft, padding: 4 }}><Trash2 size={14} /></button>
                      <button onClick={() => setExpandedCat(isExpanded ? null : cat.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: C.textMid, padding: 4 }}>{isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>
                    </div>
                    {isExpanded && (
                      <div style={{ padding: "0 18px 14px 72px", borderTop: `1px solid ${C.divider}` }}>
                        {cat.items.length === 0 ? (
                          <div style={{ padding: "16px 0", fontSize: 12.5, color: C.textSoft, textAlign: "center" }}>No items yet.</div>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
                            {cat.items.map(item => (
                              <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 9, background: C.bg, border: `1px solid ${C.border}` }}>
                                {item.badge && <span style={{ fontSize: T.fontXs, fontWeight: 700, padding: "2px 8px", borderRadius: T.radFull, background: `${cat.color}14`, color: cat.color }}>{item.badge}</span>}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ fontSize: T.fontBase, fontWeight: 600, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                                  {item.desc && <div style={{ fontSize: 11.5, color: C.textSoft, marginTop: 2 }}>{item.desc}</div>}
                                </div>
                                <button onClick={() => openEditItem(cat.id, item)} style={{ background: "transparent", border: "none", cursor: "pointer", color: C.textSoft, padding: 4 }}><Edit2 size={13} /></button>
                                <button onClick={() => deleteItem(cat.id, item.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: C.textVerySoft, padding: 4 }}><Trash2 size={13} /></button>
                              </div>
                            ))}
                          </div>
                        )}
                        <button onClick={() => openAddItem(cat.id)} className="smooth" style={{ marginTop: 10, padding: "8px 16px", borderRadius: 8, background: "transparent", border: `1px dashed ${C.border}`, color: C.textSoft, fontSize: 12.5, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, width: "100%", justifyContent: "center" }}><Plus size={13} /> Add item</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ══ TEMPLATES TAB — Commission Template Builder ══ */}
        {promoTab === "templates" && (() => {
          // Merge built-in + custom template types
          const allTplTypes = [...TEMPLATE_TYPES, ...customTplTypes];
          const allPlaceholders = { ...TEMPLATE_PLACEHOLDERS };
          const allSamples = { ...TEMPLATE_SAMPLE };
          customTplTypes.forEach(ct => {
            allPlaceholders[ct.id] = ct.fields.map(f => ({ key: f.key, label: f.label, fieldType: f.type }));
            const sample = {};
            ct.fields.forEach(f => { sample[f.key] = f.sample || ""; });
            allSamples[ct.id] = sample;
            // Auto-create a template for this custom type if not exists
            if (!commTemplates.find(t => t.type === ct.id)) {
              const titleField = ct.fields[0]?.key || "item_title";
              const subField = ct.fields[1]?.key || "";
              commTemplates.push({
                id: `tpl-${ct.id}`, type: ct.id, name: ct.label, isDefault: true,
                statusLabel: `{{item_count}} ${ct.label.toUpperCase()}S`,
                mainHeader: ct.label, cardTitle: `{{${titleField}}}`,
                cardSubtitle: subField ? `{{${subField}}}` : "",
                dateLine: "", badgeText: "{{badge}}", amountText: "", ctaText: "View all",
              });
            }
          });

          const tpl = commTemplates.find(t => t.type === editingTplType);
          const placeholders = allPlaceholders[editingTplType] || [];
          const entries = tplEntries[editingTplType] || [];
          const isAdding = tplAddingTo === editingTplType;
          const resolvePlaceholders = (text, data) => {
            if (!text) return "\u2014";
            return text.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] || "\u2014");
          };
          const typeInfo = allTplTypes.find(tt => tt.id === editingTplType);
          const accentColor = typeInfo?.color || "#64748B";

          // Field type options for custom templates
          const FIELD_TYPES = [
            { id: "text", label: "Text" },
            { id: "number", label: "Number" },
            { id: "date", label: "Date" },
            { id: "time", label: "Time" },
            { id: "url", label: "URL" },
            { id: "textarea", label: "Long Text" },
            { id: "email", label: "Email" },
            { id: "select", label: "Dropdown" },
          ];

          const TPLCOLORS = ["#6366F1","#EC4899","#14B8A6","#F97316","#8B5CF6","#06B6D4","#D946EF","#84CC16","#EF4444","#0EA5E9"];

          const addFieldToDraft = () => {
            const lbl = newFieldDraft.label.trim();
            if (!lbl) return;
            const key = lbl.toLowerCase().replace(/[^a-z0-9]+/g, "_");
            const newField = { label: lbl, type: newFieldDraft.type, key, sample: "" };
            setNewTplDraft(prev => ({ ...prev, fields: [...prev.fields, newField] }));
            setNewFieldDraft({ label: "", type: "text" });
          };

          const removeFieldFromDraft = (idx) => {
            setNewTplDraft(d => ({ ...d, fields: d.fields.filter((_, i) => i !== idx) }));
          };

          const saveCustomTemplate = () => {
            if (!newTplDraft.name.trim() || newTplDraft.fields.length === 0) return;
            const typeId = `custom-${Date.now()}`;
            const newType = {
              id: typeId, label: newTplDraft.name.trim(), color: newTplDraft.color,
              fields: newTplDraft.fields,
            };
            setCustomTplTypes(prev => [...prev, newType]);
            setEditingTplType(typeId);
            setShowCreateTpl(false);
            setNewTplDraft({ name: "", color: "#6366F1", fields: [] });
          };

          const saveNewEntry = () => {
            const filled = placeholders.every(p => tplNewEntry[p.key]?.trim());
            setTplEntries(prev => ({
              ...prev,
              [editingTplType]: [...(prev[editingTplType] || []), { id: `te-${Date.now()}`, data: { ...tplNewEntry }, completed: filled }],
            }));
            setTplNewEntry({});
            setTplAddingTo(null);
          };

          const deleteEntry = (entryId) => {
            setTplEntries(prev => ({
              ...prev,
              [editingTplType]: (prev[editingTplType] || []).filter(e => e.id !== entryId),
            }));
          };

          // Preview card renderer
          const PreviewCard = ({ data }) => {
            const r = (field) => resolvePlaceholders(tpl?.[field] || "", data);
            return (
              <div style={{ background: C.surface, borderRadius: T.radMd, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                <div style={{ padding: "9px 12px", background: `${accentColor}0A`, borderBottom: `1px solid ${accentColor}1A` }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.06em", color: accentColor, textTransform: "uppercase" }}>{r("statusLabel")}</span>
                    <Briefcase size={10} color={accentColor} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{r("mainHeader")}</div>
                </div>
                <div style={{ padding: "8px 10px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.text }}>{r("cardTitle")}</div>
                      <div style={{ fontSize: 9.5, color: C.textSoft, marginTop: 1 }}>{r("cardSubtitle")}</div>
                    </div>
                    {r("amountText") !== "\u2014" && r("amountText") && <div style={{ fontSize: 12, fontWeight: 800, color: accentColor }}>{r("amountText")}</div>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9, color: C.textSoft, marginTop: 5 }}>
                    {r("dateLine") !== "\u2014" && <><Clock size={9} /> {r("dateLine")}</>}
                    {r("badgeText") !== "\u2014" && <span style={{ marginLeft: "auto", fontSize: 8, fontWeight: 700, padding: "1px 5px", borderRadius: 3, background: `${accentColor}10`, color: accentColor }}>{r("badgeText")}</span>}
                  </div>
                </div>
              </div>
            );
          };

          return (
            <div>
              {/* Type tabs */}
              <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
                {allTplTypes.map(tt => {
                  const count = (tplEntries[tt.id] || []).length;
                  const active = editingTplType === tt.id;
                  return (
                    <button key={tt.id} onClick={() => { setEditingTplType(tt.id); setTplAddingTo(null); setTplNewEntry({}); setShowCreateTpl(false); }} className="smooth" style={{
                      padding: "7px 16px", borderRadius: T.radFull, fontSize: 12.5, fontWeight: active ? 600 : 500, cursor: "pointer",
                      background: active ? `${tt.color}14` : "transparent",
                      color: active ? tt.color : C.textSoft,
                      border: `1.5px solid ${active ? `${tt.color}40` : C.border}`,
                      display: "flex", alignItems: "center", gap: 6,
                    }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: tt.color }} />
                      {tt.label}
                      {count > 0 && <span style={{ fontSize: T.fontXs, fontWeight: 700, padding: "0 5px", borderRadius: T.radFull, background: `${tt.color}18`, color: tt.color }}>{count}</span>}
                    </button>
                  );
                })}
                <button onClick={() => setShowCreateTpl(true)} className="smooth" style={{
                  padding: "7px 16px", borderRadius: T.radFull, fontSize: 12.5, fontWeight: 500, cursor: "pointer",
                  background: "transparent", border: `1.5px dashed ${C.border}`, color: C.textSoft,
                  display: "flex", alignItems: "center", gap: 5,
                }}><Plus size={13} /> Create Template</button>
              </div>

              {/* ── Create Custom Template Form ── */}
              {showCreateTpl && (
                <div style={{ background: C.surface, borderRadius: T.radLg, border: `2px solid ${newTplDraft.color}30`, padding: "22px 24px", marginBottom: 20 }}>
                  <div style={{ fontSize: T.fontMd, fontWeight: 600, color: C.text, marginBottom: 16 }}>Create Custom Template</div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 14, marginBottom: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: T.fontXs, fontWeight: 600, color: C.textSoft, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>Template Name</label>
                      <input value={newTplDraft.name} onChange={e => setNewTplDraft(d => ({ ...d, name: e.target.value }))} placeholder="e.g. Visa Updates, Staff Training" style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13 }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: T.fontXs, fontWeight: 600, color: C.textSoft, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>Color</label>
                      <div style={{ display: "flex", gap: 4 }}>
                        {TPLCOLORS.map(c => (
                          <button key={c} onClick={() => setNewTplDraft(d => ({ ...d, color: c }))} style={{ width: 24, height: 24, borderRadius: "50%", background: c, border: newTplDraft.color === c ? `2.5px solid ${C.text}` : "2.5px solid transparent", cursor: "pointer" }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Fields */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ fontSize: T.fontBase, fontWeight: 600, color: C.text }}>Template Fields <span style={{ fontWeight: 400, color: C.textSoft }}>({newTplDraft.fields.length})</span></div>
                    </div>
                    {newTplDraft.fields.length > 0 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
                        {newTplDraft.fields.map((f, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 9, background: C.bg, border: `1px solid ${C.border}` }}>
                            <div style={{ width: 22, height: 22, borderRadius: 6, background: `${newTplDraft.color}14`, color: newTplDraft.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>{i + 1}</div>
                            <span style={{ fontSize: T.fontBase, fontWeight: 600, color: C.text, flex: 1 }}>{f.label}</span>
                            <span style={{ fontSize: T.fontXs, padding: "3px 10px", borderRadius: T.radFull, background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)", border: `1px solid ${C.border}`, color: C.textMid, fontWeight: 600 }}>{FIELD_TYPES.find(ft => ft.id === f.type)?.label || f.type}</span>
                            <button onClick={() => removeFieldFromDraft(i)} className="smooth" style={{ background: "transparent", border: "none", cursor: "pointer", color: C.textVerySoft, padding: 4 }} onMouseEnter={e => e.currentTarget.style.color = C.danger} onMouseLeave={e => e.currentTarget.style.color = C.textVerySoft}><Trash2 size={13} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                    {newTplDraft.fields.length === 0 && (
                      <div style={{ padding: "20px", borderRadius: T.radMd, background: C.bg, border: `1px dashed ${C.border}`, textAlign: "center", marginBottom: 12 }}>
                        <div style={{ fontSize: 12.5, color: C.textSoft }}>No fields added yet. Add fields below to define your template.</div>
                      </div>
                    )}
                    {/* Add field — inline row */}
                    <div style={{ padding: "12px 14px", borderRadius: T.radMd, background: C.bg, border: `1px solid ${C.border}` }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input value={newFieldDraft.label} onChange={e => setNewFieldDraft(d => ({ ...d, label: e.target.value }))} onKeyDown={e => { if (e.key === "Enter") addFieldToDraft(); }} placeholder="Field name (e.g. Visa Type)" style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 13 }} />
                        <select value={newFieldDraft.type} onChange={e => setNewFieldDraft(d => ({ ...d, type: e.target.value }))} style={{ width: 120, padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 12.5 }}>
                          {FIELD_TYPES.map(ft => <option key={ft.id} value={ft.id}>{ft.label}</option>)}
                        </select>
                        <button onClick={addFieldToDraft} className="smooth" style={{ padding: "8px 16px", borderRadius: 8, background: newTplDraft.color, color: "#fff", border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}><Plus size={12} style={{ verticalAlign: "middle", marginRight: 3 }} />Add</button>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <button onClick={() => { setShowCreateTpl(false); setNewTplDraft({ name: "", color: "#6366F1", fields: [] }); }} className="smooth" style={{ padding: "9px 16px", borderRadius: 8, background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                    <button onClick={saveCustomTemplate} disabled={!newTplDraft.name.trim() || newTplDraft.fields.length === 0} className="smooth" style={{ padding: "9px 20px", borderRadius: 8, background: (!newTplDraft.name.trim() || newTplDraft.fields.length === 0) ? C.textVerySoft : newTplDraft.color, color: "#fff", border: "none", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>Save Template</button>
                  </div>
                </div>
              )}

              {/* Template header for selected type — hidden when creating custom template */}
              {tpl && !showCreateTpl && (
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  {/* Left: entries list */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: T.fontMd, fontWeight: 600, color: C.text, marginBottom: 4 }}>{tpl.name} Template</div>
                    <div style={{ fontSize: 12.5, color: C.textSoft, marginBottom: 16 }}>{entries.length} {entries.length === 1 ? "entry" : "entries"} created</div>

                    {/* Existing entries */}
                    {entries.map((entry, idx) => (
                      <div key={entry.id} style={{ background: C.surface, borderRadius: T.radLg, border: `1px solid ${C.border}`, padding: "16px 18px", marginBottom: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 22, height: 22, borderRadius: 6, background: entry.completed ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)", color: entry.completed ? "#10B981" : "#F59E0B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              {entry.completed ? <Check size={12} strokeWidth={3} /> : <Clock size={12} />}
                            </div>
                            <span style={{ fontSize: T.fontBase, fontWeight: 600, color: C.text }}>
                              {entry.data[placeholders[0]?.key] || `Entry ${idx + 1}`}
                            </span>
                            <span style={{ fontSize: T.fontXs, fontWeight: 600, padding: "2px 8px", borderRadius: T.radFull, background: entry.completed ? "rgba(16,185,129,0.08)" : "rgba(245,158,11,0.08)", color: entry.completed ? "#10B981" : "#F59E0B" }}>
                              {entry.completed ? "Completed" : "Draft"}
                            </span>
                          </div>
                          <button onClick={() => deleteEntry(entry.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: C.textVerySoft, padding: 4 }}><Trash2 size={14} /></button>
                        </div>
                        {/* Field values as compact chips */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {placeholders.map(p => entry.data[p.key] ? (
                            <span key={p.key} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 5, background: C.bg, border: `1px solid ${C.border}`, color: C.textMid }}>
                              <span style={{ fontWeight: 600, color: C.textSoft }}>{p.label}:</span> {entry.data[p.key]}
                            </span>
                          ) : null)}
                        </div>
                      </div>
                    ))}

                    {/* Add new entry form */}
                    {isAdding ? (
                      <div style={{ background: C.surface, borderRadius: T.radLg, border: `2px solid ${accentColor}30`, padding: "18px 20px", marginBottom: 10 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 14 }}>New {tpl.name}</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                          {placeholders.filter(p => p.key !== "campaign_count" && p.key !== "item_count").map(p => {
                            const fType = p.fieldType || "text";
                            const inputType = fType === "date" ? "date" : fType === "time" ? "time" : fType === "number" ? "number" : fType === "email" ? "email" : fType === "url" ? "url" : "text";
                            return (
                            <div key={p.key}>
                              <label style={{ display: "block", fontSize: T.fontXs, fontWeight: 600, color: C.textSoft, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.label}</label>
                              {p.key === "badge" ? (
                                <div>
                                  <input value={tplNewEntry[p.key] || ""} onChange={e => setTplNewEntry(prev => ({ ...prev, [p.key]: e.target.value }))} placeholder="Type or select a badge…" style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13, marginBottom: 6 }} />
                                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                                    {["New", "Hot", "🎓", "⏰", "💰", "🔥", "⭐", "🎉", "📢", "Limited", "Featured", "Urgent"].map(b => (
                                      <button key={b} onClick={() => setTplNewEntry(prev => ({ ...prev, badge: b }))} className="smooth" style={{
                                        padding: "3px 10px", borderRadius: T.radFull, fontSize: 11, cursor: "pointer",
                                        background: tplNewEntry.badge === b ? `${accentColor}14` : (darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"),
                                        border: `1px solid ${tplNewEntry.badge === b ? `${accentColor}40` : C.border}`,
                                        color: tplNewEntry.badge === b ? accentColor : C.textMid,
                                        fontWeight: tplNewEntry.badge === b ? 600 : 400,
                                      }}>{b}</button>
                                    ))}
                                  </div>
                                </div>
                              ) : fType === "textarea" ? (
                                <textarea value={tplNewEntry[p.key] || ""} onChange={e => setTplNewEntry(prev => ({ ...prev, [p.key]: e.target.value }))} rows={3} placeholder={allSamples[editingTplType]?.[p.key] || ""} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13, resize: "vertical" }} />
                              ) : (
                                <input type={inputType} value={tplNewEntry[p.key] || ""} onChange={e => setTplNewEntry(prev => ({ ...prev, [p.key]: e.target.value }))} placeholder={allSamples[editingTplType]?.[p.key] || ""} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13 }} />
                              )}
                            </div>
                            );
                          })}
                        </div>
                        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                          <button onClick={() => { setTplAddingTo(null); setTplNewEntry({}); }} className="smooth" style={{ padding: "8px 16px", borderRadius: 8, background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                          <button onClick={saveNewEntry} className="smooth" style={{ padding: "8px 18px", borderRadius: 8, background: accentColor, color: "#fff", border: "none", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>Save {tpl.name}</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => { setTplAddingTo(editingTplType); setTplNewEntry({}); }} className="smooth" style={{
                        padding: "12px 0", borderRadius: T.radMd, width: "100%",
                        background: "transparent", border: `1.5px dashed ${C.border}`,
                        color: C.textSoft, fontSize: 13, fontWeight: 500, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      }}><Plus size={14} /> Add {tpl.name}</button>
                    )}
                  </div>

                  {/* Right: live preview */}
                  <div style={{ width: 280, flexShrink: 0, position: "sticky", top: 20 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 10 }}>Preview</div>
                    {/* Show preview of the entry being added, or last entry, or sample */}
                    <PreviewCard data={isAdding && Object.keys(tplNewEntry).length > 0 ? { ...allSamples[editingTplType], ...tplNewEntry, [editingTplType === "commission" ? "campaign_count" : "item_count"]: String(entries.length + 1) } : entries.length > 0 ? { ...entries[entries.length - 1].data, [editingTplType === "commission" ? "campaign_count" : "item_count"]: String(entries.length) } : allSamples[editingTplType] || {}} />
                    <div style={{ marginTop: 10, fontSize: 11, color: C.textSoft, lineHeight: 1.5 }}>
                      {isAdding ? "Preview updates as you type." : entries.length > 0 ? "Showing last created entry." : "Showing sample data."}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* Category drawer */}
        {promoDrawer && (
          <div onClick={() => { setPromoDrawer(null); setPromoDraft({}); }} style={{ position: "fixed", inset: 0, zIndex: 2100, background: "rgba(0,0,0,0.35)", display: "flex", justifyContent: "flex-end" }}>
            <div onClick={e => e.stopPropagation()} style={{ width: 440, maxWidth: "90vw", background: C.surface, height: "100%", display: "flex", flexDirection: "column", boxShadow: "0 0 40px rgba(0,0,0,0.2)" }}>
              <div style={{ padding: "18px 22px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 style={{ fontSize: T.fontMd, fontWeight: 600, color: C.text }}>{promoDrawer.mode === "add-cat" ? "New Category" : promoDrawer.mode === "edit-cat" ? "Edit Category" : promoDrawer.mode === "add-item" ? "New Item" : "Edit Item"}</h3>
                <button onClick={() => { setPromoDrawer(null); setPromoDraft({}); }} style={{ background: "transparent", border: "none", color: C.textMid, cursor: "pointer" }}><X size={18} /></button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
                {(promoDrawer.mode === "add-cat" || promoDrawer.mode === "edit-cat") && (
                  <>
                    <div><label style={labelStyle}>Category Name</label><input value={promoDraft.name || ""} onChange={e => setPromoDraft(d => ({ ...d, name: e.target.value }))} placeholder="e.g. New University" style={fieldStyle} /></div>
                    <div><label style={labelStyle}>Color</label>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {COLORS.map(c => (<button key={c} onClick={() => setPromoDraft(d => ({ ...d, color: c }))} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: promoDraft.color === c ? `3px solid ${C.text}` : "3px solid transparent", cursor: "pointer" }} />))}
                    </div></div>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                      <input type="checkbox" checked={promoDraft.active !== false} onChange={e => setPromoDraft(d => ({ ...d, active: e.target.checked }))} style={{ accentColor: C.primary, width: 16, height: 16 }} />
                      <span style={{ fontSize: 13, color: C.text }}>Active in News Feed</span>
                    </label>
                    <div><label style={labelStyle}>Template</label>
                    <select value={promoDraft.templateId || ""} onChange={e => setPromoDraft(d => ({ ...d, templateId: e.target.value }))} style={fieldStyle}>
                      <option value="">— No template —</option>
                      {TEMPLATE_TYPES.map(tt => {
                        const tpls = commTemplates.filter(t => t.type === tt.id);
                        return tpls.length > 0 ? (
                          <optgroup key={tt.id} label={tt.label}>
                            {tpls.map(t => <option key={t.id} value={t.id}>{t.name}{t.isDefault ? " (Default)" : ""}</option>)}
                          </optgroup>
                        ) : null;
                      })}
                    </select>
                    <div style={{ fontSize: 11, color: C.textSoft, marginTop: 4 }}>Choose how this category's card appears in the News Feed.</div>
                    </div>
                  </>
                )}
                {(promoDrawer.mode === "add-item" || promoDrawer.mode === "edit-item") && (
                  <>
                    <div><label style={labelStyle}>Title</label><input value={promoDraft.title || ""} onChange={e => setPromoDraft(d => ({ ...d, title: e.target.value }))} placeholder="e.g. London Met University" style={fieldStyle} /></div>
                    <div><label style={labelStyle}>Description</label><textarea value={promoDraft.desc || ""} onChange={e => setPromoDraft(d => ({ ...d, desc: e.target.value }))} rows={3} placeholder="Short description…" style={{ ...fieldStyle, resize: "vertical" }} /></div>
                    <div><label style={labelStyle}>Badge Label</label><input value={promoDraft.badge || ""} onChange={e => setPromoDraft(d => ({ ...d, badge: e.target.value }))} placeholder="e.g. New, Hot, 🎓" style={fieldStyle} /></div>
                  </>
                )}
              </div>
              <div style={{ padding: "14px 22px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button onClick={() => { setPromoDrawer(null); setPromoDraft({}); }} className="smooth" style={{ padding: "9px 16px", borderRadius: 8, background: "transparent", color: C.textMid, border: `1px solid ${C.border}`, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                <button onClick={saveDrawer} className="smooth" style={{ padding: "9px 18px", borderRadius: 8, background: C.primary, color: "#fff", border: "none", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>{promoDrawer.mode.startsWith("add") ? "Create" : "Save"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

function ContentPreferencesPage() {
    const TOPICS = [
      { key: "admission",      label: "Admissions" },
      { key: "intake",         label: "Intake" },
      { key: "deadline",       label: "Deadlines" },
      { key: "university",     label: "University Updates" },
      { key: "partnership",    label: "Partnerships" },
      { key: "sales",          label: "Sales Campaigns" },
      { key: "marketing",      label: "Marketing" },
      { key: "documentation",  label: "Documentation" },
      { key: "training",       label: "Training" },
      { key: "announcement",   label: "Announcements" },
      { key: "urgent",         label: "Urgent Alerts" },
      { key: "system_updates", label: "System Updates" },
      { key: "performance",    label: "Performance Update" },
      { key: "offer",          label: "Offer Letter" },
      { key: "promotion",      label: "Promotion" },
    ];
    const allTopics = [...TOPICS, ...customTopics.map(t => ({ key: `custom-${t}`, label: t, isCustom: true }))];
    const DEPTS = [
      { key: "admission", label: "Admissions", color: "#0EA5E9" },
      { key: "sales",     label: "Sales",      color: "#0A6E6F" },
      { key: "system",    label: "Management", color: "#7C3AED" },
    ];
    const allDepts = [...DEPTS, ...customDepts.map(d => ({ key: `dept-${d}`, label: d, color: "#64748B" }))];
    const toggleList = (list, key) => list.includes(key) ? list.filter(k => k !== key) : [...list, key];
    const updatePref = (field, key) => setContentPrefs(p => ({ ...p, [field]: toggleList(p[field], key) }));

    const addCustomDept = (targetField) => {
      const name = newTopicInput.trim();
      if (!name) return;
      const key = `dept-${name}`;
      if (!customDepts.includes(name)) setCustomDepts(prev => [...prev, name]);
      setContentPrefs(p => ({ ...p, [targetField]: p[targetField].includes(key) ? p[targetField] : [...p[targetField], key] }));
      setNewTopicInput("");
      setAddingTopicTo(null);
    };

    const addCustomTopic = (targetField) => {
      const name = newTopicInput.trim();
      if (!name) return;
      const key = `custom-${name}`;
      if (!customTopics.includes(name)) setCustomTopics(prev => [...prev, name]);
      setContentPrefs(p => ({ ...p, [targetField]: p[targetField].includes(key) ? p[targetField] : [...p[targetField], key] }));
      setNewTopicInput("");
      setAddingTopicTo(null);
    };

    // Build summary sentence
    const seeMoreLabels = contentPrefs.seeMore.slice(0, 3).map(k => allTopics.find(t => t.key === k)?.label || k);
    const summary = seeMoreLabels.length > 0
      ? `Your feed prioritizes ${seeMoreLabels.join(", ").toLowerCase()}${contentPrefs.seeMore.length > 3 ? ` and ${contentPrefs.seeMore.length - 3} more` : ""}.`
      : "Your feed shows all team updates equally. Select topics below to personalize.";

    // Chip component
    const Chip = ({ label, active, isCustom, accent, isMute, onClick }) => (
      <button onClick={onClick} className="smooth" style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "9px 18px", borderRadius: T.radFull,
        background: active
          ? (darkMode ? `${accent}25` : `${accent}14`)
          : (darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"),
        border: active ? `1.5px solid ${accent}50` : `1.5px solid ${darkMode ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)"}`,
        color: active ? accent : C.text,
        fontSize: 13, fontWeight: 500, cursor: "pointer",
      }}>
        {isCustom && <Edit2 size={12} />}
        {label}
        {active && !isMute && <Check size={13} strokeWidth={2.5} />}
        {active && isMute && <X size={13} strokeWidth={2.5} />}
      </button>
    );

    // Section renderer
    const Section = (title, field, accent, isMute) => {
      const isAdding = addingTopicTo === field;
      return (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: T.fontMd, fontWeight: 600, color: C.text, marginBottom: 14 }}>{title}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {allTopics.map(t => (
              <Chip
                key={t.key}
                label={t.label}
                active={contentPrefs[field].includes(t.key)}
                isCustom={t.isCustom}
                accent={accent}
                isMute={isMute}
                onClick={() => updatePref(field, t.key)}
              />
            ))}
            {/* Inline add */}
            {isAdding ? (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <input
                  value={newTopicInput}
                  onChange={e => setNewTopicInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") addCustomTopic(field); if (e.key === "Escape") { setAddingTopicTo(null); setNewTopicInput(""); } }}
                  placeholder="Type topic…"
                  autoFocus
                  style={{
                    padding: "8px 16px", borderRadius: T.radFull, fontSize: 13,
                    border: `1.5px solid ${accent}60`,
                    background: darkMode ? "rgba(255,255,255,0.04)" : "#fff",
                    color: C.text, outline: "none", width: 160,
                  }}
                />
                <button onClick={() => addCustomTopic(field)} style={{
                  padding: "8px 14px", borderRadius: T.radFull, background: accent,
                  color: "#fff", border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer",
                }}>Add</button>
                <button onClick={() => { setAddingTopicTo(null); setNewTopicInput(""); }} style={{
                  background: "transparent", border: "none", color: C.textSoft, cursor: "pointer", padding: 4,
                }}><X size={16} /></button>
              </div>
            ) : (
              <button onClick={() => { setAddingTopicTo(field); setNewTopicInput(""); }} className="smooth" style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "9px 18px", borderRadius: T.radFull,
                background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                border: `1.5px dashed ${darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
                color: C.textSoft, fontSize: 13, fontWeight: 500, cursor: "pointer",
              }}>
                <Plus size={14} /> Add
              </button>
            )}
          </div>
        </div>
      );
    };

    return (
      <div style={{ padding: "32px 36px 60px", fontFamily: "'Roboto', sans-serif" }}>
        {/* Header */}
        <h1 style={{ fontSize: T.fontXl, fontWeight: 600, color: C.text, letterSpacing: "-0.015em", marginBottom: 20 }}>Feed Preferences</h1>

        {/* Summary sentence — large, bold, Instagram-style */}
        <p style={{
          fontSize: T.fontXl, fontWeight: 700, color: C.text,
          lineHeight: 1.4, letterSpacing: "-0.02em",
          marginBottom: 36,
        }}>
          {summary}
        </p>

        {/* Topic sections — stacked vertically, chips flow horizontally */}
        {Section("What you want to see more of", "seeMore", "#10B981", false)}
        {Section("What you want to see less of", "seeLess", "#F59E0B", false)}
        {Section("Muted topics", "muted", "#EF4444", true)}

        {/* Departments */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: T.fontMd, fontWeight: 600, color: C.text, marginBottom: 14 }}>Preferred departments</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {allDepts.map(d => {
              const active = contentPrefs.preferredDepts.includes(d.key);
              return (
                <button key={d.key} onClick={() => updatePref("preferredDepts", d.key)} className="smooth" style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "9px 18px", borderRadius: T.radFull,
                  background: active
                    ? (darkMode ? `${d.color}25` : `${d.color}14`)
                    : (darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"),
                  border: active ? `1.5px solid ${d.color}50` : `1.5px solid ${darkMode ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)"}`,
                  color: active ? d.color : C.text,
                  fontSize: 13, fontWeight: 500, cursor: "pointer",
                }}>
                  {d.label}
                  {active && <Check size={13} strokeWidth={2.5} />}
                </button>
              );
            })}
            {addingTopicTo === "preferredDepts" ? (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <input value={newTopicInput} onChange={e => setNewTopicInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") addCustomDept("preferredDepts"); if (e.key === "Escape") { setAddingTopicTo(null); setNewTopicInput(""); } }}
                  placeholder="Type department…" autoFocus
                  style={{ padding: "8px 16px", borderRadius: T.radFull, fontSize: 13, border: `1.5px solid ${C.primary}60`, background: darkMode ? "rgba(255,255,255,0.04)" : "#fff", color: C.text, outline: "none", width: 160 }} />
                <button onClick={() => addCustomDept("preferredDepts")} style={{ padding: "8px 14px", borderRadius: T.radFull, background: C.primary, color: "#fff", border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Add</button>
                <button onClick={() => { setAddingTopicTo(null); setNewTopicInput(""); }} style={{ background: "transparent", border: "none", color: C.textSoft, cursor: "pointer", padding: 4 }}><X size={16} /></button>
              </div>
            ) : (
              <button onClick={() => { setAddingTopicTo("preferredDepts"); setNewTopicInput(""); }} className="smooth" style={{
                display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: T.radFull,
                background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                border: `1.5px dashed ${darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
                color: C.textSoft, fontSize: 13, fontWeight: 500, cursor: "pointer",
              }}><Plus size={14} /> Add</button>
            )}
          </div>
        </div>

        {/* Hidden departments */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: T.fontMd, fontWeight: 600, color: C.text, marginBottom: 14 }}>Hidden departments</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {allDepts.map(d => {
              const active = contentPrefs.hiddenDepts.includes(d.key);
              return (
                <button key={d.key} onClick={() => updatePref("hiddenDepts", d.key)} className="smooth" style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "9px 18px", borderRadius: T.radFull,
                  background: active
                    ? (darkMode ? "rgba(239,68,68,0.15)" : "rgba(239,68,68,0.08)")
                    : (darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"),
                  border: active ? "1.5px solid rgba(239,68,68,0.40)" : `1.5px solid ${darkMode ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)"}`,
                  color: active ? C.danger : C.text,
                  fontSize: 13, fontWeight: 500, cursor: "pointer",
                }}>
                  {d.label}
                  {active && <X size={13} strokeWidth={2.5} />}
                </button>
              );
            })}
            {addingTopicTo === "hiddenDepts" ? (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <input value={newTopicInput} onChange={e => setNewTopicInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") addCustomDept("hiddenDepts"); if (e.key === "Escape") { setAddingTopicTo(null); setNewTopicInput(""); } }}
                  placeholder="Type department…" autoFocus
                  style={{ padding: "8px 16px", borderRadius: T.radFull, fontSize: 13, border: "1.5px solid rgba(239,68,68,0.60)", background: darkMode ? "rgba(255,255,255,0.04)" : "#fff", color: C.text, outline: "none", width: 160 }} />
                <button onClick={() => addCustomDept("hiddenDepts")} style={{ padding: "8px 14px", borderRadius: T.radFull, background: C.danger, color: "#fff", border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Add</button>
                <button onClick={() => { setAddingTopicTo(null); setNewTopicInput(""); }} style={{ background: "transparent", border: "none", color: C.textSoft, cursor: "pointer", padding: 4 }}><X size={16} /></button>
              </div>
            ) : (
              <button onClick={() => { setAddingTopicTo("hiddenDepts"); setNewTopicInput(""); }} className="smooth" style={{
                display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: T.radFull,
                background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                border: `1.5px dashed ${darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
                color: C.textSoft, fontSize: 13, fontWeight: 500, cursor: "pointer",
              }}><Plus size={14} /> Add</button>
            )}
          </div>
        </div>

        {/* Priority toggle */}
        <div style={{ marginBottom: 32 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
            <input type="checkbox" checked={contentPrefs.priorityOn} onChange={e => setContentPrefs(p => ({ ...p, priorityOn: e.target.checked }))} style={{ accentColor: C.primary, width: 18, height: 18 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Always show urgent posts first</div>
              <div style={{ fontSize: 12, color: C.textSoft, marginTop: 2 }}>High-priority content appears at the top regardless of preferences.</div>
            </div>
          </label>
        </div>

        {/* Reset */}
        <button onClick={() => { setContentPrefs({ seeMore: [], seeLess: [], muted: [], preferredDepts: [], hiddenDepts: [], priorityOn: true }); setCustomTopics([]); setCustomDepts([]); }} className="smooth" style={{
          padding: "9px 20px", borderRadius: T.radFull,
          background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
          border: `1.5px solid ${darkMode ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)"}`,
          color: C.textSoft, fontSize: 13, fontWeight: 500, cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 6,
        }}>
          <RotateCcw size={13} /> Reset all
        </button>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
      {settingsSubItem === "settings-webhooks"
        ? WebhooksPage()
        : settingsSubItem === "settings-algorithm"
        ? ContentPreferencesPage()
        : settingsSubItem === "settings-promos"
        ? PromoSettingsPage()
        : renderTeamManagement()}
    </div>
  );
}
