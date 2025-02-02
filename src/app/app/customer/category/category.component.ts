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
  orders: any[] = [];

  orderTabs: any = [
    { name: 'Current', value: 'current' },
    { name: 'In queue', value: 'pending' },
    { name: 'Cooking', value: 'inprogress' },
    { name: 'Ready', value: 'ready' },
  ];

  activeTab: string = 'current';

  isCartOpen = true;
  private cartToggleSubscription: Subscription = new Subscription();

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

    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
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

  listOrders(status: String): void {
    this.categoryApiService
      .listOrders({
        status: status,
        table_token: localStorage.getItem('selectedTable'),
      })
      .subscribe({
        next: (response) => {
          this.orders = response?.data;
        },
        error: (error) => {
          console.error('Error fetching tables:', error);
        },
      });
  }

  resetFoodItems() {
    this.foodItems = [];
    this.currentCategory = null;
  }

  ngOnDestroy() {
    this.cartToggleSubscription.unsubscribe();
  }

  increaseQuantity(item: any) {
    if (!item?.quantity) {
      item.quantity = 0;
    }
    item.quantity++;
  }

  decreaseQuantity(item: any) {
    if (item?.quantity > 0) {
      item.quantity--;
    }
  }

  addToCart(item: any) {
    const itemCopy = { ...item };
    this.cartService.addToCart(itemCopy);

    item.quantity = 0;
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  placeOrder() {
    if (this.cartItems.length === 0) {
      return;
    }

    this.categoryApiService
      .placeOrder({
        table_token: localStorage.getItem('selectedTable'),
        items: this.cartItems,
      })
      .subscribe({
        next: (response) => {
          this.toggleCart();
          this.toastService.show('Order placed', 'success');
          this.cartService.resetCartItems();
        },
        error: (error) => {
          console.error('Error fetching tables:', error);
        },
      });
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;

    if (this.isCartOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  updateTab(event: Event) {
    this.activeTab = (event.target as HTMLSelectElement).value;
    if (this.activeTab != 'current') {
      this.listOrders(this.activeTab);
    }
  }

  increaseOrderQuantity(orderIndex: number, itemIndex: number) {
    this.orders[orderIndex].food_items[itemIndex].quantity++;
    this.updateOrderItem(this.orders[orderIndex].food_items[itemIndex]);
  }

  decreaseOrderQuantity(orderIndex: number, itemIndex: number) {
    if (this.orders[orderIndex].food_items[itemIndex].quantity > 0) {
      this.orders[orderIndex].food_items[itemIndex].quantity--;
      this.updateOrderItem(this.orders[orderIndex].food_items[itemIndex]);

      if (this.orders[orderIndex].food_items[itemIndex].quantity === 0) {
        this.orders[orderIndex].food_items.splice(itemIndex, 1);
      }
    }
  }

  updateOrderItem(orderItem: any) {
    this.categoryApiService
      .updateOrderItem({
        order_item_token: orderItem?.order_item_token,
        table_token: localStorage.getItem('selectedTable'),
        quantity: orderItem?.quantity,
      })
      .subscribe({
        next: (response) => {
          return orderItem;
        },
        error: (error) => {
          this.toastService.show(error.message, 'error');
        },
      });
  }

  cancelOrder(orderIndex: number) {
    let order = this.orders[orderIndex];
    this.categoryApiService
      .updateOrder({
        order_token: order?.order_token,
        table_token: localStorage.getItem('selectedTable'),
        status: 'canceled',
      })
      .subscribe({
        next: (response) => {
          this.orders.splice(orderIndex, 1);
        },
        error: (error) => {
          this.toastService.show(error.message, 'error');
        },
      });
  }
}
