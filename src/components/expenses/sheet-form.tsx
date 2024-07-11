import { useEffect, useMemo, useState } from 'react'
import { keyColumn, textColumn } from 'react-datasheet-grid'
import 'react-datasheet-grid/dist/style.css'
import SheetGrid from '../sheet-grid'
import { ServerExpense } from '../../types/expenses'
import { Dropdown } from 'primereact/dropdown'
import { DEFAULT_SERVER_EXPENSE } from '../../consts'
import useExpense from '../../hooks/use-expense'
import { CellProps } from 'react-datasheet-grid/dist/types'
import { ProgressSpinner } from 'primereact/progressspinner'

const SheetForm = () => {
  const { fetchAllCreationDataRequired, creationDataRequired, isLoading } = useExpense()
  const [ data, setData ] = useState<ServerExpense[]>([DEFAULT_SERVER_EXPENSE])
  
  const columns = useMemo(() => {
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
        ...keyColumn('Descripcion', textColumn),
        title: 'Descripcion'
      },
      {
        ...keyColumn('Etiquetas', textColumn),
        title: 'Etiquetas'
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
        ...keyColumn('Valor', textColumn),
        title: 'Valor'
      },
      {
        ...keyColumn('Fecha', textColumn),
        title: 'Fecha'
      }
    ]
  }, [creationDataRequired])

  useEffect(() => {
    fetchAllCreationDataRequired()
  }, [])

  if (isLoading) return <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />

  return (
    <div className='w-full'>
      <SheetGrid
      value={data}
      onChange={setData}
      columns={columns}
    />
    </div>
  )
}

export default SheetForm