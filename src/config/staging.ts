import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage = process.env.STAGE;

const getEnvConfig = async (stage: string) => {
  const mapper = {
    production: './prod',
    development: './dev',
    local: './local',
  };
  // if(stage === 'production') {
  //   return await import('./prod')
  // }
  // if(stage === 'development') {
  //   return await import('/dev')
  // }

  // return await import('./local')
  return await import(mapper[stage] ?? mapper.local);
};

export default merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: 3001,
    secrets: { jwt: process.env.JWT_SECRET, dbURL: process.env.DATABASE_URL },
  },
  getEnvConfig(stage)
);
