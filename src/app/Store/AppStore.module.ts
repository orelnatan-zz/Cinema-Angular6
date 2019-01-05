import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthStoreModule } from './Auth/AuthStore.module';
import { MoviesStoreModule } from './Movies/MoviesStore.module';

@NgModule({
    imports: [
      CommonModule,
	  AuthStoreModule,
	  MoviesStoreModule,
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
      }),
    ],
    declarations: []
  })
  export class AppStoreModule {}
