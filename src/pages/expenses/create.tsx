import Layout from "../../components/layout"
import ExpensesAddForm from "../../components/expenses/add-form"
import SheetForm from "../../components/expenses/sheet-form"
import { useEffect } from "react"

function ExpensesCreatePage() {

  useEffect(() => {
    document.addEventListener('contextmenu', event => event.preventDefault());
  }, [])

  return (
    <Layout>
      <SheetForm />
    </Layout>
  )
}

export default ExpensesCreatePage
