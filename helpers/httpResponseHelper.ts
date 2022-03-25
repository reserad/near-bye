import { AxiosResponse } from "axios";

export const handleResponse = async (promise: Promise<AxiosResponse<any, any>>) => {
    console.log('here')
    try {
        const response = await promise;
        return {
            success: response.data
        }
    } catch (err: any) {
        if (err.response) {
            const response: AxiosResponse<any, any> = err.response;
            return {
                error: response.data.message
            }
        }
        return {
            error: 'Something went wrong'
        }
    }
}