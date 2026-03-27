import { useState } from "react"
import antecedentesData from "@/assets/data/antecedentes.json"
import { Button } from "@/components/ui/button"
import BaseCard from "@/components/ui/base-card"
import { ChevronRight, ChevronLeft, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

const antecedentes = antecedentesData.antecedentes
type AntecedenteKey = keyof typeof antecedentes

export interface AntecedenteDados {
  antecedente: string
}

interface Props {
  onNext: (dados: AntecedenteDados) => void
  onBack: () => void
}

export function AntecedenteStep({ onNext, onBack }: Props) {
  const [antecedenteKey, setAntecedenteKey] = useState<AntecedenteKey | "">("")

  const antecedenteAtual = antecedenteKey ? antecedentes[antecedenteKey] : null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">
      {/* Esquerda */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
            <BookOpen className="size-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              Etapa 5 de 6
            </p>
            <h1 className="text-xl font-bold text-foreground">Antecedente</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            O <strong className="text-foreground">Antecedente</strong>{" "}
            representa a vida do personagem antes de se tornar um aventureiro —
            sua profissão, origem social, os eventos que moldaram sua visão de
            mundo e os contatos que estabeleceu ao longo do caminho.
          </p>
          <p>
            Além de fornecer{" "}
            <strong className="text-foreground">
              proficiências e habilidades
            </strong>{" "}
            únicas, o antecedente é o principal elemento narrativo da ficha. Ele
            responde à pergunta:{" "}
            <em className="text-foreground">
              quem era seu personagem antes das aventuras?
            </em>
          </p>
          <p>
            Trabalhe com o Narrador para integrar seu antecedente à história do
            grupo e ao cenário. Os eventos, pessoas e lugares do antecedente
            podem surgir como ganchos narrativos durante a campanha.
          </p>
        </div>
      </div>

      {/* Direita */}
      <div className="flex flex-col gap-5">
        {/* Cards de seleção */}
        <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-1">
          {Object.entries(antecedentes).map(([key, ant]: [string, any]) => (
            <button
              key={key}
              onClick={() => setAntecedenteKey(key as AntecedenteKey)}
              className={cn(
                "text-left p-3 rounded-xl border-2 transition-all duration-200",
                antecedenteKey === key
                  ? "border-primary bg-primary/10 shadow-[0_0_12px_1px] shadow-primary/20"
                  : "border-border bg-card hover:border-primary/40 cursor-pointer",
              )}
            >
              <p className="font-semibold text-sm text-foreground">
                {ant.nome}
              </p>
              {ant.descricao && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {ant.descricao}
                </p>
              )}
            </button>
          ))}
        </div>

        {/* Detalhes */}
        {antecedenteAtual && (
          <BaseCard title="Características do Antecedente">
            <div className="flex flex-col gap-2">
              {(antecedenteAtual as any).habilidadesBase?.map(
                (hab: any, i: number) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border border-border bg-background"
                  >
                    <p className="font-medium text-sm text-foreground">
                      {hab.nome}
                    </p>
                    <ul className="text-xs text-muted-foreground mt-1 list-disc list-inside">
                      {hab.efeitos?.map((e: any, j: number) => (
                        <li key={j}>{e.tipo?.replace(/_/g, " ")}</li>
                      ))}
                    </ul>
                  </div>
                ),
              )}
            </div>
          </BaseCard>
        )}

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
            onClick={() => onNext({ antecedente: antecedenteKey })}
            disabled={antecedenteKey === ""}
            className="gap-2"
          >
            Próxima etapa <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
