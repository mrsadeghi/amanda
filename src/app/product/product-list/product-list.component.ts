import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/shared/services/product.service';
// import { productsDB } from '../../shared/data/products';

@Component({
  selector: 'll-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  isLoaded: boolean;
  advanceSearchExpanded: boolean = false;
  products = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.products = products;
      this.isLoaded = true;
    });

  }
}
