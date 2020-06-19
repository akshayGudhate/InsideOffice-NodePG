const postgres = require('../database').postgres;

/** ClientModel model */
class ClientModel {

    // client_id, name, firm_id, phone, email, service_id, pan_no, pan_doc, aadhar_no, aadhar_doc, gstin, contact_persons, address, city_id, is_active, time_stamp

    /** create client function */
    static createClient(name, firm_id, phone, email, service_id, pan_no, pan_doc, aadhar_no, aadhar_doc, gstin, contact_persons, address, city_id) {
        return postgres.query(
            `INSERT INTO clients 
            (name, firm_id, phone, email, service_id, pan_no, pan_doc, aadhar_no, aadhar_doc, gstin, contact_persons, address, city_id) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
             RETURNING client_id`,
            [name, firm_id, phone, email, service_id, pan_no, pan_doc, aadhar_no, aadhar_doc, gstin, contact_persons, address, city_id]
        );
    }

    /** search client with phone function */
    static searchClientByPhone(phone) {
        return postgres.query(
            `SELECT client_id FROM clients WHERE phone=$1`,
            [phone]
        );
    }


}



module.exports = ClientModel;