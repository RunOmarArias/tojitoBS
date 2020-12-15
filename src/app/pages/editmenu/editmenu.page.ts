import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
import { Menu } from 'src/app/interface/menu';
import { Usuario } from 'src/app/interface/usuario';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-editmenu',
  templateUrl: './editmenu.page.html',
  styleUrls: ['./editmenu.page.scss'],
})
export class EditmenuPage implements OnInit {

  user = {} as Usuario
  @Input() menu;
  auxMenu: Menu []
  nombre: string;
  precio: number;

  constructor(
    private afAuth: AngularFireAuth,
    private modalCtrl: ModalController,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.auxMenu = this.menu;
    this.getUser();
  }

  async getUser(){
    await this.afAuth.onAuthStateChanged( data => {
      this.user.id = data.uid;
    })
  }

  addFood(){
    if(this.nombre != null && this.precio != null){
      let newfood = {
        nombre: this.nombre,
        precio: this.precio
      }
      this.auxMenu.push(newfood);
      this.nombre = null;
      this.precio = null;
    }
    else{
      this.dataService.showToast("Por favor, agrega el nombre y precio de tu platillo");
    }
  }

  delete(item){
    let pos = this.auxMenu.indexOf(item);
    this.auxMenu.splice(pos, 1)
  }

  saveMenu(){
    this.dataService.updateDataMenu(this.auxMenu, this.user.id)
    this.modalCtrl.dismiss();
  }

  cancel(){
    this.dataService.showToast("No se hicieron cambios en el menú.")
    this.modalCtrl.dismiss();
  }

}
