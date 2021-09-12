import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  data: {
    user: string;
    pass: string;
  }

  constructor(private router : Router,
    private alertController : AlertController,
    private servicesService : ServicesService) {

    this.data = {
      user: '',
      pass: ''
    }
   }

  ngOnInit() {
  }
  login(data : any){
    if(data.user == "admin" && data.pass =="1234"){
      this.router.navigate(['/admin-dashboard']);
      this.servicesService.presentToast('สวัสดีครับแอดมิน');
    }else{
      this.servicesService.presentToast('ข้อมูลไม่ถูกต้อง');
    }
  }


  async presentAlertFail(record: any) {
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
          
            this.router.navigate(['/admin-dashboard']);
          }
        }
      ]
    });

    await alert.present();
  }
}
