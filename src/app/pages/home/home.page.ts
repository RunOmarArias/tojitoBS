import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Negocio } from 'src/app/interface/negocio';
import { Usuario } from 'src/app/interface/usuario';
import { DataService } from 'src/app/services/data.service';
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
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private modalCtrl: ModalController,
    private dataService: DataService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getUser();
  }

  ionViewDidEnter(){
    if(this.user.id == undefined){
      this.checkBusiness(localStorage.getItem('id'));
    }
    else{
      this.checkBusiness(this.user.id);
      localStorage.setItem('id', this.user.id);
    }
  }

  async getUser(){
    await this.afAuth.onAuthStateChanged( data => {
      this.user.id = data.uid;
      this.user.correo = data.email;
      this.user.nombre = data.displayName;
      this.user.foto = data.photoURL;
    })
  }

  async openAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Parece que ocurrió algo...',
      message: 'La cuenta '+this.user.correo+' no tiene un negocio asociado.<br>'+
                'Deberá de eliminar la cuenta y volver a registrarse de manera correcta.',
      buttons: [
        {
          text: 'Eliminar cuenta',
          handler: () => {
            this.deleteAccount();
          }
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

  async checkBusiness(id: string){
    const docUser = this.firestore.collection("negocios").doc(id).ref;
    docUser.get().then(data =>{
      if(data.exists){
        this.getBusinessById(id);
      }
      else{
        this.openAlert();
      }
    });
  }

  async getBusinessById(id: string){
    const loader = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loader.present();
    this.firestore.doc("negocios/"+id).valueChanges().subscribe( data => {
      this.neg.nombre = data["nombre"];
      this.neg.eslogan = data["eslogan"];
      this.neg.direccion = data["direccion"];
      this.neg.servicios = data["servicios"].servicios;
      this.neg.desc = data["desc"];
      this.neg.tel = data["tel"];
      this.neg.menu = data["menu"].menu;
    });
    loader.dismiss();
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

  logOut(){
    this.dataService.singOut();
  }

  deleteAccount(){
    this.eliminarUserColecc(this.user.id);
    this.eliminarUserAuth();
  }

  //Eliminar usuario de la coleccion Usuarios
  async eliminarUserColecc(id: string){
    await this.firestore.collection("usuarios").doc(id).delete().then(d => {
      console.log("Usuario eliminado con éxito de la colección.");
    }).catch( e => {
      console.log(e);
    })
  }

  //Eliminar cuenta de usuario
  async eliminarUserAuth(){
    let user = this.afAuth.currentUser;
    let loader = this.loadingCtrl.create({
      message: 'Eliminando cuenta...'
    });
    (await loader).present();

    (await user).delete().then( () => {
      this.navCtrl.navigateBack('init');
      console.log("Usuario eliminado de Autenticación");
    }).catch(()=> {
      this.dataService.showToast('Ha ocurrido un error, intente más tarde');
    });
    (await loader).dismiss();
  }

}
