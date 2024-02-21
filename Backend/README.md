#### GO Inventory Manager Backend Application
This is the Backend application which manages the business logic and database of the application.
#### API DOCUMENTATION

### AUTHENTICATION RELATED ENDPOINTS

## api/v1/signup
- This recieves required fields to register a new user
- **Methods**: POST
- **AUTHENTICATION**: NOT REQUIRED
    * POST DETAILS:
        + REQUIRED FORM FIELDS:
            - firstName
            - lastName
            - password
            - email
            - mobile (optional)
    * JSON RESPONSE:
    ```
    {
        "email_verified":false,
        "fullName":"Emmanuel Adaja",
        "jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwODQ5MTc0OCwianRpIjoiMWRlOThkNzctZDI3Yy00MjRkLWEwYzgtNGQ3OTAyN2VkYjViIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjE2MzJmMWZiLTFhNDYtNGU5Yy1hZDI5LTcyNzczYzA2MzNkMyIsIm5iZiI6MTcwODQ5MTc0OCwiY3NyZiI6IjIyODlhMzNhLTE2MTMtNDY4Ni05ZmYyLWJiNDhjM2JkYmNhNiIsImV4cCI6MTcwODQ5MjY0OH0._zQECRA-SvMzRKlCKRDPF2FA1vZuOAK4Wo3sLXByn4I",
        "message":"Signup successful. Verification email sent",
        "mobile_verified":false,
        "organization":[
            {
                "name": "My Company",
                "id": "f562dcf9-c267-4c4f-83d9-626f96d9e998".
                "user_role": "Admin"
            }
        ]
    }
    ```

## api/v1/login
- This endpoint handles user login returning user details and JWT authentication
- **Methods**: POST
- **AUTHENTICATION**: NOT REQUIRED
    * POST DETAILS:
        + REQUIRED FORM FIELDS:
            - email
            - password,
    * JSON RESPONSE:
    ```
    {
        "email_verified":true,
        "fullName":"Emmanuel Adaja",
        "jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwODQ5MTc0OCwianRpIjoiMWRlOThkNzctZDI3Yy00MjRkLWEwYzgtNGQ3OTAyN2VkYjViIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjE2MzJmMWZiLTFhNDYtNGU5Yy1hZDI5LTcyNzczYzA2MzNkMyIsIm5iZiI6MTcwODQ5MTc0OCwiY3NyZiI6IjIyODlhMzNhLTE2MTMtNDY4Ni05ZmYyLWJiNDhjM2JkYmNhNiIsImV4cCI6MTcwODQ5MjY0OH0._zQECRA-SvMzRKlCKRDPF2FA1vZuOAK4Wo3sLXByn4I",
        "message":"Login Succesful",
        "mobile_verified":false,
        "organization":[
            {
                "name": "My Company",
                "id": "f562dcf9-c267-4c4f-83d9-626f96d9e998".
                "user_role": "Admin"
            }
        ]
    }
    ```

## api/v1/token
- This endpoint sends a 6 digit verification code to the user
- **Methods**: POST
- **AUTHENTICATION**: NOT REQUIRED
    * POST DETAILS:
        + REQUIRED FORM FIELDS:
            - email
    * JSON RESPONSE:
    ```
    {
        "message": "Verification code has been sent"
    }
    ```

## api/v1/reset
- This resets a user password after authentication with the token sent to their respective email
- **Methods**: POST
- **AUTHENTICATION**: NOT REQUIRED
    * POST DETAILS:
        + REQUIRED FORM FIELDS:
            - email
            - password
            - code: the 6 digit verification code recieved by the user via email
    * JSON RESPONSE:
    ```
    {
        "message": "User password has been updated"
    }
    ```

## api/v1/verify
- This verifies that user given email is valid via code sent to user email
- **Methods**: POST
- **AUTHENTICATION**: JWT
    * POST DETAILS:
        + REQUIRED FORM FIELDS:
            - code: the 6 digit verification code recieved by the user via email
    * JSON RESPONSE:
    ```
    {
        "message": "message": "Email Verified"
    }
    ```
