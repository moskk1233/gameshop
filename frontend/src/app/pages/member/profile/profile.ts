import { Component, OnInit, signal } from '@angular/core';
import {
  PenIcon,
  SaveIcon,
  EyeOffIcon,
  EyeClosedIcon,
  LucideAngularModule,
} from 'lucide-angular';
import Swal from 'sweetalert2';
import { PasswordInput } from '../../../components/common/password-input/password-input';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule, PasswordInput],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  readonly SaveIcon = SaveIcon;
  readonly PenIcon = PenIcon;
  readonly EyeOffIcon = EyeOffIcon;
  readonly EyeClosedIcon = EyeClosedIcon;

  isEditable = signal(false);

  isOldPasswordShow = signal(false);
  isPasswordShow = signal(false);
  isPasswordConfirmShow = signal(false);

  currentImage = signal<string | null>(null);
  previewImage = signal<string | null>(null);

  handleEditClick = () => {
    this.isEditable.set(true);
  };

  handleSaveClick = () => {
    this.isEditable.set(false);
    Swal.fire({
      title: 'สำเร็จ',
      text: 'แก้ไขข้อมูลสำเร็จ',
      icon: 'success',
    });
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
  }
}
