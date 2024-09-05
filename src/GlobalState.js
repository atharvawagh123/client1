import { createContext, useEffect, useState } from "react";
import ProductAPI from "./api/ProductAPI";
import axios from "axios";
import UserAPI from "./api/UserAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);

    const refreshToken = async () => {
        try {
            const res = await axios.get('https://server1-yt76.onrender.com/user/refresh_token');
            setToken(res.data.accesstoken);
            // Optionally store token in localStorage for future use
            localStorage.setItem('token', res.data.accesstoken);
        } catch (err) {
            console.error("Failed to refresh token:", err);
            // Handle errors, e.g., by redirecting to login
        }
    };

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin) {
            refreshToken();
        }
    }, []);

    const state = {
        token: [token, setToken],
        productsAPI: ProductAPI(),
        userAPI: UserAPI(token),
    };

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
};
