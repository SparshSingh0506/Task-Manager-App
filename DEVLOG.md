## DAY 1
* Decided to design database schema first and use Postgres SQL as task manager has natural relationship as one user -> many projects, one project -> many tasks.
  ```
  Example:

  User
  └── Bob

  Projects
  ├── Work
  └── Personal

  Work Tasks
  ├── Build API
  ├── Fix Bugs
  └── Deploy App

  Personal Tasks
  ├── Gym
  └── Buy Groceries
  ```
* Chose to use no ORM and instead write raw sql queries to "do it atleast one time". Moreover, raw sql will always be the highest performing over ORMs.

## DAY 2
* Set up auth controller and validation middleware. Spent, time understanding auth and good practices.
* Decided to go with the common scalable architecture flow: ```Route -> Middleware -> Controller -> Service -> Repository -> Database``` to keep different aspects separated, modular and responsibilities clear. (CSR pattern)

## DAY 3
* Decided to go for Zod for compact validations, preventing ifs ladder. Also, zod does not abstract concepts too much, so fits the use.
* Made register schema for zod validations and using it in the validation middleware to do an early return in case of error.
* Added zod validations & transformations of email (trim & lowercase) and user (trim), before they will later be inserted into the db.
* Separated database operations for a dedicated repositories folder, which will be managed by controller functions.

## DAY 4
* Made an auth.service.ts layer that will hash the password using bcryptjs and then call the repository layer for db operations.
* Organized interfaces in a separate folder to contain schema & dbOperation interfaces.
* Created findUserByEmail() function under the repository layer, to first check if user exists, and if they do, return an error.
* Created createUser() function under repository layer, to create new record of the user as commanded by the registerController.
  * Used typescript Pick<> utility type to return only the required user values, keeping in mind that even if in future new fields get added in schema, it does not affect what is returned

## DAY 5
* Initiated middlewares, controllers & zod schemas for login feature.
* Decided to go with jwt auth implementation for learning. Planned Flow:
  * ```Login request (email & pass) -> validate & transform -> check user exists -> hash paassword & compare -> generate jwt```
  * As per the standard jwt working ```user gets the token -> stores in cookie/local storage -> sends future requests attached with this token to be verified by server```
* Implemented request acceptance, validation & transformation middleware, check user exists & password compare. To do next - generate jwt on login.
* Since returning invalid username or password to the front end is a security risk, simply returned invalid credentials for both fields as a good practice.

## DAY 6
* Installed jwt & its TS types, and signed a jwt token that sends user id to the user.
  * This user id is what the client will send with each request, making it directly queryable to retrieve details and return.
  * How the client sends back the token will be implmented in frontend.
* Created a secret key in .env & implemented jwt signing with that key where the jwt subject is user id.

## DAY 7
* Initiated basic Authentication Middleware that will read authHeader and return 401 if header not found, meaning a resource was trying to be accessed unauthorized.
* Fetched http request's authorization header where jwt is recieved by splitting the header, as format from frontend would be: ```{"Authorization": "Bearer <token>"}```.
  * Also added basic if checks for presence of authorization header and access token.
* Made express.d.ts declaration file to let express Response type accept jwt's userId subject property.
  * Since userId is globally declared, any Response type can access userId.
* used zod to validate jwt payload and update req.userId to be passed to proceeding middlewares and services.

## DAY 8
* Decided to design projects post api end point first, the request schema should contain title only as per the schema
* Updated schema:
  * Tasks' table - Updated priority & status as enum rather than earlier column check contraint, Gain: faster queriying naturally and logical sorting than lexicographical.
  * Projects' table - Added description & updated_at field
  * User's table - Updated username as TEXT as pg parses it same as varchar(n), made email CITEXT to not ensure case sensitiveness at the repository layer for a more robust Source of truth.
* Created validation middleware for projects Post request and hooked it up along with jwt authentication middleware

