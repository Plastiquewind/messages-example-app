import { User } from './user';

export interface Message {
  id: number;
  author: User;
  created: string;
  text: string;
}
