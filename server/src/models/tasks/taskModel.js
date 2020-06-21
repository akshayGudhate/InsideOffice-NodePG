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

    /** get single task function */
    static getTaskByID(task_id) {
        return postgres.query(
            `SELECT * FROM tasktray WHERE task_id=$1`,
            [task_id]
        );
    }

    /** incomplete tasks function */
    static incompleteTasks() {
        return postgres.query(
            `SELECT * FROM tasktray
             WHERE is_complete=FALSE`
        );
    }

    /** updatedTask this month function */
    static updateTaskStatus(task_id) {
        return postgres.query(
            `UPDATE tasktray
             SET is_complete=TRUE, time_stamp=now()
             WHERE task_id=$1`,
            [task_id]
        );
    }

    /** completedTasks this month function */
    static completedTasks() {
        return postgres.query(
            `SELECT * FROM tasktray
             WHERE EXTRACT(MONTH FROM time_stamp)=EXTRACT(MONTH FROM now())
             AND is_complete=TRUE`
        );
    }

}




module.exports = TaskModel;