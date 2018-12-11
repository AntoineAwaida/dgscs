import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MaterialModule } from './material'

import { AuthService } from './services/auth.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { MissionsComponent } from './missions/missions.component';
import { WorkpackagesComponent } from './workpackages/workpackages.component';
import { GroupsComponent } from './groups/groups.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminGroupsComponent } from './admin/admin-groups/admin-groups.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AddGroupsFormComponent } from './admin/admin-groups/add-groups-form/add-groups-form.component';

import { FilterPipe } from './filter.pipe'
import { MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatDialogModule, MatGridListModule, MatCardModule } from '@angular/material';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { PendingUsersComponent } from './admin/admin-dashboard/pending-users/pending-users.component';
import { AdminWorkpackagesComponent } from './admin/admin-workpackages/admin-workpackages.component';
import { AddWorkpackagesFormComponent } from './admin/admin-workpackages/add-workpackages-form/add-workpackages-form.component';
import { ActionsDialogComponent } from './admin/admin-workpackages/actions-dialog/actions-dialog.component';
import { WorkpackageComponent } from './workpackages/workpackage/workpackage.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
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
    AdminUsersComponent,
    PendingUsersComponent,
    AdminWorkpackagesComponent,
    AddWorkpackagesFormComponent,
    ActionsDialogComponent,
    WorkpackageComponent
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
    FlexLayoutModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule
  ],
  entryComponents: [ActionsDialogComponent],
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
