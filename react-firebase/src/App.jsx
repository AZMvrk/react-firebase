import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Form from './components/Form'
import Home from './components/Home'
import { useEffect } from 'react'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem('token')

    if (token) {
      navigate('/')
    } 
  }, [navigate])

  return (
    <Routes>
      <Route path='/login' element={<Form title="login" />} />
      <Route path='/register' element={<Form title="register" />} />
      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default App