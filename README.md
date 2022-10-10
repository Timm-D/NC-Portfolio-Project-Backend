# NorthCoders Backend Project 

Solo project for the backend block of the Northcoders remote software development bootcamp

## Overview 

This repository contains the files required in order to create a database and postgres based API for a website dedicated to reviewing boardgames. 

### Files included: 
1. Data (test/development)
2. API utlizing express.js in the format of MVC
3. Test suites running jest / supertest for endpoints and functions 
4. seed files in order to create a PSQL database 

## Local Developer Access 

1. Fork and then clone repo

    eg. git clone https://**insert repo link here**

2. install npm dependencies 

    <br /> npm install    
    <br /> npm init -y 


3. Create .env files in the root directory 

    <br /> touch .env.test
    <br /> touch .env.development 
 

4. Populate .env files with database names 

    (db names can be found in /db/setup.sql)
    <br />.env.test should contain: PGDATABASE=nc_games_test;
    <br />.env.development should contain: PGDATABASE=nc_games;


5. Seed local databases 

    (script can be found in package.json)
    npm run setupt-dbs

6. Run testing suites

    npm test 






