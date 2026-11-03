// js/utils.js
// Small helpers: DOM, text, icons, toast, hearts, typing effect, modal.

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const uid = () => Math.random().toString(36).slice(2, 9), pick = a => a[Math.floor(Math.random() * a.length)];
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'
}[c]));
const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
const fill = s => esc(s).replace(/\{her\}/g, esc(cfg.her)).replace(/\{me\}/g, esc(cfg.me));
const fd = d => d ? new Date(d + 'T00:00').toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric'
}) : '';
const today = () => new Date().toISOString().slice(0, 10);
const I = {
    play: '<path d="M8 5v14l11-7z"/>', pause: '<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>', prev: '<path d="M6 5h2v14H6zM20 5v14L9 12z"/>', next: '<path d="M16 5h2v14h-2zM4 5l11 7L4 19z"/>'
};
const ic = (n, s = 18) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="currentColor" aria-hidden="true">${I[n]}</svg>`;
function toast(m) {
    const t = $('#toast');
    t.textContent = m;
    t.classList.add('on');
    clearTimeout(t._t);
    t._t = setTimeout(() => t.classList.remove('on'), 2600);
}
function burst(e) {
    const x = e?.clientX ?? innerWidth / 2, y = e?.clientY ?? innerHeight / 2;
    if (RM)
        return;
    for (let i = 0; i < 7; i++) {
        const s = document.createElement('span');
        s.className = 'fx';
        s.textContent = pick(['♥', '♡', '✿', '✦']);
        s.style.cssText = `left:${x}px;top:${y}px;--x:${(Math.random() - .5) * 160}px;color:var(--wine)`;
        document.body.append(s);
        setTimeout(() => s.remove(), 1400);
    }
}
function typeInto(el, t) {
    if (RM) {
        el.textContent = t;
        return;
    }
    el.textContent = '';
    let i = 0;
    const iv = setInterval(() => {
        if (!el.isConnected || i >= t.length)
            return clearInterval(iv);
        el.textContent += t[i++];
    }, 32);
}
function show(h) {
    const m = $('#modal');
    m.innerHTML = h;
    m.classList.add('on');
}
const hide = () => $('#modal').classList.remove('on');
const photoOf = p => p.file && U[p.file] ? `<img src="${U[p.file]}" alt="${esc(p.cap || 'A memory')}" data-a="lb" data-id="${p.id}">` : '<div class="ph">photo missing</div>';
