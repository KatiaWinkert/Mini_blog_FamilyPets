import styles from './Register.module.css'
import { useState, useEffect } from 'react'

const Register = () => {
  return (
    <div>
      <h1>Cadastre-se para postar!</h1>
      <p>Crie seu usuário e compartilhe as histórias do seu pet</p>
      <form>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do usuário."
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Email do usuário."
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Inserira a sua senha."
          />
        </label>
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassaword"
            required
            placeholder="Confirme a sua senha."
          />
        </label>
        <button className="btn">Cadastrar</button>
      </form>
    </div>
  )
}

export default Register
