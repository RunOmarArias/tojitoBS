import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interface/usuario';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  user = {} as Usuario

  constructor(
    private afAuth: AngularFireAuth,
    private dataService: DataService,
    private alertCtrl: AlertController,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getUser()
  }

  ionViewDidEnter(){
    if(this.user.id == undefined){
      this.checkUser(localStorage.getItem('id'));
    }
    else{
      this.checkUser(this.user.id);
      localStorage.setItem('id', this.user.id);
    }
  }

  async getUser(){
    await this.afAuth.onAuthStateChanged( data => {
      this.user.id = data.uid;
      this.user.foto = data.photoURL;
    })
  }

  async checkUser(id: string){
    const docUser = this.firestore.collection("usuarios").doc(id).ref;
    docUser.get().then(data =>{
      if(data.exists){
        this.getUserById(id);
      }
      else{
        this.dataService.showToast("ocurrió un error al obtener la información, por favor, intente más tarde")
      }
    });
  }

  async getUserById(id: string){
    const loader = await this.loadingCtrl.create({
      message: 'Obteniendo información...'
    });
    await loader.present();
    this.firestore.doc("usuarios/"+id).valueChanges().subscribe( data => {
      this.user.nombre = data["nombre"];
      this.user.correo = data["correo"];
      this.user.tel = data["tel"];
      this.user.contrasena = data["contrasena"];
    });
    loader.dismiss();
  }

  //------------------------------------------------------------------------------------
  //Actualizar nombre de usuario
  async showAlertInputName() {
    const alert = await this.alertCtrl.create({
      header: "Nombre De Usuario",
      message: "Puedes cambiar tu nombre de usuario cuantas veces quieras. Ingresa uno. <br><br>Actual:<br>"+this.user.nombre,
      inputs: [
        {
          type: 'text',
          name: 'name',
          placeholder: "Nuevo Nombre de Usuario"
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
      this.dataService.dataName(data, this.user.id);
    }
    else{
      this.dataService.showToast("No se hicieron cambios.");
    }
  }

  //Actualizar telefono de usuario
  async showAlertInputTel() {
    const alert = await this.alertCtrl.create({
      header: "Teléfono De Contacto de Usuario",
      message: "Puedes cambiar tu número de teléfono cuantas veces quieras. Ingresa uno.<br>"+
                "Recuerda que el télefono debe ser a 10 dígitos.<br><br>"+
                "Actual:<br>"+this.user.tel,
      inputs: [
        {
          type: 'text',
          name: 'tel',
          placeholder: "Nuevo Número de Teléfono",
          attributes: {
            minlength: 10,
            maxlength: 10
          }
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
      this.dataService.dataTel(data, this.user.id);
    }
    else{
      this.dataService.showToast("No se hicieron cambios.");
    }
  }

  //Actualizar contraseña de usuario
  async showAlertInputPass() {
    const alert = await this.alertCtrl.create({
      header: "Actualizar Contraseña",
      message: "Puedes cambiar contraseña cuantas veces quieras. Procura siempre recordarla.<br>"+
                "Recuerda que la contraseña debe tener al menos 8 caractéres.<br>"+
                "Al cambiar tu contraseña se redireccionará a Inicio de Sesión.",
      inputs: [
        {
          type: 'password',
          name: 'pass',
          placeholder: "Nueva Contraseña"
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
    let data = result.data.values.pass;
    if(data != "" && data.length > 7){
      this.dataService.dataPass(data, this.user.id);
    }
    else{
      this.dataService.showToast("No se hicieron cambios.");
    }
  }

  //--------------------------------------------------------------------------------------

  async alertLogOut(){
    const alert = await this.alertCtrl.create({
      header: "Cerrar sesión",
      message: "Estas a punto de cerrar sesión.<br>¿Continuar?",
      buttons: [
        { text: 'Aceptar', handler: ()=>{
          this.dataService.singOut();
        }},
        { text: 'Cancelar', role: 'cancel'}
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

  async alertDelete(){
    const alert = await this.alertCtrl.create({
      header: "Eliminar Cuenta",
      message: "Al eliminar tu cuenta de usuario también se dará de baja el "+
                "negocio asociado a ella junto con toda su información.<br>"+
                "Si en algún momento desea volver a registrarse, podrá hacerlo "+
                "con la misma dirección de correo electrónico.<br><br>"+
                "Si está seguro de eliminar la cuenta presione el botón <strong>Aceptar</strong>.",
      buttons: [
        { text: 'Aceptar', handler: ()=>{
          this.eliminarNegocio(this.user.id).then(()=>{
            this.dataService.eliminarUserColecc(this.user.id);
            this.dataService.showToast("Negocio eliminado con éxito.");
          }).catch(()=>{
            this.dataService.showToast("Ha ocurrido un error, intente más tarde.")
          })
        }},
        { text: 'Cancelar', role: 'cancel'}
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

  //Borrar negocio
  async eliminarNegocio(id: string){
    let loader = this.loadingCtrl.create({
      message: 'Eliminando negocio...'
    });
    (await loader).present();
    await this.firestore.collection("negocios").doc(id).delete();
    (await loader).dismiss();
  }

}
