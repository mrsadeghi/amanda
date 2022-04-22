
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first, map, startWith } from 'rxjs/operators';

import { AccountService } from '@app/shared/services/account.service';
import { AlertService } from '@app/shared/services/alert.service';
import { ProductService } from '@app/shared/services/product.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CityService } from '@app/shared/services/city.service';
import { City } from '@app/shared/models/city';
import { Observable } from 'rxjs';
import { Product, ProductRequestVM } from '@app/shared/models/product';

@Component({
  selector: 'll-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  cityList: City[];
  city: City;
  showFulName: boolean;
  showPhoneNumber: boolean;
  showTelegramId: boolean;
  filteredOptions: Observable<City[]>;
  myControl = new FormControl();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cityService: CityService,
    private accountService: AccountService,
    private productService: ProductService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required]],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      telegramId: ['', Validators.required],
    });
    this.cityService.getAll().subscribe(cities => {
      this.cityList = cities;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    });
  }
  selectedclient(event) {
    console.log(event.option.value);
    this.city = event.option.value;
  }

  getOptionText(option) {
    return option?.name;
  }
  private _filter(value: string): City[] {
    if (typeof value == 'string') {
      const filterValue = value.toLowerCase();
      var result = this.cityList.filter(option => option.name.toLowerCase().includes(filterValue));
      return result;
    }
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    if (!this.accountService.userValue.username) {
      return;
    }
    this.loading = true;
    let productModel: ProductRequestVM = {
      cityId: this.city.id,
      productName: this.form.value.productName,
      price: this.form.value.price,
      description: this.form.value.description,
      imageData: this.croppedImage
    };
    this.productService.add(productModel)
      .pipe(first())
      .subscribe({
        next: (model) => {
          this.alertService.success(`${model.productName} is added successful`, { keepAfterRouteChange: true });
          // this.router.navigate(['/'], { relativeTo: this.route });
          this.router.navigate(['/products/', model.id]);
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    /* show cropper */
  }
  cropperReady() {
    /* cropper ready */
  }
  loadImageFailed() {
    /* show message */
  }
}
