import { useState } from "react"
import { useUserProfile } from "@/hooks/useUserProfile"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, CircleChevronLeft } from "lucide-react"

export default function ProfilePage() {
  const { profile, loading, updateBasicInfo, changeEmail, changePassword } =
    useUserProfile()

  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPass, setNewPass] = useState("")
  const [feedback, setFeedback] = useState<{
    type: "success" | "error"
    msg: string
  } | null>(null)

  const navigate = useNavigate();

  useState(() => {
    if (profile) {
      setName(profile.name)
      setBio(profile.bio)
    }
  })

  const showFeedback = (type: "success" | "error", msg: string) => {
    setFeedback({ type, msg })
    setTimeout(() => setFeedback(null), 4000)
  }

  const handleBasicInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateBasicInfo({ name, bio })
      showFeedback("success", "Perfil atualizado com sucesso!")
    } catch {
      showFeedback("error", "Erro ao atualizar perfil.")
    }
  }

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await changeEmail(newEmail)
      setNewEmail("")
      showFeedback("success", "E-mail atualizado!")
    } catch (err: any) {
      // Firebase exige reautenticação recente para trocar e-mail
      if (err.code === "auth/requires-recent-login") {
        showFeedback("error", "Faça login novamente antes de alterar o e-mail.")
      } else {
        showFeedback("error", "Erro ao atualizar e-mail.")
      }
    }
  }

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await changePassword(newPass)
      setNewPass("")
      showFeedback("success", "Senha atualizada!")
    } catch (err: any) {
      if (err.code === "auth/requires-recent-login") {
        showFeedback("error", "Faça login novamente antes de alterar a senha.")
      } else {
        showFeedback("error", "Erro ao atualizar senha.")
      }
    }
  }

  if (loading)
    return (
      <p className="text-center mt-10 text-muted-foreground">Carregando...</p>
    )

  return (
    <div className="container-main flex flex-col gap-6 py-10 max-w-lg mx-auto min-w-120">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Minha Conta</h1>

        <Button variant="default" className="gap-2" onClick={() => navigate("/dashboard")}>
          <CircleChevronLeft className="size-4" />
            Voltar
        </Button>
      </div>

      {/* Feedback global */}
      {feedback && (
        <div
          className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm ${
            feedback.type === "success"
              ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="size-4 shrink-0" />
          ) : (
            <AlertCircle className="size-4 shrink-0" />
          )}
          {feedback.msg}
        </div>
      )}

      {/* Informações básicas */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base">Informações básicas</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleBasicInfo}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 bg-background"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Conte um pouco sobre você..."
                className="h-11 bg-background"
              />
            </div>
            <Button type="submit" className="h-11">
              Salvar alterações
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Alterar e-mail */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base">Alterar e-mail</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleEmail}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="newEmail">Novo e-mail</Label>
              <Input
                id="newEmail"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="novo@email.com"
                className="h-11 bg-background"
              />
            </div>
            <Button type="submit" variant="outline" className="h-11">
              Atualizar e-mail
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Alterar senha */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base">Alterar senha</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handlePassword}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="newPass">Nova senha</Label>
              <Input
                id="newPass"
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                className="h-11 bg-background"
              />
            </div>
            <Button type="submit" variant="outline" className="h-11">
              Atualizar senha
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
