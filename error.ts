process.on('unhandledRejection', (e) => {
  console.error('There was an unhandledRejection: ', e);
});

process.on('uncaughtException', (e) => {
  console.error('There was an uncaughtException: ', e);
});
