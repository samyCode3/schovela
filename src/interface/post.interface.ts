export interface createPost {

   title: string;
   userId : string;
   description?: string;
   files: object;
   content : string;
   category: string;
   status: "Approved" | "Pending" | "Hidden" | "Live";
   id: number;
   binaryData: Buffer | null;
}