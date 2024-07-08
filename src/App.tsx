import { Route, Routes } from 'react-router-dom'
import ExpensesUploadPage from './pages/expenses/upload'
import ExpensesPage from './pages/expenses'
import ExpensesCreatePage from './pages/expenses/create'
import ExpensesHeader from './components/header'

function App() {
  return (
    <div className='app'>
      <ExpensesHeader />
      <Routes>
        <Route path='expenses' element={<ExpensesPage />} />
        <Route path='expenses/create' element={<ExpensesCreatePage />} />
        <Route path='expenses/upload' element={<ExpensesUploadPage />} />
      </Routes>
    </div>
  )
}

export default App
