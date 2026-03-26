import Navbar from "@/components/shared/navbar"
import { Outlet } from "react-router"

function App() {
  return (
    <div className="flex-1 flex-col min-h-svh">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  )
}

export default App
