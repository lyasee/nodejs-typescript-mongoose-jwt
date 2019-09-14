export interface IUser {
  id?: number;
  name?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  avatar?: string;
  date?: Date;
}
