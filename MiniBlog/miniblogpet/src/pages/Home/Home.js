import styles from './Home.module.css'

//hooks
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

const Home = () => {
  const [query, setQuery] = useState('')
  const [posts] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
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
        <h1>Posts....</h1>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrado posts</p>
            <Link to="/posts/create" className="btn">
              Criar o primeiro post!
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
