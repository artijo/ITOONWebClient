import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import UploadCartoon from './pages/UploadCartoon'

function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload/cartoon" element={<UploadCartoon />} />
      </Routes>
  )
}

export default App
