# **--------------------: Inside Office :--------------------** 
> *This is inhouse NPAV project for the internal NPAV users for their daily activities like: __In/Out, Breaks/Leaves, SalesBoard, HelpingLinks, PaymentLinks__. Completely written in __Node.JS__ for backend and __ejs__ for view.*  


## _Overview to Project:_


### Folder structure:

* __vscode__   

> VScode configurations like: node debuging and live server.

* __node modules__  
> Node packages and downloaded modules from npm.

* __src__           
> Contains all the code written regarding the application logic.

    - __api__              
    > All the api related logics and the routes.

        - __payment_link__
        - __Routes__

    - __models__           
    > All the models and DataBase queries for the perticular routes.
        - __static-dataFiles__

    - __public__           
    > ALl the public data like  \- css images, scripts, docs and views.
        - __css__
        - __images__
        - __scripts__
        - __views__

    - __uploads__          
    > All the files and images uploded by the end user.

    - __dbConnection__     
    > Connection to the postgres DB using pool.

    - __passport-config__  
    > Logic regarding the login using passport-local strategy.

* __.env__          
> Contains all the enviromental variables.

* __aceess.log__    
> Logs for the apllication ( incoming & outgoing requests to the server - including failed requests ).

* __API colctn__    
> Contains all the neccessary API's for the aplication import file to postman and ready to use API's.

* __app.js__        
> Sstarting off the server and contains the base logic and for the server ( declaration and connection of server ).

* __package.json__  
> Main file of application contains all the basic details like used packages, scripts, name, description about the project.

* __pkg-lock.json__ 
> Automatiaclly created file for the packages versions and the their details.

* __Redme.md__      
> All the information about the project before starting the work on project.  


## _Working flow of Project:_

1. Server starts from the *app.js* file here all the neccessary modules and packages are declared.

2. It will connnect with all the modules and creates tables by connecting to DB if they are already presents.

3. And will serve to the PORT declared in the .env file.

4. Database connection is done by *src ->> dbConnection.js* and after that *src ->> models ->> database.js*.

5. Then it will creates the table automatically if they are not exist

6. Then puts the static data into it from *src ->> models ->> static-DataFiles ->> FILES* and ready to serve static data.

7. If any request comes to the server on a perticular route like:  __*/xxxxxxx*__ .

8. It will check the route its baseURL/xxxxxxx or baseURL/api/xxxxxxx. if it's like: __*/*__ .

9. Then serves data from *src ->> api ->> authRouter* and _/api_ it will serve the data from the logic of *src ->> api ->> FILES ->> route*.

10. Let's say request comes to *baseURL/api/getStateList* for the all the lists of states then

    - Request comes to the server app.js URL contains /api/ so routes to *src ->> api ->> apiRouter ->> stateCityRouter*

    - From the file *stateCityRouter.js* goes to */getStateList* and serves the logic.

    - Logic will connects with the *src ->> models ->> stateQueries.js* and will query the DB and gets the states list.

    - If states found then server will respond with json response of states or will send error.

11. As per the above mentioned flow server will serves the incoming request with json response.  


## _Details of Project:_


### Files & their functioning:

#### * __root :__
>  Root directory of the application, contains all code.

- __app.js :__
    * Imported all the necessary modules and the packages.
    * Started building the server here by using the modules.
    * Setting up : view-engine, body-parser, compression, helmet, flash, session, passport and database before starting the server.
    * Initializing the DB tables and then serving on given PORT.
    * And now we can actually starts the serving the incoming requests.



##### * __root ->> src :__
>  Source code directory of the apllication.

- __dbConnection.js :__
    * It is using postgress pool and connecting to the DB.
- __passport-config.js :__
    * Login and authentication of the user. Sereilize and Deserializing the user with localStrategy of passport.



###### * __root ->> src ->> api :__
>  API's regarding the apllication - core logic.

-  __root ->> src ->> api ->> payment_link :__
    >  Payment links regarding all the stuff like: api routes as well as queries.

    * __payment_linksQueries :__
        - Payment Links Model & necessary queries regarding payment links.
    * __payment_linksRouter :__
        - Handling api routes for payment_links
            1. _/api/searchPurchaser:_
                * Route for the searching the existing purchaser(customer/dealer) and returns purchaser details.
            2. _/api/addPurchaser:_
                * Route for the adding new purchaser(customer/dealer) to the records and will returns new purchaser details.
            3. _/api/generatePaymentLink:_
                * Route for the payment_link generations:
                    - takes input details from the ASM for the new order.
                    - creates RazorPay link and saves to DB
                    - creates buynpav link for the same transaction.
                    - sends link to the purchaser on registered whatsApp no.
                    - share the short_url link of transactions to ASM so that he can forward to purchaser.
            4. _/api/paymentStatus:_
                * Route for the payment_link status checking:
                    - takes the payments_link_id and checks the status.
                    - if not paid returns without doing anything.
                    - if status is paid then sends the keys to the user via whatsapp and email with fixed templates.
                    - if its already sent then only message and email will be sent again with the same keys.
                    - if in process there is error then SMS will be send to Aditya's mobile no.
            5. _/api/orderStatusList:_
                * Route for the payment_link order status list for ASM's.
                    - will send the list of all the orders with their status to ASM.

