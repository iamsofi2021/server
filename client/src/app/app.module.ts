import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ItemComponent } from './components/items/item/item.component';
import { ItemsComponent } from './components/items/items.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { OrderComponent } from './components/order/order.component';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { AuthComponent } from './components/auth/auth.component';
import { AppEffects } from './app.effects';
import { RippleDirective } from './directives/ripple.directive';
import { ProfileComponent } from './components/profile/profile.component';
import { AddComponent } from './components/add/add.component';

@NgModule({
  declarations: [
    RippleDirective,
    AppComponent,
    NavigationComponent,
    ItemsComponent,
    ItemComponent,
    OrderComponent,
    ContactsComponent,
    AuthComponent,
    ProfileComponent,
    AddComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot(),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
