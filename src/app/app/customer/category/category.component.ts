import { Component, OnInit } from '@angular/core';
import { CategoryApiService } from './category-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  foodItems: any[] = [];
  currentCategory: any = {};

  constructor(
    private categoryApiService: CategoryApiService,
    private router: Router
  ) {}

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
          console.log(this.foodItems);
        },
        error: (error) => {
          console.error('Error fetching tables:', error);
        },
      });
  }

  resetFoodItems() {
    this.foodItems = [];
  }
}