## DAY 9
* Grouped register and login files & functions for: zod schemas, validation middlwares, routes, controllers and services into respective single auth files to make files less bloated.
* Created zod schema for project post request: {title, description} & ts interface for repository layer: {user_id, title, description}
* Manipulated data to fit the schema of db insertion for /projects POST route, and wrote sql query for the same.
* Most part went in restructuring code today.

## DAY 10
* Created GET api end point for /project for returning all projects' summarized list relevant for the frontend dashboard display.

## DAY 11
* Implemented DELETE api end point for /project where projectId would be provided by the url param, following the REST api convention.

## DAY 12
* Implemented GET Project by id end point, where project id is provided in url param

## DAY 13
* Began designing api end points for /tasks.
  * My initial approach was to 1. get both projectId & taskId from either url params or 2. get projectId from req.body & taskId from url Param.
  * Then it would require to first make an sql query (for fetching) to verify the projectId is associated with userId and then another query to verify taskId is associated with projectId. Both can't be done in a single query as tasks table only stores projectId & not userId and projectId only stores userId.
  * This is inefficient as for one http request, we are querying the db two times. The solution - JOINS
* Updated delete /project end point to also return deleted projects details by modifying query at repo layer to return specefic values
* Designed zod schema for POST on /projects/:projectId/tasks request body.

## DAY 14
* Refactor multiple validation middlewares for POST on /register, /login and /projects requests into a single global validateRequest() function where the respective request schema will be passed.
  * This removes redundant code for validations for different requests, and simply condenses it all into a single reusable validate-request file, that will abide by the DRY principle.
* Encapsulated spread out routes in app.ts in a single index.routes.ts file.
  * This makes app.ts less cluttered, enforces separation of concerns and makes the overall project structure more readable.
* Added versioning to each route as a good practice of keeping the app expandable and open to potential future testing.
* Updated projects & tasks zod schemas to be nullable instead of optional for some fields.
  * This is because if something like description is not available, db should be storing null and not be dealing with undefined in case of optional.

## DAY 15
* Cleaned project service and controller functions by augmenting userId type directly from the zod infertype into one single CreatePostInput type under the controller itself as a standard practice of designing backend architecture and keeping the service input clean.
  * Also implemented the similar for task service and controller functions too, keeping the structure clean and concerns written where they belong.
* Took a while to grasp the createTask query in depth, as had to deal with userId and projectId verification before inserting task.
* Chose to do both verification and insertion in a single query at the repo layer for creating task.
  * Reason - To keep one query for one request, instead of first checking if userId and projectId are matched in one query, and if valid, then performing the second query to insert task into db. (In the service layer)
  * Gain - This would reduce network calls to db for every request by half, improving performance. Also learnt a new way of inserting into table with the SELECT statement.
* Improved few past written project functions' code
* Updated post tasks zod schema from nullable to have .nullish().transform(val => val ?? null).
  * Problem - Previously having .nullable() in the zod schema explicitly required all properties to be passed as null in the json request body from the client, introducing uneccesary extra payload to travel over the bandwidth.
  * What it does - if req body property as per schema is undefined in the payload, the validation middleware transforms it to be null.
  * Gain - This allows the json request body to have undefined fields request from the client without causing zod error or disputing with the DB records that must have null while also reducing the payload size, keeping only what is necessary.
* Ran into a bug where req.params.projectId was beind read undefined (Found through hectic console logs, wish to solve such issues in debugger in the future when i learn it.)
  * Issue - had previously set up index.routes.ts that contained '/projects/:projectId' and tasks.routes.ts containing '/tasks', and trying to read url.params.projectId under /tasks caused it to not find it and hence js marking it undefined.
  * Fix - enabled mergeParams in the tasksRouter that allowed reading of parent projectId from the inner router as well.
  * Result - Succesfully tested afterwards, and the task was correctly inserted to the db.

## DAY 16
* Cleaned repository layer functions by making separate and clear variables for query and values and then passing them in db.query().
    * Gain - This improves readabilty and keeps code neater.
