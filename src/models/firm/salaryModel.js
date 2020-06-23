const postgres = require('../database').postgres;

/** SalaryModel model */
class SalaryModel {

    // salary_id, emp_id, basic, incentives, total, month, year, is_settled, time_stamp 

    /** create salary record for a month function */
    static createSalaryRecord(emp_id, basic, incentives, total, month, year) {
        return postgres.query(
            `INSERT INTO salary (emp_id, basic, incentives, total, month, year) 
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING salary_id`,
            [emp_id, basic, incentives, total, month, year]
        );
    }

    /** is record exist for employee function */
    static isRecordExist(emp_id, month, year) {
        return postgres.query(
            `SELECT salary_id FROM salary
             WHERE emp_id=$1 AND month=$2 AND year=$3`,
            [emp_id, month, year]
        );
    }

    /** monthly salary records function */
    static monthlySalaryRecords(month) {
        return postgres.query(
            `SELECT * FROM salary
             WHERE month=$1`,
            [month]
        );
    }

    /** yearly salary records function */
    static monthlyTotal(month) {
        return postgres.query(
            `SELECT SUM(total) FROM salary 
             WHERE month=$1`,
            [month]
        );
    }

    /** month wise salary for year function */
    static salaryMonthWise(year) {
        return postgres.query(
            `SELECT DISTINCT(month), SUM(total) as month_salary FROM salary
             WHERE year=$1 GROUP BY month`,
            [year]
        );
    }

    /** yearly salary function */
    static yearlyTotal(year) {
        return postgres.query(
            `SELECT SUM(total) FROM salary 
            WHERE year=$1`,
            [year]
        );
    }

}




module.exports = SalaryModel;