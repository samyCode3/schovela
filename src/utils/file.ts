import * as fs from 'fs';

export const uploadFileFromBase64 = (short_name : string, ext : string, data : string) : string =>{
    const newName = `${short_name}-${(new Date()).getTime()}.${ext.toLowerCase()}`;
    try{
        fs.writeFileSync(`uploads/${newName}`, Buffer.from(data, 'base64'));
    }catch(error){
        console.error(error);
        throw error;
    }

    return newName;
}

export const deleteUpload = (path : string) : void =>{
    try{
        fs.unlinkSync(`uploads/${path}`);
    }catch(error){
        console.error(error);
    }
}