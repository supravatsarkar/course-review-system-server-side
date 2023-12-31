import { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../user/user.interface';

export type TLoginUserPayload = {
  username: string;
  password: string;
};

export interface TJwtPayload extends JwtPayload {
  _id: string;
  role: TUserRole;
  email: string;
}
