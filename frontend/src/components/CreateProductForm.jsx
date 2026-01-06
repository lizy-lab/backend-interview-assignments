import { useState } from 'react'
import { createProduct } from '../services/api'
import './CreateProductForm.css'

/**
 * CreateProductForm Component
 *
 * This component provides a form to create new products.
 */
function CreateProductForm({ onProductCreated }) {
  // Form field states
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')

  // UI states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset states
    setError(null)
    setSuccess(false)

    // Validate inputs
    if (!name || !price || !stock) {
      setError('All fields are required')
      return
    }

    setLoading(true)

    try {
      // Call API
      const productData = {
        name: name,
        price: parseFloat(price),
        stock: parseInt(stock)
      }
      await createProduct(productData)

      // Success: reset form and show success message
      setName('')
      setPrice('')
      setStock('')
      setSuccess(true)

      // Notify parent component
      if (onProductCreated) {
        onProductCreated()
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-product-form">
      <h2>Create New Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($) *</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock Quantity *</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
            min="0"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            <strong>Success!</strong> Product created successfully.
          </div>
        )}

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>

      <div className="form-hint">
        <p><strong>Bonus Challenge:</strong></p>
        <ul>
          <li>Add client-side validation for negative values</li>
          <li>Clear success message after a few seconds</li>
          <li>Disable submit button if fields are empty</li>
        </ul>
      </div>
    </div>
  )
}

export default CreateProductForm
