# ASTU Muslim Students Jemea — Student Registration

A simple one-page student registration website using:

- HTML
- CSS
- Vanilla JavaScript
- Google Apps Script
- Google Sheets

## Files

- `index.html` — registration page
- `style.css` — Islamic-inspired visual design
- `script.js` — validation + Google Apps Script submission
- `Code.gs` — Google Apps Script backend
- `logo.png` — ASTU Muslim Students Jemea logo

## Google Sheet setup

Create a Google Sheet and open:

**Extensions → Apps Script**

Paste the contents of `Code.gs`.

Deploy it as:

**Deploy → New deployment → Web app**

Use:

- Execute as: **Me**
- Who has access: **Anyone**

Copy the `/exec` URL.

Then open `script.js` and replace:

```js
const SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
```

with your actual URL.

## Important

This is intentionally a simple first version. The Google Sheet becomes the registration database.

For production use, add stronger anti-spam/rate-limiting and restrict who can access the Google Sheet. Do not put private Google credentials in the frontend.
