import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import { ServicesService } from '../services.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

  paramObject : any;
  inputData : any;
  orderData : any;

  menuRecord : {
    image: string;
    name: string;
    price: number;
    type: string;
  }

  review: {
    user: string;
    msg: string;
    point: number;
    // order: any;
  }

  constructor(
    public activatedRoute : ActivatedRoute,
    public router : Router,
    private alertController: AlertController,
    private servicesService: ServicesService ) 
  { 
    
    this.menuRecord = {
      name : '',
      price : 0,
      image : '',
      type : ''
    }

    this.review = {
      user:'',
      msg: '',
      point:0
      // order: []
    }

    this.activatedRoute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.paramObject = this.router.getCurrentNavigation().extras.state;
        this.inputData = this.paramObject.dataObject;


        this.orderData = this.paramObject.dataOrder;
        // this.review.order = this.paramObject.dataOrder.name;
      }
    })
  }

  ionViewWillEnter(){
    // this.orderData.forEach(function (value) {
    //   console.log(value);
    //   // this.review.order[value] = this.review.order;
    //   var arrOrder = [];  
    //   arrOrder.push(value);
    //   this.review.order = arrOrder;
    // });
  }
  

  addToFirebase(data: any) {
    if(this.review.user===""){
      this.showAlert();
    }else if(this.review.msg===""){
        this.showAlert();
      }else if(this.review.point<1 ||this.review.point >5 ){
        this.showAlert();
      }
    else{
    this.presentAlertConfirm(data);
    }
  }
  async presentAlertConfirm(record: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ยืนยัน!',
      message: '<strong>ต้องการจะส่งความคิดเห็น <br> ขอบคุณสำหรับผลตอบรับ</strong> !',
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
            this.servicesService.addReviewToFirestore(record);
            // this.gotoHomePage();
          }
        }
      ]
    });
    await alert.present();
  }

  gotoHomePage(){
    this.router.navigate(['/']);
  }

  async showAlert(){
    const alert = await this.alertController.create({
      header: 'ข้อมูลไม่ถูกต้อง',
      message: '<strong>กรุณาตรวจสอบข้อมูลใหม่</strong>',
      buttons: [
        {
          text: 'ปิด',
          role: 'ok',
          handler: (cancel) => {
            console.log('Please Input Value..');
          }
        }
      ]
    });
    await alert.present();
  }
  ngOnInit() {
  }

}
