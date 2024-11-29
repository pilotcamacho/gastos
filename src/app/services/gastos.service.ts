import { Injectable } from '@angular/core';


import { generateClient, SelectionSet } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { LocationService } from './location.service';

type Gasto = Schema['Gasto']['type'];

const client = generateClient<Schema>();

const gastoSelectionSet = ['id', 'description', 'value', 'datetime'] as const;
type GastoSelectionSet = SelectionSet<Schema['Gasto']['type'], typeof gastoSelectionSet>;


@Injectable({
  providedIn: 'root'
})
export class GastosService {

  constructor(
    private locationSrv: LocationService
  ) { }

  async listGastos(): Promise<GastoSelectionSet[]> {
    const { data: gastos, errors } = await client.models.Gasto.list({ selectionSet: gastoSelectionSet });
    console.log('GastosService::listGastos', gastos, errors);
    return gastos;
  }

  async createGasto(gastoData: { description: string, store: string, value: number, currency: string }): Promise<void> {
    const currentLocation = await this.locationSrv.getCurrentLocation()
    const { data: createdGasto, errors } = await client.models.Gasto.create({ ...gastoData, location: currentLocation, datetime: new Date().toISOString() });
    console.log('GastosService::createGasto', createdGasto, errors);
    // return createdGasto
  }

  async deleteGasto(gastoId: string): Promise<void> {
    console.log('GastosService::deleteGasto');

    const { data: deletedGasto, errors } = await client.models.Gasto.delete({ id: gastoId });

    console.log('GastosService::deleteGasto', deletedGasto);
  }
}
