// import app from '../src/app';
const app = 'http://localhost:3000';
import {
  deleteUser,
  getApiRoot,
  getCurrentUser,
  getSingleUser,
  getUser,
  postAuthLogin,
  postAuthLoginError,
  postUser,
  putUser,
} from './testFunctions';
import User from '../src/interfaces/User';

describe('GET /api/v1', () => {
  it('responds with a json message', async () => {
    await getApiRoot(app);
  });

  let token: string = '';
  it('should create a new user', async () => {
    await postUser(app);
  });

  it('should return a user object and bearer token on valid credentials', async () => {
    const user = await postAuthLogin(app);
    token = user.token;
  });

  it('should update user', async () => {
    await putUser(app, token);
  });

  it('should return current user', async () => {
    await getCurrentUser(app, token);
  });

  let userId = '';
  it('should return array of users', async () => {
    const users: User[] = await getUser(app);
    userId = users[0].user_id!;
  });

  it('should return single user', async () => {
    await getSingleUser(app, userId);
  });

  it('should delete current user', async () => {
    await deleteUser(app, token);
  });
});
// test errors
describe('API errors', () => {
  it('should return error message on invalid credentials', async () => {
    await postAuthLoginError(app);
  });
});
