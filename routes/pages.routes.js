const express = require('express');
const router = express.Router();
const {getAllPages,createPage,getSinglePage,deletePage} = require('../controller/page');

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



 /**
 * @swagger
 * /page:
 *   get:
 *     tags:
 *     - "page"
 *     summary: get all pages.
 *     description: return all user pages  <br> without access_token
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *          description: code,<br>message,<br>data
 *       "500":
 *          description: code,<br>error:"error"
 */
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


 /**
 * @swagger
 * /page/{pageId}:
 *   delete:
 *     tags:
 *     - "content"
 *     summary: remove an image from page.
 *     description: allow user to delete an image from page
 *     parameters:
 *       - name: pageId
 *         description: the id of page.
 *         required: true
 *         in: path
 *     responses:
 *       "200":
 *          description: deleted successfully, {"code":"status code","message":"image deleted'}
 *       "401":
 *          description: error:<br> image already in use<br>,
 *       "500":
 *          description: error:<br> server error
 */
 router.delete('/:pageId',deletePage);


 module.exports = router