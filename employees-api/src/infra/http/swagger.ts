import swaggerJsdoc from 'swagger-jsdoc'

const { NODE_ENV, API_GATEWAY } = process.env

const getRelativePath = (path: string): string => {
  const extension =  NODE_ENV && NODE_ENV === 'development' ? '.ts' : '.js'

  return NODE_ENV && NODE_ENV === 'development' ? `./src/${path}${extension}` : `./dist/${path}${extension}`
}

const foldersTree = [
  getRelativePath('infra/http/**/*'),
  getRelativePath('domain/views/**/*')
]

export const swaggerDoc = swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
      version: '1.0.0',
      title: 'Employee API',
      description: 'Documentation API RESTful',
      },
      servers: [
        {
            url: `${API_GATEWAY}/`,
            description: `Employee API Docs`,
        },
      ],
    },
    apis: foldersTree
});