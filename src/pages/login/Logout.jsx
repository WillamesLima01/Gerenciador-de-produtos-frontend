import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('/users/logout')
            .then(() => {
                // Redirecionamento para a página de login após o logout bem-sucedido
                navigate('/login');
            })
            .catch(error => {
                console.error('Erro ao fazer logout', error);
                // Você pode querer redirecionar mesmo assim ou mostrar uma mensagem de erro
                navigate('/login');
            });
    }, [navigate]);

    // Não renderiza nada, pois este componente é apenas para realizar a ação de logout
    return null;
}

export default Logout;
