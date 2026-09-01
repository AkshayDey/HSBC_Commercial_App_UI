import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import {
  ButtonDirective,
  ButtonModule,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent,
  RowDirective,
  TooltipDirective,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  host: {
    class: 'bg-body-tertiary min-vh-100 d-flex flex-row align-items-center',
  },
  imports: [
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    ColComponent,
    ContainerComponent,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    FormControlDirective,
    FormDirective,
    FormLabelDirective,
    IconDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    RouterLink,
    RowComponent,
    RowDirective,
    TooltipDirective,
    ReactiveFormsModule,
  ],
  styleUrl: './login.component.css',
})
export class LoginComponent {
  toastr = inject(ToastrService);
  loginForm = new FormGroup({
    loginId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Clear any existing authentication tokens or session data on component initialization
    console.log('LoginComponent initialized. Clearing session data.');
  }

  get loginIdControl() {
    return this.loginForm.get('loginId');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    console.log('Login form submitted:', this.loginForm.value);
    if (!this.loginForm.valid) {
      this.toastr.warning('Please enter valid credentials');
      return;
    }
    const loginId = this.loginForm.get('loginId')?.value;
    const password = this.loginForm.get('password')?.value;

    if (!loginId || !password) {
      return;
    }
    const payload: { loginId: string; password: string } = {
      loginId,
      password,
    };
    console.log('Login payload:', payload);
    this.apiService.login(payload).subscribe({
      next: (response) => {
        this.toastr.success('Login successful');
        console.log('Login successful:', response);
        // Navigate to the dashboard or another page after successful login
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.toastr.error('Login failed');
        console.error('Login failed:', error);
        // Handle login error (e.g., show an error message to the user)
      },
    });
  }
}
