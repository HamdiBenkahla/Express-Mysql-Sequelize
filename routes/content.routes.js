const express = require('express');
const router = express.Router();
const {uploadImage,upload,updateImage,deleteImage,createContent,updateContent} = require('../controller/content');


router.post('/upload',upload,uploadImage);

router.put('/upload/:id',upload,updateImage);


/**
 * @swagger
 * /content/image/{imageId}:
 *   delete:
 *     tags:
 *     - "content"
 *     summary: remove an image from page.
 *     description: allow user to delete an image from page
 *     parameters:
 *       - name: imageId
 *         description: the id of image.
 *         required: true
 *         in: path
 *       - name: pageId
 *         description: the id of page.
 *         required: true
 *         in: query
 *     responses:
 *       "200":
 *          description: deleted successfully, {"code":"status code","message":"image deleted'}
 *       "401":
 *          description: error:<br> image already in use<br>,
 *       "500":
 *          description: error:<br> server error
 */
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


/**
 * @swagger
 * /content/update/{contentId}:
 *   put:
 *     tags:
 *     - "content"
 *     summary: update content of a page.
 *     description: allow user to update content of a column
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:      # Request body contents
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                paragraph:
 *                  type: string
 *                quote:
 *                  type: string
 *     parameters:
 *       - name: contentId
 *         description: the id of content.
 *         required: true
 *         in: path
 *     responses:
 *       "202":
 *          description: update successfully, {"code":"status code","message":"success'}
 *       "500":
 *          description: error:<br> server error
 */
router.put('/update/:contentId', updateContent)

module.exports = router