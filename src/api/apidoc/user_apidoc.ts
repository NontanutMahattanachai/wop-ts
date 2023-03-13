/**
 * @api {get} /user Get all users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {Object[]} users Array of user objects
 * @apiSuccess {Number} users.user_id User ID
 * @apiSuccess {String} users.name User name
 * @apiSuccess {String} users.email User email
 * @apiSuccess {String} users.role User role (admin / user)
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "user_id": 1,
 *         "name": "John Doe",
 *         "email": "john@doe.com",
 *         "role": "admin"
 *       },
 *       {
 *         "user_id": 2,
 *         "name": "Jane Doe",
 *         "email": "jane@doe.com",
 *         "role": "user"
 *       }
 *     ]
 *
 * @apiError {string} message No users found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "No users found"
 *     }
 */

/**
 * @api {get} /user Get current user
 * @apiName Current User
 * @apiGroup User
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {Number} users.user_id User ID
 * @apiSuccess {String} users.name User name
 * @apiSuccess {String} users.email User email
 * @apiSuccess {String} users.role User role (admin / user)
 *
 * @apiSuccessExample {json} Success response:
 *     {
 *         "user_id": 1,
 *         "name": "John Doe",
 *         "email": "john@doe.com",
 *         "role": "user"
 *     }
 *
 * @apiError {string} message Token not valid
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Token not valid"
 *     }
 *
 */

/**
 * @api {get} /user/:id Get single user
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {Number} users.user_id User ID
 * @apiSuccess {String} users.name User name
 * @apiSuccess {String} users.email User email
 * @apiSuccess {String} users.role User role (admin / user)
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "user_id": 1,
 *          "name": "John Doe",
 *          "email": "john@example.com",
 *          "role": "admin"
 *     }
 *
 * @apiError Message The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User Not Found"
 *     }
 *
 */

/**
 * @api {put} /user/:id Update User
 * @apiName UpdateUser
 * @apiGroup User
 *
 * @apiPermission Admin
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {String} id User's unique identifier.
 * @apiBody {String} [name] User's name.
 * @apiBody {String} [email] User's email.
 * @apiBody {String} [password] User's password.
 *
 * @apiSuccess {String} message User modified.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User modified"
 *     }
 *
 * @apiError Message No users were updated.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "No users updated"
 *     }
 *
 */

/**
 * @api {put} /user Update Current User
 * @apiName UpdateCurrentUser
 * @apiGroup User
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiBody {String} [name] User's name.
 * @apiBody {String} [email] User's email.
 * @apiBody {String} [password] User's password.
 *
 * @apiSuccess {String} message User modified.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User modified"
 *     }
 *
 * @apiError Message No users were updated.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "No users updated"
 *     }
 *
 */

/**
 * @api {delete} /user/:id Delete User
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiPermission Admin
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {String} id User's unique identifier.
 *
 * @apiSuccess {String} message User deleted.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User deleted"
 *     }
 *
 * @apiError Message No users were deleted.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "No users deleted"
 *     }
 *
 */

/**
 * @api {delete} /user Delete Current User
 * @apiName DeleteCurrentUser
 * @apiGroup User
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {String} message User deleted.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User deleted"
 *     }
 *
 * @apiError Message No users were deleted.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "No users deleted"
 *     }
 *
 */

/**
 * @api {post} /user Register User
 * @apiName RegisterUser
 * @apiGroup User
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiBody {String} name User's name.
 * @apiBody {String} email User's email.
 * @apiBody {String} password User's password.
 *
 * @apiSuccess {Object} response Success response
 * @apiSuccess {String} response.message Message.
 * @apiSuccess {Number} response.user_id Id of the new user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User added",
 *       "user_id": 1
 *     }
 *
 * @apiError Message No users were added.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "No users added"
 *     }
 *
 */
