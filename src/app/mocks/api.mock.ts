import { User } from '../core/models/user.model';

export const MOCK_API_DATA = {
  users: [
    { name: 'John Doe', username: 'johndoe' },
    { name: 'Jane Doe', username: 'janedoe' },
  ] as User[]
};
