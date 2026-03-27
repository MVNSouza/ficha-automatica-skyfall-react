// src/types/ficha.ts

export type Tamanho  = "Pequeno" | "Médio" | "Grande"
export type Pronomes = "ele/dele" | "ela/dela" | "elu/delu" | string

export interface Ficha {
  id?: string
  userId: string

  // Identidade
  nome: string
  nomeJogador: string
  pronomes: Pronomes
  tamanho: Tamanho

  // Progressão
  nivel: number
  classe: string
  legado: string
  trilha: string

  // Herança
  heranca: string
  herancaMaior: string
  herancasMenores: string[]

  // Maldição
  maldicao: string

  // Metadados
  criadaEm: Date | null
  atualizadaEm: Date | null
}

export type NovaFicha = Omit<Ficha, "id" | "criadaEm" | "atualizadaEm">
