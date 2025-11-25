import {Component, inject} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {addIcons} from "ionicons";
import { EventModalComponent } from '../event-modal/event-modal.component';
import { ModalController } from '@ionic/angular/standalone';
import {
  addCircleOutline,
  checkmarkCircle,
  closeCircle,
  personOutline,
  eyeOutline
} from 'ionicons/icons';
import Swal from 'sweetalert2';


interface Evento {
  id: number;
  titulo: string;
  fecha: string;
  hora: string;
  lugar: string;
  descripcion: string;
  imagen: string;
  precio?: number;
  estado: 'inscribirse' | 'inscrito' | 'cancelado' | 'acudido';
}

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrl: './favoritos.page.scss',
  standalone: true,
  imports: [CommonModule, IonicModule, FooterComponent, HeaderComponent, EventModalComponent]
})
export class FavoritosPage {
  private modalController = inject(ModalController);
  constructor() {
    addIcons({ addCircleOutline, checkmarkCircle, closeCircle, personOutline, eyeOutline });
  }
  eventos: Evento[] = [
    {
      id: 1,
      titulo: 'Musical 1: El Fantasma del Campus',
      fecha: '26 - 06 - 2026',
      hora: '20:00',
      lugar: 'Auditorio Principal',
      descripcion: 'Espectacular musical con orquesta en vivo...',
      imagen: '../../assets/img/evento1.jpg',
      precio: 15.00,
      estado: 'inscribirse'
    },
    {
      id: 2,
      titulo: 'Torneo de Ajedrez Blitz',
      fecha: '12 - 06 - 2026',
      hora: '14:00',
      lugar: 'Sala de Juegos',
      descripcion: 'Partidas de 5 minutos...',
      imagen: '../../assets/img/evento1.jpg',
      precio: 5.00,
      estado: 'inscribirse'
    },
    {
      id: 3,
      titulo: 'Feria Gastronómica Internacional',
      fecha: '28 - 06 - 2026',
      hora: '12:00 - 22:00',
      lugar: 'Patio de Comidas',
      descripcion: 'Comida de 15 países...',
      imagen: '../../assets/img/evento1.jpg',
      precio: 10.00,
      estado: 'inscrito'
    },
    {
      id: 4,
      titulo: 'Gratis',
      fecha: '28 - 06 - 2026',
      hora: '12:00 - 22:00',
      lugar: 'Patio de Comidas',
      descripcion: 'Evento sin precio',
      imagen: '../../assets/img/evento1.jpg',
      precio: 0,
      estado: 'inscrito'
    },
  ];

  async abrirDetalles(evento: any) {
    const modal = await this.modalController.create({
      component: EventModalComponent,
      componentProps: { evento },
      cssClass: 'event-modal',
      backdropDismiss: true
    });
    await modal.present();
  }
  inscribirse(evento: Evento) {
    Swal.fire({
      title: '¿Inscribirse al evento?',
      text: `Serás inscrito en "${evento.titulo}"`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, inscribirme',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#718096',
      reverseButtons: true,
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        evento.estado = 'inscrito';

        Swal.fire({
          title: '¡Inscrito!',
          text: `Ahora estás inscrito en "${evento.titulo}"`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
          background: '#10b981',
          color: 'white',
          iconColor: 'white',
          timerProgressBar: true
        });
      }
    });
  }

  getEstadoConfig(estado: string) {
    const configs: Record<string, any> = {
      inscribirse: {
        texto: 'Inscribirse',
        color: 'primary',
        icono: 'add-circle-outline',
        accion: (evento: Evento) => this.inscribirse(evento)
      },
      inscrito: {
        texto: 'Ver detalles',
        color: 'success',
        icono: 'eye-outline',
        accion: (evento: Evento) => this.abrirDetalles(evento)
      },
      cancelado: {
        texto: 'Cancelado',
        color: 'danger',
        icono: 'close-circle',
        accion: null
      },
      acudido: {
        texto: 'Acudido',
        color: 'medium',
        icono: 'checkmark-circle',
        accion: null
      }
    };
    return configs[estado] || {};
  }
}
