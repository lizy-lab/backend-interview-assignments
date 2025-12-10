# Frontend - Product Management UI

React frontend for the Product Management System interview exercise.

## Overview

This is a simple React application built with Vite. The API service layer is **complete and provided**, but the React components have **TODO sections** for you to implement.

## What's Provided (Complete)

- **`src/services/api.js`**: Complete API client with all backend calls
- **`src/App.jsx`**: Main application layout and navigation
- **`src/App.css`**: Complete styling for the app layout
- **Component CSS files**: All styling is complete

## What You Need to Implement

### 1. ProductList Component (`src/components/ProductList.jsx`)

**Required tasks:**

- **TODO 1**: Use `useEffect` to fetch products when component mounts
- **TODO 2**: Implement filtering logic based on search query
- **TODO 3-4**: Handle loading and error states
- **TODO 5**: Connect search input to state
- **TODO 6**: Render the product list using `.map()`

**Skills demonstrated:**
- React hooks: `useState`, `useEffect`
- Component lifecycle
- Array methods: `.filter()`, `.map()`
- Controlled inputs
- Conditional rendering
- Async data fetching

### 2. CreateProductForm Component (`src/components/CreateProductForm.jsx`) - BONUS

**Required tasks:**

- **TODO 1**: Implement form submission handler
  - Validate all fields are filled
  - Convert price and stock to numbers
  - Call `createProduct()` from API service
  - Handle success: reset form, show message, call `onProductCreated` callback
  - Handle errors: display error message

**Skills demonstrated:**
- Form handling in React
- Controlled inputs
- Async operations with error handling
- Prop callbacks
- State management

## Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The app will run on `http://localhost:5173` by default.

## Component Architecture

```
App.jsx (Complete)
├── ProductList.jsx (INCOMPLETE - implement TODOs)
└── CreateProductForm.jsx (INCOMPLETE - bonus)
```

## API Service Usage

The API service is fully implemented. Import and use like this:

```javascript
import { fetchProducts, createProduct } from '../services/api'

// Fetch all products
const products = await fetchProducts()

// Create a product
const newProduct = await createProduct({
  name: "Laptop",
  price: 999.99,
  stock: 10
})
```

Available functions:
- `fetchProducts()` - Get all products
- `fetchProduct(productId)` - Get single product
- `createProduct(productData)` - Create new product
- `updateProductStock(productId, quantity)` - Update stock
- `updateProductPrice(productId, price)` - Update price

All functions return Promises and throw errors on failure.

## Implementation Tips

### For ProductList

1. **Start with useEffect:**
   ```javascript
   import { useEffect } from 'react'

   useEffect(() => {
     // Fetch products here
   }, []) // Empty array = run once on mount
   ```

2. **Filter products:**
   ```javascript
   const filteredProducts = products.filter(product =>
     product.name.toLowerCase().includes(searchQuery.toLowerCase())
   )
   ```

3. **Render with map:**
   ```javascript
   {filteredProducts.map(product => (
     <tr key={product.id}>
       <td>{product.name}</td>
       {/* ... */}
     </tr>
   ))}
   ```

### For CreateProductForm

1. **Handle form submission:**
   ```javascript
   const handleSubmit = async (e) => {
     e.preventDefault()
     // Validate, convert types, call API
   }
   ```

2. **Call parent callback:**
   ```javascript
   if (onProductCreated) {
     onProductCreated() // Refreshes product list in parent
   }
   ```

## Testing Your Implementation

1. **Start the backend API first:**
   ```bash
   # From project root
   uv run uvicorn src.api.main:app --reload
   ```

2. **Start the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test flow:**
   - Open `http://localhost:5173`
   - Click "Create Product" tab
   - Fill form and submit
   - Switch to "Product List" tab
   - Verify product appears
   - Test search functionality

## Common Issues

**Products not loading:**
- Check browser console for errors
- Verify backend is running on `http://localhost:8000`
- Did you implement `useEffect`?
- Check Network tab in DevTools

**Search not working:**
- Is `searchQuery` connected to the input value?
- Did you implement the filter logic?
- Are you using `.toLowerCase()` for case-insensitive search?

**Form submission fails:**
- Check if price and stock are converted to numbers
- Verify backend is accepting the request (check `/docs`)
- Look for error messages in browser console

## Browser DevTools Tips

- **Console**: Check for JavaScript errors
- **Network**: Inspect API calls and responses
- **React DevTools**: View component state and props
- **Elements**: Inspect rendered HTML/CSS

## Success Criteria

Your implementation should:
- Fetch and display products when ProductList mounts
- Filter products by name in real-time as user types
- Render products with proper keys
- Handle loading and error states gracefully
- (Bonus) Create new products via form
- (Bonus) Refresh list after product creation

## Need Help?

- Read the TODO comments in component files - they have hints!
- Check the API service code to see what functions are available
- Review the existing complete code (App.jsx) for patterns
- Use `console.log()` to debug state and data
- Test the API directly using `http://localhost:8000/docs`

Good luck!
