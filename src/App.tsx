import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import UploadCartoon from './pages/UploadCartoon'
import UploadEpisode from './pages/UploadEpisode'
import Error from './pages/Error'
import Profile from './pages/Profile'
import Coi from './pages/CoinTransaction'

function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload/cartoon" element={<UploadCartoon />} />
        <Route path="/upload/episode/:id" element={<UploadEpisode />} />
        <Route path="/error" element={<Error/>}/>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/coin-transaction" element={<Coi/>} />
      </Routes>
  )
}

export default App
