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
import { TaskRoutingModule } from './tasks/task-routing.module';
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


import { MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatDialogModule, MatGridListModule, MatCardModule } from '@angular/material';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { PendingUsersComponent } from './admin/admin-dashboard/pending-users/pending-users.component';
import { AdminWorkpackagesComponent } from './admin/admin-workpackages/admin-workpackages.component';
import { AddWorkpackagesFormComponent } from './admin/admin-workpackages/add-workpackages-form/add-workpackages-form.component';
import { ActionsDialogComponent } from './admin/admin-workpackages/actions-dialog/actions-dialog.component';
import { WorkpackageComponent } from './workpackages/workpackage/workpackage.component';

import { FilterPipe } from './filter.pipe';
import { TaskDetailsComponent} from './tasks/task-details/task-details.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component'
import { MatButtonModule, MatCheckboxModule} from '@angular/material';

import { TasksComponent } from 'src/app/tasks/task/task.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';

import {MatDatepickerModule} from '@angular/material';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';

import {MatNativeDateModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import { WpchatComponent } from './workpackages/workpackage/wpchat/wpchat.component';
import { ProfileComponent } from './profile/profile.component';
import { WpfilesComponent } from './workpackages/workpackage/wpfiles/wpfiles.component';

import {MatSelectModule} from '@angular/material/select';
import { GroupComponent } from './groups/group/group.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { NotActivatedComponent } from './routing-error/not-activated/not-activated.component';
import { NotAdminComponent } from './routing-error/not-admin/not-admin.component';
import { NotFoundComponent } from './routing-error/not-found/not-found.component';
import { TitleService } from './services/title.service';

import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { TaskFileComponent } from './tasks/task-file/task-file.component';

import { AdminAnnouncesComponent } from './admin/admin-announces/admin-announces.component';
import { AddAnnouncesFormComponent } from './admin/admin-announces/add-announces-form/add-announces-form.component';
import { AdminReportsComponent } from './admin/admin-reports/admin-reports.component';
import { AddReportFormComponent } from './admin/admin-reports/add-report-form/add-report-form.component';
import { AddTaskDialogComponent } from './workpackages/workpackage/add-task-dialog/add-task-dialog.component';
import { TaskFileListComponent } from './tasks/task-file-list/task-file-list.component';
import { UploadsComponent } from './files/uploads/uploads.component';
import { TaskFileEditDialogComponent } from './tasks/task-file/task-file-edit-dialog/task-file-edit-dialog.component';
import { MyGroupsComponent } from './groups/my-groups/my-groups.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { WptaskComponent } from './workpackages/workpackage/wptask/wptask.component';

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

    AdminUsersComponent,
    PendingUsersComponent,
    AdminWorkpackagesComponent,
    AddWorkpackagesFormComponent,
    ActionsDialogComponent,
    WorkpackageComponent,
    TaskDetailsComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskDetailsComponent,
    TasksComponent,
    WpchatComponent,
    ProfileComponent,
    WpfilesComponent,
    GroupComponent,
    TaskEditComponent,
    NotActivatedComponent,
    NotAdminComponent,
    NotFoundComponent,

    CreateTaskComponent,
    TaskFileComponent,

    AdminAnnouncesComponent,
    AddAnnouncesFormComponent,
    AdminReportsComponent,
    AddReportFormComponent,

    FileSelectDirective,

    AddTaskDialogComponent,

    TaskFileListComponent,

    UploadsComponent,

    TaskFileEditDialogComponent,

    MyGroupsComponent,

    WptaskComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,

    AdminRoutingModule,
    TaskRoutingModule,
    AppRoutingModule,
    
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
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ScrollingModule
  ],
  entryComponents: [ActionsDialogComponent, AddTaskDialogComponent, TaskFileEditDialogComponent],
  providers: [
    AuthService,
    TitleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { 
  constructor(private titleService: TitleService) {
    this.titleService.init();
  }
}
