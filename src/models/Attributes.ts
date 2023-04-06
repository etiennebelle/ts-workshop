export class Attributes<T extends {}> {

     constructor(private data: T) { }
    
    get(propName: string): string | number {
        return this.data[propName];
    }

    set(dataUpdate: T): void {
        Object.assign(this.data, dataUpdate);
    }

}