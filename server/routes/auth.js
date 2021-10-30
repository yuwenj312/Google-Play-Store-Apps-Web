const express = require("express");
const router = express.Router();
//import controller
const {verifyToken,signup, activateAccount, signin, googlelogin, facebooklogin, authJwt} = require("../controllers/auth");

router.post('/signup', signup);
router.post('/email-activate', activateAccount);
router.post('/signin', signin);

router.post('/googlelogin', googlelogin);
router.post('/facebooklogin', facebooklogin);

//router.use('/verifyToken',verifyToken);

module.exports = router;