import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountState } from '../context/Account';

const Logout = () => {
    const { setAccount } = AccountState();
    const navigate = useNavigate();
    useEffect(() => {
        setAccount(null);
        localStorage.removeItem("userInfo");
        navigate(`${process.env.PUBLIC_URL}/auth/login`);
    }, [])
    return (
        <div></div>
    )
}

export default Logout