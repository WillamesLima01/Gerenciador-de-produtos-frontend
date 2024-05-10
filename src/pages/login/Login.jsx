import React, { useState } from 'react';
import axios from '../../api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('/users/login', { email, password })
          localStorage.setItem('token', response.data.token) // Supondo que o token vem assim
          navigate('/listar-fornecedores') // Redireciona para a página de fornecedores
        } catch (error) {
          console.error('Login falhou:', error)
          alert('Falha no login!')
        }
      };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">Entrar</button>
      </form>
    </div>
  )
}

export default Login