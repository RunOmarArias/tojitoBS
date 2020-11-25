import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Menu } from 'src/app/interface/menu';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  nombre: string;
  precio: number;
  menuFull = []

  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  addFood(){
    if(this.nombre != null && this.precio != null){
      let menu = {
        nombre: this.nombre,
        precio: this.precio
      }
      this.menuFull.push(menu);
      this.nombre = null;
      this.precio = null;
      console.log(this.menuFull);
    }
    else{
      this.dataService.showToast("Por favor, agrega el nombre y precio de tu platillo");
    }
  }

  delete(item){
    let pos = this.menuFull.indexOf(item);
    console.log(pos);
    this.menuFull.splice(pos, 1)
  }

  saveMenu(){
    this.modalCtrl.dismiss({
      menu: this.menuFull
    });
  }

}
