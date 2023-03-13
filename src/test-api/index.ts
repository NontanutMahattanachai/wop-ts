import express from 'express';
import {
  getApiRoot,
  getSingleUser,
  getUser,
  postAuthLogin,
  postAuthLoginError,
} from '../../test/testFunctions';

const router = express.Router();

/**
 * API to run Jest tests given a URL as a parameter
 *
 * @param {string} url - URL to run Jest tests against
 * @return {object} - JSON object with the result of the tests
 */

router.get('/:url', async (req, res) => {
  try {
    const url = req.params.url;
    const testRoot = await getApiRoot(url);
    const testUserList = await getUser(url);
    const testSingleUser = await getSingleUser(url, testUserList[0].user_id!);
    const testLogin = await postAuthLogin(url);
    const testLoginError = await postAuthLoginError(url);

    // Test passed
    res.json({
      testRoot,
      testUserList,
      testSingleUser,
      testLogin,
      testLoginError,
    });
  } catch (error) {
    // Tests failed
    res.json({
      message: false,
      error,
    });
  }
});

export default router;
