export interface IUserInfo {
  department: string,
  level: string,
  account_type: string,
  faculty: string,
}

export interface IRegister {
  fullname : string,
  email : string
}

export interface IverifyUser {
   code: number,
   password: string
}

export interface ILogin {
  email : string,
  password: string
}