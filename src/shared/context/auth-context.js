import { createContext } from "react";
import { Cookies } from "react-cookie";

export const AuthContext = createContext({
    isLoggedIn: new Cookies().get('isLoggedIn') || false,
    userId: new Cookies().get('userId') || null,
    authMessage: null,
    token: new Cookies().get('token') || null,
    phone: null,
    otp: null,
    medicineDetails: null,
    sellerName: null,
    sellerPhone: null,
    adminUserName: new Cookies().get('adminUserName') || null,
    isLoggedInAdmin: new Cookies().get('isLoggedInAdmin') || false,
    adminUserId: new Cookies().get('adminUserId') || null,
    adminToken: new Cookies().get('adminToken') || null
})
