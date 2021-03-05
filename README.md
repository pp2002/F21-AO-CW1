# F21-AO-CW1 - Patient Information System using NodeJS and MongoDB Cloud

This project is a simulation of a patient information system. It contains 3 modules, namely User Authentication, Patient Registrations and Ward Admissions.

# To run the project

1. Go to `.env` file and update the secret key.
2. Go to project root folder `patient-info-system >` and run below commands

```
> npm install
> npm init
> npm start
```

All required packages are included within the package.json file. However, if the application throws errors related to the packages, then issue the following commands:

```
> npm i express & npm i nodemon -D
> npm i dotenv
> npm i mongoose
> npm i @hapi/joi
> npm i bcrypt
> npm i jsonwebtoken
> npm start
```

# MongoDB Cloud

A MongoDB Cloud account is required for access to the database and it's collections.

# Pre-requisites

1. Node JS v12.16.1 or above.
2. Any code editor
3. Postman (All endpoints can be accessed using Postman)
4. MongoDB account (to access MongoDB Cloud)

