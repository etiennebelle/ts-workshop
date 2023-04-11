import { AxiosPromise, AxiosResponse } from "axios"

interface ModelAttributes<T> {
    set(value: T): void
    get<K extends keyof T>(key: K): T[K]
    getAll(): T
}

interface Sync<T> {
    fetch(id: number): AxiosPromise
    save(data: T): AxiosPromise
}

interface Events {
    on(eventName: string, callback: () => void): void
    trigger(eventName: string): void
}

interface HasID {
    id?: number
}

export class Model<T extends HasID> {
    constructor(
        private attributes: ModelAttributes<T>,
        private events: Events,
        private sync: Sync<T>
    ) { }
    

    // Events
    get on() { return this.events.on }
    get trigger() { return this.events.trigger }

    // Attributes
    get get() {  return this.attributes.get }

    set(update: T): void {
        this.attributes.set(update)
        this.events.trigger('change')
    }

    // Sync
    fetch(): void {
        const id = this.attributes.get('id')
        if (typeof id !== 'number') {
            throw new Error('Cannot fetch without an ID')
        }
        this.sync
            .fetch(id)
            .then((res: AxiosResponse): void => {
                this.attributes.set(res.data)
            })
    }

    save(): void {
        this.sync
            .save(this.attributes.getAll())
            .then((res: AxiosResponse): void => {
                this.trigger('save')
            })
            .catch(() => {
                this.trigger('error');
            })
    }
}