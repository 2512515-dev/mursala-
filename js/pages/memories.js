// js/pages/memories.js
// Page: Memories

function songWidget(song) {
    const i = S.songs.indexOf(song);
    const art = song.art && U[song.art];
    const lines = (song.lyrics || '').split('\n').map(x => x.trim()).filter(Boolean);
    const lyrics = lines.length ? esc(lines.join('\n')).replace(/\n/g, '<br>') : '';
    return `<div class="mw" data-sid="${song.id}" style="--lyr-dur:${Math.max(12, lines.length * 2.4)}s">
<div class="mw-head"><div class="mw-art" ${art ? `style="background-image:url('${U[song.art]}')"` : ''}>${art ? '' : '♪'}</div><div style="min-width:0;flex:1"><span class="mw-title">${esc(song.title)}</span><span class="mw-artist">${esc(song.artist)}</span></div>
<button class="mw-play" data-a="ps" data-id="${i}" aria-label="Play ${esc(song.title)}">${ic('play', 16)}</button></div>
${lyrics ? `<div class="mw-lyrics"><div class="mw-lyrics-inner">${lyrics}<br><br>${lyrics}</div></div>` : '<div class="mw-empty">No lyrics yet<small>add them in the Playlist (edit mode)</small></div>'}</div>`;
}

function memoryFigure(p, i) {
    const song = S.songs.find(x => x.id == p.songId);
    return `<figure class="pol tape t${i % 3 + 1}" data-id="${p.id}" draggable="${ed}" style="transform:rotate(${p.r ?? 0}deg)">${photoOf(p)}<figcaption>${esc(p.cap) || '&nbsp;'}</figcaption><small>${fd(p.date)}</small>
<div class="edb"><input class="field" placeholder="Caption" data-c="photos" data-id="${p.id}" data-f="cap" value="${esc(p.cap)}"><input class="field" type="date" data-c="photos" data-id="${p.id}" data-f="date" value="${p.date || ''}"><input class="field" placeholder="Handwritten note" data-c="photos" data-id="${p.id}" data-f="note" value="${esc(p.note)}">
<label class="pick-song">Song beside this photo<select class="field" data-c="photos" data-id="${p.id}" data-f="songId"><option value="">No song</option>${S.songs.map(s => `<option value="${s.id}" ${s.id == p.songId ? 'selected' : ''}>${esc(s.title)}</option>`).join('')}</select></label>
<label class="btn sm">Replace<input type="file" accept="image/*" data-up="rep" data-id="${p.id}" hidden></label> <button class="btn sm" data-a="delp" data-id="${p.id}">Delete</button><div class="note">Drag onto another photo to reorder</div></div></figure>`;
}

function memories() {
    return `<h2>Our memories</h2><p>Click a photo to see it bigger.</p>
<div class="edb"><div class="dz" id="dz">Drop photos here, or <label class="btn sm">choose photos<input type="file" accept="image/*" multiple data-up="photos" hidden></label></div></div>
${S.photos.length ? `<div class="spreads">${S.photos.map((p, i) => {
    const song = S.songs.find(x => x.id == p.songId);
    return `<div class="spread${song ? '' : ' solo'}">${song ? songWidget(song) : ''}${memoryFigure(p, i)}${p.note ? `<div class="sticky sticky-note">${esc(p.note)}</div>` : ''}</div>`;
}).join('')}</div>` : '<div class="empty">No photos yet.<br><small style="font:13px var(--type)">Turn on Edit mode, then add your first photo.</small></div>'}`;
}
