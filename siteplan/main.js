'use strict';

/* ── GAME METADATA (tightly coupled to HTML — stays in JS) ── */
const games = {
  re: { score: 9.5,  stars: '★★★★★', label: 'Must Play',  bg: 'bg-re' },
  sw: { score: 8.5,  stars: '★★★★☆', label: 'Classic',    bg: 'bg-sw' },
  co: { score: 10,   stars: '★★★★★', label: 'Masterwork', bg: 'bg-co' },
  cd: { score: 8.8,  stars: '★★★★½', label: 'Epic',       bg: 'bg-cd' },
};

/* ARRAY: game keys derived from the object */
const gameKeys = Object.keys(games);  /* ['re', 'sw', 'co', 'cd'] */

/* reduce() — compute average score across all reviews */
const totalScore = gameKeys.reduce((sum, key) => sum + games[key].score, 0);
console.log('Average review score:', (totalScore / gameKeys.length).toFixed(2));

let currentGame = 're';

/* ── DOM REFERENCES ── */
const scoreEl   = document.getElementById('score-display');
const starsEl   = document.getElementById('stars-display');
const scoreLive = document.getElementById('score-live');
const bttBtn    = document.getElementById('back-to-top');
const themeBtn  = document.getElementById('theme-toggle');
const tabs      = Array.from(document.querySelectorAll('.game-tab'));

/* ── THROTTLE UTILITY ──
   Limits how often a function can fire, saving CPU on high-frequency events. */
function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

/* ── THEME TOGGLE ── */
function initTheme() {
  const saved = localStorage.getItem('p1r-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  syncThemeBtn(saved);
}

function syncThemeBtn(theme) {
  if (!themeBtn) return;
  const isLight = theme === 'light';
  themeBtn.textContent = isLight ? '☾ Dark' : '☀ Light';
  themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('p1r-theme', next);
  syncThemeBtn(next);
}

/* ── SWITCH GAME ── */
function switchGame(id) {
  /* Bail if already on this game */
  if (id === currentGame) return;

  /* Deactivate all tabs — forEach on real Array */
  tabs.forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-selected', 'false');
  });

  /* Find and activate the clicked tab */
  const activeTab = tabs.find(tab => tab.dataset.game === id);
  if (activeTab) {
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-selected', 'true');
  }

  /* Hide all review sections — forEach on gameKeys Array */
  gameKeys.forEach(key => {
    document.getElementById('hero-' + key).classList.remove('active');
    document.getElementById('body-' + key).classList.remove('active');
  });

  /* Show the new sections */
  document.getElementById('hero-' + id).classList.add('active');
  const newBody = document.getElementById('body-' + id);
  newBody.classList.add('active');

  /* Focus management: move keyboard/screen-reader focus to newly revealed content */
  const heading = newBody.querySelector('h2');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }

  /* filter() inactive bg keys, map() to DOM els, forEach to fade out */
  gameKeys
    .filter(key => key !== id)
    .map(key => document.getElementById(games[key].bg))
    .forEach(el => { el.style.opacity = '0'; });

  /* Fade in active background */
  document.getElementById(games[id].bg).style.opacity = '1';

  /* Update score display and stars */
  animateScore(games[id].score);
  starsEl.textContent = games[id].stars;

  /* Update aria-live region (screen reader announcement) */
  scoreLive.textContent = 'Score: ' + games[id].score + ' out of 10 — ' + games[id].label;

  currentGame = id;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── ANIMATE SCORE ── */
function animateScore(target) {
  const end       = parseFloat(target);
  const start     = parseFloat(scoreEl.textContent);
  const duration  = 500;
  const startTime = performance.now();

  function step(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    const val      = start + (end - start) * ease;

    /* Conditional: show '10' vs decimal */
    scoreEl.textContent = val >= 10 ? '10' : val.toFixed(1);

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/* ── SPOILER TOGGLE ── */
function toggleSpoiler(btn) {
  const isOpen = btn.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen.toString());
  btn.nextElementSibling.classList.toggle('open');
}

/* ── SCROLL HANDLER — fired via throttled listener ── */
function handleScroll() {
  bttBtn.classList.toggle('visible', window.scrollY > 300);
}

/* ── SKELETON SCREENS ── */
function showSkeletons(container, count) {
  container.setAttribute('aria-busy', 'true');
  container.innerHTML = Array.from({ length: count }, () => `
    <div class="review-card skeleton-card" aria-hidden="true">
      <div class="skeleton sk-tag"></div>
      <div class="skeleton sk-title"></div>
      <div class="skeleton sk-title sk-short"></div>
      <div class="skeleton sk-text"></div>
      <div class="skeleton sk-text sk-short"></div>
      <div class="skeleton sk-footer"></div>
    </div>
  `).join('');
}

/* ── RENDER OTHER REVIEWS ── */
function renderOtherReviews(reviews, container) {
  container.innerHTML = reviews.map(r => `
    <article class="review-card">
      <p class="card-genre">🎮 ${r.genre} · ${r.platform}</p>
      <h3 class="card-title">${r.title}</h3>
      <p class="card-verdict">"${r.verdict}"</p>
      <div class="card-footer">
        <span class="card-score">${r.score}</span>
        <span class="card-stars" aria-label="${r.stars}">${r.stars}</span>
        <span class="card-label">${r.label}</span>
        <span class="card-year">${r.year}</span>
      </div>
    </article>
  `).join('');
  container.setAttribute('aria-busy', 'false');
}

/* ── FETCH REVIEWS FROM reviews.json ──
   Demonstrates how real-world web apps load data dynamically.
   Skeleton screens are shown while the request is in flight. */
async function loadReviews() {
  const grid = document.getElementById('more-reviews-grid');
  if (!grid) return;

  showSkeletons(grid, 4);

  try {
    const res = await fetch('reviews.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();

    /* Brief pause keeps the skeleton visible long enough to notice */
    await new Promise(resolve => setTimeout(resolve, 500));

    renderOtherReviews(data.reviews, grid);
  } catch (err) {
    console.warn('Could not load reviews.json:', err.message);
    grid.innerHTML = '<p class="load-error">Could not load additional reviews. Try viewing from a web server.</p>';
    grid.setAttribute('aria-busy', 'false');
  }
}

/* ── EVENT LISTENERS ── */

/* Tab click listeners — forEach on tabs Array */
tabs.forEach(tab => tab.addEventListener('click', () => switchGame(tab.dataset.game)));

/* Spoiler button listeners — forEach on converted NodeList */
Array.from(document.querySelectorAll('.spoiler-btn')).forEach(btn => {
  btn.addEventListener('click', () => toggleSpoiler(btn));
});

/* Scroll listener — throttled to 100 ms to save CPU */
window.addEventListener('scroll', throttle(handleScroll, 100));

/* Back-to-top click */
bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* Theme toggle */
if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

/* ── INIT ── */
initTheme();
loadReviews();