* Implement GET /tasks to get list of all tasks
* Removed summarizing project details in the created task details.
  * Reason - Frontend does not exist yet, so it does not make sense currently to return filtered values by default, will update as frontend in future demands.
* To do for later - work on properly throwing error in project service functions, and possible also learn to implement a global error handler as i am noticing redundant code for error try and catch.
* Uncluttered some types made eariler for user auth and made them cleaner.

## DAY 17
* Refactored some previously written code for projects service & repository, aligning it with better industry practices.
* Removed async await from service layer of projects and task.
  * Reason - Currently, service layers is just a pipe from controller to repository with not business logic yet, so extra async await is redundant, simply return the promise from repo to controller layer.
* Implemented global error handler.
  * Reason - Every controller was repeating the same error response with just different messages, so it made sense to make error handler a global middleware to pass all messages there are enforce DRY prinicple.

## DAY 18
* Cleaned error messages and made them consistent in Resource - Action - Status style.
* Decided to use two queries instead of one for getting all tasks as first validate projects existence and then access task as, Reasons:
  * In contrast againt my previous decision of using single sql query for both user and project check before retrieving tasks, having two queries allowed me to segregate the result that might come from either 1. user not having the project, 2. project not having the task or project not existing at all.
  * The single query before abstracted this and was only returning an empty array which was amiguous to decide whether it was empty due to project not existing or task not existing.
  * Also, since GET operation does not modify resources, race conditions do not occur as they might in POST, DELETE or PUT operations, which should ideally be done in one single atomic query to enforce consistent modifications.
  * Gain - This made the get all tasks query much simpler and readable as it now only validates for project.
* Cleaned up all controllers of users, projects & tasks so far that were returning their own res.status().json() in catch blocks, and moved them all to the global error handler previously created.
  * Gain - This cleaned up the code and made controllers more generic. However I am noticing that using error extending classes can give a clearer intent of the error and also my current method of throwing an object is a bad practice because of its vagueness and code redundancy.
* Implemented GET /projects/:projectId/tasks/:taskId route.
  * Choices - Between either opting for 1. both prject & task in url params or 2. only GET /tasks/:taskId and passing projectId in req.body
  * Decision - Chose the former approach as the resource route is only 4 levels deep, which I consider okay as hierarchy is clearer, although it may be messy to some. However, the later approach is also very clean as we can keep only the primary resource in the url param and pass rest of the parent resources through the req.body.

## DAY 19
* Implemented delete task by id api end point.
* Made zod error to route to global error handler.

## DAY 20
* Improved zod schema for tasks, project, and user by adding violation messages and making post schemas strict to comply with the db schema and reject incomplete or undefined fields and also adding violation messages.
* Added password min length check of 1 in login post schema.
  * Reason - to not perform unnecessary rehashing and comparing with stored password by querying the db, as it is already known that password length of min(1) is impossible
  * However, this also raises a question as to why not have the min password length check of login same as that of register?, as technically its impossible for any passwords below the register min length threshold to pass the check.
    * Reason - to prevent information disclosure by not informing the client what the minimum length should be, enforcing security. It also prevents an upgradability trap, where in case if password min length is increased in future, old users wit password length 6 can still login.
* Wrote foundational code for project patch, but the query for this one is going to be interesting as any field can be requested to be made dynamic, which must be made dynamic.

## day 21
* Designed a new zod schema for patch projects.
  * Reason - I tried making it partial from post, but fundamentally, both are different operations, so chose to have a little redundancy over clever techniques.
  * updated_at column updates at every patch query at the db level
* Implemented patch sql query for projects.
  * Approach - Zod is the firewall here of only accepting structurally correct data, that can never be empty and can not reach deeper layers. Then, once we have the updates object, we dynamically extract column names from it and inject them into sql.
  * Also, since the columns are validated before hand through zod, its fine to inject the setClause string into the raw sql query.
* Tested successfull path project api end point.

## day 22
* Encapsulated the updates extraction in patch requests function
  * Gain - This enforces the DRY principle as the same funcitonality will also be repeated for task and user patching.
* Implemented task patch api end point.