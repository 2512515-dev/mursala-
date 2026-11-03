// js/actions.js
// Everything that happens when you click, type, upload or drag.

async function upload(kind, fs, id) {
    for (const f of fs) {
        if (kind === 'photos' || kind === 'rep' || kind === 'tl' || kind === 'art' || kind === 'card') {
            if (!f.type.startsWith('image/'))
                continue;
            const k = await saveFile(f, 1);
            if (kind === 'photos')
                S.photos.unshift({
                    id: uid(), file: k, cap: '', date: today(), note: '', r: Math.round(Math.random() * 8 - 4)
                });
            else if (kind === 'card')
                S.cards.unshift({
                    id: uid(), file: k, cap: '', r: Math.round(Math.random() * 6 - 3)
                });
            else {
                const o = kind === 'rep' ? S.photos.find(x => x.id == id) : kind === 'tl' ? S.tl.find(x => x.id == id) : S.songs.find(x => x.id == id), fk = kind === 'tl' ? 'photo' : kind === 'art' ? 'art' : 'file';
                delB(o[fk]);
                o[fk] = k;
            }
        }
        else if (kind === 'song') {
            if (!f.type.startsWith('audio/'))
                continue;
            S.songs.push({
                id: uid(), file: await saveFile(f), title: f.name.replace(/\.[^.]+$/, ''), artist: 'Unknown artist'
            });
        }
    }
    save();
    render();
    toast('Saved');
}
const ACT = {
    ed() {
        if (!ed && !cloud())
            return toast('Paste your Supabase URL and key at the top of the file first');
        if (!ed && !tok)
            return show('<form class="sheet" style="font:16px/1.5 var(--type)"><b>Sign in to edit</b><input class="field" id="le" type="email" placeholder="Email" autocomplete="username"><input class="field" id="lp" type="password" placeholder="Password" autocomplete="current-password"><button class="btn sm" data-a="login" type="button">Sign in</button><p id="lerr" role="alert" style="font-size:13px;color:var(--wine)"></p></form>');
        togEd();
    },
    async login() {
        // Shows the real reason on screen so problems are easy to spot.
        const say = m => { $('#lerr').textContent = m; };
        say('Signing in...');
        if (/\/$|\/rest|\/auth/.test(SB.url))
            return say('Config problem: the URL in js/config.js must be only https://xxxx.supabase.co (no / at the end, nothing after .co).');
        if (!SB.key.startsWith('eyJ'))
            return say('Config problem: the key in js/config.js should be the long "anon" key that starts with eyJ.');
        try {
            const r = await fetch(SB.url + '/auth/v1/token?grant_type=password', {
                method: 'POST', headers: { apikey: SB.key, 'Content-Type': 'application/json' }, body: JSON.stringify({ email: $('#le').value.trim(), password: $('#lp').value })
            }), j = await r.json();
            if (!j.access_token)
                return say('Supabase says: ' + (j.error_description || j.msg || j.message || JSON.stringify(j)) + ' (code ' + r.status + ')');
            tok = j.access_token;
            sessionStorage.setItem('ls-tok', tok);
            hide();
            togEd();
        }
        catch (e) {
            say('Could not reach Supabase (' + e.message + '). Check the URL in js/config.js and your internet.');
        }
    },
    pp: toggle, prev: () => nextS(-1), next: () => nextS(1), ps: (t, id) => playIdx(+id), cm: hide,
    tear: tearPack,
    swipe: swipeTop,
    delc(t, id) {
        const c = S.cards.find(x => x.id == id);
        delB(c.file);
        S.cards = S.cards.filter(x => x !== c);
        save();
        render();
    },
    lb(t, id) {
        const p = S.photos.find(x => x.id == id);
        show(`<figure class="pol" style="max-width:min(480px,92vw);transform:rotate(-1deg);animation:unf .5s"><img src="${U[p.file]}" alt="${esc(p.cap)}" style="aspect-ratio:auto;max-height:70vh;cursor:default"><figcaption>${esc(p.cap)}</figcaption><small>${fd(p.date)}</small><button class="x" data-a="cm" aria-label="Close">×</button></figure>`);
    },
    lbu(t, id) {
        show(`<figure class="pol" style="max-width:min(480px,92vw)"><img src="${U[id]}" alt="" style="aspect-ratio:auto;max-height:75vh"><button class="x" data-a="cm" aria-label="Close">×</button></figure>`);
    },
    delp(t, id) {
        const p = S.photos.find(x => x.id == id);
        delB(p.file);
        S.photos = S.photos.filter(x => x !== p);
        save();
        render();
    },
    adds() {
        const u = $('#su').value.trim();
        if (!u)
            return toast('Paste an audio link first');
        S.songs.push({
            id: uid(), url: u, title: $('#st').value || 'Untitled', artist: $('#sa').value || 'Unknown artist'
        });
        save();
        render();
    },
    dels(t, id) {
        const i = S.songs.findIndex(x => x.id == id);
        if (i == cur) {
            A.pause();
            cur = -1;
        }
        else if (i < cur)
            cur--;
        delB(S.songs[i].file);
        delB(S.songs[i].art);
        S.songs.splice(i, 1);
        save();
        sync(1);
    },
    env(t, id, e) {
        t.classList.toggle('open');
        burst(e);
    },
    ol: (t, id) => openL(id), addl() {
        const l = {
            id: uid(), title: 'New letter', body: 'Dear {her},\n\n', typed: true, hidden: false
        };
        S.letters.push(l);
        save();
        openL(l.id);
    },
    dell(t, id) {
        S.letters = S.letters.filter(x => x.id != id);
        save();
        hide();
        render();
    },
    rs() {
        $('#rs').textContent = pick(S.reasons);
    }, mys(t) {
        t.textContent = '💌 ' + pick(S.notes);
        t.disabled = true;
        $('#mys').textContent = t.textContent.slice(3);
    },
    fl() {
        if (bq.length >= 9)
            return toast('The vase is full!');
        bq.push({
            e: pick(['🌷', '🌹', '🌸', '🌼', '💐']), r: (bq.length - 4) * 11, h: 20 + Math.random() * 50
        });
        render();
    }, flr() {
        bq = [];
        render();
    },
    hh(t, id, e) {
        hearts++;
        $('#hc').textContent = hearts + ' hugs sent';
        burst(e);
    },
    mood(t, id) {
        if (cloud())
            fetch(SB.url + '/rest/v1/moods', {
                method: 'POST', headers: H('', { 'Content-Type': 'application/json' }), body: JSON.stringify({ mood: id })
            }).catch(() => { });
        mood = id;
        localStorage.setItem('ls-mood', id);
        $$('.moods button').forEach(b => b.classList.toggle('on', b === t));
        $('#mr').textContent = MR[id];
    },
    sp() {
        if (!S.photos.length)
            return toast('No photos yet');
        const p = pick(S.photos);
        $('#sp').innerHTML = `<figure class="pol" style="transform:rotate(-2deg);animation:unf .5s">${photoOf(p)}<figcaption>${esc(p.cap)}</figcaption></figure>`;
    },
    miss: () => show(`<div class="sheet"><button class="x" data-a="cm" aria-label="Close">×</button><div>${fill(cfg.miss)}</div></div>`),
    hid: (t, id, e) => {
        toast(pick(S.notes));
        burst(e);
    },
    addt() {
        S.tl.push({
            id: uid(), date: today(), title: 'New moment', text: 'What happened?'
        });
        save();
        render();
    }, delt(t, id) {
        const e = S.tl.find(x => x.id == id);
        delB(e.photo);
        S.tl = S.tl.filter(x => x !== e);
        save();
        render();
    }
};
document.addEventListener('click', e => {
    if (e.target.id === 'modal')
        return hide();
    const t = e.target.closest('[data-a]');
    if (t)
        ACT[t.dataset.a]?.(t, t.dataset.id, e);
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape')
        hide();
});
document.addEventListener('change', e => {
    const t = e.target;
    if (t.dataset.up) {
        upload(t.dataset.up, [...t.files], t.dataset.id);
        t.value = '';
        return;
    }
    if (!t.dataset.c)
        return;
    const f = t.dataset.f, v = t.type === 'checkbox' ? t.checked : t.value;
    if (t.dataset.c === 'list')
        S[f] = rl(v).length ? rl(v) : D[f];
    else if (t.dataset.c === 'cfg')
        cfg[f] = v;
    else
        S[t.dataset.c].find(x => x.id == t.dataset.id)[f] = v;
    save();
    if (t.dataset.c !== 'letters')
        render();
    else if (f === 'title' || f === 'hidden')
        render();
});
let dragId;
document.addEventListener('dragstart', e => {
    dragId = e.target.closest?.('.pol[data-id]')?.dataset.id;
});
document.addEventListener('dragover', e => {
    if (e.target.closest?.('#dz,.pol[data-id]')) {
        e.preventDefault();
        $('#dz')?.classList.toggle('over', !!e.target.closest('#dz'));
    }
});
document.addEventListener('drop', e => {
    const dz = e.target.closest?.('#dz'), pl = e.target.closest?.('.pol[data-id]');
    if (!dz && !pl)
        return;
    e.preventDefault();
    dz?.classList.remove('over');
    if (e.dataTransfer.files.length)
        return upload('photos', [...e.dataTransfer.files]);
    if (pl && dragId && pl.dataset.id !== dragId) {
        const a = S.photos.findIndex(x => x.id == dragId), [m] = S.photos.splice(a, 1), b = S.photos.findIndex(x => x.id == pl.dataset.id);
        S.photos.splice(b, 0, m);
        save();
        render();
    }
});
function togEd() {
    ed = !ed;
    document.body.classList.toggle('ed', ed);
    $('#edb').textContent = ed ? '✓ Done editing' : '✎ Edit mode';
    render();
}
