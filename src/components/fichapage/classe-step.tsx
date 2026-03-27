import { useState } from "react"
import classesData from "@/assets/data/classes.json"
import { Button } from "@/components/ui/button"
import BaseCard from "@/components/ui/base-card"
import { ChevronLeft, Swords, CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const classes = classesData
type ClasseKey = keyof typeof classes

export interface ClasseDados {
  classe: string
}

interface Props {
  onSubmit: (dados: ClasseDados) => Promise<void>
  onBack: () => void
  salvando: boolean
}

export function ClasseStep({ onSubmit, onBack, salvando }: Props) {
  const [classeKey, setClasseKey] = useState<ClasseKey | "">("")

  const classeAtual = classeKey ? classes[classeKey] : null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">
      {/* Esquerda */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
            <Swords className="size-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              Etapa 6 de 6
            </p>
            <h1 className="text-xl font-bold text-foreground">Classe</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            A <strong className="text-foreground">Classe</strong> é o papel que
            o personagem desempenha nas aventuras — definindo suas técnicas de
            combate, habilidades especiais, progressão de poder e estilo de
            jogo. É a escolha mais impactante em termos mecânicos.
          </p>
          <p>
            Cada classe possui um{" "}
            <strong className="text-foreground">dado de vida</strong> que
            determina o potencial de resistência do personagem, além de{" "}
            <strong className="text-foreground">
              proficiências exclusivas
            </strong>{" "}
            em armas, armaduras e proteções.
          </p>
          <p>
            A partir do <strong className="text-foreground">2º nível</strong>,
            você escolherá uma{" "}
            <strong className="text-foreground">Trilha</strong> — uma
            especialização dentro da sua classe que define ainda mais o estilo e
            as capacidades do personagem.
          </p>
        </div>
      </div>

      {/* Direita */}
      <div className="flex flex-col gap-5">
        {/* Cards de classe */}
        <div className="grid grid-cols-1 gap-3">
          {Object.entries(classes).map(([key, classe]) => (
            <button
              key={key}
              onClick={() => setClasseKey(key as ClasseKey)}
              className={cn(
                "text-left p-4 rounded-xl border-2 transition-all duration-200",
                classeKey === key
                  ? "border-primary bg-primary/10 shadow-[0_0_16px_2px] shadow-primary/20"
                  : "border-border bg-card hover:border-primary/40 cursor-pointer",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-foreground">{classe.nome}</p>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs text-primary font-semibold">
                      {classe.dadoVida}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      PV: {classe.pv1Nivel}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {classe.descricao}
                  </p>
                </div>
                {classeKey === key && (
                  <CheckCircle2 className="size-5 text-primary shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Detalhes da classe */}
        {classeAtual && (
          <>
            <BaseCard title="Proficiências">
              <div className="text-xs text-muted-foreground space-y-1.5">
                <p>
                  <strong className="text-foreground">Armaduras:</strong>{" "}
                  {classeAtual.proficiências.armaduras.join(", ") || "Nenhuma"}
                </p>
                <p>
                  <strong className="text-foreground">Armas:</strong>{" "}
                  {classeAtual.proficiências.armas.join(", ")}
                </p>
                <p>
                  <strong className="text-foreground">Proteções:</strong>{" "}
                  {classeAtual.proficiências.proteções.join(", ")}
                </p>
                <p>
                  <strong className="text-foreground">Aptidões/Idiomas:</strong>{" "}
                  {classeAtual.proficiências.aptidõesIdiomas.join(", ")}
                </p>
              </div>
            </BaseCard>

            <BaseCard title="Progressão (Nível 1–3)">
              <div className="flex flex-col gap-2">
                {classeAtual.tabela.slice(0, 3).map((row, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-md border border-border bg-background text-xs"
                  >
                    <p className="font-semibold text-foreground">
                      Nível {row.nivel} — Bônus +{row.bonusProf}
                    </p>
                    <p className="text-muted-foreground">{row.habilidades}</p>
                  </div>
                ))}
              </div>
            </BaseCard>
          </>
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
            onClick={() => onSubmit({ classe: classeKey })}
            disabled={classeKey === "" || salvando}
            className="gap-2"
          >
            {salvando ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Salvando...
              </>
            ) : (
              <>
                <CheckCircle2 className="size-4" /> Criar Ficha
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
