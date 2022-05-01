import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/shared/services/account.service';

@Component({
  selector: 'll-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.scss']
})
export class DashboardProfileComponent implements OnInit {
  //userProfile:
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

}
