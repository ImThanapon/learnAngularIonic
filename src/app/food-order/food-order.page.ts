import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { ServicesService, SearchType } from '../services.service';
import { AlertController, ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';

@Component({
  selector: 'app-food-order',
  templateUrl: './food-order.page.html',
  styleUrls: ['./food-order.page.scss'],
})
export class FoodOrderPage implements OnInit {

  paramObject : any;
  inputData : any;

  searchString:  any;
  type: SearchType = SearchType.all;

  allMenu: {
    image: string;
    name: string;
    price: number;
    type: string;
    star: string;
  }

  menuRecord : {
    image: string;
    name: string;
    price: number;
    type: string;
  }

  serviceRecord:{
    user: string;
    email: string;
    tel: string;
    address: string;
  }

  constructor(private router : Router,
    private servicesService : ServicesService,
    private modalctrl: ModalController,
    private alertController: AlertController,
    public activatedRoute : ActivatedRoute
    ) {
    this.menuRecord = {
      name : '',
      price : 0,
      image : '',
      type : ''
    }

    this.serviceRecord = {
      user:'',
      email: '',
      tel: '',
      address:''
    }

    

    this.activatedRoute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.paramObject = this.router.getCurrentNavigation().extras.state;
        this.inputData = this.paramObject.dataObject;
      }
    })
    
  }

  async openCartModal(){
    const modal = await this.modalctrl.create({
      component : CartModalPage,
      componentProps : {
        'inputValue' : this.inputData
      }
    });
    modal.onDidDismiss().then(()=>{
      console.log("Exit from modal pagr!");
    });
    return await modal.present();
  }

  ionViewWillEnter() {
    this.getAllRecords();
  }

  ngOnInit() {
  }
  gotoFinishPage(){
    console.log(this.inputData);
      let navigationExtras : NavigationExtras = {
        state: {
          // dataObject:{
          //   inputCharacter : this.serviceRecord
          // }
          dataObject: this.inputData
        }
      };
      this.router.navigate(['/finish'],navigationExtras);
  }

  addRecord(addrecord:any){
    
    this.servicesService.addRecordToFirestore(addrecord);
    this.getAllRecords();
  }

  addOrder(addrecord:any,username:any){
    //ทดสอบ Nack
    this.servicesService.setCollectionOrder('orderBy'+username);
    this.servicesService.addOrderToFirestore(addrecord);
    // this.getAllOrder();
  }

  getAllRecords() {
    // this.allMenu = [];
    this.servicesService.getMenuData().then((data) => {
      if (data.length == 0) {
        console.log("No data found!");
      } else {
        this.allMenu = data;
        console.log("Tab#2", this.allMenu);
      }
    })
  }

  getAllOrder() {
    // this.allMenu = [];
    this.servicesService.getOrderData().then((data) => {
      if (data.length == 0) {
        console.log("No data found!");
      } else {
        this.allMenu = data;
        console.log("Tab#2", this.allMenu);
      }
    })
  }

  // gotoOrderPage(){
  //   this.router.navigate(['/food-order']);
  // }
  // async openMenu() {
  //   await this.menuController.open();
  // }

  gotoCart(){

    console.log(this.inputData);
    let navigationExtras : NavigationExtras = {
      state: {
        // dataObject:{
        //   inputCharacter : this.serviceRecord
        // }
        dataObject: this.inputData
      }
    };
    this.router.navigate(['/cart-modal'],navigationExtras);
  }


  async presentAlertOut() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'แจ้งเตือน!',
      message: '<strong>ท่านต้องการยกเลิกออร์เดอร์ ใช่หรือไม่</strong> !',
      buttons: [
        {
          text: 'ไม่ใช่',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel .. ');
          }
        }, {
          text: 'ใช่',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigate(['/']);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertNext() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'แจ้งเตือน',
      message: '<strong>ยืนยันการสั่งอาหาร</strong> !',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel .. ');
          }
        }, {
          text: 'ตกลง',
          handler: () => {
            console.log('Confirm Okay');
            this.gotoFinishPage();
          }
        }
      ]
    });

    await alert.present();
  }

}
