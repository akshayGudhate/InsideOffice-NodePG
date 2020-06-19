const postgres = require('../database').postgres;

/** BillingModel model */
class BillingModel {

    // bill_id, expected_amount, recieved_amount, discount, expected_payment_date, settled_payment_date, is_settled, time_stamp

    /** create bill function */
    static createBill(expected_amount, recieved_amount, discount, expected_payment_date) {
        return postgres.query(
            `INSERT INTO billing (expected_amount, recieved_amount, discount, expected_payment_date) 
             VALUES ($1, $2, $3, $4)
             RETURNING bill_id`,
            [expected_amount, recieved_amount, discount, expected_payment_date]
        );
    }

}



module.exports = BillingModel;