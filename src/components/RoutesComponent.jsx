import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SupplierList from '../pages/supplier/SupplierList';
import SupplierForm from '../pages/supplier/SupplierForm';
import ProductList from '../pages/product/ProductList';
import ProductForm from '../pages/product/ProductForm';
import CostumerForm from '../pages/costumer/CostumerForm';
import CostumerList from '../pages/costumer/CostumerList';
import Login from '../pages/login/Login';
import Logout from '../pages/login/Logout';
import PrivateRoute from './PrivateRoute';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute element={SupplierList} />} />
      <Route path="/add-fornecedor" element={<PrivateRoute element={SupplierForm} />} />
      <Route path="/listar-fornecedores" element={<PrivateRoute element={SupplierList} />} />
      <Route path="/editar-fornecedor/:id" element={<PrivateRoute element={SupplierForm} />} />
      <Route path="/listar-produtos" element={<PrivateRoute element={ProductList} />} />
      <Route path="/add-produto" element={<PrivateRoute element={ProductForm} />} />
      <Route path="/editar-produto/:id" element={<PrivateRoute element={ProductForm} />} />
      <Route path="/add-cliente" element={<PrivateRoute element={CostumerForm} />} />
      <Route path="/listar-clientes" element={<PrivateRoute element={CostumerList} />} />
      <Route path="/logout" element={<PrivateRoute element={Logout} />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RoutesComponent;