import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserPlusIcon, LucideAngularModule, XIcon } from 'lucide-angular';
import {
  AbstractControl,
  FormBuilder,
  type FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { PasswordInput } from '../../../components/common/password-input/password-input';
import { AuthService } from '../../../services/auth.service';

interface RegisterForm {
  email: FormControl<string | null>;
  username: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
  profileFile: FormControl<File | null>;
}

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    LucideAngularModule,
    PasswordInput,
    ReactiveFormsModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  readonly UserPlusIcon = UserPlusIcon;
  readonly XIcon = XIcon;

  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);

  previewImage = signal<string | null>(null);
  submitted = signal(false);

  registerGroup = this.fb.group<RegisterForm>(
    {
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
      }),
      username: this.fb.control('', {
        validators: [Validators.required],
      }),
      password: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      profileFile: this.fb.control<File | null>(null, {
        validators: [Validators.required],
      }),
    },
    {
      validators: [this.passwordMatcherValidator],
    },
  );

  private passwordMatcherValidator(
    group: AbstractControl,
  ): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (!password || !confirmPassword) return null;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onImageAttachmentChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      this.previewImage.set(null);
      this.registerGroup.controls.profileFile.setValue(null);
      return;
    }

    const allowedType = ['image/jpeg', 'image/png'];

    if (!allowedType.includes(file.type)) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'ระบบไม่รองรับไฟล์ประเภทนี้',
        icon: 'error',
      });
      input.value = '';
      this.previewImage.set(null);
      this.registerGroup.controls.profileFile.setValue(null);
      return;
    }

    this.registerGroup.controls.profileFile.setValue(file);
    this.registerGroup.controls.profileFile.markAsTouched();

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage.set(reader.result!.toString());
    };
    reader.readAsDataURL(file);
  };

  handleRemoveImage = () => {
    if (this.previewImage()) {
      this.previewImage.set(null);
      this.registerGroup.controls.profileFile.setValue(null);
    }
  };

  isFieldInvalid(fieldName: keyof RegisterForm): boolean {
    const field = this.registerGroup.controls[fieldName];
    return field.invalid && (field.dirty || field.touched || this.submitted());
  }

  getErrorMessage(fieldName: keyof RegisterForm): string {
    const field = this.registerGroup.controls[fieldName];

    if (!this.isFieldInvalid(fieldName)) return '';

    if (field.hasError('required')) {
      const labels: Record<keyof RegisterForm, string> = {
        email: 'อีเมล',
        username: 'ชื่อผู้ใช้งาน',
        password: 'รหัสผ่าน',
        confirmPassword: 'ยืนยันรหัสผ่าน',
        profileFile: 'รูปโปรไฟล์',
      };
      return `กรุณากรอก${labels[fieldName]}`;
    }

    if (fieldName === 'email' && field.hasError('email')) {
      return 'รูปแบบอีเมลไม่ถูกต้อง';
    }

    if (fieldName === 'password' && field.hasError('minlength')) {
      return 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
    }

    if (fieldName === 'confirmPassword') {
      if (field.hasError('minlength')) {
        return 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
      }
      if (this.registerGroup.hasError('passwordMismatch')) {
        return 'รหัสผ่านไม่ตรงกัน';
      }
    }

    return 'ข้อมูลไม่ถูกต้อง';
  }

  async onRegisterSubmit() {
    this.submitted.set(true);

    this.registerGroup.markAllAsTouched();

    if (this.registerGroup.invalid) {
      Swal.fire({
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        text: 'มีข้อมูลบางส่วนที่ไม่ถูกต้องหรือยังไม่ได้กรอก',
        icon: 'warning',
      });
      return;
    }

    const formValue = this.registerGroup.getRawValue();

    Swal.fire({
      title: 'กำลังสมัครสมาชิก...',
      text: 'กรุณารอสักครู่',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.authService
      .register(
        formValue.email!,
        formValue.password!,
        formValue.username!,
        formValue.profileFile!,
      )
      .subscribe((response) => {
        Swal.close();
        if (response.success) {
          this.router.navigate(['/']);
        } else {
          Swal.fire({
            title: 'เกิดข้อผิดพลาด',
            text: 'กรุณาลองอีกครั้งภายหลัง',
            icon: 'error',
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });
  }
}
