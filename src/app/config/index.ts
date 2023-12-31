import dotenv from 'dotenv';
dotenv.config();

export default {
  port: Number(process.env.PORT),
  db_uri: process.env.DB_URI,
  node_env: process.env.NODE_ENV,
  bcrypt_salt_round: Number(process.env.BCRYPT_SALT_ROUND),
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expire: process.env.JWT_ACCESS_EXPIRE,
  password_history_length: Number(process.env.PASSWORD_HISTORY_LENGTH),
};
