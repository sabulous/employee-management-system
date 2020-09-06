# employee-management-system

**employee-management-system** is a **Loopback.js 4** project with **TypeScript** and **PostgreSQL**. It can be used to manage a company's employees, departments, office locations etc.

## Setting up the project

1. Make sure you have got [PostgreSQL v12.4](https://formulae.brew.sh/formula/postgresql) database system installed using [Homebrew](https://brew.sh/).

```bash
brew install postgresql@12
```

2. Do not forget to specify the port number on which the PostgreSQL server will listen. By default, PostgreSQL uses port number `5432`.

3. Run PostgreSQL and create a database with the following details:

```bash
name: 'emsdb'
owner: 'muhammedsabrisahin'
```

4. Make sure you have got the package manager [npm](https://www.npmjs.com/get-npm) installed.

5. Install dependencies for employee-management-system.

```bash
npm install
```

6. Run database migration script to create schemas in the database according to the models in the project.

```bash
npm run migrate
```

7. Start the project

```bash
npm start
```

## Running tests

Execute following command to run the tests:

```bash
npm run test
```
