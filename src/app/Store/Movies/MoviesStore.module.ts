import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MoviesReducer } from './Reducer';
import { MoviesEffects } from './Effects';

@NgModule({
    imports: [
      CommonModule,
      StoreModule.forFeature('movies', MoviesReducer),
      EffectsModule.forFeature([ MoviesEffects ]),
    ],
    providers: [ MoviesEffects ]
})
export class MoviesStoreModule {

}
