import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { RENDER_TABLE_COLUMNS } from '../../consts/config/expenses';
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
          RENDER_TABLE_COLUMNS.map((item, index) => {
            const { column, text } = item
            return (
              <Column key={generateRandomKey(index)} field={column} header={text ?? column} headerClassName='capitalize'></Column>
            )
          })
        }
      </DataTable>
    </div>
  )
}

export default ExpensesListView
