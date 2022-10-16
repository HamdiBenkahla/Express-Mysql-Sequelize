const { contents, images, pages } = require("../db/db.js");
const { responseHandler } = require("../helpers/response-handler");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
//! Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public//images/"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("file");

const handlePathImage = (file, res) => {
  if (!file)
    return responseHandler.makeResponseError(res, 406, {
      message: "No file upload",
    });
  return process.env.BASEURLLOCAL + "/images/" + file.filename;
};
//controller to upload file to db
const uploadImage = async (req, res) => {
  try {
    let { page_id, contentId } = req.body;
    const path = handlePathImage(req?.file, res);
    let created = await images.create({ page_id, contentId, path });
    await created.addPages(page_id);
    return responseHandler.makeResponseData(res, 200, "image uploaded");
  } catch (err) {
    return responseHandler.makeResponseError(
      res,
      500,
      err.message ? err.message : err.error
    );
  }
};

//check if image belong to page
let checkBelongsTo = (pages, target) =>
  pages?.map((elem) => elem?.toJSON()?.PageImage?.PageId).includes(target);

const updateImage = async (req, res) => {
  try {
    let { id } = req.params;
    const path = handlePathImage(req?.file, res);
    let image = await images.findByPk(id);
    image.path = path;
    await image.save();
    return responseHandler.makeResponseData(res, 200, "image updated");
  } catch (err) {
    return responseHandler.makeResponseError(
      res,
      500,
      err.message ? err.message : err.error
    );
  }
};

const deleteImage = async (req, res) => {
  try {
    let { imageId, id = +imageId } = req.params;
    let { pageId, idPage = +pageId } = req.query;
    //if missing parameter return error to user
    if (!idPage || !id)
      return responseHandler.makeResponseError(res, 401, "missing parameter");
    let image = await images.findByPk(id);
    //retrieving all pages that contains the image
    let pages = await image.getPages();
    if (pages.length > 1)
      return responseHandler.makeResponseError(
        res,
        401,
        "image already in use"
      );
    let belongsToPage = checkBelongsTo(pages, idPage);
    if (!belongsToPage)
      return responseHandler.makeResponseError(res, 401, "wrong manipulation");
    
    await image.destroy(); // deletes the image from db
    let fileName =image.path.split('/').pop()
    let directoryPath = __basedir +"/public/images/";
    fs.unlink(directoryPath + fileName,_ =>{}); //delete uploaded image from /public/images folder
    responseHandler.makeResponseData(res, 200, "image deleted");
  } catch (err) {
    return responseHandler.makeResponseError(
      res,
      500,
      err.message ? err.message : err.error
    );
  }
};

const createContent = async (req, res) => {
  try {
    let { pageId, columnId, paragraph, title, quote } = req.body;
    if (!pageId || !columnId)
      return responseHandler.makeResponseError(res, 500, {
        message: "missing parameters",
      });
    let newContent = {
      pageId,
      columnId,
      ...(paragraph && { paragraph }),
      ...(title && { title }),
      ...(quote && { quote }),
    };
    let page = await contents.create(newContent);
    return responseHandler.makeResponseData(res, 200, "success", page);
  } catch (err) {
    return responseHandler.makeResponseError(
      res,
      500,
      err.message ? err.message : err.error
    );
  }
};

const updateContent = async (req, res) => {
  try {
    let { contentId, id = +contentId } = req.params;
    const data = req.body;
    await contents.update(data, { where: { id } });
    return responseHandler.makeResponseData(res, 202, "success");
  } catch (err) {
    return responseHandler.makeResponseError(
      res,
      500,
      err.message ? err.message : err.error
    );
  }
};

module.exports = {
  uploadImage,
  upload,
  updateImage,
  deleteImage,
  createContent,
  updateContent,
};
