import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';

// ng g m pipes/pipes --spec=false --flat

@NgModule({
  imports: [],
  declarations: [
    ImagePipe
  ],
  exports: [
    ImagePipe
  ]
})
export class PipesModule { }
