import { Component, inject, OnInit, signal } from '@angular/core';
import {
  PenIcon,
  SaveIcon,
  EyeOffIcon,
  EyeClosedIcon,
  LucideAngularModule,
} from 'lucide-angular';
import Swal from 'sweetalert2';
import { PasswordInput } from '../../../components/common/password-input/password-input';
import { AuthService } from '../../../services/auth.service';
import { AppUser } from '../../../types';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule, PasswordInput, AsyncPipe, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  readonly SaveIcon = SaveIcon;
  readonly PenIcon = PenIcon;
  readonly EyeOffIcon = EyeOffIcon;
  readonly EyeClosedIcon = EyeClosedIcon;

  authService = inject(AuthService);

  isEditable = signal(false);
  isOldPasswordShow = signal(false);
  isPasswordShow = signal(false);
  isPasswordConfirmShow = signal(false);
  currentImage = signal<string | null>(null);
  previewImage = signal<string | null>(null);

  user$ = this.authService.currentUser$;

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  username: string = '';
  email: string = '';

  handleEditClick = () => {
    this.isEditable.set(true);
  };

  handleSaveClick = async () => {
  if (this.isEditable()) {
    try {
      if (!this.username || !this.email) {
        Swal.fire('ผิดพลาด', 'กรุณากรอกชื่อผู้ใช้งานและอีเมล', 'error');
        return;
      }

      await this.authService.updateProfile(this.username, this.email);

     
      if (this.oldPassword && this.newPassword && this.confirmPassword) {
        if (this.newPassword !== this.confirmPassword) {
          Swal.fire('ผิดพลาด', 'รหัสผ่านใหม่ไม่ตรงกัน', 'error');
          return;
        }
        await this.authService.changePassword(this.oldPassword, this.newPassword);
      }

      Swal.fire('สำเร็จ', 'อัปเดตข้อมูลเรียบร้อย', 'success');
      this.isEditable.set(false);

      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    } catch (error: any) {
      Swal.fire('ผิดพลาด', error.message, 'error');
    }
  } else {
    this.isEditable.set(false);
    Swal.fire('สำเร็จ', 'แก้ไขข้อมูลสำเร็จ', 'success');
  }
};

  onImageAttachmentChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    if (!file) {
      this.previewImage.set(null);
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
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.previewImage.set(reader.result!.toString());
    };

    reader.readAsDataURL(file);
  };

  ngOnInit(): void {
    this.currentImage.set('/profile.webp');
    this.user$.subscribe((user) => {
      if (user) {
        this.username = user.username;
        this.email = user.email;
      }
    });
  }

}
