import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Negocio } from 'src/app/interface/negocio';
import { Usuario } from 'src/app/interface/usuario';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-nego1',
  templateUrl: './nego1.page.html',
  styleUrls: ['./nego1.page.scss'],
})
export class Nego1Page implements OnInit {

  negocio = {} as Negocio
  user = {} as Usuario

  constructor(
    private dataService: DataService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.getUser();
  }

  async getUser(){
    await this.afAuth.onAuthStateChanged( data => {
      this.user.id = data.uid;
      this.user.nombre = data.displayName;
      this.user.correo = data.email;
    })
  }

  envioNeg1(){
    console.log("Primeros datos de negocio");
    this.dataService.creaNegocio(this.negocio, this.user.id);
  }

  async getBusinessById(){
    
  }

}
