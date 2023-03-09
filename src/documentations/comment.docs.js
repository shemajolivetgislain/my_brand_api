/**
 * @openapi
 *
 *  /api/blog/{id}/comment:
 *      post:
 *          security:
 *             - BearerToken: []
 *          tags: [Comment]
 *          summary: This endpoint helps to post a comment on a blog.
 *          description: Fill out all required inputs.
 *          parameters:
 *            - name: id
 *              in: path
 *              description: Provide a blog id
 *              required: true
 *          requestBody:
 *              description: Provide a comment details
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              fullName:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              comment:
 *                                  type: string
 *                              blog:
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
 * /api/blog/{id}/comments:
 *          get:
 *              tags: [Comment]
 *              summary: This request list all comments posted on a blog
 *              description: List all comments
 *              parameters:
 *                  - name: id
 *                    in: path
 *                    description: Provide a blog id
 *                    required: true
 *              responses:
 *                  200:
 *                      description: Comments retrieved successfully
 *
 */
