import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const AccountContext = createContext();
const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const history = useNavigate();
    useEffect(() => {
        let account = localStorage.getItem("userInfo");
        const userInfo = JSON.parse(account);
        setAccount(userInfo);
        // if (!userInfo) history("/auth/login");
    }, []);
    return (
        <AccountContext.Provider
            value={{
                account,
                setAccount,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};
export const AccountState = () => {
    return useContext(AccountContext);
};

export default AccountProvider;