// src/types/navigation.ts
export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Main: undefined;
  Chat: ChatParamList;
};

export type AuthStackParamList = {
  Login: undefined;
  Splash: undefined;
  Register: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Chat: undefined;
  Notification: undefined;
  Profile: undefined;
};

export type ChatParamList = {
  Chat: undefined;
  Thread: undefined;
};
