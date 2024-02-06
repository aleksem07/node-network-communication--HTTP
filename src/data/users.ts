import { v4 as uuidv4 } from 'uuid';

interface IUsers {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | null[];
}

export const users: IUsers[] = [
  {
    id: uuidv4(),
    username: 'Vasiliy',
    age: 30,
    hobbies: ['football', 'beer'],
  },
  {
    id: uuidv4(),
    username: 'Kuksa',
    age: 30,
    hobbies: ['hockey', 'drink beer'],
  },
];
