import { Component, inject } from '@angular/core';
import { TrendingGame } from "../../components/home/trending-game/trending-game";
import { GameCard } from "../../components/home/game-card/game-card";
import { TopupModal } from "../../components/home/topup-modal/topup-modal";
import { TopupService } from '../../services/topup.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [TrendingGame, GameCard, TopupModal],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  topupService = inject(TopupService);
  userService = inject(UserService);

  onTopupSubmit = (amount: number) => {
    this.userService.userProfile.wallet += amount;
    this.topupService.set(false);
    Swal.fire({
      title: 'สำเร็จ',
      text: 'เติมเงินสำเร็จ',
      icon: 'success'
    });
  }
}
