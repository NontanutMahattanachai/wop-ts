import request from 'supertest';
import expect from 'expect';
import User from '../src/interfaces/User';
import ErrorResponse from '../src/interfaces/ErrorResponse';

interface UserWithToken {
  user: User;
  token: string;
}

const getApiRoot = (url: string | Function) => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1')
      .expect(200, { message: 'routes: auth, user, cat' }, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.body);
        }
      });
  });
};

const getUser = (url: string | Function): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/user')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const users: User[] = response.body;
          users.forEach((user) => {
            expect(user).toHaveProperty('user_id');
            expect(user).toHaveProperty('name');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('role');
          });
          resolve(users);
        }
      });
  });
};

const getSingleUser = (url: string | Function, id: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/user/' + id)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const user = response.body;
          expect(user).toHaveProperty('user_id');
          expect(user).toHaveProperty('name');
          expect(user).toHaveProperty('email');
          expect(user).toHaveProperty('role');
          resolve(response.body);
        }
      });
  });
};

const postUser = (url: string | Function) => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/user/')
      .set('Content-type', 'application/json')
      .send({
        name: 'Test User ' + new Date().toLocaleDateString('fi-FI'),
        email: 'test@user.fi',
        password: 'asdfQEWR1234',
      })
      .expect('Content-Type', /json/)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          expect(response.body).toHaveProperty('message');
          expect(response.body).toHaveProperty('user_id');
          resolve(response.body);
        }
      });
  });
};

const putUser = (url: string | Function, token: string) => {
  return new Promise((resolve, reject) => {
    request(url)
      .put('/api/v1/user/')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: 'Test User ' + new Date().toISOString(),
      })
      .expect('Content-Type', /json/)
      .expect(200, { message: 'user modified' }, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.body);
        }
      });
  });
};

const getCurrentUser = (
  url: string | Function,
  token: string,
): Promise<User> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/user/token')
      .set('Authorization', 'Bearer ' + token)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const user = response.body;
          expect(user).toHaveProperty('user_id');
          expect(user).toHaveProperty('name');
          expect(user).toHaveProperty('email');
          expect(user).toHaveProperty('role');
          resolve(response.body);
        }
      });
  });
};

const postAuthLogin = (url: string | Function): Promise<UserWithToken> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/auth/login')
      .send({
        username: 'test@user.fi',
        password: 'asdfQEWR1234',
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          expect(response.body).toHaveProperty('user');
          expect(response.body).toHaveProperty('token');
          const user: User = response.body.user;
          expect(user).toHaveProperty('name');
          expect(user).toHaveProperty('email');
          expect(user).toHaveProperty('role');
          expect(user).toHaveProperty('user_id');
          resolve(response.body);
        }
      });
  });
};

const postAuthLoginError = (url: string | Function): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/auth/login')
      .send({
        username: 'wrong@example.com',
        password: 'wrongpassword',
      })
      .expect(401, (err, response) => {
        if (err) {
          reject(err);
        } else {
          expect(response.body).toHaveProperty('message');
          expect(response.body).toHaveProperty('stack');
          resolve(response.body);
        }
      });
  });
};

const deleteUser = (
  url: string | Function,
  token: string,
): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete('/api/v1/user')
      .set('Authorization', 'Bearer ' + token)
      .expect(200, { message: 'user deleted' }, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.body);
        }
      });
  });
};

export {
  getApiRoot,
  getUser,
  getSingleUser,
  getCurrentUser,
  postUser,
  putUser,
  postAuthLogin,
  postAuthLoginError,
  deleteUser,
};
