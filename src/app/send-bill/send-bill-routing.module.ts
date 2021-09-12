import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendBillPage } from './send-bill.page';

const routes: Routes = [
  {
    path: '',
    component: SendBillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendBillPageRoutingModule {}
