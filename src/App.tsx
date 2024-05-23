import { Route, Routes } from 'react-router-dom'
import ExpensesUploadPage from './pages/expenses/upload'
import ExpensesPage from './pages/expenses'

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='expenses' element={<ExpensesPage />} />
        <Route path='expenses/upload' element={<ExpensesUploadPage />} />
      </Routes>
    </div>
  )
}

export default App
