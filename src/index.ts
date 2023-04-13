import { UserList } from './views/UserList';
import { Collection } from './models/Collection';
import { UserProps, User } from './models/User';
import { UserEdit } from './views/UserEdit';

const ROOT_URL = 'http://localhost:3000/users'
const root = document.getElementById('root') as HTMLElement

const users = new Collection(ROOT_URL,
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

users.on('change', () => {
    new UserList(root, users).render();
});

users.fetch();
