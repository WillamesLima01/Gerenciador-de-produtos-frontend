import React, { useEffect, useState } from 'react'
import axios from '../../api'
import { useNavigate } from 'react-router-dom';

const SupplierList = () => {

    const[suppliers, setSuppliers] = useState([])
    const navigate = useNavigate()  

    useEffect(() => {
        axios.get('/suppliers')
        .then(Response => {
            setSuppliers(Response.data)
        })
        .catch(error => console.error("Ocorreu um erro: ", error))
    }, []);

    const fetchSuppliers = () => {        
        axios.get('/suppliers')
        .then(Response => {
            setSuppliers(Response.data)
        })
        .catch(error => console.error("Ocorreu um erro: ", error))            
    }

    function deleteSupplier(id){
        axios.delete(`/suppliers/${id}`)
        .then(() => {
            alert("Fornecedor excluído com sucesso!")
            fetchSuppliers()
        })
        .catch(error => console.error("Ocorreu um erro: ", error))
    }
    
    return(
        <div className='container mt-5'>
            <h2 className='mb-4'>Lista de Fornecedores</h2>
            <button onClick={() => navigate('/add-fornecedor')} className='btn btn-primary mb-2'>Adicionar Fornecedor</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CNPJ</th>
                        <th>Email</th>
                        <th>Acões</th>
                    </tr>                
                </thead>
                <tbody>
                    {
                        suppliers.map(supplier => (
                            <tr key={supplier.id}>
                                <td>{supplier.name}</td>
                                <td>{supplier.cnpj}</td>
                                <td>{supplier.email}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning mr-2" onClick={() => navigate(`/editar-fornecedor/${supplier.id}`)}>Editar</button>
                                    <button onClick={() => deleteSupplier(supplier.id)} className="btn btn-sm btn-danger">Excluir</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
          </table>
        </div>
    )
}

export default SupplierList