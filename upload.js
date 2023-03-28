const util = require("util");
const Multer = require("multer");

let processFile = Multer({
  storage: Multer.memoryStorage()
}).any("file");

let processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;