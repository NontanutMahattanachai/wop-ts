import promisePool from '../../database/db';
import CustomError from '../../classes/CustomError';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import User from '../../interfaces/User';

// custom interface for selecting users
interface UserSelect extends RowDataPacket, User {}

const getAllUsers = async (): Promise<UserSelect[]> => {
  const [rows] = await promisePool.execute<UserSelect[]>(
    `
    SELECT user_id, name, email, role 
    FROM wop_user
    `,
  );
  if (rows.length === 0) {
    throw new CustomError('No users found', 404);
  }
  return rows;
};

const getUser = async (userId: string): Promise<UserSelect> => {
  const [rows] = await promisePool.execute<UserSelect[]>(
    `
    SELECT user_id, name, email, role 
    FROM wop_user 
    WHERE user_id = ?;
    `,
    [userId],
  );
  if (rows.length === 0) {
    throw new CustomError('No users found', 404);
  }
  return rows[0];
};

const addUser = async (data: string[]): Promise<number> => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    `
    INSERT INTO wop_user (name, email, password) 
    VALUES (?, ?, ?);
    `,
    data,
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('No users added', 400);
  }
  console.log(headers.info);
  return headers.insertId;
};

const updateUser = async (data: string[]): Promise<boolean> => {
  const dataWithNull = data.map((value) => (value === undefined ? null : value));
  const [headers] = await promisePool.execute<ResultSetHeader>(
    `
    UPDATE wop_user set name = COALESCE(?, name), email = COALESCE(?, email), password = COALESCE(?, password) 
    WHERE user_id = ?;
    `,
    dataWithNull,
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('No users updated', 400);
  }
  return true;
};

const deleteUser = async (userId: string): Promise<boolean> => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    `
    DELETE FROM wop_user 
    WHERE user_id = ?;
    `,
    [userId],
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('No users deleted', 400);
  }
  return true;
};

const getUserLogin = async (email: string): Promise<UserSelect> => {
  const [rows] = await promisePool.execute<UserSelect[]>(
    `
    SELECT * FROM wop_user 
    WHERE email = ?;
    `,
    [email],
  );
  if (rows.length === 0) {
    throw new CustomError('No user found', 404);
  }
  return rows[0];
};

export { getAllUsers, getUser, addUser, updateUser, deleteUser, getUserLogin };
