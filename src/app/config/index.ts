import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  db_uri: process.env.DB_URI,
  node_env: process.env.NODE_ENV,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expire: process.env.JWT_ACCESS_EXPIRE,
  jwt_refresh_expire: process.env.JWT_REFRESH_EXPIRE,
};
