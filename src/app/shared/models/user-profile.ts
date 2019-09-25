import { User } from './user';

export interface UserProfile extends User {
  bio: string;
  registrationDate: string;
}
