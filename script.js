/* ============================================================
   pantry — script.js
   Vanilla JS SPA. No frameworks, no build step.
   ============================================================ */

'use strict';

/* ── Food data ─────────────────────────────────────────────── */
const FOOD_GROUPS = [
  { group: 'Proteins', foods: [
    { id:'beef',         name:'Beef Puree',           tags:['iron'],                    portion:'1–2 tsp',    prep:'Blend cooked beef with a little broth.' },
    { id:'chicken',      name:'Pureed Chicken',        tags:['iron'],                    portion:'1–2 tsp',    prep:'Blend smooth with water or broth, remove skin.' },
    { id:'lamb',         name:'Lamb Puree',            tags:['iron'],                    portion:'1–2 tsp',    prep:'Blend cooked lamb smooth.' },
    { id:'pork',         name:'Pork Puree',            tags:['iron'],                    portion:'1–2 tsp',    prep:'Blend well-cooked pork smooth with a little broth.' },
    { id:'turkey',       name:'Pureed Turkey',         tags:['iron'],                    portion:'1–2 tsp',    prep:'Blend cooked turkey smooth with a little water.' },
    { id:'sardine',      name:'Canned Sardine',        tags:['iron','variety'],          portion:'1–2 tsp',    prep:'Drain, remove bones, mash finely with a fork.' },
    { id:'tuna',         name:'Canned Tuna',           tags:['iron','variety'],          portion:'1–2 tsp',    prep:'Use in springwater, drain and mash finely.' },
    { id:'lentils',      name:'Red Lentils',           tags:['iron','variety'],          portion:'1–2 tbsp',   prep:'Cook until very soft, blend or mash.' },
    { id:'chickpeas',    name:'Chickpeas',             tags:['iron','variety'],          portion:'1–2 tbsp',   prep:'Cook until very soft, mash or blend smooth.' },
    { id:'kidney_beans', name:'Kidney Beans',          tags:['iron','variety'],          portion:'1–2 tbsp',   prep:'Use canned (no added salt), mash well.' },
    { id:'tofu',         name:'Tofu',                  tags:['iron','allergen','variety'],portion:'1–2 tsp',   prep:'Silken tofu mashes easily, no cooking needed.' },
  ]},
  { group: 'Allergen Foods', foods: [
    { id:'peanut',       name:'Peanut Butter',         tags:['allergen','iron'],         portion:'Tiny smear', prep:'Thin with breastmilk or warm water first.' },
    { id:'egg',          name:'Scrambled Egg',         tags:['allergen','iron'],         portion:'1–2 tsp',    prep:'Well cooked, soft scrambled. Include the yolk.' },
    { id:'salmon',       name:'Flaked Salmon',         tags:['allergen','variety'],      portion:'1–2 tsp',    prep:'Remove all bones. Flake finely or blend.' },
    { id:'wheat',        name:'Wheat Cereal',          tags:['allergen'],                portion:'1–2 tbsp',   prep:'Iron-fortified baby cereal mixed with milk.' },
    { id:'dairy',        name:'Full-fat Yoghurt',      tags:['allergen','variety'],      portion:'1–2 tbsp',   prep:'Plain, full-fat only. No added sugar.' },
    { id:'sesame',       name:'Tahini',                tags:['allergen'],                portion:'Tiny smear', prep:'Thin with water to a smooth paste.' },
    { id:'cashew',       name:'Cashew Butter',         tags:['allergen','iron'],         portion:'Tiny smear', prep:'Thin with water. Use smooth nut butter only.' },
    { id:'almond',       name:'Almond Butter',         tags:['allergen'],                portion:'Tiny smear', prep:'Thin with water. Use smooth only.' },
    { id:'cow_milk',     name:"Full-fat Cow's Milk",   tags:['allergen','variety'],      portion:'1–2 tbsp',   prep:'Use in cooking or with cereal. Not as main drink under 12 months.' },
    { id:'cheese',       name:'Soft Cheese',           tags:['allergen','variety'],      portion:'Small amount',prep:'Ricotta or cottage cheese, plain and full-fat.' },
  ]},
  { group: 'Vegetables', foods: [
    { id:'sweet_potato', name:'Sweet Potato',          tags:['variety'],                 portion:'2–3 tbsp',   prep:'Steam and blend smooth. Naturally sweet.' },
    { id:'carrot',       name:'Carrot Puree',          tags:['variety'],                 portion:'2–3 tbsp',   prep:'Steam and blend smooth.' },
    { id:'broccoli',     name:'Broccoli',              tags:['iron','variety'],          portion:'1–2 tbsp',   prep:'Steam until very soft, mash or blend.' },
    { id:'zucchini',     name:'Zucchini',              tags:['variety'],                 portion:'2–3 tbsp',   prep:'Steam and puree. Mild flavour.' },
    { id:'pumpkin',      name:'Pumpkin Puree',         tags:['variety'],                 portion:'2–3 tbsp',   prep:'Roast or steam, blend until smooth.' },
    { id:'peas',         name:'Peas',                  tags:['iron','variety'],          portion:'1–2 tbsp',   prep:'Cook and blend smooth. Sieve to remove skins.' },
    { id:'spinach',      name:'Spinach Puree',         tags:['iron','variety'],          portion:'1–2 tbsp',   prep:'Steam briefly, blend smooth. Mix with other purees.' },
    { id:'parsnip',      name:'Parsnip Puree',         tags:['variety'],                 portion:'2–3 tbsp',   prep:'Peel, steam and blend. Slightly sweet flavour.' },
    { id:'cauliflower',  name:'Cauliflower',           tags:['variety'],                 portion:'2–3 tbsp',   prep:'Steam and blend smooth with a little water or milk.' },
    { id:'beetroot',     name:'Beetroot Puree',        tags:['iron','variety'],          portion:'1–2 tbsp',   prep:'Roast or steam, blend smooth. Will stain.' },
    { id:'corn',         name:'Sweetcorn Puree',       tags:['variety'],                 portion:'2–3 tbsp',   prep:'Cook corn, blend and sieve to remove skins.' },
    { id:'green_beans',  name:'Green Beans',           tags:['iron','variety'],          portion:'1–2 tbsp',   prep:'Steam until soft, blend smooth.' },
    { id:'potato',       name:'Mashed Potato',         tags:['variety'],                 portion:'2–3 tbsp',   prep:'Boil and mash smooth with breastmilk or formula.' },
  ]},
  { group: 'Fruits', foods: [
    { id:'banana',       name:'Banana',                tags:['variety'],                 portion:'1–2 tbsp',   prep:'Mash a ripe banana with a fork.' },
    { id:'avocado',      name:'Avocado',               tags:['variety'],                 portion:'1–2 tbsp',   prep:'Mash ripe avocado. No cooking needed.' },
    { id:'apple',        name:'Apple Puree',           tags:['variety'],                 portion:'2–3 tbsp',   prep:'Peel, steam, and blend until smooth.' },
    { id:'pear',         name:'Pear Puree',            tags:['variety'],                 portion:'2–3 tbsp',   prep:'Peel, steam, and blend until smooth.' },
    { id:'mango',        name:'Mango Puree',           tags:['variety'],                 portion:'2–3 tbsp',   prep:'Peel and blend ripe mango smooth.' },
    { id:'papaya',       name:'Papaya Puree',          tags:['variety'],                 portion:'2–3 tbsp',   prep:'Peel, remove seeds, blend until smooth.' },
    { id:'peach',        name:'Peach Puree',           tags:['variety'],                 portion:'2–3 tbsp',   prep:'Peel, steam briefly, blend smooth.' },
    { id:'plum',         name:'Plum Puree',            tags:['variety'],                 portion:'2–3 tbsp',   prep:'Peel, stone and blend ripe plum smooth.' },
    { id:'watermelon',   name:'Watermelon',            tags:['variety'],                 portion:'2–3 tbsp',   prep:'Remove seeds, mash or blend smooth.' },
    { id:'blueberry',    name:'Blueberry Puree',       tags:['variety'],                 portion:'1–2 tbsp',   prep:'Cook briefly and blend smooth. Sieve if preferred.' },
    { id:'kiwi',         name:'Kiwi Puree',            tags:['variety'],                 portion:'1–2 tbsp',   prep:'Peel and blend ripe kiwi. Start with small amounts.' },
  ]},
  { group: 'Grains & Cereals', foods: [
    { id:'oats',         name:'Iron-fortified Oats',   tags:['iron','variety'],          portion:'2–3 tbsp',   prep:'Prepare with breastmilk, formula, or water.' },
    { id:'rice_cereal',  name:'Baby Rice Cereal',      tags:['variety'],                 portion:'2–3 tbsp',   prep:'Mix iron-fortified cereal with breastmilk or formula.' },
    { id:'quinoa',       name:'Quinoa',                tags:['iron','variety'],          portion:'2–3 tbsp',   prep:'Cook well and blend or mash. High in plant protein.' },
    { id:'pasta',        name:'Soft Pasta',            tags:['variety'],                 portion:'2–3 tbsp',   prep:'Cook until very soft. Cut into small pieces or blend.' },
    { id:'barley',       name:'Barley Puree',          tags:['iron','variety'],          portion:'2–3 tbsp',   prep:'Cook pearl barley until soft, blend smooth.' },
    { id:'bread',        name:'Soft Wholegrain Bread', tags:['variety'],                 portion:'Small piece', prep:'Soft bread without crust, or lightly toasted fingers.' },
  ]},
];

