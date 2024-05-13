import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import useExpense from '../../hooks/use-expense'
import { Expense } from '../../types/expenses'
import useExpensesStore from '../../store/expenses'

interface Props {
  onSuccess?: () => void
}

const ExpensesAddForm = (props: Props) => {
  const { addExpense } = useExpensesStore()
  const { expense, setPropValue } = useExpense()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setPropValue(name as keyof Expense, value)
  }

  function handleSubmit() {
    addExpense(expense)

    if (props.onSuccess) props.onSuccess()
  }

  return (
    <div>
      <form className='flex flex-col gap-4 px-2 py-3'>
        <InputText
          value={expense.category}
          name='category'
          placeholder='Category'
          onChange={handleChange}
        />
        <InputText
          value={expense.subCategory}
          name='subCategory'
          placeholder='Subcategory'
          onChange={handleChange}
        />
        <InputText
          value=''
          name='tags'
          placeholder='Tags'
          onChange={handleChange}
        />
        <InputText
          value={expense.description}
          name='description'
          placeholder='Description'
          onChange={handleChange}
        />
        <InputText
          value={expense.paymentMethod}
          name='paymentMethod'
          placeholder='Payment Method'
          onChange={handleChange}
        />
        <InputText
          value={expense.price}
          name='price'
          placeholder='Price'
          onChange={handleChange}
        />
        <InputText
          value={expense.date}
          name='date'
          placeholder='Date'
          onChange={handleChange}
        />
        <Button label='Add' onClick={handleSubmit} type='button' />
      </form>
    </div>
  )
}

export default ExpensesAddForm
