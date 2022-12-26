import { Link } from 'react-router-dom'
import styles from './About.module.css'

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Blog <span>Familia Pet</span>
      </h2>
      <p>
        Este projeto consiste em um blog feito em React no front-end e Firebase
        no back-end.
      </p>
      <Link to="/posts/create" className="btn">
        Criar post
      </Link>
    </div>
  )
}

export default About
