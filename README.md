# TestCraft

`TestCraft` is an online test designing and test-taking platform. It offers some advanced features including progress reports using past results.

## Technology Stack

We've chosen to use a full `JavaScript` stack that uses

- `React` in the frontend
- `Express` in the backend
- `MySQL` local server for database
- `JSX` with `Tailwind` for designing


## Installation

Make sure `git`, `node`, `npm`, and `mysql` are installed and set up in the system

- <b>Clone from GitHub Repository</b> <br>

Go to the directory you want to create the project in, open terminal, and run the following script:
```bash
git clone https://github.com/saged-sama/TestCraft.git
```
This will create a `TestCraft` project directory with all the project files

- <b>Database Setup</b> <br>

Open up `MySQL` local server in terminal and login using your credentials. Copy the path to the `testcraft.sql` file which you'll find inside `TestCraft/database/` directory. And then run:
```bash
source path/you/just/copied
```

You can also first go to `TestCraft/database/` directory, open up terminal, open and login to `MySQL` terminal, and run:
```bash
source testcraft.sql
```

- <b>Database Variables</b> <br>

Go to the `TestCraft/backend/` directory and create a new file named `.env`. Give your `MySQL` server credentials and fill in:
```python
DB_HOST = ""                     # put your MySQL server hostname
DB_USER = ""                     # put your MySQL server username
DB_PASSWORD = ""                 # put your password
DB_DATABASE = "testcraft"        # you don't need to change this
```

- <b>Backend Installation and Run</b> <br>

Open terminal in the project `TestCraft/express-backend/` directory. Run:
```bash
npm install         # install dependencies
npm start           # run backend server
```

- <b>Frontend Installation and Run</b> <br>

Open terminal in the project `TestCraft/react-frontend/` directory. Run:
```bash
npm install           # install dependencies

# either
npm run dev           # test frontend server
# or
npm run build         # build project
```

## Technology Versions

In the time of development the versions are:

- `React` `v18.2.0`
- `Express` `v4.18.1`
- `Node.js` `v21.6.1`
- `MySQL` `v8.2.0`
- `Tailwind` `v3.4.1`