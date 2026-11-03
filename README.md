# Our Little Universe

A six-page digital scrapbook: Home, Memories, Letters, Playlist, Surprises, Timeline.
Plain HTML, CSS and JavaScript. No build step, nothing to install.

## Folder map

```
index.html            The page shell. Loads every file below.
css/
  base.css            Colours, fonts, paper background
  layout.css          Header, navigation, buttons, edit-mode switches
  components.css      Polaroids, tape, cards, envelopes, forms, popups
  pages.css           Music player, surprises, timeline, effects
  responsive.css      Phones, reduced motion
js/
  config.js           YOUR TWO SUPABASE VALUES GO HERE (the only file you must edit)
  data.js             Default text and the app state
  utils.js            Small helpers (icons, toast, hearts, typing effect)
  cloud.js            Sign-in, saving content, uploading files
  audio.js            Music player that keeps playing between pages
  pages/              One file per page: home, memories, letters, music, surprises, timeline
  router.js           Switches pages from the #hash in the address
  actions.js          Clicks, typing, uploads, drag and drop
  main.js             Start-up
supabase/setup.sql    Paste into Supabase once to create storage and lock editing to you
```

## Setup

1. Create a free project at supabase.com.
2. SQL Editor > New query > paste `supabase/setup.sql` > Run.
3. Authentication > Users > Add user (your email and a password, tick Auto Confirm).
4. Project Settings > API: copy the Project URL and the legacy `anon` key (starts with `eyJ`).
5. Open `js/config.js` and paste both values between the quotes.
6. Go to app.netlify.com/drop and drag the whole `our-little-universe` folder in.

## Editing the site

Open your link, click "Edit mode", sign in with the user from step 3.
Everything you add is saved online and shows on her device after a refresh.

## Where to change things later

| I want to change...            | Open this file          |
|--------------------------------|-------------------------|
| Colours and fonts              | css/base.css            |
| Wording on a page              | js/pages/<page>.js      |
| Starting placeholder content   | js/data.js              |
| Supabase connection            | js/config.js            |
