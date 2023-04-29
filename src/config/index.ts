import * as dotenv from 'dotenv';
import * as joi from 'joi';

dotenv.config();

// validating environment variables
const schema = joi
  .object({
    PORT: joi.number().required(),
    NODE_ENV: joi
      .string()
      .valid('development', 'production', 'staging')
      .required(),

    // database configs
    DBHOST: joi.string().required(),
    DBUSER: joi.string().required(),
    DBPASSWORD: joi.string().required(),
    DATABASE: joi.string().required(),
    DBPORT: joi.number().port().required().default(5432),
  })
  .unknown()
  .required();

const { error, value: envVars } = schema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  isDevelopment:
    envVars.NODE_ENV === 'development' || envVars.NODE_ENV === 'staging'
      ? true
      : false,
  isLocahost: envVars.NODE_ENV === 'development' ? true : false,
  port: {
    http: envVars.PORT,
  },
  NODE_ENV: envVars.NODE_ENV,
  db: {
    port: envVars.DBPORT,
    host: envVars.DBHOST,
    username: envVars.DBUSER,
    password: envVars.DBPASSWORD,
    name: envVars.DATABASE,
  },
};
