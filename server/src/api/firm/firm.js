require('dotenv').config();
const express = require('express');

const FirmModel = require('../../models/firm/firmModel');


const router = express.Router();


/////////////////////////
//     create firm     //
/////////////////////////

router.post('/createFirm', async (req, res) => {
    try {
        const { name, owner, phone, email, city_id } = await req.body;

        const firm_id = (await FirmModel.createFirm(name, owner, phone, email, city_id)).rows[0].firm_id;

        if (firm_id > 0) {
            return res.status(200).json({
                success: true,
                info: `created new firm !`,
                data: firm_id
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `oops, firm not created !`,
                data: firm_id
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