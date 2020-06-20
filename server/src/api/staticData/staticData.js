require('dotenv').config();
const express = require('express');

const StaticDataModel = require('../../models/staticData/staticDataModel');

const router = express.Router();

/////////////////////////
//     state list      //
/////////////////////////

router.get('/stateList', async (req, res) => {
    try {
        const stateList = (await StaticDataModel.getStateList()).rows;

        if (stateList.length > 0) {
            return res.status(200).json({
                success: true,
                info: `found state list !`,
                data: stateList
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `oops, not found state list !`,
                data: stateList
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
//      city list      //
/////////////////////////

router.get('/cityList', async (req, res) => {
    try {
        const cityList = (await StaticDataModel.getCityList()).rows;

        if (cityList.length > 0) {
            return res.status(200).json({
                success: true,
                info: `found city list !`,
                data: cityList
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `oops, not found city list !`,
                data: cityList
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
//   cities of state   //
/////////////////////////

router.post('/citiesOfState', async (req, res) => {
    try {
        const { state_id } = await req.body;
        const citiesOfState = (await StaticDataModel.getCitiesOfState(state_id)).rows;

        if (citiesOfState.length > 0) {
            return res.status(200).json({
                success: true,
                info: `found cities of state !`,
                data: citiesOfState
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `oops, not found cities of state !`,
                data: citiesOfState
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
//      role list      //
/////////////////////////

router.get('/roleList', async (req, res) => {
    try {
        const roleList = (await StaticDataModel.getRoleList()).rows;

        if (roleList.length > 0) {
            return res.status(200).json({
                success: true,
                info: `found role list !`,
                data: roleList
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `oops, not found role list !`,
                data: roleList
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

router.get('/servFrqList', async (req, res) => {
    try {
        const serviceFrqList = (await StaticDataModel.getServiceFrequencyList()).rows;

        if (serviceFrqList.length > 0) {
            return res.status(200).json({
                success: true,
                info: `found service frequency list !`,
                data: serviceFrqList
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `oops, not found service frequency list !`,
                data: serviceFrqList
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
//    services list    //
/////////////////////////

router.get('/servTypeList', async (req, res) => {
    try {
        const serviceTypeList = (await StaticDataModel.getServiceTypesList()).rows;

        if (serviceTypeList.length > 0) {
            return res.status(200).json({
                success: true,
                info: `found service type list !`,
                data: serviceTypeList
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `oops, not found service type list !`,
                data: serviceTypeList
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