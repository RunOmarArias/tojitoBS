import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-editmenu',
  templateUrl: './editmenu.page.html',
  styleUrls: ['./editmenu.page.scss'],
})
export class EditmenuPage implements OnInit {

  @Input() menu;
  nombre: string;
  precio: number;

  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  addFood(){
    if(this.nombre != null && this.precio != null){
      let newfood = {
        nombre: this.nombre,
        precio: this.precio
      }
      this.menu.push(newfood);
      this.nombre = null;
      this.precio = null;
      console.log(this.menu);
    }
    else{
      this.dataService.showToast("Por favor, agrega el nombre y precio de tu platillo");
    }
  }

  cancel(){
    this.modalCtrl.dismiss();
  }

}
