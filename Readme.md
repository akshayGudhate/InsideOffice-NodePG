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
        - __Controllers__

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


###### * __root ->> src ->> uploads :__
>  All the files and images uploded by the end user will be stored here on the server like profile images.




## **Thanks for reading, have a great day ahead.... !**
# **--------------------: InsideOffice Backend :--------------------** 
> --------------------------------------------------------------------------------------------- Coded and Documented:  __*-- Akshay S. Gudhate.*__
