
# Employees Management

Employees Managemente is a fullstack NodeJS  project developed with Typescript as language, implementing library as ReactJS and AntDesign for build the Dashboard. For backend, Hono, TypeORM, TSyringe and Jest.

> [!TIP]
> To work with this repo, I recommend using **Node v.20 LTS** or higher.

# Backend
This service was designed having in mind the good practices in software architectures, targeting to get a clean code and a manintanble code, asserting having software adapted to receive constants changes without break all to restart again.

Concepts as Design Patterns, Solid Principles, Layer Architectures, Driven Design Development (DDD) and Test driven development (tdd) were blend togethers and using the power of Object Oriented Programming which Typescript has to offer us here we get the output.

Another highlighiable trait is the use of TSyinge, what is a great and light library to implement the Hollywood Principle: "**Don’t call us, we’ll call you**". Working with Inversion of Control combined with Dependency Inyection, its a strong foundation.

***How to run:***
```sh
git clone https://github.com/JoseAlejandroRR/fullstack-nodejs-project #clonning repo
cd ./fullstack-assessment/employees-api
npm install #install dependencies
npm run dev #start server
```
> [!NOTE]
> dont forget configure your .env file.

***NPM Scripts ***
```sh
npm run dev #start a local server without code transpilation and with hot reload 
npm run build # compile for production
npm run start # run the server in production mode
npm run typeorm # typerorm cli interactions
npm run migration:generate path/to/name_file # generate new files for db changes
npm run migration:run # execute the db transactions
npm run migration:rollback # restore to back db state
npm run seed:create # create files to seed tables in db
npm run seed:run # execute seeders to fill with simulated data your db
npm run test # run the unit tests with jest
```

------------
### Entities Model
![Entities Design Model](https://github.com/JoseAlejandroRR/fullstack-nodejs-project/blob/main/resources/entities-model-design.png?raw=true "Entities Design Model")

------------


### Test-driven development:
Using jest as testing library to run unit tests taking advantages of features abstractions present in the project. Once jest finalize the execution, you will be able to see the reports generated at **/tdd-reports**** folder, orjust navigate at browser.

------------


**Jest Stare:** [http://localhost:8787/tdd-reports/jest-stare/](http://localhost:8787/tdd-reports/jest-stare/)


![Jest Stare](https://github.com/JoseAlejandroRR/fullstack-nodejs-project/blob/main/resources/jest-stare-report.png?raw=true "Jest Stare")


------------



**Code Coverage: ** [http://localhost:8787/tdd-reports/coverage/lcov-report/](http://localhost:8787/tdd-reports/coverage/lcov-report/)

![Jest Report](https://github.com/JoseAlejandroRR/fullstack-nodejs-project/blob/main/resources/jest-code-coverage-report.png?raw=true "Jest Report")


------------

### Swagger Documentation:
The best software documentation its what actually exists, because its not offen count with it in our daily works. For that, I like to document RESTful services to help the development and testing cycles, being utils for backend and frontend developers, as for Manual or Automation QA Testers. After run the server, your only have to get into to [http://localhost:8787/swagger](http://localhost:8787/swagger "http://localhost:8787/swagger")


![Swagger](https://github.com/JoseAlejandroRR/fullstack-nodejs-project/blob/main/resources/swagger-documentation.png?raw=true "Swagger")

------------


# Frontend
For this Dashboard, I chose [Vite](https://vite.dev/ "Vite") as builder app for many reasons, but mostly for the fastest transpiler and the fast hot reload, what working with React its so helpful, and setting Typescript as develop code too.

This client does uses of new React Hooks concepts for react apps.

```sh
git clone https://github.com/JoseAlejandroRR/fullstack-nodejs-project # skip if you did it already
cd ./fullstack-assessment/employees-dashboard
npm install
npm run dev # run client app for dev mode
npm run build # transpile and compile to production files
```
> [!IMPORTANT]
> Again, dont' forget the .env file to get access to the backend endpoints.


![Dashboard React Client](https://github.com/JoseAlejandroRR/fullstack-nodejs-project/blob/main/resources/dashboard-react-client.png?raw=true "Dashboard React Client")


### Bonus Track

Backend and Client are doted with Authentication Security using JWT Token, what are disable by default, but you wish active, only have to do this:

```sh
AUTH_LAYER_ACTIVE=true # /employees-api/.env for API
VITE_AUTH_LAYER_ACTIVE=false # /employees-dashboard/.env for client
```
------------


## # Automation Tests (EXTRA BONUS)
Just for fun, and to show how much I am confident about how much matter the testing stage, I added a playwright project to execute End2End tests and verify the basic behavior at the whole project integrated already.

```sh
npx playwright install
npx -y playwright install --with-deps
npm install
npm run test 
```
> [!NOTE]
> pay attention in the HOST variable at package.json to call npm run test.

![Playwright Report](https://github.com/JoseAlejandroRR/fullstack-nodejs-project/blob/main/resources/playwright-report.png?raw=true "Playwright Report")

------------

## Deploying with Docker

In case you just wanna play with the project or you wish deploy in a Cloud using container apps, you cant with it. Each folder contains a Dockerfile, what you can use to build the image, or if you just want execute all togethers using Docker as orquester to, just run:
 
 ```sh
docker compose up --build # OR
docker-compose up --build # depends about your docker version
```

> [!IMPORTANT]
> Keep in mind to update the frontend .env file to use internal container host instead of your machine.

![Dcoker Deploy](https://github.com/JoseAlejandroRR/fullstack-nodejs-project/blob/main/resources/docker-deploy.png?raw=true "Dcoker Deploy")
