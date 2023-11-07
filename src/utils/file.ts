import * as fs from 'fs';
import { encrypt } from '../helper/encryption';

export const uploadFileFromBase64 = (short_name : string, ext : string, data : string) : string =>{
    const newName = `${encrypt(short_name)}-${short_name}-${(new Date()).getTime()}.${ext.toLowerCase()}`;
    try{
        fs.writeFileSync(`uploads/${newName}`, Buffer.from(data, 'base64'));
    }catch(error){
        console.error(error);
        throw error;
    }

    return newName;
}