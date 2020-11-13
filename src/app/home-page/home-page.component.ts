import { Component, OnInit } from '@angular/core';
import { AuthService } from '../admin/shared/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  token = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.token = this.authService.token;
  }
}
