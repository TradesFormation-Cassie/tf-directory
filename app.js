// =========================================================
// FILL THESE IN from Supabase > Project Settings > API
// =========================================================
const SUPABASE_URL = "https://vgqbdusrkwhdwkpuasvn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_3bxbelgI-B2RPfnKn07Kfg_7O3N2B8O";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Icon key -> inline SVG (stroke style, matches the card icon squares)
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
  dollar: "Dollar (Calculator-style)",
  list: "List (Guide-style)",
  tag: "Tag (Template-style)",
  link: "Link (default)",
  book: "Book (Handbook / Guide)",
  wrench: "Wrench (Tool)",
  file: "File",
  megaphone: "Megaphone (Marketing)",
  calendar: "Calendar",
  chat: "Chat bubble (AI / Simulator)",
  chart: "Bar chart (Diagnostic / Marketing)",
  shield: "Shield (Admin / Internal)",
  users: "People (Org / Team)",
  compass: "Compass (Onboarding)",
  quiz: "Clipboard check (Quiz / Certification)"
};

let allResources = [];
let editingId = null; // null = add mode, otherwise the resource id being edited

const $ = (id) => document.getElementById(id);

// ---------- God Mode state (per-tab only, via sessionStorage) ----------
function isGodMode() {
  return sessionStorage.getItem("tf_god_mode") === "true";
}
function godPassword() {
  return sessionStorage.getItem("tf_god_password") || "";
}
function setGodMode(password) {
  sessionStorage.setItem("tf_god_mode", "true");
  sessionStorage.setItem("tf_god_password", password);
}
function exitGodMode() {
  sessionStorage.removeItem("tf_god_mode");
  sessionStorage.removeItem("tf_god_password");
  renderResources(currentFiltered());
  updateGodModeUI();
}

function updateGodModeUI() {
  const btn = $("godModeBtn");
  const addBtn = $("addResourceBtn");
  if (isGodMode()) {
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path><path d="m9 15 2 2 4-4"></path></svg> God Mode: On`;
    addBtn.hidden = false;
  } else {
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> God Mode`;
    addBtn.hidden = true;
  }
}

// ---------- Fetch + render ----------
async function loadResources() {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    $("resultsCount").textContent = "Couldn't load resources";
    console.error(error);
    return;
  }
  allResources = data || [];
  renderResources(allResources);
  renderSuggestedTerms();
}

function renderSuggestedTerms() {
  const cats = [...new Set(allResources.map(r => r.category))].slice(0, 5);
  $("suggestedTerms").innerHTML = cats.map(c => `<b>${escapeHtml(c)}</b>`).join(", ");
}

function currentFiltered() {
  const q = $("searchInput").value.trim().toLowerCase();
  if (!q) return allResources;
  return allResources.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q) ||
    r.category.toLowerCase().includes(q)
  );
}

