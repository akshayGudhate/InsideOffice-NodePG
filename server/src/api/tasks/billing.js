require('dotenv').config();
const express = require('express');

const BillingModel = require('../../models/tasks/billingModel');

const router = express.Router();


/////////////////////////
//     create bill     //
/////////////////////////

router.post('/createBill', async (req, res) => {
    try {
        const { basic, gst, expected_payment_date } = await req.body;
        const total = (parseFloat(basic) + parseFloat(gst));

        const bill_id = (await BillingModel.createBill(basic, gst, total, expected_payment_date)).rows[0].bill_id;

        if (bill_id > 0) {
            return res.status(200).json({
                success: true,
                info: `created new bill !`,
                data: bill_id
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `oops, bill not created !`,
                data: bill_id
            });
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