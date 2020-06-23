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

router.post('/createClient', MulterUpload.any(), async (req, res) => {
    try {
        const { name, firm_id, phone, email, service_id, pan_no, aadhar_no, gstin, address, city_id } = await req.body;
        const contact_persons = await JSON.parse(req.body.contact_persons);

        const isEmployeeExist = (await ClientModel.searchClientByPhone(phone)).rows;

        if (isEmployeeExist.length > 0) {
            /** Delete files if existing employee docs */
            Promise.all(req.files.map(item => {
                return deleteDocFile(item.path);
            }))

            return res.status(500).json({
                success: false,
                info: `oops, client already exist !`,
                data: isEmployeeExist[0].emp_id
            });

        } else {
            const dataFiles = Promise.all(req.files.map(async item => {
                if (item.fieldname == 'aadhar_doc') {
                    const aadhar_doc = item.filename;
                    return { aadhar_doc };
                }
                if (item.fieldname == 'pan_doc') {
                    const pan_doc = item.filename;
                    return { pan_doc };
                }
            }));

            const docPaths = (await dataFiles);

            const client_id = (await ClientModel.createClient(
                name, firm_id, phone, email, service_id, pan_no, docPaths[0].pan_doc,
                aadhar_no, docPaths[1].aadhar_doc, gstin, contact_persons, address, city_id
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
});


/////////////////////////
//  client searchlist  //
/////////////////////////

router.post('/searchClient', async (req, res) => {
    try {
        const { queryString } = await req.body;

        const clientsList = (await ClientModel.searchClient(queryString)).rows;

        if (clientsList.length > 0) {
            return res.status(200).json({
                success: true,
                info: `results matching client !`,
                data: clientsList
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `oops, client not found !`,
                data: clientsList
            });
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            info: `error : ${err.message}`,
            data: []
        });
    }
});




module.exports.router = router;