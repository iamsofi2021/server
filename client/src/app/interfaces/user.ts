export interface User {
  _id: string;
  login: string;
  password: string;
  confirmPassword?: string;
  mail?: string;
  isAdmin?: boolean;
}
