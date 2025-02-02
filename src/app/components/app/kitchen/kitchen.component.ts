import { Component, OnInit } from '@angular/core';
import { KitchenApiService } from 'src/app/app/kitchen/kitchen-api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss'],
})
export class KitchenComponent implements OnInit {
  constructor(
    private kitchenApi: KitchenApiService,
    private toastService: ToastService
  ) {}

  orders: any[] = [];

  ngOnInit(): void {
    this.listOrders();

    setInterval(() => {
      this.listOrders();
    }, 20000);
  }

  selectedTab: string = 'pending';

  selectTab(status: string): void {
    this.selectedTab = status;
    this.listOrders();
  }

  listOrders(): void {
    this.kitchenApi.listOrders({ status: this.selectedTab }).subscribe({
      next: (response) => {
        this.orders = response?.data;
      },
      error: (error) => {
        console.error('Error fetching tables:', error);
      },
    });
  }

  startProcessingOrder(order: any, index: number) {
    if (order.estimated_time === 'NA' || order.estimated_time === '') {
      this.toastService.show('Plaese mention estimated time to cook', 'info');
      return;
    }

    this.kitchenApi
      .updateOrder({
        order_token: order?.order_token,
        status: 'inprogress',
        estimated_time: order.estimated_time,
      })
      .subscribe({
        next: (response) => {
          this.orders.splice(index, 1);
        },
        error: (error) => {
          console.error('Error fetching tables:', error);
        },
      });
  }

  markAsReadyOrder(order: any, index: number) {
    this.kitchenApi
      .updateOrder({
        order_token: order?.order_token,
        status: 'ready',
        estimated_time: order.estimated_time,
      })
      .subscribe({
        next: (response) => {
          this.orders.splice(index, 1);
        },
        error: (error) => {
          console.error('Error fetching tables:', error);
        },
      });
  }
}
