import { UserForm } from "./views/UserForm";
import { User, UserProps } from "./models/User";

const user = User.buildUser({ id: 1, name: 'ETIENNE', age: 197 })
const root = document.getElementById('root') as HTMLElement

if (root) {
  const userForm = new UserForm(root, user)
  userForm.render();
} else { throw new Error('Root element not found') }
