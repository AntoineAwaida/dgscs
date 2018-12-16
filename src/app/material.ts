import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
    imports : [
        MatButtonModule, 
        MatCheckboxModule,
        MatSidenavModule
    ],
    exports : [
        MatButtonModule, 
        MatCheckboxModule,
        MatSidenavModule
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
      ]
})

export class MaterialModule { }