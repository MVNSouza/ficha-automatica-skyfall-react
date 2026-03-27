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
import { EyeIcon, EyeOffIcon, AlertCircle } from "lucide-react"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase"
import { useNavigate } from "react-router"

// Mensagens amigáveis para cada erro do Firebase
const firebaseErrors: Record<string, string> = {
  "auth/user-not-found": "Nenhuma conta encontrada com este e-mail.",
  "auth/wrong-password": "Senha incorreta. Verifique e tente novamente.",
  "auth/invalid-credential": "E-mail ou senha inválidos.", // erro unificado nas versões recentes do Firebase
  "auth/invalid-email": "Formato de e-mail inválido.",
  "auth/too-many-requests":
    "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
  "auth/user-disabled": "Esta conta foi desativada.",
}

function LoginPage() {
  const navigate = useNavigate()

  const [showPass, setShowPass] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const clearFields = () => {
    setEmail("")
    setPassword("")
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
      console.log(userCredential.user)
      navigate("/dashboard")
    } catch (err: any) {
      // Limpa os campos em caso de erro
      clearFields()

      // Exibe mensagem amigável ou fallback genérico
      setError(firebaseErrors[err.code] ?? "Ocorreu um erro. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

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
            {/* Banner de erro — só aparece quando há mensagem */}
            {error && (
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 mb-4 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
                <AlertCircle className="size-4 mt-0.5 shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  required
                  className={`h-11 bg-background ${error ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                  }}
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
                    className={`h-11 bg-background ${error ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError("")
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer"
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

              <Button type="submit" className="mt-2 h-11" disabled={loading}>
                {loading ? "Entrando…" : "Entrar"}
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
