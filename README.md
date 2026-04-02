# NC News — Frontend

![NC News Logo](public/logo.ico)

## Hosted Version

The live app can be accessed at **https://nc-news-jeff.netlify.app** .

## Project Summary

This repository contains the frontend portion of the **NC News** project. It's a single-page application built with **React**, **React Router**, and **Tailwind CSS** that consumes the [NC News REST API](https://github.com/JeffSun93/backend-nc-news). Users can browse articles by topic, read individual articles, vote on articles, and leave comments.

## Getting Started

Follow the steps below to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/JeffSun93/frontend-nc-news.git
cd frontend-nc-news
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API URL

Open `src/constants.js` and set the base URL to point at your local backend or the hosted API:

```js
// hosted
export const API_URL = "https://jeff-nc-news.onrender.com";

// local backend
export const API_URL = "http://localhost:9090";
```

> Make sure the backend server is running if you are using the local option.

### 4. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### 5. Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Key Features

- Browse all articles or filter by topic
- Sort articles by date, votes, or comment count
- Read full article with body text and metadata
- Vote on articles and comments with optimistic UI updates and error rollback
- Post, view, and delete own comments
- Comment count updates in real time when comments are added or deleted
- Scrollable comment section
- Skeleton loading states throughout
- Responsive layout

## Requirements

- **Node.js**: version **18.x** or later

## Project Structure

```text
src/
  features/
    articles/
      apis/           # Axios API calls for articles
      components/     # Article UI components (cards, vote control, skeletons)
      routes/         # Page-level route components
    comments/
      apis/           # Axios API calls for comments
      components/     # Comment UI components (list, card, form)
    user/             # User context, hooks, and profile modal
  components/         # Shared UI (Nav, Header, Footer)
  layouts/            # MainLayout wrapper
  utils/              # Helpers (e.g. time formatter)
  constants.js        # API base URL
  App.jsx             # Route definitions
  main.jsx            # React entry point
```

## Author

- **Jeff Sun** – [GitHub](https://github.com/JeffSun93)

## Notes

- The hosted backend runs on Render's free tier and may take 30–60 seconds to wake up after a period of inactivity.
- This frontend is designed to be used alongside the [NC News backend](https://github.com/JeffSun93/backend-nc-news).

---
