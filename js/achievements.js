// js/achievements.js
const ACH_KEY = "hevanx_achievements_v1";

const ACHIEVEMENTS = [
  { id: "nav_home",   name: "Welcome Home",      desc: " " },
  { id: "nav_music",  name: "Audiophile",        desc: " " },
  { id: "nav_video",  name: "Director",          desc: " " },
  { id: "profile_view", name: "First Steps",     desc: " " },
  { id: "profile_edit", name: "Editor",          desc: " " },
  { id: "profile_pic",  name: "Make It Yours",   desc: " " },
  { id: "social_click", name: "Social Butterfly",desc: " " },
  { id: "signup_click", name: "Initiate",        desc: " " },
];

function loadSet() {
  try {
    return new Set(JSON.parse(localStorage.getItem(ACH_KEY)) || []);
  } catch { return new Set(); }
}
function saveSet(set) {
  localStorage.setItem(ACH_KEY, JSON.stringify([...set]));
}

function getUnlocked() {
  return loadSet();
}
function isUnlocked(id) {
  return loadSet().has(id);
}

function unlock(id) {
  const set = loadSet();
  if (!set.has(id)) {
    set.add(id);
    saveSet(set);
    try {
      const el = document.createElement("div");
      el.textContent = `Achievement unlocked: ${ACHIEVEMENTS.find(a=>a.id===id)?.name || id}`;
      el.style.cssText = "position:fixed;left:50%;top:20px;transform:translateX(-50%);background:#00ff84;color:#000;padding:8px 12px;border-radius:12px;font-weight:700;z-index:9999;box-shadow:0 6px 20px rgba(0,0,0,.4)";
      document.body.appendChild(el);
      setTimeout(()=>el.remove(), 1400);
    } catch {}
    renderAchievements();
  }
}

function renderAchievements(containerSelector = "#achievementsList", counterSelector = ".achievements p") {
  const ul = document.querySelector(containerSelector);
  if (!ul) return;
  ul.innerHTML = "";
  const unlocked = getUnlocked();
  ACHIEVEMENTS.forEach(a => {
    const li = document.createElement("li");
    const done = unlocked.has(a.id);
    li.innerHTML = `${done ? "✅" : "⬜"} ${a.name} <span style="opacity:.7;font-size:.9em">– ${a.desc}</span>`;
    ul.appendChild(li);
  });
  const p = document.querySelector(counterSelector);
  if (p) p.textContent = `Achievements Unlocked ${unlocked.size}/${ACHIEVEMENTS.length}`;
}

// optional: unlock on any element with data-ach
document.addEventListener("click", e => {
  const el = e.target.closest("[data-ach]");
  if (el) unlock(el.getAttribute("data-ach"));
});

// expose globals
window.Ach = { unlock, renderAchievements, isUnlocked, getUnlocked, ACHIEVEMENTS };
