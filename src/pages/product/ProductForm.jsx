import React from 'react'
import axios from '../../api'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProductForm = () => {

    const [product, setProduct] = useState({ name: '', price: '', supplierId: ''})
    const [suppliers, setSuppliers] = useState([])

    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        axios.get('/suppliers')
        .then(response => {
            setSuppliers(response.data)
        })
        .catch(error => {
            console.error('Erro ao buscar fornecedores', error)
            handleErrors(error)
        } )

        if (id) {
            axios.get(`/products/${id}`)
            .then(response => {
                setProduct(response.data)
            })
            .catch(error => {
                console.error('Erro ao buscar produto', error)
                handleErrors(error)
            })
        } else {
            setProduct({ name: '', price: '', supplierId: ''})
        }
    }, [id])

    function handleChange(event) {
        const { name, value } = event.target
        setProduct(prevState => ({ ...prevState, [name]: value }))
    }

    function handleSubmit(event) {
        event.preventDefault()

        const productToSend = {
            ...product,
            price:parseFloat(product.price.replace(/,/g, '.'))
        }

        const method = id ? 'put' : 'post'
        const url = id ? `/products/${id}` : '/products'

        axios[method](url, productToSend)
        .then(() => {
            alert(`Produto ${id ? 'atualizado' : 'adicionado'} com sucesso!`)
            navigate("/listar-produtos")
        })
        .catch(error => {
            console.error("Ocorreu um erro: ",error)
            handleErrors(error)
        })
    }

    function handleErrors(error) {
        if (error.response) {
            if (error.response.status === 400) {
                if (Array.isArray(error.response.data)) {
                    setErrorMessage(error.response.data.join(', '))
                } else {
                    setErrorMessage(error.response.data.message || 'Ocorreu um erro desconhecido')
                }
            }
        }
    }

  return (
    <div className="container mt-5">
        <h2>{id ? 'Editar Produto' : 'Adicionar Produto'}</h2>
        {errorMessage && (
            <div className="alert alert-danger" role="alert">
                {errorMessage}
            </div>
        )}
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Nome do Produto:</label>
                <input type="text" className="form-control" id="name" name="name" value={product.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="price">Preço do Produto</label>
                <input type="text" className="form-control" id="price" name="price" value={product.price} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="supplierId">Fornecedor</label>
                <select
                    className="form-control"
                    id="supplierId"
                    name="supplierId"
                    value={product.supplierId}
                    onChange={handleChange}
                    required
                    >

                    <option value="">Selecione um fornecedor</option>
                    {
                        suppliers.map(supplier => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </option>
                        ))
                    }
                    </select>
            </div>
            <button type="submit" className="btn btn-success">{id ? 'Atualizar' : 'Adicionar'}</button>
        </form>

    </div>
  )
}

export default ProductForm