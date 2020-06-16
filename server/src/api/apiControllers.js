const express = require("express");
const router = express.Router();

/** required router files */
const staticDataRouter = require("./staticData/staticData").router;
const firmRouter = require("./firm/firm").router;
const employeeRouter = require("./firm/employee").router;


/** api routes */
router.use("/", staticDataRouter);
router.use("/", firmRouter);
router.use("/", employeeRouter);


module.exports = router;