import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ItemsService, Item, AppStore } from '../services/items';

// External Components
import { ItemList } from './items';
import { ItemDetail } from './item-detail';

import {
  SELECT_ITEM,
  ADD_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM
} from '../constants';

import { Store } from '@ngrx/store';

//-------------------------------------
// MAIN COMPONENT
//-------------------------------------
@Component({
  selector: 'app',
  template: (
    `
      <div class='mdl-cell mdl-cell--6-col'>
        <items-list [items]='items | async'
          (selected)='selectItem($event)'
          (deleted)='deleteItem($event)'>
        </items-list>
      </div>
      <div class='mdl-cell md1-cell--6-col'>
        <item-detail (saved)='saveItem($event)'
                     (cancelled)='resetItem($event)'
                     [item]='selectedItem | async'>
          Select an Item
        </item-detail>
      </div>
    `
  ),
  directives: [
    ItemList,
    ItemDetail
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class App {
  items: Observable<Array<Item>>;
  selectedItem;

  constructor(
    private _itemsService: ItemsService,
    private store: Store<AppStore>
  ) {}

  ngOnInit() {
    this.items = this._itemsService.items;
    this.selectedItem = this.store.select('selectedItem');
    this.selectedItem.subscribe(v => console.log(v));
    this._itemsService.loadItems();
  }

  resetItem() {
    this.store.dispatch({
      type: SELECT_ITEM,
      payload: {
        id: null, name: '', description: ''
      }
    });
  }

  selectItem(item: Item) {
    this.store.dispatch({
      type: SELECT_ITEM,
      payload: item
    });
  }

  saveItem(item: Item) {
    this._itemsService.saveItem(item);
    this.resetItem();
  }

  deleteItem(item: Item) {
    this._itemsService.deleteItem(item);
    this.resetItem()
  }
}
