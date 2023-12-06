// const http = require('node:http');
// import config from './config';

const PORT = 3001;

// const server = http.createServer((req, res) => {
//   if (req.method === 'GET' && req.url === '/') {
//     res.statusCode = 200;
//     console.log('running');
//     res.end();
//   }
// });

// server.listen(PORT, () => {
//   console.info(`server running on port http://localhost:${PORT}`);
// });

// const app = require('./server');

import * as dotenv from 'dotenv';
import app from './server';
import config from './config';

dotenv.config();

app.listen(config.port, () => {
  console.log(`server running on port http://localhost:${config.port}`);
});