-  __root ->> src ->> api ->> Routes :__
    >  Here api routes related to mobile app has been handled as per their catagory.

    * __authRouter.js :__
        - Routes for the authentication and login for mobile app
            1. _/api/mobileOtp_ : sends otp to the phone no provided
            2. _/api/loginMobile_ : validates the otp provided by user and returns user details
    * __employeeRolesRouter :__
        - Routes for the employee role related
            1. _/api/getEmployeeRoleList_ : returns the list of all the employee roles
            2. _/api/getEmployeeRole_ : returns single employee role on provide role_id
            3. _/api/getLeavesNosForEmployeeRole_ : returns allowed leaves for employee role on provide role_id
    * __employeeRouter :__
        - Routes for the all employee related stuffs
            1. _/api/getEmployeeList_ : returns the list of all the NPAV employees
            2. _/api/getEmployee_ : returns the single employee details
            3. _/api/registerEmployee_ : add the new employee to db
            4. _/api/editEmployee_ : edit the existing employee
            5. _/api/editProfileImage_ : change or edits the profile image
            6. _/api/deactivateEmployee_ : deactivates the employee provided emp_id (keeps record in db)
            7. _/api/updateDeviceToken_ : updates the device token of employee
            8. _/api/getDeviceToken_ : fetch device token of the employee
            9. _/api/addEmployeePoints_ : add the employee points to the previous points
            10. _/api/getEmployeePoints_ : fetch the employee points if record not presents creates one with 0 points
    * __employeeShiftsRouter :__
        - Routes for the employee timing shifts
            1. _/api/getEmployeeShiftList_ : returns the list of all the employee shifts timings
            2. _/api/getEmployeeShift_ : returns the single employee shift timing
    * __helpingLinksRouter :__
        - Routes for the helping links for employees as per roles
            1. _/api/getLinkList_ : returns the list of all the helping links
            2. _/api/getSingleLink_ : returns the single helping link
            3. _/api/searchLinkByName_ : search the helping link matching as provided the name string
            4. _/api/getRoleWiseLink_ : returns the list of helping links for provided role
    * __leaveRouter :__
        - Routes for the employee leaves and lbe
            1. _/api/getLeaveList_ : returns the list of all the leaves
            2. _/api/getLBEList_ : returns the list of all the lbe
            3. _/api/getPendingLeavesForAdmin_ : returns all pending leaves for the admin
            4. _/api/getPendingLBEsForHOD_ : returns all the pending lbe for the hods
            5. _/api/getPendingLeavesForHOD_ : returns all the pending leaves for the hods
            6. _/api/getEmployeeLeaves_ : returns list of leaves of emplyee
            7. _/api/getEmployeeLBE_ : returns list of lbe of emplyee
            8. _/api/createLeave_ : add new leave or lbe
            9. _/api/leaveApproval_ : approval for the leaves
            10. _/api/deleteLeave_ : delete leaves and lbe with given id
            11. _/api/getHolidaysList_ : list of holidays
    * __monthlyReportRouter :__
        - NOT IN USE - Routes for the monthaly reports of the employee
            1. _/api/getReportList_ : returns the list of all the employee reports (dialy)
            2. _/api/getReport_ : returns single report of the employee
            3. _/api/createDailyReport_ : add new report to the db
            4. _/api/showMonthlyReport_ : returnd the monthly report
    * __officeRouter :__
        - Routes for the NPAV offices
            1. _/api/getOfficeList_ : returns the list of all the NPAV offices
            2. _/api/getOffice_ : returns  single NPAV office with provided id
    * __productRouter :__
        - Routes for the NPAV products
            1. _/api/getProductList_ : returns the list of all the NPAV products
            2. _/api/getProduct_ : returns the single product as provided id
            3. _/api/getDealersList_ : returns the list of all the NPAV associated dealers
            4. _/api/getDealer_ : returns the single dealer as provided id
            5. _/api/getDealerFromQuery_ : searches the dealer from name, phone or city
    * __punchTimingRouter :__
        - Routes for the punching related things
            1. _/api/getPunchTimingRecordList_ : returns the list of all the employee punching
            2. _/api/getEmployeePunchTimingRecord_ : returns the single punching record of given id
            3. _/api/createEmployeePunchTimingRecord_ : adds new record to the db
            4. _/api/getEmployeeWorkHours_ : calculates employee worked hours and returns
            5. _/api/showHourlyReport_ : returns hourly report of the employee( timesheet )
    * __punchTypesRouter :__
        - Routes for the punch types
            1. _/api/getPunchTypesList_ : returns the list of all the punch types
            2. _/api/getPunchType_ : returns the single product as punch type
    * __saleTypeRouter :__
        - Routes for the sale types
            1. _/api/getSaleTypeList_ : returns the list of all the sale types
            2. _/api/getSaleType_ : returns the single product as sale type
    * __scoreRouter :__
        - Routes for the scoring related stuff for Purchase Order (PO)
            1. _/api/getScoreList_ : returns the list of all the employee scores (PO)
            2. _/api/getPendingScoreList_ : returns the all the pending scores (PO) for admin
            3. _/api/getDailyScore_ : returns employee daily score
            4. _/api/getDailyQuantity_ : returns employee daily quantity (PO)
            5. _/api/getDailyQuantityForTwoGraphs_ : returns employee daily quantity (PO + PL)
            6. _/api/getEmployeeScore_ : returns employee score
            7. _/api/createScore_ : adds new score to the db for (PO)
            8. _/api/editScore_ : can edit the PO or score
            9. _/api/scoreApprovalMobile_ : NOT IN USE - score approval from mobile
            10. _/api/getDateScore_ : get employee score for the perticular date
    * __stateCityRouter :__
        - Routes for the states and cities of india
            1. _/api/getStateList_ : returns the list of all the states
            2. _/api/getState_ : returns single state from given id
            3. _/api/getStateCityList_ : returns the list of all the cities of the state
            4. _/api/getCitiesList : returns the list of all the cities of india
            5. _/api/getCity : returns single city as provided id

