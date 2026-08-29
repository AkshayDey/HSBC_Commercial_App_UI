// import { Component } from '@angular/core';

// @Component({
//   imports: [],
//   selector: 'app-letters-of-credit',
//   styleUrl: './letters-of-credit.component.scss',
//   templateUrl: './letters-of-credit.component.html',
// })
// export class LettersOfCreditComponent {
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardComponent,
  CardBodyComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TableDirective,
  BadgeComponent,
  SpinnerComponent
} from '@coreui/angular';
import { ApiService } from '../../core/services/api.service';
import { LetterOfCredit } from '../../core/models/letter-of-credit.model';

@Component({
  selector: 'app-letters-of-credit',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    ColComponent,
    RowComponent,
    TableDirective,
    BadgeComponent,
    SpinnerComponent
  ],
  templateUrl: './letters-of-credit.component.html',
  styleUrl: './letters-of-credit.component.css'
})
export class LettersOfCreditComponent implements OnInit {

  lettersOfCredit: LetterOfCredit[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchLettersOfCredit();
  }

  fetchLettersOfCredit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.getLettersOfCredit().subscribe({
      next: (data) => {
        this.lettersOfCredit = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  getStatusBadgeColor(status: string): string {
    switch (status?.toUpperCase()) {
      case 'ISSUED': return 'success';
      case 'PENDING': return 'warning';
      case 'EXPIRED': return 'danger';
      case 'CANCELLED': return 'secondary';
      default: return 'info';
    }
  }
}
