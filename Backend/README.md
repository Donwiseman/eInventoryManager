# GO Inventory Manager Backend Application
This is the Backend application which manages the business logic and database of the application.
## API DOCUMENTATION

### AUTHENTICATION RELATED ENDPOINTS

#### api/v1/signup
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
        "organization":[]
    }
    ```

#### api/v1/login
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

#### api/v1/token
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

#### api/v1/reset
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

#### api/v1/verify
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


### USER RESOURCE API

#### api/v1/user
- This endpoint handles manipulation of the given user data
- **Methods**: GET, PUT, DELETE
- **AUTHENTICATION**: JWT
    * GET Details:
        + NO REQUIRED FIELD
        + JSON RESPONSE:
        ```
        {
            "first_name": "Emmanuel",
            "last_name": "Adaja",
            "email": "emmanueladaja@yahoo.com",
            "email_verified":true,
            "mobile": <phone number>,
            "mobile_verified":false,
            "organizations": [],
            "created_at": <datetime data>,
            "organizations_created": []
        }
        ```
    * PUT Details:
        + FORM FIELDS:
            - email (optional)
            - firstName (optional)
            - lastName (optional)
            - mobile (optional)
        + JSON RESPONSE
        ```
        {
            "message": "Email updated and verification code sent, Mobile number updated"
        }
        ```
    * DELETE Details
        + NO REQUIRED DATA
        + JSON RESPONSE
        ```
        {
            "message": "User account has been deleted"
        }
        ```


### ORGANIZATION RESOURCE API

#### api/v1/countries
- This sends all supported countries and their timezoones
- **Methods**: GET
- **AUTHENTICATION**: JWT
    * GET DETAILS:
        + NO REQUIRED FIELDS
        + JSON RESPONSE
        ```
        [
            {
                "country": "Nigeria",
                "timezones": ["Africa/Lagos"]
            },
            {
                "country": "Ghana",
                "timezones": ["Africa/Accra"]
            },
            ...
        ]
        ```

#### api/v1/organizations
- This allows creation of an organization and returns organizations user belong to
- **Methods**: GET, POST
- **AUTHENTICATION**: JWT
    * POST DETAILS:
        + REQUIRED FORM FIELDS:
            - name
            - country
            - timezone
            - description (optional)
            - mobile (optional)
            - address (optional)
            - image (optional)
        + JSON RESPONSE:
        ```
        {
            "message": "Organization succesfully created",
            "name": "My Comapny",
            "id": "f562dcf9-c267-4c4f-83d9-626f96d9e998",
            "created_at": <datetime data>,
            "image": <url link>,
            "country": "Nigeria"
        }
    * GET Details:
        + NO REQUIRED FIELDS
        + JSON RESPONSE
        ```
        {
            "message":"Returning user organizations",
            "organizations":[
                {
                    "id":"d19dba13-2845-4564-8224-bf7983a2e873",
                    "name":"My Company",
                    "user_role":"Admin"
                }, ...
            ]
        }
        ```

#### api/v1/organizations/<id>
- This handle getting and updating an organization details and deleting the organization account
- **Methods**: GET, PUT, DELETE
- **AUTHENTICATION**: JWT
    * GET Details:
        + No Required Fields
        + Admins and Employee can access endpoint
        + JSON Response:
        ```
        {
            "address":null,
            "country":"Nigeria",
            "created_at":"2024-02-24 14:00:47",
            "creator":"Emmanuel Adaja",
            "description":"My interesting company",
            "id":"9dcdda27-deb3-49c1-9a15-d4eb84335666",
            "image":null,
            "mobile":null,
            "name":"My Company",
            "time_zone":"Africa/Lagos",
            "total_products":0,
            "user_role":"Admin"
        }
        ```
    
    * PUT Details:
        + FORM FIELDS:
            - mobile (optional)
            - image (optional)
            - address (optional)
            - description (optional)
        + Access Limited to only Admins
        + JSON RESPONSE
        ```
        {
            "message": "mobile updated, Organization address Updated"
        }
        ```
    * DELETE Details
        + NO REQUIRED DATA
        + Access Limited to only Admins
        + JSON RESPONSE
        ```
        {
            "message": "Organization account is deleted"
        }
        ```
