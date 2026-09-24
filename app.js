(function () {
  if (window.__tfDirectoryLoaded) return;
  window.__tfDirectoryLoaded = true;

  const $ = (id) => document.getElementById(id);
  const SUPABASE_URL = "https://vgqbdusrkwhdwkpuasvn.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_3bxbelgI-B2RPfnKn07Kfg_7O3N2B8O";
  const SITE_PASSWORD = "TFTEAM26";
  const COACHING_API = `${SUPABASE_URL}/functions/v1/coaching-api`;

  let supabase = null;
  try {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (err) {
    console.error("Supabase failed to initialize:", err);
  }

  const ICONS = {
    dollar: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v12M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1.1-3 2.5 1.3 2.2 3 2.5c1.7.3 3 1.1 3 2.5s-1.3 2.5-3 2.5-3-1.1-3-2.5"></path></svg>',
    list: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>',
    tag: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41 11 22l-9-9 8.59-8.59A2 2 0 0 1 12 4h7a1 1 0 0 1 1 1v7a2 2 0 0 1-.41.41z"></path><circle cx="15.5" cy="7.5" r="1.5"></circle></svg>',
    link: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
    book: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
    wrench: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>',
    file: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>',
    megaphone: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 13v-2z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>',
    calendar: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
    chat: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
    chart: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>',
    shield: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
    users: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    compass: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>',
    quiz: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="m9 14 2 2 4-4"></path></svg>'
  };
  const ICON_LABELS = {
    dollar: "Dollar (Calculator-style)", list: "List (Guide-style)", tag: "Tag (Template-style)", link: "Link (default)",
    book: "Book (Handbook / Guide)", wrench: "Wrench (Tool)", file: "File", megaphone: "Megaphone (Marketing)",
    calendar: "Calendar", chat: "Chat bubble (AI / Simulator)", chart: "Bar chart (Diagnostic / Marketing)", shield: "Shield (Admin / Internal)",
    users: "People (Org / Team)", compass: "Compass (Onboarding)", quiz: "Clipboard check (Quiz / Certification)"
  };

  let mode = "tools";
  let allResources = [];
  let allCoaching = [];
  let resultsRevealed = false;
  let editingId = null;
  let editingCoachingId = null;
  let currentKeywords = [];
  let currentCoachingKeywords = [];
  let pendingUsageId = null;

  function escapeHtml(str) {
    return String(str ?? "").replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }
  function escapeAttr(str) { return String(str ?? "").replace(/"/g, "&quot;"); }
  function prettyDate(value) {
    if (!value) return "";
    const [y,m,d] = value.split("-").map(Number);
    return new Intl.DateTimeFormat("en-AU", { day:"numeric", month:"short", year:"numeric" }).format(new Date(y, m - 1, d));
  }

  async function coachingApi(action, payload = {}, admin = false) {
    const password = admin ? godPassword() : SITE_PASSWORD;
    const res = await fetch(COACHING_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY
      },
      body: JSON.stringify({ action, password, ...payload })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Something went wrong");
    return data;
  }

  function isGodMode() { return sessionStorage.getItem("tf_god_mode") === "true"; }
  function godPassword() { return sessionStorage.getItem("tf_god_password") || ""; }
  function setGodMode(password) {
    sessionStorage.setItem("tf_god_mode", "true");
    sessionStorage.setItem("tf_god_password", password);
  }
  function exitGodMode() {
    sessionStorage.removeItem("tf_god_mode");
    sessionStorage.removeItem("tf_god_password");
    updateGodModeUI();
    renderCurrent();
  }

  function updateGodModeUI() {
    const btn = $("godModeBtn");
    const bolt = '<svg width="18" height="18" viewBox="0 0 24 24" fill="ACTIVE_FILL" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>';
    if (isGodMode()) {
      btn.innerHTML = bolt.replace("ACTIVE_FILL", "currentColor");
      btn.title = "God Mode: On (click to exit)";
      btn.setAttribute("aria-label", "God Mode: On");
    } else {
      btn.innerHTML = bolt.replace("ACTIVE_FILL", "none");
      btn.title = "God Mode";
      btn.setAttribute("aria-label", "God Mode");
    }
    $("addResourceBtn").hidden = !(isGodMode() && mode === "tools");
    $("addCoachingBtn").hidden = !(isGodMode() && mode === "coaching");
  }

  function setMode(nextMode, reveal = false) {
    mode = nextMode;
    resultsRevealed = reveal;
    $("searchInput").value = "";
    $("clearSearch").hidden = true;
    $("toolsModeBtn").classList.toggle("mode-btn--active", mode === "tools");
    $("coachingModeBtn").classList.toggle("mode-btn--active", mode === "coaching");

    if (mode === "tools") {
      $("heroTitle").textContent = "FIND THE RIGHT TF TOOL";
      $("heroSubtitle").innerHTML = "Every Netlify-hosted tool, guide, and app built by and for<br>TradesFormation, all in one place.";
      $("searchInput").placeholder = "Search resources…";
      $("emptyStateText").textContent = "No resources match that search.";
      $("browseAllFooterLabel").textContent = "Browse All Tools";
    } else {
      $("heroTitle").textContent = "FIND THE RIGHT COACHING RESPONSE";
      $("heroSubtitle").innerHTML = "Search approved TradesFormation coaching responses, copy the answer,<br>and get back to coaching.";
      $("searchInput").placeholder = "Search coaching responses…";
      $("emptyStateText").textContent = "No coaching responses match that search.";
      $("browseAllFooterLabel").textContent = "Browse All Coaching Responses";
    }
    renderSuggestedTerms();
    updateGodModeUI();
    renderCurrent();
  }

  $("toolsModeBtn").addEventListener("click", () => setMode("tools", true));
  $("coachingModeBtn").addEventListener("click", () => setMode("coaching", true));
  $("browseAllFooterBtn").addEventListener("click", () => {
    resultsRevealed = true;
    $("searchInput").value = "";
    $("clearSearch").hidden = true;
    renderCurrent();
    document.querySelector(".results").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  function renderSuggestedTerms() {
    const terms = mode === "tools"
      ? ["Group Coaching Calendar", "Objections Playbook", "Coaching Packages"]
      : ["sales training", "roleplay", "Sales Gym"];
    $("suggestedTerms").innerHTML = terms.map(t => `<b>${escapeHtml(t)}</b>`).join(", ");
  }

  async function loadResources() {
    if (!supabase) return;
    try {
      const { data, error } = await supabase.rpc("get_resources", { p_password: SITE_PASSWORD });
      if (error) throw error;
      allResources = data || [];
      allResources.sort((a,b) => a.name.localeCompare(b.name, undefined, { sensitivity:"base" }));
    } catch (err) {
      console.error("Could not load resources:", err);
    }
  }

  async function loadCoaching() {
    try {
      const result = await coachingApi("list");
      allCoaching = result.data || [];
    } catch (err) {
      console.error("Could not load coaching responses:", err);
    }
  }

  async function loadAll() {
    await Promise.all([loadResources(), loadCoaching()]);
    renderSuggestedTerms();
    renderCurrent();
  }

  function currentFiltered() {
    const q = $("searchInput").value.trim().toLowerCase();
    const terms = q.split(/\s+/).filter(Boolean);
    if (mode === "tools") {
      if (!q) return allResources;
      return allResources.filter(r => {
        const haystack = [r.name, r.description, r.category, ...(Array.isArray(r.keywords) ? r.keywords : [])].join(" ").toLowerCase();
        return terms.every(term => haystack.includes(term));
      });
    }
    if (!q) return allCoaching;
    return allCoaching.filter(r => {
      const haystack = [r.question, r.response, r.category, r.developed_by, ...(Array.isArray(r.keywords) ? r.keywords : [])].join(" ").toLowerCase();
      return terms.every(term => haystack.includes(term));
    });
  }

  function renderCurrent() {
    updateGodModeUI();
    if (!resultsRevealed && !$('searchInput').value.trim()) {
      document.querySelector(".results").hidden = true;
      $("cardList").innerHTML = "";
      return;
    }
    const list = currentFiltered();
    if (mode === "tools") renderResources(list); else renderCoaching(list);
  }

  function renderResources(list) {
    document.querySelector(".results").hidden = false;
    const q = $("searchInput").value.trim();
    $("resultsCount").textContent = q ? `${list.length} result${list.length === 1 ? "" : "s"} for "${q}"` : `${list.length} tool${list.length === 1 ? "" : "s"}`;
    $("emptyState").hidden = list.length !== 0;
    if (!list.length) { $("cardList").innerHTML = ""; return; }

    $("cardList").innerHTML = list.map(r => `
      <div class="card" data-id="${r.id}">
        <div class="card__icon">${ICONS[r.icon] || ICONS.link}</div>
        <div class="card__body">
          <div class="card__title-row"><h3 class="card__title">${escapeHtml(r.name)}</h3><span class="badge">${escapeHtml(r.category)}</span></div>
          <p class="card__desc">${escapeHtml(r.description)}</p>
          ${(r.is_internal_only || r.is_client_safe || r.is_client_specific) ? `<div class="card__tags">
            ${r.is_internal_only ? '<span class="tag tag--internal">Internal use only</span>' : ""}
            ${r.is_client_safe ? '<span class="tag tag--client">Safe to send to clients</span>' : ""}
            ${r.is_client_specific ? '<span class="tag tag--client-specific">Client-specific</span>' : ""}
          </div>` : ""}
          ${(r.tool_username || r.tool_password) ? `<div class="card__creds">
            ${r.tool_username ? `<span class="cred-chip">User: ${escapeHtml(r.tool_username)}</span>` : ""}
            ${r.tool_password ? `<span class="cred-chip">Pass: ${escapeHtml(r.tool_password)}</span>` : ""}
          </div>` : ""}
        </div>
        <div class="card__actions">
          ${isGodMode() ? `<button class="icon-btn" data-edit-resource="${r.id}" title="Edit" type="button"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button>` : ""}
          <a class="btn btn--pill-sm" href="${escapeAttr(r.url)}" target="_blank" rel="noopener">Visit Tool <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></a>
        </div>
      </div>`).join("");
    document.querySelectorAll("[data-edit-resource]").forEach(btn => btn.addEventListener("click", () => openResourceModal(btn.dataset.editResource)));
  }

  function renderCoaching(list) {
    document.querySelector(".results").hidden = false;
    const q = $("searchInput").value.trim();
    $("resultsCount").textContent = q ? `${list.length} result${list.length === 1 ? "" : "s"} for "${q}"` : `${list.length} coaching response${list.length === 1 ? "" : "s"}`;
    $("emptyState").hidden = list.length !== 0;
    if (!list.length) { $("cardList").innerHTML = ""; return; }

    $("cardList").innerHTML = list.map(r => `
      <article class="card coaching-card" data-id="${r.id}">
        <div class="coaching-card__body">
          <div class="card__title-row"><h3 class="coaching-card__question">${escapeHtml(r.question)}</h3><span class="badge">${escapeHtml(r.category)}</span></div>
          <div class="coaching-card__meta">
            <span class="coaching-card__meta-text">Developed by <strong>${escapeHtml(r.developed_by)}</strong></span>
            <span class="coaching-card__meta-text">•</span>
            <span class="coaching-card__meta-text">${escapeHtml(prettyDate(r.developed_date))}</span>
          </div>
          <div class="coaching-card__response is-collapsed" id="response-${r.id}">${escapeHtml(r.response)}</div>
          <div class="coaching-card__footer">
            <div>
              <div class="coaching-card__usage" id="usage-${r.id}">Used ${Number(r.usage_count || 0)} time${Number(r.usage_count || 0) === 1 ? "" : "s"}</div>
              <button type="button" class="text-btn" data-expand-coaching="${r.id}">View full response</button>
            </div>
            <div class="coaching-card__buttons">
              ${isGodMode() ? `<button class="icon-btn" data-edit-coaching="${r.id}" title="Edit" type="button"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button>` : ""}
              <button class="btn btn--pill-sm" type="button" data-copy-coaching="${r.id}">Copy Response</button>
            </div>
          </div>
        </div>
      </article>`).join("");

    document.querySelectorAll("[data-expand-coaching]").forEach(btn => btn.addEventListener("click", () => {
      const el = $(`response-${btn.dataset.expandCoaching}`);
      const collapsed = el.classList.toggle("is-collapsed");
      btn.textContent = collapsed ? "View full response" : "Show less";
    }));
    document.querySelectorAll("[data-copy-coaching]").forEach(btn => btn.addEventListener("click", () => copyCoachingResponse(btn.dataset.copyCoaching, btn)));
    document.querySelectorAll("[data-edit-coaching]").forEach(btn => btn.addEventListener("click", () => openCoachingModal(btn.dataset.editCoaching)));
  }

  $("searchInput").addEventListener("input", () => {
    $("clearSearch").hidden = $("searchInput").value.length === 0;
    if ($("searchInput").value.trim().length) resultsRevealed = true;
    renderCurrent();
  });
  $("clearSearch").addEventListener("click", () => {
    $("searchInput").value = "";
    $("clearSearch").hidden = true;
    renderCurrent();
  });

  async function copyCoachingResponse(id, button) {
    const item = allCoaching.find(x => x.id === id);
    if (!item) return;
    try {
      await navigator.clipboard.writeText(item.response);
      const original = button.textContent;
      button.textContent = "Copied ✓";
      button.classList.add("copy-success");
      setTimeout(() => { button.textContent = original; button.classList.remove("copy-success"); }, 1400);
      pendingUsageId = id;
      $("usageOverlay").hidden = false;
    } catch (err) {
      alert("Couldn't copy that response. Please try again.");
    }
  }

  $("usageNoBtn").addEventListener("click", () => { pendingUsageId = null; $("usageOverlay").hidden = true; });
  $("usageOverlay").addEventListener("click", e => { if (e.target.id === "usageOverlay") { pendingUsageId = null; $("usageOverlay").hidden = true; } });
  $("usageYesBtn").addEventListener("click", async () => {
    if (!pendingUsageId) return;
    const id = pendingUsageId;
    $("usageYesBtn").disabled = true;
    try {
      const result = await coachingApi("increment", { id });
      const item = allCoaching.find(x => x.id === id);
      if (item) item.usage_count = result.usage_count;
      const label = $(`usage-${id}`);
      if (label) label.textContent = `Used ${result.usage_count} time${result.usage_count === 1 ? "" : "s"}`;
    } catch (err) {
      console.error("Could not record coaching usage:", err);
    } finally {
      $("usageYesBtn").disabled = false;
      pendingUsageId = null;
      $("usageOverlay").hidden = true;
    }
  });

  // ---------- God Mode ----------
  $("godModeBtn").addEventListener("click", () => {
    if (isGodMode()) return exitGodMode();
    $("passwordInput").value = "";
    $("passwordError").hidden = true;
    $("passwordOverlay").hidden = false;
    $("passwordInput").focus();
  });
  $("cancelPasswordBtn").addEventListener("click", () => $("passwordOverlay").hidden = true);
  $("passwordOverlay").addEventListener("click", e => { if (e.target.id === "passwordOverlay") $("passwordOverlay").hidden = true; });
  $("submitPasswordBtn").addEventListener("click", submitPassword);
  $("passwordInput").addEventListener("keydown", e => { if (e.key === "Enter") submitPassword(); });
  $("togglePasswordBtn").addEventListener("click", () => togglePassword("passwordInput", "togglePasswordBtn"));
  $("siteLoginToggle").addEventListener("click", () => togglePassword("siteLoginPassword", "siteLoginToggle"));

  function togglePassword(inputId, buttonId) {
    const input = $(inputId); const btn = $(buttonId); const showing = input.type === "text";
    input.type = showing ? "password" : "text";
    btn.setAttribute("aria-label", showing ? "Show password" : "Hide password");
  }
  function submitPassword() {
    const pw = $("passwordInput").value;
    if (pw === "SAINTCONFETTI" || pw === "SaintConfetti") {
      setGodMode(pw); $("passwordOverlay").hidden = true; updateGodModeUI(); renderCurrent();
    } else $("passwordError").hidden = false;
  }

  // ---------- Tool admin ----------
  function renderKeywordChips() {
    $("keywordChips").innerHTML = currentKeywords.map((k,i) => `<span class="keyword-chip">${escapeHtml(k)}<button type="button" data-remove-keyword="${i}" aria-label="Remove ${escapeAttr(k)}">×</button></span>`).join("");
    document.querySelectorAll("[data-remove-keyword]").forEach(btn => btn.addEventListener("click", () => { currentKeywords.splice(Number(btn.dataset.removeKeyword),1); renderKeywordChips(); }));
  }
  function addKeywordFromInput() {
    const input = $("fieldKeywordInput"); const val = input.value.trim(); if (!val) return;
    if (!currentKeywords.some(k => k.toLowerCase() === val.toLowerCase())) currentKeywords.push(val);
    input.value = ""; renderKeywordChips(); input.focus();
  }
  $("addKeywordBtn").addEventListener("click", addKeywordFromInput);
  $("fieldKeywordInput").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); addKeywordFromInput(); } });
  $("fieldIcon").innerHTML = Object.keys(ICONS).map(key => `<option value="${key}">${ICON_LABELS[key]}</option>`).join("");
  $("addResourceBtn").addEventListener("click", () => openResourceModal(null));
  $("cancelResourceBtn").addEventListener("click", () => $("resourceOverlay").hidden = true);
  $("resourceOverlay").addEventListener("click", e => { if (e.target.id === "resourceOverlay") $("resourceOverlay").hidden = true; });

  function openResourceModal(id) {
    editingId = id; $("resourceError").hidden = true;
    if (id) {
      const r = allResources.find(x => x.id === id); if (!r) return;
      $("resourceModalTitle").textContent = "Edit Resource";
      $("fieldName").value = r.name; $("fieldDescription").value = r.description; $("fieldUrl").value = r.url; $("fieldCategory").value = r.category; $("fieldIcon").value = r.icon;
      $("fieldUsername").value = r.tool_username || ""; $("fieldToolPassword").value = r.tool_password || "";
      $("fieldInternal").checked = !!r.is_internal_only; $("fieldClientSafe").checked = !!r.is_client_safe; $("fieldClientSpecific").checked = !!r.is_client_specific;
      currentKeywords = Array.isArray(r.keywords) ? [...r.keywords] : []; $("deleteResourceBtn").hidden = false;
    } else {
      $("resourceModalTitle").textContent = "Add a Resource"; $("resourceForm").reset(); $("fieldIcon").value = "link"; currentKeywords = []; $("deleteResourceBtn").hidden = true;
    }
    renderKeywordChips(); $("resourceOverlay").hidden = false;
  }

  $("resourceForm").addEventListener("submit", async e => {
    e.preventDefault();
    const payload = { p_password:godPassword(), p_name:$("fieldName").value.trim(), p_description:$("fieldDescription").value.trim(), p_url:$("fieldUrl").value.trim(), p_category:$("fieldCategory").value.trim(), p_icon:$("fieldIcon").value, p_tool_username:$("fieldUsername").value.trim() || null, p_tool_password:$("fieldToolPassword").value.trim() || null, p_is_internal_only:$("fieldInternal").checked, p_is_client_safe:$("fieldClientSafe").checked, p_is_client_specific:$("fieldClientSpecific").checked, p_keywords:currentKeywords };
    $("saveResourceBtn").disabled = true;
    const { error } = editingId ? await supabase.rpc("gm_update_resource", { ...payload, p_id:editingId }) : await supabase.rpc("gm_add_resource", payload);
    $("saveResourceBtn").disabled = false;
    if (error) { $("resourceError").textContent = "Something went wrong saving that. Try again."; $("resourceError").hidden = false; return; }
    $("resourceOverlay").hidden = true; await loadResources(); renderCurrent();
  });
  $("deleteResourceBtn").addEventListener("click", async () => {
    if (!editingId || !confirm("Delete this resource? This can't be undone.")) return;
    const { error } = await supabase.rpc("gm_delete_resource", { p_password:godPassword(), p_id:editingId });
    if (error) { $("resourceError").textContent = "Couldn't delete that. Try again."; $("resourceError").hidden = false; return; }
    $("resourceOverlay").hidden = true; await loadResources(); renderCurrent();
  });

  // ---------- Coaching admin ----------
  function renderCoachingKeywordChips() {
    $("coachingKeywordChips").innerHTML = currentCoachingKeywords.map((k,i) => `<span class="keyword-chip">${escapeHtml(k)}<button type="button" data-remove-coaching-keyword="${i}" aria-label="Remove ${escapeAttr(k)}">×</button></span>`).join("");
    document.querySelectorAll("[data-remove-coaching-keyword]").forEach(btn => btn.addEventListener("click", () => { currentCoachingKeywords.splice(Number(btn.dataset.removeCoachingKeyword),1); renderCoachingKeywordChips(); }));
  }
  function addCoachingKeyword() {
    const input = $("coachingKeywordInput"); const val = input.value.trim(); if (!val) return;
    if (!currentCoachingKeywords.some(k => k.toLowerCase() === val.toLowerCase())) currentCoachingKeywords.push(val);
    input.value = ""; renderCoachingKeywordChips(); input.focus();
  }
  $("addCoachingKeywordBtn").addEventListener("click", addCoachingKeyword);
  $("coachingKeywordInput").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); addCoachingKeyword(); } });
  $("addCoachingBtn").addEventListener("click", () => openCoachingModal(null));
  $("cancelCoachingBtn").addEventListener("click", () => $("coachingOverlay").hidden = true);
  $("coachingOverlay").addEventListener("click", e => { if (e.target.id === "coachingOverlay") $("coachingOverlay").hidden = true; });

  function openCoachingModal(id) {
    editingCoachingId = id; $("coachingError").hidden = true;
    if (id) {
      const r = allCoaching.find(x => x.id === id); if (!r) return;
      $("coachingModalTitle").textContent = "Edit Coaching Response";
      $("coachingQuestion").value = r.question; $("coachingResponse").value = r.response; $("coachingDeveloper").value = r.developed_by; $("coachingDate").value = r.developed_date; $("coachingCategory").value = r.category;
      currentCoachingKeywords = Array.isArray(r.keywords) ? [...r.keywords] : []; $("archiveCoachingBtn").hidden = false;
    } else {
      $("coachingModalTitle").textContent = "Add a Coaching Response"; $("coachingForm").reset(); $("coachingDate").value = new Date().toISOString().slice(0,10); currentCoachingKeywords = []; $("archiveCoachingBtn").hidden = true;
    }
    renderCoachingKeywordChips(); $("coachingOverlay").hidden = false;
  }

  $("coachingForm").addEventListener("submit", async e => {
    e.preventDefault();
    const item = { id: editingCoachingId || undefined, question:$("coachingQuestion").value.trim(), response:$("coachingResponse").value.trim(), developed_by:$("coachingDeveloper").value.trim(), developed_date:$("coachingDate").value, category:$("coachingCategory").value.trim(), keywords:currentCoachingKeywords };
    $("saveCoachingBtn").disabled = true;
    try {
      await coachingApi("save", { item }, true); $("coachingOverlay").hidden = true; await loadCoaching(); resultsRevealed = true; renderCurrent();
    } catch (err) {
      $("coachingError").textContent = err.message.includes("password") ? "God Mode expired. Reopen it and try again." : "Something went wrong saving that. Try again."; $("coachingError").hidden = false;
    } finally { $("saveCoachingBtn").disabled = false; }
  });
  $("archiveCoachingBtn").addEventListener("click", async () => {
    if (!editingCoachingId || !confirm("Archive this coaching response? It will disappear from search results.")) return;
    try { await coachingApi("archive", { id:editingCoachingId }, true); $("coachingOverlay").hidden = true; await loadCoaching(); renderCurrent(); }
    catch (err) { $("coachingError").textContent = "Couldn't archive that response. Try again."; $("coachingError").hidden = false; }
  });

  // ---------- Site password gate ----------
  const SITE_ACCESS_KEY = "tf_site_access";
  function hasSiteAccess() { return localStorage.getItem(SITE_ACCESS_KEY) === SITE_PASSWORD || sessionStorage.getItem(SITE_ACCESS_KEY) === SITE_PASSWORD; }
  function grantSiteAccess(remember) {
    sessionStorage.setItem(SITE_ACCESS_KEY, SITE_PASSWORD);
    if (remember) localStorage.setItem(SITE_ACCESS_KEY, SITE_PASSWORD); else localStorage.removeItem(SITE_ACCESS_KEY);
    $("siteLoginOverlay").hidden = true; updateGodModeUI(); loadAll();
  }
  function submitSiteLogin() {
    const pw = $("siteLoginPassword").value;
    if (pw === SITE_PASSWORD) grantSiteAccess($("siteLoginRemember").checked); else $("siteLoginError").hidden = false;
  }
  $("siteLoginSubmit").addEventListener("click", submitSiteLogin);
  $("siteLoginPassword").addEventListener("keydown", e => { if (e.key === "Enter") submitSiteLogin(); });
  $("siteLoginPassword").addEventListener("input", () => $("siteLoginError").hidden = true);

  updateGodModeUI();
  renderSuggestedTerms();
  if (hasSiteAccess()) { $("siteLoginOverlay").hidden = true; loadAll(); }
  else $("siteLoginPassword").focus();
})();
