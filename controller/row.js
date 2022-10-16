const {rows}  = require('../db/db.js');
const { responseHandler } = require('../helpers/response-handler');;

//create a row for a page
const createRow = async(req, res) => {
    try{
        let {pageId} = req.body;
        let createdRow = await rows.create({pageId});
        return responseHandler.makeResponseData(res, 200, 'success', createdRow);
        }catch(err){
            return responseHandler.makeResponseError(res, 500, err.message ? err.message : err.error);
        }  
}

module.exports = {createRow};