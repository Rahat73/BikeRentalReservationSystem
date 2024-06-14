# Bike rental service for tourists or locals.

The Bike Rental Reservation System Backend is a server-side application for effectively managing bike rentals. It is built with TypeScript, Express.js, and MongoDB via Mongoose and supports user registration and authentication, as well as role-based access, bike management (CRUD operations), and booking management. Zod ensures data validation, while robust error handling handles validation and database errors. Secure password hashing and JWT-based authentication safeguard user data and enable effective session management.

## Live Link : https://bike-rental-reservation-system-backend-seven.vercel.app/

## Technology Stack:

- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **ODM & Validation Library**: Zod, Mongoose for MongoDB

## Set up the application locally:

- Clone the git repository
- Go to the file directory
- Create an .env file and add the following variables

```
PORT --> which port you want the server to run
DATABASE_URL --> Your MongoDB connection URL
BCRYPT_SALT_ROUNDS --> eg. 10
JWT_ACCESS_SECRET --> Provide a secret for JWT
JWT_ACCESS_EXPIRES_IN --> Provide token expiration duration eg. 10d
```

- Run Command `npm install` to install required modules
- Run command `npm run start:dev` to start the server

Now the application is ready to run locally
