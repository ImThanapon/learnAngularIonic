import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.page.html',
  styleUrls: ['./finish.page.scss'],
})
export class FinishPage implements OnInit {



  paramObject : any;
  inputData : any;

  allOrder: any;
  total_price:number;
  
  constructor(
    public activatedRoute : ActivatedRoute,
    public router : Router,
    private servicesService: ServicesService
  ) { 

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

  getAllOrder(){
    this.servicesService.setCollectionOrder('orderBy'+ this.inputData.user);
    this.allOrder = [];
    this.servicesService.getOrderData().then((data) => {
      if (data.length == 0) {
        console.log("No data found!");
      } else {
        this.allOrder = data;
        let total:number = 0;
        this.allOrder.forEach(element => {
          total = total + element.price ;
          console.log(total);
        });
        this.total_price = total;
        console.log("Tab#2", this.allOrder);
      }
    })
  }

  ngOnInit() {
  }
  
  gotoHomePage(){
    this.router.navigate(['/']);
  }
  gotoSendBill(){
    console.log(this.inputData);
    let navigationExtras : NavigationExtras = {
      state: {
        dataObject: this.inputData
      }
    };
    this.router.navigate(['/send-bill'],navigationExtras);
  }

  gotoReviewPage(){
    console.log(this.inputData);
      let navigationExtras : NavigationExtras = {
        state: {
          dataObject: this.inputData ,
          dataOrder: this.allOrder
          
        }
      };
    this.router.navigate(['/review'],navigationExtras);
  }
}
