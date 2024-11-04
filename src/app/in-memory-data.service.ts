import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const dbEmployees: Employee[] = [
      {
        name: 'Poonam',
        id: 1,
        location: 'Bangalore',
        mobile: 7653452654,
      },
      {
        name: 'Aditi',
        id: 2,
        location: 'Noida',
        mobile: 9876754345,
      },
      {
        id: 3,
        name: 'Aswathi',
        location: 'Delhi',
        mobile: 9987675634,
      },
      {
        name: 'Priya',
        id: 4,
        location: 'Kerala',
        mobile: 7710423451,
      },
    ];
    return { dbEmployees };
  }
}
