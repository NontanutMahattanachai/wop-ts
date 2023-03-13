import promisePool from '../../database/db';
import CustomError from '../../classes/CustomError';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import Cat from '../../interfaces/Cat';

// custom interface for selecting cats
interface CatSelect extends RowDataPacket, Cat {}

const getAllCats = async (): Promise<CatSelect[]> => {
  const [rows] = await promisePool.execute<CatSelect[]>(
    `
    SELECT cat_id,wop_cat.name, weight, owner, filename, birthdate, coords, wop_user.name as ownername 
	  FROM wop_cat 
	  JOIN wop_user 
    ON wop_cat.owner = wop_user.user_id
    `,
  );
  if (rows.length === 0) {
    throw new CustomError('No cats found', 404);
  }
  return rows;
};

const getCat = async (catId: string): Promise<CatSelect> => {
  const [rows] = await promisePool.execute<CatSelect[]>(
    `
    SELECT cat_id,wop_cat.name, weight, owner, filename, birthdate, coords, wop_user.name as ownername 
	  FROM wop_cat 
	  JOIN wop_user 
    ON wop_cat.owner = wop_user.user_id
	  WHERE cat_id = ?;
    `,
    [catId],
  );
  if (rows.length === 0) {
    throw new CustomError('No cats found', 404);
  }
  return rows[0];
};

const addCat = async (data: string[]): Promise<number> => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    `
    INSERT INTO wop_cat (name, weight, owner, filename, birthdate, coords) 
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    data,
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('No cats added', 400);
  }
  console.log(headers.info);
  return headers.insertId;
};

const updateCat = async (data: string[], role: string): Promise<boolean> => {
  const dataWithNull = data.map((value) =>
    value === undefined ? null : value,
  );

  console.log(data, dataWithNull);
  let sql = '';
  if (role === 'admin') {
    sql =
      'UPDATE wop_cat SET name = COALESCE(?, name), weight = COALESCE(?, weight), birthdate = COALESCE(?, birthdate), owner = COALESCE(?, owner) WHERE cat_id = ?;';
    // remove user_id
    dataWithNull.pop();
  } else {
    // remove owner
    dataWithNull.splice(3, 1);
    sql =
      'UPDATE wop_cat SET name = COALESCE(?, name), weight = COALESCE(?, weight), birthdate = COALESCE(?, birthdate) WHERE cat_id = ? AND owner = ?;';
  }

  const [headers] = await promisePool.execute<ResultSetHeader>(
    sql,
    dataWithNull,
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('No cats updated', 400);
  }
  return true;
};

const deleteCat = async (catId: string): Promise<boolean> => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    `
    DELETE FROM wop_cat 
    WHERE cat_id = ?;
    `,
    [catId],
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('No cats deleted', 400);
  }
  return true;
};

const getCatByUser = async (userId: string): Promise<CatSelect> => {
  const [rows] = await promisePool.execute<CatSelect[]>(
    `
    SELECT 
	  cat_id, 
	  wop_cat.name, 
	  weight, 
	  owner, 
	  filename,
	  birthdate, 
	  coords,
	  wop_user.name as ownername 
	  FROM wop_cat 
	  JOIN wop_user ON 
	  wop_cat.owner = wop_user.user_id
	  WHERE owner = ?;
    `,
    [userId],
  );
  if (rows.length === 0) {
    throw new CustomError('No cats found', 404);
  }
  return rows[0];
};

export { getAllCats, getCat, addCat, updateCat, deleteCat, getCatByUser };
