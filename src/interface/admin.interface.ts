import { ROLE } from "./user.interface"

export interface IElevate {
    id: number
  }

  export interface Ifilter 
  {
    role : string,
  }

export interface FilterUsersType{
  role?: ROLE
}