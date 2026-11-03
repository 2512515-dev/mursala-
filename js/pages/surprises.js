// js/pages/surprises.js
// Page: Surprises

let bq = [], hearts = 0, mood = localStorage.getItem('ls-mood');
const MO = ['😊', '🥰', '😴', '😢', '🤪'], MR = {
    '😊': 'Glad you are happy.', '🥰': 'Same. Always.', '😴': 'Rest. You deserve it.', '😢': 'Come here. I love you.', '🤪': 'Never change.'
};
function surprises() {
    const ph = S.photos.length;
    return `<h2>Little surprises</h2><span class="hid" style="right:8%;top:60px" data-a="hid" aria-label="Hidden message">✦</span><span class="hid" style="left:3%;top:700px" data-a="hid" aria-label="Hidden message">♡</span>
<div class="grid"><div class="card k" style="transform:rotate(-1deg)"><h3>Why I love you</h3><div class="reveal" id="rs" aria-live="polite">Press the button.</div><button class="btn" data-a="rs">Tell me a reason</button><div class="edb"><label>Reasons, one per line<textarea class="field" data-c="list" data-f="reasons">${esc(S.reasons.join('\n'))}</textarea></label></div></div>
<div class="card p" style="transform:rotate(1deg)"><h3>Mystery envelopes</h3><div class="reveal" id="mys" style="font-size:22px;min-height:70px"></div><div>${[1, 2, 3].map(() => '<button class="btn sm" data-a="mys" style="margin:3px">💌 open</button>').join('')}</div></div>
<div class="card" style="text-align:center"><h3>A bouquet for you</h3><div class="vase" id="vase">${bq.map(f => `<i style="--r:${f.r}deg;transform:rotate(${f.r}deg) translateY(-${f.h}px)">${f.e}</i>`).join('')}</div><button class="btn sm" data-a="fl">Add a flower</button> <button class="lnk" data-a="flr">start over</button></div>
<div class="card g" style="text-align:center"><h3>Squeeze the heart</h3><button class="heart" data-a="hh" aria-label="Send a heart">♥</button><div id="hc" class="q">${hearts ? hearts + ' hugs sent' : 'Tap it.'}</div></div>
<div class="card"><h3>How are you feeling?</h3><div class="moods" role="group">${MO.map(m => `<button data-a="mood" data-id="${m}" class="${m == mood ? 'on' : ''}" aria-label="Mood ${m}">${m}</button>`).join('')}</div><div class="q" id="mr" style="margin-top:10px">${MR[mood] || ''}</div><div class="edb note" id="lm"></div></div>
<div class="card k"><h3>A surprise photo</h3><div id="sp">${ph ? '' : '<div class="note">Add photos in Memories first.</div>'}</div><button class="btn sm" data-a="sp">Reveal one</button></div>
<div class="card p" style="text-align:center"><h3>Open when you miss me</h3><button class="env" style="margin-top:20px;width:190px;height:120px" data-a="miss" aria-label="Open when you miss me"><span class="fl" style="transform:none;height:70px"></span><span class="sl" style="top:55px">♥</span><span class="fr" style="font-size:18px">open when…</span></button></div></div>`;
}
