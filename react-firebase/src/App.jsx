import { Route, Routes } from 'react-router-dom'
import './App.css'
import Form from './components/Form'
import Home from './components/Home'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Form title="login" />} />
      <Route path='/register' element={<Form title="register" />} />
      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default App