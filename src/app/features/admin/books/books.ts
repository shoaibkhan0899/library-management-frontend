
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Book } from '../../../models/book.model';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-admin-books',
  templateUrl: './books.html',
  styleUrl: './books.css',
  imports: [ReactiveFormsModule],
})
export class AdminBooks implements OnInit {

  readonly fallbackImageUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="160"><rect width="120" height="160" fill="#e7ede8"/><text x="60" y="82" text-anchor="middle" fill="#68746d" font-family="Arial" font-size="14">No cover</text></svg>'
  );

  books: Book[] = [];

  loading = false;
  submitting = false;
  deletingBookId: number | null = null;

  errorMessage = '';
  successMessage = '';

  showAddForm = false;
  editingBookId: number | null = null;

  addBookForm;

  constructor(
    private bookService: BookService,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
  ) {
    this.addBookForm = this.formBuilder.nonNullable.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      category: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    if (image.src !== this.fallbackImageUrl) {
      image.src = this.fallbackImageUrl;
    }
  }

  loadBooks(): void {
    this.loading = true;

    this.bookService.getAllBooks().subscribe({
      next: (response) => {
        this.books = response;
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        this.errorMessage = 'Unable to load books.';
        this.loading = false;
        this.changeDetectorRef.markForCheck();
        console.error(error);
      }
    });
  }

  openAddForm(): void {
    this.editingBookId = null;
    this.successMessage = '';
    this.errorMessage = '';

    this.addBookForm.reset({
      title: '',
      author: '',
      isbn: '',
      category: '',
      quantity: 1,
      imageUrl: ''
    });

    this.showAddForm = true;
  }

  openEditForm(book: Book): void {
    if (book.id === undefined) {
      this.errorMessage = 'This book cannot be edited because it has no ID.';
      return;
    }

    this.editingBookId = book.id;
    this.successMessage = '';
    this.errorMessage = '';

    this.addBookForm.patchValue({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      quantity: book.quantity,
      imageUrl: book.imageUrl || ''
    });

    this.showAddForm = true;
  }

  deleteBook(book: Book): void {
    if (book.id === undefined || this.deletingBookId !== null) {
      return;
    }

    const confirmed = window.confirm(`Delete "${book.title}"? This action cannot be undone.`);
    if (!confirmed) {
      return;
    }

    this.deletingBookId = book.id;
    this.successMessage = '';
    this.errorMessage = '';

    this.bookService.deleteBook(book.id).subscribe({
      next: () => {
        this.successMessage = `"${book.title}" deleted successfully.`;
        this.deletingBookId = null;
        this.loadBooks();
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        this.errorMessage = `Unable to delete "${book.title}". Please try again.`;
        this.deletingBookId = null;
        console.error(error);
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  cancelAddForm(): void {
    this.showAddForm = false;
    this.editingBookId = null;

    this.addBookForm.reset({
      title: '',
      author: '',
      isbn: '',
      category: '',
      quantity: 1,
      imageUrl: ''
    });
  }

  addBook(): void {

    if (this.addBookForm.invalid) {
      this.addBookForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const book: Book = this.addBookForm.getRawValue();

    if (this.editingBookId !== null) {

      const id = this.editingBookId;

      this.bookService.updateBook(id, book).subscribe({

        next: () => {
          this.successMessage = 'Book updated successfully!';
          this.submitting = false;

          this.cancelAddForm();
          this.loadBooks();

          this.changeDetectorRef.markForCheck();
        },

        error: (error) => {
          this.errorMessage = 'Unable to update book. Please try again.';
          this.submitting = false;

          console.error(error);
          this.changeDetectorRef.markForCheck();
        }

      });

    } else {

      this.bookService.addBook(book).subscribe({

        next: () => {
          this.successMessage = 'Book added successfully!';
          this.submitting = false;

          this.cancelAddForm();
          this.loadBooks();

          this.changeDetectorRef.markForCheck();
        },

        error: (error) => {
          this.errorMessage = 'Unable to add book. Please try again.';
          this.submitting = false;

          console.error(error);
          this.changeDetectorRef.markForCheck();
        }

      });

    }
  }
}
