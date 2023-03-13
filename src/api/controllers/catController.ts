import {
  addCat,
  deleteCat,
  getAllCats,
  getCat,
  updateCat,
  getCatByUser,
} from '../models/catModel';
import { Request, Response, NextFunction } from 'express';
import Cat from '../../interfaces/Cat';
import User from '../../interfaces/User';
import CustomError from '../../classes/CustomError';
import { validationResult } from 'express-validator';

const catListGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cats = await getAllCats();
    res.json(cats);
  } catch (error) {
    next(error);
  }
};

const catGet = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');
    console.log('cat_post validation', messages);
    next(new CustomError(messages, 400));
    return;
  }

  try {
    const cat = await getCat(req.params.id);
    res.json(cat);
  } catch (error) {
    next(error);
  }
};

const catPost = async (
  req: Request<{}, {}, Cat>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages: string = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');
      console.log('cat_post validation', messages);
      next(new CustomError(messages, 400));
      return;
    }

    if (!req.file) {
      const err = new CustomError('file not valid', 400);
      throw err;
    }

    const { name, weight, birthdate } = req.body;

    const data = [
      name,
      weight,
      (req.user as User).user_id,
      req.file.filename,
      birthdate,
      res.locals.coords,
    ];

    const id = await addCat(data);
    res.json({
      message: 'cat added',
      cat_id: id,
    });
  } catch (error) {
    console.error('catPost', error);
    next(error);
  }
};

const catPut = async (
  req: Request<{ id: string }, {}, Cat>,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');
    console.log('cat_post validation', messages);
    next(new CustomError(messages, 400));
    return;
  }

  try {
    const { name, weight, owner, birthdate } = req.body;
    const data = [
      name,
      weight,
      birthdate,
      owner,
      req.params.id,
      (req.user as User).user_id,
    ];
    const result = await updateCat(data, (req.user as User).role);
    if (result) {
      res.json({
        message: 'cat modified',
      });
    }
  } catch (error) {
    next(error);
  }
};

const catDelete = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');
    console.log('cat_post validation', messages);
    next(new CustomError(messages, 400));
    return;
  }

  try {
    const result = await deleteCat(req.params.id);
    if (result) {
      res.json({
        message: 'cat deleted',
      });
    }
  } catch (error) {
    next(error);
  }
};

const catGetByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');
    console.log('cat_post validation', messages);
    next(new CustomError(messages, 400));
    return;
  }

  try {
    const userId = (req.user as User).user_id;
    const cat = await getCatByUser(userId);
    res.json(cat);
  } catch (error) {
    next(error);
  }
};

export { catListGet, catGet, catPost, catPut, catDelete, catGetByUser };
