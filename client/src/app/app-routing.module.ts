import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ItemsComponent } from './components/items/items.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {path: '', component: ItemsComponent},
  {path: 'order', component: OrderComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
