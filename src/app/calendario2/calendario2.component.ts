import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  IonContent, IonFab, IonFabButton, IonDatetime, IonList, IonItem, IonLabel,
  IonBadge, IonIcon, IonButton, IonAvatar, IonImg, IonModal, IonToolbar, IonTitle, IonButtons, IonInput, IonCard,
  IonCardContent, IonCol, IonInputPasswordToggle, IonNote, IonRadio, IonRadioGroup, IonRow, IonDatetimeButton,
  IonTextarea, IonHeader, IonSelectOption, IonSelect, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline, chevronForwardOutline, addOutline,
  calendarOutline, trashOutline, cameraOutline, pencilOutline
} from 'ionicons/icons';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import {FormsModule} from "@angular/forms";
import Swal from 'sweetalert2';
import { IonToast } from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular/standalone';
import {Eventos} from "../modelos/Eventos";
import {EventoService} from "../servicios/eventos";
import { HttpClientModule } from '@angular/common/http';
import { AlertController } from '@ionic/angular';


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
    IonToast, HeaderComponent, FooterComponent, IonHeader, IonSelectOption, IonSelect, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid
  ]
})

export class Calendario2Component implements OnInit {
  eventos: Eventos[] = [];
  editingEvento: Eventos = { id: 0, nombre: '', fecha: new Date() };
  fechaSeleccionada = '';
  selectedFile: File | null = null;
  imagenDescripcion: string = '';


  constructor(private evento: EventoService, public toastController: ToastController, public alertController: AlertController) {
    addIcons({
      'chevron-back-outline': chevronBackOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'add-outline': addOutline,
      'calendar-outline': calendarOutline,
      'trash-outline': trashOutline,
      'camera-outline': cameraOutline,
      'pencil-outline': pencilOutline
    });
  }

  ngOnInit() {
    this.fechaSeleccionada = new Date().toISOString();
    // Cargar eventos con imágenes
    this.loadEventos();
  }

