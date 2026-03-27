import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase"
import { useNavigate } from "react-router"

function LoginPage() {
  const [showPass, setShowPass] = useState<boolean>(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate() // ✅ hook do react-router

  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()

    await signInWithEmailAndPassword(auth, email, password) // ✅ login, não cadastro
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
        navigate("/dashboard") // ✅ redireciona após login
      })
      .catch((error) => {
        console.log(error.code, error.message)
      })
  } // ✅ fecha o onSubmit corretamente

  return (
    <div className="flex-1 bg">
      <div className="container-main flex flex-col justify-center items-center py-18">
        <Card className="max-w-md border-border w-md lg:w-lg sm:w-xs">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              Bem-vindo de volta
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Entre com seu e-mail e senha
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              {" "}
              {/* ✅ onSubmit no form */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu.nome@ifce.edu.br"
                  required
                  className="h-11 bg-background"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // ✅ onChange
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <a href="/recover" className="text-primary text-sm">
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Digite sua senha"
                    required
                    className="h-11 bg-background"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // ✅ onChange
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer"
                    type="button"
                    onClick={() => setShowPass((prev) => !prev)}
                  >
                    {showPass ? (
                      <EyeOffIcon className="size-4" />
                    ) : (
                      <EyeIcon className="size-4" />
                    )}
                  </button>
                </div>
              </div>
              <Button type="submit" className="mt-2 h-11">
                Entrar
              </Button>
            </form>
          </CardContent>

          <CardFooter className="border-t border-border">
            <p className="text-sm text-muted-foreground text-center w-full">
              Não tem conta?{" "}
              <a href="/register" className="text-primary">
                Criar conta
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
