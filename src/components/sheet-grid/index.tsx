import { DataSheetGrid } from 'react-datasheet-grid'
import { DataSheetGridProps } from 'react-datasheet-grid/dist/types'
import AddRowsButton from './add-rows-button'

const SheetGrid = (props: DataSheetGridProps<T>) => {
  return (
   <DataSheetGrid
    addRowsComponent={AddRowsButton as (props: unknown) => React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | null}
      {...props}
    />
  )
}

export default SheetGrid