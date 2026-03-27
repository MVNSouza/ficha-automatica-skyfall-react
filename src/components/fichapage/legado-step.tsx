import { useState, useEffect } from "react"
import legadosData from "@/assets/data/legados.json"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import BaseCard from "@/components/ui/base-card"

import { ChevronRight, ChevronLeft, Dna } from "lucide-react"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

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
  const [legadoKey, setLegadoKey] = useState<LegadoKey | "">("")
  const [herancaKey, setHerancaKey] = useState("")
  const [herancaMaior, setHerancaMaior] = useState("")
  const [herancasMenores, setHerancasMenores] = useState<string[]>([])

  const legadoAtual = legadoKey ? legados[legadoKey] : null

  useEffect(() => {
    setHerancaKey("")
    setHerancaMaior("")
    setHerancasMenores([])
  }, [legadoKey])

  const herancas = legadoAtual?.herancas ?? []

  // 🔥 HERANÇA SELECIONADA
  const herancaSelecionada = herancas.find(
    (h: any) => h.nome === herancaKey
  )

  const podeAvancar = legadoKey !== "" && herancaKey !== ""

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">

      {/* ESQUERDA */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
            <Dna className="size-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              Etapa 2 de 6
            </p>
            <h1 className="text-xl font-bold text-foreground">
              Legado
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            O <strong className="text-foreground">Legado</strong> representa a linhagem ancestral do seu personagem.
          </p>
          <p>
            Cada legado concede <strong className="text-foreground">habilidades base</strong> e
            um conjunto de <strong className="text-foreground">heranças</strong>.
          </p>
        </div>
      </div>

      {/* DIREITA */}
      <div className="flex flex-col gap-5">

        {/* SELECT */}
        <Select onValueChange={(v) => setLegadoKey(v as LegadoKey)} value={legadoKey}>
          <SelectTrigger className="w-full h-12 bg-card border border-border text-foreground">
            <SelectValue placeholder="Selecione um Legado" />
          </SelectTrigger>
          <SelectContent className="bg-card border border-border text-foreground">
            {Object.entries(legados).map(([key, legado]) => (
              <SelectItem key={key} value={key}>
                {(legado as any).nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* INFO LEGADO */}
        {legadoAtual && (
          <div className="p-4 rounded-xl bg-card border border-border">
            <h2 className="text-lg font-bold text-center">
              {(legadoAtual as any).nome}
            </h2>

            {(legadoAtual as any).subtitulo && (
              <p className="text-xs text-primary text-center mt-1">
                {(legadoAtual as any).subtitulo}
              </p>
            )}

            <p className="text-sm text-muted-foreground text-center mt-3">
              {(legadoAtual as any).descricao}
            </p>

            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { label: "Tamanho", value: (legadoAtual as any).atributos?.tamanho },
                { label: "Deslocamento", value: `${(legadoAtual as any).atributos?.deslocamento}m` },
                { label: "Longevidade", value: (legadoAtual as any).atributos?.idade },
              ].map(({ label, value }) => value && (
                <div key={label} className="bg-muted/40 rounded-lg px-2 py-2 text-center">
                  <p className="text-[10px] uppercase">{label}</p>
                  <p className="text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HABILIDADES BASE */}
        {legadoAtual && (legadoAtual as any).habilidadesBase?.length > 0 && (
          <BaseCard title="Habilidades Base">
            <div className="flex flex-col gap-2">
              {(legadoAtual as any).habilidadesBase.map((hab: any, i: number) => (
                <div key={i} className="p-3 rounded-lg border bg-background">
                  <p className="font-medium text-sm">{hab.nome}</p>
                  <ul className="text-xs mt-1 list-disc list-inside">
                    {hab.efeitos?.map((e: any, j: number) => (
                      <li key={j}>{e.tipo?.replace(/_/g, " ")}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </BaseCard>
        )}
{/* HERANÇAS */}
{legadoAtual && herancas.length > 0 && (
  <div className="flex flex-col gap-2">
    <p className="text-xs uppercase">
      Escolha uma Herança
    </p>

    <div className="flex flex-col gap-2">
      {herancas.map((heranca: any) => (
        <button
          key={heranca.nome}
          onClick={() => setHerancaKey(heranca.nome)}
          className={cn(
            "text-left p-3 rounded-xl border-2 transition-all",
            herancaKey === heranca.nome
              ? "border-primary bg-primary/10"
              : "border-border bg-card hover:border-primary/40"
          )}
        >
          <p className="font-semibold text-sm">
            {heranca.nome}
          </p>

          {"descricao" in heranca && heranca.descricao && (
            <p className="text-xs mt-1 text-muted-foreground">
              {heranca.descricao}
            </p>
          )}
        </button>
      ))}
    </div>

    {herancaSelecionada && (
      <Accordion type="single" collapsible className="mt-3">
        <AccordionItem value="detalhes" className="border rounded-xl bg-card">

          <AccordionTrigger className="px-4 py-3 text-sm font-semibold">
            Detalhes de {herancaSelecionada.nome}
          </AccordionTrigger>

          <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">

            {"passivos" in herancaSelecionada ? (
              <>
                {/* PASSIVOS */}
                {herancaSelecionada.passivos?.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold mb-2 uppercase">
                      Passivos
                    </p>

                    <div className="flex flex-col gap-2">
                      {herancaSelecionada.passivos.map((p: any, i: number) => (
                        <div key={i} className="bg-muted/40 rounded-lg p-2">

                          <p className="text-sm font-medium text-foreground">
                            {p.nome}
                          </p>

                          {p.efeitos?.length > 0 && (
                            <ul className="list-disc list-inside text-xs mt-1 space-y-1">
                              {p.efeitos.map((e: any, j: number) => (
                                <li key={j}>
                                  {e.tipo?.replace(/_/g, " ")}
                                </li>
                              ))}
                            </ul>
                          )}

                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MODIFICADORES */}
                {herancaSelecionada.modificadores?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold mb-2 uppercase">
                      Modificadores
                    </p>

                    <div className="flex flex-col gap-2">
                      {herancaSelecionada.modificadores.map((m: any, i: number) => (
                        <div key={i} className="bg-muted/40 rounded-lg p-2">

                          <p className="text-sm font-medium text-foreground">
                            {m.habilidade}
                          </p>

                          {m.efeitos?.length > 0 && (
                            <ul className="list-disc list-inside text-xs mt-1 space-y-1">
                              {m.efeitos.map((e: any, j: number) => (
                                <li key={j}>
                                  {e.tipo?.replace(/_/g, " ")}
                                </li>
                              ))}
                            </ul>
                          )}

                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-xs text-muted-foreground">
                Esta herança possui variações (maior/menor). Interface ainda não implementada.
              </div>
            )}

          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )}
  </div>
)}

        {/* RODAPÉ */}
        <div className="flex justify-between pt-2 border-t">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ChevronLeft className="size-3.5" /> Voltar
          </Button>

          <Button
            onClick={() =>
              onNext({
                legado: legadoKey,
                heranca: herancaKey,
                herancaMaior,
                herancasMenores
              })
            }
            disabled={!podeAvancar}
          >
            Próxima etapa <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
