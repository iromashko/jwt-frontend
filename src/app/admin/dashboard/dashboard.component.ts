import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  token = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.token = this.authService.token;
  }
}
