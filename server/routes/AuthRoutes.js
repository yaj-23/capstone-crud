const express = require("express");
const router = express.Router();

const userCalls = require("../backend/userCalls");

const logger = require("../backend/logger");

router.post("/signup", async (req, res) => {
  try {
    // Saving using Info
    const userInfo = req.body;
    logger.testlogger.info(`Sign Up invoked, with userinfo: ${userInfo}`);

    // Adding using to DB
    const userId = await userCalls.addUserToDB(userInfo);
    console.log("Sign UP: ", userId);
    res.send(userId);
  } catch (error) {
    logger.testlogger.error(`Error occured while signup process: ${error}`);
    errorFunc(res, error);
  }
});
router.post("/signin", async (req, res) => {
  try {
    const userInfo = req.body;
    logger.testlogger.info(
      `Sign In invoked, with userinfo: ${JSON.stringify(userInfo.email)}}`
    );

    const userId = await userCalls.searchUserInDB(userInfo);
    res.send(userId);
  } catch (error) {
    logger.testlogger.error(`Error occured while signin process: ${error}`);
    errorFunc(res, error);
  }
});

router.post("/fetchMFA", async (req, res) => {
  try{
    const userInfo = req.body;
    logger.testlogger.info(
      `Fetching MFA Status = invoked, with userinfo: ${JSON.stringify(userInfo.email)}}`
    );
    const userMFA = await userCalls.getMFA(userInfo);
    res.send(userMFA);
  }catch (error) {
    logger.testlogger.error(`Error occured while fetching mfa Status : ${error}`);
    errorFunc(res, error);
  }
});

router.post("/fetchUserStatus", async (req, res) => {
  try{
    const userInfo = req.body;
    logger.testlogger.info(
      `Fetching UserStatus = invoked, with userinfo: ${JSON.stringify(userInfo.email)}}`
    );
    const userStatus = await userCalls.getUserStatus(userInfo);
    res.send(userStatus);
  }catch (error) {
    logger.testlogger.error(`Error occured while fetching mfa Status : ${error}`);
    errorFunc(res, error);
  }
});

router.get('/qrauth', async(req, res) => {
    try {
        const userInfo = req.query;
        console.log("UserINFO: ", userInfo);
        logger.testlogger.info(`QRCode invoked, with userinfo: ${JSON.stringify(userInfo.email)}`);
        // // // const userId = await userCalls.searchUserInDB(userInfo);
        const qrcode = require('qrcode');
        const {authenticator} = require('otplib');
        const secret = authenticator.generateSecret();
        const uri = authenticator.keyuri(userInfo, "HydroSec", secret);
        const image = await qrcode.toDataURL(uri);
        const user = await userCalls.updateUserInDB(userInfo.email, secret)
        // console.log("***", user);
        // console.log("**TEST**");
        // console.log("**QR Image = ", image), " **";
        // console.log("**Test Secret ", secret , " **");
        res.send({image});
    } catch(error) {
        logger.testlogger.error(`Error occured while generating QR image: ${error}`);
        errorFunc(res, error);
    }
});

router.delete("/delete-account", (req, res) => {
  // Delete account
  res.send("Delete account");
});

module.exports = router;

/**
 *
 * @param {*} res
 * @param {*} error
 */
function errorFunc(res, error) {
  if (error.name === "TypeError") res.status(404).send("Wrong ID sent");
  else if (error.cause) {
    res.status(error.cause.statusCode).send(error.toString());
  } else res.status(500).send(error.toString());
}
