// js/pages/memories.js
// Page: Memories. Photos can sit beside a song widget; its lyrics scroll behind the photo as the song plays.

function songWidget(p) {
    const s = S.songs.find(x => x.id == p.song);
    if (!s)
        return '';
    const art = s.art && U[s.art];
    const lines = rl(s.lyrics || '');
    return `<div class="mw" data-song="${s.id}">
<div class="mw-head"><div class="mw-art" ${art ? `style="background-image:url('${art}')"` : ''}>${art ? '' : '♪'}</div><div class="mw-info"><span class="mw-title">${esc(s.title)}</span><span class="mw-artist">${esc(s.artist)}</span></div><button class="mw-play" data-a="mwp" data-id="${s.id}" aria-label="Play ${esc(s.title)}">${ic('play', 16)}</button></div>
<div class="mw-prog"><i></i></div>
${lines.length ? `<div class="mw-lyrics"><div class="mw-lyrics-inner">${lines.map(l => `<p>${esc(l)}</p>`).join('')}</div></div>` : ''}</div>`;
}

function memoryCard(p, i) {
    const R = ((i * 37) % 9) - 4, song = songWidget(p);
    return `<article class="memory"><div class="spread${song ? '' : ' solo'}">${song}
<figure class="pol tape t${i % 3 + 1}" data-id="${p.id}" draggable="${ed}" style="transform:rotate(${p.r ?? R}deg)">${photoOf(p)}<figcaption>${esc(p.cap) || '&nbsp;'}</figcaption><small>${fd(p.date)}</small></figure>${p.note ? `<div class="sticky-note">${esc(p.note)}</div>` : ''}</div>
<div class="edb"><input class="field" placeholder="Caption" data-c="photos" data-id="${p.id}" data-f="cap" value="${esc(p.cap)}"><input class="field" type="date" data-c="photos" data-id="${p.id}" data-f="date" value="${p.date || ''}"><input class="field" placeholder="Handwritten note" data-c="photos" data-id="${p.id}" data-f="note" value="${esc(p.note)}">
<label class="field">Song beside this photo<select class="field" data-c="photos" data-id="${p.id}" data-f="song"><option value="">No song</option>${S.songs.map(s => `<option value="${s.id}" ${s.id == p.song ? 'selected' : ''}>${esc(s.title)}</option>`).join('')}</select></label>
<label class="btn sm">Replace<input type="file" accept="image/*" data-up="rep" data-id="${p.id}" hidden></label> <button class="btn sm" data-a="delp" data-id="${p.id}">Delete</button><div class="note">Drag onto another photo to reorder</div></div></article>`;
}

function memories() {
    return `<h2>Our memories</h2><p>Click a photo to see it bigger.</p>
<div class="edb"><div class="dz" id="dz">Drop photos here, or <label class="btn sm">choose photos<input type="file" accept="image/*" multiple data-up="photos" hidden></label></div></div>
${S.photos.length ? `<div class="spreads">${S.photos.map(memoryCard).join('')}</div>` : '<div class="empty">No photos yet.<br><small style="font:13px var(--type)">Turn on Edit mode, then add your first photo.</small></div>'}`;
}

function paintWidgets() {
    const now = S.songs[cur];
    $$('.mw[data-song]').forEach(w => {
        const on = !!now && w.dataset.song == now.id, p = on && A.duration ? A.currentTime / A.duration : 0;
        w.classList.toggle('playing', on && !A.paused);
        $('.mw-play', w).innerHTML = ic(on && !A.paused ? 'pause' : 'play', 16);
        w.style.setProperty('--p', p);
        const ly = $('.mw-lyrics', w);
        if (ly)
            ly.scrollTop = p * (ly.scrollHeight - ly.clientHeight);
    });
}
