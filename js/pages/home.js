// js/pages/home.js
// Page: Home

function home() {
    const p = S.photos.length ? pick(S.photos) : null;
    return `<section class="hero"><div class="tw"><div class="kraft tape"><h1>A little place made just for you.</h1><p>Hi ${fill(cfg.her)}.</p><p>${fill(cfg.intro)}</p><br><a class="btn" href="#memories">Open our memories</a><a class="lnk" href="#letters">Read your letters</a></div></div>
<figure class="pol tape" style="transform:rotate(-3deg)">${p ? photoOf(p) : '<div class="ph">Your photo of the day lands here.<br>Add photos in Memories (edit mode).</div>'}<span class="sticker" aria-hidden="true">☺</span><figcaption>${p ? esc(p.cap || 'Memory of the day') : 'Memory of the day'}</figcaption>${p ? `<small>${fd(p.date)}</small>` : ''}</figure>
<div class="lined"><b>TODAY:</b><ul style="padding:0;margin:6px 0"><li>${esc(pick(S.notes))}</li></ul>♡ ${fill(cfg.me)}</div></section>
<section class="row"><div class="card k" style="transform:rotate(-1.5deg)"><h3>Together for</h3><div class="cnt" id="cnt"></div><div class="note">since ${fd(cfg.start)}</div></div>
<div><button class="env" data-a="env" aria-label="Open the envelope"><span class="fl"></span><span class="sl">♥</span><span class="ltr">${fill(cfg.env)}</span><span class="fr">for ${fill(cfg.her)}</span></button></div>
<div class="card g" style="transform:rotate(1.5deg)"><h3>Counting down to</h3><div class="q">${esc(cfg.cdLabel)}</div><div class="cnt" style="grid-template-columns:1fr" id="cd"></div></div></section>
<span class="hid" style="display:none"></span>
<section class="edb card" style="margin-top:60px"><h2>Settings</h2><p class="note">Saved online, so everyone who opens the site sees your changes.</p><div class="grid">${[['her', 'Her name'], ['me', 'Your name'], ['start', 'Together since', 'date'], ['cdDate', 'Countdown date', 'date'], ['cdLabel', 'Countdown label']].map(([f, l, t]) => `<label>${l}<input class="field" data-c="cfg" data-f="${f}" type="${t || 'text'}" value="${esc(cfg[f])}"></label>`).join('')}
${[['intro', 'Intro note'], ['env', 'Envelope message'], ['miss', 'Open when you miss me']].map(([f, l]) => `<label>${l}<textarea class="field" data-c="cfg" data-f="${f}">${esc(cfg[f])}</textarea></label>`).join('')}
<label>Daily notes (one per line)<textarea class="field" data-c="list" data-f="notes">${esc(S.notes.join('\n'))}</textarea></label></div></section>`;
}
