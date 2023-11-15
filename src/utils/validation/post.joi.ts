import * as Joi from 'joi'
import {
  StatusCodes
} from 'http-status-codes'
import { createPost, editPost, hidePost } from '../../interface';
import { attachment_exts, levels } from '../../interface/enum/enum';
import { FilterPostInterface } from '../../interface/post.interface';
import { FieldOfStudy, fieldsOfStudy } from '../../interface/faculty';

const validFaculties = Object.values(FieldOfStudy);
const validDaparment =  fieldsOfStudy
const facultySchema = Joi.string().valid(...validFaculties).optional()
export const hidePostSchema = (body: any): Promise<hidePost> => {
  const schema = Joi.object({
    id: Joi.number().required()
  })
  const { error, value } = schema.validate(body, { abortEarly: true })
  if (error) {
    throw { ok: false, status: StatusCodes.BAD_REQUEST, message: error.message };
  }
  return value;
}

export const editPostSchema = (body: any): Promise<editPost> => {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().optional(),
    desc: Joi.string().optional(),
    level: Joi.any().optional().valid(...Object.values(levels)),
    faculty: facultySchema,
    dept: Joi.string().when('faculty', { 
      is: Joi.valid(...validFaculties),
      then: Joi.valid(...validDaparment[body.faculty])
    }),
    attachment: Joi.string().optional().base64(),
    attachment_ext: Joi.any().optional().valid(...Object.values(attachment_exts)),
  })
  const { error, value } = schema.validate(body, { abortEarly: false })
  if (error) {
    throw { ok: false, status: StatusCodes.BAD_REQUEST, message: error.message };
  }

  if (value.attachment && !value.attachment_ext) {
    throw { ok: false, status: StatusCodes.BAD_REQUEST, message: "Extension required if attachment is passed." };
  }

  return value;
}

export const createPostSchema = (body: any): Promise<createPost> => {

  const schema = Joi.object({
    title: Joi.string().required(), 
    desc: Joi.string().optional(),
    level: Joi.any().optional().valid(...Object.values(levels)), // Replace 'level1' and 'level2' with your actual level values
    faculty: Joi.string().valid(...validFaculties).optional().allow(""),
    dept: Joi.when('faculty', { 
      is: Joi.valid(...validFaculties),
      then: Joi.valid(...validDaparment[body.faculty] || []) 
    }).optional(),
    attachment: Joi.string().required().base64(),
    attachment_ext: Joi.any().required().valid(...Object.values(attachment_exts)),// Replace 'ext1' and 'ext2' with your actual extension values
  });
  const { error, value } = schema.validate(body, { abortEarly: true })
  if (error) { 
    throw { ok: false, status: StatusCodes.BAD_REQUEST, message: error.message };
  }
  return value;
}

export const filterPostValidation = async (body : FilterPostInterface): Promise<FilterPostInterface> => {
  const schema = Joi.object({
    level: Joi.any().valid(...Object.values(levels)),
    faculty: Joi.string(),
    dept: Joi.string(),
    live: Joi.boolean().default(true),
    limit : Joi.number().default(20),
    offset : Joi.number(),
    search : Joi.string()
  })
  const { error, value } = schema.validate(body, { abortEarly: true })
  if (error) {
    throw { ok: false, status: StatusCodes.BAD_REQUEST, message: error.message };
  }
  return value;
}