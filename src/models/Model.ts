import { AxiosPromise, AxiosResponse } from "axios"

interface ModelAttributes<T> {
    set(value: T): void;
    getAll(): T;
    get<K extends keyof T>(key: K): T[K];
  }

  interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
  }
  
  interface Events {
    on(eventName: string, callback: () => void): void;
    trigger(eventName: string): void;
  }

  interface HasId {
    id?: number;
  }

  export class Model<T extends HasId> {
    constructor(
      private attributes: ModelAttributes<T>,
      private events: Events,
      private sync: Sync<T>
    ) {}
    
    /* Syntaxe alternative uniquement si l'on n'initialise pas les propriétés sur une ligne plus haut (185)
    (*** events: Eventing = new Eventing() ***) */
    // get on() {  return this.events.on; }
    on = this.events.on
    // get trigger() { return this.events.trigger; }
    trigger = this.events.trigger
    // get get() { return this.attributes.get; }
    get = this.attributes.get
    
    set(update: T): void {
        this.attributes.set(update);
        this.events.trigger('change');
    }

    fetch(): void {
        const id = this.get('id');

        if (typeof id !== 'number') {
          throw new Error('Cannot fetch without an id');
        }

        this.sync.fetch(id).then(
            (response: AxiosResponse): void => {
            this.set(response.data);
            }
        );
    }

    save(): void {
        this.sync
            .save(this.attributes.getAll())
            .then((response: AxiosResponse): void => {
                this.trigger('save');
            })
            .catch(() => {
            this.trigger('error');
            });
    }
}