- __apiRouter.js :__
    * Incoming request under 'baseURL/api' is transferd to handled the specific api routes.

- __authRouter.js :__
    * Incoming request under 'baseURL/' is handled here for the web-app.
        1. _isLoggedIn_ : middleware for checking the user is loggedIn
        2. _isNotLoggedIn_ : middleware for checking the user is loggedOut
        3. _/_ : get request for serving the index file and default view
        4. _/otp_ : get request otp view
        5. _/otp_ : post request after entering the otp validating otp
        6. _/login_ : get request for login view
        7. _/login_ : post request after login validating credentials
        8. _/logout_ : delete request for admin logout
        9. _/registerAdmin_ : get request for admin registration view
        10. _/registerAdmin_ : post request add admin details to db
        11. _/pendingScoreList_ : get request view for admin for pendings score to approve
        12. _/scoreApproval_ : post request approves or disapproves the score
        13. _/addHelpLink_ : get request for view of adding helping links
        14. _/addHelpLink_ : post request add liks to the db
        15. _/helping_link/:shortKey_ : get request redirect view to the actual link and clickedCounter increment
        16. _/payment_link/:paymentLinkID_ : get request redirect view to the actual razor pay link for payments
        17. _/monthlyDashboard_ : NOT IN USE - get request for monthly dashboard view
        18. _/privacyPolicy_ : get request for privacy policy static view
        19. _/aboutUs_ : get request for about us static view

- __helpingFunctions.js :__
    * Helping functions for the api's handled here to reduce the api complexity
        1. _addAwardedPoints:_
            - finds the employee depth.
            - finds the employee childrens and ancestors.
            - defines employee heirarchy and their points.
            - makes tuple of employees and their points.
            - returns heirarchy array with tuples.
        2. _getVacationData:_
            - calculates employee vaction data.
            - returns the vacation data in hours.
        1. _leaveData:_
            - checks the company leaves which are granted.
            - checks the leaves taken by the employee.
            - returns the count of leaves taken and remaining in days.
        2. _calculateScore:_
            - takes the inputs like: quantity, sale_type, product.
            - calculates the score of the order.
            - returns the score.

- __multer_local_storage.js :__
    * Image and files uploding using the multer package.
        1. Defines the type which file will accept.
        2. Defines the local storage where to save the file. ( i.e. uploads directory ).



###### * __root ->> src ->> models :__
>  Models for application and BD related stuff.


