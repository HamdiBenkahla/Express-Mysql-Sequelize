const {contents,images,pages}  = require('../db/db.js')
const { responseHandler } = require('../helpers/response-handler');
const multer = require('multer');
const path = require('path');



//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
const upload = multer({
    storage: storage
}).single('file');


const handlePathImage = (file,res) =>{
    if (!file) return responseHandler.makeResponseError(res, 500, {message : "No file upload"});
        return process.env.BASEURLLOCAL + file.filename;
}
//controller to upload file to db
const uploadImage = async (req, res) =>{
    try{
        let {page_id,contentId} = req.body;
        const path = handlePathImage(req?.file,res);
        
        
      let created =  await images.create({page_id,contentId,path})
        
      created.addPages(page_id);
        return responseHandler.makeResponseData(res, 200, 'image uploaded');
    }catch(err){
        return responseHandler.makeResponseError(res, 500, err.message ? err.message : err.error);
    }
}

const updateImage = async (req, res) =>{
    try{
        let {id} = req.params;
        const path = handlePathImage(req?.file,res);
        let image = await images.findByPk(id)
        image.path = path;
        await image.save();
        return responseHandler.makeResponseData(res, 200, 'image updated');
    }catch(err){
        return responseHandler.makeResponseError(res, 500, err.message ? err.message : err.error);
    }

}

const deleteImage = async(req, res) => {
  try{
   let {imageId, id = +imageId} = req.params;
   let image = await images.findByPk(id);
   //retriving all pages that contains the image
   let pages = await image.getPages();
   if(pages.length > 1) return responseHandler.makeResponseError(res, 401, 'image already in use');
   await image.destroy(); // deletes the image
   return responseHandler.makeResponseData(res, 200, 'image deleted');
  }catch(err){
    return responseHandler.makeResponseError(res, 500, err.message ? err.message : err.error);
  }
}


const createContent = async(req, res) => {
    try{
        let {pageId,columnId,paragraph,title,quote} = req.body;
        if(!pageId || !columnId) return responseHandler.makeResponseError(res, 500, {message : "missing parameters"});
        let newContent =  {
            pageId,
            columnId,
            ...paragraph && {paragraph},
            ...title && {title},
            ...quote && {quote},
        };
        let page = await contents.create(newContent);
        return responseHandler.makeResponseData(res, 200, 'success', page);
        }catch(err){
            return responseHandler.makeResponseError(res, 500, err.message ? err.message : err.error);
        }  
}

module.exports = {uploadImage,upload,updateImage,deleteImage,createContent}