const FOODS = FOOD_GROUPS.flatMap(g => g.foods);
const KEY_ALLERGENS = ['peanut','egg','salmon','wheat','dairy','sesame','tofu'];
const MEAL_SLOTS = ['Breakfast','Lunch','Dinner'];

/* ── State ─────────────────────────────────────────────────── */
let state = {
  profile: null,   // { name, dob, ageWeeks, preIntroduced:[] }
  log: [],         // [{ foodId, meal, date }]
  meals: [],       // [{ id, name, foods:[] }]
  currentTab: 'home',
};

/* ── Persistence ────────────────────────────────────────────── */
const KEYS = { profile:'p_profile', log:'p_log', meals:'p_meals' };

function loadState() {
  try { state.profile = JSON.parse(localStorage.getItem(KEYS.profile)) || null; } catch {}
  try { state.log     = JSON.parse(localStorage.getItem(KEYS.log))     || []; } catch {}
  try { state.meals   = JSON.parse(localStorage.getItem(KEYS.meals))   || []; } catch {}
}
function saveProfile() { localStorage.setItem(KEYS.profile, JSON.stringify(state.profile)); }
function saveLog()     { localStorage.setItem(KEYS.log,     JSON.stringify(state.log)); }
function saveMeals()   { localStorage.setItem(KEYS.meals,   JSON.stringify(state.meals)); }

function resetAll() {
  state.profile = null; state.log = []; state.meals = [];
  Object.values(KEYS).forEach(k => localStorage.removeItem(k));
  location.reload();
}

/* ── Domain logic ───────────────────────────────────────────── */
function getAgeCategory(weeks) {
  if (weeks < 17) return 'too_early';
  if (weeks < 26) return 'optional';
  return 'ready';
}

function allergenStatus(id) {
  const pre = (state.profile.preIntroduced || []);
  if (pre.includes(id)) return 'maintained';
  const n = state.log.filter(e => e.foodId === id).length;
  return n === 0 ? 'not_introduced' : n < 3 ? 'introducing' : 'maintained';
}

function daysSince(foodId) {
  const entries = state.log.filter(e => e.foodId === foodId).map(e => new Date(e.date));
  if (!entries.length) return Infinity;
  return Math.floor((Date.now() - Math.max(...entries)) / 864e5);
}

