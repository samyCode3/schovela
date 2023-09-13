import { ROLE } from "./enum/enum";

export interface IElevate {
    id: number
  }

  export interface Ifilter 
  {
    role : string,
  }

export interface FilterUsersType{
  role?: ROLE,
  page?: number
}