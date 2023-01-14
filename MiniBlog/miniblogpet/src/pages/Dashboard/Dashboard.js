import style from './Dashboard.module.css'

import { Link } from 'react-router-dom'

//hooks
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

const Dashboard = () => {
  const { user } = useAuthValue()
  const { uid } = user.uid

  //post do usuario:
  const { documents: posts } = useFetchDocuments('posts', null, uid)

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Gerencie seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={style.noposts}>
          <p>Não foram encontrados posts!</p>
          <Link to="/posts/create" className="btn">
            Criar o seu primeiro post.
          </Link>
        </div>
      ) : (
        <div>
          <p>Tem posts!</p>
        </div>
      )}
      {posts && posts.map((post) => <p key={post.id}>{post.title}</p>)}
    </div>
  )
}

export default Dashboard
