interface IDatabaseConfig {
  host: string;
  user: string;
  password: string;
  port: number;
  database: string;
}

export const databaseConfig: IDatabaseConfig = {
  host: '',
  user: '',
  password: '',
  port: 27017,
  database: '',
};

interface IAuthConfig {
  secretKey: string;
}

export const authConfig: IAuthConfig = {
  secretKey: 'secret',
};
