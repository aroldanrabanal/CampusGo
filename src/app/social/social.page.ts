import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { heartOutline, chatbubbleOutline } from 'ionicons/icons';

interface Comentario {
  autor: string;
  texto: string;
}

interface Post {
  id: number;
  evento: {
    titulo: string;
    descripcion: string;
  };
  imagen: string;
  fecha: string;
  likes: number;
  comentarios: Comentario[];
  mostrarComentarios: boolean;
}

@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FooterComponent, HeaderComponent]
})
export class SocialPage {
  posts: Post[] = [
    {
      id: 1,
      evento: {
        titulo: 'Musical 1: El Fantasma del Campus',
        descripcion: 'Espectacular musical con orquesta en vivo...'
      },
      imagen: '../../assets/img/evento1.jpg',
      fecha: '26-06-2026',
      likes: 15,
      comentarios: [
        { autor: 'Estudiante1', texto: '¡Qué evento tan genial!' },
        { autor: 'Profesor2', texto: 'Excelente organización.' }
      ],
      mostrarComentarios: false
    }
  ];

  constructor() {
    addIcons({ heartOutline, chatbubbleOutline });
  }

  likePost(post: Post) {
    console.log('Like al post:', post.evento.titulo);
    post.likes++;
  }

  abrirComentarios(post: Post) {
    console.log('Abriendo comentarios para:', post.evento.titulo);
    post.mostrarComentarios = !post.mostrarComentarios;
  }
}
