// import config from '../config/config.json';

const config = { ENV: 'development', API_URL: 'api-url' };

export const ENV = {
  ENVIRONMENT: config.ENV,
  IS_DEV: config.ENV === 'development',
  IS_TEST: config.ENV === 'test',
  IS_QA: config.ENV === 'qa',
  IS_PROD: config.ENV === 'stage' || config.ENV === 'production',
  API: {
    URL: config.API_URL,
    MAX_RETRIES: 3,
    RETRY_TIMEOUT: 1000,
    ENTITY: {
      AUTH: 'auth',
      USER: 'users'
    }
  }
};
