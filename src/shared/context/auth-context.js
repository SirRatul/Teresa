import {createContext} from 'react';
import {Cookies} from 'react-cookie';

export const AuthContext = createContext({
    isLoggedIn: new Cookies().get('isLoggedIn') || false,
    userId: new Cookies().get('userId') || null,
    authMessage: null,
    token: new Cookies().get('token') || null
})