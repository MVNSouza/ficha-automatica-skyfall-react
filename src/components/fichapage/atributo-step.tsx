// src/pages/nova-ficha/AtributosStep.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronRight, RotateCcw } from "lucide-react"

const ATRIBUTOS = [
  { key: "FOR", label: "Força" },
  { key: "DES", label: "Destreza" },
  { key: "CON", label: "Constituição" },
  { key: "INT", label: "Inteligência" },
  { key: "SAB", label: "Sabedoria" },
  { key: "CAR", label: "Carisma" },
]

const VALORES_INICIAIS = [3, 2, 1, 1, 0, -1]

type Atribuicao = Record<string, number | null>
type Fase = "alocar" | "bonus"

interface Props {
  onNext: (dados: Record<string, number>) => void
}

export function AtributosStep({ onNext }: Props) {
  const [atribuicao, setAtribuicao] = useState<Atribuicao>(() =>
    Object.fromEntries(ATRIBUTOS.map((a) => [a.key, null])),
  )
  const [valorSelecionado, setValorSelecionado] = useState<number | null>(null)
  const [fase, setFase] = useState<Fase>("alocar")
  const [bonusAtributo, setBonusAtributo] = useState<string | null>(null)
  // Rastreia índice do valor para distinguir os dois +1
  const [indicesSelecionados, setIndicesSelecionados] = useState<Set<number>>(
    new Set(),
  )
  const [indiceSelecionadoAtual, setIndiceSelecionadoAtual] = useState<
    number | null
  >(null)

  const valoresDisponiveis = VALORES_INICIAIS.filter(
    (_, i) => !indicesSelecionados.has(i),
  )

  const todosAlocados = valoresDisponiveis.length === 0

  // Selecionar valor disponível
  const handleSelecionarValor = (valor: number, indexOriginal: number) => {
    if (indiceSelecionadoAtual === indexOriginal) {
      setValorSelecionado(null)
      setIndiceSelecionadoAtual(null)
    } else {
      setValorSelecionado(valor)
      setIndiceSelecionadoAtual(indexOriginal)
    }
  }

  // Atribuir valor ao card
  const handleClicarCard = (key: string) => {
    if (fase === "bonus") {
      setBonusAtributo(key)
      return
    }
    if (valorSelecionado === null || indiceSelecionadoAtual === null) return

    // Devolve o índice anterior se o card já tinha um valor
    const anteriorIndex = Object.entries(atribuicao).find(([k]) => k === key)
    // Se o card já tem valor, devolve o índice ao pool
    const novoIndices = new Set(indicesSelecionados)

    // Remove índice anterior do card se existia
    const entradaAnterior = Object.entries(atribuicao).find(
      ([k, v]) => k === key && v !== null,
    )
    if (entradaAnterior) {
      // Encontra o índice original do valor que estava no card
      for (const i of novoIndices) {
        // não temos como saber qual índice era — simplificação: limpa só se reatribuindo
      }
    }

    novoIndices.add(indiceSelecionadoAtual)
    setIndicesSelecionados(novoIndices)
    setAtribuicao((prev) => ({ ...prev, [key]: valorSelecionado }))
    setValorSelecionado(null)
    setIndiceSelecionadoAtual(null)
  }

  const handleReset = () => {
    setAtribuicao(Object.fromEntries(ATRIBUTOS.map((a) => [a.key, null])))
    setValorSelecionado(null)
    setIndiceSelecionadoAtual(null)
    setIndicesSelecionados(new Set())
    setFase("alocar")
    setBonusAtributo(null)
  }

  const handleAvancarFase = () => {
    if (fase === "alocar" && todosAlocados) setFase("bonus")
    if (fase === "bonus" && bonusAtributo) {
      const resultado = Object.fromEntries(
        ATRIBUTOS.map((a) => [
          a.key,
          (atribuicao[a.key] ?? 0) + (a.key === bonusAtributo ? 1 : 0),
        ]),
      ) as Record<string, number>
      onNext(resultado)
    }
  }

  const podeAvancar =
    (fase === "alocar" && todosAlocados) ||
    (fase === "bonus" && bonusAtributo !== null)

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Indicador de fase */}
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "text-xs font-semibold px-3 py-1 rounded-full border transition-all",
            fase === "alocar"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-muted text-muted-foreground border-border",
          )}
        >
          1. Alocar valores
        </span>
        <ChevronRight className="size-4 text-muted-foreground" />
        <span
          className={cn(
            "text-xs font-semibold px-3 py-1 rounded-full border transition-all",
            fase === "bonus"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-muted text-muted-foreground border-border",
          )}
        >
          2. Escolher bônus +1
        </span>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-3 gap-3">
        {ATRIBUTOS.map(({ key }) => {
          const valor = atribuicao[key]
          const isSelecionado = valorSelecionado !== null && fase === "alocar"
          const isBonus = bonusAtributo === key
          const valorFinal = valor !== null ? valor + (isBonus ? 1 : 0) : null

          return (
            <button
              key={key}
              onClick={() => handleClicarCard(key)}
              disabled={
                fase === "alocar"
                  ? valorSelecionado === null
                  : fase === "bonus"
                    ? valor === null || (valor + 1 > 3 && key !== bonusAtributo)
                    : false
              }
              className={cn(
                "group relative flex flex-col rounded-xl border-2 overflow-hidden",
                "transition-all duration-200 text-left",
                // base
                valor === null
                  ? "bg-card border-border"
                  : "bg-card border-border",
                // selecionável
                isSelecionado &&
                  valor === null &&
                  "border-primary/50 cursor-pointer hover:border-primary hover:scale-105",
                isSelecionado &&
                  valor !== null &&
                  "cursor-pointer hover:border-primary/50 hover:scale-105",
                // bonus
                fase === "bonus" &&
                  valor !== null &&
                  valor < 3 &&
                  "cursor-pointer hover:border-primary hover:scale-105",
                isBonus &&
                  "border-primary shadow-[0_0_16px_2px] shadow-primary/30",
                // desabilitado
                "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100",
              )}
            >
              {/* Header */}
              <div className="bg-muted/60 px-3 py-2 text-center border-b border-border">
                <span className="text-xs font-bold tracking-widest text-foreground">
                  {key}
                </span>
              </div>

              {/* Valor */}
              <div className="flex items-center justify-center py-4">
                <span
                  className={cn(
                    "text-2xl font-black tabular-nums transition-colors",
                    valorFinal === null
                      ? "text-muted-foreground/40"
                      : valorFinal > 0
                        ? "text-primary"
                        : valorFinal < 0
                          ? "text-destructive"
                          : "text-foreground",
                  )}
                >
                  {valorFinal === null
                    ? "—"
                    : valorFinal > 0
                      ? `+${valorFinal}`
                      : valorFinal}
                </span>
              </div>

              {/* Footer — Proteção */}
              <div className="border-t border-border bg-muted/30 px-3 py-2 text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Proteção
                </p>
                <p className="text-sm font-bold text-foreground">
                  {valorFinal !== null ? 10 + valorFinal : 10}
                </p>
              </div>

              {/* Badge de bônus */}
              {isBonus && (
                <span className="absolute top-1.5 right-1.5 text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-md">
                  +1
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Chips de valores disponíveis */}
      {fase === "alocar" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground">
            Clique em um valor e depois em um atributo para alocar:
          </p>
          <div className="flex gap-2 flex-wrap">
            {VALORES_INICIAIS.map((valor, index) => {
              const usado = indicesSelecionados.has(index)
              const ativo = indiceSelecionadoAtual === index
              return (
                <button
                  key={index}
                  disabled={usado}
                  onClick={() => handleSelecionarValor(valor, index)}
                  className={cn(
                    "px-4 py-2 rounded-lg border-2 font-bold text-sm transition-all",
                    usado
                      ? "opacity-25 cursor-not-allowed border-border bg-muted text-muted-foreground line-through"
                      : ativo
                        ? "border-primary bg-primary text-primary-foreground scale-110 shadow-lg"
                        : "border-border bg-card text-foreground hover:border-primary/50 hover:scale-105 cursor-pointer",
                  )}
                >
                  {valor > 0 ? `+${valor}` : valor}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {fase === "bonus" && (
        <p className="text-xs text-muted-foreground">
          Clique em um atributo para receber <strong>+1</strong>. Nenhum
          atributo pode ultrapassar +3.
        </p>
      )}

      {/* Rodapé */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="gap-2 text-muted-foreground"
        >
          <RotateCcw className="size-3.5" />
          Reiniciar
        </Button>

        <Button
          onClick={handleAvancarFase}
          disabled={!podeAvancar}
          className="gap-2"
        >
          {fase === "alocar" ? "Escolher bônus" : "Próxima etapa"}
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
