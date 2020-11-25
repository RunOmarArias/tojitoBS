import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  servicio: string;
  services = [];

  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  addService(){
    if(this.servicio != null){
      this.services.push(this.servicio);
      this.servicio = null;
    }
    else{
      this.dataService.showToast("Tienes que agregar un servicio");
    }
  }

  delete(item){
    let pos = this.services.indexOf(item);
    console.log(pos);
    this.services.splice(pos, 1)
  }

  saveServices(){
    this.modalCtrl.dismiss({
      servicios: this.services
    });
  }

}
