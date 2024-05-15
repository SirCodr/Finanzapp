import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { EXPENSES_TABLE_COLUMNS } from '../../consts/config/expenses';
import { generateRandomKey } from '../../utils';
import { Expense } from '../../types/expenses';

interface Props {
  items: Expense[]
}

function ExpensesListView(props: Props) {

  return (
    <div className='card'>
      <DataTable value={props.items} tableStyle={{ minWidth: '50rem' }} scrollable>
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
