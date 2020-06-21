const postgres = require('../database').postgres;

/** StaticDataModel model */
class StaticDataModel {

    /** state list function */
    static getStateList() {
        return postgres.query(
            `SELECT * FROM states ORDER BY state_id ASC`
        );
    }

    /** city list function */
    static getCityList() {
        return postgres.query(
            `SELECT * FROM cities ORDER BY city_id ASC`
        );
    }

    /** city list of state function */
    static getCitiesOfState(state_id) {
        return postgres.query(
            `SELECT city_id, name 
             FROM cities WHERE state_id = $1 
             ORDER BY city_id ASC`,
            [state_id]
        );
    }

    /** role list function */
    static getRoleList() {
        return postgres.query(
            `SELECT * FROM roles ORDER BY role_id ASC`
        );
    }

    /** banks list function */
    static getBanksList() {
        return postgres.query(
            `SELECT * FROM office_banks ORDER BY bank_id ASC`
        );
    }

    /** service frequency list function */
    static getServiceFrequencyList() {
        return postgres.query(
            `SELECT * FROM service_frequency ORDER BY frequency_id ASC`
        );
    }

    /** service type list function */
    static getServiceTypesList() {
        return postgres.query(
            `SELECT * FROM service_types ORDER BY service_id ASC`
        );
    }


}




module.exports = StaticDataModel;