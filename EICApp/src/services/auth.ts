import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const API_BASE_URL = 'https://your-api-server.com/api';

//axios 인스턴스 생성
const api = axios.create(
  {
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type' : 'application/json',
    },
  });

  //토큰을 헤더에 추가하는 인터셉터

  api.interceptors.request.use(
    async(config) =>{
      const token = await AsyncStorage.getItem('token');
      if(token){
        config.headers.Authorization = `Bearer ${token}`;

      }
      return config;

    },
    (error)=>{
      return Promise.reject(error);
    }
  );