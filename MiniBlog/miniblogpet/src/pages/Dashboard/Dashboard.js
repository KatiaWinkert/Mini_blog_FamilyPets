import style from './Dashboard.module.css'

import { Link } from 'react-router-dom'

//hooks
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

const Dashboard = () => {
  const { user } = useAuthValue()
  const uid = user.uid

  //post do usuario:
  const { documents: posts, loading } = useFetchDocuments('posts', null, uid)
  const deleteDocument = (id) => {}

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className={style.dashboard}>
      <h2> Dashboard</h2>
      <p>Gerencie os seus posts.</p>
      {posts && posts.length === 0 ? (
        <div className={style.noposts}>
          <p>Não foram encontrados posts.</p>
          <Link to="/posts/create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <>
          <div className={style.post_header}>
            <span>Titulo</span>
            <span>Ações</span>
          </div>

          {posts &&
            posts.map((post) => (
              <div className={style.post_row} key={post.id}>
                <p>{post.title}</p>
                <div>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="btn btn-outline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteDocument(post.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  )
}
export default Dashboard
