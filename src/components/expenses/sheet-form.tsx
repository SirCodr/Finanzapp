import { useEffect, useMemo, useRef, useState } from 'react'
import { CellProps, Column, isoDateColumn, keyColumn, textColumn } from 'react-datasheet-grid'
import 'react-datasheet-grid/dist/style.css'
import SheetGrid from '../sheet-grid'
import { ServerExpense } from '../../types/expenses'
import { Dropdown } from 'primereact/dropdown'
import { DEFAULT_SERVER_EXPENSE } from '../../consts'
import useExpense from '../../hooks/use-expense'
import {  } from 'react-datasheet-grid/dist/types'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'
import { Chips } from 'primereact/chips'
import { toast } from 'sonner'

const NumberComponent = (props: CellProps<ServerExpense, null>) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (props.active || props.focus) ref.current?.focus()
  }, [props.active, props.focus])

  return (
    <InputNumber
      inputRef={ref}
      value={Number(props.rowData.price)}
      name='price'
      placeholder='Price'
      locale='en-US'
      prefix='$'
      autoFocus={props.active}
      onChange={(e) =>
        props.setRowData({
          ...props.rowData,
          price: e.value?.toString() ?? ''
        })
      }
    />
  )
}

const ChipsComponent = (props: CellProps<ServerExpense, null>) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (props.active || props.focus) ref.current?.focus()
  }, [props.active, props.focus])

  return (
    <Chips
      inputRef={ref}
      value={props.rowData.tags}
      name='tags'
      separator=','
      onChange={(e) =>
        props.setRowData({ ...props.rowData, tags: e.value ?? [] })
      }
      className='capitalize'
    />
  )
}

const SheetForm = () => {
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
        component: ChipsComponent
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
        component: NumberComponent
      },
      {
        ...keyColumn('date', isoDateColumn),
        title: 'Fecha'
      }
    ]
  }, [creationDataRequired])

  useEffect(() => {
    fetchAllCreationDataRequired()
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
      <Button label='Create' onClick={() => createExpenses(data)} type='button' severity='success' disabled={isLoading} loading={isLoading} className='mt-8' />
    </div>
  )
}

export default SheetForm