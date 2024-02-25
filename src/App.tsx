import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import UploadCartoon from './pages/UploadCartoon'
import UploadEpisode from './pages/UploadEpisode'
import Error from './pages/Error'
import Profile from './pages/Profile'
import Coi from './pages/CoinTransaction'
import Success from './pages/Success'
import ApproveCreator from './pages/AppoveCreator'
import Logout from './pages/Logout'

function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload/cartoon" element={<UploadCartoon />} />
        <Route path='/edit/cartoon/:id' element={<UploadCartoon />} />
        <Route path="/upload/episode/:id" element={<UploadEpisode />} />
        <Route path="/edit/episode/:episode" element={<UploadEpisode />} />
        <Route path="/error" element={<Error/>}/>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/success" element={<Success message="อัพโหลดสำเร็จ"/>} />
        <Route path="/coin-transaction" element={<Coi/>} />
        <Route path='/coin-transaction/success' element={<Success message="ชำระเงินเรียบร้อยโปรดกลับไปที่แอปและเช็คเหรียญของคุณ"/>} />
        <Route path='/coin-transaction/cancel' element={<Success message="การชำระเงินถูกยกเลิก"/>} /> 
        <Route path='/admin/creator' element={<ApproveCreator/>} />
        <Route path='/logout' element={<Logout/>} />
      </Routes>
  )
}

export default App
