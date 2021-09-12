import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendBillPageRoutingModule } from './send-bill-routing.module';

import { SendBillPage } from './send-bill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendBillPageRoutingModule
  ],
  declarations: [SendBillPage]
})
export class SendBillPageModule {}
