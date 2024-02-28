# event-manager

The Node API service for EVENT manager

## TS : node version

# code https://www.npmjs.com/package/ts-node

## Database modeling using Prisma

https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-mysql

install prisma

npm i prisma

create schema model

rum "npx prisma migrate dev --name init"

npm run studio

## Instal prisma client

npm install @prisma/client

# API SCHEMA

## create user
localhost:8000/user/
post
<code> 
{
  "name":"Shylu",
  "username": "99shylu",
  "password": "123",
  "email": "99shylu@gmail.com",
  "avatar": "http://google",
  "language" :"english",
  "phone": "9354887",
  "address": "34 methuen",
  "sex" :"male",
  "dob": "10/2/2024",
  "roleId": 2
}
</code>
