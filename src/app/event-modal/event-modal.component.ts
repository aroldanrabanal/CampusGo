import { Component, Input, inject } from '@angular/core';
import { ModalController, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonIcon, IonLabel
  ]
})
export class EventModalComponent {
  @Input() evento: any;

  private modalController = inject(ModalController);

  cerrar() {
    this.modalController.dismiss();
  }
}
