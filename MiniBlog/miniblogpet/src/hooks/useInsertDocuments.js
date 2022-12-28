//hooks
import { useState, useEffect, useReducer } from 'react'

//fireBase
import { db } from '../../src/firebase/config'

//firebase store
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const inicialState = {
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
  const [response, dispatch] = useReducer(insertReducer, inicialState)

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

      const insertDocument = await addDoc(
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

 // useEffect(() => {
   // return () => setCancelled(true)
  //}, [])

  return { insertDocument, response }
}
