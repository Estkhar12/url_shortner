# URL Shortener API with Custom Short Codes and Analytics

## Overview

This API allows users to shorten URLs with an option for custom short codes and provides advanced tracking and analytics like total visits, unique visitors, device breakdowns, and referrers. Built using **Node.js**, **Express**, **MongoDB**.

## Features

- **URL Shortening**: Auto-generated or custom short codes.
- **Custom Short Codes**: Specify custom codes with uniqueness checks.
- **Redirection with Tracking**: Track visits, user agents, referrers, and unique visitors.
- **Analytics**: Total visits, unique visitors, device type breakdown, and referrer tracking.
- **Security**: Input validation, HTTPS (recommended)

## Postman Collection

[Postman Collection](https://documenter.getpostman.com/view/21290358/2sAXxMesfk)

## API Endpoints

### 1. **POST /shorten**

Shorten a URL with an auto-generated short code.
**cURL**

```
curl --location 'http://localhost:8000/shorten' \
--header 'Content-Type: application/json' \
--data '{
    "originalUrl": "https://www.npmjs.com/package/nanoid"
}'
```

**Payload**

```
{
	"originalUrl":  "https://www.npmjs.com/package/nanoid"
}
```

**Response**

```
{
	"shortUrl":  "http://localhost:8000/pbPssJe1"
}
```

### 2. **GET /:shortCode**

GET actual URL by giving to shortCode. It will automatically will redirect to the original URL when someone will hit the shorten URL. It will also capture the device information and will increment the visit count .

Below is the cURL to call this endpoint

```
curl --location 'http://localhost:8000/pbPssJe1'
```

### 3. **GET/:shortCode/analytics**

Call this endpoint to get the analytics report of a particular shortCode.
Below is the cURL to call this endpoint.

```
curl --location 'http://localhost:8000/28Yem1rF/analytics'
```

**Response**

```
{
    "totalVisits": 3,
    "uniqueVisitors": 1,
    "deviceBreakdown": {
        "desktop": 3
    }
}
```

### 4. **POST /customURL**

This endpoint is to create custom URL. If a user wants to create a shorten URL by his choice then he can use this endpoint. If that shortCode has not been assigned to some other URL then it will be assigned to this new URL otherwise it will give a response saying this shortCode has already in use.

**cURL**

```
curl --location 'http://localhost:8000/customURL' \
--header 'Content-Type: application/json' \
--data '{
  "originalUrl": "https://example.com",
  "customCode": "testurl"
}'
```

**Response**

```
{
	"shortUrl":  "http://localhost:8000/testurl"
}
```

### Steps to run this API

1. Create a .env file in the root folder and put the values for the following keys. You can use "mongodb://localhost:27017/" to connect with local database

```
MONGODB_URI=
```

2. Run the below command in terminal to install the packages.

```
npm install
```

3. Run the command below to start the application

```
npm start
```

After the 3rd step the application will start running on the PORT: 8000.
