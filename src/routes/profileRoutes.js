const router = require("express").Router()
const fileUploadMiddleware = require("../middleware/fileUploadMiddleware");
const { updateProfile, getProfile } = require("../controllers/profileController");
const authenticatedUser = require("../middleware/authMiddleware");

router.get("/", authenticatedUser, getProfile)
router.put("/update", authenticatedUser, fileUploadMiddleware, updateProfile)

module.exports = router;