export interface IRegister {
  name: string;
  email: string;
  password: string;
  avater?: string;
}

export interface ILogin {
  email: string;
  password: string;
}
