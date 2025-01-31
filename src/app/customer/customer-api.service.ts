import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerApiService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  fetchTables(): Observable<any> {
    return this.get('/serving_table/list', {});
  }
}
