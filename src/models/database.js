require('dotenv').config();
const { Pool } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;

////////////////////////
//       pg pool      //
////////////////////////

const postgres = new Pool({
    connectionString: DATABASE_URL
});


////////////////////////
//      states        //
////////////////////////

const initStatesTable = async () => {
    await postgres.query(
        `CREATE TABLE IF NOT EXISTS states(
            state_id SERIAL PRIMARY KEY,
            name TEXT NOT NULL
        );`
    );

    const isStateDataPresent = (await postgres.query(`SELECT COUNT (*) FROM states`)).rows[0].count;

    if (isStateDataPresent == 0) {
        const statesData = require('./staticData/states.json');
        statesData.map(async (item) => {
            await postgres.query(
                `INSERT INTO states(state_id, name)
                 VALUES($1, $2)`,
                [item.state_id, item.name]
            )
        });
    }
};


////////////////////////
//       cities       //
////////////////////////

const initCitiesTable = async () => {
    await postgres.query(
        `CREATE TABLE IF NOT EXISTS cities(
            city_id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            state_id INTEGER REFERENCES states(state_id)
        );`
    );

    const isCityDataPresent = (await postgres.query(`SELECT COUNT (*) FROM cities`)).rows[0].count;

    if (isCityDataPresent == 0) {
        const citiesData = require('./staticData/cities.json');
        citiesData.map(async (item) => {
            await postgres.query(
                `INSERT INTO cities(city_id, name, state_id)
                 VALUES($1, $2, $3)`,
                [item.city_id, item.name, item.state_id]
            )
        });
    }
};


////////////////////////
//       roles        //
////////////////////////

const initRolesTable = async () => {
    await postgres.query(
        `CREATE TABLE IF NOT EXISTS roles(
            role_id SERIAL PRIMARY KEY,
            name TEXT NOT NULL
        );`
    );

    const isRoleDataPresent = (await postgres.query(`SELECT COUNT (*) FROM roles`)).rows[0].count;

    if (isRoleDataPresent == 0) {
        const rolesData = require('./staticData/roles.json');
        rolesData.map(async (item) => {
            await postgres.query(
                `INSERT INTO roles(role_id, name)
                 VALUES($1, $2)`,
                [item.role_id, item.name]
            )
        });
    }
};


////////////////////////
//    office bank     //
////////////////////////

const initOfficeBankTable = async () => {
    await postgres.query(
        `CREATE TABLE IF NOT EXISTS office_banks(
            bank_id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            acc_no NUMERIC NOT NULL,
            ifsc_code TEXT NOT NULL
        );`
    );

    const isBankDataPresent = (await postgres.query(`SELECT COUNT (*) FROM office_banks`)).rows[0].count;

    if (isBankDataPresent == 0) {
        const banksData = require('./staticData/officeBanks.json');
        banksData.map(async (item) => {
            await postgres.query(
                `INSERT INTO office_banks(bank_id, name, acc_no, ifsc_code)
                 VALUES($1, $2, $3, $4)`,
                [item.bank_id, item.name, item.acc_no, item.ifsc_code]
            )
        });
    }
};


////////////////////////
//  service frequecy  //
////////////////////////

const initServiceFrequencyTable = async () => {
    const serviceFrequencyDataFile = process.env.CSV_SERVE_FREQ;
    await postgres.query(
        `CREATE TABLE IF NOT EXISTS service_frequency(
            frequency_id SERIAL PRIMARY KEY,
            name TEXT NOT NULL
        );`
    );

    const isServiceFrequencyDataPresent = (await postgres.query(`SELECT COUNT (*) FROM service_frequency`)).rows[0].count;

    if (isServiceFrequencyDataPresent == 0) {
        const frenquencyData = require('./staticData/serviceFrequency.json');
        frenquencyData.map(async (item) => {
            await postgres.query(
                `INSERT INTO service_frequency(frequency_id, name)
                 VALUES($1, $2)`,
                [item.frequency_id, item.name]
            )
        });
    }
};


////////////////////////
//    service type    //
////////////////////////

const initServiceTypesTable = async () => {
    const serviceTypesDataFile = process.env.CSV_SERVICE_TYPES;
    await postgres.query(
        `CREATE TABLE IF NOT EXISTS service_types(
            service_id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            frequency_id INTEGER REFERENCES service_frequency(frequency_id)
        );`
    );

    const isServiceTypeDataPresent = (await postgres.query(`SELECT COUNT (*) FROM service_types`)).rows[0].count;

    if (isServiceTypeDataPresent == 0) {
        const serviceData = require('./staticData/serviceTypes.json');
        serviceData.map(async (item) => {
            await postgres.query(
                `INSERT INTO service_types(service_id, name, frequency_id)
                 VALUES($1, $2, $3)`,
                [item.service_id, item.name, item.frequency_id]
            )
        });
    }
};


////////////////////////
//        firms       //
////////////////////////

const initFirmsTable = async () => {
    await postgres.query(
        `CREATE TABLE IF NOT EXISTS firms(
            firm_id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            owner TEXT NOT NULL,
            phone NUMERIC(10) UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            city_id INTEGER REFERENCES cities(city_id),
            time_stamp TIMESTAMPTZ DEFAULT now() NOT NULL
        );`
    );
};


