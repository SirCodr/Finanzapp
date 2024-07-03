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
    <div className="flex justify-end gap-x-6 w-full">
      <a href="expenses/upload" target="_parent" rel="noopener noreferrer" className="font-bold">
        Upload
    </a>
      <Button label="Add+" onClick={showModal} />
      <Dialog header='Add Expense' visible={isModalVisible} onHide={hideModal} draggable={false}>
        <ExpensesAddForm onSuccess={hideModal} />
      </Dialog>
    </div>
  )
}

export default ExpensesHeader