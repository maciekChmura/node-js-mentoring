## HOMEWORK 5
### APPLICATION. VALIDATION. SECURITY

#### Tasks

`part a`

1. Add /auth route to your application.
2. Implement standard login and password authentication:
    - POST /auth login and password should check user login and password (may be hardcoded somewhere in application for now).
    - If user exists, generate JWT token (you can use any package for generating it, e.g. jsonwebtoken) and send the following response:
        ```json
        {
          "code": 200,
          "message": "OK",
          "data": {
              "user": {
                  "email": "...",
                  "username": "..."
              }
          },
          "token": "..."
        }
        ```

    - If user does not exist or credentials do not match - send error response with the proper error code:
        ```json
        {
          "code": 404,
          "message": "Not Found",
          "data": { ... additional error response data if needed ... }
        }
        ```

`part b`

3. Write a middleware to verify JWT token for all /products and /users routes from the Homework 4 (/auth route should be excluded from verification).

`part c`

4. Add passport package into your application.
5. Implement local authentication strategy using passport to allow login with user’s credentials (hardcoded credentials from 2b may be used).

`part d`

6. Implement following authentication strategies using passport:
    ```
    Facebook strategy.
    Twitter strategy.
    Google OAuth strategy.
    ```


#### Evaluation Criteria

- All required routes is added and passport is installed (tasks 1, 4).
- Standard login and password authentication is implemented (task 2).
- JWT token is verified for all required routes (task 3).
- Local authentication strategy is implemented via passport (task 5).
- All authentication strategies is implemented via passport (task 6).