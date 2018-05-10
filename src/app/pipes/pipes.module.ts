import { ObjectFilterPipe } from './object-filter.pipe';
import { TimeDurationPipe } from './time-duration.pipe';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,

  ],
  declarations: [TimeDurationPipe, ObjectFilterPipe],
  exports: [TimeDurationPipe, ObjectFilterPipe]

})
export class PipesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PipesModule,
      providers: [TimeDurationPipe, ObjectFilterPipe]
    };
  }
}
