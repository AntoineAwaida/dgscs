import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports : [
        MatButtonModule, 
        MatCheckboxModule,
        MatSidenavModule,
        MatTooltipModule
    ],
    exports : [
        MatButtonModule, 
        MatCheckboxModule,
        MatSidenavModule,
        MatTooltipModule
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
      ]
})

export class MaterialModule { }