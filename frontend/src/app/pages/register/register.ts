import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserPlusIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-register',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  readonly UserPlusIcon = UserPlusIcon;
}
