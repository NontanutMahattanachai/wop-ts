/**
 * @api {get} /cat Get all cats
 * @apiName GetCats
 * @apiGroup Cat
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {Object[]} cats Array of cat objects
 * @apiSuccess {Number} cats.cat_id Cat ID
 * @apiSuccess {String} cats.name Cat name
 * @apiSuccess {String} cats.email Cat email
 * @apiSuccess {String} cats.role Cat role (admin / cat)
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "cat_id": 1,
 *         "name": "John Doe",
 *         "email": "john@doe.com",
 *         "role": "admin"
 *       },
 *       {
 *         "cat_id": 2,
 *         "name": "Jane Doe",
 *         "email": "jane@doe.com",
 *         "role": "cat"
 *       }
 *     ]
 *
 * @apiError {string} message No cats found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "No cats found"
 *     }
 */

/**
 * @api {get} /cat Get current cat
 * @apiName Current Cat
 * @apiGroup Cat
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {Number} cats.cat_id Cat ID
 * @apiSuccess {String} cats.name Cat name
 * @apiSuccess {String} cats.email Cat email
 * @apiSuccess {String} cats.role Cat role (admin / cat)
 *
 * @apiSuccessExample {json} Success response:
 *     {
 *         "cat_id": 1,
 *         "name": "John Doe",
 *         "email": "john@doe.com",
 *         "role": "cat"
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
 * @api {get} /cat/:id Get single cat
 * @apiName GetCat
 * @apiGroup Cat
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {Number} id Cat unique ID.
 *
 * @apiSuccess {Number} cats.cat_id Cat ID
 * @apiSuccess {String} cats.name Cat name
 * @apiSuccess {String} cats.email Cat email
 * @apiSuccess {String} cats.role Cat role (admin / cat)
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "cat_id": 1,
 *          "name": "John Doe",
 *          "email": "john@example.com",
 *          "role": "admin"
 *     }
 *
 * @apiError Message The id of the Cat was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Cat Not Found"
 *     }
 *
 */

/**
 * @api {put} /cat/:id Update Cat
 * @apiName UpdateCat
 * @apiGroup Cat
 *
 * @apiPermission Admin
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {String} id Cat's unique identifier.
 * @apiBody {String} [name] Cat's name.
 * @apiBody {String} [email] Cat's email.
 * @apiBody {String} [password] Cat's password.
 *
 * @apiSuccess {String} message Cat modified.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Cat modified"
 *     }
 *
 * @apiError Message No cats were updated.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "No cats updated"
 *     }
 *
 */

/**
 * @api {put} /cat Update Current Cat
 * @apiName UpdateCurrentCat
 * @apiGroup Cat
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiBody {String} [name] Cat's name.
 * @apiBody {String} [email] Cat's email.
 * @apiBody {String} [password] Cat's password.
 *
 * @apiSuccess {String} message Cat modified.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Cat modified"
 *     }
 *
 * @apiError Message No cats were updated.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "No cats updated"
 *     }
 *
 */

/**
 * @api {delete} /cat/:id Delete Cat
 * @apiName DeleteCat
 * @apiGroup Cat
 *
 * @apiPermission Admin
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {String} id Cat's unique identifier.
 *
 * @apiSuccess {String} message Cat deleted.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Cat deleted"
 *     }
 *
 * @apiError Message No cats were deleted.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "No cats deleted"
 *     }
 *
 */

/**
 * @api {delete} /cat Delete Current Cat
 * @apiName DeleteCurrentCat
 * @apiGroup Cat
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {String} message Cat deleted.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Cat deleted"
 *     }
 *
 * @apiError Message No cats were deleted.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "No cats deleted"
 *     }
 *
 */

/**
 * @api {post} /cat Register Cat
 * @apiName RegisterCat
 * @apiGroup Cat
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiBody {String} name Cat's name.
 * @apiBody {String} email Cat's email.
 * @apiBody {String} password Cat's password.
 *
 * @apiSuccess {Object} response Success response
 * @apiSuccess {String} response.message Message.
 * @apiSuccess {Number} response.cat_id Id of the new cat.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Cat added",
 *       "cat_id": 1
 *     }
 *
 * @apiError Message No cats were added.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "No cats added"
 *     }
 *
 */
