import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { Negocio } from 'src/app/interface/negocio';
import { Usuario } from 'src/app/interface/usuario';
import { EditmenuPage } from '../editmenu/editmenu.page';
import { EditservicesPage } from '../editservices/editservices.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user = {} as Usuario;
  neg = {} as Negocio;

  constructor(
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.getUser();
  }

  ionViewDidEnter(){
    this.getBusinessById();
  }

  async getUser(){
    await this.afAuth.onAuthStateChanged( data => {
      this.user.id = data.uid;
      this.user.nombre = data.displayName;
      this.user.foto = data.photoURL;
    })
  }

  async getBusinessById(){
    this.firestore.doc("negocios/"+this.user.id).valueChanges().subscribe( data => {
      this.neg.nombre = data["nombre"];
      this.neg.eslogan = data["eslogan"];
      this.neg.direccion = data["direccion"];
      this.neg.servicios = data["servicios"].servicios;
      this.neg.desc = data["desc"];
      this.neg.tel = data["tel"];
      this.neg.menu = data["menu"].menu;
    });
  }

  async openModalMenu(){
    const modal = await this.modalCtrl.create({
      component: EditmenuPage,
      componentProps: {
        menu: this.neg.menu
      }
    });
    await modal.present();
  }

  async openModalservicios(){
    const modal = await this.modalCtrl.create({
      component: EditservicesPage,
      componentProps: {
        servicios: this.neg.servicios
      }
    });
    await modal.present();
  }

  async singOut(){
    let loader = this.loadingCtrl.create({
      message: 'Cerrando sesión'
    });
    (await loader).present();
    this.afAuth.signOut().then(() => {
      console.log('Se ha cerrado la sesión');
      this.navCtrl.navigateRoot('init');
    }).catch( exit => {
      console.log(exit);
    });
    (await loader).dismiss();
  }

}
