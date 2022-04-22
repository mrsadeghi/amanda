import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { City } from '@app/shared/models/city';

@Injectable({ providedIn: 'root' })
export class CityService {
  constructor(
    private http: HttpClient
  ) {
  }

  getAll() {
    return this.http.get<City[]>(`${environment.apiUrl}/cities`);
  }

  getById(id: string) {
    return this.http.get<City>(`${environment.apiUrl}/cities/${id}`);
  }
}