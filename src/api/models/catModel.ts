import {promisePool} from '../../database/db';
import CustomError from '../../classes/CustomError';
import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {Cat, GetCat, PostCat, PutCat} from '../../interfaces/Cat';

const getAllCats = async (): Promise<Cat[]> => {
  const [rows] = await promisePool.execute<GetCat[]>(
    `
    SELECT cat_id, cat_name, weight, filename, birthdate, ST_X(coords) as lat, ST_Y(coords) as lng,
    JSON_OBJECT('user_id', sssf_user.user_id, 'user_name', sssf_user.user_name) AS owner 
	  FROM sssf_cat 
	  JOIN sssf_user 
    ON sssf_cat.owner = sssf_user.user_id
    `
  );
  if (rows.length === 0) {
    throw new CustomError('No cats found', 404);
  }
  const cats: Cat[] = rows.map((row) => ({
    ...row,
    owner: JSON.parse(row.owner.toString() || '{}'),
  }));

  return cats;
};

const getCat = async (catId: string): Promise<Cat> => {
  const [rows] = await promisePool.execute<GetCat[]>(
    `
    SELECT cat_id, cat_name, weight, owner, filename, birthdate, ST_X(coords) as lat, ST_Y(coords) as lng, user_name 
	  FROM sssf_cat 
	  JOIN sssf_user 
    ON sssf_cat.owner = sssf_user.user_id
	  WHERE cat_id = ?;
    `,
    [catId]
  );
  if (rows.length === 0) {
    throw new CustomError('No cats found', 404);
  }
  return rows[0];
};

const addCat = async (data: PostCat): Promise<number> => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    `
    INSERT INTO sssf_cat (cat_name, weight, owner, filename, birthdate, coords) 
    VALUES (?, ?, ?, ?, ?, POINT(?, ?))
    `,
    [
      data.cat_name,
      data.weight,
      data.owner,
      data.filename,
      data.birthdate,
      data.lat,
      data.lng,
    ]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('No cats added', 400);
  }
  console.log(headers.info);
  return headers.insertId;
};

const updateCat = async (
  data: PutCat,
  id: number,
  owner: number,
  role: string
): Promise<boolean> => {
  let sql = '';
  if (role === 'admin') {
    sql = promisePool.format('UPDATE sssf_cat SET ? WHERE cat_id = ?;', [
      data,
      id,
    ]);
  } else {
    sql = promisePool.format(
      'UPDATE sssf_cat SET ? WHERE cat_id = ? AND owner = ?;',
      [data, id, owner]
    );
  }

  const [headers] = await promisePool.execute<ResultSetHeader>(sql);
  if (headers.affectedRows === 0) {
    throw new CustomError('No cats updated', 400);
  }
  return true;
};

const deleteCat = async (catId: number): Promise<boolean> => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    `
    DELETE FROM sssf_cat 
    WHERE cat_id = ?;
    `,
    [catId]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('No cats deleted', 400);
  }
  return true;
};

const getCatsByUser = async (userId: number): Promise<Cat> => {
  const [rows] = await promisePool.execute<GetCat[]>(
    `
    SELECT 
	  cat_id, 
	  sssf_cat.name, 
	  weight, 
	  owner, 
	  filename,
	  birthdate, 
	  coords,
	  sssf_user.name as ownername 
	  FROM sssf_cat 
	  JOIN sssf_user ON 
	  sssf_cat.owner = sssf_user.user_id
	  WHERE owner = ?;
    `,
    [userId]
  );
  if (rows.length === 0) {
    throw new CustomError('No cats found', 404);
  }
  return rows[0];
};

export {getAllCats, getCat, addCat, updateCat, deleteCat, getCatsByUser};
