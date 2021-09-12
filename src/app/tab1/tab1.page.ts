import { Component } from '@angular/core';
import { ServicesService } from '../services.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  allMenu: any;
  menuRecord : {
    name : string;
    price : number;
    image : string;
  }
  

  constructor(private menuController: MenuController,
    private router : Router,
    private servicesService : ServicesService,
    private modalController: ModalController,
    private alertController: AlertController
    ) { 
      this.menuRecord = {
        name : '',
        price : 0,
        image : ''
      }
    }
  ionViewWillEnter() {
    this.getAllRecords();
  }
  getAllRecords() {
    this.allMenu = [];
    this.servicesService.getMenuData().then((data) => {
      if (data.length == 0) {
        console.log("No data found!");
      } else {
        this.allMenu = data;
        console.log("Tab#2", this.allMenu);
      }
    })
  }

  gotoCart(){
    this.router.navigate(['/cart-modal']);
  }

  openFirst() {
    this.menuController.enable(true, 'first');
    this.menuController.open('first');
  }
  gotoInputData(){
    this.router.navigate(['/input-data']);
  }

  gotoAdminDashboard(){
    this.router.navigate(['/login']);
  }
  gotoOrderPage(){
    this.router.navigate(['/input-data']);
  }

}
