import { useState } from 'react'
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
 */
function ProductList() {
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // TODO 1: Use useEffect to fetch products when component mounts
  // Hints:
  // - Import useEffect from 'react' at the top
  // - Call fetchProducts() from the api service
  // - Handle loading and error states

  // TODO 2: Implement filtering logic
  // Create a variable that filters products based on searchQuery
  const filteredProducts = products // Replace this with your filtering logic

  if (loading) {
    return <div className="loading">Loading products...</div>
  }

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

        {/* TODO 3: Implement search input */}
        {/* Connect this input to searchQuery state */}
        <input
          type="text"
          className="search-input"
          placeholder="Search products by name..."
        />
      </div>

      <p className="product-count">
        Showing {filteredProducts.length} product(s)
      </p>

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
            {/* TODO 4: Render the product list */}
            {/* Hints:
                - Check if filteredProducts has items first
                - If empty, show <td colSpan="4" className="no-products">No products found</td> message
            */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductList
