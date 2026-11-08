# Scout

Scout is a small media search app. It searches photos on Unsplash, videos on Pexels, and GIFs on Giphy, and saves what you like into a local collection. The UI is dark so the media stays the focus.

## Getting started

```bash
npm install
cp .env.example .env         # fill all the values
npm run dev
```

The app needs three API keys. Put them in a `.env` file at the project root:

```
VITE_UNSPLASH_KEY=your key from unsplash.com/developers
VITE_PEXELS_KEY=your key from pexels.com/api
VITE_GIPHY_KEY=your key from developers.giphy.com
```

Without keys, searches will fail with an error state (that is handled, not a crash).

## Scripts

```bash
npm run dev       # start the dev server
npm run build     # production build in dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

## Stack

React 19, Vite 8, Redux Toolkit, Tailwind CSS v4, react-router 7, Phosphor icons, and Manrope.

## Things to know

- The collection lives in localStorage, so it is per browser and per device. Clearing site data clears it.
- Video results show as posters with a play badge. The video file itself only loads when you open the item on its source page, which keeps grids light.
- Pressing `/` anywhere focuses the search box.
- In-flight searches are cancelled when you change the query or tab, so an old slow response never overwrites a new one.

## Project layout

```
src/
  api/mediaApi.js            # Unsplash, Pexels, Giphy fetchers (accept AbortSignal)
  components/
    NavBar.jsx               # sticky nav, active state, collection count
    SearchBar.jsx            # search form with "/" shortcut
    Tabs.jsx                 # photos / video / GIFs tab switch
    ResultGrid.jsx           # fetch orchestration, skeleton/empty/error states
    ResultCard.jsx           # result tile with Save (shows Saved if collected)
    MediaCard.jsx            # shared media tile used by both card types
    CollectionCard.jsx       # collection tile with Remove
    SkeletonGrid.jsx         # shape-matched loading state
    EmptyState.jsx           # composable empty/error state
    Footer.jsx
  pages/
    HomePages.jsx            # search page (idle hero + results)
    CollectionPage.jsx       # saved items, count, clear all
  redux/
    store.js
    features/searchSlice.js      # query, active tab, results, loading, error
    features/collectionSlice.js  # saved items, localStorage persistence
  lib/toast.js               # toast helpers, styled in index.css
```

