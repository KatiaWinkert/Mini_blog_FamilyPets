import styles from './Search.module.css'

//hook:
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

const Search = () => {
  const query = useQuery()
  const search = query.get('q')

  return (
    <div>
      <h2>Search</h2>
      <p>{Search}</p>
    </div>
  )
}

export default Search
