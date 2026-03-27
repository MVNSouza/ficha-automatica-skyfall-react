import { useState } from "react"
import maldicaoData from "@/assets/data/maldicoes.json"
import { Button } from "@/components/ui/button"
import BaseCard from "@/components/ui/base-card"
import { ChevronRight, ChevronLeft, Skull } from "lucide-react"
import { cn } from "@/lib/utils"

const maldicoes = maldicaoData.maldicao
type MaldicaoKey = keyof typeof maldicoes

export interface MaldicaoDados {
  maldicao: string
}

interface Props {
  onNext: (dados: MaldicaoDados) => void
  onBack: () => void
}

export function MaldicaoStep({ onNext, onBack }: Props) {
  const [maldicaoKey, setMaldicaoKey] = useState<MaldicaoKey | "">("")

  const maldicaoAtual = maldicaoKey ? maldicoes[maldicaoKey] : null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">

      {/* Esquerda */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
            <Skull className="size-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Etapa 3 de 6</p>
            <h1 className="text-xl font-bold text-foreground">Maldição</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            A <strong className="text-foreground">Maldição</strong> é uma condição sobrenatural que marca o personagem
            desde o nascimento ou por um evento traumático. Ela representa uma transformação profunda
            na natureza do ser, conferindo poderes sombrios em troca de vulnerabilidades e limitações.
          </p>
          <p>
            Cada maldição carrega <strong className="text-foreground">habilidades base</strong> ativas permanentemente
            e <strong className="text-foreground">habilidades ativas</strong> que podem ser acionadas gastando
            Pontos de Ênfase. A maldição não é uma escolha — é uma parte inseparável da identidade do personagem.
          </p>
          <p>
            Personagens amaldiçoados frequentemente são temidos, incompreendidos ou perseguidos pelo
            mundo. Essa condição deve estar refletida na história e no comportamento do personagem.
          </p>
        </div>
      </div>

      {/* Direita */}
      <div className="flex flex-col gap-5">

        {/* Cards de seleção visual */}
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(maldicoes).map(([key, maldicao]) => (
            <button
              key={key}
              onClick={() => setMaldicaoKey(key as MaldicaoKey)}
              className={cn(
                "text-left p-4 rounded-xl border-2 transition-all duration-200 flex flex-col gap-1",
                maldicaoKey === key
                  ? "border-primary bg-primary/10 shadow-[0_0_16px_2px] shadow-primary/20 scale-[1.02]"
                  : "border-border bg-card hover:border-primary/40 hover:scale-[1.01] cursor-pointer"
              )}
            >
              <p className="font-bold text-sm text-foreground">{maldicao.nome}</p>
              <p className="text-xs text-primary font-medium">{maldicao.subtitulo}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{maldicao.descricao}</p>
            </button>
          ))}
        </div>

        {/* Detalhes da maldição selecionada */}
        {maldicaoAtual && (
          <BaseCard title="Poderes da Maldição">
            <div className="flex flex-col gap-3">
              {/* Habilidades base */}
              {maldicaoAtual.habilidadesBase.map((hab, i) => (
                <div key={i} className="p-3 rounded-lg border border-border bg-background">
                  <p className="font-semibold text-sm text-foreground">{hab.nome}</p>
                  <ul className="text-xs text-muted-foreground mt-1 list-disc list-inside">
                    {hab.efeitos.map((e: any, j) => (
                      <li key={j}>{e.tipo?.replace(/_/g, " ")}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Habilidades ativas */}
              {maldicaoAtual.habilidades?.length > 0 && (
                <>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mt-1">
                    Habilidades Ativas
                  </p>
                  {maldicaoAtual.habilidades.map((hab: any, i: number) => (
                    <div key={i} className="p-3 rounded-lg border border-primary/30 bg-primary/5">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm text-foreground">{hab.nome}</p>
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {hab.custo} PE
                        </span>
                      </div>
                      {hab.efeitos?.map((e: any, j: number) => (
                        <p key={j} className="text-xs text-muted-foreground mt-1">
                          {e.tipo?.replace(/_/g, " ")}
                        </p>
                      ))}
                    </div>
                  ))}
                </>
              )}
            </div>
          </BaseCard>
        )}

        {/* Rodapé */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2 text-muted-foreground">
            <ChevronLeft className="size-3.5" /> Voltar
          </Button>
          <Button
            onClick={() => onNext({ maldicao: maldicaoKey })}
            disabled={maldicaoKey === ""}
            className="gap-2"
          >
            Próxima etapa <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
