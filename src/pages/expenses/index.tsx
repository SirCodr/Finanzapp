import { useEffect } from 'react';
import useExpense from '../../hooks/use-expense';
import ListView from '../../components/list-view';
import { EXPENSES_TABLE_COLUMNS } from '../../consts/config/expenses';

function ExpensesPage() {
  const { isLoading, fetchAllExpenses, localExpenses } = useExpense()

  useEffect(() => {
    fetchAllExpenses()
  }, [])

  return (
    <div>
      <ListView columns={EXPENSES_TABLE_COLUMNS} items={localExpenses} isLoading={isLoading} />
    </div>
  )
}

export default ExpensesPage
