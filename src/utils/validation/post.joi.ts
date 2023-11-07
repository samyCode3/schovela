import * as Joi from 'joi'
import {
  StatusCodes
} from 'http-status-codes'
import { createPost, editPost, hidePost } from '../../interface';
import { attachment_exts, levels } from '../../interface/enum/enum';

export const hidePostSchema = (body: any): Promise<hidePost> => {
  const schema = Joi.object({
    id: Joi.number().required()
  })
  const { error, value } = schema.validate(body, { abortEarly: false })
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
    faculty: Joi.string().optional(),
    dept: Joi.string().optional(),
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
    desc: Joi.string().required(),
    level: Joi.any().required().valid(...Object.values(levels)),
    faculty: Joi.string().required(),
    dept: Joi.string().required(),
    attachment: Joi.string().required().base64(),
    attachment_ext: Joi.any().required().valid(...Object.values(attachment_exts)),
  })
  const { error, value } = schema.validate(body, { abortEarly: false })
  if (error) {
    throw { ok: false, status: StatusCodes.BAD_REQUEST, message: error.message };
  }
  return value;
}
