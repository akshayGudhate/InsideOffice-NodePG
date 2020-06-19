const express = require("express");
const router = express.Router();

/** required router files */
const firmRouter = require("./firm/firm").router;
const tasksRouter = require("./tasks/task").router;
const clientRouter = require("./firm/client").router;
const billingRouter = require("./tasks/billing").router;
const employeeRouter = require("./firm/employee").router;
const smsRouter = require("./notifications/messages").router;
const emailinRouter = require("./notifications/emails").router;
const staticDataRouter = require("./staticData/staticData").router;


/** api routes */
router.use("/", smsRouter);
router.use("/", firmRouter);
router.use("/", tasksRouter);
router.use("/", clientRouter);
router.use("/", billingRouter);
router.use("/", emailinRouter);
router.use("/", employeeRouter);
router.use("/", staticDataRouter);


module.exports = router;