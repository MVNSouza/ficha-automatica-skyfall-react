// src/pages/NovaFichaPage.tsx
import { useState } from "react"
import { useNavigate } from "react-router"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db, auth } from "@/firebase"
import { CustomBreadcrumb } from "@/components/shared/CustomBreadcrumb"
import { AtributosStep } from "@/components/fichapage/atributo-step"
import { LegadoStep, type LegadoDados } from "@/components/fichapage/legado-step"
import { MaldicaoStep, type MaldicaoDados } from "@/components/fichapage/maldicao-step"
import { TalentosStep, type TalentosDados } from "@/components/fichapage/talentos-step"
import { AntecedenteStep, type AntecedenteDados } from "@/components/fichapage/antecedentes-step"
import { ClasseStep, type ClasseDados } from "@/components/fichapage/classe-step"

interface DadosFicha {
  atributos?: Record<string, number>
  legado?: string
  heranca?: string
  herancaMaior?: string
  herancasMenores?: string[]
  maldicao?: string
  talentos?: string[]
  antecedente?: string
  classe?: string
}

export default function NovaFichaPage() {
  const navigate  = useNavigate()
  const [step, setStep]         = useState(0)
  const [dados, setDados]       = useState<DadosFicha>({})
  const [salvando, setSalvando] = useState(false)

  const handleAtributos = (atributos: Record<string, number>) => {
    setDados((p) => ({ ...p, atributos }))
    setStep(1)
  }

  const handleLegado = (d: LegadoDados) => {
    setDados((p) => ({ ...p, ...d }))
    setStep(2)
  }

  const handleMaldicao = (d: MaldicaoDados) => {
    setDados((p) => ({ ...p, ...d }))
    setStep(3)
  }

  const handleTalentos = (d: TalentosDados) => {
    setDados((p) => ({ ...p, ...d }))
    setStep(4)
  }

  const handleAntecedente = (d: AntecedenteDados) => {
    setDados((p) => ({ ...p, ...d }))
    setStep(5)
  }

  const handleClasse = async (d: ClasseDados) => {
    const user = auth.currentUser
    if (!user) return

    setSalvando(true)
    try {
      const fichaFinal = { ...dados, ...d }

      const docRef = await addDoc(collection(db, "fichas"), {
        // Identidade (será preenchida depois ou no primeiro acesso à ficha)
        nome:           "",
        nomeJogador:    user.displayName ?? "",
        pronomes:       "",
        tamanho:        fichaFinal.legado ? "" : "Médio",

        // Progressão
        nivel:          1,
        classe:         fichaFinal.classe ?? "",
        legado:         fichaFinal.legado ?? "",
        trilha:         "",

        // Herança
        heranca:        fichaFinal.heranca ?? "",
        herancaMaior:   fichaFinal.herancaMaior ?? "",
        herancasMenores: fichaFinal.herancasMenores ?? [],

        // Maldição
        maldicao:       fichaFinal.maldicao ?? "",

        // Atributos
        atributos:      fichaFinal.atributos ?? {},

        // Talentos & Antecedente
        talentos:       fichaFinal.talentos ?? [],
        antecedente:    fichaFinal.antecedente ?? "",

        // Vínculo com o usuário
        userId:         user.uid,

        // Metadados
        criadaEm:       serverTimestamp(),
        atualizadaEm:   serverTimestamp(),
      })

      navigate(`/ficha/${docRef.id}`)
    } catch (err) {
      console.error("Erro ao salvar ficha:", err)
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex justify-center py-6 border-b border-border bg-card/50">
        <CustomBreadcrumb currentStep={step} />
      </div>

      <div className="container-main px-4 py-10 max-w-6xl mx-auto">
        {step === 0 && <AtributosStep   onNext={handleAtributos} />}
        {step === 1 && <LegadoStep      onNext={handleLegado}    onBack={() => setStep(0)} />}
        {step === 2 && <MaldicaoStep    onNext={handleMaldicao}  onBack={() => setStep(1)} />}
        {step === 3 && (
          <TalentosStep
            onNext={handleTalentos}
            onBack={() => setStep(2)}
            legado={dados.legado ?? ""}
            maldicao={dados.maldicao}
          />
        )}
        {step === 4 && <AntecedenteStep onNext={handleAntecedente} onBack={() => setStep(3)} />}
        {step === 5 && <ClasseStep      onSubmit={handleClasse}  onBack={() => setStep(4)} salvando={salvando} />}
      </div>
    </div>
  )
}
