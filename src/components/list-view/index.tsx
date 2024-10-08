import { DataTable } from 'primereact/datatable'
import { Column, ColumnProps } from 'primereact/column'
import { generateRandomKey } from '../../utils'
import { LocalExpense } from '../../types/expenses'
import { ChangeEvent, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputIcon } from 'primereact/inputicon'
import { Button } from 'primereact/button'

interface Props {
  columns: ColumnProps[]
  items: LocalExpense[]
  isLoading?: boolean
}

function ListView(props: Props) {
  const [filter, setFilter] = useState('')

  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFilter(value)
  }

  const renderHeader = () => {
    return (
      <div className='w-full flex justify-end'>
        <section className='flex gap-6'>
          <Button
            type='button'
            icon='pi pi-filter-slash'
            label='Limpiar'
            outlined
            onClick={() => setFilter('')}
          />
          <div className='flex items-center gap-x-2'>
            <InputIcon className='pi pi-search' />
            <InputText
              value={filter}
              onChange={onGlobalFilterChange}
              placeholder='Filtrar datos'
              type='search'
            />
          </div>
        </section>
      </div>
    )
  }

  const header = renderHeader()

  return (
    <div className='card'>
      <DataTable
        value={props.items}
        paginator
        filterDisplay='row'
        globalFilter={filter}
        rows={15}
        tableStyle={{ minWidth: '50rem' }}
        header={header}
        scrollable
        removableSort
        loading={props.isLoading}
      >
        {props.columns.map((column, index) => {
          const { field, header } = column
          return (
            <Column
              key={generateRandomKey(index)}
              field={field}
              header={field ?? header}
              {...column}
              headerClassName='capitalize'
            ></Column>
          )
        })}
      </DataTable>
    </div>
  )
}

export default ListView
