import { Route, Routes } from 'react-router-dom'
import Expenses from './pages/expenses'
import './App.css'

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='expenses' element={<Expenses />} />
      </Routes>
    </div>
  )
}

export default App