function buildDailyPlan() {
  const p = state.profile;
  const aw = p.ageWeeks;
  const todayIds = todayLog().map(e => e.foodId);
  const rec = [];

  const nextAllergen = KEY_ALLERGENS.find(id => allergenStatus(id) === 'not_introduced');
  const reintroAllergen = KEY_ALLERGENS.find(id =>
    allergenStatus(id) === 'introducing' && !todayIds.includes(id) && daysSince(id) >= 2
  );

  const recentIronLogged = state.log.some(e => {
    const age = (Date.now() - new Date(e.date)) / 864e5;
    return age < 2 && foodById(e.foodId)?.tags.includes('iron');
  });
  const ironNeeded = aw >= 26 && !recentIronLogged;
  const ironFood = ironNeeded ? FOODS.find(f => f.tags.includes('iron') && !todayIds.includes(f.id)) : null;
  const varietyFood = FOODS.find(f =>
    f.tags.includes('variety') && !f.tags.includes('allergen') && !todayIds.includes(f.id) && daysSince(f.id) >= 5
  );

  let focus = 'Focus on variety today';
  let focusSupport = 'Offer a variety of textures and flavours.';

  if (nextAllergen) {
    const af = foodById(nextAllergen);
    if (af && !todayIds.includes(af.id)) rec.push({ ...af, reason: 'New allergen to introduce — early exposure helps' });
    focus = af ? `Introduce ${af.name} today` : 'Introduce a new allergen today';
    focusSupport = 'Introduce allergens early and repeat regularly to build tolerance.';
  } else if (ironFood) {
    rec.push({ ...ironFood, reason: 'No iron logged recently — prioritise this' });
    const support = reintroAllergen ? foodById(reintroAllergen) : varietyFood;
    if (support && !todayIds.includes(support.id)) {
      rec.push({ ...support, reason: reintroAllergen ? 'Keep offering — repeat exposure builds tolerance' : 'Something new for variety' });
    }
    focus = 'Prioritise iron today';
    focusSupport = 'Iron needs increase significantly from 6 months.';
  } else if (reintroAllergen) {
    const af = foodById(reintroAllergen);
    if (af) rec.push({ ...af, reason: 'Keep offering — repeat exposure builds tolerance' });
    if (varietyFood) rec.push({ ...varietyFood, reason: 'Something new for variety' });
    focus = af ? `Offer ${af.name} again today` : 'Maintain allergen exposure';
    focusSupport = 'Regular exposure helps maintain tolerance.';
  } else {
    FOODS.filter(f => f.tags.includes('variety') && !todayIds.includes(f.id) && daysSince(f.id) >= 3)
      .slice(0, 2).forEach(f => rec.push({ ...f, reason: 'Good for variety' }));
  }

  return { rec: rec.slice(0, 2), focus, focusSupport, todayIds };
}

function foodById(id) { return FOODS.find(f => f.id === id); }
function todayLog() { return state.log.filter(e => new Date(e.date).toDateString() === new Date().toDateString()); }

function logFood(foodId, meal = null) {
  state.log.push({ foodId, meal, date: new Date().toISOString() });
  saveLog();
}

function removeEntry(entry) {
  const i = state.log.findIndex(e => e.foodId === entry.foodId && e.date === entry.date);
  if (i !== -1) { state.log.splice(i, 1); saveLog(); }
}

/* ── UI Helpers ─────────────────────────────────────────────── */
function el(tag, cls = '', html = '') {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

function pill(label, type = 'sage') {
  const p = el('span', `pill pill-${type}`);
  p.textContent = label;
  return p;
}

function tagPills(tags, container) {
  if (tags.includes('iron'))    container.appendChild(pill('Iron', 'peach'));
  if (tags.includes('allergen'))container.appendChild(pill('Allergen', 'sky'));
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2000);
}

/* ── Sheet ──────────────────────────────────────────────────── */
let sheetCloseCallback = null;

function openSheet(title, buildFn) {
  document.getElementById('sheetTitle').textContent = title;
  const body = document.getElementById('sheetBody');
  body.innerHTML = '';
  buildFn(body);
  document.getElementById('sheetBackdrop').classList.add('open');
  document.getElementById('sheet').classList.add('open');
}

function closeSheet() {
  document.getElementById('sheetBackdrop').classList.remove('open');
  document.getElementById('sheet').classList.remove('open');
  if (sheetCloseCallback) { sheetCloseCallback(); sheetCloseCallback = null; }
}

document.getElementById('sheetClose').addEventListener('click', closeSheet);
document.getElementById('sheetBackdrop').addEventListener('click', closeSheet);

/* ── Confirm dialog ─────────────────────────────────────────── */
function confirm(title, msg, okLabel, onOk) {
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmMsg').textContent = msg;
  document.getElementById('confirmOk').textContent = okLabel || 'Confirm';
  document.getElementById('confirmBackdrop').removeAttribute('hidden');
  document.getElementById('confirmOk').onclick = () => {
    document.getElementById('confirmBackdrop').setAttribute('hidden', '');
    onOk();
  };
  document.getElementById('confirmCancel').onclick = () => {
    document.getElementById('confirmBackdrop').setAttribute('hidden', '');
  };
}

/* ── Onboarding ─────────────────────────────────────────────── */
function showOnboarding() {
  const app = document.getElementById('appMain');
  const header = document.getElementById('appHeader');
  const nav = document.getElementById('bottomNav');
  header.style.display = 'none';
  nav.style.display = 'none';

  const wrap = el('div', 'onboarding');
  wrap.innerHTML = `
    <div class="onboarding-inner">
      <div class="onboarding-logo">
        <img src="assets/icon.png" alt="pantry" class="onboarding-icon">
        <h1 class="onboarding-title">pantry</h1>
        <p class="onboarding-sub">Daily feeding guidance for your baby,<br>based on Australian health guidelines.</p>
      </div>
      <div class="card">
        <p style="font-weight:700;color:var(--text);margin-bottom:16px;font-size:15px">Tell us about your baby</p>
        <label class="input-label">First name</label>
        <input class="input" id="obName" placeholder="e.g. Mia" style="margin-bottom:14px;display:block;width:100%;box-sizing:border-box">
        <label class="input-label">Date of birth</label>
        <input class="input" id="obDob" type="date" style="margin-bottom:16px;display:block;width:100%;box-sizing:border-box;-webkit-appearance:none">
        <div id="obErr" style="color:var(--danger);font-size:13px;margin-bottom:10px;display:none"></div>
        <button class="btn btn-primary btn-full" id="obSubmit">Get started</button>
      </div>
      <p class="onboarding-note">General guidance only. Always consult your GP or maternal health nurse.</p>
    </div>`;

  document.body.appendChild(wrap);

  document.getElementById('obDob').max = new Date().toISOString().split('T')[0];

  document.getElementById('obSubmit').addEventListener('click', () => {
    const name = document.getElementById('obName').value.trim();
    const dob  = document.getElementById('obDob').value;
    const errEl = document.getElementById('obErr');
    if (!name) { errEl.textContent = "Please enter your baby's name."; errEl.style.display='block'; return; }
    if (!dob)  { errEl.textContent = 'Please enter a date of birth.'; errEl.style.display='block'; return; }
    const weeks = Math.floor((Date.now() - new Date(dob)) / 6048e5);
    if (weeks < 0 || weeks > 80) { errEl.textContent = 'Please check the date.'; errEl.style.display='block'; return; }
    state.profile = { name, dob, ageWeeks: weeks, preIntroduced: [] };
    saveProfile();
    wrap.remove();
    header.style.display = '';
    nav.style.display = '';
    navigate('home');
  });
}

