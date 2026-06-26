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