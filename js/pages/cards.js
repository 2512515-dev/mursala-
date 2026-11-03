// js/pages/cards.js
// Page: Cards. Tear open a 3D pack, then swipe through its 8 random cards.

const PACK_SIZE = 8;
let deck = [], packDone = false, swiping = false;

function shuffle(list) {
    const a = [...list];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function drawPack(list) {
    const out = [];
    while (out.length < PACK_SIZE)
        out.push(...shuffle(list));
    return out.slice(0, PACK_SIZE);
}

function cardFigure(c, i) {
    return `<figure class="pol tape t${i % 3 + 1}" style="transform:rotate(${c.r ?? 0}deg)">${c.file && U[c.file] ? `<img src="${U[c.file]}" alt="${esc(c.cap || 'A card')}" data-a="lbu" data-id="${c.file}">` : '<div class="ph">photo missing</div>'}<figcaption>${esc(c.cap) || '&nbsp;'}</figcaption>
<div class="edb"><input class="field" placeholder="Caption" data-c="cards" data-id="${c.id}" data-f="cap" value="${esc(c.cap)}"><button class="btn sm" data-a="delc" data-id="${c.id}">Delete</button></div></figure>`;
}

function cards() {
    const empty = !S.cards.length;
    return `<h2>Our cards</h2>
<div class="pack-area"><div class="pack-3d" id="pack3d"></div><div class="deck" id="deck" aria-live="polite"></div></div>
<p class="pack-msg" id="pmsg">${empty ? 'The pack is empty. Turn on edit mode to add cards.' : 'Drag across the pack to tear it open, or press the button.'}</p>
<div class="pack-actions"><button class="btn" id="tear" data-a="tear" ${empty ? 'disabled' : ''}>Tear it open</button></div>
${ed ? `<div class="edb"><label class="btn sm">Add cards to the pack<input type="file" accept="image/*" multiple data-up="card" hidden></label></div>
${S.cards.length ? `<div class="card-stack">${S.cards.map(cardFigure).join('')}</div>` : ''}` : ''}`;
}

function setStatus(text, label, busy) {
    $('#pmsg').textContent = text;
    const b = $('#tear');
    b.textContent = label;
    b.disabled = busy || !S.cards.length;
}

function paintDeck() {
    const n = deck.length;
    $('#deck').innerHTML = deck.map((c, i) => `<figure class="dk${i === 0 ? ' top' : ''}"${i === 0 ? ' data-a="swipe"' : ''} style="--d:${i};z-index:${n - i};animation-delay:${(n - 1 - i) * 90}ms"><img src="${U[c.file]}" alt="${esc(c.cap || 'A card from the pack')}" draggable="false"></figure>`).join('');
}

function layoutDeck() {
    $$('#deck .dk').forEach((el, i) => {
        el.style.setProperty('--d', i);
        el.style.zIndex = deck.length - i;
        el.classList.toggle('top', i === 0);
        if (i === 0)
            el.dataset.a = 'swipe';
        else
            delete el.dataset.a;
    });
}

function openDeck() {
    deck = drawPack(S.cards);
    paintDeck();
    setStatus(`Tap the top card to see the next one. ${deck.length} to go.`, 'Swipe through the cards', true);
}

function swipeTop(el) {
    if (swiping)
        return;
    swiping = true;
    el.classList.add('out');
    setTimeout(() => {
        deck.shift();
        el.remove();
        layoutDeck();
        swiping = false;
        if (deck.length)
            setStatus(`Tap the top card to see the next one. ${deck.length} to go.`, 'Swipe through the cards', true);
        else {
            packDone = true;
            setStatus('That was the whole pack.', 'Open another pack', false);
        }
    }, 460);
}

function tearPack() {
    if (packDone)
        return resetPack();
    if (!pk)
        return toast('The pack is still loading');
    pk.rip();
}

function resetPack() {
    pk?.reset();
    deck = [];
    packDone = false;
    $('#deck').innerHTML = '';
    setStatus('Drag across the pack or press the button to tear it open.', 'Tear it open', false);
}

function mountCardPack() {
    deck = [];
    packDone = false;
    swiping = false;
    mountPack($('#pack3d'), {
        canOpen: () => {
            if (!S.cards.length)
                toast('Turn on edit mode to add cards first');
            return S.cards.length > 0;
        },
        onRip: () => setStatus('Tearing it open...', 'Tearing...', true),
        onOpen: openDeck
    });
}
