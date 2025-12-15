import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('🔍 Search submitted:', query)
    
    if (!query.trim()) {
      alert('Please enter a destination')
      return
    }
    
    setLoading(true)
    
    setTimeout(() => {
      console.log(' Mock search for:', query)
      if (onSearch) {
        onSearch(query)
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Where would you like to go? (e.g., Paris, France)"
          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          disabled={loading}
        />
        
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="font-medium">Debug Info:</span>
          <span>Query: "{query}"</span>
          <span>|</span>
          <span>Loading: {loading ? 'Yes' : 'No'}</span>
        </div>
      </div>
    </div>
  )
}