import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'geosnapshot-frontend';
  cartItems = [];

  constructor(private router: Router) {}
  showNavbar: boolean = true;

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkRoute();
      });
  }

  checkRoute(): void {
    if (this.router.url.includes('/kitchen')) {
      this.showNavbar = false;
    } else {
      this.showNavbar = true;
    }
  }
}
