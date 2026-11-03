// js/pages/memories.js
// Page: Memories

function memories() {
    const W = [230, 270, 210, 250], R = i => ((i * 37) % 9) - 4;
    return `<h2>Our memories</h2><p>Click a photo to see it bigger.</p>
<div class="edb"><div class="dz" id="dz">Drop photos here, or <label class="btn sm">choose photos<input type="file" accept="image/*" multiple data-up="photos" hidden></label></div></div>
${S.photos.length ? `<div class="board">${S.photos.map((p, i) => `<div style="display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;justify-content:center"><figure class="pol tape t${i % 3 + 1}" data-id="${p.id}" draggable="${ed}" style="width:${W[i % 4]}px;transform:rotate(${p.r ?? R(i)}deg)">${photoOf(p)}<figcaption>${esc(p.cap) || '&nbsp;'}</figcaption><small>${fd(p.date)}</small>
<div class="edb"><input class="field" placeholder="Caption" data-c="photos" data-id="${p.id}" data-f="cap" value="${esc(p.cap)}"><input class="field" type="date" data-c="photos" data-id="${p.id}" data-f="date" value="${p.date || ''}"><input class="field" placeholder="Handwritten note" data-c="photos" data-id="${p.id}" data-f="note" value="${esc(p.note)}">
<label class="btn sm">Replace<input type="file" accept="image/*" data-up="rep" data-id="${p.id}" hidden></label> <button class="btn sm" data-a="delp" data-id="${p.id}">Delete</button><div class="note">Drag onto another photo to reorder</div></div></figure>${p.note ? `<div class="sticky">${esc(p.note)}</div>` : ''}</div>`).join('')}</div>` : '<div class="empty">No photos yet.<br><small style="font:13px var(--type)">Turn on Edit mode, then add your first photo.</small></div>'}`;
}
