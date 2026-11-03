// js/cloud.js
// Supabase connection: sign-in token, saving content, uploading and deleting files.

let tok = sessionStorage.getItem('ls-tok') || '';
const cloud = () => !/PASTE_/.test(SB.url + SB.key);
const H = (t, x = {}) => ({
    apikey: SB.key, Authorization: 'Bearer ' + (t || SB.key), ...x
});
let st;
const save = () => {
    try {
        localStorage.setItem('ls-scrap', JSON.stringify(S));
    }
    catch { }
    if (!tok || !cloud())
        return;
    clearTimeout(st);
    st = setTimeout(async () => {
        try {
            const r = await fetch(SB.url + '/rest/v1/site', {
                method: 'POST', headers: H(tok, { 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates' }), body: JSON.stringify({ id: 1, data: S })
            });
            if (!r.ok)
                throw 0;
        }
        catch {
            tok = '';
            sessionStorage.removeItem('ls-tok');
            toast('Could not save online. Turn edit mode off and on to sign in again.');
        }
    }, 600);
};
const U = {}, pub = k => SB.url + '/storage/v1/object/public/' + BUCKET + '/' + k;
const loadU = async (k) => {
    if (k)
        U[k] = pub(k);
};
const delB = k => k && tok && fetch(SB.url + '/storage/v1/object/' + BUCKET + '/' + k, { method: 'DELETE', headers: H(tok) }).catch(() => { });
async function saveFile(f, img) {
    if (!tok || !cloud()) {
        toast('Sign in first (edit mode)');
        throw 0;
    }
    let b = f;
    if (img) {
        try {
            const bm = await createImageBitmap(f), sc = Math.min(1, 1400 / Math.max(bm.width, bm.height)), c = document.createElement('canvas');
            c.width = bm.width * sc;
            c.height = bm.height * sc;
            c.getContext('2d').drawImage(bm, 0, 0, c.width, c.height);
            b = await new Promise(r => c.toBlob(r, 'image/jpeg', .85)) || f;
        }
        catch { }
    }
    const k = uid() + (img ? '.jpg' : '.' + ((f.name.split('.').pop() || 'bin').replace(/\W/g, '')));
    const r = await fetch(SB.url + '/storage/v1/object/' + BUCKET + '/' + k, {
        method: 'POST', headers: H(tok, { 'Content-Type': b.type || 'application/octet-stream' }), body: b
    });
    if (!r.ok) {
        toast('Upload failed. Check the SQL setup step.');
        throw 0;
    }
    U[k] = pub(k);
    return k;
}
const SEEN = new Set(JSON.parse(localStorage.getItem('ls-seen') || '[]'));
