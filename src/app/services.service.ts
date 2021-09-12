import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
//import for show loading icon
import { LoadingController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
//import for popover
import { PopoverController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


export enum SearchType{
  all = '',
  thai= 'thai',
  esan = 'esan',
  italian = 'italian',
  fastfood= 'fastfood',
  drink ='drink',
  dessert = 'dessert'
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  order_name : any;
  loading : any;
  collection_menu : any = '/menu/';
  collection_person : any = '/person/';
  collection_order : any ;
  collection_review : any = '/Review/';
  collection_bill : any = '/bills/';


  constructor(
    private loadingController : LoadingController,
    private toastController : ToastController,
    private angularFirestore : AngularFirestore,
    private popoverController: PopoverController,
    private httpClient: HttpClient,
    private router : Router
    ) { }

    // url = 'https://corona.lmao.ninja/v2/countries/';
    // searchMovie()  {
    //   let targetUrl: any;
    //   targetUrl = this.url 
    //   return this.httpClient.get(this.url);
    // }
     
    // getMovieDetail(id: string) {
     
    //   let targetUrl =this.url +encodeURI(id) ;  
    //   return this.httpClient.get(targetUrl);
    // }

    

    async presentToast(msg:any){
      const toast = await this.toastController.create({
        message:msg,
        duration:3000
      });
      toast.present();
    }
    // getCollectionOrder(){
    //   return this.collection_order;
    // }
    setCollectionOrder(collection:any){
      this.collection_order = '/'+collection+'/';
    }

    async presentLoading(){
      this.loading = await this.loadingController.create({
        message:'รอสักครู่ ...'
      });
      await this.loading.present();
    }

    stopPresentLoading(){
      this.loading.dismiss();
    }

    async presentPopover(ev: any) {
      const popover = await this.popoverController.create({
        component: 'PopoverComponent',
        cssClass: 'my-custom-class',
        event: ev,
        translucent: true
      });
      return await popover.present();
    }

    addRecordToFirestore(addrecord : any){
      console.log(addrecord);
      this.angularFirestore.collection(this.collection_menu).add(addrecord).then(()=>{
        this.presentToast('เพิ่มรายการอาหารสำเร็จ ... ');
      });
    }

    addReviewToFirestore(addrecord : any){
      console.log(addrecord);
      this.angularFirestore.collection(this.collection_review).add(addrecord).then(()=>{
        this.presentToast('รีวิวสำเร็จ ... ');
      });
    }

    addPersonToFirestore(addrecord : any){
      console.log(addrecord);
      this.angularFirestore.collection(this.collection_person).add(addrecord).then(()=>{
        this.presentToast('รับข้อมูลลูกค้าสำเร็จ ... ');
     
      });
    }

    // addOrderToFirestore(addrecord : any){
    //   console.log(addrecord);
    //   this.angularFirestore.collection(this.collection_order).add(addrecord).then(()=>{
    //     this.presentToast('เพิ่มรายการลงตะกร้าแล้ว');
    //   });
    // }

    //
    addOrderToFirestore(addrecord : any){
      console.log(addrecord);
      this.angularFirestore.collection(this.collection_order).add(addrecord).then(()=>{
        this.presentToast('เพิ่มรายการลงตะกร้าแล้ว');
      });
    }

    //

    addMenuRecordToFirestores(addrecord:any, name:any){
      this.angularFirestore.collection(this.collection_menu).doc(name)
      .set(addrecord).then(() => {
        this.presentToast("เพิ่มเมนูอาหารสำเร็จ ... ");
      });
    }

    addBillToFirestore(addrecord:any){
      this.angularFirestore.collection(this.collection_bill).doc(addrecord.id)
      .set(addrecord).then(() => {
        this.presentToast("ส่งแบบแจ้งชำระเงินสำเร็จ ");
      });
    }

    async getPersonData(){
      let recs:any = [];
      this.presentLoading();
      await this.angularFirestore.collection(this.collection_person).get()
        .toPromise().then(res => {
          res.forEach((doc:any) => {
            recs.push({
              id:doc.id,
              user: doc.data().user,
              email: doc.data().email,
              tel: doc.data().tel,
              address: doc.data().address
            });
          });
          this.stopPresentLoading();
        });
        return recs;
    }

    async getMenuData(){
      let recs:any = [];
      this.presentLoading();
      await this.angularFirestore.collection(this.collection_menu).get()
        .toPromise().then(res => {
          res.forEach((doc:any) => {
            recs.push({
              id:doc.id,
              name:doc.data().name,
              price:doc.data().price,
              image:doc.data().image,
              type:doc.data().type,
              star:doc.data().star
            });
          });
          this.stopPresentLoading();
        });
        return recs;
    }

    async getCommentsData(){
      let recs:any = [];
      this.presentLoading();
      await this.angularFirestore.collection(this.collection_review).get()
        .toPromise().then(res => {
          res.forEach((doc:any) => {
            recs.push({
              id:doc.id,
              user:doc.data().user,
              msg:doc.data().msg,
              point:doc.data().point
            });
          });
          this.stopPresentLoading();
        });
        return recs;
    }
    

    async getOrderData(){
      let recs:any = [];
      this.presentLoading();
      await this.angularFirestore.collection(this.collection_order).get()
        .toPromise().then(res => {
          res.forEach((doc:any) => {
            recs.push({
              id:doc.id,
              image:doc.data().image,
              name:doc.data().name,
              price:doc.data().price,
              type:doc.data().type,
              amount:doc.data().amount
            });
          });
          this.stopPresentLoading();
        });
        return recs;
    }
    async getOrderBy(orderName:any){
      let recs:any = [];
      this.presentLoading();
      await this.angularFirestore.collection("/orderBy"+orderName+"/").get()
        .toPromise().then(res => {
          res.forEach((doc:any) => {
            recs.push({
              id:doc.id,
              name:doc.data().name,
            });
          });
          this.stopPresentLoading();
        });
        console.log(recs);
        return recs;
    }

    async getBillsData(){
      let recs:any = [];
      this.presentLoading();
      await this.angularFirestore.collection("/bills/").get()
        .toPromise().then(res => {
          res.forEach((doc:any) => {
            recs.push({
              id:doc.id,
              user:doc.data().user,
              payment:doc.data().payment,
              time:doc.data().time,
              phone:doc.data().phone,
              address:doc.data().address
            });
          });
          this.stopPresentLoading();
        });
        return recs;
    }



    async updateRecord(record:any){
      let updaterecord = {}
      updaterecord['name'] = record.name;
      updaterecord['price'] = record.price;
      await this.angularFirestore.doc(this.collection_menu+record.id).update(updaterecord).then(()=>{
        this.presentToast('Update record successfully ... ');
      });
    }

    async updatePersonRecord(record:any){
      let updaterecord = {}
      updaterecord['user'] = record.user;
      updaterecord['email'] = record.email;
      updaterecord['tel'] = record.tel;
      updaterecord['address'] = record.address;
      await this.angularFirestore.doc(this.collection_person+record.id).update(updaterecord).then(()=>{
        this.presentToast('แก้ไขข้อมูลลูกค้าสำเร็จ ... ');
      });
    }

    async deleteOrder(id:any){
      await this.angularFirestore.doc(this.collection_order+id).delete().then(()=>{
          this.presentToast('ลบรายการสำเร็จ ... ');
      })
    }

    async deleteList(id:any){
      await this.angularFirestore.doc("/bills/"+id).delete().then(()=>{
          this.presentToast('ปิดคำสั่งซื้อสำเร็จ ... ');
      })
    }


    async deleteRecord(id:any){
      await this.angularFirestore.doc(this.collection_menu+id).delete().then(()=>{
          this.presentToast('Delete record successfully ... ');
      })
    }

    async deletePersonRecord(id:any){
      await this.angularFirestore.doc(this.collection_person+id).delete().then(()=>{
          this.presentToast('ล้างรายชื่อลูกค้าสำเร็จ ... ');
      })
    }
}
