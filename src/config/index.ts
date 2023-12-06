import merge from 'lodash.merge';

const getEnvConfig = (stage: string) => {
  const mapper = {
    production: './prod',
    development: './local',
    local: './local',
  };
  const config = require(mapper[stage] ?? mapper.local);
  return config.default;
};

export default merge(
  {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    dbURL: process.env.DATABASE_URL,
  },
  getEnvConfig(process.env.NODE_ENV)
);
