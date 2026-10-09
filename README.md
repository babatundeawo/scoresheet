<h1 align="center">Class Scoresheet</h1>
<p align="center">Record class scores, see student reports and export to Excel from any phone.</p>

<p align="center">
  <a href="../../actions/workflows/deploy.yml"><img alt="Deploy status" src="../../actions/workflows/deploy.yml/badge.svg"></a>
</p>

**Quick links:** [Report an issue](../../issues) · [Deployment guide](docs/DEPLOYMENT.md) · [Customizing](docs/CUSTOMIZING.md) · [Login setup](docs/FIREBASE_LOGIN_SETUP.md)

## About

Class Scoresheet is a mobile-friendly web app for teachers. It records continuous-assessment, class-exercise and exam marks for each term, works out annual totals and weighted averages, and exports a sheet in the layout of the school's paper scoresheet. Built for SS2 Mathematics, usable for any class.

## Features

- Email and password login; each teacher sees only their own classes
- Scores per term: 1st CA /10, 2nd CA /10, open day /10, exam /70, with optional bonus marks (attendance, textbook, notebook) added to the exam
- Totals, grades, class position, annual total and weighted average
- Student lists with male/female and repeater tags, bulk tagging and pasted name lists
- Printable per-student reports, one per page
- Export to Excel in the paper scoresheet layout
- Works offline once opened; changes sync when the connection returns
- Light and dark appearance that follow the device setting

## How to use it

1. Open the site and create an account, then tap **+ Class**.
2. Add students in the **Students** tab.
3. Choose a term in **Scores** and type marks; press Enter to move to the next student.
4. Open a student's **Report**, or use **Class > Export to Excel**.

## Tech stack

HTML, CSS and JavaScript (no build step) · Firebase Authentication and Firestore · SheetJS for Excel export · GitHub Actions and GitHub Pages

## Project structure

```
index.html            App markup, styles and interface code
logic.js              Scoring rules, grades and Excel layout
firebase-config.js    Firebase web configuration
firestore.rules       Database security rules
tests/                Automated checks for the scoring rules
docs/                 Setup, deployment and customizing guides
.github/              Deployment and security workflows
```

## Security

Report vulnerabilities privately; see [SECURITY.md](SECURITY.md).

## Credits

Typeface: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (SIL Open Font License). Excel export: [SheetJS](https://sheetjs.com) (Apache-2.0). Interface icons are original.
