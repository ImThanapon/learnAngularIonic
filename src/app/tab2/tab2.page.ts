import { Component } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  allComment: {
    user: string;
    msg: string;
    point: number;
  }

  constructor(private servicesService: ServicesService) {}


  ionViewWillEnter() {
    this.getAllComments();
  }

  getAllComments() {
    this.servicesService.getCommentsData().then((data) => {
      if (data.length == 0) {
        console.log("No data found!");
      } else {
        this.allComment = data;
        console.log("Tab#2", this.allComment);
      }
    })
  }



}
