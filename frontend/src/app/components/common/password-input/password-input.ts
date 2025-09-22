import { Component, input, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EyeClosedIcon, EyeOffIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-password-input',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './password-input.html',
  styleUrl: './password-input.css',
})
export class PasswordInput {
  readonly EyeClosedIcon = EyeClosedIcon;
  readonly EyeOffIcon = EyeOffIcon;

  isShow = signal(false);

  placeholder = input('');
  value = model<string>();
}
