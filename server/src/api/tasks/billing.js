require('dotenv').config();
const express = require('express');

const BillingModel = require('../../models/tasks/billingModel');

const router = express.Router();


/////////////////////////
//     create bill     //
/////////////////////////

router.post('/createBill', async (req, res) => {
    try {
        const { expected_amount, recieved_amount, discount, expected_payment_date } = req.body;

        const bill_id = (await BillingModel.createBill(expected_amount, recieved_amount, discount, expected_payment_date)).rows[0].bill_id;

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