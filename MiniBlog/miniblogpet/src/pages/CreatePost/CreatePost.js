import style from './CreatePost.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'

const CreatePost = () => {
  const [title, setTitle] = useState('') // para dados de titulo
  const [image, setImage] = useState('') // para os dados de imagem do post
  const [tags, setTags] = useState([]) // para dados de tag ([] = array pois guarda uma lista de tags)
  const [body, setBody] = useState('') // conteudo do post
  const [formError, setFormError] = useState('') // erros de formulario

  const handleSubmit = (e) => {
    e.preventDefault()
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
            name="title"
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
        <button className="btn">Cadastrar</button>
        
      </form>
    </div>
  )
}

export default CreatePost
