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

//-------------------------------------
// MAIN COMPONENT
//-------------------------------------
@Component({
  selector: 'app',
  template: (
    `
      <div class='mdl-cell mdl-cell--6-col'>
        <items-list [items]='items'
          (selected)='selectItem($event)'
          (deleted)='deleteItem($event)'>
        </items-list>
      </div>
      <div class='mdl-cell md1-cell--6-col'>
        <item-detail (saved)='saveItem($event)'
                     (cancelled)='resetItem($event)'
                     [item]='selectedItem'>
          Select an Item
        </item-detail>
      </div>
    `
  ),
  directives: [
    ItemList,
    ItemDetail
  ]
})

export class App {
  items: Array<Item>;
  selectedItem: Item;

  constructor(
    private _itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this._itemsService.loadItems()
      .subscribe(items => {
        this.items = items;
      })
  }

  resetItem() {
    this.selectItem({ id: null, name: '', description: '' });
  }

  selectItem(item: Item) {
    this.selectedItem = item;
  }

  saveItem(item: Item) {
    this._itemsService.saveItem(item)
      .subscribe(x => {
        let idx = this.items.findIndex(it => it.id === x.id);
        if(idx === -1) this.items.push(x); // New Item to List
        else this.items[idx] = x; // Update Item on List
        this.resetItem();
      })
  }

  deleteItem(item: Item) {
    this._itemsService.deleteItem(item)
      .subscribe(x => {
        let deletedItemIdx = this.items.findIndex(item => item.id === x.id)
        this.items.splice(deletedItemIdx, 1);
      })
  }
}
