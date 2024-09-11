import { useEffect } from 'react'
import UploadFile from '../../components/upload-file'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useMutation } from 'react-query'
import { createIncomes } from '../../services/incomes'
import useIncome from '../../hooks/use-income'

function IncomesUploadPage() {
  const { formatForUpload } = useIncome()
  const createMutation = useMutation(createIncomes)
  const navigate = useNavigate()

  async function uploadHandler(data: unknown[]) {
    if (!data || !data.length) return

    const formattedData = await formatForUpload(data)

    if (formattedData && formattedData.length)
      createMutation.mutate(formattedData)
  }

  useEffect(() => {
    if (createMutation.isSuccess) {
      toast.success('Datos creados correctamente')

      setTimeout(() => {
        navigate('/expenses')
      }, 800)
    }
  }, [createMutation.isSuccess])

  return (
    <UploadFile
      extensionsAccepted='.xlsx, .xls, .csv'
      maxFileSize={100000}
      isLoading={createMutation.isLoading || createMutation.isSuccess}
      uploadHandler={uploadHandler}
    />
  )
}

export default IncomesUploadPage
