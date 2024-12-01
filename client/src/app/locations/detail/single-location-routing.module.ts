import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleLocationComponent } from './single-location.component';
import { CoursesResolver } from 'src/app/courses/courses.resolver';

const routes: Routes = [
  { path: '', component: SingleLocationComponent, 
    children: [
      {
        path: '',
      
        loadChildren: () =>
          import('../../consumers/consumers.module').then((m) => m.ConsumersModule),
      },
      {
        path: "consumers/:id",
        loadChildren: ()=> 
          import('../../consumers/consumer-details/consumer-details.module').then( (m) => m.ConsumerDetailsModule),
        resolve: {
          
        }
    }
    ] 
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleLocationRoutingModule {}
