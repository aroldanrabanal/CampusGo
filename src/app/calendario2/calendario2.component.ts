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
import {Eventos} from "../modelos/Eventos";
import {EventoService} from "../servicios/eventos";
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-calendar2',
  templateUrl: 'calendario2.component.html',
  styleUrls: ['calendario2.component.scss'],
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    DatePipe,
    IonContent, IonFab, IonFabButton, IonDatetime,
    IonList, IonItem, IonLabel, IonBadge, IonIcon, IonButton,
    IonAvatar, IonImg, IonModal, IonToolbar, IonTitle, IonButtons, IonInput, IonCard, IonCardContent, IonCol, IonInputPasswordToggle, IonNote, IonRadio, IonRadioGroup, IonRow, IonDatetimeButton, IonTextarea, FormsModule,
    IonToast
  ]
})

export class Calendario2Component implements OnInit {
  eventos: Eventos[] = [];


  fechaSeleccionada = '';


  constructor(private evento: EventoService) {
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
    this.evento.obtenerEventos().subscribe({
      next: (data: Eventos[]) => (this.eventos = data),
      error: (err) => console.log(err)
    })
  }

  onFechaChange(event: any) {
    this.fechaSeleccionada = event.detail.value;
    console.log('Fecha seleccionada para nuevo evento:', this.fechaSeleccionada.split('T')[0]);
  }


  getColorEstado(estado: string) {
    switch(estado) {
      case 'Pendiente': return 'warning';
      case 'En curso': return 'success';
      case 'Eliminado': return 'danger';
      default: return 'medium';
    }
  }

}
