import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  cerrarSesion(){
    this.dataService.singOut();
  }

}
