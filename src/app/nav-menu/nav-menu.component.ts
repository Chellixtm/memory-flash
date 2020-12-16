import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  private authListenerSub: Subscription;
  isLogged:boolean = false;
  username: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogged = this.authService.getIsAuth();
    if(this.isLogged) {
      this.username = localStorage.getItem('username');
    }
    this.authListenerSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isLogged = isAuthenticated;
      this.username = localStorage.getItem('username');
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

}
