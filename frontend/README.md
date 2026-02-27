# Frontend — Product Management UI

React + Vite application that connects to the backend API.

## Setup

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173`. Make sure the backend is running on port 8000 first.

## What's Already Provided

- `src/services/api.js` — Complete API client with all backend calls
- `src/App.jsx` — Main application layout and navigation
- `src/components/CreateProductForm.jsx` — Complete form component
- All CSS files — Styling is done

## Task: Complete `ProductList` component

**File:** `src/components/ProductList.jsx`

The component has TODO comments guiding you through each step. Check `src/services/api.js` for available API functions.

1. Fetch products from the API when the component mounts
2. Implement search filtering by product name
3. Connect the search input to state
4. Render the product list

## Bonus

The `CreateProductForm` component is fully implemented but has bonus challenges listed at the bottom (client-side validation, auto-clearing messages, etc.).
