import { addUser, deleteUser, getAllUsers, getUser, updateUser } from '../models/userModel';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../../classes/CustomError';
import bcrypt from 'bcryptjs';
import User from '../../interfaces/User';
const salt = bcrypt.genSaltSync(12);

const userListGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const userGet = async (req: Request<{ id: string }, {}, {}>, res: Response, next: NextFunction) => {
  try {
    const user = await getUser(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const userPost = async (req: Request<{}, {}, User>, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, salt);

    const data = [name, email, hash];

    const id = await addUser(data);
    res.json({
      message: 'user added',
      user_id: id,
    });
  } catch (error) {
    console.error('userPost', error);
    next(error);
  }
};

const userPut = async (req: Request<{ id: string }, {}, User>, res: Response, next: NextFunction) => {
  try {
    if ((req.user as User).role !== 'admin') {
      throw new CustomError('Admin only', 403);
    }
    const data = [req.body.name!, req.body.email!, req.body.password!, req.params.id];
    const result = await updateUser(data);
    if (result) {
      res.json({
        message: 'user modified',
      });
    }
  } catch (error) {
    next(error);
  }
};

const userPutCurrent = async (req: Request<{}, {}, User>, res: Response, next: NextFunction) => {
  try {
    const data = [req.body.name, req.body.email, req.body.password, (req.user as User).user_id];
    const result = await updateUser(data);
    if (result) {
      res.json({
        message: 'user modified',
      });
    }
  } catch (error) {
    next(error);
  }
};

const userDelete = async (req: Request<{ id: string }, {}, {}>, res: Response, next: NextFunction) => {
  try {
    if ((req.user as User).role !== 'admin') {
      throw new CustomError('Admin only', 403);
    }
    const result = await deleteUser(req.params.id);
    if (result) {
      res.json({
        message: 'user deleted',
      });
    }
  } catch (error) {
    next(error);
  }
};

const userDeleteCurrent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await deleteUser((req.user as User).user_id!);
    if (result) {
      res.json({
        message: 'user deleted',
      });
    }
  } catch (error) {
    next(error);
  }
};

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    next(new CustomError('token not valid', 403));
  } else {
    res.json(req.user);
  }
};

export { userListGet, userGet, userPost, userPut, userPutCurrent, userDelete, userDeleteCurrent, checkToken };
