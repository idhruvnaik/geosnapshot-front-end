import { Component, OnInit } from '@angular/core';
import { CustomerApiService } from './customer-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  tables: any[] = [];
  selectedTable: any = null;

  constructor(
    private customerApiService: CustomerApiService,
    private router: Router
  ) {}

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
    if (this.selectedTable) {
      localStorage.setItem('selectedTable', this.selectedTable);
    }
  }

  confirmSubission(event: any): void {
    if (this.selectedTable) {
      this.router.navigate(['customer/categories']);
    } else {
      alert('Please select a table first');
    }
  }
}
