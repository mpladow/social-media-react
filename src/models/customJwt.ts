import type { Role } from '../constants/roles';

export interface CustomJwtPayload {
  user_role?: Role | undefined;
  [key: string]: any;
}
