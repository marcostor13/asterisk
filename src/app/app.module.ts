import { CookieService } from 'ngx-cookie-service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './partials/header/header.component';
import { MenuComponent } from './partials/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { UsuariosComponent, ModalComponent } from './pages/usuarios/usuarios.component';
import { GruposComponent, ModalComponent2 } from './pages/grupos/grupos.component';
import { CampanasComponent, ModalComponentCampanas, ModalComponentCampanasDetail } from './pages/campanas/campanas.component';
import { TroncalesComponent } from './pages/troncales/troncales.component';
import { EstadisticosComponent } from './pages/estadisticos/estadisticos.component';
import { HeaderContentComponent } from './partials/header-content/header-content.component';
import { CrearTroncalComponent } from './pages/crear-troncal/crear-troncal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatFormFieldModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { CrearUsuarioComponent } from './pages/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CrearGrupoComponent } from './pages/crear-grupo/crear-grupo.component';
import { EditarGrupoComponent } from './pages/editar-grupo/editar-grupo.component';
import { CrearCampanaComponent } from './pages/crear-campana/crear-campana.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    MenuComponent,
    HomeComponent,
    UsuariosComponent,
    GruposComponent,
    CampanasComponent,
    TroncalesComponent,
    EstadisticosComponent,
    HeaderContentComponent,
    CrearTroncalComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    ModalComponent,
    ModalComponent2,
    ModalComponentCampanas,
    ModalComponentCampanasDetail,
    CrearGrupoComponent,
    EditarGrupoComponent,
    CrearCampanaComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule
     
  ],
  entryComponents: [ModalComponent, ModalComponent2, ModalComponentCampanas, ModalComponentCampanasDetail],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
