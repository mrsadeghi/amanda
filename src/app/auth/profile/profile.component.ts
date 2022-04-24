
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/shared/services/account.service';
import { AlertService } from '@app/shared/services/alert.service';
import { ProfileRequestVM } from '@app/shared/models/profile';

@Component({
  selector: 'll-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      telegramId: ['', Validators.required],
      email: ['', Validators.required]
    });
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

    this.loading = true;
    let profileRequest: ProfileRequestVM = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      phoneNumber: this.form.value.phoneNumber,
      telegramId: this.form.value.telegramId,
      email: this.form.value.email,
    };

    this.accountService.updateProfile(profileRequest)
      .pipe(first())
      .subscribe({
        next: (model) => {
          this.alertService.success('Profile is Updated successfully', { keepAfterRouteChange: true });
          this.router.navigate(['/']);
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
