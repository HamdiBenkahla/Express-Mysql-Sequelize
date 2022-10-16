const express = require('express');
const router = express.Router();
const {createRow} = require('../controller/row');
const {verifyAuth} =require('../middleware/auth');

/**
 * @swagger
 * /row/create:
 *   post:
 *     tags:
 *     - "row"
 *     summary: create row.
 *     description:  Create new  row from user <br> with access_token.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               pageId:
 *                 type: integer
 *     responses:
 *       "200":
 *          description: code,<br>message:"success"
 *       "401":
 *          description: code,<br>error:"unauthorized"
 *       "500":
 *          description: error:"error"
 */

 router.post('/create',verifyAuth,createRow);



module.exports = router