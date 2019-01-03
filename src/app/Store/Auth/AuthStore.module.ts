import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from './Reducer';
import { AuthEffects } from './Effects';

@NgModule({
    imports: [
      CommonModule,
      StoreModule.forFeature('auth', AuthReducer),
      EffectsModule.forFeature([ AuthEffects ]),
    ],
    providers: [ AuthEffects ]
})
export class AuthStoreModule {

}
