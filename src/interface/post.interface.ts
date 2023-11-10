import { attachment_exts, levels } from "./enum/enum";

export interface createPost {
   title: string,
   desc: string,
   level : levels,
   faculty : string,
   dept : string,
   attachment : string,
   attachment_ext : attachment_exts
}

export interface editPost {
   id : number,
   title?: string,
   desc?: string,
   level?: levels,
   faculty?: string,
   dept?: string,
   attachment?: string,
   attachment_ext?: attachment_exts
}

export interface FilterPostInterface {
   level: levels,
   faculty: string,
   dept: string,
   live: boolean,
   limit : number,
   offset: number,
   search: string
}
export interface hidePost{
   id : number
}