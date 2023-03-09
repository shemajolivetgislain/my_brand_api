/**
 * @openapi
 *
 *  /queries:
 *      post:
 *          tags: [Queries]
 *          summary: This endpoint helps to send contact message.
 *          description: Fill out all required inputs.
 *          requestBody:
 *              description: Provide a message details
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              names:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              content:
 *                                  type: string
 *
 *          responses:
 *                  201:
 *                     description: message sent created successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 * /queries/messages/:
 *          get:
 *              security:
 *                  - BearerToken: []
 *              tags: [Queries]
 *              summary: This request list all message from database
 *              description: List all messages
 *
 *              responses:
 *                  200:
 *                      description: Messages retrieved successfully
 *
 * /queries/{id}:
 *        delete:
 *              security:
 *                  - BearerToken: []
 *              tags: [Queries]
 *              summary: This request will delete a message based on Id
 *              description: Delete a message
 *              parameters:
 *                - name: id
 *                  in: path
 *                  description: Provide a message id
 *                  required: true
 *              responses:
 *                      200:
 *                          description: A message deleted successfully
 */
