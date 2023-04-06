import axios, { AxiosPromise, AxiosResponse } from "axios"
/* import { UserProps } from "./User" => Avant d'utiliser un type Générique */

interface HasID {
    id?: number
}
export class Sync<T extends HasID> {

    constructor(public rootUrl: string){}

    fetch(id: number): AxiosPromise {
        return axios.get(`${this.rootUrl}/${id}`)
    }
    
    /* save(data: UserProps): AxiosPromise => Avant d'utiliser un type Générique */
    save(data: T): AxiosPromise {
        const { id } = data;

        if (id) {
            // PUT
            return axios.put(`${this.rootUrl}/${id}`, data)
        } else {
            // POST 
            return axios.post(this.rootUrl, data)
        }
    }
}