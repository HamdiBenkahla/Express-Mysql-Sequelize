const express = require('express');
const router = express.Router();
const {uploadImage,upload,updateImage,deleteImage,createContent} = require('../controller/content');


router.post('/upload',upload,uploadImage);

router.put('/upload/:id',upload,updateImage);

router.delete('/image/:imageId',deleteImage);


/**
 * @swagger
 * /content/create:
 *   post:
 *     tags:
 *     - "content"
 *     summary: content creation api.
 *     description: user create content for a specefic column on single page <br> without access_token.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               paragraph:
 *                 type: string
 *               quote:
 *                 type: string
 *               pageId:
 *                 type: number
 *               columnId:
 *                 type: number
 *     responses:
 *       "200":
 *          description: code,<br>message,<br>data:{"access_token":token,"id":user_id}
 *       "401":
 *          description: code,<br>error:{error:true,message:'account_already_used'}
 *       "500":
 *          description: error=eror
 */
router.post('/create', createContent)


module.exports = router