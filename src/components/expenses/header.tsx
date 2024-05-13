import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { useState } from "react"
import ExpensesAddForm from "./add-form"

const ExpensesHeader = () => {
  const [isModalVisible, setModal] = useState<boolean>(false)

  function showModal() {
    setModal(true)
  }

  function hideModal() {
    setModal(false)
  }

  return (
    <div className="flex justify-end w-full">
      <Button label="Add+" onClick={showModal} />
      <Dialog header='Add Expense' visible={isModalVisible} onHide={hideModal}>
        <ExpensesAddForm onSuccess={hideModal} />
      </Dialog>
    </div>
  )
}

export default ExpensesHeader