/* ── Navigation ─────────────────────────────────────────────── */
function navigate(tab) {
  state.currentTab = tab;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  const main = document.getElementById('appMain');
  main.innerHTML = '';
  const screen = el('div', 'screen');
  const renderers = { home: renderHome, log: renderLog, meals: renderMeals, calendar: renderCalendar, profile: renderProfile };
  (renderers[tab] || renderHome)(screen);
  main.appendChild(screen);
  // Reset scroll — both window and element level to cover all cases
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  main.scrollTop = 0;
}

document.getElementById('bottomNav').addEventListener('click', e => {
  const btn = e.target.closest('.nav-btn');
  if (btn) navigate(btn.dataset.tab);
});

// Header profile icon
const headerProfileBtn = document.querySelector('.header-profile-btn');
if (headerProfileBtn) {
  headerProfileBtn.addEventListener('click', () => navigate('profile'));
}

/* ── HOME ───────────────────────────────────────────────────── */
function renderHome(root) {
  const p = state.profile;
  const aw = p.ageWeeks;
  const cat = getAgeCategory(aw);
  const ageMonths = Math.floor(aw / 4.33);
  const texture = aw<26?'Smooth purees':aw<34?'Smooth to lumpy':aw<43?'Mashed & soft finger foods':'Chopped family foods';

  if (cat === 'too_early') {
    const c = el('div','card');
    c.style.background = 'var(--sky-lt)';
    c.innerHTML = `<p style="font-weight:700;color:var(--text);margin-bottom:6px">Not quite time yet</p>
      <p style="color:var(--text-mid);font-size:14px;line-height:1.6">${p.name} is ${aw} weeks old. Australian guidelines recommend waiting until at least 4 months — ideally around 6 months — before starting solids.</p>`;
    root.appendChild(c);
    return;
  }

  const { rec, focus, focusSupport, todayIds } = buildDailyPlan();
  const todayHasIron = todayIds.some(id => foodById(id)?.tags.includes('iron'));
  const weekStart = new Date(); weekStart.setDate(weekStart.getDate()-6); weekStart.setHours(0,0,0,0);
  const weekAllergenDays = new Set(
    state.log.filter(e => new Date(e.date) >= weekStart && foodById(e.foodId)?.tags.includes('allergen'))
             .map(e => new Date(e.date).toDateString())
  ).size;
  const introduced = KEY_ALLERGENS.filter(id => allergenStatus(id) !== 'not_introduced').length;
  const nextAId = KEY_ALLERGENS.find(id => allergenStatus(id) === 'not_introduced');
  const nextAFood = nextAId ? foodById(nextAId) : null;

  // Focus banner
  const banner = el('div','focus-banner');
  banner.innerHTML = `<p class="focus-label">Today's focus</p>
    <p class="focus-headline">${esc(focus)}</p>
    <p class="focus-support">${esc(focusSupport)}</p>`;
  root.appendChild(banner);

  // Progress pills
  const pills = el('div','progress-pills');
  if (aw >= 26) {
    const ip = el('div', `progress-pill ${todayHasIron?'pill-iron-yes':'pill-iron-no'}`);
    ip.innerHTML = `<span class="dot" style="background:${todayHasIron?'var(--peach)':'#C5B9A8'}"></span>Iron today: ${todayHasIron?'Yes':'Not yet'}`;
    pills.appendChild(ip);
  }
  if (cat === 'ready') {
    const ap = el('div','progress-pill pill-allergen');
    ap.innerHTML = `<span class="dot" style="background:var(--sky)"></span>Allergens this week: ${weekAllergenDays} day${weekAllergenDays!==1?'s':''}`;
    pills.appendChild(ap);
  }
  root.appendChild(pills);

  // Suggestions
  const slabel = el('p','section-label'); slabel.textContent = 'Suggested today'; root.appendChild(slabel);

  if (rec.length === 0) {
    const empty = el('div','card-light'); empty.style.padding = '14px 16px';
    empty.innerHTML = '<p style="font-size:14px;color:var(--text-mid)">All suggestions logged — great work!</p>';
    root.appendChild(empty);
  } else {
    const container = el('div','card-light suggestion-container');
    rec.forEach((food, idx) => {
      const isPrimary = idx === 0;
      const done = todayIds.includes(food.id);
      const row = el('div', `suggestion-row${done?' done':''}`);

      const inner = el('div','suggestion-row-inner');
      const left  = el('div');
      const nameRow = el('div','suggestion-name-row');
      const nameEl = el('span', `suggestion-name${done?' done':''}`); nameEl.textContent = food.name;
      nameRow.appendChild(nameEl);
      tagPills(food.tags, nameRow);
      if (!isPrimary) { const at = el('span','also-today'); at.textContent = 'Also today'; nameRow.appendChild(at); }
      left.appendChild(nameRow);
      const reason = el('div', `suggestion-reason${done?' done':''}`);
      reason.textContent = food.reason + (!done && food.portion && isPrimary ? ` · ${food.portion}` : '');
      left.appendChild(reason);
      inner.appendChild(left);

      if (done) {
        const check = el('div','check-circle');
        check.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polyline points="2,6.5 5,9.5 10,3" stroke="var(--sage)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        inner.appendChild(check);
      }
      row.appendChild(inner);
      if (!done) {
        row.addEventListener('click', () => {
          logFood(food.id, null);
          showToast(`${food.name} logged`);
          navigate('home');
        });
      }
      container.appendChild(row);
    });
    root.appendChild(container);
  }

  // Allergen progress (only if ready) — extra top spacing for page balance
  if (cat === 'ready') {
    const alabel = el('p','section-label'); alabel.style.marginTop = '8px'; alabel.textContent = 'Allergen progress'; root.appendChild(alabel);
    const ac = el('div','card'); ac.style.marginBottom = '22px';
    const arow = el('div', '', ''); arow.style.cssText = 'display:flex;justify-content:space-between;align-items:center';
    const acount = el('span',''); acount.style.cssText = 'font-size:14px;font-weight:600;color:var(--text)';
    acount.textContent = `${introduced} of ${KEY_ALLERGENS.length} introduced`;
    const dots = el('div','allergen-dots');
    KEY_ALLERGENS.forEach(id => {
      const d = el('div','allergen-dot'); const s = allergenStatus(id);
      if (s==='maintained') d.classList.add('maintained');
      if (s==='introducing') d.classList.add('introducing');
      dots.appendChild(d);
    });
    arow.appendChild(acount); arow.appendChild(dots); ac.appendChild(arow);
    if (nextAFood) {
      const next = el('div','allergen-next');
      next.innerHTML = `Next up: <strong style="color:var(--text)">${esc(nextAFood.name)}</strong>`;
      ac.appendChild(next);
    }
    root.appendChild(ac);
  }

  // About this stage — extra top margin for lower-page weight
  const slabel2 = el('p','section-label'); slabel2.style.marginTop = '8px'; slabel2.textContent = 'About this stage'; root.appendChild(slabel2);
  const stageRow = el('div','stage-row');
  const s1 = el('div','stage-item');
  s1.innerHTML = `<div class="stage-label">Age</div><div class="stage-value">${ageMonths} months</div>`;
  const div = el('div','stage-divider');
  const s2 = el('div','stage-item');
  s2.innerHTML = `<div class="stage-label">Texture</div><div class="stage-value">${texture}</div>`;
  stageRow.appendChild(s1); stageRow.appendChild(div); stageRow.appendChild(s2);
  root.appendChild(stageRow);
  const note = el('p','stage-note');
  note.innerHTML = `Exposure matters more than quantity — it's okay if ${esc(p.name)} eats very little. <em>Raising Children Network</em>`;
  root.appendChild(note);
}

