import { Component, inject, signal } from '@angular/core';
import { LucideAngularModule, SaveIcon } from 'lucide-angular';
import { AdminHeader } from '../../../components/admin/admin-header/admin-header';
import { AsyncPipe, Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import swal from '../../../utils/swal';
import { GameCategoryService } from '../../../services/game-category.service';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-game-create',
  imports: [AdminHeader, LucideAngularModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './game-create.html',
  styleUrl: './game-create.css',
})
export class GameCreate {
  readonly SaveIcon = SaveIcon;

  location = inject(Location);
  fb = inject(FormBuilder);
  gameCategoryService = inject(GameCategoryService);
  gameService = inject(GameService);

  previewImage = signal<string | null>(null);

  gameCategory$ = this.gameCategoryService.getCategories();

  createGameGroup = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    type: this.fb.control('', [Validators.required]),
    description: this.fb.control('', [Validators.required]),
    price: this.fb.control<number | null>(null, [Validators.required]),
    coverImage: this.fb.control<File | null>(null, [Validators.required]),
  });

  handleBackClick = () => {
    this.location.back();
  };

  onImageAttachmentChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      this.previewImage.set(null);
      this.createGameGroup.controls.coverImage.setValue(null);
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
      this.createGameGroup.controls.coverImage.setValue(null);
      return;
    }

    this.createGameGroup.controls.coverImage.setValue(file);
    this.createGameGroup.controls.coverImage.markAsTouched();

    const reader = new FileReader();

    reader.onload = () => {
      this.previewImage.set(reader.result!.toString());
    };

    reader.readAsDataURL(file);
  };

  async onCreateGameSubmit() {
    if (this.createGameGroup.invalid) {
      swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'กรุณาตรวจสอบข้อมูลที่ต้องกรอกให้เรียบร้อย',
        icon: 'error',
      });
      return;
    }

    const formValue = this.createGameGroup.getRawValue();

    const response = await this.gameService.createGame(
      formValue.name!,
      formValue.type!,
      formValue.description!,
      formValue.price!,
      formValue.coverImage!,
    );

    if (response.success) {
      await swal.fire({
        title: 'สำเร็จ',
        text: response.message,
        icon: 'success',
      });
      this.location.back();
    } else {
      await swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: response.message,
        icon: 'error',
      });
    }
  }
}
