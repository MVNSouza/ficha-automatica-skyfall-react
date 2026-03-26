import Navbar from "@/components/shared/navbar"
import { Outlet } from "react-router"

function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
