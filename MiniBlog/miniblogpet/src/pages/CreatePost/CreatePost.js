import style from './CreatePost.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocuments'

const CreatePost = () => {
  //Estrutura do post:
  const [title, setTitle] = useState('') // para dados de titulo
  const [image, setImage] = useState('') // para os dados de imagem do post
  const [tags, setTags] = useState([]) // para dados de tag ([] = array pois guarda uma lista de tags)
  const [body, setBody] = useState('') // conteudo do post
  const [formError, setFormError] = useState('') // erros de formulario

  // dados do usuario:
  const { user } = useAuthValue()

  //hook: que faz o insert: import da função e a response
  const { insertDocument, response } = useInsertDocument('posts')

  //submit ==========================================
  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    //validar image url
    try {
      new URL(image)
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.')
    }

    // criar arrya de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

    //checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError('Por favor, preencha todos os campos!')
    }

    if (formError) return

    //criar a estrutura, propriedades do documento e faz o insert.
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    })

    // redirect to home page
    //se der tudo certo vai para home :)
  }

  return (
    <div className={style.create_post}>
      <h2>Criar Post</h2>
      <p>
        Escreva sobre os seus pets e compartilhe curiosidades e coisas
        inusitadas.{' '}
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="text"
            required
            placeholder="Pense em um bom titulo..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira uma imagem que representa seu post."
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por virgulas "
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {/* Efeito enquanto aguarda a resposta do cadastro  */}
        {!response.loading && <button className="btn">Criar Post!</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde.. .
          </button>
        )}
        {/*valida o erro tanto na response quanto no form */}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost
