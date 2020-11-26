import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'init', pathMatch: 'full' },
  { path: 'init', loadChildren: () => import('./pages/init/init.module').then( m => m.InitPageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule) },
  { path: 'nego1', loadChildren: () => import('./pages/nego1/nego1.module').then( m => m.Nego1PageModule) },
  { path: 'nego2/:id', loadChildren: () => import('./pages/nego2/nego2.module').then( m => m.Nego2PageModule) },
  { path: 'menu', loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule) },
  { path: 'servicios', loadChildren: () => import('./pages/servicios/servicios.module').then( m => m.ServiciosPageModule) },
  { path: 'editservices', loadChildren: () => import('./pages/editservices/editservices.module').then( m => m.EditservicesPageModule) },
  { path: 'editmenu', loadChildren: () => import('./pages/editmenu/editmenu.module').then( m => m.EditmenuPageModule) },
  { path: 'ajustes', loadChildren: () => import('./pages/ajustes/ajustes.module').then( m => m.AjustesPageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
