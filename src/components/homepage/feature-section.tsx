import { Card, CardContent } from "@/components/ui/card"
import { Cloud, ShieldCheck, Zap } from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "Dados sempre corretos",
    description:
      "Garanta informações confiáveis com validação automática de campos. Evite erros, inconsistências e retrabalho desde o primeiro preenchimento.",
  },
  {
    icon: Cloud,
    title: "Acesso de qualquer lugar",
    description:
      "Todas as fichas ficam salvas com segurança na nuvem, permitindo acesso rápido e organizado sempre que você precisar — no desktop ou mobile.",
  },
  {
    icon: Zap,
    title: "Mais rapidez e produtividade",
    description:
      "Preencha fichas em segundos com uma experiência otimizada, integração com outros sistemas e dados prontos para uso imediato.",
  },
]
function FeatureSection() {
  return (
    <section id="feature-section bg-background">
      <div className="container-main py-20 flex flex-col">
        <div className="items-center justify-center text-center">
          <p className="text-primary text-sm uppercase tracking-wide">
            Por que utilizar
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            Uma nova forma de criar suas fichas
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-12">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-200"
            >
              <CardContent className="flex flex-col px-6">
                <div className="flex items-center justify-center size-10 bg-primary/10 rounded-lg">
                  <feature.icon className="size-5 text-primary" />
                </div>
                <h3 className="text-lg mt-4 font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground text-sm text-balance leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
