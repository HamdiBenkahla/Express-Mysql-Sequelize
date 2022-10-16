const { columns } = require("../db/db.js");
const { responseHandler } = require("../helpers/response-handler");

//create a column for a page
const createColumn = async (req, res) => {
  try {
    let { rowId } = req.body;
    const createdColumn = await columns.create({ rowId });
    return responseHandler.makeResponseData(res, 200, "success", createdColumn);
  } catch (err) {
    return responseHandler.makeResponseError(
      res,
      500,
      err.message ? err.message : err.error
    );
  }
};

module.exports = { createColumn };
