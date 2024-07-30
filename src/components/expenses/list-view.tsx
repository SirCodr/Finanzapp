import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { EXPENSES_TABLE_COLUMNS } from '../../consts/config/expenses';
import { generateRandomKey } from '../../utils';
import { LocalExpense } from '../../types/expenses';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';

interface Props {
  items: LocalExpense[]
  isLoading?: boolean
}

function ExpensesListView(props: Props) {
  const [filter, setFilter] = useState('')

  const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
    }

  const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={() => setFilter('')} />
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={filter} onChange={onGlobalFilterChange} placeholder="Filtrar datos" />
                </IconField>
            </div>
        );
    };

    const header = renderHeader();

  return (
    <div className='card'>
      <DataTable value={props.items} paginator filterDisplay='row' globalFilter={filter} rows={15} tableStyle={{ minWidth: '50rem' }} header={header} scrollable loading={props.isLoading}>
        {
          EXPENSES_TABLE_COLUMNS.map((column, index) => {
            const { field, header } = column
            return (
              <Column key={generateRandomKey(index)} field={field} header={field ?? header} {...column} headerClassName='capitalize'></Column>
            )
          })
        }
      </DataTable>
    </div>
  )
}

export default ExpensesListView
