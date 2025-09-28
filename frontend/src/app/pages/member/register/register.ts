import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserPlusIcon, LucideAngularModule, XIcon } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PasswordInput } from '../../../components/common/password-input/password-input';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, LucideAngularModule, PasswordInput, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  readonly UserPlusIcon = UserPlusIcon;
  readonly XIcon = XIcon;

  authService = inject(AuthService);
  router = inject(Router);

  previewImage = signal<string | null>(null);
  imageFile = signal<File | null>(null);

  email = signal('');
  username = signal('');
  password = signal('');
  confirmPassword = signal('');

  onImageAttachmentChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
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
      this.imageFile.set(null);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.previewImage.set(reader.result!.toString());
      this.imageFile.set(file);
    };

    reader.readAsDataURL(file);
  };

  handleRemoveImage = () => {
    if (this.previewImage()) {
      this.previewImage.set(null);
      this.imageFile.set(null);
    }
  };

  async onRegisterSubmit() {
    if (this.password().length < 6) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'รหัสผ่านต้องยาว 6 ตัวขึ้นไป',
        icon: 'error',
      });
      return;
    }

    if (this.password() !== this.confirmPassword()) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'กรุณากรอกรหัสผ่านให้ถูกต้อง',
        icon: 'error',
      });
      return;
    }

    const response = await this.authService.register(
      this.email(),
      this.password(),
      this.username(),
      this.imageFile()!,
    );
    if (response.success) {
      await Swal.fire({
        title: 'สำเร็จ',
        text: response.message,
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
      });
      this.router.navigate(['/login']);
    } else {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: response.message,
        icon: 'error',
      });
    }
  }
}
