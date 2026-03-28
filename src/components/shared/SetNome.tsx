import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { Button } from "@/components/ui/button"
import { Pencil, Check, X } from "lucide-react"

interface SetNomeProps {
  fichaId: string
  nomeAtual?: string
  onUpdate?: (novoNome: string) => void
}

export function SetNome({ fichaId, nomeAtual, onUpdate }: SetNomeProps) {
  const [editando, setEditando] = useState(false)
  const [valor, setValor] = useState(nomeAtual || "")
  const [loading, setLoading] = useState(false)

  const salvar = async () => {
    if (!valor.trim()) return

    setLoading(true)
    try {
      await updateDoc(doc(db, "fichas", fichaId), {
        nome: valor,
      })

      onUpdate?.(valor)
      setEditando(false)
    } finally {
      setLoading(false)
    }
  }

  const cancelar = () => {
    setValor(nomeAtual || "")
    setEditando(false)
  }

  if (editando) {
    return (
      <div className="flex items-center gap-2">
        <input
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Nome do personagem"
          className="text-3xl font-bold bg-transparent border-b border-primary outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") salvar()
            if (e.key === "Escape") cancelar()
          }}
          autoFocus
        />

        <Button size="icon" variant="ghost" onClick={salvar} disabled={loading}>
          <Check className="size-4 text-green-500" />
        </Button>

        <Button size="icon" variant="ghost" onClick={cancelar}>
          <X className="size-4 text-destructive" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <h1 className="text-3xl font-bold text-foreground">
        {nomeAtual || (
          <span className="text-muted-foreground italic">Sem nome</span>
        )}
      </h1>

      <Button size="icon" variant="ghost" onClick={() => setEditando(true)}>
        <Pencil className="size-4" />
      </Button>
    </div>
  )
}
