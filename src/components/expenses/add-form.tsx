import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { MultiSelect } from 'primereact/multiselect'
import { useEffect, useRef } from 'react'
import useExpense from '../../hooks/use-expense'
import expenseTags from '../../mock-data/expense-tags.json'
import expenseCategories from '../../mock-data/expense-categories.json'
import expenseSubCategories from '../../mock-data/expense-subcategories.json'
import paymentMethods from '../../mock-data/payment-methods.json'
import useExpensesStore from '../../store/expenses'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'

interface Props {
  onSuccess?: () => void
}

const ExpensesAddForm = (props: Props) => {
  const { addExpense } = useExpensesStore()
  const { expense, setPropValue } = useExpense()
  const firstInputFocusRef = useRef<Dropdown>(null)

  function handleSubmit() {
    addExpense(expense)

    if (props.onSuccess) props.onSuccess()
  }

  useEffect(() => {
    firstInputFocusRef.current?.focus()
  }, [])

  return (
    <div>
      <form className='flex flex-col gap-4 px-2 py-3'>
        <Dropdown
          value={expense.category}
          name='category'
          options={expenseCategories}
          optionLabel='name'
          optionValue='id'
          placeholder='Category'
          onChange={(e) => setPropValue('category', e.value ?? '')}
          ref={firstInputFocusRef}
          filter
          filterInputAutoFocus
          autoFocus
        />
        <Dropdown
          value={expense.subCategory}
          name='subCategory'
          placeholder='Subcategory'
          options={expenseSubCategories}
          optionLabel='name'
          optionValue='id'
          filter
          filterInputAutoFocus
          onChange={(e) => setPropValue('category', e.value ?? '')}
        />
        <MultiSelect
          value={expense.tags}
          name='tags'
          placeholder='Tags'
          options={expenseTags}
          optionLabel='name'
          optionValue='id'
          onChange={(e) => setPropValue('tags', e.value ?? [])}
          className='capitalize'
          filter
        />
        <InputTextarea
          value={expense.description}
          name='description'
          placeholder='Description'
          onChange={(e) => setPropValue('description', e.target.value ?? '')}
        />
        <Dropdown
          value={expense.paymentMethod}
          name='paymentMethod'
          placeholder='Payment Method'
          options={paymentMethods}
          optionLabel='name'
          optionValue='id'
          onChange={(e) => setPropValue('paymentMethod', e.target.value ?? '')}
        />
        <InputNumber
          value={Number(expense.price)}
          name='price'
          placeholder='Price'
          locale='en-US'
          prefix='$'
          onValueChange={(e) =>
            setPropValue('price', e.value?.toString() ?? '')
          }
        />
        <InputText
          value={expense.date}
          name='date'
          placeholder='Date'
          onChange={(e) => setPropValue('date', e.target.value ?? '')}
        />
        <Button label='Add' onClick={handleSubmit} type='button' severity='success' />
      </form>
    </div>
  )
}

export default ExpensesAddForm
