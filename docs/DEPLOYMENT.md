# Deployment guide

Everything here is done on the GitHub website. You never need a terminal.

## One-time: move to the new repository

Your old repository still holds the live site, so create the new one first, check it works, and only then delete the old one.

1. Unzip the rebuild on your computer.
2. On github.com click **+ > New repository**. Name it `scoresheet-new`, choose **Public**, click **Create repository**.
3. Click **uploading an existing file**. Open the unzipped folder and drag in **everything**, including the `.github`, `docs` and `tests` folders (if you cannot see `.github`, turn on "show hidden files" on your computer). Click **Commit changes**.
4. **Settings > Pages > Build and deployment > Source > GitHub Actions**.
5. Open the **Actions** tab. Wait for **Deploy** to show a green tick (1 to 3 minutes). The link appears under **Settings > Pages**.
6. In Firebase: **Authentication > Settings > Authorized domains** already contains `yourname.github.io`, so login works with no change.
7. Open the new link, log in, and confirm your classes and scores are there. They live in Firebase, so nothing is lost by changing repositories.
8. Publish the updated rules: Firebase **Firestore Database > Rules**, paste in `firestore.rules`, **Publish**.
9. Delete the old repository: open it, **Settings**, scroll to **Danger Zone > Delete this repository**. Then in the new repository open **Settings > General**, change the name to `scoresheet`, and **Rename**. The address becomes the same as before. Deleting the old one removes its edit history permanently, so download its ZIP first (green **Code** button > **Download ZIP**).

## Updating the site

Open a file on GitHub, click the pencil, edit, then **Commit changes**. The site updates in about a minute.

## Did it work?

Open the **Actions** tab and look at the latest **Deploy** run. A green tick means live. A red cross means it failed: open the run, click the red step and read the message. The most common cause is a typo in a file you just edited.

## Rolling back

Open the repository, click **Commits**, find the last good one, click `<>` to browse it, and copy the old file contents back into the current file, then commit.

## Security tools

Turn on secret scanning: **Settings > Code security > Secret scanning > Enable**. Dependabot and CodeQL run automatically from the files in `.github`.
