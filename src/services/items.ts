import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Store } from '@ngrx/store';

// Import Action Types
import {
  SELECT_ITEM,
  ADD_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM
} from '../constants';

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
  items;

  constructor(
    private http: Http,
    private store: Store<AppStore>
  ) {
    this.items = store.select('items');
  }

  loadItems() {
    this.http.get(BASE_URL)
      .map(res => res.json())
      .map(payload => ({
        type: ADD_ITEMS,
        payload
      }))
      .subscribe(action => this.store.dispatch(action))
  }

  saveItem(item: Item): any {
    if(item.id) {
      return this.updateItem(item)
    } else {
      return this.createItem(item)
    }
  }

  createItem(item: Item) {
    return this.http.post(BASE_URL, JSON.stringify(item), HEADER)
      .map(res => res.json())
      .map(payload => this.store.dispatch({
        type: CREATE_ITEM,
        payload
      }))
  }

  updateItem(item: Item) {
    return this.http.put(`${BASE_URL}${item.id}`, JSON.stringify(item), HEADER)
      .map(action => this.store.dispatch({
        type: UPDATE_ITEM,
        payload: item
      }))
  }

  deleteItem(item: Item) {
    this.http.delete(`${BASE_URL + item.id}`)
      .subscribe(action => this.store.dispatch({
        type: DELETE_ITEM,
        payload: item
      }))
  }
}
