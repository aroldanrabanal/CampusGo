import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent, IonCol,
  IonContent, IonFooter,
  IonHeader, IonImg, IonInput, IonInputPasswordToggle, IonLabel, IonNote, IonRadio, IonRadioGroup, IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-reg',
  templateUrl: './reg.page.html',
  styleUrls: ['./reg.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard, IonCardContent, IonCol, IonFooter, IonImg, IonInput, IonInputPasswordToggle, IonLabel, IonNote, IonRadio, IonRadioGroup, IonRow, RouterLink]
})
export class RegPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
