import { useEffect } from 'react';
import ExpensesHeader from '../components/expenses/header';
import ExpensesListView from '../components/expenses/list-view';
import useExpense from '../hooks/use-expense';

function Expenses() {
  const { expenses, isQueryLoading, getAllExpenses } = useExpense()

  useEffect(() => {
    getAllExpenses()
  }, [])

  if (isQueryLoading()) return 'Loading...'

  return (
    <div>
      <ExpensesHeader />
      <ExpensesListView items={expenses} />
    </div>
  )
}

export default Expenses
