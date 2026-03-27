import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

function HeroSection() {
  return (
    <section className="bg-card relative" id="hero-section">
      <img
        src="\img\skyfall-livro.png"
        alt="Capa Livro SkyFall"
        className="h-75 absolute left-0 top-1/2 -translate-y-1/2"
      />
      {/* <img
        src="src\assets\img\skyfall-livro-2.png"
        alt=""
        className="mr-5 h-80 absolute right-0 top-1/2 -translate-y-1/2 "
      /> */}
      <div className="container-main flex flex-col py-20 items-center text-center justify-center">
        <h1 className="mt-6 text-6xl text-balance font-bold text-foreground tracking-tighter">
          Crie fichas com <span className="text-primary">pouco esforço</span> e
          da forma mais rápida possível
        </h1>
        <p className="pt-2 text-balance w-2xl text-3xl text-muted-foreground tracking-tight">
          Monte seu personagem em poucos minutos e já se prepare para jogar com
          seus amigos.
        </p>

        <Button className="mt-10" size={"lg"} asChild>
          <Link to="/register" className="flex gap-2 items-center w-60 h-12">
            <span className="uppercase tracking-wider">Começar agora</span>
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  )
}

export default HeroSection
