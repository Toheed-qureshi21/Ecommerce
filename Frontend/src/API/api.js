import axios from "axios";
import { authChecking, authFailure, authStart, authSuccess,authCheckingFailure,authCheckingSuccess, resetAuth } from "../redux/slices/auth.slice.js";
import { toast } from "react-toastify";
import { setError, setLoading, setProducts } from "../redux/slices/product.slice.js";


const URL = "http://localhost:3000/api" 

const api = axios.create({
    baseURL: URL,
    withCredentials:true
});

export const signup = async(dispatch,{name,email,password,confirmPassword,role}) => {
   

    dispatch(authStart());
    try {
        if (!name ||!email || !password || !confirmPassword) {
            return toast.error("All fields are required");
         }
    
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        const response = await api.post("/auth/signup", {name,email,password,role});
        console.log(response);
        dispatch(authSuccess(response?.data?.userWithoutPassword)) ;
     toast.success(response?.data?.message);
        
    } catch (error) {
        console.log(error);
        
        dispatch(authFailure(error?.response?.data?.message));
        
        return toast.error(error?.response?.data?.message);
    }
}

export const login = async (dispatch, {email, password}) => {
            dispatch(authStart());
            try {
                if (!email || !password) {
                   return toast.error("All fields are required");
                }
                

                const { data } = await api.post("/auth/login", { email, password });
                dispatch(authSuccess(data?.userWithoutPassword))
                console.log(data);
                return toast.success(data?.message);       
            } catch (error) {
                dispatch(authFailure(error?.response?.data?.message));
                return toast.error(error?.response?.data?.message);
            }
}

export const checkingUser = async (dispatch,showToast) => {
    dispatch(authStart());
    try {
        const response = await api.get("/auth/profile");
        dispatch(authSuccess(response?.data?.userWithoutPassword));
        showToast && toast.success(response?.data?.message);
    } catch (error) {
        dispatch(authFailure(error?.response?.data?.message));
        toast.error(error?.response?.data?.message);
    }
}

export const logout = async (dispatch) => {
                dispatch(authStart());
            try {
                const response = await api.get("/auth/logout");
               dispatch(resetAuth(null));
               return toast.success(response?.data?.message);
                
            } catch (error) {
                dispatch(authFailure(error?.response?.data?.message));
                if (showToast) {
                    toast.error(error?.response?.data?.message);
                }    
            }
}

// export const getRecommendedProducts = async(dispatch) => {
//             dispatch(setLoading())
//     try {
//     const response = await api.get("/products/recommendations");
//     dispatch(setProducts(response.data.products));
//     console.log(response.data.products);
    
//   } catch (error) {
//     dispatch(setError(error?.response?.data?.message))
//     return toast.error(error?.response?.data?.message);
//   }
// }
