import { Role } from "./Role";

export interface User {
  userId?: string;
  userName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  password: string;
  email: string;
  role: Role;
  active: boolean;
}
