// js/pages/letters.js
// Page: Letters

function letters() {
    return `<h2>Love letters</h2><p>Click an envelope to open it.</p><button class="btn edo" data-a="addl">+ Write a letter</button>
<div class="row" style="margin-top:50px">${S.letters.map((l, i) => `<div><button class="env" style="transform:rotate(${(i % 3 - 1) * 3}deg);margin-top:20px;background:${l.hidden && !SEEN.has(l.id) && !ed ? '#b99' : '#dba99a'}" data-a="ol" data-id="${l.id}"><span class="fl" style="transform:none;z-index:3"></span><span class="sl">♥</span><span class="fr">${l.hidden && !SEEN.has(l.id) && !ed ? 'a sealed one…' : esc(l.title)}</span></button></div>`).join('')}</div>`;
}
function openL(id) {
    const l = S.letters.find(x => x.id == id);
    if (!l)
        return;
    SEEN.add(id);
    localStorage.setItem('ls-seen', JSON.stringify([...SEEN]));
    show(ed ? `<div class="sheet"><button class="x" data-a="cm" aria-label="Close">×</button><input class="field" data-c="letters" data-id="${id}" data-f="title" value="${esc(l.title)}"><textarea class="field" data-c="letters" data-id="${id}" data-f="body">${esc(l.body)}</textarea><label><input type="checkbox" data-c="letters" data-id="${id}" data-f="typed" ${l.typed ? 'checked' : ''}> typing animation</label> <label><input type="checkbox" data-c="letters" data-id="${id}" data-f="hidden" ${l.hidden ? 'checked' : ''}> hidden until clicked</label><br><button class="btn sm" data-a="dell" data-id="${id}">Delete letter</button></div>` : `<div class="sheet"><button class="x" data-a="cm" aria-label="Close">×</button><div id="lb"></div></div>`);
    if (!ed) {
        const t = l.body.replace(/\{her\}/g, cfg.her).replace(/\{me\}/g, cfg.me);
        l.typed ? typeInto($('#lb'), t) : $('#lb').textContent = t;
    }
    render();
}