/* ── LOG ────────────────────────────────────────────────────── */
function renderLog(root) {
  const todayEntries = todayLog();
  const byMeal = { Breakfast:[], Lunch:[], Dinner:[], Other:[] };
  todayEntries.forEach(e => { byMeal[MEAL_SLOTS.includes(e.meal) ? e.meal : 'Other'].push(e); });

  MEAL_SLOTS.forEach(slot => {
    const entries = byMeal[slot];
    const section = el('div','meal-section');
    const header = el('p','meal-section-header'); header.textContent = slot; section.appendChild(header);
    const card = el('div','meal-card');

    // Food rows
    entries.forEach(entry => {
      const food = foodById(entry.foodId);
      if (!food) return;
      const row = el('div','food-row');
      const name = el('span','food-row-name'); name.textContent = food.name;
      const tags = el('div','food-row-tags');
      tagPills(food.tags, tags);
      const rm = el('button','remove-btn'); rm.textContent = '×'; rm.title = 'Remove';
      rm.addEventListener('click', () => { removeEntry(entry); navigate('log'); });
      tags.appendChild(rm);
      row.appendChild(name); row.appendChild(tags); card.appendChild(row);
    });

    // Footer
    if (entries.length === 0) {
      const empty = el('div','meal-empty');
      const txt = el('p','meal-empty-text'); txt.textContent = 'Nothing logged';
      const addBtn = el('button','btn btn-light btn-sm'); addBtn.textContent = '+ Add food';
      addBtn.addEventListener('click', () => openFoodPicker(slot));
      empty.appendChild(txt); empty.appendChild(addBtn); card.appendChild(empty);
    } else {
      const footer = el('div','meal-footer');
      const addBtn = el('button','btn btn-light btn-sm'); addBtn.textContent = '+ Add food';
      addBtn.addEventListener('click', () => openFoodPicker(slot));
      footer.appendChild(addBtn); card.appendChild(footer);
    }

    section.appendChild(card); root.appendChild(section);
  });

  // Other section
  if (byMeal.Other.length > 0) {
    const section = el('div','meal-section');
    const header = el('p','meal-section-header'); header.textContent = 'Other'; section.appendChild(header);
    const card = el('div','meal-card');
    byMeal.Other.forEach(entry => {
      const food = foodById(entry.foodId); if (!food) return;
      const row = el('div','food-row');
      const name = el('span','food-row-name'); name.textContent = food.name;
      const tags = el('div','food-row-tags');
      const rm = el('button','remove-btn'); rm.textContent = '×';
      rm.addEventListener('click', () => { removeEntry(entry); navigate('log'); });
      tags.appendChild(rm); row.appendChild(name); row.appendChild(tags); card.appendChild(row);
    });
    section.appendChild(card); root.appendChild(section);
  }
}

function openFoodPicker(slot) {
  openSheet(`Add to ${slot}`, body => {
    // Search input
    const searchInput = el('input','input input-sm');
    searchInput.placeholder = 'Search foods…';
    searchInput.style.marginBottom = '10px';
    body.appendChild(searchInput);

    // Filter chips
    const chips = el('div','filter-chips');
    // Tag-to-filter mapping: chip label → test function
    const CHIP_FILTERS = {
      'Iron':       f => f.tags.includes('iron'),
      'Allergen':   f => f.tags.includes('allergen'),
      'Proteins':   f => FOOD_GROUPS.find(g=>g.group==='Proteins')?.foods.some(gf=>gf.id===f.id),
      'Vegetables': f => FOOD_GROUPS.find(g=>g.group==='Vegetables')?.foods.some(gf=>gf.id===f.id),
      'Fruits':     f => FOOD_GROUPS.find(g=>g.group==='Fruits')?.foods.some(gf=>gf.id===f.id),
      'Grains':     f => FOOD_GROUPS.find(g=>g.group==='Grains & Cereals')?.foods.some(gf=>gf.id===f.id),
    };
    const chipLabels = Object.keys(CHIP_FILTERS);
    let activeChip = '';   // chip label or ''
    let searchText = '';   // text search query

    chipLabels.forEach(label => {
      const c = el('button','filter-chip'); c.textContent = label;
      c.addEventListener('click', () => {
        activeChip = activeChip === label ? '' : label;
        searchText = '';
        searchInput.value = '';
        chips.querySelectorAll('.filter-chip').forEach(ch => ch.classList.remove('active'));
        if (activeChip) c.classList.add('active');
        renderList();
      });
      chips.appendChild(c);
    });
    body.appendChild(chips);

    // listArea: no fixed height — sheet itself scrolls
    const listArea = el('div');
    listArea.style.paddingBottom = '8px';
    body.appendChild(listArea);

    function renderList() {
      listArea.innerHTML = '';
      const chipFn = activeChip ? CHIP_FILTERS[activeChip] : null;

      // Saved meals section (only when no search/chip active)
      if (!activeChip && !searchText && state.meals.length > 0) {
        const gLabel = el('p','food-group-label'); gLabel.textContent = 'Saved Meals'; listArea.appendChild(gLabel);
        const mSection = el('div','saved-meals-section');
        state.meals.forEach(meal => {
          const row = el('div','saved-meal-pick-row');
          const left = el('div');
          const name = el('span','saved-meal-pick-name'); name.textContent = meal.name;
          const count = el('span','saved-meal-pick-count'); count.textContent = `${meal.foods.length} food${meal.foods.length!==1?'s':''}`;
          const action = el('span','saved-meal-pick-action'); action.textContent = 'Add all →';
          left.appendChild(name); left.appendChild(count);
          row.appendChild(left); row.appendChild(action);
          row.addEventListener('click', () => {
            meal.foods.forEach(fid => logFood(fid, slot));
            showToast(`"${meal.name}" logged`);
            closeSheet();
            navigate('log');
          });
          mSection.appendChild(row);
        });
        listArea.appendChild(mSection);
      }

      // Chip filter — flat filtered list
      if (chipFn) {
        const filtered = FOODS.filter(chipFn);
        if (!filtered.length) {
          const empty = el('p',''); empty.style.cssText='color:var(--text-sub);font-size:14px;padding:12px 0';
          empty.textContent = 'No foods found.'; listArea.appendChild(empty);
        }
        filtered.forEach(food => listArea.appendChild(makeFoodPickRow(food, slot)));
        return;
      }

      // Text search — flat filtered list
      if (searchText) {
        const filtered = FOODS.filter(f => f.name.toLowerCase().includes(searchText));
        filtered.forEach(food => listArea.appendChild(makeFoodPickRow(food, slot)));
        return;
      }

      // Default: grouped browse
      FOOD_GROUPS.forEach(group => {
        const gLabel = el('p','food-group-label'); gLabel.textContent = group.group; listArea.appendChild(gLabel);
        group.foods.forEach(food => listArea.appendChild(makeFoodPickRow(food, slot)));
      });
    }

    searchInput.addEventListener('input', () => {
      searchText = searchInput.value.toLowerCase().trim();
      if (searchText) { activeChip = ''; chips.querySelectorAll('.filter-chip').forEach(ch => ch.classList.remove('active')); }
      renderList();
    });
    renderList();
  });
}

