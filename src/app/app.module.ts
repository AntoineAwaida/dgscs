import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material'

import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { MissionsComponent } from './missions/missions.component';
import { WorkpackagesComponent } from './workpackages/workpackages.component';
import { GroupsComponent } from './groups/groups.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

const appRoutes: Routes = [
  { path: 'missions', component: MissionsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'work-packages', component: WorkpackagesComponent },
  { path: 'tasks', component: TasksComponent },
  {path: 'register', component: RegisterComponent},
  { path: '', pathMatch : 'full', redirectTo : 'dashboard'},
  {path: 'login', component: LoginComponent},
  // { path : '**', redirectTo : 'not-found'}
]

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    MissionsComponent,
    WorkpackagesComponent,
    GroupsComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
