import { useEffect } from 'react';
import ExpensesListView from '../../components/expenses/list-view';
import useExpense from '../../hooks/use-expense';

function ExpensesPage() {
  const { isLoading, fetchAllExpenses, localExpenses } = useExpense()

  useEffect(() => {
    fetchAllExpenses()
  }, [])

  return (
    <div>
      <ExpensesListView items={localExpenses} isLoading={isLoading} />
    </div>
  )
}

export default ExpensesPage