-  __root ->> src ->> models ->> static-dataFiles :__
    >  Static data files are stored here and used while creating new tables.

    * __All .CSV Files :__ 
        - cities,eployee_roles, employee_shifts, holidays, offices, products, punch_types, sale_type, states : contains the neccessary static data for the application.

- __cityQueries.js :__
    * City Model & necessary queries regarding all india cities.
        - getSingleCity : returns single city.
        - getAllCities : returns list of all cities of India.
        - getCitiesFromState : return all city as per the state provided.
- __database.js :__
    * Main database Model which makes DB ready to serve the data.
    * All the static, dynamic and payment_Links related tables are created.
        - static tables
            1. initStatesTable : states of india table
            2. initCitiesTable : cities of indian table
            3. initProductsTable : NPAV products tabble
            4. initSaleTypeTable : general sale types table like primary, secondary etc.
            5. initEmployeeRolesTable : roles of the employees like admin, ASM etc.
            6. initEmployeeShiftsTable : defined shifts for the empoyees like 10-8, 9:30-7 etc.
            7. initPunchTypeTable : punch types defined like timesheet, breaks etc.
            8. initOfficesTable : NPAV office list table
            9. initHolidayTable : NPAV yearly holidays decided list
            10. initDealersTable : NPAV dealers list table
        - dynamic tables
            1. initEmployeesTable : NPAV employees table
            2. initLeavesTable : leaves taken table
            3. initOTPTable : OTP for login table
            4. initPunchTimingTable : punching done by the employee table
            5. initScoringTable : scores stored after the sale is done
            6. initEmployeePointsTable : after successfully approval or payments employee points added here.
            7. initMonthlyReportTable : monthly reports for the employee
            8. initHelpingLinksTable : links for internal help or the any new data needed to share
            9. initDeleteOldOtpsFunction : function for deleteting old otps than 1 day
            10. initDeleteOldOtpsTrigger : triggers dleteing OTP function after any new insert in the OTP table
        - payment_link tables
            1. initPaymentLinkPurchasersTable : purchasers for payment links
            2. initPaymentLinksTable : payment link table
            3. initPaymentLinkDetails : view of the payment link details table
            4. initActivationKeysTable : activation keys of the product table
            5. initDispenceKeyFunction : despence the A.Key as per need table
        - table initations
    * And primary data will be inserted as needed ( one time data ).
    * If already presents then will pass controll to *app.js* to start the server.
- __employeeQueries.js :__
    * Employee Model & necessary queries regarding employees, otp & points of employee.
        1. getPhoneByID : returns phone no by emp_id
        2. isActiveEmployee : checks weather employee is active
        3. isEmployeeHOD : checks weather current employee is hod or not
        4. sendEmployeeBasicData : send employee basic data as in db
        5. isPhoneNoExist : checks weather phone no is exist
        6. getAllEmployees : returns list of all the employees
        7. getSingleEmployee : returns single employee as provided emp_id
        8. registerEmployee : save new employee tio db
        9. editEmployee : edit the employee as provide inputs
        10. deleteEmployee : delete the employee as provided emp_id
        11. deactivateEmployee : deactivates the employee but does not delete record
        12. saveOTP : saves the otp for phone no
        13. getOTP : fetches the OTP as providedd phone no
        14. updateDeviceToken : NOT IN USE - device token updatation
        15. getDeviceToken : NOT IN USE - fetch device token of employee
        16. editProfileImage : edits profile image of the employee
        17. findEmployeesOfHOD : returns employees under the given hod(emp_id)
        18. findHOD : returns the hod of the given employee
        19. insertPoints : inserts the points scored after the score
        20. setPoints : updates the new points (adds to previous)
        21. getPoints : returns the points of employee
- __employeeRolesQueries.js :__
    * Employee Roles Model & necessary queries regarding role of employee.
        1. getSingleEmployeeRole : returns single role as provided id like admin for 1
        2. getAllEmployeeRoles : list of all employee roles
        3. getLeavesNosForEmployeeRole : levaves allowed for the perticular employee role

- __employeeShiftsQueries.js :__
    * Employee Shifts Model & necessary queries regarding shift of employee.
        1. getSingleEmployeeShift : returns single shift as provided id
        2. getAllEmployeeShifts : list of all employee shifts
- __helpingLinksQueries.js :__
    * Helping Links Model & necessary queries regarding helping links which is regarding NPAV docs and all.
        1. getAllLinks : list of all the helping links available
        2. getSingleLink : sinle helping link as provide id
        3. searchLink : search the perticular links as per the name
        4. getRoleWiseLinks : links as per the employee role are given
        5. addHelpingLink : add the new link to db
        6. setClickedCounter : increments the counter if the link accessed
