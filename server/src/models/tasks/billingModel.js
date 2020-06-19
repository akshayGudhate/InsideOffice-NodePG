const postgres = require('../database').postgres;

/** BillingModel model */
class BillingModel {

    // bill_id, basic, gst, total, recieved, discount, expected_payment_date, settled_payment_date, is_settled, time_stamp

    /** create bill function */
    static createBill(basic, gst, total, expected_payment_date) {
        return postgres.query(
            `INSERT INTO billing (basic, gst, total, expected_payment_date) 
             VALUES ($1, $2, $3, $4)
             RETURNING bill_id`,
            [basic, gst, total, expected_payment_date]
        );
    }

}



module.exports = BillingModel;