/**
 * API Service Client
 *
 * This module provides a complete set of functions to interact with the Product Management API.
 * All functions are fully implemented - use these to make API calls from your components.
 */

const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Fetch all products from the API
 * @returns {Promise<Array>} Array of product objects
 */
export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch a single product by ID
 * @param {string} productId - UUID of the product
 * @returns {Promise<Object>} Product object
 */
export async function fetchProduct(productId) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Product not found');
    }
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Create a new product
 * @param {Object} productData - Product data {name, price, stock}
 * @returns {Promise<Object>} Created product object
 */
export async function createProduct(productData) {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create product');
  }

  return response.json();
}

/**
 * Update product stock
 * @param {string} productId - UUID of the product
 * @param {number} quantity - Quantity to add (positive) or remove (negative)
 * @returns {Promise<Object>} Updated product object
 */
export async function updateProductStock(productId, quantity) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}/stock`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to update stock');
  }

  return response.json();
}

/**
 * Update product price
 * @param {string} productId - UUID of the product
 * @param {number} price - New price (must be >= 0)
 * @returns {Promise<Object>} Updated product object
 */
export async function updateProductPrice(productId, price) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}/price`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ price }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to update price');
  }

  return response.json();
}
