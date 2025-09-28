import { Component, inject, signal } from '@angular/core';
import { LucideAngularModule, SaveIcon } from 'lucide-angular';
import { AdminHeader } from '../../../components/admin/admin-header/admin-header';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game-create',
  imports: [AdminHeader, LucideAngularModule, FormsModule],
  templateUrl: './game-create.html',
  styleUrl: './game-create.css'
})
export class GameCreate {
  readonly SaveIcon = SaveIcon;

  location = inject(Location);

  previewImage = signal<string | null>(null);

  newGame = signal({
    name: "",
    type: "",
    price: 0,
    description: ""
  });

  handleBackClick = () => {
    this.location.back();
  }

  onImageAttachmentChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

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
    }

    reader.readAsDataURL(file);
  }
}
