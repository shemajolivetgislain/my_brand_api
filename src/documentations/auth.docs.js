/**
 * @openapi
 *
 * /api/users:
 *      post:
 *          tags: [Authentication]
 *          summary: This helps to register a user.
 *          description: start your registration with names, email, and password.
 *          requestBody:
 *              description: Provide information
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              username:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *                              confirmPassword:
 *                                  type: string
 *
 *          responses:
 *                  201:
 *                     description: user registered successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 *
 * /api/login:
 *      post:
 *          tags: [Authentication]
 *          summary: This helps to login to the user dashboard.
 *          description: Enter email and password.
 *          requestBody:
 *              description: Provide information
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *
 *
 *          responses:
 *                  201:
 *                     description: user logged in successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 */
