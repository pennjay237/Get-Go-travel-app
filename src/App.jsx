import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Destination from './pages/Destination'
import Navbar from './components/Layout/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination/:name" element={<Destination />} />
      </Routes>
    </div>
  )
}

export default App