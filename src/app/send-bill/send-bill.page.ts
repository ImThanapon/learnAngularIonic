import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router, ActivatedRoute, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-send-bill',
  templateUrl: './send-bill.page.html',
  styleUrls: ['./send-bill.page.scss'],
})
export class SendBillPage implements OnInit {


  paramObject : any;
  inputData : any;
  
  bill: {
    id: string;
    payment: string;
    time: string;
    user: string;
    phone: string;
    address : string;
  }

  constructor(public activatedRoute : ActivatedRoute,
    public router : Router,
    private servicesService : ServicesService) { 
      this.bill = {
        id: '',
        payment: '',
        time: '',
        user: '',
        phone: '',
        address:''
      }

      this.activatedRoute.queryParams.subscribe(params => {
        if(this.router.getCurrentNavigation().extras.state){
          this.paramObject = this.router.getCurrentNavigation().extras.state;
          this.inputData = this.paramObject.dataObject;
        }
      })
    }

  ngOnInit() {
  }

  // getOrderBy(){
  //   this.servicesService.getOrderBy(this.inputData);
  // }
  sendBill(dataBill:any,user:any){
    // console.log(this.getOrderBy());
    // dataBill.menu = this.getOrderBy();
    dataBill.user = user.user;
    dataBill.phone = user.tel;
    dataBill.address = user.address;
    this.servicesService.addBillToFirestore(dataBill);
  }

}
