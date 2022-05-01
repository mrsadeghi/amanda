import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/shared/models/user/user';
import { AccountService } from '@app/shared/services/account.service';

@Component({
  selector: 'll-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  isLessThenLargeDevice;
  currentUser: User;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
    this.currentUser = this.accountService.userValue;
  }
  onLogout(): void {
    this.router.navigate(['auth/login']);
  }
}
