# Express API Demo

Simple Express API, built with MongoDB/Mongoose, JsonWebToken

## Installation

Use the package manager [npm](https://npmjs.com/) to install Demo app.

```bash
npm install
```

---

**NOTE**

Check _/config/env/development.js_ to Make sure the database url is valid.

---

(Optional)You can use seeder command to seed the database.
this will generate a two users with one article for each of them:

```bash
npm run seed
```

To run the server:

```bash
npm start
```

To run the development server:
This will reset the server everytime you edit the js files

```bash
npm run dev
```

## Usage

when the server is running you can request this endpoints

**NOTE**

This API has no front-end, so you can only access it through http requests, tools like Postman is prefered to use.

### User Routes

```url
GET /api/users
GET /api/users/:userId
GET /api/users/me           #(auth required)current user
POST /api/users
PUT /api/users/:userId      #(auth required)
DELETE /api/users/:userId   #(auth required)
```

### Article Routes

```url
GET /api/articles gets list of all users
GET /api/articles/:articleId
POST /api/articles              #(auth required)
PUT /api/articles/:articleId    #(auth required)
DELETE /api/articles/:articleId #(auth required)
```

### Auth Routes

```url
POST /api/login
POST /api/signup
```

### Middleware

this middleware is used to check if user is authenticated on not

```url
isAuthorized
```

## About

This app contains User and Article models, you can signup through _/api/signup_ to create a user, and login through _/api/login_ to post new articles.
when you _login_ the api does two things:

- returns JWT token
- automaticaly creates a cookie with the same token

the cookie will help you authenticate your subsequent requests if you are in a browser or any other tools like post man, however you can use the token to authenticate by sending the token through Authorization http header if you are not using cookies.

## License

[MIT](https://choosealicense.com/licenses/mit/)
