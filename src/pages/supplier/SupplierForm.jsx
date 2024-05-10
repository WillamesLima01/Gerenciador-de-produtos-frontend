import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../api'


const SupplierForm = () => {

    const[supplier, setSupplier] = useState({name: '', cnpj: '', email: ''})
    const[errorMessage, setErroMessage] = useState('')

    const navigate = useNavigate()    
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            axios.get(`/suppliers/${id}`)
            .then(Response => {
                setSupplier(Response.data)
            })
            .catch(error => {
                console.error('Erro ao buscar fornecedor', error)
                handleError(error)
            })
        } else {
            setSupplier({name: '', cnpj: '', email: ''})
        }
    }, [id])

    function handleChange(event) {
        const { name, value } = event.target
        setSupplier(prevState => ({ ...prevState, [name]: value }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        const method = id ? 'put' : 'post' 
        const url = id ? `/suppliers/${id}` : '/suppliers'

        axios[method](url, supplier)
        .then(() => {
            alert(`Fornecedor ${id ? 'atualizado' : 'adicionado'} com sucesso!`)
            navigate("/listar-fornecedores")
        })
        .catch(error => {
            console.error("Ocorreu um erro: ", error)  
            handleError(error)
        })
        
    }

    function handleError(error) {
        if(error.Response) {
            if(error.Response.status === 400) {
                if(Array.isArray(error.Response.data)) {
                    setErroMessage(error.Response.data.join(', '))
                } else {
                    setErroMessage(error.Response.data.message || 'Ocorreu um erro desconhecido')
                }
            }
        }
    }

  return (
    <div className='cobtainer mt-5'>
        <h2>{id ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}</h2>
        {errorMessage && (
            <div className="alert alert-danger" role="alert">
                {errorMessage}
            </div>
        )}

        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor='name'>Nome do fornecedor</label>
                <input type='text' className='form-control' id='name' name='name' value={supplier.name} onChange={handleChange} required />
            </div>
            <div className='form-group'>
                <label htmlFor='cnpj'>CNPJ do fornecedor</label>
                <input type='text' className='form-control' id='cnpj' name='cnpj' value={supplier.cnpj} onChange={handleChange} required />
            </div>
            <div className='form-group'>
                <label htmlFor='email'>E-mail do fornecedor</label>
                <input type='text' className='form-control' id='email' name='email' value={supplier.email} onChange={handleChange} required />
            </div>
            <button type='submit' className='btn btn-success'>{id ? 'Editar' : 'Adicionar'}</button>
        </form>

    </div>
  )
}

export default SupplierForm