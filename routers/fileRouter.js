const express = require("express");
const fileRouter = express.Router();
const fileController = require("../controllers/fileController");

fileRouter.post("/", fileController.upload);
fileRouter.get("/:name", fileController.download);
fileRouter.delete("/:name", fileController.delete);

module.exports = fileRouter;