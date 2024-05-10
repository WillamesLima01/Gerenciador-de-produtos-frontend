import React from 'react'
import axios from '../../api';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const CostumerForm = () => {

    const [costumer, setCostumer] = useState({ name: '', cpf: '', email: '', zipcode: '', street: '', number: '', neighborhood: '', city: '', state: '', country: '' })
    const [errorMessage, setErrorMessage] = useState('');    
    const navigate = useNavigate()
    const { id } = useParams()
    const [cepLoading, setCepLoading] = useState(false)

    useEffect(() => {
        if (id) {
            axios.get(`/costumers/${id}`)
            .then(response => {
                setCostumer(response.data)
            })
            .catch(error => {
              console.error('Erro ao buscar cliente', error)
              handleErrors(error);
            })
        } else {
            setCostumer({ name: '', cpf: '', email: '', zipcode: '', street: '', number: '', neighborhood: '', city: '', state: '', country: '' })
        }
    }, [id])

    function handleChange(event) {
        const { name, value } = event.target
        setCostumer(prevState => ({ ...prevState, [name]: value }))
    }

    function handleSubmit(event) {
      event.preventDefault()
  
      // Construindo o payload conforme a nova estrutura esperada pelo backend
      const payload = {
          name: costumer.name,
          cpf: costumer.cpf,
          email: costumer.email,
          costumerAddressRequest: {
              street: costumer.street,
              number: costumer.number,
              neighborhood: costumer.neighborhood,
              city: costumer.city,
              state: costumer.state,
              country: costumer.country,
              zipCode: costumer.zipcode // Nota: Ajuste o nome do campo se necessário
          }
      };
  
      const method = id ? 'put' : 'post';
      const url = id ? `/costumers/${id}` : '/costumers';
  
      axios[method](url, payload)
          .then(() => {
              alert(`Cliente ${id ? 'atualizado' : 'adicionado'} com sucesso!`);
              navigate("/listar-clientes");
          })
          .catch(error => {
              console.error("Ocorreu um erro: ", error);
              handleErrors(error);
          });
  }
  

    function handleCepBlur(event) {
      //Vai consultar a API dos correios
      const cep = event.target.value.replace(/\D/g, '')
      if (cep.length !== 8) {
        alert("CEP tem que ter 8 digitos")
        return
      }

      setCepLoading(true)

      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        if (response.data.erro) {
          alert("CEP não encontrado")
          setCepLoading(false)
          return
        }

        setCostumer(prevState => ({
          ...prevState,
          street: response.data.logradouro,
          neighborhood: response.data.bairro,
          city: response.data.localidade,
          state: response.data.uf,
          country: 'Brasil'
        }))

        setCepLoading(false)

      })
      .catch(error => {
        console.error("Erro ao buscar o CEP: ", error)
        setCepLoading(false)
      })

    }

    function handleErrors(error) {
      if (error.response) {
          if (error.response.status === 400) {
              if (Array.isArray(error.response.data)) {
                  setErrorMessage(error.response.data.join(', '));
              } else {
                  setErrorMessage(error.response.data.message || 'Ocorreu um erro desconhecido');
              }
          }
      }
  }


  return (
    <div className="container mt-5">
         <h2>{id ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
         {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome do Cliente</label>
          <input type="text" className="form-control" id="name" name="name" value={costumer.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF do cliente</label>
          <input type="text" className="form-control" id="cpf" name="cpf" value={costumer.cpf} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email do cliente</label>
          <input type="text" className="form-control" id="email" name="email" value={costumer.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="zipcode">CEP</label>
          <input type="text" className="form-control" id="zipcode" name="zipcode" value={costumer.zipcode} onChange={handleChange} onBlur={handleCepBlur} required />
          {cepLoading && <p>Buscando CEP...</p>}
        </div>
        <div className="form-group">
          <label htmlFor="street">Rua/logradouro</label>
          <input type="text" className="form-control" id="street" name="street" value={costumer.street} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="number">Número</label>
          <input type="text" className="form-control" id="number" name="number" value={costumer.number} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="neighborhood">Bairro</label>
          <input type="text" className="form-control" id="neighborhood" name="neighborhood" value={costumer.neighborhood} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="city">Cidade</label>
          <input type="text" className="form-control" id="city" name="city" value={costumer.city} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="state">Estado</label>
          <input type="text" className="form-control" id="state" name="state" value={costumer.state} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="number">País</label>
          <input type="text" className="form-control" id="country" name="country" value={costumer.country} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">{id ? 'Atualizar' : 'Adicionar'}</button>
      </form>
    </div>
  )
}

export default CostumerForm