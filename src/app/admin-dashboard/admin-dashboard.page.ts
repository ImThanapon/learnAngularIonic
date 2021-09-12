import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { AlertController, ModalController } from '@ionic/angular';
import { FormControl, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  

  // File upload task 
  fileUploadTask: AngularFireUploadTask;

  // Upload progress
  percentageVal: Observable<number>;

  // Track file uploading with snapshot
  trackSnapshot: Observable<any>;

  // Uploaded File URL
  UploadedImageURL: Observable<string>;

  // Uploaded image collection
  files: Observable<imgFile[]>;

  // Image specifications
  imgName: string;
  imgSize: number;

  // File uploading status
  isFileUploading: boolean;
  isFileUploaded: boolean;

  private filesCollection: AngularFirestoreCollection<imgFile>;


  order: {
    id: string;
    name: string;
  }

  allBills: {
    id: string;
    user: string;
    payment: number;
    time: string;
    phone: string;
    address: string;
  }
  menuRecord: {
    id: string;
    name: string;
    price: number;
    star: Number;
    type: string;
    image: string;
  }
  constructor(private serviceservice: ServicesService,
    private alertController: AlertController,
    private router: Router
  ) {

    // this.isFileUploading = false;
    // this.isFileUploaded = false;

    // // Define uploaded files collection
    // this.filesCollection = afs.collection<imgFile>('imagesCollection');
    // this.files = this.filesCollection.valueChanges();


    this.menuRecord = {
      id: '',
      name: '',
      price: 0,
      star: 0,
      type: '',
      image: ''
    }
  }
  ionViewWillEnter() {
    this.getAllBills();
    
  }

  getAllBills() {
    // this.allMenu = [];
    this.serviceservice.getBillsData().then((data) => {
      if (data.length == 0) {
        console.log("No data found!");
      } else {
        this.allBills = data;
        console.log("Tab#2", this.allBills);
        
      }
    })
  }

  seeDetail(detail:any){
    
    this.serviceservice.getOrderBy(detail).then((data) => {
      if (data.length == 0) {
        console.log("No data found!");
      } else {
        this.order = data;
        console.log("Tab#2", this.order);
        this.gotoOrderDetaile();
        // this.serviceservice.presentToast( this.order);
      }
    })

    // console.log(this.serviceservice.getOrderBy(uid));
  }

  gotoOrderDetaile() {
    console.log(this.order);
    let navigationExtras: NavigationExtras = {
      state: {
        // dataObject:{
        //   inputCharacter : this.serviceRecord
        // }
        dataObject: this.order
      }
    };
    this.router.navigate(['/order-detail'], navigationExtras);
  }

  ngOnInit() {
  }

  addServices(addrecord: any, name: any) {
    addrecord.image = 'https://static.thenounproject.com/png/1695234-200.png';
    this.serviceservice.addMenuRecordToFirestores(addrecord, name);
  }

  async presentAlertConfirm(id: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'แจ้งเตือน!',
      message: '<strong>ต้องการปิดคำสั่งซื้อนี้หรือไม่</strong> !',
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
            
            this.serviceservice.deleteList(id).then(() => {
              this.getAllBills();
            });

            // this.serviceservice.deleteList(id);
            // this.getAllBills();
          }
        }
      ]
    });

    await alert.present();
  }

}