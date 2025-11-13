import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard, IonCardContent,
  IonCol,
  IonContent, IonFooter,
  IonGrid,
  IonHeader,
  IonImg, IonInput, IonInputPasswordToggle, IonItem, IonLabel, IonNote, IonRadio, IonRadioGroup,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonInput, IonItem, IonInputPasswordToggle, IonRadio, IonLabel, IonRadioGroup, IonNote, IonButton, IonFooter, RouterLink]
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
