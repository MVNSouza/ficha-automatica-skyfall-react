// src/pages/nova-ficha/TalentosStep.tsx
import { useState } from "react"
import talentosData from "@/assets/data/talentos.json"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, ChevronLeft, Star, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const talentosBrutos = (talentosData as any).talentos ?? talentosData


const MAX_TALENTOS = 1 // nível 1 começa com 1 talento

export interface TalentosDados {
  talentos: string[]
}

interface Props {
  onNext: (dados: TalentosDados) => void
  onBack: () => void
  legado: string
  maldicao?: string
}

export function TalentosStep({ onNext, onBack, legado, maldicao }: Props) {
  const [selecionados, setSelecionados] = useState<string[]>([])
  const [filtro, setFiltro] = useState<string>("todos")

  const [aberto, setAberto] = useState<string | null>(null)

const legadoKey = legado?.toLowerCase().trim()
const maldicaoKey = maldicao?.toLowerCase().trim()

const talentosRaca = talentosBrutos.porRaca?.[legadoKey] ?? []
const talentosMaldicao =
  maldicaoKey && maldicaoKey !== "nenhuma"
    ? talentosBrutos.porMaldicao?.[maldicaoKey] ?? []
    : []

const talentos = [...talentosRaca, ...talentosMaldicao]

console.log("talentosRaca:", talentosRaca)
console.log("talentosMaldicao:", talentosMaldicao)

const tipos = ["todos", ...Array.from(
  new Set(talentos.map((t: any) => t.tipo ?? t.categoria ?? "geral"))
)]

const talentosFiltrados = talentos.filter((t: any) => {
  const tipo = t.tipo ?? t.categoria ?? "geral"
  return filtro === "todos" || tipo === filtro
})

  const toggle = (nome: string) => {
  setSelecionados((prev) => {
    if (prev.includes(nome)) return prev.filter((k) => k !== nome)
    if (prev.length >= MAX_TALENTOS) return [nome]
    return [...prev, nome]
  })
}

const toggleAccordion = (nome: string) => {
  setAberto((prev) => (prev === nome ? null : nome))
}

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">

      {/* Esquerda */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
            <Star className="size-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Etapa 4 de 6</p>
            <h1 className="text-xl font-bold text-foreground">Talentos</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">Talentos</strong> são habilidades especiais adquiridas pelo
            personagem ao longo de sua jornada. Eles representam treinamentos, dons naturais e experiências
            únicas que moldam as capacidades do aventureiro além de sua classe e legado.
          </p>
          <p>
            No <strong className="text-foreground">1º nível</strong>, você começa com{" "}
            <strong className="text-foreground">1 talento</strong>. A cada nível par você poderá adquirir
            talentos adicionais, conforme a tabela da sua classe.
          </p>
          <p>
            Alguns talentos possuem <strong className="text-foreground">pré-requisitos</strong> de atributo,
            nível ou outras condições. Verifique se seu personagem os atende antes de selecionar.
          </p>
        </div>

        {/* Preview dos selecionados */}
        {selecionados.length > 0 && (
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              Talentos selecionados ({selecionados.length}/{MAX_TALENTOS})
            </p>
            <div className="flex flex-wrap gap-2">
              {selecionados.map((nome) => (
                <Badge key={nome}>
                  {nome}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Direita */}
      <div className="flex flex-col gap-5">

        {/* Filtro por tipo */}
        {tipos.length > 2 && (
          <div className="flex flex-wrap gap-2">
            {tipos.map((tipo) => (
              <button
                key={tipo}
                onClick={() => setFiltro(tipo)}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-full border font-medium transition-all capitalize",
                  filtro === tipo
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40"
                )}
              >
                {tipo}
              </button>
            ))}
          </div>
        )}

        {/* Lista de talentos */}
<div className="flex flex-col gap-2 max-h-105 overflow-y-auto pr-1">
  {talentosFiltrados.map((talento) => {
    const selecionado = selecionados.includes(talento.nome)

    return (
      <button
        key={talento.nome}
        onClick={() => {
          toggle(talento.nome)
          toggleAccordion(talento.nome)
        }}
        className={cn(
          "text-left p-3 rounded-xl border-2 transition-all duration-200",
          selecionado
            ? "border-primary bg-primary/10 shadow-[0_0_12px_1px] shadow-primary/20"
            : "border-border bg-card hover:border-primary/40 cursor-pointer"
        )}
      >
        <div className="flex items-start justify-between gap-2">

          <div className="flex-1">
            <p className="font-semibold text-sm text-foreground">
              {talento.nome}
            </p>

            {talento.tipo && (
              <p className="text-[10px] text-primary font-medium uppercase tracking-wider mt-0.5">
                {talento.tipo}
              </p>
            )}

            {/* ACCORDION */}
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                aberto === talento.nome
                  ? "grid-rows-[1fr] opacity-100 mt-2"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="text-xs text-muted-foreground">
                  {talento.descricao}
                </p>

                {talento.prerequisito && (
                  <p className="text-xs text-amber-500 mt-2">
                    Pré-requisito: {talento.prerequisito}
                  </p>
                )}
              </div>
            </div>
          </div>

          {selecionado && (
            <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
          )}

        </div>
      </button>
    )
  })}
</div>
        {/* Rodapé */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-2 text-muted-foreground"
          >
            <ChevronLeft className="size-3.5" /> Voltar
          </Button>

          <Button
            onClick={() => onNext({ talentos: selecionados })}
            disabled={selecionados.length === 0}
            className="gap-2"
          >
            Próxima etapa <ChevronRight className="size-4" />
          </Button>
        </div>

      </div>
    </div>
  )
}
