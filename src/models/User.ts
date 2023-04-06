import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
export interface UserProps {
    id?: number,
    name?: string,
    age?: number
}

const ROOT_URL = 'http://localhost:3000/users'
export class User {
    public events: Eventing = new Eventing();
    public sync: Sync<UserProps> = new Sync<UserProps>(ROOT_URL);

    constructor(private data: UserProps) { }
    
    get(propName: string): (string | number) {
        return this.data[propName];
    }

    set(dataUpdate: UserProps): void {
        Object.assign(this.data, dataUpdate);
    }
}