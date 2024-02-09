# node-network-communication--HTTP

1. Install Dependencies: Before starting, make sure to install the dependencies by running npm install in your terminal.
2. Start the Server: Ensure your server is running. Run one of the following commands in your terminal, depending on the mode you want to run:

Development Mode:

```
  npm start

```

Production Mode:

```
    npm run start:prod
```

Note that the port number for the application is specified in the `.env` file. By default, it's port `3005`.

3.Open Postman: Launch Postman on your computer.

4.Create Requests:

    For each endpoint of your server, create a corresponding request in Postman.
    Enter the URL for each request. For example, for GET /api/users, enter http://localhost:3005/api/users.
    Specify the request method (GET, POST, PUT, DELETE) to match the corresponding method of your endpoint.
    Add necessary headers, such as Content-Type: application/json for POST and PUT requests.

5.Send Requests:

    Click the "Send" button to send the request.
    Review the response from the server at the bottom of the Postman window.

6.Check Responses:

    Ensure that the response matches the expected behavior specified in your code.
    Verify that the response code matches the expected codes (200, 201, 400, 404, etc.).
    Check the response body for correct data or error messages.

7.Sample Requests:

    POST Request Example:
        URL: http://localhost:3005/api/users
        Method: POST
        Request Body:

        json

    {
        "username": "Name",
        "age": 30,
        "hobbies": ["soccer"]
    }

PUT Request Example:

    URL: http://localhost:3005/api/users/{userId}
    Method: PUT
    Request Body:

    json

    {
    "username": "NewName",
    "age": 35,
    "hobbies": ["football", "basketball"]
    }