function makeFoodPickRow(food, slot) {
  const row = el('div','food-pick-row');
  const left = el('div','food-pick-left');
  const name = el('span','food-pick-name'); name.textContent = food.name;
  const portion = el('span','food-pick-portion'); portion.textContent = food.portion;
  left.appendChild(name); left.appendChild(portion);
  const right = el('div','food-pick-right');
  const tl = todayLog();
  if (tl.some(e => e.foodId === food.id)) right.appendChild(pill('Today','sage'));
  tagPills(food.tags, right);
  row.appendChild(left); row.appendChild(right);
  row.addEventListener('click', () => {
    logFood(food.id, slot);
    showToast(`${food.name} logged · ${slot}`);
    closeSheet();
    navigate('log');
  });
  return row;
}

/* ── MEALS ──────────────────────────────────────────────────── */
function renderMeals(root) {
  const header = el('div','meals-header');
  const title = el('h2','meals-title'); title.textContent = 'Saved Meals';
  header.appendChild(title);
  if (state.meals.length > 0) {
    const newBtn = el('button','btn btn-primary btn-sm'); newBtn.textContent = '+ New';
    newBtn.addEventListener('click', openMealCreator);
    header.appendChild(newBtn);
  }
  root.appendChild(header);

  if (state.meals.length === 0) {
    const empty = el('div','card'); empty.style.cssText = 'text-align:center;padding:28px 20px';
    empty.innerHTML = `<p style="font-size:15px;font-weight:600;color:var(--text);margin-bottom:6px">No saved meals yet</p>
      <p style="font-size:13px;color:var(--text-sub);margin-bottom:18px">Save meals you make often — log them in one tap from the Log page.</p>`;
    const btn = el('button','btn btn-primary'); btn.textContent = 'Create your first meal';
    btn.addEventListener('click', openMealCreator);
    empty.appendChild(btn); root.appendChild(empty);
    return;
  }

  state.meals.forEach(meal => {
    const card = el('div','meal-card-saved');
    const ch = el('div','meal-card-header');
    const info = el('div');
    const name = el('div','meal-card-name'); name.textContent = meal.name;
    const foods = el('div','meal-card-foods');
    foods.textContent = meal.foods.map(fid => foodById(fid)?.name).filter(Boolean).join(' · ');
    info.appendChild(name); info.appendChild(foods);
    const delBtn = el('button','meal-delete'); delBtn.textContent = '×';
    delBtn.addEventListener('click', () => {
      state.meals = state.meals.filter(m => m.id !== meal.id);
      saveMeals(); navigate('meals');
    });
    ch.appendChild(info); ch.appendChild(delBtn); card.appendChild(ch);

    // Tags
    const allFoods = meal.foods.map(fid => foodById(fid)).filter(Boolean);
    const tagRow = el('div','meal-card-tags');
    if (allFoods.some(f => f.tags.includes('iron'))) tagRow.appendChild(pill('Iron','peach'));
    const allergens = allFoods.filter(f => f.tags.includes('allergen'));
    allergens.slice(0,3).forEach(f => { const p2 = pill(f.name, 'sky'); tagRow.appendChild(p2); });
    if (tagRow.children.length) card.appendChild(tagRow);
    root.appendChild(card);
  });
}

function openMealCreator() {
  let mealName = '';
  let selected = [];

  openSheet('New meal', body => {
    const nameInput = el('input','input'); nameInput.placeholder = 'Meal name (e.g. Iron boost)'; nameInput.style.marginBottom = '10px';
    nameInput.addEventListener('input', () => { mealName = nameInput.value; });
    body.appendChild(nameInput);

    const searchInput = el('input','input input-sm'); searchInput.placeholder = 'Search foods…'; searchInput.style.marginBottom = '10px';
    body.appendChild(searchInput);

    const badge = el('div','selected-count-badge'); badge.style.display = 'none';
    body.appendChild(badge);

    const listArea = el('div'); listArea.style.maxHeight = '280px'; listArea.style.overflowY = 'auto'; listArea.style.marginBottom = '14px';
    body.appendChild(listArea);

    const saveBtn = el('button','btn btn-primary btn-full'); saveBtn.textContent = 'Save meal';
    saveBtn.disabled = true;
    body.appendChild(saveBtn);

    function updateBadge() {
      badge.style.display = selected.length ? 'block' : 'none';
      badge.textContent = `${selected.length} food${selected.length!==1?'s':''} selected`;
      saveBtn.disabled = !mealName.trim() || selected.length === 0;
    }

    function renderList(q) {
      listArea.innerHTML = '';
      const items = q ? FOODS.filter(f => f.name.toLowerCase().includes(q)) : FOODS;
      items.forEach(food => {
        const isSel = selected.includes(food.id);
        const row = el('div', `meal-create-row${isSel?' selected':''}`);
        const name = el('span', `meal-create-name${isSel?' selected':''}`); name.textContent = food.name;
        row.appendChild(name);
        if (isSel) {
          const check = el('span',''); check.textContent = '✓'; check.style.cssText = 'color:var(--sage);font-weight:700';
          row.appendChild(check);
        }
        row.addEventListener('click', () => {
          selected = selected.includes(food.id) ? selected.filter(x => x !== food.id) : [...selected, food.id];
          updateBadge(); renderList(searchInput.value.toLowerCase().trim());
        });
        listArea.appendChild(row);
      });
    }

    searchInput.addEventListener('input', () => renderList(searchInput.value.toLowerCase().trim()));
    nameInput.addEventListener('input', () => { mealName = nameInput.value.trim(); saveBtn.disabled = !mealName || selected.length === 0; });
    renderList('');

    saveBtn.addEventListener('click', () => {
      if (!mealName.trim() || !selected.length) return;
      state.meals.push({ id: Date.now().toString(), name: mealName.trim(), foods: selected });
      saveMeals();
      showToast(`"${mealName.trim()}" saved`);
      closeSheet();
      navigate('meals');
    });
  });
}

