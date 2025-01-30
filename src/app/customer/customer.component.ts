import { Component, OnInit } from '@angular/core';
import { CustomerApiService } from './customer-api.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})

export class CustomerComponent implements OnInit {
  tables: any[] = [];
  selectedTable: any = null;

  constructor(private customerApiService: CustomerApiService) {}

  ngOnInit(): void {
    this.fetchTables();
  }

  fetchTables(): void {
    this.customerApiService.fetchTables().subscribe({
      next: (response) => {
        this.tables = response?.data;
      },
      error: (error) => {
        console.error('Error fetching tables:', error);
      },
    });
  }

  onTableSelect(event: any): void {
    this.selectedTable = event.target.value;
  }
}
