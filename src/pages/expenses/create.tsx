import { useEffect, useMemo, useState } from 'react'
import { CellProps, Column, isoDateColumn, keyColumn, textColumn } from 'react-datasheet-grid'
import 'react-datasheet-grid/dist/style.css'
import { ServerExpense } from '../../types/expenses'
import { Dropdown } from 'primereact/dropdown'
import { DEFAULT_SERVER_EXPENSE } from '../../consts'
import useExpense from '../../hooks/use-expense'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { toast } from 'sonner'
import SheetGrid from '../../components/sheet-grid'
import CustomInputNumber from '../../components/sheet-grid/custom-input-number'
import CustomChips from '../../components/sheet-grid/custom-chips'

const ExpensesCreatePage = () => {
  const { fetchAllCreationDataRequired, createExpenses, creationDataRequired, isLoading, isSuccess } = useExpense()
  const [data, setData] = useState<ServerExpense[]>([DEFAULT_SERVER_EXPENSE])

  const columns = useMemo<Column<ServerExpense>[]>(() => {
    return [
      {
        ...keyColumn,
        title: 'Categoria',
        component: (props: CellProps<ServerExpense, null>) => (
          <Dropdown
            options={creationDataRequired?.categories}
            value={props.rowData.category_id}
            optionLabel='name'
            optionValue='id'
            onChange={(e) =>
              props.setRowData({ ...props.rowData, category_id: e.value })
            }
          />
        )
      },
      {
        ...keyColumn,
        title: 'Sub categoria',
        component: (props: CellProps<ServerExpense, null>) => (
          <Dropdown
            options={creationDataRequired?.subCategories}
            value={props.rowData.sub_category_id}
            optionLabel='name'
            optionValue='id'
            onChange={(e) =>
              props.setRowData({ ...props.rowData, sub_category_id: e.value })
            }
          />
        )
      },
      {
        ...keyColumn('description', textColumn),
        title: 'Descripcion'
      },
      {
        ...keyColumn,
        title: 'Etiquetas',
        component: (props: CellProps<ServerExpense, null>) => (
          <CustomChips<ServerExpense>
            {...props}
            name='tags'
          />
        )
      },
      {
        ...keyColumn,
        title: 'Metodo de pago',
        component: (props: CellProps<ServerExpense, null>) => (
          <Dropdown
            options={creationDataRequired?.paymentMethods}
            value={props.rowData.payment_method_id}
            optionLabel='name'
            optionValue='id'
            onChange={(e) =>
              props.setRowData({ ...props.rowData, payment_method_id: e.value })
            }
          />
        )
      },
      {
        ...keyColumn,
        title: 'Valor',
        component: (props: CellProps<ServerExpense, null>) => (
          <CustomInputNumber<ServerExpense>
            {...props}
            name='price'
          />
        )
      },
      {
        ...keyColumn('date', isoDateColumn),
        title: 'Fecha'
      }
    ]
  }, [creationDataRequired])

   useEffect(() => {
      document.addEventListener('contextmenu', event => event.preventDefault());

      fetchAllCreationDataRequired()

      return(() => document.removeEventListener('contextmenu', event => event.preventDefault()))
  }, [])

  useEffect(() => {
    if (isSuccess) {
      setData([DEFAULT_SERVER_EXPENSE])
      toast.success('Datos creados exitosamente')
    }
  }, [isSuccess])

  if (isLoading) return <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />

  return (
    <div className='w-full'>
      <SheetGrid<ServerExpense>
        value={data}
        onChange={setData}
        columns={columns}
        createRow={() => DEFAULT_SERVER_EXPENSE}
      />
      <Button label='Crear' onClick={() => createExpenses(data)} type='button' severity='success' disabled={isLoading} loading={isLoading} className='mt-8' />
    </div>
  )
}

export default ExpensesCreatePage
