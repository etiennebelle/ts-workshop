import axios, { AxiosPromise, AxiosResponse } from "axios"
import { UserProps } from './User';

interface HasID {
    id?: number
}
export class Sync<T extends HasID> {

    constructor(public rootUrl: string){}

    fetch(id: number): AxiosPromise {
        return axios.get(`${this.rootUrl}/${id}`)
    }

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