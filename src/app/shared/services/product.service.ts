import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Product, ProductRequestVM } from '@app/shared/models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productSubject: BehaviorSubject<Product>;
  public product: Observable<Product>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  getAll() {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }
  getSuggestedSearchList(serachValue: string) {
    return this.http.post<string[]>(`${environment.apiUrl}/products/suggestedSearchList`, serachValue);
  }

  getById(id: string) {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }
  add(model: ProductRequestVM) {
    return this.http.post<Product>(`${environment.apiUrl}/products`, model);
  }
}