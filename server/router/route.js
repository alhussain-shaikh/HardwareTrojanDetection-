const express = require('express');
const router = express.Router();  

const controllers = require("../controller/loginController");

router.post('/login',controllers.getUsersById);
router.get('/test',controllers.testRoute);
router.post('/addUser',controllers.addUsers);
router.get('/testcases',controllers.getTestCases);
router.post('/addIPFS',controllers.post_ipfs_data);
module.exports = router;