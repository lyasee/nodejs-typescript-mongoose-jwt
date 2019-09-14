import {connection, connect} from 'mongoose';
import {databaseConfig} from './config';

export const mongodb = async () => {
  const host = databaseConfig.host;
  const user = databaseConfig.user;
  const password = databaseConfig.password;
  const port = databaseConfig.port;
  const database = databaseConfig.database;

  const db = connection;

  const url = `mongodb://${user}:${password}@${host}:${port}/${database}`;

  db.on('error', (err: Error) => {
    console.error('Error to mongodb: ', err);
  });

  db.once('open', () => {
    console.log(`Connected to mongodb - ${host}:${port}/${database}`);
  });

  try {
    return await connect(
      url,
      {useFindAndModify: false}
    );
  } catch (e) {
    console.error(e);
  }
};
