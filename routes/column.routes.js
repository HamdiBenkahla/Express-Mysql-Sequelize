const express = require('express');
const router = express.Router();
const {createColumn} = require('../controller/column');
const {verifyAuth} =require('../middleware/auth');

/**
 * @swagger
 * /column/create:
 *   post:
 *     tags:
 *     - "column"
 *     summary: create column.
 *     description:  Create new  column from user <br> with access_token.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               rowId:
 *                 type: integer
 *     responses:
 *       "200":
 *          description: code,<br>message:"success"
 *       "401":
 *          description: code,<br>error:"unauthorized"
 *       "500":
 *          description: error:"error"
 */

 router.post('/create',createColumn);



module.exports = router