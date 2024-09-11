import { InputNumber } from "primereact/inputnumber"
import { useEffect, useRef } from "react"
import { CellProps } from "react-datasheet-grid"

interface Props<T> extends CellProps<T,null> {
  name: string
}

const CustomInputNumber = <T,> (props: Props<T>) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (props.active || props.focus) ref.current?.focus()
  }, [props.active, props.focus])

  return (
    <InputNumber
      inputRef={ref}
      value={Number((props.rowData as never)[props.name])}
      name={props.name}
      placeholder={props.name.toUpperCase()}
      locale='en-US'
      prefix='$'
      autoFocus={props.active}
      onChange={(e) =>
        props.setRowData({
          ...props.rowData,
          [props.name]: e.value?.toString() ?? ''
        })
      }
    />
  )
}

export default CustomInputNumber