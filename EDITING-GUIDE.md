# alt108 website: editing guide (Freight design, November 2026)

This guide is for you, Manu. It explains how the site is put together, how to change it yourself, and how to put it live.

## How the site is put together

Think of the site like a house:

- **HTML files** (`index.html` and the demo pages) are the **rooms and furniture**: the words, photos, buttons and boxes.
- **CSS** (`css/style.css`) is the **paint and decoration**: colours, fonts, spacing and layout. One file styles every page.

The Freight design is built from **tiles**: rounded boxes sitting on a grey table. A tile is just a `<div class="tile">`. Add `dark` or `orange` to change its colour: `<div class="tile dark">`. Grids place tiles side by side, and on phones they stack automatically.
- **JavaScript** (`js/main.js`) is the **wiring**: the phone menu and the contact form.

So, to change **words**, edit the HTML. To change a **colour or font**, edit the CSS. You rarely need to touch the JavaScript.

There's no build step and nothing to install. What you see in the files is exactly what the browser gets.

## Folder map

```
site/                    <- this whole folder is what you upload
  index.html             main page (all sections, top to bottom)
  css/style.css          all styling; colours are at the very top
  js/main.js             phone menu + contact form
  images/                photos and the little tab icon
  assettracker/          MAIN demo: asset tracker page (with the workflow picture)
  inspector/index.html   demo page for the inspection reports
  inspector/app.html     your inspection app (1Demo TechInspect v01.html)
  receptionist/          AI receptionist page (call-in number: 0495 102 009)
  frueets-info/          Game of Frueets info page (the game itself lives at /frueets/)
  snippets/              testimonials block, ready to paste in later
```

Each demo lives in its own folder with an `index.html` inside. That's what makes the address `alt108.com/inspector` work without typing `.html`.

## Try it on your own computer first

1. Open the `site` folder.
2. Double-click `index.html`. It opens in your browser.
3. Make a change in a text editor (VS Code is free and good), save, and refresh the browser.

Two things only work once the site is live: links that end in a folder name (open `inspector/index.html` directly instead), and the embedded Airtable and Render views.

## Common changes

Every section in the HTML starts with a big comment box like this, so search for it:

```html
<!-- =================================================================
     2. DEMOS
     ...
     ================================================================= -->
```

**Change some words:** find the sentence in the HTML file and type over it. Leave the `<tags>` around it alone.

**Swap a photo:**

1. Put the new photo in `images/`. Use a short file name with no spaces, such as `manu-2027.jpg`.
2. In `index.html`, change `src="images/manu-suit.jpg"` to the new name.
3. Keep the photo under about 300 KB so the page loads fast on phones.

**Change a colour:** open `css/style.css`. The colours are listed at the top under `1. COLOURS, FONTS AND SIZES`. For example, change `--orange: #FF5A1F;` and every orange button, tile and highlight changes with it.

**Change a word inside a picture:** the three diagrams (Paper to app, Three circles, Workflow) are drawings written as code, called SVG. They sit right inside the HTML. Find the word between `<text ...>` and `</text>` and type over it. Keep words about the same length so they still fit.

**Change the AI receptionist's number:** search all files for `0495 102 009`. It appears on the home page demo card and on `receptionist/index.html`. Change both the words you see and the `tel:+61495102009` link next to them (the link uses +61 and drops the first 0).

**Game of Frueets:** the game itself lives at alt108.com/frueets/. That's why its info page is in a folder called `frueets-info`. Never name a website folder `frueets`, or uploading the site could replace the game.

**Add a demo card:** in `index.html`, find section `2. DEMOS`. Copy one whole `<article class="tile demo-card"> ... </article>` block, paste it below the others, and change the words and the link. The first card has `dark` in its class and is wider: that's the main demo.

**Add a demo page:**

1. Copy the `assettracker` folder and rename the copy, for example `quotegenerator`.
2. Edit the words inside its `index.html`. It already has the standard blocks.
3. Point the new demo card's button to `quotegenerator/`.

**Add an FAQ question:** in section `9. FAQ`, copy one `<details> ... </details>` block. The `<summary>` is the question and the `<p>` is the answer.

**Switch on testimonials:** open `snippets/testimonials.html` and follow the steps at the top of that file. In short, paste its section into `index.html` under the `8. TESTIMONIALS` comment and fill in the real quotes.

**Add the walkthrough video:** each demo page has a comment above the video box that shows exactly what to paste in.

**Add the asset tracker's Airtable view:** the comment inside `assettracker/index.html`, next to "The register", shows the steps.

## Connect the contact form

Right now the form opens the visitor's email app with their answers already filled in. That works, but some people won't press send. It's better to send enquiries to n8n:

1. In n8n, create a workflow that starts with a **Webhook** node. Set the method to **POST** and copy the **Production URL**.
2. Add a node after it that emails you (Gmail or Send Email), or one that adds a row to Airtable. The fields arrive as Name, Company, Email, Phone, Staff, Revenue and Idea, plus Attachment if they uploaded a file.
3. Activate the workflow.
4. Open `js/main.js` and paste the URL between the quotes:

   ```js
   const FORM_WEBHOOK = "https://alt108.app.n8n.cloud/webhook/....";
   ```

5. Upload the site again, then test the form with your own details.

## Put it live on Cloudflare

Your inspection app is currently the home page of alt108.com. When you upload this site, it moves to **alt108.com/inspector**, and the new main page takes its place.

**Important: Game of Frueets.** An upload replaces everything in the Cloudflare project. If the game is served from this same project, copy the game's files into a folder called `frueets` inside `site-v2` before you upload, so alt108.com/frueets/ keeps working. If the game is hosted somewhere else, you don't need to do anything.

1. Log in to Cloudflare and go to **Workers & Pages**.
2. Open the project that currently serves alt108.com. If you don't have one yet, choose **Create → Pages → Upload assets**.
3. Choose **Create deployment** (or **Upload**) and drag in the **contents of the `site-v2` folder**.
4. Wait about a minute, then open www.alt108.com and click through every demo.

If something looks wrong, Cloudflare keeps every past deployment. Under **Deployments**, choose an older one and select **Rollback**.

Every time you edit the files, repeat step 3. That's how you publish changes.

## Before you launch

- [ ] Test the contact form end to end (see "Connect the contact form").
- [ ] Check the asset tracker and Airtable panels load inside the demo pages. If one stays blank, the "Open ↗" link still works.
- [ ] Add the line "Demo data resets every night" back on the demo pages only once that reset is actually running.
- [ ] Look at the site on your phone.
