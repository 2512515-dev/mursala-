// js/data.js
// Default content and the app state (S). Edit mode saves over these defaults.

const D = {
    cfg: {
        her: 'Her Name', me: 'My Name', start: '2024-02-14', cdDate: '2027-02-14', cdLabel: 'Our anniversary', intro: 'I made you a little corner of the internet, full of us. Take your time. Open everything.', env: 'You are my favourite part of every day.', miss: 'Breathe. I am thinking of you right now, and I will see you soon. Go drink some water, then play our song.', pin: ''
    },
    photos: [], songs: [], cards: [],
    letters: [{
            id: 'l1', title: 'Read me first', typed: true, hidden: false, body: 'Dear {her},\n\nThis is a placeholder letter. In edit mode you can rewrite it, add more, and hide some until she finds them.\n\nAlways yours,\n{me}'
        }, {
            id: 'l2', title: 'For a bad day', typed: false, hidden: false, body: '{her}, bad days end. You do not have to be okay today. I am here.'
        }, {
            id: 'l3', title: 'A secret one', typed: true, hidden: true, body: 'You found the hidden letter. I love how curious you are.'
        }],
    tl: [{
            id: 't1', date: '2024-02-14', title: 'The day we met', text: 'Edit this story in edit mode.'
        }, {
            id: 't2', date: '2024-06-01', title: 'Our first trip', text: 'Add a photo to each moment.'
        }],
    reasons: ['Your laugh makes the whole room softer.', 'You notice small things.', 'You make ordinary days feel like events.', 'You are brave in quiet ways.'],
    notes: ['Today is better because you exist.', 'You are loved, completely.', 'Drink water. Then smile at something.', 'I am proud of you.', 'Thinking of you, as always.']
};
let S;
try {
    S = JSON.parse(localStorage.getItem('ls-scrap'));
}
catch { }
S = Object.assign({}, D, S || {});
S.cfg = Object.assign({}, D.cfg, S.cfg);
const cfg = S.cfg;
let ed = false; // true while edit mode is on
