export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  isDev: process.env.NODE_ENV === 'dev',
  database: {
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    connection: process.env.TYPEORM_CONNECTION,
    username: process.env.TYPEORM_USERNAME,
    database: process.env.TYPEORM_DATABASE,
    passwoed: process.env.TYPEORM_PASSWORD,
  },
  landingEndpoint: process.env.LANDING_ENDPOINT,
  entities: process.env.TYPEORM_ENTITIES,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
  saltOrRounds: process.env.SALT_OR_ROUNDS,
  smsApiId: process.env.SMS_API_ID,
  sendSmsServiceUrl: process.env.SEND_SMS_SERVICE_URL,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  throttle: {
    ttl: process.env.THROTTLE_TTL || 60,
    limit: process.env.THROTTLE_LIMIT || 1,
  },
  sendGridApiKey: process.env.SENDGRID_API_KEY,
  sendGridEmail: process.env.SENDGRID_EMAIL,
  unisender: {
    key: process.env.UNISENDER_API_KEY,
    email: process.env.UNISENDER_EMAIL,
    confirmEmail:{
      templateId: process.env.UNISENDER_EMAIL_CONFIRM_EMAIL_TEMPLEATE_ID,
      listId: process.env.UNISENDER_EMAIL_CONFIRM_EMAIL_LIST_ID,
    }
  },
  emailConfirmationUrl: process.env.EMAIL_CONFIRMATION_URL,
  emailConfirmationSuccessUrl: process.env.EMAIL_CONFIRMATION_SUCCESS_URL,
  emailConfirmationFileUrl: process.env.EMAIL_CONFIRMATION_FILE_URL,
});
