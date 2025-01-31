export interface AuthFormData {
    email: string;
    password: string;
  }
  
  // Типизация профиля пользователя
 export interface UserProfile {
    email: string;
    id: string;
    message?: string;
  }