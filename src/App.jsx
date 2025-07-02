import Login from './pages/Login'
import Signup from './pages/Signup'
import LoadSearch from './pages/LoadSearch'
import { Routes,Route,Navigate } from 'react-router-dom'

import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/loads" element={<LoadSearch />} />
    </Routes>
  )
}

export default App
