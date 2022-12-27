import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { async } from '@firebase/util'

const initialState = {
  loading: null,
  error: null,
}

const insertReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null } // entra em estado de loading
    case 'INSERTED_DOC':
      return { loading: false, error: null } // sai de estado de loading
    case 'ERROR':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState)

  //deal with memory leak (para não ter vazamento de memoria)
  const [cancelled, setCancelled] = useState(false)

  const checkCancelBeforDispatch = (action) => {
    if (!cancelled) {
      dispatch(action)
    }
  }

  const insertDocument = async (document) => {
    checkCancelBeforDispatch({
      type: 'LOADING',
    })
    try {
      const newDocument = { ...document, createdAt: Timestamp.now() }

      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      )
      checkCancelBeforDispatch({
        type: 'INSERTED_DOC',
        payload: insertDocument,
      })
    } catch (error) {
      checkCancelBeforDispatch({
        type: 'ERROR',
        payload: error.message,
      })
    }
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return { insertDocument, response }
}
