// swaggerConfig.mjs
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Exe-socials API',
    version: '1.0.0',
    description: 'API documentation for Exe-socials',
    contact: {
      name: 'Alebs Daniel',
      email: 'alebsgd@gmail.com',
    },
  },
  paths: {
    '/users/{id}': {
      get: {
        summary: 'Get user by ID',
        tags: ['Users'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'User ID',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'User retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  // Define your user schema here
                },
              },
            },
          },
          // Add more response codes and descriptions as needed
        },
      },
    },
    // Define other routes here
  },
};

export default swaggerDocument;
