
export interface IUser {
  fullname: string,
  email : string,
  department : string,
  level : number,
  account_type : string,
  DOB: Date,
  faculty : string,
  status: boolean,
  data: any
}
export interface IUserInfo {
  department: string,
  level: string,
  account_type: string,
  DOB: string,
  faculty:  string

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

export interface IForgotten {
  email :  string
}

export interface IChangePassword {
  email : string,
  code: string,
  NewPassword: string
}

export interface IElevate {
  id: number
}
export enum ROLE {
   "USER",
   "ADMIN"
}