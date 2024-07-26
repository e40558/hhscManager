import { Component, inject, Input, TemplateRef } from '@angular/core';
import { CardActionsService } from 'src/app/card/service/card-actions.service';
import { CardStateService } from 'src/app/card/service/card-state.service';
import { MedsheetStateService } from '../service/medsheet.service';

@Component({
  selector: 'app-medsheets',
  templateUrl: './medsheets.component.html',
  styleUrls: ['./medsheets.component.scss']
})
export class MedsheetComponent {

  @Input()
  altItemHeader: TemplateRef<MedsheetStateService>;


  
  @Input()
  altItem: TemplateRef<MedsheetStateService>;

  
  
  @Input()
  contentTemplate: TemplateRef<MedsheetStateService>;
  
  state = inject(MedsheetStateService)


  

}
