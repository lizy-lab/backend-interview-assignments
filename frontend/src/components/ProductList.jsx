import { useState } from 'react'
import { fetchProducts } from '../services/api'
import './ProductList.css'

/**
 * ProductList Component
 *
 * This component displays a list of products with search functionality.
 *
 * TODO: Complete the following tasks:
 * 1. Use useEffect to fetch products when the component mounts
 * 2. Implement search functionality to filter products by name
 * 3. Render the filtered product list using .map()
 * 4. Handle loading and error states appropriately
 *
 * Learning objectives:
 * - Understanding useEffect hook and component lifecycle
 * - Managing component state with useState
 * - Filtering arrays based on user input
 * - Rendering lists in React with proper keys
 * - Handling async operations and error states
 */
function ProductList() {
  // State for storing products fetched from API
  const [products, setProducts] = useState([])

  // State for search query
  const [searchQuery, setSearchQuery] = useState('')

  // State for loading indicator
  const [loading, setLoading] = useState(false)

  // State for error handling
  const [error, setError] = useState(null)

  // TODO 1: Use useEffect to fetch products when component mounts
  // Hints:
  // - Import useEffect from 'react' at the top
  // - Call fetchProducts() from the api service
  // - Update the products state with the fetched data
  // - Handle loading and error states
  // - Remember to handle the promise (.then/.catch or async/await)
  //
  // Example structure:
  // useEffect(() => {
  //   // Set loading to true
  //   // Call fetchProducts()
  //   // On success: update products state, set loading to false
  //   // On error: update error state, set loading to false
  // }, []) // Empty dependency array = run once on mount


  // TODO 2: Implement filtering logic
  // Create a variable that filters products based on searchQuery
  // Hints:
  // - Use the .filter() method on the products array
  // - Check if product.name includes the searchQuery (case-insensitive)
  // - Use .toLowerCase() for case-insensitive comparison
  //
  // const filteredProducts = products.filter(/* your filter logic here */)
  const filteredProducts = products // Replace this with your filtering logic


  // TODO 3: Handle loading state
  // If loading is true, display a loading message
  if (loading) {
    return <div className="loading">Loading products...</div>
  }


  // TODO 4: Handle error state
  // If there's an error, display an error message
  if (error) {
    return (
      <div className="error">
        <h3>Error loading products</h3>
        <p>{error}</p>
      </div>
    )
  }


  return (
    <div className="product-list">
      <div className="search-section">
        <h2>Products</h2>

        {/* TODO 5: Implement search input */}
        {/* Connect this input to searchQuery state */}
        <input
          type="text"
          className="search-input"
          placeholder="Search products by name..."
          // TODO: Add value prop connected to searchQuery state
          // TODO: Add onChange handler to update searchQuery state
        />
      </div>

      {/* Display count of filtered products */}
      <p className="product-count">
        Showing {filteredProducts.length} product(s)
      </p>

      {/* TODO 6: Render the product list */}
      {/* Use .map() to render each product in filteredProducts */}
      {/* Hints:
          - Check if filteredProducts has items first
          - If empty, show "No products found" message
          - Use .map() to create a table row for each product
          - Remember to add a unique 'key' prop (use product.id)
          - Display: name, price (formatted), stock
      */}

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {/* TODO: Replace this comment with your .map() implementation */}
            {/* Example structure: */}
            {/* {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-products">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td className="product-id">{product.id}</td>
                </tr>
              ))
            )} */}

            <tr>
              <td colSpan="4" className="no-products">
                TODO: Implement product list rendering here
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductList
