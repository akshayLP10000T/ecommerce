import Navbar from "@/components/MainLayout/Navbar"
import { Outlet } from "react-router-dom"

const Main = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Main