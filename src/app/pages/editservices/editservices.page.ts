import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editservices',
  templateUrl: './editservices.page.html',
  styleUrls: ['./editservices.page.scss'],
})
export class EditservicesPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  cancel(){
    this.modalCtrl.dismiss();
  }

}
