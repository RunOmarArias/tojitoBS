import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Negocio } from '../interface/negocio';
import { Usuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user = {} as Usuario

  constructor(
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private navCtrl: NavController
  ) { }

  //Login de usuario
  async login(us: Usuario){
    let loader = this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    (await loader).present();

    try{
      await this.afAuth.signInWithEmailAndPassword(us.correo, us.contrasena).then(data => {
        console.log(data);
      })
    }
    catch(e){
      this.showToast('El correo electrónico o contraseña son incorrectos, verifique sus datos.');
    }
    (await loader).dismiss();
  }

  //Página de registro de usuario (Register Page)
  async registro(us: Usuario){
    let loader = this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    (await loader).present();

    try{
      await this.afAuth.createUserWithEmailAndPassword(us.correo, us.contrasena).then(() => {
        this.creaUsuario(us)
        this.data(us);
      });
    }
    catch(e){
      this.showToast("La dirección de correo ya ha sido registrada anteriormente, intenta con otra.");
    }
    (await loader).dismiss();
  }

  //Actualizar datos de usuario tras registro
  async updateUser(us: Usuario){
    try{
      await this.afAuth.signInWithEmailAndPassword(us.correo, us.contrasena).then(data => {
        console.log(data);
        this.navCtrl.navigateRoot('nego1');
      })
    }
    catch(e){}
  }

  //Agregar datos al perfil
  async data(us: Usuario){
    this.updateUser(us);
    (await this.afAuth.currentUser).updateProfile({
      displayName: us.nombre,
      photoURL: 'assets/icon/userNull.jpg'
    });
  }

  //Agrega usuario a su colección
  async creaUsuario(us: Usuario){
    let loader = this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    (await loader).present();
    try{  
      await this.firestore.collection("usuarios").add(us);
    }
    catch(e){}
    (await loader).dismiss();
  }

  //Agregar información del negocio
  async creaNegocio(neg: Negocio, id: string){
    try{  
      await this.firestore.collection("negocios").doc(id).set(neg);
    }
    catch(e){
      this.showToast("Ocurrió un error, intente más tarde")
    }
  }

  //Mensaje
  showToast(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then( toasData => toasData.present());
  }

}
