import { AsyncPipe, DecimalPipe, Location } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  LucideAngularModule,
  PenIcon,
  SaveIcon,
  TrashIcon,
} from 'lucide-angular';
import { AdminHeader } from '../../../components/admin/admin-header/admin-header';
import { ActivatedRoute, Router } from '@angular/router';
import {
  firstValueFrom,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { Game, GameCategory } from '../../../types';
import { GameService } from '../../../services/game.service';
import { GameCategoryService } from '../../../services/game-category.service';
import { ThaiDatePipe } from '../../../pipes/thai-date-pipe';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import swal from '../../../utils/swal';

interface EditGameForm {
  name: FormControl<string | null>;
  type: FormControl<string | null>;
  price: FormControl<number | null>;
  description: FormControl<string | null>;
  coverImage: FormControl<File | null>;
}

@Component({
  selector: 'app-game-management-edit',
  imports: [
    DecimalPipe,
    AdminHeader,
    LucideAngularModule,
    AsyncPipe,
    ThaiDatePipe,
    ReactiveFormsModule,
  ],
  templateUrl: './game-management-edit.html',
  styleUrl: './game-management-edit.css',
})
export class GameManagementEdit implements OnInit {
  readonly SaveIcon = SaveIcon;
  readonly TrashIcon = TrashIcon;
  readonly PenIcon = PenIcon;

  location = inject(Location);
  route = inject(ActivatedRoute);
  gameService = inject(GameService);
  gameCategoryService = inject(GameCategoryService);
  fb = inject(FormBuilder);
  router = inject(Router);

  game$!: Observable<Game>;
  categories$!: Observable<GameCategory[]>;

  editGameGroup!: FormGroup<EditGameForm>;

  isEditable = signal<boolean>(false);
  previewImage = signal<string | null>(null);

  toggleEditable() {
    const editable = !this.isEditable();
    this.isEditable.update(() => editable);

    if (editable) {
      this.editGameGroup.enable();
    } else {
      this.editGameGroup.disable();
      this.game$.subscribe((game) => {
        this.editGameGroup.patchValue({
          name: game.name,
          type: game.type,
          price: game.price,
          description: game.description,
          coverImage: null,
        });
      });
    }
  }

  handleBackClick() {
    this.location.back();
  }

  async onDeleteGame() {
    const swalRes = await swal.fire({
      title: 'คำเตือน',
      text: 'ต้องการลบเกมนี้หรือไม่',
      icon: 'warning',
      showCancelButton: true,
    });

    if (!swalRes.isConfirmed) return;

    const game = await firstValueFrom(this.game$);
    const res = await this.gameService.deleteGame(game.id);

    if (res.success) {
      swal.fire({
        title: 'สำเร็จ',
        text: res.message,
        icon: 'success',
      });

      this.router.navigate(['/admin/game-management']);
    } else {
      swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: res.message,
        icon: 'error',
      });
    }
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      this.previewImage.set(null);
      this.editGameGroup.patchValue({
        coverImage: null,
      });
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
      this.previewImage.set(null);
      this.editGameGroup.patchValue({
        coverImage: null,
      });
      return;
    }

    this.editGameGroup.patchValue({
      coverImage: file,
    });

    const reader = new FileReader();

    reader.onload = () => {
      this.previewImage.set(reader.result!.toString());
    };

    reader.readAsDataURL(file);
  }

  async onEditSubmit() {
    if (this.editGameGroup.invalid) {
      swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'กรุณาอย่าทำให้ช่องกรอกว่าง',
        icon: 'error',
      });
      return;
    }

    const formValue = this.editGameGroup.getRawValue();
    const game = await firstValueFrom(this.game$);
    const response = await this.gameService.editGame(
      game.id,
      formValue.name!,
      formValue.type!,
      formValue.price!,
      formValue.description!,
      formValue.coverImage!,
    );

    if (response.success) {
      swal.fire({
        title: 'สำเร็จ',
        text: response.message,
        icon: 'success',
      });
    } else {
      swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: response.message,
        icon: 'error',
      });
    }

    this.toggleEditable();
    this.editGameGroup.disable();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.editGameGroup = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      type: this.fb.control('', [Validators.required]),
      price: this.fb.control(0, [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      coverImage: this.fb.control<File | null>(null),
    });
    this.editGameGroup.disable();

    this.game$ = this.gameService.getGameById(id!).pipe(
      shareReplay(1),
      tap((game) => {
        if (!game) this.location.back();
        else
          this.editGameGroup.patchValue({
            name: game.name,
            type: game.type,
            price: game.price,
            description: game.description,
          });
      }),
      switchMap((game) => of(game) as Observable<Game>),
    );

    this.categories$ = this.gameCategoryService
      .getCategories()
      .pipe(shareReplay(1));
  }
}
