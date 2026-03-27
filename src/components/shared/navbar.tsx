import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut, type User } from "firebase/auth"
import { auth } from "@/firebase"
import { LogOut, UserCircle2 } from "lucide-react"

function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  // Escuta mudanças de autenticação em tempo real
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return unsub // cancela o listener ao desmontar
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
  }

  // Pega só o primeiro nome do displayName
  const firstName = user?.displayName?.split(" ")[0] ?? "Perfil"

  return (
    <header className="sticky top-0 border-b border-border z-50 bg-card/80 backdrop-blur-md">
      <nav className="container-main flex items-center justify-between py-4 px-4">
        {/* Brand — sempre visível */}
        <div>
          <Link to="/">
            <img
              src="src/assets/img/logo.png"
              alt="Logo Skyfall RPG"
              className="h-14"
            />
          </Link>
        </div>

        {user ? (
          // ——— Usuário logado ———
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="lg" className="text-lg gap-2" asChild>
              <Link to="/perfil">
                <UserCircle2 className="size-5" />
                {firstName}
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
              title="Sair"
            >
              <LogOut className="size-5" />
            </Button>
          </div>
        ) : (
          // ——— Usuário deslogado ———
          <>
            <ul className="flex gap-4 lg:gap-8 text-lg">
              <li>
                <Link to="/" className="hover:text-primary font-semibold">
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/#feature-section"
                  className="hover:text-primary font-semibold"
                >
                  Recursos
                </Link>
              </li>
              <li>
                <Link
                  to="/#skyfall-section"
                  className="hover:text-primary font-semibold"
                >
                  Skyfall RPG
                </Link>
              </li>
            </ul>

            <div className="flex gap-2">
              <Button variant="ghost" size="lg" className="text-lg" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button size="lg" className="text-lg" asChild>
                <Link to="/register">Criar conta</Link>
              </Button>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar
