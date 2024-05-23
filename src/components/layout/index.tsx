import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full px-10 py-6 flex justify-center items-center">
        {children}
      </div>
    </div>
  )
}

export default Layout