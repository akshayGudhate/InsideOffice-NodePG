require('dotenv').config();
const express = require('express');

const SalaryModel = require('../../models/firm/salaryModel');
const EmployeeModel = require('../../models/firm/employeeModel');


const router = express.Router();


/////////////////////////
//  create salary rcd  //
/////////////////////////

router.post('/createSalaryRecord', async (req, res) => {
    try {
        const { emp_id, incentives, month, year } = await req.body;

        const isSalaryRecordExist = (await SalaryModel.isRecordExist(emp_id, month, year)).rows;

        if (isSalaryRecordExist.length > 0) {

            return res.status(500).json({
                success: false,
                info: `oops, salary record already exist for this month !`,
                data: isSalaryRecordExist[0].salary_id
            });

        } else {

            const employeeDetails = (await EmployeeModel.searchEmployeeByID(emp_id)).rows[0];
            const total = parseFloat(employeeDetails.salary) + parseFloat(incentives);

            const salary_id = (await SalaryModel.createSalaryRecord(
                emp_id, employeeDetails.salary, incentives, total, month, year
            )).rows[0].salary_id;

            if (salary_id > 0) {
                return res.status(200).json({
                    success: true,
                    info: `created new salary record !`,
                    data: salary_id
                });
            } else {
                return res.status(500).json({
                    success: false,
                    info: `oops, salary record not created !`,
                    data: salary_id
                });
            }
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
//    total  salary    //
/////////////////////////

router.post('/totalSalaryRecord', async (req, res) => {
    try {
        const { year } = await req.body;

        const salaryMonthWise = (await SalaryModel.salaryMonthWise(year)).rows;
        const yearlyTotal = (await SalaryModel.yearlyTotal(year)).rows[0].sum;

        let yearData = [];
        yearData.push(yearlyTotal);

        for (let i = 1; i < (new Date().toISOString().slice(5, 7)); i++) {
            let x = []
            x.push(
                (await SalaryModel.monthlyTotal(i)).rows[0].sum,
                ...(await SalaryModel.monthlySalaryRecords(i)).rows
            );

            yearData.push(x)

        }

        const monthlyTotal = (await SalaryModel.monthlyTotal(5)).rows[0].sum;
        const monthlySalaryRecords = (await SalaryModel.monthlySalaryRecords(5)).rows;

        if (salaryMonthWise.length > 0) {
            return res.status(200).json({
                success: true,
                info: `found salary records !`,
                data: yearData, monthlySalaryRecords, monthlyTotal, salaryMonthWise, yearlyTotal
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `oops, salary records not found !`,
                data: salaryMonthWise
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
//    frequncy list    //
/////////////////////////

/////////////////////////
//    services list    //
/////////////////////////





module.exports.router = router;