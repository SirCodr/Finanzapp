import { useEffect } from "react"
import Layout from "../../components/layout"
import UploadFile from "../../components/upload-file"
import useExpense from "../../hooks/use-expense"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

function ExpensesUploadPage() {
  const { isSuccess, isLoading, createExpenses, formatExpensesForUpload  } = useExpense()
  const navigate = useNavigate()

async function uploadHandler(data: unknown[]) {
  if (!data || !data.length) return

  const formattedData = await formatExpensesForUpload(data)

    if (formattedData  && formattedData.length) createExpenses(formattedData)
  }

useEffect(() => {
    if (isSuccess) {
      toast.success('Datos creados correctamente')

      setTimeout(() => {
        navigate('/expenses')
      }, 800)
    }
  }, [isSuccess])

  return (
    <Layout>
      <UploadFile
        extensionsAccepted=".xlsx, .xls, .csv"
        maxFileSize={100000}
        isLoading={isLoading || isSuccess}
        uploadHandler={uploadHandler}
      />
    </Layout>
  )
}

export default ExpensesUploadPage
