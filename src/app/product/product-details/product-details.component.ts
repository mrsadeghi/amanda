import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@app/shared/models/product';
import { ProductService } from '@app/shared/services/product.service';

@Component({
  selector: 'll-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productService: ProductService, private actRoute: ActivatedRoute) { }
  currentProduct: Product;
  ngOnInit(): void {
    this.actRoute.queryParams.subscribe(params => {
      let productid = this.actRoute.snapshot.params.id;
      if (productid) {
        this.productService.getById(productid).subscribe(product => {
          this.currentProduct = product;
        });
      }
    });
  }


}
