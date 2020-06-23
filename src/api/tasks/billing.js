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
});


/////////////////////////
//  expected billlist  //
/////////////////////////

router.get('/expectedBills', async (req, res) => {
    try {

        const expectedBills = (await BillingModel.expectedBills()).rows;

        if (expectedBills.length > 0) {
            return res.status(200).json({
                success: true,
                info: `expected bills till this month!`,
                data: expectedBills
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `oops, expected bills not found !`,
                data: expectedBills
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
//     settle bill     //
/////////////////////////

router.post('/updateBill', async (req, res) => {
    try {

        const {bill_id, recieved, discount} = await req.body;

        await BillingModel.updatedBill(bill_id, recieved, discount);
        const updatedBill = (await BillingModel.getBillByID(bill_id)).rows;

        if (updatedBill.length > 0) {
            return res.status(200).json({
                success: true,
                info: `bill updated !`,
                data: updatedBill
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `oops, bill isn't update !`,
                data: updatedBill
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
//  complete billlist  //
/////////////////////////

router.get('/complitedBills', async (req, res) => {
    try {

        const complitedBills = (await BillingModel.completedBills()).rows;

        if (complitedBills.length > 0) {
            return res.status(200).json({
                success: true,
                info: `completed bills this month!`,
                data: complitedBills
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `oops, completed bills not found !`,
                data: complitedBills
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