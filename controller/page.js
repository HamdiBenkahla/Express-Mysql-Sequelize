
const {pages,owner}  = require('../db/db.js')
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

const getSinglePage = async(req, res) => {
    try{
        let {pageId, id = +pageId} = req.params;
        let page = await pages.findOne({ where: { id }, include: [owner]  });
        return responseHandler.makeResponseData(res, 200, 'success', page);
        }catch(err){
            return responseHandler.makeResponseError(res, 500, err.message ? err.message : err.error);
        }  
}


module.exports = {getAllPages, createPage,getSinglePage};