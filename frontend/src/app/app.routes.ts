import { Routes } from '@angular/router';
import { Home } from './pages/member/home/home';
import { MemberLayout } from './layouts/member-layout/member-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';

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
        loadComponent: () => import('./pages/member/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/member/register/register').then((m) => m.Register),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/member/profile/profile').then((m) => m.Profile),
      },
      {
        path: 'games/:id',
        loadComponent: () =>
          import('./pages/member/game-detail/game-detail').then((m) => m.GameDetail),
      },
      {
        path: 'library',
        loadComponent: () =>
          import('./pages/member/game-library/game-library').then(
            (m) => m.GameLibrary,
          ),
      },
      {
        path: 'library/:id',
        loadComponent: () =>
          import('./pages/member/game-library-detail/game-library-detail').then(
            (m) => m.GameLibraryDetail,
          ),
      },
      {
        path: 'history',
        loadComponent: () =>
          import(
            './pages/member/member-transaction-history/member-transaction-history'
          ).then((m) => m.MemberTransactionHistory),
      },
      {
        path: 'game-cart',
        loadComponent: () =>
          import('./pages/member/member-cart/member-cart').then((m) => m.MemberCart),
      },
    ],
  },
  {
    path: "admin",
    component: AdminLayout,
    children: [
      {
        path: "",
        loadComponent: () => import('./pages/admin/home/home').then(m => m.Home),
      },
      {
        path: "game-management",
        loadComponent: () => import('./pages/admin/game-management/game-management').then(m => m.GameManagement),
      },
      {
        path: "game-management/:id",
        loadComponent: () => import('./pages/admin/game-management-edit/game-management-edit').then(m => m.GameManagementEdit),
      },
      {
        path: "game-create",
        loadComponent: () => import('./pages/admin/game-create/game-create').then(m => m.GameCreate),
      }
    ]
  }
];
