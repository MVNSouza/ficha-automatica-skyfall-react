// src/hooks/useUserProfile.ts
import { useState, useEffect } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { updateProfile, updateEmail, updatePassword } from "firebase/auth"
import { db, auth } from "@/firebase"

export function useUserProfile() {
  const user = auth.currentUser
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Lê o documento do Firestore
  useEffect(() => {
    if (!user) return
    getDoc(doc(db, "users", user.uid)).then((snap) => {
      if (snap.exists()) setProfile(snap.data())
      setLoading(false)
    })
  }, [user])

  // Atualiza nome e bio (Firestore + Auth)
  const updateBasicInfo = async (data: { name: string; bio: string }) => {
    if (!user) return
    await updateDoc(doc(db, "users", user.uid), {
      name: data.name,
      bio: data.bio,
    })
    await updateProfile(user, { displayName: data.name })
    setProfile((prev: any) => ({ ...prev, ...data }))
  }

  // Atualiza e-mail (Auth + Firestore)
  const changeEmail = async (newEmail: string) => {
    if (!user) return
    await updateEmail(user, newEmail)           // atualiza no Auth
    await updateDoc(doc(db, "users", user.uid), { email: newEmail }) // espelha no Firestore
  }

  // Atualiza senha (só no Auth — não armazene senha no Firestore!)
  const changePassword = async (newPassword: string) => {
    if (!user) return
    await updatePassword(user, newPassword)
  }

  return { profile, loading, updateBasicInfo, changeEmail, changePassword }
}
