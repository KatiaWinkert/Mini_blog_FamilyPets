//hooks
import { useState, useEffect, useReducer } from 'react'

//fireBase
import { db } from '../firebase/config'

//firebase store
import { collection, addDoc, Timestamp } from 'firebase/firestore'

//inicia sem loading e sem erro
const inicialState = {
  loading: null,
  error: null,
}

//Reduce SWITCH -----------------------------------------------
const insertReducer = (state, action) => {
  //cada estado de inserção do documento:
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
// INSERT DOC  recebe uma coleção --------------------
export const useInsertDocument = (docCollection) => {
  //reducer
  const [response, dispatch] = useReducer(insertReducer, inicialState)

  //deal with memory leak (para não ter vazamento de memoria)
  
  const [cancelled, setCancelled] = useState(false)
  // antes de fazer alguma ação valida se esta cancelada.

  const checkCancelBeforDispatch = (action) => {
    if (!cancelled) {
      //se precisar continuar com hook ou nao.
      dispatch(action)
    }
  }

  //INSERT DOC recebe um document ------------------------------------------------
  //Inserir o documento.
  const insertDocument = async (document) => {
    // Carregando o insert
    checkCancelBeforDispatch({
      type: 'LOADING',
    })

    try {
      //Cria o objeto e adiciona o campo de timestamp.
      const newDocument = { ...document, createdAt: Timestamp.now() }

      //Procura na coleção o documento que recebeu como argumento função
      const insertDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      )
      //Monta o metodo:
      checkCancelBeforDispatch({
        type: 'INSERTED_DOC',
        payload: insertDocument,
      })
    } catch (error) {
      //Dispara o erro caso aconteça:
      checkCancelBeforDispatch({
        type: 'ERROR',
        payload: error.message,
      })
    }
  }

  //Encerra o componente:
  // useEffect(() => {
  // return () => setCancelled(true)
  //}, [])

  //esporta a funão do hook e a resposta.
  return { insertDocument, response }
}
