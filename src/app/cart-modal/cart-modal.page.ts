import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ServicesService } from '../services.service';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {

  paramObject : any;
  inputData : any;


  serviceRecord:{
    user: string;
    email: string;
    tel: string;
    address: string;
  }

  allOrder: any;
  total_price:number;

  @Input() name: any;
  @Input() price: any;

  orderRecord:{
    name:string;
    price:number;
  }
  
  constructor(private modalcrtl:ModalController,
    private servicesService: ServicesService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private alertController: AlertController
    ) {
      this.serviceRecord = {
        user:'',
        email: '',
        tel: '',
        address:''
      }

      this.total_price=0;

      this.activatedRoute.queryParams.subscribe(params => {
        if(this.router.getCurrentNavigation().extras.state){
          this.paramObject = this.router.getCurrentNavigation().extras.state;
          this.inputData = this.paramObject.dataObject;
        }
      })

    }

  ionViewWillEnter(){
    this.getAllOrder();
  }

  ionViewDidLeave(){
    this.getAllOrder();
  }

  // calculateTotal(){
  //   this.allOrder.forEach(function (i) {
  //     console.log(this.allOrder['price']);
  //   }); 
  // }

  getAllOrder(){
    //ทดสอบ Nack
    // let test = this.servicesService.getCollectionOrder;
    // console.log(test);
    this.servicesService.setCollectionOrder('orderBy'+ this.inputData.user);
    this.allOrder = [];
    this.servicesService.getOrderData().then((data) => {
      if (data.length == 0) {
        console.log("No data found!");
      } else {
        this.allOrder = data;
        let total: number = 0;
        let price: number = 0;
        this.allOrder.forEach(element => {
          price = +element.price;
          total = total + price ;

          // total = total + element.price ;
          console.log(total);
        });
        this.total_price = total;
        console.log("Tab#2", this.allOrder);
        
      }
    })
  }


  ngOnInit() {
    this.orderRecord = {
      name:this.name,
      price:this.price
    }
  }
  closeCartModal(){
    this.modalcrtl.dismiss(this.orderRecord);
  }

  updateMenu(){
  }

  deleteOrder(id:any){
    console.log(id,'to be delete !');
    this.servicesService.deleteOrder(id).then(()=>{
      this.getAllOrder();
    });
  }

  async presentAlertConfirm(user: any, id: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'แจ้งเตือน!',
      message: '<strong>ลบรายการอาหาร</strong> !',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel .. ');
          }
        }, {
          text: 'ตกลง',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteOrder(id);
          }
        }
      ]
    });

    await alert.present();
  }

  
}
