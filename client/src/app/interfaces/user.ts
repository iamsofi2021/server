export interface User {
  login: string;
  password: string;
  confirmPassword?: string;
  mail?: string;
  isAdmin?: boolean;
}
