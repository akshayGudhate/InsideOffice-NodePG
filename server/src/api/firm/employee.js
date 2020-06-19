require('dotenv').config();
const express = require('express');

const MulterUpload = require('../multerUploads');
const EmployeeModel = require('../../models/firm/employeeModel');

/** image deletion packages, for duplicate image */
const fs = require("fs");
const { promisify } = require("util");
const deleteImageFile = promisify(fs.unlink);
/** image deletion packages, for duplicate image */

const router = express.Router();


/////////////////////////
//   create employee   //
/////////////////////////

router.post('/createEmployee', MulterUpload.single('img_url'), async (req, res) => {
    try {
        const { name, phone, firm_id, hod, role_id, salary, inct_factor } = await req.body;
        const img_url = (await req.file) ? await req.file.filename : `defaultImage.png`;

        const isEmployeeExist = (await EmployeeModel.searchEmployeeByPhone(phone)).rows;

        if (isEmployeeExist.length > 0) {
            if (req.file) {
                await deleteImageFile(req.file.path);
            }
            return res.status(500).json({
                success: false,
                info: `oops, employee already exist !`,
                data: isEmployeeExist[0].emp_id
            });
        } else {
            const emp_id = (await EmployeeModel.createEmployee(name, phone, firm_id, hod, role_id, salary, inct_factor, img_url)).rows[0].emp_id;

            if (emp_id > 0) {
                return res.status(200).json({
                    success: true,
                    info: `created new employee !`,
                    data: emp_id
                });
            } else {
                return res.status(500).json({
                    success: false,
                    info: `oops, employee not created !`,
                    data: emp_id
                });
            }
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            info: `error : ${err.message}`,
            data: []
        });
    }
});

/////////////////////////
//     state list      //
/////////////////////////

/////////////////////////
//    frequncy list    //
/////////////////////////

/////////////////////////
//    services list    //
/////////////////////////





module.exports.router = router;