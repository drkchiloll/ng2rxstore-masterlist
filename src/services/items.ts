import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const BASE_URL = 'http://localhost:3000/items/';
const HEADER = {
  headers: new Headers({'Content-Type': 'application/json'})
};

export interface Item {
  id: number;
  name: string;
  description: string;
}

export interface AppStore {
  items: Item[];
  selectedItem: Item;
}

@Injectable()
export class ItemsService {
  // items: Observable<Array<Item>>;

  constructor(public http: Http) {}

  loadItems(): Observable<Item[]> {
    return this.http.get(BASE_URL)
      .map(res => res.json())
      .catch(this._handleError)
  }

  modItemResp(items): Item[] {
    return items.map(item => item);
  }

  saveItem(item: Item) {
    if(item.id) {
      return this.updateItem(item)
    } else {
      return this.createItem(item)
    }
  }

  createItem(item: Item) {
    return this.http.post(BASE_URL, JSON.stringify(item), HEADER)
      .map(res => res.json())
  }

  updateItem(item: Item) {
    return this.http.put(`${BASE_URL}${item.id}`, JSON.stringify(item), HEADER)
      .map(res => res.json())
  }

  deleteItem(item: Item) {
    return this.http.delete(`${BASE_URL + item.id}`)
      .map(data => item)
  }

  _handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server Error');
  }
}
