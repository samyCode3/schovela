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