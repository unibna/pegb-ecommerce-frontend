import axios from "axios";

import AuthService from "../Auth";


const PRODUCT_API_URL = process.env.REACT_APP_API_URL + '/products';


const list = async (): Promise<any> => {
    try {
        const headers = AuthService.getHeader();
        const response = await axios.get(
            PRODUCT_API_URL + '/',
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


const get = async (promotionId: string): Promise<any> => {
    try {
        const headers = AuthService.getHeader();
        const response = await axios.get(
            PRODUCT_API_URL + `/${promotionId}/`,
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
}


const create = async (payload: any): Promise<any> => {
    try {
        const headers = AuthService.getHeader();
        const response = await axios.post(
            PRODUCT_API_URL + '/',
            payload,
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


const update = async (id: string, payload: any): Promise<any> => {
    try {
        const headers = AuthService.getHeader();
        const response = await axios.put(
            PRODUCT_API_URL + `/${id}/`,
            payload,
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
}


const ProductService = {
    list,
    get,
    create,
    update,
};

export default ProductService;
