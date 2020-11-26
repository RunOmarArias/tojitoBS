import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { Negocio } from 'src/app/interface/negocio';
import { Usuario } from 'src/app/interface/usuario';
import { DataService } from 'src/app/services/data.service';
import { MenuPage } from '../menu/menu.page';
import { ServiciosPage } from '../servicios/servicios.page';

@Component({
  selector: 'app-nego2',
  templateUrl: './nego2.page.html',
  styleUrls: ['./nego2.page.scss'],
})
export class Nego2Page implements OnInit {

  user = {} as Usuario;
  negocio = {} as Negocio;
  statusMen: boolean = true;
  statusSer: boolean = true;
  statusBotMen: string = "outline";
  statusBotSer: string = "outline";

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private dataService: DataService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getUser();
  }

  ionViewDidEnter(){
    this.getBusinessById(this.user.id);
  }

  async getUser(){
    await this.afAuth.onAuthStateChanged( data => {
      this.user.id = data.uid;
      this.user.nombre = data.displayName;
      this.user.correo = data.email;
    })
  }

  async getBusinessById(id: string){
    this.firestore.doc("negocios/"+id).valueChanges().subscribe( data => {
      this.negocio.nombre = data["nombre"];
      this.negocio.direccion = data["direccion"];
      this.negocio.tel = data["tel"];
    });
  }

  async openModalMenu(){
    const modal = await this.modalCtrl.create({
      component: MenuPage
    })
    await modal.present();

    const {data} = await modal.onDidDismiss();
    this.negocio.menu = data
    this.statusMen = false;
    this.statusBotMen = "solid";
    console.log(this.negocio.menu);
  }

  async openModalServices(){
    const modal = await this.modalCtrl.create({
      component: ServiciosPage
    })
    await modal.present();

    const {data} = await modal.onDidDismiss();
    this.negocio.servicios = data
    this.statusSer = false;
    this.statusBotSer = "solid";
    console.log(this.negocio.servicios);
  }

  async openActionSheet(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Seleccionar archivo de...',
      buttons: [
        { text: 'Cámara', icon: 'camera' },
        { text: 'Galeria', icon: 'image' },
        { text: 'Cancelar', role: 'cancel', icon: 'close' }
      ]
    });
    await actionSheet.present();
  }

  envioNeg2(){
    if (this.negocio.servicios.length!=0 && this.negocio.menu.length!=0) {
      this.dataService.creaNegocio(this.negocio, this.user.id).then(() =>{
        this.navCtrl.navigateRoot('home');
      })
      this.dataService.showToast("Bienvenido a Tojito Business "+this.user.nombre)
    }
    else {
      this.dataService.showToast("Por favor, agrega todos los campos.");
    }
  }

}
