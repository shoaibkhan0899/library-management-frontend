import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Book } from '../../../models/book.model';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-student-books',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class StudentBooks implements OnInit {
  readonly fallbackImageUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="320"><rect width="240" height="320" fill="#e7ede8"/><text x="120" y="160" text-anchor="middle" fill="#68746d" font-family="Arial" font-size="18">No cover</text></svg>'
  );

  readonly searchControl = new FormControl('', { nonNullable: true });

  books: Book[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private bookService: BookService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  get filteredBooks(): Book[] {
    const searchTerm = this.searchControl.value.trim().toLowerCase();

    if (!searchTerm) {
      return this.books;
    }

    return this.books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm)
      || book.author.toLowerCase().includes(searchTerm)
      || book.isbn.toLowerCase().includes(searchTerm)
    );
  }

  loadBooks(): void {
    this.loading = true;
    this.errorMessage = '';

    this.bookService.getStudentBooks().subscribe({
      next: (response) => {
        this.books = response;
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        this.errorMessage = 'Unable to load books. Please try again.';
        this.loading = false;
        this.changeDetectorRef.markForCheck();
        console.error(error);
      },
    });
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    if (image.src !== this.fallbackImageUrl) {
      image.src = this.fallbackImageUrl;
    }
  }
}