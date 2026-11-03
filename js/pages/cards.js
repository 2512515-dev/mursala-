// js/pages/cards.js
// Page: Cards (tap the pack to open a random card from the stack)

function cardFigure(c, i) {
    return `<figure class="pol tape t${i % 3 + 1}" style="transform:rotate(${c.r ?? 0}deg)">${c.file && U[c.file] ? `<img src="${U[c.file]}" alt="${esc(c.cap || 'A card')}" data-a="lbu" data-id="${c.file}">` : '<div class="ph">photo missing</div>'}<figcaption>${esc(c.cap) || '&nbsp;'}</figcaption>
<div class="edb"><input class="field" placeholder="Caption" data-c="cards" data-id="${c.id}" data-f="cap" value="${esc(c.cap)}"><button class="btn sm" data-a="delc" data-id="${c.id}">Delete</button></div></figure>`;
}

function cards() {
    return `<h2>Our cards</h2><p>Tap the pack to open a card.</p>
<div class="pack-wrap"><button class="pack" data-a="pk" aria-label="Open a card from the pack"><img src="textures/pack_2.png" alt=""><span>Tap to open</span></button></div>
<div class="edb"><label class="btn sm">Add cards to the pack<input type="file" accept="image/*" multiple data-up="card" hidden></label></div>
${S.cards.length ? `<div class="card-stack">${S.cards.map(cardFigure).join('')}</div>` : '<div class="empty">The pack is empty.<br><small style="font:13px var(--type)">Turn on Edit mode, then add your first card.</small></div>'}`;
}
