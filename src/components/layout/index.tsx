import { ReactNode } from "react"
import ExpensesHeader from "../header"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_5fr]">
      <aside className=''>
        <ExpensesHeader />
      </aside>
      <section className="px-6 py-3">
        {children}
      </section>
    </div>
  )
}

export default Layout