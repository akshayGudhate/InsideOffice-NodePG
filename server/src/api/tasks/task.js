require('dotenv').config();
const express = require('express');

const TaskModel = require('../../models/tasks/taskModel');

const router = express.Router();


/////////////////////////
//     create task     //
/////////////////////////

router.post('/createTask', async (req, res) => {
    try {
        const { bill_id, client_id, service_id, main_worker } = req.body;
        const all_workers = JSON.parse(req.body.all_workers);

        const task_id = (await TaskModel.createTask(bill_id, client_id, service_id, main_worker, all_workers)).rows[0].task_id;

        if (task_id > 0) {
            return res.status(200).json({
                success: true,
                info: `created new task !`,
                data: task_id
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `oops, task not created !`,
                data: task_id
            });
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            info: `error : ${err.message}`,
            data: []
        });
    }
})

/////////////////////////
//     state list      //
/////////////////////////

/////////////////////////
//    frequncy list    //
/////////////////////////

/////////////////////////
//    services list    //
/////////////////////////





module.exports.router = router;