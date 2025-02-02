import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryApiService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  fetchCategories(params: any): Observable<any> {
    return this.get('/food/category/list', params);
  }

  fetchFoodItems(params: any): Observable<any> {
    return this.get('/food/item/list', params);
  }

  placeOrder(params: any): Observable<any> {
    return this.post('order/place', params);
  }

  listOrders(params: any): Observable<any> {
    return this.get('order/list', params);
  }

  updateOrderItem(params: any): Observable<any> {
    return this.post('order/update_order_item', params);
  }

  updateOrder(params: any): Observable<any> {
    return this.post('order/update_order', params);
  }
}
