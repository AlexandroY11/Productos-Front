import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interfaces/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  isEdit: boolean = false;
  categoryId: number = 0;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.categoryId = +id;
        this.categoryService.getCategory(this.categoryId).subscribe(
          (category: Category) => {
            this.categoryForm.patchValue(category);
          },
          (error) => {
            console.error('Error loading category', error);
          }
        );
      }
    });
  }

  saveCategory(): void {
    if (this.categoryForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Form',
        text: 'Please fill out all fields before submitting!'
      });
      return;
    }

    const category: Category = this.categoryForm.value;

    if (this.isEdit) {
      this.categoryService.updateCategory(this.categoryId, category).subscribe(
        () => {
          this.router.navigate(['/categories']);
        },
        (error) => {
          console.error('Error updating category', error);
        }
      );
    } else {
      this.categoryService.createCategory(category).subscribe(
        () => {
          this.router.navigate(['/categories']);
        },
        (error) => {
          console.error('Error creating category', error);
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['/categories']);
  }
}
