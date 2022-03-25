import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config: AxiosRequestConfig = {
    baseURL: 'https://69a2d1e3ce3f.ngrok.io/api/',
};

type Headers = {
    common: any
}

const client: AxiosInstance = axios.create(config);
client.interceptors.request.use(async (config) => {
    let token = null;
    if (Platform.OS === 'web') {
        AsyncStorage.clear();
        token = await AsyncStorage.getItem('auth-token');
    } else {
        token = await SecureStore.getItemAsync("auth-token");
    }

    const auth = token != null ? `Bearer ${token}` : '';
    (config.headers as Headers).common.Authorization = auth;

    return config;
});

client.interceptors.response.use(async (response) => {
    let token = response.headers ? response.data['Authorization'] : null;
    if (token) {
        console.log(token);
        if (Platform.OS === 'web') {
            await AsyncStorage.setItem('auth-token', token);
        } else {
            await SecureStore.setItemAsync("auth-token", token);
        }
    }

    return response;
})

export default client;