////////////////////////
//     employees      //
////////////////////////

const initEmployeesTable = async () => {
    await postgres.query(
        `CREATE TABLE IF NOT EXISTS employees(
            emp_id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            phone NUMERIC(10) UNIQUE NOT NULL,
            firm_id INTEGER REFERENCES firms(firm_id),
            hod INTEGER REFERENCES employees(emp_id) DEFAULT 1,
            role_id INTEGER REFERENCES roles(role_id),
            salary NUMERIC(15, 2) NOT NULL,
            img_url TEXT,
            is_active BOOLEAN DEFAULT TRUE,
            time_stamp TIMESTAMPTZ DEFAULT now() NOT NULL
        );`
    );
};


////////////////////////
//      clients       //
////////////////////////

const initClientsTable = async () => {
    await postgres.query(
        `CREATE TABLE IF NOT EXISTS clients(
            client_id SERIAL PRIMARY KEY,
            firm_id INTEGER REFERENCES firms(firm_id),
            name TEXT NOT NULL,
            phone NUMERIC(10) UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            service_id INTEGER REFERENCES service_types(service_id),
            pan_no TEXT UNIQUE NOT NULL,
            pan_doc TEXT,
            aadhar_no TEXT UNIQUE NOT NULL,
            aadhar_doc TEXT,
            gstin TEXT UNIQUE,
            contact_persons TEXT[],
            address TEXT,
            city_id INTEGER REFERENCES cities(city_id),
            is_active BOOLEAN DEFAULT TRUE,
            time_stamp TIMESTAMPTZ DEFAULT now() NOT NULL
        );`
    );
};


////////////////////////
//      billing       //
////////////////////////

const initBillingTable = async () => {
    await postgres.query(
        `CREATE TABLE IF NOT EXISTS billing(
            bill_id SERIAL PRIMARY KEY,
            basic NUMERIC(15, 2) NOT NULL,
            gst NUMERIC(15, 2) NOT NULL,
            total NUMERIC(15, 2) NOT NULL,
            recieved NUMERIC(15, 2) NOT NULL DEFAULT 0,
            discount NUMERIC(15, 2) NOT NULL DEFAULT 0,
            debited NUMERIC(15, 2) NOT NULL DEFAULT 0,
            tds_deduction NUMERIC(15, 2) NOT NULL DEFAULT 0,
            reimb_w_gst NUMERIC(15, 2) NOT NULL DEFAULT 0,
            reimb_wo_gst NUMERIC(15, 2) NOT NULL DEFAULT 0,
            bank_id INTEGER REFERENCES office_banks(bank_id),
            expected_payment_date TIMESTAMPTZ,
            settled_payment_date TIMESTAMPTZ,
            is_settled BOOLEAN DEFAULT FALSE,
            time_stamp TIMESTAMPTZ DEFAULT now() NOT NULL
        );`
    );
};


////////////////////////
//      tasktray      //
////////////////////////

const initTasktrayTable = async () => {
    await postgres.query(
        `CREATE TABLE IF NOT EXISTS tasktray(
            task_id SERIAL PRIMARY KEY,
            bill_id INTEGER REFERENCES billing(bill_id),
            client_id INTEGER REFERENCES clients(client_id),
            service_id INTEGER REFERENCES service_types(service_id),
            task_reviewer INTEGER REFERENCES employees(emp_id),
            all_workers TEXT[] NOT NULL,
            is_complete BOOLEAN DEFAULT FALSE,
            time_stamp TIMESTAMPTZ DEFAULT now() NOT NULL 
        );`
    );
};

////////////////////////
//       salary       //
////////////////////////

const initSalaryTable = async () => {
    await postgres.query(
        `CREATE TABLE IF NOT EXISTS salary(
            salary_id SERIAL PRIMARY KEY,
            emp_id INTEGER REFERENCES employees(emp_id),
            basic NUMERIC(15, 2) NOT NULL,
            incentives NUMERIC(15, 2) NOT NULL,
            total NUMERIC(15, 2) NOT NULL,
            month NUMERIC(2),
            year NUMERIC(4),
            is_settled BOOLEAN DEFAULT FALSE,
            time_stamp TIMESTAMPTZ DEFAULT now() NOT NULL
        );`
    );
};



/////////////////////////
//     init tables     //
/////////////////////////

const initDatabaseTables = async () => {
    try {
        /** Static Tables */
        await initStatesTable();
        await initCitiesTable();
        await initRolesTable();
        await initOfficeBankTable();
        await initServiceFrequencyTable();
        await initServiceTypesTable();

        /** Dynamic Tables */
        await initFirmsTable();
        await initEmployeesTable();
        await initClientsTable();
        await initBillingTable();
        await initTasktrayTable();
        await initSalaryTable();

        return console.log(`Updated DataBase with all necessary tables !!`);
    } catch (err) {
        console.error(err);
    }
};




module.exports = { postgres, initDatabaseTables }