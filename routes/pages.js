const express = require('express');
const router = express.Router();
const {getAllPages,createPage,getSinglePage} = require('../controller/page');

/**
 * @swagger
 * /page/{pageId}:
 *   get:
 *     tags:
 *     - "page"
 *     summary: get random captcha .
 *     description: return captcha to user to allow authentication action <br> without access_token
 *     parameters:
 *       - name: pageId
 *         description: page id.
 *         in: path 
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *          description: code,<br>message,<br>data:{_id,owner_id,Rows,position,createdAt,updatedAt}
 *       "500":
 *          description: code,<br>error:"error"
 */
 router.get('/:id', getSinglePage)


 router.get('/',getAllPages)


/**
 * @swagger
 * /page/create:
 *   post:
 *     tags:
 *     - "page"
 *     summary: create page.
 *     description:  Create new  page from user <br> with access_token.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               owner_id:
 *                 type: integer
 *     responses:
 *       "200":
 *          description: code,<br>message:"success"
 *       "401":
 *          description: code,<br>error:"unauthorized"
 *       "500":
 *          description: error:"error"
 */

 router.post('/create',createPage)


 module.exports = router