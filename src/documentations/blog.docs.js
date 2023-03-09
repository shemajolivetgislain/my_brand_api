/**
 * @openapi
 *
 * /api/blogs/:
 *      post:
 *          security:
 *              - BearerToken: []
 *          tags: [Blog]
 *          summary: This helps to create a blog.
 *          description: Fill out all required inputs.
 *          requestBody:
 *              description: Provide blog details
 *              content:
 *                  "multipart/form-data":
 *                      schema:
 *                          type: object
 *                          properties:
 *                              title:
 *                                  type: string
 *                              statuse:
 *                                  type: string
 *                              category:
 *                                  type: string
 *                              body:
 *                                  type: string
 *                              image:
 *                                  type: file
 *
 *          responses:
 *                  201:
 *                     description: blog created successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 *
 * /api/blogs:
 *      get:
 *          tags: [Blog]
 *          summary: This request list all blogs from database
 *          description: List all blogs
 *
 *          responses:
 *                  200:
 *                      description: Blogs retrieved successfully
 *
 * /api/blogs/{id}:
 *      get:
 *          tags: [Blog]
 *          summary: This request list a single blog
 *          description: List a blog
 *          parameters:
 *            - name: id
 *              in: path
 *              description: Provide a blog id
 *              required: true
 *          responses:
 *                  200:
 *                      description: A blog retrieved successfully
 *
 * /api/blogs/update/{id}:
 *      put:
 *              security:
 *                  - BearerToken: []
 *              tags: [Blog]
 *              summary: This request will update a blog
 *              description: Update a blog
 *              parameters:
 *                - name: id
 *                  in: path
 *                  description: Provide a blog id
 *                  required: true
 *              requestBody:
 *                  description: Provide blog details
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  title:
 *                                      type: string
 *                                  statuse:
 *                                      type: string
 *                                  category:
 *                                      type: string
 *                                  body:
 *                                      type: string
 *                                  image:
 *                                      type: file
 *
 *              responses:
 *                      200:
 *                          description: A blog deleted successfully
 *
 * /api/blogs/delete/{id}:
 *      delete:
 *              security:
 *                  - BearerToken: []
 *              tags: [Blog]
 *              summary: This request will delete a blog
 *              description: Delete a blog
 *              parameters:
 *                - name: id
 *                  in: path
 *                  description: Provide a blog id
 *                  required: true
 *              responses:
 *                      200:
 *                          description: A blog deleted successfully
 */
