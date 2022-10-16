
const {pages,rows,columns,contents,images}  = require('../db/db.js')
const { responseHandler } = require('../helpers/response-handler');


//controller to get all pages from db
let getAllPages = async(req, res) => {
    try{
    const allPages = await pages.findAll();
    return responseHandler.makeResponseData(res, 200, 'success', allPages)
    }catch(err){
        return responseHandler.makeResponseError(res, 500, err.message ? err.message : err.error);
    }  
}

//create a page by a user
const createPage = async(req, res) => {
    try{
        let {owner_id} = req.body;
        let createdPage = await pages.create({owner_id});
        return responseHandler.makeResponseData(res, 200, 'success', createdPage);
        }catch(err){
            return responseHandler.makeResponseError(res, 500, err.message ? err.message : err.error);
        }  
}

//controller to fetch a single page by id
const getSinglePage = async(req, res) => {
    try{
        let {pageId, id = +pageId} = req.params;
        let page = await pages.findOne({ where: { id }, include: [{ model: rows,  include: [{model:columns, include :[{model :contents, include:[images]}]}]   }] });
        return responseHandler.makeResponseData(res, 200, 'success', page);
        }catch(err){
            return responseHandler.makeResponseError(res, 500, err.message ? err.message : err.error);
        }  
}

const deletePage = async (req, res) => {
    let {pageId, id = +pageId} = req.params;
    try{
        let page = await pages.findByPk(id);
        if(!page) return responseHandler.makeResponseError(res, 404, 'page not found');
        let images = await page.getImages();
        let imagePromises = images.map(image => image.getPages());
        //check if all images belongs to more than a pages and it belongs to the deleted page
        let allPages =  (await Promise.all(imagePromises)).every(pagesArray => pagesArray.length === 1 && pagesArray[0]?.toJSON()?.PageImage?.pageId ===id);
        if(!allPages) return responseHandler.makeResponseError(res, 401, 'image already in use');
        await page.destroy();
        return responseHandler.makeResponseData(res, 200, 'page deleted');
    }catch(err){
        return responseHandler.makeResponseError(res, 500, err.message ? err.message : err.error);
    }
}

module.exports = {getAllPages, createPage,getSinglePage,deletePage};