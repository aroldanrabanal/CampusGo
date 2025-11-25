import { Component, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { IonicModule, IonLoading, IonToast } from '@ionic/angular';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";

interface Tarjeta {
  numero: string;
  fecha: string;
  cvv: string;
}

@Component({
  selector: 'app-pasarela-pago',
  templateUrl: './pasarela-pago.page.html',
  styleUrls: ['./pasarela-pago.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, IonicModule, HeaderComponent, FooterComponent]
})
export class PasarelaPagoPage {
  @ViewChild('loadingPago') loading!: IonLoading;
  @ViewChild('toastExito') toast!: IonToast;

  evento: any = null;
  metodoSeleccionado = '';
  tarjeta: Tarjeta = { numero: '', fecha: '', cvv: '' };
  mostrarLoading = false;

  constructor(private navCtrl: NavController) {
    this.evento = history.state.evento;
  }

  ngOnInit() {
    if (!this.evento || !this.evento.precio) {
      this.navCtrl.navigateRoot('/favoritos');
    }
  }

  seleccionar(metodo: string) {
    this.metodoSeleccionado = metodo;
  }

  cancelar() {
    this.navCtrl.back();
  }

  async pagar() {
    if (!this.evento) return;

    if (this.metodoSeleccionado === 'tarjeta') {
      if (!this.tarjeta.numero || !this.tarjeta.fecha || !this.tarjeta.cvv) {
        const toast = document.createElement('ion-toast');
        toast.message = 'Completa todos los campos de la tarjeta';
        toast.color = 'danger';
        toast.duration = 3000;
        document.body.appendChild(toast);
        return toast.present();
      }
    }

    this.mostrarLoading = true;
    await this.loading.present();

    setTimeout(async () => {
      await this.loading.dismiss();
      this.mostrarLoading = false;

      await this.toast.present();

      this.navCtrl.navigateRoot('/favoritos', {
        state: { pagado: true, eventoId: this.evento.id }
      });
    }, 2000);
  }
}