- __leaveQueries.js :__
    * Leave Model & necessary queries regarding employee leaves and its approvals from hod.
        1. isLeaveExist : checks weather leave is there with that id
        2. getAllLeaves : list of all leaves
        3. getAllLBEs : list of all LBE(lateIn, Break, earlyOut)
        4. getPendingLeavesForAdmin : list of all pendingLeaves
        5. getPendingLeavesForHOD : list of all pendingLeaves realted to his employee for hod
        6. getPendingLBEsForHOD : list of all LBE realted to his employee for hod
        7. getEmployeeLeave : returns perticular employee leaves
        8. getEmployeeLBE : returns perticular employee LBE
        9. createLeave : add new leave, lbe
        10. approveLeave : aproove the leave with id
        11. disapproveLeave : disaproove the leave with id
        12. deleteLeave : delets the leave as provided id
        13. getHolidaysList : list of all the holidays of NPAV
        14. getApprovedEmployeeLeaves : returns all the employees leaves which are approved
- __monthlyReportQueries.js :__
    * NOT IN USE - Monthly Report Model & necessary queries regarding all the monthly reports and the data of employee.
        1. isReportExist : checks weather report is present for id
        2. isReportExistOnDate :  checks weather report is present for id on given date
        3. getAllMonthlyReports : returns list of all the records monthly
        4. getSingleReport : returns single report as provided id
        5. getAllReports : returns list of all the records daily
        6. createDailyReport : creates daily  report
        7. updateDailyReport : updates daily report
- __officesQueries.js :__
    * Offices Model & necessary queries regarding NPAV offices.
        1. getSingleOffice : returns single NPAV office as per id
        2. getAllOffices : returns list of NPAV offices
- __productQueries.js :__
    * Product and Dealers Model & necessary queries regarding NPAV products and dealers.
        1. getSingleProduct : returns single NPAV product as per id 
        2. getAllProducts : returns list of products
        3. getSingleDealer : returns single dealer as per id
        4. getAllDealers : returns list of all the dealers associates with NPAV
        5. getDealersFromQuery : returns single list of dealers matching with input string
- __punchTimingQueries.js :__
    * Punch Timing Model & necessary queries regarding punching like : In/Out, LBE and Timesheet.
        1. isPunchRecordExist : checks weather punching exists with that id
        2. isPunchTypeRecordExist : is already that type of punching done
        3. isPunchRecordExistOnDate : is already that type of punching done on perticular date
        4. getAllPunchTimingRecords : returns list of all the punching records
        5. getEmployeePunchTimingRecord : returns all the punching records for the employee
        6. createPunchTimingRecord : adds new punching record
        7. getEmployeeInOutData : returns employees in and out records
        8. getEmployeePersonalBreakData : returns employee personal breaks record
        9. getEmployeeMonthlyTimingReport : evaluates employees mothly timing
        10. deleteRecord : deletes the punchig record
        11. showHourlyReport : returns list of hourly report
- __punchTypesQueries.js :__
    * Punch Types Model & necessary queries regarding punching types.
        1. getSinglePunchType : returns single punch type record as per id
        2. getAllPunchTypes : returns list of all punch types
- __saleTypeQueries.js :__
    * Sale Type Model & necessary queries regarding sale types like: primary, secondary.
        1. getSingleSaleType : returns single sale type as per id
        2. getAllSaleType : returns list of all sale types
- __scoringQueries.js :__
    * Scoring Model & necessary queries regarding score after the sale of an employee.
        1. isScoreExist : cheaks weather score is exist
        2. getAllScores : returns list of all scores
        3. getPendingScores : returns list of all pending scores
        4. getDailyScore : returns sum up of daily score for employee
        5. getDailyQuantityFromScore : returns total quantity sale in day for employee
        6. getDateScore :  returns score on that day for employee
        7. getEmployeeScore : returns score of the employee
        8. getEmployeePendingScore : list of all pending scores of the employee
        9. createScore : add new score to db
        10. editScore : update or edit the score
        11. approveScore : approvs the score
        12. disapproveScore : disapprovs the score
        13. deleteScore : deletes the score as per id
- __stateQueries.js :__
    * State Model & necessary queries regarding all states in India.
        1. getAllStates : returns list of all states
        2. getSingleState : returns single state as per id


###### * __root ->> src ->> uploads :__
>  All the files and images uploded by the end user will be stored here on the server like profile images.




## **Thanks for reading, have a great day ahead.... !**
# **--------------------: InsideOffice Backend :--------------------** 
> --------------------------------------------------------------------------------------------- Coded and Documented:  __*-- Akshay S. Gudhate.*__
