import { useEffect, useMemo, useState } from 'react'
import { CellProps, Column, isoDateColumn, keyColumn, textColumn } from 'react-datasheet-grid'
import 'react-datasheet-grid/dist/style.css'
import { Dropdown } from 'primereact/dropdown'
import { DEFAULT_SERVER_INCOME } from '../../consts'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { toast } from 'sonner'
import SheetGrid from '../../components/sheet-grid'
import CustomInputNumber from '../../components/sheet-grid/custom-input-number'
import { ServerIncome } from '../../types/income'
import { useMutation, useQuery } from 'react-query'
import { createIncomes, fetchAllIncomeCreationOptions } from '../../services/incomes'

const IncomesCreatePage = () => {
  const createIncomeMutation = useMutation(createIncomes)
  const incomeCreationOptionsQuery = useQuery({
    queryKey: 'income-creation-options',
    queryFn: fetchAllIncomeCreationOptions,
    enabled: false
  })
  const [data, setData] = useState<ServerIncome[]>([DEFAULT_SERVER_INCOME])

  const columns = useMemo<Column<ServerIncome>[]>(() => {
    return [
      {
        ...keyColumn,
        title: 'Categoria',
        component: (props: CellProps<ServerIncome, null>) => (
          <Dropdown
            options={incomeCreationOptionsQuery.data?.data.categories}
            value={props.rowData.categoryId}
            optionLabel='name'
            optionValue='id'
            onChange={(e) =>
              props.setRowData({ ...props.rowData, categoryId: e.value })
            }
          />
        )
      },
      {
        ...keyColumn,
        title: 'Sub categoria',
        component: (props: CellProps<ServerIncome, null>) => (
          <Dropdown
            options={incomeCreationOptionsQuery.data?.data.subCategories}
            value={props.rowData.subCategoryId}
            optionLabel='name'
            optionValue='id'
            onChange={(e) =>
              props.setRowData({ ...props.rowData, subCategoryId: e.value })
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
        title: 'Cuenta destino',
        component: (props: CellProps<ServerIncome, null>) => (
          <Dropdown
            options={incomeCreationOptionsQuery.data?.data.paymentAccounts}
            value={props.rowData.paymentAccountId}
            optionLabel='name'
            optionValue='id'
            onChange={(e) =>
              props.setRowData({ ...props.rowData, paymentAccountId: e.value })
            }
          />
        )
      },
      {
        ...keyColumn,
        title: 'Valor',
        component: (props: CellProps<ServerIncome, null>) => (
          <CustomInputNumber<ServerIncome>
            {...props}
            name='amount'
          />
        )
      },
      {
        ...keyColumn('date', isoDateColumn),
        title: 'Fecha'
      }
    ]
  }, [incomeCreationOptionsQuery.data])

   useEffect(() => {
      document.addEventListener('contextmenu', event => event.preventDefault());
      incomeCreationOptionsQuery.refetch()

      return(() => document.removeEventListener('contextmenu', event => event.preventDefault()))
  }, [])

  useEffect(() => {
    if (createIncomeMutation.isSuccess) {
      setData([DEFAULT_SERVER_INCOME])
      toast.success('Datos creados exitosamente')
    }
  }, [createIncomeMutation.isSuccess])

  if (incomeCreationOptionsQuery.isLoading) return <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />

  return (
    <div className='w-full'>
      <SheetGrid<ServerIncome>
        value={data}
        onChange={setData}
        columns={columns}
        createRow={() => DEFAULT_SERVER_INCOME}
      />
      <Button label='Crear' onClick={() => createIncomeMutation.mutate(data)} type='button' severity='success' disabled={createIncomeMutation.isLoading} loading={createIncomeMutation.isLoading} className='mt-8' />
    </div>
  )
}

export default IncomesCreatePage
