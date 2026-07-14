# Six Months — standalone site

Single-file static site. No build step. Deploy anywhere.

## Files
- `index.html` — the whole site
- `couple-1.jpg` … `couple-4.jpg` — photos

## Deploy

### GitHub Pages
1. Create a new repo, upload the contents of this folder to the repo root (drag & drop works).
2. Settings → Pages → Source: `main` branch, `/root`. Save.
3. Your site is live at `https://<username>.github.io/<repo>/`.

### Netlify
1. Drag this folder onto https://app.netlify.com/drop — done.
2. Or connect the GitHub repo; no build command, publish directory = repo root.

### Any static host
Just serve `index.html`. Photos must sit next to it.

Open `index.html` locally in a browser to preview.