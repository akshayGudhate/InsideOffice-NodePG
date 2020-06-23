const postgres = require('../database').postgres;

/** BillingModel model */
class BillingModel {

    // bill_id, basic, gst, total, recieved, discount, debited, tds_deduction, reimb_w_gst, reimb_wo_gst, expected_payment_date, settled_payment_date, is_settled, time_stamp

    /** create bill function */
    static createBill(basic, gst, total, expected_payment_date) {
        return postgres.query(
            `INSERT INTO billing (basic, gst, total, expected_payment_date) 
             VALUES ($1, $2, $3, $4)
             RETURNING bill_id`,
            [basic, gst, total, expected_payment_date]
        );
    }

    /** get single bill function */
    static getBillByID(bill_id) {
        return postgres.query(
            `SELECT * FROM billing WHERE bill_id=$1`,
            [bill_id]
        );
    }

    /** expectedBills this month function */
    static expectedBills() {
        return postgres.query(
            `SELECT * FROM billing
             WHERE EXTRACT(MONTH FROM expected_payment_date)<=EXTRACT(MONTH FROM now())
             AND is_settled=FALSE`
        );
    }

    /** updatedBill this month function */
    static updatedBill(bill_id, recieved, discount) {
        return postgres.query(
            `UPDATE billing
             SET recieved=$2, discount=$3, debited=$4, tds_deduction=$5, reimb_w_gst=$6, reimb_wo_gst=$7, settled_payment_date=now(), is_settled =
                CASE
                    WHEN total::NUMERIC=($2::NUMERIC+$3::NUMERIC)
                    THEN TRUE ELSE FALSE
                END
             WHERE bill_id=$1`,
            [bill_id, recieved, discount, debited, tds_deduction, reimb_w_gst, reimb_wo_gst]
        );
    }

    /** completedBills this month function */
    static completedBills() {
        return postgres.query(
            `SELECT * FROM billing
             WHERE EXTRACT(MONTH FROM settled_payment_date)=EXTRACT(MONTH FROM now())
             AND is_settled=TRUE`
        );
    }

}




module.exports = BillingModel;