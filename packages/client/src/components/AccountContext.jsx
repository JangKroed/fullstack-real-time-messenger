import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AccountContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState({ loggedIn: null });
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:4000/auth/login', {
            credentials: 'include',
        })
            .catch((err) => {
                console.log(err);
                setUser({ loggedIn: false });
                return;
            })
            .then(async (r) => {
                if (!r || !r.ok || r.status >= 400) {
                    setUser({ loggedIn: false });
                    return;
                }

                return r.json();
            })
            .then((data) => {
                if (!data) {
                    console.log('not logged in');
                    setUser({ loggedIn: false });
                    return;
                }

                console.log(data);
                navigate('/home');
                setUser({ ...data });
            });
        // eslink-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AccountContext.Provider value={{ user, setUser }}>
            {children}
        </AccountContext.Provider>
    );
};

export default UserContext;
