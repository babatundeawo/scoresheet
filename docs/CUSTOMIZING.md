# Customizing

- **Colors:** open `index.html`, find the block starting `:root{color-scheme` near the top. `--ink2` is the main color, `--tl` the accent. Dark mode colors are in the next line.
- **Text:** the words on screen are inside `index.html` in the script section; use the browser's find box (Ctrl+F) on GitHub's edit screen.
- **Grades:** in `logic.js`, the line starting `export const grade=`. Also change the legend text "Grades: A 70" in `index.html`.
- **Student lists:** `SEED` and `REPEATERS` at the top of `logic.js`.
- **Logo and icons:** replace `favicon.svg`, `icon-192.png`, `icon-512.png` and `apple-touch-icon.png` with your own files of the same names.
- **Font:** the `fonts.googleapis.com` link in `index.html` and the `font:` line in `body`.
- **Admin email:** `firebase-config.js` and `firestore.rules` (they must match).
