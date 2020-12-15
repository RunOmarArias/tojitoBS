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

  slides = [
    { img: 'assets/img/mujer.jpeg' },
    { img: 'assets/img/pastel.jpeg' },
    { img: 'assets/img/dinero.jpeg' }
  ];

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
      this.neg.servicios = data["servicios"];
      this.neg.desc = data["desc"];
      this.neg.tel = data["tel"];
      this.neg.menu = data["menu"];
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
    await modal.onDidDismiss().then(()=>{
      this.getBusinessById(this.user.id)
    })
  }

  async openModalservicios(){
    const modal = await this.modalCtrl.create({
      component: EditservicesPage,
      componentProps: {
        servicios: this.neg.servicios
      }
    });
    await modal.present();
    await modal.onDidDismiss().then(()=>{
      this.getBusinessById(this.user.id)
    })
  }

  logOut(){
    this.dataService.singOut();
  }

  deleteAccount(){
    this.dataService.eliminarUserColecc(this.user.id);
  }


  //----------------------------------------------------------------------------------------
  //Actualizar nombre
  async showAlertInputName() {
    const alert = await this.alertCtrl.create({
      header: "Nombre de mi negocio",
      message: "Ingresa el nuevo nombre de tu negocio. <br><br>Actual:<br>"+this.neg.nombre,
      inputs: [
        {
          type: 'text',
          name: 'name',
          placeholder: "Nuevo nombre"
        }
      ],
      buttons: [
        { text: 'Aceptar' },
        { text: 'Cancelar' }
      ],
      backdropDismiss: false
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    let data = result.data.values.name;
    if(data != ""){
      this.dataService.updateDataName(data, this.user.id);
    }
    else{
      this.dataService.showToast("No se hicieron cambios.");
    }
  }
  //Actualizar eslogan
  async showAlertInputEslogan() {
    const alert = await this.alertCtrl.create({
      header: "Eslogan de mi negocio",
      message: "Ingresa el nuevo eslogan de tu negocio. <br><br>Actual:<br>"+this.neg.eslogan,
      inputs: [
        {
          type: 'text',
          name: 'eslogan',
          placeholder: "Nueva eslogan"
        }
      ],
      buttons: [
        { text: 'Aceptar' },
        { text: 'Cancelar' }
      ],
      backdropDismiss: false
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    let data = result.data.values.eslogan;
    if(data != ""){
      this.dataService.updateDataEslogan(data, this.user.id);
    }
    else{
      this.dataService.showToast("No se hicieron cambios.");
    }
  }
  //Actualizar direccion
  async showAlertInputDir() {
    const alert = await this.alertCtrl.create({
      header: "Dirección de mi negocio",
      message: "Ingresa la nueva dirección de tu negocio. <br><br>Actual:<br>"+this.neg.direccion,
      inputs: [
        {
          type: 'text',
          name: 'dir',
          placeholder: "Nueva dirección"
        }
      ],
      buttons: [
        { text: 'Aceptar' },
        { text: 'Cancelar' }
      ],
      backdropDismiss: false
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    let data = result.data.values.dir;
    if(data != ""){
      this.dataService.updateDataDir(data, this.user.id);
    }
    else{
      this.dataService.showToast("No se hicieron cambios.");
    }
  }
  //Actualizar direccion
  async showAlertInputTel() {
    const alert = await this.alertCtrl.create({
      header: "Teléfono de mi negocio",
      message: "Ingresa el nuevo teléfono de tu negocio. <br><br>Actual:<br>"+this.neg.tel,
      inputs: [
        {
          type: 'text',
          name: 'tel',
          placeholder: "Nuevo teléfono"
        }
      ],
      buttons: [
        { text: 'Aceptar' },
        { text: 'Cancelar' }
      ],
      backdropDismiss: false
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    let data = result.data.values.tel;
    if(data != ""){
      this.dataService.updateDataTel(data, this.user.id);
    }
    else{
      this.dataService.showToast("No se hicieron cambios.");
    }
  }
  //Actualizar direccion
  async showAlertInputDesc() {
    const alert = await this.alertCtrl.create({
      header: "Descripción de mi negocio",
      message: "Ingresa una descripción nueva de tu negocio. <br><br>Actual:<br>"+this.neg.desc,
      inputs: [
        {
          type: 'text',
          name: 'desc',
          placeholder: "Nueva descripción"
        }
      ],
      buttons: [
        { text: 'Aceptar' },
        { text: 'Cancelar' }
      ],
      backdropDismiss: false
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    let data = result.data.values.desc;
    if(data != ""){
      this.dataService.updateDataDesc(data, this.user.id);
    }
    else{
      this.dataService.showToast("No se hicieron cambios.");
    }
  }
}
