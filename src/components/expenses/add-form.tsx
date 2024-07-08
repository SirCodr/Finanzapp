import { DateTime } from 'luxon'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Chips } from 'primereact/chips'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea } from 'primereact/inputtextarea'
import { useEffect, useRef } from 'react'
import useExpense from '../../hooks/use-expense'
import expenseCategories from '../../mock-data/expense-categories.json'
import expenseSubCategories from '../../mock-data/expense-subcategories.json'
import paymentMethods from '../../mock-data/payment-methods.json'

interface Props {
  onSuccess?: () => void
}

const ExpensesAddForm = (props: Props) => {
  const { serverExpense, createExpenses, setPropValue, isLoading } = useExpense()
  const firstInputFocusRef = useRef<Dropdown>(null)
console.log(serverExpense);

  function handleSubmit() {
    createExpenses([serverExpense])

    if (props.onSuccess) props.onSuccess()
  }

  useEffect(() => {
    firstInputFocusRef.current?.focus()
  }, [])

  return (
    <div>
      <form className='flex flex-col gap-4 px-2 py-3'>
        <Dropdown
          value={serverExpense.category_id}
          name='category'
          options={expenseCategories}
          optionLabel='name'
          optionValue='id'
          placeholder='Category'
          onChange={(e) => setPropValue('category_id', e.value ?? '')}
          ref={firstInputFocusRef}
          filter
          filterInputAutoFocus
          autoFocus
        />
        <Dropdown
          value={serverExpense.sub_category_id}
          name='subCategory'
          placeholder='Subcategory'
          options={expenseSubCategories}
          optionLabel='name'
          optionValue='id'
          filter
          filterInputAutoFocus
          showClear
          onChange={(e) => setPropValue('sub_category_id', e.value ?? null)}
        />
        <Chips
          value={serverExpense.tags ? JSON.parse(serverExpense.tags) : []}
          name='tags'
          placeholder='Tags'
          separator=','
          onChange={(e) => setPropValue('tags', JSON.stringify(e.value))}
          className='capitalize'
        />
        <InputTextarea
          value={serverExpense?.description ?? ''}
          name='description'
          placeholder='Description'
          onChange={(e) => setPropValue('description', e.target.value ?? '')}
        />
        <Dropdown
          value={serverExpense.payment_method_id}
          name='paymentMethod'
          placeholder='Payment Method'
          options={paymentMethods}
          optionLabel='name'
          optionValue='id'
          onChange={(e) => setPropValue('payment_method_id', e.target.value ?? '')}
        />
        <InputNumber
          value={Number(serverExpense.price)}
          name='price'
          placeholder='Price'
          locale='en-US'
          prefix='$'
          onValueChange={(e) =>
            setPropValue('price', e.value?.toString() ?? '')
          }
        />
        <Calendar
          value={DateTime.fromISO(serverExpense.date).toJSDate()}
          name='date'
          placeholder='Date'
          dateFormat='dd/mm/yy'
          onChange={(e) => setPropValue('date', e.value ? DateTime.fromJSDate(e.value).toString() : '')}
          showIcon
        />
        <Button label='Create' onClick={handleSubmit} type='button' severity='success' disabled={isLoading} loading={isLoading} />
      </form>
    </div>
  )
}

export default ExpensesAddForm
