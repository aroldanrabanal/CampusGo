import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ModalController, NavController, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonImg, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonIcon
  ]
})
export class EventModalComponent {
  @Input() evento: any;

  constructor(
    private modalController: ModalController,
    private navCtrl: NavController
  ) {}

  cerrar() {
    this.modalController.dismiss();
  }

  irAPasarela() {
    this.modalController.dismiss();
    this.navCtrl.navigateForward('/pasarela-pago', {
      state: { evento: this.evento }
    });
  }

  inscribirseGratis() {
    Swal.fire({
      title: '¡Inscrito!',
      text: `Te has inscrito en "${this.evento.titulo}"`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      this.modalController.dismiss({ inscrito: true });
    });
  }
}
