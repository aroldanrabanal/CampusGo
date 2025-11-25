import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import { addIcons } from 'ionicons';
import {personCircle, notificationsSharp} from 'ionicons/icons';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    RouterLink,]
})
export class HeaderComponent  implements OnInit {

  constructor() {
    addIcons({ personCircle, notificationsSharp });
  }

  ngOnInit() {}

}
