import { useEffect } from 'react';
import ExpensesHeader from '../../components/expenses/header';
import ExpensesListView from '../../components/expenses/list-view';
import useExpense from '../../hooks/use-expense';

function ExpensesPage() {
  const { expensesQuery, expenses } = useExpense()

  useEffect(() => {
    expensesQuery.refetch()
  }, [])

  return (
    <div>
      <ExpensesHeader />
      <ExpensesListView items={expenses} isLoading={expensesQuery.isLoading} />
    </div>
  )
}

export default ExpensesPage
