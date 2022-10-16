const {contents,images}  = require('../db/db.js')
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
        await images.create({page_id,contentId,path})
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

module.exports = {uploadImage,upload,updateImage}