import { useState, useEffect } from "react"
import legadosData from "@/assets/data/legados.json"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BaseCard from "@/components/ui/base-card"
import { ChevronRight, ChevronLeft, Dna } from "lucide-react"
import { cn } from "@/lib/utils"

const legados = legadosData.legados
type LegadoKey = keyof typeof legados

export interface LegadoDados {
  legado: string
  heranca: string
  herancaMaior: string
  herancasMenores: string[]
}

interface Props {
  onNext: (dados: LegadoDados) => void
  onBack: () => void
}

export function LegadoStep({ onNext, onBack }: Props) {
  const [legadoKey, setLegadoKey]       = useState<LegadoKey | "">("")
  const [herancaKey, setHerancaKey]     = useState("")
  const [herancaMaior, setHerancaMaior] = useState("")
  const [herancasMenores, setHerancasMenores] = useState<string[]>([])

  const legadoAtual = legadoKey ? legados[legadoKey] : null

  useEffect(() => {
    setHerancaKey("")
    setHerancaMaior("")
    setHerancasMenores([])
  }, [legadoKey])

  // const toggleHerancaMenor = (nome: string) => {
  //   setHerancasMenores((prev) =>
  //     prev.includes(nome) ? prev.filter((h) => h !== nome) : [...prev, nome]
  //   )
  // }

  const herancas = legadoAtual?.herancas ?? []
  // const herancasMaiores = herancas.filter((h: any) => h.tipo === "maior" || !h.tipo)
  // const herancasMenoresDisponiveis = herancas.filter((h: any) => h.tipo === "menor")

  const podeAvancar = legadoKey !== "" && herancaKey !== ""

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">

      {/* Esquerda */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
            <Dna className="size-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Etapa 2 de 6</p>
            <h1 className="text-xl font-bold text-foreground">Legado</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            O <strong className="text-foreground">Legado</strong> representa a linhagem ancestral do seu personagem —
            sua raça, origem biológica e os traços inatos herdados de seus antepassados. Ele define
            características físicas, habilidades naturais e o lugar do personagem no mundo de Skyfall.
          </p>
          <p>
            Cada legado concede <strong className="text-foreground">habilidades base</strong> automáticas e um
            conjunto de <strong className="text-foreground">heranças</strong> para escolha. A herança maior
            representa o dom mais expressivo da linhagem, enquanto as heranças menores são traços
            secundários que complementam o personagem.
          </p>
          <p>
            As características derivadas do legado — como tamanho, deslocamento e longevidade —
            também impactam diretamente as mecânicas do jogo.
          </p>
        </div>
      </div>

      {/* Direita */}
      <div className="flex flex-col gap-5">

        {/* Select legado */}
        <Select onValueChange={(v) => setLegadoKey(v as LegadoKey)} value={legadoKey}>
          <SelectTrigger className="w-full h-12 bg-card border border-border text-foreground">
            <SelectValue placeholder="Selecione um Legado" />
          </SelectTrigger>
          <SelectContent className="bg-card border border-border text-foreground">
            {Object.entries(legados).map(([key, legado]) => (
              <SelectItem key={key} value={key}>{(legado as any).nome}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Info do legado */}
        {legadoAtual && (
          <div className="p-4 rounded-xl bg-card border border-border">
            <h2 className="text-lg font-bold text-foreground text-center">{(legadoAtual as any).nome}</h2>
            {(legadoAtual as any).subtitulo && (
              <p className="text-xs text-primary font-medium text-center mt-0.5">{(legadoAtual as any).subtitulo}</p>
            )}
            <p className="text-sm text-muted-foreground text-center mt-3 leading-relaxed">
              {(legadoAtual as any).descricao}
            </p>

            {/* Atributos do legado */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { label: "Tamanho",       value: (legadoAtual as any).atributos?.tamanho },
                { label: "Deslocamento",  value: `${(legadoAtual as any).atributos?.deslocamento}m` },
                { label: "Longevidade",   value: (legadoAtual as any).atributos?.idade },
              ].map(({ label, value }) => value && (
                <div key={label} className="bg-muted/40 rounded-lg px-2 py-2 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Habilidades base */}
        {legadoAtual && (legadoAtual as any).habilidadesBase?.length > 0 && (
          <BaseCard title="Habilidades Base">
            <div className="flex flex-col gap-2">
              {(legadoAtual as any).habilidadesBase.map((hab: any, i: number) => (
                <div key={i} className="p-3 rounded-lg border border-border bg-background">
                  <p className="font-medium text-foreground text-sm">{hab.nome}</p>
                  <ul className="text-xs text-muted-foreground mt-1 list-disc list-inside">
                    {hab.efeitos?.map((e: any, j: number) => (
                      <li key={j}>{e.tipo?.replace(/_/g, " ")}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </BaseCard>
        )}

        {/* Seleção de herança */}
        {legadoAtual && herancas.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Escolha uma Herança
            </p>
            <div className="flex flex-col gap-2">
              {herancas.map((heranca: any) => (
                <button
                  key={heranca.nome}
                  onClick={() => setHerancaKey(heranca.nome)}
                  className={cn(
                    "text-left p-3 rounded-xl border-2 transition-all duration-200",
                    herancaKey === heranca.nome
                      ? "border-primary bg-primary/10 shadow-[0_0_12px_1px] shadow-primary/20"
                      : "border-border bg-card hover:border-primary/40 cursor-pointer"
                  )}
                >
                  <p className="font-semibold text-sm text-foreground">{heranca.nome}</p>
                  {heranca.descricao && (
                    <p className="text-xs text-muted-foreground mt-1">{heranca.descricao}</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Rodapé */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2 text-muted-foreground">
            <ChevronLeft className="size-3.5" /> Voltar
          </Button>
          <Button
            onClick={() => onNext({ legado: legadoKey, heranca: herancaKey, herancaMaior, herancasMenores })}
            disabled={!podeAvancar}
            className="gap-2"
          >
            Próxima etapa <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
