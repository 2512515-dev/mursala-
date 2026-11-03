// js/pages/timeline.js
// Page: Timeline

function timeline() {
    const ev = [...S.tl].sort((a, b) => a.date < b.date ? -1 : 1);
    return `<h2>Our timeline</h2><button class="btn edo" data-a="addt">+ Add a moment</button>
${ev.length ? `<div class="tl">${ev.map((e, i) => `<article class="ev rv"><div class="card ${i % 2 ? 'g' : 'k'}" style="transform:rotate(${i % 2 ? 1.5 : -1.5}deg)"><span class="stamp">${fd(e.date)}</span><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p>${e.photo && U[e.photo] ? `<figure class="pol" style="transform:rotate(2deg);margin-top:10px"><img src="${U[e.photo]}" alt="${esc(e.title)}" data-a="lbu" data-id="${e.photo}"></figure>` : ''}
<div class="edb"><input class="field" type="date" data-c="tl" data-id="${e.id}" data-f="date" value="${e.date}"><input class="field" data-c="tl" data-id="${e.id}" data-f="title" value="${esc(e.title)}"><textarea class="field" data-c="tl" data-id="${e.id}" data-f="text">${esc(e.text)}</textarea><label class="btn sm">Photo<input type="file" accept="image/*" data-up="tl" data-id="${e.id}" hidden></label> <button class="btn sm" data-a="delt" data-id="${e.id}">Delete</button></div></div></article>`).join('')}</div>` : '<div class="empty">No moments yet.</div>'}`;
}
