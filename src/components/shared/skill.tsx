import type { SkillCardProps } from "@/assets/data/types/SkillCardProps"
import { Card, CardContent, CardHeader } from "@/components/ui/card"


export function SkillCard({ icon }: SkillCardProps) {
  return (
    <Card className="w-90 bg-chart-5 text-white border-2 border-chart-2 rounded-md overflow-hidden">

      {/* Header */}
      <CardHeader className="flex items-center justify-between bg-primary/80 px-3 py-2 font-bold text-sm">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-sm">
              <img width={32} src={`/skillsIcons/${icon}.png`} alt={`${icon} skill modifier`} />
            </div>
            <span className="text-lg">COMBUSTÍVEL ARCANO</span>
          </div>
          <span className="text-lg">0 PE</span>
      </CardHeader>

      {/* Subheader */}
      <div className="bg-chart-3 text-sm font-bold p-3">
        AETHERÍDEO
      </div>

      {/* Conteúdo */}
      <CardContent className="space-y-3 text-sm leading-relaxed">

      {/*<div className="p-3 space-y-2">
        <div className="flex items-center gap-2">
          <BowArrow className="w-4 h-4" />
          <strong>Alcance:</strong>
          <span>Pessoal</span>
        </div>

        <div className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          <strong>Alvo:</strong>
          <span>Você</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <strong>Duração:</strong>
          <span>Instantânea</span>
        </div>
      </div>*/}

        <div className="bg-chart-3 p-3 rounded-sm text-center">
          <span>
            <h2 className="text-lg"><strong>Efeito</strong></h2>
            <p>
              Você perde 1d4 pontos de vida e ganha a mesma
              quantidade de pontos de ênfase temporários. A partir do 5º nível você
              joga 1d6 e a partir do 9º nível joga 1d8.
            </p>
          </span>
        </div>

        <div className="bg-chart-3 p-3 rounded-sm text-center">
          <span>
            <h2 className="text-lg"><strong>Especial</strong></h2>
            <p>
              Você só pode usar essa habilidade uma vez
              por descanso.
            </p>
          </span>
        </div>

      </CardContent>
    </Card>
  )
}
