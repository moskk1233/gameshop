import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogInIcon, LucideAngularModule } from 'lucide-angular';
import { UserService } from '../../../services/user.service';
import { PasswordInput } from '../../../components/common/password-input/password-input';
import { AuthService } from '../../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { catchError, of, switchMap, tap } from 'rxjs';

interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    LucideAngularModule,
    PasswordInput,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly LogInIcon = LogInIcon;

  userService = inject(UserService);
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);

  loginForm = this.fb.group<LoginForm>({
    email: this.fb.control('', {
      validators: [Validators.required],
    }),
    password: this.fb.control('', {
      validators: [Validators.required],
    }),
  });

  handleLoginSubmit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) return;

    const formValue = this.loginForm.getRawValue();

    Swal.fire({
      title: 'กำลังเข้าสู่ระบบ...',
      text: 'กรุณารอสักครู่',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.authService
      .login(formValue.email!, formValue.password!)
      .pipe(
        switchMap((response) => this.userService.getProfile(response.user.uid)),
        tap(() => Swal.close()),
        catchError((e: unknown) => {
          if (e instanceof Error) {
            Swal.fire({
              title: 'เกิดข้อผิดพลาด',
              text: e.message,
              icon: 'error',
            });
          }
          return of(null);
        }),
      )
      .subscribe((profile) => {
        if (profile) {
          if (profile.role === 'member') {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/admin']);
          }
        }
      });
  }

  isFieldInvalid(fieldName: keyof LoginForm) {
    const field = this.loginForm.controls[fieldName];
    return field.invalid && (field.dirty || field.touched);
  }

  getFieldErrorMessage(fieldName: keyof LoginForm) {
    const field = this.loginForm.controls[fieldName];

    if (!this.isFieldInvalid(fieldName)) return '';

    if (field.hasError('required')) {
      const labels: Record<keyof LoginForm, string> = {
        email: 'อีเมล',
        password: 'รหัสผ่าน',
      };
      return `กรุณากรอก${labels[fieldName]}`;
    }
    return 'ข้อมูลไม่ถูกต้อง';
  }
}
