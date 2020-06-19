const postgres = require('../database').postgres;

/** SalaryModel model */
class SalaryModel {

    // salary_id, emp_id, basic, incentives, total, month_year, is_settled, time_stamp 

    /** create salary record for a month function */
    static createSalaryRecord(emp_id, basic, incentives, total, month_year) {
        return postgres.query(
            `INSERT INTO salary (emp_id, basic, incentives, total, month_year) 
             VALUES ($1, $2, $3, $4, $5)
             RETURNING firm_id`,
            [name, owner, phone, email, city_id]
        );
    }

}



module.exports = SalaryModel;