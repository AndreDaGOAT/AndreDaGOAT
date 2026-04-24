# Mobile Detailing Business System (GitHub-Ready)

A deploy-ready static website for a mobile detailing business with a black-and-gold executive visual theme.

## What this includes

- ✅ GitHub Pages hosting setup (with GitHub Actions workflow)
- ✅ Plain HTML/CSS/JS frontend (fastest launch)
- ✅ Formspree-compatible quote form (or swap with Google Forms)
- ✅ Calendly booking link (or replace with Square)
- ✅ CRM flow guidance for HubSpot Free or Google Sheets

## Project structure

- `index.html` — business landing page + quote + booking + CRM sections
- `styles.css` — responsive styles
- `script.js` — single settings object for phone/email/Formspree/Calendly
- `.github/workflows/deploy-pages.yml` — automatic GitHub Pages deployment on `main`

## 5-minute setup

Default repository values are pre-filled for Jubilee Luxury Mobile Detailing.

1. **Edit `script.js`**
   - `phone`
   - `displayPhone`
   - `email`
   - `calendlyUrl`
   - `formspreeEndpoint`

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Configure mobile detailing site"
   git push origin main
   ```

3. **Enable Pages in repository settings**
   - Settings → Pages
   - Build and deployment source: **GitHub Actions**

4. **Test live website**
   - Submit quote form
   - Open booking link
   - Verify contact links

## Address autocomplete (Google Places)

The quote form includes a **Service Address** field with Google Places autocomplete.

- Script used in `index.html`:
  `https://maps.googleapis.com/maps/api/js?key=AIzaSyARZAA619g3JlruK77Lfm8vlopcR76vRGg&libraries=places&callback=initGooglePlaces`
- Captured fields sent with form:
  - `service_address`
  - `address_place_id`
  - `address_lat`
  - `address_lng`

> Important: Restrict the Google Maps API key by HTTP referrer and enable only required APIs in Google Cloud.

## Tool choices supported

- Hosting: **GitHub Pages** (free)
- Frontend: **HTML/CSS** (optional Tailwind later)
- Forms: **Formspree** or **Google Forms**
- Booking: **Calendly** or **Square Appointments**
- CRM: **HubSpot Free** or **Google Sheets**

## Optional upgrade path

- Move hosting/forms to Netlify later if you want easier automation.