  onFechaChange(event: any) {
    this.fechaSeleccionada = event.detail.value;
    console.log('Fecha seleccionada para nuevo evento:', this.fechaSeleccionada.split('T')[0]);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  async deleteEvento(id?: number) {
    if (!id) return;
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      message: 'Esta acción no se puede deshacer.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Sí, eliminar', handler: () => {
            this.evento.eliminarEvento(id).subscribe({
              next: () => { this.presentToast('Evento eliminado con éxito'); this.loadEventos(); },
              error: (err) => { this.presentToast('Error eliminando evento: ' + (err.message || 'Intenta de nuevo'), 'danger'); }
            });
          }}
      ]
    });
    await alert.present();
  }

  private normalizeCategory(cat?: string) {
    return (cat || 'default').toLowerCase().trim();
  }

  getBadgeColor(categoria?: string): string {
    const key = this.normalizeCategory(categoria);
    const map: Record<string, string> = {
      'tecnologia': 'warning',
      'ciencia': 'success',
      'deporte': 'danger',
      'literatura': 'primary',
      'salud': 'success',
      'arte': 'tertiary',
      'musica': 'secondary',
      'default': 'medium'
    };
    return map[key] || 'medium';
  }

  getCardClass(categoria?: string): string {
    const key = this.normalizeCategory(categoria).replace(/\s+/g, '-');
    return `estado-${key}`;
  }

  nuevoEvento: Eventos = new Eventos();
  nuevoEventoFechaString?: string;
  isSaving = false;
  isEditModalOpen = false;
  isCreateModalOpen = false;
  openCreateModal() { this.isCreateModalOpen = true; }
  closeCreateModal() { this.isCreateModalOpen = false; }
  private loadEventos() {
    this.evento.obtenerEventos().subscribe({
      next: (data: Eventos[]) => {
        this.eventos = data || [];

        // Para cada evento, intentar obtener su imagen de portada usando la primera URL de la galería
        this.eventos.forEach((ev) => {
          // Si el backend ya envía un campo con URL (e.g., imagenUrl/urlImagen/imagen)
          const anyEv: any = ev as any;
          const directUrl = anyEv?.imagenUrl || anyEv?.urlImagen || anyEv?.imagen || ev.imagenUrl;
          ev.imagenUrl = this.evento.toAbsoluteUrl(directUrl);

          // Fallback (por compatibilidad): consultar galería y tomar la primera URL si existiera
          if (!ev.imagenUrl && ev.id != null) {
            this.evento.obtenerGaleria(ev.id).subscribe({
              next: (galeria: any[]) => {
                if (Array.isArray(galeria) && galeria.length > 0) {
                  const first = galeria[0];
                  // Intentar mapear diferentes posibles claves
                  const raw = first?.url || first?.ruta || first?.path || first?.location || first?.link;
                  ev.imagenUrl = this.evento.toAbsoluteUrl(raw) || ev.imagenUrl;
                }
              },
              error: () => {
                // Silenciar errores de galería para no bloquear la lista
              }
            });
          }
        });
      },
      error: (err) => console.error('Error cargando eventos:', err)
    });
  }

  private pad(n: number) { return n.toString().padStart(2, '0'); }

  private formatLocalDateTime(d: Date): string {
    return `${d.getFullYear()}-${this.pad(d.getMonth()+1)}-${this.pad(d.getDate())}T${this.pad(d.getHours())}:${this.pad(d.getMinutes())}:${this.pad(d.getSeconds())}`;
  }

  saveNuevoEvento() {
    if (this.isSaving) return;
    this.isSaving = true;

    if (!this.nuevoEvento.nombre || !this.nuevoEventoFechaString) {
      this.isSaving = false;
      Swal.fire({ icon: 'warning', title: 'Datos incompletos', text: 'El nombre y la fecha son obligatorios.' });
      return;
    }

    const payload: any = {
      nombre: this.nuevoEvento.nombre,
      descripcion: this.nuevoEvento.descripcion,
      precio: this.nuevoEvento.precio != null ? Number(this.nuevoEvento.precio) : undefined,
      lugar: this.nuevoEvento.lugar,
      categoria: this.nuevoEvento.categoria ? String(this.nuevoEvento.categoria).toUpperCase().trim() : undefined,
      institucion: this.nuevoEvento.institucion,
      creadorId: 2
    };

    if (this.nuevoEventoFechaString) {
      const d = new Date(this.nuevoEventoFechaString);
      payload.fecha = this.formatLocalDateTime(d);
    }

    Object.keys(payload).forEach((k) => {
      if (payload[k] === undefined || payload[k] === null) {
        delete payload[k];
      }
    });

    console.log('Payload antes de POST:', payload);

    this.evento.crearEvento(payload).subscribe({
      next: (created) => {
        const eventoId = created.id;
        if (this.selectedFile) {
          if (eventoId != null) {
            this.evento.subirImagen(eventoId, this.selectedFile, this.imagenDescripcion).subscribe({
              next: () => this.presentToast('Imagen subida con éxito'),
              error: (err) => this.presentToast('Error subiendo imagen', 'danger')
            });
          }
        }
        this.presentToast('Evento creado con éxito');
        this.isSaving = false;
        this.nuevoEvento = new Eventos();
        this.nuevoEventoFechaString = undefined;
        this.loadEventos();
        this.selectedFile = null;
        this.imagenDescripcion = '';
        this.isCreateModalOpen = false;
        console.log('Evento creado:', created);

      },
      error: (err) => {
        console.error('Error creando evento:', err);
        if (err && err.error instanceof Blob) {
          err.error.text().then((text: string) => {
            console.error('Cuerpo de error (blob):', text);
            try {
              const parsed = JSON.parse(text);
              Swal.fire({ icon: 'error', title: 'Error creando evento', text: parsed.message || JSON.stringify(parsed) });
            } catch {
              Swal.fire({ icon: 'error', title: 'Error creando evento', text: text });
            }
          }).catch(() => {
            Swal.fire({ icon: 'error', title: 'Error creando evento', text: 'Error inesperado del servidor.' });
          }).finally(() => { this.isSaving = false; });
        } else {
          console.error('Cuerpo de error:', err.error);
          Swal.fire({
            icon: 'error',
            title: 'Error creando evento',
            text: (err.error && (err.error.message || JSON.stringify(err.error))) || err.message || `Status ${err.status}`
          });
          this.isSaving = false;
        }
      }
    });
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color,
      buttons: [{ text: 'OK', role: 'cancel' }]
    });
    await toast.present();
  }

  editEvento(evento: Eventos) {
    if (!evento.id) return;
    this.editingEvento = { ...evento };
    this.isEditModalOpen = true;
  }

  guardarEdicion() {
    if (!this.editingEvento.nombre || !this.editingEvento.fecha) {
      this.presentToast('Nombre y fecha son requeridos', 'danger');
      return;
    }

    this.isSaving = true;

    this.evento.editarEvento(this.editingEvento.id!, this.editingEvento).subscribe({

      next: (res) => {
        this.presentToast('Evento actualizado con éxito');
        this.loadEventos();
        this.isEditModalOpen = false;
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Error actualizando evento:', err);
        this.presentToast('Error actualizando evento', 'danger');
        this.isSaving = false;
      }
    });
  }


}
