
## create user
localhost:8000/user/
- post
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

# Login
## localhost:8000/auth   : Post
<code>
{"username": "99shylu",
"password": "123456"}
</code>


# Delete user
## localhost:8000/user/4 : DELETE
<code>
No Body
</code>


# Refresh token 
## localhost:8000/auth/: Post
<code>
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJ1c2VybmFtZSI6Ijk5c2h5bHUifSwiaWF0IjoxNzA3OTUwNDk2LCJleHAiOjE3MDc5NTA1NTZ9.AAyU7NgcK49UI1bhAjy07kEVWfrhur-YDzoq8vxQh1I"
}
</code>

# Update user
## localhost:8000/user/3    Patch
<code>
{
    "email": "99shydfsddfsssdlu@gmail.com",
    "name": "shylusssss"

}
</code>

# Create Event
## localhost:8000/event/    : Post
<code>
{
    "title": "testing tdfdfdfst 2 sddfsdsdstesee",
    "description": "tedfdfdfst even sdsdsdfdfdsdt",
    "eventCategoryId": 1,
    "eventCardImage": "string",
    "ownerId": 3,
    "ticketTotalCount": 10,
    "eventItenary":[{"schedule": "12 AM","description": "start"}],
     "file": "base64 image"
}
</code>

# Get all  events
## localhost:8000/event/    : Get
<code>
No body
</code>


# My profile
## localhost:8000/profile    : Get
<code>
No body
</code>


