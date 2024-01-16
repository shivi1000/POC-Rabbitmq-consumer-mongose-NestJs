export const CONSTANT = {
  APP_NAME: 'Your Project Name',
  API_ROOT_PATH: 'api/v1',
  LOGGER_NAME: 'LOGGER',
};

export const Swagger = {
  Title: 'POC - Rabbit MQ Microservice BoilerPlate ( Using Nest js with Mongoose ODM )',
  Description: 'For background tasks (bulk notifications)',
  Version: '1.0',
  AddApiKey: {
    Type: 'apiKey',
    Name: 'Authorization',
    In: 'header',
  },
  AuthType: 'basic',
  Path: 'swagger',
};
