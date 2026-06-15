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

## DAY 3
* Decided to go for Zod for compact validations, preventing ifs ladder. Also, zod does not abstract concepts too much, so fits the use.
* Made register schema for zod validations and using it in the validation middleware to do an early return in case of error.
* Separated database operations for a dedicated repositories folder, which will be managed by controller functions.
