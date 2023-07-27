const multerConfig = require("../utils/multerConfig");

const fileUploadMiddleware = multerConfig.single("avatar", { optional: true, limits: { fileSize: 2 * 1024 * 1024 } });

module.exports = fileUploadMiddleware;
