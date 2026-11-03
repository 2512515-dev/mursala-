// js/audio.js
// The single music player that keeps playing while you change pages.

const A = new Audio();
let cur = -1;
const srcOf = s => s.file ? U[s.file] : s.url;
const fmt = t => isFinite(t) ? Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0') : '0:00';
function playIdx(i) {
    const s = S.songs[i];
    if (!s)
        return toast('Add a song first (edit mode)');
    cur = i;
    A.src = srcOf(s);
    A.play().catch(() => toast('That audio could not be played'));
    sync(1);
}
const nextS = d => {
    if (S.songs.length)
        playIdx((cur + d + S.songs.length) % S.songs.length);
    else
        toast('Add a song first (edit mode)');
};
function toggle() {
    if (cur < 0)
        return playIdx(0);
    A.paused ? A.play() : A.pause();
}
function sync(re) {
    const s = S.songs[cur];
    $('#mp').innerHTML = ic(A.paused ? 'play' : 'pause');
    $('#mp').setAttribute('aria-label', A.paused ? 'Play' : 'Pause');
    $('#mt').textContent = s ? s.title + ' · ' + s.artist : 'No song yet';
    if (re && location.hash === '#music')
        render();
    else {
        $('#pp') && ($('#pp').innerHTML = ic(A.paused ? 'play' : 'pause', 22));
        $('.bars')?.classList.toggle('pl', !A.paused);
    }
}
A.onplay = A.onpause = () => sync();
A.onended = () => nextS(1);
A.ontimeupdate = A.onloadedmetadata = () => {
    const sk = $('#seek');
    if (sk && A.duration)
        sk.value = A.currentTime / A.duration * 1000;
    const t = $('#tm');
    if (t)
        t.textContent = fmt(A.currentTime) + ' / ' + fmt(A.duration);
};
