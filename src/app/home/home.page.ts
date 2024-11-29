import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardContent, IonCardTitle,
  IonCol, IonButton, IonIcon,
  IonInput, IonItem, IonLabel, IonSelectOption, IonSelect
} from '@ionic/angular/standalone';
import { addIcons } from "ionicons"
import { add } from 'ionicons/icons'
import { ToastController } from '@ionic/angular';
import { GastosService } from '../services/gastos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardContent, IonCardTitle,
    IonCol, IonButton, IonIcon,
    CommonModule, FormsModule, IonInput,
    IonItem, IonLabel, IonSelectOption, IonSelect
  ],
})
export class HomePage {

  gastos: any[] = [];

  newGasto = {
    description: '',
    store: '',
    value: 0 as number,
    currency: '',
    datetime: new Date().toISOString(),
  };

  constructor(
    public gastosSrv: GastosService
  ) {
    addIcons({ add });
  }

  deleteGasto(gastoId: string) {
    console.log('HomePage::deleteGasto: ', gastoId);
  }


  addGasto() {
    const newGasto = this.newGasto;
    this.gastosSrv.createGasto(newGasto).then(r => console.log('HomePage::addGasto::r:${r}'));
    this.gastos.push(newGasto);
    console.log('HomePage::addGasto: ', newGasto)
    

    // Reset form fields
    // this.newGasto = {
    //   description: '',
    //   value: 0,
    //   currency: '',
    //   datetime: new Date().toISOString(),
    // };
  }

  goToGasto() {
    console.log('HomePage::goToGasto');
  }
}
