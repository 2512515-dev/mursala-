// js/router.js
// Page switching: picks the page from the #hash and draws it.

const P = {
    home, memories, letters, music, surprises, timeline, cards
};
const AFTER = {
    surprises() {
        if (ed && tok && cloud())
            fetch(SB.url + '/rest/v1/moods?select=mood,at&order=at.desc&limit=1', { headers: H(tok) }).then(r => r.json()).then(j => {
                if (j[0] && $('#lm'))
                    $('#lm').textContent = 'Her last mood: ' + j[0].mood + ' on ' + new Date(j[0].at).toLocaleString();
            }).catch(() => { });
    }, music() {
        const s = S.songs[cur];
        $('#bgart').style.backgroundImage = s?.art && U[s.art] ? `url('${U[s.art]}')` : 'none';
        $('#seek').oninput = e => {
            if (A.duration)
                A.currentTime = e.target.value / 1000 * A.duration;
        };
        $('#vol').oninput = e => A.volume = e.target.value / 100;
        A.ontimeupdate();
    }, cards: mountCardPack, timeline() {
        const o = new IntersectionObserver(es => es.forEach(x => {
            if (x.isIntersecting) {
                x.target.classList.add('in');
                o.unobserve(x.target);
            }
        }), { threshold: .15 });
        $$('.rv').forEach(e => o.observe(e));
    }
};
let tick;
function render() {
    const r = location.hash.slice(1), p = P[r] ? r : 'home';
    $('#app').innerHTML = P[p]();
    $$('nav a').forEach(a => a.classList.toggle('on', a.hash === '#' + p));
    if (p !== 'music')
        $('#bgart').style.backgroundImage = 'none';
    AFTER[p]?.();
    clearInterval(tick);
    const c = $('#cnt');
    if (c) {
        const f = () => {
            let d = Math.max(0, Date.now() - new Date(cfg.start + 'T00:00')), u = [['days', 864e5], ['hrs', 36e5], ['min', 6e4], ['sec', 1e3]];
            $('#cnt').innerHTML = u.map(([n, v], i) => {
                const x = Math.floor(d / v);
                d -= x * v;
                return `<div>${x}<small>${n}</small></div>`;
            }).join('');
            const k = Math.ceil((new Date(cfg.cdDate + 'T00:00') - Date.now()) / 864e5);
            $('#cd').innerHTML = k > 0 ? `${k}<small>days to go</small>` : k == 0 ? 'Today!' : `<small>${-k} days ago</small>`;
        };
        f();
        tick = setInterval(f, 1000);
    }
}
function rl(t) {
    return t.split('\n').map(x => x.trim()).filter(Boolean);
}
