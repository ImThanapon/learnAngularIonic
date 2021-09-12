import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { ServicesService, SearchType } from '../services.service';
import { AlertController, ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {


  paramObject : any;
  inputData : any;

  order: {
    id: string;
    name: string;
  }
  constructor(private router : Router,
    private servicesService : ServicesService,
    private modalctrl: ModalController,
    private alertController: AlertController,
    public activatedRoute : ActivatedRoute,
    private serviceservice: ServicesService
    ) { 

    this.activatedRoute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.paramObject = this.router.getCurrentNavigation().extras.state;
        this.inputData = this.paramObject.dataObject;
      }
    })
  }

  ngOnInit() {
  }

  // seeDetail(){
    
  //   this.serviceservice.getOrderBy(this.inputData.user).then((data) => {
  //     if (data.length == 0) {
  //       console.log("No data found!");
  //     } else {
  //       this.order = data;
  //       console.log("Tab#2", this.order);
        
  //       // this.serviceservice.presentToast( this.order);
  //     }
  //   })

  //   // console.log(this.serviceservice.getOrderBy(uid));
  // }
  
  ionViewWillEnter() {
    console.log(this.inputData);
    // this.seeDetail();
  }
  

}
