import { Component, inject } from '@angular/core';
import { addIcons } from 'ionicons';
import { ModalController, IonContent, IonImg, IonButton, IonIcon } from '@ionic/angular/standalone';
import {
  heartOutline, thumbsDownOutline, chevronBackOutline, chevronForwardOutline,
  shareSocialOutline, ellipsisHorizontalOutline, eyeOutline, paperPlaneOutline
} from 'ionicons/icons';

import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { EventModalComponent } from '../event-modal/event-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    IonContent, IonImg, IonButton, IonIcon
  ]
})
export class HomePage {

  private modalController = inject(ModalController);

  evento = {
    titulo: "Musical 1",
    imagen: "../assets/img/evento1.jpg",
    fecha: "15 de Diciembre, 2025",
    hora: "20:00",
    lugar: "Teatro Nacional",
    descripcion: "Un espectáculo musical lleno de color, baile y emoción. ¡No te lo pierdas! Incluye artistas internacionales y efectos visuales impresionantes."
  };

  constructor() {
    addIcons({
      'heart-outline': heartOutline,
      'thumbs-down-outline': thumbsDownOutline,
      'chevron-back-outline': chevronBackOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'share-social-outline': shareSocialOutline,
      'ellipsis-horizontal-outline': ellipsisHorizontalOutline,
      'eye-outline': eyeOutline,
      'paper-plane-outline': paperPlaneOutline,

    });
  }

  ngOnInit() {
  }

  async abrirModal() {
    const modal = await this.modalController.create({
      component: EventModalComponent,
      componentProps: { evento: this.evento },
      cssClass: 'event-modal',
      backdropDismiss: true
    });
    await modal.present();
  }

  like() {
    console.log("Like");
  }

  dislike() {
    console.log("Dislike");
  }

  sendEmail() {
    console.log("Send email");
  }
}
