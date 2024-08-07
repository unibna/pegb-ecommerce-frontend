import axios from "axios";

import AuthService from "../Auth";


const MEMBERSHIP_API_URL = process.env.REACT_APP_API_URL + '/memberships';


const list = async (): Promise<any> => {
    try {
        const headers = AuthService.getHeader();
        const response = await axios.get(
            MEMBERSHIP_API_URL + '/',
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


const get = async (membershipId: string): Promise<any> => {
    try {
        const headers = AuthService.getHeader();
        const response = await axios.get(
            MEMBERSHIP_API_URL + `/${membershipId}/`,
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
            MEMBERSHIP_API_URL + '/',
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
            MEMBERSHIP_API_URL + `/${id}/`,
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


const MembershipService = {
    list,
    get,
    create,
    update,
};

export default MembershipService;
