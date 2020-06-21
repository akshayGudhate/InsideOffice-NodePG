const postgres = require('../database').postgres;

/** EmployeeModel model */
class EmployeeModel {

    // emp_id, name, phone, firm_id, hod, role_id, salary, img_url

    /** create employee function */
    static createEmployee(name, phone, firm_id, hod, role_id, salary, img_url) {
        return postgres.query(
            `INSERT INTO employees (name, phone, firm_id, hod, role_id, salary, img_url) 
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING emp_id`,
            [name, phone, firm_id, hod, role_id, salary, img_url]
        );
    }

    /** search employee with phone function */
    static searchEmployeeByPhone(phone) {
        return postgres.query(
            `SELECT emp_id FROM employees WHERE phone=$1`,
            [phone]
        );
    }

    /** search employee with id function */
    static searchEmployeeByID(emp_id) {
        return postgres.query(
            `SELECT * FROM employees WHERE emp_id=$1`,
            [emp_id]
        );
    }

    /** search employee function */
    static searchEmployee(queryString) {
        if (queryString == '' || queryString == null || queryString == undefined) {
            return postgres.query(
                `SELECT * FROM employees`
            );
        } else {
            queryString = `%${queryString}%`;
            return postgres.query(
                `SELECT * FROM employees
                 WHERE (LOWER(name) LIKE LOWER($1))
                 OR phone::TEXT LIKE $1`,
                [queryString]
            );
        }
    }

}




module.exports = EmployeeModel;