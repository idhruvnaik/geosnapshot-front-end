import { Component, OnInit } from '@angular/core';
import { CategoryApiService } from './category-api.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  foodItems: any[] = [];
  currentCategory: any = {};
  cartItems: any[] = [];

  isCartOpen = false;
  private cartToggleSubscription: Subscription = new Subscription;

  constructor(
    private categoryApiService: CategoryApiService,
    private router: Router,
    private toastService: ToastService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchTables();

    this.cartToggleSubscription = this.cartService.cartToggle$.subscribe(() => {
      this.toggleCart();
    });

    this.cartItems = this.cartService.getCartItems();
  }

  fetchTables(): void {
    this.categoryApiService
      .fetchCategories({ table_token: localStorage.getItem('selectedTable') })
      .subscribe({
        next: (response) => {
          this.categories = response?.data;
        },
        error: (error) => {
          console.error('Error fetching tables:', error);
        },
      });
  }

  fetchFoodItems(category: any): void {
    this.currentCategory = category;
    this.categoryApiService
      .fetchFoodItems({
        category_token: category?.token,
        table_token: localStorage.getItem('selectedTable'),
      })
      .subscribe({
        next: (response) => {
          this.foodItems = response?.data;
        },
        error: (error) => {
          console.error('Error fetching tables:', error);
        },
      });
  }

  resetFoodItems() {
    this.foodItems = [];
  }

  ngOnDestroy() {
    this.cartToggleSubscription.unsubscribe();
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
}
