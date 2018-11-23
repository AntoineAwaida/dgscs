import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material'

import { AuthService } from './services/auth.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AppComponent } from './app.component';
import { MissionsComponent } from './missions/missions.component';
import { WorkpackagesComponent } from './workpackages/workpackages.component';
import { GroupsComponent } from './groups/groups.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminGroupsComponent } from './admin/admin-groups/admin-groups.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AddGroupsFormComponent } from './admin/admin-groups/add-groups-form/add-groups-form.component';

import { FilterPipe } from './filter.pipe';
import { TaskDetailsComponent} from './tasks/task-details/task-details.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component'
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { TasksComponent } from 'src/app/tasks/task/task.component';

import {MatDatepickerModule, MatDatepicker} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    MissionsComponent,
    WorkpackagesComponent,
    GroupsComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    AdminGroupsComponent,
    AdminDashboardComponent,
    AddGroupsFormComponent,
    FilterPipe,
    TaskDetailsComponent,
    TaskFormComponent,
    TaskDetailsComponent,
    TasksComponent,
  
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AdminRoutingModule,
    BrowserAnimationsModule, 
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
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
