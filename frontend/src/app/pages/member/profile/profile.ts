import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {
  PenIcon,
  SaveIcon,
  EyeOffIcon,
  EyeClosedIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { PasswordInput } from '../../../components/common/password-input/password-input';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import swal from '../../../utils/swal';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule, PasswordInput, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit, OnDestroy {
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

  oldPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');
  username = signal('');
  email = signal('');

  destroy$ = new Subject<void>();

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
      swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'กรุณากรอกชื่อผู้ใช้งานและอีเมล',
        icon: 'error',
      });
      return;
    }

    if (this.oldPassword() || this.newPassword() || this.confirmPassword()) {
      if (
        !this.oldPassword() ||
        !this.newPassword() ||
        !this.confirmPassword()
      ) {
        swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
          icon: 'error',
        });
        return;
      }

      if (this.newPassword() !== this.confirmPassword()) {
        swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: 'รหัสผ่านใหม่ไม่ตรงกัน',
          icon: 'error',
        });
        return;
      }
    }

    try {
      // อัปเดตโปรไฟล์
      await this.authService.updateProfile(this.username(), this.email());
      // เปลี่ยนรหัสผ่านถ้ามี
      if (this.oldPassword && this.newPassword && this.confirmPassword()) {
        await this.authService.changePassword(
          this.oldPassword(),
          this.newPassword(),
        );
      }
      // อัปโหลดรูปถ้ามี
      if (this.selectedFile) {
        const url = await this.authService.updateProfileImage(
          this.selectedFile,
        );
        this.currentImage.set(url);
        this.previewImage.set(null);
        this.selectedFile = null;
      }
      // ถ้าผ่านทุกขั้นตอน ถึงขึ้นสำเร็จ
      swal.fire({
        title: 'สำเร็จ',
        text: 'อัปเดตข้อมูลเรียบร้อย',
        icon: 'success',
      });
      // เคลียร์ข้อมูลชั่วคราว
      this.oldPassword.set('');
      this.newPassword.set('');
      this.confirmPassword.set('');
      this.isEditable.set(false);
    } catch {
      swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถเปลี่ยนรหัสผ่านได้กรุณาลองใหม่ภายหลัง',
        icon: 'error',
      });
    }
  };

  undoProfile = () => {
    this.previewImage.set(null);
    this.selectedFile = null;

    // รีโหลดค่าจาก user$
    this.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.username.set(user.username);
        this.email.set(user.email);
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
      swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'ระบบไม่รองรับไฟล์ประเภทนี้',
        icon: 'error',
      });
      input.value = '';
      return;
    }

    this.previewImage.set(URL.createObjectURL(file));
    this.selectedFile = file;
  }

  onImageError() {
    this.currentImage.set(null);
  }

  ngOnInit(): void {
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user) {
        this.username.set(user.username);
        this.email.set(user.email);
        this.currentImage.set(user.profileUrl || '/profile.webp');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
