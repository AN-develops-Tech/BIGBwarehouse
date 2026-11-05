# BigB Warehouse Park

A modern, high-performance web platform for **BigB Warehouse Park** — a premier high-bay industrial warehouse and logistics hub in Parippally, Kollam District, Kerala.

---

## Architecture Overview

The repository is a fast, self-contained single-page application built with:
- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **React Router v7**
- **Lucide React Icons**

```
BIGBwarehouse/
├── frontend/
│   ├── src/
│   │   ├── assets/       # Optimized warehouse imagery and icons
│   │   ├── components/   # Reusable UI components (Navbar, Footer, Logo, CTA, WhatsApp)
│   │   ├── context/      # CompanyContext for global company state
│   │   ├── data/         # Structured company, facility, and gallery datasets
│   │   ├── layouts/      # MainLayout page wrapper
│   │   └── pages/        # Home, About, Facilities, Gallery, Contact
│   ├── public/           # Static assets and icons
│   ├── index.html        # SPA entry HTML
│   ├── package.json      # Dependencies and build scripts
│   └── vite.config.js    # Vite configuration
├── package.json          # Root scripts delegation
└── README.md
```

---

## Features

- **Interactive Hero Slideshow**: Cycles through high-bay warehouse infrastructure, 50-ton weighbridge, and Hydra crane lifting operations.
- **Facilities Showcase**: 3D interactive flip cards, detailed technical specifications (50,000+ sq. ft., 30ft ceiling clearance, 24/7 power, parking yard).
- **Categorized Photo Gallery**: Full-screen modal Lightbox with keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`).
- **Direct Enquiry & WhatsApp Integration**: Contact form that validates input and instantly formats and dispatches the inquiry via WhatsApp to dispatch operations.
- **Responsive & Industrial Design**: Crafted with custom Tailwind v4 blueprint grid patterns, brand colors, and physics-smoothed animations.

---

## Quick Start

### 1. Installation
```bash
cd frontend
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```
The output will be generated in `frontend/dist/`.
