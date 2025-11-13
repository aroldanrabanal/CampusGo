import { Component, OnInit } from '@angular/core';
import {
  IonFooter,
  IonIcon,
  IonRouterLink,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookmark, images, calendar, accessibility } from 'ionicons/icons';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
    IonIcon, IonTabBar, IonTabButton, IonTabs, IonFooter, IonToolbar, IonRouterLink, RouterLink
  ]
})
export class FooterComponent implements OnInit {

  constructor() {
    addIcons({ bookmark, images, calendar, accessibility });
  }

  ngOnInit() {}
}
