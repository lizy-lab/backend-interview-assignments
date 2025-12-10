import { useState } from 'react'
import './App.css'
import ProductList from './components/ProductList'
import CreateProductForm from './components/CreateProductForm'

function App() {
  const [activeView, setActiveView] = useState('list')
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Trigger refresh of product list when a product is created
  const handleProductCreated = () => {
    setRefreshTrigger(prev => prev + 1)
    setActiveView('list')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🛒 Product Management System</h1>
        <p className="subtitle">DDD Full-Stack Interview Exercise</p>
      </header>

      <nav className="app-nav">
        <button
          className={activeView === 'list' ? 'active' : ''}
          onClick={() => setActiveView('list')}
        >
          📋 Product List
        </button>
        <button
          className={activeView === 'create' ? 'active' : ''}
          onClick={() => setActiveView('create')}
        >
          ➕ Create Product
        </button>
      </nav>

      <main className="app-main">
        {activeView === 'list' && (
          <ProductList key={refreshTrigger} />
        )}
        {activeView === 'create' && (
          <CreateProductForm onProductCreated={handleProductCreated} />
        )}
      </main>

      <footer className="app-footer">
        <p>Built with React + FastAPI + DDD Architecture</p>
      </footer>
    </div>
  )
}

export default App
