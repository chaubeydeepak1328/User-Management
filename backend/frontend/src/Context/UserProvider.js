import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    return (
        <UserContext.Provider value={{ users, setUsers }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserState = () => {
    return useContext(UserContext);
};

export default UserProvider;
