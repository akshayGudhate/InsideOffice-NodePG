require('dotenv').config();
const express = require('express');

const MulterUpload = require('../multerUploads');
const ClientModel = require('../../models/firm/clientModel');

/** image deletion packages, for duplicate image */
const fs = require("fs");
const { promisify } = require("util");
const deleteDocFile = promisify(fs.unlink);
/** image deletion packages, for duplicate image */

const router = express.Router();


/////////////////////////
//    create client    //
/////////////////////////

router.post('/createClient', MulterUpload.single('pan_doc'), async (req, res) => {
    try {
        const { name, firm_id, phone, email, service_id, pan_no, gstin, address, city_id } = req.body;
        const contact_persons = JSON.parse(req.body.contact_persons);
        const pan_doc = (await req.file) ? await req.file.filename : ``;

        const isEmployeeExist = (await ClientModel.searchClientByPhone(phone)).rows;

        if (isEmployeeExist.length > 0) {
            if (req.file) {
                await deleteDocFile(req.file.path);
            }
            return res.status(500).json({
                success: false,
                info: `oops, client already exist !`,
                data: isEmployeeExist[0].emp_id
            });

        } else {

            const client_id = (await ClientModel.createClient(
                name, firm_id, phone, email, service_id, pan_no, pan_doc, gstin, contact_persons, address, city_id
            )).rows[0].client_id;

            if (client_id > 0) {
                return res.status(200).json({
                    success: true,
                    info: `created new client !`,
                    data: client_id
                });
            } else {
                return res.status(500).json({
                    success: false,
                    info: `oops, client not created !`,
                    data: client_id
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
})

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