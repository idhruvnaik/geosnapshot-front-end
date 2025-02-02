import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KitchenApiService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  listOrders(params: any): Observable<any> {
    return this.get('kitchen/list', params);
  }

  updateOrder(params: any): Observable<any> {
    return this.post('kitchen/update_order', params);
  }
}