/* ── CALENDAR ───────────────────────────────────────────────── */
function renderCalendar(root) {
  const now = new Date();
  let vm = now.getMonth(), vy = now.getFullYear(), selDay = null;

  const calCard = el('div','card'); calCard.style.marginBottom = '12px';
  root.appendChild(calCard);
  const detailArea = el('div'); root.appendChild(detailArea);
  const monthAllergenArea = el('div'); root.appendChild(monthAllergenArea);

  function dayLogs(d) {
    if (!d) return [];
    return state.log.filter(e => new Date(e.date).toDateString() === new Date(vy,vm,d).toDateString());
  }

  function renderCal() {
    calCard.innerHTML = '';

    // Header
    const header = el('div','cal-header');
    const prevBtn = el('button','cal-nav-btn'); prevBtn.textContent = '‹';
    const nextBtn = el('button','cal-nav-btn'); nextBtn.textContent = '›';
    const monthTitle = el('span','cal-month-title');
    monthTitle.textContent = new Date(vy,vm,1).toLocaleString('default',{month:'long'}) + ' ' + vy;
    prevBtn.addEventListener('click', () => { if(vm===0){vm=11;vy--;}else vm--; selDay=null; renderCal(); renderDetail(); renderMonthAllergens(); });
    nextBtn.addEventListener('click', () => { if(vm===11){vm=0;vy++;}else vm++; selDay=null; renderCal(); renderDetail(); renderMonthAllergens(); });
    header.appendChild(prevBtn); header.appendChild(monthTitle); header.appendChild(nextBtn);
    calCard.appendChild(header);

    // Grid header
    const grid = el('div','cal-grid');
    ['S','M','T','W','T','F','S'].forEach(d => { const dn = el('div','cal-day-name'); dn.textContent = d; grid.appendChild(dn); });

    const firstDay = new Date(vy,vm,1).getDay();
    const dim = new Date(vy,vm+1,0).getDate();
    const isCur = vm===now.getMonth()&&vy===now.getFullYear();

    for (let i = 0; i < firstDay; i++) { grid.appendChild(el('div','cal-day empty')); }
    for (let d = 1; d <= dim; d++) {
      const dl = dayLogs(d);
      const isToday = isCur && d === now.getDate();
      const isSel   = selDay === d;
      const hasLog  = dl.length > 0;
      const hasA    = dl.some(e => foodById(e.foodId)?.tags.includes('allergen'));

      const day = el('div', `cal-day${isToday?' today':''}${isSel&&!isToday?' selected':''}`);
      const num = el('span','cal-day-num'); num.textContent = d; day.appendChild(num);

      if (hasLog) {
        const dots = el('div','cal-day-dots');
        const fd = el('div','cal-dot dot-food'); dots.appendChild(fd);
        if (hasA) { const ad = el('div','cal-dot dot-allergen'); dots.appendChild(ad); }
        day.appendChild(dots);
      }

      day.addEventListener('click', () => { selDay = selDay===d ? null : d; renderCal(); renderDetail(); });
      grid.appendChild(day);
    }
    calCard.appendChild(grid);

    // Legend
    const legend = el('div','cal-legend');
    legend.innerHTML = `<div class="legend-item"><div class="legend-dot" style="background:var(--peach)"></div> Food logged</div>
      <div class="legend-item"><div class="legend-dot" style="background:var(--sky)"></div> Allergen offered</div>`;
    calCard.appendChild(legend);
  }

  function renderDetail() {
    detailArea.innerHTML = '';
    if (!selDay) return;
    const sl = dayLogs(selDay);
    const dateStr = new Date(vy,vm,selDay).toLocaleDateString('en-AU',{weekday:'long',day:'numeric',month:'long'});
    const dateLabel = el('p','cal-detail-date'); dateLabel.textContent = dateStr; detailArea.appendChild(dateLabel);

    if (sl.length === 0) {
      const empty = el('div','card'); empty.innerHTML = '<p style="font-size:13px;color:var(--text-sub)">Nothing logged this day.</p>';
      detailArea.appendChild(empty); return;
    }

    const byMeal = { Breakfast:[], Lunch:[], Dinner:[], Other:[] };
    sl.forEach(e => { byMeal[MEAL_SLOTS.includes(e.meal)?e.meal:'Other'].push(e); });

    [...MEAL_SLOTS,'Other'].forEach(slot => {
      const entries = byMeal[slot];
      if (!entries.length) return;
      const group = el('div','cal-meal-group');
      const label = el('p','cal-meal-label'); label.textContent = slot; group.appendChild(label);
      const list = el('div','cal-meal-list');
      entries.forEach((entry, i) => {
        const food = foodById(entry.foodId); if (!food) return;
        const row = el('div','cal-food-row');
        const name = el('span','cal-food-name'); name.textContent = food.name;
        const tags = el('div','food-row-tags');
        tagPills(food.tags, tags);
        row.appendChild(name); row.appendChild(tags); list.appendChild(row);
      });
      group.appendChild(list); detailArea.appendChild(group);
    });
  }

  function renderMonthAllergens() {
    monthAllergenArea.innerHTML = '';
    const ml = state.log.filter(e => { const d=new Date(e.date); return d.getMonth()===vm&&d.getFullYear()===vy; });
    const ids = [...new Set(ml.filter(e => foodById(e.foodId)?.tags.includes('allergen')).map(e=>e.foodId))];
    if (!ids.length) return;
    const label = el('p','section-label'); label.textContent = 'Allergens introduced this month'; monthAllergenArea.appendChild(label);
    const card = el('div','card');
    const tagRow = el('div',''); tagRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px';
    ids.forEach(id => { const food = foodById(id); if(food) tagRow.appendChild(pill(food.name,'sky')); });
    card.appendChild(tagRow); monthAllergenArea.appendChild(card);
  }

  renderCal(); renderDetail(); renderMonthAllergens();
}

