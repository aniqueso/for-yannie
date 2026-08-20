# Yannie Interactive Scrapbook

A mobile-first interactive scrapbook built with plain HTML, CSS and JavaScript.
No npm, Three.js, framework, or CDN is required.

## Run it

Recommended:
1. Put the `yannie-scrapbook` folder inside your website project.
2. Open your main website folder in VS Code.
3. Use Live Server.
4. Visit `yannie-scrapbook/index.html`.

Because this project is plain static HTML/CSS/JS, it will also work on Vercel/GitHub Pages once deployed with the rest of your site.

## Add it to your homepage

Inside your existing `.app-grid`:

```html
<a class="app-icon app-link" href="yannie-scrapbook/index.html">
  📖<span>Our Scrapbook</span>
</a>
```

## Replace photos

Put your real photos inside:

`yannie-scrapbook/assets/photos/`

Then open `scrapbook-content.js` and change a photo entry, for example:

```js
{
  src: "./assets/photos/first-date.jpg",
  title: "Our First Date",
  caption: "Whatever you want her to read."
}
```

You can use JPG, PNG, WEBP or GIF files.

## Change text / chapters

Almost all scrapbook wording is inside `scrapbook-content.js`.
The complicated interactions live in `scrapbook.js`, so you usually do not need to edit that file.

## Included interactions

- Swipe left/right between pages
- Receipt that slides out of an envelope
- Tappable polaroid photo modal
- Shuffling memory-card stack
- Flip-open care flaps
- Sticker reveal
- Pull-out scheduled-message letter
- Interactive phone that cycles through real call durations
- Drag-together torn paper page
- SPM × UTeM connect-the-call interaction
- Tappable present-day badges
- Deliberately unfinished final page
- Remembers the last page visited with localStorage

## Mobile notes

The UI is designed around portrait phone screens first. On larger screens it simply gives the paper more breathing room.
