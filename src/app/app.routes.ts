import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './shared/guards/auth.guard';

export const routes: Routes = [

    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },

    {
        path: 'products',
        loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
        
    },
    {
        path:'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    },

    {
        path:'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
    },

    {
        path:'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate:[authGuard]
    },

    {
        path:'profiledelete',
        loadComponent: () => import('./pages/profile/profiledelete/profiledelete.component').then(m => m.ProfiledeleteComponent),
        canActivate:[authGuard]
    },

    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },

    {
        path: '**',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    }
];
