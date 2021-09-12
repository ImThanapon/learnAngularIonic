import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodOrderPage } from './food-order.page';

const routes: Routes = [
  {
    path: '',
    component: FoodOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodOrderPageRoutingModule {}
