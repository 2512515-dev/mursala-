// js/main.js
// Start-up: floating decorations, load saved content, first draw.

addEventListener('hashchange', () => {
    scrollTo(0, 0);
    render();
});
if (!RM)
    ['♡', '✦', '✿', '♥', '✧'].forEach((c, i) => {
        const s = document.createElement('span');
        s.className = 'flt';
        s.textContent = c;
        s.style.cssText = `left:${8 + i * 21}%;top:${20 + (i * 37) % 60}%;animation-delay:-${i * 2}s`;
        s.setAttribute('aria-hidden', 'true');
        document.body.append(s);
    });
(async () => {
    if (cloud()) {
        try {
            const r = await fetch(SB.url + '/rest/v1/site?id=eq.1&select=data', { headers: H() }), d = (await r.json())[0]?.data;
            if (d) {
                const c = Object.assign(cfg, d.cfg || {});
                Object.assign(S, d);
                S.cfg = c;
            }
        }
        catch {
            toast('Offline: showing the last saved copy');
        }
    }
    await Promise.all([...S.photos.map(p => loadU(p.file)), ...S.songs.flatMap(s => [loadU(s.file), loadU(s.art)]), ...S.tl.map(e => loadU(e.photo))]);
    sync();
    render();
})();
