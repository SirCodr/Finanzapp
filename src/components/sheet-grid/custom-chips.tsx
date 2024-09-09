import { Chips } from "primereact/chips"
import { useEffect, useRef } from "react"
import { CellProps } from "react-datasheet-grid"

interface Props<T> extends CellProps<T,null> {
  name: string
}

const CustomChips = <T,> (props: Props<T>) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (props.active || props.focus) ref.current?.focus()
  }, [props.active, props.focus])

  return (
    <Chips
      inputRef={ref}
      value={(props.rowData as never)[props.name]}
      name={props.name}
      separator=','
      onChange={(e) =>
        props.setRowData({ ...props.rowData, tags: e.value ?? [] })
      }
      className='capitalize'
    />
  )
}

export default CustomChips