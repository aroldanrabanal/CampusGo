import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  IonContent, IonFab, IonFabButton, IonDatetime, IonList, IonItem, IonLabel,
  IonBadge, IonIcon, IonButton, IonAvatar, IonImg, IonModal, IonToolbar, IonTitle, IonButtons, IonInput, IonCard,
  IonCardContent, IonCol, IonInputPasswordToggle, IonNote, IonRadio, IonRadioGroup, IonRow, IonDatetimeButton,
  IonTextarea
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline, chevronForwardOutline, addOutline,
  calendarOutline, trashOutline, cameraOutline
} from 'ionicons/icons';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import {FormsModule} from "@angular/forms";
import Swal from 'sweetalert2';
import { IonToast } from '@ionic/angular/standalone';

interface Evento {
  fecha: string;
  titulo: string;
  hora: string;
  imagen?: string;
  estado: 'Pendiente' | 'En curso' | 'Eliminado';
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    IonContent, IonFab, IonFabButton, IonDatetime,
    IonList, IonItem, IonLabel, IonBadge, IonIcon, IonButton,
    FooterComponent, HeaderComponent, IonAvatar, IonImg, IonModal, IonToolbar, IonTitle, IonButtons, IonInput, IonCard, IonCardContent, IonCol, IonInputPasswordToggle, IonNote, IonRadio, IonRadioGroup, IonRow, IonDatetimeButton, IonTextarea, FormsModule,
    IonToast
  ]
})

export class CalendarPage implements OnInit {
  @ViewChild('toastError') toastError!: IonToast;
  eliminarEvento(evento: Evento) {
    Swal.fire({
      title: '¿Eliminar evento?',
      text: `"${evento.titulo}" será eliminado`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e53e3e',
      cancelButtonColor: '#718096',
      reverseButtons: true,
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventos = this.eventos.filter(e => e !== evento);

        Swal.fire({
          title: 'Eliminado',
          text: 'El evento ha sido eliminado',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          heightAuto: false
        });
      }
    });
  }
  fechaSeleccionada = '';
  eventos: Evento[] = [
    { fecha: '2025-06-10', titulo: 'Examen Matemáticas', hora: '09:00',  estado: 'Pendiente' },
    { fecha: '2025-06-15', titulo: 'Concierto Coldplay', hora: '20:00', estado: 'Pendiente' },
    { fecha: '2025-06-26', titulo: 'Musical 1', hora: '20:00', estado: 'Pendiente' },
    { fecha: '2025-06-26', titulo: 'ASD', hora: '00:00', estado: 'Eliminado' },
    { fecha: '2025-06-26', titulo: 'Fiesta Campus', hora: '22:30', estado: 'En curso' },
    { fecha: '2025-11-06', titulo: 'PRUEBA HOY', hora: '12:00', estado: 'Pendiente' },
  ];


  constructor() {
    addIcons({
      'chevron-back-outline': chevronBackOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'add-outline': addOutline,
      'calendar-outline': calendarOutline,
      'trash-outline': trashOutline,
      'camera-outline': cameraOutline
    });
  }

  ngOnInit() {
    this.fechaSeleccionada = new Date().toISOString();
  }

  onFechaChange(event: any) {
    this.fechaSeleccionada = event.detail.value;
    console.log('Fecha seleccionada para nuevo evento:', this.fechaSeleccionada.split('T')[0]);
  }

  highlightedDates = (isoString: string) => {
    const fecha = isoString.split('T')[0];
    const tieneEvento = this.eventos.some(e =>
      e.fecha === fecha && e.estado !== 'Eliminado'
    );

    if (tieneEvento) {
      return {
        textColor: '#3182ce',
        backgroundColor: 'transparent'
      };
    }
    return undefined;
  };

  esEventoPasado(evento: Evento): boolean {
    return evento.fecha < new Date().toISOString().split('T')[0]
  }

  agregarEvento() {
    if (!this.evento.titulo?.trim()) {
      this.toastError.present();
      return;
    }

    const fecha = this.fechaSeleccionada.split('T')[0];

    const nuevoEvento: Evento = {
      fecha,
      titulo: this.evento.titulo,
      hora: this.evento.hora || '18:00',
      imagen: this.evento.imagen,
      estado: this.evento.estado || 'Pendiente'
    };

    this.eventos.push(nuevoEvento);
    this.eventos = [...this.eventos];

    this.evento = {
      titulo: '',
      hora: '18:00',
      imagen: '',
      estado: 'Pendiente'
    };

  }


  getColorEstado(estado: string) {
    switch(estado) {
      case 'Pendiente': return 'warning';
      case 'En curso': return 'success';
      case 'Eliminado': return 'danger';
      default: return 'medium';
    }
  }
  evento: Partial<Evento> = {
    titulo: '',
    hora: '18:00',
    imagen: '',
    estado: 'Pendiente'
  };
  onImagenChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {

        this.evento.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
