import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserPlusIcon, LucideAngularModule, XIcon } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PasswordInput } from '../../../components/common/password-input/password-input';

@Component({
  selector: 'app-register',
  imports: [RouterLink, LucideAngularModule, PasswordInput, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  readonly UserPlusIcon = UserPlusIcon;
  readonly XIcon = XIcon;

  previewImage = signal<string | null>(null);

  onImageAttachmentChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      // this.previewImage.set(null);
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

  handleRemoveImage = () => {
    if (this.previewImage()) this.previewImage.set(null);
  };
}
