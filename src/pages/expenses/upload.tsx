import Layout from "../../components/layout"
import UploadFile from "../../components/upload-file"

function ExpensesUploadPage() {
  return (
    <Layout>
      <UploadFile
        extensionsAccepted=".xlsx, .xls, .csv"
        maxFileSize={100000}
      />
    </Layout>
  )
}

export default ExpensesUploadPage
