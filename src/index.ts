import app from './app/app';
import { Server } from 'http';
import config from './app/config';
import mongoose from 'mongoose';
let server: Server;

async function main() {
  console.log({ config });
  // db connection
  await mongoose.connect(config.db_uri as string);
  console.log('Database connected...');

  // server listen
  server = app.listen(config.port, () => {
    console.log(`App running on port ${config.port}`);
  });
}
main();

// when found uncaught exception error currently stop the node process
process.on('uncaughtException', error => {
  console.log('UncaughtException error found', error);
  process.exit(1);
});

// when happening any unhandled promise rejection error 1st close the server and stop the node process
process.on('unhandledRejection', error => {
  console.log('UnhandledRejection error found', error);
  server.close(() => {
    process.exit(1);
  });
});
