import { Injectable } from '@angular/core';
import { createConsumer } from '@rails/actioncable';
import { Subject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderWebsocketService {
  private consumer = createConsumer('ws://127.0.0.1:3000/cable');
  private ordersSubject = new Subject<any>(); // Observable Subject
  private subscription?: Subscription;

  constructor() {
    this.connect();
  }

  private connect() {
    if (!this.subscription) {
      this.subscription = this.consumer.subscriptions.create('OrdersChannel', {
        received: (order: any) => {
          this.ordersSubject.next(order); // Push new order to subscribers
        },
      });
    }
  }

  public getOrders(): Observable<any> {
    return this.ordersSubject.asObservable(); // Expose observable
  }
}