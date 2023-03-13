/**
 * @api {post} /auth/login Login User
 * @apiName Login
 * @apiGroup Authorization
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {String} [username] User's email.
 * @apiParam {String} [password] User's password.
 *
 * @apiSuccess {Object} user User object
 * @apiSuccess {Number} users.user_id User ID
 * @apiSuccess {String} users.name User name
 * @apiSuccess {String} users.email User email
 * @apiSuccess {String} users.role User role (admin / user)
 * @apiSuccess {String} token Bearer token string
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       user: {
 *         "user_id": 1,
 *         "name": "John Doe",
 *         "email": "john@example.com",
 *         "role": "user",
 *     },
 *       token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *      }
 *
 * @apiError Message No users were updated.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Incorrect username or password"
 *     }
 *
 */
