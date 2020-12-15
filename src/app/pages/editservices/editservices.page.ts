import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/interface/usuario';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-editservices',
  templateUrl: './editservices.page.html',
  styleUrls: ['./editservices.page.scss'],
})
export class EditservicesPage implements OnInit {

  user = {} as Usuario
  @Input() servicios;
  auxService: string [];
  servicio: string;

  constructor(
    private afAuth: AngularFireAuth,
    private modalCtrl: ModalController,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.auxService = this.servicios;
    this.getUser()
  }

  async getUser(){
    await this.afAuth.onAuthStateChanged( data => {
      this.user.id = data.uid;
    })
  }

  addService(){
    if(this.servicio != null){
      this.auxService.push(this.servicio);
      this.servicio = null;
    }
    else{
      this.dataService.showToast("Tienes que agregar un servicio");
    }
  }

  delete(item){
    let pos = this.auxService.indexOf(item);
    this.auxService.splice(pos, 1)
  }

  saveServices(){
    this.dataService.updateDataServ(this.auxService, this.user.id)
    this.modalCtrl.dismiss();
  }

  cancel(){
    this.dataService.showToast("No se hicieron cambios en los servicios.");
    this.modalCtrl.dismiss();
  }

}
