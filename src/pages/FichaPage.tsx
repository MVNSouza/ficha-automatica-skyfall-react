// src/pages/FichaPage.tsx
import { useEffect, useState } from "react"
import { SetNome } from "@/components/shared/SetNome"
import { useParams, useNavigate } from "react-router"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  ArrowLeft, Swords, Dna, Skull, Star, BookOpen,
  Shield, Brain, Wind, Heart, Eye, MessageCircle
} from "lucide-react"

const ATRIBUTO_META: Record<string, { label: string; icon: React.ReactNode }> = {
  FOR: { label: "Força",          icon: <Swords   className="size-4" /> },
  DES: { label: "Destreza",       icon: <Wind     className="size-4" /> },
  CON: { label: "Constituição",   icon: <Shield   className="size-4" /> },
  INT: { label: "Inteligência",   icon: <Brain    className="size-4" /> },
  SAB: { label: "Sabedoria",      icon: <Eye      className="size-4" /> },
  CAR: { label: "Carisma",        icon: <MessageCircle className="size-4" /> },
}

function AtributoCard({ atribKey, valor }: { atribKey: string; valor: number }) {
  const meta = ATRIBUTO_META[atribKey]
  const protecao = 10 + valor
  return (
    <div className="flex flex-col rounded-xl border-2 border-border overflow-hidden bg-card">
      <div className="bg-muted/60 px-3 py-2 text-center border-b border-border flex items-center justify-center gap-1.5">
        <span className="text-muted-foreground">{meta?.icon}</span>
        <span className="text-xs font-bold tracking-widest">{atribKey}</span>
      </div>
      <div className="flex items-center justify-center py-4">
        <span className={`text-2xl font-black ${valor > 0 ? "text-primary" : valor < 0 ? "text-destructive" : "text-foreground"}`}>
          {valor > 0 ? `+${valor}` : valor}
        </span>
      </div>
      <div className="border-t border-border bg-muted/30 px-3 py-2 text-center">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Proteção</p>
        <p className="text-sm font-bold">{protecao}</p>
      </div>
    </div>
  )
}

function InfoSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <Card className="border-border">
      <CardHeader className="pb-3 flex flex-row items-center gap-2">
        <span className="text-primary">{icon}</span>
        <h2 className="font-bold text-foreground">{title}</h2>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default function FichaPage() {
  const { id }    = useParams()
  const navigate  = useNavigate()
  const [ficha, setFicha]   = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    getDoc(doc(db, "fichas", id)).then((snap) => {
      if (snap.exists()) setFicha({ id: snap.id, ...snap.data() })
      else setNotFound(true)
      setLoading(false)
    })
  }, [id])

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <p className="text-muted-foreground animate-pulse">Carregando ficha...</p>
    </div>
  )

  if (notFound) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <p className="text-muted-foreground">Ficha não encontrada.</p>
      <Button onClick={() => navigate("/dashboard")}>Voltar ao Dashboard</Button>
    </div>
  )

  const atributos: Record<string, number> = ficha.atributos ?? {}

  return (
    <div className="container-main px-4 py-10 max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="size-5" />
          </Button>
          <div>
            <SetNome fichaId={ficha.id}
              nomeAtual={ficha.nome}
              onUpdate={(novoNome) =>
              setFicha((prev: any) => ({ ...prev, nome: novoNome })) }/>
            <p className="text-muted-foreground text-sm mt-1">
              Jogado por <strong>{ficha.nomeJogador}</strong>
              {ficha.pronomes && <span className="ml-2 text-xs">({ficha.pronomes})</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center size-14 rounded-full bg-primary/10 text-primary font-black text-xl shrink-0">
          {ficha.nivel}
        </div>
      </div>

      {/* Chips de identidade */}
      <div className="flex flex-wrap gap-2 mb-8">
        {ficha.classe     && <Badge variant="default">{ficha.classe}</Badge>}
        {ficha.legado     && <Badge variant="secondary">{ficha.legado}</Badge>}
        {ficha.maldicao   && <Badge variant="destructive">{ficha.maldicao}</Badge>}
        {ficha.antecedente && <Badge variant="outline">{ficha.antecedente}</Badge>}
        {ficha.tamanho    && <Badge variant="outline">{ficha.tamanho}</Badge>}
      </div>

      <div className="flex flex-col gap-6">

        {/* Atributos */}
        {Object.keys(atributos).length > 0 && (
          <InfoSection icon={<Swords className="size-4" />} title="Atributos">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {Object.entries(atributos).map(([key, valor]) => (
                <AtributoCard key={key} atribKey={key} valor={valor} />
              ))}
            </div>
          </InfoSection>
        )}

        {/* Legado & Herança */}
        {(ficha.legado || ficha.heranca) && (
          <InfoSection icon={<Dna className="size-4" />} title="Legado">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {ficha.legado && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Legado</p>
                  <p className="font-semibold text-foreground">{ficha.legado}</p>
                </div>
              )}
              {ficha.heranca && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Herança</p>
                  <p className="font-semibold text-foreground">{ficha.heranca}</p>
                </div>
              )}
              {ficha.herancaMaior && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Herança Maior</p>
                  <p className="font-semibold text-foreground">{ficha.herancaMaior}</p>
                </div>
              )}
            </div>
            {ficha.herancasMenores?.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Heranças Menores</p>
                <div className="flex flex-wrap gap-2">
                  {ficha.herancasMenores.map((h: string) => (
                    <Badge key={h} variant="secondary" className="text-xs">{h}</Badge>
                  ))}
                </div>
              </div>
            )}
          </InfoSection>
        )}

        {/* Maldição */}
        {ficha.maldicao && (
          <InfoSection icon={<Skull className="size-4" />} title="Maldição">
            <p className="font-semibold text-foreground">{ficha.maldicao}</p>
          </InfoSection>
        )}

        {/* Talentos */}
        {ficha.talentos?.length > 0 && (
          <InfoSection icon={<Star className="size-4" />} title="Talentos">
            <div className="flex flex-wrap gap-2">
              {ficha.talentos.map((t: string) => (
                <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
              ))}
            </div>
          </InfoSection>
        )}

        {/* Antecedente */}
        {ficha.antecedente && (
          <InfoSection icon={<BookOpen className="size-4" />} title="Antecedente">
            <p className="font-semibold text-foreground">{ficha.antecedente}</p>
          </InfoSection>
        )}

        {/* Classe */}
        {ficha.classe && (
          <InfoSection icon={<Heart className="size-4" />} title="Classe">
            <div className="flex items-center gap-4">
              <p className="font-semibold text-foreground text-lg">{ficha.classe}</p>
              {ficha.trilha && (
                <Badge variant="secondary">Trilha: {ficha.trilha}</Badge>
              )}
            </div>
          </InfoSection>
        )}
      </div>
    </div>
  )
}
