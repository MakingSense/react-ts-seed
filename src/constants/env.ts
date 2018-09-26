const config = process.env;

export const ENV = {
  ENVIRONMENT: config.REACT_APP_ENV,
  IS_DEV: config.REACT_APP_ENV === 'development',
  IS_TEST: config.REACT_APP_ENV === 'test',
  IS_QA: config.REACT_APP_ENV === 'qa',
  IS_PROD: config.REACT_APP_ENV === 'stage' || config.REACT_APP_ENV === 'production',
  API: {
    URL: config.REACT_APP_API_URL,
    MAX_RETRIES: 3,
    RETRY_TIMEOUT: 1000,
    ENTITY: {
      AUTH: 'auth',
      TODO: 'todo'
    }
  }
};
