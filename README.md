# Portfolio Hub

A responsive, data-driven portfolio for **Sayed Rahim Sadat — Web Designer & Developer**.

## Features

- 30 GitHub portfolio projects loaded from `data/projects.json`
- Dynamic GitHub API enrichment (language, stars, forks, last update, homepage)
- Featured projects, search, category filters, sorting, project case-study routing
- Recruiter Mode with recommended project prioritization
- Light/dark theme with persistence
- Responsive desktop/tablet/mobile UI
- Contact form using `mailto:` (no backend required)
- Local portfolio assistant
- PWA manifest, install prompt, service worker, offline caching
- Accessible focus states, semantic navigation, reduced-motion support
- Lightweight SVG project covers and PWA icons

## Structure

```text
portfolio_hub/
├── index.html
├── manifest.json
├── service-worker.js
├── robots.txt
├── README.md
├── assets/
│   ├── css/style.css
│   ├── js/app.js
│   ├── images/projects/<project>/cover.svg
│   ├── icons/
│   └── resume/Sayed_Rahim_Sadat_Resume.pdf
└── data/projects.json
```

## Run locally

Use a local web server; do not double-click `index.html` because project data is loaded with `fetch()`.

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## GitHub Pages

Deploy from the repository's `main` branch and root folder in **Settings → Pages**. Relative paths are used so the project works under a GitHub Pages repository URL.

## Project data

Edit `data/projects.json` to change descriptions, technologies, featured status, recruiter recommendations, repository links, or order. The app uses one GitHub API request to enrich matching public repositories at runtime and falls back to the local JSON if the API is unavailable.

## Author

Sayed Rahim Sadat  
GitHub: https://github.com/Sayed24  
Email: sadatsr52@gmail.com
