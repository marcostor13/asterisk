import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: HomeComponent, pathMatch: 'full' },
  { path: 'usuarios', component: HomeComponent, pathMatch: 'full' },
  { path: 'crear-usuario', component: HomeComponent, pathMatch: 'full' },
  { path: 'editar-usuario/:id', component: HomeComponent, pathMatch: 'full' },
  { path: 'grupos', component: HomeComponent, pathMatch: 'full' },
  { path: 'crear-grupo', component: HomeComponent, pathMatch: 'full' },
  { path: 'editar-grupo/:id', component: HomeComponent, pathMatch: 'full' },
  { path: 'campanas', component: HomeComponent, pathMatch: 'full' },
  { path: 'troncales', component: HomeComponent, pathMatch: 'full' },
  { path: 'estadisticos', component: HomeComponent, pathMatch: 'full' },
  { path: 'crear-troncal', component: HomeComponent, pathMatch: 'full' },
  { path: 'campanas', component: HomeComponent, pathMatch: 'full' },
  { path: 'crear-campana', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
