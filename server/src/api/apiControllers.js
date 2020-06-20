const express = require("express");
const router = express.Router();

/** required router files */
const emailinRouter = require("./notifications/emails").router;
const employeeRouter = require("./firm/employee").router;
const salaryRouter = require("./firm/salary").router;
const tasksRouter = require("./tasks/task").router;
const firmRouter = require("./firm/firm").router;
const clientRouter = require("./firm/client").router;
const billingRouter = require("./tasks/billing").router;
const smsRouter = require("./notifications/messages").router;
const staticDataRouter = require("./staticData/staticData").router;


/** api routes */
router.use("/", smsRouter);
router.use("/", firmRouter);
router.use("/", tasksRouter);
router.use("/", clientRouter);
router.use("/", salaryRouter);
router.use("/", billingRouter);
router.use("/", emailinRouter);
router.use("/", employeeRouter);
router.use("/", staticDataRouter);


module.exports = router;