import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedsheetsRoutingModule } from './medsheets-routing.module';
import { MedsheetComponent } from './medsheets/medsheets.component';
import { MedSheetItemComponent } from './med-sheet-item/med-sheet-item.component';


@NgModule({
  declarations: [
    MedsheetComponent,
    MedSheetItemComponent
  ],
  imports: [
    CommonModule,
    MedsheetsRoutingModule
  ],
  exports: [
    MedsheetComponent
  ]
})
export class MedsheetsModule { }
