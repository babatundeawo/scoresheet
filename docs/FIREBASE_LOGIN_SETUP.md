# Firebase login setup (for beginners)

**What this is.** Firebase is Google's free service that stores your scores and handles login. "Authentication" is the part that checks email and password. Your project (`class-scoresheet`) already exists; this guide checks every setting the app needs.

## 1. Open your project
Go to https://console.firebase.google.com, sign in, and click `class-scoresheet`. *You should see the project overview.*

## 2. Turn on email login
**Build > Authentication > Get started > Sign-in method > Email/Password > Enable > Save.** *The row shows "Enabled".* (Google sign-in is not used by this app.)

## 3. Authorized domains
**Authentication > Settings > Authorized domains > Add domain.** Type `yourname.github.io` (your GitHub name, no `https://`). Add your own domain too if you have one. *The domain appears in the list.* A "domain" here is a website address that is allowed to use your login.

## 4. Create the database
**Build > Firestore Database > Create database**, pick the closest location, choose **Production mode**, **Create**. *You see an empty "Data" tab.*

## 5. Publish the security rules
**Firestore Database > Rules.** Delete everything, paste the whole of `firestore.rules`, click **Publish**. Security rules are the instructions that decide who may read or change data. *A "Rules published" message appears.*

## 6. Check the app configuration
**Gear icon > Project settings > Your apps.** The values `apiKey`, `authDomain`, `projectId` and `appId` must match `firebase-config.js`. These are identifiers, not passwords; the rules protect your data. No GitHub secret is needed.

## 7. Admin account
The admin is the email in `firebase-config.js` and `firestore.rules` (both must match). Sign up in the app with that email; you then see every teacher's classes.

## 8. Deploy
GitHub **Actions** tab > **Deploy** > **Run workflow**. *A green tick appears.*

## How to test that login works
Open the site, tap **Create new account**, sign in, make a class, refresh the page. You should stay signed in and see the class. Sign out and sign back in.

## Common errors and fixes
| Message | Fix |
|---|---|
| `auth/unauthorized-domain` | Step 3: add your `github.io` domain |
| `auth/api-key-not-valid` | Step 6: re-copy the config values |
| `permission-denied` / "Missing or insufficient permissions" | Step 5: publish the rules; check the admin email spelling |
| `auth/invalid-credential` | Wrong email or password; use **Forgot password?** |
| Blank page | A typo in `firebase-config.js` |

## Glossary
- **API key:** an identifier for your Firebase project, safe to be visible.
- **Authorized domain:** a website address allowed to use your login.
- **Security rules:** the access rules for your database.
- **Secret:** a private value that must never be public (none are used here).
- **Custom claim:** a special label on a user, such as "admin" (not used here; the admin is identified by email).

## What NOT to share or commit
Never put passwords, service-account JSON files or private keys in the repository.
