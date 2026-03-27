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
import { EyeIcon, EyeOffIcon, CheckCircle2, XCircle } from "lucide-react"
import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "@/firebase"
import { useNavigate } from "react-router"

// Regras de validação da senha
const passwordRules = [
  { id: "length",   label: "Mínimo 8 caracteres",          test: (p: string) => p.length >= 8 },
  { id: "upper",    label: "Uma letra maiúscula",           test: (p: string) => /[A-Z]/.test(p) },
  { id: "lower",    label: "Uma letra minúscula",           test: (p: string) => /[a-z]/.test(p) },
  { id: "number",   label: "Um número",                    test: (p: string) => /[0-9]/.test(p) },
  { id: "special",  label: "Um caractere especial (!@#$…)", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
]

function RegisterPage() {
  const navigate = useNavigate()

  const [name, setName]               = useState("")
  const [email, setEmail]             = useState("")
  const [password, setPassword]       = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [showPass, setShowPass]       = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError]             = useState("")
  const [loading, setLoading]         = useState(false)

  // Checa cada regra em tempo real
  const ruleResults = passwordRules.map((rule) => ({
    ...rule,
    passed: rule.test(password),
  }))

  const passwordValid   = ruleResults.every((r) => r.passed)
  const passwordsMatch  = password === confirmPass && confirmPass !== ""
  const formValid       = name.trim() !== "" && email !== "" && passwordValid && passwordsMatch

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!passwordValid) {
      setError("A senha não atende aos requisitos mínimos.")
      return
    }
    if (!passwordsMatch) {
      setError("As senhas não coincidem.")
      return
    }

    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      // Salva o nome no perfil do Firebase
      await updateProfile(userCredential.user, { displayName: name.trim() })
      navigate("/dashboard")
    } catch (err: any) {
      const messages: Record<string, string> = {
        "auth/email-already-in-use": "Este e-mail já está em uso.",
        "auth/invalid-email":        "E-mail inválido.",
        "auth/weak-password":        "Senha muito fraca.",
      }
      setError(messages[err.code] ?? "Erro ao criar conta. Tente novamente.")
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
              Criar conta
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Preencha os dados para se registrar
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>

              {/* Nome */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Seu Nome"
                  required
                  className="h-11 bg-background"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* E-mail */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">E-mail institucional</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu.nome@ifce.edu.br"
                  required
                  className="h-11 bg-background"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Senha */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Crie uma senha"
                    required
                    className="h-11 bg-background"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer"
                    onClick={() => setShowPass((prev) => !prev)}
                  >
                    {showPass ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                  </button>
                </div>

                {/* Checklist de requisitos — aparece ao digitar */}
                {password.length > 0 && (
                  <ul className="flex flex-col gap-1 mt-1">
                    {ruleResults.map((rule) => (
                      <li key={rule.id} className="flex items-center gap-2 text-xs">
                        {rule.passed
                          ? <CheckCircle2 className="size-3.5 text-green-500 shrink-0" />
                          : <XCircle     className="size-3.5 text-muted-foreground shrink-0" />
                        }
                        <span className={rule.passed ? "text-green-600" : "text-muted-foreground"}>
                          {rule.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Confirmar senha */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="confirmPass">Confirmar senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPass"
                    name="confirmPass"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repita a senha"
                    required
                    className={`h-11 bg-background ${
                      confirmPass.length > 0
                        ? passwordsMatch
                          ? "border-green-500 focus-visible:ring-green-500"
                          : "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer"
                    onClick={() => setShowConfirm((prev) => !prev)}
                  >
                    {showConfirm ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                  </button>
                </div>
                {confirmPass.length > 0 && !passwordsMatch && (
                  <p className="text-xs text-red-500">As senhas não coincidem.</p>
                )}
              </div>

              {/* Erro do Firebase */}
              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <Button
                type="submit"
                className="mt-2 h-11"
                disabled={!formValid || loading}
              >
                {loading ? "Criando conta…" : "Criar conta"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="border-t border-border">
            <p className="text-sm text-muted-foreground text-center w-full">
              Já tem conta?{" "}
              <a href="/login" className="text-primary">
                Entrar
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default RegisterPage
