require('dotenv').config();
const express = require('express');

const TaskModel = require('../../models/tasks/taskModel');

const router = express.Router();


/////////////////////////
//     create task     //
/////////////////////////

router.post('/createTask', async (req, res) => {
    try {
        const { bill_id, client_id, service_id, main_worker } = await req.body;
        const all_workers = await JSON.parse(req.body.all_workers);

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
//   incomplete task   //
/////////////////////////

router.get('/incompleteTasks', async (req, res) => {
    try {

        const incompleteTasks = (await TaskModel.incompleteTasks()).rows;

        if (incompleteTasks.length > 0) {
            return res.status(200).json({
                success: true,
                info: `incomplete tasks tray for this month!`,
                data: incompleteTasks
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `wow, incomplete tasks tray is empty !`,
                data: incompleteTasks
            });
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            info: `error : ${err.message}`,
            data: []
        });
    }
});


/////////////////////////
//  update taskStatus  //
/////////////////////////

router.post('/updateTaskStatus', async (req, res) => {
    try {

        const { task_id } = await req.body;

        await TaskModel.updateTaskStatus(task_id);
        const updatedTask = (await TaskModel.getTaskByID(task_id)).rows;

        if (updatedTask.length > 0) {
            return res.status(200).json({
                success: true,
                info: `task status updated !`,
                data: updatedTask
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `oops, task status isn't update !`,
                data: updatedTask
            });
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            info: `error : ${err.message}`,
            data: []
        });
    }
});


/////////////////////////
//   completed tasks   //
/////////////////////////

router.get('/complitedTasks', async (req, res) => {
    try {

        const complitedTasks = (await TaskModel.completedTasks()).rows;

        if (complitedTasks.length > 0) {
            return res.status(200).json({
                success: true,
                info: `tasks completed this month!`,
                data: complitedTasks
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `oops, completed tasks not found !`,
                data: complitedTasks
            });
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            info: `error : ${err.message}`,
            data: []
        });
    }
});



module.exports.router = router;