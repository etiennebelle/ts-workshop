import axios, { AxiosResponse } from 'axios';
import { User, UserProps } from "./User";
import { Eventing } from "./Eventing";

export class Collection {
    models: User[] = [];
    events: Eventing = new Eventing();

    constructor(public ROOT_URL: string) {}

    get on() {
        return this.events.on
    }

    get trigger() {
        return this.events.trigger
    }

    fetch(): void {
        axios.get(this.ROOT_URL)
            .then((response: AxiosResponse) => {
                response.data.forEach((value: UserProps) => {
                    const user = User.buildUser(value);
                    this.models.push(user)
                })
            })
        this.trigger('change');
    }

}