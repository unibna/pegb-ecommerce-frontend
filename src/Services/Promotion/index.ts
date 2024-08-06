import axios from "axios";

import AuthService from "../Auth";


const PROMOTION_API_URL = process.env.REACT_APP_API_URL + '/promotions';


const list = async (): Promise<any> => {
    try {
        const headers = AuthService.getHeader();
        const response = await axios.get(
            PROMOTION_API_URL + '/',
            { headers: headers }
        )
        const data = await response.data;
        return data;
    } catch (error: any) {
        if (error.response) {
            const errors = error.response.data;
            const errorMessage = `${Object.keys(errors)[0]}: ${errors[Object.keys(errors)[0]]}`
            throw new Error(errorMessage);
        } else {
            throw error;
        }
    }
};


const create = async (
    payload: {
        username: string,
        email: string,
        password: string,
        password2: string,
        first_name: string,
        last_name: string
    }
): Promise<any> => {
    try {
        const response = await axios.post(
            PROMOTION_API_URL + '/register/',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        const data = await response.data;
        return data;
    } catch (error: any) {
        if (error.response) {
            const errors = error.response.data;
            const errorMessage = `${Object.keys(errors)[0]}: ${errors[Object.keys(errors)[0]]}`
            throw new Error(errorMessage);
        } else {
            throw error;
        }
    }
};


const ProductService = {
    list,
    create,
};

export default ProductService;
