// src/pages/DashboardPage.tsx
import { useNavigate } from "react-router"
import { useFichas } from "@/hooks/useFichas"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, ScrollText, Swords, Star, BookOpen } from "lucide-react"
import type { Ficha } from "@/types/ficha"

// ——— Card individual ———
function FichaCard({ ficha }: { ficha: Ficha }) {
  const navigate = useNavigate()

  return (
    <Card className="border-border flex flex-col justify-between hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-foreground leading-tight">
              {ficha.nome}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Jogador: {ficha.nomeJogador}
            </p>
          </div>
          {/* Nível em destaque */}
          <span className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">
            {ficha.nivel}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <InfoRow
          icon={<Swords className="size-3.5" />}
          label="Classe"
          value={ficha.classe}
        />
        <InfoRow
          icon={<Star className="size-3.5" />}
          label="Legado"
          value={ficha.legado}
        />
        <InfoRow
          icon={<BookOpen className="size-3.5" />}
          label="Trilha"
          value={ficha.trilha}
        />

        {/* Heranças menores como badges */}
        {ficha.herancasMenores.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {ficha.herancasMenores.map((h) => (
              <Badge key={h} variant="secondary" className="text-xs">
                {h}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t border-border pt-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => navigate(`/ficha/${ficha.id}`)}
        >
          <ScrollText className="size-4 mr-2" />
          Ver ficha completa
        </Button>
      </CardFooter>
    </Card>
  )
}

// Linha de info reutilizável dentro do card
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-muted-foreground w-14 shrink-0">{label}</span>
      <span className="font-medium text-foreground truncate">{value}</span>
    </div>
  )
}

// ——— Dashboard ———
export default function DashboardPage() {
  const navigate = useNavigate()
  const { fichas, loading } = useFichas()

  return (
    <div className="container-main py-20">
      <div className="flex w-200 items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Minhas Fichas</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {fichas.length} {fichas.length === 1 ? "personagem" : "personagens"}
          </p>
        </div>
        <Button onClick={() => navigate("/ficha/nova")}>
          <PlusIcon className="size-4 mr-2" />
          Nova ficha
        </Button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card
              key={i}
              className="h-52 animate-pulse bg-muted border-border"
            />
          ))}
        </div>
      )}

      {!loading && fichas.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <ScrollText className="size-12 text-muted-foreground" />
          <p className="text-muted-foreground">Nenhuma ficha criada ainda.</p>
          <Button onClick={() => navigate("/ficha/nova")}>
            <PlusIcon className="size-4 mr-2" />
            Criar primeira ficha
          </Button>
        </div>
      )}

      {!loading && fichas.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fichas.map((ficha) => (
            <FichaCard key={ficha.id} ficha={ficha} />
          ))}
        </div>
      )}
    </div>
  )
}
