import axios from './baseService';

class AuthService {
    login = async (phoneNumber: string) => {
        const response = await axios.post('/login', {phoneNumber});
    }

    verifyMagicCode = async (phoneNumber: string, magicCode: string) => {
        return await axios.post(`/verifyMagicCode`, {phoneNumber, magicCode});
    }
}

export default new AuthService();