import { db } from '../firebase/config'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  // cleanup
  //deal with memory leak
  const [cancelled, setCancelled] = useState(false)

  const auth = getAuth()

  function checkiFisCancelled() {
    if (cancelled) {
      return
    }
  }

  //Register :)
  const createUser = async (data) => {
    checkiFisCancelled()

    setLoading(true)
    setError(null)

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      await updateProfile(user, {
        displayName: data.displayName,
      })

      setLoading(false)

      return user
    } catch (error) {
      console.log(error.message)
      console.log(typeof error.message)

      let systemErroMessage

      if (error.message.includes('Password')) {
        systemErroMessage = 'A senha precisa conter no minimo 6 caracteres.'
      } else if (error.message.includes('email-already')) {
        systemErroMessage = 'E-mail já cadastrado!'
      } else {
        systemErroMessage = 'Ocorreu um erro, por favor tente mais tarde.'
      }
      setLoading(false)
      setError(systemErroMessage)
    }
  }

  //logout - sign out
  const logout = () => {
    checkiFisCancelled()
    signOut(auth)
  }

  // login - sign in
  const login = async (data) => {
    checkiFisCancelled()

    setLoading(true)
    setError(false)

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      setLoading(false)
    } catch (error) {
      let systemErroMessage //(user- not - found = usuario nao existe)

      if (error.message.includes('user-not-found')) {
        systemErroMessage = 'Usuario não encontrado.'
      } else if (error.message.includes('wrong-password')) {
        systemErroMessage = 'Senha incorreta!'
      } else {
        systemErroMessage = 'Ocorreu um erro, por favor tente mais tarde.'
      }
      setError(systemErroMessage)
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  }
}
