const express = require('express');
const router = express.Router();
const {uploadImage,upload,updateImage,deleteImage,createContent,updateContent,getImage} = require('../controller/content');



/**
 * @swagger
 * /content/upload:
 *   post:
 *     tags:
 *     - "content"
 *     summary: upload image.
 *     description:  Upload page image <br> with access_token.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               page_id:
 *                 type: number
 *               file:
 *                 type: string
 *                 format : base64
 *               contentId:
 *                 type: number
 *     responses:
 *       "200":
 *          description: code,<br>message:"'image uploaded'"
 *       "406":
 *          description: code,<br>error:"No file upload"
 *       "500":
 *          description: error:error message
 */

router.post('/upload',upload,uploadImage);


/**
 * @swagger
 * /content/upload/{imageId}:
 *   post:
 *     tags:
 *     - "content"
 *     summary: upload image.
 *     description:  Upload page image <br> with access_token.
 *     parameters:
 *       - name: imageId
 *         description: the id of image.
 *         required: true
 *         in: path
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               page_id:
 *                 type: number
 *               file:
 *                 type: string
 *                 format : base64
 *               contentId:
 *                 type: number
 *     responses:
 *       "200":
 *          description: code,<br>message:"'image uploaded'"
 *       "406":
 *          description: code,<br>error:"No file upload"
 *       "500":
 *          description: error:error message
 */

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
 * /content/image/{imageId}:
 *   get:
 *     tags:
 *     - "content"
 *     summary: get an image from db.
 *     description: allow user to fetch an image from 
 *     parameters:
 *       - name: imageId
 *         description: the id of image.
 *         required: true
 *         in: path
 *     responses:
 *       "200":
 *          description: deleted successfully, {"code":"status code","message":"image deleted',data}
 *       "404":
 *          description: error:<br> no image found <br>,
 *       "500":
 *          description: error:<br> server error
 */
 router.get('/image/:imageId',getImage);

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