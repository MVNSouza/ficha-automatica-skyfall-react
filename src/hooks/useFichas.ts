import { useEffect, useState } from "react"
import {
  collection, query, where,
  onSnapshot, addDoc, serverTimestamp
} from "firebase/firestore"
import { db, auth } from "@/firebase"
import type { Ficha, NovaFicha } from "@/types/ficha"

export function useFichas() {
  const user = auth.currentUser
  const [fichas, setFichas]   = useState<Ficha[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, "fichas"),
      where("userId", "==", user.uid)
    )

    // onSnapshot mantém a lista sincronizada em tempo real
    const unsub = onSnapshot(q, (snap) => {
      setFichas(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Ficha)))
      setLoading(false)
    })

    return unsub
  }, [user])

  const criarFicha = async (dados: NovaFicha) => {
    await addDoc(collection(db, "fichas"), {
      ...dados,
      criadaEm:     serverTimestamp(),
      atualizadaEm: serverTimestamp(),
    })
  }

  return { fichas, loading, criarFicha }
}
