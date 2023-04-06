import axios, { AxiosResponse } from "axios"
interface UserProps {
    id?: number,
    name?: string,
    age?: number
}

/* Créer un alias de type pour indiquer que callback est de type fonction 
qui ne prend pas d'arguments et ne retourne aucune valeur */
type Callback = () => void

export class User {

    events: { [key: string]: Callback[] } = {};

    constructor(private data: UserProps) { }
    
    get(propName: string): (string | number) {
        return this.data[propName];
    }

    set(dataUpdate: UserProps): void {
        Object.assign(this.data, dataUpdate);
    }

    on(eventName: string, callback: Callback): void {
        /* this.events[eventName] || []: User initalisé avec une propriété events qui est un objet vide, retournera undefined 
        Assigner un tableau vide à handlers jusqu'à ce qu'eventName soit défini */
        const handlers = this.events[eventName] || []
        handlers.push(callback);
        this.events[eventName] = handlers
    }

    trigger(eventName: string): void {
        const handlers = this.events[eventName];

        if (!handlers || handlers.length === 0) {
            return;
        }

        handlers.forEach(callback => {
            callback();
        })
    }

    fetch(): void {
        axios.get(`http://localhost:3000/users/${this.get('id')}`).then(
            (res: AxiosResponse): void => {
                this.set(res.data);
            }
        )
    }

    save(): void {
        const id = this.get('id')
        
        if (id) {
            // PUT
            axios.put(`http://localhost:3000/users/${id}`, this.data)
        } else {
            // POST
            axios.post('http://localhost:3000/users', this.data)
        }
    }
}