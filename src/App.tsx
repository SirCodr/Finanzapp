import { Route, Routes } from 'react-router-dom'
import ExpensesUploadPage from './pages/expenses/upload'
import ExpensesPage from './pages/expenses'
import ExpensesCreatePage from './pages/expenses/create'
import IncomesPage from './pages/incomes'
import Layout from './components/layout'
import IncomesUploadPage from './pages/incomes/upload'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='incomes' element={<IncomesPage />} />
        <Route path='incomes/upload' element={<IncomesUploadPage />} />
        <Route path='expenses' element={<ExpensesPage />} />
        <Route path='expenses/create' element={<ExpensesCreatePage />} />
        <Route path='expenses/upload' element={<ExpensesUploadPage />} />
      </Routes>
    </Layout>
  )
}

export default App
