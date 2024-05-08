import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './component/login/login'
import SignUp from './component/signup/signup'
import Board from './component/board/board'
function App() {


  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Board />} />
    </Routes>
  )
}

export default App
