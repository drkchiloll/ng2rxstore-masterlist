import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

import { HTTP_PROVIDERS } from '@angular/http';


import { App } from './components/app';


bootstrap(App, [
    // These are dependencies of our App
    ...HTTP_PROVIDERS,
  ])
  .catch(err => console.error(err));
