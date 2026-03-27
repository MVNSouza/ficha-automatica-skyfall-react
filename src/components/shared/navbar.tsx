import { Button } from "@/components/ui/button"
import { Link } from "react-router"

function Navbar() {
  return (
    <header className="sticky top-0 border-b border-border z-50 bg-card/80 backdrop-blur-md">
      <nav className="container-main flex items-center justify-between py-4 px-4">
        <div>
          <Link to={"/"}>
            <img
              src="src\assets\img\logo.png"
              alt="Logo Skyfall RPG"
              className="h-14"
            />
          </Link>
        </div>
        <ul className="flex gap-4 lg:gap-8 text-lg">
          <li>
            <Link to={"/"} className="hover:text-primary font-semibold">
              Início
            </Link>
          </li>
          <li>
            <Link
              to={"/#feature-section"}
              className="hover:text-primary font-semibold"
            >
              Recursos
            </Link>
          </li>
          <li>
            <Link
              to={"/#skyfall-section"}
              className="hover:text-primary font-semibold"
            >
              Skyfall RPG
            </Link>
          </li>
        </ul>
        <div>
          <Button variant={"ghost"} size="lg" className="text-lg" asChild>
            <Link to="/login">Entrar</Link>
          </Button>
          <Button size={"lg"} className="text-lg" asChild>
            <Link to={"/register"}>Criar conta</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
