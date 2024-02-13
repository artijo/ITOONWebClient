import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import UploadCartoon from './pages/UploadCartoon'
import UploadEpisode from './pages/UploadEpisode'

function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload/cartoon" element={<UploadCartoon />} />
        <Route path="/upload/episode/:id" element={<UploadEpisode />} />
      </Routes>
  )
}

export default App
