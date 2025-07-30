import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardContent, IonCardTitle,
  IonButton, IonIcon,
  IonInput, IonItem, IonLabel, IonSelectOption, IonSelect,
  IonDatetime, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { add } from 'ionicons/icons';
import { GastosService } from '../services/gastos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardContent, IonCardTitle,
    IonButton, IonIcon,
    CommonModule, FormsModule, IonInput,
    IonItem, IonLabel, IonSelectOption, IonSelect, IonDatetime
  ],
})
export class HomePage implements OnInit {

  gastos: any[] = [];

  // Initialize newGasto with default values
  utcDate: Date;
  localDatetimeStr: string;

  newGasto = {
    description: '',
    store: '',
    value: null as number | null, // Allow `null` for default value
    currency: 'EUR',
    paymentMethod: 'CREDIT',
    datetime: new Date()
  };

  constructor(
    public gastosSrv: GastosService,
    private toastController: ToastController
  ) {
    addIcons({ add });
    this.utcDate = new Date();
    this.localDatetimeStr = new Date(this.utcDate.getTime() - this.utcDate.getTimezoneOffset() * 60000).toISOString()
    // this.localDatetimeStr = this.localDatetime;
    this.newGasto = {
      description: '',
      store: '',
      value: null as number | null, // Allow `null` for default value
      currency: 'EUR',
      paymentMethod: 'CREDIT',
      datetime: new Date()
    };
  }

  async ngOnInit() {
    await this.loadGastos(); // Load gastos on initialization
  }

  async loadGastos() {
    try {
      this.gastos = await this.gastosSrv.listGastos(); // Fetch real data
      console.log('HomePage::loadGastos: ', this.gastos);
    } catch (error) {
      console.error('Error loading gastos:', error);
    }
  }

  async addGasto() {
    const newGasto = {
      ...this.newGasto,
      datetime: this.getUTCDatetime().toISOString(),
      value: this.newGasto.value || 0
    };
    console.log('HomePage::addGasto: ', newGasto);
    try {
      const createdGasto = await this.gastosSrv.createGasto(newGasto);
      if (createdGasto) {
        await this.messageCreatedOk();
        await this.loadGastos(); // Reload gastos to reflect real data
      }
    } catch (error) {
      console.error('Error creating gasto:', error);
    }

    // Reset form fields to default
    this.newGasto = {
      description: '',
      store: '',
      value: null,
      currency: 'EUR',
      paymentMethod: 'CREDIT',
      datetime: new Date()
    };
  }

  deleteGasto(gastoId: string) {
    console.log('HomePage::deleteGasto: ', gastoId);
  }

  goToGasto() {
    console.log('HomePage::goToGasto');
  }

  async messageCreatedOk() {
    const toast = await this.toastController.create({
      message: 'Gasto creado exitosamente.',
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    await toast.present();
  }

  // Getter to convert UTC datetime to local time for display
  // get localDatetime(): string {
  //   const utcDate = new Date(this.newGasto.datetime);
  //   return new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000).toISOString();
  // }

  // Setter to ensure selected local time is stored as UTC
  // set localDatetime(value: string) {
  //   const localDate = new Date(value);
  //   this.newGasto.datetime = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000).toISOString();
  // }

  getUTCDatetime(): Date {
    console.log('HomePage::getUTCDatetime::this.localDatetimeStr: ', this.localDatetimeStr);
    const localDatetime: Date = new Date(this.localDatetimeStr)
    console.log('HomePage::getUTCDatetime::localDatetime: ', localDatetime);
    // const utcDT = new Date(localDatetime.getTime() + localDatetime.getTimezoneOffset() * 60000)
    const utcDT = new Date(localDatetime.getTime())
    console.log('HomePage::getUTCDatetime::utcDT: ', utcDT);
    console.log('HomePage::getUTCDatetime::utcDT.toISOString(): ', utcDT.toISOString());
    return utcDT
  }

}
