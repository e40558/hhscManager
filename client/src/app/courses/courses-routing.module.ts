import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CoursesResolver } from './courses.resolver';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
        courses: CoursesResolver
    }
},
{
    path: ':courseUrl',
    component: CourseComponent,
    resolve: {
        courses: CoursesResolver
    }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
