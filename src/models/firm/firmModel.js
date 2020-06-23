const postgres = require('../database').postgres;

/** FirmModel model */
class FirmModel {

    /** create firm function */
    static createFirm(name, owner, phone, email, city_id) {
        return postgres.query(
            `INSERT INTO firms (name, owner, phone, email, city_id) 
             VALUES ($1, $2, $3, $4, $5)
             RETURNING firm_id`,
            [name, owner, phone, email, city_id]
        );
    }

}




module.exports = FirmModel;