import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {IonIcon} from "@ionic/angular/standalone";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  standalone: true,
  imports: [IonicModule, IonIcon],
})
export class InicioComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
