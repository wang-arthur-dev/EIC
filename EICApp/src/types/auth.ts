//사용자 정보타입 
export interface User {
  id: string;
  email : string;
  name : string;
  createdAt : string;
  updatedAt: string;
}

//로그인 요청 타입
export interface LoginRequest{
  email : string;
  password: string;
}

//로그인 응답 타입
export interface LoginResponse{
  token : string;
  user : User;
}

//회원가입 요청 타입
export interface SignUpRequest{
  email: string;
  password: string;
  name : string ; 
}

//회원가입 응탑 타입
export interface SignUpResponse{
  token: string;
  user: User;
}

//인증삭태 타입 
export interface AuthState{
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

export interface ApiResponse<T>{
  success:boolean;
  data? : T;
  message?: string;
  error?: string;
}
