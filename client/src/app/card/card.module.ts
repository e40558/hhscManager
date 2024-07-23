import { NgModule } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardActionsService } from './service/card-actions.service';
import { CardStateService } from './service/card-state.service';



@NgModule({
  declarations: [
    CardComponent
  ],
  providers:[
    CardActionsService,
    CardStateService

  ],
  exports: [
    CardComponent
  ],
  imports: [
    CommonModule,
    
  ]
})
export class CardModule { }
