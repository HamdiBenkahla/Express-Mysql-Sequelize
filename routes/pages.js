const express = require('express');
const router = express.Router();
const {getAllPages,createPage} = require('../controller/page');

/**
 * @swagger
 * /page/{id}:
 *   get:
 *     tags:
 *     - "page"
 *     summary: get random captcha .
 *     description: return captcha to user to allow authentication action <br> without access_token
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *          description: code,<br>message,<br>data:{_id,originalImage,puzzle,position}
 *       "500":
 *          description: code,<br>error:"error"
 */
 router.get('/:id', (req,res)=>{
    res.send({mama:5656})
 })


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