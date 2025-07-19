import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse, User } from "../types";
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

  export const login = async (data : LoginRequest) : Promise<LoginResponse> => {
    try{
      const response = await api.post<LoginResponse>('/auth/login' , data);
      
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      
      return response.data;
    } catch(error){
      throw new Error('로그인에 실패했습니다')

    }
  };


  export const signup = async (data: SignUpRequest) : Promise<SignUpResponse> =>{
    try{
      const response = await api.post<SignUpResponse>('/auth/signup', data);
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    }catch(error){
      throw new Error('회원가입에 실패했습니다')
    }

  }


  export const logout = async (): Promise<void> =>{
    try{
      await api.post('/auth/logout');

    }catch(error){

    }finally{
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    
    }
  }

  //현재 사용자 정보 가져오기 
  export const getCurrentUser = async (): Promise<User | null> =>{
    try{
      const userData = await AsyncStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    }catch(error){
      return null;
    }
  }


  // 토큰 가져오기 
  export const getToken = async () : Promise<string | null> =>{
    try{
    const userToken = await AsyncStorage.getItem('token');
    return userToken;}catch(error){
      return null;
    }
  }

  // 인증상태 확인
  export const checkAuthStatus = async (): Promise<boolean> => {
    try{
      const token = await AsyncStorage.getItem('token');
      return !!token;
    }catch(error){
      return false;
    }
  }