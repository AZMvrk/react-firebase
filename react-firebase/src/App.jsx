import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Form from './components/Form'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Form title={"login"}/>} />
        <Route path='/register' element={<Form title={"register"}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
