import { AfterViewInit, Component, inject, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CardActionsService } from '../service/card-actions.service';
import { CardStateService } from '../service/card-state.service';

@Component({
  selector: 'hhcs-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent  {

  @Input()
  headerTemplate: TemplateRef<any>;

  
  @Input()
  contentTemplate: TemplateRef<CardStateService>;

  actions = inject(CardActionsService)  
  state = inject(CardStateService)

  
  // Imparative Way  of programmin refactor to  current  solution
  //@ViewChild('container',{ read: ViewContainerRef}) container!:ViewContainerRef;
  //@ViewChild('cardHeader') headerTemplate!: TemplateRef<any>;
  //
  //ngAfterViewInit(): void {
  //  this.container.createEmbeddedView(this.headerTemplate)
  //}

}

