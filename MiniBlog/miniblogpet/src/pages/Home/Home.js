//Css:
import styles from './Home.module.css'

//hooks:
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

//componentes :
import PostDetail from '../../components/PostDetail'

const Home = () => {
  const [query, setQuery] = useState('')
  const { documents: posts, loading } = useFetchDocuments('posts')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (query) {
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
      <h1>Veja nosso posts mais recentes.</h1>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ou busque pelas tags.."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Buscar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  )
}

export default Home
