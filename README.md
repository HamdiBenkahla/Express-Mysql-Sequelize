# NodeJS-assessment

### Built With

This projetct is build in JavaScript for NodeJS and these main npm modules :

-   [Express](https://expressjs.com/)
-   [Mysql](https://www.mysql.com/)
-   [Sequelize](https://sequelize.org/)
-   [Passport.js](http://www.passportjs.org/)
-   [swagger](https://swagger.io/)

<!-- GETTING STARTED -->

## Getting Started

To run Foleon app webservice Provider you will need NodeJS 14.0+ and npm Package manager

### Prerequisites

For development, you will only need Node.js and a node global package.

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/HamdiBenkahla/NodeJS-assessment
    ```
2. ```sh
   cd <project_name>
   npm install
   ```

````

3. Edit .env file with the right properties

npm start 
````

or

```sh
npm run dev
```

For client side app you will need Angular and npm Package manager

1. ```sh
   cd <project_name>
   cd frontApp
   npm install
   ```
   2. ```sh
   ng s
   ```

<!-- USAGE EXAMPLES -->

## Usage

After you run the project, you can navigate to [https://localhost:3000/docs](http://localhost:3000/docs) to see the full list of available endpoints.

## Project Structure

The folder structure of this app is explained below:

| Name             | Description                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| **node_modules** | Contains all npm dependencies                                                                   |
| **helper**       | Contains response handler                                                                       |                                   
| **controllers**  | Controllers define functions to serve various express routes.                                   |
| **routes**       | Contain all express routes, separated by module/area of application .                           |
| **middleware**   | Express middlewares which process the incoming requests before handling them down to the routes |
| **routes**       | Contain all express routes, separated by module/area of application                             |
| index.js         | Entry point to express app                                                                      |
| package.json     | Contains npm dependencies as well as the scripts                                                |
| models           | Contains all database schemas                                                                   |
| test             | Contains QA tests                                                                               |
| frontApp         | Contains frontend app                                                                           |
