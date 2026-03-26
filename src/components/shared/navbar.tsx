import { Button } from "@/components/ui/button"
import { Link } from "react-router"

function Navbar() {
  return (
    <header className="flex justify-between items-center min-w-svw p-6 bg-card/80 sticky top-0">
      <div>
        <Link to={"/"}>
          <img
            src="src\assets\img\logo.png"
            alt="Logo Skyfall RPG"
            className="h-14"
          />
        </Link>
      </div>
      <ul className="flex gap-8">
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
        <Button variant={"ghost"} size="lg" asChild>
          <Link to="/login">Entrar</Link>
        </Button>
        <Button size={"lg"} asChild>
          <Link to={"/register"}>Criar conta</Link>
        </Button>
      </div>
    </header>
  )
}

export default Navbar
