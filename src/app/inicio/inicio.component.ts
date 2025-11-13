import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {IonIcon} from "@ionic/angular/standalone";
import {FooterComponent} from "../footer/footer.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  standalone: true,
  imports: [IonicModule, IonIcon, FooterComponent, RouterLink],
})
export class InicioComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
