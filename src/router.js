const express = require("express");
const router = express.Router();

// Import controllers
const userController = require("./controllers/user.controller");
router.use("/", userController);

module.exports = router;
