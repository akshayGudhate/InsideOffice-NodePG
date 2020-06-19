const postgres = require('../database').postgres;

/** TaskModel model */
class TaskModel {

    // task_id, bill_id, client_id, service_id, main_worker, all_workers, is_complete, time_stamp

    /** create task function */
    static createTask(bill_id, client_id, service_id, main_worker, all_workers) {
        return postgres.query(
            `INSERT INTO tasktray (bill_id, client_id, service_id, main_worker, all_workers) 
             VALUES ($1, $2, $3, $4, $5)
             RETURNING task_id`,
            [bill_id, client_id, service_id, main_worker, all_workers]
        );
    }

}



module.exports = TaskModel;