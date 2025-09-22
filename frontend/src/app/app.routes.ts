import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MemberLayout } from './layouts/member-layout/member-layout';

export const routes: Routes = [
  {
    path: '',
    component: MemberLayout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register').then((m) => m.Register),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile').then((m) => m.Profile),
      },
      {
        path: 'games/:id',
        loadComponent: () =>
          import('./pages/game-detail/game-detail').then((m) => m.GameDetail),
      },
      {
        path: 'library',
        loadComponent: () =>
          import('./pages/game-library/game-library').then((m) => m.GameLibrary),
      },
      {
        path: 'library/:id',
        loadComponent: () =>
          import('./pages/game-library-detail/game-library-detail').then(
            (m) => m.GameLibraryDetail,
          ),
      },
    ],
  },
];
