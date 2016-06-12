// Import Styles
import './style/style.css';

import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

import { HTTP_PROVIDERS } from '@angular/http';


import { App } from './components/app';
import { ItemsService } from './services/items';
import { items, selectedItem } from './reducers/items';

import { provideStore } from '@ngrx/store'


bootstrap(App, [
    // These are dependencies of our App
    ...HTTP_PROVIDERS,
    ItemsService,
    provideStore({ items, selectedItem })
  ])
  .catch(err => console.error(err));
