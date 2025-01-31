import { Component, OnInit } from '@angular/core';
import { CategoryApiService } from './category-api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  constructor(private categoryApiService: CategoryApiService) {}

  ngOnInit(): void {
    this.fetchTables();
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
}
