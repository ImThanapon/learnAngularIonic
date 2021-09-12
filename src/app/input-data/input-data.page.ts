import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { AlertController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
//import for check valid
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';





@Component({
  selector: 'app-input-data',
  templateUrl: './input-data.page.html',
  styleUrls: ['./input-data.page.scss'],
})
export class InputDataPage implements OnInit {





  serviceRecord: {
    user: string;
    email: string;
    tel: string;
    address: string;
  }

  // inputForm: FormGroup;

  constructor(private router: Router,
    private serviceservice: ServicesService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
  ) {


    // this.inputForm = this.formBuilder.group({
    //   email: new FormControl('',Validators.compose([
    //     Validators.required,
    //     Validators.email
    //   ])),
    //   tel: new FormControl('',Validators.compose([
    //     Validators.required,
    //     Validators.max(10)
    //   ]))
    // });

    this.serviceRecord = {
      user: '',
      email: '',
      tel: '',
      address: ''
    }
  }



  ngOnInit() {
  }

  // async presentAlert(header: any, msg: any){
  //   let alert = await this.alertController.create({
  //     header: header,
  //     message: msg,
  //     buttons:['OK']
  //   });
  //   alert.present();
  // }

  // async checkValid(){
  //   let data = this.inputForm.value;
  //   if(!this.inputForm.valid){
  //     this.presentAlert("แจ้งเตือน","กรุณากรอกข้อมูลให้ถูกต้อง");
  //     return;
  //   }
  // }

  gotoOrderPage() {
    console.log(this.serviceRecord);
    let navigationExtras: NavigationExtras = {
      state: {
        // dataObject:{
        //   inputCharacter : this.serviceRecord
        // }
        dataObject: this.serviceRecord
      }
    };
    this.router.navigate(['/food-order'], navigationExtras);
  }



  addService(addrecord: any) {

    if (this.serviceRecord.user === "") {
      this.showAlert();
    } else if (this.serviceRecord.email === "") {
      this.showAlert();
    } else if (this.serviceRecord.tel === "") {
      this.showAlert();
    } else if (this.serviceRecord.address === "") {
      this.showAlert();
    } else {
      
      this.presentAlertConfirm(addrecord);
    }

  }

  async presentAlertConfirm(record: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'แจ้งเตือน!',
      message: '<strong>กรุณาตรวจสอบข้อมูลของท่าน <br>จะไม่สามารถแก้ไขได้ภายหลัง</strong> !',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel .. ');
          }
        }, {
          text: 'ต่อไป',
          handler: () => {
            console.log('Confirm Okay');
            // this.addService(record);
            this.serviceservice.addPersonToFirestore(record);
            this.gotoOrderPage();
          }
        }
      ]
    });
    await alert.present();
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'InValid Data',
      message: '<strong>Please insert all data</strong>',
      buttons: [
        {
          text: 'OK',
          role: 'ok',
          handler: (cancel) => {
            console.log('Please Input Value..');
          }
        }
      ]
    });

    await alert.present();
  }

  // presentAlertConfirm(record : any){

  //   this.addService(record);
  // }
}
