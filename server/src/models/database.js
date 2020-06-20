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
    const statesDataFile = process.env.CSV_STATES;
    await postgres.query(
        `CREATE TABLE IF NOT EXISTS states(
            state_id SERIAL PRIMARY KEY,
            name TEXT NOT NULL
        );`
    );

    const isStateDataPresent = (await postgres.query(`SELECT COUNT (*) FROM states`)).rows[0].count;

    if (isStateDataPresent == 0) {
        await postgres.query(
            `COPY states(state_id, name)
             FROM '${statesDataFile}'
             DELIMITER ',' CSV HEADER;`
        );
    }
};


////////////////////////
//       cities       //
////////////////////////

const initCitiesTable = async () => {
    const citiesDataFile = process.env.CSV_CITIES;
    await postgres.query(
        `CREATE TABLE IF NOT EXISTS cities(
            city_id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            state_id INTEGER REFERENCES states(state_id)
        );`
    );

    const isCityDataPresent = (await postgres.query(`SELECT COUNT (*) FROM cities`)).rows[0].count;

    if (isCityDataPresent == 0) {
        await postgres.query(
            `COPY cities(city_id, name, state_id)
             FROM '${citiesDataFile}'
             DELIMITER ',' CSV HEADER;`
        );
    }
};


////////////////////////
//       roles        //
////////////////////////

const initRolesTable = async () => {
    const rolesDataFile = process.env.CSV_ROLES;
    await postgres.query(
        `CREATE TABLE IF NOT EXISTS roles(
            role_id SERIAL PRIMARY KEY,
            name TEXT NOT NULL
        );`
    );

    const isRoleDataPresent = (await postgres.query(`SELECT COUNT (*) FROM roles`)).rows[0].count;

    if (isRoleDataPresent == 0) {
        await postgres.query(
            `COPY roles(role_id, name)
             FROM '${rolesDataFile}'
             DELIMITER ',' CSV HEADER;`
        );
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
        await postgres.query(
            `COPY service_frequency(frequency_id, name)
             FROM '${serviceFrequencyDataFile}'
             DELIMITER ',' CSV HEADER;`
        );
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
        await postgres.query(
            `COPY service_types(service_id, name, frequency_id)
             FROM '${serviceTypesDataFile}'
             DELIMITER ',' CSV HEADER;`
        );
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

    // /** insert my details as a default first row */
    // return postgres.query(
    //     `INSERT INTO firms(name, owner, phone, email, city_id)
    //      VALUES ('InsideAnything', 'Akshay Gudhate', 9561214185, 'akshay.gudhate@yahoo.com', 373)
    //      ON CONFLICT DO NOTHING;`
    // );
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
            inct_factor NUMERIC(2) NOT NULL,
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
            main_worker INTEGER REFERENCES employees(emp_id),
            all_workers INTEGER[] NOT NULL,
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
        console.log(err);
    }
};



module.exports = { postgres, initDatabaseTables }