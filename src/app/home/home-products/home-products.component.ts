import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/shared/services/product.service';
// import { productsDB } from '../../shared/data/products'; 
@Component({
  selector: 'll-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {
  products = [];
  isLoaded: boolean;
  constructor(private productService: ProductService) {
    this.isLoaded = false;
    this.productService.getAll().subscribe(products => {
      this.products = products;
      this.isLoaded = true;
    });
  }

  ngOnInit(): void { }

}
