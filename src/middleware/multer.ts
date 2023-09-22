import * as multer from 'multer'
import * as fs from 'fs'
const storageFolder = 'uploads'
if (!fs.existsSync(storageFolder)) {
    fs.mkdirSync(storageFolder);
  }
const storage = multer.diskStorage({
    destination : (req: any, file : any,cb: any) =>  {
         cb (null, storageFolder) 
    },
    filename : (req: any, file: any, cb: any) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
    
})

export const upload = multer({storage, 
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/gif" || file.mimetype == "image/jpeg" || file.mimetype == "image/pdf" || file.mimetype == "image/mp4") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg .pdf .mp4 format allowed!'));
        }
        if (file.size <= 50 * 1024 * 1024) {
            cb(null, true);
          } 
      }
})