function renderResources(list) {
  const container = $("cardList");
  const empty = $("emptyState");
  const count = $("resultsCount");
  const q = $("searchInput").value.trim();

  count.textContent = q
    ? `${list.length} result${list.length === 1 ? "" : "s"} for "${q}"`
    : `${list.length} tool${list.length === 1 ? "" : "s"}`;

  if (list.length === 0) {
    container.innerHTML = "";
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  container.innerHTML = list.map(r => `
    <div class="card" data-id="${r.id}">
      <div class="card__icon">${ICONS[r.icon] || ICONS.link}</div>
      <div class="card__body">
        <div class="card__title-row">
          <h3 class="card__title">${escapeHtml(r.name)}</h3>
          <span class="badge">${escapeHtml(r.category)}</span>
        </div>
        <p class="card__desc">${escapeHtml(r.description)}</p>
        ${(r.is_internal_only || r.is_client_safe) ? `<div class="card__tags">
          ${r.is_internal_only ? '<span class="tag tag--internal">Internal use only</span>' : ""}
          ${r.is_client_safe ? '<span class="tag tag--client">Safe to send to clients</span>' : ""}
        </div>` : ""}
        ${(r.tool_username || r.tool_password) ? `<div class="card__creds">
          ${r.tool_username ? `<span class="cred-chip">User: ${escapeHtml(r.tool_username)}</span>` : ""}
          ${r.tool_password ? `<span class="cred-chip">Pass: ${escapeHtml(r.tool_password)}</span>` : ""}
        </div>` : ""}
      </div>
      <div class="card__actions">
        ${isGodMode() ? `<button class="icon-btn" data-edit="${r.id}" title="Edit" type="button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
        </button>` : ""}
        <a class="btn btn--pill-sm" href="${escapeAttr(r.url)}" target="_blank" rel="noopener">
          Visit Tool
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
      </div>
    </div>
  `).join("");

  container.querySelectorAll("[data-edit]").forEach(btn => {
    btn.addEventListener("click", () => openResourceModal(btn.dataset.edit));
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}
function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}

// ---------- Search ----------
$("searchInput").addEventListener("input", () => {
  $("clearSearch").hidden = $("searchInput").value.length === 0;
  renderResources(currentFiltered());
});
$("clearSearch").addEventListener("click", () => {
  $("searchInput").value = "";
  $("clearSearch").hidden = true;
  renderResources(currentFiltered());
});

// ---------- God Mode button / password modal ----------
$("godModeBtn").addEventListener("click", () => {
  if (isGodMode()) {
    exitGodMode();
  } else {
    $("passwordInput").value = "";
    $("passwordError").hidden = true;
    $("passwordOverlay").hidden = false;
    $("passwordInput").focus();
  }
});
$("cancelPasswordBtn").addEventListener("click", () => $("passwordOverlay").hidden = true);
$("passwordOverlay").addEventListener("click", (e) => { if (e.target.id === "passwordOverlay") $("passwordOverlay").hidden = true; });

$("submitPasswordBtn").addEventListener("click", submitPassword);
$("passwordInput").addEventListener("keydown", (e) => { if (e.key === "Enter") submitPassword(); });

function submitPassword() {
  const pw = $("passwordInput").value;
  if (pw === "SAINTCONFETTI" || pw === "SaintConfetti") {
    setGodMode(pw);
    $("passwordOverlay").hidden = true;
    updateGodModeUI();
    renderResources(currentFiltered());
  } else {
    $("passwordError").hidden = false;
  }
}

// ---------- Add / Edit resource modal ----------
function populateIconSelect() {
  const select = $("fieldIcon");
  select.innerHTML = Object.keys(ICONS).map(key =>
    `<option value="${key}">${ICON_LABELS[key]}</option>`
  ).join("");
}
populateIconSelect();

$("addResourceBtn").addEventListener("click", () => openResourceModal(null));
$("cancelResourceBtn").addEventListener("click", () => $("resourceOverlay").hidden = true);
$("resourceOverlay").addEventListener("click", (e) => { if (e.target.id === "resourceOverlay") $("resourceOverlay").hidden = true; });

function openResourceModal(id) {
  editingId = id;
  $("resourceError").hidden = true;
  if (id) {
    const r = allResources.find(x => x.id === id);
    $("resourceModalTitle").textContent = "Edit Resource";
    $("fieldName").value = r.name;
    $("fieldDescription").value = r.description;
    $("fieldUrl").value = r.url;
    $("fieldCategory").value = r.category;
    $("fieldIcon").value = r.icon;
    $("fieldUsername").value = r.tool_username || "";
    $("fieldToolPassword").value = r.tool_password || "";
    $("fieldInternal").checked = !!r.is_internal_only;
    $("fieldClientSafe").checked = !!r.is_client_safe;
    $("deleteResourceBtn").hidden = false;
  } else {
    $("resourceModalTitle").textContent = "Add a Resource";
    $("resourceForm").reset();
    $("fieldIcon").value = "link";
    $("fieldInternal").checked = false;
    $("fieldClientSafe").checked = false;
    $("deleteResourceBtn").hidden = true;
  }
  $("resourceOverlay").hidden = false;
}

$("resourceForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    p_password: godPassword(),
    p_name: $("fieldName").value.trim(),
    p_description: $("fieldDescription").value.trim(),
    p_url: $("fieldUrl").value.trim(),
    p_category: $("fieldCategory").value.trim(),
    p_icon: $("fieldIcon").value,
    p_tool_username: $("fieldUsername").value.trim() || null,
    p_tool_password: $("fieldToolPassword").value.trim() || null,
    p_is_internal_only: $("fieldInternal").checked,
    p_is_client_safe: $("fieldClientSafe").checked
  };

  $("saveResourceBtn").disabled = true;
  const { error } = editingId
    ? await supabase.rpc("gm_update_resource", { ...payload, p_id: editingId })
    : await supabase.rpc("gm_add_resource", payload);
  $("saveResourceBtn").disabled = false;

  if (error) {
    $("resourceError").textContent = error.message.includes("Incorrect password")
      ? "God Mode expired — reopen it and try again."
      : "Something went wrong saving that. Try again.";
    $("resourceError").hidden = false;
    return;
  }

  $("resourceOverlay").hidden = true;
  await loadResources();
});

$("deleteResourceBtn").addEventListener("click", async () => {
  if (!editingId) return;
  if (!confirm("Delete this resource? This can't be undone.")) return;

  const { error } = await supabase.rpc("gm_delete_resource", {
    p_password: godPassword(),
    p_id: editingId
  });

  if (error) {
    $("resourceError").textContent = "Couldn't delete that. Try again.";
    $("resourceError").hidden = false;
    return;
  }
  $("resourceOverlay").hidden = true;
  await loadResources();
});

// ---------- Init ----------
updateGodModeUI();
loadResources();
