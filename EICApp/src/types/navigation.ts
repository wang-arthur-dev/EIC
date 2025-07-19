import { NavigatorScreenParams } from "@react-navigation/native";

//인증 스택 네비게이션 타입 
export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

//메인 스택 네비게이션 타입
export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

//루트 네비게이션 타입 
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
}