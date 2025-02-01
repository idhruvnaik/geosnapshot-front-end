import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() cartCount: number = 0;
  constructor(private location: Location, private cartService: CartService) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }

  toggleCart() {
    this.cartService.toggleCart();
  }
}
