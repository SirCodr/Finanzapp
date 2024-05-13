import ExpensesHeader from '../components/expenses/header';
import ExpensesListView from '../components/expenses/list-view';
import useExpensesStore from '../store/expenses';

function Expenses() {
  const { expenses } = useExpensesStore()

  return (
    <div>
      <ExpensesHeader />
      <ExpensesListView items={expenses} />
    </div>
  )
}

export default Expenses
