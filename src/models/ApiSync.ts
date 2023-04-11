import axios, { AxiosPromise } from "axios"
/* import { UserProps } from "./User" => Avant d'utiliser un type Générique */

interface HasId {
    id?: number
}

export class ApiSync<T extends HasId> {
    constructor(public rootUrl: string) {}
  
    fetch(id: number): AxiosPromise {
      return axios.get(`${this.rootUrl}/${id}`);
    }
  
    save(data: T): AxiosPromise {
      const { id } = data;
  
      if (id) {
        /* UPDATE */
        return axios.put(`${this.rootUrl}/${id}`, data);
      } else {
        /* CREATE */
        return axios.post(this.rootUrl, data);
      }
    }
  }
  