/* ── PROFILE ────────────────────────────────────────────────── */
function renderProfile(root) {
  const p = state.profile;
  const ageMonths = Math.floor(p.ageWeeks / 4.33);
  const totalFoods = new Set(state.log.map(e=>e.foodId)).size;
  const introduced = KEY_ALLERGENS.filter(id => allergenStatus(id) !== 'not_introduced').length;
  const preIntro = p.preIntroduced || [];

  // Profile card
  const pCard = el('div','profile-card');
  const editBtn = el('button','profile-edit-btn'); editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', openEditSheet);
  const avatar = el('div','profile-avatar');
  avatar.innerHTML = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
  const name = el('div','profile-name'); name.textContent = p.name;
  const age  = el('div','profile-age');  age.textContent  = `${ageMonths} months old`;
  pCard.appendChild(editBtn); pCard.appendChild(avatar); pCard.appendChild(name); pCard.appendChild(age);
  root.appendChild(pCard);

  // Stats
  const slabel1 = el('p','section-label'); slabel1.textContent = 'Progress'; root.appendChild(slabel1);
  const statsCard = el('div','card');
  const statsRow = el('div','stats-row');
  [[totalFoods,'Foods tried','sage'],[introduced,'Allergens introduced','sky'],[state.meals.length,'Saved meals','peach']].forEach(([num,label,cls]) => {
    const item = el('div','stat-item');
    const n = el('div',`stat-num ${cls}`); n.textContent = num;
    const l = el('div','stat-label');     l.textContent = label;
    item.appendChild(n); item.appendChild(l); statsRow.appendChild(item);
  });
  statsCard.appendChild(statsRow); root.appendChild(statsCard);

  // Guidelines
  const slabel2 = el('p','section-label'); slabel2.textContent = 'Guidelines'; root.appendChild(slabel2);
  const glNote = el('div','guidelines-note');
  glNote.innerHTML = `Pantry follows guidance from <strong>NHMRC</strong>, <strong>Raising Children Network</strong>, and <strong>ASCIA</strong>. Always consult your GP or maternal health nurse.`;
  root.appendChild(glNote);

  // Allergens already introduced
  const slabel3 = el('p','section-label'); slabel3.textContent = 'Allergens already introduced'; root.appendChild(slabel3);
  const alCard = el('div','card');
  const alNote = el('p',''); alNote.style.cssText = 'font-size:13px;color:var(--text-mid);line-height:1.5;margin-bottom:12px';
  alNote.textContent = 'Select allergens introduced before using this app. These will be treated as maintained.';
  alCard.appendChild(alNote);

  KEY_ALLERGENS.forEach(id => {
    const food = foodById(id); if (!food) return;
    const isSelected = preIntro.includes(id);
    const row = el('div','allergen-check-row');
    const left = el('div','allergen-check-left');
    const box  = el('div', `check-box${isSelected?' checked':''}`);
    if (isSelected) box.innerHTML = `<svg width="11" height="11" viewBox="0 0 12 12" fill="none"><polyline points="2,6.5 5,9.5 10,3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const fname = el('span', `check-name${isSelected?' checked':''}`); fname.textContent = food.name;
    left.appendChild(box); left.appendChild(fname);
    row.appendChild(left); row.appendChild(pill('Allergen','sky'));
    row.addEventListener('click', () => {
      const pi = state.profile.preIntroduced || [];
      state.profile.preIntroduced = pi.includes(id) ? pi.filter(x=>x!==id) : [...pi, id];
      saveProfile(); navigate('profile');
    });
    alCard.appendChild(row);
  });
  root.appendChild(alCard);

  // Reset
  const slabel4 = el('p','section-label'); slabel4.textContent = 'Data'; root.appendChild(slabel4);
  const resetCard = el('div','card');
  const resetRow = el('div','reset-row');
  const resetInfo = el('div');
  resetInfo.innerHTML = '<div class="reset-info-title">Reset all data</div><div class="reset-info-sub">Clears all logs, meals and settings</div>';
  const resetBtn = el('button','btn-reset'); resetBtn.textContent = 'Reset';
  resetBtn.addEventListener('click', () => {
    confirm('Are you sure?', 'This will permanently delete all logged foods, saved meals, and your profile.', 'Yes, delete everything', resetAll);
  });
  resetRow.appendChild(resetInfo); resetRow.appendChild(resetBtn);
  resetCard.appendChild(resetRow); root.appendChild(resetCard);

  function openEditSheet() {
    openSheet('Edit details', body => {
      const nl = el('label','input-label'); nl.textContent = 'Child\'s name'; body.appendChild(nl);
      const ni = el('input','input'); ni.value = p.name; ni.style.marginBottom='14px'; body.appendChild(ni);
      const dl = el('label','input-label'); dl.textContent = 'Date of birth'; body.appendChild(dl);
      const di = el('input','input'); di.type='date'; di.value=p.dob||''; di.max=new Date().toISOString().split('T')[0]; di.style.marginBottom='6px'; body.appendChild(di);
      const hint = el('p',''); hint.style.cssText='font-size:12px;color:var(--text-sub);margin-bottom:18px';
      hint.textContent='Updating date of birth will refresh all age-based guidance.'; body.appendChild(hint);
      const saveBtn = el('button','btn btn-primary btn-full'); saveBtn.textContent='Save changes'; body.appendChild(saveBtn);
      saveBtn.addEventListener('click', () => {
        const name = ni.value.trim(); if (!name) return;
        const dob  = di.value;
        const weeks = dob ? Math.floor((Date.now()-new Date(dob))/6048e5) : p.ageWeeks;
        if (weeks < 0 || weeks > 80) return;
        state.profile = { ...state.profile, name, dob: dob||p.dob, ageWeeks: weeks };
        saveProfile(); showToast('Profile updated');
        closeSheet(); navigate('profile');
      });
      sheetCloseCallback = null;
    });
  }
}

/* ── Utility ────────────────────────────────────────────────── */
function esc(str) { return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/* ── Boot ───────────────────────────────────────────────────── */
loadState();
if (!state.profile) {
  showOnboarding();
} else {
  navigate('home');
  // Ensure page starts at top on initial load
  setTimeout(() => { window.scrollTo(0, 0); }, 0);
}
