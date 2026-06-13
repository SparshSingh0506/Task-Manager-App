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
* set up auth controller and validation middleware. Spent, time understanding auth and good practices.
