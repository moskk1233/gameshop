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
  selectedFile: File | null = null;
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
    if (!this.isEditable()) {
      this.isEditable.set(false);
      return;
    }
    // ตรวจสอบข้อมูลก่อน
    if (!this.username || !this.email) {
      Swal.fire('ผิดพลาด', 'กรุณากรอกชื่อผู้ใช้งานและอีเมล', 'error');
      return;
    }

    if (this.oldPassword || this.newPassword || this.confirmPassword) {
      if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
        Swal.fire('ผิดพลาด', 'กรุณากรอก รหัสผ่านเดิม, รหัสผ่านใหม่ และยืนยันรหัสผ่าน ให้ครบ', 'error');
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        Swal.fire('ผิดพลาด', 'รหัสผ่านใหม่ไม่ตรงกัน', 'error');
        return;
      }
    }

    try {
      // อัปเดตโปรไฟล์
      await this.authService.updateProfile(this.username, this.email);
      // เปลี่ยนรหัสผ่านถ้ามี
      if (this.oldPassword && this.newPassword && this.confirmPassword) {
        await this.authService.changePassword(this.oldPassword, this.newPassword);
      }
      // อัปโหลดรูปถ้ามี
      if (this.selectedFile) {
        const url = await this.authService.updateProfileImage(this.selectedFile);
        this.currentImage.set(url);
        this.previewImage.set(null);
        this.selectedFile = null;
      }
      // ถ้าผ่านทุกขั้นตอน ถึงขึ้นสำเร็จ
      Swal.fire('สำเร็จ', 'อัปเดตข้อมูลเรียบร้อย', 'success');
      // เคลียร์ข้อมูลชั่วคราว
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.isEditable.set(false);
    } catch (error: any) {
      Swal.fire('ผิดพลาด', error.message || 'เกิดข้อผิดพลาด', 'error');
    }
  };
  undoProfile = () => {
    this.previewImage.set(null);
    this.selectedFile = null;

    // รีโหลดค่าจาก user$
    this.user$.subscribe((user) => {
      if (user) {
        this.username = user.username;
        this.email = user.email;
        this.currentImage.set(user.profileUrl || '/profile.webp');
      }
    });

    this.isEditable.set(false);
  };

  onImageAttachmentChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    if (!file) {
      this.previewImage.set(null);
      this.selectedFile = null;
      return;
    }

    const allowedType = ['image/jpeg', 'image/png'];
    if (!allowedType.includes(file.type)) {
      Swal.fire('ผิดพลาด', 'ระบบไม่รองรับไฟล์ประเภทนี้', 'error');
      input.value = '';
      return;
    }

    this.previewImage.set(URL.createObjectURL(file));
    this.selectedFile = file;
  };
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    if (!file) {
      this.previewImage.set(null);
      this.selectedFile = null;
      return;
    }

    const allowedType = ['image/jpeg', 'image/png'];
    if (!allowedType.includes(file.type)) {
      Swal.fire('ผิดพลาด', 'ระบบไม่รองรับไฟล์ประเภทนี้', 'error');
      input.value = '';
      return;
    }

    this.previewImage.set(URL.createObjectURL(file)); // แค่ preview
    this.selectedFile = file;                        // เก็บไฟล์รออัปโหลด
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '/profile.webp';
    this.currentImage.set('/profile.webp');
  }

  ngOnInit(): void {
    this.currentImage.set('/profile.webp');
    this.user$.subscribe((user) => {
      if (user) {
        this.username = user.username;
        this.email = user.email;
        this.currentImage.set(user.profileUrl || '/profile.webp');
      }
    });
  }

}
