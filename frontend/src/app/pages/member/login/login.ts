import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogInIcon, LucideAngularModule } from 'lucide-angular';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly LogInIcon = LogInIcon;

  userService = inject(UserService);
  router = inject(Router);

  handleLoginSubmit() {
    this.userService.login();
    this.router.navigate(['']);
  }
}
